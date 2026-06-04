const fs = require('fs');
const path = require('path');

const files = [
  { file: 'app/articles/page.tsx', defaultName: 'DEFAULT_ARTICLES', type: 'articles', resField: 'items', stateName: 'articles', stateType: 'Article' },
  { file: 'app/quiz/page.tsx', defaultName: 'DEFAULT_QUIZ', type: 'quiz', resField: 'questions', stateName: 'questions', stateType: 'Question' },
  { file: 'app/flashcards/page.tsx', defaultName: 'DEFAULT_CARDS', type: 'flashcards', resField: 'cards', stateName: 'cards', stateType: 'Flashcard' },
  { file: 'app/faq/page.tsx', defaultName: 'DEFAULT_FAQS', type: 'faq', resField: 'faqs', stateName: 'faqs', stateType: 'FAQ' },
  { file: 'app/youtube/page.tsx', defaultName: 'DEFAULT_VIDEOS', type: 'youtube', resField: 'items', stateName: 'videos', stateType: 'Video' },
  { file: 'app/videos/page.tsx', defaultName: 'DEFAULT_VIDEOS', type: 'videos', resField: 'items', stateName: 'videos', stateType: 'Video' },
  { file: 'app/pdfs/page.tsx', defaultName: 'DEFAULT_PDFS', type: 'pdfs', resField: 'items', stateName: 'pdfs', stateType: 'PDF' }
];

for (const { file, defaultName, type, resField, stateName, stateType } of files) {
  const p = path.join('/Users/zee/.gemini/antigravity/scratch/journey-lxp-app', file);
  if (!fs.existsSync(p)) continue;
  
  let content = fs.readFileSync(p, 'utf8');

  // Fix import { useEffect }
  if (!content.includes('useEffect')) {
    content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
  }

  // Find the exact line for DEFAULT_ARTICLES and remove it and the array
  const defaultRegex = new RegExp(`const ${defaultName}:?.*?\\];`, 'gs');
  content = content.replace(defaultRegex, '');

  // For articles we messed up the import previously
  content = content.replace(/  import { useEffect } from 'react';\n/g, '');

  // Inject Context logic
  const hookRegex = new RegExp(`const \\[${stateName}, set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}\\] = useState<${stateType}\\[\\]>\\(${defaultName}\\);\\s*const \\[isRegenerating, setIsRegenerating\\] = useState\\(false\\);\\s*const { selectedNode, generatedJourney } = useJourney\\(\\);\\s*const topic = selectedNode\\?\\.data\\?\\.label \\|\\| generatedJourney\\?\\.title \\|\\| 'Market Research';`, 'gs');

  const replacement = `const { selectedNode, generatedJourney, artifactCache, setArtifactCache } = useJourney();
  const topic = selectedNode?.data?.label || generatedJourney?.title || 'Market Research';
  const cacheKey = \`${type}_\${topic}\`;

  const [${stateName}, set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}] = useState<${stateType}[]>(artifactCache[cacheKey] || []);
  const [isRegenerating, setIsRegenerating] = useState(!artifactCache[cacheKey]);

  useEffect(() => {
    if (!artifactCache[cacheKey]) {
      handleRegenerate();
    }
  }, [topic, artifactCache, cacheKey]);`;

  // Fix articles page specifically because we already changed it
  if (file === 'app/articles/page.tsx') {
    // just fix the import
    if (!content.includes('useEffect } from \'react\'')) {
      content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
    }
  } else {
    content = content.replace(hookRegex, replacement);

    // Update handleRegenerate
    const handleRegex = new RegExp(`const handleRegenerate = async \\(\\) => \\{.*?if \\(data\\.success && data\\.data\\?\\.${resField}\\) \\{.*?set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}\\(data\\.data\\.${resField}\\);`, 'gs');
    
    // We will do a generic replacement for the set call inside handleRegenerate
    content = content.replace(`set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}(data.data.${resField});`, `set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}(data.data.${resField});\n        setArtifactCache(prev => ({ ...prev, [cacheKey]: data.data.${resField} }));`);
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated ${file}`);
}

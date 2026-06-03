const fs = require('fs');
const path = require('path');

const pages = ['articles', 'chapter', 'faq', 'flashcards', 'pdfs', 'quiz', 'videos', 'youtube'];
const sourceDir = path.join(__dirname, '..', 'journey-lxp');
const targetDir = path.join(__dirname, 'app');

pages.forEach(page => {
  const htmlPath = path.join(sourceDir, `${page}.html`);
  if (!fs.existsSync(htmlPath)) return;
  
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract content inside <main class="pdf-main"> or <main class="main-content">
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) return;
  
  let content = mainMatch[1];
  
  // Convert class= to className=
  content = content.replace(/class="/g, 'className="');
  
  // Convert style="..." to inline objects (very simple regex, works for our basic styles)
  // Actually, our HTML uses styles in some places. Let's just remove inline styles or convert them manually.
  // We'll replace simple inline styles like style="width:32px;height:32px;"
  content = content.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = styles.split(';').filter(Boolean).map(s => {
      const [key, value] = s.split(':');
      if (!key || !value) return '';
      const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      return `${camelKey}: '${value.trim()}'`;
    }).join(', ');
    return `style={{${styleObj}}}`;
  });

  // Convert onclick to onClick
  content = content.replace(/onclick=/g, 'onClick=');
  
  // Close unclosed tags
  content = content.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
  content = content.replace(/<img([^>]*[^\/])>/g, '<img$1 />');

  // Remove <script> tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  const tsx = `import Header from '../components/Header';

export default function ${page.charAt(0).toUpperCase() + page.slice(1)}Page() {
  return (
    <main className="pdf-main">
      <Header />
      ${content}
    </main>
  );
}
`;

  fs.mkdirSync(path.join(targetDir, page), { recursive: true });
  fs.writeFileSync(path.join(targetDir, page, 'page.tsx'), tsx);
});
console.log('Pages migrated successfully!');

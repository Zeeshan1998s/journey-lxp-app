'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateJourney() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const router = useRouter();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation steps
    setTimeout(() => setLoadingStep(1), 1000); // Analyzing prompt...
    setTimeout(() => setLoadingStep(2), 2500); // Building curriculum...
    setTimeout(() => setLoadingStep(3), 4000); // Generating nodes...
    setTimeout(() => {
      router.push('/journey/1');
    }, 5500);
  };

  const suggestions = [
    "Python for Data Science in 4 weeks",
    "Advanced Next.js Architecture",
    "Kubernetes for Beginners",
    "System Design Interview Prep"
  ];

  return (
    <main style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#f8f7f5', minHeight: 'calc(100vh - 104px)'}}>
      
      {!isGenerating ? (
        <div style={{width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'}}>
          <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: '40px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.5px'}}>
              What do you want to learn?
            </h1>
            <p style={{fontSize: '18px', color: 'var(--gray-600)'}}>
              Describe your learning goals, and our AI will instantly generate a personalized, interactive curriculum for you.
            </p>
          </div>

          <form onSubmit={handleGenerate} style={{width: '100%', position: 'relative'}}>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to master Full-Stack Web Development using React and Node.js..."
              style={{
                width: '100%',
                minHeight: '140px',
                padding: '24px',
                paddingBottom: '60px',
                borderRadius: '16px',
                border: '1px solid var(--gray-300)',
                background: 'var(--white)',
                fontSize: '16px',
                fontFamily: 'var(--font)',
                color: 'var(--gray-900)',
                resize: 'none',
                outline: 'none',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
              }}
            />
            <button 
              type="submit"
              disabled={!prompt.trim()}
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: prompt.trim() ? 'var(--gray-900)' : 'var(--gray-300)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: prompt.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
            >
              Generate Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>

          <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center'}}>
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => setPrompt(s)}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: '24px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  color: 'var(--gray-700)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                className="suggestion-pill"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px'}}>
          <div className="spinner"></div>
          <div style={{fontSize: '20px', fontWeight: 600, color: 'var(--gray-900)', textAlign: 'center', height: '30px'}}>
            {loadingStep === 0 && "Analyzing prompt..."}
            {loadingStep === 1 && "Structuring curriculum..."}
            {loadingStep === 2 && "Generating interactive nodes..."}
            {loadingStep === 3 && "Finalizing your journey..."}
          </div>
          <div style={{width: '240px', height: '6px', background: 'var(--gray-200)', borderRadius: '3px', overflow: 'hidden'}}>
            <div style={{
              height: '100%',
              background: 'var(--orange)',
              width: `${(loadingStep + 1) * 25}%`,
              transition: 'width 1s ease-in-out'
            }}></div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .suggestion-pill:hover {
          border-color: var(--orange) !important;
          color: var(--orange) !important;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--orange-bg-2);
          border-top: 4px solid var(--orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </main>
  );
}

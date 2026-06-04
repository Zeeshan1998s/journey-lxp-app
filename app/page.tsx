'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourney } from './contexts/JourneyContext';

const LOADING_STEPS = [
  'Analyzing your learning goals...',
  'Designing your curriculum...',
  'Building your journey map...',
  'Finalizing modules and topics...',
];

export default function GenerateJourney() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setGeneratedJourney } = useJourney();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError('');
    setLoadingStep(0);

    // Animate steps while waiting for API
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 1200);

    try {
      const res = await fetch('/api/ai/generate-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || 'Generation failed');

      // Store the generated journey in context
      setGeneratedJourney({
        ...data.journey,
        prompt,
      });

      clearInterval(stepInterval);
      setLoadingStep(LOADING_STEPS.length - 1);
      
      // Short pause to show completion before navigating
      setTimeout(() => router.push('/journey/1'), 600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Something went wrong. Please try again.');
      setIsGenerating(false);
    }
  };

  const suggestions = [
    'Python for Data Science in 4 weeks',
    'Advanced Next.js Architecture',
    'Kubernetes for Beginners',
    'System Design Interview Prep',
    'Machine Learning Fundamentals',
    'React Native Mobile Development',
  ];

  const handleSuggestion = (s: string) => {
    setPrompt(s);
  };

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #fafaf9 0%, #fff7f3 50%, #fafaf9 100%)',
      minHeight: 'calc(100vh - 104px)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(241,89,32,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(241,89,32,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {!isGenerating ? (
        <div style={{width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 1}}>
          
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--orange-bg)', color: 'var(--orange)',
            padding: '6px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 700,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Powered by Groq AI — Generate in seconds
          </div>

          <div style={{textAlign: 'center'}}>
            <h1 style={{
              fontSize: '42px', fontWeight: 800, color: 'var(--gray-900)',
              marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.15
            }}>
              What do you want to learn?
            </h1>
            <p style={{fontSize: '18px', color: 'var(--gray-600)', lineHeight: 1.6}}>
              Describe your learning goal and our AI will instantly build you a<br/>personalized, interactive curriculum map.
            </p>
          </div>

          {error && (
            <div style={{
              width: '100%', padding: '12px 16px', background: '#fef2f2',
              border: '1px solid #fecaca', borderRadius: '10px',
              color: '#ef4444', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleGenerate} style={{width: '100%', position: 'relative'}}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to master Full-Stack Web Development using React and Node.js in 6 weeks..."
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(e as any); } }}
              style={{
                width: '100%',
                minHeight: '140px',
                padding: '24px',
                paddingBottom: '68px',
                borderRadius: '16px',
                border: '1.5px solid var(--gray-200)',
                background: 'var(--white)',
                fontSize: '16px',
                fontFamily: 'var(--font)',
                color: 'var(--gray-900)',
                resize: 'none',
                outline: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                lineHeight: 1.6,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--orange)';
                e.target.style.boxShadow = '0 8px 32px rgba(241,89,32,0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--gray-200)';
                e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)';
              }}
            />
            <div style={{position: 'absolute', bottom: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span style={{fontSize: '12px', color: 'var(--gray-400)'}}>
                {prompt.length > 0 ? `${prompt.length} chars` : 'Press Enter to generate'}
              </span>
              <button
                type="submit"
                disabled={!prompt.trim()}
                style={{
                  background: prompt.trim() ? 'var(--gray-900)' : 'var(--gray-300)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: prompt.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s, transform 0.1s',
                }}
              >
                Generate Journey
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </form>

          {/* Suggestions */}
          <div style={{width: '100%'}}>
            <p style={{fontSize: '12px', color: 'var(--gray-400)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'}}>
              Try one of these
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s)}
                  style={{
                    background: 'var(--white)',
                    border: '1.5px solid var(--gray-200)',
                    borderRadius: '24px',
                    padding: '9px 16px',
                    fontSize: '13px',
                    color: 'var(--gray-700)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font)',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--orange)';
                    (e.target as HTMLElement).style.color = 'var(--orange)';
                    (e.target as HTMLElement).style.background = 'var(--orange-bg)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--gray-200)';
                    (e.target as HTMLElement).style.color = 'var(--gray-700)';
                    (e.target as HTMLElement).style.background = 'var(--white)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Loading State */
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', maxWidth: '480px', textAlign: 'center'}}>
          
          {/* Animated orb */}
          <div style={{position: 'relative', width: '80px', height: '80px'}}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--orange), var(--orange-bg), var(--orange))',
              animation: 'spin 1.5s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '6px', borderRadius: '50%',
              background: 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div>
            <div style={{fontSize: '22px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px'}}>
              Building your journey
            </div>
            <div style={{
              fontSize: '16px', color: 'var(--orange)', fontWeight: 500,
              minHeight: '24px', transition: 'opacity 0.3s',
            }}>
              {LOADING_STEPS[loadingStep]}
            </div>
          </div>

          {/* Progress dots */}
          <div style={{display: 'flex', gap: '8px'}}>
            {LOADING_STEPS.map((_, i) => (
              <div key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: i <= loadingStep ? 'var(--orange)' : 'var(--gray-200)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>

          <div style={{fontSize: '14px', color: 'var(--gray-400)'}}>
            "{prompt}"
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </main>
  );
}

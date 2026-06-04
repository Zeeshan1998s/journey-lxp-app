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

const EXPERIENCE_LEVELS = [
  { id: 'Beginner', title: 'Beginner', desc: 'I am completely new to this topic.', icon: '🌱' },
  { id: 'Intermediate', title: 'Intermediate', desc: 'I have some basic knowledge.', icon: '🛠️' },
  { id: 'Advanced', title: 'Advanced', desc: 'I am looking for deep mastery.', icon: '🚀' },
];

const TIME_COMMITMENTS = [
  { id: 'Casual', title: 'Casual', desc: '1-3 hours per week. Slow and steady.', icon: '☕' },
  { id: 'Standard', title: 'Standard', desc: '5-10 hours per week. Regular pace.', icon: '📅' },
  { id: 'Intensive', title: 'Intensive', desc: '20+ hours per week. Boot-camp style.', icon: '⚡' },
];

export default function GenerateJourney() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setGeneratedJourney } = useJourney();

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && !prompt.trim()) return;
    if (step === 2 && !experienceLevel) return;
    
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !experienceLevel || !timeCommitment) return;

    setIsGenerating(true);
    setError('');
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 1200);

    try {
      const detailedPrompt = `I want to learn ${prompt}. My current experience level is ${experienceLevel}. I can dedicate ${timeCommitment} time. Please structure the curriculum accordingly.`;

      const res = await fetch('/api/ai/generate-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: detailedPrompt }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || 'Generation failed');

      setGeneratedJourney({
        ...data.journey,
        prompt: detailedPrompt,
      });

      clearInterval(stepInterval);
      setLoadingStep(LOADING_STEPS.length - 1);
      
      setTimeout(() => router.push('/journey/1'), 600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Something went wrong. Please try again.');
      setIsGenerating(false);
      setStep(1); // Reset to first step on error
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
        <div style={{width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1, animation: 'fadeIn 0.3s ease'}}>
          
          {/* Header Area */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--orange-bg)', color: 'var(--orange)',
              padding: '6px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 700,
              marginBottom: '24px'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Step {step} of 3
            </div>
            
            {step === 1 && (
              <>
                <h1 style={{fontSize: '42px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.15}}>
                  What do you want to learn?
                </h1>
                <p style={{fontSize: '18px', color: 'var(--gray-600)', lineHeight: 1.6}}>
                  Describe your learning goal and our AI will build a personalized curriculum.
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 style={{fontSize: '42px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.15}}>
                  What is your experience level?
                </h1>
                <p style={{fontSize: '18px', color: 'var(--gray-600)', lineHeight: 1.6}}>
                  We'll tailor the difficulty to match your current skills.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 style={{fontSize: '42px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.15}}>
                  How much time can you commit?
                </h1>
                <p style={{fontSize: '18px', color: 'var(--gray-600)', lineHeight: 1.6}}>
                  Set a pace that works for your schedule.
                </p>
              </>
            )}
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

          {/* Step Content */}
          <div style={{width: '100%', position: 'relative'}}>
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., I want to master Full-Stack Web Development using React and Node.js in 6 weeks..."
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNextStep(); } }}
                  style={{
                    width: '100%', minHeight: '140px', padding: '24px', paddingBottom: '68px',
                    borderRadius: '16px', border: '1.5px solid var(--gray-200)', background: 'var(--white)',
                    fontSize: '16px', fontFamily: 'var(--font)', color: 'var(--gray-900)',
                    resize: 'none', outline: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    lineHeight: 1.6, transition: 'border-color 0.2s, box-shadow 0.2s',
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
                
                <div style={{marginTop: '24px'}}>
                  <p style={{fontSize: '12px', color: 'var(--gray-400)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                    Try one of these
                  </p>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i} type="button" onClick={() => setPrompt(s)}
                        style={{
                          background: 'var(--white)', border: '1.5px solid var(--gray-200)',
                          borderRadius: '24px', padding: '9px 16px', fontSize: '13px',
                          color: 'var(--gray-700)', cursor: 'pointer', fontFamily: 'var(--font)',
                          fontWeight: 500, transition: 'all 0.15s',
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
              </form>
            )}

            {step === 2 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {EXPERIENCE_LEVELS.map((level) => (
                  <div
                    key={level.id}
                    onClick={() => setExperienceLevel(level.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '20px', padding: '24px',
                      background: 'var(--white)', borderRadius: '16px', cursor: 'pointer',
                      border: experienceLevel === level.id ? '2px solid var(--orange)' : '2px solid var(--gray-200)',
                      boxShadow: experienceLevel === level.id ? '0 8px 32px rgba(241,89,32,0.1)' : '0 8px 32px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{fontSize: '32px'}}>{level.icon}</div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: '18px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '4px'}}>{level.title}</div>
                      <div style={{fontSize: '14px', color: 'var(--gray-600)'}}>{level.desc}</div>
                    </div>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: experienceLevel === level.id ? '7px solid var(--orange)' : '2px solid var(--gray-300)',
                      transition: 'border 0.2s'
                    }} />
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {TIME_COMMITMENTS.map((time) => (
                  <div
                    key={time.id}
                    onClick={() => setTimeCommitment(time.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '20px', padding: '24px',
                      background: 'var(--white)', borderRadius: '16px', cursor: 'pointer',
                      border: timeCommitment === time.id ? '2px solid var(--orange)' : '2px solid var(--gray-200)',
                      boxShadow: timeCommitment === time.id ? '0 8px 32px rgba(241,89,32,0.1)' : '0 8px 32px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{fontSize: '32px'}}>{time.icon}</div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: '18px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '4px'}}>{time.title}</div>
                      <div style={{fontSize: '14px', color: 'var(--gray-600)'}}>{time.desc}</div>
                    </div>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: timeCommitment === time.id ? '7px solid var(--orange)' : '2px solid var(--gray-300)',
                      transition: 'border 0.2s'
                    }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '24px', borderTop: '1px solid var(--gray-200)'}}>
            {step > 1 ? (
              <button
                onClick={() => setStep(prev => prev - 1)}
                style={{
                  background: 'transparent', color: 'var(--gray-600)', border: 'none',
                  padding: '10px 0', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gray-900)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-600)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
            ) : <div />}
            
            <button
              onClick={() => handleNextStep()}
              disabled={(step === 1 && !prompt.trim()) || (step === 2 && !experienceLevel) || (step === 3 && !timeCommitment)}
              style={{
                background: ((step === 1 && prompt.trim()) || (step === 2 && experienceLevel) || (step === 3 && timeCommitment)) ? 'var(--gray-900)' : 'var(--gray-300)',
                color: 'white', border: 'none', borderRadius: '10px',
                padding: '12px 24px', fontSize: '15px', fontWeight: 700,
                cursor: ((step === 1 && prompt.trim()) || (step === 2 && experienceLevel) || (step === 3 && timeCommitment)) ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s, transform 0.1s',
              }}
            >
              {step === 3 ? 'Generate Curriculum' : 'Continue'}
              {step < 3 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>}
              {step === 3 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
            </button>
          </div>
        </div>
      ) : (
        /* Loading State */
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', maxWidth: '480px', textAlign: 'center'}}>
          <div style={{position: 'relative', width: '80px', height: '80px'}}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--orange), var(--orange-bg), var(--orange))',
              animation: 'spin 1.5s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '6px', borderRadius: '50%',
              background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
            <div style={{fontSize: '16px', color: 'var(--orange)', fontWeight: 500, minHeight: '24px', transition: 'opacity 0.3s'}}>
              {LOADING_STEPS[loadingStep]}
            </div>
          </div>
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
            Target: {experienceLevel} • Pace: {timeCommitment}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </main>
  );
}

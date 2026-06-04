'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { completeContent } from '../actions/gamification';

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(1);

  const totalQ = 5;
  const question = "What is the primary goal of market research?";
  const options = [
    { id: 1, text: "To sell more products immediately", correct: false },
    { id: 2, text: "To determine the viability of a new service or product", correct: true },
    { id: 3, text: "To fire underperforming employees", correct: false },
    { id: 4, text: "To design a new company logo", correct: false }
  ];

  const handleSelect = (id: number) => {
    if (submitted) return;
    setSelected(id);
  };

  const handleSubmit = async () => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    
    // Call Server Action
    const res = await completeContent(`quiz-${currentQ}`, 'QUIZ');
    if (res.success && res.xpEarned > 0) {
      window.dispatchEvent(new CustomEvent('show-xp-toast', { detail: { xp: res.xpEarned } }));
    }
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="quiz-type-tag" style={{ background: '#f5f5f5', color: '#333', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          QUIZ
        </div>
        <span className="pdf-breadcrumb">Market Research · {totalQ} questions</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1/map">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="quiz-main-area" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div className="quiz-card" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '40px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div className="quiz-progress" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <span className="q-count" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-600)' }}>Question {currentQ} of {totalQ}</span>
            <div className="q-progress-bar" style={{ flex: 1, margin: '0 24px', height: '6px', background: 'var(--gray-100)', borderRadius: '3px', overflow: 'hidden' }}>
              <div className="q-progress-fill" style={{ width: `${(currentQ / totalQ) * 100}%`, height: '100%', background: 'var(--orange)', borderRadius: '3px' }}></div>
            </div>
          </div>
          
          <h2 className="quiz-question" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '32px', lineHeight: 1.5 }}>
            {question}
          </h2>

          <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {options.map(opt => {
              let optClass = 'quiz-option';
              let optStyle: React.CSSProperties = {
                padding: '16px 24px',
                border: '1px solid var(--gray-200)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--gray-800)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s',
                background: 'var(--white)'
              };

              if (selected === opt.id) {
                optStyle.border = '2px solid var(--orange)';
                optStyle.background = '#fffaf5';
              }

              if (submitted) {
                optStyle.cursor = 'default';
                if (opt.correct) {
                  optStyle.border = '2px solid #22c55e';
                  optStyle.background = '#f0fdf4';
                } else if (selected === opt.id && !opt.correct) {
                  optStyle.border = '2px solid #ef4444';
                  optStyle.background = '#fef2f2';
                } else {
                  optStyle.opacity = 0.5;
                }
              }

              return (
                <div key={opt.id} className={optClass} style={optStyle} onClick={() => handleSelect(opt.id)}>
                  <div className="q-radio" style={{ 
                    width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--gray-300)', flexShrink: 0,
                    background: (submitted && opt.correct) ? '#22c55e' : (submitted && selected === opt.id && !opt.correct) ? '#ef4444' : (selected === opt.id) ? 'var(--orange)' : 'transparent',
                    borderColor: (submitted && opt.correct) ? '#22c55e' : (submitted && selected === opt.id && !opt.correct) ? '#ef4444' : (selected === opt.id) ? 'var(--orange)' : 'var(--gray-300)'
                  }}></div>
                  <span>{opt.text}</span>
                  {submitted && opt.correct && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', color: '#22c55e' }}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {submitted && selected === opt.id && !opt.correct && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', color: '#ef4444' }}><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!submitted ? (
              <button 
                onClick={handleSubmit} 
                disabled={selected === null}
                style={{ 
                  background: selected === null ? 'var(--gray-200)' : 'var(--orange)', 
                  color: selected === null ? 'var(--gray-500)' : 'var(--white)', 
                  padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: selected === null ? 'not-allowed' : 'pointer' 
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (currentQ < totalQ) {
                    setCurrentQ(currentQ + 1);
                    setSelected(null);
                    setSubmitted(false);
                  }
                }}
                style={{ background: 'var(--gray-900)', color: 'var(--white)', padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
              >
                {currentQ < totalQ ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function FlashcardsPage() {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { front: "What is Market Segmentation?", back: "The process of dividing a broad consumer or business market, normally consisting of existing and potential customers, into sub-groups of consumers based on some type of shared characteristics." },
    { front: "What is a Buyer Persona?", back: "A semi-fictional representation of your ideal customer based on market research and real data about your existing customers." },
    { front: "What is Primary Research?", back: "Research you conduct yourself (or hire someone to do for you). It involves going directly to a source to ask questions and gather information." }
  ];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
    }
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="flashcards-type-tag" style={{ background: '#f5f5f5', color: '#333', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          FLASHCARDS
        </div>
        <span className="pdf-breadcrumb">Market Research · {cards.length} cards</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1/map">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="flashcard-main-area" style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Flashcards</h2>
          <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Card {currentIndex + 1} of {cards.length}</span>
        </div>

        {/* 3D Flip Card Container */}
        <div 
          style={{ 
            width: '100%', maxWidth: '600px', height: '400px', perspective: '1000px', cursor: 'pointer', marginBottom: '32px' 
          }}
          onClick={() => setFlipped(!flipped)}
        >
          <div 
            style={{ 
              width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s', transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
            }}
          >
            {/* Front */}
            <div style={{ 
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
              background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '24px', padding: '40px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
            }}>
              <span style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '12px', fontWeight: 600, color: 'var(--gray-400)' }}>FRONT</span>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--gray-900)' }}>{cards[currentIndex].front}</h3>
              <p style={{ position: 'absolute', bottom: '24px', fontSize: '13px', color: 'var(--orange)' }}>Click to reveal answer</p>
            </div>
            
            {/* Back */}
            <div style={{ 
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
              background: '#fffaf5', border: '1px solid var(--orange-muted)', borderRadius: '24px', padding: '40px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
              transform: 'rotateY(180deg)', boxShadow: '0 8px 32px rgba(241, 89, 32, 0.1)'
            }}>
              <span style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '12px', fontWeight: 600, color: 'var(--orange-muted)' }}>BACK</span>
              <p style={{ fontSize: '18px', fontWeight: 500, color: 'var(--gray-800)', lineHeight: 1.6 }}>{cards[currentIndex].back}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            style={{ 
              width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--gray-200)', background: 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {cards.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === currentIndex ? 'var(--orange)' : 'var(--gray-200)' }}></div>
            ))}
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentIndex === cards.length - 1}
            style={{ 
              width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--gray-200)', background: 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentIndex === cards.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === cards.length - 1 ? 0.5 : 1
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </main>
  );
}

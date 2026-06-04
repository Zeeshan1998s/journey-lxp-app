
'use client';
import React, { useState } from 'react';
import { useJourney } from '../../contexts/JourneyContext';

export default function ExpandedArtifactView() {
  const { activeArtifact, selectedNode, setIsExpanded } = useJourney();

  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);

  const title = activeArtifact === 'videos' ? 'Videos' :
                activeArtifact === 'articles' ? 'Articles' :
                activeArtifact === 'pdfs' ? 'PDFs' :
                activeArtifact === 'course' ? 'Course' :
                activeArtifact === 'flashcards' ? 'Flashcards' :
                activeArtifact === 'faq' ? 'FAQ' :
                activeArtifact === 'quiz' ? 'Quizzes (MCQ)' :
                activeArtifact?.toUpperCase();

  const getTag = () => {
    let icon;
    let label = activeArtifact?.toUpperCase();
    
    if (activeArtifact === 'videos') {
      icon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
      label = 'VIDEO';
    } else if (activeArtifact === 'articles') {
      icon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
      label = 'ARTICLES';
    } else if (activeArtifact === 'flashcards') {
      icon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
      label = 'CARDS';
    } else if (activeArtifact === 'quiz') {
      icon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
      label = 'QUIZ';
    } else {
      icon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

    return (
      <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--orange-bg)', color: 'var(--orange)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
        {icon}
        {label}
      </span>
    );
  };

  const renderArticlesList = () => (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <span style={{fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)'}}>{title}</span>
        <span style={{fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500}}>8/8</span>
      </div>

      <div style={{marginBottom: '24px', position: 'relative'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{position: 'absolute', left: '16px', top: '14px', color: 'var(--gray-400)'}}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <input type="text" placeholder="Search documents" style={{width: '100%', padding: '14px 16px 14px 44px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '13px', background: 'var(--white)', outline: 'none'}} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '80px'}}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', transition: 'box-shadow 0.15s'}}>
            <div style={{flex: 1}}>
              <div style={{display: 'inline-block', background: '#ffe4e6', color: '#f43f5e', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '12px', marginBottom: '12px', letterSpacing: '0.02em'}}>Category</div>
              <div style={{fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px'}}>The Complete Guide to Market Research in 2024</div>
              <div style={{fontSize: '13px', color: 'var(--gray-600)', lineHeight: '20px', marginBottom: '12px'}}>Lorem ipsum dolor sit amet consectetur. Pulvinar in cursus aliquet cursus facilisis arcu maecenas gravida. Semper facilisi risus ut metus dolor vitae ultrices. At mi ut natoque morbi id consectetur.</div>
              <div style={{fontSize: '12px', color: 'var(--gray-400)', fontWeight: 500}}>4 p · 1.2 MB · Mar 28</div>
            </div>
            <div style={{width: '20px', height: '20px', border: '1.5px solid var(--gray-300)', borderRadius: '4px', flexShrink: 0, marginTop: '4px'}}></div>
          </div>
        ))}
      </div>
    </>
  );

  const renderFlashcards = () => (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
        <span style={{fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)'}}>{title}</span>
        <span style={{fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500}}>18 cards · 6 due</span>
      </div>

      <div style={{maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '80px'}}>
        <div style={{fontSize: '13px', color: 'var(--gray-500)', marginBottom: '16px'}}>Click card to reveal answer</div>
        
        <div 
          onClick={() => setFlashcardFlipped(!flashcardFlipped)}
          style={{
            width: '100%', 
            minHeight: '260px',
            background: 'var(--white)',
            border: '2px solid var(--orange)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(241, 89, 32, 0.08)',
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)', margin: flashcardFlipped ? '0 0 16px 0' : '0'}}>{selectedNode?.data?.label ? `What is the primary goal of ${selectedNode.data.label.toLowerCase()}?` : 'What is the primary goal of market research?'}</h3>
          {flashcardFlipped && (
            <p style={{fontSize: '15px', color: 'var(--gray-600)', lineHeight: '24px', maxWidth: '600px'}}>To gather information about consumers, competitors, and market trends to inform business decisions.</p>
          )}
        </div>

        <div style={{fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500, marginBottom: '24px'}}>1 of 5</div>

        <div style={{display: 'flex', gap: '16px', width: '100%'}}>
          <button 
            onClick={() => setFlashcardFlipped(false)}
            style={{flex: 1, padding: '16px', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/></svg> Prev
          </button>
          <button 
            onClick={() => setFlashcardFlipped(false)}
            style={{flex: 1, padding: '16px', background: 'var(--orange-muted)', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'}}
          >
            Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </>
  );

  const renderQuiz = () => (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
        <span style={{fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)'}}>{title}</span>
        <span style={{fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500}}>8/8</span>
      </div>

      <div style={{maxWidth: '800px', margin: '0 auto', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '40px', textAlign: 'center'}}>1. Which is a primary research method?</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginBottom: '48px'}}>
          {['A', 'B', 'C', 'D'].map((letter) => (
            <div 
              key={letter}
              onClick={() => setSelectedQuizOption(letter)}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', 
                background: 'var(--white)', 
                border: selectedQuizOption === letter ? '2px solid var(--orange)' : '1px solid var(--border)', 
                borderRadius: '12px', cursor: 'pointer',
                boxShadow: selectedQuizOption === letter ? '0 4px 12px rgba(241, 89, 32, 0.08)' : 'none'
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', 
                background: selectedQuizOption === letter ? 'var(--orange-bg)' : 'var(--gray-50)', 
                color: selectedQuizOption === letter ? 'var(--orange)' : 'var(--gray-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '14px', fontWeight: 700, border: selectedQuizOption === letter ? '1px solid var(--orange)' : '1px solid var(--gray-200)'
              }}>
                {letter}
              </div>
              <span style={{fontSize: '14px', fontWeight: 600, color: 'var(--gray-800)'}}>{selectedNode?.data?.label || 'Vision Strategy'} Overview</span>
            </div>
          ))}
        </div>

        <button style={{padding: '16px 40px', background: 'var(--orange-muted)', color: 'var(--white)', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', minWidth: '400px', justifyContent: 'center'}}>
          Submit & Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </>
  );

  const renderDefaultList = () => (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <span style={{fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)'}}>{title}</span>
        <span style={{fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500}}>8/8</span>
      </div>

      <div style={{marginBottom: '24px', position: 'relative'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{position: 'absolute', left: '16px', top: '14px', color: 'var(--gray-400)'}}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <input type="text" placeholder="Search documents" style={{width: '100%', padding: '14px 16px 14px 44px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '13px', background: 'var(--white)', outline: 'none'}} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '80px'}}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', transition: 'box-shadow 0.15s'}}>
            <div style={{width: '42px', height: '42px', background: activeArtifact === 'pdfs' ? '#fef2f2' : activeArtifact === 'videos' ? '#111' : 'var(--gray-100)', color: activeArtifact === 'pdfs' ? '#ef4444' : activeArtifact === 'videos' ? '#fff' : 'var(--gray-700)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, position: 'relative', flexShrink: 0}}>
              {activeArtifact === 'pdfs' ? 'PDF' : activeArtifact === 'videos' ? <><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg><span style={{position: 'absolute', bottom: '2px', right: '4px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '8px', padding: '1px 3px', borderRadius: '2px'}}>6:10</span></> : title?.substring(0, 3).toUpperCase()}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '4px'}}>{selectedNode?.data?.label || 'Vision Strategy'} Overview</div>
              <div style={{fontSize: '12px', color: 'var(--gray-500)'}}>4 p · 1.2 MB · Mar 28</div>
            </div>
            {i === 1 ? (
              <div style={{width: '20px', height: '20px', background: '#10b981', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            ) : (
              <div style={{width: '20px', height: '20px', border: '1.5px solid var(--gray-300)', borderRadius: '4px'}}></div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={{position: 'absolute', top: '113px', left: 0, right: 0, bottom: 0, zIndex: 20, background: 'var(--white)', display: 'flex', flexDirection: 'column'}}>
      {/* TOOLBAR */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: 'var(--white)', borderBottom: '1px solid var(--border)', flexShrink: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          {getTag()}
          <span style={{fontSize: '13px', color: 'var(--gray-700)'}}>{selectedNode?.data?.label || 'Market Research'} · {activeArtifact === 'flashcards' ? '18 cards · 6 due' : activeArtifact === 'quiz' ? '5 questions' : '8 ' + title?.toLowerCase()}</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <button className="btn-outline" style={{padding: '6px 12px', fontSize: '11px', color: 'var(--gray-600)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate
          </button>
          <button className="btn-outline" onClick={() => setIsExpanded(false)} style={{padding: '6px 12px', fontSize: '11px', color: 'var(--gray-600)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to view
          </button>
          <button className="icon-btn" onClick={() => setIsExpanded(false)} style={{width: '28px', height: '28px', border: '1px solid var(--border)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div style={{flex: 1, overflowY: 'auto', padding: '32px 24px', background: 'var(--white)'}}>
        <div style={{position: 'relative'}}>
          {activeArtifact === 'articles' ? renderArticlesList() :
           activeArtifact === 'flashcards' ? renderFlashcards() :
           activeArtifact === 'quiz' ? renderQuiz() :
           renderDefaultList()}
        </div>
      </div>

      {/* STICKY BOTTOM BAR */}
      <div style={{position: 'absolute', bottom: '24px', right: '32px', zIndex: 30}}>
        <button style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg> Mark as Complete
        </button>
      </div>

    </div>
  );
}

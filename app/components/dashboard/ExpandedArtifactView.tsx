'use client';
import React from 'react';
import { useJourney } from '../../contexts/JourneyContext';

export default function ExpandedArtifactView() {
  const { activeArtifact, selectedNode, setIsExpanded } = useJourney();

  const title = activeArtifact === 'videos' ? 'Videos' :
                activeArtifact === 'articles' ? 'Articles' :
                activeArtifact === 'pdfs' ? 'PDFs' :
                activeArtifact?.toUpperCase();

  const getTag = () => {
    if (activeArtifact === 'videos') {
      return (
        <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--orange-bg)', color: 'var(--orange)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          VIDEO
        </span>
      );
    }
    if (activeArtifact === 'pdfs') {
      return (
        <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#fef2f2', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          PDFs
        </span>
      );
    }
    return (
      <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-100)', color: 'var(--gray-800)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {title}
      </span>
    );
  };

  return (
    <div style={{position: 'absolute', top: '81px', left: 0, right: 0, bottom: 0, zIndex: 20, background: 'var(--gray-50)', display: 'flex', flexDirection: 'column'}}>
      {/* TOOLBAR */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: 'var(--white)', borderBottom: '1px solid var(--border)', flexShrink: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          {getTag()}
          <span style={{fontSize: '13px', color: 'var(--gray-700)'}}>{selectedNode?.data?.label || 'Market Research'} · 8 {title}</span>
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

      {/* CONTENT LIST */}
      <div style={{flex: 1, overflowY: 'auto', padding: '32px 0'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', background: 'var(--gray-50)', position: 'relative'}}>
          
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
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', transition: 'box-shadow 0.15s'}} className="video-item">
                <div style={{width: '42px', height: '42px', background: activeArtifact === 'pdfs' ? '#fef2f2' : activeArtifact === 'videos' ? '#111' : '#f3f4f6', color: activeArtifact === 'pdfs' ? '#ef4444' : '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, position: 'relative', flexShrink: 0}}>
                  {activeArtifact === 'pdfs' ? 'PDF' : activeArtifact === 'videos' ? <><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg><span style={{position: 'absolute', bottom: '2px', right: '4px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '8px', padding: '1px 3px', borderRadius: '2px'}}>6:10</span></> : 'DOC'}
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

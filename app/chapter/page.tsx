'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useJourney } from '../contexts/JourneyContext';

export default function ChapterPage() {
  const { selectedNode, generatedJourney, artifactCache, setArtifactCache } = useJourney();
  const topic = selectedNode?.data?.label || generatedJourney?.title || 'Market Research';
  const cacheKey = `chapter_${topic}`;

  const [chapter, setChapter] = useState<any>(artifactCache[cacheKey] || null);
  const [isRegenerating, setIsRegenerating] = useState(!artifactCache[cacheKey]);

  useEffect(() => {
    if (!artifactCache[cacheKey]) {
      handleRegenerate();
    }
  }, [topic, artifactCache, cacheKey]);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, contentType: 'chapter' }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setChapter(data.data);
        setArtifactCache(prev => ({ ...prev, [cacheKey]: data.data }));
      }
    } catch (err) {
      console.error('Regenerate failed:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="chapter-type-tag" style={{ background: '#fff0e5', color: 'var(--orange)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          CHAPTER
        </div>
        <span className="pdf-breadcrumb">{topic} · {chapter?.readTime || '15 min'}</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text" onClick={handleRegenerate} disabled={isRegenerating} style={{opacity: isRegenerating ? 0.7 : 1}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{animation: isRegenerating ? 'spin 1s linear infinite' : 'none'}}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isRegenerating ? 'Generating...' : 'Regenerate'}
          </button>
          <Link href="/journey/1/map">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="chapter-main-area" style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        {isRegenerating && !chapter ? (
          <div style={{padding: '32px', textAlign: 'center', color: 'var(--orange)', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 1s linear infinite'}}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg>
            AI is writing the chapter on "{topic}"...
          </div>
        ) : chapter ? (
          <div className="chapter-content" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 className="chapter-heading" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '32px', letterSpacing: '-0.02em' }}>{chapter.title}</h1>
            
            {chapter.sections?.map((section: any, idx: number) => (
              <div key={idx} style={{ marginBottom: '32px' }}>
                <h2 className="chapter-heading" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.01em' }}>{section.heading}</h2>
                <p className="chapter-text" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--gray-700)' }}>{section.content}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mark-complete-bar">
        <button className="mark-complete-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Mark as Complete
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
    </main>
  );
}

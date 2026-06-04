'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useJourney } from '../contexts/JourneyContext';
import { completeContent } from '../actions/gamification';

export default function VideosPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<number[]>([]);
  const { completedNodes, setCompletedNodes, xp, setXp, gems, setGems, quests, setQuests } = useJourney();

  const videos = [
    { id: 1, title: 'Introduction to Core Concepts', author: 'Starweaver Academy', duration: '5:30' },
    { id: 2, title: 'Advanced Methodologies', author: 'Starweaver Academy', duration: '15:20' },
    { id: 3, title: 'Practical Application', author: 'Starweaver Academy', duration: '22:15' }
  ];

  const filtered = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const toggleComplete = async (id: number) => {
    if (completed.includes(id)) return; // Don't uncheck or award XP twice
    
    // Optimistic UI update
    setCompleted(prev => [...prev, id]);

    // Call Server Action
    const res = await completeContent(`video-${id}`, 'VIDEO');
    if (res.success && res.xpEarned > 0) {
      window.dispatchEvent(new CustomEvent('show-xp-toast', { detail: { xp: res.xpEarned } }));
      setXp(prev => prev + res.xpEarned);
    }
  };

  const handleMarkComplete = () => {
    setCompleted(videos.map(v => v.id));
    
    // Hardcode topic completion for now since Videos doesn't parse ?topic= yet
    const topic = 'Market Research'; // To tie back to dashboard map
    if (!completedNodes.includes(topic)) {
      setCompletedNodes(prev => [...prev, topic]);
    }
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="videos-type-tag" style={{ background: '#fff0e5', color: 'var(--orange)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          VIDEOS
        </div>
        <span className="pdf-breadcrumb">Market Research · {videos.length} videos</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1/map">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="pdf-content-area" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div className="pdf-count-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 className="pdf-section-title" style={{ fontSize: '20px', fontWeight: 600 }}>Journey Videos</h2>
          <span className="pdf-count" style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{completed.length} / {videos.length}</span>
        </div>
        <div className="pdf-search" style={{ position: 'relative', marginBottom: '24px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input 
            type="text" 
            placeholder="Search journey videos" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 36px', border: '1px solid var(--gray-200)', borderRadius: '8px' }} 
          />
        </div>
        <div className="video-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(video => (
            <div key={video.id} className="video-item" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--gray-200)', borderRadius: '12px', background: 'var(--white)' }}>
              <div className="video-thumb" style={{ width: '72px', height: '54px', borderRadius: '6px', background: '#111', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=72&h=54&fit=crop" alt="thumb" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7}} />
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: 'var(--white)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </div>
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '9px', padding: '2px 4px', borderRadius: '4px', fontWeight: 600 }}>{video.duration}</div>
              </div>
              <div className="video-info" style={{ flex: 1 }}>
                <h3 className="video-title" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{video.title}</h3>
                <p className="video-author" style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{video.author}</p>
              </div>
              <div 
                className={`radio-circle ${completed.includes(video.id) ? 'checked' : ''}`} 
                onClick={() => toggleComplete(video.id)}
                style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--gray-300)', cursor: 'pointer', background: completed.includes(video.id) ? 'var(--orange)' : 'transparent', flexShrink: 0 }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mark-complete-bar">
        <button className="mark-complete-btn" onClick={handleMarkComplete}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Mark as Complete
        </button>
      </div>
    </main>
  );
}

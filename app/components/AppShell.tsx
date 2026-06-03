'use client';
import { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import XpToast from './XpToast';
import { usePathname } from 'next/navigation';
import { useJourney } from '../contexts/JourneyContext';

export default function AppShell({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();
  const { selectedNode, activeArtifact, setActiveArtifact, isExpanded, setIsExpanded } = useJourney();
  const isSlim = pathname !== '/';
  const isLogin = pathname === '/login';
  const isProfile = pathname === '/profile';

  if (isLogin || isProfile) {
    return <>{children}</>;
  }

  const showRightSidebar = pathname !== '/' || selectedNode !== null;

  return (
    <div className={isSlim ? 'app-shell-pdf' : 'app-shell'}>
      <XpToast />
      <LeftSidebar user={initialUser} />
      {children}
      {showRightSidebar && (
        <RightSidebar 
          onOpenChat={() => setChatOpen(!chatOpen)}
        />
      )}

      {/* Artifact Modal Overlay */}
      {activeArtifact && (
        <div className={`videos-overlay-modal ${isExpanded ? 'expanded' : ''}`} style={isExpanded ? {position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1000, margin: 0, borderRadius: 0, top: 0, right: 0} : {}}>
          <div className="videos-overlay-header">
            <div className="videos-overlay-title">
              <span className="videos-overlay-title-text" style={{color: 'var(--orange)', textTransform: 'uppercase'}}>{activeArtifact}</span>
              <span className="videos-overlay-title-text">{selectedNode?.data?.label || 'Market Research'} · Content</span>
            </div>
            <div className="videos-overlay-actions">
              <button className="btn-text" onClick={() => setIsExpanded(!isExpanded)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg> {isExpanded ? 'Collapse' : 'Expand'}
              </button>
              <button className="icon-btn" onClick={() => { setActiveArtifact(null); setIsExpanded(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div className="videos-overlay-list" style={isExpanded ? {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px'} : {}}>
            <div className="videos-overlay-top" style={isExpanded ? {gridColumn: '1 / -1'} : {}}>
              <span className="videos-overlay-list-title">{activeArtifact} Content</span>
            </div>
            <div className="videos-overlay-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input type="text" placeholder="Search a specific class" />
            </div>
            <div className="videos-modal-item">
              <div className="videos-modal-item-thumb"></div>
              <div className="videos-modal-item-info">
                <div className="videos-modal-item-title">Market Research Fundamentals</div>
                <div className="videos-modal-item-sub">Starweaver Academy</div>
              </div>
              <div className="radio-circle"></div>
            </div>
            <div className="videos-modal-item">
              <div className="videos-modal-item-thumb"></div>
              <div className="videos-modal-item-info">
                <div className="videos-modal-item-title">Market Research Fundamentals</div>
                <div className="videos-modal-item-sub">Starweaver Academy</div>
              </div>
              <div className="radio-circle"></div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Overlay */}
      {chatOpen && (
        <div className="ai-chat-overlay">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.25 15.25l.4 1.4a2 2 0 001.373 1.373l1.4.4-1.4.4a2 2 0 00-1.373 1.373l-.4 1.4-.4-1.4a2 2 0 00-1.373-1.373l-1.4-.4 1.4-.4a2 2 0 001.373-1.373l.4-1.4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Journey AI
            </div>
            <button className="icon-btn" onClick={() => setChatOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="ai-chat-messages">
            <div className="ai-msg">Hey there! Got any questions about Market Research?</div>
            <div className="user-msg">Can you explain Market Segmentation?</div>
            <div className="ai-msg">Market segmentation is the process of dividing a broad consumer or business market into sub-groups of consumers based on some type of shared characteristics.</div>
          </div>
          <div className="ai-chat-input-area">
            <input type="text" placeholder="Ask Journey AI..." />
            <button><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
        </div>
      )}
    </div>
  );
}

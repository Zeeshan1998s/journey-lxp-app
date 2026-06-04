'use client';
import { useState } from 'react';
import TopNavbar from './TopNavbar';
import RightSidebar from './RightSidebar';
import XpToast from './XpToast';
import { usePathname } from 'next/navigation';
import { useJourney } from '../contexts/JourneyContext';

export default function AppShell({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();
  const { selectedNode } = useJourney();

  const isLogin = pathname === '/login';
  const isProfile = pathname === '/profile';
  const isMapPage = pathname.startsWith('/journey');

  if (isLogin || isProfile) {
    return <>{children}</>;
  }

  // Only show the right sidebar on the journey map page when a node is selected
  const showRightSidebar = isMapPage && selectedNode !== null;

  return (
    <div className="app-shell">
      <XpToast />
      <TopNavbar user={initialUser} />
      <div className="main-content-row">
        {children}
        {showRightSidebar && (
          <RightSidebar 
            onOpenChat={() => setChatOpen(!chatOpen)}
          />
        )}
      </div>

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

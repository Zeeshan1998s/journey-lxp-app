'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSidebar({ user }: { user: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we should use the slim sidebar based on path
  const isSlim = pathname !== '/';

  if (isSlim) {
    return (
      <aside className="left-sidebar-slim">
        <div className="slim-top">
          <div className="slim-logo-icon" onClick={() => window.location.href='/'} style={{cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="14" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="1" y="14" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="14" y="14" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          </div>
          <nav className="slim-nav">
            <button className="slim-nav-btn active" title="Text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="slim-nav-btn" title="Voice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 19V6l12-3v13M9 19c0 1.1-1.343 2-3 2s-3-.9-3-2 1.343-2 3-2 3 .9 3 2zm12-3c0 1.1-1.343 2-3 2s-3-.9-3-2 1.343-2 3-2 3 .9 3 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="slim-nav-btn" title="Featured">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="slim-nav-btn" title="History">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </nav>
        </div>
        <div className="slim-bottom">
          <div className="slim-user-avatar">Ze</div>
          <div className="slim-bottom-actions">
            <button className="slim-action-btn" title="Feedback"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="slim-action-btn" title="Help"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="left-sidebar" id="left-sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo">
            <span className="logo-dot">•</span><strong>Journey</strong><span className="logo-light">builder</span>
          </div>
          <button className="icon-btn sidebar-grid-btn" title="Toggle layout" id="sidebar-toggle-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="6" height="6" rx="1" stroke="#555" strokeWidth="1.5"/>
              <rect x="9" y="1" width="6" height="6" rx="1" stroke="#555" strokeWidth="1.5"/>
              <rect x="1" y="9" width="6" height="6" rx="1" stroke="#555" strokeWidth="1.5"/>
              <rect x="9" y="9" width="6" height="6" rx="1" stroke="#555" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav" id="sidebar-nav">
          <Link href="/" className="nav-item active">
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Text</span>
          </Link>
          <a href="#" className="nav-item">
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Voice</span>
          </a>
          <a href="#" className="nav-item">
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Featured</span>
          </a>
          <a href="#" className="nav-item">
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Conversation</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-bottom" style={{position: 'relative'}}>
        {/* User Menu Popup */}
        {menuOpen && (
          <div className="user-menu-popup">
            <div className="user-menu-group">
              <div className="user-menu-stat-row"><span>Points</span><span className="val">{user?.xp || 0} XP</span></div>
              <div className="user-menu-divider-line"><div className="fill" style={{width: `${Math.min(((user?.xp || 0) % 100), 100)}%`}}></div></div>
              <div className="user-menu-stat-row"><span>Daily streak</span><span className="val">{user?.streak || 0} 🔥</span></div>
              <div className="user-menu-divider-line"><div className="fill" style={{width: `${Math.min(((user?.streak || 0) * 10), 100)}%`}}></div></div>
            </div>
            <div className="user-menu-group">
              <div className="user-menu-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Profile
              </div>
              <div className="user-menu-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Settings
              </div>
              <div className="user-menu-item disabled">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.092 2.019-.273 3m-1.54 3.093c-.496.7-1.066 1.348-1.7 1.932" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Creator Mode
              </div>
            </div>
            <div className="user-menu-group" style={{borderBottom: 'none'}}>
              <div className="user-menu-item logout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Logout
              </div>
            </div>
          </div>
        )}

        <div className="user-card" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="user-avatar">Ze</div>
          <span className="user-name">Zeeshan</span>
          <svg className="user-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="sidebar-actions">
          <button className="sidebar-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Feedback</span>
          </button>
          <button className="sidebar-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Help/Tips</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

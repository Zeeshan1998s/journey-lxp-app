import React from 'react';

export default function StatsBox({ user }: { user: any }) {
  return (
    <div className="stats-box">
      <div className="profile-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="stat-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Lessons solved:</span>
          <span className="stat-value">{user.progress?.length || 0}</span>
        </div>
        <div className="stat-item" style={{ fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Leaderboard rank: <span style={{color: 'var(--gray-900)', fontWeight: 700}}>1</span></span>
        </div>
        <div className="stat-item" style={{ fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Joined: <span style={{color: 'var(--gray-900)', fontWeight: 700}}>Oct 24, 2024</span></span>
        </div>
      </div>
      
      <div className="profile-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="stat-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Karma:</span>
          <span className="stat-value">133</span>
        </div>
        <div className="stat-item" style={{ fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Upvotes: <span style={{color: 'var(--gray-900)', fontWeight: 700}}>0</span></span>
        </div>
        <div className="stat-item" style={{ fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <span style={{ color: 'var(--gray-600)' }}>Thanks received: <span style={{color: 'var(--gray-900)', fontWeight: 700}}>0</span></span>
        </div>
      </div>
    </div>
  );
}

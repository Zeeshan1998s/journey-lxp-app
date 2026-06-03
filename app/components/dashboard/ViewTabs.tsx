import React from 'react';

export default function ViewTabs() {
  return (
    <div className="view-tabs-bar" style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--white)', padding: '0 16px', flexShrink: 0, zIndex: 5}}>
      <button className="view-tab active" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderBottom: '2px solid var(--orange-muted)', background: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: 'var(--orange-muted)', marginBottom: '-1px'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 3h6v6H3zm12 0h6v6h-6zm-6 12h6v6H9zm6 0h6v6h-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Nodes View
      </button>
      <button className="view-tab" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderBottom: '2px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: 'var(--dark)', marginBottom: '-1px'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3v8m-4-4l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Podcast View
      </button>
    </div>
  );
}

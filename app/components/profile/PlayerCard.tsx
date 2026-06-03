import React from 'react';

export default function PlayerCard({ session, level, xp }: { session: any, level: number, xp: number }) {
  return (
    <div className="profile-card player-card">
      <div className="avatar-badge-container">
        {/* Star Badge SVG */}
        <svg className="avatar-badge-svg" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,5 61,35 93,35 68,54 77,85 50,65 23,85 32,54 7,35 39,35" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.png" alt="Avatar" className="avatar-image" />
      </div>
      <div className="player-info">
        <h1 className="player-name">
          {session.user?.name || session.user?.email?.split('@')[0] || 'Guest'}{' '}
          <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
        </h1>
        <p className="player-handle">@{session.user?.email || 'guest'}</p>
        <div className="player-level">
          <span className="level-text">Level {level}</span>
          <span className="xp-text">{xp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  );
}

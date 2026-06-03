import { getUser } from '../actions/gamification';
import '../styles/profile-styles.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = await getUser();
  
  if (!user || !session?.user) return null;
  
  // Calculate Level (e.g. 1 level per 100 XP)
  const level = Math.floor(user.xp / 100) + 1;

  // Generate dummy heatmap data (364 days = 52 weeks * 7 days)
  const heatmapData = Array.from({ length: 364 }, () => {
    const rand = Math.random();
    if (rand > 0.8) return 4;
    if (rand > 0.6) return 3;
    if (rand > 0.4) return 2;
    if (rand > 0.2) return 1;
    return 0;
  });

  return (
    <main className="profile-main">
      <div className="profile-container">
        
        {/* Top Grid */}
        <div className="profile-grid-top">
          {/* Player Card */}
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
              <h1 className="player-name">{session.user.name || session.user.email?.split('@')[0] || 'Guest'} <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></h1>
              <p className="player-handle">@{session.user.email || 'guest'}</p>
              <div className="player-level">
                <span className="level-text">Level {level}</span>
                <span className="xp-text">{user.xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Social Links Box */}
          <div className="profile-card">
            <div className="links-list">
              <div className="link-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="link-text">India</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div className="link-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                <span className="link-text">Personal site</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div className="link-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                <span className="link-text">Twitter handle</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div className="link-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="link-text">LinkedIn URL</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div className="link-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                <span className="link-text active">@https://github.com/Zeeshan1998s</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="stats-box">
            <div className="profile-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span style={{ color: '#a9b1d6' }}>Lessons solved:</span>
                <span className="stat-value">{user.progress.length}</span>
              </div>
              <div className="stat-item" style={{ fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span style={{ color: '#a9b1d6' }}>Leaderboard rank: <span style={{color: '#fff', fontWeight: 600}}>1</span></span>
              </div>
              <div className="stat-item" style={{ fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style={{ color: '#a9b1d6' }}>Joined: <span style={{color: '#fff', fontWeight: 600}}>Oct 24, 2024</span></span>
              </div>
            </div>
            
            <div className="profile-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="stat-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span style={{ color: '#a9b1d6' }}>Karma:</span>
                <span className="stat-value">133</span>
              </div>
              <div className="stat-item" style={{ fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                <span style={{ color: '#a9b1d6' }}>Upvotes: <span style={{color: '#fff', fontWeight: 600}}>0</span></span>
              </div>
              <div className="stat-item" style={{ fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                <span style={{ color: '#a9b1d6' }}>Thanks received: <span style={{color: '#fff', fontWeight: 600}}>0</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="profile-grid-middle">
          <div className="profile-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#c0caf5', fontSize: '15px' }}>A little something about me</span>
              <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            </div>
          </div>

          {/* Heatmap */}
          <div className="profile-card heatmap-container">
            <div className="heatmap-header">
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '11px', color: '#565f89', paddingBottom: '16px', paddingTop: '4px' }}>
                <span>Mon</span><span>Wed</span><span>Fri</span>
              </div>
              <div className="heatmap-grid">
                {heatmapData.map((level, i) => (
                  <div key={i} className={`heatmap-cell level-${level}`}></div>
                ))}
              </div>
            </div>
            <div className="heatmap-footer">
              Less
              <div className="heatmap-legend">
                <div className="heatmap-cell"></div>
                <div className="heatmap-cell level-1"></div>
                <div className="heatmap-cell level-2"></div>
                <div className="heatmap-cell level-3"></div>
                <div className="heatmap-cell level-4"></div>
              </div>
              More
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <h2 className="section-heading">Achievements</h2>
        <div className="achievements-grid">
          <div className="profile-card achievement-card">
            <div className="achievement-badge" style={{ color: '#7aa2f7' }}>
              <svg viewBox="0 0 100 100" fill="currentColor">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                <circle cx="50" cy="50" r="20" fill="#fff" />
              </svg>
            </div>
            <div className="achievement-info">
              <div className="achievement-title">Diamond: <span>Milestone</span></div>
              <div className="achievement-desc">Complete 240 exercises</div>
              <div className="achievement-date">Apr 29, 2026</div>
            </div>
          </div>

          <div className="profile-card achievement-card">
            <div className="achievement-badge" style={{ color: '#e0af68' }}>
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="25" fill="#f7768e" />
              </svg>
            </div>
            <div className="achievement-info">
              <div className="achievement-title">Gold: <span>Sharpshooter</span></div>
              <div className="achievement-desc">Complete 6 sharpshooter sprees</div>
              <div className="achievement-date">Apr 27, 2026</div>
            </div>
          </div>

          <div className="profile-card achievement-card">
            <div className="achievement-badge" style={{ color: '#bb9af7' }}>
              <svg viewBox="0 0 100 100" fill="currentColor">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                <rect x="40" y="40" width="20" height="30" fill="#fff" />
              </svg>
            </div>
            <div className="achievement-info">
              <div className="achievement-title">Bronze: <span>Fellowship</span></div>
              <div className="achievement-desc">Earn 1 karma in the discord</div>
              <div className="achievement-date">Jun 3, 2026</div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <h2 className="section-heading">2 Courses Completed</h2>
        <div className="courses-grid">
          <div className="course-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/course.png" alt="Course Background" className="course-bg" />
            <div className="course-overlay">
              <h3 className="course-title">Learn Market Research</h3>
              <p className="course-date">Apr 29, 2026</p>
            </div>
          </div>
          
          <div className="course-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/course.png" alt="Course Background" className="course-bg" />
            <div className="course-overlay">
              <h3 className="course-title">Consumer Behavior</h3>
              <p className="course-date">May 19, 2026</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <h2 className="section-heading">1 Projects Completed</h2>
        <div className="courses-grid">
          <div className="course-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/course.png" alt="Course Background" className="course-bg" />
            <div className="course-overlay">
              <h3 className="course-title">Build a Persona Dashboard</h3>
              <p className="course-date">May 1, 2026</p>
            </div>
          </div>
        </div>
        
        <div style={{ height: '40px' }}></div>
      </div>
    </main>
  );
}

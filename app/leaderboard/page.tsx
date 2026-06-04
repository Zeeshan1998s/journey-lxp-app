'use client';
import { useJourney } from '../contexts/JourneyContext';
import Link from 'next/link';

export default function LeaderboardPage() {
  const { xp } = useJourney();
  const calcLevel = (xp: number) => Math.floor(xp / 1000) + 1;
  const xpInLevel = xp % 1000;
  const levelProgress = (xpInLevel / 1000) * 100;

  const topDaily = [
    { rank: 1, name: 'Alexander', xp: '1,365 xp', avatar: 'a1' },
    { rank: 2, name: 'Jason', xp: '1,087 xp', avatar: 'a2' },
    { rank: 3, name: 'Michael', xp: '719 xp', avatar: 'a3' },
    { rank: 4, name: 'Eric', xp: '344 xp', avatar: 'a4' },
    { rank: 5, name: 'Tiago', xp: '286 xp', avatar: 'a5' },
    { rank: 6, name: 'Sean', xp: '253 xp', avatar: 's1' },
  ];

  const topLeague = [
    { rank: 1, name: 'Alexander', xp: '55,309 xp', avatar: 'a1' },
    { rank: 2, name: 'Michael', xp: '46,420 xp', avatar: 'a3' },
    { rank: 3, name: 'Jason', xp: '46,275 xp', avatar: 'a2' },
    { rank: 4, name: 'Sean', xp: '27,568 xp', avatar: 's1' },
    { rank: 5, name: 'Auro', xp: '14,287 xp', avatar: 'a5' },
    { rank: 6, name: 'Gregory', xp: '10,022 xp', avatar: 'a6' },
    { rank: 7, name: 'Danish', xp: '9,436 xp', avatar: 'a7' },
    { rank: 8, name: 'Tyler', xp: '8,478 xp', avatar: 'a8' },
    { rank: 9, name: 'Eric', xp: '7,824 xp', avatar: 'a4' },
    { rank: 10, name: 'Zeeshan', xp: '6,571 xp', avatar: 'me', highlight: true },
    { rank: 11, name: 'Psh', xp: '5,214 xp', avatar: 'a9' },
    { rank: 12, name: 'Marcel', xp: '5,205 xp', avatar: 'a10' },
    { rank: 13, name: 'Tiago', xp: '4,632 xp', avatar: 'a11' },
    { rank: 14, name: 'Malcome', xp: '4,082 xp', avatar: 'a12' },
    { rank: 15, name: 'Andres', xp: '3,865 xp', avatar: 'a13' },
  ];

  const archmages = [
    { rank: 1, name: 'Vahe', date: 'Jun 4, 2026', avatar: 'a1' },
    { rank: 2, name: 'Emil', date: 'Jun 4, 2026', avatar: 'a2' },
    { rank: 3, name: 'Rafael', date: 'Jun 4, 2026', avatar: 'a3' },
    { rank: 4, name: 'Fiona', date: 'Jun 3, 2026', avatar: 'a4' },
    { rank: 5, name: 'Matthieu', date: 'Jun 3, 2026', avatar: 'a5' },
    { rank: 6, name: 'Rhys', date: 'Jun 3, 2026', avatar: 'a6' },
    { rank: 7, name: 'Ilya', date: 'Jun 3, 2026', avatar: 'a7' },
    { rank: 8, name: 'Jolric', date: 'Jun 2, 2026', avatar: 'a8' },
    { rank: 9, name: 'Shashank', date: 'Jun 2, 2026', avatar: 'a9' },
    { rank: 10, name: 'Joost', date: 'Jun 2, 2026', avatar: 'a10' },
  ];

  const activityFeed = [
    { name: '@excitingburn90', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@i2phi', msg: 'completed a lesson on Learn Memory Management in C' },
    { name: '@spotteditem70', msg: 'completed a lesson on Learn Linux' },
    { name: '@marveloustrade28', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@jestertales', msg: 'completed a lesson on Learn Object Oriented Programming' },
    { name: '@everystudio17', msg: 'completed a lesson on Learn Git' },
    { name: '@ybm', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@wilteddrink93', msg: 'completed a lesson on Learn Object Oriented Programming' },
    { name: '@swelteringseries31', msg: 'completed a lesson on Learn Linux' },
    { name: '@matriarch', msg: 'completed a lesson on Learn Go' },
    { name: '@adorablestructure02', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@buoyantstuff29', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@regularsugar91', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@ultramaxipad', msg: 'completed a lesson on Learn Go' },
    { name: '@maaxx888', msg: 'completed a lesson on Learn SQL' },
    { name: '@freshsenior36', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@wiltedwanderer', msg: 'completed a lesson on Learn AWS' },
    { name: '@evenleather97', msg: 'completed a lesson on Learn SQL' },
    { name: '@rowdykey63', msg: 'completed a lesson on Learn to Code in Python' },
    { name: '@rowdykey63', msg: 'completed a lesson on Learn to Code in Python' },
  ];

  return (
    <div style={{ flex: 1, width: '100%', minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER removed to avoid duplicating AppShell */}

      {/* PAGE HEADER */}
      <div style={{ padding: '48px 24px', textAlign: 'center', background: 'linear-gradient(to bottom, #ffffff, #f8fafc)', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', fontFamily: 'serif', marginBottom: '8px' }}>Leaderboard</h1>
        <p style={{ fontSize: '16px', color: '#64748b', fontWeight: 500, marginBottom: '40px' }}>See how you stack up against other learners</p>
        
        {/* STATS GRID */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { label: 'Lessons completed today', val: '96,899', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
            { label: 'XP earned today', val: '15,876,115', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'Chats with Logos today', val: '8,411', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
            { label: 'Solutions peeked today', val: '7,962', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
            { label: 'Karma earned today', val: '3,072', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
            { label: 'All time student count', val: '1,285,661', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', minWidth: '180px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px', lineHeight: 1.2 }}>{stat.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={stat.icon}/></svg>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{stat.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT (SPLIT) */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '40px 24px', gap: '32px' }}>
        
        {/* LEFT PANE (GRIDS) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '48px' }}>
          
          {/* League Section */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>League Leaderboards</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>You are in the <strong style={{ color: '#0f172a' }}>Quartz Griffin League!</strong> League expires in 11 days</p>
            
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Top Daily Learners</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Gain some XP to get on the daily leaderboard</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '40px' }}>
              {topDaily.map((user, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, width: '16px' }}>{user.rank}</div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #e2e8f0' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{user.xp}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Top League Learners</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>You're in position 10 of 25 league members</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {topLeague.map((user, i) => (
                <div key={i} style={{ background: user.highlight ? '#fffbeb' : '#ffffff', border: user.highlight ? '2px solid #f59e0b' : '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: user.highlight ? '0 4px 12px rgba(245, 158, 11, 0.15)' : 'none' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, width: '16px' }}>{user.rank}</div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #cbd5e1', overflow: 'hidden' }}>
                    {user.highlight && <img src="/images/game/rpg_avatar.png" alt="Zeeshan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: user.highlight ? '#b45309' : '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{user.xp}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Archmages Section */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🧙</span> Recent Archmages
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Showing the 30 most recent archmages out of 2461 total</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {archmages.map((user, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, width: '16px' }}>{user.rank}</div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef3c7', border: '2px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👑</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{user.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT PANE (ACTIVITY FEED) */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '80px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 120px)' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
              Live Activity
            </div>
            <div style={{ overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activityFeed.map((activity, i) => (
                <div key={i} style={{ fontSize: '13px', lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{activity.name}</span> <span style={{ color: '#475569' }}>{activity.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

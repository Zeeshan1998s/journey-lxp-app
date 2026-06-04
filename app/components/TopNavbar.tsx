'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function TopNavbar({ user }: { user: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Extract user details or fallback
  const userName = user?.name || user?.email?.split('@')[0] || 'Acolyte';
  const userInitial = userName.substring(0, 2).toUpperCase();

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', zIndex: 50, flexShrink: 0}}>
      {/* Primary Top Nav */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '60px', 
        background: '#0f172a', 
        padding: '0 24px',
        color: '#fff',
        borderBottom: '1px solid #1e293b'
      }}>
        
        {/* Left Side: Logo & Upgrade */}
        <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
          <Link href="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <span style={{color: '#facc15', fontSize: '20px', lineHeight: 1}}>•</span>
            <strong style={{fontSize: '18px', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase'}}>BOOT.DEV</strong>
          </Link>
          <button style={{
            background: 'linear-gradient(180deg, #fde047 0%, #eab308 100%)',
            color: '#422006',
            border: 'none',
            borderRadius: '24px',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Upgrade
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
          {['Dashboard', 'Courses', 'Training', 'Pricing', 'Community', 'Leaderboard'].map((item) => {
            const isActive = item === 'Courses';
            return (
              <Link key={item} href="#" style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                padding: '0 20px',
                color: isActive ? '#fff' : '#94a3b8',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none',
                transition: 'color 0.15s'
              }}>
                {item}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '6px solid #facc15'
                  }}></div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Side: Actions & Profile */}
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', position: 'relative'}}>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button style={{background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
            <button style={{background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex'}}>
              <span style={{fontSize: '20px'}}>💰</span>
            </button>
            <button style={{background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>

          <div style={{width: '120px', height: '24px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', padding: '2px', marginLeft: '8px'}}>
            <div style={{height: '100%', width: '45%', background: 'linear-gradient(90deg, #fde047 0%, #eab308 100%)', borderRadius: '10px'}}></div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginLeft: '8px'}} onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <span style={{fontSize: '14px', fontWeight: 700, color: '#fff'}}>{userName}</span>
              <span style={{fontSize: '11px', color: '#94a3b8'}}>Level {user?.level || 31}</span>
            </div>
            
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: '#3b82f6', 
              border: '2px solid #60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: '#fff', fontWeight: 700, fontSize: '14px', position: 'relative'
            }}>
              {userInitial}
              {/* Star Badge */}
              <div style={{position: 'absolute', bottom: '-4px', right: '-4px', background: '#3b82f6', border: '1.5px solid #1e40af', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#facc15"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>

          {/* User Menu Popup */}
          {menuOpen && (
            <div style={{
              position: 'absolute', top: '56px', right: '0', width: '200px', 
              background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 100
            }}>
              <div style={{padding: '16px', borderBottom: '1px solid #334155'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#cbd5e1'}}><span>Points</span><span style={{fontWeight: 700, color: '#facc15'}}>{user?.xp || 0} XP</span></div>
                <div style={{height: '4px', background: '#334155', borderRadius: '2px'}}><div style={{width: '65%', height: '100%', background: '#facc15', borderRadius: '2px'}}></div></div>
              </div>
              <div style={{padding: '8px'}}>
                <Link href="/profile" style={{display: 'block', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', borderRadius: '6px'}}>View Profile</Link>
                <div style={{padding: '8px 12px', color: '#cbd5e1', fontSize: '13px', cursor: 'pointer', borderRadius: '6px'}} onClick={() => signOut({ callbackUrl: '/login' })}>Logout</div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div style={{
        display: 'flex', 
        alignItems: 'center',
        height: '44px',
        background: '#1e293b',
        padding: '0 24px',
        borderBottom: '1px solid #334155',
        gap: '32px'
      }}>
        {['Courses', 'Backend Path', 'DevOps Path', 'Custom Paths'].map((item, idx) => (
          <Link key={item} href="#" style={{
            color: idx === 0 ? '#fff' : '#94a3b8',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.15s'
          }}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

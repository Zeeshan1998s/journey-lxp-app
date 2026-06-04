'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function TopNavbar({ user }: { user: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Extract user details or fallback
  const userName = user?.name || user?.email?.split('@')[0] || 'Guest';
  const userInitial = userName.substring(0, 2).toUpperCase();

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', zIndex: 50, flexShrink: 0}}>
      {/* Primary Top Nav */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '60px', 
        background: 'var(--white)', 
        padding: '0 24px',
        color: 'var(--gray-900)',
        borderBottom: '1px solid var(--border)'
      }}>
        
        {/* Left Side: Logo & Upgrade */}
        <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
          <Link href="/dashboard" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <span style={{color: 'var(--orange)', fontSize: '20px', lineHeight: 1}}>•</span>
            <span style={{fontSize: '18px', color: '#222', letterSpacing: '0px'}}>
              <strong>Journey</strong><span style={{fontWeight: 400, color: '#555'}}>builder</span>
            </span>
          </Link>
          <button style={{
            background: 'var(--orange-bg)',
            color: 'var(--orange)',
            border: 'none',
            borderRadius: '24px',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.15s'
          }}>
            Upgrade
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
          {['Dashboard', 'Courses', 'Training', 'Pricing', 'Community', 'Leaderboard'].map((item) => {
            const itemPath = `/${item.toLowerCase()}`;
            const isActive = pathname.startsWith(itemPath);
            return (
              <Link key={item} href={itemPath} style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                padding: '0 20px',
                color: isActive ? 'var(--gray-900)' : 'var(--gray-600)',
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
                    borderBottom: '6px solid var(--orange)'
                  }}></div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Side: Actions & Profile */}
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', position: 'relative'}}>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button style={{background: 'transparent', border: 'none', color: 'var(--gray-600)', cursor: 'pointer', display: 'flex'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
            <button style={{background: 'transparent', border: 'none', color: 'var(--gray-600)', cursor: 'pointer', display: 'flex'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>

          <div style={{width: '120px', height: '24px', background: 'var(--gray-100)', borderRadius: '12px', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', padding: '2px', marginLeft: '8px'}}>
            <div style={{height: '100%', width: '45%', background: 'var(--orange-light)', borderRadius: '10px'}}></div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginLeft: '8px', padding: '4px 8px', borderRadius: '8px'}} className="user-card-hover" onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)'}}>{userName}</span>
              <span style={{fontSize: '11px', color: 'var(--gray-600)'}}>Level {user?.level || 31}</span>
            </div>
            
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange-bg-2)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: '#ea7112', fontWeight: 700, fontSize: '13px', position: 'relative'
            }}>
              {userInitial}
            </div>
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-600)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>

          {/* User Menu Popup */}
          {menuOpen && (
            <div style={{
              position: 'absolute', top: '56px', right: '0', width: '200px', 
              background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 100
            }}>
              <div style={{padding: '16px', borderBottom: '1px solid var(--gray-100)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--gray-700)'}}><span>Points</span><span style={{fontWeight: 700, color: 'var(--orange)'}}>{user?.xp || 0} XP</span></div>
                <div style={{height: '4px', background: 'var(--gray-100)', borderRadius: '2px'}}><div style={{width: '65%', height: '100%', background: 'var(--orange)', borderRadius: '2px'}}></div></div>
              </div>
              <div style={{padding: '8px'}}>
                <Link href="/profile" style={{display: 'block', padding: '8px 12px', color: 'var(--gray-800)', textDecoration: 'none', fontSize: '13px', borderRadius: '6px', cursor: 'pointer'}} className="nav-item">View Profile</Link>
                <div style={{padding: '8px 12px', color: 'var(--gray-800)', fontSize: '13px', cursor: 'pointer', borderRadius: '6px'}} className="nav-item" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</div>
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
        background: 'var(--gray-50)',
        padding: '0 24px',
        borderBottom: '1px solid var(--border)',
        gap: '32px'
      }}>
        {(pathname.startsWith('/community') 
          ? ['Community', 'Guilds', 'Boss', 'Youtube', 'Podcast', 'Lore', 'Blog']
          : ['Courses', 'Backend Path', 'DevOps Path', 'Custom Paths']
        ).map((item, idx) => {
          let href = '/';
          if (item === 'Courses') href = '/courses/backend'; // default courses to backend for now
          if (item === 'Backend Path') href = '/courses/backend';
          if (item === 'DevOps Path') href = '/courses/devops';
          if (item === 'Custom Paths') href = '/';
          if (item === 'Community') href = '/community';

          const isActive = (item === 'Backend Path' && pathname.includes('/courses/backend')) ||
                           (item === 'DevOps Path' && pathname.includes('/courses/devops')) ||
                           (item === 'Community' && pathname === '/community');
          
          return (
          <Link key={item} href={href} style={{
            color: isActive ? 'var(--orange)' : 'var(--gray-600)',
            fontSize: '13px',
            fontWeight: isActive ? 700 : 500,
            textDecoration: 'none',
            transition: 'color 0.15s'
          }}>
            {item}
          </Link>
          );
        })}
      </div>
    </div>
  );
}

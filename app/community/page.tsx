'use client';
import { useSession } from 'next-auth/react';

export default function CommunityPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'zeeshanze';

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--white)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        padding: '120px 24px 80px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, var(--gray-50), var(--white))',
        minHeight: 'calc(100vh - 104px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '24px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Join Our Global Discord Community
          </h1>
          <p style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--gray-600)', marginBottom: '48px' }}>
            Get help with your code, make friends, and share job-search tips
          </p>
          
          {/* Discord Connection Box */}
          <div style={{ 
            border: '1px solid var(--orange)', 
            borderRadius: '12px', 
            padding: '24px', 
            background: 'var(--orange-bg)', 
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(241,89,32,0.1)'
          }}>
            <div style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>
              ✓ You're all set!
            </div>
            <div style={{ color: 'var(--gray-600)', fontSize: '15px' }}>
              Connected as <span style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{userName}</span>
            </div>
          </div>

          <button style={{
            background: 'transparent',
            border: '1px solid var(--gray-300)',
            borderRadius: '24px',
            padding: '8px 24px',
            fontSize: '13px',
            color: 'var(--gray-600)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '64px'
          }}
          onMouseOver={e => { e.currentTarget.style.background = 'var(--gray-100)'; e.currentTarget.style.color = 'var(--gray-900)' }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-600)' }}
          >
            Having issues? Re-sync your Discord account
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-200)', border: '2px solid var(--white)', zIndex: 3 }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-300)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 2 }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-400)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 1 }}></div>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 500 }}>Join 88,370 helpful developers</span>
          </div>

        </div>
      </div>
    </div>
  );
}

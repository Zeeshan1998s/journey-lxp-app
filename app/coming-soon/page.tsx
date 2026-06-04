'use client';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--white)', color: 'var(--gray-900)', fontFamily: 'var(--font)', minHeight: 'calc(100vh - 104px)' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
        <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', color: 'var(--gray-900)' }}>
          Coming Soon
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--gray-600)', marginBottom: '40px', lineHeight: 1.6 }}>
          We're working hard to bring you this feature. Check back soon or continue your learning journey in the meantime!
        </p>
        <Link href="/courses">
          <button style={{
            background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '12px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(241,89,32,0.25)', transition: 'transform 0.1s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Explore Courses
          </button>
        </Link>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useJourney } from '../../contexts/JourneyContext';

export default function JourneyLandingPage({ params }: { params: { id: string } }) {
  const { generatedJourney } = useJourney();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const title = generatedJourney?.title || 'Learn to Code in Python';

  const defaultChapters = [
    'Introduction & Setup',
    'Core Fundamentals',
    'Working with Data',
    'Functions & Scope',
    'Control Flow & Loops',
    'Error Handling & Debugging',
    'Modules & Packages',
    'Object-Oriented Concepts',
    'Real-World Project',
    'Final Assessment',
  ];

  const chapters: string[] = generatedJourney?.nodes
    ? generatedJourney.nodes
        .filter((n: any) => n.type === 'branch' || n.type === 'default')
        .slice(0, 10)
        .map((n: any) => n.label || n.data?.label || n.id)
    : defaultChapters;

  const displayChapters = chapters.length > 0 ? chapters : defaultChapters;

  const reviews = [
    { text: "Incredibly well-structured. I went from zero to building real projects in just a few weeks.", name: "Benjamin Wolf", location: "United States", initials: "BW", rating: 5 },
    { text: "The AI-generated curriculum was spot on. Felt tailor-made, not generic at all.", name: "Priya Sharma", location: "India", initials: "PS", rating: 5 },
    { text: "Hands down the best way to structure self-learning. Chapters flow perfectly.", name: "Mateo Milic", location: "Croatia", initials: "MM", rating: 5 },
    { text: "Clear, engaging, and actually fun to work through. Would recommend to anyone.", name: "Rolf Klim", location: "Netherlands", initials: "RK", rating: 5 },
    { text: "Very interactive. Stayed motivated the whole way through because of the structure.", name: "Saaketh Makam", location: "India", initials: "SM", rating: 5 },
    { text: "I loved how it adapted to my specific goal. It really knew what I needed.", name: "Sinan Akkaya", location: "United States", initials: "SA", rating: 4 },
  ];

  const features = [
    { icon: '🔥', title: 'Avoid tutorial hell', desc: 'Build real things from day one, not just watch videos.' },
    { icon: '⚡', title: 'Stay motivated', desc: 'A game-like curriculum keeps you on track and engaged.' },
    { icon: '💼', title: 'Portfolio projects', desc: 'Ship real work that proves your skills to employers.' },
    { icon: '🎓', title: 'Go deep', desc: 'We don\'t skip the hard stuff that makes you a great engineer.' },
    { icon: '🗓️', title: 'Self-paced', desc: 'No deadlines, no pressure. Study whenever works for you.' },
    { icon: '🤖', title: 'Groq AI powered', desc: 'Your curriculum is generated in seconds, for your exact goal.' },
  ];

  const faqs = [
    { q: "Is this journey free to start?", a: "Yes! You can begin your journey immediately for free. You'll get access to all core lessons and projects without a credit card." },
    { q: "How long will this take?", a: "It depends on your pace, but most learners complete a journey in 4–12 weeks spending an hour or two per day." },
    { q: "Can I skip ahead to topics I already know?", a: "Absolutely. The journey map lets you jump to any node directly. We recommend the linear path, but you're in control." },
    { q: "Will I get a certificate when I finish?", a: "Yes! A completion certificate is generated automatically when you complete all nodes on your journey map." },
    { q: "What if the content doesn't fit my level?", a: "Regenerate from the home page with a more specific prompt (e.g. 'advanced' or 'beginner-friendly'). The AI will tailor it." },
  ];

  const s = {
    section: { padding: '72px 24px', borderBottom: '1px solid var(--border)' } as React.CSSProperties,
    inner: { maxWidth: '1100px', margin: '0 auto' } as React.CSSProperties,
    innerNarrow: { maxWidth: '760px', margin: '0 auto' } as React.CSSProperties,
    h2: { fontSize: '26px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: '12px' } as React.CSSProperties,
    sub: { fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '48px' } as React.CSSProperties,
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-50)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(160deg, #fafaf9 0%, #fff7f3 60%, #fafaf9 100%)', borderBottom: '1px solid var(--border)', padding: '64px 24px 72px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '36px', fontSize: '13px', color: 'var(--gray-500)' }}>
            <Link href="/dashboard" style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
              Dashboard
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span style={{ color: 'var(--gray-800)', fontWeight: 600 }}>Journey Overview</span>
          </div>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--orange-bg)', color: 'var(--orange)', padding: '6px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 700, marginBottom: '24px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            AI-Generated Journey
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '38px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px', maxWidth: '700px' }}>
            {title}
          </h1>

          <p style={{ fontSize: '17px', color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '580px' }}>
            Start learning with hands-on lessons that build the habits and skills you'll use in every future project.
          </p>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange-bg)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              🧙‍♂️
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Generated by</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>Groq AI · Journeybuilder</div>
            </div>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px' }}>
            <span style={{ color: 'var(--orange)', fontSize: '16px' }}>★★★★★</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>4.9</span>
            <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>· 1,240+ learners</span>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/chapter')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '12px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 18px rgba(241,89,32,0.28)', transition: 'transform 0.1s, box-shadow 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(241,89,32,0.35)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(241,89,32,0.28)'; }}
            >
              Start the Journey
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
            </button>
            <Link href="/dashboard">
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--white)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '15px 24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ maxWidth: '1100px', margin: '56px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--gray-200)', border: '1px solid var(--gray-200)', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            { icon: '⏱️', label: '30 Hours', sub: 'of content' },
            { icon: '📚', label: `${displayChapters.length} Chapters`, sub: 'in this journey' },
            { icon: '🏆', label: 'Certificate', sub: 'on completion' },
            { icon: '🎯', label: 'Self-paced', sub: 'no deadlines' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>{stat.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHAPTER LIST ── */}
      <div style={{ ...s.section, background: 'var(--white)' }}>
        <div style={s.innerNarrow}>
          <h2 style={s.h2}>What will you learn?</h2>
          <p style={s.sub}>Structured chapters — each building on the last, with lessons, exercises, and a mini-project.</p>
          <div>
            {displayChapters.map((ch: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '18px 0', borderBottom: i < displayChapters.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--orange-bg)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '2px' }}>{ch}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Lessons, exercises & a hands-on challenge</div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={s.section}>
        <div style={s.inner}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={s.h2}>Why learn with Journeybuilder?</h2>
            <p style={{ ...s.sub, margin: '0 auto 48px' }}>The only way to become a great developer is to write a lot of real code.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map((feat, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(241,89,32,0.07)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '26px', marginBottom: '14px' }}>{feat.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '6px' }}>{feat.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.6 }}>{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div style={{ ...s.section, background: 'var(--white)' }}>
        <div style={s.inner}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={s.h2}>Loved by learners worldwide</h2>
            <p style={{ ...s.sub, margin: '0 auto 48px' }}>See what others are saying about their experience.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="var(--orange)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--gray-700)', lineHeight: 1.65, flex: 1 }}>"{rev.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--orange-bg)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>{rev.initials}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray-900)' }}>{rev.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{rev.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={s.section}>
        <div style={s.innerNarrow}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={s.h2}>Frequently asked questions</h2>
            <p style={{ ...s.sub, margin: '0 auto 40px' }}>Got questions? We've got answers.</p>
          </div>
          <div style={{ background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--gray-900)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)', gap: '16px' }}
                >
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out' }}>
                  <p style={{ padding: '0 24px 20px', fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ padding: '72px 24px', background: 'linear-gradient(160deg, #fff7f3 0%, #fafaf9 100%)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '14px', letterSpacing: '-0.5px' }}>Ready to start your journey?</h2>
        <p style={{ fontSize: '15px', color: 'var(--gray-600)', marginBottom: '36px', lineHeight: 1.6 }}>Jump into your personalized learning path and start building real skills today.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => router.push('/chapter')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '12px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 18px rgba(241,89,32,0.28)' }}
          >
            Start the Journey
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
          </button>
          <Link href="/dashboard">
            <button style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--white)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '15px 24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}

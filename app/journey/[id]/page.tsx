'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useJourney } from '../../contexts/JourneyContext';

export default function JourneyLandingPage({ params }: { params: { id: string } }) {
  const { generatedJourney } = useJourney();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reviews = [
    { text: "This was an incredibly well-structured journey. I went from zero to building real projects in just a few weeks.", name: "Benjamin Wolf", location: "United States", initials: "BW", rating: 5 },
    { text: "The AI-generated curriculum was spot on. It knew exactly what I needed to learn and in what order.", name: "Priya Sharma", location: "India", initials: "PS", rating: 5 },
    { text: "Hands down the best way to structure self-learning. The chapters flow perfectly into each other.", name: "Mateo Milic", location: "Croatia", initials: "MM", rating: 5 },
    { text: "I loved how the journey adapted to my specific goal. It felt tailor-made, not like a generic course.", name: "Sinan Akkaya", location: "United States", initials: "SA", rating: 5 },
    { text: "Clear, engaging, and actually fun to work through. Would recommend to anyone serious about learning.", name: "Rolf Klim", location: "Netherlands", initials: "RK", rating: 5 },
    { text: "Very interactive. I stayed motivated the whole way through because of the gamified structure.", name: "Saaketh Makam", location: "India", initials: "SM", rating: 4 },
  ];

  const features = [
    { icon: '🔥', title: 'Avoid tutorial hell', desc: 'Build real things from day one, not just watch videos.' },
    { icon: '⚡', title: 'Stay motivated', desc: 'A game-like curriculum keeps you on track and engaged.' },
    { icon: '💼', title: 'Build portfolio projects', desc: 'Ship real work that proves your skills to employers.' },
    { icon: '🎓', title: 'Go deep on fundamentals', desc: 'We don\'t skip the hard stuff that makes you a great engineer.' },
    { icon: '🗓️', title: 'Learn at your own pace', desc: 'No deadlines, no pressure. Study whenever works for you.' },
    { icon: '🤖', title: 'Powered by Groq AI', desc: 'Your curriculum is generated in seconds, personalized for your exact goal.' },
  ];

  const faqs = [
    { q: "Is this journey free to start?", a: "Yes! You can begin your journey immediately for free. You'll get access to all the core lessons and projects without needing to enter a credit card." },
    { q: "How long will this journey take?", a: "It depends on your pace, but most learners complete a full journey in 4-12 weeks spending an hour or two per day. The curriculum is broken into clear milestones to track your progress." },
    { q: "Can I skip ahead to topics I already know?", a: "Absolutely. The journey map lets you jump to any node directly. We recommend the linear path, but you're in control." },
    { q: "What if the AI-generated content doesn't fit my level?", a: "You can regenerate your journey from the home page with a more specific prompt (e.g. 'advanced' or 'beginner-friendly'). The AI will tailor it accordingly." },
    { q: "Will I get a certificate when I finish?", a: "Yes! A completion certificate is generated automatically when you complete all the nodes on your journey map." },
  ];

  const defaultChapters = [
    { label: 'Introduction & Setup' },
    { label: 'Core Fundamentals' },
    { label: 'Working with Data' },
    { label: 'Functions & Scope' },
    { label: 'Control Flow & Loops' },
    { label: 'Error Handling & Debugging' },
    { label: 'Modules & Packages' },
    { label: 'Object-Oriented Concepts' },
    { label: 'Real-World Project' },
    { label: 'Final Assessment' },
  ];

  const chapters = (generatedJourney?.nodes || [])
    .filter((n: any) => n.type === 'branch' || n.type === 'default')
    .slice(0, 10);
  const displayChapters = chapters.length > 0 ? chapters : defaultChapters;
  const title = generatedJourney?.title || 'Learn to Code in Python';

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--gray-50)',
      color: 'var(--gray-900)',
      fontFamily: 'var(--font)',
      overflowY: 'auto',
    }}>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #fafaf9 0%, #fff7f3 50%, #fafaf9 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle bg blob */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(241,89,32,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '13px', color: 'var(--gray-500)' }}>
            <Link href="/dashboard" style={{ color: 'var(--gray-500)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Dashboard
            </Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span style={{ color: 'var(--gray-900)', fontWeight: 600 }}>Course Overview</span>
          </div>

          <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Left: Title + Author + CTA */}
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'var(--orange-bg)', color: 'var(--orange)',
                padding: '6px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 700,
                marginBottom: '20px',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                AI-Generated Journey
              </div>

              <h1 style={{
                fontSize: '40px', fontWeight: 800, color: 'var(--gray-900)',
                letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px',
              }}>
                {title}
              </h1>

              <p style={{ fontSize: '17px', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '32px' }}>
                Start learning with hands-on lessons that build the habits and skills you'll use in every future project.
              </p>

              {/* Author row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'var(--orange-bg)', color: 'var(--orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 700, flexShrink: 0,
                }}>
                  🧙‍♂️
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Generated by</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>Groq AI · Journeybuilder</div>
                </div>
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <span style={{ color: 'var(--orange)', fontSize: '16px', letterSpacing: '-1px' }}>★★★★★</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>4.9</span>
                <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>· Based on 1,240+ learners</span>
              </div>

              <button
                onClick={() => router.push(`/journey/${params.id}/map`)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'var(--orange)', color: 'var(--white)',
                  border: 'none', borderRadius: '12px',
                  padding: '16px 32px', fontSize: '16px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'var(--font)',
                  boxShadow: '0 4px 20px rgba(241,89,32,0.3)',
                  transition: 'transform 0.1s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(241,89,32,0.35)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(241,89,32,0.3)'; }}
              >
                Start the Journey
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
              </button>
            </div>

            {/* Right: Stats grid */}
            <div style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '32px',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '28px', flexShrink: 0, minWidth: '280px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              {[
                { icon: '⏱️', label: '30 Hours', sub: 'of content' },
                { icon: '📚', label: displayChapters.length + ' Chapters', sub: 'in this journey' },
                { icon: '🏆', label: 'Certificate', sub: 'on completion' },
                { icon: '🎯', label: 'Self-paced', sub: 'learn your way' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '22px' }}>{stat.icon}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>{stat.label}</span>
                  <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{stat.sub}</span>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Hands-on projects', 'AI-curated curriculum', 'Community support'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-700)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER LIST */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              What will you learn?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.6 }}>
              This journey is structured into clear chapters, each building on the last. Every chapter includes lessons, exercises, and a mini-project.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayChapters.map((ch: any, i: number) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                padding: '20px 0',
                borderBottom: i < displayChapters.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'var(--orange-bg)', color: 'var(--orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 800, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '3px' }}>
                    {ch.label}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
                    Lessons, exercises & a hands-on challenge
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              Why learn with Journeybuilder?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--gray-600)' }}>
              We believe the only way to become a great developer is to write a lot of real code.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((feat, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '28px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(241,89,32,0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{feat.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '6px' }}>{feat.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              Loved by learners worldwide
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--gray-600)' }}>
              See what others are saying about their learning experience.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{
                background: 'var(--gray-50)',
                border: '1px solid var(--border)',
                borderRadius: '12px', padding: '28px',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--orange)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--gray-700)', lineHeight: 1.65, flex: 1 }}>
                  "{rev.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'var(--orange-bg)', color: 'var(--orange)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 800, flexShrink: 0,
                  }}>
                    {rev.initials}
                  </div>
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

      {/* FAQ */}
      <div style={{ padding: '80px 24px', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--gray-600)' }}>
              Got questions? We've got answers.
            </p>
          </div>

          <div style={{
            background: 'var(--white)', borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '22px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none',
                    color: 'var(--gray-900)', fontSize: '15px', fontWeight: 600,
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)',
                    gap: '16px',
                  }}
                >
                  {faq.q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="var(--orange)" strokeWidth="2"
                    style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '300px' : '0',
                  overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
                }}>
                  <p style={{
                    padding: '0 24px 22px', fontSize: '14px',
                    color: 'var(--gray-600)', lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #fff7f3 0%, #fafaf9 100%)',
        borderTop: '1px solid var(--border)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Ready to start your journey?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--gray-600)', marginBottom: '36px', lineHeight: 1.6 }}>
            Jump into your personalized learning path and start building real skills today.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push(`/journey/${params.id}/map`)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'var(--orange)', color: 'var(--white)',
                border: 'none', borderRadius: '12px',
                padding: '16px 32px', fontSize: '16px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font)',
                boxShadow: '0 4px 20px rgba(241,89,32,0.3)',
              }}
            >
              Start the Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
            </button>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--white)', color: 'var(--gray-700)',
                border: '1px solid var(--border)', borderRadius: '12px',
                padding: '16px 28px', fontSize: '16px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font)',
              }}>
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}

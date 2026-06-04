'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJourney } from '../contexts/JourneyContext';

export default function AllJourneysPage() {
  const router = useRouter();
  const { setGeneratedJourney } = useJourney();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const journeys = [
    { title: 'Learn AWS', icon: '☁️', lessons: 93, enrolled: '1,909', hours: 24, badge: 'NEW', rating: 4.5 },
    { title: 'Learn Logging and Observability in Go', icon: '🐹', lessons: 73, enrolled: '1,125', hours: 16, badge: 'NEW', rating: 4.5 },
    { title: 'Learn SQL', icon: '🗄️', lessons: 126, enrolled: '45,203', hours: 30, badge: 'UPDATED', rating: 4.8 },
    { title: 'Learn Retrieval Augmented Generation', icon: '🐍', lessons: 75, enrolled: '3,058', hours: 40, badge: 'UPDATED', rating: 4.8 },
    { title: 'Learn to Code in Python', icon: '🐍', lessons: 191, enrolled: '752,470', hours: 30, badge: null, rating: 4.8 },
    { title: 'Learn Linux', icon: '🐧', lessons: 67, enrolled: '112,301', hours: 10, badge: null, rating: 4.8 },
    { title: 'Learn Go', icon: '🐹', lessons: 189, enrolled: '103,151', hours: 20, badge: null, rating: 4.8 },
    { title: 'Learn Git', icon: '📦', lessons: 75, enrolled: '58,441', hours: 8, badge: null, rating: 4.8 },
    { title: 'Learn Object Oriented Programming in Python', icon: '🐍', lessons: 61, enrolled: '53,583', hours: 18, badge: null, rating: 4.7 },
    { title: 'Build a Bookbot in Python', icon: '🛠️', lessons: 12, enrolled: '47,969', hours: 6, badge: null, rating: 4.7, type: 'Guided Project' },
    { title: 'Learn JavaScript', icon: '🟨', lessons: 122, enrolled: '47,715', hours: 25, badge: null, rating: 4.7 },
    { title: 'Learn Data Structures and Algorithms in Python', icon: '🐍', lessons: 175, enrolled: '39,370', hours: 32, badge: null, rating: 4.6 },
    { title: 'Learn Functional Programming in Python', icon: '🐍', lessons: 89, enrolled: '36,364', hours: 22, badge: null, rating: 4.5 },
    { title: 'Learn Memory Management in C', icon: '⚙️', lessons: 103, enrolled: '31,257', hours: 24, badge: null, rating: 4.6 },
    { title: 'Build Asteroids using Python and Pygame', icon: '🛠️', lessons: 20, enrolled: '28,732', hours: 6, badge: null, rating: 4.5, type: 'Guided Project' },
    { title: 'Learn Docker', icon: '🐳', lessons: 43, enrolled: '19,383', hours: 18, badge: null, rating: 4.7 },
    { title: 'Learn HTTP Clients in TypeScript', icon: '🟦', lessons: 81, enrolled: '16,427', hours: 14, badge: null, rating: 4.8 },
    { title: 'Build an AI Agent in Python', icon: '🛠️', lessons: 20, enrolled: '15,862', hours: 12, badge: null, rating: 4.4, type: 'Guided Project' }
  ];

  const faqs = [
    { q: "What learning journeys does Journeybuilder offer?", a: "Journeybuilder offers dynamic, AI-generated learning paths and curated featured journeys across a variety of languages and domains like Python, Go, Cloud, and Data Structures." },
    { q: "Are Journeybuilder paths free?", a: "Yep. You can generate custom paths and demo the early chapters for free." },
    { q: "Which programming language should I learn first?", a: "We recommend starting with Python for general programming concepts before moving on to typed languages like Go or TypeScript." },
    { q: "What makes Journeybuilder different from video courses?", a: "Journeybuilder uses AI to tailor the exact curriculum you need, focusing on text, interactive quizzes, and projects rather than passive video consumption." }
  ];

  const handleJourneyClick = async (e: React.MouseEvent, prompt: string) => {
    const card = e.currentTarget as HTMLElement;
    card.style.opacity = '0.5';
    try {
      const res = await fetch('/api/ai/generate-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.success && data.journey) {
        setGeneratedJourney(data.journey);
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      card.style.opacity = '1';
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--white)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        padding: '100px 24px 60px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, var(--gray-50), var(--white))'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.03em' }}>
            All Journeys
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--gray-600)' }}>
            A catalog of all the online learning journeys that we offer
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '0 24px' }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', border: '1px solid var(--border)', 
          borderRadius: '8px', padding: '12px 16px', background: 'var(--white)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <input 
            type="text" 
            placeholder="Search journeys..." 
            style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '15px', color: 'var(--gray-900)' }}
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" style={{ cursor: 'pointer' }}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {journeys.map((j, i) => (
            <div 
              key={i} 
              style={{ 
                border: '1px solid var(--border)', borderRadius: '12px', padding: '24px',
                background: 'var(--white)', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
              className="user-card-hover"
              onClick={(e) => handleJourneyClick(e, j.title)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    {j.type || 'Journey'} • {j.lessons} chapters
                  </div>
                  <div style={{ fontSize: '24px' }}>{j.icon}</div>
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '32px', lineHeight: 1.3 }}>
                  {j.title}
                </h3>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[1,2,3,4,5].map((star, idx) => (
                      <span key={idx} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                    ))}
                    <span style={{ fontSize: '12px', color: 'var(--gray-600)', marginLeft: '4px', fontWeight: 600 }}>({j.rating})</span>
                  </div>
                  {j.badge ? (
                    <div style={{ 
                      background: j.badge === 'NEW' ? 'var(--orange-bg)' : 'var(--gray-100)', 
                      color: j.badge === 'NEW' ? 'var(--orange)' : 'var(--gray-700)', 
                      fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px'
                    }}>
                      {j.badge}
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Last updated Jun 2026</div>
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--gray-500)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    {j.enrolled} enrolled
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {j.hours} hours
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ padding: '80px 24px', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '8px' }}>Journeys FAQ</h2>
            <p style={{ fontSize: '16px', color: 'var(--gray-600)' }}>A few quick answers before you choose your next journey.</p>
          </div>

          <div style={{ border: '1px solid var(--orange)', borderRadius: '12px', padding: '0 32px', background: 'var(--white)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i !== faqs.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <button 
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{ 
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none', padding: '24px 0', cursor: 'pointer',
                    fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)', textAlign: 'left',
                    fontFamily: 'var(--font)'
                  }}
                >
                  {faq.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" style={{ transform: openAccordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div style={{ maxHeight: openAccordion === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.6, paddingBottom: '24px' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

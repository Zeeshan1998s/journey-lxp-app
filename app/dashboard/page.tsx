'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useJourney } from '../contexts/JourneyContext';

const Dashboard = () => {
  const { generatedJourney } = useJourney();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const theme = {
    bg: 'var(--gray-50)',
    card: 'var(--white)',
    border: 'var(--border, #e6e6e6)',
    text: 'var(--gray-900)',
    textMuted: 'var(--gray-600)',
    primary: 'var(--orange)',
    primaryHover: 'var(--orange-light)',
    progressBg: 'var(--gray-100)',
    progressFill: 'var(--orange)', 
  };

  const faqs = [
    { q: "What's coming out next?", a: "You can see the courses and projects we're releasing next on our roadmap on GitHub. Do not wait for more content before you start! This is a living learning path that will always be growing and improving." },
    { q: "Can I skip ahead?", a: "Yes! While we recommend following the path linearly, you can jump to any course that fits your current goals." },
    { q: "Why these programming languages?", a: "We focus on Python and Go (for Backend) and JS/TS (for Frontend) because they represent the most requested skills in modern tech jobs." },
    { q: "Where can I ask questions or voice concerns?", a: "Join our active Discord community! It's the best place to get help from peers and mentors." },
  ];

  const chapters = [
    { title: '1. Clean Code', current: 6, total: 6 },
    { title: '2. Classes', current: 9, total: 12 },
    { title: '3. Encapsulation', current: 0, total: 8 },
    { title: '4. Abstraction', current: 0, total: 7 },
    { title: '5. Inheritance', current: 0, total: 15 },
    { title: '6. Polymorphism', current: 0, total: 13 },
  ];

  const courses = [
    { title: '1. Learn to Code in Python', current: 135, total: 191, icon: '🐍' },
    { title: '2. Learn Linux', current: 66, total: 67, icon: '🐧', active: true },
    { title: '3. Build a Bookbot (Guided)', current: 12, total: 12, icon: '🛠️' },
    { title: '4. Learn Git', current: 75, total: 75, icon: '🐙' },
    { title: '5. Learn Object Oriented Programming', current: 15, total: 61, icon: '🐍' },
    { title: '6. Build Asteroids', current: 0, total: 20, icon: '🚀' },
    { title: '7. Learn Functional Programming', current: 0, total: 89, icon: 'λ' },
  ];

  const featuredJourneys = [
    { title: 'Advanced Next.js Architecture', users: '12.4k', icon: '⚛️' },
    { title: 'System Design Interview', users: '8.2k', icon: '🏗️' },
    { title: 'Kubernetes Mastery', users: '5.1k', icon: '⛴️' },
    { title: 'Rust for Beginners', users: '9.3k', icon: '🦀' },
  ];

  return (
    <main style={{ 
      flex: 1, 
      display: 'flex',
      backgroundColor: theme.bg, 
      color: theme.text,
      minHeight: '100vh',
      fontFamily: 'var(--font, system-ui, sans-serif)',
      overflowY: 'auto'
    }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');
      `}</style>
      
      {/* LEFT SIDEBAR - Journey Hub */}
      <div style={{
        width: '260px',
        borderRight: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        flexShrink: 0,
      }}>
        <div>
          <Link href="/" style={{textDecoration: 'none'}}>
            <button style={{
              width: '100%',
              backgroundColor: theme.primary,
              color: 'var(--white)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s, transform 0.1s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme.primaryHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = theme.primary}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create Journey
            </button>
          </Link>
          <p style={{fontSize: '12px', color: theme.textMuted, marginTop: '12px', textAlign: 'center', lineHeight: 1.5}}>
            Generate a personalized learning curriculum with Groq AI.
          </p>
        </div>

        <div>
          <h3 style={{fontSize: '14px', fontWeight: 600, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px'}}>
            Featured Journeys
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {featuredJourneys.map((j, i) => (
              <Link key={i} href="/journey/1" style={{textDecoration: 'none'}}>
                <div style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = theme.primary}
                onMouseOut={(e) => e.currentTarget.style.borderColor = theme.border}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{fontSize: '20px'}}>{j.icon}</div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontSize: '14px', fontWeight: 600, color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{j.title}</div>
                      <div style={{fontSize: '12px', color: theme.textMuted}}>{j.users} learners</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{flex: 1, padding: '40px 60px', maxWidth: '1200px', margin: '0 auto'}}>
        
        {/* Header */}
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '50%', backgroundColor: theme.card, border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>
            🧙‍♂️
          </div>
          <h1 style={{fontSize: '28px', fontFamily: '"Cinzel", serif', fontWeight: 700, color: theme.text}}>
            Welcome back, Zeeshan! Let's get to it!
          </h1>
        </div>

        {/* Hero Section: Streak & Active Course */}
        <div style={{display: 'flex', gap: '24px', marginBottom: '48px'}}>
          
          {/* Streak Box */}
          <div style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '24px',
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{display: 'flex', gap: '16px', alignItems: 'flex-start', zIndex: 1}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: theme.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'}}>🎯</div>
                <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: theme.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', opacity: 0.5}}>⚔️</div>
                <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: theme.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', opacity: 0.5}}>💧</div>
              </div>
              <div>
                <h3 style={{fontSize: '16px', fontWeight: 600, color: theme.text, marginBottom: '4px'}}>Today's lesson done!</h3>
                <p style={{fontSize: '13px', color: theme.textMuted}}>Expires in 1 day</p>
                <div style={{display: 'flex', alignItems: 'flex-end', gap: '16px', marginTop: '24px'}}>
                  <div style={{fontSize: '64px', lineHeight: 1}}>🔥</div>
                  <div>
                    <div style={{fontSize: '14px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600}}>Current streak</div>
                    <div style={{fontSize: '48px', fontWeight: 800, color: theme.text, lineHeight: 1, marginTop: '4px'}}>2 Days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Course Box */}
          <div style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px'}}>
              <div>
                <h2 style={{fontSize: '28px', fontFamily: '"Cinzel", serif', fontWeight: 700, color: theme.text, marginBottom: '8px'}}>
                  Back-end Developer Path <span style={{fontSize: '16px', fontFamily: 'system-ui, sans-serif', color: theme.textMuted, fontWeight: 400}}>(Python & Go)</span>
                </h2>
                <p style={{fontSize: '15px', color: theme.textMuted}}>Learn Object Oriented Programming - Chapter 2. Classes</p>
              </div>
              <Link href="/journey/1">
                <button style={{
                  backgroundColor: theme.primary,
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '10px 24px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 4px 12px rgba(241, 89, 32, 0.2)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme.primaryHover}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = theme.primary}
                >
                  Continue Learning
                </button>
              </Link>
            </div>

            {/* Path Nodes Timeline */}
            <div style={{position: 'relative', marginTop: '24px', paddingBottom: '32px'}}>
              <div style={{position: 'absolute', top: '24px', left: 0, right: 0, height: '2px', backgroundColor: theme.border, zIndex: 0}}></div>
              <div style={{position: 'absolute', top: '24px', left: 0, width: '40%', height: '2px', backgroundColor: theme.primary, zIndex: 0}}></div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1}}>
                {[14, 15, 16, 17, 18].map((num, i) => (
                  <div key={num} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%', 
                      backgroundColor: i < 2 ? theme.primary : (i === 2 ? theme.card : theme.bg),
                      border: `2px solid ${i < 2 ? theme.primary : (i === 2 ? theme.primary : theme.border)}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: i < 2 ? 'var(--white)' : theme.text,
                      fontSize: '18px', fontWeight: 700,
                      boxShadow: i === 2 ? '0 0 15px rgba(241, 89, 32, 0.3)' : 'none'
                    }}>
                      {num}
                    </div>
                    {i === 2 && (
                      <div style={{marginTop: '16px', fontSize: '15px', fontWeight: 600, color: theme.text}}>
                        Archer Practice
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Course Chapters */}
        <div style={{marginBottom: '48px'}}>
          <h2 style={{fontSize: '24px', fontFamily: '"Cinzel", serif', fontWeight: 700, color: theme.text, marginBottom: '8px'}}>
            Learn Object Oriented Programming in Python 🔄
          </h2>
          <p style={{fontSize: '14px', color: theme.textMuted, marginBottom: '24px'}}>Chapters</p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px'}}>
            {chapters.map((ch, i) => (
              <div key={i} style={{
                backgroundColor: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                  <h3 style={{fontSize: '14px', fontWeight: 600, color: ch.current > 0 ? theme.text : theme.textMuted}}>
                    {ch.title}
                  </h3>
                  <span style={{fontSize: '12px', color: theme.textMuted}}>🔄 {ch.current}/{ch.total}</span>
                </div>
                <div style={{height: '4px', backgroundColor: theme.progressBg, borderRadius: '2px', overflow: 'hidden'}}>
                  <div style={{
                    width: `${(ch.current / ch.total) * 100}%`, 
                    height: '100%', 
                    backgroundColor: theme.progressFill,
                    borderRadius: '2px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Courses & FAQ */}
        <div style={{display: 'flex', gap: '64px'}}>
          
          {/* Left: Path Courses */}
          <div style={{flex: 1}}>
            <h2 style={{fontSize: '24px', fontFamily: '"Cinzel", serif', fontWeight: 700, color: theme.text, marginBottom: '8px'}}>
              Back-end Developer Path
            </h2>
            <p style={{fontSize: '14px', color: theme.textMuted, marginBottom: '24px'}}>Courses</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {courses.map((course, i) => (
                <div key={i} style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${course.active ? theme.primary : theme.border}`,
                  borderRadius: '8px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px'
                }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%', 
                    backgroundColor: course.current > 0 ? (course.current === course.total ? theme.progressFill : theme.progressFill) : theme.border,
                    boxShadow: course.active ? `0 0 10px ${theme.progressFill}` : 'none'
                  }}></div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '12px', fontWeight: 700, color: theme.primary, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em'}}>
                      {course.title.includes('Guided') ? 'Guided Project' : 'Course'}
                    </div>
                    <h3 style={{fontSize: '18px', fontWeight: 700, color: course.current > 0 ? theme.text : theme.textMuted, marginBottom: '16px'}}>
                      {course.title}
                    </h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <div style={{flex: 1, height: '12px', backgroundColor: theme.progressBg, borderRadius: '6px', overflow: 'hidden', border: `1px solid ${theme.border}`}}>
                        <div style={{
                          width: `${(course.current / course.total) * 100}%`, 
                          height: '100%', 
                          backgroundColor: theme.progressFill,
                          borderRadius: '6px',
                          background: course.current === course.total ? 'linear-gradient(90deg, #f15920, #ff9e70)' : theme.progressFill
                        }}></div>
                      </div>
                      <span style={{fontSize: '13px', fontWeight: 700, color: theme.textMuted}}>🔄 {course.current} / {course.total}</span>
                    </div>
                  </div>
                  <div style={{fontSize: '48px', opacity: course.current > 0 ? 1 : 0.5, marginLeft: 'auto'}}>
                    {course.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FAQ */}
          <div style={{width: '380px', flexShrink: 0}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              {faqs.map((faq, i) => (
                <div key={i} style={{borderBottom: `1px solid ${theme.border}`}}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', 
                      alignItems: 'center', backgroundColor: 'transparent', border: 'none',
                      color: theme.text, fontSize: '16px', fontWeight: 600, cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {faq.q}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s'}}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                  }}>
                    <p style={{paddingBottom: '24px', color: theme.textMuted, fontSize: '15px', lineHeight: 1.6}}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* FOOTER */}
        <div style={{
          marginTop: '100px',
          paddingTop: '64px',
          borderTop: `1px solid ${theme.primary}`,
          position: 'relative'
        }}>
          {/* Center Diamond */}
          <div style={{
            position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
            width: '20px', height: '20px', backgroundColor: '#38bdf8', border: `2px solid ${theme.primary}`
          }}></div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', marginBottom: '64px'}}>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Platform</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>All Courses</span>
                <span style={{cursor: 'pointer'}}>Training Grounds</span>
                <span style={{cursor: 'pointer'}}>Backend Path</span>
                <span style={{cursor: 'pointer'}}>DevOps Path</span>
                <span style={{cursor: 'pointer'}}>Dashboard</span>
                <span style={{cursor: 'pointer'}}>Leaderboard</span>
              </div>
            </div>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Languages</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>Python</span>
                <span style={{cursor: 'pointer'}}>Go (Golang)</span>
                <span style={{cursor: 'pointer'}}>TypeScript</span>
                <span style={{cursor: 'pointer'}}>JavaScript</span>
                <span style={{cursor: 'pointer'}}>SQL</span>
              </div>
            </div>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Subjects</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>Linux</span>
                <span style={{cursor: 'pointer'}}>Kubernetes</span>
                <span style={{cursor: 'pointer'}}>Git</span>
                <span style={{cursor: 'pointer'}}>Docker</span>
                <span style={{cursor: 'pointer'}}>Data Structures</span>
              </div>
            </div>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Support</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>Contact</span>
                <span style={{cursor: 'pointer'}}>FAQ</span>
                <span style={{cursor: 'pointer'}}>Return Policy</span>
                <span style={{cursor: 'pointer'}}>Terms of Service</span>
              </div>
            </div>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Pricing</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>Pricing Plans</span>
                <span style={{cursor: 'pointer'}}>Gift Codes</span>
                <span style={{cursor: 'pointer'}}>For Schools</span>
                <span style={{cursor: 'pointer'}}>For Business</span>
              </div>
            </div>
            <div>
              <h4 style={{color: theme.text, fontWeight: 700, marginBottom: '24px', fontSize: '15px'}}>Community</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: theme.textMuted}}>
                <span style={{cursor: 'pointer'}}>Community</span>
                <span style={{cursor: 'pointer'}}>Blog</span>
                <span style={{cursor: 'pointer'}}>Careers</span>
                <span style={{cursor: 'pointer'}}>About</span>
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center', color: theme.textMuted, fontSize: '14px'}}>
            <h2 style={{fontFamily: '"Cinzel", serif', fontSize: '32px', fontWeight: 700, color: theme.primary, marginBottom: '16px'}}>Journeybuilder</h2>
            <p>© Journeybuilder 2026</p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;

'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const chapters = [
    { num: 1, title: 'Clean Code', progress: '6 / 6', pct: 100 },
    { num: 2, title: 'Classes', progress: '9 / 12', pct: 75, active: true },
    { num: 3, title: 'Encapsulation', progress: '0 / 8', pct: 0 },
    { num: 4, title: 'Abstraction', progress: '0 / 7', pct: 0 },
    { num: 5, title: 'Inheritance', progress: '0 / 15', pct: 0 },
    { num: 6, title: 'Polymorphism', progress: '0 / 13', pct: 0 },
  ];

  const courses = [
    { num: 1, title: 'Learn to Code in Python', progress: '135 / 191', pct: 70, icon: '🐍' },
    { num: 2, title: 'Learn Linux', progress: '66 / 67', pct: 98, icon: '🐧' },
    { num: 3, title: 'Build a Bookbot', progress: '12 / 12', pct: 100, icon: '🛠️' },
    { num: 4, title: 'Learn Git', progress: '75 / 75', pct: 100, icon: '🎋' },
  ];

  const faqs = [
    { q: "What's coming out next?", a: "You can see the courses and projects we're releasing next on our roadmap on GitHub. Do not wait for more content before you start! This is a living learning path that will always be growing and improving." },
    { q: "Can I skip ahead?", a: "We highly recommend completing the courses in order, but you are free to skip around if you already have experience with certain topics." },
    { q: "Why these programming languages?", a: "Python and Go are the most in-demand backend languages today, offering a perfect blend of developer productivity and high-performance execution." },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-50)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--orange-bg)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, border: '2px solid var(--orange)' }}>
            Z
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gray-700)' }}>
            Ready to dive into some code, <span style={{ fontWeight: 800, color: 'var(--gray-900)' }}>Zeeshan</span>?
          </h1>
        </div>

        {/* HERO SECTION */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', flexWrap: 'wrap' }}>
          
          {/* Left: Streak */}
          <div style={{ 
            background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '260px', flexShrink: 0
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>Today's lesson done!</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Expires in 1 day</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flex: 1 }}>
              <div style={{ fontSize: '48px', filter: 'drop-shadow(0 4px 12px rgba(241,89,32,0.3))' }}>🔥</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Current<br/>Streak</span>
                <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1 }}>2</span>
              </div>
            </div>
          </div>

          {/* Right: Path Progress */}
          <div style={{ 
            background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px',
            flex: 1, minWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '4px' }}>
                  Back-end Developer Path <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-500)' }}>(Python & Go)</span>
                </h2>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                  Learn Object Oriented Programming - Chapter 2. Classes
                </div>
              </div>
              <Link href="/journey/1">
                <button style={{ 
                  background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(241,89,32,0.25)', transition: 'transform 0.1s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Continue Learning
                </button>
              </Link>
            </div>

            {/* Path Nodes */}
            <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginTop: '20px' }}>
              {/* Connecting line */}
              <div style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', height: '3px', background: 'var(--gray-200)', zIndex: 1, transform: 'translateY(-50%)' }}>
                <div style={{ height: '100%', background: 'var(--orange)', width: '50%' }}></div>
              </div>
              
              {/* Nodes */}
              {[14, 15, 16, 17, 18].map((node, i) => {
                const isCompleted = i < 2;
                const isActive = i === 2;
                
                return (
                  <div key={node} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      width: isActive ? '40px' : '32px', height: isActive ? '40px' : '32px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isActive ? 'var(--orange)' : (isCompleted ? 'var(--orange-bg)' : 'var(--white)'),
                      border: isActive ? '3px solid var(--orange-bg)' : (isCompleted ? '2px solid var(--orange)' : '2px solid var(--gray-300)'),
                      color: isActive ? '#fff' : (isCompleted ? 'var(--orange)' : 'var(--gray-400)'),
                      fontSize: isActive ? '16px' : '14px', fontWeight: 800,
                      boxShadow: isActive ? '0 0 0 4px rgba(241,89,32,0.1)' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      {node}
                    </div>
                    {isActive && (
                      <div style={{ position: 'absolute', top: '48px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>
                        Archer Practice
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>

        {/* CHAPTERS SECTION */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Learn Object Oriented Programming in Python</h2>
            <span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Chapters</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
            {chapters.map((ch, i) => (
              <div key={i} style={{ 
                minWidth: '220px', background: 'var(--white)', border: ch.active ? '1px solid var(--orange)' : '1px solid var(--border)', 
                borderRadius: '12px', padding: '16px', boxShadow: ch.active ? '0 4px 12px rgba(241,89,32,0.06)' : 'none',
                cursor: 'pointer', transition: 'transform 0.2s'
              }} className="card-hover">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: ch.active ? 'var(--orange)' : 'var(--gray-900)' }}>
                    {ch.num}. {ch.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600 }}>{ch.progress}</div>
                </div>
                <div style={{ height: '6px', background: 'var(--gray-100)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: ch.pct === 100 ? '#10b981' : 'var(--orange)', width: `${ch.pct}%`, borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COURSES & ACCORDION */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Courses List */}
          <div style={{ flex: 1, minWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Back-end Developer Path</h2>
              <span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Courses</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {courses.map((course, i) => (
                <div key={i} style={{ 
                  background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px',
                  display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer'
                }} className="card-hover">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Course</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)' }}>{course.num}. {course.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontWeight: 600 }}>{course.progress}</div>
                    </div>
                    <div style={{ height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: course.pct === 100 ? '#10b981' : 'var(--orange)', width: `${course.pct}%`, borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {course.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accordions */}
          <div style={{ width: '400px', flexShrink: 0, marginTop: '42px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    style={{ 
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'transparent', border: 'none', padding: '16px 0', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 700, color: 'var(--gray-800)', textAlign: 'left',
                      fontFamily: 'var(--font)'
                    }}
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openAccordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div style={{ maxHeight: openAccordion === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: 1.6, paddingBottom: '16px' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06) !important; border-color: var(--orange) !important; }
      `}} />
    </div>
  );
}

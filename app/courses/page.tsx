'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const courses = [
    {
      title: 'Learn to Code in Python',
      type: 'Course',
      icon: '🐍',
      chapters: [
        'Ch 1. Introduction', 'Ch 5. Testing and Debugging', 'Ch 9. Lists', 'Ch 13. Type Hints',
        'Ch 2. Variables', 'Ch 6. Computing', 'Ch 10. Dictionaries', 'Ch 14. Practice',
        'Ch 3. Functions', 'Ch 7. Comparisons', 'Ch 11. Sets', 'Ch 15. Quiz',
        'Ch 4. Scope', 'Ch 8. Loops', 'Ch 12. Errors'
      ]
    },
    {
      title: 'Learn Linux',
      type: 'Course',
      icon: '🐧',
      chapters: [
        'Ch 1. Terminals and Shells', 'Ch 4. Programs',
        'Ch 2. Filesystems', 'Ch 5. Input/Output',
        'Ch 3. Permissions', 'Ch 6. Packages'
      ]
    },
    {
      title: 'Build a Bookbot',
      type: 'Guided Project',
      icon: '🛠️',
      chapters: [
        'Ch 1. Setup',
        'Ch 2. Data Analysis',
        'Ch 3. Report'
      ]
    }
  ];

  const reviews = [
    {
      text: "I think it was way better than I learned java in university. It was way more fun.",
      author: "nbross", location: "Munich", course: "Learn to Code in Python"
    },
    {
      text: "good course, made me catch up on SQL in a few days :)",
      author: "Ti", location: "France", course: "Learn SQL"
    },
    {
      text: "I always thought that i know Go, turns out i know nothing about Go, this course fills on those gaps.",
      author: "Defhanaya", location: "Indonesia", course: "Learn Go"
    },
    {
      text: "SQL is so simple and yet so fundamental!",
      author: "Francisco", location: "Argentina", course: "Learn SQL"
    },
    {
      text: "This platform is amazing! I just completed 'Learn to Code in Python' almost entirely on my own.",
      author: "Benjamin Wolf", location: "United States", course: "Learn to Code in Python"
    },
    {
      text: "This was awesome! I loved it!",
      author: "Tony DeJesus", location: "United States", course: "Learn to Code in Python"
    }
  ];

  const faqs = [
    { q: "Can I start the backend path for free?", a: "Yep. You can create an account for free and fully demo the early chapters of the path. Once you hit the membership gate, you can still read the remaining lessons in content-only mode until you're ready to upgrade." },
    { q: "How long does it take to become a backend developer with these courses?", a: "Most students complete the path in 6-12 months depending on how many hours they dedicate per week." },
    { q: "Why does the backend path teach Python and Golang?", a: "Python is great for fundamentals and data, while Go is the modern standard for high-performance backend systems." },
    { q: "Should I put Boot.dev backend projects on my resume?", a: "Absolutely! The projects are designed to be portfolio-ready and demonstrate real-world backend engineering skills." }
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--white)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        padding: '100px 24px 80px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, var(--gray-50), var(--white))',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '24px', letterSpacing: '-0.03em' }}>
            Back-end Developer Path
          </h1>
          <p style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--gray-600)', marginBottom: '24px' }}>
            Go from Python fundamentals to real backend systems with Go, SQL, Docker, and portfolio projects.
          </p>
          <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '40px' }}>
            Also available in: <span style={{ fontWeight: 600, color: 'var(--gray-700)', textDecoration: 'underline' }}>TypeScript</span>
          </div>
          
          <button style={{
            background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '16px 40px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 0 40px rgba(241,89,32,0.4)', transition: 'all 0.2s',
            letterSpacing: '0.05em', textTransform: 'uppercase'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(241,89,32,0.6)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(241,89,32,0.4)'; }}
          onClick={() => router.push('/dashboard')}
          >
            Continue The Learning Path
          </button>

          <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-200)', border: '2px solid var(--white)', zIndex: 3 }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-300)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 2 }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-400)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 1 }}></div>
              </div>
              <span style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 500 }}>Join 1,201,282 students from companies like</span>
            </div>
            
            {/* Fake Logos using text since we don't have SVGs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', opacity: 0.6 }}>
              <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-1px' }}>Google</span>
              <span style={{ fontSize: '20px', fontWeight: 800 }}>HashiCorp</span>
              <span style={{ fontSize: '22px', fontWeight: 700 }}>stripe</span>
              <span style={{ fontSize: '20px', fontWeight: 600 }}>Microsoft</span>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE LIST */}
      <div style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '16px' }}>Course List</h2>
            <p style={{ fontSize: '18px', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Packed with 15 courses and 8 projects this path takes most beginners about 12 months to complete
            </p>
            <p style={{ fontSize: '14px', color: 'var(--gray-500)', maxWidth: '700px', margin: '24px auto 0', lineHeight: 1.6 }}>
              Backend developers build the systems that power the large-scale web applications that you use every day. In this complete learning path you'll start by learning the fundamentals of programming and computer science in Python and C, then you'll learn all about building scalable and secure back-end systems using Golang, SQL and Docker.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {courses.map((course, idx) => (
              <div key={idx} style={{ 
                border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', 
                background: 'var(--white)', display: 'flex', gap: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ fontSize: '48px', flexShrink: 0, marginTop: '24px' }}>{course.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    {course.type}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '24px' }}>
                    {idx + 1}. {course.title}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {course.chapters.map((ch, i) => (
                      <div key={i} style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{ch}</div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--gray-100)', paddingTop: '24px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Last updated: Jun 2026</span>
                    <button style={{
                      background: 'var(--gray-100)', color: 'var(--gray-900)', border: 'none', borderRadius: '24px',
                      padding: '8px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--gray-200)'}
                    onMouseOut={e => e.currentTarget.style.background = 'var(--gray-100)'}
                    onClick={() => router.push('/dashboard')}
                    >
                      Enter {course.type}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div style={{ padding: '80px 24px', background: 'var(--gray-50)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Join 1,201,282 students learning modern backend skills
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--gray-600)', marginBottom: '48px' }}>
              Connect directly with them and others in our flourishing online community
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '64px' }}>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>33.7M</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>lessons completed</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>208K</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>courses completed</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>7.4B</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>xp earned</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ 
                background: 'var(--white)', border: '1px solid var(--orange)', borderRadius: '12px', padding: '24px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{ fontSize: '15px', color: 'var(--gray-700)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
                    "{rev.text}"
                  </p>
                  <span style={{ fontSize: '13px', color: 'var(--orange)', textDecoration: 'underline', cursor: 'pointer' }}>Read full review</span>
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(star => <span key={star} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>)}
                    <span style={{ fontSize: '12px', color: 'var(--gray-500)', marginLeft: '4px' }}>(5/5)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray-200)' }}></div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>{rev.author}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{rev.location}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--gray-500)' }}>
                    {rev.course}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '8px' }}>Frequently asked Questions</h2>
            <p style={{ fontSize: '16px', color: 'var(--gray-600)' }}>Got questions? We've got answers</p>
          </div>

          <div style={{ border: '1px solid var(--orange)', borderRadius: '12px', padding: '0 32px' }}>
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

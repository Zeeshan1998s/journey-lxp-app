'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useJourney } from '../../contexts/JourneyContext';
import { useRouter } from 'next/navigation';

export default function JourneyLandingPage({ params }: { params: { id: string } }) {
  const { generatedJourney } = useJourney();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const theme = {
    bg: '#121420',
    card: '#1a1c29',
    cardHover: '#1f2233',
    border: '#2c2e43',
    gold: '#fcd34d',
    goldGlow: 'rgba(252, 211, 77, 0.25)',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    bluePrimary: '#38bdf8'
  };

  const reviews = [
    { text: "This platform is amazing! I just completed the path almost entirely on my phone...", name: "Benjamin Wolf", location: "United States", avatar: "🐺", rating: 5 },
    { text: "This was awesome! I loved it!", name: "Tony DeJesus", location: "United States", avatar: "🧔", rating: 5 },
    { text: "Hands down best 101 course", name: "Mateo Milic", location: "Croatia", avatar: "M", rating: 5 },
    { text: "This is quite an ideal introductory course for programming concepts...", name: "Sinan Akkaya", location: "United States", avatar: "🤖", rating: 5 },
    { text: "Its clear and easy to start so i would recomend it to anyone...", name: "Rolf Klim", location: "Netherlands", avatar: "R", rating: 5 },
    { text: "very interactive and engaging", name: "Saaketh Makam", location: "India", avatar: "🧔‍♂️", rating: 4 },
  ];

  const features = [
    { icon: '🔥', title: 'Avoid tutorial hell', desc: 'by writing a ton of code' },
    { icon: '⚡', title: 'Stay motivated with', desc: 'a game-like curriculum' },
    { icon: '💼', title: 'Build portfolio projects', desc: 'to prove your skills' },
    { icon: '🎓', title: 'Delve deeper', desc: 'into foundational concepts' },
    { icon: '☁️', title: 'Learn flexibly online', desc: 'without interrupting your life' },
    { icon: '💵', title: 'For 1% the price of college', desc: 'to minimize your financial risk' },
  ];

  const faqs = [
    { q: "Can I sign up and try for free?", a: "Yes! It's free to create an account and start learning. You'll get all the immersive features for free for a few chapters." },
    { q: "Hasn't AI made learning to code obsolete?", a: "Not at all. AI is a tool that enhances a developer's workflow, but understanding the core concepts is more important than ever." },
    { q: "How long will it take to learn enough to be hired?", a: "It depends on your pace, but most dedicated learners can be job-ready in 6-12 months." },
    { q: "Should I include these projects in my resume?", a: "Absolutely. The portfolio projects you build here are designed to be shown off to employers." },
    { q: "What makes this different from a bootcamp?", a: "We offer the same depth of curriculum but at a fraction of the cost, fully self-paced, and extremely interactive." },
  ];

  const chapters = generatedJourney?.nodes.filter(n => n.type === 'branch') || [
    { id: '1', label: 'Introduction' },
    { id: '2', label: 'Variables' },
    { id: '3', label: 'Functions' },
    { id: '4', label: 'Scope' },
    { id: '5', label: 'Testing and Debugging' },
    { id: '6', label: 'Computing' },
    { id: '7', label: 'Comparisons' },
    { id: '8', label: 'Loops' },
    { id: '9', label: 'Lists' },
    { id: '10', label: 'Dictionaries' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font, system-ui, sans-serif)',
      backgroundImage: 'radial-gradient(circle at 50% 10%, #1a1c29 0%, transparent 60%)',
      overflowX: 'hidden'
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');
      `}</style>

      {/* TOP GOLD TRIM */}
      <div style={{
        height: '4px',
        width: '100%',
        background: 'linear-gradient(90deg, #b45309 0%, #fcd34d 50%, #b45309 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '32px',
          height: '32px',
          backgroundColor: '#38bdf8',
          border: '3px solid #fcd34d',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)'
        }}></div>
      </div>

      {/* HERO SECTION */}
      <div style={{padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '56px',
          fontWeight: 700,
          color: theme.text,
          marginBottom: '16px',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {generatedJourney?.title || 'Learn to Code in Python'}
        </h1>
        <p style={{
          fontSize: '18px',
          color: theme.textMuted,
          maxWidth: '600px',
          margin: '0 auto 64px',
          lineHeight: 1.6
        }}>
          Start coding with hands-on lessons that build the habits you'll use in every future course.
        </p>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '64px', flexWrap: 'wrap'}}>
          {/* Author */}
          <div style={{display: 'flex', gap: '16px', textAlign: 'left', maxWidth: '300px'}}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', 
              backgroundColor: '#1e3a8a', border: `2px solid ${theme.gold}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px'
            }}>
              🧙‍♂️
            </div>
            <div>
              <div style={{fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Author</div>
              <div style={{fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '8px'}}>Journeybuilder Team</div>
              <div style={{fontSize: '13px', color: theme.textMuted, lineHeight: 1.5}}>
                Our expert in-house course authors are tenured software developers whose love for coding is only outstripped by a love for teaching.
              </div>
            </div>
          </div>

          {/* Center Call to Action */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button 
              onClick={() => router.push(`/journey/${params.id}/map`)}
              style={{
                backgroundColor: 'transparent',
                color: theme.gold,
                border: `2px solid ${theme.gold}`,
                borderRadius: '4px',
                padding: '16px 48px',
                fontSize: '16px',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: `0 0 30px ${theme.goldGlow}, inset 0 0 20px ${theme.goldGlow}`,
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = theme.gold;
                e.currentTarget.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = theme.gold;
              }}
            >
              Start the Course
            </button>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 700}}>
              4.8 <span style={{color: theme.gold, fontSize: '20px'}}>★★★★★</span> <span style={{fontSize: '14px', color: theme.textMuted, fontWeight: 400}}>9,998</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px'}}>
              <div style={{display: 'flex'}}>
                {['👨‍💻', '👩‍🔬', '👨‍🎓'].map((emoji, i) => (
                  <div key={i} style={{
                    width: '28px', height: '28px', borderRadius: '50%', backgroundColor: theme.card,
                    border: `2px solid ${theme.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginLeft: i > 0 ? '-10px' : 0, fontSize: '14px'
                  }}>{emoji}</div>
                ))}
              </div>
              <span style={{fontSize: '14px', color: theme.textMuted}}>Join 752,371 students from companies like</span>
            </div>
            <div style={{display: 'flex', gap: '24px', marginTop: '16px', fontSize: '20px', color: theme.textMuted, fontWeight: 700}}>
              <span>Google</span>
              <span>HashiCorp</span>
              <span>stripe</span>
              <span>Microsoft</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'left'}}>
            <div>
              <div style={{color: theme.gold, fontSize: '20px', marginBottom: '8px'}}>⏱️</div>
              <div style={{fontWeight: 700, fontSize: '15px'}}>30 Hours</div>
              <div style={{fontSize: '13px', color: theme.textMuted}}>of content</div>
            </div>
            <div>
              <div style={{color: theme.gold, fontSize: '20px', marginBottom: '8px'}}>✓</div>
              <div style={{fontWeight: 700, fontSize: '15px'}}>191 Addicting</div>
              <div style={{fontSize: '13px', color: theme.textMuted}}>lessons</div>
            </div>
            <div>
              <div style={{color: theme.gold, fontSize: '20px', marginBottom: '8px'}}>⭐</div>
              <div style={{fontWeight: 700, fontSize: '15px'}}>Earn a certificate</div>
              <div style={{fontSize: '13px', color: theme.textMuted}}>of completion</div>
            </div>
            <div>
              <div style={{color: theme.gold, fontSize: '20px', marginBottom: '8px'}}>☁️</div>
              <div style={{fontWeight: 700, fontSize: '15px'}}>Learn online</div>
              <div style={{fontSize: '13px', color: theme.textMuted}}>at your pace</div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div style={{
        padding: '100px 24px',
        backgroundColor: 'rgba(20, 22, 35, 0.5)',
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontFamily: '"Cinzel", serif', fontSize: '36px', fontWeight: 700, marginBottom: '16px'}}>
            Join 752,371 students in the course
          </h2>
          <p style={{fontSize: '16px', color: theme.textMuted, marginBottom: '64px'}}>
            Read reviews of their learning experiences
          </p>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {reviews.map((rev, i) => (
              <div key={i} style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = theme.gold}
              onMouseOut={(e) => e.currentTarget.style.borderColor = theme.border}
              >
                <p style={{fontSize: '15px', color: theme.text, lineHeight: 1.6, marginBottom: '16px', flex: 1}}>
                  "{rev.text}"
                </p>
                <span style={{fontSize: '12px', color: theme.bluePrimary, textDecoration: 'underline', cursor: 'pointer', marginBottom: '24px'}}>Read full review</span>
                <div style={{textAlign: 'center', marginBottom: '16px'}}>
                  <span style={{color: theme.gold}}>{'★'.repeat(rev.rating)}{'☆'.repeat(5-rev.rating)}</span>
                  <span style={{color: theme.textMuted, fontSize: '13px', marginLeft: '8px'}}>({rev.rating}/5)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px'}}>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>
                    {rev.avatar}
                  </div>
                  <div style={{textAlign: 'left'}}>
                    <div style={{fontSize: '14px', fontWeight: 700, color: theme.text}}>{rev.name}</div>
                    <div style={{fontSize: '12px', color: theme.textMuted}}>{rev.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND GOLD TRIM */}
      <div style={{
        height: '4px',
        width: '100%',
        background: 'linear-gradient(90deg, #b45309 0%, #fcd34d 50%, #b45309 100%)',
      }}></div>

      {/* FEATURES SECTION */}
      <div style={{padding: '120px 24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center'}}>
        <h2 style={{fontFamily: '"Cinzel", serif', fontSize: '36px', fontWeight: 700, marginBottom: '16px'}}>
          Mediocrity doesn't cut it anymore
        </h2>
        <p style={{fontSize: '18px', color: theme.text, fontWeight: 600, maxWidth: '400px', margin: '0 auto 80px', lineHeight: 1.5}}>
          The only way to become a great developer is to write a lot of code
        </p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '64px', textAlign: 'left'}}>
          {features.map((feat, i) => (
            <div key={i}>
              <div style={{fontSize: '24px', color: theme.gold, marginBottom: '16px'}}>{feat.icon}</div>
              <h3 style={{fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '4px'}}>{feat.title}</h3>
              <p style={{fontSize: '14px', color: theme.textMuted}}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* THIRD GOLD TRIM */}
      <div style={{
        height: '4px',
        width: '100%',
        background: 'linear-gradient(90deg, #b45309 0%, #fcd34d 50%, #b45309 100%)',
      }}></div>

      {/* CHAPTER LIST */}
      <div style={{padding: '120px 24px', backgroundColor: 'rgba(20, 22, 35, 0.5)'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2 style={{fontFamily: '"Cinzel", serif', fontSize: '36px', fontWeight: 700, marginBottom: '24px', textAlign: 'center'}}>
            What will you learn?
          </h2>
          <p style={{fontSize: '15px', color: theme.textMuted, lineHeight: 1.6, textAlign: 'center', marginBottom: '64px', maxWidth: '600px', margin: '0 auto 64px'}}>
            Learn the basics of the programming language, and why it's one of the most popular out there. You'll get hands-on practice with all the core concepts.
          </p>
          
          <h3 style={{fontFamily: '"Cinzel", serif', fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '32px'}}>
            Chapter List
          </h3>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            {chapters.map((ch, i) => (
              <div key={i} style={{display: 'flex', padding: '24px 0', borderBottom: `1px solid ${theme.border}`}}>
                <div style={{width: '60px', fontSize: '20px', fontWeight: 700, color: theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {i + 1}
                </div>
                <div>
                  <h4 style={{fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '4px'}}>{ch.label}</h4>
                  <p style={{fontSize: '14px', color: theme.textMuted}}>Learn about the core concepts of {ch.label.toLowerCase()} in a hands-on way.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{padding: '120px 24px', maxWidth: '800px', margin: '0 auto'}}>
        <h2 style={{fontFamily: '"Cinzel", serif', fontSize: '36px', fontWeight: 700, marginBottom: '16px', textAlign: 'center'}}>
          Frequently asked Questions
        </h2>
        <p style={{fontSize: '16px', color: theme.textMuted, textAlign: 'center', marginBottom: '64px'}}>
          Got questions? We've got answers
        </p>

        <div style={{border: `1px solid ${theme.gold}`, padding: '0 32px'}}>
          {faqs.map((faq, i) => (
            <div key={i} style={{borderBottom: i === faqs.length - 1 ? 'none' : `1px solid ${theme.border}`}}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', 
                  alignItems: 'center', backgroundColor: 'transparent', border: 'none',
                  color: theme.text, fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {faq.q}
                <span style={{color: theme.gold, fontSize: '18px', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s'}}>
                  {openFaq === i ? '⌄' : '⌄'}
                </span>
              </button>
              <div style={{
                maxHeight: openFaq === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out',
              }}>
                <p style={{paddingBottom: '24px', color: theme.textMuted, fontSize: '14px', lineHeight: 1.6}}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

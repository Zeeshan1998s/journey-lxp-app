'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useJourney } from '../contexts/JourneyContext';

export default function Dashboard() {
  const { data: session } = useSession();
  const { generatedJourney, completedNodes } = useJourney();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Guest';
  const userInitial = userName.substring(0, 1).toUpperCase();

  const journeyTitle = generatedJourney?.title || 'Back-end Developer Path';
  
  // Extract dynamic chapters from the generated journey
  const dynamicNodes = generatedJourney?.nodes?.filter((n: any) => n.type === 'branch' || n.type === 'default') || [
    { label: 'Clean Code', type: 'default' },
    { label: 'Classes', type: 'default' },
    { label: 'Encapsulation', type: 'default' },
    { label: 'Abstraction', type: 'default' },
    { label: 'Inheritance', type: 'default' }
  ];
  
  const activeNodeIndex = Math.max(0, dynamicNodes.findIndex((n: any) => !completedNodes.includes(n.data?.label || n.label)));
  const safeActiveNodeIndex = activeNodeIndex === -1 ? dynamicNodes.length - 1 : activeNodeIndex;
  
  const currentTopic = (dynamicNodes[safeActiveNodeIndex] as any)?.data?.label || (dynamicNodes[safeActiveNodeIndex] as any)?.label || 'Chapter';

  const baseChapters = dynamicNodes.map((n: any, i: number) => {
    const isComp = completedNodes.includes(n.data?.label || n.label);
    const isAct = i === safeActiveNodeIndex;
    return {
      num: i + 1,
      title: n.data?.label || n.label || `Module ${i+1}`,
      progress: isComp ? '100%' : (isAct ? '45%' : '0%'),
      pct: isComp ? 100 : (isAct ? 45 : 0),
      active: isAct
    };
  });

  // We can just take the first 4 nodes to mock journeys, or use defaults
  const journeys = dynamicNodes.length > 3 ? dynamicNodes.slice(0, 4).map((n: any, i) => ({
    num: i + 1,
    title: n.data?.label || n.label || `Journey ${i+1}`,
    progress: i === 0 ? '135 / 191' : (i === 1 ? '66 / 67' : (i === 2 ? '12 / 12' : '75 / 75')),
    pct: i === 0 ? 70 : (i === 1 ? 98 : (i === 2 ? 100 : 100)),
    icon: i === 0 ? '🐍' : (i === 1 ? '🐧' : (i === 2 ? '🛠️' : '🎋'))
  })) : [
    { num: 1, title: 'Learn to Code in Python', progress: '135 / 191', pct: 70, icon: '🐍' },
    { num: 2, title: 'Learn Linux', progress: '66 / 67', pct: 98, icon: '🐧' },
    { num: 3, title: 'Build a Bookbot', progress: '12 / 12', pct: 100, icon: '🛠️' },
    { num: 4, title: 'Learn Git', progress: '75 / 75', pct: 100, icon: '🎋' },
  ];

  const faqs = [
    { q: "What's coming out next?", a: "You can see the journeys and projects we're releasing next on our roadmap on GitHub. Do not wait for more content before you start! This is a living learning path that will always be growing and improving." },
    { q: "Can I skip ahead?", a: "We highly recommend completing the journeys in order, but you are free to skip around if you already have experience with certain topics." },
    { q: "Why these programming languages?", a: "Python and Go are the most in-demand backend languages today, offering a perfect blend of developer productivity and high-performance execution." },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--gray-50)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        
        {/* Greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--orange-bg)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, border: '2px solid var(--orange)' }}>
              {userInitial}
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gray-700)' }}>
              Ready to dive into some code, <span style={{ fontWeight: 800, color: 'var(--gray-900)' }}>{userName}</span>?
            </h1>
          </div>
          <Link href="/">
            <button style={{
              background: 'var(--white)', color: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '10px', 
              padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.2s'
            }} className="card-hover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create New Journey
            </button>
          </Link>
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
                  {journeyTitle} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-500)' }}>(Path)</span>
                </h2>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                  Current Node - {currentTopic}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/journey/1/map">
                  <button style={{ 
                    background: 'var(--white)', color: 'var(--gray-700)', border: '1px solid var(--gray-300)', borderRadius: '10px',
                    padding: '12px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.1s'
                  }}
                  className="card-hover"
                  >
                    View Map
                  </button>
                </Link>
                <Link href={`/chapter?topic=${encodeURIComponent(currentTopic)}`}>
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
            </div>

            {/* Path Nodes */}
            <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginTop: '20px' }}>
              {/* Connecting line */}
              <div style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', height: '3px', background: 'var(--gray-200)', zIndex: 1, transform: 'translateY(-50%)' }}>
                <div style={{ height: '100%', background: 'var(--orange)', width: '50%' }}></div>
              </div>
              
              {/* Nodes */}
              {dynamicNodes.slice(Math.max(0, safeActiveNodeIndex - 2), Math.max(0, safeActiveNodeIndex - 2) + 5).map((node: any, i: number) => {
                const nodeLabel = node.data?.label || node.label;
                const nodeIndex = dynamicNodes.findIndex((n: any) => (n.data?.label || n.label) === nodeLabel);
                const isCompleted = completedNodes.includes(nodeLabel);
                const isActive = nodeIndex === safeActiveNodeIndex;
                const isLocked = !isCompleted && !isActive;
                
                const content = (
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: isLocked ? 0.5 : 1 }}>
                      <div style={{ 
                        width: isActive ? '40px' : '32px', height: isActive ? '40px' : '32px',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? 'var(--orange)' : (isCompleted ? 'var(--orange-bg)' : 'var(--white)'),
                        border: isActive ? '3px solid var(--orange-bg)' : (isCompleted ? '2px solid var(--orange)' : '2px solid var(--gray-300)'),
                        color: isActive ? '#fff' : (isCompleted ? 'var(--orange)' : 'var(--gray-400)'),
                        fontSize: isActive ? '16px' : '14px', fontWeight: 800,
                        boxShadow: isActive ? '0 0 0 4px rgba(241,89,32,0.1)' : 'none',
                        transition: 'all 0.2s', cursor: isLocked ? 'not-allowed' : 'pointer'
                      }}>
                        {isCompleted ? '✓' : (nodeIndex + 1)}
                      </div>
                      {isActive && (
                        <div style={{ position: 'absolute', top: '48px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>
                          {nodeLabel}
                        </div>
                      )}
                    </div>
                );

                if (isLocked) {
                  return <div key={i}>{content}</div>;
                }

                return (
                  <Link href={`/chapter?topic=${encodeURIComponent(nodeLabel)}`} key={i} style={{ textDecoration: 'none' }}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
          
        </div>

        {/* CHAPTERS SECTION */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>{journeyTitle}</h2>
            <span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Chapters</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
            {baseChapters.map((ch: any, i: number) => (
              <Link href={`/chapter?topic=${encodeURIComponent(ch.title)}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ 
                  minWidth: '220px', background: 'var(--white)', border: ch.active ? '1px solid var(--orange)' : '1px solid var(--border)', 
                  borderRadius: '12px', padding: '16px', boxShadow: ch.active ? '0 4px 12px rgba(241,89,32,0.06)' : 'none',
                  cursor: 'pointer', transition: 'transform 0.2s'
                }} className="card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: ch.active ? 'var(--orange)' : 'var(--gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                      {ch.num}. {ch.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600 }}>{ch.progress}</div>
                  </div>
                  <div style={{ height: '6px', background: 'var(--gray-100)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: ch.pct === 100 ? '#10b981' : 'var(--orange)', width: `${ch.pct}%`, borderRadius: '3px' }}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* JOURNEYS & ACCORDION */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Journeys List */}
          <div style={{ flex: 1, minWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>{journeyTitle}</h2>
              <span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Journeys</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {journeys.map((journey, i) => (
                <Link href="/journeys" key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ 
                    background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px',
                    display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer'
                  }} className="card-hover">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Journey</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)' }}>{journey.num}. {journey.title}</div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontWeight: 600 }}>{journey.progress}</div>
                      </div>
                      <div style={{ height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: journey.pct === 100 ? '#10b981' : 'var(--orange)', width: `${journey.pct}%`, borderRadius: '4px' }}></div>
                      </div>
                    </div>
                    <div style={{ fontSize: '24px', flexShrink: 0 }}>
                      {journey.icon}
                    </div>
                  </div>
                </Link>
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

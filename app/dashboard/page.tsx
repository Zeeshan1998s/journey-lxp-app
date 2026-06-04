'use client';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main style={{flex: 1, padding: '40px', background: '#f8f7f5', overflowY: 'auto'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px'}}>
          <div>
            <h1 style={{fontSize: '32px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px'}}>Welcome back, Acolyte!</h1>
            <p style={{color: 'var(--gray-600)', fontSize: '16px'}}>Ready to continue your learning journey?</p>
          </div>
          <Link href="/">
            <button style={{
              background: 'var(--gray-900)', color: 'white', border: 'none', borderRadius: '8px', 
              padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create New Journey
            </button>
          </Link>
        </div>

        <div style={{display: 'flex', gap: '32px'}}>
          
          {/* Left Column: Stats */}
          <div style={{width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div style={{background: 'var(--white)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'}}>
              <h2 style={{fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: 'var(--gray-900)'}}>Your Stats</h2>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'var(--orange-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontSize: '20px'}}>🔥</div>
                <div>
                  <div style={{fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)'}}>12 Days</div>
                  <div style={{fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500}}>Current Streak</div>
                </div>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'var(--orange-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontSize: '20px'}}>⭐</div>
                <div>
                  <div style={{fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)'}}>4,250</div>
                  <div style={{fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500}}>Total XP Earned</div>
                </div>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'var(--orange-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontSize: '20px'}}>🏆</div>
                <div>
                  <div style={{fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)'}}>Level 31</div>
                  <div style={{fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500}}>Acolyte Rank</div>
                </div>
              </div>
            </div>

            <div style={{background: 'var(--white)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'}}>
               <h2 style={{fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-900)'}}>Recent Badges</h2>
               <div style={{display: 'flex', gap: '12px'}}>
                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', border: '2px solid #fbbf24'}} title="First Journey"></div>
                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', border: '2px solid #818cf8'}} title="Quick Learner"></div>
                 <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', border: '2px solid #4ade80'}} title="7 Day Streak"></div>
               </div>
            </div>
          </div>

          {/* Right Column: Journeys */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '32px'}}>
            
            {/* Active Journey */}
            <div>
              <h2 style={{fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-900)'}}>Continue Learning</h2>
              <Link href="/journey/1" style={{textDecoration: 'none'}}>
                <div style={{
                  background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px',
                  display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }} className="journey-card-hover">
                  <div style={{width: '120px', height: '120px', borderRadius: '12px', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <h3 style={{fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px'}}>Python for Data Science</h3>
                      <span style={{background: 'var(--orange-bg)', color: 'var(--orange)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700}}>In Progress</span>
                    </div>
                    <p style={{color: 'var(--gray-600)', fontSize: '15px', marginBottom: '20px'}}>Master data manipulation, visualization, and basic machine learning algorithms using Pandas, Matplotlib, and Scikit-Learn.</p>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <div style={{flex: 1, height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden'}}>
                        <div style={{width: '45%', height: '100%', background: 'var(--orange)', borderRadius: '4px'}}></div>
                      </div>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--gray-700)'}}>45% Complete</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Featured Journeys */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <h2 style={{fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)'}}>Featured Journeys</h2>
                <button style={{background: 'transparent', border: 'none', color: 'var(--orange)', fontWeight: 600, fontSize: '14px', cursor: 'pointer'}}>View All</button>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                {[
                  { title: 'Advanced Next.js Architecture', desc: 'Learn App Router, Server Actions, and advanced patterns.', color: '#0f172a', icon: '⚛️' },
                  { title: 'Kubernetes Mastery', desc: 'Deploy and scale containerized applications with K8s.', color: '#3b82f6', icon: '⛴️' },
                  { title: 'Rust for Beginners', desc: 'Memory safety without garbage collection.', color: '#ea580c', icon: '🦀' },
                  { title: 'System Design Interview', desc: 'Prepare for top-tier software engineering interviews.', color: '#16a34a', icon: '🏗️' }
                ].map((course, i) => (
                  <Link key={i} href={`/journey/${i+2}`} style={{textDecoration: 'none'}}>
                    <div style={{
                      background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px',
                      cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%'
                    }} className="featured-card-hover">
                      <div style={{width: '48px', height: '48px', borderRadius: '12px', background: course.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px'}}>
                        {course.icon}
                      </div>
                      <h3 style={{fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px'}}>{course.title}</h3>
                      <p style={{color: 'var(--gray-600)', fontSize: '14px', flex: 1}}>{course.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .journey-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important; border-color: var(--orange) !important; }
        .featured-card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); border-color: var(--orange) !important; }
      `}} />
    </main>
  );
}

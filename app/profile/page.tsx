import { getUser } from '../actions/gamification';
import '../styles/profile-styles.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

// Components
import PlayerCard from '../components/profile/PlayerCard';
import SocialLinks from '../components/profile/SocialLinks';
import StatsBox from '../components/profile/StatsBox';
import Heatmap from '../components/profile/Heatmap';
import AchievementCard from '../components/profile/AchievementCard';
import JourneyCard from '../components/profile/JourneyCard';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = await getUser();
  
  if (!user || !session?.user) return null;
  
  // Calculate Level (e.g. 1 level per 100 XP)
  const level = Math.floor(user.xp / 100) + 1;

  // Generate dummy heatmap data (364 days = 52 weeks * 7 days)
  const heatmapData = Array.from({ length: 364 }, () => {
    const rand = Math.random();
    if (rand > 0.8) return 4;
    if (rand > 0.6) return 3;
    if (rand > 0.4) return 2;
    if (rand > 0.2) return 1;
    return 0;
  });

  return (
    <main className="profile-main">
      <div className="profile-container">
        
        <Link href="/" className="back-link" style={{ color: 'var(--gray-600)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 500, transition: 'color 0.2s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </Link>

        <div className="profile-layout">
          {/* Left Column (Sidebar) */}
          <div className="profile-left">
            <PlayerCard session={session} level={level} xp={user.xp} />
            <SocialLinks />

            {/* About Me Box */}
            <div className="profile-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: 'var(--gray-900)', fontSize: '16px', fontWeight: 600 }}>A little something about me</span>
                <svg className="edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <p style={{ color: 'var(--gray-600)', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>
                Passionate learner and aspiring developer. I love diving into new technologies and exploring the world of web development. Currently focusing on React, Next.js, and building beautiful user interfaces! 🚀
              </p>
            </div>
          </div>

          {/* Right Column (Main Content) */}
          <div className="profile-right">
            <StatsBox user={user} />
            <Heatmap heatmapData={heatmapData} />
            
            {/* Achievements Section */}
            <h2 className="section-heading" style={{ marginTop: '0' }}>Achievements</h2>
            <div className="achievements-grid">
              <AchievementCard 
                color="#3b82f6"
                title={<>Diamond: <span>Milestone</span></>}
                description="Complete 240 exercises"
                date="Apr 29, 2026"
                badge={
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                    <circle cx="50" cy="50" r="20" fill="var(--white)" />
                  </svg>
                }
              />
              <AchievementCard 
                color="#f59e0b"
                title={<>Gold: <span>Sharpshooter</span></>}
                description="Complete 6 sharpshooter sprees"
                date="Apr 27, 2026"
                badge={
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" />
                    <circle cx="50" cy="50" r="25" fill="#fcd34d" />
                  </svg>
                }
              />
              <AchievementCard 
                color="#b45309"
                title={<>Bronze: <span>Fellowship</span></>}
                description="Earn 1 karma in the discord"
                date="Jun 3, 2026"
                badge={
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                    <rect x="40" y="40" width="20" height="30" fill="var(--white)" />
                  </svg>
                }
              />
            </div>

            {/* Journeys Section */}
            <h2 className="section-heading">2 Journeys Completed</h2>
            <div className="journeys-grid">
              <JourneyCard title="Learn Market Research" date="Apr 29, 2026" imageSrc="/images/journey.png" />
              <JourneyCard title="Consumer Behavior" date="May 19, 2026" imageSrc="/images/journey.png" />
            </div>

            {/* Projects Section */}
            <h2 className="section-heading">1 Projects Completed</h2>
            <div className="journeys-grid">
              <JourneyCard title="Build a Persona Dashboard" date="May 1, 2026" imageSrc="/images/journey.png" />
            </div>
          </div>
        </div>
        
        <div style={{ height: '40px' }}></div>
      </div>
    </main>
  );
}

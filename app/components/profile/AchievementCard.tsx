import React from 'react';

interface AchievementCardProps {
  color: string;
  title: React.ReactNode;
  description: string;
  date: string;
  badge: React.ReactNode;
}

export default function AchievementCard({ color, title, description, date, badge }: AchievementCardProps) {
  return (
    <div className="profile-card achievement-card">
      <div className="achievement-badge" style={{ color }}>
        {badge}
      </div>
      <div className="achievement-info">
        <div className="achievement-title">{title}</div>
        <div className="achievement-desc">{description}</div>
        <div className="achievement-date">{date}</div>
      </div>
    </div>
  );
}

import React from 'react';

interface JourneyCardProps {
  title: string;
  date: string;
  imageSrc: string;
}

export default function JourneyCard({ title, date, imageSrc }: JourneyCardProps) {
  return (
    <div className="journey-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="Journey Background" className="journey-bg" />
      <div className="journey-overlay">
        <h3 className="journey-title">{title}</h3>
        <p className="journey-date">{date}</p>
      </div>
    </div>
  );
}

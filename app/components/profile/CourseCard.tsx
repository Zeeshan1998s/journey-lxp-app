import React from 'react';

interface CourseCardProps {
  title: string;
  date: string;
  imageSrc: string;
}

export default function CourseCard({ title, date, imageSrc }: CourseCardProps) {
  return (
    <div className="course-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="Course Background" className="course-bg" />
      <div className="course-overlay">
        <h3 className="course-title">{title}</h3>
        <p className="course-date">{date}</p>
      </div>
    </div>
  );
}

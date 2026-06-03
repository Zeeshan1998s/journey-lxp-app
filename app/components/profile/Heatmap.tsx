import React from 'react';

export default function Heatmap({ heatmapData }: { heatmapData: number[] }) {
  return (
    <div className="profile-card heatmap-container">
      <div>
        <div className="heatmap-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', textAlign: 'left' }}>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-500)', paddingBottom: '16px', paddingTop: '4px' }}>
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="heatmap-grid">
            {heatmapData.map((level, i) => (
              <div key={i} className={`heatmap-cell level-${level}`}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="heatmap-footer">
        Less
        <div className="heatmap-legend">
          <div className="heatmap-cell"></div>
          <div className="heatmap-cell level-1"></div>
          <div className="heatmap-cell level-2"></div>
          <div className="heatmap-cell level-3"></div>
          <div className="heatmap-cell level-4"></div>
        </div>
        More
      </div>
    </div>
  );
}

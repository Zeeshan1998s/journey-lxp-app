import React from 'react';

export default function MapControls() {
  return (
    <div className="map-controls" style={{position: 'absolute', bottom: '24px', left: '20px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10}}>
      <button className="map-ctrl-btn">+</button>
      <button className="map-ctrl-btn">−</button>
      <button className="map-ctrl-btn">⊡</button>
      <button className="map-ctrl-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

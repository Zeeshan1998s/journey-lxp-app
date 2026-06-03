import Header from './components/Header';

export default function Home() {
  return (
    <main className="main-content" style={{flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--white)', position: 'relative', zIndex: 5}}>
      <Header />
      
      {/* VIEW TABS */}
      <div className="view-tabs-bar" style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--white)', padding: '0 16px', flexShrink: 0, zIndex: 5}}>
        <button className="view-tab active" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderBottom: '2px solid var(--orange-muted)', background: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: 'var(--orange-muted)', marginBottom: '-1px'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h6v6H3zm12 0h6v6h-6zm-6 12h6v6H9zm6 0h6v6h-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Nodes View
        </button>
        <button className="view-tab" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderBottom: '2px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: 'var(--dark)', marginBottom: '-1px'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3v8m-4-4l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Podcast View
        </button>
      </div>

      {/* NODE MAP VIEW */}
      <div className="node-map-container" style={{flex: 1, minHeight: 0, position: 'relative', background: '#f8f7f5', overflow: 'hidden'}}>
        <div className="node-map-canvas" style={{position: 'absolute', width: '100%', height: '100%', transformOrigin: 'center center', cursor: 'grab'}}>
          {/* Map Nodes (Hardcoded for prototype) */}
          <div className="map-node root-node" style={{left: '50%', top: '60px', transform: 'translateX(-50%)'}}>
            <span>Becoming a Product Manager</span>
          </div>

          <div className="map-node branch-node" style={{left: '38%', top: '160px'}}>
            <span>Core Responsibilities</span>
          </div>
          <div className="map-node leaf-node" style={{left: '12%', top: '215px'}}>
            <span>Define Product Vision</span>
          </div>
          <div className="map-node leaf-node" style={{left: '62%', top: '215px'}}>
            <span>Develop Product Roadmap</span>
          </div>

          <div className="map-node branch-node selected-node" style={{left: '38%', top: '340px'}}>
            <span>Stakeholder Collaboration</span>
          </div>
          <div className="map-node leaf-node" style={{left: '8%', top: '340px'}}>
            <span>Facilitate Cross-functional Communication</span>
          </div>
          <div className="map-node leaf-node" style={{left: '62%', top: '340px'}}>
            <span>Handle Stakeholder Feedback</span>
          </div>

          <div className="map-node branch-node" style={{left: '38%', top: '470px'}}>
            <span>Market Analysis</span>
          </div>
          <div className="map-node leaf-node" style={{left: '14%', top: '470px'}}>
            <span>Conduct Competitor Research</span>
          </div>
          <div className="map-node leaf-node" style={{left: '62%', top: '470px'}}>
            <span>Analyze Customer Needs</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="map-controls" style={{position: 'absolute', bottom: '24px', left: '20px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10}}>
          <button className="map-ctrl-btn">+</button>
          <button className="map-ctrl-btn">−</button>
          <button className="map-ctrl-btn">⊡</button>
          <button className="map-ctrl-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </main>
  );
}

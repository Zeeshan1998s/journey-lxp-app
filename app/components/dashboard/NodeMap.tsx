import React from 'react';

export default function NodeMap() {
  return (
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
  );
}

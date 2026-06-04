'use client';
import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Background,
  Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomMapNode from './CustomMapNode';
import { useJourney } from '../../contexts/JourneyContext';

const nodeTypes = {
  customNode: CustomMapNode,
};

const initialNodes = [
  { id: '1', type: 'customNode', position: { x: 500, y: 60 }, data: { label: 'Becoming a Product Manager', typeClass: 'root-node' } },
  { id: '2', type: 'customNode', position: { x: 380, y: 160 }, data: { label: 'Core Responsibilities', typeClass: 'branch-node' } },
  { id: '3', type: 'customNode', position: { x: 120, y: 215 }, data: { label: 'Define Product Vision', typeClass: 'leaf-node' } },
  { id: '4', type: 'customNode', position: { x: 620, y: 215 }, data: { label: 'Develop Product Roadmap', typeClass: 'leaf-node' } },
  { id: '5', type: 'customNode', position: { x: 380, y: 340 }, data: { label: 'Stakeholder Collaboration', typeClass: 'branch-node' } },
  { id: '6', type: 'customNode', position: { x: 80, y: 340 }, data: { label: 'Facilitate Cross-functional Communication', typeClass: 'leaf-node' } },
  { id: '7', type: 'customNode', position: { x: 620, y: 340 }, data: { label: 'Handle Stakeholder Feedback', typeClass: 'leaf-node' } },
  { id: '8', type: 'customNode', position: { x: 380, y: 470 }, data: { label: 'Market Analysis', typeClass: 'branch-node' } },
  { id: '9', type: 'customNode', position: { x: 140, y: 470 }, data: { label: 'Conduct Competitor Research', typeClass: 'leaf-node' } },
  { id: '10', type: 'customNode', position: { x: 620, y: 470 }, data: { label: 'Analyze Customer Needs', typeClass: 'leaf-node' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--orange-muted)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', style: { stroke: '#ccc', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#ccc', strokeWidth: 2 } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: 'var(--orange-muted)', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', style: { stroke: '#ccc', strokeWidth: 2 } },
  { id: 'e5-7', source: '5', target: '7', style: { stroke: '#ccc', strokeWidth: 2 } },
  { id: 'e5-8', source: '5', target: '8', animated: true, style: { stroke: 'var(--orange-muted)', strokeWidth: 2 } },
  { id: 'e8-9', source: '8', target: '9', style: { stroke: '#ccc', strokeWidth: 2 } },
  { id: 'e8-10', source: '8', target: '10', style: { stroke: '#ccc', strokeWidth: 2 } },
];

export default function NodeMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { selectedNode, setSelectedNode, activeArtifact, setActiveArtifact, isExpanded, setIsExpanded } = useJourney();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  };

  const handlePaneClick = () => {
    setSelectedNode(null);
    setActiveArtifact(null);
    setIsExpanded(false);
  };

  const title = activeArtifact === 'videos' ? 'Videos' :
                activeArtifact === 'articles' ? 'Articles' :
                activeArtifact === 'pdfs' ? 'PDFs' :
                activeArtifact === 'course' ? 'Course' :
                activeArtifact === 'flashcards' ? 'Flashcards' :
                activeArtifact === 'faq' ? 'FAQ' :
                activeArtifact === 'quiz' ? 'Quizzes' :
                activeArtifact?.toUpperCase();

  const getTag = () => {
    if (activeArtifact === 'videos') {
      return (
        <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--orange-bg)', color: 'var(--orange)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          VIDEO
        </span>
      );
    }
    if (activeArtifact === 'pdfs') {
      return (
        <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#fef2f2', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          PDFs
        </span>
      );
    }
    return (
      <span style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-100)', color: 'var(--gray-800)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {title}
      </span>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#ccc" gap={16} />
        <Controls />
      </ReactFlow>

      {/* Artifact Modal Overlay - Map Area Only (Hidden when Expanded) */}
      {activeArtifact && !isExpanded && (
        <div 
          className="artifact-modal-backdrop"
          onClick={() => { setActiveArtifact(null); setIsExpanded(false); }}
          style={{
            position: 'absolute', inset: 0, background: 'transparent', 
            zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div 
            className={`videos-overlay-modal ${isExpanded ? 'expanded' : ''}`} 
            onClick={(e) => e.stopPropagation()}
            style={isExpanded ? {position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1000, margin: 0, borderRadius: 0, top: 0, left: 0} : { zIndex: 1000, overflowY: 'auto' }}
          >
            <div className="videos-overlay-header" style={{padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-100)'}}>
              <div className="videos-overlay-title" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                {getTag()}
                <span className="videos-overlay-title-text" style={{fontSize: '13px', color: 'var(--gray-700)'}}>{selectedNode?.data?.label || 'Market Research'} · 8 {title}</span>
              </div>
              <div className="videos-overlay-actions" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <button className="btn-outline" onClick={() => setIsExpanded(!isExpanded)} style={{padding: '6px 12px', fontSize: '11px', color: 'var(--gray-600)'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px'}}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg> {isExpanded ? 'Exit Full Screen' : 'Full Screen'}
                </button>
                <button className="icon-btn" onClick={() => { setActiveArtifact(null); setIsExpanded(false); }} style={{width: '28px', height: '28px', background: '#fee2e2', color: '#ef4444', border: '1px solid #fecaca'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <div className="videos-overlay-list" style={isExpanded ? {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '24px'} : {padding: '24px'}}>
              <div className="videos-overlay-top" style={isExpanded ? {gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'} : {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <span className="videos-overlay-list-title" style={{fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)'}}>{title}</span>
                <span style={{fontSize: '12px', color: 'var(--gray-500)'}}>8/8</span>
              </div>
              <div className="videos-overlay-search" style={isExpanded ? {gridColumn: '1 / -1', marginBottom: '16px', position: 'relative'} : {marginBottom: '16px', position: 'relative'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--gray-400)'}}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input type="text" placeholder="Search documents" style={{width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--gray-200)', borderRadius: '8px', fontSize: '13px'}} />
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="videos-modal-item" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1px solid var(--gray-100)', borderRadius: '8px', marginBottom: '8px'}}>
                  <div className="videos-modal-item-thumb" style={{width: '72px', height: '54px', background: activeArtifact === 'pdfs' ? '#fef2f2' : activeArtifact === 'videos' ? '#111' : 'var(--gray-100)', color: activeArtifact === 'pdfs' ? '#ef4444' : activeArtifact === 'videos' ? '#fff' : 'var(--gray-700)', borderRadius: '6px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700}}>
                    {activeArtifact === 'pdfs' ? 'PDF' : activeArtifact === 'videos' ? <><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg><span style={{position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '9px', padding: '2px 4px', borderRadius: '3px'}}>6:10</span></> : title?.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="videos-modal-item-info" style={{flex: 1}}>
                    <div className="videos-modal-item-title" style={{fontSize: '13px', fontWeight: 600, color: 'var(--gray-900)'}}>Market Research Fundamentals</div>
                    <div className="videos-modal-item-sub" style={{fontSize: '11px', color: 'var(--gray-500)'}}>Starweaver Academy</div>
                  </div>
                  <div className="radio-square" style={{width: '18px', height: '18px', border: '1.5px solid var(--gray-300)', borderRadius: '4px'}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
  const { setSelectedNode, setActiveArtifact, setIsExpanded } = useJourney();

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

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
    </div>
  );
}

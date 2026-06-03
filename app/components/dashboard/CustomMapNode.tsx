import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function CustomMapNode({ data, selected }: { data: any, selected: boolean }) {
  return (
    <div className={`map-node ${data.typeClass} ${selected ? 'selected-node' : ''}`} style={{ position: 'relative', left: 'auto', top: 'auto', transform: 'none' }}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  );
}

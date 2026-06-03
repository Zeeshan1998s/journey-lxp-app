'use client';
import React, { createContext, useContext, useState } from 'react';

interface JourneyContextType {
  selectedNode: any;
  setSelectedNode: (node: any) => void;
  activeArtifact: string | null;
  setActiveArtifact: (artifact: string | null) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const JourneyContext = createContext<JourneyContextType>({
  selectedNode: null,
  setSelectedNode: () => {},
  activeArtifact: null,
  setActiveArtifact: () => {},
  isExpanded: false,
  setIsExpanded: () => {}
});

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <JourneyContext.Provider value={{ selectedNode, setSelectedNode, activeArtifact, setActiveArtifact, isExpanded, setIsExpanded }}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => useContext(JourneyContext);

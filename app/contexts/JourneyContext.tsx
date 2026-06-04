'use client';
import React, { createContext, useContext, useState } from 'react';

export interface JourneyNode {
  id: string;
  label: string;
  type: 'root' | 'branch' | 'leaf';
  parentId: string | null;
}

export interface GeneratedJourney {
  title: string;
  description: string;
  nodes: JourneyNode[];
  prompt: string;
}

interface JourneyContextType {
  selectedNode: any;
  setSelectedNode: (node: any) => void;
  activeArtifact: string | null;
  setActiveArtifact: (artifact: string | null) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  generatedJourney: GeneratedJourney | null;
  setGeneratedJourney: (journey: GeneratedJourney | null) => void;
  artifactCache: Record<string, any>;
  setArtifactCache: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const JourneyContext = createContext<JourneyContextType>({
  selectedNode: null,
  setSelectedNode: () => {},
  activeArtifact: null,
  setActiveArtifact: () => {},
  isExpanded: false,
  setIsExpanded: () => {},
  generatedJourney: null,
  setGeneratedJourney: () => {},
  artifactCache: {},
  setArtifactCache: () => {},
});

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [generatedJourney, setGeneratedJourney] = useState<GeneratedJourney | null>(null);
  const [artifactCache, setArtifactCache] = useState<Record<string, any>>({});

  return (
    <JourneyContext.Provider value={{ 
      selectedNode, setSelectedNode, 
      activeArtifact, setActiveArtifact, 
      isExpanded, setIsExpanded,
      generatedJourney, setGeneratedJourney,
      artifactCache, setArtifactCache
    }}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => useContext(JourneyContext);

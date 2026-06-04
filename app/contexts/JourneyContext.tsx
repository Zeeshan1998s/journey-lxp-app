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

export interface Quest {
  id: string;
  title: string;
  desc: string;
  xpReward: number;
  status: 'available' | 'active' | 'completed';
  img: string;
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
  
  // Gamification State
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  gems: number;
  setGems: React.Dispatch<React.SetStateAction<number>>;
  inventory: Record<string, number>;
  setInventory: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
}

const defaultQuests: Quest[] = [
  { id: 'q1', title: 'Easy: 250 XP', desc: 'Submit 1 assignment successfully.', xpReward: 250, status: 'available', img: 'chest_common.png' },
  { id: 'q2', title: 'Medium: 1000 XP', desc: 'Submit 3 assignments successfully.', xpReward: 1000, status: 'available', img: 'chest_uncommon.png' },
  { id: 'q3', title: 'Hard: 3000 XP', desc: 'Complete an entire chapter.', xpReward: 3000, status: 'available', img: 'chest_rare.png' },
];

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
  xp: 0,
  setXp: () => {},
  gems: 0,
  setGems: () => {},
  inventory: {},
  setInventory: () => {},
  quests: [],
  setQuests: () => {},
});

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [generatedJourney, setGeneratedJourney] = useState<GeneratedJourney | null>(null);
  const [artifactCache, setArtifactCache] = useState<Record<string, any>>({});
  
  // Gamification State
  const [xp, setXp] = useState(250);
  const [gems, setGems] = useState(15);
  const [inventory, setInventory] = useState<Record<string, number>>({
    potion: 0, armor: 0, salmon: 0, seer_stone: 0, frozen_flame: 0
  });
  const [quests, setQuests] = useState<Quest[]>(defaultQuests);

  return (
    <JourneyContext.Provider value={{ 
      selectedNode, setSelectedNode, 
      activeArtifact, setActiveArtifact, 
      isExpanded, setIsExpanded,
      generatedJourney, setGeneratedJourney,
      artifactCache, setArtifactCache,
      xp, setXp, gems, setGems, inventory, setInventory, quests, setQuests
    }}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => useContext(JourneyContext);

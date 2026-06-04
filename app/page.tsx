'use client';
import Header from './components/Header';
import ViewTabs from './components/dashboard/ViewTabs';
import NodeMap from './components/dashboard/NodeMap';
import ExpandedArtifactView from './components/dashboard/ExpandedArtifactView';
import { useJourney } from './contexts/JourneyContext';

export default function Home() {
  const { isExpanded } = useJourney();

  return (
    <main className="main-content" style={{flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--white)', position: 'relative', zIndex: 5}}>
      <Header />
      
      {/* VIEW TABS */}
      <ViewTabs />

      {/* NODE MAP VIEW */}
      <div className="node-map-container" style={{flex: 1, minHeight: 0, position: 'relative', background: '#f8f7f5', overflow: 'hidden'}}>
        <NodeMap />
      </div>

      {isExpanded && <ExpandedArtifactView />}
    </main>
  );
}

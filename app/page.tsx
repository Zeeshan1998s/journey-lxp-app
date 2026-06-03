import Header from './components/Header';
import ViewTabs from './components/dashboard/ViewTabs';
import NodeMap from './components/dashboard/NodeMap';

export default function Home() {
  return (
    <main className="main-content" style={{flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--white)', position: 'relative', zIndex: 5}}>
      <Header />
      
      {/* VIEW TABS */}
      <ViewTabs />

      {/* NODE MAP VIEW */}
      <div className="node-map-container" style={{flex: 1, minHeight: 0, position: 'relative', background: '#f8f7f5', overflow: 'hidden'}}>
        <NodeMap />
      </div>
    </main>
  );
}

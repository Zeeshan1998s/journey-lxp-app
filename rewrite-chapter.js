
'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useJourney } from '../contexts/JourneyContext';
import { useSearchParams } from 'next/navigation';
import Editor from '@monaco-editor/react';

function ChapterContent() {
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get('topic');
  
  const { selectedNode, generatedJourney, artifactCache, setArtifactCache } = useJourney();
  const topic = urlTopic || selectedNode?.data?.label || generatedJourney?.title || 'Market Research';
  const cacheKey = `chapter_${topic}`;

  const [chapter, setChapter] = useState<any>(artifactCache[cacheKey] || null);
  const [isRegenerating, setIsRegenerating] = useState(!artifactCache[cacheKey]);

  // UI State
  const [activeTab, setActiveTab] = useState('main.py');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [showShop, setShowShop] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [gems, setGems] = useState(15);
  const [xp, setXp] = useState(250);

  useEffect(() => {
    if (!artifactCache[cacheKey]) {
      handleRegenerate();
    }
  }, [topic, artifactCache, cacheKey]);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, contentType: 'chapter' }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setChapter(data.data);
        setArtifactCache((prev: any) => ({ ...prev, [cacheKey]: data.data }));
      }
    } catch (err) {
      console.error('Regenerate failed:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: "I, Logos the Cyber Owl, am calculating a response... for a price.", sender: 'bot' }]);
    }, 1000);
    setChatInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'var(--font-sans)' }}>
      {/* HEADER NAV */}
      <header style={{ height: '56px', background: '#020617', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            LXP
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 700 }}>
              <img src="/images/game/gem_icon.png" alt="Gems" style={{ width: '16px', height: '16px' }} />
              <span style={{ color: '#38bdf8' }}>{gems}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 700 }}>
              <span style={{ color: '#f59e0b' }}>XP</span>
              <span>{xp}</span>
            </div>
          </div>
        </div>

        {/* PROGRESS DOTS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= 2 ? '#f59e0b' : i === 3 ? '#fbbf24' : '#334155', boxShadow: i === 3 ? '0 0 8px rgba(251, 191, 36, 0.5)' : 'none' }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>CH 2: {generatedJourney?.title || 'Journey'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e293b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            L10: {topic}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <button onClick={() => setShowShop(true)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            Shop
          </button>
          <button onClick={() => setShowQuests(true)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            Quests
          </button>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#334155', overflow: 'hidden' }}>
            <img src="/images/game/rpg_avatar.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      {/* SPLIT PANE */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* LEFT PANE - ASSIGNMENT */}
        <div style={{ flex: 1, borderRight: '2px solid #1e293b', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
          <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '16px' }}>{topic}</h1>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '32px', lineHeight: 1.6 }}>
              Let's practice some of these concepts a bit more. 
            </p>
            
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>Assignment</h2>
            <div style={{ background: '#1e293b', borderRadius: '8px', padding: '24px', fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7 }}>
              {isRegenerating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f97316' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Logos is writing the assignment for "{topic}"...
                </div>
              ) : chapter ? (
                <div>
                  <p style={{ marginBottom: '16px' }}>Complete the assignment based on the reading below:</p>
                  {chapter.sections?.map((sec: any, i: number) => (
                    <div key={i} style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '8px', fontWeight: 700 }}>{i+1}. {sec.heading}</h3>
                      <p style={{ paddingLeft: '16px', borderLeft: '2px solid #334155' }}>{sec.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Assignment content goes here.</p>
              )}
            </div>
          </div>

          {/* CHAT INTERFACE */}
          <div style={{ padding: '16px', borderTop: '1px solid #1e293b', background: '#020617' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #38bdf8' }}>
                <img src="/images/game/mascot_avatar.png" alt="Logos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>Need help?</span> I, Logos the Cyber Owl, can assist... <i>for a price.</i>
              </div>
            </div>
            
            <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? '#1e293b' : '#0ea5e920', border: msg.sender === 'bot' ? '1px solid #0ea5e940' : 'none', padding: '10px 14px', borderRadius: '12px', fontSize: '14px', color: '#f8fafc', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask Logos a question..." 
                style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', padding: '14px 16px', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
              <button type="submit" style={{ position: 'absolute', right: '12px', top: '12px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANE - EDITOR */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
          {/* FILE TABS */}
          <div style={{ display: 'flex', background: '#020617', borderBottom: '1px solid #1e293b' }}>
            {['main.py', 'main_test.py'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ background: activeTab === tab ? '#1e1e1e' : 'transparent', color: activeTab === tab ? '#e2e8f0' : '#64748b', border: 'none', padding: '12px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', borderTop: activeTab === tab ? '2px solid #f97316' : '2px solid transparent' }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* MONACO EDITOR */}
          <div style={{ flex: 1, paddingTop: '16px' }}>
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={activeTab === 'main.py' ? `# Practice coding here!\n\ndef ${topic.toLowerCase().replace(/\\s+/g, '_')}(data):\n    print(f"Executing {data}")\n    return True\n\n# Start your solution below:\n` : `# Tests will run against your main.py\nimport unittest\nfrom main import *\n\nclass TestMain(unittest.TestCase):\n    def test_logic(self):\n        self.assertTrue(True)\n`}
              options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'monospace', padding: { top: 16 } }}
            />
          </div>

          {/* ACTION BAR */}
          <div style={{ background: '#020617', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #1e293b' }}>
            <button style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg> Submit
            </button>
            <button style={{ background: '#334155', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/></svg> Run
            </button>
            <button style={{ background: '#334155', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> Solution
            </button>
          </div>
        </div>
      </div>

      {/* SHOP MODAL */}
      {showShop && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', width: '600px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', background: '#020617' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', fontFamily: 'serif', margin: '0 auto' }}>Shop</h2>
              <button onClick={() => setShowShop(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'absolute', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: '#fff', fontWeight: 700 }}>
                <img src="/images/game/gem_icon.png" alt="Gems" style={{ width: '32px', height: '32px' }} />
                <span style={{ fontSize: '20px' }}>{gems}x</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px', gap: '16px', alignItems: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: 600, paddingBottom: '12px', borderBottom: '1px solid #1e293b' }}>
                <div>Item</div>
                <div>Description</div>
                <div style={{ textAlign: 'center' }}>Buy</div>
                <div style={{ textAlign: 'center' }}>Sell</div>
              </div>

              {[
                { name: 'Potion', img: 'item_potion.png', desc: 'Gain a temporary XP multiplier for lesson completions.', buy: 6, sell: 3 },
                { name: 'Armor', img: 'item_armor.png', desc: 'Keep armor handy to protect your sharpshooter spree.', buy: 8, sell: 4 },
                { name: 'Baked Salmon', img: 'item_salmon.png', desc: 'Feed Logos baked salmon to ask for help without an XP penalty.', buy: 2, sell: 1 },
                { name: 'Seer Stone', img: 'item_seer_stone.png', desc: 'Consume a seer stone to view a solution without an XP penalty.', buy: 10, sell: 5 },
                { name: 'Frozen Flame', img: 'item_frozen_flame.png', desc: 'A frozen flame will protect your streak for four days.', buy: 12, sell: 6 },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px', gap: '16px', alignItems: 'center', padding: '16px 0', borderBottom: idx === 4 ? 'none' : '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#020617', borderRadius: '8px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={`/images/game/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: 700 }}>0x</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>{item.name}</div>
                    {item.desc}
                  </div>
                  <button style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '32px', padding: '8px 0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {item.buy} gems
                  </button>
                  <button style={{ background: '#020617', color: '#94a3b8', border: '1px solid #334155', borderRadius: '32px', padding: '8px 0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {item.sell} gems
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUESTS MODAL */}
      {showQuests && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', width: '400px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', background: '#020617' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', fontFamily: 'serif', margin: '0 auto' }}>Quests</h2>
              <button onClick={() => setShowQuests(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'absolute', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { title: 'Easy: 250 XP', desc: 'Get a common chest', img: 'chest_common.png' },
                { title: 'Medium: 1000 XP', desc: 'Get an uncommon chest', img: 'chest_uncommon.png' },
                { title: 'Hard: 3000 XP', desc: 'Get a rare chest', img: 'chest_rare.png' },
              ].map((quest, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '32px', padding: '8px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                    Accept
                  </button>
                  <div style={{ width: '64px', height: '64px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={`/images/game/${quest.img}`} alt={quest.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>{quest.title}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{quest.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
    </div>
  );
}

export default function ChapterPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f172a', color: '#fff' }}>Loading Environment...</div>}>
      <ChapterContent />
    </Suspense>
  );
}
`;

fs.writeFileSync('app/chapter/page.tsx', content);
console.log('Chapter page rewritten.');

'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useJourney } from '../contexts/JourneyContext';
import { useSearchParams } from 'next/navigation';
import Editor from '@monaco-editor/react';

function ChapterContent() {
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get('topic');
  
  const { selectedNode, generatedJourney, artifactCache, setArtifactCache, xp, setXp, gems, setGems, inventory, setInventory, quests, setQuests } = useJourney();
  const topic = urlTopic || selectedNode?.data?.label || generatedJourney?.title || 'Market Research';
  const cacheKey = `chapter_${topic}`;

  const [chapter, setChapter] = useState<any>(artifactCache[cacheKey] || null);
  const [isRegenerating, setIsRegenerating] = useState(!artifactCache[cacheKey]);

  // UI State
  const [activeTab, setActiveTab] = useState('main.py');
  const [leftTab, setLeftTab] = useState('Logos');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [showShop, setShowShop] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  
  // Confetti/Alert state
  const [alertMsg, setAlertMsg] = useState('');

  // Resizer state
  const [leftPaneWidth, setLeftPaneWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftPaneWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
    
    if (chatInput.toLowerCase().includes('salmon') && inventory['item_salmon'] > 0) {
      setInventory(prev => ({ ...prev, item_salmon: prev['item_salmon'] - 1 }));
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "*GULP* Delicious! Thank you for the salmon. How can I help you?", sender: 'bot' }]);
      }, 1000);
    } else {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "I, Logos the Cyber Owl, can assist... for a price.", sender: 'bot' }]);
      }, 1000);
    }
    setChatInput('');
  };

  const handleBuy = (id: string, cost: number) => {
    if (gems >= cost) {
      setGems(prev => prev - cost);
      setInventory(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      showAlert(`Bought item!`);
    } else {
      showAlert(`Not enough gems!`);
    }
  };

  const handleSell = (id: string, value: number) => {
    if (inventory[id] && inventory[id] > 0) {
      setInventory(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setGems(prev => prev + value);
      showAlert(`Sold item!`);
    } else {
      showAlert(`You don't have this item!`);
    }
  };

  const handleAcceptQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: 'active' } : q));
    showAlert(`Quest Accepted!`);
  };

  const handleSubmit = () => {
    const xpGained = 50;
    const gemsGained = Math.random() > 0.5 ? 2 : 0;
    let bonusXp = 0;
    
    let updatedQuests = [...quests];
    const q1 = updatedQuests.find(q => q.id === 'q1');
    if (q1 && q1.status === 'active') {
      q1.status = 'completed';
      bonusXp += q1.xpReward;
      showAlert(`Quest Completed! +${q1.xpReward} XP`);
    } else {
      showAlert(`Passed! +${xpGained} XP ${gemsGained > 0 ? `& +${gemsGained} Gems` : ''}`);
    }

    setXp(prev => prev + xpGained + bonusXp);
    if (gemsGained > 0) setGems(prev => prev + gemsGained);
    setQuests(updatedQuests);
  };

  const shopItems = [
    { id: 'item_potion', name: 'Potion', img: 'item_potion.png', desc: 'Gain a temporary XP multiplier for lesson completions.', buy: 6, sell: 3 },
    { id: 'item_armor', name: 'Armor', img: 'item_armor.png', desc: 'Keep armor handy to protect your sharpshooter spree.', buy: 8, sell: 4 },
    { id: 'item_salmon', name: 'Baked Salmon', img: 'item_salmon.png', desc: 'Feed Logos baked salmon to ask for help without an XP penalty.', buy: 2, sell: 1 },
    { id: 'item_seer_stone', name: 'Seer Stone', img: 'item_seer_stone.png', desc: 'Consume a seer stone to view a solution without an XP penalty.', buy: 10, sell: 5 },
    { id: 'item_frozen_flame', name: 'Frozen Flame', img: 'item_frozen_flame.png', desc: 'A frozen flame will protect your streak for four days.', buy: 12, sell: 6 },
  ];

  const calcLevel = (xp: number) => Math.floor(xp / 1000) + 1;
  const xpInLevel = xp % 1000;
  const levelProgress = (xpInLevel / 1000) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-sans)', userSelect: isDragging ? 'none' : 'auto' }}>
      {alertMsg && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#fff', padding: '12px 24px', borderRadius: '8px', zIndex: 9999, fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', animation: 'slideDown 0.3s ease-out' }}>
          {alertMsg}
        </div>
      )}
      
      {/* TOP HEADER (LIGHT) */}
      <header style={{ height: '56px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        {/* Left: Logo & Upgrade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/dashboard" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            LXP
          </Link>
          <button style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Upgrade
          </button>
        </div>

        {/* Center: Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
          <Link href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>Courses</Link>
          <span style={{ cursor: 'pointer' }} onClick={() => setShowQuests(true)}>Quests</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setShowShop(true)}>Shop</span>
          <Link href="/community" style={{ color: 'inherit', textDecoration: 'none' }}>Community</Link>
          <Link href="/leaderboard" style={{ color: 'inherit', textDecoration: 'none' }}>Leaderboard</Link>
        </div>

        {/* Right: User Profile & Level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Acolyte</span>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Level {calcLevel(xp)}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${levelProgress}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 0 0 1px #cbd5e1' }}>
                <img src="/images/game/rpg_avatar.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SUB-HEADER (GAMIFICATION & CHAPTER NAV) */}
      <div style={{ height: '48px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        {/* Left: Inventory */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700 }}>
            <img src="/images/game/gem_icon.png" alt="Gems" style={{ width: '20px', height: '20px' }} />
            <span style={{ color: '#0f172a' }}>{gems}</span>
          </div>
          {['item_potion', 'item_armor', 'item_salmon', 'item_seer_stone'].map(id => (
            inventory[id] > 0 && (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>
                <div style={{ width: '20px', height: '20px', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={`/images/game/${id}.png`} alt={id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {inventory[id]}
              </div>
            )
          ))}
        </div>

        {/* Center: Progress Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <div key={i} style={{ width: i === 4 ? '10px' : '6px', height: i === 4 ? '10px' : '6px', borderRadius: '50%', background: i < 4 ? '#f59e0b' : i === 4 ? '#fbbf24' : '#cbd5e1', boxShadow: i === 4 ? '0 0 0 3px rgba(251, 191, 36, 0.2)' : 'none' }} />
          ))}
        </div>

        {/* Right: Chapter/Lesson Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select style={{ appearance: 'none', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 600, color: '#0f172a', cursor: 'pointer', outline: 'none' }}>
            <option>CH 2: {generatedJourney?.title || 'Journey'}</option>
          </select>
          <div style={{ width: '1px', height: '20px', background: '#cbd5e1' }} />
          <select style={{ appearance: 'none', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 600, color: '#0f172a', cursor: 'pointer', outline: 'none' }}>
            <option>L10: {topic}</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* SPLIT PANE */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, flexDirection: 'row' }}>
        {/* LEFT PANE - ASSIGNMENT (LIGHT MODE) */}
        <div style={{ width: `${leftPaneWidth}%`, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: '#ffffff', flexShrink: 0 }}>
          
          <div style={{ padding: '24px 32px', flex: 1, overflowY: 'auto' }}>
            {/* Header Tools */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', color: '#94a3b8', marginBottom: '16px' }}>
              {['settings', 'share', 'bookmark', 'refresh', 'alert-triangle'].map(icon => (
                <button key={icon} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>
                   <div style={{ width: '20px', height: '20px', background: '#f1f5f9', borderRadius: '4px' }}></div> {/* Placeholder for actual icons */}
                </button>
              ))}
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: 'serif' }}>{topic}</h1>
            <p style={{ fontSize: '15px', color: '#475569', marginBottom: '32px', lineHeight: 1.6 }}>
              Let's practice some of these concepts a bit more. Read through the theory and then complete the challenge on the right.
            </p>
            
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', fontFamily: 'serif' }}>Assignment</h2>
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7 }}>
              {isRegenerating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Logos is writing the assignment for "{topic}"...
                </div>
              ) : chapter ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p>Complete the assignment below based on the reading:</p>
                  {chapter.sections?.map((sec: any, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#94a3b8', fontWeight: 700 }}>{i+1}.</span>
                      <div>
                        <div style={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}>{sec.heading}</div>
                        <div style={{ color: '#475569' }}>{sec.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Assignment content goes here.</p>
              )}
            </div>

          </div>

          {/* BOTTOM INTERFACE (STICKY) */}
          <div style={{ padding: '16px 32px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            
            {/* View Tabs */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <div style={{ background: '#e2e8f0', borderRadius: '32px', padding: '4px', display: 'inline-flex' }}>
                {['Logos', 'Spellbook', 'Lessons'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setLeftTab(tab)}
                    style={{ background: leftTab === tab ? '#fff' : 'transparent', color: leftTab === tab ? '#0f172a' : '#64748b', border: 'none', padding: '6px 16px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: leftTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#fff' }}>
                <img src="/images/game/mascot_avatar.png" alt="Logos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Need help?</span> I, Logos the Cyber Owl, can assist... <i>for a price.</i>
              </div>
            </div>
            
            <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? '#f1f5f9' : '#fff', border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none', padding: '10px 14px', borderRadius: '12px', fontSize: '14px', color: '#0f172a', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
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
                style={{ width: '100%', background: '#ffffff', border: '1px solid #cbd5e1', padding: '12px 16px', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
              />
              <button type="submit" style={{ position: 'absolute', right: '12px', top: '12px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </div>
        </div>

        {/* RESIZER DRAGGER */}
        <div 
          onMouseDown={() => setIsDragging(true)}
          style={{ width: '4px', cursor: 'col-resize', background: isDragging ? '#3b82f6' : 'transparent', zIndex: 10, transition: 'background 0.2s', margin: '0 -2px' }}
        />

        {/* RIGHT PANE - EDITOR (LIGHT MODE) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', pointerEvents: isDragging ? 'none' : 'auto', minWidth: 0 }}>
          {/* FILE TABS */}
          <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['main.py', 'main_test.py'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ background: activeTab === tab ? '#ffffff' : 'transparent', color: activeTab === tab ? '#0f172a' : '#64748b', border: 'none', borderRight: '1px solid #e2e8f0', padding: '12px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', borderTop: activeTab === tab ? '2px solid #f97316' : '2px solid transparent' }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* MONACO EDITOR (LIGHT) */}
          <div style={{ flex: 1, paddingTop: '16px' }}>
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-light"
              value={activeTab === 'main.py' ? `# Practice coding here!\n\ndef ${topic.toLowerCase().replace(/\\s+/g, '_')}(data):\n    print(f"Executing {data}")\n    return True\n\n# Start your solution below:\n` : `# Tests will run against your main.py\nimport unittest\nfrom main import *\n\nclass TestMain(unittest.TestCase):\n    def test_logic(self):\n        self.assertTrue(True)\n`}
              options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'monospace', padding: { top: 16 } }}
            />
          </div>

          {/* ACTION BAR */}
          <div style={{ background: '#ffffff', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={handleSubmit} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(245,158,11,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg> Submit
            </button>
            <button style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/></svg> Run
            </button>
            <button style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '10px 24px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> Solution
            </button>
          </div>
        </div>
      </div>

      {/* SHOP MODAL (LIGHT) */}
      {showShop && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', width: '600px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'serif', margin: '0 auto' }}>Shop</h2>
              <button onClick={() => setShowShop(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'absolute', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: '#0f172a', fontWeight: 700 }}>
                <img src="/images/game/gem_icon.png" alt="Gems" style={{ width: '32px', height: '32px' }} />
                <span style={{ fontSize: '20px' }}>{gems} Gems</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px', gap: '16px', alignItems: 'center', color: '#64748b', fontSize: '13px', fontWeight: 600, paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                <div>Item</div>
                <div>Description</div>
                <div style={{ textAlign: 'center' }}>Buy</div>
                <div style={{ textAlign: 'center' }}>Sell</div>
              </div>

              {shopItems.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px', gap: '16px', alignItems: 'center', padding: '16px 0', borderBottom: idx === 4 ? 'none' : '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={`/images/game/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#475569', fontWeight: 700 }}>{(inventory[item.id] || 0)}x</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.name}</div>
                    {item.desc}
                  </div>
                  <button onClick={() => handleBuy(item.id, item.buy)} style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '32px', padding: '8px 0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {item.buy} gems
                  </button>
                  <button onClick={() => handleSell(item.id, item.sell)} style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '32px', padding: '8px 0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {item.sell} gems
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUESTS MODAL (LIGHT) */}
      {showQuests && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', width: '400px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'serif', margin: '0 auto' }}>Quests</h2>
              <button onClick={() => setShowQuests(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'absolute', right: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {quests.map((quest, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '20px', opacity: quest.status === 'completed' ? 0.6 : 1 }}>
                  {quest.status === 'completed' ? (
                     <div style={{ padding: '8px 24px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>Completed</div>
                  ) : quest.status === 'active' ? (
                     <div style={{ padding: '8px 24px', fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>Active</div>
                  ) : (
                    <button onClick={() => handleAcceptQuest(quest.id)} style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '32px', padding: '8px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                      Accept
                    </button>
                  )}
                  
                  <div style={{ width: '64px', height: '64px', overflow: 'hidden', borderRadius: '8px', flexShrink: 0 }}>
                    <img src={`/images/game/${quest.img}`} alt={quest.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{quest.title}</div>
                    <div style={{ fontSize: '13px', color: '#475569' }}>{quest.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { 0% { top: -50px; opacity: 0; } 100% { top: 20px; opacity: 1; } }
      `}} />
    </div>
  );
}

export default function ChapterPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', color: '#0f172a' }}>Loading Environment...</div>}>
      <ChapterContent />
    </Suspense>
  );
}

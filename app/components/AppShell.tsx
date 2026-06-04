'use client';
import { useState, useRef, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import RightSidebar from './RightSidebar';
import XpToast from './XpToast';
import { usePathname } from 'next/navigation';
import { useJourney } from '../contexts/JourneyContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AppShell({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const { selectedNode, generatedJourney } = useJourney();

  const isLogin = pathname === '/login';
  const isProfile = pathname === '/profile';
  const isMapPage = pathname.startsWith('/journey');

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set welcome message when chat opens
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      const topic = selectedNode?.data?.label || generatedJourney?.title || 'your learning journey';
      setMessages([{
        role: 'assistant',
        content: `Hey! I'm Journey AI 👋 I'm here to help you understand **${topic}**. What would you like to know?`
      }]);
    }
  }, [chatOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsStreaming(true);

    // Add empty assistant message that we'll stream into
    const assistantMessage: ChatMessage = { role: 'assistant', content: '' };
    setMessages([...newMessages, assistantMessage]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          journeyTitle: generatedJourney?.title || 'General Learning',
          currentTopic: selectedNode?.data?.label || generatedJourney?.title || 'General',
        }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullContent += chunk;
        // Update the last message with streamed content
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: fullContent }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again!' }
      ]);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  if (isLogin || isProfile) {
    return <>{children}</>;
  }

  const showRightSidebar = isMapPage && selectedNode !== null;

  return (
    <div className="app-shell">
      <XpToast />
      <TopNavbar user={initialUser} />
      <div className="main-content-row">
        {children}
        {showRightSidebar && (
          <RightSidebar onOpenChat={() => setChatOpen(!chatOpen)} />
        )}
      </div>

      {/* AI Chat Overlay */}
      {chatOpen && (
        <div className="ai-chat-overlay">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Journey AI
              <span style={{fontSize: '10px', background: 'var(--orange-bg)', color: 'var(--orange)', padding: '2px 6px', borderRadius: '8px', fontWeight: 700, marginLeft: '6px'}}>
                Groq
              </span>
            </div>
            <button className="icon-btn" onClick={() => setChatOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="ai-chat-messages" style={{flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'user-msg' : 'ai-msg'}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                }}
              >
                {msg.content}
                {isStreaming && i === messages.length - 1 && msg.role === 'assistant' && (
                  <span style={{display: 'inline-block', width: '2px', height: '14px', background: 'var(--orange)', marginLeft: '2px', animation: 'blink 1s infinite'}} />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Journey AI..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              disabled={isStreaming}
              style={{opacity: isStreaming ? 0.7 : 1}}
            />
            <button onClick={sendMessage} disabled={isStreaming || !inputValue.trim()}>
              {isStreaming ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 1s linear infinite'}}>
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

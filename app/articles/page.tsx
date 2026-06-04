'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useJourney } from '../contexts/JourneyContext';

interface Article {
  id: number;
  title: string;
  author: string;
  readTime: string;
  summary: string;
  tags: string[];
}

const DEFAULT_ARTICLES: Article[] = [
  { id: 1, title: 'The Complete Guide to Market Research in 2024', author: 'Dr. John Smith', readTime: '30 min', summary: 'A comprehensive guide covering all aspects of market research methodology.', tags: ['Beginner', 'Frameworks'] },
  { id: 2, title: 'Understanding Consumer Behavior', author: 'Dr. John Smith', readTime: '45 min', summary: 'Deep dive into psychology behind consumer decision making.', tags: ['Intermediate', 'Psychology'] },
  { id: 3, title: 'Data Analysis Techniques', author: 'Dr. John Smith', readTime: '60 min', summary: 'Advanced techniques for analyzing market data and deriving insights.', tags: ['Advanced', 'Data'] }
];

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<number[]>([]);
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { selectedNode, generatedJourney } = useJourney();

  const topic = selectedNode?.data?.label || generatedJourney?.title || 'Market Research';
  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  const toggleComplete = (id: number) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, contentType: 'articles' }),
      });
      const data = await res.json();
      if (data.success && data.data?.items) {
        setArticles(data.data.items);
        setCompleted([]);
      }
    } catch (err) {
      console.error('Regenerate failed:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="articles-type-tag" style={{ background: '#f5f5f5', color: '#333', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ARTICLES
        </div>
        <span className="pdf-breadcrumb">{topic} · {articles.length} articles</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text" onClick={handleRegenerate} disabled={isRegenerating} style={{opacity: isRegenerating ? 0.7 : 1}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{animation: isRegenerating ? 'spin 1s linear infinite' : 'none'}}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isRegenerating ? 'Generating...' : 'Regenerate'}
          </button>
          <Link href="/journey/1">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="pdf-content-area" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div className="pdf-count-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 className="pdf-section-title" style={{ fontSize: '20px', fontWeight: 600 }}>Articles on {topic}</h2>
          <span className="pdf-count" style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{completed.length} / {articles.length}</span>
        </div>
        <div className="pdf-search" style={{ position: 'relative', marginBottom: '24px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input 
            type="text" 
            placeholder="Search articles" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 36px', border: '1px solid var(--gray-200)', borderRadius: '8px' }} 
          />
        </div>

        {isRegenerating && (
          <div style={{padding: '32px', textAlign: 'center', color: 'var(--orange)', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 1s linear infinite'}}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg>
            AI is generating articles for "{topic}"...
          </div>
        )}

        <div className="article-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(article => (
            <div key={article.id} className="article-item" style={{ border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '20px', background: 'var(--white)' }}>
              <div className="article-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="article-badge" style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>ARTICLE</div>
                <div 
                  className={`radio-circle ${completed.includes(article.id) ? 'checked' : ''}`} 
                  onClick={() => toggleComplete(article.id)}
                  style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--gray-300)', cursor: 'pointer', background: completed.includes(article.id) ? 'var(--orange)' : 'transparent' }}
                ></div>
              </div>
              <h3 className="article-title" style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{article.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '12px', lineHeight: 1.5 }}>{article.summary}</p>
              <p className="article-author" style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '12px' }}>By {article.author}</p>
              <div className="article-meta-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {article.readTime}
                </span>
                {article.tags?.map(t => (
                  <span key={t} style={{ fontSize: '12px', color: 'var(--gray-500)', background: 'var(--gray-100)', padding: '2px 8px', borderRadius: '12px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mark-complete-bar">
        <button className="mark-complete-btn" onClick={() => setCompleted(articles.map(a => a.id))}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Mark as Complete
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
    </main>
  );
}

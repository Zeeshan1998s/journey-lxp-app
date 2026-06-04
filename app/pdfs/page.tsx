'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function PdfsPage() {
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<number[]>([]);

  const pdfs = [
    { id: 1, title: 'Market Research Summary Q3 2024.pdf', size: '2.4 MB' },
    { id: 2, title: 'Competitor Landscape Analysis.pdf', size: '5.1 MB' },
    { id: 3, title: 'User Persona Templates.pdf', size: '1.2 MB' }
  ];

  const filtered = pdfs.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const toggleComplete = (id: number) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="pdf-type-tag" style={{ background: '#f5f5f5', color: '#333', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          PDFS
        </div>
        <span className="pdf-breadcrumb">Market Research · {pdfs.length} files</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="pdf-content-area" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div className="pdf-count-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 className="pdf-section-title" style={{ fontSize: '20px', fontWeight: 600 }}>PDF Documents</h2>
          <span className="pdf-count" style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{completed.length} / {pdfs.length}</span>
        </div>
        <div className="pdf-search" style={{ position: 'relative', marginBottom: '24px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input 
            type="text" 
            placeholder="Search documents" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 36px', border: '1px solid var(--gray-200)', borderRadius: '8px' }} 
          />
        </div>
        <div className="pdf-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(pdf => (
            <div key={pdf.id} className="pdf-item" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--gray-200)', borderRadius: '12px', background: 'var(--white)' }}>
              <div className="pdf-icon" style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="pdf-info" style={{ flex: 1 }}>
                <h3 className="pdf-title" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#ef4444' }}>{pdf.title}</h3>
                <p className="pdf-meta" style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{pdf.size}</p>
              </div>
              <div 
                className={`radio-circle ${completed.includes(pdf.id) ? 'checked' : ''}`} 
                onClick={() => toggleComplete(pdf.id)}
                style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--gray-300)', cursor: 'pointer', background: completed.includes(pdf.id) ? 'var(--orange)' : 'transparent', flexShrink: 0 }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mark-complete-bar">
        <button className="mark-complete-btn" onClick={() => setCompleted(pdfs.map(p => p.id))}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Mark as Complete
        </button>
      </div>
    </main>
  );
}

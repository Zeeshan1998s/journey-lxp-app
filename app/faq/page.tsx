'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const faqs = [
    { q: "What is market research?", a: "Market research is the process of determining the viability of a new service or product through research conducted directly with potential customers." },
    { q: "Why is market research important?", a: "It provides valuable information to identify and analyze the market need, market size, and competition." },
    { q: "The Complete Guide to Market Research in 2024", a: "Lorem ipsum dolor sit amet consectetur. Pulvinar in cursus aliquet cursus facilisis arcu maecenas gravida. Semper facilisi risus ut metus dolor vitae ultrices. At mi ut natoque morbi id consectetur." },
    { q: "The Complete Guide to Market Research in 2024", a: "Lorem ipsum dolor sit amet consectetur. Pulvinar in cursus aliquet cursus facilisis arcu maecenas gravida. Semper facilisi risus ut metus dolor vitae ultrices. At mi ut natoque morbi id consectetur." },
    { q: "The Complete Guide to Market Research in 2024", a: "Lorem ipsum dolor sit amet consectetur. Pulvinar in cursus aliquet cursus facilisis arcu maecenas gravida. Semper facilisi risus ut metus dolor vitae ultrices. At mi ut natoque morbi id consectetur." }
  ];

  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="faq-type-tag" style={{ background: '#fff0e5', color: 'var(--orange)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          FAQS
        </div>
        <span className="pdf-breadcrumb">Market Research · 12 questions</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1/map">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="faq-main-area" style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div className="faq-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 className="faq-title" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)' }}>Frequently asked question</h2>
          <span className="faq-count" style={{ fontSize: '12px', color: 'var(--gray-500)', background: 'var(--gray-100)', padding: '4px 10px', borderRadius: '12px', fontWeight: 500 }}>8 / 8</span>
        </div>
        
        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`} style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', background: 'var(--white)', overflow: 'hidden' }}>
              <div 
                className="faq-question" 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)', transition: 'background 0.15s' }}
              >
                <span>{item.q}</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--gray-500)', transition: 'transform 0.2s ease', transform: openIndex === i ? 'rotate(180deg)' : 'none' }}>
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="faq-answer-wrap" style={{ display: 'grid', gridTemplateRows: openIndex === i ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
                <div className="faq-answer" style={{ overflow: 'hidden', padding: openIndex === i ? '0 24px 20px' : '0 24px', color: 'var(--gray-600)', fontSize: '13px', lineHeight: 1.6 }}>{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mark-complete-bar">
        <button className="mark-complete-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Mark as Complete
        </button>
      </div>
    </main>
  );
}

import Header from '../components/Header';
import Link from 'next/link';

export default function ChapterPage() {
  return (
    <main className="pdf-main">
      <Header />
      <div className="pdf-toolbar">
        <div className="chapter-type-tag" style={{ background: '#fff0e5', color: 'var(--orange)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          CHAPTER
        </div>
        <span className="pdf-breadcrumb">Market Research · chapter</span>
        <div className="pdf-toolbar-actions">
          <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Regenerate</button>
          <Link href="/journey/1">
            <button className="btn-text"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Back to Journey</button>
          </Link>
          <button className="icon-btn" style={{width: '32px', height: '32px'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="chapter-main-area" style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div className="chapter-content" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="chapter-heading" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '24px', letterSpacing: '-0.01em' }}>The Complete Guide to Market Research in 2024</h2>
          <p className="chapter-text" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--gray-600)', marginBottom: '24px' }}>Lorem ipsum dolor sit amet consectetur. At nibh nulla at ornare. Amet lorem elementum metus et nec amet enim tincidunt rhoncus. Cursus sed sed viverra id. Placerat quam scelerisque aliquam egestas mattis cursus amet. Lobortis vestibulum senectus nunc massa. Sed ipsum cursus proin semper sagittis. Suspendisse morbi pharetra egestas bibendum faucibus enim vitae.</p>
          <p className="chapter-text" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--gray-600)', marginBottom: '24px' }}>Lorem ipsum dolor sit amet consectetur. At nibh nulla at ornare. Amet lorem elementum metus et nec amet enim tincidunt rhoncus. Cursus sed sed viverra id. Placerat quam scelerisque aliquam egestas mattis cursus amet. Lobortis vestibulum senectus nunc massa. Sed ipsum cursus proin semper sagittis. Suspendisse morbi pharetra egestas bibendum faucibus enim vitae.</p>
          <p className="chapter-text" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--gray-600)', marginBottom: '24px' }}>Lorem ipsum dolor sit amet consectetur. At nibh nulla at ornare. Amet lorem elementum metus et nec amet enim tincidunt rhoncus. Cursus sed sed viverra id. Placerat quam scelerisque aliquam egestas mattis cursus amet. Lobortis vestibulum senectus nunc massa. Sed ipsum cursus proin semper sagittis. Suspendisse morbi pharetra egestas bibendum faucibus enim vitae.</p>
          <h2 className="chapter-heading" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '24px', letterSpacing: '-0.01em' }}>The Complete Guide to Market Research in 2024</h2>
          <p className="chapter-text" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--gray-600)', marginBottom: '24px' }}>Lorem ipsum dolor sit amet consectetur. At nibh nulla at ornare. Amet lorem elementum metus et nec amet enim tincidunt rhoncus. Cursus sed sed viverra id. Placerat quam scelerisque aliquam egestas mattis cursus amet. Lobortis vestibulum senectus nunc massa. Sed ipsum cursus proin semper sagittis. Suspendisse morbi pharetra egestas bibendum faucibus enim vitae.</p>
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

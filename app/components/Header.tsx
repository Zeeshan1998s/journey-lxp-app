export default function Header() {
  return (
    <header className="content-header" style={{borderBottom: '1px solid var(--border)', background: 'var(--white)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', padding: '20px 12px', zIndex: 6, flexShrink: 0}}>
      <div className="header-left" style={{display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: 0}}>
        <div className="journey-thumb" style={{width: '128px', height: '72px', borderRadius: '9px', overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#111'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&h=72&fit=crop" alt="Vision Strategy journey thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
        </div>
        <div className="journey-info" style={{display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: 0}}>
          <div className="journey-title-row" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <h1 className="journey-title" style={{fontSize: '16px', fontWeight: 700, color: 'var(--black)', letterSpacing: '-0.02em'}}>Vision Strategy</h1>
            <button className="icon-btn edit-inline-btn" title="Edit title" style={{width: '24px', height: '24px', color: 'var(--gray-500)', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="journey-desc" style={{fontSize: '12px', fontWeight: 400, color: 'var(--gray-800)', lineHeight: '18px', letterSpacing: '0.02em'}}>Vision Strategy outlines a company&apos;s long-term goals and direction. It serves as a roadmap, guiding decision-making and aligning resources to achieve desired outcomes.</p>
        </div>
      </div>
      <div className="header-actions" style={{display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0}}>
        <button className="btn-outline" style={{display: 'flex', alignItems: 'center', gap: '4px', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--white)', color: 'var(--gray-700)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.01em', whiteSpace: 'nowrap'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download
        </button>
        <button className="btn-outline" style={{display: 'flex', alignItems: 'center', gap: '4px', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--white)', color: 'var(--gray-700)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.01em', whiteSpace: 'nowrap'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <div className="header-divider" style={{width: '1px', height: '13px', background: 'var(--gray-200)'}}></div>
        <button className="icon-btn more-btn" title="More options" style={{width: '40px', height: '34px', border: '1px solid var(--border)', borderRadius: '10px', background: 'transparent', cursor: 'pointer', color: 'var(--gray-700)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

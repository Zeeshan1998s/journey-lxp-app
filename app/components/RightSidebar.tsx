'use client';
import { useJourney } from '../contexts/JourneyContext';

export default function RightSidebar({ onOpenChat }: { onOpenChat?: () => void }) {
  const { selectedNode, setActiveArtifact } = useJourney();
  return (
    <aside className="right-sidebar">
      <div className="rs-top-tabs">
        <button className="rs-tab" onClick={onOpenChat}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.25 15.25l.4 1.4a2 2 0 001.373 1.373l1.4.4-1.4.4a2 2 0 00-1.373 1.373l-.4 1.4-.4-1.4a2 2 0 00-1.373-1.373l-1.4-.4 1.4-.4a2 2 0 001.373-1.373l.4-1.4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          AI Chat
        </button>
        <button className="rs-tab" onClick={() => setActiveArtifact('videos')}>
          Artefacts
        </button>
      </div>

      <div className="rs-panel rs-journey-info">
        <div className="rs-content-for">
          <div>
            <div className="rs-label" style={{marginBottom: '10px'}}>Content for</div>
            <div className="rs-topic-pill">
              <div className="topic-dot"></div>
              <span>{selectedNode?.data?.label || 'Market Research'}</span>
              <button className="topic-remove-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
            </div>
          </div>
          <div className="rs-topic-nav">
            <button className="topic-nav-btn"><svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="topic-nav-btn"><svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
        </div>
        <div className="rs-progress-row">
          <div className="progress-track"><div className="progress-fill" style={{width: '68%'}}></div></div>
          <span className="progress-pct">68%</span>
        </div>
        <p className="rs-desc">Lorem ipsum dolor sit amet consectetur. At nibh nulla at ornare. Amet lorem elementum metus et nec amet enim tincidunt rhoncus.</p>
      </div>

      <div className="rs-panel">
        <div className="rs-section-label">LEARN</div>
        <ul className="content-list">
          <li className="content-item locked">
            <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <div className="ci-info">
              <div className="ci-title">Chapter</div>
              <div className="ci-meta">38 min total</div>
            </div>
            <div className="ci-status"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          </li>
          <div onClick={() => setActiveArtifact('videos')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">Youtube Videos</span><span className="ci-badge">4</span></div>
                <div className="ci-meta">5 Videos</div>
              </div>
              <div className="ci-status check-done"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            </li>
          </div>
          <div onClick={() => setActiveArtifact('articles')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">Articles</span><span className="ci-badge">4</span></div>
                <div className="ci-meta">38 min total</div>
              </div>
              <div className="ci-status"><div className="radio-circle"></div></div>
            </li>
          </div>
          <div onClick={() => setActiveArtifact('journey')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">Journey</span><span className="ci-badge">4</span></div>
                <div className="ci-meta">8 Videos</div>
              </div>
              <div className="ci-status check-done"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            </li>
          </div>
          <div onClick={() => setActiveArtifact('pdfs')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">PDFs</span><span className="ci-badge new-badge">NEW</span></div>
                <div className="ci-meta">38 min total</div>
              </div>
              <div className="ci-status"><div className="radio-circle"></div></div>
            </li>
          </div>
        </ul>
      </div>

      <div className="rs-panel">
        <div className="rs-section-label">PRACTICE</div>
        <ul className="content-list">
          <div onClick={() => setActiveArtifact('flashcards')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">Flashcards</span><span className="ci-badge">4</span></div>
                <div className="ci-meta">38 min total</div>
              </div>
              <div className="ci-status"><div className="radio-circle"></div></div>
            </li>
          </div>
          <div onClick={() => setActiveArtifact('faq')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title-row"><span className="ci-title">FAQ</span><span className="ci-badge new-badge">NEW</span></div>
                <div className="ci-meta">12 questions</div>
              </div>
              <div className="ci-status"><div className="radio-circle"></div></div>
            </li>
          </div>
        </ul>
      </div>

      <div className="rs-panel" style={{borderBottom: 'none'}}>
        <div className="rs-section-label">ASSESSMENT</div>
        <ul className="content-list">
          <div onClick={() => setActiveArtifact('quiz')} style={{cursor: 'pointer'}}>
            <li className="content-item">
              <div className="ci-icon-wrap"><svg className="ci-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="ci-info">
                <div className="ci-title">Quizzes (MCQ)</div>
                <div className="ci-meta">Best Score: 76%</div>
              </div>
              <div className="ci-status"><div className="radio-circle"></div></div>
            </li>
          </div>
        </ul>
      </div>
    </aside>
  );
}

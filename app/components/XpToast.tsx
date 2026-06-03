'use client';
import { useEffect, useState } from 'react';

export default function XpToast() {
  const [toast, setToast] = useState<{ id: number, xp: number } | null>(null);

  useEffect(() => {
    // Listen for custom event from client components
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      setToast({ id: Date.now(), xp: customEvent.detail.xp });
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    window.addEventListener('show-xp-toast', handleToast);
    return () => window.removeEventListener('show-xp-toast', handleToast);
  }, []);

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--orange)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 600,
      fontSize: '14px',
      boxShadow: '0 8px 32px rgba(241, 89, 32, 0.4)',
      zIndex: 9999,
      animation: 'slideUpToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    }}>
      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>
      +{toast.xp} XP Earned!
    </div>
  );
}

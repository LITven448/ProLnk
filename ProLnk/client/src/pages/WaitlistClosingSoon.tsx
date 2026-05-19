import { useState } from 'react';

const TOTAL_SLOTS = 500;
const CURRENT_COUNT = 423;

export default function WaitlistClosingSoon() {
  const [displayCount, setDisplayCount] = useState(CURRENT_COUNT);
  const [animating, setAnimating] = useState(false);

  const remaining = TOTAL_SLOTS - displayCount;
  const pct = Math.round((displayCount / TOTAL_SLOTS) * 100);

  const handlePulse = () => {
    if (animating) return;
    setAnimating(true);
    let count = displayCount;
    const target = Math.min(displayCount + Math.floor(Math.random() * 5) + 1, TOTAL_SLOTS);
    const interval = setInterval(() => {
      count += 1;
      setDisplayCount(count);
      if (count >= target) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 80);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: '#f59e0b', color: '#0a0f1e', textAlign: 'center', padding: '10px', fontWeight: 700, fontSize: '14px' }}>
        ⚠️ WAITLIST CLOSING SOON — {remaining} SPOTS REMAINING OUT OF {TOTAL_SLOTS}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#f59e0b', lineHeight: 1.1, marginBottom: '16px' }}>
            ProLnk Waitlist Closing<br />at 500 Partner Applications
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '560px', margin: '0 auto' }}>
            When we hit 500, Charter and Founding applications close permanently. Your pricing, tier, and origination rights lock in forever.
          </p>
        </div>

        <div style={{ background: '#111827', border: '2px solid #1e3a5f', borderRadius: '16px', padding: '40px', marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '80px', fontWeight: 900, color: '#f59e0b', lineHeight: 1, marginBottom: '8px' }}>
            {displayCount}
          </div>
          <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>of {TOTAL_SLOTS} partner applications received</div>
          <div style={{ background: '#1e293b', borderRadius: '999px', height: '12px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)', height: '100%', width: `${pct}%`, transition: 'width 0.3s', borderRadius: '999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            <span>0</span>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{pct}% FULL</span>
            <span>{TOTAL_SLOTS}</span>
          </div>
          <button onClick={handlePulse} style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
            🔄 Refresh Count
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {[
            { icon: '🔒', title: 'What Locks In For You', text: '$149/mo pricing locked forever, your membership tier (Charter or Founding), origination rights percentage' },
            { icon: '🚫', title: 'What Closes At 500', text: 'No new Charter or Founding applications accepted — ever. Future members enter at standard rates' },
            { icon: '💎', title: 'Why This Matters', text: 'Charter members earn 25% commission vs 12% for future pros. That gap compounds over years of matches' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '8px', fontSize: '15px' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/apply" style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '18px 48px', borderRadius: '12px', fontWeight: 800, fontSize: '18px', textDecoration: 'none', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}>
            Apply Before It Closes →
          </a>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '16px' }}>
            {remaining} spots left · No payment required to apply · 2-minute application
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const LEVELS = [
  { level: 1, label: 'Direct Recruits', rate: 1.0, emoji: '👤' },
  { level: 2, label: 'Level 2', rate: 0.5, emoji: '👥' },
  { level: 3, label: 'Level 3', rate: 0.25, emoji: '🌐' },
  { level: 4, label: 'Level 4', rate: 0.1, emoji: '🌍' },
];

export default function ProLnkStream2NetworkOverride() {
  const [l1, setL1] = useState(5);
  const [l2, setL2] = useState(15);
  const [l3, setL3] = useState(40);
  const [l4, setL4] = useState(100);
  const [avgEarning, setAvgEarning] = useState(2000);

  const counts = [l1, l2, l3, l4];
  const setters = [setL1, setL2, setL3, setL4];

  const levelIncome = LEVELS.map((lv, i) => ({
    ...lv,
    count: counts[i],
    monthly: counts[i] * avgEarning * (lv.rate / 100),
  }));

  const total = levelIncome.reduce((s, l) => s + l.monthly, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>STREAM 2 OF 5</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌐 Network Override</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Earn a percentage of your recruits' job commissions — 4 levels deep, compounding as your network grows.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 32 }}>
          {LEVELS.map(lv => (
            <div key={lv.level} style={{ background: '#111B2E', border: '2px solid #1E3A5F', borderRadius: 10, padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{lv.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginTop: 4 }}>{lv.rate}%</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Level {lv.level}</div>
              <div style={{ fontSize: 10, color: '#64748B' }}>{lv.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 How It Works</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Every time a pro in your network earns a direct commission (Stream 1), you receive a percentage override based on which level they sit in your tree. You do not need to be active — this income flows automatically as your recruits close jobs.
          </p>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 Network Override Projector</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Avg Monthly Earnings per Pro: ${avgEarning.toLocaleString()}</label>
            <input type="range" min={500} max={8000} step={100} value={avgEarning} onChange={e => setAvgEarning(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>

          {LEVELS.map((lv, i) => (
            <div key={lv.level} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>{lv.emoji} Level {lv.level} Pros: {counts[i]}</label>
              <input type="range" min={0} max={500} value={counts[i]} onChange={e => setters[i](+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}

          <div style={{ borderTop: '1px solid #1E3A5F', marginTop: 8, paddingTop: 16 }}>
            {levelIncome.map(lv => (
              <div key={lv.level} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{lv.emoji} Level {lv.level} ({lv.count} pros @ {lv.rate}%)</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${lv.monthly.toFixed(0)}/mo</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, borderTop: '1px solid #1E3A5F', paddingTop: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total Network Override</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>${total.toFixed(0)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
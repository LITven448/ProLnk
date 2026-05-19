import { useState } from 'react';

const LEVELS = [
  { level: 1, label: 'Direct Referrals', rate: 12, emoji: '⭐' },
  { level: 2, label: 'Level 2', rate: 6, emoji: '🔵' },
  { level: 3, label: 'Level 3', rate: 3, emoji: '🟣' },
  { level: 4, label: 'Level 4', rate: 1.5, emoji: '⚪' },
];

const SUB_PRICE = 149;

export default function ProLnkStream3SubscriptionOverride() {
  const [counts, setCounts] = useState([5, 15, 40, 100]);

  const levelIncome = LEVELS.map((lv, i) => ({
    ...lv,
    count: counts[i],
    monthly: counts[i] * SUB_PRICE * (lv.rate / 100),
  }));

  const total = levelIncome.reduce((s, l) => s + l.monthly, 0);
  const totalPros = counts.reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>STREAM 3 OF 5</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔄 Subscription Override</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Every pro in your network pays $149/mo. You earn a recurring percentage — forever.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 32 }}>
          {LEVELS.map(lv => (
            <div key={lv.level} style={{ background: '#111B2E', border: '2px solid #1E3A5F', borderRadius: 10, padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{lv.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginTop: 4 }}>{lv.rate}%</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Level {lv.level}</div>
              <div style={{ fontSize: 10, color: '#64748B' }}>${(SUB_PRICE * lv.rate / 100).toFixed(2)}/pro/mo</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 Why This Matters</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Subscription overrides are passive and recurring. A network of 160 active pros can generate $1,000+/mo without closing a single job. As the platform grows, this stream scales automatically — every new pro adds permanent recurring income to your stack.
          </p>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 Subscription Override Calculator</div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8′ }}>Pro Subscription Price</span>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${SUB_PRICE}/mo (locked)</span>
          </div>

          {LEVELS.map((lv, i) => (
            <div key={lv.level} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>{lv.emoji} Level {lv.level} Pros: {counts[i]}</label>
              <input type="range" min={0} max={300} value={counts[i]}
                onChange={e => { const n = [...counts]; n[i] = +e.target.value; setCounts(n); }}
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
              <span style={{ fontWeight: 700, fontSize: 14 }}>Total Pros in Network</span>
              <span style={{ fontWeight: 700, color: '#94A3B8′ }}>{totalPros}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Monthly Subscription Override</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>${total.toFixed(0)}/mo</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12, color: '#64748B', fontSize: 13 }}>
              Annual projection: ${(total * 12).toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
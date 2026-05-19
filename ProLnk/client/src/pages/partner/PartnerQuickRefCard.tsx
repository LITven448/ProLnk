import { useState } from 'react';

const rates = {
  plumber: { direct: '12–70%', override: '7/4/2/1%', subscription: '12/6/3/1.5%', origination: '1.5%' },
  electrician: { direct: '12–70%', override: '7/4/2/1%', subscription: '12/6/3/1.5%', origination: '1.5%' },
  hvac: { direct: '12–70%', override: '7/4/2/1%', subscription: '12/6/3/1.5%', origination: '1.5%' },
  roofing: { direct: '12–70%', override: '7/4/2/1%', subscription: '12/6/3/1.5%', origination: '1.5%' },
};

const tiers = [
  { name: 'Charter', matches: 25, color: '#F5E642′ },
  { name: 'Founding', matches: 100, color: '#F5E642′ },
  { name: 'Level 3', matches: 400, color: '#D1D5DB' },
  { name: 'Level 4', matches: 1600, color: '#D1D5DB' },
];

export default function PartnerQuickRefCard() {
  const [trade, setTrade] = useState('plumber');
  const r = rates[trade as keyof typeof rates];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>Partner Quick Reference</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>All the numbers you need in one place</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🔧 Select Your Trade</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.keys(rates).map(t => (
              <button key={t} onClick={() => setTrade(t)} style={{ padding: '8px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === t ? '#F5E642′ : '#E5E7EB', background: trade === t ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: 600, cursor: ’pointer', textTransform: 'capitalize', fontSize: 14 }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            { label: '💰 Direct Commission', value: r.direct, note: 'of match value by tier' },
            { label: '🔁 Network Override', value: r.override, note: 'L1/L2/L3/L4 of partner earnings' },
            { label: '📦 Subscription Override', value: r.subscription, note: 'L1/L2/L3/L4 of $149/mo sub' },
            { label: '🏠 Origination Rights', value: r.origination, note: 'permanent per home added' },
          ].map(item => (
            <div key={item.label} style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0A1628′ }}>{item.value}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🎖️ Tier Thresholds</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {tiers.map(t => (
              <div key={t.name} style={{ flex: '1 1 120px', background: '#F9FAFB', borderRadius: 10, padding: '14px 16px', textAlign: 'center', border: `2px solid ${t.color}` }}>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>{t.name}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', margin: '4px 0′ }}>{t.matches}</div>
                <div style={{ fontSize: 11, color: '#6B7280′ }}>matches to qualify</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>⏰ Waitlist closes at 500 partners + 5,000 homes</div>
            <div style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>All tiers locked at $149/mo · 72% keep rate</div>
          </div>
          <div style={{ color: '#fff', fontSize: 13 }}>📧 partners@prolnk.io</div>
        </div>
      </div>
    </div>
  );
}

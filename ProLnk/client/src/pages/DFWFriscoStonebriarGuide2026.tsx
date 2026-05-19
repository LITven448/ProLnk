import { useState } from 'react';

const homeTypes = [
  { id: 'golf-custom', label: '⛳ Golf Course Custom', tips: ['Irrigation system tied to golf course water table — annual backflow test required', 'Cart path proximity: check concrete expansion cracks each spring', 'Custom 2000s builds often have radiant barrier — verify attic ventilation annually'] },
  { id: 'hoa-community', label: '🏘️ HOA Community Home', tips: ['Stonebriar HOA is among most active in Frisco — read CC&Rs before any project', 'Exterior paint color changes require architectural review committee approval', 'Driveway and fence materials must match community standards — verify before replacing'] },
  { id: 'mid-size-2010s', label: '🏠 2010s Mid-Size Home', tips: ['Engineered hardwood common — avoid wet mopping, use humidity control 40-60%', 'Tankless water heaters standard in 2010s Frisco builds — descale annually', 'Low-E windows: check seal integrity every 5 years for fogging'] },
];

const stonebriarFacts = [
  'Stonebriar Centre proximity drives above-average foot traffic and rental demand',
  'Golf communities here command 8-14% premium over comparable Frisco stock',
  'HOA fees range $150–$600/mo depending on community tier and amenities',
  '2000s construction era: check original builder warranty transferability',
];

export default function DFWFriscoStonebriarGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = homeTypes.find(h => h.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>FRISCO · STONEBRIAR · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>⛳ Stonebriar Area Homeowner Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Affluent central Frisco · Golf course communities · 2000s–2010s custom builds · Very active HOA</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 Area Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🏗️', label: 'Build Era', val: '2000s–2010s' }, { icon: '📋', label: 'HOA Activity', val: 'Very High' }, { icon: '⛳', label: 'Landmark', val: 'Stonebriar CC' }, { icon: '💰', label: 'Market Tier', val: 'Affluent' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Home Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setSelected(h.id === selected ? null : h.id)}
                style={{ background: selected === h.id ? '#F5E642′ : '#162236', color: selected === h.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Maintenance Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🏌️ Stonebriar Area Key Facts</h2>
          {stonebriarFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · Frisco Stonebriar · 2026</p>
      </div>
    </div>
  );
}

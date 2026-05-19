import { useState } from 'react';

export default function DFWFoundationExpansiveClayDepth2026() {
  const [location, setLocation] = useState('');
  const [clayInfo, setClayInfo] = useState('');

  const locations = [
    { label: 'Dallas (inside 635)', key: 'dallas' },
    { label: 'Fort Worth / Tarrant County', key: 'fw' },
    { label: 'Frisco / McKinney / Collin County', key: 'collin' },
    { label: 'Arlington / Mansfield / Johnson County', key: 'arlington' },
    { label: 'Rockwall / Kaufman County', key: 'rockwall' },
  ];

  const clayData: Record<string, string> = {
    dallas: '🏙️ Deep Blackland Prairie clay — extends 20–30 feet in many neighborhoods. PI (Plasticity Index) ranges 30–60, indicating very high shrink-swell potential. Piers must reach 10–15 feet minimum to enter stable zone. Central Dallas has some of the worst clay in the DFW metro.',
    fw: '🤠 Fort Worth sits at the edge of Blackland Prairie transitioning to Cross Timbers. Clay depth varies 8–20 feet. West Fort Worth has shallower clay; East FW rivals Dallas in depth. PI ranges 20–50. Local geo report essential for pier depth specification.',
    collin: '🏘️ Northern Collin County (Frisco, McKinney, Allen) has moderate clay — Blackland Prairie extends here but often shallower (8–15 ft). Newer subdivisions may have engineered fill over native clay adding uncertainty. PI ranges 20–40. Post-tension standard here.',
    arlington: '⚙️ Arlington and Mansfield span Blackland and Trinity River alluvium. Clay depth 10–20 feet. Areas near Trinity River tributaries have alluvial clay with different behavior — softer, more compressible. PI ranges 25–50. Pier depth typically 10–14 feet.',
    rockwall: '🪨 Rockwall County sits on Cretaceous chalk and limestone near the surface east of Lake Ray Hubbard. Clay layer thinner (5–12 ft) before hitting rock. Piers may need rock anchors ($300–$600 each vs standard piers). Dramatically different foundation behavior than west DFW.',
  };

  const piLevels = [
    { range: 'PI 0–10', risk: 'Low', color: '#22C55E', desc: 'Minimal shrink-swell risk' },
    { range: 'PI 11–20', risk: 'Moderate', color: '#EAB308', desc: 'Some seasonal movement expected' },
    { range: 'PI 21–40', risk: 'High', color: '#F97316', desc: 'Significant movement, DFW typical' },
    { range: 'PI 41–60+', risk: 'Very High', color: '#EF4444', desc: 'Extreme shrink-swell, deep DFW clay' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌍</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Expansive Clay Depth Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>How deep is DFW clay — Blackland Prairie clay extends 20–30 feet in some areas, pier depth must reach stable zone</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {piLevels.map(p => (
            <div key={p.range} style={{ background: '#0F2240', border: `1px solid ${p.color}40`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: p.color, fontWeight: '800', fontSize: '14px' }}>{p.range}</span>
                <span style={{ background: `${p.color}20`, color: p.color, borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '700′ }}>{p.risk}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: '13px' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>📍 DFW Location → Clay Depth + Expansion Risk</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {locations.map(l => (
              <button key={l.key} onClick={() => { setLocation(l.key); setClayInfo(clayData[l.key]); }}
                style={{ background: location === l.key ? '#F5E642′ : '#1E3A5F', color: location === l.key ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600′ }}>
                {l.label}
              </button>
            ))}
          </div>
          {clayInfo && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{clayInfo}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🔬 DFW Clay Behavior Facts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { icon: '💧', fact: 'Clay expands up to 10% by volume when wet — a 20-foot clay column can heave 2+ feet' },
              { icon: '☀️', fact: 'DFW summer drought causes clay to shrink, creating voids under slab and allowing settlement' },
              { icon: '📏', fact: 'Active zone (depth affected by moisture change) typically 8–12 feet in DFW — piers must go deeper' },
              { icon: '🌡️', fact: 'Clay behavior is most extreme during DFW drought cycles — 2011 and 2022 droughts caused widespread foundation movement' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.5′ }}>{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const vintageTips: Record<string, { title: string; tips: string[] }> = {
  'pre-1990': {
    title: 'Pre-1990 Saginaw Homes',
    tips: [
      '🏗️ Original slab foundations — check for heaving near Alliance freight corridors',
      '🔌 Knob-and-tube wiring risk — full panel inspection recommended',
      '🪟 Single-pane windows — Alliance truck traffic vibration causes seal failure',
      '🚿 Galvanized pipes at end of life — proactive repiping saves flooding risk',
      '🌡️ R-11 attic insulation — upgrade to R-38 for modern efficiency',
    ],
  },
  '1990-2005': {
    title: '1990–2005 Alliance Corridor Era Homes',
    tips: [
      '🏠 First-gen slab — settlement cracks near logistics park soil disturbance zones',
      '🔧 Builder-grade HVAC now 20–35 years old — replacement window open',
      '🪵 Composite deck boards splitting — Saginaw heat cycles accelerate wear',
      '💧 Poly-B or early PEX plumbing — inspect fittings at manifolds',
      '🎨 Original exterior paint — industrial air from Alliance stains early',
    ],
  },
  '2005-2015': {
    title: '2005–2015 Growth Surge Homes',
    tips: [
      '🌱 New subdivision landscaping now mature — root intrusion in sewer lines',
      '❄️ First HVAC replacement cycle approaching — budget $8K–$14K',
      '🏗️ Engineered lumber decks aging — fastener corrosion in Saginaw humidity',
      '🔋 15-year smoke/CO detectors need replacement',
      '🪟 Builder windows at seal failure age — energy bills spiking',
    ],
  },
  '2015-2026': {
    title: '2015–2026 New Construction',
    tips: [
      '🏗️ Foundation still settling — monitor interior doors sticking',
      '🌿 Young landscaping — establish drainage away from foundation',
      '📋 Builder warranty expiring — 1-year and 10-year milestone inspections critical',
      '🔌 Smart home pre-wire — upgrade to active automation while walls accessible',
      '🛡️ HOA landscaping standards — coordinate with developing community rules',
    ],
  },
};

export default function DFWSaginawHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const vintages = Object.keys(vintageTips);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · SAGINAW TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Saginaw Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Alliance Corridor growth shaped Saginaw's housing stock. From 1980s originals to 2026 new builds — know your vintage, own your maintenance.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '🏭', label: 'Alliance Freight Hub', val: '1M+ sq ft nearby' }, { icon: '📈', label: '2010→2026 Growth', val: '43K → 52K residents' }, { icon: '🏠', label: 'Median Home Price', val: '$295K (2026)' }, { icon: '🌡️', label: 'Avg Summer High', val: '98°F — slab stress season' }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏗️ Select Your Home Vintage</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {vintages.map(v => (
              <button key={v} onClick={() => setSelected(v === selected ? null : v)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === v ? '#F5E642′ : '#1e2f4a', color: selected === v ? '#0A1628' : '#fff' }}>
                {v}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{vintageTips[selected].title}</div>
              {vintageTips[selected].tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚛 Alliance Corridor Impact on Your Home</h2>
          {[{ icon: '🌫️', text: 'Industrial air quality — exterior paint and window seals degrade faster within 5 miles of Alliance' }, { icon: '📳', text: 'Heavy truck vibration on 287 and I-35W — monitor foundation and masonry annually' }, { icon: '📊', text: 'Logistics boom = rising property values — maintain home to capture appreciation' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get Saginaw-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}
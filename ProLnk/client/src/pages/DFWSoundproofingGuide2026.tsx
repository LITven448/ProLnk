import { useState } from 'react';

const solutions = [
  {
    source: 'highway', label: 'Highway Noise (LBJ/121/35)', emoji: '🛣️',
    options: [
      { name: 'Acoustic Laminated Windows', cost: '$800–$1,500/window', reduction: '25–40 dB', best: true },
      { name: 'Mass Loaded Vinyl (MLV) on walls', cost: '$1–$2/sqft', reduction: '15–25 dB', best: false },
      { name: 'Dense-Pack Insulation in walls', cost: '$2–$4/sqft', reduction: '10–20 dB', best: false },
      { name: 'Acoustic Caulk & Weatherstripping', cost: '$200–$500', reduction: '5–10 dB', best: false },
    ]
  },
  {
    source: 'airport', label: 'Airport Noise (DFW / Love Field)', emoji: '✈️',
    options: [
      { name: 'Acoustic Window Inserts (add-on pane)', cost: '$300–$900/window', reduction: '20–35 dB', best: true },
      { name: 'Double-stud exterior wall framing', cost: '$15–$25/sqft', reduction: '30–45 dB', best: false },
      { name: 'Resilient Channels on ceiling/walls', cost: '$3–$6/sqft install', reduction: '15–20 dB', best: false },
      { name: 'Solid-core exterior doors + seals', cost: '$500–$1,200/door', reduction: '8–15 dB', best: false },
    ]
  },
  {
    source: 'hoa', label: 'HOA Quiet Hours & Neighbor Noise', emoji: '🏘️',
    options: [
      { name: 'Resilient Channels on shared walls', cost: '$3–$6/sqft', reduction: '15–25 dB', best: true },
      { name: 'Acoustic drywall (QuietRock)', cost: '$4–$8/sqft', reduction: '20–30 dB', best: false },
      { name: 'Soundproof curtains / drapes', cost: '$80–$250/panel', reduction: '5–10 dB', best: false },
      { name: 'White noise machine (non-structural)', cost: '$30–$80', reduction: 'Perceived 10–20 dB', best: false },
    ]
  },
];

export default function DFWSoundproofingGuide2026() {
  const [active, setActive] = useState('highway');
  const sol = solutions.find(s => s.source === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🔇</div>
          <h1 style={{ fontSize: 27, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Soundproofing Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Highway, airport, and neighbor noise solutions — with real DFW cost data. Select your noise source.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {solutions.map(s => (
            <button key={s.source} onClick={() => setActive(s.source)}
              style={{ padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: active === s.source ? '#F5E642' : '#1e3a5f', color: active === s.source ? '#0A1628' : '#94a3b8' }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {sol.options.map((opt, i) => (
            <div key={i} style={{ background: opt.best ? '#1a3a1a' : '#1e3a5f', borderRadius: 10, padding: 18, border: opt.best ? '1px solid #F5E642' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  {opt.best && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>BEST VALUE</span>}
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{opt.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{opt.cost}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Reduces: {opt.reduction}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🔧 ProLnk Soundproofing Contractors</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Acoustic window installs and wall soundproofing require licensed DFW contractors. ProLnk connects you with vetted specialists — all work documented in your Home Health Vault.</p>
        </div>
      </div>
    </div>
  );
}

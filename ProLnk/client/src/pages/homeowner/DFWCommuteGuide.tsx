import { useState } from 'react';

const centers = [
  {
    id: 'downtown-dallas',
    name: 'Downtown Dallas',
    suburbs: [
      { name: 'Irving', min: 15, max: 25 },
      { name: 'Carrollton', min: 20, max: 30 },
      { name: 'Garland', min: 25, max: 35 },
    ],
  },
  {
    id: 'las-colinas',
    name: 'Las Colinas / Irving',
    suburbs: [
      { name: 'Irving', min: 5, max: 15 },
      { name: 'Coppell', min: 10, max: 20 },
      { name: 'Grand Prairie', min: 15, max: 25 },
    ],
  },
  {
    id: 'legacy',
    name: 'Legacy Business Park (Plano)',
    suburbs: [
      { name: 'Plano', min: 5, max: 15 },
      { name: 'Allen', min: 10, max: 20 },
      { name: 'McKinney', min: 15, max: 25 },
      { name: 'Frisco', min: 12, max: 22 },
    ],
  },
  {
    id: 'uptown',
    name: 'Uptown / Midtown Dallas',
    suburbs: [
      { name: 'Addison', min: 15, max: 25 },
      { name: 'Richardson', min: 20, max: 30 },
      { name: 'Garland', min: 20, max: 35 },
      { name: 'Dallas (central)', min: 5, max: 15 },
    ],
  },
  {
    id: 'alliance',
    name: 'Alliance Corridor (Fort Worth North)',
    suburbs: [
      { name: 'Keller', min: 10, max: 20 },
      { name: 'Northlake', min: 5, max: 15 },
      { name: 'Justin', min: 10, max: 20 },
      { name: 'Roanoke', min: 5, max: 12 },
    ],
  },
  {
    id: 'medical',
    name: 'Medical Center Dallas (UT Southwestern)',
    suburbs: [
      { name: 'West Dallas', min: 10, max: 20 },
      { name: 'Oak Cliff', min: 8, max: 18 },
      { name: 'Irving', min: 20, max: 30 },
    ],
  },
];

export default function DFWCommuteGuide() {
  const [selected, setSelected] = useState('');

  const center = centers.find(c => c.id === selected);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#94a3b8', letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
          DFW Commute Guide<br />
          <span style={{ color: '#38bdf8′ }}>Choose Your Neighborhood Based on Where You Work</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, maxWidth: 620 }}>
          DFW has no meaningful public transit. DART covers some Dallas suburbs but most DFW residents drive. Plan for 30–60 minute commutes from most suburbs to major employment centers.
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#e2e8f0′ }}>🗺️ Commute Estimator</h2>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, border: '1px solid #334155', marginBottom: 48 }}>
          <label style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#94a3b8', marginBottom: 12 }}>
            Select your employment center:
          </label>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#0f172a', color: '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', fontSize: 15, marginBottom: 24 }}
          >
            <option value="">-- Select an employment center --</option>
            {centers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {center ? (
            <div>
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>Recommended suburbs for <strong style={{ color: '#38bdf8′ }}>{center.name}</strong>:</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {center.suburbs.map(s => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '14px 20px', borderRadius: 10, border: '1px solid #1e293b' }}>
                    <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 15 }}>🏘️ {s.name}</span>
                    <span style={{ color: s.max <= 20 ? '#4ade80′ : s.max <= 30 ? '#facc15' : '#f87171', fontWeight: 700, fontSize: 15 }}>
                      {s.min}–{s.max} min
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#64748b', fontSize: 13, marginTop: 16, marginBottom: 0 }}>
                * Drive times reflect off-peak travel. Add 10–20 min during peak hours (7–9am, 4:30–6:30pm).
              </p>
            </div>
          ) : (
            <p style={{ color: '#475569', fontSize: 14, margin: 0 }}>Select an employment center above to see recommended suburbs and estimated drive times.</p>
          )}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#e2e8f0′ }}>🚗 Major DFW Traffic Corridors</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 48 }}>
          {[
            { road: 'I-35E / I-35W', peak: '7–9am, 4:30–6:30pm', tip: 'Worst congestion in DFW. Consider express lanes where available.' },
            { road: 'US-75 (Central Expressway)', peak: '7–9am, 4:30–6:30pm', tip: 'HOV lanes available. Avoid if possible during peak hours.' },
            { road: 'Dallas North Tollway', peak: '7:30–9am, 5–6:30pm', tip: 'Express lanes available. Reliably faster than I-35 for north Dallas commutes.' },
            { road: 'I-635 (LBJ)', peak: '7–9:30am, 4–7pm', tip: 'Worst congestion in DFW. Express lanes (LBJ Express) worth the toll.' },
          ].map(r => (
            <div key={r.road} style={{ background: '#1e293b', borderRadius: 10, padding: 20, border: '1px solid #334155', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{r.road}</div>
                <div style={{ fontSize: 12, color: '#ef4444′ }}>⚠️ Peak: {r.peak}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{r.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155', marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: 10, fontSize: 16 }}>💻 Remote Work Impact</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 15 }}>
            31% of DFW workers are now hybrid or remote. Factor in which days you commute when choosing a neighborhood — a home 35 minutes from work is very livable if you only go in 2 days a week.
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e40af)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🏡</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 8px', color: '#f1f5f9′ }}>Found Your Neighborhood?</h3>
          <p style={{ color: '#93c5fd', marginBottom: 24 }}>Protect your new DFW home from day one. Get quotes from vetted local contractors for security, HVAC, and maintenance.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Secure Your Home →
          </a>
        </div>

      </div>
    </div>
  );
}

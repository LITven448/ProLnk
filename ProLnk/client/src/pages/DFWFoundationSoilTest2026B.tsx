import { useState } from 'react';

const projects = [
  { type: 'New Construction', emoji: '🏗️', requiresGeo: true, piNeeded: true, desc: 'Geotech report is mandatory before any foundation design. Engineers need PI (Plasticity Index) and soil bearing capacity.', rec: 'Hire a licensed geotechnical firm before breaking ground. Expect $1,500–$4,000 for a full report.' },
  { type: 'Major Addition or Pool', emoji: '🏊', requiresGeo: true, piNeeded: true, desc: 'New load on existing foundation or excavation near footing zone requires soil assessment. Clay expansion unpredictable in DFW.', rec: 'Geotech required. Soil PI determines whether piers or conventional slab is safer for your addition.' },
  { type: 'Foundation Renovation', emoji: '🔧', requiresGeo: false, piNeeded: true, desc: 'Geotech sometimes needed depending on scope. If adding piers or regrading, PI measurement guides depth selection.', rec: 'Ask your foundation contractor if a geotech report is included. For pier work, PI measurement is essential.' },
  { type: 'Minor Repair (Crack Fill)', emoji: '🪣', requiresGeo: false, piNeeded: false, desc: 'Small cosmetic repairs typically don’t require soil testing. Monitor for widening cracks or door/window sticking.', rec: 'No geotech needed now. Document cracks with photos. If cracks return or widen, escalate to full assessment.' },
];

const piRanges = [
  { range: 'PI < 15', label: 'Low Shrink-Swell', pier: '8–10 ft piers typical', risk: 'Low' },
  { range: 'PI 15–30', label: 'Moderate', pier: '10–15 ft piers', risk: 'Medium' },
  { range: 'PI 30–50', label: 'High (common in DFW)', pier: '15–20 ft piers', risk: 'High' },
  { range: 'PI > 50', label: 'Very High', pier: '20+ ft deep piers required', risk: 'Very High' },
];

export default function DFWFoundationSoilTest2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW FOUNDATION GUIDE 2026 · PART 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧪 DFW Soil Testing for Foundation Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>When to test soil before foundation work — and how PI measurement drives pier depth decisions.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Select Your Project Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {projects.map((p, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.emoji} {p.type}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.desc}</div>
              {selected === i && (
                <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Geotech Required: {p.requiresGeo ? '✅ Yes' : '⬜ Not Always'}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginTop: 4 }}>PI Measurement Needed: {p.piNeeded ? '✅ Yes' : '⬜ No'}</div>
                  <div style={{ color: '#cbd5e1', marginTop: 8, fontSize: 13 }}>👉 {p.rec}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>📊 How PI Guides Pier Depth in DFW</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {piRanges.map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{r.range} — {r.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{r.pier}</div>
                </div>
                <div style={{ color: r.risk === 'Low' ? '#4ade80' : r.risk === 'Medium' ? '#facc15' : '#f87171', fontWeight: 700, fontSize: 13 }}>{r.risk}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Match with a DFW Foundation Pro</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk connects you with vetted foundation specialists who understand DFW expansive clay soils.</div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const PIPE_ERAS: Record<string, { material: string; concern: string; action: string }> = {
  'pre-1960': { material: 'Galvanized steel + cast iron drain', concern: 'Severe corrosion, scale buildup reducing flow to trickle, pinhole leaks', action: 'Full repipe likely needed — budget $8K–$18K' },
  '1960–1985': { material: 'Copper supply + cast iron drain', concern: 'Formicary pitting from DFW chloramine, slab leak risk escalating', action: 'Slab leak inspection every 3 years, monitor water pressure' },
  '1985–2000': { material: 'CPVC supply or copper + PVC drain', concern: 'CPVC brittle in DFW heat cycles, joints crack; slab leaks still present', action: 'Replace CPVC if cracking visible; inspect slab joints' },
  '2000–2015': { material: 'PEX-B supply + PVC drain', concern: 'Fittings oxidize in high-chloramine water, expansion joints can fail', action: 'Check manifold fittings, water softener recommended' },
  '2015–present': { material: 'PEX-A supply + PVC drain', concern: 'Lowest risk — expansion fittings are superior; monitor PRV', action: 'Annual PRV test, water softener extends life significantly' },
};

const DFW_CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland'];

export default function DFWPlumbingSystemSummary() {
  const [vintage, setVintage] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eraKey = Object.keys(PIPE_ERAS).find(k => {
    if (!vintage) return false;
    const yr = parseInt(vintage);
    if (k === 'pre-1960') return yr < 1960;
    if (k === '1960–1985') return yr >= 1960 && yr <= 1985;
    if (k === '1985–2000') return yr > 1985 && yr <= 2000;
    if (k === '2000–2015') return yr > 2000 && yr <= 2015;
    if (k === '2015–present') return yr > 2015;
    return false;
  });

  const era = eraKey ? PIPE_ERAS[eraKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 28 }}>🔧</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Plumbing System Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>Everything DFW homeowners need to know about their pipes, slab leaks, and hard water.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '💧', title: 'Hard Water Reality', body: 'DFW water hardness averages 15–25 gpg — one of the hardest metros in the US. Scale destroys water heaters in 6–8 years without softening. Shower heads clog in 18 months.' },
            { icon: '🌍', title: 'Clay Soil + Slab Leaks', body: 'Expansive clay shifts 2–4 inches seasonally. Pipes embedded in slabs flex, fatigue, and crack. DFW has the highest slab leak rate in the US — roughly 1 in 8 homes per decade.' },
            { icon: '🥶', title: 'Freeze Risk', body: 'Uri (2021) burst pipes in 500K+ DFW homes. Exterior hose bibs and garage pipes are highest risk. Insulate all exterior penetrations — code now requires it on new builds.' },
            { icon: '📋', title: 'DFW Code Notes', body: 'Permit required for repipes, water heater replacements, and any work opening walls. City inspections vary — Plano and Frisco are stricter than unincorporated Tarrant Co.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Personalized Plumbing Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <input placeholder="Home build year (e.g. 1978)" value={vintage} onChange={e => setVintage(e.target.value)} style={{ flex: 1, minWidth: 180, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }} />
            <select value={city} onChange={e => setCity(e.target.value)} style={{ flex: 1, minWidth: 160, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select DFW city</option>
              {DFW_CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Generate</button>
          </div>
          {submitted && era && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>Era: {eraKey} — {era.material}</div>
              <div style={{ color: '#FF8C69', marginBottom: 6, fontSize: 14 }}>⚠️ {era.concern}</div>
              <div style={{ color: '#6EE7B7', fontSize: 14 }}>✅ {era.action}</div>
              {city && <div style={{ marginTop: 10, color: '#8B9BB4', fontSize: 13 }}>📍 {city} uses Dallas Water Utilities or local municipal supply — all have high mineral content. A whole-home softener + filter system is the single highest-ROI upgrade for {city} plumbing longevity.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🤝 ProLnk Plumbing Partners</div>
          <p style={{ color: '#8B9BB4', fontSize: 14, margin: 0 }}>Every ProLnk plumbing partner is licensed by the Texas State Board of Plumbing Examiners, carries $1M liability, and has passed our 47-point vetting process. Get 3 competitive quotes — no kickbacks, no pressure.</p>
        </div>
      </div>
    </div>
  );
}

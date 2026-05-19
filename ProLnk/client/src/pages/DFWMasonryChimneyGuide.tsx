import { useState } from 'react';

const CHIMNEY_AGES = [
  { id: 'new', label: 'Under 15 years', risk: 'low' },
  { id: 'mid', label: '15–30 years', risk: 'medium' },
  { id: 'old', label: '30+ years', risk: 'high' },
];

const PROBLEMS = [
  { id: 'crown', label: 'Cracked or Missing Chimney Crown', priority: 1, cost_low: 250, cost_high: 800 },
  { id: 'mortar', label: 'Deteriorated Mortar Joints', priority: 2, cost_low: 500, cost_high: 2000 },
  { id: 'firebox', label: 'Firebox / Refractory Damage', priority: 2, cost_low: 800, cost_high: 2500 },
  { id: 'waterproof', label: 'Water Infiltration / Staining', priority: 3, cost_low: 400, cost_high: 1200 },
  { id: 'rebuild', label: 'Full or Partial Chimney Rebuild', priority: 4, cost_low: 3000, cost_high: 12000 },
  { id: 'cap', label: 'Missing or Damaged Chimney Cap', priority: 1, cost_low: 150, cost_high: 400 },
];

const AGE_MULT = { new: 0.8, medium: 1.0, old: 1.35 };

export default function DFWMasonryChimneyGuide() {
  const [age, setAge] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [result, setResult] = useState(null);

  function toggleProblem(id) {
    setSelectedProblems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setResult(null);
  }

  function calculate() {
    if (!age || selectedProblems.length === 0) return;
    const ageObj = CHIMNEY_AGES.find(x => x.id === age);
    const mult = AGE_MULT[ageObj.risk] || 1;
    const selected = PROBLEMS.filter(p => selectedProblems.includes(p.id));
    const totalLow = Math.round(selected.reduce((s, p) => s + p.cost_low, 0) * mult);
    const totalHigh = Math.round(selected.reduce((s, p) => s + p.cost_high, 0) * mult);
    const sorted = [...selected].sort((a, b) => a.priority - b.priority);
    setResult({ totalLow, totalHigh, sorted, risk: ageObj.risk });
  }

  const PRIORITY_LABELS = ['', '🚨 Urgent — Do First', '⚠️ Important — Do Soon', '📋 Plan This Year', '🔮 Major Project'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW CHIMNEY GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🏠 Masonry Chimney Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW chimneys face unique stress from spring hailstorms, heavy rains, and summer heat cycles. This guide covers crown repair, mortar repointing, firebox maintenance, waterproofing, and full rebuilds — with CSIA certification guidance.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌧️', title: 'Crown Repair — First Priority', desc: 'The chimney crown seals the top of the masonry and diverts DFW rain away from the flue. Cracked crowns allow water to penetrate and freeze-expand (rare in DFW but devastating when it happens). Crown repair is the highest ROI chimney maintenance.' },
            { icon: '🔧', title: 'Mortar Repointing', desc: 'DFW heat cycling (30°F winter nights to 105°F summer days) degrades mortar joints 20–30 years of expected life. Repointing restores structural integrity and waterproofing. Match mortar strength to brick — too-hard mortar causes brick spalling.' },
            { icon: '🔥', title: 'Firebox Refractory Repair', desc: 'Refractory panels and mortar in the firebox deteriorate from thermal shock. DFW homeowners who use fireplaces heavily (November–February) should inspect fireboxes annually. Cracked refractory creates fire hazard.' },
            { icon: '💧', title: 'Waterproofing Sealers', desc: 'DFW gets heavy spring rains (April–May). Penetrating silane-siloxane sealers allow vapor transmission while blocking liquid water. Apply every 5–7 years. Do not use film-forming sealers — they trap moisture and accelerate failure.' },
            { icon: '🏗️', title: 'Chimney Rebuilding', desc: 'Major rebuilds are needed when structural integrity is compromised. DFW hailstorms (large hail is extremely common in North Texas) can damage brick at chimney top — most exposed point on the home.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', border: '1px solid #1e3a5f', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Priority List + Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Chimney Age</label>
              <select value={age} onChange={e => { setAge(e.target.value); setResult(null); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select age...</option>
                {CHIMNEY_AGES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 10, fontWeight: 600, fontSize: 14 }}>Visible Problems (select all that apply)</label>
              <div style={{ display: 'grid', gap: 8 }}>
                {PROBLEMS.map(p => (
                  <label key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', padding: '10px 14px', background: selectedProblems.includes(p.id) ? '#1e3a5f' : '#0A1628', borderRadius: 8, border: `1px solid ${selectedProblems.includes(p.id) ? '#F5E642' : '#2d4a7a'}` }}>
                    <input type="checkbox" checked={selectedProblems.includes(p.id)} onChange={() => toggleProblem(p.id)} style={{ width: 16, height: 16, accentColor: '#F5E642′ }} />
                    <span style={{ fontSize: 14 }}>{p.label}</span>
                    <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 12 }}>${p.cost_low.toLocaleString()}–${p.cost_high.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Generate Priority List</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.totalLow.toLocaleString()} – ${result.totalHigh.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Total estimated cost — prioritized below</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {result.sorted.map(p => (
                  <div key={p.id} style={{ background: '#112240', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 600, marginBottom: 2 }}>{PRIORITY_LABELS[p.priority]}</div>
                      <div style={{ fontSize: 14 }}>{p.label}</div>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'right' }}>${p.cost_low.toLocaleString()}–${p.cost_high.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏆 DFW Certification Standard</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Always hire CSIA-certified chimney sweeps and masons. The Chimney Safety Institute of America certification is the gold standard. DFW has many uncertified operators — verify at csia.org before any work. Best inspection window: September, before first fireplace use of the season.</div>
        </div>
      </div>
    </div>
  );
}

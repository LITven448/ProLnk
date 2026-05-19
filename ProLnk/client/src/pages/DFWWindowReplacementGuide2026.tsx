import { useState } from 'react';

export default function DFWWindowReplacementGuide2026() {
  const [count, setCount] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const priorities: Record<string, Record<string, string>> = {
    poor: { few: 'Replace immediately — failed seals + air leaks adding $80–120/mo to bills', moderate: 'High priority replacement — budget $6,000–9,000 for 10–14 windows', many: 'Phased replacement — start with west/south exposures first' },
    fair: { few: 'Reseal and add low-e film now, replace in 2–3 years', moderate: 'Plan replacement within 2 years — rebates available now', many: 'Phase over 2 years — Oncor rebates up to $400 available' },
    good: { few: 'No action needed — windows are performing well', moderate: 'Consider low-e film to further reduce solar gain', many: 'Excellent window performance — inspect annually' },
  };

  function assess() {
    const c = count === '1-5′ ? ’few' : count === '6-14′ ? ’moderate' : 'many';
    const r = priorities[condition]?.[c];
    setResult(r || 'Consult a DFW window professional');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🪟 DFW WINDOW GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Window Replacement Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Low-E glass is essential in DFW. Know your U-factor, SHGC ratings, and frame options before spending $400–800 per window.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '☀️', label: 'Low-E Glass (Essential)', desc: 'Blocks 70% of UV rays. Reduces solar heat gain by 40%. Required for ENERGY STAR in Texas climate zone.' },
            { icon: '🪟', label: 'Double vs Triple Pane', desc: 'Triple pane rarely worth it in DFW. Double-pane with Low-E is optimal. Triple adds $100/window for minimal gain.' },
            { icon: '📊', label: 'SHGC for Texas', desc: 'Solar Heat Gain Coefficient: target ≤0.25 for south/west windows. Lower = less solar heat entering home.' },
            { icon: '🔧', label: 'Frame Options', desc: 'Vinyl (best value, low maintenance), Fiberglass (strongest, best insulation), Wood (aesthetic, higher maintenance).' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 Replacement Priority Tool</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={count} onChange={e => setCount(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Number of Windows</option>
              <option value="1-5″>1–5 windows</option>
              <option value="6-14″>6–14 windows</option>
              <option value="15+">15+ windows</option>
            </select>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Window Condition</option>
              <option value="poor">Poor (fogging, drafts, single-pane)</option>
              <option value="fair">Fair (aging, some seal failure)</option>
              <option value="good">Good (newer, double-pane)</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Get Priority</button>
          {result && <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 DFW Incentives Available</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Oncor electric customers: rebates up to $400 for ENERGY STAR windows. Federal energy efficiency tax credit: 30% up to $600 for windows. Most DFW homeowners recoup installation costs in 8–12 years through reduced cooling bills alone.</p>
        </div>
      </div>
    </div>
  );
}
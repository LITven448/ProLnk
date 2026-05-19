import { useState } from 'react';

const ventTypes = [
  { name: 'Ridge Vent', nfa: 18, desc: 'Continuous along peak — best for DFW heat exhaust' },
  { name: 'Static Box Vent', nfa: 50, desc: 'Per unit; need multiple for coverage' },
  { name: 'Power Vent', nfa: 1000, desc: 'Electric fan; high CFM but adds utility cost' },
];

export default function DFWRidgeVentGuide() {
  const [sqft, setSqft] = useState('');
  const [currentVent, setCurrentVent] = useState('Static Box Vent');
  const [result, setResult] = useState<null | { needed: number; ridgeUnits: number; assessment: string; cost: string }>(null);

  function assess() {
    const atticSqft = parseFloat(sqft);
    if (!atticSqft || atticSqft <= 0) return;
    const requiredNFA = (atticSqft / 150) * 144;
    const selected = ventTypes.find(v => v.name === currentVent)!;
    const currentNFA = selected.nfa * (currentVent === 'Ridge Vent' ? atticSqft / 200 : 4);
    const deficit = Math.max(0, requiredNFA - currentNFA);
    const ridgeLinearFt = Math.ceil(deficit / 18);
    const assessment = deficit > 0
      ? `Your attic is under-ventilated by ~${Math.round(deficit)} sq in NFA. DFW attics without proper exhaust can hit 160°F+.`
      : 'Your ventilation meets minimum code. Ridge vents still improve DFW heat exhaust.';
    const cost = ridgeLinearFt > 0
      ? `Ridge vent install: $${ridgeLinearFt * 8}–$${ridgeLinearFt * 14} (${ridgeLinearFt} linear ft needed)`
      : 'No immediate upgrade required — monitor attic temps in summer.';
    setResult({ needed: Math.round(requiredNFA), ridgeUnits: ridgeLinearFt, assessment, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Ridge Vent Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            DFW attics routinely hit 150–160°F without proper ridge ventilation. Heat exhaust is the #1 priority — unlike cold climates where moisture control dominates.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>⚡ Why Ridge Vents Win in DFW</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Hot air rises — ridge vents exhaust at the absolute peak for maximum efficiency</li>
            <li>Continuous ridge vent outperforms multiple box vents in DFW summer heat</li>
            <li>Passive operation: zero electricity cost vs power vents</li>
            <li>Proper ridge + soffit balance drops attic temps 20–30°F</li>
            <li>Protects shingles: excessive heat degrades asphalt from below</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>📐 Vent Type Comparison</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {ventTypes.map(v => (
              <div key={v.name} style={{ background: '#162040', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 700 }}>{v.name}</div>
                  <div style={{ color: '#9BA8C0', fontSize: 13, marginTop: 4 }}>{v.desc}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textAlign: 'right', minWidth: 80 }}>{v.nfa} NFA/unit</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Ventilation Assessment Tool</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Attic Square Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="e.g. 1800″
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Exhaust Vent Type</label>
              <select
                value={currentVent}
                onChange={e => setCurrentVent(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
              >
                {ventTypes.map(v => <option key={v.name}>{v.name}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Assess My Ventilation
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Required NFA: {result.needed} sq in</div>
              <div style={{ color: '#E8EAF0', marginBottom: 8 }}>{result.assessment}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

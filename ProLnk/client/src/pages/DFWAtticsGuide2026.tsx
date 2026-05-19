import { useState } from 'react';

export default function DFWAtticsGuide2026() {
  const [atticCondition, setAtticCondition] = useState('poor-insulation');

  const improvements: Record<string, { priority: string; color: string; actions: { label: string; cost: string; roi: string }[]; facts: string[] }> = {
    "poor-insulation": {
      priority: 'Critical — Do This First',
      color: '#ef4444',
      actions: [
        { label: 'Blown-In Insulation to R-38', cost: '$1,800–$3,500', roi: 'Reduces cooling bills 15–25%' },
        { label: 'Air Sealing (penetrations)', cost: '$400–$900', roi: 'Often the single best ROI in DFW' },
        { label: 'Radiant Barrier (foil under decking)', cost: '$1,000–$2,500', roi: 'Reduces attic temp 20–30°F' },
      ],
      facts: ['DFW attics reach 140°F in summer without improvement', 'R-38 is Texas Energy Code minimum (R-49 preferred)', 'Inadequate insulation is top cause of high energy bills', 'HVAC in attic struggles without proper insulation'],
    },
    "poor-ventilation": {
      priority: 'High Priority — Prevents Damage',
      color: '#f97316',
      actions: [
        { label: 'Add Ridge + Soffit Vents', cost: '$600–$1,800', roi: 'Extends shingle life 5–10 years' },
        { label: 'Attic Power Vent Fan', cost: '$350–$700', roi: 'Reduces attic temp when breezy' },
        { label: 'Solar Attic Fan', cost: '$400–$900', roi: 'Passive cooling, no operating cost' },
      ],
      facts: ['Ventilation ratio: 1 sq ft vent per 150 sq ft attic', 'Poor ventilation causes moisture + mold in winter', 'Over-ventilation can be as harmful as under', 'Verify soffit vents aren’t blocked by insulation'],
    },
    "hvac-in-attic": {
      priority: 'Major Focus — DFW-Specific Challenge',
      color: '#F5E642',
      actions: [
        { label: 'Encapsulate HVAC in conditioned space', cost: '$2,500–$5,000', roi: '10–20% HVAC efficiency gain' },
        { label: 'Upgrade Duct Insulation to R-8', cost: '$800–$2,500', roi: 'Prevents cooling loss in 140°F attic' },
        { label: 'Seal Duct Leaks', cost: '$300–$800', roi: 'Up to 30% HVAC savings possible' },
      ],
      facts: ['70% of DFW homes have HVAC equipment in attic', 'Attic HVAC loses 20–30% efficiency in DFW summer', 'Duct leaks into attic can add $50–$150/mo to bills', 'Spray foam attic encapsulation is gold standard'],
    },
    "good-condition": {
      priority: 'Maintain + Optimize',
      color: '#22c55e',
      actions: [
        { label: 'Annual Attic Inspection', cost: '$100–$200', roi: 'Catch pest, moisture issues early' },
        { label: 'Pull-Down Stair Safety Check', cost: '$0–$200', roi: 'Prevent injury — often skipped' },
        { label: 'Storage Assessment', cost: '$0', roi: 'DFW heat destroys stored items — know limits' },
      ],
      facts: ['Good attic = lower insurance risk + better appraisal', 'DFW attics unsafe for many stored items (heat damage)', 'Check for animal entry points annually', 'Recheck insulation every 10–15 years (settles)'],
    },
  };

  const result = improvements[atticCondition];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Attic Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW attics hit 140°F — here is what that means for your home</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 8 }}>🔍 Attic Condition</label>
          <select value={atticCondition} onChange={e => setAtticCondition(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 12px', marginBottom: 16 }}>
            <option value="poor-insulation">Poor / No Insulation</option>
            <option value="poor-ventilation">Poor Ventilation</option>
            <option value="hvac-in-attic">HVAC Equipment in Attic</option>
            <option value="good-condition">Good Condition</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: `4px solid ${result.color}`, marginBottom: 16 }}>
                <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⚡ {result.priority}</div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {result.facts.map((f, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{f}</li>)}
                </ul>
              </div>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Recommended Improvements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.actions.map((a, i) => (
                  <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{a.label}</span>
                      <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 14 }}>{a.cost}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>ROI: {a.roi}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get Attic Improvement Quotes</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects DFW homeowners with insulation + attic pros who know Texas Energy Code and DFW climate conditions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Attic Quotes →</button>
        </div>
      </div>
    </div>
  );
}

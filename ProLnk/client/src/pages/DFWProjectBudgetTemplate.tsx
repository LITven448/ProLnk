import { useState } from 'react';

const PROJECT_TYPES = [
  { label: 'Kitchen Remodel', base: 35000, labor: 0.40, materials: 0.45, permits: 0.03 },
  { label: 'Bathroom Remodel', base: 18000, labor: 0.42, materials: 0.43, permits: 0.03 },
  { label: 'Roof Replacement', base: 14000, labor: 0.50, materials: 0.46, permits: 0.02 },
  { label: 'HVAC Replacement', base: 10000, labor: 0.55, materials: 0.42, permits: 0.02 },
  { label: 'Room Addition', base: 80000, labor: 0.38, materials: 0.47, permits: 0.04 },
  { label: 'Flooring', base: 8000, labor: 0.45, materials: 0.54, permits: 0.00 },
];

const OVERRUN_CAUSES = [
  '🔍 Hidden damage discovered once walls opened',
  '📋 Scope creep from mid-project upgrades',
  '⏰ Permit delays causing contractor rescheduling fees',
  '🌡️ DFW summer heat slowing exterior work pace',
  '🧱 Material price spikes (lumber, copper, PVC)',
  '🔄 Subcontractor scheduling conflicts in busy season',
];

export default function DFWProjectBudgetTemplate() {
  const [projectType, setProjectType] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [result, setResult] = useState<null | {
    labor: number; materials: number; permits: number; contingency: number; total: number; paySchedule: string[];
  }>(null);

  function generate() {
    const cost = parseFloat(estimatedCost);
    if (!projectType || isNaN(cost) || cost <= 0) return;
    const pt = PROJECT_TYPES.find(p => p.label === projectType)!;
    const labor = Math.round(cost * pt.labor);
    const materials = Math.round(cost * pt.materials);
    const permits = Math.round(cost * pt.permits);
    const contingency = Math.round(cost * 0.18);
    const total = labor + materials + permits + contingency;
    const paySchedule = [
      `10% upfront deposit — $${Math.round(total * 0.10).toLocaleString()}`,
      `30% materials delivery — $${Math.round(total * 0.30).toLocaleString()}`,
      `30% project midpoint — $${Math.round(total * 0.30).toLocaleString()}`,
      `20% substantial completion — $${Math.round(total * 0.20).toLocaleString()}`,
      `10% punch list resolved — $${Math.round(total * 0.10).toLocaleString()}`,
    ];
    setResult({ labor, materials, permits, contingency, total, paySchedule });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>💰 Project Budget Template</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '2rem' }}>DFW-calibrated budgets with 15–20% contingency — not the 10% national guides recommend.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Generate Your Budget</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <select value={projectType} onChange={e => setProjectType(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }}>
              <option value="">— Select Project Type —</option>
              {PROJECT_TYPES.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
            <input type="number" placeholder="Estimated base cost ($)" value={estimatedCost} onChange={e => setEstimatedCost(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }} />
            <button onClick={generate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.85rem', fontSize: '1rem', cursor: 'pointer' }}>
              Build Budget Breakdown →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Budget Breakdown</h2>
            {[
              ['🔨 Labor', result.labor],
              ['🧱 Materials', result.materials],
              ['📋 Permits & Fees', result.permits],
              ['🛡️ DFW Contingency (18%)', result.contingency],
            ].map(([label, val]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E2E45′ }}>
                <span style={{ color: '#C8D0DC' }}>{label as string}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>${(val as number).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', marginTop: '0.5rem' }}>
              <span style={{ fontWeight: 700 }}>Total Budget</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.2rem' }}>${result.total.toLocaleString()}</span>
            </div>
            <h3 style={{ color: '#F5E642', marginTop: '1.5rem', marginBottom: '0.75rem' }}>💳 Payment Schedule</h3>
            {result.paySchedule.map(s => <div key={s} style={{ color: '#9BA3B4', padding: '0.4rem 0', borderBottom: '1px solid #1E2E45′ }}>• {s}</div>)}
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Common Budget Overruns in DFW</h2>
          {OVERRUN_CAUSES.map(c => <div key={c} style={{ color: '#9BA3B4', padding: '0.4rem 0′ }}>{c}</div>)}
        </div>
      </div>
    </div>
  );
}

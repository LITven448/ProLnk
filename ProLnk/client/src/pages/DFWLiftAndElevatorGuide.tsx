import { useState } from 'react';

const LIFT_TYPES = [
  { name: 'Platform Lift / LULA', range: '$8,000–$20,000', floors: '2', desc: 'Limited Use / Limited Application. Ideal for 1–2 floors, smaller footprint, lower cost.' },
  { name: 'Pneumatic Vacuum Elevator', range: '$20,000–$35,000', floors: '3', desc: 'Sleek cylinder design, no pit or machine room needed. Popular in DFW luxury homes.' },
  { name: 'Traditional Hydraulic Elevator', range: '$30,000–$55,000', floors: '4', desc: 'Full residential elevator. Requires hoistway, machine room, pit. DFW standard in large homes.' },
];

function getRecommendation(floors: string, usage: string, budget: string) {
  const f = parseInt(floors) || 2;
  const b = parseInt(budget) || 30000;
  if (f <= 2 && b < 20000) return { rec: 'Platform Lift / LULA', cost: '$8,000–$20,000', req: 'No structural hoistway needed. 110V outlet, 5\’x5\’ footprint minimum.', maint: '$300–$600/year' };
  if (b < 35000 || usage === 'Occasional') return { rec: 'Pneumatic Vacuum Elevator', cost: '$20,000–$35,000', req: 'No pit or machine room. Self-supporting cylinder. 110–220V power.', maint: '$400–$800/year' };
  return { rec: 'Traditional Hydraulic Elevator', cost: '$30,000–$55,000', req: 'Structural hoistway, machine room, 3″–4″ pit. 220V dedicated circuit.', maint: '$600–$1,200/year' };
}

export default function DFWLiftAndElevatorGuide() {
  const [floors, setFloors] = useState('2');
  const [usage, setUsage] = useState('Daily');
  const [budget, setBudget] = useState('30000');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🛗 Residential Lift & Elevator Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>DFW's larger homes and aging population make residential elevators more common than the national average. Choose the right system for your floors, usage, and budget.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '🏠 DFW Context', val: 'Large multi-story homes common; elevator adoption rising' },
            { label: '⚡ Electrical', val: '110V (LULA/pneumatic) or 220V (hydraulic) required' },
            { label: '🏗️ Structural', val: 'Hoistway required for hydraulic; pneumatic is self-supporting' },
            { label: '📋 Permit', val: 'Building + electrical permit required in all DFW cities' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0F2035', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 13, color: '#8A9BB5', marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 System Comparison</h2>
          {LIFT_TYPES.map(lt => (
            <div key={lt.name} style={{ background: '#0F2035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', border: '1px solid #1E3A5F', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E64220', borderRadius: 8, padding: '0.5rem', fontSize: 22 }}>🏢</div>
              <div>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 2 }}>{lt.name}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{lt.range} · Up to {lt.floors} floors</div>
                <div style={{ color: '#8A9BB5', fontSize: 13 }}>{lt.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Floors to Connect</label>
              <input type="number" value={floors} onChange={e => setFloors(e.target.value)} min={2} max={5} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Usage Frequency</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Occasional</option><option>Daily</option><option>Multiple times daily</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Budget ($)</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={() => setResult(getRecommendation(floors, usage, budget))} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended: {result.rec}</h3>
            {[['Estimated Cost', result.cost], ['Installation Requirements', result.req], ['Annual Maintenance', result.maint]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{k}</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const solutions: Record<string, { name: string; cfm: string; cost: string; notes: string }> = {
  erv: {
    name: 'ERV (Energy Recovery Ventilator)',
    cfm: '50–150 CFM',
    cost: '$1,800–$3,500 installed',
    notes: 'Best for tight DFW homes — recovers 70-80% of energy, manages humidity in DFW\’s mixed climate',
  },
  freshAirDamper: {
    name: 'Fresh Air Damper on AHU',
    cfm: '50–100 CFM',
    cost: '$400–$800 installed',
    notes: 'Simplest solution for DFW homes with existing HVAC — brings in OA through damper, uses AC/heat to condition it',
  },
  exhaustFan: {
    name: 'Exhaust-Only Ventilation',
    cfm: '30–60 CFM',
    cost: '$200–$500 installed',
    notes: 'Low cost but draws in unconditioned DFW outdoor air through leaks — not recommended for tight homes',
  },
  balanced: {
    name: 'Balanced Ventilation (Supply + Exhaust)',
    cfm: '75–150 CFM',
    cost: '$600–$1,200 installed',
    notes: 'Good for DFW homes needing precise airflow control — pairs with dehumidifier in summer',
  },
};

const getTightnessLabel = (tightness: string) => {
  const map: Record<string, string> = { tight: 'Tight (< 3 ACH50)', moderate: 'Moderate (3–7 ACH50)', leaky: 'Leaky (> 7 ACH50)' };
  return map[tightness] || '';
};

export default function DFWHVACVentilationStandards() {
  const [sqft, setSqft] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [tightness, setTightness] = useState('');
  const [result, setResult] = useState<{ cfm: number; solution: string } | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    const beds = parseFloat(bedrooms);
    if (!area || !beds || !tightness) return;
    const cfm = Math.round(0.03 * area + 7.5 * (beds + 1));
    const sol = tightness === 'tight' ? 'erv' : tightness === 'moderate' ? 'freshAirDamper' : 'exhaustFan';
    setResult({ cfm, solution: sol });
  };

  const sol = result ? solutions[result.solution] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🌬️ DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          HVAC Ventilation Standards for DFW Homes
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          ASHRAE 62.2 requires minimum mechanical fresh air in DFW's increasingly tight, energy-efficient homes.
          Without it, CO2 builds up, VOCs from furniture and finishes accumulate, and indoor air quality degrades.
          Here's how much fresh air your DFW home needs — and the most energy-efficient way to deliver it.
        </p>

        <div style={{ background: '#1a2f55', borderRadius: '10px', padding: '1rem', marginBottom: '2rem', border: '1px solid #2a4080′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642′ }}>📏 ASHRAE 62.2 Formula</div>
          <div style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Required CFM = (0.03 × sq ft) + (7.5 × [bedrooms + 1])<br/>
            DFW credit for leaky homes: subtract ACH-based natural infiltration rate
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Calculate Your DFW Home's Fresh Air Requirement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>SQUARE FOOTAGE</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2500″
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080′ }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>BEDROOMS</label>
              <input type="number" value={bedrooms} onChange={e => setBedrooms(e.target.value)} placeholder="e.g. 4″
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080′ }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>HOME TIGHTNESS</label>
              <select value={tightness} onChange={e => setTightness(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080′ }}>
                <option value="">Select</option>
                <option value="tight">Tight — new construction 2015+</option>
                <option value="moderate">Moderate — 2000–2015 build</option>
                <option value="leaky">Leaky — pre-2000 DFW home</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Calculate Fresh Air Requirement →
          </button>
        </div>

        {result && sol && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.25rem' }}>📊 Your DFW Home Needs: {result.cfm} CFM</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Tightness: {getTightnessLabel(tightness)}</p>
            <h4 style={{ marginBottom: '0.5rem' }}>✅ Recommended Solution: {sol.name}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>{sol.notes}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>CAPACITY RANGE</div><div>{sol.cfm}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>INSTALLED COST</div><div>{sol.cost}</div></div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📋 All DFW Ventilation Solutions</h2>
        {Object.values(solutions).map(s => (
          <div key={s.name} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>🌀 {s.name}</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{s.notes}</p>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: '#F5E642′ }}>Capacity: </span>{s.cfm}</div>
              <div><span style={{ color: '#F5E642′ }}>Cost: </span>{s.cost}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>⚠️ DFW Energy Cost Tip</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Run ventilation on a timer: 20 minutes ON per hour meets most ASHRAE 62.2 requirements without
            continuously dumping humid DFW summer air or dry winter air into your home. An ERV or HRV makes
            this continuous approach feasible by recovering 70–80% of the energy in the outgoing air.
          </p>
        </div>
      </div>
    </div>
  );
}

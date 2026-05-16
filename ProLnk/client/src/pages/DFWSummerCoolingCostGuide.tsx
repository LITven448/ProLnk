import { useState } from 'react';

const seerSavings: Record<string, number> = {
  '8': 1.0,
  '10': 0.85,
  '13': 0.70,
  '16': 0.58,
  '18': 0.50,
  '20': 0.44,
};

const sqftBase: Record<string, number> = {
  '1000': 95,
  '1500': 130,
  '2000': 165,
  '2500': 200,
  '3000': 240,
  '3500': 285,
  '4000': 330,
};

export default function DFWSummerCoolingCostGuide() {
  const [sqft, setSqft] = useState('2000');
  const [seer, setSeer] = useState('13');
  const [thermostat, setThermostat] = useState('75');
  const [result, setResult] = useState<{ monthly: number; annualOpp: number } | null>(null);

  function calculate() {
    const baseMonthly = sqftBase[sqft] ?? 165;
    const seerMult = seerSavings[seer] ?? 0.70;
    const tempAdj = (parseInt(thermostat) - 75) * 0.03;
    const monthly = Math.round(baseMonthly * seerMult * (1 + tempAdj));
    const annualOpp = Math.round(monthly * 0.25 * 7);
    setResult({ monthly, annualOpp });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🌡️</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Summer Cooling Cost Guide
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            DFW AC runs <strong style={{ color: '#F5E642' }}>5–7 months per year</strong>. Know your cooling costs and where to cut them.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', label: 'Avg 2,000 sq ft home', value: '$165/mo cooling' },
            { icon: '🌡️', label: 'Each degree above 72°F', value: '+3% on AC bill' },
            { icon: '🔧', label: 'Old SEER 8 vs new SEER 18', value: '50% less energy' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '1rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem' }}>{stat.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🧮 Estimate Your Monthly Cooling Cost</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>Home Size (sq ft)</label>
            <select value={sqft} onChange={e => setSqft(e.target.value)}
              style={{ padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', width: 200 }}>
              {Object.keys(sqftBase).map(k => <option key={k} value={k}>{parseInt(k).toLocaleString()} sq ft</option>)}
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>HVAC SEER Rating</label>
            <select value={seer} onChange={e => setSeer(e.target.value)}
              style={{ padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', width: 200 }}>
              {Object.keys(seerSavings).map(k => <option key={k} value={k}>SEER {k}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>
              Typical Thermostat Set Point: <strong style={{ color: '#F5E642' }}>{thermostat}°F</strong>
            </label>
            <input type="range" min="68" max="80" value={thermostat} onChange={e => setThermostat(e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '0.75rem' }}>
              <span>68°F (cool)</span><span>80°F (warm)</span>
            </div>
          </div>

          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Cooling Cost
          </button>
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📊 Your Cooling Cost Estimate</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642' }}>${result.monthly}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Est. monthly cooling cost</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#34D399' }}>${result.annualOpp}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Annual savings opportunity</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '1rem', background: '#111D35', borderRadius: 10, border: '1px solid #1E3A5F', color: '#94A3B8', fontSize: '0.85rem' }}>
          💡 Attic insulation upgrade (R-30 → R-49) can reduce cooling costs by <strong style={{ color: '#F5E642' }}>15–20%</strong> in DFW homes with inadequate insulation.
        </div>
      </div>
    </div>
  );
}

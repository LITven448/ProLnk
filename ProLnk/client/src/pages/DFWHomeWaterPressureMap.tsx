import { useState } from 'react';

const areaData: Record<string, { range: string; prv: string; risks: string[] }> = {
  'Dallas Core': {
    range: '100–120 PSI',
    prv: 'PRV required — set to 60–80 PSI',
    risks: ['Pipe joint failure', 'Water heater damage', 'Washing machine hose blowout', 'Faucet seal wear'],
  },
  'Plano / Frisco': {
    range: '80–100 PSI',
    prv: 'PRV strongly recommended',
    risks: ['Accelerated appliance wear', 'Toilet flapper failure', 'Dripping faucets'],
  },
  'Suburban McKinney / Allen': {
    range: '60–80 PSI',
    prv: 'PRV optional but monitor',
    risks: ['Generally safe range', 'Monitor during peak demand'],
  },
  'Fort Worth Core': {
    range: '90–110 PSI',
    prv: 'PRV required — set to 60–80 PSI',
    risks: ['Pipe bursts under stress', 'Dishwasher valve damage', 'Water heater pressure relief trips'],
  },
  'Arlington / Grand Prairie': {
    range: '70–90 PSI',
    prv: 'PRV recommended',
    risks: ['Supply line failures', 'Toilet fill valve wear'],
  },
  'Mansfield / Midlothian': {
    range: '60–80 PSI',
    prv: 'PRV optional',
    risks: ['Normal range — annual checks advised'],
  },
};

export default function DFWHomeWaterPressureMap() {
  const [selected, setSelected] = useState('');
  const result = areaData[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>💧</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>DFW Water Pressure Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Water pressure in DFW varies dramatically by area. Dallas core systems run 100–120 PSI — far above the safe 60–80 PSI range. High pressure silently damages pipes, water heaters, washing machines, and appliances over time.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Select Your DFW Area</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}
          >
            <option value=''>-- Choose your area --</option>
            {Object.keys(areaData).map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>{selected}</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Expected Pressure Range</div>
                <div style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700 }}>{result.range}</div>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>PRV Recommendation</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{result.prv}</div>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>At-Risk Components</div>
                {result.risks.map(r => (
                  <div key={r} style={{ color: '#fff', marginBottom: '0.25rem' }}>⚠️ {r}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 What Is a PRV?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            A Pressure Reducing Valve (PRV) is installed on your main water line and keeps household pressure in the safe 60–80 PSI range. Most DFW homes built before 2005 either lack one or have one that's failed. A plumber can test your current pressure with a gauge for free and install a PRV for $250–$500 — far cheaper than a burst pipe or failed water heater.
          </p>
        </div>
      </div>
    </div>
  );
}

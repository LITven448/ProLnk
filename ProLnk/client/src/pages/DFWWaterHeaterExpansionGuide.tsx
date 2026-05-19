import { useState } from 'react';

const cityClosedLikelihood: Record<string, number> = {
  Dallas: 95, Plano: 90, Frisco: 92, McKinney: 88, Arlington: 85,
  Garland: 87, Irving: 89, Denton: 80, Allen: 91, Lewisville: 83,
  Richardson: 90, Carrollton: 86, Flower_Mound: 82, Mesquite: 84, Other: 80,
};

const homeTypes = ['Single Family', 'Townhome', 'Condo', 'Apartment'];
const cities = Object.keys(cityClosedLikelihood).map(c => c.replace('_', ' '));

export default function DFWWaterHeaterExpansionGuide() {
  const [homeType, setHomeType] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<null | { likelihood: number; required: boolean; cost: string; warning: string }>(null);

  function calculate() {
    if (!homeType || !city) return;
    const key = city.replace(' ', '_');
    const base = cityClosedLikelihood[key] ?? 80;
    const adj = homeType === 'Condo' || homeType === 'Apartment' ? Math.min(base + 5, 99) : base;
    const required = adj >= 85;
    const cost = required ? '$150–$350 installed' : '$0 unless PRV detected';
    const warning = adj >= 90
      ? 'Very likely closed system — expansion tank strongly recommended.'
      : adj >= 80
      ? 'Probable closed system — have a plumber verify.'
      : 'Lower risk but still worth checking.';
    setResult({ likelihood: adj, required, cost, warning });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🌡️ DFW Thermal Expansion Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Water Heater Thermal Expansion in DFW</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>Why DFW Homes Are at Risk</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0′ }}>
            DFW municipalities overwhelmingly use <strong style={{ color: '#F5E642′ }}>pressure reducing valves (PRVs)</strong> — and
            a PRV creates a closed plumbing system. In a closed system, when your water heater heats water it has nowhere to expand.
            That pressure builds up inside your tank and pipes, accelerating wear and eventually causing failure or a T&P valve discharge.
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>🔍 How to Tell If You Have a Closed System</h2>
          <ul style={{ lineHeight: 2, color: '#c8d8f0', paddingLeft: '1.5rem' }}>
            <li>Look for a bell-shaped device on the main water line — that's a PRV</li>
            <li>PRV present = closed system = expansion tank required by DFW code</li>
            <li>Ask your water utility — most DFW cities require PRVs by ordinance</li>
            <li>If T&P valve drips occasionally, thermal expansion is likely the cause</li>
          </ul>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>⚠️ What Happens Without an Expansion Tank</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              ['🔧', 'T&P valve wears out prematurely from repeated discharge'],
              ['💧', 'Water hammer and banging pipes from pressure spikes'],
              ['⏳', 'Water heater lifespan reduced by 30–50%'],
              ['🚨', 'Possible tank rupture in severe cases'],
            ].map(([icon, text]) => (
              <div key={text} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ color: '#c8d8f0', fontSize: '0.9rem' }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Check Your DFW Home</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select city...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Check My Risk
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
                {result.likelihood}% Closed System Likelihood
              </div>
              <div style={{ color: '#c8d8f0', marginBottom: '0.5rem' }}>{result.warning}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>Expansion Tank Required: {result.required ? '✅ Yes' : '⚠️ Verify'}</div>
              <div style={{ color: '#c8d8f0', marginTop: '0.4rem' }}>Typical Installation Cost: {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Get a DFW Plumber to Install Your Expansion Tank</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk connects you with licensed plumbers who know DFW code requirements.</div>
        </div>
      </div>
    </div>
  );
}

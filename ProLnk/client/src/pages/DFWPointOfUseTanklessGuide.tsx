import { useState } from 'react';

const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'];
const waitTimes = ['Less than 30 seconds', '30–60 seconds', '1–2 minutes', '2–4 minutes', '4+ minutes'];

function getResult(size: string, wait: string) {
  const bigHome = size === '4,000+ sq ft' || size === '2,500–4,000 sq ft';
  const longWait = wait === '2–4 minutes' || wait === '4+ minutes';
  const medWait = wait === '1–2 minutes';

  if (bigHome && longWait) {
    return {
      feasibility: 'Excellent',
      score: 95,
      kw: '6–11 kW point-of-use unit',
      cost: '$300–$700 per fixture installed',
      fixtures: '2–4 fixtures likely candidates (master bath, guest bath, kitchen)',
      note: 'Large DFW homes with long pipe runs are the ideal use case. Expect near-instant hot water after installation.',
    };
  }
  if (bigHome && medWait) {
    return {
      feasibility: 'Good',
      score: 80,
      kw: '6–9 kW point-of-use unit',
      cost: '$300–$600 per fixture installed',
      fixtures: '1–2 fixtures recommended (furthest from water heater)',
      note: 'A good option for the fixtures farthest from your main heater.',
    };
  }
  if (!bigHome && longWait) {
    return {
      feasibility: 'Good',
      score: 75,
      kw: '6–8 kW point-of-use unit',
      cost: '$300–$550 per fixture installed',
      fixtures: '1 fixture likely needed',
      note: 'Long wait time suggests a far fixture or undersized main heater — POU unit may solve it.',
    };
  }
  if (wait === 'Less than 30 seconds') {
    return {
      feasibility: 'Not Needed',
      score: 10,
      kw: 'N/A',
      cost: 'N/A',
      fixtures: 'None — you already have fast hot water',
      note: 'Your current system is performing well. No POU unit needed.',
    };
  }
  return {
    feasibility: 'Moderate',
    score: 55,
    kw: '4–6 kW point-of-use unit',
    cost: '$250–$500 per fixture installed',
    fixtures: '1 fixture may help',
    note: 'POU unit may help, but also consider pipe insulation or a recirculation pump as alternatives.',
  };
}

export default function DFWPointOfUseTanklessGuide() {
  const [size, setSize] = useState('');
  const [wait, setWait] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getResult> | null>(null);

  function calculate() {
    if (!size || !wait) return;
    setResult(getResult(size, wait));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🚿 DFW Point-of-Use Tankless Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Point-of-Use Tankless Water Heaters for DFW Homes</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>The DFW "Wait Problem"</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0' }}>
            DFW homes — especially the large 3,000–5,000+ sq ft homes common in Frisco, Allen, McKinney, and Prosper —
            often have a <strong style={{ color: '#F5E642' }}>master bathroom that's 80–120 feet of pipe away from the water heater</strong>.
            That means 3–5 minutes of cold water before hot arrives. A small electric point-of-use (POU) tankless unit
            installed under the vanity solves this instantly.
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>How to Identify Candidates in Your Home</h2>
          <ul style={{ lineHeight: 2, color: '#c8d8f0', paddingLeft: '1.5rem' }}>
            <li>Master bathroom more than 50 feet from water heater</li>
            <li>Guest bathroom on the opposite side or floor from the water heater</li>
            <li>Outdoor kitchen or detached garage with a sink</li>
            <li>Any fixture where wait time exceeds 90 seconds consistently</li>
          </ul>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>POU vs. Recirculation Pump</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              ['⚡', 'Point-of-Use Tankless', 'Heats water at the fixture — no pipe run needed. Best for 1–2 far fixtures.'],
              ['🔄', 'Recirculation Pump', 'Keeps hot water in pipes at all times. Best for whole-house solution but uses more energy.'],
              ['💧', 'Point-of-Use Tankless', 'No water wasted waiting — hot water in under 3 seconds at the fixture.'],
              ['🔧', 'Recirculation Pump', 'Requires return line or demand-activated pump. More complex installation.'],
            ].map(([icon, type, desc]) => (
              <div key={desc} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.4rem' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.3rem' }}>{type}</div>
                <div style={{ color: '#c8d8f0', fontSize: '0.85rem', marginTop: '0.3rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Check If You Need One</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Home Size</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642' }}>
                <option value=''>Select size...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>How Long to Get Hot Water at Farthest Fixture?</label>
              <select value={wait} onChange={e => setWait(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642' }}>
                <option value=''>Select wait time...</option>
                {waitTimes.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Check Feasibility
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
                {result.feasibility} — {result.score}% Recommended
              </div>
              <div style={{ color: '#c8d8f0', lineHeight: 1.9 }}>
                <div>⚡ Unit Size: <strong style={{ color: '#fff' }}>{result.kw}</strong></div>
                <div>💰 Cost Per Fixture: <strong style={{ color: '#fff' }}>{result.cost}</strong></div>
                <div>🚿 Fixtures: <strong style={{ color: '#fff' }}>{result.fixtures}</strong></div>
                <div style={{ marginTop: '0.75rem', color: '#F5E642' }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Get a DFW Electrician to Install Your POU Unit</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk finds licensed electricians and plumbers experienced with point-of-use tankless installations.</div>
        </div>
      </div>
    </div>
  );
}

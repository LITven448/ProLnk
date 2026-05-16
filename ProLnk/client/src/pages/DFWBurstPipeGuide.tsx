import { useState } from 'react';

const steps = {
  minor: {
    actions: ['Turn off water at the burst pipe shutoff valve if accessible', 'Place a bucket under the leak and wrap pipe with rubber and a C-clamp', 'Call a licensed plumber for same-day repair', 'Document the damage with photos for insurance'],
    cost: '$150–$400 repair + $150–$300 after-hours service call',
    insurance: 'Homeowners insurance covers sudden burst pipes — file within 24 hours',
  },
  moderate: {
    actions: ['Shut off the main water supply immediately', 'Turn off electricity to affected areas at breaker panel', 'Move valuables and open cabinet doors to dry pipes', 'Call an emergency plumber — expect 1–3 hour response in DFW'],
    cost: '$400–$1,200 repair + possible drywall remediation ($500–$2,000)',
    insurance: 'Document everything before cleanup — adjuster will want photos of original damage',
  },
  severe: {
    actions: ['Shut off main water and electricity immediately', 'Evacuate if structural flooding is present', 'Call emergency plumber AND water restoration company simultaneously', 'Contact your insurance company while repairs are being assessed'],
    cost: '$1,500–$8,000+ including water damage restoration',
    insurance: 'Call insurance BEFORE signing any restoration contracts — get multiple quotes',
  },
};

export default function DFWBurstPipeGuide() {
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState<null | typeof steps.minor>(null);

  function handleAssess() {
    if (!severity) return;
    setResult(steps[severity as keyof typeof steps]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>💧</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Burst Pipe Emergency Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          The 2021 winter storm caused millions of burst pipes across DFW. Knowing your shutoff location and acting fast limits damage. Most DFW homes have a main shutoff at the street meter or near the foundation — find yours <strong style={{ color: '#F5E642' }}>before</strong> an emergency.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔑 Know Your Shutoffs</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
            <li><strong>Main shutoff:</strong> Near water meter at street or at foundation entry point</li>
            <li><strong>Under-sink shutoffs:</strong> Individual valves behind every fixture</li>
            <li><strong>Water heater shutoff:</strong> Cold supply line valve at top of heater</li>
            <li><strong>Irrigation shutoff:</strong> Usually in garage or utility closet</li>
          </ul>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Assess Your Situation</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Where is the burst pipe?</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. under kitchen sink, in wall behind bathroom..."
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#0A1628', border: '1px solid #334155', color: '#fff', marginBottom: '1rem', boxSizing: 'border-box' }}
          />
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Severity of water flow:</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['minor', 'moderate', 'severe'].map(s => (
              <button key={s} onClick={() => setSeverity(s)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: severity === s ? '#F5E642' : '#334155', background: severity === s ? '#F5E642' : 'transparent', color: severity === s ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                {s === 'minor' ? '🟡 Minor drip' : s === 'moderate' ? '🟠 Steady flow' : '🔴 Gushing water'}
              </button>
            ))}
          </div>
          <button onClick={handleAssess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Action Plan
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ Immediate Actions</h2>
            <ol style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              {result.actions.map((a, i) => <li key={i}>{a}</li>)}
            </ol>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💰 Estimated Cost</div>
              <div style={{ color: '#cbd5e1' }}>{result.cost}</div>
            </div>
            <div style={{ marginTop: '0.75rem', padding: '1rem', background: '#0A1628', borderRadius: '8px' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏠 Insurance Guidance</div>
              <div style={{ color: '#cbd5e1' }}>{result.insurance}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>📞 DFW Emergency Plumber Rates</h2>
          <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.7 }}>After-hours service call: <strong style={{ color: '#fff' }}>$150–$300</strong> | Standard repair: <strong style={{ color: '#fff' }}>$150–$600</strong> | Major pipe replacement: <strong style={{ color: '#fff' }}>$800–$4,000+</strong>. Get a quote from a licensed ProLnk pro before work begins.</p>
        </div>
      </div>
    </div>
  );
}

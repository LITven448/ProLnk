import { useState } from 'react';

const neighborhoods = ['Deep Ellum', 'Lakewood', 'Oak Cliff', 'Bishop Arts', 'Swiss Avenue', 'Munger Place', 'Other Pre-1950 Area'];

const riskMatrix: Record<string, { likelihood: string; insurance: string; rewire: string; color: string }> = {
  'pre-1930': { likelihood: 'Very High (85%+)', insurance: 'Many DFW insurers will decline coverage', rewire: '$8,000 – $15,000 for full rewire', color: '#FF4444' },
  '1930-1945': { likelihood: 'High (60–75%)', insurance: 'Disclosure required; surcharge likely', rewire: '$6,000 – $12,000', color: '#FF8800' },
  '1946-1950': { likelihood: 'Moderate (30–50%)', insurance: 'Inspection often required', rewire: '$5,000 – $10,000', color: '#F5E642' },
  'post-1950': { likelihood: 'Low (under 10%)', insurance: 'Standard coverage likely available', rewire: 'Spot repairs $800 – $2,500', color: '#44BB44' },
};

export default function DFWKnobAndTubeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | typeof riskMatrix[string]>(null);

  function assess() {
    if (!homeAge) return;
    setResult(riskMatrix[homeAge]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Knob & Tube Wiring Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>What every pre-1950 DFW homeowner needs to know</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔌 What Is Knob & Tube Wiring?</h2>
          <p style={{ lineHeight: 1.7, color: '#C8D8EE' }}>Knob-and-tube (K&T) wiring was standard in homes built before 1950. It uses ceramic knobs to hold wires along joists and ceramic tubes where wires pass through framing. K&T has no ground wire and relies on open-air cooling — insulating over it traps heat and creates fire risk.</p>
          <p style={{ lineHeight: 1.7, color: '#C8D8EE' }}>In DFW neighborhoods like <strong style={{ color: '#F5E642' }}>Deep Ellum, Lakewood, and Oak Cliff</strong>, many charming craftsman and tudor-style homes still have original K&T circuits — sometimes mixed with modern wiring additions that compound the hazard.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ Why K&T Is Dangerous When Modified</h2>
          <ul style={{ color: '#C8D8EE', lineHeight: 2 }}>
            <li>No grounding — modern appliances require ground for safe operation</li>
            <li>Cannot be insulated — adding attic insulation over K&T voids fire safety</li>
            <li>Splices degrade over 70+ years, increasing arc risk</li>
            <li>Mixing K&T with modern wiring creates incompatible load paths</li>
            <li>DFW summer heat accelerates insulation breakdown on old cloth wiring</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏦 DFW Insurance Implications</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Several major DFW insurers — including some Texas Farm Bureau and Farmers agents — will decline to write new policies or renew existing policies on homes with active K&T wiring. Others require a licensed electrician's inspection and may add significant surcharges. Always disclose K&T to your agent.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 K&T Risk & Rewiring Cost Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Home construction era</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select year range...</option>
              <option value="pre-1930">Before 1930</option>
              <option value="1930-1945">1930 – 1945</option>
              <option value="1946-1950">1946 – 1950</option>
              <option value="post-1950">After 1950</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Primary wiring concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select concern...</option>
              <option value="insurance">Getting / keeping homeowner's insurance</option>
              <option value="renovation">Planning a renovation</option>
              <option value="addinsulation">Adding attic insulation</option>
              <option value="safety">General safety check</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Assess My Risk →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 20, borderRadius: 10, border: `2px solid ${result.color}`, background: '#0A1628' }}>
              <div style={{ color: result.color, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>K&T Likelihood: {result.likelihood}</div>
              <div style={{ color: '#C8D8EE', marginBottom: 6 }}>🏦 Insurance: {result.insurance}</div>
              <div style={{ color: '#C8D8EE' }}>🔧 Rewiring Cost: {result.rewire}</div>
              <p style={{ color: '#8899BB', marginTop: 12, marginBottom: 0, fontSize: 13 }}>Get a licensed DFW electrician inspection to confirm. ProLnk connects you with vetted local pros.</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get a Free K&T Inspection Quote from a Vetted DFW Electrician via ProLnk</p>
        </div>
      </div>
    </div>
  );
}

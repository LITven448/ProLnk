import { useState } from 'react';

const strategies = [
  { type: 'Ranch/Single Story', situation: 'Old HVAC in attic', label: 'Conditioned Attic', icon: '🏠', detail: 'Spray foam at roof deck seals attic as conditioned space — HVAC efficiency improves 20-30%, higher upfront cost $3-6/sqft.' },
  { type: 'Two Story', situation: 'Budget conscious', label: 'Vented Attic', icon: '🏡', detail: 'Blown cellulose or fiberglass at attic floor, R-38 to R-60 target for DFW, most cost-effective option at $1.50-3/sqft.' },
  { type: 'New Construction', situation: 'Energy efficiency priority', label: 'Conditioned Attic', icon: '🏗️', detail: 'Spray foam at roof deck during construction is ideal — HVAC ducts remain in conditioned space, eliminates duct leakage losses.' },
  { type: 'Older Home', situation: 'Existing vented attic', label: 'Add to Attic Floor', icon: '🏘️', detail: 'Add blown insulation over existing — bring up to current DFW code R-38 minimum, fastest payback of any option.' },
];

export default function DFWRoofInsulationGuide2026() {
  const [homeType, setHomeType] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<typeof strategies[0] | null>(null);

  const homeTypes = ['Ranch/Single Story', 'Two Story', 'New Construction', 'Older Home'];
  const situations = ['Old HVAC in attic', 'Budget conscious', 'Energy efficiency priority', 'Existing vented attic'];

  const getStrategy = () => {
    const match = strategies.find(s => s.type === homeType && s.situation === situation);
    setResult(match || strategies[1]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roof Insulation Strategy Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Conditioned attic vs vented attic — which is right for your DFW home?</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Key DFW Insulation Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌡️', label: 'Attic Temps', val: 'Up to 160°F in DFW summer' },
              { icon: '📋', label: 'Code Minimum', val: 'R-38 attic floor, DFW' },
              { icon: '💰', label: 'Vented Cost', val: '$1.50–3.00/sqft blown' },
              { icon: '🏗️', label: 'Conditioned Cost', val: '$3–6/sqft spray foam' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Your Insulation Strategy</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select home type...</option>
              {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={getStrategy} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My Strategy →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{result.label}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}
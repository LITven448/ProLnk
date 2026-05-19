import { useState } from 'react';

const pressureFixes = {
  high_whole: {
    cause: 'High municipal pressure — DFW water pressure commonly runs 80–120 PSI (recommended max: 80 PSI). Sustained high pressure stresses pipes, fittings, and appliances.',
    diy: true,
    steps: ['Purchase a pressure gauge ($15) and test at an outdoor hose bib', 'If above 80 PSI, install or adjust a Pressure Reducing Valve (PRV)', 'PRV is typically located where main water line enters home (near meter or foundation)', 'Turn adjustment screw counterclockwise to lower pressure', 'Retest after adjustment — target 60–70 PSI'],
    cost: 'PRV adjustment: free (DIY) | PRV replacement: $200–$500 installed',
    urgency: 'High — sustained high pressure shortens pipe and appliance lifespan by years',
  },
  high_single: {
    cause: 'Individual fixture issue — pressure normal overall but specific fixture lacks a flow restrictor or aerator',
    diy: true,
    steps: ['Check faucet aerator — unscrew tip of faucet and inspect screen', 'High-flow showerheads allow more pressure through', 'Install a flow restrictor in the showerhead ($5–$15)', 'For toilets: install pressure-assist toilet fill valve'],
    cost: 'Flow restrictors: $5–$20 | Aerator replacement: $5–$15',
    urgency: 'Low — not damaging, just high flow rate',
  },
  low_whole: {
    cause: 'Whole-house low pressure — common causes: PRV set too low, corroded galvanized pipes (pre-1980 DFW homes), main shutoff partially closed, or municipal supply issue',
    diy: false,
    steps: ['Check that main shutoff valve is fully open', 'Test pressure at meter with a gauge — compare to inside pressure', 'If meter pressure is normal but inside is low, suspect corroded pipes or PRV', 'Call DFW water utility to check if there\’s a main line issue in your neighborhood', 'Schedule a plumber to assess PRV and pipe condition'],
    cost: 'PRV adjustment: $100–$200 | Galvanized pipe repipe: $4,000–$15,000',
    urgency: 'Moderate — investigate root cause before pipes fail completely',
  },
  low_single: {
    cause: 'Isolated low pressure — clogged aerator, mineral buildup in supply valve, or failing fixture cartridge',
    diy: true,
    steps: ['Unscrew and clean faucet aerator — DFW hard water clogs aerators every 1–2 years', 'Soak aerator in white vinegar for 30 minutes to dissolve calcium', 'Check angle stop valve under sink — partially closed valves restrict flow', 'If pressure is low at shower only, showerhead may have calcium buildup — soak in vinegar', 'If cleaning doesn\’t help, faucet cartridge may need replacement'],
    cost: 'Aerator cleaning: free | Aerator replacement: $5–$20 | Cartridge replacement: $30–$150',
    urgency: 'Low — inconvenient but not damaging',
  },
};

export default function DFWWaterPressureGuide() {
  const [symptom, setSymptom] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | typeof pressureFixes.high_whole>(null);
  const [psiReading, setPsiReading] = useState('');

  function handleDiagnose() {
    const key = `${symptom}_${location}` as keyof typeof pressureFixes;
    if (pressureFixes[key]) setResult(pressureFixes[key]);
  }

  const psi = parseInt(psiReading);
  const psiStatus = !psiReading ? null : psi < 40 ? { label: 'Too Low', color: '#3b82f6' } : psi > 80 ? { label: 'Too High', color: '#ef4444' } : { label: 'Normal Range', color: '#22c55e' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>💦</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Water Pressure Troubleshooting Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          High water pressure is a silent home killer — DFW municipalities often deliver water at 80–120 PSI, well above the 60–80 PSI safe range. This stresses pipes, water heaters, and appliances. Low pressure in DFW often traces to hard water mineral buildup or aging galvanized pipes.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Test Your Pressure First</h2>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>A $15 pressure gauge from any hardware store threads onto an outdoor hose bib. Test it and enter the reading:</p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <input
              type="number"
              value={psiReading}
              onChange={e => setPsiReading(e.target.value)}
              placeholder="Enter PSI reading"
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: '#0A1628', border: '1px solid #334155', color: '#fff', fontSize: '1rem' }}
            />
            <span style={{ color: '#94a3b8' }}>PSI</span>
          </div>
          {psiStatus && (
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '0.75rem 1rem', border: `2px solid ${psiStatus.color}`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: psiStatus.color, fontWeight: 700, fontSize: '1.1rem' }}>{psiReading} PSI</span>
              <span style={{ background: psiStatus.color, color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem' }}>{psiStatus.label}</span>
            </div>
          )}
          <p style={{ color: '#475569', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem' }}>Normal range: 40–80 PSI | Ideal: 60–70 PSI | DFW recommendation: install PRV if above 80 PSI</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Describe Your Problem</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Pressure symptom:</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'high', label: '💥 Pressure too high' }, { key: 'low', label: '🌧️ Pressure too low' }].map(opt => (
              <button key={opt.key} onClick={() => setSymptom(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: symptom === opt.key ? '#F5E642' : '#334155', background: symptom === opt.key ? '#F5E642' : 'transparent', color: symptom === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Where is it happening?</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'whole', label: '🏠 Whole house' }, { key: 'single', label: '🚿 Single fixture' }].map(opt => (
              <button key={opt.key} onClick={() => setLocation(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: location === opt.key ? '#F5E642' : '#334155', background: location === opt.key ? '#F5E642' : 'transparent', color: location === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={handleDiagnose} disabled={!symptom || !location} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', opacity: (!symptom || !location) ? 0.5 : 1 }}>
            Get Fix Guide
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: result.diy ? '#064e3b' : '#1e3a5f', borderRadius: '8px', padding: '0.6rem 1rem', display: 'inline-block', marginBottom: '1rem', color: result.diy ? '#6ee7b7' : '#93c5fd', fontWeight: 700 }}>
              {result.diy ? '✅ DIY Fix Available' : '🔧 Plumber Recommended'}
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🔎 Likely Cause</div>
              <div style={{ color: '#cbd5e1' }}>{result.cause}</div>
            </div>
            <ol style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem', margin: '0 0 1rem 0' }}>
              {result.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💰 Cost</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Urgency</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.urgency}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const diagnoses = {
  gas_no_hot: {
    likelyCause: 'Pilot light out or thermocouple failure — most common in DFW (wind drafts and old thermocouples)',
    diy: true,
    diySteps: ['Locate the pilot assembly at the bottom of the water heater', 'Turn gas valve to PILOT position', 'Press and hold the pilot button while lighting with igniter or long lighter', 'Hold button 60 seconds after flame ignites, then release slowly', 'Turn valve to ON if flame stays — if pilot won\’t stay lit, thermocouple needs replacement ($15–$30 DIY or $150 plumber)'],
    callPlumber: 'If pilot won\’t light after 3 attempts, if you smell gas, or if gas valve appears faulty',
    repairCost: '$15–$30 thermocouple (DIY) | $150–$250 thermocouple (plumber)',
    replaceCost: 'Replace if unit is 10+ years old — DFW hard water accelerates tank sediment buildup',
  },
  gas_lukewarm: {
    likelyCause: 'Thermostat set too low or dip tube failure — cold water mixing with hot before it exits tank',
    diy: true,
    diySteps: ['Locate thermostat dial on gas valve (usually under a cover)', 'Set to 120°F (hot) — above 120°F risks scalding', 'Wait 2 hours for water to reheat fully', 'If still lukewarm, dip tube may be broken (sends cold water to bottom of tank)'],
    callPlumber: 'If thermostat is already at 120°F+ and water is still lukewarm — dip tube replacement or sediment flush needed',
    repairCost: '$200–$400 dip tube replacement | $100–$150 sediment flush',
    replaceCost: 'If unit is over 12 years old, replacement ($900–$1,800 installed) is more cost-effective',
  },
  electric_no_hot: {
    likelyCause: 'Tripped breaker or failed heating element — DFW hard water leaves calcium deposits that burn out elements',
    diy: true,
    diySteps: ['Check breaker panel — water heater breaker should be a 240V double breaker', 'If tripped, reset it and wait 2 hours', 'If it trips again immediately, upper heating element has failed', 'Test elements with multimeter — upper element failure = no hot water at all'],
    callPlumber: 'If breaker trips repeatedly or if element testing shows failure — element replacement is straightforward but requires draining tank',
    repairCost: '$20–$40 heating element (DIY) | $150–$300 (plumber)',
    replaceCost: 'DFW hard water burns out elements every 5–8 years — if replacing twice in 3 years, consider water softener ($800–$2,000)',
  },
  electric_lukewarm: {
    likelyCause: 'Lower heating element or thermostat failure — upper element heats top of tank, lower element heats majority',
    diy: true,
    diySteps: ['Reset both thermostats behind the access panel (press red reset button)', 'Wait 2 hours to see if problem resolves', 'If lukewarm returns, lower element or thermostat has failed', 'Test thermostats with multimeter — $10–$20 part if faulty'],
    callPlumber: 'If resetting thermostats doesn\’t resolve it or if you\’re not comfortable draining the tank to replace elements',
    repairCost: '$15–$30 thermostat (DIY) | $150–$250 (plumber)',
    replaceCost: 'Electric water heaters last 10–15 years in DFW — hard water cuts that to 8–12 without a softener',
  },
};

export default function DFWNoHotWaterGuide() {
  const [heaterType, setHeaterType] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<null | typeof diagnoses.gas_no_hot>(null);

  function handleDiagnose() {
    const key = `${heaterType}_${symptom}` as keyof typeof diagnoses;
    if (diagnoses[key]) setResult(diagnoses[key]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🚿</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW No Hot Water Troubleshooting Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          DFW's hard water (200–400 ppm hardness) is the #1 cause of premature water heater failure. Calcium deposits on electric elements and sediment buildup in gas tanks cut years off heater lifespan. Most no-hot-water issues in DFW have a DIY fix — start here.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Diagnose Your Issue</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Water heater type:</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'gas', label: '🔥 Gas (has pilot light / flame)' }, { key: 'electric', label: '⚡ Electric (no flame, 240V breaker)' }].map(opt => (
              <button key={opt.key} onClick={() => setHeaterType(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: heaterType === opt.key ? '#F5E642' : '#334155', background: heaterType === opt.key ? '#F5E642' : 'transparent', color: heaterType === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>What's happening?</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'no_hot', label: '❄️ No hot water at all' }, { key: 'lukewarm', label: '🌡️ Water only gets lukewarm' }].map(opt => (
              <button key={opt.key} onClick={() => setSymptom(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: symptom === opt.key ? '#F5E642' : '#334155', background: symptom === opt.key ? '#F5E642' : 'transparent', color: symptom === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={handleDiagnose} disabled={!heaterType || !symptom} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', opacity: (!heaterType || !symptom) ? 0.5 : 1 }}>
            Diagnose Problem
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: result.diy ? '#064e3b' : '#7f1d1d', borderRadius: '8px', padding: '0.6rem 1rem', display: 'inline-block', marginBottom: '1rem', color: result.diy ? '#6ee7b7' : '#fca5a5', fontWeight: 700 }}>
              {result.diy ? '✅ DIY Possible' : '🔧 Call a Plumber'}
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🔎 Likely Cause</div>
              <div style={{ color: '#cbd5e1' }}>{result.likelyCause}</div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>🛠️ Try This First</h3>
            <ol style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem', margin: '0 0 1rem 0' }}>
              {result.diySteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🔧 Repair Cost</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.repairCost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>♻️ Replace Guidance</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.replaceCost}</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginTop: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📞 Call a Plumber If...</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.callPlumber}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

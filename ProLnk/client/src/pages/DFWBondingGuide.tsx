import { useState } from 'react';

const bondingApps = ['Swimming pool / spa', 'Gas piping system', 'Water service entrance', 'HVAC equipment', 'Structural steel'];
const bondingConcerns = ['Pool tingling sensation', 'Corrosion on gas fittings', 'Rusting water heater anode', 'Metal HVAC duct corrosion', 'General bonding inspection'];

export default function DFWBondingGuide() {
  const [appType, setAppType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { what: string; prevents: string; required: string; cost: string }>(null);

  function assess() {
    if (!appType || !concern) return;
    let what = ''; let prevents = ''; let required = ''; let cost = '';

    if (appType === 'Swimming pool / spa') {
      if (concern.includes('tingling')) {
        what = '🚨 Voltage Present in Pool Water — Immediate Danger';
        prevents = 'Bonding equalizes voltage across all metal surfaces so no current flows through swimmers — DFW pools require equipotential bonding grid per NEC 680';
        required = 'Emergency inspection + bonding grid repair. Bond all metal within 5 ft of water: ladder, light, pump, handrails, any rebar';
        cost = '$800–$2,500 depending on pool age and scope';
      } else {
        what = '✅ Pool Bonding Inspection';
        prevents = 'Prevents electrocution and corrosion — DFW\’s high mineral water accelerates galvanic corrosion without proper bonding';
        required = 'Verify #8 AWG solid copper bonding grid connects all metal, check sacrificial anode condition';
        cost = '$150–$300 inspection';
      }
    } else if (appType === 'Gas piping system') {
      what = '🔥 Gas Pipe Bonding';
      prevents = 'Prevents static discharge ignition and stray current corrosion — DFW clay soil has high electrical activity in storm season';
      required = 'Bond gas piping to electrical ground at service entrance — single connection per NEC 250.104(B)';
      cost = '$200–$450 installed';
    } else if (appType === 'Water service entrance') {
      what = '💧 Water Pipe Bonding';
      prevents = 'Uses metal water pipe as grounding electrode — DFW water pressure fluctuations stress connections. Verify continuity after pipe repairs';
      required = 'Bond main water line within 5 ft of entry — clamp must be listed for direct burial if accessible';
      cost = '$150–$350';
    } else if (appType === 'HVAC equipment') {
      what = '❄️ HVAC Bonding';
      prevents = 'Prevents static buildup on ductwork and chassis — DFW\’s dry winter air increases static risk. Reduces interference with smart thermostats';
      required = 'Equipment grounding conductor on disconnect + duct bonding jumpers at flex connections';
      cost = '$100–$300';
    } else {
      what = '🏗️ Structural Steel Bonding';
      prevents = 'Prevents stray currents from corroding rebar — critical in DFW\’s expansive clay that moves rebar seasonally';
      required = 'Bond rebar cage to grounding system during construction. Retrofit requires accessing rebar or using driven rods';
      cost = '$400–$1,200';
    }
    setResult({ what, prevents, required, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🔗 Electrical Bonding Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Bonding vs grounding — why DFW pools, gas lines, and water pipes all need it.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🤔 Bonding vs Grounding — The Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              ['⚡ Grounding', 'Connects system to earth — gives fault current a safe path to trip your breaker. About protection from faults.'],
              ['🔗 Bonding', 'Connects metal parts to each other — equalizes voltage so no current flows between them. About preventing shock between surfaces.'],
              ['📍 Example', 'Your panel is grounded. Your pool ladder, pump, and rebar are bonded to each other so swimmers feel no voltage difference.'],
              ['⚠️ DFW Risk', 'Clay soil has high electrical activity. Unbonded metals in DFW ground develop voltage differentials faster than sandy soil areas.'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#1A3050', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{t}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏊 DFW Pool Bonding — Critical</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[
              ['NEC 680 Requirement', 'All metal within 5 ft of pool water must be bonded with #8 AWG solid copper'],
              ['Corrosion Prevention', 'DFW hard water + unbonded metals = accelerated galvanic corrosion on ladders and lights'],
              ['Shock Prevention', 'Equipotential bonding grid eliminates voltage gradients swimmers could feel'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{t}</div>
                <div style={{ color: '#94A3B8′ }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1.25rem' }}>🔍 Bonding Assessment Tool</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Application Type</label>
          <select value={appType} onChange={e => setAppType(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select application...</option>
            {bondingApps.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your Concern</label>
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select concern...</option>
            {bondingConcerns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', width: '100%' }}>Assess Bonding Need</button>

          {result && (
            <div style={{ marginTop: '1.25rem', background: '#1A3050', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{result.what}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>What It Prevents: </span>{result.prevents}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>What’s Required: </span>{result.required}</div>
              <div><span style={{ color: '#F5E642′ }}>Estimated Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Bonding Guide · Pool bonding emergencies: call a licensed electrician immediately</div>
      </div>
    </div>
  );
}

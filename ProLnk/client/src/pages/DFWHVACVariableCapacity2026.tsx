import { useState } from 'react';

export default function DFWHVACVariableCapacity2026() {
  const [concern, setConcern] = useState('');
  const [guide, setGuide] = useState('');

  const concerns = [
    'High humidity inside despite AC running',
    'Hot and cold spots room to room',
    'Loud on/off cycling noise',
    'Electric bill too high in summer',
    'Current system 10+ years old',
  ];

  const systems = [
    { name: 'Carrier Infinity 24 (24ACC636A003)', range: '25-100%', seer: '21 SEER2', note: 'Best DFW dehumidification — runs low and slow' },
    { name: 'Trane XR21 (4TTR1036)', range: '30-100%', seer: '19 SEER2', note: 'Proven DFW track record — Trane dealer network strong locally' },
    { name: 'Lennox SL28XCV', range: '25-100%', seer: '28 SEER2', note: 'Highest efficiency — justifiable at DFW electricity rates' },
  ];

  const generate = () => {
    if (!concern) return;
    let tips = [];
    if (concern === 'High humidity inside despite AC running') {
      tips.push('💧 Variable capacity is the DFW solution — single-stage systems cycle too fast to remove humidity, leaving dew points above 55°F');
      tips.push('🌡️ At 25-30% capacity, system runs 6-8 hour cycles pulling humidity out continuously — DFW standard is 45-55% RH target');
    }
    if (concern === 'Hot and cold spots room to room') {
      tips.push('🏠 Variable capacity modulates to match load — eliminates temperature swings caused by single-stage blasting and stopping');
      tips.push('🌬️ Low-speed operation improves airflow distribution through DFW duct systems by 30-40%');
    }
    if (concern === 'Loud on/off cycling noise') {
      tips.push('🔇 True inverter variable capacity runs nearly silently at 25% — DFW homeowners describe it as "always on, never noticeable"');
      tips.push('⚡ Startup amp draw eliminated — no compressor hard starts at 3am when DFW nights stay above 80°F');
    }
    if (concern === 'Electric bill too high in summer') {
      tips.push('💡 SEER2 ratings of 19-28 vs 14-16 for standard — DFW 2,800 cooling hours/year means payback in 5-8 years');
      tips.push('🏦 Oncor rebates up to $800 for qualifying variable capacity systems — check oncor.com/rebates before purchasing');
    }
    if (concern === 'Current system 10+ years old') {
      tips.push('🔄 Replace with variable capacity now — DFW heat will stress an aging system through multiple compressor failures otherwise');
      tips.push('📋 R-22 systems cannot be recharged cost-effectively — variable capacity systems all use R-410A or R-454B');
    }
    tips.push('🏆 All three top brands (Carrier Infinity, Trane S-Series, Lennox SLV) have DFW dealer networks with 24-hour emergency service');
    tips.push('🌡️ DFW climate: 2,800+ cooling hours/year — variable capacity ROI is highest in Texas vs any other U.S. climate zone');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW HVAC GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Variable Capacity HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>True inverter-driven variable capacity systems for DFW — precise humidity control, quietest operation, and highest efficiency for Texas summers.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Match to Your DFW Comfort Concern</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Primary DFW Comfort Problem</label>
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select concern...</option>
            {concerns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate System Guide</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>❄️ Variable Capacity Recommendations</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🏆 Top DFW Variable Capacity Systems</h3>
          {systems.map(s => (
            <div key={s.name} style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 6 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{s.seer}</span>
                <span style={{ background: '#1e3a5f', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{s.range} capacity</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Get a variable capacity system quote from a DFW HVAC specialist</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>❄️ Get Variable Capacity Quote DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
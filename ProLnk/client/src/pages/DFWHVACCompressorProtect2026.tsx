import { useState } from 'react';

export default function DFWHVACCompressorProtect2026() {
  const [age, setAge] = useState('');
  const [behavior, setBehavior] = useState('');
  const [guide, setGuide] = useState('');

  const behaviors = [
    'Trips breaker on hot days',
    'Loud startup noise',
    'Runs constantly',
    'Short cycles off quickly',
    'Normal operation',
  ];

  const generate = () => {
    if (!age || !behavior) return;
    const yr = parseInt(age);
    let tips = [];
    if (yr >= 8) tips.push('⚡ Hard start kit is critical — reduces startup amp draw by 50% and extends compressor life 3-5 years in DFW heat');
    if (yr < 8) tips.push('🛡️ Preventive hard start kit now adds years before DFW summer stress causes failure');
    if (behavior === 'Trips breaker on hot days') tips.push('🔌 Hard start kit likely resolves this — compressor inrush current overwhelms circuit on 100°F+ days');
    if (behavior === 'Loud startup noise') tips.push('🔊 Hard start capacitor reduces startup torque shock — expect quieter operation within one cycle');
    if (behavior === 'Runs constantly') tips.push('🌡️ Check refrigerant charge — overcharge causes head pressure spike and compressor overheating in DFW summers');
    tips.push('🌿 Clean condenser coils monthly May-September — DFW cottonwood and dust cut efficiency 15-25%');
    tips.push('🏗️ Add shade structure on west side — reduces condenser entering air temp 5-10°F, cuts head pressure significantly');
    tips.push('🔒 Verify high-head pressure cutout is functional — protects compressor when ambient exceeds 105°F');
    tips.push('❄️ Verify refrigerant charge annually — overcharge overheats, undercharge cavitates: both kill compressors');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW HVAC GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AC Compressor Protection Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Extending compressor life in Dallas-Fort Worth extreme heat — hard start kits, condenser care, and refrigerant management.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Protection Plan</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Compressor Age (years)</label>
          <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="e.g. 7″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 16, boxSizing: 'border-box' }} />
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>DFW Summer Behavior</label>
          <select value={behavior} onChange={e => setBehavior(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select behavior...</option>
            {behaviors.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Protection Plan</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🛡️ Your Compressor Protection Plan</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[['⚡ Hard Start Kit', 'Most impactful DFW upgrade — $80-120 installed, extends compressor life 3-5 years'],['🌿 Condenser Cleaning', 'Monthly May-Sep in DFW — cottonwood and dust reduce efficiency 15-25%'],['🏗️ Shade Structure', 'West-side shade reduces entering air 5-10°F — meaningful efficiency gain'],['🔒 Head Pressure Cutout', 'Protects compressor on 105°F+ DFW days — verify it functions annually']].map(([title, desc]) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Get a DFW HVAC technician to inspect your compressor before summer 2026</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>🔧 Find HVAC Pro in DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
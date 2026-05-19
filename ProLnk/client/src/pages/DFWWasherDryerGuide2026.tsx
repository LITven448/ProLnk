import { useState } from 'react';

export default function DFWWasherDryerGuide2026() {
  const [setup, setSetup] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const SYMS = ['Clothes still wet','Burning smell','Takes too long','Shaking/vibrating','Error codes','Won\’t start'];

  function toggle(s: string) {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function guide() {
    if (!setup) { setResult('⚠️ Please select your setup type first.'); return; }
    const score = symptoms.length;
    const isGas = setup.includes('Gas');
    if (symptoms.includes('Burning smell')) {
      setResult('🔴 STOP USE — Burning smell on a dryer is a fire hazard. Call a DFW appliance tech today. If gas unit, also check for gas leak.');
    } else if (score >= 3) {
      setResult(`🟡 Multiple issues suggest wear. ${isGas ? 'Gas dryer repair averages $150-300 in DFW.' : 'Electric dryer repair $120-250.'} Get a quote before deciding.`);
    } else {
      setResult('🟢 Likely a maintenance fix. First step: clean the lint trap and dryer vent. DFW dust clogs vents faster — inspect every 6 months.');
    }
  }

  const setups = ['Gas Dryer + Top Load Washer', 'Gas Dryer + Front Load Washer', 'Electric Dryer + Top Load', 'Electric Dryer + Front Load', 'Washer/Dryer Combo Unit'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Washer / Dryer Guide — Dallas / Fort Worth</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>Gas dryers dominate DFW. Dryer vent cleaning is a critical fire-safety task.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#13223a', borderRadius: 12, padding: 18, borderTop: '3px solid #F5E642' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔥</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Gas vs Electric Dryer</div>
            <ul style={{ color: '#a0b0c8', fontSize: 12, paddingLeft: 16, lineHeight: 1.8 }}>
              <li>~70% of DFW homes have gas dryers</li>
              <li>Gas: faster drying, lower operating cost</li>
              <li>Electric: simpler install, no gas line needed</li>
              <li>Gas line work requires licensed TX plumber</li>
            </ul>
          </div>
          <div style={{ background: '#13223a', borderRadius: 12, padding: 18, borderTop: '3px solid #F5E642' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Dryer Vent Fire Risk</div>
            <ul style={{ color: '#a0b0c8', fontSize: 12, paddingLeft: 16, lineHeight: 1.8 }}>
              <li>2,900+ dryer fires/year nationally</li>
              <li>DFW dust & cotton lint = faster buildup</li>
              <li>Clean dryer vent every 6–12 months</li>
              <li>Signs: clothes take 2+ cycles to dry</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>↕️ Front Load vs Top Load for DFW Families</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ color: '#a0b0c8', fontSize: 12, lineHeight: 1.8 }}>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>🔄 Front Load</div>
              <div>More energy efficient</div>
              <div>Better for large loads</div>
              <div>Watch for mold around door seal</div>
            </div>
            <div style={{ color: '#a0b0c8', fontSize: 12, lineHeight: 1.8 }}>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>⬆️ Top Load</div>
              <div>Easier to load/unload</div>
              <div>Less maintenance</div>
              <div>Higher water usage per cycle</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🔧 Maintenance Guide</div>
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Your setup</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {setups.map(s => (
              <button key={s} onClick={() => setSetup(s)}
                style={{ background: setup === s ? '#F5E642' : '#0A1628', color: setup === s ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Symptoms (select all)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {SYMS.map(s => (
              <button key={s} onClick={() => toggle(s)}
                style={{ background: symptoms.includes(s) ? '#F5E642' : '#0A1628', color: symptoms.includes(s) ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <button onClick={guide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Get My Guide</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 20, textAlign: 'center' }}>ProLnk connects you with licensed DFW appliance & gas pros · prolnk.io</div>
      </div>
    </div>
  );
}
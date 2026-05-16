import { useState } from 'react';

const SYMPTOMS_OTR = ['Sparks inside','No heat','Turntable broken','Display dead','Smells burnt','Fan not working'];
const SYMPTOMS_CTR = ['No power','Uneven heating','Sparks','Door won\'t close','Display issues','Arcing'];

export default function DFWMicrowaveGuide2026() {
  const [mType, setMType] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState('');

  function toggle(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function decide() {
    if (!mType) { setResult('⚠️ Select your microwave type first.'); return; }
    const score = selected.length;
    const isOTR = mType === 'Over-the-Range';
    if (selected.includes('Sparks') || selected.includes('Arcing') || selected.includes('Sparks inside')) {
      setResult('🔴 STOP USE — Sparking or arcing is dangerous. Do not operate. Schedule replacement. OTR installation is $150–250 in DFW (requires cabinet work for proper venting).');
    } else if (isOTR && score >= 2) {
      setResult('🔴 Replace OTR — repair cost often exceeds unit value. New OTR microwaves run $250–700. Professional install required for venting and mounting.');
    } else if (!isOTR && score >= 2) {
      setResult('🟡 Countertop units are cheap to replace ($80–300). Repair rarely makes sense unless under warranty.');
    } else {
      setResult('🟢 Single issue — likely repairable. OTR: call an appliance tech. Countertop: check if still under manufacturer warranty first.');
    }
  }

  const types = [
    { icon: '🍳', name: 'Over-the-Range', note: 'Mounted above range; requires proper venting; pro install needed' },
    { icon: '🧱', name: 'Built-In', note: 'Trim kit required; flush with cabinetry; pro install' },
    { icon: '📦', name: 'Countertop', note: 'Plug-in; easiest swap; ensure GFCI outlet on counter circuit' },
  ];

  const symptoms = mType === 'Over-the-Range' ? SYMPTOMS_OTR : SYMPTOMS_CTR;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Microwave Guide — Dallas / Fort Worth</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>Average lifespan 9–10 years. Repair threshold: cost &gt; 50% of replacement = replace.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {types.map(t => (
            <div key={t.name} style={{ background: '#13223a', borderRadius: 10, padding: '16px 12px', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 26 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, margin: '8px 0 4px', fontSize: 13 }}>{t.name}</div>
              <div style={{ color: '#a0b0c8', fontSize: 11 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔧 OTR Installation in DFW</div>
          <ul style={{ color: '#a0b0c8', fontSize: 13, paddingLeft: 18, lineHeight: 1.9 }}>
            <li>Must vent to exterior or recirculate through charcoal filter</li>
            <li>Venting to exterior = better air quality, preferred in DFW</li>
            <li>Requires upper cabinet modification for mounting bracket</li>
            <li>DFW install cost: $150–250 (includes mounting + vent setup)</li>
            <li>Dedicated 20A circuit recommended (check with electrician)</li>
          </ul>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🔍 Repair vs Replace Guide</div>
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Microwave type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {['Over-the-Range', 'Built-In', 'Countertop'].map(s => (
              <button key={s} onClick={() => { setMType(s); setSelected([]); setResult(''); }}
                style={{ background: mType === s ? '#F5E642' : '#0A1628', color: mType === s ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          {mType && <>
            <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Symptoms (select all)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {symptoms.map(s => (
                <button key={s} onClick={() => toggle(s)}
                  style={{ background: selected.includes(s) ? '#F5E642' : '#0A1628', color: selected.includes(s) ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </>}
          <button onClick={decide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 20, textAlign: 'center' }}>ProLnk connects you with licensed DFW appliance pros · prolnk.io</div>
      </div>
    </div>
  );
}
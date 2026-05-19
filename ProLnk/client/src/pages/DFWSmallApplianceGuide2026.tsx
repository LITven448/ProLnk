import { useState } from 'react';

const APPLIANCES = ['Air Fryer (1800W)','Instant Pot (1200W)','Coffee Maker (1000W)','Toaster Oven (1800W)','Stand Mixer (600W)','Electric Kettle (1500W)','Blender (1000W)','Microwave (1200W)'];

export default function DFWSmallApplianceGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [outlets, setOutlets] = useState('');
  const [result, setResult] = useState('');

  function toggle(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function check() {
    const count = selected.length;
    const o = parseInt(outlets) || 0;
    const totalW = selected.reduce((sum, a) => {
      const match = a.match(/\((\d+)W\)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
    const amps = totalW / 120;
    let msg = `⚡ Estimated load: ${totalW}W (~${amps.toFixed(1)}A) on counter circuits.

`;
    if (amps > 20) msg += '🔴 Overload risk — you\’re exceeding standard 20A counter circuits. You need a dedicated circuit for high-draw appliances. Call a TDLR electrician.';
    else if (amps > 15) msg += '🟡 Near capacity — avoid running all simultaneously. Consider a dedicated 20A circuit for air fryer or toaster oven.';
    else msg += '🟢 Your load is manageable on standard DFW kitchen circuits (typically two 20A GFCI circuits per NEC 2020).';
    if (o < 4 && count > 3) msg += '

⚠️ Too few outlets for your appliances. Add GFCI outlets or an outlet strip rated for kitchen use.';
    msg += '

🛡️ Tip: Whole-home surge protection ($300–600 installed) protects every appliance from DFW storm-season power surges.';
    setResult(msg);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Kitchen Small Appliance Guide — DFW</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>GFCI outlets required on all kitchen counter circuits per NEC 2020. Plan your load before buying appliances.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#13223a', borderRadius: 12, padding: 18, borderTop: '3px solid #F5E642′ }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔌</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>NEC 2020 — Kitchen Rules</div>
            <ul style={{ color: '#a0b0c8', fontSize: 12, paddingLeft: 16, lineHeight: 1.9 }}>
              <li>Minimum 2 x 20A small appliance circuits</li>
              <li>All counter outlets must be GFCI protected</li>
              <li>Refrigerator: dedicated 15A or 20A circuit</li>
              <li>Microwave: dedicated 20A circuit</li>
              <li>Disposal: dedicated 20A circuit</li>
            </ul>
          </div>
          <div style={{ background: '#13223a', borderRadius: 12, padding: 18, borderTop: '3px solid #F5E642′ }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⛈️</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>DFW Storm Surge Risk</div>
            <ul style={{ color: '#a0b0c8', fontSize: 12, paddingLeft: 16, lineHeight: 1.9 }}>
              <li>DFW averages 50+ thunderstorm days/year</li>
              <li>Power surges kill appliances and electronics</li>
              <li>Whole-home surge protector at main panel</li>
              <li>Cost: $300–600 installed by TDLR electrician</li>
              <li>Point-of-use strips add secondary protection</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔧 Circuit Sufficiency Check</div>
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Select your counter appliances</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {APPLIANCES.map(a => (
              <button key={a} onClick={() => toggle(a)}
                style={{ background: selected.includes(a) ? '#F5E642′ : '#0A1628', color: selected.includes(a) ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: ’pointer' }}>{a}</button>
            ))}
          </div>
          <label style={{ fontSize: 13, color: '#a0b0c8′ }}>Number of counter outlets in your kitchen</label>
          <input value={outlets} onChange={e => setOutlets(e.target.value)} type="number" placeholder="e.g. 6″
            style={{ display: 'block', width: '100%', background: '#0A1628', border: '1px solid #2a3a54', borderRadius: 8, color: '#fff', padding: '10px 12px', marginTop: 6, marginBottom: 16, fontSize: 14, boxSizing: 'border-box' }} />
          <button onClick={check} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Check My Kitchen</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 4, textAlign: 'center' }}>ProLnk connects you with TDLR-licensed DFW electricians · prolnk.io</div>
      </div>
    </div>
  );
}
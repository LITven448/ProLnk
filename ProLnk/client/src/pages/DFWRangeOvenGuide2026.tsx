import { useState } from 'react';

export default function DFWRangeOvenGuide2026() {
  const [rangeType, setRangeType] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  function recommend() {
    if (!rangeType || !budget) { setResult('⚠️ Please select range type and budget.'); return; }
    const b = parseInt(budget) || 0;
    if (rangeType === 'Electric' && b >= 1200) setResult('✨ Upgrade to Induction — faster than gas, precise control, easy clean glass top. Requires TDLR electrician for 240V circuit. GE Profile or Samsung top picks in DFW.');
    else if (rangeType === 'Electric' && b >= 600) setResult('🔄 Upgrade to Gas — most DFW homes have gas lines. Lower operating cost. Requires licensed TX plumber for gas line. Anti-tip bracket required by code.');
    else if (rangeType === 'Gas') setResult('🟢 Stay Gas — great choice for DFW. If replacing, ensure anti-tip bracket is installed. Licensed plumber required for gas connection. Budget ~$150 for install.');
    else if (rangeType === 'Induction') setResult('🟢 Best setup for DFW — stay induction. Fastest boil, easiest to clean. Verify 240V 50A circuit is in place (TDLR electrician required).');
    else setResult('🔧 Assess your gas availability. Call ProLnk to find a licensed plumber to confirm gas line options.');
  }

  const types = [
    { icon: '🔥', name: 'Gas', note: 'Dominant in DFW — instant heat, most pros prefer' },
    { icon: '⚡', name: 'Electric', note: 'Coil or smooth top; all-electric homes only' },
    { icon: '🧲', name: 'Induction', note: 'Fastest, safest, energy efficient; 240V required' },
    { icon: '🔥⚡', name: 'Dual Fuel', note: 'Gas range + electric oven; best of both' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Range & Oven Guide — Dallas / Fort Worth</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>Gas dominates DFW homes. Licensed pros required for all gas and 240V electrical work.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {types.map(t => (
            <div key={t.name} style={{ background: '#13223a', borderRadius: 10, padding: '16px 12px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 24 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, margin: '8px 0 4px' }}>{t.name}</div>
              <div style={{ color: '#a0b0c8', fontSize: 12 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>⚖️ TX Code Requirements</div>
          <ul style={{ color: '#a0b0c8', fontSize: 13, paddingLeft: 18, lineHeight: 1.9 }}>
            <li>Gas range: Licensed TX plumber for gas line connection</li>
            <li>Electric range: TDLR-licensed electrician for 240V/50A circuit</li>
            <li>Anti-tip bracket: Required by code on all freestanding ranges</li>
            <li>Slide-in ranges: Professional install strongly recommended</li>
            <li>Permits required for new gas line runs in DFW municipalities</li>
          </ul>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🛒 Upgrade Recommendation</div>
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Current range type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {['Gas', 'Electric', 'Induction', 'Dual Fuel', 'Not sure'].map(s => (
              <button key={s} onClick={() => setRangeType(s)}
                style={{ background: rangeType === s ? '#F5E642' : '#0A1628', color: rangeType === s ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <label style={{ fontSize: 13, color: '#a0b0c8' }}>Total budget (range + install)</label>
          <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g. 1200"
            style={{ display: 'block', width: '100%', background: '#0A1628', border: '1px solid #2a3a54', borderRadius: 8, color: '#fff', padding: '10px 12px', marginTop: 6, marginBottom: 16, fontSize: 14, boxSizing: 'border-box' }} />
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 20, textAlign: 'center' }}>ProLnk connects you with licensed DFW plumbers & electricians · prolnk.io</div>
      </div>
    </div>
  );
}
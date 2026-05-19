import { useState } from 'react';

export default function DFWHVACFlexDuctCalc2026() {
  const [ductSize, setDuctSize] = useState('');
  const [runLength, setRunLength] = useState('');
  const [bends, setBends] = useState('0');
  const [result, setResult] = useState('');

  const ductData: Record<string, { cfm: string; minCfm: number; maxCfm: number }> = {
    '6': { cfm: '100–130 CFM', minCfm: 100, maxCfm: 130 },
    '8': { cfm: '175–225 CFM', minCfm: 175, maxCfm: 225 },
    '10': { cfm: '280–360 CFM', minCfm: 280, maxCfm: 360 },
    '12': { cfm: '400–500 CFM', minCfm: 400, maxCfm: 500 },
  };

  function calculate() {
    if (!ductSize || !runLength) { setResult('Please select duct size and enter run length.'); return; }
    const d = ductData[ductSize];
    const actualLength = parseFloat(runLength);
    const bendsCount = parseInt(bends) || 0;
    const equivalentLength = actualLength + (bendsCount * 10);
    const maxRecommended = 50;
    const status = equivalentLength <= maxRecommended ? 'ACCEPTABLE' : equivalentLength <= 75 ? 'MARGINAL' : 'OVERSIZED — PERFORMANCE LOSS';
    const statusColor = equivalentLength <= maxRecommended ? '#22c55e' : equivalentLength <= 75 ? '#f59e0b' : '#ef4444';
    const advice = equivalentLength > 50
      ? 'DFW installers often use undersized flex duct to save cost. This run will lose static pressure and reduce airflow to the room. Upsize one diameter or reduce bends by re-routing. In DFW summers, an undersized duct run means the room never reaches setpoint.'
      : 'This run is within acceptable range for DFW HVAC systems. Ensure duct is fully extended (not compressed), supported every 4 feet, and sealed at both ends with mastic — not just tape.';
    setResult(`Duct: ${ductSize}" | Capacity: ${d.cfm} | Actual Length: ${actualLength} ft | Bends: ${bendsCount} (adds ${bendsCount * 10} equivalent ft) | Total Equivalent Length: ${equivalentLength} ft | Status: ${status} | ${advice}`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>💨</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Flex Duct Sizing and Length Calculator Guide 2026</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>How flex duct size and run length affect DFW HVAC performance — with resistance calculation for bends.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 DFW Flex Duct CFM Reference</h2>
          {[
            { d: '6-inch', cfm: '100–130 CFM', note: 'Single bedroom supply — commonly undersized in DFW tract homes' },
            { d: '8-inch', cfm: '175–225 CFM', note: 'Living area supply — standard for most DFW rooms under 250 sq ft' },
            { d: '10-inch', cfm: '280–360 CFM', note: 'Large room supply — needed for open-plan DFW great rooms' },
            { d: '12-inch', cfm: '400–500 CFM', note: 'Return air or trunk — undersizing here tanks whole-system performance' },
          ].map((r, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{r.d} — {r.cfm}</div>
              <div style={{ color: '#a0b0c8', fontSize: 13, marginTop: 2 }}>{r.note}</div>
            </div>
          ))}
          <div style={{ color: '#c8d8ec', fontSize: 13, marginTop: 8 }}>⚠️ Every 90° bend = 10 equivalent feet of straight duct resistance</div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Calculate Your Run Performance</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Duct Diameter</label>
          <select value={ductSize} onChange={e => setDuctSize(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select diameter...</option>
            <option value="6">6-inch</option>
            <option value="8">8-inch</option>
            <option value="10">10-inch</option>
            <option value="12">12-inch</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Actual Run Length (feet)</label>
          <input type="number" value={runLength} onChange={e => setRunLength(e.target.value)} placeholder="e.g. 35" style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14, boxSizing: 'border-box' }} />
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Number of 90° Bends</label>
          <select value={bends} onChange={e => setBends(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} bend{n !== 1 ? 's' : ''}</option>)}
          </select>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Calculate Performance 💨</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.7, borderLeft: '3px solid #F5E642', whiteSpace: 'pre-wrap' }}>{result}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Flex Duct Sizing Guide 2026</div>
      </div>
    </div>
  );
}

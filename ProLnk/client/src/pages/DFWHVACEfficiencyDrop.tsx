import { useState } from 'react';

const filterStates = [
  { label: 'Clean (changed <1 month)', drop: 0, label2: 'No impact' },
  { label: 'Slightly Dirty (1–2 months)', drop: 7, label2: 'Mild drop' },
  { label: 'Dirty (2–3 months)', drop: 12, label2: 'Moderate drop' },
  { label: 'Very Dirty (3+ months)', drop: 15, label2: 'Significant drop' },
];

const coilStates = [
  { label: 'Clean (serviced this year)', drop: 0 },
  { label: 'Minor Buildup', drop: 5 },
  { label: 'Dirty Coil', drop: 8 },
  { label: 'Very Dirty / Not Serviced 2+ Years', drop: 12 },
];

const refStates = [
  { label: 'Proper Charge', drop: 0 },
  { label: 'Slightly Low', drop: 10 },
  { label: 'Noticeably Low (blowing warm)', drop: 20 },
  { label: 'Very Low / Leaking', drop: 25 },
];

const annualCosts = [1200, 1800, 2400, 3200];

export default function DFWHVACEfficiencyDrop() {
  const [fIdx, setFIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [rIdx, setRIdx] = useState(0);
  const [billIdx, setBillIdx] = useState(1);
  const [result, setResult] = useState<null | { totalDrop: number; annualLoss: number; monthlyLoss: number }>(null);

  function calculate() {
    const totalDrop = Math.min(filterStates[fIdx].drop + coilStates[cIdx].drop + refStates[rIdx].drop, 52);
    const base = annualCosts[billIdx];
    const annualLoss = Math.round(base * (totalDrop / 100));
    const monthlyLoss = Math.round(annualLoss / 12);
    setResult({ totalDrop, annualLoss, monthlyLoss });
  }

  function dropColor(d: number) {
    if (d <= 5) return '#22c55e';
    if (d <= 15) return '#facc15';
    if (d <= 25) return '#f97316';
    return '#ef4444';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📉</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>HVAC Efficiency Drop Calculator</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>How much efficiency is your DFW HVAC losing right now — and what it's costing you</p>
        </div>

        {[
          { label: 'Filter Condition', items: filterStates, idx: fIdx, set: setFIdx },
          { label: 'Evaporator Coil Condition', items: coilStates, idx: cIdx, set: setCIdx },
          { label: 'Refrigerant Level', items: refStates, idx: rIdx, set: setRIdx },
        ].map((group) => (
          <div key={group.label} style={{ marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.items.map((item, i) => (
                <button key={i} onClick={() => group.set(i)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', textAlign: 'left',
                    borderColor: group.idx === i ? '#F5E642' : '#1e3a5f',
                    background: group.idx === i ? '#F5E64222' : 'transparent',
                    color: group.idx === i ? '#F5E642' : '#94a3b8', fontSize: 13 }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>Annual HVAC Energy Bill (Estimate)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {annualCosts.map((cost, i) => (
              <button key={i} onClick={() => setBillIdx(i)}
                style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                  borderColor: billIdx === i ? '#F5E642' : '#1e3a5f',
                  background: billIdx === i ? '#F5E64222' : 'transparent',
                  color: billIdx === i ? '#F5E642' : '#94a3b8', fontSize: 13 }}>
                ${cost.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <button onClick={calculate}
          style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
          Calculate Efficiency Drop
        </button>

        {result && (
          <div style={{ marginTop: 28, background: '#0d2137', borderRadius: 12, padding: 24, border: `2px solid ${dropColor(result.totalDrop)}` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 52, fontWeight: 800, color: dropColor(result.totalDrop) }}>{result.totalDrop}%</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>Total Efficiency Loss</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, background: '#ef444422', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#ef4444', fontSize: 22, fontWeight: 700 }}>${result.monthlyLoss}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Wasted / Month</div>
              </div>
              <div style={{ flex: 1, background: '#ef444422', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#ef4444', fontSize: 22, fontWeight: 700 }}>${result.annualLoss}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Wasted / Year</div>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>Restore efficiency with filter replacement, coil cleaning, and refrigerant recharge. A tune-up often pays for itself in one month in DFW summers.</p>
            <div style={{ marginTop: 12, padding: '12px 16px', background: '#F5E64211', borderRadius: 8, color: '#F5E642', fontSize: 13, textAlign: 'center' }}>
              🔧 Book a DFW HVAC tune-up via <strong>ProLnk.io</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


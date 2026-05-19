import { useState } from 'react';

const CONVERSIONS = [
  { type: 'Home Office', roi: 85, resale: 'High', note: 'WFH era boosted demand significantly in DFW', emoji: '💼' },
  { type: 'Home Gym', roi: 55, resale: 'Moderate', note: 'Buyers value it but often convert back', emoji: '🏋️' },
  { type: 'Media Room', roi: 35, resale: 'Low', note: 'Very personal — most buyers prefer flex space', emoji: '🎬' },
  { type: 'Nursery to Playroom', roi: 50, resale: 'Neutral', note: 'Easy to reverse, minimal impact on resale', emoji: '🧸' },
  { type: 'Playroom to Teen Room', roi: 45, resale: 'Neutral', note: 'Age-specific; buyers re-envision anyway', emoji: '🎮' },
  { type: 'Bedroom to Closet', roi: 60, resale: 'Moderate', note: 'Primary suite closets are DFW buyer favorites', emoji: '👗' },
];

const HOME_VALUES = [250000, 350000, 450000, 600000, 800000, 1000000];

export default function DFWRoomConversionROI() {
  const [conversionIdx, setConversionIdx] = useState(0);
  const [homeValue, setHomeValue] = useState(350000);

  const sel = CONVERSIONS[conversionIdx];
  const estimatedCost = Math.round(homeValue * 0.04);
  const valueAdded = Math.round(estimatedCost * (sel.roi / 100));
  const netROI = valueAdded - estimatedCost;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME VALUE TOOL</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Room Conversion ROI Guide</h1>
        <p style={{ color: '#8899B0', fontSize: 15, margin: '0 0 32px' }}>Which conversions add real value in DFW vs. personal enjoyment only.</p>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>Select Conversion Type</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CONVERSIONS.map((c, i) => (
              <button key={i} onClick={() => setConversionIdx(i)}
                style={{ background: i === conversionIdx ? '#F5E642′ : '#1C2E4A', color: i === conversionIdx ? '#0A1628' : '#E8EDF5',
                  border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {c.emoji} {c.type}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>DFW Home Value</div>
          <select value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1C2E4A', color: '#E8EDF5', border: 'none', fontSize: 15 }}>
            {HOME_VALUES.map(v => <option key={v} value={v}>${v.toLocaleString()}</option>)}
          </select>
        </div>
        <div style={{ background: '#1C2E4A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{sel.emoji} {sel.type}</div>
          <div style={{ color: '#8899B0', marginBottom: 20, fontSize: 14 }}>{sel.note}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[['Est. Cost', '$' + estimatedCost.toLocaleString()], ['Value Added', '$' + valueAdded.toLocaleString()],
              ['Net Return', (netROI >= 0 ? '+' : '') + '$' + Math.abs(netROI).toLocaleString()]].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#8899B0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: 14, background: '#0A1628', borderRadius: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Resale Impact: </span>
            <span style={{ color: '#E8EDF5′ }}>{sel.resale} — ROI score {sel.roi}/100</span>
          </div>
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 DFW Buyer Insight</div>
          <p style={{ color: '#8899B0', fontSize: 14, margin: 0 }}>DFW buyers in 2025 prioritize flex space and home offices over themed rooms. Neutral, multi-use spaces command premium offers. Consult a ProLnk-matched contractor before committing to specialty conversions.</p>
        </div>
      </div>
    </div>
  );
}

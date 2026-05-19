import { useState } from 'react';

const styles = {
  wrap: { background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' },
  card: { background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 },
  h1: { color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 8 },
  h2: { color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 },
  badge: { background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 13, display: 'inline-block', marginBottom: 16 },
  label: { fontSize: 13, color: '#aac', marginBottom: 6, display: 'block' },
  input: { width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', fontSize: 15, marginBottom: 16, boxSizing: 'border-box' as const },
  select: { width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', fontSize: 15, marginBottom: 16 },
  btn: { background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' },
  result: { background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 16 },
  stat: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' },
  statVal: { color: '#F5E642', fontWeight: 700, fontSize: 17 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  tip: { background: '#0d2040', borderLeft: '4px solid #F5E642', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6 },
};

const submarketPremium: Record<string, number> = {
  northdfw: 1.25,
  innerdfw: 1.15,
  eastsouth: 1.0,
  suburban: 1.08,
};

const flooringROI: Record<string, number> = {
  carpet: 75,
  laminateLVP: 55,
  tile: 45,
  existingHardwood: 90,
};

export default function DFWHardwoodFloorROIGuide() {
  const [sqFt, setSqFt] = useState('800');
  const [currentFlooring, setCurrentFlooring] = useState('carpet');
  const [submarket, setSubmarket] = useState('northdfw');
  const [woodType, setWoodType] = useState('engineered');
  const [result, setResult] = useState<null | { cost: number; valueAdd: number; roi: number; note: string }>(null);

  function calculate() {
    const area = parseInt(sqFt) || 800;
    const costPerSqFt = woodType === 'solid' ? 11 : 8;
    const baseCost = Math.round(area * costPerSqFt + 400);
    const baseROI = flooringROI[currentFlooring] ?? 60;
    const premiumMult = submarketPremium[submarket] ?? 1.0;
    const adjROI = Math.round(baseROI * premiumMult);
    const valueAdd = Math.round(baseCost * (adjROI / 100));
    const note = woodType === 'solid' && submarket !== 'northdfw'
      ? 'Engineered may yield similar ROI in this submarket at lower cost'
      : woodType === 'solid' ? 'Solid hardwood commands top dollar in North DFW luxury market' : 'Engineered is preferred for DFW humidity — resists cupping better than solid';
    setResult({ cost: baseCost, valueAdd, roi: adjROI, note });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>Hardwood Flooring ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          DFW buyers pay a measurable premium for hardwood floors — especially in the master bedroom and main living areas where carpet has been the default. In North DFW submarkets, hardwood is an expectation above $450K.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>🌲 Solid vs Engineered in DFW</h2>
          <div style={styles.row}>
            {[
              { type: 'Solid Hardwood', cost: '$9–$14/sq ft installed', best: 'North DFW luxury, no humidity issues if HVAC good', roi: '80–100%' },
              { type: 'Engineered Hardwood', cost: '$6–$10/sq ft installed', best: 'All DFW submarkets, resists humidity naturally', roi: '70–90%' },
            ].map(item => (
              <div key={item.type} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{item.type}</div>
                <div style={{ color: '#aac', fontSize: 13, marginBottom: 4 }}>{item.cost}</div>
                <div style={{ color: '#7cf', fontSize: 13, marginBottom: 4 }}>Best for: {item.best}</div>
                <div style={{ color: '#3ddc84', fontSize: 13 }}>ROI: {item.roi}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>📍 DFW Submarket Demand</h2>
          <div style={styles.tip}>
            <strong>North DFW (Frisco, Prosper, McKinney, Southlake):</strong> Hardwood is expected above $450K — buyers walk away from carpet. 25% higher ROI premium vs DFW average.{'\n\n'}
            <strong>Inner DFW (Plano, Richardson, Garland, Irving):</strong> Strong demand in the $300–$500K range. Refinishing existing hardwood delivers 90%+ ROI.{'\n\n'}
            <strong>East/South DFW (Mesquite, Grand Prairie, Arlington):</strong> High-quality LVP may match hardwood ROI at lower cost. Know your buyer.
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🧮 Calculate Your ROI</h2>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Area to Floor (sq ft)</label>
              <input style={styles.input} type="number" value={sqFt} onChange={e => setSqFt(e.target.value)} placeholder="e.g. 800" />
            </div>
            <div>
              <label style={styles.label}>Wood Type</label>
              <select style={styles.select} value={woodType} onChange={e => setWoodType(e.target.value)}>
                <option value="engineered">Engineered Hardwood</option>
                <option value="solid">Solid Hardwood</option>
              </select>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Current Flooring</label>
              <select style={styles.select} value={currentFlooring} onChange={e => setCurrentFlooring(e.target.value)}>
                <option value="carpet">Carpet</option>
                <option value="laminateLVP">Laminate / LVP</option>
                <option value="tile">Tile</option>
                <option value="existingHardwood">Old Hardwood (refinish)</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>DFW Submarket</label>
              <select style={styles.select} value={submarket} onChange={e => setSubmarket(e.target.value)}>
                <option value="northdfw">North DFW (Frisco/Prosper/Southlake)</option>
                <option value="innerdfw">Inner DFW (Plano/Richardson/Irving)</option>
                <option value="suburban">Suburban (Allen/McKinney/Flower Mound)</option>
                <option value="eastsouth">East/South DFW (Arlington/Mesquite)</option>
              </select>
            </div>
          </div>
          <button style={styles.btn} onClick={calculate}>Calculate DFW ROI →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.stat}><span>Estimated Installation Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Expected Value Increase</span><span style={styles.statVal}>${result.valueAdd.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Estimated ROI</span><span style={styles.statVal}>{result.roi}%</span></div>
              <div style={{ marginTop: 12, padding: '12px 16px', background: '#111f3a', borderRadius: 8, fontSize: 14, color: '#aac' }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Pro Tips</h2>
          <div style={styles.tip}>
            If you already have hardwood under carpet — which is common in pre-1990 DFW homes — refinishing costs $3–$5/sq ft vs $8–$14 for new install, with similar or better ROI. Always pull up a carpet corner before quoting new flooring. White oak is trending in 2026 DFW luxury market; red oak remains most cost-effective in mid-range.
          </div>
        </div>
      </div>
    </div>
  );
}

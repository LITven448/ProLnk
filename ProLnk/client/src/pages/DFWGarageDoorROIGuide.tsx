import { useState } from 'react';

const styles = {
  wrap: { background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' },
  card: { background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 },
  h1: { color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 8 },
  h2: { color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 },
  badge: { background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 13, display: 'inline-block', marginBottom: 16 },
  label: { fontSize: 13, color: '#aac', marginBottom: 6, display: 'block' },
  select: { width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', fontSize: 15, marginBottom: 16 },
  btn: { background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' },
  result: { background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 16 },
  stat: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' },
  statVal: { color: '#F5E642', fontWeight: 700, fontSize: 17 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  tip: { background: '#0d2040', borderLeft: '4px solid #F5E642', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6 },
};

const doorData: Record<string, { low: number; high: number; roiLow: number; roiHigh: number }> = {
  traditional: { low: 1200, high: 2200, roiLow: 85, roiHigh: 100 },
  carriage: { low: 2000, high: 4500, roiLow: 90, roiHigh: 110 },
  modern: { low: 2500, high: 6000, roiLow: 80, roiHigh: 95 },
  commercial: { low: 3500, high: 8000, roiLow: 75, roiHigh: 95 },
};

export default function DFWGarageDoorROIGuide() {
  const [doorStyle, setDoorStyle] = useState('carriage');
  const [garageCount, setGarageCount] = useState('2');
  const [doorAge, setDoorAge] = useState('10');
  const [result, setResult] = useState<null | { cost: number; valueAdd: number; roi: number; payback: string }>(null);

  function calculate() {
    const d = doorData[doorStyle];
    const qty = parseInt(garageCount);
    const age = parseInt(doorAge);
    const baseCost = ((d.low + d.high) / 2) * qty;
    const urgencyMult = age > 15 ? 1.0 : age > 10 ? 0.9 : 0.75;
    const roi = ((d.roiLow + d.roiHigh) / 2) * urgencyMult;
    const valueAdd = Math.round(baseCost * (roi / 100));
    setResult({ cost: Math.round(baseCost), valueAdd, roi: Math.round(roi), payback: age > 15 ? 'Immediate — buyers will discount aging doors' : '12–24 months' });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>Garage Door Replacement ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          Garage door replacement consistently ranks as the #1 ROI renovation nationally — and DFW's prevalence of 3-car garages amplifies the impact. A fresh door signals pride of ownership before buyers even walk inside.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>📊 DFW Cost Ranges by Style</h2>
          <div style={styles.row}>
            {Object.entries(doorData).map(([k, v]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, textTransform: 'capitalize', marginBottom: 6 }}>{k}</div>
                <div style={{ color: '#aac', fontSize: 13 }}>${v.low.toLocaleString()} – ${v.high.toLocaleString()} per door</div>
                <div style={{ color: '#7cf', fontSize: 13 }}>{v.roiLow}–{v.roiHigh}% ROI</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🌡️ DFW Insulation Value</h2>
          <div style={styles.tip}>
            DFW summers routinely hit 105°F+. An insulated garage door (R-12 to R-18) reduces garage temp by 10–20°F, lowering HVAC load. Smart openers with MyQ or built-in WiFi add $150–$400 and are expected by buyers in the $400K+ range. Budget $75–$200 per door for smart opener retrofit.
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🧮 Calculate Your ROI</h2>
          <label style={styles.label}>Door Style</label>
          <select style={styles.select} value={doorStyle} onChange={e => setDoorStyle(e.target.value)}>
            <option value="traditional">Traditional Steel</option>
            <option value="carriage">Carriage House</option>
            <option value="modern">Modern / Contemporary</option>
            <option value="commercial">Commercial-Style</option>
          </select>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Number of Garage Bays</label>
              <select style={styles.select} value={garageCount} onChange={e => setGarageCount(e.target.value)}>
                {['1','2','3','4'].map(n => <option key={n} value={n}>{n}-car</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Current Door Age (years)</label>
              <select style={styles.select} value={doorAge} onChange={e => setDoorAge(e.target.value)}>
                <option value="5">Under 5</option>
                <option value="10">5–10</option>
                <option value="15">10–15</option>
                <option value="20">15–20+</option>
              </select>
            </div>
          </div>
          <button style={styles.btn} onClick={calculate}>Calculate DFW ROI →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.stat}><span>Estimated Replacement Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Expected Value Added</span><span style={styles.statVal}>${result.valueAdd.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Estimated ROI</span><span style={styles.statVal}>{result.roi}%</span></div>
              <div style={styles.stat}><span>Payback Outlook</span><span style={styles.statVal}>{result.payback}</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Pro Tips</h2>
          <div style={styles.tip}>
            In North DFW (Frisco, McKinney, Prosper), carriage-style doors command a strong premium matching neighborhood aesthetics. In East/South DFW, traditional steel with insulation offers the best cost-to-ROI ratio. Always replace springs and cables ($150–$300) at the same time — inspectors flag worn hardware.
          </div>
        </div>
      </div>
    </div>
  );
}

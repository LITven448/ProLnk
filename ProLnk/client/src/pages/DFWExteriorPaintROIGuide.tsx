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

const sizeCost: Record<string, { sqft: number; baseCost1: number; baseCost2: number }> = {
  small: { sqft: 1500, baseCost1: 2800, baseCost2: 3400 },
  medium: { sqft: 2500, baseCost1: 3800, baseCost2: 4800 },
  large: { sqft: 3500, baseCost1: 5200, baseCost2: 6800 },
  xlarge: { sqft: 4500, baseCost1: 7000, baseCost2: 9500 },
};

const conditionROI: Record<string, number> = {
  peeling: 110,
  faded: 85,
  decent: 65,
  good: 40,
};

export default function DFWExteriorPaintROIGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [stories, setStories] = useState('1');
  const [condition, setCondition] = useState('faded');
  const [submarket, setSubmarket] = useState('northdfw');
  const [result, setResult] = useState<null | { cost: number; valueAdd: number; roi: number; paintLife: string; priority: string }>(null);

  function calculate() {
    const sData = sizeCost[homeSize];
    const storyMult = stories === '2' ? 1.35 : stories === '3' ? 1.6 : 1.0;
    const submarketMult = submarket === 'northdfw' ? 1.2 : submarket === 'innerdfw' ? 1.1 : submarket === 'suburban' ? 1.1 : 1.0;
    const baseCost = Math.round(((sData.baseCost1 + sData.baseCost2) / 2) * storyMult);
    const baseROI = conditionROI[condition] ?? 65;
    const adjROI = Math.round(baseROI * submarketMult);
    const valueAdd = Math.round(baseCost * (adjROI / 100));
    const paintLife = '5–7 years (DFW UV degrades paint faster than national avg)';
    const priority = condition === 'peeling' ? 'URGENT — Peeling paint signals deferred maintenance and will cause inspection flags + buyers assume larger problems exist'
      : condition === 'faded' ? 'HIGH — Fresh paint is the #1 curb appeal investment in DFW at this condition level'
      : condition === 'decent' ? 'MODERATE — Consider touch-up + power wash before spending on full repaint'
      : 'LOW — Focus budget elsewhere; paint is in acceptable condition';
    setResult({ cost: baseCost, valueAdd, roi: adjROI, paintLife, priority });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>Exterior Paint ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          Exterior paint is one of the highest-impact curb appeal investments available in DFW — and one of the most underused. A fresh exterior commands buyer attention before they enter and signals a well-maintained home. DFW's intense UV exposure means paint fades faster here than in most U.S. markets.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>☀️ Why DFW is Different</h2>
          <div style={styles.row}>
            {[
              { label: 'Paint Lifespan (DFW)', val: '5–7 years', note: 'vs 8–10 yr national avg due to UV and heat' },
              { label: 'Buyer First Impression', val: 'Exterior ranks #1', note: 'Curb appeal drives 60% of initial offer impulse' },
              { label: 'Power Wash + Touch-Up', val: '$400–$900', note: 'If paint is in decent condition, may suffice' },
              { label: 'Full Repaint ROI Range', val: '40–120%', note: 'Depends on current condition and submarket' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#aac', fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{item.val}</div>
                <div style={{ color: '#7cf', fontSize: 12 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🧮 Calculate Your Exterior Paint ROI</h2>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Home Size</label>
              <select style={styles.select} value={homeSize} onChange={e => setHomeSize(e.target.value)}>
                <option value="small">Under 2,000 sq ft</option>
                <option value="medium">2,000–3,000 sq ft</option>
                <option value="large">3,000–4,000 sq ft</option>
                <option value="xlarge">4,000+ sq ft</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Number of Stories</label>
              <select style={styles.select} value={stories} onChange={e => setStories(e.target.value)}>
                <option value="1">1 Story</option>
                <option value="2">2 Stories</option>
                <option value="3">3 Stories</option>
              </select>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Current Paint Condition</label>
              <select style={styles.select} value={condition} onChange={e => setCondition(e.target.value)}>
                <option value="peeling">Peeling / Cracking</option>
                <option value="faded">Faded / Chalky</option>
                <option value="decent">Decent but Dated Color</option>
                <option value="good">Good Condition</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>DFW Submarket</label>
              <select style={styles.select} value={submarket} onChange={e => setSubmarket(e.target.value)}>
                <option value="northdfw">North DFW (Frisco/Prosper/Southlake)</option>
                <option value="innerdfw">Inner DFW (Plano/Irving/Garland)</option>
                <option value="suburban">Suburban (Allen/McKinney/Flower Mound)</option>
                <option value="eastsouth">East/South DFW (Arlington/Mesquite)</option>
              </select>
            </div>
          </div>
          <button style={styles.btn} onClick={calculate}>Calculate Exterior Paint ROI →</button>
          {result && (
            <div style={styles.result}>
              <div style={{ fontSize: 13, color: '#aac', marginBottom: 12, padding: '10px 14px', background: '#111f3a', borderRadius: 8, lineHeight: 1.6 }}>{result.priority}</div>
              <div style={styles.stat}><span>Estimated Paint Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Expected Value Increase</span><span style={styles.statVal}>${result.valueAdd.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Estimated ROI</span><span style={styles.statVal}>{result.roi}%</span></div>
              <div style={styles.stat}><span>DFW Paint Lifespan</span><span style={styles.statVal}>5–7 years</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Pro Tips</h2>
          <div style={styles.tip}>
            Neutral warm grays and greige tones sell fastest in DFW. Bold or unusual colors narrow your buyer pool. Use 100% acrylic exterior paint rated for high-UV environments (Sherwin-Williams Emerald Exterior or Duration). Always prime bare wood and repair all cracks and caulk before painting — inspectors look for prep quality. Trim color contrast (white, off-white) adds perceived value with minimal added cost.
          </div>
        </div>
      </div>
    </div>
  );
}

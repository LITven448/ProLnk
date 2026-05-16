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
  warn: { background: '#2d1010', borderLeft: '4px solid #ff5555', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6, marginTop: 12 },
  good: { background: '#0d2d10', borderLeft: '4px solid #3ddc84', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6, marginTop: 12 },
};

const replacementCost: Record<string, { low: number; high: number }> = {
  under2000: { low: 5500, high: 8500 },
  '2001-3000': { low: 7000, high: 11000 },
  '3001-4000': { low: 9500, high: 14000 },
  over4000: { low: 13000, high: 20000 },
};

export default function DFWHVACSystemROIGuide() {
  const [systemAge, setSystemAge] = useState('12');
  const [homeSize, setHomeSize] = useState('under2000');
  const [homePrice, setHomePrice] = useState('400');
  const [submarket, setSubmarket] = useState('northdfw');
  const [result, setResult] = useState<null | { decision: string; cost: number; valueImpact: number; annualSavings: number; reason: string }>(null);

  function calculate() {
    const age = parseInt(systemAge);
    const price = parseInt(homePrice) * 1000;
    const costRange = replacementCost[homeSize];
    const avgCost = Math.round((costRange.low + costRange.high) / 2);
    const submarketAdj = submarket === 'northdfw' ? 1.15 : submarket === 'innerdfw' ? 1.05 : 1.0;

    let valueImpact = 0;
    let decision = '';
    let reason = '';

    if (age >= 15) {
      decision = '⚠️ Replace Before Listing';
      valueImpact = Math.round(price * 0.015 * submarketAdj);
      reason = `A ${age}-year system is past average DFW life expectancy (15–18 years in extreme heat). Inspectors will flag it. Buyers will demand a credit or walk. Replacing avoids $${(price * 0.02).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} in negotiated concessions.`;
    } else if (age >= 10) {
      decision = '🔍 Evaluate With Inspector First';
      valueImpact = Math.round(price * 0.008 * submarketAdj);
      reason = `At ${age} years, your system may have 5–8 years remaining. Get a $150 HVAC inspection before deciding. If it passes, disclose age and move on. If there are issues, replace — buyers will find it.`;
    } else {
      decision = '✅ Keep — Strong Selling Point';
      valueImpact = Math.round(price * 0.005);
      reason = `A ${age}-year system is a marketing asset. Highlight brand, SEER rating, and remaining life in your listing. DFW buyers specifically ask about HVAC age.`;
    }

    const annualSavings = homeSize === 'under2000' ? 480 : homeSize === '2001-3000' ? 720 : homeSize === '3001-4000' ? 960 : 1400;
    setResult({ decision, cost: avgCost, valueImpact, annualSavings, reason });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>HVAC System ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          In DFW's extreme climate, HVAC is mission-critical infrastructure — not a luxury. An aging system is the #1 deal-killer in DFW home inspections. Knowing when to replace before listing vs. taking a price reduction is a high-stakes decision.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>📊 DFW HVAC Life Expectancy</h2>
          <div style={styles.row}>
            {[
              { label: 'DFW Average Life', val: '15–18 years', note: 'Heat degrades systems faster than national avg' },
              { label: 'National Average', val: '20 years', note: 'Milder climates preserve systems longer' },
              { label: 'Optimal SEER for DFW', val: '18+ SEER', note: 'Pays back faster in DFW heat' },
              { label: 'New System Warranty', val: '10 yr parts, 1 yr labor', note: 'Major selling point for buyers' },
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
          <h2 style={styles.h2}>🧮 Replace Now vs. Sell As-Is</h2>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Current System Age (years)</label>
              <select style={styles.select} value={systemAge} onChange={e => setSystemAge(e.target.value)}>
                {['5','8','10','12','14','16','18','20'].map(v => <option key={v} value={v}>{v} years</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Home Square Footage</label>
              <select style={styles.select} value={homeSize} onChange={e => setHomeSize(e.target.value)}>
                <option value="under2000">Under 2,000 sq ft</option>
                <option value="2001-3000">2,001–3,000 sq ft</option>
                <option value="3001-4000">3,001–4,000 sq ft</option>
                <option value="over4000">Over 4,000 sq ft</option>
              </select>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Home Price Range ($K)</label>
              <select style={styles.select} value={homePrice} onChange={e => setHomePrice(e.target.value)}>
                <option value="250">$200–$300K</option>
                <option value="400">$350–$450K</option>
                <option value="550">$500–$600K</option>
                <option value="750">$700K–$850K</option>
                <option value="1000">$900K+</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>DFW Submarket</label>
              <select style={styles.select} value={submarket} onChange={e => setSubmarket(e.target.value)}>
                <option value="northdfw">North DFW (Frisco/Prosper/Southlake)</option>
                <option value="innerdfw">Inner DFW (Plano/Irving/Garland)</option>
                <option value="suburban">Suburban (Flower Mound/Allen/McKinney)</option>
                <option value="eastsouth">East/South DFW (Arlington/Mesquite)</option>
              </select>
            </div>
          </div>
          <button style={styles.btn} onClick={calculate}>Get My HVAC Decision →</button>
          {result && (
            <div style={styles.result}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{result.decision}</div>
              <div style={{ color: '#aac', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{result.reason}</div>
              <div style={styles.stat}><span>Estimated Replacement Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Estimated Value Impact</span><span style={styles.statVal}>+${result.valueImpact.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Annual Energy Savings (new unit)</span><span style={styles.statVal}>${result.annualSavings}/yr</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Pro Tips</h2>
          <div style={styles.tip}>
            In DFW, dual-zone systems are expected in homes over 2,500 sq ft. A single-zone system in a large home is a negotiation target. Mini-splits in bonus rooms and workshops add value in North DFW luxury market. Always pull permits for HVAC work — buyers' agents check permit history and unpermitted HVAC is a red flag that delays closings.
          </div>
        </div>
      </div>
    </div>
  );
}

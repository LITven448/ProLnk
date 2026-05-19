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
  rebate: { background: '#0d3020', borderLeft: '4px solid #3ddc84', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6, marginTop: 12 },
};

const rValueCostPerSqFt: Record<string, number> = {
  r7: 1.8, r11: 1.2, r19: 0.7, r30: 0.35, r38: 0.0,
};

export default function DFWAtticInsulationROIGuide() {
  const [sqFt, setSqFt] = useState('1500');
  const [currentR, setCurrentR] = useState('r11');
  const [result, setResult] = useState<null | { cost: number; annualSavings: number; payback: number; rebate: number; eligible: boolean }>(null);

  function calculate() {
    const area = parseInt(sqFt) || 1500;
    const currentCost = rValueCostPerSqFt[currentR] ?? 0;
    const targetCost = 1.4;
    const addedCostPerSqFt = Math.max(targetCost - currentCost, 0.5);
    const totalCost = Math.round(area * addedCostPerSqFt + 300);
    const annualSavings = Math.round(area * 0.18 * (currentR === 'r7′ ? 1.4 : currentR === ’r11′ ? 1.2 : currentR === ’r19′ ? 0.9 : 0.6));
    const rebateEligible = currentR !== 'r38';
    const rebate = rebateEligible ? Math.min(Math.round(area * 0.15), 1500) : 0;
    const netCost = totalCost - rebate;
    const payback = Math.round((netCost / annualSavings) * 10) / 10;
    setResult({ cost: totalCost, annualSavings, payback, rebate, eligible: rebateEligible });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>Attic Insulation ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          DFW homes lose 35–40% of HVAC energy through an under-insulated attic. With summers routinely above 100°F and Oncor offering rebates, attic insulation delivers one of the fastest paybacks of any home improvement — typically 2–4 years in DFW.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>📋 DFW Minimum Standards</h2>
          <div style={styles.row}>
            {[
              { label: 'IECC Code Minimum', val: 'R-38', note: 'Required for new builds' },
              { label: 'Optimal for DFW', val: 'R-49', note: 'Best for extreme summer heat' },
              { label: 'Common in older homes', val: 'R-11 to R-19', note: 'Pre-2000 construction' },
              { label: 'Oncor Rebate Threshold', val: 'R-38+', note: 'Must upgrade from R-19 or less' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#aac', fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{item.val}</div>
                <div style={{ color: '#7cf', fontSize: 12 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💰 Oncor Rebate Program</h2>
          <div style={styles.rebate}>
            <strong style={{ color: '#3ddc84′ }}>Oncor Energy Efficiency Rebate:</strong> Up to $1,500 for upgrading attic insulation to R-38 or above. Must use a participating contractor. Rebates are processed within 60–90 days of project completion. Check oncor.com/savings for current availability — programs change seasonally.
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🧮 Calculate Your Savings</h2>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Attic Square Footage</label>
              <input style={styles.input} type="number" value={sqFt} onChange={e => setSqFt(e.target.value)} placeholder="e.g. 1500″ />
            </div>
            <div>
              <label style={styles.label}>Current R-Value</label>
              <select style={styles.select} value={currentR} onChange={e => setCurrentR(e.target.value)}>
                <option value="r7″>R-7 or less (very old)</option>
                <option value="r11″>R-11 (common pre-1990)</option>
                <option value="r19″>R-19 (1990s homes)</option>
                <option value="r30″>R-30 (partial upgrade)</option>
                <option value="r38″>R-38+ (already upgraded)</option>
              </select>
            </div>
          </div>
          <button style={styles.btn} onClick={calculate}>Calculate DFW Savings →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.stat}><span>Estimated Upgrade Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              {result.eligible && <div style={styles.stat}><span>Oncor Rebate Estimate</span><span style={{ color: '#3ddc84', fontWeight: 700, fontSize: 17 }}>-${result.rebate.toLocaleString()}</span></div>}
              <div style={styles.stat}><span>Annual Energy Savings</span><span style={styles.statVal}>${result.annualSavings.toLocaleString()}/yr</span></div>
              <div style={styles.stat}><span>Payback Period</span><span style={styles.statVal}>{result.payback} years</span></div>
              <div style={styles.stat}><span>Oncor Rebate Eligible</span><span style={styles.statVal}>{result.eligible ? '✅ Yes' : '❌ Already optimal'}</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Pro Tips</h2>
          <div style={styles.tip}>
            Blown-in cellulose or spray foam are preferred in DFW — they seal air leaks better than fiberglass batts. Always air-seal before adding insulation (attic bypasses cost you as much energy as low R-value). Request a blower door test before and after to verify results. Home inspectors routinely flag low attic insulation, which can kill deals or demand price reductions.
          </div>
        </div>
      </div>
    </div>
  );
}

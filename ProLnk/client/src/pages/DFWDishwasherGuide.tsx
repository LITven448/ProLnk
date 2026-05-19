import { useState } from 'react';

const PROBLEMS = [
  { label: 'Cloudy glasses / white film', repair: '$80–$200', cause: 'Hard water calcium deposits — DFW #1 complaint', replace: false },
  { label: 'Not draining', repair: '$100–$250', cause: 'Drain pump or clog', replace: false },
  { label: 'Not cleaning dishes', repair: '$120–$280', cause: 'Spray arm clog, hard water buildup', replace: false },
  { label: 'Door latch broken', repair: '$80–$150', cause: 'Latch assembly', replace: false },
  { label: 'Control board failure', repair: '$200–$450', cause: 'Voltage spike damage', replace: true },
  { label: 'Major leak (tub crack)', repair: '$250–$500+', cause: 'Tub integrity compromised', replace: true },
  { label: 'Motor/pump failure', repair: '$200–$400', cause: 'End-of-life failure', replace: true },
];

const AGE_RANGES = ['0–4 years', '5–9 years', '10–14 years', '15+ years'];

const REBATES = [
  { program: 'Oncor Energy Efficiency', amount: 'Up to $75', notes: 'Must be CEE Tier 1 or higher' },
  { program: 'Atmos Energy (gas models)', amount: 'Up to $50', notes: 'For connected gas water heaters' },
  { program: 'City of Dallas Water Utility', amount: 'Up to $100', notes: 'High-efficiency models, check availability' },
  { program: 'Federal Tax Credit (Energy Star)', amount: '$30–$150', notes: 'Combined appliance credit limit applies' },
];

export default function DFWDishwasherGuide() {
  const [ageRange, setAgeRange] = useState(AGE_RANGES[1]);
  const [problem, setProblem] = useState(PROBLEMS[0].label);
  const [softener, setSoftener] = useState('no');
  const [result, setResult] = useState<null | { verdict: string; detail: string; repairCost: string }>(null);

  function evaluate() {
    const selected = PROBLEMS.find(p => p.label === problem);
    if (!selected) return;
    const isOld = ageRange === '10–14 years' || ageRange === '15+ years';
    const shouldReplace = selected.replace || isOld;
    const noSoftener = softener === 'no';
    let verdict = '';
    let detail = '';
    if (shouldReplace && isOld) {
      verdict = '🔴 Replace';
      detail = `A ${ageRange} dishwasher with this type of failure is past its economic repair threshold. New Energy Star models ($${ageRange === '15+ years' ? '500–1,200' : '450–1,100'} installed) use 3.5 gallons per cycle vs. 6–10 for older units — critical given DFW water restrictions. ${noSoftener ? 'Also consider a whole-home water softener ($800–$2,000 installed) to protect your new unit.' : 'Your water softener will significantly extend the new dishwasher\'s life.'}`;
    } else if (!shouldReplace && !isOld) {
      verdict = '🟢 Repair';
      detail = `This is a cost-effective repair for a ${ageRange} unit. ${noSoftener ? '⚠️ Without a water softener, expect recurring hard water issues. Consider Lemi Shine booster ($8/bottle) as a stopgap.' : '✅ Your water softener will help prevent recurrence.'}`;
    } else {
      verdict = '🟡 Repair, then plan for replacement';
      detail = `Repair makes sense now but budget for a new dishwasher within 2–3 years. Start researching Energy Star models and watch for Oncor rebate cycles (typically spring and fall).`;
    }
    setResult({ verdict, detail, repairCost: selected.repair });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW APPLIANCE GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>🍽️ Dishwasher Repair & Replacement in DFW</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW's hard water is the #1 enemy of dishwashers in North Texas — causing cloudy glasses, scale buildup, and premature failure. Know when to fix and when to replace.</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 10px' }}>💧 The DFW Hard Water Problem</h2>
          <p style={{ color: '#CBD5E1', margin: '0 0 10px', lineHeight: 1.7, fontSize: 14 }}>DFW municipal water runs 15–25 grains per gallon (GPG) of hardness — the EPA considers anything above 7 GPG "hard." Calcium and magnesium minerals coat spray arms, clog filter screens, etch glassware, and calcify heating elements. Dishwashers without a water softener in DFW typically last 7–9 years vs. the 12–15 year national average.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Run dishwasher on hottest cycle monthly with 2 cups white vinegar', 'Use Finish Quantum with Powerball for hard water', 'Clean filter screen every 30 days', 'Use rinse aid — mandatory in DFW, not optional'].map(tip => (
              <span key={tip} style={{ backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 20, padding: '6px 12px', fontSize: 12, color: '#94A3B8′ }}>✓ {tip}</span>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚠️ Common Problems & Repair Costs</h2>
        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#0D1E3A' }}>
                {['Problem', 'Repair Cost', 'DFW Cause', 'Replace Flag'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', color: '#F5E642', borderBottom: '2px solid #1E3A5F' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROBLEMS.map((row, i) => (
                <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? '#0A1628′ : '#0D1E3A' }}>
                  <td style={{ padding: '10px 14px', color: '#E2E8F0', borderBottom: '1px solid #1E3A5F' }}>{row.label}</td>
                  <td style={{ padding: '10px 14px', color: '#F5E642', borderBottom: '1px solid #1E3A5F', whiteSpace: 'nowrap' }}>{row.repair}</td>
                  <td style={{ padding: '10px 14px', color: '#94A3B8', borderBottom: '1px solid #1E3A5F', fontSize: 12 }}>{row.cause}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #1E3A5F' }}>{row.replace ? '⚠️ Consider' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Fix vs. Replace Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Dishwasher Age</label>
              <select value={ageRange} onChange={e => setAgeRange(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {AGE_RANGES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Problem Type</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {PROBLEMS.map(p => <option key={p.label}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Water Softener Installed?</label>
              <select value={softener} onChange={e => setSoftener(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.verdict}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>Repair estimate: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.repairCost}</span></div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>💰 DFW Rebates for New Dishwashers</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {REBATES.map(r => (
              <div key={r.program} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E3A5F' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{r.program}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>{r.notes}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 16 }}>{r.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

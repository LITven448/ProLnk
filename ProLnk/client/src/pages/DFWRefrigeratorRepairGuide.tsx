import { useState } from 'react';

const FAILURE_DATA = [
  { part: 'Compressor', cost: '$400–$700', note: 'DFW heat in garages accelerates compressor wear' },
  { part: 'Ice Maker', cost: '$90–$250', note: 'Mineral deposits from DFW hard water clog inlet valves' },
  { part: 'Thermostat/Control Board', cost: '$150–$400', note: 'Voltage spikes during DFW storms damage boards' },
  { part: 'Evaporator Fan Motor', cost: '$100–$200', note: 'Overworks when ambient garage temps exceed 95°F' },
  { part: 'Door Gaskets', cost: '$50–$150', note: 'UV and heat crack seals faster in Texas sun' },
  { part: 'Condenser Coils (cleaning)', cost: '$80–$150', note: 'DFW dust and pet hair clog coils 2x faster' },
];

const SIZE_OPTIONS = ['Under 20 cu ft', '20–25 cu ft', 'Over 25 cu ft'];

const NEW_FRIDGE_COSTS: Record<string, { basic: number; mid: number; premium: number }> = {
  'Under 20 cu ft': { basic: 600, mid: 900, premium: 1400 },
  '20–25 cu ft': { basic: 900, mid: 1400, premium: 2200 },
  'Over 25 cu ft': { basic: 1300, mid: 2000, premium: 3500 },
};

export default function DFWRefrigeratorRepairGuide() {
  const [age, setAge] = useState('');
  const [repairQuote, setRepairQuote] = useState('');
  const [size, setSize] = useState(SIZE_OPTIONS[1]);
  const [result, setResult] = useState<null | { decision: string; reason: string; newRange: string }>(null);

  function evaluate() {
    const ageNum = parseInt(age);
    const repairNum = parseInt(repairQuote);
    if (isNaN(ageNum) || isNaN(repairNum)) return;
    const costs = NEW_FRIDGE_COSTS[size];
    const midNew = costs.mid;
    const fiftyPct = midNew * 0.5;
    const old = ageNum >= 10;
    const expensive = repairNum > fiftyPct;
    let decision = '';
    let reason = '';
    if (old && expensive) {
      decision = '🔴 Replace';
      reason = `Repair quote ($${repairNum}) exceeds 50% of a comparable new fridge (~$${midNew}), and your unit is ${ageNum} years old. DFW garage heat will keep triggering failures.`;
    } else if (!old && !expensive) {
      decision = '🟢 Repair';
      reason = `At ${ageNum} years old with a $${repairNum} quote, repair is cost-effective. Modern fridges last 12–17 years with proper maintenance.`;
    } else if (old && !expensive) {
      decision = '🟡 Repair with caution';
      reason = `Quote is reasonable but unit is ${ageNum} years old. Budget for replacement within 2–3 years—DFW garage heat is hard on aging appliances.`;
    } else {
      decision = '🟡 Consider replacing';
      reason = `Repair quote ($${repairNum}) is high for a ${ageNum}-year-old unit. A new Energy Star model saves $60–$100/year in electricity in Texas summers.`;
    }
    setResult({ decision, reason, newRange: `$${costs.basic.toLocaleString()}–$${costs.premium.toLocaleString()}` });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW APPLIANCE GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>🧊 Refrigerator Repair vs. Replace in DFW</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW garage temps hit 120°F in summer — that kills fridges faster than anywhere else in Texas. Here's how to decide whether to repair or replace yours.</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '20px 24px', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 8px' }}>☀️ Why DFW is Harder on Refrigerators</h2>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>Garage fridges in DFW regularly operate in 100–120°F ambient heat. Compressors run nearly nonstop June–September, dramatically cutting lifespan. A garage fridge that would last 15 years in Minnesota may fail in 8 in Frisco or McKinney. If yours is in a temperature-controlled kitchen, add 2–3 years to typical life estimates.</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#F1F5F9' }}>⚠️ Common Failures & DFW-Specific Costs</h2>
        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#0D1E3A' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642', borderBottom: '2px solid #1E3A5F' }}>Component</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642', borderBottom: '2px solid #1E3A5F' }}>Repair Cost</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642', borderBottom: '2px solid #1E3A5F' }}>DFW Note</th>
              </tr>
            </thead>
            <tbody>
              {FAILURE_DATA.map((row, i) => (
                <tr key={row.part} style={{ backgroundColor: i % 2 === 0 ? '#0A1628' : '#0D1E3A' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#E2E8F0', borderBottom: '1px solid #1E3A5F' }}>{row.part}</td>
                  <td style={{ padding: '11px 16px', color: '#F5E642', borderBottom: '1px solid #1E3A5F', whiteSpace: 'nowrap' }}>{row.cost}</td>
                  <td style={{ padding: '11px 16px', color: '#94A3B8', borderBottom: '1px solid #1E3A5F', fontSize: 13 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Repair vs. Replace Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Fridge Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 9" style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Repair Quote ($)</label>
              <input type="number" value={repairQuote} onChange={e => setRepairQuote(e.target.value)} placeholder="e.g. 450" style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Fridge Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 15, boxSizing: 'border-box' }}>
                {SIZE_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.decision}</div>
              <p style={{ color: '#CBD5E1', margin: '0 0 10px', lineHeight: 1.7 }}>{result.reason}</p>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>New replacement range for your size: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.newRange}</span> (installed)</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 12px' }}>💡 DFW Energy Savings Tip</h2>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>A 2015 or older fridge uses 700–1,200 kWh/year. New Energy Star models use under 400 kWh. At Oncor's average rate of $0.13/kWh, that’s <strong style={{ color: '#F5E642' }}>$40–$100/year in savings</strong> — plus Oncor occasionally offers $50–$100 appliance recycling rebates. Check <span style={{ color: '#F5E642' }}>oncor.com/rebates</span> before replacing.</p>
        </div>
      </div>
    </div>
  );
}

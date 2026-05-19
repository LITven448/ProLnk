import { useState } from 'react';

const SYSTEMS: Record<string, { avgCost: number; lifespan: number }> = {
  'HVAC System': { avgCost: 7500, lifespan: 15 },
  'Water Heater': { avgCost: 1200, lifespan: 12 },
  'Roof': { avgCost: 14000, lifespan: 25 },
  'Refrigerator': { avgCost: 1800, lifespan: 14 },
  'Washer/Dryer': { avgCost: 1400, lifespan: 13 },
  'Dishwasher': { avgCost: 900, lifespan: 10 },
  'Furnace': { avgCost: 4500, lifespan: 20 },
  'Water Softener': { avgCost: 1500, lifespan: 15 },
};

export default function DFW5050RuleGuide() {
  const [system, setSystem] = useState('HVAC System');
  const [age, setAge] = useState('');
  const [repairCost, setRepairCost] = useState('');
  const [replacementCost, setReplacementCost] = useState('');
  const [result, setResult] = useState<null | { ratio: number; replace: boolean; msg: string }>(null);

  function calculate() {
    const repair = parseFloat(repairCost);
    const replacement = parseFloat(replacementCost) || SYSTEMS[system].avgCost;
    if (!repair || !replacement) return;
    const ratio = (repair / replacement) * 100;
    const ageNum = parseFloat(age) || 0;
    const lifespan = SYSTEMS[system].lifespan;
    const lifeUsed = ageNum / lifespan;
    const replace = ratio >= 50 || lifeUsed >= 0.75;
    let msg = '';
    if (replace) {
      msg = `At ${ratio.toFixed(0)}% of replacement cost${lifeUsed >= 0.75 ? ` and ${Math.round(lifeUsed * 100)}% through its lifespan` : ''}, DFW market conditions favor replacement. New units often qualify for Oncor or Atmos rebates.`;
    } else {
      msg = `At ${ratio.toFixed(0)}% of replacement cost, repair is the smart DFW play. Budget the repair and start a replacement fund for later.`;
    }
    setResult({ ratio, replace, msg });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>DFW 50/50 Renovation Rule</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>When repair cost exceeds 50% of replacement cost, replace — not repair. Built for DFW homeowners.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>📐 The Rule Explained</h2>
          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>If your repair quote is ≥50% of what a new replacement costs, put that money toward replacement instead. In DFW's hot market, newer systems increase resale value and qualify for energy rebates from Oncor, Atmos Energy, and TXU.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            {['HVAC', 'Roofing', 'Water Heaters', 'Appliances'].map(item => (
              <div key={item} style={{ background: '#F1F5F9', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#0A1628', fontWeight: 600 }}>✅ {item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>🧮 Calculate Your Decision</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>System / Appliance Type</label>
              <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
                {Object.keys(SYSTEMS).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Current Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 10″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Repair Quote ($)</label>
              <input type="number" value={repairCost} onChange={e => setRepairCost(e.target.value)} placeholder="e.g. 2500″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Replacement Cost ($) <span style={{ color: '#94A3B8', fontWeight: 400 }}>(leave blank to use DFW avg: ${SYSTEMS[system].avgCost.toLocaleString()})</span></label>
              <input type="number" value={replacementCost} onChange={e => setReplacementCost(e.target.value)} placeholder={`DFW avg: $${SYSTEMS[system].avgCost.toLocaleString()}`} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Apply the 50/50 Rule →</button>
        </div>

        {result && (
          <div style={{ background: result.replace ? '#FEF2F2′ : '#F0FDF4', border: `2px solid ${result.replace ? '#FECACA' : '#BBF7D0'}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{result.replace ? '🔄' : '🔨'}</div>
            <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{result.replace ? 'Replace It' : 'Repair It'}</h3>
            <p style={{ color: '#475569', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.msg}</p>
            <div style={{ marginTop: 14, background: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#64748B' }}>
              Repair-to-replacement ratio: <strong style={{ color: '#0A1628′ }}>{result.ratio.toFixed(1)}%</strong> — threshold is 50%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

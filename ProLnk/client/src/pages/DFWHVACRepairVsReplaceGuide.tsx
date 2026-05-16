import { useState } from 'react';

const AGE_THRESHOLDS = { young: 8, mid: 12, old: 15 };
const SEER_SAVINGS = { low: 0.08, mid: 0.15, high: 0.25 };

function calcFiveYearCost(repairCost: number, age: number, seer: string, monthlyBill: number) {
  const savingsPct = seer === 'low' ? SEER_SAVINGS.high : seer === 'mid' ? SEER_SAVINGS.mid : SEER_SAVINGS.low;
  const annualSavings = monthlyBill * 12 * savingsPct;
  const newUnitCost = 5500;
  const repairFiveYear = repairCost + (age > AGE_THRESHOLDS.old ? repairCost * 1.5 : repairCost * 0.6);
  const replaceFiveYear = newUnitCost - annualSavings * 5;
  return { repairFiveYear: Math.round(repairFiveYear), replaceFiveYear: Math.round(replaceFiveYear) };
}

export default function DFWHVACRepairVsReplaceGuide() {
  const [age, setAge] = useState('');
  const [repairQuote, setRepairQuote] = useState('');
  const [seer, setSeer] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [result, setResult] = useState<null | { recommend: string; reason: string; repairFiveYear: number; replaceFiveYear: number }>(null);

  function evaluate() {
    const a = parseInt(age);
    const r = parseInt(repairQuote);
    const m = parseInt(monthlyBill) || 220;
    if (!a || !r || !seer) return;
    const rule5000 = a * r;
    const { repairFiveYear, replaceFiveYear } = calcFiveYearCost(r, a, seer, m);
    let recommend = '';
    let reason = '';
    if (rule5000 > 5000 || a >= AGE_THRESHOLDS.old) {
      recommend = 'Replace';
      reason = `Age × repair cost = $${rule5000.toLocaleString()} exceeds the $5,000 rule. DFW summers accelerate compressor wear on older units — replacement saves more over 5 years.`;
    } else if (rule5000 > 3000 || a >= AGE_THRESHOLDS.mid) {
      recommend = 'Borderline — Get a second opinion';
      reason = `At ${a} years, your unit is mid-life for DFW conditions. The $5,000 rule puts you at $${rule5000.toLocaleString()}. Refrigerant regulations (R-22 phase-out) may raise future repair costs.`;
    } else {
      recommend = 'Repair';
      reason = `Unit is relatively young at ${a} years and repair cost is proportionate. Repair is the financially sound choice right now.`;
    }
    setResult({ recommend, reason, repairFiveYear, replaceFiveYear });
  }

  const pill = (label: string, val: string, current: string, set: (v: string) => void) => (
    <button
      key={val}
      onClick={() => set(val)}
      style={{
        padding: '8px 18px', borderRadius: 20, border: '2px solid',
        borderColor: current === val ? '#F5E642' : '#2A3A5C',
        background: current === val ? '#F5E642' : 'transparent',
        color: current === val ? '#0A1628' : '#CBD5E1',
        cursor: 'pointer', fontWeight: 600, fontSize: 14, margin: '4px 6px 4px 0'
      }}
    >{label}</button>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>HVAC: Repair vs Replace?</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW summers push AC units harder than nearly anywhere in the US. Use the industry-standard <strong style={{ color: '#F5E642' }}>5,000 Rule</strong> — multiply your unit's age by the repair cost. Above $5,000 means replace. Below means repair.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Unit Age (years)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 14"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #2A3A5C', background: '#0A1628', color: '#F1F5F9', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Repair Quote ($)</label>
            <input type="number" value={repairQuote} onChange={e => setRepairQuote(e.target.value)} placeholder="e.g. 850"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #2A3A5C', background: '#0A1628', color: '#F1F5F9', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Current Unit Efficiency (SEER)</label>
            <div>{[['Low (SEER 8–12)', 'low'], ['Mid (SEER 13–16)', 'mid'], ['High (SEER 17+)', 'high']].map(([l, v]) => pill(l, v, seer, setSeer))}</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Avg Monthly Electric Bill ($)</label>
            <input type="number" value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} placeholder="220 (DFW avg)"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #2A3A5C', background: '#0A1628', color: '#F1F5F9', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <button onClick={evaluate} style={{ width: '100%', padding: '14px', borderRadius: 8, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            Get My Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ background: result.recommend === 'Replace' ? '#1a0f00' : result.recommend === 'Repair' ? '#0a1a0a' : '#1a1500', border: `2px solid ${result.recommend === 'Replace' ? '#F97316' : result.recommend === 'Repair' ? '#22C55E' : '#F5E642'}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: result.recommend === 'Replace' ? '#F97316' : result.recommend === 'Repair' ? '#22C55E' : '#F5E642', marginBottom: 12 }}>
              {result.recommend === 'Replace' ? '🔄' : result.recommend === 'Repair' ? '🔧' : '🤔'} {result.recommend}
            </div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 20 }}>{result.reason}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>5-Year Repair Cost</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F97316' }}>${result.repairFiveYear.toLocaleString()}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>5-Year Replace Cost (net)</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#22C55E' }}>${result.replaceFiveYear.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>⚠️ DFW-Specific Factors</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['🌡️ Extreme Heat Load', 'DFW units run 2,000+ hours/year vs 1,200 national avg — accelerating wear on compressors and capacitors.'],
              ['🧪 R-22 Phase-Out', 'Units using R-22 refrigerant face escalating recharge costs. A $800 repair may cost $1,400 next year.'],
              ['⚡ Efficiency Rebates', 'Oncor and TXU offer rebates up to $600 on qualifying 16+ SEER units installed in DFW.'],
              ['📋 Permit Required', 'All HVAC replacements in DFW require a permit and city inspection — factor $150–$350 into quotes.']
            ].map(([title, desc]) => (
              <div key={title as string} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20, minWidth: 28 }}>{(title as string).split(' ')[0]}</div>
                <div><strong style={{ color: '#F1F5F9' }}>{(title as string).slice(3)}</strong><br /><span style={{ color: '#94A3B8', fontSize: 14 }}>{desc}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free HVAC Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>ProLnk connects you with vetted local HVAC pros — no cold calls, no pressure.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare HVAC Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}

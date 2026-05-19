import { useState } from 'react';

const surprises = [
  { icon: '🏗️', title: 'Property Taxes', desc: 'DFW property taxes average 1.8–2.5% of home value per year — $6,840–$9,500/yr on a $380K home. Not in your rent.' },
  { icon: '🔧', title: 'Maintenance Budget', desc: 'Budget 1–2% of home value annually for repairs — $3,800–$7,600/yr on a $380K DFW home. Landlord paid this for you.' },
  { icon: '💡', title: 'Utilities Often Higher', desc: 'Owning a DFW home typically means larger space and higher utility bills — budget $200–$400/mo more than your apartment.' },
  { icon: '📈', title: 'But Equity Builds', desc: 'At 4.8% appreciation on a $380K DFW home, you build ~$18,240 in home value per year — plus principal paydown on your mortgage.' },
];

const monthlyPlan = [
  { month: '1–2', task: '📊 Pull your credit report. Target 640+ for conventional, 580+ for FHA.' },
  { month: '3–4', task: '💰 Open dedicated savings account. Automate transfer = 5% of income weekly.' },
  { month: '5–6', task: '📄 Get pre-qualified (not pre-approved). Learn your real number from a lender.' },
  { month: '7–8', task: '🗺️ Research DFW target areas. Compare property taxes by city (Frisco vs McKinney vs Arlington).' },
  { month: '9–10', task: '🤝 Meet a DFW buyer\’s agent. They\’re free for buyers. Interview 2–3.' },
  { month: '11', task: '✅ Get formal pre-approval letter. Have your down payment fully saved.' },
  { month: '12', task: '🏡 Start making offers. Budget for inspection ($400–$600) and closing costs (2–4%).' },
];

export default function DFWRenterToHomeownerGuide() {
  const [rent, setRent] = useState('');
  const [income, setIncome] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [result, setResult] = useState<null | { score: number; label: string; color: string; advice: string; minSavings: number }>(null);

  const areas: Record<string, { avgPrice: number; taxes: string }> = {
    'Frisco / McKinney': { avgPrice: 490000, taxes: '2.1%' },
    'Arlington': { avgPrice: 320000, taxes: '2.3%' },
    'Fort Worth': { avgPrice: 295000, taxes: '2.2%' },
    'Plano / Allen': { avgPrice: 440000, taxes: '1.9%' },
    'Dallas (suburban)': { avgPrice: 380000, taxes: '2.0%' },
  };

  function assess() {
    const r = parseInt(rent.replace(/\D/g, ''), 10);
    const inc = parseInt(income.replace(/\D/g, ''), 10);
    if (!r || !inc || !targetArea) return;
    const area = areas[targetArea] || { avgPrice: 380000, taxes: '2.0%' };
    const monthlyIncome = inc > 10000 ? inc / 12 : inc;
    const dtiCapacity = monthlyIncome * 0.43;
    const estimatedMortgage = area.avgPrice * 0.95 / 360 * (6.8 / 1200 * Math.pow(1 + 6.8 / 1200, 360) / (Math.pow(1 + 6.8 / 1200, 360) - 1));
    const totalHousing = estimatedMortgage + (area.avgPrice * 0.022 / 12);
    const minSavings = Math.round(area.avgPrice * 0.08);
    let score = 0;
    if (r / monthlyIncome < 0.35) score += 30;
    else if (r / monthlyIncome < 0.45) score += 15;
    if (totalHousing < dtiCapacity) score += 40;
    else if (totalHousing < dtiCapacity * 1.1) score += 20;
    if (monthlyIncome >= 5000) score += 30;
    else if (monthlyIncome >= 3500) score += 15;
    const label = score >= 75 ? 'Ready to Buy' : score >= 45 ? 'Almost Ready' : 'Build More Foundation';
    const color = score >= 75 ? '#16a34a' : score >= 45 ? '#d97706′ : '#dc2626';
    const advice = score >= 75
      ? `Strong position for ${targetArea}! On your income, target a max home price of $${Math.round(dtiCapacity * 155).toLocaleString()}. Save $${minSavings.toLocaleString()} (8%) to cover down payment + closing costs.`
      : score >= 45
      ? `You're close! Focus on reducing your rent-to-income ratio and saving $${minSavings.toLocaleString()} for ${targetArea} entry. 6–9 months of disciplined saving could get you there.`
      : `Focus on income growth and savings first. You need at least $${minSavings.toLocaleString()} saved before buying in ${targetArea}. Use the 12-month plan below.`;
    setResult({ score, label, color, advice, minSavings });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW REAL ESTATE GUIDE</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>Renter to Homeowner in DFW</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            What renters don't realize about owning — and the 12-month plan to get there.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🏠 What Renters Don't Realize About DFW Ownership</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {surprises.map(s => (
              <div key={s.title} style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🎯 Your Homeownership Readiness Score</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Current monthly rent</label>
              <input type="text" placeholder="$1,850″ value={rent} onChange={e => setRent(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Annual or monthly income</label>
              <input type="text" placeholder="$75,000/yr or $6,250/mo" value={income} onChange={e => setIncome(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Target DFW area</label>
            <select value={targetArea} onChange={e => setTargetArea(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
              <option value="">Select area...</option>
              {Object.keys(areas).map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get My Readiness Score + 12-Month Plan
          </button>
          {result && (
            <div style={{ marginTop: 16 }}>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: result.color }}>{result.score}/100</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: result.color }}>{result.label}</div>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: 8, padding: 14, fontSize: 14 }}>
                {result.advice}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0′ }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>📅 12-Month Homeownership Plan</h2>
          {monthlyPlan.map(m => (
            <div key={m.month} style={{ display: 'flex', gap: 14, borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ minWidth: 60, background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '6px 10px', fontSize: 12, fontWeight: 700, textAlign: 'center', height: 'fit-content' }}>
                Mo {m.month}
              </div>
              <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{m.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

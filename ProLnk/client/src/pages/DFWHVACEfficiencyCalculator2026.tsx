import { useState } from 'react';

const DFW_ANNUAL_HOURS = 2200;
const ELECTRIC_RATE = 0.12;
const ONCOR_REBATE_PER_TON: Record<string, number> = { 14: 0, 16: 100, 18: 150, 20: 200 };
const TAX_CREDIT_RATE = 0.30;
const TAX_CREDIT_MAX = 2000;

function annualCost(seer: number, tons: number) {
  return (tons * 12000 * DFW_ANNUAL_HOURS) / (seer * 1000) * ELECTRIC_RATE;
}

export default function DFWHVACEfficiencyCalculator2026() {
  const [currentSeer, setCurrentSeer] = useState('13');
  const [newSeer, setNewSeer] = useState('18');
  const [homeTons, setHomeTons] = useState('3');
  const [result, setResult] = useState<null | {
    currentCost: number;
    newCost: number;
    annualSavings: number;
    equipCost: number;
    oncorRebate: number;
    taxCredit: number;
    netCost: number;
    payback: number;
  }>(null);

  function calculate() {
    const cs = parseFloat(currentSeer);
    const ns = parseFloat(newSeer);
    const tons = parseFloat(homeTons);
    if ([cs, ns, tons].some(isNaN)) return;
    const currentCost = annualCost(cs, tons);
    const newCost = annualCost(ns, tons);
    const annualSavings = currentCost - newCost;
    const equipCost = tons * (ns >= 18 ? 1800 : ns >= 16 ? 1500 : 1200);
    const rebateKey = [20, 18, 16, 14].find(s => ns >= s) ?? 14;
    const oncorRebate = ONCOR_REBATE_PER_TON[rebateKey] * tons;
    const taxCredit = Math.min(equipCost * TAX_CREDIT_RATE, TAX_CREDIT_MAX);
    const netCost = equipCost - oncorRebate - taxCredit;
    const payback = annualSavings > 0 ? netCost / annualSavings : 0;
    setResult({ currentCost: Math.round(currentCost), newCost: Math.round(newCost), annualSavings: Math.round(annualSavings), equipCost: Math.round(equipCost), oncorRebate: Math.round(oncorRebate), taxCredit: Math.round(taxCredit), netCost: Math.round(netCost), payback: Math.round(payback * 10) / 10 });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Efficiency Calculator 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>DFW averages 2,200+ cooling hours/year — efficiency upgrades pay back faster here than anywhere.</p>
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          {[
            { label: '🌡️ Current SEER Rating', val: currentSeer, set: setCurrentSeer, placeholder: 'e.g. 13' },
            { label: '✨ New SEER2 Rating', val: newSeer, set: setNewSeer, placeholder: 'e.g. 18' },
            { label: '🏠 System Size (tons)', val: homeTons, set: setHomeTons, placeholder: 'e.g. 3' },
          ].map(({ label, val, set, placeholder }) => (
            <label key={label} style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ color: '#F5E642', fontSize: 13 }}>{label}</span>
              <input type="number" value={val} placeholder={placeholder} onChange={e => set(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 16 }} />
            </label>
          ))}
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px 0', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 4 }}>
            Calculate DFW Savings
          </button>
        </div>
        {result && (
          <div style={{ background: '#0f2039', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 18 }}>💡 DFW Efficiency Upgrade Analysis</h2>
            {[
              ['💸 Current Annual Electric Cost', `$${result.currentCost.toLocaleString()}`],
              ['🌱 New System Annual Cost', `$${result.newCost.toLocaleString()}`],
              ['💰 Annual Savings', `$${result.annualSavings.toLocaleString()}`],
              ['🛒 Equipment Cost', `$${result.equipCost.toLocaleString()}`],
              ['🏦 Oncor Rebate', `-$${result.oncorRebate.toLocaleString()}`],
              ['🇺🇸 Federal Tax Credit (30%)', `-$${result.taxCredit.toLocaleString()}`],
              ['✅ Net Investment', `$${result.netCost.toLocaleString()}`],
              ['📆 Simple Payback Period', `${result.payback} years`],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

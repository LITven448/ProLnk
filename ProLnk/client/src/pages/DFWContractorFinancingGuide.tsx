import { useState } from 'react';

const programs = [
  { name: 'GreenSky', type: 'Contractor-offered', rate: '0% promo then 26.99%', bestFor: 'HVAC, roofing, windows', risk: 'High deferred interest risk' },
  { name: 'Synchrony Home', type: 'Contractor-offered', rate: '0% promo then 29.99%', bestFor: 'Flooring, appliances, cabinetry', risk: 'Very high deferred interest' },
  { name: 'Contractor-Specific', type: 'In-house financing', rate: 'Varies 6–18%', bestFor: 'Pools, full remodels', risk: 'Baked into contract price' },
  { name: 'HELOC', type: 'Your own financing', rate: '~8.5% variable', bestFor: 'Large projects $30K+', risk: 'Home as collateral' },
  { name: 'Personal Loan', type: 'Your own financing', rate: '10–20% fixed', bestFor: 'Any project up to $50K', risk: 'Higher rate, no collateral risk' },
];

const redFlags = [
  'No interest if paid in full — read the fine print (deferred interest)',
  'Price goes up if you don\’t use their financing',
  'Contractor won\’t give a cash price upfront',
  'Monthly payment framed, not total cost',
  '"Today only" pressure on the financing offer',
];

function calcTrueCost(projectCost: number, markupPct: number, finRate: number, months: number) {
  const markedUp = projectCost * (1 + markupPct / 100);
  const r = finRate / 12;
  const monthly = months > 0 ? (markedUp * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : markedUp;
  return { markedUp, monthly, total: monthly * months };
}

export default function DFWContractorFinancingGuide() {
  const [cost, setCost] = useState(25000);
  const [termMonths, setTermMonths] = useState(60);
  const [markup, setMarkup] = useState(12);

  const contractor = calcTrueCost(cost, markup, 0.2699, termMonths);
  const heloc = calcTrueCost(cost, 0, 0.085, termMonths);
  const personal = calcTrueCost(cost, 0, 0.15, termMonths);
  const savings = contractor.total - heloc.total;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>🔨 Contractor Financing Guide</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>DFW Homeowners — Know Before You Sign</div>
        </div>
        <div style={{ background: '#FEF2F2', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #FECACA' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#991B1B' }}>⚠️ Who's Really Paying for "0% Financing"?</div>
          <div style={{ fontSize: 14, color: '#7F1D1D', lineHeight: 1.6 }}>
            Contractors who offer 0% financing pay the lender 6–14% of the project cost to buy down your rate. That fee is built into the project price. When a DFW roofer quotes $18,000 with "0% financing" and $15,500 cash — the difference is your interest, paid upfront.
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>📋 Financing Program Comparison</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {programs.map(p => (
              <div key={p.name} style={{ background: '#fff', borderRadius: 8, padding: '1rem', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 3fr', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#64748B' }}>{p.type}</div>
                <div style={{ fontSize: 13, color: '#0A1628', fontWeight: 600 }}>{p.rate}</div>
                <div style={{ fontSize: 12, color: '#DC2626' }}>⚠ {p.risk}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 True Cost Calculator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Project Cost ($)', value: cost, set: setCost, min: 2000, max: 150000, step: 1000 },
              { label: 'Contractor Markup (%)', value: markup, set: setMarkup, min: 0, max: 25, step: 1 },
              { label: 'Loan Term (months)', value: termMonths, set: setTermMonths, min: 12, max: 120, step: 12 },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}: <span style={{ color: '#6366F1' }}>{f.value}</span></div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[
              { label: '🔨 Contractor Financing', data: contractor, color: '#DC2626' },
              { label: '🏠 Your HELOC', data: heloc, color: '#16A34A' },
              { label: '💳 Personal Loan', data: personal, color: '#2563EB' },
            ].map(opt => (
              <div key={opt.label} style={{ background: '#F8FAFC', borderRadius: 8, padding: '1rem', border: `2px solid ${opt.color}20` }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: opt.color }}>{opt.label}</div>
                <div style={{ fontSize: 13 }}>Financed amt: ${opt.data.markedUp.toFixed(0)}</div>
                <div style={{ fontSize: 13 }}>Monthly: <strong>${opt.data.monthly.toFixed(0)}</strong></div>
                <div style={{ fontSize: 13 }}>Total paid: <strong>${opt.data.total.toFixed(0)}</strong></div>
              </div>
            ))}
          </div>
          {savings > 0 && <div style={{ marginTop: 12, background: '#F0FDF4', borderRadius: 8, padding: '0.75rem', textAlign: 'center', border: '1px solid #86EFAC' }}>
            <span style={{ color: '#16A34A', fontWeight: 700 }}>💰 Using your own HELOC saves ${savings.toFixed(0)} vs contractor financing</span>
          </div>}
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', border: '1px solid #FED7AA' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🚩 Red Flags to Watch For</div>
          {redFlags.map(f => <div key={f} style={{ fontSize: 13, color: '#92400E', marginBottom: 4 }}>• {f}</div>)}
        </div>
      </div>
    </div>
  );
}

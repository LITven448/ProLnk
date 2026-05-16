import { useState } from 'react';

const options = [
  {
    id: 'cash',
    label: 'Cash',
    icon: '💵',
    rate: 0,
    rateLabel: '0% — No interest',
    type: 'fixed',
    summary: 'Best if available. No interest, fastest timeline, strongest negotiating position with contractors.',
    pros: ['Zero interest cost', 'Fastest project start', 'Best contractor pricing', 'No approval process'],
    cons: ['Depletes liquid reserves', 'Opportunity cost of capital'],
  },
  {
    id: 'heloc',
    label: 'HELOC',
    icon: '🏦',
    rate: 8.25,
    rateLabel: '8.25% variable',
    type: 'variable',
    summary: 'Best for ongoing projects. Borrow as needed, pay interest only on drawn amount.',
    pros: ['Flexible draw schedule', 'Interest only on drawn funds', 'Reusable credit line', 'Tax-deductible interest (consult CPA)'],
    cons: ['Variable rate can rise', 'Home as collateral', 'Closing costs $500–$1,500', '2–4 weeks to open'],
  },
  {
    id: 'heloan',
    label: 'Home Equity Loan',
    icon: '📋',
    rate: 7.8,
    rateLabel: '7.8% fixed',
    type: 'fixed',
    summary: 'Best for single large projects. Fixed payment, predictable cost, lump sum disbursement.',
    pros: ['Fixed rate and payment', 'Predictable total cost', 'Tax-deductible interest (consult CPA)', 'Lump sum upfront'],
    cons: ['Must borrow full amount upfront', 'Closing costs', 'Home as collateral'],
  },
  {
    id: 'personal',
    label: 'Personal Loan',
    icon: '💳',
    rate: 12,
    rateLabel: '9–15% (est. 12%)',
    type: 'fixed',
    summary: 'Use only if no home equity. Faster to get, higher rate, no collateral required.',
    pros: ['No home collateral', 'Fast approval (1–3 days)', 'Fixed payments'],
    cons: ['Highest rate of secured options', 'Lower max loan amounts', 'Not tax deductible'],
  },
  {
    id: 'contractor',
    label: 'Contractor Financing',
    icon: '🔨',
    rate: 0,
    rateLabel: '0% promo (read fine print)',
    type: 'promo',
    summary: 'Read the fine print carefully. Deferred interest and balloon payments are common. Use only if truly 0% with no balloon.',
    pros: ['0% if terms are genuine', 'Convenient at point of sale', 'No separate application'],
    cons: ['Deferred interest traps common', 'Balloon payments at end', 'Limited to that contractor', 'May inflate project cost'],
  },
];

function calcMonthly(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function HomeRenovationFinancingComparison() {
  const [projectCost, setProjectCost] = useState(25000);
  const [selected, setSelected] = useState('heloc');
  const [termMonths, setTermMonths] = useState(60);

  const opt = options.find(o => o.id === selected)!;
  const monthly = calcMonthly(projectCost, opt.rate, termMonths);
  const totalPaid = monthly * termMonths;
  const totalInterest = opt.rate === 0 ? 0 : totalPaid - projectCost;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '60px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🔧</div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.15 }}>
            Home Renovation Financing Comparison
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            Which option is cheapest for your DFW project? DFW home equity is averaging $180,000+ — most homeowners have excellent choices.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 48 }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              style={{
                background: selected === o.id ? '#1d4ed8' : '#1e293b',
                border: `2px solid ${selected === o.id ? '#3b82f6' : '#334155'}`,
                borderRadius: 12, padding: '18px 14px', cursor: 'pointer',
                textAlign: 'center', color: '#f1f5f9', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{o.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{o.label}</div>
              <div style={{ color: selected === o.id ? '#bfdbfe' : '#64748b', fontSize: 12 }}>{o.rateLabel}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 36, border: '1px solid #334155' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>
            {opt.icon} {opt.label}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>{opt.summary}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>✓ Pros</div>
              {opt.pros.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>• {p}</div>)}
            </div>
            <div>
              <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>✗ Cons</div>
              {opt.cons.map(c => <div key={c} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>• {c}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 48, border: '1px solid #334155' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 800, margin: '0 0 24px' }}>💡 Interactive Cost Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
                Project Cost
              </label>
              <input
                type="range" min={2000} max={150000} step={1000}
                value={projectCost}
                onChange={e => setProjectCost(Number(e.target.value))}
                style={{ width: '100%', marginBottom: 6 }}
              />
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 20 }}>${projectCost.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
                Repayment Term
              </label>
              <input
                type="range" min={12} max={360} step={12}
                value={termMonths}
                onChange={e => setTermMonths(Number(e.target.value))}
                style={{ width: '100%', marginBottom: 6 }}
              />
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 20 }}>{termMonths} months ({(termMonths/12).toFixed(1)} yrs)</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Monthly Payment', value: `$${monthly.toFixed(0)}`, color: '#3b82f6' },
              { label: 'Total Interest', value: `$${totalInterest.toFixed(0)}`, color: '#ef4444' },
              { label: 'Total Cost', value: `$${totalPaid.toFixed(0)}`, color: '#22c55e' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0f172a', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{s.label}</div>
                <div style={{ color: s.color, fontSize: 24, fontWeight: 800 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 48, border: '2px solid #dc2626' }}>
          <h3 style={{ color: '#ef4444', fontWeight: 800, fontSize: 16, margin: '0 0 10px' }}>⚠️ What to Avoid</h3>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0, lineHeight: 1.7 }}>
            Never finance a roof or HVAC repair on a credit card unless you can pay it in 30 days. 
            24% APR on a $12,000 HVAC job = $3,000+ in interest annually. Get quotes first, then determine financing.
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #1e40af 100%)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📐</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 10px' }}>Get Contractor Quotes First, Then Decide on Financing</h2>
          <p style={{ color: '#a7f3d0', fontSize: 15, margin: '0 0 24px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            ProLnk connects you with vetted DFW contractors who compete for your job — giving you real numbers before you commit to any financing option.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{
              display: 'inline-block', background: '#fff', color: '#065f46',
              fontWeight: 800, fontSize: 16, padding: '13px 32px',
              borderRadius: 10, textDecoration: 'none',
            }}
          >
            Get Free Contractor Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}

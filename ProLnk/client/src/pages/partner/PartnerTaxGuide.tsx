import { useState } from 'react';

const deductions = [
  { icon: '🏠', title: 'Home Office', detail: 'Dedicated workspace: $5/sq ft (simplified) or actual expenses. Must be used regularly and exclusively for work.' },
  { icon: '📱', title: 'Phone & Internet', detail: 'Deduct the business-use percentage of your phone and home internet bill. Keep records of how you use them for ProLnk.' },
  { icon: '🚗', title: 'Mileage', detail: '67¢ per mile (2024 IRS rate) for client visits, property tours, recruiting meetings. Log trips with date, destination, and purpose.' },
  { icon: '💻', title: 'Equipment & Hardware', detail: 'Laptop, tablet, external monitor, printer. Deduct full cost if used >50% for business, or proportionally if mixed-use.' },
  { icon: '📚', title: 'Training & Education', detail: 'Partner webinars, online courses, real estate or sales training — deductible if directly related to your ProLnk work.' },
  { icon: '📦', title: 'Software & Subscriptions', detail: 'CRM tools, Zoom, DocuSign, cloud storage, productivity apps used for your partner business.' },
  { icon: '🎁', title: 'Client Gifts', detail: 'Up to $25 per recipient per year for homeowners or pro referrals. Keep receipts noting recipient and business purpose.' },
  { icon: '📰', title: 'Marketing Costs', detail: 'Business cards, flyers, Facebook/Instagram ads, LinkedIn Premium if used for partner recruitment.' },
  { icon: '✈️', title: 'Business Travel', detail: 'Flights, hotels, and meals (50%) for partner conferences, training events, or recruiting trips. Must be primarily for business.' },
  { icon: '🤝', title: 'Professional Services', detail: 'Fees paid to accountants, bookkeepers, or attorneys for your partner business. This guide itself is a reminder to hire one.' },
  { icon: '🏦', title: 'Self-Employed Health Insurance', detail: 'If you pay your own health premiums and are not eligible for a spouse employer plan, 100% is deductible.' },
  { icon: '💰', title: 'Retirement Contributions', detail: 'SEP-IRA: up to 25% of net self-employment income. Solo 401(k): up to $69,000 (2024). These reduce taxable income dollar-for-dollar.' },
];

const quarters = [
  { label: 'Q1', period: 'Jan 1 – Mar 31', due: 'April 15′ },
  { label: 'Q2', period: 'Apr 1 – May 31', due: 'June 17′ },
  { label: 'Q3', period: 'Jun 1 – Aug 31', due: 'September 16′ },
  { label: 'Q4', period: 'Sep 1 – Dec 31', due: 'January 15′ },
];

export default function PartnerTaxGuide() {
  const [annualIncome, setAnnualIncome] = useState(30000);
  const [deductions_amount, setDeductionsAmount] = useState(5000);

  const net = Math.max(0, annualIncome - deductions_amount);
  const seTax = net * 0.9235 * 0.153;
  const deductibleSE = seTax / 2;
  const taxableIncome = net - deductibleSE;
  const incomeTax = taxableIncome * 0.22;
  const totalTax = seTax + incomeTax;
  const quarterly = totalTax / 4;

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>🧾</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Tax Guide</h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
            Partner commissions are 1099-NEC self-employment income. Here is what you need to know.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 12 }}>📋 How Your Income Is Classified</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Tax Form', value: '1099-NEC' },
              { label: 'Income Type', value: 'Self-Employment' },
              { label: 'SE Tax Rate', value: '15.3% on net profit' },
              { label: '1099 Threshold', value: '$600+ earnings/year' },
            ].map(({ label, value }) => (
              <div key={label} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628′ }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 16 }}>💡 Top 12 Deductions for Partners</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {deductions.map(({ icon, title, detail }) => (
              <div key={title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #F1F5F9′ }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#0A1628', fontSize: 14, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 16 }}>📅 Quarterly Estimated Tax Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {quarters.map(q => (
              <div key={q.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{q.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 11, margin: '4px 0′ }}>{q.period}</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>Due {q.due}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12, marginBottom: 0 }}>
            You owe estimated taxes if you expect to owe $1,000+ for the year. Missing deadlines incurs IRS penalties.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 20 }}>🧮 Quarterly Tax Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, color: '#0A1628', fontWeight: 600 }}>Annual gross income</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628′ }}>{fmt(annualIncome)}</span>
              </div>
              <input type="range" min={600} max={500000} step={1000} value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, color: '#0A1628', fontWeight: 600 }}>Business deductions</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628′ }}>{fmt(deductions_amount)}</span>
              </div>
              <input type="range" min={0} max={annualIncome} step={500} value={deductions_amount} onChange={e => setDeductionsAmount(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'Net Profit', value: fmt(net), sub: 'gross – deductions' },
              { label: 'Est. Annual Tax', value: fmt(totalTax), sub: 'SE + income tax' },
              { label: 'Est. Quarterly Payment', value: fmt(quarterly), sub: 'pay 4x per year', highlight: true },
            ].map(({ label, value, sub, highlight }) => (
              <div key={label} style={{ backgroundColor: highlight ? '#0A1628′ : '#F8FAFC', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ fontSize: 12, color: highlight ? '#94A3B8′ : '#64748B', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? '#F5E642′ : '#0A1628' }}>{value}</div>
                <div style={{ fontSize: 11, color: highlight ? '#64748B' : '#94A3B8', marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 10, marginBottom: 0 }}>
            Assumes 22% federal income tax bracket. This is an estimate only — consult a CPA for your actual liability.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 12 }}>🏦 Retirement Options for Self-Employed Partners</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'SEP-IRA', limit: 'Up to 25% of net income (max $69,000)', notes: 'Easiest to open. No annual filing required. Best for high earners.' },
              { name: 'Solo 401(k)', limit: 'Up to $69,000 total (employee + employer)', notes: 'Roth option available. Great if you want higher contribution limits.' },
              { name: 'SIMPLE IRA', limit: 'Up to $16,000 employee + 3% match', notes: 'If you have 1–2 employees. Less flexible than Solo 401(k).' },
              { name: 'Traditional IRA', limit: 'Up to $7,000 ($8,000 if 50+)', notes: 'Fallback if others are maxed. Subject to income phase-out if you have a day job.' },
            ].map(({ name, limit, notes }) => (
              <div key={name} style={{ padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14 }}>{name}</div>
                <div style={{ fontWeight: 600, color: '#F5A623', fontSize: 13 }}>{limit}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

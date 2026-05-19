import { useState } from 'react';

const deductionFields = [
  { key: 'miles', label: '🚗 Business Miles Driven', unit: 'miles', rate: 0.67, note: '2026 IRS rate: 67¢/mile' },
  { key: 'subscription', label: '📱 ProLnk Subscription', unit: 'months', rate: 149, note: '$149/mo fully deductible' },
  { key: 'tools', label: '🔧 Tools & Equipment', unit: 'dollars', rate: 1, note: 'Section 179: 100% deductible year of purchase' },
  { key: 'phone', label: '📞 Phone Bill (annual)', unit: 'dollars', rate: 0.7, note: 'Avg 70% business use applied' },
  { key: 'insurance', label: '🛡️ General Liability Insurance', unit: 'dollars', rate: 1, note: 'Fully deductible' },
  { key: 'training', label: '🎓 Training & Certifications', unit: 'dollars', rate: 1, note: 'Trade courses fully deductible' },
  { key: 'homeOffice', label: '🏠 Home Office (sq ft)', unit: 'sqft', rate: 5, note: 'IRS simplified: $5/sqft (exclusive use only)' },
  { key: 'fuel', label: '⛽ Fuel Receipts (if not using mileage)', unit: 'dollars', rate: 1, note: 'Actual expense method only — pick one or the other' },
];

export default function PartnerTaxDeductionMaximizer() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ total: number; savings: number; lines: { label: string; amount: number }[] } | null>(null);

  function calculate() {
    let total = 0;
    const lines: { label: string; amount: number }[] = [];
    deductionFields.forEach(f => {
      const val = parseFloat(inputs[f.key] || '0') || 0;
      if (val > 0) {
        const amount = val * f.rate;
        lines.push({ label: f.label, amount });
        total += amount;
      }
    });
    const savings = total * 0.28;
    setResult({ total, savings, lines });
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1565c0 60%, #0d47a1 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💼</div>
        <h1 style={{ fontSize: 'clamp(24px,5vw,38px)', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          Tax Deduction Maximizer for ProLnk Partners
        </h1>
        <p style={{ fontSize: 18, color: '#90caf9', maxWidth: 560, margin: '0 auto' }}>
          Keep More of What You Earn — Self-Employment Tax Strategy
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>

        {/* SE Tax Overview */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1565c0', marginBottom: 16 }}>📊 How Self-Employment Changes Your Taxes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {[
              { icon: '⚠️', title: 'Self-Employment Tax', desc: 'You pay BOTH employee and employer Social Security/Medicare — that’s 15.3% on top of income tax.' },
              { icon: '✅', title: 'SE Tax Deduction', desc: 'You can deduct half of your SE tax from gross income. This reduces your overall taxable income.' },
              { icon: '💡', title: 'Business Deductions', desc: 'Significant deductions W-2 employees cannot take. The ProLnk deduction stack below can save $5,000–$20,000+ per year.' },
            ].map(c => (
              <div key={c.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: '#1565c0', marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Deduction Stack */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1565c0', marginBottom: 16 }}>🔋 The ProLnk Partner Deduction Stack</h2>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1565c0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontSize: 13 }}>Deduction</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontSize: 13 }}>Example Value</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontSize: 13 }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['🚗 Vehicle (mileage)', '18,000 mi × $0.67 = $12,060', 'Keep a mileage log — required by IRS'],
                  ['📱 ProLnk subscription', '$149 × 12 = $1,788', 'Fully deductible business expense'],
                  ['🔧 Tools & equipment', 'Up to full purchase price', 'Section 179 — 100% deduction in year of purchase'],
                  ['📞 Phone (70% business)', '$100/mo × 70% × 12 = $840', 'Document business use %'],
                  ['🛡️ Liability insurance', 'Full premium', 'Fully deductible — no limit'],
                  ['🎓 Training/certifications', 'Full cost', 'Trade courses, renewal fees, seminars'],
                  ['🏠 Home office', '$5 × sq ft (exclusive use only)', 'IRS simplified method — no depreciation recapture'],
                ].map(([ded, example, note], i) => (
                  <tr key={ded} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1e293b' }}>{ded}</td>
                    <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600, fontSize: 13 }}>{example}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: 13 }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quarterly Calendar */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1565c0', marginBottom: 16 }}>📅 Tax Planning Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {[
              { q: 'Q1', date: 'April 15', icon: '📁', action: 'Pay Q1 estimated tax + file prior year return (or extension)' },
              { q: 'Q2', date: 'June 15', icon: '📤', action: 'Pay Q2 estimated tax. Review deductions through May.' },
              { q: 'Q3', date: 'September 15', icon: '📊', action: 'Pay Q3 estimated tax. Year-end tax planning begins.' },
              { q: 'Q4', date: 'January 15', icon: '✅', action: 'Pay Q4 estimated tax. Final deadline before penalties.' },
            ].map(q => (
              <div key={q.q} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{q.icon}</div>
                <div style={{ fontWeight: 800, color: '#1565c0', fontSize: 18 }}>{q.q}</div>
                <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 6 }}>Due: {q.date}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{q.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* S-Corp */}
        <section style={{ marginTop: 40 }}>
          <div style={{ background: '#fffbeb', border: '2px solid #d97706', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🏢</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#92400e' }}>S-Corp Threshold: $60K Net</h3>
            </div>
            <p style={{ color: '#78350f', margin: 0, lineHeight: 1.6 }}>
              When your ProLnk net income exceeds <strong>$60,000/year</strong>, electing S-Corp status can save <strong>$4,000–$12,000 per year</strong> in self-employment tax by paying yourself a "reasonable salary" and taking the remainder as distributions (which are not subject to SE tax). Consult a CPA before making this election.
            </p>
          </div>
        </section>

        {/* Deduction Calculator */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1565c0', marginBottom: 8 }}>🧮 Deduction Calculator</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter each expense category to estimate your total deductions and tax savings vs. a W-2 worker.</p>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 20 }}>
              {deductionFields.map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>{f.label}</label>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{f.note}</div>
                  <input
                    type="number"
                    placeholder={f.unit === 'dollars' ? '$0' : `0 ${f.unit}`}
                    value={inputs[f.key] || ''}
                    onChange={e => setInputs(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '10px 12px', color: '#1e293b', fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={calculate}
              style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Calculate My Tax Savings
            </button>
            {result && (
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div style={{ background: '#f0f9ff', border: '2px solid #0284c7', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: '#0369a1', marginBottom: 4 }}>Total Deductions</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#0284c7' }}>${result.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: '#15803d', marginBottom: 4 }}>Estimated Tax Savings</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a' }}>${result.savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  </div>
                </div>
                {result.lines.map(l => (
                  <div key={l.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                    <span style={{ color: '#475569' }}>{l.label}</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>${l.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>* Savings estimate assumes 28% combined federal + state effective rate. Actual results vary. Consult a licensed CPA.</div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

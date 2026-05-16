import { useState } from 'react';

export default function DFWHomeOfficeTaxGuide2026() {
  const [homeSqft, setHomeSqft] = useState('');
  const [officeSqft, setOfficeSqft] = useState('');
  const [annualMortgageOrRent, setAnnualMortgageOrRent] = useState('');
  const [annualPropTax, setAnnualPropTax] = useState('');
  const [annualInsurance, setAnnualInsurance] = useState('');
  const [annualUtilities, setAnnualUtilities] = useState('');
  const [showResult, setShowResult] = useState(false);

  const canCalculate = homeSqft && officeSqft && Number(homeSqft) > 0 && Number(officeSqft) > 0 && Number(officeSqft) < Number(homeSqft);

  const officePct = canCalculate ? Number(officeSqft) / Number(homeSqft) : 0;
  const simplifiedDeduction = canCalculate ? Math.min(Number(officeSqft), 300) * 5 : 0;

  const actualExpenses = canCalculate ? (
    (Number(annualMortgageOrRent) || 0) * officePct +
    (Number(annualPropTax) || 0) * officePct +
    (Number(annualInsurance) || 0) * officePct +
    (Number(annualUtilities) || 0) * officePct
  ) : 0;

  const betterMethod = actualExpenses > simplifiedDeduction ? 'actual' : 'simplified';
  const taxSavingsEstimate = Math.max(actualExpenses, simplifiedDeduction) * 0.25;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Tax Guidance 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: 16 }}>
            2026 Home Office Tax Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
            Updated rules for DFW remote workers, freelancers, and ProLnk partners. Know exactly who qualifies and how much you can deduct.
          </p>
        </div>

        {/* TCJA Update Banner */}
        <div style={{ background: '#1c1005', border: '1px solid #92400e', borderRadius: 14, padding: 24, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <div>
              <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 8, fontSize: 17 }}>2026 TCJA Update</div>
              <p style={{ color: '#d97706', margin: 0, lineHeight: 1.7, fontSize: 15 }}>
                The Tax Cuts and Jobs Act (TCJA) through 2025 eliminated the home office deduction for W-2 employees. As of 2026 (TCJA expiration), Congress is expected to revisit this — but as of writing, <strong>only self-employed individuals qualify</strong>. W-2 employees should monitor IRS guidance for updates.
              </p>
            </div>
          </div>
        </div>

        {/* Who Qualifies */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>✅ Who Can Deduct (Confirmed 2026)</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { who: 'Self-employed (Schedule C filers)', status: 'YES', detail: 'Full home office deduction available. Both simplified and actual expense methods apply.', color: '#166534', statusColor: '#4ade80' },
              { who: 'ProLnk Partners', status: 'YES', detail: 'You receive 1099 income — you are self-employed. Home office deduction fully applies.', color: '#166534', statusColor: '#4ade80' },
              { who: 'Freelancers / 1099 workers', status: 'YES', detail: 'Any income reported on a 1099-NEC qualifies. Keep your workspace exclusive.', color: '#166534', statusColor: '#4ade80' },
              { who: 'W-2 Employees (remote work)', status: 'PENDING', detail: 'TCJA sunset may restore the deduction. Monitor IRS guidance for 2026 filing.', color: '#854d0e', statusColor: '#fbbf24' },
            ].map(q => (
              <div key={q.who} style={{ background: '#1e293b', borderRadius: 10, padding: '18px 24px', display: 'flex', gap: 16, alignItems: 'center', border: '1px solid #334155', flexWrap: 'wrap' }}>
                <span style={{ background: q.color + '30', color: q.statusColor, fontSize: 12, fontWeight: 800, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>{q.status}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{q.who}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{q.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DFW Amplifiers */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 40, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🏠 DFW-Specific Costs That Amplify Your Deduction</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>DFW has some of the highest property taxes and insurance costs in the country — making the home office deduction especially valuable here.</p>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { cost: 'Property taxes', example: '$485K home × 2.14% = $10,379/yr', at8pct: '$830 deduction at 8% office allocation' },
              { cost: 'Homeowners insurance', example: 'DFW average: $3,240/yr (hail zone)', at8pct: '$259 deduction at 8% office allocation' },
              { cost: 'Utilities (summer electric)', example: 'DFW avg: $4,800/yr with AC', at8pct: '$384 deduction at 8% office allocation' },
            ].map(d => (
              <div key={d.cost} style={{ background: '#0f172a', borderRadius: 10, padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 4 }}>{d.cost}</div>
                  <div style={{ color: '#475569', fontSize: 13 }}>{d.example}</div>
                </div>
                <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14, textAlign: 'right', whiteSpace: 'nowrap' }}>{d.at8pct}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusive Use Warning */}
        <div style={{ background: '#1f0a0a', border: '1px solid #7f1d1d', borderRadius: 14, padding: 24, marginBottom: 52 }}>
          <h3 style={{ fontWeight: 700, color: '#fca5a5', marginBottom: 10, fontSize: 17 }}>⛔ The Exclusive Use Requirement — Texas Courts Take This Seriously</h3>
          <p style={{ color: '#f87171', margin: 0, lineHeight: 1.7 }}>
            If your home office has a bed, TV, exercise equipment, or any personal use — it does not qualify. The IRS requires <strong>exclusive and regular use</strong> for business. Dedicated room = strong claim. Multi-use space = audit risk.
          </p>
        </div>

        {/* Calculator */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>🧮 Home Office Deduction Calculator</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>Compare the IRS Simplified Method vs. the Actual Expense Method — find out which saves you more.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[
              { label: 'Home Total Sqft', val: homeSqft, set: setHomeSqft, placeholder: 'e.g. 2400' },
              { label: 'Office Sqft (exclusive use only)', val: officeSqft, set: setOfficeSqft, placeholder: 'e.g. 180' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>{f.label}</label>
                <input type="number" value={f.val} onChange={e => { f.set(e.target.value); setShowResult(false); }} placeholder={f.placeholder}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 14px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Annual Mortgage/Rent ($)', val: annualMortgageOrRent, set: setAnnualMortgageOrRent, placeholder: 'e.g. 24000' },
              { label: 'Annual Property Tax ($)', val: annualPropTax, set: setAnnualPropTax, placeholder: 'e.g. 10379' },
              { label: 'Annual Insurance ($)', val: annualInsurance, set: setAnnualInsurance, placeholder: 'e.g. 3240' },
              { label: 'Annual Utilities ($)', val: annualUtilities, set: setAnnualUtilities, placeholder: 'e.g. 4800' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', color: '#94a3b8', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>{f.label}</label>
                <input type="number" value={f.val} onChange={e => { f.set(e.target.value); setShowResult(false); }} placeholder={f.placeholder}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '11px 14px', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>

          {canCalculate && (
            <button onClick={() => setShowResult(true)}
              style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 20 }}>
              Calculate My Deduction
            </button>
          )}

          {showResult && canCalculate && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 28, border: '1px solid #334155' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ background: betterMethod === 'simplified' ? '#0a2a1a' : '#1e293b', borderRadius: 10, padding: 20, border: `1px solid ${betterMethod === 'simplified' ? '#166534' : '#334155'}` }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>IRS Simplified Method</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: betterMethod === 'simplified' ? '#4ade80' : '#94a3b8' }}>${simplifiedDeduction.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{Math.min(Number(officeSqft), 300)} sqft × $5/sqft</div>
                  {betterMethod === 'simplified' && <div style={{ marginTop: 8, fontSize: 12, color: '#4ade80', fontWeight: 700 }}>✓ BEST FOR YOU</div>}
                </div>
                <div style={{ background: betterMethod === 'actual' ? '#0a2a1a' : '#1e293b', borderRadius: 10, padding: 20, border: `1px solid ${betterMethod === 'actual' ? '#166534' : '#334155'}` }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Actual Expense Method</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: betterMethod === 'actual' ? '#4ade80' : '#94a3b8' }}>${Math.round(actualExpenses).toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{(officePct * 100).toFixed(1)}% of total home costs</div>
                  {betterMethod === 'actual' && <div style={{ marginTop: 8, fontSize: 12, color: '#4ade80', fontWeight: 700 }}>✓ BEST FOR YOU</div>}
                </div>
              </div>
              <div style={{ background: '#0a2233', borderRadius: 10, padding: 20, border: '1px solid #1e40af', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#60a5fa', marginBottom: 4 }}>Estimated tax savings (at 25% effective rate)</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#93c5fd' }}>${Math.round(taxSavingsEstimate).toLocaleString()}/year</div>
              </div>
              <p style={{ color: '#475569', margin: '16px 0 0', fontSize: 12, lineHeight: 1.6 }}>
                * This is a simplified educational estimate. Consult a CPA licensed in Texas for your actual tax situation. The Actual Expense Method requires detailed recordkeeping and may trigger additional depreciation recapture rules on home sale.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

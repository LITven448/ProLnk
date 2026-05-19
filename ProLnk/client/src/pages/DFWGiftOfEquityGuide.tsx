import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const formatPercent = (n: number) => n.toFixed(1) + '%';

export default function DFWGiftOfEquityGuide() {
  const [homeValue, setHomeValue] = useState(420000);
  const [agreePrice, setAgreePrice] = useState(370000);
  const [giftAmount, setGiftAmount] = useState(50000);
  const [numGivers, setNumGivers] = useState(2);
  const [buyerSavings, setBuyerSavings] = useState(15000);

  const annualExclusion2026 = 18000;
  const giftPerGiver = giftAmount / Math.max(1, numGivers);
  const exceedsAnnualExclusion = giftPerGiver > annualExclusion2026;
  const taxableGiftPerGiver = Math.max(0, giftPerGiver - annualExclusion2026);

  const effectiveDownPayment = giftAmount + buyerSavings;
  const loanAmount = agreePrice - effectiveDownPayment;
  const downPaymentPercent = (effectiveDownPayment / agreePrice) * 100;
  const pmiEliminated = downPaymentPercent >= 20;
  const pmiMonthly = !pmiEliminated ? (loanAmount * 0.0075) / 12 : 0;

  const ltv = (loanAmount / agreePrice) * 100;
  const equityOnClose = homeValue - loanAmount;
  const equityPercent = (equityOnClose / homeValue) * 100;

  const lifetimeExemptionRemaining = 13610000;
  const giftTaxOwed = exceedsAnnualExclusion ? `Reduces lifetime exemption by ${formatCurrency(taxableGiftPerGiver * numGivers)} per year above exclusion` : 'No gift tax — within annual exclusion';

  const steps = [
    { num: 1, title: 'Agree on Sale Price', desc: 'Seller (parents) and buyer (child) agree on a price below market value. The difference becomes the "gift of equity."' },
    { num: 2, title: 'Get FHA or Conventional Appraisal', desc: 'Lender requires an appraisal to verify market value. This establishes the gift amount officially.' },
    { num: 3, title: 'Gift Letter from Parents', desc: 'Lender requires a signed gift letter stating the equity is a gift, not a loan. No repayment expected.' },
    { num: 4, title: 'Title Company Processes Transfer', desc: 'The equity gift is credited at closing — no cash changes hands. Buyer gets equity instantly.' },
    { num: 5, title: 'File Gift Tax Return (if needed)', desc: 'If gift exceeds annual exclusion, file IRS Form 709. No tax is typically owed (draws on lifetime exemption).' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🎁</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          Gift of Equity Guide for DFW Families
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          Texas parents can help children buy their home by gifting equity — no cash needed. Understand the process, tax rules, and how it eliminates PMI.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff3cd', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>💡 What is a Gift of Equity?</h3>
          <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>
            A gift of equity occurs when a family member sells their home to a relative below market value. The difference between market value and sale price is the "gift of equity." In Texas, this is an efficient way to transfer wealth — no cash changes hands, and the buyer gets immediate home equity. Lenders treat it as part of the down payment.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #e2e8f0′ }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 How It Works — Step by Step</h3>
          {steps.map(step => (
            <div key={step.num} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Gift of Equity Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {[
              { label: 'Home Market Value ($)', value: homeValue, setValue: setHomeValue, step: 5000 },
              { label: 'Agreed Sale Price ($)', value: agreePrice, setValue: setAgreePrice, step: 5000 },
              { label: 'Gift of Equity Amount ($)', value: giftAmount, setValue: setGiftAmount, step: 1000 },
              { label: 'Number of Givers (parents = 2)', value: numGivers, setValue: setNumGivers, step: 1 },
              { label: 'Buyer Cash Savings ($)', value: buyerSavings, setValue: setBuyerSavings, step: 1000 },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type="number"
                  step={field.step}
                  value={field.value}
                  onChange={e => field.setValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, color: '#fff', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, textAlign: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Effective Down Payment</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{formatCurrency(effectiveDownPayment)}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{formatPercent(downPaymentPercent)} of sale price</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>PMI Status</div>
                <div style={{ color: pmiEliminated ? '#22c55e' : '#ef4444', fontSize: 24, fontWeight: 800 }}>
                  {pmiEliminated ? '✅ Eliminated' : formatCurrency(pmiMonthly) + '/mo'}
                </div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{pmiEliminated ? '≥20% down payment achieved' : 'need 20% to eliminate'}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Instant Equity at Close</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{formatCurrency(equityOnClose)}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{formatPercent(equityPercent)} of market value</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: 16, fontSize: 13, color: '#94a3b8', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>Loan Amount: <span style={{ color: '#fff' }}>{formatCurrency(loanAmount)}</span></div>
              <div>LTV Ratio: <span style={{ color: '#fff' }}>{formatPercent(ltv)}</span></div>
              <div>Gift per giver: <span style={{ color: '#fff' }}>{formatCurrency(giftPerGiver)}</span></div>
              <div>Annual exclusion 2026: <span style={{ color: '#fff' }}>{formatCurrency(annualExclusion2026)}/giver</span></div>
            </div>
          </div>

          <div style={{ background: exceedsAnnualExclusion ? '#fef3c7′ : '#dcfce7', borderRadius: 10, padding: 16, border: `1px solid ${exceedsAnnualExclusion ? '#fcd34d' : '#86efac'}` }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: exceedsAnnualExclusion ? '#92400e' : '#166534′ }}>
              {exceedsAnnualExclusion ? '⚠️ Gift Tax Form 709 Required' : '✅ Within Annual Gift Tax Exclusion'}
            </div>
            <div style={{ fontSize: 13, color: '#475569′ }}>{giftTaxOwed}</div>
            {exceedsAnnualExclusion && (
              <div style={{ fontSize: 12, color: '#92400e', marginTop: 6 }}>
                Tip: Spread gift over 2 calendar years to stay within exclusion limits per giver.
                With 2 parents × $18K each = $36K/yr tax-free.
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏦 Lender Requirements for Gift of Equity</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#475569′ }}>
            {[
              '📝 Signed gift letter (no repayment required)',
              '🏠 Appraisal at full market value',
              '👨‍👩‍👧 Must be immediate family (FHA rule)',
              '📊 Conventional: 20% gift allowed with any seller',
              '🔍 FHA: Full gift of equity allowed, 0% buyer cash',
              '⚠️ VA: Gift of equity allowed for veterans',
            ].map(item => (
              <div key={item} style={{ background: '#F9FAFB', padding: '8px 12px', borderRadius: 8 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

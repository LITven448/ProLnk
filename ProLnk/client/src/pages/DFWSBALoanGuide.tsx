import { useState } from 'react';

const loanTypes = [
  { name: 'SBA 7(a)', max: '$5M', rate: 'Prime + 2.25–4.75%', term: 'Up to 25 yrs (RE), 10 yrs (other)', bestFor: 'Working capital, equipment, business property', minScore: 680 },
  { name: 'SBA 504', max: '$5.5M', rate: 'Fixed ~6.5% (CDC portion)', term: '10, 20, or 25 years', bestFor: 'Commercial real estate, heavy equipment', minScore: 680 },
  { name: 'SBA Express', max: '$500K', rate: 'Prime + 4.5–6.5%', term: 'Up to 7 years', bestFor: 'Fast approval, small amounts, lines of credit', minScore: 650 },
  { name: 'SBA Microloan', max: '$50K', rate: '8–13% avg', term: 'Up to 6 years', bestFor: 'Startup home-based businesses, very small needs', minScore: 620 },
];

const dfwResources = [
  { name: 'SBA Dallas/Fort Worth District Office', addr: '4300 Amon Carter Blvd, Fort Worth, TX 76155', phone: '817-684-5500′ },
  { name: 'DFW SBDC at UTA', addr: '1500 S. Cooper St, Arlington TX 76019', phone: '817-272-5932′ },
  { name: 'Accion Opportunity Fund (DFW)', addr: 'microloans for underserved DFW businesses', phone: '888-215-2373′ },
];

const eligibility = [
  'Business must operate for profit',
  'Located in the US (DFW qualifies)',
  'Owner has invested equity (some personal stake)',
  'Exhausted other financing options first',
  'No delinquency on US government debt',
  'Home-based is OK — must show business activity',
];

function assess(bizType: string, amount: number, score: number) {
  if (amount <= 50000 && score >= 620) return { type: 'SBA Microloan', eligible: true, notes: 'Strong fit. DFW SBDC can connect you to Accion or local CDFIs.' };
  if (amount <= 500000 && score >= 650) return { type: 'SBA Express', eligible: true, notes: 'Fast 36-hour approval window. Use if you need funds quickly.' };
  if (bizType === 'real_estate' && amount >= 100000 && score >= 680) return { type: 'SBA 504', eligible: true, notes: 'Ideal for property purchase. Requires 10% down + licensed appraiser.' };
  if (amount >= 50000 && score >= 680) return { type: 'SBA 7(a)', eligible: true, notes: 'Most flexible. Work with a preferred SBA lender in DFW.' };
  return { type: 'Not yet eligible', eligible: false, notes: 'Build credit to 650+, document 2 yrs of business income, then reapply.' };
}

export default function DFWSBALoanGuide() {
  const [bizType, setBizType] = useState('service');
  const [amount, setAmount] = useState(150000);
  const [score, setScore] = useState(700);
  const result = assess(bizType, amount, score);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>🏛️ SBA Loan Guide — DFW</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>Home-Based Business Owners & Commercial Property Financing</div>
        </div>
        <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #BFDBFE' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏠 Can a Home-Based Business Use SBA Loans?</div>
          <div style={{ fontSize: 14, color: '#1E40AF', lineHeight: 1.6 }}>Yes — SBA does not exclude home-based businesses. DFW sole proprietors, LLCs, and S-Corps operating from home can access SBA 7(a) and Express loans for equipment, working capital, and even purchasing a commercial space to grow into.</div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>📋 SBA Loan Types</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {loanTypes.map(l => (
              <div key={l.name} style={{ background: '#fff', borderRadius: 8, padding: '1rem', border: '1px solid #E2E8F0′ }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{l.name} <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>Up to {l.max}</span></div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Rate: {l.rate} · Term: {l.term}</div>
                    <div style={{ fontSize: 13, color: '#0A1628', marginTop: 4 }}>Best for: {l.bestFor}</div>
                  </div>
                  <div style={{ background: '#F8FAFC', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#64748B' }}>Min score: {l.minScore}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 SBA Eligibility Assessment</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Business Type</div>
              <select value={bizType} onChange={e => setBizType(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}>
                <option value="service">Home Service Business</option>
                <option value="retail">Retail / E-Commerce</option>
                <option value="real_estate">Real Estate / Property</option>
                <option value="contractor">Contractor / Trades</option>
              </select>
            </div>
            {[
              { label: 'Loan Amount Needed ($)', value: amount, set: setAmount, min: 10000, max: 5000000, step: 10000 },
              { label: 'Credit Score', value: score, set: setScore, min: 580, max: 850, step: 10 },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}: <span style={{ color: '#6366F1′ }}>{f.value.toLocaleString()}</span></div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
          <div style={{ background: result.eligible ? '#F0FDF4′ : '#FEF2F2', borderRadius: 8, padding: '1rem', border: `1px solid ${result.eligible ? '#86EFAC' : '#FECACA'}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: result.eligible ? '#16A34A' : '#DC2626′ }}>
              {result.eligible ? '✅' : '⚠️'} Recommended: {result.type}
            </div>
            <div style={{ fontSize: 14, color: '#374151′ }}>{result.notes}</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>📍 DFW SBA Resources</div>
          {dfwResources.map(r => (
            <div key={r.name} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #F1F5F9′ }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>🏢 {r.name}</div>
              <div style={{ fontSize: 13, color: '#64748B' }}>{r.addr}</div>
              <div style={{ fontSize: 13, color: '#2563EB' }}>📞 {r.phone}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '1.25rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>✅ Basic SBA Eligibility Requirements</div>
          {eligibility.map(e => <div key={e} style={{ fontSize: 13, marginBottom: 4, color: '#374151′ }}>• {e}</div>)}
        </div>
      </div>
    </div>
  );
}

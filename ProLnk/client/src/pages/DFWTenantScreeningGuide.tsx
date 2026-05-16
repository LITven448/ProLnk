import { useState } from 'react';

const canAsk = [
  'Employment status and income (verify 3x rent)',
  'Credit score and credit history',
  'Prior eviction history',
  'Criminal background (must be consistent policy)',
  'Rental history and landlord references',
  'Number of occupants (fair housing limits apply)',
  'Pets and pet history',
  'Move-in date and lease term preference',
];

const cannotAsk = [
  'Race, color, or national origin',
  'Sex, gender identity, or sexual orientation',
  'Religion or religious practices',
  'Disability status or medical history',
  'Familial status or pregnancy',
  'Source of income (Section 8 — protected in Dallas)',
  'Whether they have children (familial status)',
  'Country of birth or immigration status',
];

const verifyChecklist = [
  { item: 'Pay stubs (last 2–3 months)', category: 'Income' },
  { item: 'Bank statements (2–3 months)', category: 'Income' },
  { item: 'Offer letter (for new employment)', category: 'Income' },
  { item: 'Credit report (TransUnion, Experian, Equifax)', category: 'Credit' },
  { item: 'Eviction court records check', category: 'History' },
  { item: 'Criminal background check (county + national)', category: 'Background' },
  { item: 'Prior landlord references (last 2 landlords)', category: 'References' },
  { item: 'Government-issued photo ID', category: 'Identity' },
  { item: 'Social Security number verification', category: 'Identity' },
  { item: 'Signed rental application', category: 'Legal' },
];

const categoryColors: Record<string, string> = {
  Income: '#3B82F6', Credit: '#8B5CF6', History: '#F59E0B',
  Background: '#EF4444', References: '#10B981', Identity: '#6366F1', Legal: '#F5E642',
};

export default function DFWTenantScreeningGuide() {
  const [monthlyRent, setMonthlyRent] = useState(2000);

  const incomeRequired = monthlyRent * 3;
  const creditBenchmark = 680;
  const depositMax = monthlyRent;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #2D4A6B 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Tenant Screening Guide</h1>
        <p style={{ fontSize: 18, color: '#B0C8E0', maxWidth: 640, margin: '0 auto' }}>Texas fair housing laws, what you can and cannot ask, and a complete verification checklist for DFW landlords</p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, margin: '32px 0', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>⚖️ Texas Fair Housing Laws</h2>
          <p style={{ color: '#4A5568', lineHeight: 1.7 }}>The Fair Housing Act (federal) and Texas Fair Housing Act prohibit discrimination based on 7 protected classes. Dallas City Code adds <strong>source of income</strong> as a protected class, meaning you generally cannot refuse Section 8 voucher holders in Dallas proper. All screening criteria must be applied <strong>consistently</strong> to every applicant to avoid disparate impact claims.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '0 0 24px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
            <h2 style={{ color: '#10B981', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>✅ You CAN Ask/Verify</h2>
            {canAsk.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#10B981', fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#374151', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
            <h2 style={{ color: '#EF4444', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🚫 You CANNOT Ask About</h2>
            {cannotAsk.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#EF4444', fontSize: 16, flexShrink: 0 }}>✗</span>
                <span style={{ color: '#374151', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, margin: '0 0 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '2px solid #1A2B3C' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Screening Benchmarks Calculator</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#4A5568', fontSize: 14, marginBottom: 8 }}>Monthly Rent ($)</label>
            <input type="number" min={500} max={10000} step={50} value={monthlyRent} onChange={e => setMonthlyRent(parseInt(e.target.value) || 0)} style={{ width: 260, background: '#F8FAFC', color: '#1A2B3C', border: '2px solid #1A2B3C', borderRadius: 8, padding: '10px 14px', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #BFDBFE' }}>
              <div style={{ color: '#3B82F6', fontSize: 13, fontWeight: 600 }}>Income Requirement</div>
              <div style={{ color: '#1E40AF', fontSize: 30, fontWeight: 800, margin: '8px 0' }}>${incomeRequired.toLocaleString()}/mo</div>
              <div style={{ color: '#6B7280', fontSize: 12 }}>3x monthly rent (gross)</div>
            </div>
            <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #BBF7D0' }}>
              <div style={{ color: '#10B981', fontSize: 13, fontWeight: 600 }}>Min Credit Score (DFW)</div>
              <div style={{ color: '#065F46', fontSize: 30, fontWeight: 800, margin: '8px 0' }}>{creditBenchmark}+</div>
              <div style={{ color: '#6B7280', fontSize: 12 }}>Recommended benchmark</div>
            </div>
            <div style={{ background: '#FEF9C3', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #FDE68A' }}>
              <div style={{ color: '#92400E', fontSize: 13, fontWeight: 600 }}>Max Security Deposit (TX)</div>
              <div style={{ color: '#78350F', fontSize: 30, fontWeight: 800, margin: '8px 0' }}>${depositMax.toLocaleString()}</div>
              <div style={{ color: '#6B7280', fontSize: 12 }}>No statutory limit, but 1x–2x typical</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📋 Verification Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {verifyChecklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', border: '1px solid #E2E8F0' }}>
                <span style={{ background: categoryColors[item.category] || '#6B7280', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 6px', flexShrink: 0 }}>{item.category}</span>
                <span style={{ color: '#374151', fontSize: 14 }}>{item.item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#FEF2F2', borderRadius: 10, padding: 16, border: '1px solid #FECACA' }}>
            <strong style={{ color: '#991B1B' }}>⚠️ Rejection Best Practice:</strong>
            <span style={{ color: '#7F1D1D', fontSize: 14 }}> Always send a written adverse action notice citing the specific reason (credit, income, eviction history) — required by FCRA when using a consumer report.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

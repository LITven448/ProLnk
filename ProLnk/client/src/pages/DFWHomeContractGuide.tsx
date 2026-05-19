import { useState } from 'react';

const FORMS = [
  { situation: 'Buying existing home (most common)', form: 'TREC 20-17: One to Four Family Residential Contract', terms: ['Sales price', 'Option period length', 'Option fee', 'Earnest money amount', 'Closing date'], flags: ['Survey exception language', 'HOA transfer fees', 'Existing liens', 'Seller disclosure acknowledgment'] },
  { situation: 'Buying new construction', form: 'TREC 24-18: New Home Contract (Completed)', terms: ['Builder warranties', 'Completion date', 'Change order process', 'Upgrade credits'], flags: ['Builder’s contract vs TREC form — read both', 'Lender approval deadline', 'Punch list process', 'Certificate of occupancy contingency'] },
  { situation: 'Buying land / lot', form: 'TREC 25-15: Unimproved Property Contract', terms: ['Zoning contingency', 'Utility availability', 'Survey requirement', 'Environmental review'], flags: ['No homestead exemption until improved', 'Septic/well requirements in rural areas', 'Flood zone status', 'Deed restrictions'] },
  { situation: 'Buying farm or ranch', form: 'TREC 25-15 or Farm & Ranch Contract', terms: ['Mineral rights', 'Water rights', 'Agricultural exemption', 'Existing leases'], flags: ['Mineral rights conveyance — verify separately', 'Fence line agreements', 'Ag exemption rollback taxes', 'Pipeline easements'] },
];

const TERMS = [
  { term: 'Option Period', what: 'Buyer pays a small fee (typically -) for the unrestricted right to terminate within a set number of days (usually 5-10). This is your inspection window.' },
  { term: 'Earnest Money', what: 'Good-faith deposit (typically 1% of purchase price) held in escrow. Forfeited if buyer terminates outside option period without a valid contingency.' },
  { term: 'Title Company', what: 'In DFW, the title company handles closing. They verify the chain of title, issue title insurance, and disburse funds. Buyer typically chooses the title company.' },
  { term: 'Closing Date', what: 'Target date to finalize the purchase. DFW norm is 30-45 days from contract. Lender underwriting is the most common cause of delays.' },
  { term: 'Third Party Financing Addendum', what: 'Protects the buyer if they cannot obtain a loan. If the lender denies the loan, buyer can terminate and recover earnest money.' },
];

export default function DFWHomeContractGuide() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('forms');

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Home Contract Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>TREC forms, option periods, and what to negotiate in Dallas-Fort Worth</p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['forms', 'terms'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSelected(null); }}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                background: activeTab === tab ? '#F5E642' : '#fff', color: activeTab === tab ? '#0A1628' : '#64748B' }}>
              {tab === 'forms' ? '📄 TREC Forms' : '📖 Key Terms'}
            </button>
          ))}
        </div>

        {activeTab === 'forms' && (
          <div>
            <p style={{ color: '#64748B', marginBottom: 16 }}>Select your situation to see the correct TREC form and what to negotiate:</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {FORMS.map((f, i) => (
                <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                  style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                    border: selected === i ? '2px solid #F5E642' : '2px solid transparent',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontWeight: 600, color: '#0A1628', marginBottom: 4 }}>{f.situation}</div>
                  {selected === i && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ background: '#FFF9E6', borderRadius: 8, padding: '0.8rem', marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, marginBottom: 4 }}>✅ TREC Form</div>
                        <div style={{ color: '#0A1628', fontWeight: 600 }}>{f.form}</div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>KEY TERMS TO NEGOTIATE</div>
                          {f.terms.map((t, j) => <div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>• {t}</div>)}
                        </div>
                        <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 12, marginBottom: 6 }}>🚩 FLAG FOR REVIEW</div>
                          {f.flags.map((fl, j) => <div key={j} style={{ fontSize: 13, color: '#991B1B', marginBottom: 4 }}>• {fl}</div>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {TERMS.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{t.term}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{t.what}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>⚖️ All TREC forms are promulgated by the Texas Real Estate Commission. Always review with a licensed Texas real estate attorney.</div>
        </div>
      </div>
    </div>
  );
}

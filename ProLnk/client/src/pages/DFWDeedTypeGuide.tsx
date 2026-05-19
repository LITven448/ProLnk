import { useState } from 'react';

const DEED_TYPES = [
  { transaction: 'Standard home purchase (resale)', deed: 'General Warranty Deed', common: true,
    description: 'Seller warrants title against ALL defects — past and present. This is the gold standard and what buyers should expect in a standard DFW resale.',
    verify: ['Grantor name matches seller on title commitment', 'Legal description matches survey', 'Consideration amount (often shown as symbolic value)', 'Acknowledgment / notarization block complete'],
    caution: 'If seller offers special warranty or quitclaim instead, ask why — it signals a title concern.' },
  { transaction: 'Bank-owned (REO) or foreclosure purchase', deed: 'Special Warranty Deed', common: true,
    description: 'Seller only warrants title against defects arising during their ownership. Banks routinely use this. Get title insurance — it fills the coverage gap.',
    verify: ['Chain of title in Schedule B of title commitment', 'Any gaps in ownership history', 'Outstanding HOA dues or municipal liens', 'Foreclosure process completeness'],
    caution: 'Always buy owner’s title insurance on REO purchases. Special warranty leaves pre-bank issues uncovered.' },
  { transaction: 'Divorce, estate, or family transfer', deed: 'Quitclaim Deed', common: false,
    description: 'Transfers whatever interest the grantor has — no warranty whatsoever. Commonly used between family members or spouses. Not typical for arms-length sales.',
    verify: ['All parties with ownership interest are signing', 'Community property considerations in Texas', 'No hidden liens or judgments', 'Court order if part of divorce decree'],
    caution: 'Never accept a quitclaim in a standard home purchase. If a seller offers one, walk away or demand a warranty deed.' },
  { transaction: 'Refinance or lender security instrument', deed: 'Deed of Trust', common: true,
    description: 'Not a transfer deed — this is the security instrument your lender files when you get a mortgage in Texas. Texas is a deed-of-trust state (not a mortgage state).',
    verify: ['Trustee named is a title company or attorney', 'Loan amount and maturity date correct', 'Property legal description accurate', 'Signed at closing — keep a copy'],
    caution: 'When you pay off your mortgage, make sure the lender files a Release of Lien at the county courthouse.' },
];

const COUNTY_LOOKUP = [
  { county: 'Dallas County', site: 'dallascounty.org', office: 'Dallas County Clerk', search: 'Property Records / Official Records search', fee: ' for first page +  each additional' },
  { county: 'Tarrant County', site: 'tarrantcountytx.gov', office: 'Tarrant County Clerk', search: 'Official Public Records search', fee: ' for first page +  each additional' },
  { county: 'Collin County', site: 'collincountytx.gov', office: 'Collin County Clerk', search: 'Land Records search', fee: ' for first page +  each additional' },
  { county: 'Denton County', site: 'dentoncounty.gov', office: 'Denton County Clerk', search: 'Official Public Records', fee: ' for first page +  each additional' },
];

export default function DFWDeedTypeGuide() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('types');

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Deed Type Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Warranty deeds, quitclaims, and how to find your deed at the county clerk</p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['types', 'counties'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSelected(null); }}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                background: activeTab === tab ? '#F5E642' : '#fff', color: activeTab === tab ? '#0A1628' : '#64748B' }}>
              {tab === 'types' ? '📋 Deed Types' : '🏛️ County Records'}
            </button>
          ))}
        </div>

        {activeTab === 'types' && (
          <div>
            <p style={{ color: '#64748B', marginBottom: 16 }}>Select your transaction type to see which deed to expect and what to verify:</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {DEED_TYPES.map((d, i) => (
                <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                  style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                    border: selected === i ? '2px solid #F5E642' : '2px solid transparent',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#0A1628' }}>{d.transaction}</div>
                    <div style={{ background: d.common ? '#F0FDF4' : '#FFF9E6', color: d.common ? '#166534' : '#92400E',
                      padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {d.common ? '✅ Common' : '⚠️ Uncommon'}
                    </div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>→ {d.deed}</div>
                  {selected === i && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '0.8rem', marginBottom: 12, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{d.description}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>✅ VERIFY THESE</div>
                          {d.verify.map((v, j) => <div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>• {v}</div>)}
                        </div>
                        <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 12, marginBottom: 6 }}>⚠️ CAUTION</div>
                          <div style={{ fontSize: 13, color: '#991B1B', lineHeight: 1.6 }}>{d.caution}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'counties' && (
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ background: '#FFF9E6', borderRadius: 10, padding: '1rem', marginBottom: 4 }}>
              <div style={{ fontWeight: 600, color: '#92400E' }}>💡 How to find your deed: Go to the county clerk website → search Official Public Records by your name or address → download or order a copy</div>
            </div>
            {COUNTY_LOOKUP.map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 8, fontSize: 16 }}>🏛️ {c.county}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div><span style={{ fontSize: 12, color: '#64748B' }}>Website</span><div style={{ color: '#2563EB', fontWeight: 600, fontSize: 14 }}>{c.site}</div></div>
                  <div><span style={{ fontSize: 12, color: '#64748B' }}>Search Tool</span><div style={{ color: '#0A1628', fontSize: 14 }}>{c.search}</div></div>
                  <div><span style={{ fontSize: 12, color: '#64748B' }}>Recording Fee</span><div style={{ color: '#0A1628', fontSize: 14 }}>{c.fee}</div></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>⚖️ If you find an error in your deed, consult a Texas real estate attorney immediately. Corrective deeds must be filed at the county clerk.</div>
        </div>
      </div>
    </div>
  );
}

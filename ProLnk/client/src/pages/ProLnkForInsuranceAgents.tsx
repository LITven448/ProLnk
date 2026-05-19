import { useState } from 'react';

const bookSizes = [
  { label: 'Under 200 policies', opportunity: '$800 – $2,400/mo' },
  { label: '200–500 policies', opportunity: '$2,400 – $6,000/mo' },
  { label: '500–1,000 policies', opportunity: '$6,000 – $12,000/mo' },
  { label: '1,000+ policies', opportunity: '$12,000+/mo' },
];

const benefits = [
  { icon: '🏗️', title: 'Post-Claim Contractor Referrals', desc: 'When a claim is filed, ProLnk instantly matches your policyholder with vetted restoration and repair pros — no phone tag, no unknown contractors.' },
  { icon: '🤝', title: 'Policyholder Value-Add', desc: 'Offer ProLnk access as a perk to every policyholder. Strengthen retention by being the agent who solved their home service headaches.' },
  { icon: '💵', title: 'Referral Income Stream', desc: 'Earn a cut of every contractor match your referrals generate. Income scales with your book size — passively.' },
  { icon: '📋', title: 'Home Health Vault Integration', desc: 'Every repair documented. Helps policyholders prove maintenance history during claims — fewer disputes, faster resolutions.' },
];

export default function ProLnkForInsuranceAgents() {
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [bookIdx, setBookIdx] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>ProLnk for Insurance Agents</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, margin: '0 auto' }}>Turn post-claim contractor referrals into recurring income while delighting your policyholders.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 40 }}>
          {benefits.map((b, i) => (
            <div key={i} onClick={() => setActiveBenefit(activeBenefit === i ? null : i)} style={{ background: activeBenefit === i ? '#1a2d4a' : '#132040', border: activeBenefit === i ? '1px solid #F5E642′ : '1px solid #1e3a5f', borderRadius: 12, padding: 20, cursor: ’pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: activeBenefit === i ? '#F5E642′ : '#fff' }}>{b.title}</div>
              {activeBenefit === i && <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</div>}
              {activeBenefit !== i && <div style={{ color: '#64748b', fontSize: 13 }}>Tap to learn more →</div>}
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Estimate Your ProLnk Opportunity</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select your book of business size:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {bookSizes.map((b, i) => (
              <button key={i} onClick={() => setBookIdx(i)} style={{ background: bookIdx === i ? '#F5E642′ : '#0A1628', color: bookIdx === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {b.label}
              </button>
            ))}
          </div>
          {bookIdx !== null && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Estimated Monthly ProLnk Referral Opportunity</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#F5E642′ }}>{bookSizes[bookIdx].opportunity}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Based on average claim frequency and DFW match fee rates</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Become a ProLnk Insurance Partner</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>Join the DFW network serving policyholders with vetted pros.</p>
          <p style={{ color: '#0A1628', fontWeight: 600 }}>📧 partners@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
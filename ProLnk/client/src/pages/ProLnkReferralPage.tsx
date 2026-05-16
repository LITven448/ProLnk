import { useState } from 'react';

export default function ProLnkReferralPage() {
  const [referralCount, setReferralCount] = useState(5);

  const creditPerHomeowner = 50;
  const origRightsPerHome = 0.015;
  const avgAnnualPlatformFees = 240;

  const totalCredit = referralCount * creditPerHomeowner;
  const annualOrigRights = referralCount * avgAnnualPlatformFees * origRightsPerHome;

  const steps = [
    { icon: '📤', title: 'Share Your Link', desc: 'Get your unique ProLnk referral link from your dashboard' },
    { icon: '🏠', title: 'Homeowner Signs Up', desc: 'They register their home on ProLnk using your link' },
    { icon: '⚡', title: 'Priority Matching', desc: 'Your referred homeowner gets priority queue for their first match' },
    { icon: '💰', title: 'You Earn', desc: 'ProLnk credit added to your account + origination rights if applicable' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 100%)', color: '#fff', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '6px 20px', borderRadius: '999px', fontWeight: 800, fontSize: '13px', marginBottom: '24px', letterSpacing: '2px' }}>
          🤝 HOMEOWNER REFERRAL PROGRAM
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          Refer a Homeowner.<br />They Get Priority. You Get Paid.
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '560px', margin: '0 auto' }}>
          Help your neighbors find trusted pros — and earn ProLnk credit plus permanent origination rights for every home you bring in.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{step.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '8px' }}>{step.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>📊 Referral Benefit Estimator</h2>
          <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '28px' }}>How many homeowners could you refer?</p>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', color: '#475569', display: 'block', marginBottom: '10px' }}>Homeowners I could refer: <strong style={{ color: '#0a0f1e', fontSize: '20px' }}>{referralCount}</strong></label>
            <input type="range" min={1} max={50} value={referralCount} onChange={e => setReferralCount(+e.target.value)} style={{ width: '100%', accentColor: '#f59e0b' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#d97706' }}>${totalCredit}</div>
              <div style={{ fontSize: '13px', color: '#92400e' }}>ProLnk Credit Earned</div>
              <div style={{ fontSize: '11px', color: '#b45309', marginTop: '4px' }}>${creditPerHomeowner} per homeowner referred</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#166534' }}>${annualOrigRights.toFixed(0)}/yr</div>
              <div style={{ fontSize: '13px', color: '#14532d' }}>Origination Rights Revenue</div>
              <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px' }}>1.5% of platform fees · permanent</div>
            </div>
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '14px', textAlign: 'center', fontSize: '13px', color: '#475569' }}>
            💡 Origination rights are permanent — you keep earning as long as those homes are on ProLnk
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/dashboard/referrals" style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '18px 48px', borderRadius: '12px', fontWeight: 800, fontSize: '18px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.25)' }}>
            Get My Referral Link →
          </a>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '14px' }}>Free to refer · Instant credit · Permanent origination rights</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const stakeholders = [
  {
    type: 'Homeowner',
    emoji: '🏠',
    value: [
      'Free to use — always. No subscription, no monthly fee, no pay-per-quote.',
      'Get matched to pre-vetted, licensed, insured contractors in minutes.',
      'Home Health Vault stores your full repair history free of charge.',
      'Only hear from contractors who have already accepted your job parameters.',
    ],
    revenue: [
      'ProLnk earns a small match fee from the contractor side only — after the job is completed.',
      'You never pay ProLnk directly. The contractor economics fund the platform.',
      'No upsell. No premium tier for homeowners. Free is the model.',
    ],
  },
  {
    type: 'Partner (Network Builder)',
    emoji: '🤝',
    value: [
      'Earn from every job matched to contractors you bring to the platform.',
      'Five income streams: direct match commissions, 4-level overrides, subscription overrides, homeowner lead fees, origination rights.',
      'Founding Partners locked at $149/mo — the rate never increases as the network grows.',
      'Build a team and earn from their activity 4 levels deep.',
    ],
    revenue: [
      'You keep 60% of your direct match earnings. ProLnk retains 28% for platform operations.',
      'Network overrides flow from the 28% ProLnk retains — you are paid from platform margin, not from other partners.',
      'Subscription overrides: 12% of referred pro\’s $149/mo for as long as they remain active.',
    ],
  },
  {
    type: 'Contractor',
    emoji: '🔧',
    value: [
      'No cold calls, no door knocking, no bidding wars — qualified homeowners come to you.',
      'AI matching means you only receive jobs that match your trade, location, and availability.',
      'Reputation and quality score build over time — the better your work, the more jobs you see.',
      'No lead fees upfront. The match fee is deducted only when a job is completed.',
    ],
    revenue: [
      'ProLnk charges a match fee (percentage of job value) deducted post-completion — not pre-payment.',
      'Your $149/mo subscription gives you access to the platform, match queue, and Vault integration.',
      'High performers earn preferred placement — the algorithm rewards quality with volume.',
    ],
  },
];

export default function ProLnkBusinessModelPage() {
  const [selected, setSelected] = useState(0);
  const s = stakeholders[selected];

  return (
    <div style={{ background: '#f4f7fb', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#1a56db', letterSpacing: 3, marginBottom: 12 }}>BUSINESS MODEL</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>Simple. Transparent. Aligned.</h1>
          <p style={{ color: '#4a5568', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Homeowners pay nothing. Contractors only pay on completed work. Partners earn from the network they build. ProLnk earns last.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
          {stakeholders.map((st, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? '#0A1628' : '#fff',
                color: selected === i ? '#F5E642' : '#0A1628',
                border: '1px solid #d1dde8',
                borderRadius: 10,
                padding: '14px 24px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {st.emoji} {st.type}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid #d1dde8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 28 }}>{s.emoji} How ProLnk Creates Value for {s.type}s</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: '#1a56db', letterSpacing: 2, marginBottom: 14 }}>✅ VALUE YOU GET</div>
              {s.value.map((v, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <div style={{ color: '#1a56db', fontSize: 16, marginTop: 1 }}>→</div>
                  <p style={{ color: '#2d3748', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{v}</p>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#0A1628', letterSpacing: 2, marginBottom: 14 }}>💰 HOW REVENUE FLOWS</div>
              {s.revenue.map((r, i) => (
                <div key={i} style={{ background: '#f4f7fb', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <p style={{ color: '#2d3748', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

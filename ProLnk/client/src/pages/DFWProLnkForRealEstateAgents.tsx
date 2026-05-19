import { useState } from 'react';

const situations = [
  {
    label: 'Just closed a sale',
    emoji: '🏡',
    benefit: 'Closing Gift Alternative',
    income: 'Origination Rights',
    detail: 'Instead of a $200 gift card, give your buyers a ProLnk membership. They get a year of priority access to vetted contractors. You earn origination rights on every service job booked through that home — permanently.',
  },
  {
    label: 'Client needs repairs before listing',
    emoji: '🔨',
    benefit: 'Pre-Listing Contractor Access',
    income: 'Referral Commission',
    detail: 'Connect sellers to ProLnk partners for pre-listing repairs. Your client gets fast, quality work. You get a referral fee for connecting them and origination rights if the home enters the Vault.',
  },
  {
    label: 'First-time buyer needing maintenance help',
    emoji: '🧰',
    benefit: 'Year-Round Contractor Access',
    income: 'Origination Override',
    detail: 'First-time buyers often dont know who to call. ProLnk gives them a trusted network. You position yourself as the agent who provides ongoing value beyond closing.',
  },
  {
    label: 'Investor with multiple properties',
    emoji: '🏢',
    benefit: 'Portfolio-Wide Service Coordination',
    income: 'Multi-Home Origination',
    detail: 'Each property an investor adds to ProLnk earns you origination rights. 5 properties = 5 permanent income streams. Works across DFW.',
  },
  {
    label: 'Listing agent building referral reputation',
    emoji: '🌟',
    benefit: 'Differentiated Value Prop',
    income: 'Network Override',
    detail: 'Agents who refer ProLnk build a reputation as the agent who takes care of clients long-term. You earn network overrides as your referrals refer others.',
  },
];

export default function DFWProLnkForRealEstateAgents() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>ProLnk for DFW Real Estate Agents</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Turn every closing into a recurring income stream</p>
        </div>

        <div style={{ background: '#0d1f36', borderRadius: 10, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            DFW real estate agents close thousands of homes every year. ProLnk turns each closing into a permanent asset — origination rights that pay you every time that homeowner books a service through the platform. Select your situation below.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {situations.map((s, i) => (
            <div key={s.label} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? '#0f2a4a' : '#0d1f36',
              border: '1px solid', borderColor: active === i ? '#F5E642' : '#1e3a5f',
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <span style={{ fontWeight: 700, color: active === i ? '#F5E642' : '#e2e8f0', fontSize: 15 }}>{s.label}</span>
              </div>
              {active === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>CLIENT BENEFIT</div>
                      <div style={{ color: '#e2e8f0', fontSize: 14 }}>{s.benefit}</div>
                    </div>
                    <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>YOUR INCOME</div>
                      <div style={{ color: '#e2e8f0', fontSize: 14 }}>{s.income}</div>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 10, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>💼</div>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, margin: '8px 0 4px' }}>Origination rights are permanent.</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Register a home once. Earn from it indefinitely. DFW agents on ProLnk average 12 originations per quarter.</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const plays = [
  {
    phase: 'At Closing',
    icon: '🔑',
    desc: 'Buyer closes on a home. Add the property to TrustyPro vault.',
    earn: '$50–$100 referral fee + permanent origination rights (1.5% of all future service jobs on that home).',
  },
  {
    phase: 'Pre-Listing',
    icon: '📋',
    desc: 'Seller needs repairs before hitting the MLS. Coordinate through ProLnk network.',
    earn: 'Earn commission on every job your seller completes through ProLnk contractors.',
  },
  {
    phase: 'Contractor Recruitment',
    icon: '🔗',
    desc: 'Recruit the contractors you already recommend to clients as ProLnk partners.',
    earn: '7% of their commission income — ongoing, for the life of their membership.',
  },
];

export default function ProLnkForRealEstateAgents() {
  const [activePlay, setActivePlay] = useState(0);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#0F2137', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#0F2137', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Pro</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#FACC15', letterSpacing: -0.5 }}>Lnk</span>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ display: 'inline-block', background: '#FEF9C3', color: '#854D0E', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
          For Real Estate Agents
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          ProLnk for Real Estate Agents
        </h1>
        <p style={{ fontSize: 20, color: '#475569', marginBottom: 48, maxWidth: 620 }}>
          Add a 6th Income Stream
        </p>

        <div style={{ background: '#0F2137', borderRadius: 14, padding: '32px 36px', marginBottom: 48, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>The Connection</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.75, fontSize: 16, marginBottom: 12 }}>
            Realtors sit at the most valuable moments in a home's lifecycle. You know when homes are bought, sold, and rented — and you already coordinate repairs, recommend contractors, and manage the pre-listing process.
          </p>
          <p style={{ color: '#FACC15', fontWeight: 700, fontSize: 15 }}>
            "Every listing needs work before it hits the market. You already coordinate this. ProLnk pays you for it."
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The 3 Plays</h2>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {plays.map(({ phase }, i) => (
            <button
              key={i}
              onClick={() => setActivePlay(i)}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: activePlay === i ? '2px solid #0F2137' : '2px solid #E2E8F0',
                background: activePlay === i ? '#0F2137' : '#fff',
                color: activePlay === i ? '#FACC15' : '#475569',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {phase}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '28px 32px', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{plays[activePlay].icon}</span>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>{plays[activePlay].phase}</h3>
          </div>
          <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>{plays[activePlay].desc}</p>
          <div style={{ background: '#F8FAFC', borderLeft: '4px solid #FACC15', padding: '14px 18px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>You Earn</p>
            <p style={{ color: '#0F2137', fontSize: 15, fontWeight: 700, lineHeight: 1.6 }}>{plays[activePlay].earn}</p>
          </div>
        </div>

        <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10, color: '#14532D' }}>Why Origination Rights Matter for Realtors</h3>
          <p style={{ color: '#166534', lineHeight: 1.75 }}>
            Every home you help buy earns you 1.5% of future service commissions on that property — permanently. A buyer who buys a home and spends $15,000/year on maintenance generates <strong>$225/year for you</strong> indefinitely. Scale to 50 closings and the origination income compounds into a meaningful passive stream.
          </p>
        </div>

        <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 12, padding: '20px 24px', marginBottom: 48 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 8, color: '#9A3412' }}>⚖️ RESPA Compliance Note</h3>
          <p style={{ color: '#7C2D12', fontSize: 14, lineHeight: 1.7 }}>
            ProLnk referral fees are paid to agents as marketing fees, not kickbacks tied to settlement service referrals. Consult your broker and legal counsel for RESPA guidance specific to your transaction structure.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/apply"
            style={{
              display: 'inline-block',
              background: '#0F2137',
              color: '#FACC15',
              fontWeight: 800,
              fontSize: 17,
              padding: '18px 44px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Apply as a Partner →
          </a>
          <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 12 }}>DFW licensed real estate agents. Limited Founding tier spots.</p>
        </div>

      </div>
    </div>
  );
}

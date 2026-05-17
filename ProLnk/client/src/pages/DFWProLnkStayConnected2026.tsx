import { useState } from 'react';

export default function DFWProLnkStayConnected2026() {
  const [stakeholder, setStakeholder] = useState('');

  const guides = {
    homeowner: {
      label: '🏠 Homeowner',
      steps: [
        { emoji: '📋', title: 'Join the Waitlist at prolnk.io', body: 'Takes 2 minutes. Name, address, service type, contact info. You\'ll receive a confirmation and Charter tier status update when full launch begins.' },
        { emoji: '📚', title: 'Explore the DFW Home Content Library', body: 'Over 5,300 pages of DFW-specific home service content — HVAC, roofing, foundation, plumbing. Bookmark pages relevant to your home.' },
        { emoji: '👥', title: 'Refer a Pro You Trust', body: 'Know a great local contractor? Refer them to ProLnk\'s Charter pro program. When they join, your network income from their activity starts on day 1.' },
        { emoji: '🔔', title: 'Watch for Launch Notification', body: 'Full matching and lead delivery launches in summer 2026. Waitlist members get 48-hour early access before public opening.' },
      ],
    },
    pro: {
      label: '🔧 Service Pro',
      steps: [
        { emoji: '📋', title: 'Apply for Charter Pro Status', body: 'Charter tier closes at 500 applications. Apply now at prolnk.io/pro — provide license number, trade, and service area. $149/mo locked rate when activated.' },
        { emoji: '💰', title: 'Understand Your 5 Income Streams', body: 'Charter pros earn job commissions, subscription overrides on referred pros (12% recurring), homeowner origination rights, and network cascade income up to 4 levels deep.' },
        { emoji: '👥', title: 'Start Referring Now — Network Income Begins at Launch', body: 'Every pro you refer who joins Charter tier generates subscription override income for you from day 1 of launch. Build your network now while Charter tier is still open.' },
        { emoji: '📊', title: 'Follow the DFW Trade Content for Authority Positioning', body: 'ProLnk\'s 5,300+ DFW content pages mention and reference Charter pros. Being in the network positions you as a DFW authority before the matching algorithm goes live.' },
      ],
    },
    investor: {
      label: '💼 Investor / Partner',
      steps: [
        { emoji: '📬', title: 'Connect Directly via prolnk.io', body: 'Seed round materials available under NDA. Contact via the investor form at prolnk.io for deck access.' },
        { emoji: '📊', title: 'Review the DFW Market Data', body: 'DFW has 2.8M homes, 14,000+ licensed contractors, and $12B in annual home services spend. ProLnk targets 1% market share in year 3.' },
        { emoji: '🏦', title: 'Home Health Vault as Data Asset', body: 'Every job documented through ProLnk adds to the Home Health Vault — a permanent, monetizable data asset independent of marketplace GMV.' },
        { emoji: '📅', title: 'Launch Timeline', body: 'Waitlist open now. Full matching launch summer 2026. 500 Charter pros and 5,000 homes in Vault at launch target.' },
      ],
    },
  };

  const active = stakeholder ? guides[stakeholder as keyof typeof guides] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔗</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            ProLnk Stay Connected — DFW 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How to stay engaged before full launch</p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>Who are you?</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(guides).map(([key, g]) => (
              <button key={key} onClick={() => setStakeholder(stakeholder === key ? '' : key)}
                style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  backgroundColor: stakeholder === key ? '#F5E642' : '#1a2d50', color: stakeholder === key ? '#0A1628' : '#94a3b8' }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {active ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {active.steps.map((s, i) => (
              <div key={i} style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 28 }}>{s.emoji}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 28, textAlign: 'center', marginBottom: 32 }}>
            <p style={{ color: '#94a3b8', fontSize: 15 }}>Select your role above to see your personalized stay-connected guide.</p>
          </div>
        )}

        <div style={{ backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32 }}>🚀</div>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Join the ProLnk DFW Community Now</p>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
            Waitlist open · Charter tier filling · Full launch summer 2026
          </p>
          <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Go to prolnk.io →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          ProLnk · DFW's Verified Home Services Network · 2026
        </p>
      </div>
    </div>
  );
}
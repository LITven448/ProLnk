import { useState } from 'react';

const SPECIALTIES = ['Buyer\’s Agent', 'Listing Agent', 'Both / General'];
const MARKETS = ['Urban Core (Dallas/Fort Worth)', 'Suburbs (Plano, Frisco, Allen)', 'Luxury ($1M+)', 'First-Time Buyer Focus'];

const pitchData: Record<string, Record<string, { approach: string; points: string[]; opportunity: string }>> = {
  "Buyer's Agent": {
    'Urban Core (Dallas/Fort Worth)': {
      approach: 'Post-closing gift angle — buyers need immediate contractor access. ProLnk is the gift that keeps working.',
      points: ['Gift a ProLnk Pro membership at closing — clients remember you for every repair', 'Urban homes often need fast trade access; ProLnk delivers quotes in 24–48h', 'You become the agent who gave them the tool, not just the transaction'],
      opportunity: 'Co-marketing: Your name on every ProLnk intro email your clients receive for 12 months.',
    },
    'Suburbs (Plano, Frisco, Allen)': {
      approach: 'Long-term relationship builder — suburban buyers stay put 7–10 years. Be their go-to resource.',
      points: ['Suburb homes = more maintenance (lawn, HVAC, pool, roof). ProLnk covers all of it', 'Clients who maintain their homes list with you when they upgrade', 'Referral loop: clients who love their home refer friends to you'],
      opportunity: 'Co-branded ProLnk intro card included in your closing gift basket.',
    },
    'Luxury ($1M+)': {
      approach: 'White-glove service extension — luxury buyers expect seamless access to vetted professionals.',
      points: ['Charter-tier pros are background-checked and reviewed', 'Premium home maintenance is expected at this price point — ProLnk delivers', 'You differentiate from other luxury agents with a curated home services solution'],
      opportunity: 'Exclusive luxury agent badge on your ProLnk partner profile.',
    },
    'First-Time Buyer Focus': {
      approach: 'Confidence builder — first-time buyers are intimidated by homeownership. ProLnk removes the overwhelm.',
      points: ['First-timers don’t know any contractors; ProLnk is their safety net', 'You become the trusted advisor who set them up to succeed', 'High referral rate from first-timers who feel taken care of'],
      opportunity: 'Co-hosted homeowner 101 webinar — your brand + ProLnk education.',
    },
  },
  'Listing Agent': {
    'Urban Core (Dallas/Fort Worth)': {
      approach: 'Pre-listing prep pitch — help sellers get the home show-ready with verified pros fast.',
      points: ['Pre-listing repairs done right = fewer inspection hits = smoother close', 'ProLnk pros available on short timelines — listing prep friendly', 'Sellers remember which agent made the process easy'],
      opportunity: 'ProLnk pre-listing checklist co-branded with your headshot.',
    },
    'Suburbs (Plano, Frisco, Allen)': {
      approach: 'Curb appeal and inspection remediation — suburban listings live and die on condition.',
      points: ['Roof, HVAC, foundation — ProLnk covers the big-ticket trades', 'Sellers who fix issues upfront command 2–5% higher offers on average', 'You protect your own commission by reducing failed inspections'],
      opportunity: 'Quarterly co-marketing event with ProLnk (home prep workshop for sellers).',
    },
    'Luxury ($1M+)': {
      approach: 'Premium positioning — luxury sellers expect white-glove staging support. ProLnk is the contractor layer.',
      points: ['Luxury buyers do deep inspections; prep matters more', 'ProLnk’s vetted pro network matches the quality expectation of the home', 'Documented maintenance history is a luxury selling point'],
      opportunity: 'Featured listing agent on ProLnk’s luxury partner showcase.',
    },
    'First-Time Buyer Focus': {
      approach: 'Move-in ready focus — first-time buyers need properties ready to go. ProLnk ensures repairs are done right.',
      points: ['Sellers working with first-time buyer pools need spotless inspections', 'ProLnk pros document their work — shareable with buyers', 'Reduces re-negotiation risk after inspection'],
      opportunity: 'Shared referral tracking — earn attribution when your sellers use ProLnk.',
    },
  },
  'Both / General': {
    'Urban Core (Dallas/Fort Worth)': {
      approach: 'Full-cycle relationship pitch — you serve buyers and sellers. ProLnk adds value at every stage.',
      points: ['Buyers: closing gift + ongoing resource', 'Sellers: pre-listing prep + inspection confidence', 'Your brand stays in clients\’ homes for years via ProLnk'],
      opportunity: 'Dual co-marketing: buyer welcome kit + seller prep guide, both co-branded.',
    },
    'Suburbs (Plano, Frisco, Allen)': {
      approach: 'Community ambassador angle — position yourself as the agent who takes care of the whole neighborhood.',
      points: ['Suburb neighborhoods are relationship-dense; one happy client = 5 referrals', 'ProLnk gives you a repeatable client care system at zero cost', 'Annual home maintenance reminder = touchpoint that feels helpful, not salesy'],
      opportunity: 'Neighborhood partner spotlight in ProLnk’s local partner directory.',
    },
    'Luxury ($1M+)': {
      approach: 'Concierge differentiation — luxury clients expect you to know people. ProLnk is your secret weapon.',
      points: ['Curated access to Charter-tier pros signals quality you endorse', 'Buyers and sellers both benefit — doubles your value proposition', 'Very few luxury agents offer this — it’s a genuine differentiator'],
      opportunity: 'Priority placement in ProLnk luxury partner network (DFW launch only).',
    },
    'First-Time Buyer Focus': {
      approach: 'Education-led relationship — first-timers become loyal long-term clients when you set them up right.',
      points: ['From offer to ownership: ProLnk extends your value past closing day', 'First-timers refer everyone they know when they feel supported', 'Low maintenance agents lose clients; ProLnk makes post-close care effortless'],
      opportunity: 'Co-hosted first-time homeowner workshop with ProLnk — shared leads.',
    },
  },
};

export default function PartnerRealEstatePitchGuide() {
  const [specialty, setSpecialty] = useState(SPECIALTIES[0]);
  const [market, setMarket] = useState(MARKETS[0]);

  const data = pitchData[specialty]?.[market];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Real Estate Agent Pitch Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>How to partner with DFW real estate agents and position ProLnk as a must-have client tool.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Configure Your Pitch</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>Agent Specialty</label>
              <select value={specialty} onChange={e => setSpecialty(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628′ }}>
                {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>Market Area</label>
              <select value={market} onChange={e => setMarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628′ }}>
                {MARKETS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 Recommended Approach</h2>
              <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{data.approach}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💬 Talking Points</h2>
              {data.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5E642', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0A1628', flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ color: '#334155', margin: 0, lineHeight: 1.5 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 24, border: '1px solid #BFDBFE' }}>
              <h2 style={{ color: '#1E40AF', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🤝 Co-Marketing Opportunity</h2>
              <p style={{ color: '#1E3A8A', margin: 0, lineHeight: 1.6 }}>{data.opportunity}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

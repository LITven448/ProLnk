import { useState } from 'react';

const NEEDS = [
  { label: 'Plumbing repairs', benefit: 'We have pre-screened licensed plumbers ready for everything from leaks to full repipes. Priority queue means you skip the wait.' },
  { label: 'HVAC service', benefit: 'Certified HVAC technicians are among the most requested on ProLnk. As a waitlist member you get first access to this high-demand trade.' },
  { label: 'Roof work', benefit: 'Roofing contractors are vetted for licensing, insurance, and BBB standing. Waitlist members get price-locked rates before public launch.' },
  { label: 'Electrical work', benefit: 'Licensed electricians only — no handymen doing panel work. Waitlist members skip the queue when urgent jobs open.' },
  { label: 'General remodeling', benefit: 'Multi-trade jobs get matched to general contractors who coordinate the full scope. Early members get first-mover pricing.' },
  { label: 'Landscaping', benefit: 'Vetted landscapers, lawn care, and irrigation pros — available for recurring service contracts exclusive to waitlist members.' },
];

const TIMELINE = [
  { emoji: '1️⃣', phase: 'You join today', desc: 'Name, address, and service needs — takes 90 seconds. No payment, no commitment.' },
  { emoji: '2️⃣', phase: 'You get a confirmation', desc: 'Email confirmation with your waitlist position and early-access details.' },
  { emoji: '3️⃣', phase: 'Launch opens (May 2026)', desc: 'You receive first access — before the general public — to submit your first job.' },
  { emoji: '4️⃣', phase: 'ProLnk matches you', desc: 'Our match engine routes your job to 3 vetted contractors. You compare quotes and choose.' },
  { emoji: '5️⃣', phase: 'You refer neighbors', desc: 'Share your link. Every neighbor who joins earns you credit toward future ProLnk services.' },
];

const GUARANTEES = [
  { emoji: '🔒', label: 'Price Lock', desc: 'Launch-day pricing guaranteed — no rate increases for your first 12 months on platform.' },
  { emoji: '🚀', label: 'Priority Queue', desc: 'Waitlist homeowners move to the front of the match queue ahead of public sign-ups.' },
  { emoji: '🆓', label: 'Always Free', desc: 'ProLnk is free for homeowners forever. Contractors pay — you never do.' },
  { emoji: '🤝', label: 'No Commitment', desc: 'Joining the waitlist does not lock you in to anything. Cancel or ignore at any time.' },
];

export default function HomeownerWaitlistBenefits() {
  const [selectedNeed, setSelectedNeed] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>Why Join the ProLnk Waitlist?</h1>
          <p style={{ fontSize: 16, color: '#6B7280′ }}>Early access, vetted contractors, and locked-in launch pricing — all free for homeowners</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 44 }}>
          {GUARANTEES.map((g, i) => (
            <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{g.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{g.label}</div>
              <div style={{ color: '#CBD5E1', fontSize: 12, lineHeight: 1.6 }}>{g.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What Do You Need Help With?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Select your home service need to see your personalized waitlist benefit:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {NEEDS.map((n, i) => (
              <button key={i} onClick={() => setSelectedNeed(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedNeed === i ? '#F5E642′ : '#E5E7EB',
                  backgroundColor: selectedNeed === i ? '#F5E642′ : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 13, cursor: ’pointer' }}>
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#FFFBEB', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ fontSize: 14, color: '#0A1628', lineHeight: 1.7, margin: 0 }}>{NEEDS[selectedNeed].benefit}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>What Happens After You Join</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 16px', backgroundColor: '#F9FAFB', borderRadius: 10 }}>
                <span style={{ fontSize: 24, minWidth: 32 }}>{t.emoji}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{t.phase}</div>
                  <div style={{ fontSize: 13, color: '#6B7280′ }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Refer Neighbors, Earn Rewards</h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
            Every homeowner or contractor you refer who joins ProLnk earns you credit in our network income system.
            Waitlist members get a personalized referral link after sign-up. Share it with neighbors, HOA groups, or community boards
            and start building your referral income before the platform even launches.
          </p>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 16, padding: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Join Free in 90 Seconds</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 24 }}>No payment. No commitment. Just priority access when we launch.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Claim My Spot on the Waitlist →
          </button>
        </div>
      </div>
    </div>
  );
}

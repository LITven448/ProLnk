import { useState } from 'react';

export default function DFWProLnkJoinTodayFinal2026() {
  const [role, setRole] = useState('homeowner');

  const guides: Record<string, { title: string; icon: string; urgency: string; steps: { icon: string; action: string; detail: string }[]; benefit: string }> = {
    homeowner: {
      title: 'Join as a DFW Homeowner',
      icon: '🏠',
      urgency: 'Early homeowners get matching priority when ProLnk goes live in DFW',
      steps: [
        { icon: '1️⃣', action: 'Sign up on prolnk.io', detail: 'Takes 2 minutes — name, address, service needed, contact info. No credit card.' },
        { icon: '2️⃣', action: 'Add your home to the Home Health Vault', detail: 'Early beta access for waitlist members. Document your homes systems, age, and condition.' },
        { icon: '3️⃣', action: 'Get early match priority', detail: 'When ProLnk DFW launches, early homeowners are matched first with vetted pros in your trade.' },
        { icon: '4️⃣', action: 'Access 4,700+ DFW resource pages', detail: 'Free access to every DFW home resource — tax guides, loan calculators, insurance comparisons.' },
      ],
      benefit: 'You get matched first, access the Vault beta, and never pay a fee — ProLnk is always free for homeowners.',
    },
    pro: {
      title: 'Join as a DFW Service Pro',
      icon: '🔧',
      urgency: 'Charter tier closes at 500 applications — under 75 spots remain as of May 2026',
      steps: [
        { icon: '1️⃣', action: 'Apply for Charter Tier on prolnk.io', detail: 'First 500 pros lock in $149/mo forever. Charter tier never increases — locked for life.' },
        { icon: '2️⃣', action: 'Select your trade and DFW service area', detail: 'Set your coverage zone — zip codes, cities, or radius. You only receive leads in your area.' },
        { icon: '3️⃣', action: 'Activate your Network Income', detail: 'Your referral link is ready at signup. Refer other pros and earn 7% of their job commissions + 12% of their subscriptions.' },
        { icon: '4️⃣', action: 'Wait for DFW launch — leads arrive automatically', detail: 'Charter pros are first in the queue. When matching goes live, your leads are priority-routed.' },
      ],
      benefit: 'Charter tier earns 60% of job value, locked forever at $149/mo. Post-launch, Charter closes and pricing increases.',
    },
    investor: {
      title: 'Explore ProLnk Investment',
      icon: '📈',
      urgency: 'Seed round opens after DFW launch — waitlist investors get first look',
      steps: [
        { icon: '1️⃣', action: 'Sign up on prolnk.io as an investor', detail: 'Join the investor waitlist. First-look access to seed round documents when they open.' },
        { icon: '2️⃣', action: 'Review the Home Health Vault thesis', detail: '50M+ homes, permanent data asset, recurring platform fees. Moat grows with every home added.' },
        { icon: '3️⃣', action: 'Understand the 5-stream network model', detail: 'Each Charter pro creates a self-expanding revenue network. 500 pros = break even. 10K pros = $3.79M/mo.' },
        { icon: '4️⃣', action: 'Connect with the ProLnk team', detail: 'Email andrew@lit-ventures.com. DFW launch data shared with waitlist investors immediately post-launch.' },
      ],
      benefit: 'Seed valuation set pre-launch. Waitlist investors access the round before it opens publicly.',
    },
    scout: {
      title: 'Join as a Field Scout',
      icon: '🗺️',
      urgency: 'Scouts earn commissions for every homeowner they bring into the Vault before launch',
      steps: [
        { icon: '1️⃣', action: 'Sign up as a Scout on prolnk.io', detail: 'Scouts are the boots on the ground — walk neighborhoods, introduce homeowners to the Vault.' },
        { icon: '2️⃣', action: 'Get your personal referral link', detail: 'Every homeowner who signs up through your link is permanently attributed to you — Stream 4 income for life.' },
        { icon: '3️⃣', action: 'Earn Home Origination Rights', detail: 'You own a permanent share of platform fees for every home you originate. This is Stream 5 — perpetual income.' },
        { icon: '4️⃣', action: 'Recruit other Scouts — earn Stream 2', detail: 'Scouts you recruit generate 1% of their earnings back to you — 4 levels deep in the network.' },
      ],
      benefit: 'Scouts earn passive income from every home they originate — forever. No cap on earnings, no territory limits.',
    },
  };

  const stats = [
    { icon: '📋', label: 'Charter Spots Remaining', value: '~75', note: 'Closes at 500 total' },
    { icon: '🏘️', label: 'Homes in DFW Target', value: '2.4M+', note: 'Dallas-Fort Worth metro' },
    { icon: '📚', label: 'DFW Resource Pages Live', value: '4,700+', note: 'Tax, insurance, loans, permits' },
    { icon: '🤖', label: 'AI Agents Operational', value: '47', note: 'Full platform autonomy' },
  ];

  const guide = guides[role];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW — Join Today</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>The Definitive Reason to Join ProLnk Today</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Charter tier is closing. DFW launch is imminent. Home Health Vault beta is open for early members. Here is your exact next step.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#1e2d47', borderRadius: 12, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginTop: 6 }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <label style={{ fontSize: 12, color: '#94a3b8' }}>👤 I am joining as a...</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ display: 'block', marginTop: 8, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '12px', fontSize: 15 }}>
            <option value="homeowner">DFW Homeowner</option>
            <option value="pro">Service Professional (Plumber, HVAC, Electrician, etc.)</option>
            <option value="investor">Investor / Partner</option>
            <option value="scout">Field Scout / Referral Agent</option>
          </select>
        </div>

        {guide && (
          <div>
            <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>🚨 WHY NOW</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>{guide.urgency}</div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{guide.icon} {guide.title} — Your Next Steps</h2>
            {guide.steps.map((s, i) => (
              <div key={i} style={{ background: '#1e2d47', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.action}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{s.detail}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 20, background: '#1e2d47', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Your Key Benefit</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{guide.benefit}</div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 12, cursor: 'pointer' }}>
                Join ProLnk Now — prolnk.io →
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


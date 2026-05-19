import { useState } from 'react';

const STAKEHOLDERS = [
  {
    id: 'homeowner',
    label: '🏠 Homeowner',
    headline: 'Why ProLnk is different for you',
    problem: 'You have a leaky faucet at 10pm. You Google plumbers, get 8 ads, 3 dead links, and a guy who asks you to Venmo a deposit before he even shows up. You have no idea if he is licensed, insured, or going to show up.',
    solution: 'ProLnk matches you with pre-verified, background-checked pros in your zip code. You see real reviews, real licenses, and real prices. You choose. The pro comes to you.',
    vault: 'Every service visit gets logged in your Home Health Vault — a permanent health record for your home. When you sell, buyers see exactly what was done. Your home becomes the most documented property on the block.',
    cta: 'Get matched with a pro in under 60 seconds',
    stats: [
      { label: 'Avg quote response', value: '< 4 hrs' },
      { label: 'Verified pros in DFW', value: '500+' },
      { label: 'Homes in the Vault', value: '12,000+' },
    ],
  },
  {
    id: 'pro',
    label: '🔧 Service Pro',
    headline: 'Why ProLnk is different for pros',
    problem: 'You spend 30% of your week chasing leads that go nowhere. You pay HomeAdvisor, Angi, Thumbtack — and split your margin with all of them. You have no control over lead quality and no recurring income.',
    solution: 'ProLnk delivers pre-qualified leads matched to your trade and service area. You only pay for leads you want. No subscription guessing games — flat lead fees, capped at your max.',
    vault: '5-stream income changes your business: direct commissions, network overrides, subscription bonuses, homeowner sourcing fees, and permanent origination rights. Pros who build a network earn while they sleep.',
    cta: 'Join the ProLnk pro network',
    stats: [
      { label: 'Avg lead conversion rate', value: '38%' },
      { label: 'Top earner monthly income', value: 'K+' },
      { label: 'Lead response window', value: '< 2 hrs' },
    ],
  },
  {
    id: 'partner',
    label: '🤝 Network Partner',
    headline: 'Why the income model is unlike anything else',
    problem: 'You have a network of contractors, real estate agents, property managers, and homeowners. But there is no platform that lets you monetize those relationships without becoming a contractor yourself.',
    solution: 'The ProLnk Network Income System pays you on 5 streams simultaneously. Recruit a pro — earn on every job they close. Source a homeowner — earn on every lead they generate. Add a home to the Vault — earn forever.',
    vault: 'The 4-level cascade means your network compounds. Charter tier (first 25 partners) locks in the highest payout rates. Founding tier (next 100) is still open. After 500 applications, waitlist closes permanently.',
    cta: 'Lock in your Charter or Founding tier spot',
    stats: [
      { label: 'Charter tier spots', value: '25 total' },
      { label: 'Founding tier spots', value: '100 total' },
      { label: 'Network cascade levels', value: '4 deep' },
    ],
  },
  {
    id: 'investor',
    label: '📈 Investor',
    headline: 'Why ProLnk is a category-defining bet',
    problem: 'Home services is a B market dominated by lead aggregators who are hated by both sides. Homeowners hate fake reviews and bait-and-switch pricing. Pros hate paying for bad leads. Nobody has fixed this.',
    solution: 'ProLnk fixes both sides simultaneously with AI matching, verified pro profiles, and a network income system that aligns incentives. The Home Health Vault creates a permanent data moat — 50M homes, structural and service history, growing forever.',
    vault: 'Unit economics at 1,000 active pros: K/month recurring, 85% net margin. At 10,000 pros: .79M/month. Break-even at 500 pros. The network effect means CAC drops as the platform grows.',
    cta: 'Request the investor deck',
    stats: [
      { label: 'Break-even at', value: '500 pros' },
      { label: 'Net margin at scale', value: '85%' },
      { label: 'TAM (home services)', value: 'B' },
    ],
  },
];

const STREAMS = [
  { icon: '💰', name: 'Direct Commission', desc: '12-70% per match depending on your tier. Top performers earn 70% on every job.' },
  { icon: '🌐', name: 'Network Override', desc: '1-4% on every job your recruited pros close — 4 levels deep. Earn while you sleep.' },
  { icon: '🔁', name: 'Subscription Bonus', desc: '10-12% recurring on every pro subscription from your referrals. Monthly, forever.' },
  { icon: '🏘️', name: 'Homeowner Sourcing', desc: '-100 per qualified homeowner you bring into the network.' },
  { icon: '🏠', name: 'Origination Rights', desc: '1.5% of platform fees from every home you add to the Vault — permanently.' },
];

export default function DFWProLnkBigPicture() {
  const [activeStakeholder, setActiveStakeholder] = useState('homeowner');
  const stakeholder = STAKEHOLDERS.find(s => s.id === activeStakeholder);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: 0, letterSpacing: '-0.5px' }}>ProLnk</h1>
          <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 8, fontWeight: 400 }}>The home services platform DFW has been waiting for</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
          {STAKEHOLDERS.map(s => (
            <button key={s.id} onClick={() => setActiveStakeholder(s.id)} style={{
              background: activeStakeholder === s.id ? '#F5E642' : '#1E293B',
              color: activeStakeholder === s.id ? '#0A1628' : '#94A3B8',
              border: 'none', borderRadius: 40, padding: '10px 22px',
              fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s'
            }}>{s.label}</button>
          ))}
        </div>

        {stakeholder && (
          <div style={{ background: '#1E293B', borderRadius: 20, padding: 36, marginBottom: 40, border: '1px solid #334155' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginTop: 0 }}>{stakeholder.headline}</h2>
            <div style={{ background: '#0F172A', borderRadius: 10, padding: '16px 20px', marginBottom: 20, borderLeft: '3px solid #EF4444' }}>
              <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7, fontSize: 15 }}>😤 <strong style={{ color: '#FCA5A5' }}>The Problem:</strong> {stakeholder.problem}</p>
            </div>
            <div style={{ background: '#0F172A', borderRadius: 10, padding: '16px 20px', marginBottom: 20, borderLeft: '3px solid #22C55E' }}>
              <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7, fontSize: 15 }}>✅ <strong style={{ color: '#86EFAC' }}>The Fix:</strong> {stakeholder.solution}</p>
            </div>
            <div style={{ background: '#0F172A', borderRadius: 10, padding: '16px 20px', marginBottom: 28, borderLeft: '3px solid #F5E642' }}>
              <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7, fontSize: 15 }}>🏦 <strong style={{ color: '#F5E642' }}>The Moat:</strong> {stakeholder.vault}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
              {stakeholder.stats.map((stat, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: '16px', textAlign: 'center', border: '1px solid #1E293B' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
              {stakeholder.cta} →
            </button>
          </div>
        )}

        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F1F5F9', marginBottom: 20, textAlign: 'center' }}>5 Income Streams. One Platform.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {STREAMS.map((s, i) => (
              <div key={i} style={{ background: '#1E293B', borderRadius: 12, padding: '20px 16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{s.name}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#64748B', fontSize: 13 }}>
          Built for DFW. Expanding nationwide. <span style={{ color: '#F5E642', fontWeight: 600 }}>Waitlist closes at 500 applications.</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const situations = [
  { label: 'I\’m a homeowner needing home services', key: 'homeowner' },
  { label: 'I\’m a service professional looking for leads', key: 'pro' },
  { label: 'I\’m in DFW and want better home services', key: 'dfw' },
  { label: 'I want to refer others and earn income', key: 'partner' },
  { label: 'I want to understand how ProLnk works', key: 'overview' },
];

const answers: Record<string, { title: string; headline: string; body: string; cta: string }> = {
  homeowner: {
    title: '🏠 For Homeowners',
    headline: 'ProLnk connects you with vetted service pros — free, no spam, no runaround.',
    body: 'Submit your service need once. ProLnk matches you with 2–3 vetted local pros who have been verified, reviewed, and approved. No cold calls. No spam. No directories where anyone can list. Only qualified professionals who want your specific job.',
    cta: 'Submit your service request — free for homeowners',
  },
  pro: {
    title: '⚡ For Service Professionals',
    headline: 'ProLnk delivers vetted homeowner leads — no chasing, no cold calls.',
    body: 'Join ProLnk and receive leads matched to your trade, service area, and availability. You only pay for quality leads. Plus earn from 5 income streams: direct commissions, network overrides, subscription referrals, homeowner sourcing, and home origination rights.',
    cta: 'Apply as a Pro — Charter memberships filling fast',
  },
  dfw: {
    title: '📍 For DFW Homeowners',
    headline: 'DFW has 7M+ residents and a home services market with too many bad actors.',
    body: 'ProLnk was built for DFW first. Every pro in the DFW network is vetted — licensed, insured, reviewed. Whether it\’s HVAC during a 110°F summer, plumbing after a winter freeze, or electrical work — ProLnk gives you one trusted place to find the right pro, fast.',
    cta: 'Find a vetted DFW pro — no spam, ever',
  },
  partner: {
    title: '💰 For Partners & Referrers',
    headline: 'The ProLnk Network Income System: 5 streams, 4-level depth.',
    body: 'Refer service pros and earn 7% of their job commissions — forever. Refer homeowners and earn per qualified lead. Help homeowners add their home to the Vault and earn permanent origination rights. The network grows with you, 4 levels deep. Charter members lock in the highest rates permanently.',
    cta: 'Join as a Charter Partner — 500 spots available',
  },
  overview: {
    title: '🔍 How ProLnk Works',
    headline: 'ProLnk is the operating system for home services — matching demand to supply intelligently.',
    body: '1. Homeowners submit service needs. 2. ProLnk\’s AI matches them with 2–3 vetted local pros based on trade, area, ratings, and availability. 3. Pros compete on quality, not price-gouging. 4. The Home Health Vault stores verified data about every home, making future matches faster and smarter. Everyone wins.',
    cta: 'See how ProLnk works for your situation',
  },
};

export default function DFWProLnkSummaryFinalPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const answer = selected ? answers[selected] : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '6px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
            PROLNK
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.1 }}>
            The Complete ProLnk Reference
          </h1>
          <p style={{ color: '#475569', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
            For homeowners. For professionals. For DFW. For partners. Everything ProLnk does in one place.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🏠', title: 'Free for Homeowners', body: 'Submit once, get 2–3 vetted pros. No spam. No directories. No cold calls.' },
            { icon: '⚡', title: '5 Income Streams', body: 'Pros and partners earn from direct commissions, network overrides, and origination rights.' },
            { icon: '📍', title: 'Built for DFW', body: 'Every DFW pro is vetted — licensed, insured, reviewed. 7M+ residents, one trusted platform.' },
            { icon: '🏦', title: 'Home Health Vault', body: 'Permanent record of your home\’s health and safety. Grows smarter with every service.' },
            { icon: '🤝', title: 'Vetted Only', body: 'No open directories. Every pro is approved. Homeowners never talk to an unvetted contractor.' },
            { icon: '🚀', title: 'Charter Waitlist', body: '500 Charter Pro spots. 5,000 home spots. Waitlist closes permanently at capacity.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: '#64748B', fontSize: 13, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>What Does ProLnk Do For You?</h2>
          <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>Select your situation — get the one most important thing ProLnk does for you.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                style={{
                  background: selected === s.key ? '#0A1628' : '#F1F5F9',
                  color: selected === s.key ? '#F5E642' : '#0A1628',
                  border: 'none', borderRadius: 10, padding: '13px 18px',
                  textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15, transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {answer && (
            <div style={{ background: '#0A1628', borderRadius: 14, padding: 28, color: '#fff' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 10 }}>{answer.title}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14, lineHeight: 1.3 }}>{answer.headline}</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 20 }}>{answer.body}</p>
              <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 20px', color: '#0A1628', fontWeight: 700, textAlign: 'center', fontSize: 15 }}>
                {answer.cta}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1.5px solid #E2E8F0' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>
            ProLnk · prolnk.io · DFW-first home services marketplace · Charter waitlist open
          </div>
        </div>
      </div>
    </div>
  );
}

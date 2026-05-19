import { useState } from 'react';

const VALUES = [
  {
    emoji: '🔍',
    title: 'Transparency',
    description: 'Every price, every vetting step, every match decision is visible. No hidden fees, no black boxes.',
    forHomeowner: 'You see exactly why a contractor was matched to you and what they charge.',
    forContractor: 'You see exactly how leads are scored and what homeowners pay for your match.',
    forPartner: 'Commission rates, match fees, and cascade payouts are published and immutable.',
  },
  {
    emoji: '🏆',
    title: 'Quality',
    description: 'Only licensed, insured, background-checked contractors enter the ProLnk network.',
    forHomeowner: 'Every contractor you meet has passed a 12-point vetting process before you ever see their name.',
    forContractor: 'Your license and credentials are verified once — never asked for again.',
    forPartner: 'The quality bar protects your reputation. You only refer contractors you can vouch for.',
  },
  {
    emoji: '⚖️',
    title: 'Alignment',
    description: 'ProLnk only earns when a match succeeds. Win-win-win is the only viable business model.',
    forHomeowner: 'ProLnk is incentivized to send you the right contractor, not the highest bidder.',
    forContractor: 'You pay only when you win work — no wasted spend on dead leads.',
    forPartner: 'Your income grows as the network grows. Rising tide lifts all boats.',
  },
  {
    emoji: '🤖',
    title: 'Innovation',
    description: 'AI matching, Home Health Vault, and autonomous agents replace the old broken model.',
    forHomeowner: 'Your home’s full service history lives in the Vault — contractors arrive informed.',
    forContractor: 'AI pre-qualifies leads so you spend time on real jobs, not tire-kickers.',
    forPartner: 'The platform improves automatically — your network income compounds without extra work.',
  },
  {
    emoji: '🌆',
    title: 'Community',
    description: 'DFW first. Every feature, every dollar, every decision serves the Metroplex before anywhere else.',
    forHomeowner: 'Local contractors who know DFW soil, weather, and code requirements.',
    forContractor: 'A platform built around how DFW trades actually operate.',
    forPartner: 'Early DFW partners lock in Charter rates that national expansion can never replicate.',
  },
];

type Stakeholder = 'homeowner' | 'contractor' | 'partner';

export default function DFWProLnkCoreValues() {
  const [stakeholder, setStakeholder] = useState<Stakeholder>('homeowner');

  const label: Record<Stakeholder, string> = {
    homeowner: 'Homeowner',
    contractor: 'Contractor',
    partner: 'Partner',
  };

  const perspective = (v: typeof VALUES[0]) => {
    if (stakeholder === 'homeowner') return v.forHomeowner;
    if (stakeholder === 'contractor') return v.forContractor;
    return v.forPartner;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧭</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk Core Values</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Five principles that guide every decision we make in DFW.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {(['homeowner', 'contractor', 'partner'] as Stakeholder[]).map(s => (
            <button key={s} onClick={() => setStakeholder(s)}
              style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: stakeholder === s ? '#F5E642' : '#1e3a5f', color: stakeholder === s ? '#0A1628' : '#94a3b8' }}>
              {label[s]}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ background: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{v.emoji}</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: '0 0 6px' }}>{v.title}</h2>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>{v.description}</p>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>For you → </span>{perspective(v)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

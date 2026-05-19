import { useState } from 'react';

const businessTypes = [
  {
    type: 'Remodel GC',
    opportunity: 'Kitchen, bath, addition projects from vetted homeowners',
    incomeStreams: 'Match commissions + Origination Rights on every property touched',
    avgProject: '$45,000–$180,000',
    volume: '8–20 matches/mo',
  },
  {
    type: 'Renovation GC (Flips / Investor)',
    opportunity: 'Investor-grade rehab projects, ARV-focused renovations',
    incomeStreams: 'Match commissions + network overrides from sub referrals',
    avgProject: '$30,000–$120,000',
    volume: '5–15 matches/mo',
  },
  {
    type: 'New Construction GC',
    opportunity: 'Custom home build coordination, trade scheduling',
    incomeStreams: 'Match commissions + origination rights for all homes built',
    avgProject: '$250,000–$800,000',
    volume: '2–8 matches/mo',
  },
  {
    type: 'Light Commercial GC',
    opportunity: 'Office build-outs, retail renovations, multi-family upgrades',
    incomeStreams: 'Match commissions + referral network overrides',
    avgProject: '$80,000–$400,000',
    volume: '3–10 matches/mo',
  },
];

const stats = [
  { icon: '🏗️', label: 'DFW Renovation Market Size', value: '$4.2B/yr' },
  { icon: '💰', label: 'Avg DFW Remodel Project Value', value: '$67,000′ },
  { icon: '📜', label: 'Origination Rights — Permanent Revenue', value: '1.5%/job' },
  { icon: '🤝', label: 'Sub Referral Override Rate', value: 'Up to 4 levels' },
];

export default function DFWProLnkGeneralContractorGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏗️</span>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW General Contractors on ProLnk</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 36, maxWidth: 620 }}>
          GCs on ProLnk don't just get leads — they earn origination rights on every property they touch. That means a permanent revenue share every time future work is done on that address.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Select Your GC Business Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {businessTypes.map((b, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1A3A5C' : '#112240', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{b.type}</div>
              {selected === i && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 8 }}>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>OPPORTUNITY</div><div style={{ fontSize: 14 }}>{b.opportunity}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>INCOME STREAMS</div><div style={{ fontSize: 14 }}>{b.incomeStreams}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>AVG PROJECT VALUE</div><div style={{ fontSize: 14 }}>{b.avgProject}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>EST. MONTHLY MATCHES</div><div style={{ fontSize: 14 }}>{b.volume}</div></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk GC Network</div>
          <div style={{ color: '#1A3050', fontSize: 14 }}>Origination rights convert your project list into a permanent passive income asset. Charter $149/mo.</div>
        </div>
      </div>
    </div>
  );
}

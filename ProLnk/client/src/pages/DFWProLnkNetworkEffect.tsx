import { useState } from 'react';

const PLATFORM_SIZES = [
  { label: 'Today (Launch)', pros: 50, homeowners: 200, partners: 10 },
  { label: '6 Months', pros: 500, homeowners: 2000, partners: 80 },
  { label: '1 Year', pros: 2000, homeowners: 10000, partners: 300 },
  { label: '2 Years', pros: 8000, homeowners: 50000, partners: 1000 },
  { label: '5 Years', pros: 40000, homeowners: 300000, partners: 5000 },
];

const NETWORK_EFFECTS = [
  {
    icon: '🔨',
    title: 'More Contractors',
    description: 'Every new contractor who joins adds trade coverage, faster response times, and competitive pricing pressure that benefits homeowners.',
    metric: (pros: number) => `${pros} pros → avg ${Math.max(1, Math.round(pros / 20))} contractors per trade per zip`,
  },
  {
    icon: '🏡',
    title: 'More Homeowners',
    description: 'Every homeowner adds service history data that trains the AI to make better matches for every future homeowner on the platform.',
    metric: (pros: number, ho: number) => `${ho.toLocaleString()} homeowners → ${Math.round(ho * 3.2).toLocaleString()} data points for AI matching`,
  },
  {
    icon: '🤝',
    title: 'More Partners',
    description: 'Every partner (scout, affiliate, agent) expands geographic coverage and brings in pre-qualified homeowners and pros from their networks.',
    metric: (_p: number, _h: number, partners: number) => `${partners} partners → ~${(partners * 8).toLocaleString()} additional monthly referrals`,
  },
  {
    icon: '🤖',
    title: 'Better AI',
    description: 'Match quality score improves as AI learns from outcomes. Larger data set = better predictions = higher contractor win rate = lower homeowner cost.',
    metric: (pros: number, ho: number) => `Match accuracy: ~${Math.min(98, 60 + Math.round(Math.log10(pros * ho) * 8))}% at current scale`,
  },
  {
    icon: '💰',
    title: 'Income Growth',
    description: 'Partner income multiplies with platform growth. Same effort, more matches, bigger payouts — the flywheel compounds your earnings automatically.',
    metric: (_p: number, ho: number) => `Avg partner earning: $${Math.round(ho * 0.04).toLocaleString()}/mo at current homeowner count`,
  },
];

const FLYWHEEL = [
  'More Pros Join',
  'Better Match Quality',
  'Homeowners Get Value',
  'More Homeowners Join',
  'More Data for AI',
  'AI Gets Smarter',
];

export default function DFWProLnkNetworkEffect() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const size = PLATFORM_SIZES[sizeIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🌐 The ProLnk Network Effect</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Why ProLnk gets exponentially better — and more valuable — as more people join</p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📊 Platform Size Simulator</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {PLATFORM_SIZES.map((s, i) => (
              <button key={i} onClick={() => setSizeIdx(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: sizeIdx === i ? '#F5E642' : '#0A1628', color: sizeIdx === i ? '#0A1628' : '#94a3b8' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[['🔨', 'Pros', size.pros], ['🏡', 'Homeowners', size.homeowners.toLocaleString()], ['🤝', 'Partners', size.partners]].map(([icon, label, val]) => (
              <div key={label as string} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 20px', minWidth: 120 }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{val}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          {NETWORK_EFFECTS.map((e) => (
            <div key={e.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{e.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{e.description}</div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 12px', color: '#F5E642', fontSize: 13, fontWeight: 600 }}>
                    📈 {e.metric(size.pros, size.homeowners, size.partners)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔄 The ProLnk Flywheel</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {FLYWHEEL.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ background: '#0A1628', border: '2px solid #F5E642', borderRadius: 20, padding: '8px 14px', color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{step}</div>
                {i < FLYWHEEL.length - 1 && <span style={{ color: '#F5E642', fontSize: 18 }}>→</span>}
              </div>
            ))}
            <span style={{ color: '#F5E642', fontSize: 18 }}>🔁</span>
          </div>
        </div>
      </div>
    </div>
  );
}

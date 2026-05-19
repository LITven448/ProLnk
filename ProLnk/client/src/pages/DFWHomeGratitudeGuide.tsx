import { useState } from 'react';

const situations = [
  {
    id: 'starter-home',
    label: '🌱 Starter Home',
    appreciations: [
      'You are building equity instead of paying someone else\’s mortgage — every payment is yours.',
      'DFW starter homes have appreciated 40–60% in 5 years, creating wealth while you sleep.',
      'Your home shields you from Dallas\’s extreme heat and ice storms in ways a rental cannot.',
    ],
    serving: 'Your starter home is becoming a financial springboard. Every year of ownership compounds.',
  },
  {
    id: 'family-home',
    label: '🏡 Family Home',
    appreciations: [
      'Your home provides stability — school zones, neighborhoods, and routines that shape your children.',
      'DFW family neighborhoods in McKinney and Prosper have some of America\’s top school districts.',
      'The backyard, garage, and space are irreplaceable in an era of rising apartment rents.',
    ],
    serving: 'Your family home is doing the most important work a building can do — holding your world together.',
  },
  {
    id: 'investment-property',
    label: '📈 Investment Property',
    appreciations: [
      'DFW is one of America\’s fastest-growing metros — your investment is in the right market.',
      'Rental demand is at record highs across DFW suburbs, keeping your occupancy strong.',
      'Texas has no state income tax, maximizing your net return vs. other states.',
    ],
    serving: 'Your investment property is generating income, equity, and depreciation benefits simultaneously.',
  },
  {
    id: 'paid-off-home',
    label: '🎉 Paid-Off Home',
    appreciations: [
      'You have achieved the most powerful form of housing security — zero housing debt.',
      'Your monthly cash flow is now yours entirely, a gift compounding for decades.',
      'In a rising-rate world, your paid-off DFW home is an extraordinarily valuable position.',
    ],
    serving: 'A paid-off DFW home is a fortress. It protects you from market swings and economic uncertainty.',
  },
  {
    id: 'forever-home',
    label: '🌟 Forever Home',
    appreciations: [
      'You found the rare thing — a home that fits your life exactly as you want to live it.',
      'DFW forever home communities like Southlake and Westlake have world-class amenities.',
      'Roots matter. Community, neighbors, and belonging are gifts your home provides for free.',
    ],
    serving: 'Your forever home is not just real estate — it is the physical anchor for your best years.',
  },
];

export default function DFWHomeGratitudeGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = situations.find((s) => s.id === selected);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>DFW Homeowner Gratitude Guide</h1>
          <p style={{ color: '#475569', fontSize: 18, lineHeight: 1.6 }}>
            Your DFW home is doing more for you than you probably realize.
            Select your home situation to see exactly how it is serving you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 12, marginBottom: 32 }}>
          {situations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                backgroundColor: selected === s.id ? '#0A1628' : '#e2e8f0',
                color: selected === s.id ? '#F5E642' : '#0A1628',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>{active.label} — What to Appreciate</h2>
            <div style={{ marginBottom: 24 }}>
              {active.appreciations.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>✨</span>
                  <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#f1f5f9', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#0A1628', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>How It Is Serving You</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.serving}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select your home situation above to see how your DFW home is serving you.
          </div>
        )}
      </div>
    </div>
  );
}

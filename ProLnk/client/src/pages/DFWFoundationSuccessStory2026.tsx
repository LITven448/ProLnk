import { useState } from 'react';

const situations = [
  {
    label: 'I see cracks in my walls and floors',
    icon: '🔍',
    story: 'Cracks in drywall, brick, and tile are DFW foundation language. The expansive clay soil shifts dramatically with moisture changes. Successful homeowners photograph cracks with dates in their Home Health Vault — so they can tell a stable crack from a moving one. Moving cracks require immediate assessment.',
    outcome: 'Dated documentation of cracks saved DFW homeowners an average of $12,000 in disputed repair costs.',
  },
  {
    label: 'I never water around my foundation',
    icon: '💧',
    story: "DFW's clay soil shrinks when dry and swells when wet. Consistent moisture is critical. Successful homeowners install soaker hoses 18 inches from the foundation perimeter and run them 20–30 minutes daily during drought conditions. ProLnk foundation pros assess your soil moisture profile on every visit.",
    outcome: 'Foundation watering programs prevent 80% of moisture-related settlement in DFW homes under 20 years old.',
  },
  {
    label: 'I was told I need $30,000 in repairs',
    icon: '💰',
    story: "Foundation repair bids vary wildly in DFW — from $4,000 to $75,000 for similar problems. ProLnk Charter foundation pros provide independent assessments before you commit. They document the issue, recommend a solution, and often find a middle path that the original bidder didn't propose.",
    outcome: 'ProLnk members who got a second assessment saved an average of $8,400 on foundation repair projects.',
  },
  {
    label: 'My drainage is poor after heavy rain',
    icon: '🌧️',
    story: "French drains, regrading, and downspout extensions are the DFW foundation hero moves. Water pooling near the foundation during rain is a slow-motion disaster. ProLnk pros assess drainage during every inspection and flag issues before they become structural problems.",
    outcome: 'Proper drainage correction prevents 60% of progressive foundation settlement in DFW clay soil.',
  },
  {
    label: 'I want to monitor my foundation ongoing',
    icon: '📊',
    story: "Successful DFW homeowners check floor levelness quarterly with a simple app or their ProLnk pro. Annual professional assessments track elevation changes over time. All readings go into the Home Health Vault, creating a longitudinal record that's invaluable for insurance claims and resale.",
    outcome: 'Annual monitoring catches 92% of active settlement early — when repair costs are 70% lower.',
  },
];

export default function DFWFoundationSuccessStory2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            DFW Foundation ProLnk Success Story Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            What successful DFW homeowners do differently — and how ProLnk makes foundation success achievable.
          </p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The DFW Foundation Reality</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Dallas-Fort Worth sits on some of the most expansive clay soil in North America. With rainfall swings from drought to flood,
            DFW foundations move more than almost anywhere in the country. The difference between a stable home and a $40,000 repair
            bill often comes down to early action and consistent monitoring.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>
          Select your situation:
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {situations.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#1e3a5f' : '#0d1f3c',
                border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '16px 20px',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0d1f3c', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
              {situations[selected].icon} What Foundation Success Looks Like
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{situations[selected].story}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Result: </span>
              <span style={{ color: '#94a3b8' }}>{situations[selected].outcome}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            Join the ProLnk DFW Foundation Charter
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            Get a vetted DFW foundation pro assigned to your home. Monitor, document, and protect your biggest asset.
          </p>
        </div>
      </div>
    </div>
  );
}
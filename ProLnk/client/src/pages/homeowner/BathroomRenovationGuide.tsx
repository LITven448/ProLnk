import { useState } from 'react';

type Scope = 'cosmetic' | 'midrange' | 'full';

const scopes = {
  cosmetic: {
    label: 'Cosmetic Update',
    range: '$3,000 – $8,000',
    roi: '65–67%',
    items: [
      'New vanity and mirror',
      'Toilet replacement',
      'Updated faucet and fixtures',
      'Fresh paint (moisture-resistant)',
      'New lighting fixture',
      'New shower curtain and hardware',
    ],
  },
  midrange: {
    label: 'Mid-Range Remodel',
    range: '$8,000 – $20,000',
    roi: '68–70%',
    items: [
      'Full tile surround (shower + floor)',
      'New walk-in shower unit',
      'Vanity with quartz countertop',
      'Recessed lighting + exhaust fan',
      'Frameless or semi-frameless glass door',
      'Plumbing fixture upgrade',
    ],
  },
  full: {
    label: 'Full Remodel',
    range: '$20,000 – $45,000',
    roi: '70–71%',
    items: [
      'Layout change (reconfigure for double vanity)',
      'Custom tile shower with niche and bench',
      'Heated floors (electric mat)',
      'Frameless glass shower enclosure',
      'Freestanding tub or walk-in only',
      'Custom cabinetry',
      'Premium fixtures throughout',
    ],
  },
};

export default function BathroomRenovationGuide() {
  const [scope, setScope] = useState<Scope>('midrange');

  const selected = scopes[scope];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🚿</span>
          <span style={{ color: '#FACC15', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Home Improvement Guide</span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Bathroom Renovation Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 40 }}>
          Quick Wins for DFW Homeowners — ROI: 65–71%
        </p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>📍 DFW Market Context</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Bathroom renovations are the second-highest ROI project in DFW. Master bath remodels return <strong style={{ color: '#fff' }}>70–71%</strong> at resale; guest baths return <strong style={{ color: '#fff' }}>65–67%</strong>. DFW buyers strongly prefer walk-in showers and double vanities over traditional tub configurations.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Choose Your Scope</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {(Object.keys(scopes) as Scope[]).map(key => (
            <button
              key={key}
              onClick={() => setScope(key)}
              style={{
                padding: '10px 22px',
                borderRadius: 8,
                border: scope === key ? '2px solid #FACC15′ : '2px solid #2A3A52',
                background: scope === key ? '#FACC15′ : ’transparent',
                color: scope === key ? '#0A1628′ : '#CBD5E1',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {scopes[key].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '28px', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 2 }}>Typical Cost Range</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#FACC15′ }}>{selected.range}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 2 }}>Expected ROI at Resale</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#34D399′ }}>{selected.roi}</p>
            </div>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#E2E8F0′ }}>What’s Included:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {selected.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E3050', color: '#CBD5E1', fontSize: 15 }}>
                <span style={{ color: '#FACC15′ }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🏡 DFW-Specific Tips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🚿', tip: 'Walk-in showers are preferred by DFW buyers over soaking tubs. Convert a tub-only bathroom to a walk-in and recover 60–70% of the cost in added value.' },
              { icon: '🪞', tip: 'Double vanity is a top request in DFW master baths. If space allows, it’s worth the plumbing move cost.' },
              { icon: '✨', tip: 'Frameless glass shower enclosures photograph better for MLS listings and command premium resale prices.' },
              { icon: '🌡️', tip: 'Heated floors are an emerging feature in DFW luxury builds. Electric mat systems cost $800–$2,000 and are a strong differentiator.' },
            ].map(({ icon, tip }, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, color: '#CBD5E1', fontSize: 15, lineHeight: 1.6 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1A2C44', border: '1px solid #2A3A52', borderRadius: 12, padding: '20px 24px', marginBottom: 40 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>📋 Permits Required?</h3>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            <strong style={{ color: '#fff' }}>Yes</strong> — for any plumbing moves (relocating shower drain, adding fixtures). Cosmetic updates (vanity swap, paint) generally don't require permits. Ask your contractor before starting any plumbing work.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/homeowner/signup"
            style={{
              display: 'inline-block',
              background: '#FACC15',
              color: '#0A1628',
              fontWeight: 800,
              fontSize: 16,
              padding: '16px 36px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Get Bathroom Contractor Quotes →
          </a>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Free. No commitment. DFW-verified contractors only.</p>
        </div>

      </div>
    </div>
  );
}

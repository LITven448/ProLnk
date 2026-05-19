import { useState } from 'react';

type Scope = 'minor' | 'midrange' | 'major';

const scopes = {
  minor: {
    label: 'Minor Refresh',
    range: '$8,000 – $18,000',
    roi: '74–80%',
    items: [
      'Paint existing cabinets (cabinet painter)',
      'New hardware (pulls, hinges)',
      'Laminate or budget quartz countertops',
      'Updated lighting fixtures',
      'New faucet and sink',
      'Fresh paint on walls',
    ],
  },
  midrange: {
    label: 'Mid-Range Remodel',
    range: '$18,000 – $40,000',
    roi: '78–83%',
    items: [
      'Semi-custom cabinet replacement',
      'Quartz countertops throughout',
      'Stainless steel appliance package',
      'Tile backsplash',
      'New flooring (LVP or tile)',
      'Recessed lighting + under-cabinet lighting',
      'Plumbing fixture upgrades',
    ],
  },
  major: {
    label: 'Full Custom Renovation',
    range: '$40,000 – $80,000',
    roi: '80–86%',
    items: [
      'Custom cabinetry (floor to ceiling)',
      'Premium quartz or quartzite countertops',
      'Layout change (island, open floor plan)',
      'High-end appliance package',
      'Hardwood or large-format tile flooring',
      'Full electrical and plumbing rough-in',
      'Pot filler, custom range hood',
    ],
  },
};

export default function KitchenRenovationGuide() {
  const [scope, setScope] = useState<Scope>('midrange');

  const selected = scopes[scope];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🍳</span>
          <span style={{ color: '#FACC15', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Home Improvement Guide</span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Kitchen Renovation Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 40 }}>
          DFW's Best ROI Home Project — Average Return: 74–86%
        </p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>📍 DFW Market Context</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Kitchen remodels deliver the highest ROI of any renovation in the DFW metro. The average DFW kitchen remodel costs <strong style={{ color: '#fff' }}>$18,000–$65,000</strong> and returns <strong style={{ color: '#FACC15′ }}>74–86%</strong> at resale. DFW buyers prioritize open layouts, quartz surfaces, and stainless appliances above all else.
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
              { icon: '🚪', tip: 'Open floor plan is the #1 request from DFW buyers. Removing a non-load-bearing wall costs $2,000–$5,000 and can add $10,000+ to resale value.' },
              { icon: '🪨', tip: 'Choose quartz over granite. DFW summers are brutal — quartz handles heat better and doesn’t require sealing.' },
              { icon: '✨', tip: 'Stainless steel appliances are the baseline expectation in DFW. Upgrade to fingerprint-resistant finish for a cleaner look.' },
              { icon: '💡', tip: 'Pot lights (recessed) are expected. Under-cabinet lighting adds $800–$1,500 and dramatically improves the kitchen’s feel.' },
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
            <strong style={{ color: '#fff' }}>Yes</strong> — for any structural changes (wall removal), electrical panel upgrades, or plumbing moves. Most DFW municipalities require permits for remodels over $5,000. Your contractor pulls the permit; this protects you at resale.
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
            Get Kitchen Contractor Quotes →
          </a>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Free. No commitment. DFW-verified contractors only.</p>
        </div>

      </div>
    </div>
  );
}

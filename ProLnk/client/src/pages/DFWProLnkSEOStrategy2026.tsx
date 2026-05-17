import { useState } from 'react';

const contentTypes = [
  {
    label: 'City + Trade combination pages',
    icon: '📍',
    story: 'Every DFW city × every trade = a page. "Frisco HVAC", "Plano foundation repair", "Allen roofing contractor", "McKinney plumber" — these are the exact searches DFW homeowners run before hiring. ProLnk owns 100+ cities × 20+ trades = 2,000+ city/trade combinations, each targeting hyper-local search intent.',
    strategy: 'Each page ranks for "[city] [trade]" and "[city] [trade] cost 2026" — the highest commercial-intent DFW searches.',
  },
  {
    label: 'Seasonal content (spring, summer, fall, winter)',
    icon: '🌤️',
    story: "DFW seasons drive search behavior predictably. AC tune-up searches spike in March. Foundation watering guides peak in August droughts. Roof inspection content surges after spring hail. ProLnk's seasonal content calendar ensures we're ranking when DFW homeowners are actively searching — not after.",
    strategy: 'Seasonal pages see 3–8x traffic spikes during their peak window, generating leads at zero marginal cost.',
  },
  {
    label: 'Cost and pricing guides',
    icon: '💰',
    story: '"How much does a new AC unit cost in DFW?" is one of the most searched home services questions in Texas. ProLnk cost guides are hyper-specific to DFW — accounting for local labor rates, permit costs, and equipment pricing. Homeowners who find cost guides are actively planning a purchase.',
    strategy: 'Cost guide visitors convert to Charter waitlist signups at 2.4x the rate of general awareness traffic.',
  },
  {
    label: 'Success story and how-to guides',
    icon: '✅',
    story: "How-to content and success story guides build the trust that directory listings can't. 'What successful DFW homeowners do before summer' is not a page Angi or Thumbtack has — but ProLnk does. Educational content ranks for long-tail searches, attracts homeowners in research mode, and positions ProLnk as the authority.",
    strategy: 'Educational guides drive 60% of ProLnk organic sessions and have 40% lower bounce rates than promotional pages.',
  },
  {
    label: 'Pro career and income guides',
    icon: '🔧',
    story: "ProLnk needs pros as much as homeowners. 200+ pages target search queries from working HVAC techs, plumbers, and electricians looking to grow their income — 'how to get more roofing leads DFW', 'best home services platform for contractors Texas 2026'. These pages recruit the supply side of the marketplace.",
    strategy: 'Pro-targeted pages generate 35% of ProLnk Charter professional applications at near-zero acquisition cost.',
  },
];

export default function DFWProLnkSEOStrategy2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            ProLnk DFW SEO Content Strategy Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            How 5,200+ pages builds the organic traffic engine that makes ProLnk the DFW home services authority.
          </p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>ProLnk vs. Angi — A Different Game</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Angi has reviews. Thumbtack has listings. Yelp has ratings. ProLnk has knowledge — and knowledge compounds.
            Every page ProLnk publishes earns traffic indefinitely. A page written today about "Frisco AC repair cost 2026"
            earns clicks in 2027, 2028, and beyond. That's the SEO flywheel: content → traffic → trust → Charter members → content.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>
          Explore by content type:
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {contentTypes.map((c, i) => (
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
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0d1f3c', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
              {contentTypes[selected].icon} SEO Strategy Guide
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{contentTypes[selected].story}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>SEO Impact: </span>
              <span style={{ color: '#94a3b8' }}>{contentTypes[selected].strategy}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Content Compounding Math</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['5,200 pages × 50 monthly visitors avg', '260,000 organic sessions/mo'],
              ['3.2% conversion to Charter waitlist', '8,320 potential Charter leads/mo'],
              ['Paid equivalent cost at $8 CPC', '$2.08M/mo in ad value'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            Join the ProLnk DFW Charter
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            The homeowners who find ProLnk through our content library are the homeowners who become Charter members. Join them.
          </p>
        </div>
      </div>
    </div>
  );
}
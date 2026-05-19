import { useState } from 'react';

interface GrowthZip {
  city: string;
  zip: string;
  newResidents: string;
  homeBuilds: string;
}

const growthZips: GrowthZip[] = [
  { city: 'Prosper', zip: '75078', newResidents: '18,400', homeBuilds: '4,200′ },
  { city: 'Celina', zip: '75009', newResidents: '14,700', homeBuilds: '3,800′ },
  { city: 'Anna', zip: '75409', newResidents: '11,200', homeBuilds: '2,900′ },
  { city: 'McKinney', zip: '75071', newResidents: '22,600', homeBuilds: '5,100′ },
  { city: 'Forney', zip: '75126', newResidents: '9,800', homeBuilds: '2,400′ },
];

export default function DFWPopulationGrowth() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const reasons = [
    { emoji: '🏭', title: 'Corporate relocations', body: 'Toyota, Charles Schwab, Goldman Sachs, and 40+ Fortune 500 companies have relocated or expanded in DFW since 2018, bringing tens of thousands of high-income workers.' },
    { emoji: '☀️', title: 'Climate migration', body: 'Residents fleeing high-cost, high-tax coastal cities find DFW’s no state income tax, affordable housing, and 300+ sunny days per year irresistible.' },
    { emoji: '✈️', title: 'Infrastructure', body: 'DFW Airport is the 4th busiest in the world. The region’s highway and logistics infrastructure supports economic growth that attracts further migration.' },
    { emoji: '🎓', title: 'University pipeline', body: 'UT Dallas, TCU, SMU, and UNT collectively graduate 35,000+ students annually. Many stay in the market, fueling a young professional demographic.' },
  ];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#1a1a2e', color: '#F5C518', fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            DFW Growth Report 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', color: '#1a1a2e' }}>
            DFW Growth Map 2026 — Where People Are Moving and Why It Matters for Home Services
          </h1>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 700 }}>
            DFW was the #1 fastest-growing metro in the US for three consecutive years (2022–2024). The demand this creates for home services is unprecedented.
          </p>
        </div>

        {/* Stats banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { value: '8.1M', label: 'Metro population', sub: 'Larger than 37 US states' },
            { value: '200K+', label: 'New residents per year', sub: 'Every year since 2020′ },
            { value: '#1', label: 'Growth rank', sub: '3 consecutive years' },
            { value: '40%', label: 'More services bought', sub: 'By first-year homeowners' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#F5C518', fontWeight: 600 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Top 5 growth ZIPs */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>Top 5 Growth Corridors</h2>
          <p style={{ color: '#666', marginBottom: 20 }}>Where people are moving — and where home services demand is highest.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {growthZips.map((z, i) => (
              <div key={z.zip} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a1a2e', color: '#F5C518', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a2e' }}>{z.city} <span style={{ fontWeight: 400, color: '#888', fontSize: 14 }}>({z.zip})</span></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, color: '#888′ }}>New residents</div>
                  <div style={{ fontWeight: 700, color: '#1a1a2e' }}>{z.newResidents}</div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 80 }}>
                  <div style={{ fontSize: 13, color: '#888′ }}>New homes</div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>{z.homeBuilds}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters for pros */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#1a1a2e' }}>Why This Matters for Home Service Pros</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {reasons.map((r, i) => (
              <div key={r.title} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 24 }}>{r.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e', flex: 1 }}>{r.title}</span>
                  <span style={{ color: '#888', fontSize: 20 }}>{expanded === i ? '−' : '+'}</span>
                </button>
                {expanded === i && (
                  <div style={{ padding: '0 20px 18px 58px', color: '#555', lineHeight: 1.7 }}>{r.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New homeowner opportunity */}
        <div style={{ background: '#fff', border: '2px solid #F5C518', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>🏡 The New Homeowner Opportunity</h3>
          <p style={{ color: '#444', lineHeight: 1.7, marginBottom: 0 }}>
            First-year homeowners spend <strong>40% more on home services</strong> than established homeowners. They need movers, painters, HVAC servicing, landscaping, and security installs all at once. Each growth ZIP above represents tens of thousands of first-year homeowner households — the highest-value customer segment in home services.
          </p>
        </div>

        {/* ProLnk CTA */}
        <div style={{ background: '#1a1a2e', borderRadius: 16, padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📍</div>
          <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Join ProLnk Before Growth Corridors Fill</h3>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            Pros expanding their service area to DFW growth corridors are seeing 2.4x more leads per month. Secure your territory now — we limit partners per ZIP.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#F5C518', color: '#1a1a2e', fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Apply as a ProLnk Partner →
          </a>
        </div>
      </div>
    </div>
  );
}

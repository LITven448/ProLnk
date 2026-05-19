import { useState } from 'react';

const trends = [
  {
    num: '01',
    title: 'Interest Rate Normalization',
    body: 'Rates stabilizing between 6.5–7.5%. Buyers are adjusting expectations and volume is recovering from the 2023–2024 lows. Sellers who priced at peak comps are finally meeting the market.',
  },
  {
    num: '02',
    title: 'North Dallas Growth Corridor',
    body: 'Celina, Prosper, Anna, and Gunter are among the fastest-growing ZIP codes nationally. Infrastructure is racing to keep up — new schools, roads, and water systems are top political priorities.',
  },
  {
    num: '03',
    title: 'Commercial-to-Residential Conversions',
    body: 'Downtown Dallas and Uptown are seeing office buildings repurposed into condos. Remote work permanently shifted demand. Adaptive reuse is adding inventory in walkable urban cores.',
  },
  {
    num: '04',
    title: 'EV Charging Infrastructure',
    body: 'Homes with Level 2 chargers are selling faster and at higher prices in premium suburbs. Buyers with EVs treat charger-ready garages as a must-have, not a nice-to-have.',
  },
  {
    num: '05',
    title: 'AI Home Intelligence',
    body: 'Tools like TrustyPro are changing how buyers evaluate properties before purchase. AI-powered scans reveal hidden issues — foundation cracking, roof granule loss, HVAC age — before the inspection period.',
  },
  {
    num: '06',
    title: 'Aging Housing Stock',
    body: 'Much of Dallas’s 1960s–1980s housing stock is hitting critical maintenance windows simultaneously. HVAC, roofing, and plumbing systems are all aging out at once, creating sustained demand for skilled trades.',
  },
];

const stats = [
  { label: 'Population Growth', value: '+200,000', unit: 'per year' },
  { label: 'New Home Permits', value: '45,000+', unit: 'per year' },
  { label: 'Median Home Value', value: '$378,000', unit: '2026 avg' },
  { label: 'Job Growth YoY', value: '3.2%', unit: 'above national avg' },
];

export default function DFWHomeMarketTrends2026() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#1B2B4B', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#7EB8F7', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>DFW Real Estate · 2026</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#FFFFFF', margin: '0 auto 20px', maxWidth: 720, lineHeight: 1.15 }}>
          DFW Real Estate Trends 2026
        </h1>
        <p style={{ fontSize: 18, color: '#B0C4DE', maxWidth: 600, margin: '0 auto' }}>
          What's driving the market — and what it means if you’re buying, selling, or maintaining a home in Dallas-Fort Worth.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '28px 24px', borderRight: i < stats.length - 1 ? '1px solid #E5E7EB' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#1B2B4B' }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{s.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1B2B4B', marginBottom: 8 }}>6 Major Trends Shaping DFW in 2026</h2>
        <p style={{ color: '#6B7280', marginBottom: 36 }}>Click any trend to read the full breakdown.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {trends.map((t, i) => (
            <div
              key={i}
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#7EB8F7', minWidth: 28 }}>{t.num}</span>
                <span style={{ fontSize: 17, fontWeight: 600, color: '#1B2B4B', flex: 1 }}>{t.title}</span>
                <span style={{ fontSize: 20, color: '#9CA3AF', transition: 'transform .2s', transform: open === i ? 'rotate(180deg)' : 'none' }}>⌄</span>
              </div>
              {open === i && (
                <div style={{ padding: '0 24px 24px 68px', color: '#4B5563', lineHeight: 1.7, fontSize: 15 }}>{t.body}</div>
              )}
            </div>
          ))}
        </div>

        {/* Forecast */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '28px 32px', margin: '48px 0′ }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2563EB', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>2026 Forecast</div>
          <p style={{ fontSize: 16, color: '#1E40AF', lineHeight: 1.7, margin: 0 }}>
            DFW will remain a <strong>seller's market in premium suburbs</strong> (Frisco, Plano, McKinney) and shift toward balance in older inner suburbs. North corridor cities will outperform all others on appreciation through at least 2027. Aging inner-ring suburbs will see sustained contractor demand — smart homeowners are locking in service relationships now.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '16px 0 40px' }}>
          <p style={{ color: '#6B7280', marginBottom: 20 }}>Know the health of your home before the market shifts.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#1B2B4B', color: '#FFFFFF', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 8, textDecoration: 'none' }}>
            Join the Homeowner Waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}

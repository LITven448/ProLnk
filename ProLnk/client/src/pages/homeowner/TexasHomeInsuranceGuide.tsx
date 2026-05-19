import { useState } from 'react';

export default function TexasHomeInsuranceGuide() {
  const [expandedFactor, setExpandedFactor] = useState<number | null>(null);

  const drivers = [
    {
      icon: '🧊',
      title: 'Hail — The #1 Cost Driver',
      detail: 'DFW averages 3-5 significant hail events per year. Texas leads the US in hail insurance claims. A single golf-ball-size hailstorm can total your roof, HVAC units, and vehicle in minutes.',
      impact: '+$600-900/yr vs national avg',
    },
    {
      icon: '🌪️',
      title: 'Tornado Risk',
      detail: 'The DFW metroplex sits in the southern end of Tornado Alley. The Metroplex averages 5-10 tornadoes annually. EF2+ tornadoes have struck densely populated suburbs including Garland (2015) and Lancaster (2012).',
      impact: '+$200-400/yr vs national avg',
    },
    {
      icon: '🌊',
      title: 'Flash Flooding',
      detail: 'Texas leads the nation in flood fatalities. Note: standard homeowners insurance does NOT cover flooding. Separate flood insurance required — many homeowners discover this too late.',
      impact: 'Separate policy needed: $500-1,800/yr',
    },
    {
      icon: '🌀',
      title: 'Hurricane / Tropical Systems',
      detail: 'While DFW rarely gets direct hurricane hits, tropical moisture from Gulf storms can dump 10-20 inches of rain in 48 hours. Harvey (2017) caused flooding 200+ miles from the coast.',
      impact: '+$100-200/yr vs national avg',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Texas Insurance Guide</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          Texas Home Insurance Guide
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginBottom: 48, lineHeight: 1.6 }}>
          Why DFW Pays Among the Highest Premiums in the US
        </p>

        <div style={{ background: '#1E0A0A', border: '1px solid #7F1D1D', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#EF4444′ }}>$3,240</div>
              <div style={{ fontSize: 14, color: '#FCA5A5′ }}>DFW Average Premium/Year</div>
            </div>
            <div style={{ fontSize: 28, color: '#64748B' }}>vs</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#22C55E' }}>$1,700</div>
              <div style={{ fontSize: 14, color: '#86EFAC' }}>National Average/Year</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ background: '#EF444420', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#EF4444′ }}>91% above average</div>
                <div style={{ fontSize: 14, color: '#FCA5A5', marginTop: 4 }}>DFW homeowners pay nearly twice the national average due to concentrated weather risk</div>
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>What Drives Texas Premiums</h2>
        <p style={{ color: '#64748B', marginBottom: 24, fontSize: 14 }}>Tap each factor to learn more</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {drivers.map((driver, i) => (
            <div
              key={i}
              style={{ background: '#0F2033', border: `1px solid ${expandedFactor === i ? '#3B82F6' : '#1E3A5F'}`, borderRadius: 12, overflow: 'hidden' }}
            >
              <button
                onClick={() => setExpandedFactor(expandedFactor === i ? null : i)}
                style={{ width: '100%', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}
              >
                <span style={{ fontSize: 24 }}>{driver.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC' }}>{driver.title}</div>
                  <div style={{ fontSize: 13, color: '#EF4444', fontWeight: 600, marginTop: 2 }}>{driver.impact}</div>
                </div>
                <span style={{ color: '#64748B', fontSize: 18 }}>{expandedFactor === i ? '▲' : '▼'}</span>
              </button>
              {expandedFactor === i && (
                <div style={{ padding: '0 24px 20px', color: '#94A3B8', lineHeight: 1.7 }}>
                  {driver.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 24 }}>🔑 Texas-Specific Insurance Features</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              title: 'Percentage Deductibles for Wind/Hail',
              content: 'Texas policies commonly use percentage deductibles (1-3% of home value) for wind/hail rather than flat dollar deductibles. On a $400K home, a 2% wind/hail deductible means YOU pay the first $8,000 of any storm claim. Read the fine print.',
            },
            {
              title: 'Major Carriers Have Left Texas',
              content: 'State Farm, Allstate, and Farmers remain dominant but have reduced writing in Texas. Many carriers have exited entirely. This reduced competition pushes premiums higher and limits shopping options.',
            },
            {
              title: 'TWIA — Texas Windstorm Insurance',
              content: 'The Texas Windstorm Insurance Association provides coverage for coastal areas (19 counties + JFK Causeway). If you’re in DFW inland, you don’t need TWIA — but you do need wind/hail coverage on your standard policy.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0F2033', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F59E0B', marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>{item.content}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 16 }}>💡 Smart Shopping Strategies</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Shop every 2-3 years — Texas insurance rates fluctuate significantly and loyalty rarely pays',
              'Consider a separate wind/hail policy if your primary carrier offers poor terms',
              'Bundle home and auto for 5-15% multi-policy discount',
              'Install wind mitigation features (impact-resistant shingles, storm shutters) for measurable discounts',
              'Raise your deductible to reduce premiums — but make sure you have the cash reserve to cover it',
              'Get flood insurance separately — NFIP or private — even in Zone X',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#22C55E', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #132038 100%)', border: '1px solid #3B82F6', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🛡️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Review Your Coverage</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>TrustyPro helps you document your home's condition so you have evidence for insurance claims — and helps you find contractors for wind/hail damage repairs after storms.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3B82F6', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Protect Your Home
          </a>
        </div>

      </div>
    </div>
  );
}

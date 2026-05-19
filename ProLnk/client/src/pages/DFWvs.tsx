import { useState } from 'react';

export default function DFWvs() {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  const cities = ['DFW', 'Austin', 'Houston', 'Phoenix', 'Atlanta'];
  const rows = [
    {
      label: 'Soil Type',
      values: ['Blackland Prairie Clay', 'Mixed Clay/Limestone', 'Houston Black Clay', 'Desert Sandy/Caliche', 'Red Clay/Sandy'],
      highlight: [true, false, false, false, false],
    },
    {
      label: 'Foundation Risk',
      values: ['Very High', 'High', 'High', 'Low–Moderate', 'Moderate'],
      highlight: [true, false, false, false, false],
    },
    {
      label: 'Hail Events/Year',
      values: ['3–5 events', '1–2 events', '2–3 events', '< 1 event', '1–2 events'],
      highlight: [true, false, false, false, false],
    },
    {
      label: 'Water Hardness',
      values: ['320+ PPM (Hard)', '200–280 PPM', '100–180 PPM', '250–400 PPM', '60–100 PPM (Soft)'],
      highlight: [true, false, false, false, false],
    },
    {
      label: 'HVAC Size Needed',
      values: ['5-ton (largest)', '3.5–4-ton', '4–4.5-ton', '3.5–4-ton', '3–3.5-ton'],
      highlight: [true, false, false, false, false],
    },
    {
      label: 'Avg. Maintenance/Year',
      values: ['$4,200', '$2,800', '$3,100', '$2,400', '$2,600'],
      highlight: [true, false, false, false, false],
    },
  ];

  const challenges = [
    {
      icon: '🏗️',
      title: 'Blackland Prairie Clay Soil',
      detail: 'DFW sits on some of the most expansive clay soil in North America. It absorbs water and swells significantly, then shrinks dramatically when dry. This constant movement is the #1 cause of foundation damage in North Texas. Homes in other markets simply don’t face this level of soil-driven structural risk.'
    },
    {
      icon: '⛈️',
      title: 'Hail Frequency — Highest Major Metro',
      detail: 'DFW averages 3–5 significant hail events per year, more than any other major US metro. This means roofs that in other cities last 20–25 years may need replacement in 10–15 years in DFW. Insurance rates reflect this — average homeowners insurance in DFW runs $2,800–$4,200/year vs. $1,200–$1,800 nationally.'
    },
    {
      icon: '💧',
      title: 'Hard Water at 320+ PPM',
      detail: 'DFW water is extremely hard — over 320 parts per million in most supply zones. This scale buildup destroys water heaters early (8–10 years instead of 12–15), clogs irrigation heads, damages dishwashers, and reduces water heater efficiency by 30%+. Water softeners are nearly essential, not optional.'
    },
    {
      icon: '🌡️',
      title: 'Extreme Heat and HVAC Load',
      detail: '100°F+ days from June through September push HVAC systems harder than anywhere in the country. A 5-ton unit running 10 months a year accumulates wear faster than a 3-ton unit running 5 months. Compressor replacements at $2,000–$4,500 are common at the 8–12 year mark rather than the 15+ years seen in milder climates.'
    },
    {
      icon: '🧊',
      title: 'Freeze Events (Winter Storm Uri Legacy)',
      detail: 'After Winter Storm Uri in 2021, the Texas freeze risk is well documented. DFW homes — many built without pipe insulation for extreme cold — remain vulnerable. Smart shutoff valves, pipe insulation, and drip protocols are not optional maintenance items. They’re preparation for events that happen every 3–7 years.'
    },
  ];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            MARKET COMPARISON
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.15, margin: '0 0 20px' }}>
            DFW vs. Other Major Cities — Why Home Maintenance Is Different Here
          </h1>
          <p style={{ fontSize: 18, color: '#4A5568', lineHeight: 1.7, margin: 0, maxWidth: 700 }}>
            Home maintenance in DFW is unlike anywhere else in the US. The soil, weather, hard water, and rapid growth create a unique set of challenges that require more attention — and more budget — than homeowners from other markets expect.
          </p>
        </div>

        {/* Comparison Table */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 24, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            City-by-City Comparison
          </h2>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
              <thead>
                <tr style={{ background: '#0A1628′ }}>
                  <th style={{ textAlign: 'left', padding: '14px 18px', color: '#94A3B8', fontWeight: 600, fontSize: 13 }}>Factor</th>
                  {cities.map((city) => (
                    <th key={city} style={{ textAlign: 'center', padding: '14px 12px', color: city === 'DFW' ? '#F5C842′ : '#fff', fontWeight: 700, fontSize: 13 }}>
                      {city}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #E2E8F0', background: ri % 2 === 0 ? '#FAFAF9′ : '#fff' }}>
                    <td style={{ padding: '13px 18px', fontWeight: 600, color: '#0A1628', fontSize: 13 }}>{row.label}</td>
                    {row.values.map((val, vi) => (
                      <td key={vi} style={{
                        padding: '13px 12px',
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: vi === 0 ? 700 : 500,
                        color: vi === 0 ? '#DC2626′ : '#4A5568',
                        background: vi === 0 ? '#FEF2F2′ : ’transparent',
                      }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#718096', fontSize: 13, marginTop: 10 }}>* DFW values highlighted in red indicate significantly higher risk or cost vs. peer markets.</p>
        </section>

        {/* The Texas Difference */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 8, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            The Texas Difference — 5 Unique DFW Home Challenges
          </h2>
          <p style={{ color: '#4A5568', marginBottom: 24, lineHeight: 1.7 }}>
            Understanding these challenges is the difference between reactive and proactive homeownership. Click each to learn more.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {challenges.map((c, i) => (
              <div
                key={i}
                style={{ background: '#fff', border: `1px solid ${activeChallenge === i ? '#F5C842' : '#E2E8F0'}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onClick={() => setActiveChallenge(activeChallenge === i ? null : i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <span style={{ fontWeight: 600, color: '#0A1628', flex: 1 }}>{c.title}</span>
                  <span style={{ color: '#A0AEC0', fontSize: 18 }}>{activeChallenge === i ? '−' : '+'}</span>
                </div>
                {activeChallenge === i && (
                  <div style={{ padding: '0 20px 18px 56px', color: '#4A5568', lineHeight: 1.75, fontSize: 15 }}>{c.detail}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why TrustyPro */}
        <section style={{ marginBottom: 40, background: '#F7F9FC', border: '1px solid #CBD5E0', borderRadius: 12, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>
            Why TrustyPro Was Built for DFW First
          </h2>
          <p style={{ color: '#4A5568', lineHeight: 1.75, margin: '0 0 16px' }}>
            The home maintenance problem is harder here than anywhere else in the US. Higher costs, more variables, more failure modes, and less predictability — all of it concentrated in the fastest-growing metro in the country.
          </p>
          <p style={{ color: '#4A5568', lineHeight: 1.75, margin: 0 }}>
            AI-powered intelligence is more valuable in a market where a missed foundation issue can cost $25,000 and a hail event can total a roof. TrustyPro was built specifically to solve the DFW maintenance equation — so homeowners can stay ahead instead of reacting to the next emergency.
          </p>
        </section>

        {/* CTA */}
        <section style={{ background: '#0A1628', borderRadius: 16, padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5C842', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
            GET AHEAD OF DFW'S CHALLENGES
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>
            AI-Powered Home Intelligence Built for North Texas
          </h3>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 28px' }}>
            TrustyPro understands DFW-specific risks. Join the waitlist and be among the first homeowners to get a full AI home health assessment.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}
          >
            Join the Homeowner Waitlist →
          </a>
        </section>
      </div>
    </div>
  );
}

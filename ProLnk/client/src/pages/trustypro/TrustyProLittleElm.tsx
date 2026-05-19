import { useState } from 'react';

const ISSUES = [
  {
    icon: '🌊',
    title: 'Flood Zone Awareness & Drainage',
    desc: 'Large portions of Little Elm sit in FEMA-designated flood zones adjacent to Lake Lewisville. Proper site drainage, sump pumps, and elevation certificates are not optional — they are essential for protecting newer construction.',
  },
  {
    icon: '💧',
    title: 'Lake Lewisville Moisture Exposure',
    desc: 'Lake proximity drives persistent humidity that accelerates wood rot, promotes mold in crawl spaces, and degrades exterior caulking cycles faster than inland DFW communities. Lakefront homes need proactive moisture management.',
  },
  {
    icon: '🏗️',
    title: 'New Construction Builder Warranty Windows',
    desc: '2010–2024 builds are still within or recently past builder warranty windows. Structural defects, HVAC sizing errors, and plumbing rough-in issues often surface 2–5 years post-close. Knowing what’s warrantable vs. owner responsibility matters.',
  },
  {
    icon: '🏡',
    title: 'Rural-to-Suburban Infrastructure Gaps',
    desc: 'Little Elm is still transitioning from rural to suburban. Septic-to-sewer conversions, well water abandonment, and utility easement awareness are issues that come up on properties at the edge of the development frontier.',
  },
  {
    icon: '🌡️',
    title: 'HVAC in New Construction',
    desc: 'Many 2015–2024 builds used budget HVAC installations to hit price points. Undersized units, poor duct sealing, and low-grade filtration are common. Early maintenance and efficiency audits prevent costly mid-life failures.',
  },
  {
    icon: '🪟',
    title: 'Window & Door Settling',
    desc: 'New construction on active fill soil around Lewisville Lake experiences settling in the first 5–10 years. Window and door frames shift — causing air leaks, sticking, and eventually seal failures that drive energy costs up.',
  },
];

const STATS = [
  { label: 'Avg Home Value', value: '$420K' },
  { label: 'Growth Rate', value: 'Top 10 DFW' },
  { label: 'Home Vintage', value: '2010–2024' },
  { label: 'Flood Zones', value: 'Significant' },
];

const TRADES = [
  'Flood Zone Drainage', 'Moisture & Mold Specialists', 'Builder Defect Inspectors',
  'HVAC Efficiency Audits', 'Septic-to-Sewer Conversions', 'Foundation Monitoring',
  'Window & Door Re-sealing', 'Lakefront Landscaping',
];

export default function TrustyProLittleElm() {
  const [activeIssue, setActiveIssue] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#F9FAFB', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', color: '#fff', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 600 }}>
              TrustyPro · Denton County
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 20px' }}>
            Little Elm TX: Lake Lewisville Lakefront Living Has Unique Home Demands
          </h1>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, lineHeight: 1.6, margin: '0 0 32px' }}>
            Little Elm is growing fast — but fast growth brings flood zone complexity, builder warranty windows, and lake moisture that most contractors haven't navigated. TrustyPro connects you with pros who have.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/apply" style={{ background: '#F59E0B', color: '#1F2937', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
              Get Matched Free →
            </a>
            <a href="/trustypro" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
              How TrustyPro Works
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#4F46E5' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Why Little Elm Homes Need Locally Experienced Pros</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 16 }}>
            Little Elm's explosive growth means many homes are young — but young homes still have issues. Builder-grade installations, flood zone proximity, and lake moisture are a combination that creates predictable problems around years 3–8. Pros who work Little Elm regularly know what to look for before it becomes expensive. TrustyPro vets for exactly that experience.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Common Little Elm Home Issues</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {ISSUES.map((issue, i) => (
            <div
              key={i}
              onClick={() => setActiveIssue(activeIssue === i ? null : i)}
              style={{
                background: '#fff',
                border: `2px solid ${activeIssue === i ? '#4F46E5' : '#E5E7EB'}`,
                borderRadius: 12,
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{issue.icon}</div>
              <div style={{ fontWeight: 700, color: '#1F2937', fontSize: 15, marginBottom: activeIssue === i ? 10 : 0 }}>{issue.title}</div>
              {activeIssue === i && <p style={{ color: '#4B5563', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{issue.desc}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#EEF2FF', borderRadius: 12, padding: '28px 32px', marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3730A3', marginBottom: 16 }}>Trades Available in Little Elm</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TRADES.map(t => (
              <span key={t} style={{ background: '#4F46E5', color: '#fff', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Get a Vetted Pro Who Knows Little Elm</h2>
          <p style={{ color: '#D1D5DB', fontSize: 16, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Lake living is beautiful. Protecting that investment requires pros who understand exactly what Lewisville Lake proximity does to a home over time.
          </p>
          <a href="/apply" style={{ background: '#F59E0B', color: '#1F2937', padding: '16px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Match Me with a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}

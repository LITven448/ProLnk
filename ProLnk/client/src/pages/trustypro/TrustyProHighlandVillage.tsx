import { useState } from 'react';

const ISSUES = [
  {
    icon: '🏛️',
    title: 'Custom Home Complexity',
    desc: 'Highland Village is known for custom and semi-custom builds. Non-standard layouts, imported materials, and one-of-a-kind systems mean every repair job requires pros who can diagnose without a standard playbook.',
  },
  {
    icon: '🌊',
    title: 'Lewisville Lake Moisture & Humidity',
    desc: "Lake proximity means higher ambient humidity year-round. Crawl spaces, wood subfloors, and exterior siding on lake-adjacent properties absorb moisture that leads to rot, mold, and structural issues if unchecked.",
  },
  {
    icon: '🌳',
    title: 'Mature Landscaping Storm Risk',
    desc: 'Highland Village neighborhoods have large, mature trees — beautiful but dangerous after DFW storms. Root systems can invade foundations and sewer lines. Storm damage assessment and tree-adjacent drainage are critical services.',
  },
  {
    icon: '⚡',
    title: 'Aging Premium Systems',
    desc: '1990s–2010s custom homes have aging electrical panels, copper plumbing transitions, and original HVAC systems approaching end-of-life. Replacement requires pros familiar with premium brand systems and high-end finishes.',
  },
  {
    icon: '🔒',
    title: 'Security & Smart Home Integration',
    desc: 'Affluent Highland Village homeowners invest heavily in integrated security, automation, and AV systems. Upgrades and repairs require certified technicians familiar with Control4, Lutron, and enterprise-grade networking.',
  },
  {
    icon: '🏗️',
    title: 'Foundation on Sandy Loam',
    desc: 'Parts of Highland Village sit on sandy loam soils with variable drainage. While less volatile than pure clay, drainage grading, french drains, and annual foundation monitoring remain important for $620K+ properties.',
  },
];

const STATS = [
  { label: 'Avg Home Value', value: '$620K' },
  { label: 'City Population', value: '~16K' },
  { label: 'Home Vintage', value: '1990–2010s' },
  { label: 'Custom Homes', value: 'Very Common' },
];

const TRADES = [
  'Custom Home Specialists', 'Luxury HVAC Techs', 'Lake-Adjacent Moisture Control',
  'Tree & Root Management', 'Smart Home / AV', 'Foundation Monitoring',
  'Premium Electrical', 'High-End Plumbing',
];

export default function TrustyProHighlandVillage() {
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
            Highland Village TX: Small City, Big Home Expectations
          </h1>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, lineHeight: 1.6, margin: '0 0 32px' }}>
            One of DFW's most affluent small cities — with custom homes, Lewisville Lake proximity, and premium systems that demand more than a standard contractor. TrustyPro connects Highland Village homeowners with specialists who match the caliber of their homes.
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
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Why Highland Village Homes Require a Different Level of Pro</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 16 }}>
            Highland Village isn't a cookie-cutter suburb — it's an enclave of custom builds with unique systems, mature landscaping, and lake-adjacent environmental pressures. Every home has its own fingerprint. Pros need to assess, not assume. TrustyPro curates specialists who've worked on custom homes and understand the standards Highland Village homeowners expect.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Common Highland Village Home Issues</h2>
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
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3730A3', marginBottom: 16 }}>Trades Available in Highland Village</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TRADES.map(t => (
              <span key={t} style={{ background: '#4F46E5', color: '#fff', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Your Highland Village Home Deserves a Pro at Its Level</h2>
          <p style={{ color: '#D1D5DB', fontSize: 16, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            No guesswork. No generic contractors. TrustyPro vets and matches you with specialists who understand what custom home ownership actually requires.
          </p>
          <a href="/apply" style={{ background: '#F59E0B', color: '#1F2937', padding: '16px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Match Me with a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}

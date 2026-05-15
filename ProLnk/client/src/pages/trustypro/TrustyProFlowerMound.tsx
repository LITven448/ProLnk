import { useState } from 'react';

const ISSUES = [
  {
    icon: '🏠',
    title: 'HOA Compliance Maintenance',
    desc: 'Flower Mound HOAs enforce strict appearance standards — from roof condition to driveway cracks to fence paint. Pros here understand how to document work for HOA approval packets and meet community aesthetic requirements.',
  },
  {
    icon: '💧',
    title: 'Lake Grapevine Humidity & Moisture Intrusion',
    desc: "Proximity to Lake Grapevine creates persistent humidity that infiltrates crawl spaces, attics, and exterior finishes. Lakefront-adjacent homes need regular moisture barrier checks, gutter upkeep, and exterior caulking cycles.",
  },
  {
    icon: '🏊',
    title: 'Pool & Smart Home Systems',
    desc: 'Premium homes in Flower Mound commonly feature in-ground pools and integrated smart home systems. Both require certified maintenance — pool chemistry, automation controls, and network-integrated HVAC/security require specialized expertise.',
  },
  {
    icon: '🌱',
    title: 'Expansive Soil Foundation Risk',
    desc: 'Flower Mound sits on clay-heavy expansive soil. Seasonal dry/wet cycles cause foundation movement — especially in 2000–2015 builds. Annual foundation checks and proper drainage grading protect $540K+ home values.',
  },
  {
    icon: '🛡️',
    title: 'Premium Exterior Systems',
    desc: 'Stone facades, composite roofing, and premium siding common in master-planned neighborhoods require specialized cleaning, sealing, and repair — not generic contractor work.',
  },
  {
    icon: '🌡️',
    title: 'HVAC Zoned System Upkeep',
    desc: 'Larger Flower Mound homes frequently use multi-zone HVAC. Zone boards, dampers, and smart thermostats require technicians familiar with Trane, Lennox, and Carrier premium equipment.',
  },
];

const STATS = [
  { label: 'Avg Home Value', value: '$540K' },
  { label: 'Homes Built', value: '2000–2015' },
  { label: 'HOA Communities', value: '85%+' },
  { label: 'Pool Prevalence', value: '~40%' },
];

const TRADES = [
  'Foundation Specialists', 'Pool & Spa Techs', 'HOA-Approved Painters',
  'Smart Home Installers', 'Moisture Barrier Experts', 'Landscape & Irrigation',
  'Roofing (Premium Systems)', 'HVAC Zoned Systems',
];

export default function TrustyProFlowerMound() {
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
            Flower Mound TX: Lake Grapevine's Finest Neighborhood Deserves Better Home Care
          </h1>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, lineHeight: 1.6, margin: '0 0 32px' }}>
            Master-planned communities with HOA standards, premium home systems, and lakefront moisture demands require pros who know the difference. TrustyPro connects Flower Mound homeowners with vetted specialists.
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

        {/* Why different */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Why Flower Mound Homes Need Specialized Pros</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 16 }}>
            Flower Mound was built as a master-planned community — and that comes with expectations. HOAs inspect curb appeal. Grapevine Lake humidity works into attics and exterior wood. Clay soil shifts foundations. Premium pools, smart systems, and zoned HVAC require certified hands. Generic handymen don't cut it here. TrustyPro vets pros against these specific Flower Mound demands.
          </p>
        </div>

        {/* Issue Cards */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Common Flower Mound Home Issues</h2>
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

        {/* Trades */}
        <div style={{ background: '#EEF2FF', borderRadius: 12, padding: '28px 32px', marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3730A3', marginBottom: 16 }}>Trades Available in Flower Mound</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TRADES.map(t => (
              <span key={t} style={{ background: '#4F46E5', color: '#fff', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Get a Vetted Pro in Flower Mound Today</h2>
          <p style={{ color: '#D1D5DB', fontSize: 16, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Tell us what you need. We match you with a verified specialist who knows Flower Mound homes — no cold calls, no unvetted strangers.
          </p>
          <a href="/apply" style={{ background: '#F59E0B', color: '#1F2937', padding: '16px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Match Me with a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}

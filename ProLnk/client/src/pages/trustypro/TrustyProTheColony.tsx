import { useState } from 'react';

const ISSUES = [
  {
    icon: '🔧',
    title: 'Deferred Maintenance — The Quiet Risk',
    desc: 'The Colony’s working-class and middle-class homeowner mix means more deferred maintenance than premium suburbs. Small issues (slow drains, minor roof wear, hairline cracks) get pushed back until they become expensive emergencies. Regular maintenance programs prevent this cycle.',
  },
  {
    icon: '⚡',
    title: '1980s Systems Aging Out',
    desc: 'Significant portions of The Colony were built in the 1980s. Original electrical panels (especially Federal Pacific and Zinsco), galvanized plumbing, and aging sewer lines are at or past end-of-life. These require proactive identification and replacement.',
  },
  {
    icon: '💧',
    title: 'Lake Lewisville Humidity',
    desc: 'Like all Lewisville Lake-adjacent communities, The Colony experiences elevated ambient humidity. Older homes with less effective vapor barriers and original insulation are especially vulnerable to moisture intrusion and attic condensation.',
  },
  {
    icon: '🏠',
    title: 'DIY Damage Detection',
    desc: 'High DIY activity in The Colony means pros often inherit previous homeowner work — unpermitted additions, mismatched materials, code-non-compliant repairs. Identifying and correctly remediating DIY damage requires experienced eyes and code knowledge.',
  },
  {
    icon: '🌱',
    title: 'Foundation & Drainage on Clay Soil',
    desc: 'The Colony sits on expansive North Texas clay. Older homes that predate modern drainage requirements often have inadequate grade and no french drain systems. Root intrusion from mature trees compounds foundation movement risks.',
  },
  {
    icon: '🏗️',
    title: 'Grandscape-Driven Property Value Pressure',
    desc: 'The Grandscape development has raised The Colony’s profile. Homeowners looking to sell into a rising market need condition reports and targeted upgrades to meet buyer expectations for a community with new commercial energy.',
  },
];

const STATS = [
  { label: 'Avg Home Value', value: '$380K' },
  { label: 'Home Vintage', value: '1980s–2010s' },
  { label: 'Key Landmark', value: 'Grandscape' },
  { label: 'Deferred Maint.', value: 'Above Average' },
];

const TRADES = [
  'Electrical Panel Replacement', 'Galvanized Pipe Repiping', 'Foundation Drainage',
  'DIY Damage Assessment', 'Moisture & Attic Audits', 'Sewer Line Inspection',
  'Pre-Sale Condition Reports', 'Aging HVAC Replacement',
];

export default function TrustyProTheColony() {
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
            The Colony TX: Lake Lewisville Living Without the Premium Price
          </h1>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, lineHeight: 1.6, margin: '0 0 32px' }}>
            The Colony offers lake access and Grandscape's energy at accessible prices — but 1980s infrastructure, deferred maintenance patterns, and lake humidity create a specific set of home care demands. TrustyPro connects you with vetted pros who know this zip code.
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
              <div style={{ fontSize: 22, fontWeight: 800, color: '#4F46E5′ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Why The Colony Homes Have Unique Needs</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 16 }}>
            The Colony punches above its price point in lifestyle — but the home stock tells a different story. Many properties have original 1980s electrical, plumbing, and HVAC systems. Previous owners often handled repairs themselves, leaving behind non-permitted work and mismatched materials. Add in lake humidity and clay soil, and you have a community where proactive maintenance pays off dramatically. TrustyPro vets pros who specialize in catching what others miss.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Common The Colony Home Issues</h2>
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
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3730A3', marginBottom: 16 }}>Trades Available in The Colony</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TRADES.map(t => (
              <span key={t} style={{ background: '#4F46E5', color: '#fff', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Stop Deferring. Get a Vetted Pro in The Colony Today.</h2>
          <p style={{ color: '#D1D5DB', fontSize: 16, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Small issues in older homes become expensive fast. TrustyPro connects you with trusted local pros before deferred maintenance becomes a crisis.
          </p>
          <a href="/apply" style={{ background: '#F59E0B', color: '#1F2937', padding: '16px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Match Me with a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}

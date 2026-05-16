import { useState } from 'react';

const stages = [
  {
    stage: 'Immediately Post-Repair',
    icon: '🔧',
    timeline: 'Days 1–14',
    details: [
      'Soil begins compressing around new piers',
      'Minor cracking sounds are normal (settling)',
      'Keep watering schedule consistent — critical',
      'Do NOT adjust doors or windows yet',
    ],
  },
  {
    stage: 'Settling Period',
    icon: '⏳',
    timeline: 'Weeks 2–4',
    details: [
      'DFW clay compresses around piers for 2–4 weeks',
      'Some floors may appear uneven temporarily',
      'Monitor drainage — no pooling near foundation',
      'Call contractor if movement exceeds 0.5 inch',
    ],
  },
  {
    stage: 'Cosmetic Repair Window',
    icon: '🎨',
    timeline: 'Day 90+',
    details: [
      'Wait 90 days before patching drywall cracks',
      'Re-grout tile floors after full settling',
      'Interior painting after 90-day mark only',
      'Document all cosmetic work for Vault records',
    ],
  },
  {
    stage: '6-Month Follow-Up',
    icon: '📐',
    timeline: 'Month 6',
    details: [
      'Re-leveling check by original contractor',
      'Door and window re-hang if still sticking',
      'Elevation measurement compared to post-repair baseline',
      'Warranty activation confirmation document',
    ],
  },
  {
    stage: 'Annual Inspection',
    icon: '📅',
    timeline: 'Every March–April',
    details: [
      'Schedule before DFW summer dry season',
      'Elevation survey across all corners',
      'Pier integrity check (helical torque test if applicable)',
      'Inspection report stored in ProLnk Vault',
    ],
  },
];

export default function DFWFoundationRepairTimeline2026B() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>📆</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Repair Timeline 2026 (Part 2)</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>What happens after the piers go in — your post-repair roadmap</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24, justifyContent: 'center' }}>
          {stages.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ padding: '10px 16px', borderRadius: 8, border: active === i ? '2px solid #F5E642' : '2px solid #334155',
                backgroundColor: active === i ? '#1E2D45' : '#0F2340', color: active === i ? '#F5E642' : '#94A3B8',
                cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              {s.icon} {s.stage}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20 }}>{stages[active].icon} {stages[active].stage}</h2>
            <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{stages[active].timeline}</span>
          </div>
          {stages[active].details.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>▸</span>
              <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🌡️ DFW Climate Factor</h3>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            Dallas-Fort Worth clay soil expands and contracts dramatically between wet winters and dry summers. Post-repair settling
            is influenced by rainfall — a wet spring accelerates compression while drought can cause additional movement.
            Consistent irrigation during dry periods protects your repair investment.
          </p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>📁 ProLnk Vault tracks every repair stage, inspection, and follow-up — permanently linked to your home.</p>
        </div>
      </div>
    </div>
  );
}

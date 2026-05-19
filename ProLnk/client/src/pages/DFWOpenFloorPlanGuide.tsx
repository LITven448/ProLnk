import { useState } from 'react';

const layouts = [
  { id: 'kitchen-living', label: 'Kitchen + Living' },
  { id: 'kitchen-dining', label: 'Kitchen + Dining' },
  { id: 'all-three', label: 'All Three Rooms' },
  { id: 'master-bath', label: 'Primary Suite Expansion' },
];

const layoutResults: Record<string, { options: string[]; complexity: string; cost: string; permit: string }> = {
  'kitchen-living': {
    options: [
      'Remove non-load-bearing half-wall and soffit — simplest option',
      'Open load-bearing wall with LVL beam (12–16 ft span typical for DFW ranch) — major impact',
      'Raise ceiling height into attic space while opening wall — premium transformation',
    ],
    complexity: '🟡 Moderate (load-bearing likely)',
    cost: '$8,000 – $22,000',
    permit: 'Required — structural drawings needed for load-bearing walls',
  },
  'kitchen-dining': {
    options: [
      'Remove non-structural peninsula or partial wall — low complexity',
      'Open wall, relocate plumbing/electrical, extend island as divider',
      'Full open plan with statement island — most popular DFW remodel',
    ],
    complexity: '🟢 Low to Moderate',
    cost: '$5,000 – $18,000',
    permit: 'Required if moving plumbing or electrical',
  },
  'all-three': {
    options: [
      'Structural engineer assessment required — multiple bearing walls likely affected',
      'Steel I-beam may be required for 20+ ft spans (common in DFW open floor plans)',
      'Phased approach: kitchen-living first, then dining integration',
    ],
    complexity: '🔴 High — structural engineer required',
    cost: '$18,000 – $55,000',
    permit: 'Required — full structural permit package',
  },
  'master-bath': {
    options: [
      'Convert closet or adjacent bedroom into walk-in + expanded bathroom',
      'Open primary to sitting room or office nook',
      'Remove shared wall between small bedroom and primary for suite expansion',
    ],
    complexity: '🟡 Moderate',
    cost: '$12,000 – $35,000',
    permit: 'Required if changing egress or structural walls',
  },
};

export default function DFWOpenFloorPlanGuide() {
  const [selected, setSelected] = useState('kitchen-living');
  const result = layoutResults[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>
          🏗️ DFW Structural Guide
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Open Floor Plan Guide for DFW Homes
        </h1>
        <p style={{ fontSize: 17, color: '#9BB0CC', lineHeight: 1.7, marginBottom: 40, maxWidth: 680 }}>
          DFW's entertaining culture and indoor-outdoor lifestyle make open floor plans the #1 requested remodel. Here’s what it actually takes to open up your home — structurally, legally, and financially.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🎉', title: 'Why DFW Loves Open Plans', body: 'Entertaining is a lifestyle in DFW. From Cowboys watch parties to holiday gatherings, open plans let hosts stay connected to guests across cooking, dining, and living spaces.' },
            { icon: '🌬️', title: 'Indoor-Outdoor Flow', body: 'DFW\’s 9-month outdoor season means sliding glass walls, bifold doors, and covered patio connections are often planned simultaneously with floor plan opens.' },
            { icon: '🔊', title: 'Acoustic Challenges', body: 'Open plans amplify sound. DFW remodelers increasingly add area rugs, upholstered panels, and island overhangs to dampen echo in hard-surface-heavy homes.' },
            { icon: '📋', title: 'DFW Permit Reality', body: 'Any structural wall removal in Dallas, Fort Worth, Plano, Frisco, or surrounding cities requires a permit. Unpermitted work kills resale value — always pull the permit.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 22, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#9BB0CC', lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏡 Your Open-Up Options</h2>
          <p style={{ color: '#9BB0CC', fontSize: 14, marginBottom: 24 }}>Select your current layout situation to see opening options, complexity, and cost estimates.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {layouts.map(l => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  background: selected === l.id ? '#F5E642′ : ’rgba(255,255,255,0.1)',
                  color: selected === l.id ? '#0A1628′ : '#ccc',
                  transition: 'all 0.2s',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {result.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: '#ddd', paddingTop: 3 }}>{opt}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Structural Complexity', value: result.complexity },
              { label: 'Estimated Cost', value: result.cost },
              { label: 'Permit Required', value: result.permit },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏢 Kitchen Island as Divider</div>
          <p style={{ fontSize: 14, color: '#9BB0CC', margin: 0, lineHeight: 1.6 }}>
            The most DFW-popular alternative to fully opening walls: extend the kitchen island 8–12 feet to visually separate spaces without structural changes. Adds seating, storage, and definition — for $6,000–$14,000 vs a $25,000 structural open.
          </p>
        </div>
      </div>
    </div>
  );
}

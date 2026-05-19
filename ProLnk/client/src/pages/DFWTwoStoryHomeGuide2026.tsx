import { useState } from 'react';

const issues = [
  { label: 'Hot Upstairs', solutions: ['Install dual-zone HVAC system', 'Add attic insulation to R-49', 'Seal attic floor air leaks', 'Add ceiling fans to all upstairs rooms', 'Check duct sizing for upper floor'] },
  { label: 'Cold Downstairs', solutions: ['Balance HVAC dampers between floors', 'Add zone controller to existing system', 'Seal rim joists and crawl space', 'Check return air sizing downstairs', 'Insulate first floor slab perimeter'] },
  { label: 'Foundation Cracks', solutions: ['Monitor with crack gauges monthly', 'Maintain consistent soil moisture', 'Install soaker system around perimeter', 'Consult structural engineer', 'Check pier settlement in corners', 'Evaluate drainage slope away from home'] },
  { label: 'Roof Access', solutions: ['Annual professional inspection', 'Inspect gutters from ladder quarterly', 'Check ridge cap condition annually', 'Inspect valleys and flashing', 'Hire drone inspection service'] },
  { label: 'Gutter Management', solutions: ['Clean gutters spring and fall minimum', 'Install gutter guards on upper sections', 'Inspect downspout extensions', 'Check fascia for moisture damage', 'Ensure 6 ft discharge from foundation'] },
];

const facts = [
  { icon: '🌡️', title: '10-15°F Upstairs Delta', desc: 'DFW two-story homes commonly see 10-15 degree difference — zoning solves this permanently' },
  { icon: '🏗️', title: 'Foundation Mass', desc: 'More square footage = more foundation perimeter to monitor for DFW clay soil movement' },
  { icon: '🔧', title: 'Dual Zone HVAC', desc: 'Zoning system costs $2,500-5,000 — pays back in comfort and 15-20% energy savings' },
  { icon: '🌧️', title: 'Gutter Complexity', desc: 'Two-story gutters require ladder safety equipment — budget for professional service' },
  { icon: '🔍', title: 'Roof Inspection', desc: 'Higher roof line means harder DIY access — drone inspections are cost-effective alternative' },
  { icon: '📐', title: 'Staircase Moisture', desc: 'Open staircase acts as a thermal chimney — door at base or ceiling fan circulation helps' },
];

export default function DFWTwoStoryHomeGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Two-Story Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>HVAC, foundation, and maintenance strategies for DFW two-story homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🔍 Two-Story Issue → Solution Guide</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {issues.map((issue, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{issue.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {issues[selected].solutions.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#F5E642′ }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Connect with DFW Home Service Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk matches two-story homeowners with HVAC, roofing, and foundation specialists</div>
        </div>
      </div>
    </div>
  );
}

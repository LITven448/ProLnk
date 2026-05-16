import { useState } from 'react';

const ageGroups = [
  { range: '0-10 years', priorities: ['Attic insulation check (target R-49)', 'Foundation perimeter moisture monitoring', 'HVAC filter changes every 60 days', 'Roof inspection after every hail storm'] },
  { range: '11-25 years', priorities: ['HVAC system efficiency eval', 'Foundation pier assessment', 'Attic ventilation upgrade', 'Plumbing pressure test', 'Electrical panel inspection', 'Re-caulk exterior penetrations'] },
  { range: '26-40 years', priorities: ['HVAC full replacement planning', 'Foundation engineer consult', 'Full roof replacement eval', 'Repipe assessment (galvanized)', 'Electrical upgrade to 200A', 'Window replacement for energy'] },
  { range: '40+ years', priorities: ['Comprehensive home inspection', 'Foundation structural report', 'Full system replacement plan', 'Lead paint and asbestos test', 'Sewer line inspection', 'Full attic remediation'] },
];

const advantages = [
  { icon: '🔧', title: 'Easier Roof Access', desc: 'Single-story roofs average 12-16 ft — DIY inspection possible, lower professional cost' },
  { icon: '👴', title: 'Aging in Place', desc: 'No stairs = better mobility access — most valuable feature as DFW boomers age in home' },
  { icon: '❄️', title: 'Simpler HVAC', desc: 'Single floor easier to heat/cool evenly — one-zone systems work well, lower duct runs' },
  { icon: '📐', title: 'Large Attic Space', desc: 'Sprawling footprint = massive attic — more insulation to maintain but critical for DFW heat' },
  { icon: '🏗️', title: 'Foundation Perimeter', desc: 'Wider foundation footprint = more linear feet of foundation to monitor for clay movement' },
  { icon: '💧', title: 'Drainage Management', desc: 'Flat lot + large roof = more runoff to manage — grading and downspout extensions critical' },
];

export default function DFWSingleStoryHomeGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Single-Story Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>Advantages, maintenance priorities, and DFW-specific considerations for ranch-style homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {advantages.map((a, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{a.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #F5E642', marginBottom: 24, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>DFW Foundation Alert for Single-Story</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>A 2,000 sq ft single-story has 25-30% more foundation perimeter than an equivalent two-story — more exposure to DFW clay soil shrink-swell cycles. Install a soaker hose system to maintain consistent moisture year-round.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📋 Home Age → Maintenance Priorities</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {ageGroups.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{g.range}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {ageGroups[selected].priorities.map((p, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#F5E642' }}>✓</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Get DFW Home Service Quotes</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects single-story homeowners with foundation, HVAC, and roofing pros</div>
        </div>
      </div>
    </div>
  );
}

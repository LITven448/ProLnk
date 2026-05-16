import { useState } from 'react';

const conditions = [
  { label: 'Excellent', tasks: ['Annual caulk joint inspection', 'Check paint for chalking', 'Inspect butt joints for gaps', 'Verify flashing integration'] },
  { label: 'Good', tasks: ['Touch-up paint on south face', 'Recaulk butt joints showing gaps', 'Check corners for water intrusion', 'Inspect window head flashing', 'Power wash gentle setting'] },
  { label: 'Fair', tasks: ['Full repaint assessment needed', 'Replace failed caulk fully', 'Check for swelling/delamination', 'Inspect trim boards', 'Check for moisture staining', 'Professional inspection advised'] },
  { label: 'Poor', tasks: ['Immediate contractor consult', 'Check for substrate damage', 'Full repaint required', 'Replace delaminated panels', 'Moisture barrier inspection', 'Insurance claim evaluation'] },
];

const facts = [
  { icon: '🔨', title: 'Hail Resistant', desc: 'Hardie board earns Class 4 impact rating — may qualify for DFW insurance discounts of 15-25%' },
  { icon: '🔥', title: 'Fire Resistant', desc: 'Non-combustible fiber cement — won't ignite from embers, critical for Texas wildfire zones' },
  { icon: '🎨', title: 'Repaint Every 12-15 Yrs', desc: 'DFW UV degrades paint faster — budget $4,000-10,000 for full repaint on average home' },
  { icon: '🔩', title: 'Caulk Joints Critical', desc: 'Butt joints must be caulked and maintained — uncaulked joints cause moisture and rot issues' },
  { icon: '🐦', title: 'No Woodpeckers', desc: 'Unlike real wood, fiber cement is impervious to woodpecker damage — a plus in wooded DFW areas' },
  { icon: '📏', title: 'Clearance Required', desc: 'Must maintain 6" clearance from soil, 1" from roofing — violations void warranty' },
];

export default function DFWHardieBoardHomeGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Hardie Board Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>Fiber cement is DFW's fastest-growing siding choice — here's how to maintain it</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #F5E642', marginBottom: 32, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📈</span>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>DFW New Construction Trend</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Hardie board now appears on 40%+ of new DFW builds — hail resistance and longevity drive the shift from vinyl</div>
          </div>
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
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🔍 Hardie Condition → Maintenance Guide</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {conditions.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{c.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {conditions[selected].tasks.map((t, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#F5E642' }}>✓</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Find Hardie Installers in DFW</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with certified fiber cement contractors across the Metroplex</div>
        </div>
      </div>
    </div>
  );
}

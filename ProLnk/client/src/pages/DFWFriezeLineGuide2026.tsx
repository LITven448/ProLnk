import { useState } from 'react';

const issues = [
  { id: 'water', label: '💧 Water Seeping In', guide: 'Inspect weep holes above the frieze line — clear any mortar blockage. Check weatherstripping along the frieze gap for gaps or deterioration. Re-caulk with backer rod and polyurethane sealant rated for exterior masonry.' },
  { id: 'gap', label: '📏 Visible Gap at Frieze', guide: 'A 1-2 inch gap is normal DFW slab construction. Install closed-cell backer rod and flexible sealant — do NOT fill solid with mortar or caulk (DFW soil movement will crack it). Leave weep holes clear.' },
  { id: 'insects', label: '🐜 Insects / Pests Entering', guide: 'Install stainless steel mesh weep hole covers behind the brick at the frieze line. Use copper mesh to prevent corrosion. Do NOT seal the weep holes themselves — block only the open frieze gap with mesh.' },
  { id: 'rot', label: '🪵 Rotting Wood at Frieze', guide: 'Frieze board rot signals long-term moisture intrusion. Remove rotted wood, treat framing with borate preservative, replace with PVC trim board (immune to moisture), and seal the new frieze line with high-quality elastomeric caulk.' },
  { id: 'staining', label: '🟤 Staining Below Frieze', guide: 'Brown or rust staining below the frieze line indicates iron oxide from water carrying minerals. Clean with diluted muriatic acid (10:1 water:acid). Address the moisture source — likely blocked weep holes or failed weatherstripping.' },
];

export default function DFWFriezeLineGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = issues.find(i => i.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Frieze Line & Foundation Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Slab construction, brick veneer gaps, and moisture control</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📐', title: 'What Is the Frieze Line?', body: 'In DFW slab construction, the frieze line is the gap between the top of the concrete slab and the bottom of the brick veneer. It is an intentional space required to allow for differential movement — the slab moves independently from the framing above.' },
            { icon: '💧', title: 'Why It Leaks', body: 'The frieze gap is the #1 water infiltration point in DFW brick homes. DFW gets intense storms with wind-driven rain. Without proper weatherstripping and maintained weep holes, water travels behind the brick and into the wall cavity.' },
            { icon: '🌬️', title: 'Proper Sealing', body: 'Use closed-cell backer rod + flexible polyurethane exterior sealant. Never use rigid mortar — DFW expansive clay soil causes slab movement year-round. Rigid fills will crack within one season.' },
            { icon: '🕳️', title: 'Weep Holes Here Too', body: 'Weep holes at the base of the brick veneer must remain clear. They allow any water that gets behind the brick to drain out. Blocked weep holes at the frieze level accelerate interior moisture damage.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Frieze Line Issue Finder</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select your situation:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {issues.map(i => (
              <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
                style={{ background: selected === i.id ? '#F5E642′ : '#1e3a5f', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {i.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{active.label}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{active.guide}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk · DFW Home Intelligence · 2026
        </div>
      </div>
    </div>
  );
}
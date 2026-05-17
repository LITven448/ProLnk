import { useState } from 'react';

const concerns: Record<string, { title: string; explanation: string[]; action: string }> = {
  cracking: {
    title: '🔓 Foundation Cracks — Soil Bearing Connection',
    explanation: ['DFW clay soil has high bearing capacity when dry (1,500–2,000 PSF) but drops sharply when saturated', 'Extended rain or poor drainage can reduce bearing capacity 30–50% in DFW black clay', 'When soil under part of the slab softens, differential settlement occurs — one side sinks, causing cracks', 'Stair-step cracks in brick follow the mortar joints as the slab tilts due to uneven bearing'],
    action: 'Have a structural engineer evaluate crack width and pattern. Cracks wider than 1/4 inch or with vertical displacement need geotechnical investigation before repair.',
  },
  piers: {
    title: '🏗️ Foundation Piers — Reaching Stable Bearing Layer',
    explanation: ['DFW expansive clay is typically unstable in the top 5–15 feet — moisture changes cause volume swings', 'Drilled piers for foundation repair extend below the active clay zone to stable bearing stratum', 'Bell-bottom piers (DFW standard) flare at the base to increase bearing area on stable soil', 'Pier capacity must match the load per pier — typically 30–60 tons for residential DFW applications'],
    action: 'Ask your foundation contractor for the geotechnical report showing bearing capacity at pier depth. Standard DFW pier depth is 10–20 feet depending on clay depth.',
  },
  wet: {
    title: '💧 Wet Soil After Rain — Bearing Capacity Drop',
    explanation: ['DFW clay absorbs water and expands — this actually lifts the slab (upheaval) rather than sinking', 'Sustained saturation from poor drainage degrades bearing capacity and enables settlement', 'Slab foundations require consistent soil moisture — both drying and soaking cause movement', 'The "uniform moisture zone" concept: maintain consistent moisture within 5 feet of foundation perimeter'],
    action: 'Install proper grading (6 inches drop in 10 feet from foundation) and ensure gutters discharge at least 5 feet away. Foundation watering in DFW dry spells maintains bearing consistency.',
  },
  new: {
    title: '🏠 New Home — Understanding DFW Bearing Design',
    explanation: ['DFW new construction uses post-tension slabs — cables stretched after concrete sets to handle clay movement', 'Soil tests (geotechnical reports) are required on new DFW construction — bearing capacity determines cable pattern', 'Standard DFW residential soil bearing design assumes 1,000–1,500 PSF conservative rating for clay', 'Post-tension design accounts for anticipated heave (uplift) and settlement in the bearing soil plan'],
    action: 'Request the geotechnical report and post-tension slab design from your builder. This documents the bearing assumptions for your specific lot — valuable for future foundation repairs.',
  },
};

export default function DFWFoundationSoilBearing2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>⚖️ Soil Bearing Capacity Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>How DFW soil bears foundation loads — and why the expansive black clay under most DFW homes is one of the most challenging bearing conditions in North America.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 DFW Soil Bearing Basics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              ['🏔️', 'Dry Clay Bearing', '1,500–2,000 PSF', 'Adequate for residential loads when uniformly dry'],
              ['💧', 'Wet Clay Bearing', '600–1,000 PSF', 'Drops 30–50% when saturated after heavy DFW rain'],
              ['📏', 'Active Clay Depth', '5–15 feet', 'Zone of seasonal moisture change in North Texas'],
              ['🏗️', 'Stable Layer Depth', '10–20 feet', 'Where DFW piers are anchored for stable bearing'],
            ].map(([icon, label, value, note]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>{value}</div>
                <div style={{ color: '#475569', fontSize: '0.75rem' }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Select Your Foundation Concern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {Object.entries(concerns).map(([key, val]) => (
              <button key={key} onClick={() => setSelected(key)} style={{ background: selected === key ? '#1E3A5F' : '#0A1628', color: '#E2E8F0', border: `1px solid ${selected === key ? '#F5E642' : '#2D4A7A'}`, borderRadius: 8, padding: '0.75rem 1rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}>{val.title}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{concerns[selected].title}</div>
              {concerns[selected].explanation.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', background: '#0F2040', borderLeft: '3px solid #F5E642', padding: '0.75rem', borderRadius: 6 }}>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>🛠️ {concerns[selected].action}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌱 Maintaining Bearing Capacity Year-Round</h2>
          {['Water foundation perimeter during DFW drought (July–September) — soil shrinkage is the #1 cause of settlement.', 'Fix plumbing leaks immediately — a pinhole under slab saturates bearing soil within weeks.', 'Maintain gutter system — downspout discharge must carry water away from foundation bearing zone.', 'Do not over-water near foundation — oversaturation causes upheaval (lifting) which is also damaging.'].map((t, i) => (
            <div key={i} style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #2D4A7A' }}>{t}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW Foundation Resource · 2026</div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const trends = {
  living: { label: '🛋️ Living Room', trend: 'Warm taupe walls with white oak built-ins', detail: 'Cream/linen tones replacing cool grays. Black metal accents on shelving, matte black light fixtures, wood accent wall on one side.' },
  kitchen: { label: '🍳 Kitchen', trend: 'Two-tone cabinetry with quartz waterfall', detail: 'Lower cabinets in warm walnut, uppers in off-white. Quartz still #1 countertop. Hidden appliances where budget allows.' },
  primary: { label: '🛏️ Primary Bedroom', trend: 'Earthy monochromes + textured headboards', detail: 'Warm greige walls, linen textures, limewash accent wall behind bed. Black fixtures throughout.' },
  bathroom: { label: '🚿 Bathroom', trend: 'Large-format tile + matte black hardware', detail: '4×8 slab tile replacing subway tile. Niche shelving, wall-mount vanities, heated floors gaining traction in DFW.' },
  outdoor: { label: '🌿 Outdoor / Patio', trend: 'Defined outdoor living rooms', detail: 'DFW homeowners adding pergolas, ceiling fans, outdoor kitchens. Open concept moving outdoors.' },
};

export default function DFWInteriorDesignTrends2026() {
  const [selected, setSelected] = useState<keyof typeof trends | null>(null);
  const result = selected ? trends[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Interior Design Trends 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>What Dallas-Fort Worth homeowners are doing right now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Top DFW Trends at a Glance</h2>
          {[
            ['🎨', 'Warm neutrals replacing cool grays', 'Creams, taupes, and limewash are everywhere'],
            ['🪵', 'Wood accent walls surging', 'Shiplap and white oak panels top contractor requests'],
            ['🏗️', 'Open concept still popular but defined spaces returning', 'Half-walls and columns carving zones back in'],
            ['🔧', 'Black fixtures everywhere', 'Matte black hardware in kitchens, baths, and light fixtures'],
            ['💎', 'Quartz countertops still #1', 'Calacatta and Carrara-look veining dominating DFW installs'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8′ }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Get 2026 Trend Recommendations by Room</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {Object.entries(trends).map(([k, v]) => (
              <button key={k} onClick={() => setSelected(k as keyof typeof trends)}
                style={{ background: selected === k ? '#F5E642′ : '#1a3050', color: selected === k ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '0.75rem 0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {v.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>{result.trend}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>{result.detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>💡 DFW-Specific Context</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            DFW's rapid growth (2,000+ new residents/week) means design trends move fast. New construction dominates Frisco, Prosper, and Celina — driving demand for quick-update renovations on existing 2000s-era homes in Plano, Allen, and McKinney. Texas heat means energy-efficient upgrades (spray foam, Low-E windows) often pair with interior refreshes.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}
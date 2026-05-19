import { useState } from 'react';

const homeAges = [
  { id: 'new2015plus', label: '🏗️ 2015–2026 Build', tips: ['Builder warranty typically 1/2/10 structure — document every call before year 1 expires', 'Brick mortar shrinkage cracks in first 3 years are normal — caulk and monitor, not structural', 'Sod establishment: water daily for 30 days post-installation, weekly thereafter for 1 year', 'Clay soil settlement causes sticking doors in years 2–4 — adjust before paint hides gaps', 'Smart home systems: document panel, hub, and code locations before warranty work begins'] },
  { id: 'early2000s', label: '🏠 2000–2014 Build', tips: ['HVAC units approaching 12–16 year mark — budget $8K–$14K for replacement in 2026–2028', 'Roof reaching mid-life: professional inspection + minor repairs extend life 5–7 years', 'Water heater at or past 10-year mark — flush annually, plan replacement', 'Exterior caulk around windows and doors dries out — re-caulk every 5 years in Texas heat', 'Attic insulation may have settled below R-30 — top off with blown-in for energy savings'] },
  { id: 'pre2000', label: '🏘️ Pre-2000 (Sachse Originals)', tips: ['Sachse had little infrastructure pre-2000 — verify home was on city water/sewer, not well/septic', 'Older septic systems in pre-annexation areas need annual pumping and inspection', 'Original windows likely single-pane — replacement provides major comfort and energy ROI', 'Electrical panel may be 100-amp service — modern homes need 200-amp for EV chargers and HVAC', 'Older plumbing may include galvanized pipe — inspect water pressure and rust discoloration'] },
];

export default function DFWSachseTXDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = homeAges.find(h => h.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🌱 Sachse TX Deep Dive 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Sachse exploded from a small farming community into a sought-after Collin/Dallas County
          suburb between 2000–2026. Affordable entry-point for Collin County with most homes built
          in 2000s–2020s. Clay soil and rapid build pace create specific maintenance priorities.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Area Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP code 75048 · Straddles Collin and Dallas counties · Population grew 400%+ 2000–2026 ·
            Wylie ISD and Garland ISD serve different areas · Firewheel Town Center nearby ·
            No downtown core — primarily residential subdivisions
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#ef4444′ }}>⚠️ Sachse Clay Soil Alert</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Sachse sits on some of the most expansive clay in DFW. Seasonal swelling and shrinkage
            causes more foundation movement here than most DFW cities. Drip irrigation on a timer
            along all four foundation sides is a non-negotiable investment for Sachse homeowners.
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>
          Select your home age for a tailored guide:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {homeAges.map(h => (
            <button
              key={h.id}
              onClick={() => setSelected(h.id === selected ? null : h.id)}
              style={{
                background: selected === h.id ? '#F5E642′ : '#0f2040',
                color: selected === h.id ? '#0A1628′ : '#fff',
                border: '1px solid ' + (selected === h.id ? '#F5E642′ : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>
              {active.label} — 2026 Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Sachse homeowner? Find your pro on ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>Foundation, HVAC, and plumbing specialists serving 75048</div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const services = [
  { id: 'outlet', label: 'Outlet / Receptacle Add', icon: '🔌', cost: '$150–$250', tag: 'Minor', detail: 'Single outlet added to existing circuit. Price rises if wire must be fished through walls or attic. DFW homes built pre-1980 often need grounding upgrades simultaneously.' },
  { id: 'circuit', label: 'New Circuit Add', icon: '⚡', cost: '$300–$500', tag: 'Minor', detail: 'New dedicated circuit from panel. Common for home offices, garage workshops, kitchen appliances. Price varies by distance from panel and conduit requirements.' },
  { id: 'gfci', label: 'GFCI Outlet (installed)', icon: '🛡️', cost: '$35–$50 each', tag: 'Safety', detail: 'Required by code in bathrooms, kitchens, garages, and outdoor areas. Many older DFW homes lack GFCI protection. Bundle installs to reduce per-outlet labor costs.' },
  { id: 'panel', label: 'Panel Upgrade 100A → 200A', icon: '🏭', cost: '$2,800–$5,000', tag: 'Major', detail: 'Most common upgrade in DFW homes built 1960–1990. Required for EV chargers, hot tubs, large additions. Includes permit, inspection, utility coordination. 1–2 day project.' },
  { id: 'ev', label: 'EV Charger Installation', icon: '🚗', cost: '$800–$1,500', tag: 'Major', detail: 'Level 2 EVSE (240V/50A dedicated circuit). Price includes labor and materials. Add $200–500 if subpanel or panel upgrade needed first. DFW EV adoption growing 40% year-over-year.' },
  { id: 'rewire', label: 'Whole-Home Rewire', icon: '🏠', cost: '$8,000–$15,000', tag: 'Major', detail: 'Complete replacement of wiring. DFW homes with aluminum wiring (1965–1973) or knob-and-tube are prime candidates. Takes 5–10 days. Always includes panel upgrade and inspection.' },
];

const tagColors: Record<string, { color: string; bg: string }> = {
  Minor: { color: '#22C55E', bg: '#052e16′ },
  Safety: { color: '#F5E642', bg: '#1a1a00′ },
  Major: { color: '#FF8C00', bg: '#1a0a00′ },
};

const warnings = [
  { icon: '⚠️', label: 'Aluminum wiring (1965–1973 DFW homes) is a fire hazard — get it inspected' },
  { icon: '🔥', label: 'Federal Pacific panels (Stab-Lok) fail to trip — replace immediately' },
  { icon: '📋', label: 'All DFW electrical work requires a permit — insist on it from your contractor' },
  { icon: '🏷️', label: 'Oncor utility work is separate from electrician cost — factor in $200–500′ },
];

export default function DFWElectricalCostMatrix2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'Minor', 'Safety', 'Major'];
  const visible = services.filter(s => filter === 'All' || s.tag === filter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>⚡ DFW Electrical Cost Matrix 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every electrical cost in DFW — from a $35 GFCI outlet to a $15K whole-home rewire. Electrical is the one trade where corners cut cost lives. Know the real numbers before you hire.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
          {[['🏠', '40%', 'DFW homes with undersized panels'],['🚗', '3×', 'EV adoption growth in DFW (2023–2025)'],['📋', '$85–150', 'Electrical permit cost in DFW cities'],['⚡', '200A', 'Minimum recommended for new DFW homes']].map(([icon, val, label]) => (
            <div key={label as string} style={{ background: '#0F2040', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#F5E642′ }}>{val}</div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8, fontWeight: 600 }}>FILTER BY TYPE</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{ padding: '7px 14px', borderRadius: 8, border: `2px solid ${filter === t ? '#F5E642' : '#1E3A5F'}`, background: filter === t ? '#F5E642′ : ’transparent', color: filter === t ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: 12, fontWeight: 600 }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {visible.map(s => {
            const tc = tagColors[s.tag];
            return (
              <div key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: '#0F2040', borderRadius: 12, padding: 16, cursor: 'pointer', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: tc.color, background: tc.bg, padding: '2px 6px', borderRadius: 4 }}>{s.tag}</span>
                    </div>
                  </div>
                  <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap', marginLeft: 12 }}>{s.cost}</span>
                </div>
                {selected === s.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F', color: '#94A3B8', fontSize: 13, lineHeight: 1.7 }}>
                    {s.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#FF4444', marginBottom: 12 }}>⚠️ DFW Electrical Safety Alerts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {warnings.map(w => (
              <div key={w.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{w.icon}</span>
                <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}

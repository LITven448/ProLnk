import { useState } from 'react';

const services = [
  { id: 'camera', label: 'Camera Inspection', icon: '📷', cost: '$150–$300', tag: 'Diagnostic', detail: 'Fiber optic camera through drain lines. Finds root intrusion, cracks, bellied pipes. Required before any major drain or sewer work. DFW clay soil shifts pipes constantly.' },
  { id: 'leak', label: 'Leak Detection', icon: '🔎', cost: '$200–$400', tag: 'Diagnostic', detail: 'Electronic or acoustic leak detection. DFW slab foundations make detecting slab leaks difficult. Accurate detection prevents over-digging. Critical before slab repair.' },
  { id: 'faucet', label: 'Faucet Repair / Replace', icon: '🚿', cost: '$150–$300', tag: 'Minor', detail: 'Includes labor and standard faucet. DFW hard water (300+ ppm) destroys cartridges and aerators faster than most cities — expect to replace faucets every 7–12 years.' },
  { id: 'toilet', label: 'Toilet Replacement', icon: '🚽', cost: '$250–$450', tag: 'Minor', detail: 'Includes labor and standard toilet. Dual-flush units recommended for DFW drought restrictions. Add $100–200 for removal/disposal of old unit.' },
  { id: 'wh', label: 'Water Heater Replacement', icon: '🔥', cost: '$800–$1,500', tag: 'Major', detail: 'Standard 40–50 gallon tank. DFW hard water shortens water heater life to 8–10 years vs national avg of 12. Tankless upgrade: $2,500–4,500 installed.' },
  { id: 'slab', label: 'Slab Leak Spot Repair', icon: '🏠', cost: '$1,500–$3,000', tag: 'Urgent', detail: 'Tunneling or jackhammer to reach pipe, repair, and restore slab. DFW\’s shifting clay causes more slab leaks per capita than most US metros. Confirm location precisely before digging.' },
  { id: 'repipe', label: 'Whole-Home Repipe', icon: '🔧', cost: '$8,000–$15,000', tag: 'Major', detail: 'Full replacement of supply lines (galvanized or polybutylene → PEX). 3–5 day project. Homes built 1960–1995 in DFW often need this. 25-year warranty on PEX.' },
];

const tagColors: Record<string, { color: string; bg: string }> = {
  Diagnostic: { color: '#60A5FA', bg: '#0a1a2e' },
  Minor: { color: '#22C55E', bg: '#052e16' },
  Major: { color: '#FF8C00', bg: '#1a0a00' },
  Urgent: { color: '#FF4444', bg: '#1a0000' },
};

export default function DFWPlumbingCostMatrix2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'Diagnostic', 'Minor', 'Major', 'Urgent'];
  const visible = services.filter(s => filter === 'All' || s.tag === filter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔧 DFW Plumbing Cost Matrix 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every plumbing cost in DFW — from a $150 camera inspection to a $15K whole-home repipe. DFW's hard water and clay soil create unique plumbing challenges you need to know about.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {[['💧', '300+ ppm', 'DFW water hardness (very hard)'],['🏚️', 'Slab-built', '85%+ DFW homes on slabs'],['⚠️', '2× avg', 'DFW slab leak rate vs national']].map(([icon, val, label]) => (
            <div key={label as string} style={{ background: '#0F2040', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#F5E642' }}>{val}</div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8, fontWeight: 600 }}>FILTER BY TYPE</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{ padding: '7px 14px', borderRadius: 8, border: `2px solid ${filter === t ? '#F5E642' : '#1E3A5F'}`, background: filter === t ? '#F5E642' : 'transparent', color: filter === t ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
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
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>💡 DFW Hard Water Tip</div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>DFW water averages 300+ ppm hardness — classified as "very hard." This builds scale in water heaters, destroys faucet cartridges, and reduces water heater efficiency 25–40%. A whole-home water softener ($1,200–2,500 installed) pays back in 3–5 years through reduced maintenance and energy costs.</p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}

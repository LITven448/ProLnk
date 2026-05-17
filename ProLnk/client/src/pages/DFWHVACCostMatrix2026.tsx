import { useState } from 'react';

const services = [
  { id: 'diag', label: 'Diagnostic / Service Call', icon: '🔬', cost: '$85–$150', urgency: 'Low', detail: 'Technician trip charge plus diagnosis. DFW summer demand means 3–7 day waits — book early. Some companies waive if you proceed with repair.' },
  { id: 'cap', label: 'Capacitor Replacement', icon: '🔋', cost: '$150–$350', urgency: 'Medium', detail: 'Most common DFW summer failure. Capacitors store charge to start motors. DFW heat degrades them faster than northern climates. Simple 30-min fix.' },
  { id: 'contact', label: 'Contactor Replacement', icon: '⚡', cost: '$200–$350', urgency: 'Medium', detail: 'Electrical switch that activates the compressor. Fails from electrical surges (common in DFW storms) and heat cycling. Often replaced alongside capacitor.' },
  { id: 'coil', label: 'Evaporator Coil Replacement', icon: '🌀', cost: '$800–$1,500', urgency: 'High', detail: 'Indoor coil that absorbs heat. Leaks refrigerant, causes icing. DFW high runtime increases stress. 3–5 hour job. Verify warranty on new coil.' },
  { id: 'comp', label: 'Compressor Replacement', icon: '🏭', cost: '$1,200–$2,500', urgency: 'High', detail: 'Heart of the system. At this price point, evaluate system age — if 10+ years, full replacement often makes more sense than compressor-only swap.' },
  { id: 'replace', label: '3-Ton System Full Replacement', icon: '🏠', cost: '$5,000–$8,000', urgency: 'Planned', detail: '3-ton is standard for 1,500–2,100 sq ft DFW homes. Includes outdoor unit, air handler, and installation. 10-year parts warranty standard. SEER 16+ recommended for DFW.' },
  { id: 'duct', label: 'Duct Sealing / Repair', icon: '🌬️', cost: '$500–$2,000', urgency: 'Medium', detail: 'DFW attic temps hit 140°F+ in summer. Unsealed ducts lose 20–30% of conditioned air. Aeroseal or mastic sealing pays back through lower bills within 2–4 years.' },
];

const badges: Record<string, { color: string; bg: string }> = {
  Low: { color: '#22C55E', bg: '#052e16' },
  Medium: { color: '#F5E642', bg: '#1a1a00' },
  High: { color: '#FF8C00', bg: '#1a0a00' },
  Planned: { color: '#60A5FA', bg: '#0a1628' },
};

export default function DFWHVACCostMatrix2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filters = ['All', 'Low', 'Medium', 'High', 'Planned'];
  const visible = services.filter(s => filter === 'All' || s.urgency === filter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌡️ DFW HVAC Cost Matrix 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every HVAC repair and replacement cost in DFW — from an $85 diagnostic to a full system swap. DFW's extreme heat means your AC works harder than almost anywhere else in the country.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {[['🌡️', '114°F', 'DFW record high'],['⏱️', '5–7 days', 'Summer wait time'],['💸', '$180–250', 'Avg monthly summer electric']].map(([icon, val, label]) => (
            <div key={label as string} style={{ background: '#0F2040', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#F5E642' }}>{val}</div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8, fontWeight: 600 }}>FILTER BY URGENCY</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '7px 14px', borderRadius: 8, border: `2px solid ${filter === f ? '#F5E642' : '#1E3A5F'}`, background: filter === f ? '#F5E642' : 'transparent', color: filter === f ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {visible.map(s => {
            const badge = badges[s.urgency];
            return (
              <div key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: '#0F2040', borderRadius: 12, padding: 16, cursor: 'pointer', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: badge.color, background: badge.bg, padding: '2px 6px', borderRadius: 4 }}>{s.urgency}</span>
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
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔑 The DFW HVAC Rule of 5,000</div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>Multiply repair cost by system age. If the number exceeds $5,000, replacement is usually smarter. Example: $1,200 compressor × 12-year-old system = $14,400 — replace it. Works 80% of the time in DFW markets.</p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}

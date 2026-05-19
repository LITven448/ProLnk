import { useState } from 'react';

const businessTypes = [
  { type: 'Lawn Maintenance', opportunity: 'Weekly mowing, edging, fertilization programs', peakMonths: 'Mar–Nov (year-round possible)', volume: '60–120 matches/mo' },
  { type: 'Landscape Design / Install', opportunity: 'Drought-tolerant conversions, native plants, curb appeal', peakMonths: 'Feb–May, Sep–Nov', volume: '20–40 matches/mo' },
  { type: 'Irrigation Specialists', opportunity: 'New system installs, Smart controller upgrades, audits', peakMonths: 'Mar–Jun, Sep', volume: '25–50 matches/mo' },
  { type: 'Tree Service', opportunity: 'Storm cleanup, dead-wood removal, trimming programs', peakMonths: 'Year-round, peak post-storm', volume: '15–35 matches/mo' },
];

const stats = [
  { icon: '🌿', label: 'DFW Landscape Market Size', value: '$1.1B/yr' },
  { icon: '💧', label: 'Irrigation Systems in DFW', value: '2.4M+' },
  { icon: '🌡️', label: 'Drought-Tolerant Conversion Demand', value: '+34% YoY' },
  { icon: '🏘️', label: 'New DFW Home Builds (2025)', value: '68,000+' },
];

export default function DFWProLnkLandscapePartnerGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌿</span>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Landscape Contractors on ProLnk</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 36, maxWidth: 620 }}>
          DFW's heat, drought cycles, and explosive growth create constant landscape demand. ProLnk matches landscape pros to homeowners at exactly the right moment — spring prep, post-storm, new build.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Select Your Landscape Business Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {businessTypes.map((b, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1A3A5C' : '#112240', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{b.type}</div>
              {selected === i && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8 }}>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>OPPORTUNITY</div><div style={{ fontSize: 14 }}>{b.opportunity}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>PEAK MONTHS</div><div style={{ fontSize: 14 }}>{b.peakMonths}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>EST. MATCH VOLUME</div><div style={{ fontSize: 14 }}>{b.volume}</div></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk Landscape Network</div>
          <div style={{ color: '#1A3050', fontSize: 14 }}>Seasonal surges are predictable — be ready with pre-qualified leads waiting. Charter $149/mo.</div>
        </div>
      </div>
    </div>
  );
}

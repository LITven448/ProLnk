import { useState } from 'react';

const additionTypes = [
  { type: 'Bedroom Addition', sqft: '200-400 sqft', cost: '$40K-$80K', timeline: '12-16 weeks', note: 'Requires foundation extension in most DFW soil conditions. Permit 4-6 weeks.' },
  { type: 'Sunroom / Flex Space', sqft: '150-300 sqft', cost: '$25K-$55K', timeline: '8-12 weeks', note: 'Slab-on-grade option reduces cost. HVAC tie-in adds $5K-$8K.' },
  { type: 'Garage Conversion', sqft: '400-600 sqft', cost: '$20K-$45K', timeline: '6-10 weeks', note: 'No foundation needed. Popular in DFW for ADU income. Verify zoning first.' },
  { type: 'Second Story', sqft: '800-1400 sqft', cost: '$180K-$280K', timeline: '20-30 weeks', note: 'Structural engineering required. Biggest permit complexity in DFW cities.' },
];

export default function DFWAdditionGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Home Addition Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Cost estimates, permit timelines, and scope guidance for DFW home additions in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💰', label: 'Cost Per Sqft', value: '$150 - $200′ },
            { icon: '🏠', label: 'Biggest Cost Driver', value: 'Foundation' },
            { icon: '📋', label: 'Permit Timeline', value: '4 - 8 Weeks' },
            { icon: '📏', label: 'Setbacks Vary', value: 'By City/Lot' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚠️ DFW Setback Rules (General)</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Setback requirements are city-specific. Always pull your plat before planning:</p>
          {[
            'Dallas: 5ft side, 20ft rear typical in residential zones',
            'Plano/Frisco: 7.5ft side setbacks common in newer subdivisions',
            'Fort Worth: Varies by zoning district — verify with city planning',
            'HOA restrictions often stricter than city code — check CC&Rs',
          ].map((r) => (
            <div key={r} style={{ color: '#fff', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '3px solid #F5E642′ }}>{r}</div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Addition Type — Cost + Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {additionTypes.map((item, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600 }}>
                {item.type} — {item.cost}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{additionTypes[selected].type}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{additionTypes[selected].sqft} · {additionTypes[selected].timeline}</div>
              <div style={{ color: '#fff', fontSize: 14 }}>{additionTypes[selected].note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

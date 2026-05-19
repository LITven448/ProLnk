import { useState } from 'react';

const bathroomScopes = [
  { type: 'Guest Bath', budget: '$8K-$15K', scope: 'Vanity swap, toilet, tile accent, fixtures, lighting. Cosmetic refresh only.' },
  { type: 'Master Bath (Mid)', budget: '$15K-$25K', scope: 'Full tile, new vanity, frameless shower, soaker tub, exhaust fan upgrade.' },
  { type: 'Master Bath (Luxury)', budget: '$25K-$35K+', scope: 'Heated floors, steam shower, custom tile work, double vanity, smart mirrors.' },
];

export default function DFWBathroomRemodelGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🚿</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Bathroom Remodel Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything Dallas-Fort Worth homeowners need to plan a bathroom renovation in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🛁', label: 'Master Bath Avg', value: '$18K - $35K' },
            { icon: '🪥', label: 'Guest Bath Avg', value: '$8K - $15K' },
            { icon: '📈', label: 'ROI Range', value: '60% - 67%' },
            { icon: '📅', label: 'Timeline', value: '3 - 5 Weeks' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW-Specific Considerations</h2>
          {[
            { label: 'Humidity Management', detail: 'DFW humidity peaks June-Sept. Specify cement board backer and epoxy grout in wet zones.' },
            { label: 'Tile Selection', detail: 'Larger format tiles (24x24+) trending. Rectified tiles reduce grout lines in DFW installs.' },
            { label: 'Permit Requirements', detail: 'Plumbing relocation requires permit in Dallas, Plano, Frisco, McKinney, Arlington.' },
            { label: 'Ventilation', detail: 'Code requires exhaust fan. Upgrade to 110 CFM with humidity sensor for TX climate.' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Bathroom Type + Budget Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select your bathroom type to see realistic scope:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bathroomScopes.map((item, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600 }}>
                {item.type} — {item.budget}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{bathroomScopes[selected].type}</div>
              <div style={{ color: '#fff', fontSize: 15 }}>{bathroomScopes[selected].scope}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

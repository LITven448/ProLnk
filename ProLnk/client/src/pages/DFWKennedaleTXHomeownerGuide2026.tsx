import { useState } from 'react';

const homeTypes = [
  { label: 'Older Rural Home (pre-1985)', tips: ['Well and septic systems common — inspect annually', 'Older construction may have asbestos or lead paint', 'Galvanized or polybutylene plumbing likely present', 'Electrical panels may be undersized — 100A needs upgrade', 'Foundation movement from Johnson/Tarrant clay notorious'] },
  { label: '1985-2000 Suburban Home', tips: ['Copper plumbing aging — inspect for pinhole leaks', 'Roof at 25-40 year range — professional assessment needed', 'HVAC system approaching or past end of life', 'Check drainage: low areas near creeks flood seasonally', 'Dual-pane windows may have lost seal integrity'] },
  { label: '2000-2015 Newer Suburban', tips: ['HVAC entering replacement window — 20-25 year lifespan', 'Inspect wood decks and fences for weathering', 'Water heater may be past 12-year mark', 'Check attic insulation — builders often install minimum', 'Verify irrigation system backflow preventer is functional'] },
  { label: '2015+ New Construction', tips: ['Warranty periods expiring — document issues now', 'Check grading settlement around foundation', 'Test all GFCI and AFCI breakers — builders rush installs', 'Inspect roof flashing at dormers and valleys', 'Smart home systems may need firmware and battery updates'] },
];

export default function DFWKennedaleTXHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌾</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Kennedale TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Johnson/Tarrant County · Rural Character Meets Suburban Growth · Southeast Fort Worth</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Kennedale</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Kennedale is a small city straddling Johnson and Tarrant counties southeast of Fort Worth, with a
            unique mix of older rural homes and newer suburban development. This growth frontier means homeowners
            encounter everything from aging septic systems on older lots to newer construction warranty issues.
            Creek drainage and clay soil movement are consistent challenges throughout the area.
          </p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Your Home Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {homeTypes.map((h, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ padding: '12px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#1e3a5f',
                  backgroundColor: selected === i ? '#1a2f4a' : 'transparent',
                  color: selected === i ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e35', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {homeTypes[selected].label} Kennedale Maintenance Guide</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {homeTypes[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Kennedale-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌊 Creek Flooding: Bear Creek and Village Creek overflow in heavy rains', '🌍 Clay Soil: Johnson County clay causes severe foundation movement', '🐄 Rural Pests: Mice, snakes, and fire ants common near open land', '⚡ Lightning: Open terrain increases lightning strike risk'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Kennedale Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}

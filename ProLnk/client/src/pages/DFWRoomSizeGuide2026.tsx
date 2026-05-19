import { useState } from 'react';

const rooms = [
  { label: 'Master Bedroom', value: 'master', standard: '14 x 16 ft', luxury: '16 x 20 ft', trend: 'DFW new construction pushes master suites to 16x18+ with en-suite and walk-in. Prosper/Celina builds often 18x20.', tip: 'Size master bath together — combined square footage 400–600 sq ft in luxury DFW builds.' },
  { label: 'Secondary Bedroom', value: 'secondary', standard: '10 x 12 ft', luxury: '12 x 14 ft', trend: 'DFW builders often shrink secondary rooms to fund larger common areas. Verify actual room size on floor plan.', tip: '10x10 is smallest practical for a queen bed + desk. Below that, buyer pool narrows significantly in DFW.' },
  { label: 'Kitchen', value: 'kitchen', standard: '12 x 15 ft', luxury: '15 x 20 ft', trend: 'Open-concept DFW kitchens flow into living/dining. Island standard in most post-2015 DFW new construction.', tip: 'Work triangle (sink–stove–fridge) under 22 ft is ideal. DFW buyers prioritize large islands for entertaining.' },
  { label: 'Living Room', value: 'living', standard: '15 x 18 ft', luxury: '20 x 24 ft', trend: 'Open concept has collapsed formal living in DFW. Great room combining kitchen+living now common in 2500–4000 sq ft homes.', tip: 'Under 200 sq ft living room difficult to stage well for DFW resale market — consider flow to adjacent spaces.' },
  { label: 'Dining Room', value: 'dining', standard: '12 x 14 ft', luxury: '14 x 18 ft', trend: 'Formal dining disappearing in DFW — replaced by flex/office space or absorbed into open kitchen layout.', tip: 'If listing has separate dining, stage it as office/flex to broaden DFW buyer appeal.' },
  { label: 'Home Office', value: 'office', standard: '10 x 12 ft', luxury: '12 x 14 ft', trend: 'Post-2020 DFW demand spiked. Now a top-3 must-have feature in McKinney, Frisco, Plano buyer surveys.', tip: 'Dedicated office adds $8–15K in perceived value in suburban DFW markets per 2025 comp analysis.' },
];

export default function DFWRoomSizeGuide2026() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('standard');

  const result = selected ? rooms.find((r) => r.value === selected) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📏</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Room Size Standards 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>Typical dimensions for DFW homes — standard builder grade to luxury new construction</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Select Room Type</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {rooms.map((r) => (
              <button key={r.value} onClick={() => setSelected(r.value)}
                style={{ background: selected === r.value ? '#F5E642' : '#162035', color: selected === r.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24, display: 'flex', gap: 10 }}>
          {[{v:'standard',l:'Standard'},{ v:'luxury',l:'Luxury'},{ v:'trend',l:'DFW Trend'},{ v:'tip',l:'Pro Tip'}].map((btn) => (
            <button key={btn.v} onClick={() => setView(btn.v)}
              style={{ background: view === btn.v ? '#F5E642' : '#162035', color: view === btn.v ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600 }}>
              {btn.l}
            </button>
          ))}
        </div>

        {result ? (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{result.label}</h2>
            {(view === 'standard' || view === 'luxury') && (
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: 12 }}>Standard</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{result.standard}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: 12 }}>Luxury</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{result.luxury}</div>
                </div>
              </div>
            )}
            <p style={{ lineHeight: 1.7, color: '#ddd', marginTop: 0 }}>{result[view]}</p>
          </div>
        ) : (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888' }}>
            Select a room type to see DFW size comparisons.
          </div>
        )}

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>ProLnk DFW Home Intelligence • prolnk.io</p>
      </div>
    </div>
  );
}

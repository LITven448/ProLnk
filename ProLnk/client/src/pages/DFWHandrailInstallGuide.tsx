import { useState } from 'react';

const STAIR_TYPES = ['Straight', 'L-shaped', 'U-shaped', 'Spiral'];
const LOCATIONS = ['Indoor', 'Outdoor - Pool Steps', 'Outdoor - Front Entry', 'Outdoor - Deck'];
const MATERIALS = ['Aluminum', 'Wrought Iron', 'Wood', 'Stainless Steel'];

function getSpec(stairType: string, width: string, location: string) {
  const w = parseInt(width) || 36;
  const isOutdoor = location.startsWith('Outdoor');
  const needsBothSides = w >= 44;
  const material = isOutdoor ? 'Aluminum or galvanized steel (weather-rated)' : 'Wood, wrought iron, or aluminum';
  const cost = isOutdoor
    ? needsBothSides ? '$1,200–$2,800′ : '$600–$1,400'
    : needsBothSides ? '$800–$2,000′ : '$400–$1,000';
  return {
    height: '34″–38″ per DFW/IRC code',
    sides: needsBothSides ? 'Both sides required (≥44″ wide)' : 'One side minimum',
    grip: 'Graspable Type I profile required (1.25″–2″ diameter round or equivalent)',
    material,
    cost,
    permit: 'Permit required for new handrail installation in most DFW municipalities',
  };
}

export default function DFWHandrailInstallGuide() {
  const [stairType, setStairType] = useState('Straight');
  const [width, setWidth] = useState('36');
  const [location, setLocation] = useState('Indoor');
  const [result, setResult] = useState<ReturnType<typeof getSpec> | null>(null);

  function calculate() {
    setResult(getSpec(stairType, width, location));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🪜 Handrail Installation Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>Code-compliant handrail specs for DFW stairs, pools, and entries. IRC height 34–38", graspable profile required, both sides mandatory for stairs 44″ or wider.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '📏 Height Requirement', val: '34″–38″ above stair nosing' },
            { label: '✋ Profile Type', val: 'Graspable Type I (1.25″–2″ round)' },
            { label: '🌧️ Outdoor Materials', val: 'Aluminum, galvanized, or powder-coated iron' },
            { label: '📋 Permit Required', val: 'Yes — most DFW cities require permit' },
          ].map(card => (
            <div key={card.label} style={{ background: '#0F2035', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 13, color: '#8A9BB5', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{card.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Get Your Handrail Spec</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Stair Type</label>
              <select value={stairType} onChange={e => setStairType(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                {STAIR_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Stair Width (inches)</label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Generate Spec →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📐 Your Handrail Specification</h3>
            {Object.entries({ Height: result.height, Sides: result.sides, Grip: result.grip, Material: result.material, 'Est. Cost': result.cost, Permit: result.permit }).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{k}</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🏗️ Material Comparison</h3>
          {MATERIALS.map(m => (
            <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
              <span style={{ fontSize: 18 }}>{m === 'Aluminum' ? '🥈' : m === 'Wrought Iron' ? '⚫' : m === 'Wood' ? '🪵' : '✨'}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{m}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5′ }}>{m === ’Aluminum' ? 'Lightweight, rust-proof, ideal for DFW outdoor use, $15–30/ft' : m === 'Wrought Iron' ? 'Classic look, heavy, needs powder coating for DFW humidity, $25–50/ft' : m === 'Wood' ? 'Warm aesthetic, needs sealing for DFW weather, $10–20/ft' : 'Modern, low-maintenance, pool-friendly, $30–60/ft'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

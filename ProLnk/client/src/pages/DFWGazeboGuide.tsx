import { useState } from 'react';

const MATERIALS: Record<string, { label: string; windRating: string; lifespan: string; cost: string; maintenance: string }> = {
  aluminum: { label: 'Aluminum', windRating: '70–90 mph', lifespan: '20–30 years', cost: '$3,000–$12,000', maintenance: 'Annual fastener check, no painting required' },
  steel: { label: 'Galvanized Steel', windRating: '90–130 mph', lifespan: '25–40 years', cost: '$5,000–$18,000', maintenance: 'Inspect for rust spots annually, repaint every 7–10 years' },
  cedar: { label: 'Cedar Wood', windRating: '60–80 mph', lifespan: '15–25 years', cost: '$4,000–$20,000', maintenance: 'Stain/seal every 2–3 years, inspect for rot annually' },
};

const FOUNDATIONS: Record<string, { label: string; cost: string; note: string }> = {
  concrete: { label: 'Concrete Pad', cost: '$1,500–$4,000', note: 'Best for DFW clay soil — pour to 4 in depth minimum with rebar' },
  deck_mount: { label: 'Deck Mounting', cost: '$500–$1,500 hardware', note: 'Only if existing deck is 2×8 framing or heavier — verify load capacity' },
  helical: { label: 'Helical Pier Footings', cost: '$2,500–$6,000', note: 'Best for expansive clay — piers reach stable soil 12–20 ft deep' },
};

const WIND_ZONES: Record<string, string> = {
  dfw_north: 'North DFW (Frisco/McKinney): 90 mph design wind speed — requires steel or heavy aluminum',
  dfw_central: 'Central DFW (Dallas/Fort Worth): 90 mph design wind speed — aluminum minimum',
  dfw_east: 'East DFW (Mesquite/Garland): 100 mph design wind speed — steel frame recommended',
  dfw_west: 'West DFW (Arlington/Mansfield): 90 mph — aluminum adequate with concrete anchor',
};

export default function DFWGazeboGuide() {
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');
  const [zone, setZone] = useState('');
  const [result, setResult] = useState<{ material: string; foundation: string; permit: string; windNote: string; cost: string } | null>(null);

  function calculate() {
    const sqft = parseInt(size);
    const mat = material || (sqft > 200 ? 'steel' : 'aluminum');
    const m = MATERIALS[mat];
    const foundation = sqft > 150 ? FOUNDATIONS.helical : FOUNDATIONS.concrete;
    const windNote = WIND_ZONES[zone] || 'Select your DFW zone for wind rating guidance.';
    const permit = sqft > 120
      ? 'Permit required in all DFW cities for structures over 120 sq ft. Structural engineer stamp may be required for wind loads.'
      : 'Structures under 120 sq ft may be exempt from permit in some DFW cities — verify with your city building department.';
    const totalCost = `${m.cost} structure + ${foundation.cost} foundation`;
    setResult({ material: m.label, foundation: foundation.label + ' — ' + foundation.note, permit, windNote, cost: totalCost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>🏛️ DFW Gazebo Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>Built to survive DFW severe weather — not just look good</div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #EF4444′ }}>
          <div style={{ color: '#FCA5A5', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ Avoid Fabric/Soft-Top Gazebos in DFW</div>
          <div style={{ color: '#FEE2E2', lineHeight: 1.7 }}>
            Fabric canopy gazebos sold at home improvement stores have an average lifespan of <strong>18–24 months</strong> in DFW. A single severe thunderstorm with 50+ mph winds will destroy them. DFW averages 3–5 severe weather events per year. Only hardtop aluminum, steel, or wood frame gazebos are appropriate for permanent DFW installation.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏗️ Material Comparison</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {Object.entries(MATERIALS).map(([k, v]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#fff', fontWeight: 700 }}>{v.label}</div>
                  <div style={{ color: '#F5E642', fontSize: '0.85rem' }}>Wind: {v.windRating}</div>
                </div>
                <div style={{ color: '#CBD5E1', fontSize: '0.875rem', marginTop: '0.25rem' }}>Cost: {v.cost} · Life: {v.lifespan}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{v.maintenance}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌪️ DFW Wind Load Requirements</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {Object.values(WIND_ZONES).map((z, i) => (
              <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', paddingLeft: '0.5rem', borderLeft: '2px solid #2D4A6E' }}>• {z}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Gazebo Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Gazebo Size (sq ft)</div>
              <input value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. 144 (12x12)" style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Frame Material</div>
              <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Auto-select by size</option>
                <option value="aluminum">Aluminum</option>
                <option value="steel">Galvanized Steel</option>
                <option value="cedar">Cedar Wood</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1′ }}>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW Wind Zone</div>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select zone</option>
                <option value="dfw_north">North DFW (Frisco/McKinney/Prosper)</option>
                <option value="dfw_central">Central DFW (Dallas/Fort Worth)</option>
                <option value="dfw_east">East DFW (Mesquite/Garland/Rockwall)</option>
                <option value="dfw_west">West DFW (Arlington/Mansfield/Grand Prairie)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>Recommended: {result.material} Frame</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.5rem' }}>Foundation: {result.foundation}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Total Estimated Cost: <strong style={{ color: '#F5E642′ }}>{result.cost}</strong></div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>🌪️ {result.windNote}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>📋 Permits: {result.permit}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW gazebo installation pros · prolnk.io</div>
      </div>
    </div>
  );
}

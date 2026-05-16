import { useState } from 'react';

const submrkets = [
  { name: 'Downtown Dallas / Uptown', soil: 'Blackland Prairie', clay: 'Very High', expansion: '4-6%', formation: 'Austin Chalk / Taylor Clay' },
  { name: 'Plano / Allen / McKinney', soil: 'Blackland Prairie', clay: 'Very High', expansion: '4-6%', formation: 'Taylor Clay' },
  { name: 'Irving / Las Colinas', soil: 'Blackland Prairie', clay: 'High', expansion: '3-5%', formation: 'Austin Chalk' },
  { name: 'Arlington / Mansfield', soil: 'Blackland Prairie', clay: 'Very High', expansion: '4-6%', formation: 'Taylor / Navarro Clay' },
  { name: 'Fort Worth (west)', soil: 'Mixed / Woodbine', clay: 'Moderate', expansion: '1-3%', formation: 'Woodbine Sandstone' },
  { name: 'Keller / Southlake', soil: 'Blackland Prairie', clay: 'High', expansion: '3-5%', formation: 'Taylor Clay' },
  { name: 'Frisco / Prosper', soil: 'Blackland Prairie', clay: 'Very High', expansion: '4-6%', formation: 'Taylor Clay' },
  { name: 'Rockwall / Rowlett', soil: 'Blackland Prairie', clay: 'Very High', expansion: '5-7%', formation: 'Taylor Clay - highest shrink-swell' },
  { name: 'Cedar Hill / Duncanville', soil: 'Transitional', clay: 'Moderate-High', expansion: '2-4%', formation: 'Austin Chalk transition zone' },
  { name: 'Garland / Mesquite', soil: 'Blackland Prairie', clay: 'Very High', expansion: '4-6%', formation: 'Taylor Clay' },
];

const concerns = {
  'Very High': [
    'Foundation movement 1-3 inches seasonally',
    'Post-tension slabs standard requirement',
    'Pier and beam homes need regular leveling',
    'Tree roots can cause soil desiccation cracks',
    'Maintain consistent soil moisture year-round',
    'French drains essential for proper drainage',
  ],
  'High': [
    'Foundation movement 0.5-1.5 inches seasonally',
    'Post-tension slabs strongly recommended',
    'Monitor for door/window sticking as early warning',
    'Irrigation systems help stabilize moisture levels',
    'Avoid large trees within 20 feet of foundation',
  ],
  'Moderate': [
    'Minimal foundation movement expected',
    'Standard slab construction adequate',
    'Basic drainage management sufficient',
    'Lower risk of shrink-swell damage',
    'Still monitor foundation annually',
  ],
  'Moderate-High': [
    'Moderate foundation movement risk',
    'Post-tension slab recommended',
    'Drainage management important',
    'Monitor interior doors and windows seasonally',
  ],
};

export default function DFWExpansiveClayMap() {
  const [selected, setSelected] = useState('');
  const area = submrkets.find(s => s.name === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🗺️</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Expansive Clay Map</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW sits on some of the most expansive clay soil in the United States. The Blackland Prairie formation - Taylor and Austin Chalk clays - dominates most of the metroplex. These soils can expand 4-7% in volume when wet and shrink dramatically when dry, creating the foundation movement DFW homeowners experience every season.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🏔️ Soil Formations in DFW</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.9 }}>
              <li><strong style={{ color: '#e2e8f0' }}>Taylor Clay</strong> - Most expansive, central DFW</li>
              <li><strong style={{ color: '#e2e8f0' }}>Austin Chalk</strong> - Less clay, more stable</li>
              <li><strong style={{ color: '#e2e8f0' }}>Woodbine Sandstone</strong> - West Fort Worth, low clay</li>
              <li><strong style={{ color: '#e2e8f0' }}>Navarro Clay</strong> - South DFW, high expansion</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🏠 Home Impact Signals</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.9 }}>
              <li>Doors and windows sticking</li>
              <li>Diagonal cracks from door corners</li>
              <li>Gaps between walls and ceiling</li>
              <li>Sloped or bouncy floors</li>
              <li>Cracks in driveway or sidewalks</li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📍 Find Your DFW Submarket</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your DFW Area</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select your area</option>
              {submrkets.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          {area && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>Soil Type</p><p style={{ color: '#F5E642', fontWeight: 600, margin: 0 }}>{area.soil}</p></div>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>Clay Level</p><p style={{ color: area.clay === 'Very High' ? '#ef4444' : area.clay === 'High' ? '#f97316' : '#22c55e', fontWeight: 600, margin: 0 }}>{area.clay}</p></div>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>Volume Expansion</p><p style={{ color: '#e2e8f0', fontWeight: 600, margin: 0 }}>{area.expansion}</p></div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Geological formation: {area.formation}</p>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>Special Considerations:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
                {(concerns[area.clay as keyof typeof concerns] || concerns['Moderate']).map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Note:</strong> Foundation issues from expansive clay are the most common and costly home repair in DFW. Get a structural engineer's assessment before any major foundation work. ProLnk connects you with licensed foundation specialists throughout the metroplex.
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const dfwLocations = [
  { name: 'Downtown Dallas', intensity: 'Very High', tempDiff: '+8-12°F', color: '#ef4444', impervious: '85-90%', canopy: '8%' },
  { name: 'Uptown / Midtown Dallas', intensity: 'Very High', tempDiff: '+7-10°F', color: '#ef4444', impervious: '80-85%', canopy: '12%' },
  { name: 'Oak Cliff / Bishop Arts', intensity: 'High', tempDiff: '+5-8°F', color: '#f97316', impervious: '65-75%', canopy: '18%' },
  { name: 'Plano / Allen', intensity: 'Moderate-High', tempDiff: '+4-6°F', color: '#eab308', impervious: '55-65%', canopy: '22%' },
  { name: 'Irving / Las Colinas', intensity: 'High', tempDiff: '+5-7°F', color: '#f97316', impervious: '70-80%', canopy: '15%' },
  { name: 'Southlake / Colleyville', intensity: 'Moderate', tempDiff: '+2-4°F', color: '#22c55e', impervious: '40-55%', canopy: '35%' },
  { name: 'Arlington', intensity: 'High', tempDiff: '+5-7°F', color: '#f97316', impervious: '68-75%', canopy: '16%' },
  { name: 'Frisco / Prosper', intensity: 'Moderate', tempDiff: '+3-5°F', color: '#eab308', impervious: '45-60%', canopy: '25%' },
  { name: 'McKinney (older areas)', intensity: 'Moderate', tempDiff: '+3-5°F', color: '#eab308', impervious: '50-60%', canopy: '28%' },
  { name: 'Suburban / Rural Outskirts', intensity: 'Low', tempDiff: '+1-2°F', color: '#22c55e', impervious: '15-30%', canopy: '45%+' },
];

const mitigations = {
  'Very High': ['Plant shade trees on south and west sides of home', 'Install cool/reflective roofing material', 'Use permeable pavers for driveways', 'Add window films to reduce solar heat gain', 'Participate in Dallas Urban Heat Island Initiative tree giveaway', 'Green roof or rooftop garden where possible'],
  'High': ['Strategic tree planting reduces cooling costs 10-25%', 'Light-colored pavement and roofing', 'Add vegetation to reduce impervious surfaces', 'Shade structures over HVAC equipment', 'Participate in city tree planting programs'],
  'Moderate-High': ['Tree planting still beneficial for energy savings', 'Consider permeable driveway materials', 'Shade eastern and western windows', 'Check for city green infrastructure programs'],
  'Moderate': ['Good baseline - maintain existing tree canopy', 'Avoid removing mature trees', 'Strategic new plantings continue reducing heat', 'Standard energy-efficiency measures sufficient'],
  'Low': ['Maintain rural/suburban character and tree cover', 'Advocate against overdevelopment that strips canopy', 'Monitor as development expands into area'],
};

export default function DFWUrbanHeatIsland() {
  const [selected, setSelected] = useState('');
  const area = dfwLocations.find(l => l.name === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌡️</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Urban Heat Island Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW's urban core can be 8-12 degrees Fahrenheit hotter than surrounding rural areas. This urban heat island effect is caused by dark impervious surfaces (asphalt, concrete, rooftops) absorbing and re-radiating heat, reduced vegetation, and waste heat from buildings and vehicles. It increases energy costs, affects comfort, and intensifies heat health risks during extreme summer weather.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', margin: '0 0 0.5rem', color: '#ef4444' }}>+12°F</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem', fontSize: '0.9rem' }}>Peak Urban-Rural Gap</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Downtown Dallas vs. outskirts</p>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', margin: '0 0 0.5rem', color: '#F5E642' }}>25%</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem', fontSize: '0.9rem' }}>Cooling Cost Reduction</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>From strategic tree planting</p>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', margin: '0 0 0.5rem', color: '#22c55e' }}>8%</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem', fontSize: '0.9rem' }}>Downtown Tree Canopy</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>vs. 35%+ in suburban areas</p>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📍 Check Your Neighborhood</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your DFW Location</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select your area</option>
              {dfwLocations.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
            </select>
          </div>
          {area && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>UHI Intensity</p><p style={{ color: area.color, fontWeight: 700, margin: 0 }}>{area.intensity}</p></div>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>Temp Above Rural</p><p style={{ color: '#F5E642', fontWeight: 600, margin: 0 }}>{area.tempDiff}</p></div>
                <div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.25rem' }}>Tree Canopy</p><p style={{ color: '#22c55e', fontWeight: 600, margin: 0 }}>{area.canopy}</p></div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Impervious surface coverage: {area.impervious}</p>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>Mitigation Options:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
                {(mitigations[area.intensity as keyof typeof mitigations] || mitigations['Moderate']).map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#F5E642' }}>Community Programs:</strong> Dallas, Fort Worth, Plano, and most DFW cities offer free tree giveaways and subsidized cool roof rebates. Search your city's sustainability office for current programs.
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Note:</strong> Tree planting, cool roofing, and permeable paving all require licensed contractors to maximize benefit and avoid code violations. ProLnk connects you with verified DFW contractors for energy-efficient home upgrades.
        </div>
      </div>
    </div>
  );
}

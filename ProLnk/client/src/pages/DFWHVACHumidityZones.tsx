import { useState } from 'react';

const zones = [
  {
    area: 'Inner City (Dallas/Fort Worth)',
    humidity: { spring: 'High (65-75%)', summer: 'Very High (70-80%)', fall: 'Moderate (55-65%)', winter: 'Low-Moderate (45-55%)' },
    implications: 'Higher latent load year-round. Variable-speed systems and dehumidification coils strongly recommended.',
  },
  {
    area: 'Lake Communities (Rockwall, Flower Mound, Grapevine)',
    humidity: { spring: 'Very High (70-80%)', summer: 'Extreme (75-85%)', fall: 'High (60-70%)', winter: 'Moderate (50-60%)' },
    implications: 'Highest humidity in DFW. Two-stage or variable-speed compressors critical. Whole-home dehumidifiers often necessary.',
  },
  {
    area: 'Outer Suburbs (Frisco, McKinney, Mansfield, Midlothian)',
    humidity: { spring: 'Moderate (55-65%)', summer: 'High (65-75%)', fall: 'Moderate (50-60%)', winter: 'Low (40-50%)' },
    implications: 'More manageable humidity. Standard systems work well. ERV/HRV can improve indoor air quality significantly.',
  },
  {
    area: 'Western Suburbs (Fort Worth west, Weatherford)',
    humidity: { spring: 'Low-Moderate (50-60%)', summer: 'Moderate (60-70%)', fall: 'Low (45-55%)', winter: 'Low (35-45%)' },
    implications: 'Drier climate. Humidification may be needed in winter. Simpler systems adequate. Focus on cooling efficiency.',
  },
];

const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
type Season = typeof seasons[number];

export default function DFWHVACHumidityZones() {
  const [selectedArea, setSelectedArea] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState<Season>('summer');

  const zone = zones[selectedArea];
  const humidityLevel = zone.humidity[selectedSeason];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW HVAC Humidity Zone Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>How humidity varies across DFW and what it means for your HVAC system</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>📍 Select Your DFW Area</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {zones.map((z, i) => (
              <button key={i} onClick={() => setSelectedArea(i)} style={{ backgroundColor: selectedArea === i ? '#F5E642' : '#1A2E4A', color: selectedArea === i ? '#0A1628' : '#E8EDF2', border: 'none', borderRadius: '8px', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left', transition: 'all 0.2s' }}>
                {z.area}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>🌤️ Select Season</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {seasons.map(s => (
              <button key={s} onClick={() => setSelectedSeason(s)} style={{ backgroundColor: selectedSeason === s ? '#F5E642' : '#1A2E4A', color: selectedSeason === s ? '#0A1628' : '#E8EDF2', border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize', transition: 'all 0.2s' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{zone.area}</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'capitalize' }}>Season: {selectedSeason}</p>
          <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.25rem' }}>Typical Humidity Range</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F5E642' }}>{humidityLevel}</div>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#E8EDF2', lineHeight: 1.6 }}>
            <span style={{ color: '#F5E642', fontWeight: 600 }}>HVAC Implication: </span>{zone.implications}
          </div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk connects DFW homeowners with HVAC pros who specialize in your zone humidity challenges.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Matched with a DFW HVAC Pro</button>
        </div>
      </div>
    </div>
  );
}

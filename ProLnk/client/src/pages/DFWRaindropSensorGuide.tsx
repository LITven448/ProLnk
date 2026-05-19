import { useState } from 'react';

const cities = [
  { city: 'Dallas', situation: 'New system install', type: 'Wireless Rain Sensor', compliance: 'Required by Dallas Water Utilities for all new irrigation permits', cost: '$35–$90', brand: 'Hunter Mini-Clik, Irritrol RS-1000' },
  { city: 'Fort Worth', situation: 'New system install', type: 'Wireless Rain Sensor', compliance: 'Required for all new Fort Worth Water permits since 2012', cost: '$35–$90', brand: 'Rain Bird WR2' },
  { city: 'Plano', situation: 'Existing system upgrade', type: 'Wired Rain Sensor', compliance: 'Plano mandates sensors on all systems — retrofit required', cost: '$20–$55', brand: 'Toro TWRS, Hunter Mini-Clik' },
  { city: 'Frisco', situation: 'Smart controller upgrade', type: 'Smart Weather Skip (built-in)', compliance: 'Frisco accepts smart controller ET-based skipping in lieu of hardware sensor', cost: '$0 (software feature)', brand: 'Rachio 3, Hunter HC' },
  { city: 'McKinney', situation: 'New system install', type: 'Wireless Rain Sensor', compliance: 'Required — McKinney Water Conservation ordinance Section 14.3', cost: '$35–$90', brand: 'Orbit 57860' },
  { city: 'Arlington', situation: 'Existing system no sensor', type: 'Wired or Wireless', compliance: 'Strongly recommended — Arlington Sustainable Water Program rebates available', cost: '$20–$90', brand: 'Any TX A&M certified sensor' },
];

export default function DFWRaindropSensorGuide() {
  const [selCity, setSelCity] = useState<string | null>(null);
  const [selSit, setSelSit] = useState<string | null>(null);
  const match = cities.find(c => c.city === selCity && (!selSit || c.situation === selSit));

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌧️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW Rain Sensor Guide for Irrigation
          </h1>
          <p style={{ color: '#94a3b8' }}>
            DFW cities require rain sensors on new irrigation systems. They prevent watering during and after rain events, saving 7,000+ gallons per year.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Your DFW City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {[...new Set(cities.map(c => c.city))].map(city => (
              <button
                key={city}
                onClick={() => setSelCity(city === selCity ? null : city)}
                style={{
                  background: selCity === city ? '#F5E642' : '#1e3a5f',
                  color: selCity === city ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s'
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {selCity && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            {(() => {
              const result = cities.find(c => c.city === selCity);
              if (!result) return null;
              return (
                <>
                  <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Rain Sensor Guidance — {result.city}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { label: 'Sensor Type', value: result.type },
                      { label: 'Code Compliance', value: result.compliance },
                      { label: 'Recommended Brands', value: result.brand },
                      { label: 'Estimated Cost', value: result.cost },
                    ].map(item => (
                      <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{item.label}</div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Wired vs Wireless Rain Sensors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { title: 'Wired', pro: 'No battery, always connected, lower cost', con: 'Requires running wire to controller', best: 'New installs, short controller distance' },
              { title: 'Wireless', pro: 'Easy retrofit, no wire run needed', con: 'Battery replacement every 2–3 years', best: 'Existing systems, long controller runs' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</div>
                <div style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '0.3rem' }}>+ {item.pro}</div>
                <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '0.3rem' }}>- {item.con}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Best: {item.best}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

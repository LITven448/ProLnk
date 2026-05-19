import { useState } from 'react';

const plantData = {
  indoor: [
    { name: 'Snake Plant', toxic: false, humid: 'low', acTolerant: true, note: 'Thrives in DFW AC-dry air, survives 40% humidity drops' },
    { name: 'ZZ Plant', toxic: true, humid: 'low', acTolerant: true, note: 'Extremely drought tolerant — perfect for DFW summer AC cycles' },
    { name: 'Pothos', toxic: true, humid: 'medium', acTolerant: true, note: 'Fast growing, tolerates DFW low-humidity winters well' },
    { name: 'Spider Plant', toxic: false, humid: 'medium', acTolerant: true, note: 'Pet-safe, handles DFW dry AC air with monthly misting' },
    { name: 'Peace Lily', toxic: true, humid: 'high', acTolerant: false, note: 'Needs humidity — use pebble tray in DFW dry winters' },
    { name: 'Boston Fern', toxic: false, humid: 'high', acTolerant: false, note: 'Pet-safe but struggles with DFW low humidity — bathroom only' },
  ],
  outdoor: [
    { name: 'Texas Sage', toxic: false, drought: true, heat: true, note: 'Native DFW plant — thrives in heat, nearly zero water once established' },
    { name: 'Knockout Rose', toxic: false, drought: false, heat: true, note: 'DFW favorite — blooms spring through fall, needs weekly water in summer' },
    { name: 'Lantana', toxic: true, drought: true, heat: true, note: 'Extreme heat tolerance — thrives in DFW 105°F+ but toxic to pets' },
    { name: 'Crepe Myrtle', toxic: false, drought: true, heat: true, note: 'Iconic DFW tree/shrub — drought tolerant after Year 2′ },
    { name: 'Salvia', toxic: false, drought: true, heat: true, note: 'Pollinator magnet, handles DFW clay soil and heat well' },
    { name: 'Oleander', toxic: true, drought: true, heat: true, note: 'WARNING: Highly toxic to pets and children — avoid if pets outdoors' },
  ],
};

export default function DFWInsideOutsidePlantGuide() {
  const [hasPets, setHasPets] = useState('');
  const [petType, setPetType] = useState('');
  const [homeType, setHomeType] = useState('');
  const [filtered, setFiltered] = useState<{ indoor: typeof plantData.indoor; outdoor: typeof plantData.outdoor } | null>(null);

  function getPlants() {
    if (!hasPets || !homeType) return;
    const petsIn = hasPets === 'yes';
    const indoorSafe = petsIn ? plantData.indoor.filter(p => !p.toxic) : plantData.indoor;
    const outdoorSafe = petsIn ? plantData.outdoor.filter(p => !p.toxic) : plantData.outdoor;
    const indoorFiltered = homeType === 'dry' ? indoorSafe.filter(p => p.acTolerant) : indoorSafe;
    setFiltered({ indoor: indoorFiltered, outdoor: outdoorSafe });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌿🌵</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Plant Guide: Inside & Outside</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's extreme summers, clay soil, and AC-dry winters make plant selection critical — especially when pets are in the home.</p>

        <div style={{ background: '#2d1515', border: '1px solid #f87171', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: '#f87171', fontWeight: 700, fontSize: 16 }}>⚠️ Toxic Plant Alert for DFW Pet Owners</p>
          <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 8 }}>Lantana, Oleander, ZZ Plant, Pothos, and Peace Lily are common in DFW landscaping and toxic to cats/dogs. Filter below for pet-safe options only.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Safe Plants for Your DFW Home</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Do you have pets?</label>
            <select value={hasPets} onChange={e => setHasPets(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="yes">Yes — cats or dogs</option>
              <option value="no">No pets</option>
            </select>
          </div>
          {hasPets === 'yes' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Pet type</label>
              <select value={petType} onChange={e => setPetType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                <option value="cat">Cat(s)</option>
                <option value="dog">Dog(s)</option>
                <option value="both">Both cats and dogs</option>
              </select>
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Indoor Air Condition</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="dry">Very dry — AC runs all summer, heater in winter</option>
              <option value="moderate">Moderate — humidifier used seasonally</option>
            </select>
          </div>
          <button onClick={getPlants} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Show Safe Plants for My DFW Home</button>
        </div>

        {filtered && (
          <>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🪴 Indoor Plants ({filtered.indoor.length} options)</h3>
              {filtered.indoor.map(p => (
                <div key={p.name} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>{p.name} {p.toxic ? '☠️' : '✅'}</p>
                  <p style={{ color: '#94a3b8', fontSize: 14 }}>{p.note}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🌳 Outdoor Plants ({filtered.outdoor.length} options)</h3>
              {filtered.outdoor.map(p => (
                <div key={p.name} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>{p.name} {p.toxic ? '☠️' : '✅'} {p.drought ? '💧' : ''}</p>
                  <p style={{ color: '#94a3b8', fontSize: 14 }}>{p.note}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

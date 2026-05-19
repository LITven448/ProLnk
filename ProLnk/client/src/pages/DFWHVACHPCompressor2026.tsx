import { useState } from 'react';

const systemTypes = [
  { id: 'heatpump', label: '🔄 Heat Pump System', desc: 'Heats & cools year-round' },
  { id: 'ac', label: '❄️ AC Only System', desc: 'Cooling season only' },
  { id: 'dual', label: '⚡ Dual Fuel System', desc: 'Heat pump + gas backup' },
];

const guideMap: Record<string, { title: string; points: string[] }> = {
  heatpump: {
    title: 'Heat Pump Compressor in DFW',
    points: [
      'Runs 12 months/year — both cooling AND heating modes',
      'DFW heat pump compressors log 3,000–4,500 hours/year vs 1,800 for AC-only',
      'Hard start kit is critical — cycling is far more frequent',
      'Refrigerant must handle both directions: expansion and compression',
      'Annual coil inspection recommended (spring + fall) due to dual-season use',
      'Reversing valve is unique to heat pumps — inspect every service visit',
    ],
  },
  ac: {
    title: 'AC Compressor in DFW',
    points: [
      'Runs April–October in DFW — roughly 1,800–2,400 hours/year',
      'Less wear than heat pump, but DFW summer heat is extreme (105°F+)',
      'Hard start kit still valuable — DFW power fluctuations during peak demand',
      'No reversing valve — simpler refrigerant circuit',
      'Spring startup check catches issues before peak demand season',
      'Capacitor failure most common DFW failure point in July–August',
    ],
  },
  dual: {
    title: 'Dual Fuel Compressor in DFW',
    points: [
      'Heat pump compressor handles all cooling + mild heating (above 35–40°F)',
      'Gas furnace takes over below balance point — compressor gets a winter break',
      'DFW dual fuel is optimal: 10–15 nights below balance point per year',
      'Compressor wear profile similar to standard AC — less than pure heat pump',
      'Hard start kit recommended on the heat pump side',
      'Annual maintenance: service both the heat pump AND furnace each fall',
    ],
  },
};

export default function DFWHVACHPCompressor2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🔄 Heat Pump vs AC Compressor in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Heat pump compressors run year-round in DFW — that changes everything about maintenance, wear, and failure patterns.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚡ Key Difference</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            An AC compressor runs ~2,000 hrs/year. A heat pump compressor in DFW runs up to <strong style={{ color: '#F5E642′ }}>4,500 hrs/year</strong> — over twice the wear for the same lifespan expectation.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>Select Your System Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {systemTypes.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#1e293b', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW HVAC Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}
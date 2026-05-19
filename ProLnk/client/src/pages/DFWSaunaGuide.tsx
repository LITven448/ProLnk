import { useState } from 'react';

type Location = 'Indoor' | 'Outdoor';
type SaunaType = 'Traditional Finnish' | 'Infrared' | 'Steam Room';
type Size = 'Small (1–2 person)' | 'Medium (3–4 person)' | 'Large (5–6 person)';

function estimateSauna(location: Location, size: Size, type: SaunaType) {
  const baseCosts: Record<Size, [number, number]> = {
    'Small (1–2 person)': [3000, 6000],
    'Medium (3–4 person)': [6000, 10000],
    'Large (5–6 person)': [10000, 15000],
  };
  let [low, high] = baseCosts[size];
  const electrical = type === 'Infrared' ? '20A 240V circuit (~$400–$800)' : '30–60A 240V circuit (~$800–$1,600)';
  const permitRequired = location === 'Indoor' || type !== 'Infrared';
  if (location === 'Outdoor') { low += 1500; high += 3000; }
  if (type === 'Traditional Finnish') { low += 500; high += 1000; }
  return { low, high, electrical, permitRequired };
}

export default function DFWSaunaGuide() {
  const [location, setLocation] = useState<Location | ''>('');
  const [size, setSize] = useState<Size | ''>('');
  const [type, setType] = useState<SaunaType | ''>('');
  const [showEstimate, setShowEstimate] = useState(false);

  const ready = location && size && type;
  const estimate = ready ? estimateSauna(location as Location, size as Size, type as SaunaType) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧖</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Home Sauna Installation Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            Contrast therapy is surging in DFW — an outdoor sauna paired with a cold plunge is one of the most requested upgrades of 2025–26.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '40px 0′ }}>
          {[
            { icon: '🌞', title: 'Outdoor in DFW Heat?', body: 'Counterintuitively popular. Contrast therapy (sauna → cold plunge → cool outdoor air) works year-round in DFW. A barrel sauna outside with a cold plunge tub is the #1 wellness trend among DFW homeowners.' },
            { icon: '⚡', title: 'Electrical Requirements', body: 'Traditional saunas need 30–60A at 240V. Infrared units often run on 20A 240V. Budget $800–$1,600 for a dedicated circuit with disconnect. Always hire a licensed Texas electrician.' },
            { icon: '📋', title: 'Permit Reality', body: 'Most DFW cities require a permit for permanent structures and any 240V electrical work. Typical permit: $150–$400. HOA approval is separate — get it in writing before ordering equipment.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#112240', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>🏠 Indoor Sauna Pros</h3>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#A8B8D0', fontSize: 14, lineHeight: 1.9 }}>
              <li>Year-round use regardless of weather extremes</li>
              <li>No separate structure permit in most cases</li>
              <li>Prefab kits fit in standard closet or spare bath</li>
              <li>Adds sq ft to appraisal value</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>🌿 Outdoor Sauna Pros</h3>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#A8B8D0', fontSize: 14, lineHeight: 1.9 }}>
              <li>Contrast therapy with cold plunge is transformative</li>
              <li>Barrel saunas are self-contained, easier install</li>
              <li>No moisture concerns for home structure</li>
              <li>Entertaining value — social wellness experience</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 14px' }}>🌡️ Type Comparison</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1E3A5F' }}>
                  {['Feature', 'Traditional Finnish', 'Infrared', 'Steam Room'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F5E642', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Temperature', '170–195°F', '120–150°F', '110–120°F'],
                  ['Humidity', 'Low–High (rocks)', 'Very Low', 'Very High'],
                  ['Cost Range', '$5K–$15K', '$3K–$8K', '$6K–$18K'],
                  ['Install Time', '1–3 days', '4–8 hrs', '2–5 days'],
                  ['DFW Popularity', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐'],
                ].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #1E3A5F' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '10px 12px', color: i === 0 ? '#E8EDF5′ : '#A8B8D0' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🧮 Sauna Cost Estimator</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Get a personalized estimate with electrical needs and permit requirements</p>

          {([
            { label: 'Location', value: location, setter: setLocation, options: ['Indoor', 'Outdoor'] },
            { label: 'Size', value: size, setter: setSize, options: ['Small (1–2 person)', 'Medium (3–4 person)', 'Large (5–6 person)'] },
            { label: 'Sauna Type', value: type, setter: setType, options: ['Traditional Finnish', 'Infrared', 'Steam Room'] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>{label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {options.map((opt: string) => (
                  <button key={opt} onClick={() => { (setter as (v: string) => void)(opt); setShowEstimate(false); }}
                    style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${value === opt ? '#F5E642' : '#1E3A5F'}`, background: value === opt ? '#F5E642′ : '#0D1B33', color: value === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={() => setShowEstimate(true)} disabled={!ready}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.5 }}>
            Calculate →
          </button>

          {showEstimate && estimate && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 20 }}>Estimate for {size} {type} ({location})</h3>
              <p style={{ fontSize: 32, fontWeight: 800, color: '#E8EDF5', margin: '0 0 16px' }}>${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</p>
              <div style={{ display: 'grid', gap: 10 }}>
                <p style={{ margin: 0, color: '#A8B8D0', fontSize: 14 }}>⚡ <strong style={{ color: '#E8EDF5′ }}>Electrical Requirement:</strong> {estimate.electrical}</p>
                <p style={{ margin: 0, color: '#A8B8D0', fontSize: 14 }}>📋 <strong style={{ color: '#E8EDF5′ }}>Permit Required:</strong> {estimate.permitRequired ? ’Yes — check with your city and HOA before purchasing' : 'Usually no permit for portable infrared units, but verify locally'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

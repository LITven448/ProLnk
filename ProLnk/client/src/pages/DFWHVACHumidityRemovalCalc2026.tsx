import { useState } from 'react';

const HUMIDITY_LEVELS = [
  { label: 'Mild (50-60% RH)', factor: 0.8 },
  { label: 'Moderate (60-70% RH)', factor: 1.0 },
  { label: 'High (70-80% RH)', factor: 1.3 },
  { label: 'Extreme (80%+ RH)', factor: 1.6 },
];

const MOISTURE_SOURCES = [
  { source: '🚿 Showers & Baths', pints: '2-4 pints/day' },
  { source: '🍳 Cooking', pints: '2-3 pints/day' },
  { source: '👗 Laundry (indoor dry)', pints: '4-6 pints/day' },
  { source: '🪴 Houseplants (10 plants)', pints: '1-2 pints/day' },
  { source: '💨 Air Infiltration (DFW summer)', pints: '3-8 pints/day' },
];

export default function DFWHVACHumidityRemovalCalc2026() {
  const [sqft, setSqft] = useState('');
  const [humidityIdx, setHumidityIdx] = useState(1);
  const [result, setResult] = useState<null | { latentBTU: number; pints: number; rec: string }>(null);

  function calculate() {
    const area = parseFloat(sqft);
    if (!area || area < 100) return;
    const factor = HUMIDITY_LEVELS[humidityIdx].factor;
    const latentBTU = Math.round(area * 12 * factor);
    const pints = Math.round(area * 0.04 * factor);
    const rec = pints > 70 ? 'Whole-home dehumidifier strongly recommended' :
      pints > 40 ? 'Consider supplemental whole-home dehumidifier' :
      'Standard AC dehumidification likely sufficient';
    setResult({ latentBTU, pints, rec });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>💧</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Humidity Removal Calculator 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Calculate AC dehumidification capacity for North Texas homes — latent heat loads, moisture sources, and whole-home dehumidifier guidance.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚙️ Latent Heat & Dehumidification Basics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Latent heat of vaporization', value: '1,076 BTU/lb moisture' },
              { label: 'DFW summer outdoor RH', value: '65-85% typical' },
              { label: 'AC removes ~', value: '1 pint/hr per ton' },
              { label: 'Comfort target', value: '45-55% indoor RH' },
            ].map(i => (
              <div key={i.label} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{i.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>{i.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Common DFW Moisture Sources</h2>
          {MOISTURE_SOURCES.map(m => (
            <div key={m.source} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E3A5F' }}>
              <span>{m.source}</span>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{m.pints}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 Dehumidification Need Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size (sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2400″
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Outdoor Humidity Level</label>
              <select value={humidityIdx} onChange={e => setHumidityIdx(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                {HUMIDITY_LEVELS.map((h, i) => <option key={h.label} value={i}>{h.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              Calculate Dehumidification Need
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div style={{ background: '#112240', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>Latent Load</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{result.latentBTU.toLocaleString()} BTU/hr</div>
                </div>
                <div style={{ background: '#112240', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>Daily Moisture</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{result.pints} pints/day</div>
                </div>
              </div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 14, color: '#E8EDF5′ }}>💡 {result.rec}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW HVAC Specialists · Get matched with a certified HVAC contractor</div>
      </div>
    </div>
  );
}
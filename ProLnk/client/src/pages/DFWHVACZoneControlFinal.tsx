import { useState } from 'react';

const zoneOptions = [
  { label: 'Under 1,500 sq ft, 1 story', zones: 1, method: 'Single-zone central AC', cost: 'N/A — already zoned' },
  { label: '1,500–3,000 sq ft, 2 story', zones: 2, method: 'Damper-based zoning', cost: '$2,500–$5,000′ },
  { label: '3,000+ sq ft, 2+ story', zones: '3–4', method: 'Damper-based zoning or mini-splits', cost: '$5,000–$12,000′ },
  { label: 'Home addition / bonus room', zones: '+1', method: 'Mini-split for addition', cost: '$2,000–$4,500′ },
  { label: 'Server room or wine cellar', zones: '+1', method: 'Dedicated mini-split', cost: '$1,800–$4,000′ },
];

const problems = [
  { label: 'Upstairs always hot in DFW summer', rec: 'Damper-based 2-zone system', note: 'Redirect more cold air upstairs during peak heat. Most common DFW upgrade.' },
  { label: 'One room always too cold', rec: 'Zone damper + controller adjustment', note: 'Partially close damper to that zone, rebalance airflow.' },
  { label: 'Addition not connected to ducts', rec: 'Dedicated mini-split for addition', note: 'Fastest, most efficient solution for unducted DFW additions.' },
  { label: 'Whole system struggles in 100°F+ heat', rec: 'System sizing review + zoning', note: 'Zoning reduces load, but undersized equipment must be replaced.' },
  { label: 'High energy bills despite good thermostat', rec: 'Zone control to cut runtime', note: 'Zones reduce conditioning of unused spaces — 20–30% savings typical.' },
];

export default function DFWHVACZoneControlFinal() {
  const [layout, setLayout] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<{ rec: string; note: string } | null>(null);

  function evaluate() {
    const matched = problems.find(p => p.label === problem);
    if (matched) setResult({ rec: matched.rec, note: matched.note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏘️ Zone Control Final Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>The complete zone control reference for DFW homeowners — what zones are, how many you need, and which approach fits your home.</p>

        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📐 Zone Sizing by DFW Home Type</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {zoneOptions.map(z => (
            <div key={z.label} style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>🏠 {z.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Method: {z.method}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#60a5fa', fontWeight: 700 }}>{z.zones} zone{z.zones !== 1 ? 's' : ''}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{z.cost}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 24 }}>🔧 Diagnose Your Zone Problem</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your DFW home layout</label>
            <select value={layout} onChange={e => setLayout(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select layout…</option>
              {zoneOptions.map(z => <option key={z.label}>{z.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your zone problem</label>
            <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select problem…</option>
              {problems.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Get Zone Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {result.rec}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ color: '#60a5fa', fontSize: 13 }}>ProLnk matches you with DFW HVAC zoning specialists within 24 hours.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

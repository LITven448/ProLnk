import { useState } from 'react';

export default function DFWSmartSprinklerCompare2026() {
  const [lotSize, setLotSize] = useState<string>('');
  const [zones, setZones] = useState<string>('');
  const [result, setResult] = useState<string>('');

  function recommend() {
    if (!lotSize || !zones) { setResult('Please select lot size and zone count.'); return; }
    if (zones === 'many' && lotSize === 'large') setResult('✅ RainBird ST8I-WiFi — Professional-grade, handles 16+ zones, most reliable for large DFW lots in Allen, Prosper, and Southlake.');
    else if (zones === 'many' && lotSize === 'small') setResult('✅ Rachio 3 (16-zone) — Best weather intelligence; ERCOT-aware skips after DFW storms; great for smaller lots with complex landscaping.');
    else if (zones === 'few' && lotSize === 'large') setResult('✅ Rachio 3 (8-zone) — Overkill protection; smart watering windows during DFW Stage 1/2 restrictions; upgrade later easily.');
    else setResult('✅ Orbit B-hyve — Best budget option for smaller DFW lawns. $79–$129, does the job without subscription fees.');
  }

  const btnStyle = (active: boolean) => ({
    padding: '.65rem 1.25rem', borderRadius: '8px', border: active ? '2px solid #F5E642′ : '2px solid #1e3a5f',
    backgroundColor: active ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', fontSize: '.9rem'
  });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0′ }}>DFW Smart Sprinkler Controller Comparison 2026</h1>
          <p style={{ color: '#94a3b8′ }}>Rachio vs RainBird vs Orbit B-hyve — what works best for North Texas lawns?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #22c55e' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🟢 Rachio 3</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.9rem' }}>
              <li>Best weather intelligence</li>
              <li>ERCOT-aware scheduling</li>
              <li>DFW Stage 1/2 watering restrictions</li>
              <li>$229 (8-zone) / $279 (16-zone)</li>
              <li>No subscription required</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #3b82f6′ }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔵 RainBird ST8I</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.9rem' }}>
              <li>Professional-grade reliability</li>
              <li>Most DFW irrigators install RainBird</li>
              <li>16-zone capacity for large lots</li>
              <li>$150–$200</li>
              <li>Alexa + Google Home compatible</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #f59e0b' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🟡 Orbit B-hyve</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.9rem' }}>
              <li>Best budget option in DFW</li>
              <li>Weather-skip feature included</li>
              <li>$79–$129</li>
              <li>Works with Alexa</li>
              <li>Good for basic DFW lawns</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌱 DFW Sprinkler Finder</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Lot size:</p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => setLotSize('small')} style={btnStyle(lotSize==='small')}>Under 0.25 acre</button>
              <button onClick={() => setLotSize('large')} style={btnStyle(lotSize==='large')}>0.25 acre+</button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Irrigation zones:</p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => setZones('few')} style={btnStyle(zones==='few')}>1–8 zones</button>
              <button onClick={() => setZones('many')} style={btnStyle(zones==='many')}>9+ zones</button>
            </div>
          </div>
          <button onClick={recommend} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Get My Controller →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>💧 DFW Water Restriction Note</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7′ }}>Most DFW municipalities (Frisco, Plano, McKinney, Allen) enforce Stage 1–2 water restrictions June–September. Rachio automatically respects odd/even watering schedules and skips after rainfall detected at nearby DFW weather stations — saving up to 30% on summer water bills.</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWWholehomeWifiGuide2026() {
  const [sqft, setSqft] = useState<string>('');
  const [devices, setDevices] = useState<string>('');
  const [result, setResult] = useState<string>('');

  function recommend() {
    if (!sqft || !devices) { setResult('Please select home size and device count.'); return; }
    if (sqft === 'xl' && devices === 'many') setResult('✅ Eero Pro 6E — Best for large DFW homes with 50+ smart devices. Tri-band 6E eliminates congestion. 3-pack covers up to 6,000 sqft.');
    else if (sqft === 'xl' && devices === 'few') setResult('✅ Google Nest WiFi Pro — Great for XL DFW homes with moderate devices. Seamless Google Home integration for Nest thermostats and cameras.');
    else if (sqft === 'large' && devices === 'many') setResult('✅ TP-Link Deco XE75 — Best value for DFW 3,500–5,000 sqft homes with heavy IoT load. 2-pack + optional add-on.');
    else if (sqft === 'large' && devices === 'few') setResult('✅ Google Nest WiFi Pro (2-pack) — Covers large DFW homes cleanly. Prioritizes video calls and streaming over smart plugs.');
    else setResult('✅ Eero 6+ — Solid WiFi 6 mesh for 2,500–3,500 sqft DFW homes. Affordable at $299 for 3-pack, no subscription needed.');
  }

  const btnStyle = (active: boolean) => ({
    padding: '.65rem 1.25rem', borderRadius: '8px', border: active ? '2px solid #F5E642' : '2px solid #1e3a5f',
    backgroundColor: active ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', fontSize: '.9rem'
  });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>📶</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0' }}>DFW Whole-Home WiFi Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Mesh WiFi systems for larger DFW homes — which covers your smart home best?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>🔵 Eero Pro 6E</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.85rem' }}>
              <li>WiFi 6E tri-band</li>
              <li>Best for 50+ IoT devices</li>
              <li>3-pack covers 6,000 sqft</li>
              <li>Amazon eero Plus security</li>
              <li>$599 (3-pack)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #4285F4' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>🔵 Google Nest WiFi Pro</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.85rem' }}>
              <li>WiFi 6E tri-band</li>
              <li>Matter hub built-in</li>
              <li>3-pack covers 6,600 sqft</li>
              <li>Google Home native</li>
              <li>$499 (3-pack)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.25rem', border: '2px solid #f59e0b' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>🟡 TP-Link Deco XE75</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '1rem', fontSize: '.85rem' }}>
              <li>WiFi 6E tri-band</li>
              <li>Best value for large DFW homes</li>
              <li>2-pack covers 4,000 sqft</li>
              <li>No subscription</li>
              <li>$349 (2-pack)</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏠 DFW Mesh WiFi Finder</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Home size:</p>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setSqft('medium')} style={btnStyle(sqft==='medium')}>2,500–3,500 sqft</button>
              <button onClick={() => setSqft('large')} style={btnStyle(sqft==='large')}>3,500–5,000 sqft</button>
              <button onClick={() => setSqft('xl')} style={btnStyle(sqft==='xl')}>5,000+ sqft</button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Connected smart devices:</p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => setDevices('few')} style={btnStyle(devices==='few')}>Under 25 devices</button>
              <button onClick={() => setDevices('many')} style={btnStyle(devices==='many')}>25+ devices</button>
            </div>
          </div>
          <button onClick={recommend} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Find My Mesh System →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642', lineHeight: '1.6' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>🏡 DFW Two-Story Placement Tip</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>DFW homes commonly have open floor plans with bonus rooms, media rooms, and detached garages. Place one mesh node per floor, and a third in the garage or back patio for smart sprinkler and camera coverage. Avoid placing nodes near microwaves or brick walls — common in DFW construction — which degrade 5GHz signal by up to 40%.</p>
        </div>
      </div>
    </div>
  );
}

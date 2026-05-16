import { useState } from 'react';

export default function DFWRingVsArloGuide2026() {
  const [homeSize, setHomeSize] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [result, setResult] = useState<string>('');

  function recommend() {
    if (!homeSize || !budget) { setResult('Please select home size and budget.'); return; }
    if (budget === 'low') setResult('✅ Ring — Most affordable entry point. Ring Stick Up Cam starts at $99. Subscription optional for basic live view.');
    else if (budget === 'mid' && homeSize === 'large') setResult('✅ Arlo Pro 4 — Better 2K video, local storage option, and no required sub for DFW large properties.');
    else if (budget === 'mid' && homeSize === 'small') setResult('✅ Ring — Ring Stick Up Cam 4 pack covers a smaller DFW home well; integrates with existing Alexa setup.');
    else if (budget === 'high') setResult('✅ Arlo Ultra 2 — 4K, color night vision, built-in spotlight. Best for high-end DFW properties needing premium footage.');
    else setResult('✅ Ring — Reliable, weatherproof, and great neighborhood alerts via Ring Neighbors app.');
  }

  const btnStyle = (active: boolean) => ({
    padding: '.65rem 1.25rem', borderRadius: '8px', border: active ? '2px solid #F5E642' : '2px solid #1e3a5f',
    backgroundColor: active ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', fontSize: '.9rem'
  });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>📷</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0' }}>Ring vs Arlo for DFW Home Security 2026</h1>
          <p style={{ color: '#94a3b8' }}>Which outdoor camera system handles North Texas weather and protects your home best?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #1c7ed6' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>💍 Ring</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>Amazon ecosystem (Alexa native)</li>
              <li>Ring Neighbors DFW community alerts</li>
              <li>Affordable entry price ($99–$199)</li>
              <li>Ring Alarm integration</li>
              <li>IP55 weatherproof (DFW hail/heat rated)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #7c3aed' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>📡 Arlo</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>2K–4K video quality (sharper footage)</li>
              <li>Local storage (no subscription needed)</li>
              <li>100% wire-free with solar option</li>
              <li>IP65 weather resistance (better for DFW storms)</li>
              <li>Works with Alexa, Google Home, HomeKit</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏠 DFW Camera Finder</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Home size:</p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => setHomeSize('small')} style={btnStyle(homeSize==='small')}>Under 2,500 sqft</button>
              <button onClick={() => setHomeSize('large')} style={btnStyle(homeSize==='large')}>2,500 sqft+</button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Budget (full system):</p>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setBudget('low')} style={btnStyle(budget==='low')}>💚 Under $300</button>
              <button onClick={() => setBudget('mid')} style={btnStyle(budget==='mid')}>💛 $300–$700</button>
              <button onClick={() => setBudget('high')} style={btnStyle(budget==='high')}>🔴 $700+</button>
            </div>
          </div>
          <button onClick={recommend} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Get My Recommendation →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>⛈️ DFW Weather Note</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>Both Ring and Arlo are rated for outdoor DFW use, but Arlo's IP65 rating handles the extreme heat (110°F+), hail, and flash flooding better. If your cameras face west in Frisco, McKinney, or Plano — direct afternoon sun — choose Arlo for superior thermal tolerance.</p>
        </div>
      </div>
    </div>
  );
}

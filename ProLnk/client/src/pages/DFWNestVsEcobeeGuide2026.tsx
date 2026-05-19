import { useState } from 'react';

export default function DFWNestVsEcobeeGuide2026() {
  const [homeSize, setHomeSize] = useState<string>('');
  const [ecosystem, setEcosystem] = useState<string>('');
  const [result, setResult] = useState<string>('');

  function recommend() {
    if (!homeSize || !ecosystem) { setResult('Please select both home size and ecosystem.'); return; }
    if (homeSize === 'large' && ecosystem === 'google') setResult('✅ Nest — Google Home integration + learning algorithm perfect for your large DFW home and Google ecosystem.');
    else if (homeSize === 'large' && ecosystem === 'amazon') setResult('✅ Ecobee — Room sensors handle large DFW homes better; ERCOT demand response built-in; Alexa-native.');
    else if (homeSize === 'small' && ecosystem === 'google') setResult('✅ Nest — Sleek design, Google integration, great for smaller DFW homes under 2,000 sqft.');
    else if (homeSize === 'small' && ecosystem === 'amazon') setResult('✅ Ecobee — Great for any size; SmartSensor for bedroom comfort; Alexa built-in on device.');
    else if (homeSize === 'large' && ecosystem === 'none') setResult('✅ Ecobee — Clear winner for large DFW homes. Room sensors eliminate hot/cold spots common in Texas two-stories.');
    else setResult('✅ Nest — Clean design, easy setup, great learning algorithm for smaller DFW homes.');
  }

  const btnStyle = (active: boolean) => ({
    padding: '.65rem 1.25rem', borderRadius: '8px', border: active ? '2px solid #F5E642′ : '2px solid #1e3a5f',
    backgroundColor: active ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', fontSize: '.9rem'
  });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0′ }}>Nest vs Ecobee for DFW 2026</h1>
          <p style={{ color: '#94a3b8′ }}>The two best smart thermostats — which is right for your DFW home?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #4285F4′ }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🔵 Google Nest</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>Sleek, minimal design</li>
              <li>Self-learning algorithm</li>
              <li>Google Home / Assistant native</li>
              <li>Farsight display shows time/temp</li>
              <li>Works with most DFW HVAC systems</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #00BFA5′ }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🟢 Ecobee SmartThermostat</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>Room SmartSensors included</li>
              <li>ERCOT demand response ready</li>
              <li>Alexa built-in on device</li>
              <li>Ideal for 2,500+ sqft DFW homes</li>
              <li>Better energy reports + utility rebates</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏠 DFW Thermostat Finder</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Home size:</p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => setHomeSize('small')} style={btnStyle(homeSize==='small')}>Under 2,500 sqft</button>
              <button onClick={() => setHomeSize('large')} style={btnStyle(homeSize==='large')}>2,500 sqft+</button>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem' }}>Your ecosystem:</p>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setEcosystem('google')} style={btnStyle(ecosystem==='google')}>🔵 Google / Android</button>
              <button onClick={() => setEcosystem('amazon')} style={btnStyle(ecosystem==='amazon')}>🟠 Amazon / Alexa</button>
              <button onClick={() => setEcosystem('none')} style={btnStyle(ecosystem==='none')}>No preference</button>
            </div>
          </div>
          <button onClick={recommend} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Find My Thermostat →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642′ }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>⚡ DFW ERCOT Tip</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7′ }}>Oncor and TXU offer rebates up to $100 for Ecobee installation. Ecobee participates in ERCOT demand response — your thermostat pre-cools your DFW home before peak hours, saving money without sacrificing comfort during Texas summers.</p>
        </div>
      </div>
    </div>
  );
}

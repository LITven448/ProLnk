import { useState } from 'react';

export default function DFWHVACCapacitorTest2026() {
  const [microfarads, setMicrofarads] = useState('');
  const [rated, setRated] = useState('');
  const [capacitorType, setCapacitorType] = useState('run');
  const [result, setResult] = useState('');

  function assess() {
    const actual = parseFloat(microfarads);
    const rate = parseFloat(rated);
    if (isNaN(actual) || isNaN(rate) || rate <= 0) {
      setResult('Enter valid microfarad readings to continue.');
      return;
    }
    const deviation = Math.abs((actual - rate) / rate) * 100;
    if (deviation <= 10) {
      setResult('✅ Within 10% tolerance — capacitor is serviceable. Monitor next season.');
    } else if (deviation <= 20) {
      setResult('⚠️ 10–20% deviation — capacitor is weakening. Replace before peak DFW summer heat.');
    } else {
      setResult('🔴 Over 20% deviation — capacitor has failed. Replace immediately to prevent compressor damage.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚡ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Capacitor Testing Guide for DFW Technicians</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW heat degrades capacitors faster than almost any US market. Electrolytic fluid inside capacitors evaporates under sustained 100°F+ temperatures, causing capacitance to drop below rated tolerance.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 How to Test a Capacitor</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['1', 'Discharge capacitor safely before testing — use insulated resistor across terminals'],
              ['2', 'Set capacitor tester to measure microfarads (µF)'],
              ['3', 'Connect leads to capacitor terminals'],
              ['4', 'Read actual µF value and compare to rated value printed on capacitor label'],
              ['5', 'Apply the 10% tolerance rule — actual must be within ±10% of rated'],
            ].map(([n, text]) => (
              <div key={n} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{n}</span>
                <span style={{ color: '#cbd5e1′ }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌡️ Start vs Run Capacitors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>▶️ Start Capacitor</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>High µF rating (70–300µF). Engages only during motor startup. Fails from infrequent use in milder climates; in DFW, frequent cycling wears them faster.</div>
            </div>
            <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔄 Run Capacitor</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Lower µF rating (3–70µF). Runs continuously during operation. DFW units run 2,000+ hours/summer, evaporating electrolytic fluid and dropping capacitance.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧪 Capacitor Test Calculator</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Capacitor Type</label>
              <select value={capacitorType} onChange={e => setCapacitorType(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                <option value='run'>Run Capacitor</option>
                <option value='start'>Start Capacitor</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Rated µF (from label)</label>
              <input type='number' value={rated} onChange={e => setRated(e.target.value)} placeholder='e.g. 45′ style={{ display: ’block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Actual Measured µF</label>
              <input type='number' value={microfarads} onChange={e => setMicrofarads(e.target.value)} placeholder='e.g. 41′ style={{ display: ’block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem', boxSizing: 'border-box' }} />
            </div>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Assess Capacitor</button>
            {result && <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#F5E642′ }}>{result}</div>}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' }}>ProLnk DFW HVAC Resource 2026 — For licensed HVAC technicians only</div>
      </div>
    </div>
  );
}
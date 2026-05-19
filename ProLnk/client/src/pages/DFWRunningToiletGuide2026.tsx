import { useState } from 'react';

export default function DFWRunningToiletGuide2026() {
  const [symptom, setSymptom] = useState('');
  const [fix, setFix] = useState('');

  const diagnose = () => {
    if (symptom === 'constant-run') {
      setFix('🔴 Flapper Valve Failure — DFW hard water corrodes rubber flappers 2-3x faster than soft water areas. Lift the tank lid and press the flapper down. If running stops: flapper is bad. DIY fix: $10-15 at any hardware store, 15 minutes. DFW residents should replace flappers every 2-3 years preventively.');
    } else if (symptom === 'intermittent') {
      setFix('💧 Ghost Flushing — Fill valve or flapper is leaking slowly. Add food coloring to tank; if color appears in bowl without flushing, flapper is leaking. Fill valve leak: water level too high, overflowing into overflow tube. Adjust float arm or replace fill valve ($15-25 DIY, $100-150 plumber).');
    } else if (symptom === 'hissing') {
      setFix('🌊 Fill Valve Worn Out. The hissing sound is water forcing through a failing fill valve seal. DFW mineral deposits clog the diaphragm inside the valve. Replace the entire fill valve — $20-30 for a Fluidmaster 400A, about 30 minutes DIY. Plumber cost: $100-180.');
    } else if (symptom === 'weak-flush') {
      setFix('🪣 Rim Jets Clogged with Minerals. DFW hard water deposits calcium in the toilet rim holes over time, reducing flush power. Use a mirror to inspect rim holes; use a wire or straightened coat hanger to clear each hole. Follow with a white vinegar soak (pour into overflow tube, wait 1 hour).');
    } else {
      setFix('Select your toilet symptom above for a diagnosis.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Running Toilet Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>
          A running toilet wastes up to 200 gallons per day — roughly $70/month on your DFW water bill. DFW hard water corrodes flapper valves 2-3x faster than the national average.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 16, marginBottom: 24, fontWeight: 600 }}>
          💸 A running toilet in DFW costs $70-100/month in wasted water. Fix it today.
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔑 DFW Hard Water Impact on Toilets</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW water hardness: 300-500 ppm (very hard — national avg is 170 ppm)</li>
            <li>Rubber flappers fail in 2-3 years vs. 5+ years in soft water areas</li>
            <li>Mineral deposits clog rim jets, reducing flush performance</li>
            <li>Fill valve diaphragms clog with calcium deposits within 3-4 years</li>
            <li>Annual toilet inspection recommended for all DFW homeowners</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Diagnose Your Running Toilet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Toilet Symptom</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select symptom...</option>
              <option value="constant-run">🔴 Constantly running water sound</option>
              <option value="intermittent">👻 Random flushing by itself (ghost flush)</option>
              <option value="hissing">🌊 Hissing sound from tank</option>
              <option value="weak-flush">🌀 Weak or slow flush</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get My Fix
          </button>
          {fix && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>
              {fix}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🛠️ Repair vs. Replace Costs</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { item: 'Flapper valve (DIY)', cost: '$10-15′ },
              { item: 'Fill valve (DIY)', cost: '$20-30′ },
              { item: 'Fill valve (plumber)', cost: '$100-180′ },
              { item: 'Full rebuild kit (DIY)', cost: '$25-40′ },
              { item: 'New toilet installed', cost: '$350-650′ },
            ].map(r => (
              <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 8 }}>
                <span style={{ color: '#cbd5e1′ }}>{r.item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
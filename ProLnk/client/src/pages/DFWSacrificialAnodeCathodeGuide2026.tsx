import { useState } from 'react';

export default function DFWSacrificialAnodeCathodeGuide2026() {
  const [hardness, setHardness] = useState(300);
  const [heaterAge, setHeaterAge] = useState(3);

  function getSchedule() {
    if (hardness > 250 && heaterAge >= 2) return { urgency: 'Replace Now', color: '#ef4444', interval: 'Every 2 years' };
    if (hardness > 150 && heaterAge >= 3) return { urgency: 'Inspect Soon', color: '#f59e0b', interval: 'Every 3 years' };
    return { urgency: 'On Schedule', color: '#22c55e', interval: 'Every 4-5 years' };
  }

  const result = getSchedule();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>🔧 ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          🔋 DFW Water Heater Cathodic Protection Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Why sacrificial anode rods fail fast in DFW hard water — and what to do about it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💧', label: 'DFW Water Hardness', value: '300+ ppm', note: '2x national avg' },
            { icon: '⏱️', label: 'Anode Lifespan in DFW', value: '2–3 years', note: 'vs 5 nationally' },
            { icon: '🛡️', label: 'Best Anode Material', value: 'Magnesium', note: 'Ideal for hard water' },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{card.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{card.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚗️ The Science of DFW Hard Water</h2>
          {[
            'DFW water averages 300+ ppm calcium carbonate — double the national average of 150 ppm.',
            'Calcium deposits accelerate corrosion inside the tank, consuming anode rods 2x faster.',
            'Magnesium anodes react better than aluminum in DFW high-mineral water chemistry.',
            'Dual anode tanks provide double protection — worth the premium in DFW conditions.',
            'A depleted anode rod leaves the steel tank exposed, leading to rust and tank failure.',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642' }}>▸</span>
              <span style={{ color: '#cbd5e1' }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🧮 Your Anode Replacement Calculator</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Local Water Hardness (ppm): <strong style={{ color: '#F5E642' }}>{hardness}</strong></label>
            <input type="range" min={50} max={450} value={hardness} onChange={e => setHardness(Number(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: '#F5E642' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Water Heater Age (years): <strong style={{ color: '#F5E642' }}>{heaterAge}</strong></label>
            <input type="range" min={1} max={15} value={heaterAge} onChange={e => setHeaterAge(Number(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: '#F5E642' }} />
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: result.color, fontWeight: 800, fontSize: '1.3rem' }}>{result.urgency}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Recommended interval: {result.interval}</div>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Replacement Procedure</h2>
          {['Turn off cold water supply and heater power/gas', 'Connect garden hose to drain valve, flush 2–3 gallons', 'Locate anode port (usually under top panel or hex plug on top)', 'Use 1-1/16" socket to remove old rod — expect resistance', 'Wrap new magnesium rod threads with Teflon tape', 'Torque to 40–50 ft-lbs, restore water and power'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: '#cbd5e1' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWRoofingFlashingFailure2026() {
  const [flashingType, setFlashingType] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    const map: Record<string, string> = {
      step: '📐 Step Flashing Failure: Most common DFW roofer error — single-piece flashing instead of individual L-shaped pieces per shingle course. Each piece must overlap the one below. Replace with code-compliant step flashing and counter-flashing at all wall intersections.',
      boot: '🔧 Pipe Boot Cracking: DFW UV and temperature swings (-5°F to 110°F) destroy rubber pipe boots in 7–10 years. Replace with EPDM or silicone boots rated for DFW UV exposure. Neoprene fails fastest.',
      caulk: '🌡️ Caulk Deterioration: DFW thermal cycling causes caulk to crack and separate within 3–5 years. Use polyurethane caulk rated for 500°F+ surface temps. Never use silicone as a primary flashing seal.',
      valley: '🏔️ Valley Flashing: Open metal valleys in DFW require 24-gauge galvanized or aluminum. W-profile valleys channel DFW storm runoff better than V-profile. Ensure 4-inch exposure minimum each side.',
    };
    setResult(map[flashingType] || 'Select a flashing failure type above.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🌧️ DFW Roofing Flashing Failure Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Why flashing fails in DFW — extreme temp swings, UV degradation, and the most common installation errors DFW roofers make.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', title: '115°F Temp Swings', desc: 'DFW ranges from -5°F to 110°F+. Thermal expansion/contraction shears caulk and pulls flashing from substrates.' },
            { icon: '☀️', title: 'Extreme UV Loading', desc: 'DFW receives 220+ sunny days per year. Rubber pipe boots and caulk degrade 2–3x faster than northern climates.' },
            { icon: '📐', title: 'Step Flashing Errors', desc: 'Most DFW roofers install single-piece step flashing instead of individual overlapping L-pieces — the most common failure point.' },
            { icon: '⚡', title: 'Storm Vulnerability', desc: 'DFW hailstorms and high winds expose flashing failures. A 2-inch hail event will find every compromised seal.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🔧 Flashing Repair Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>What type of flashing failure do you have?</label>
            <select value={flashingType} onChange={e => setFlashingType(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
              <option value="">Select flashing type...</option>
              <option value="step">Step flashing at wall intersections</option>
              <option value="boot">Pipe boot cracking or leaking</option>
              <option value="caulk">Caulk separation or deterioration</option>
              <option value="valley">Valley flashing failure</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Repair Guide
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

export default function DFWDrainCleaningGuide2026() {
  const [drainType, setDrainType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [solution, setSolution] = useState('');

  const recommend = () => {
    if (!drainType || !frequency) { setSolution('Please select drain type and clog frequency.'); return; }
    const solutions: Record<string, Record<string, string>> = {
      kitchen: {
        rare: '✅ DIY SAFE: Use boiling water + dish soap monthly. Enzyme drain cleaner quarterly. Avoid chemical drain openers — they damage DFW clay pipes.',
        occasional: '⚠️ SNAKE + ENZYME: Professional snaking ($100–200) + monthly enzyme treatment. Grease + hard water minerals are likely culprits.',
        frequent: '🚨 HYDRO-JET NOW: Frequent kitchen clogs = grease buildup in main line. Hydro-jetting ($300–600) clears the full line. Annual maintenance recommended.',
      },
      bathroom: {
        rare: '✅ DIY SAFE: Hair catcher + monthly enzyme treatment. Occasional plunger use. Hair + DFW mineral scale is manageable with prevention.',
        occasional: '⚠️ PROFESSIONAL SNAKE: Hair + soap scum + mineral scale needs mechanical clearing. Professional snaking $100–150. Add enzyme treatment after.',
        frequent: '🚨 INSPECT + JET: Frequent bathroom clogs may indicate partial pipe blockage or scale buildup. Camera inspection + hydro-jetting recommended ($400–700).',
      },
      mainline: {
        rare: '✅ PREVENTIVE: Annual camera inspection for homes 15+ years old. DFW tree roots grow into main lines silently.',
        occasional: '⚠️ CAMERA FIRST: Occasional main line backup needs camera scope ($150–300) before treatment. Roots vs grease vs bellied pipe — each needs different fix.',
        frequent: '🚨 URGENT: Frequent main line backups = serious blockage or structural issue. Camera inspection immediately. Potential trenchless repair $3,000–8,000.',
      },
    };
    setSolution(solutions[drainType]?.[frequency] || 'No recommendation available for this combination.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🚿 DFW Drain Cleaning Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW hard water minerals combine with grease and hair to clog drains faster than most US cities. Know when to DIY and when to call a pro.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔫', title: 'Hydro-Jetting', desc: 'High-pressure water blast clears grease, scale, and roots. Best for recurring clogs and main line maintenance. $300–600.' },
            { icon: '🐍', title: 'Mechanical Snaking', desc: 'Cable snake breaks through clogs. Best for hair and soft obstructions. $100–200. Does not remove scale buildup.' },
            { icon: '🧪', title: 'Enzyme Treatment', desc: 'Monthly enzyme cleaners (Bio-Clean, Green Gobbler) digest organic matter. Safe for pipes, prevents DFW mineral/grease combo buildup.' }
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642′ }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🔧 Find Your Drain Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Drain Type</label>
              <select value={drainType} onChange={e => setDrainType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select drain</option>
                <option value="kitchen">Kitchen Sink</option>
                <option value="bathroom">Bathroom (sink/tub/shower)</option>
                <option value="mainline">Main Sewer Line</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Clog Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select frequency</option>
                <option value="rare">Rare (once a year or less)</option>
                <option value="occasional">Occasional (every few months)</option>
                <option value="frequent">Frequent (monthly or more)</option>
              </select>
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get My Solution →</button>
          {solution && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>{solution}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628′ }}>
          <strong>💡 DFW Pro Tip:</strong> Never use chemical drain openers (Drano, etc.) in older DFW homes — they accelerate corrosion in cast iron pipes. Enzyme cleaners and hydro-jetting are always safer.
        </div>
      </div>
    </div>
  );
}

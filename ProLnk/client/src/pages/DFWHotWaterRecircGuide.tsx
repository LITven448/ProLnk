import { useState } from 'react';

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const waitTimes = ['Under 30 seconds', '30–60 seconds', '1–2 minutes', '2–3 minutes', '3+ minutes'];

export default function DFWHotWaterRecircGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [result, setResult] = useState<null | { system: string; cost: string; operating: string; note: string }>(null);

  function calculate() {
    if (!homeSize || !waitTime) return;
    const isLarge = homeSize === '4,000+ sqft' || homeSize === '2,500–4,000 sqft';
    const isShortWait = waitTime === 'Under 30 seconds' || waitTime === '30–60 seconds';
    const isLongWait = waitTime === '3+ minutes' || waitTime === '2–3 minutes';

    const system = isShortWait
      ? '✅ No recirculation needed — your current setup performs well'
      : isLarge && isLongWait
      ? '🔄 Full recirculation loop recommended — dedicated return line + pump for max comfort'
      : '⚡ On-demand pump recommended — installs under sink, no return line needed';

    const cost = isShortWait
      ? '💰 No investment needed'
      : isLarge && isLongWait
      ? '💰 Full loop: $1,200–$2,500 installed (includes return line and pump)'
      : '💰 On-demand pump: $200–$500 installed (Watts 500800 or Taco 006-B4)';

    const operating = isShortWait
      ? '⚡ Current operating cost is already minimal'
      : isLarge && isLongWait
      ? '⚡ Full loop: ~$80–$120/year in electricity (timer or smart control reduces this)'
      : '⚡ On-demand: ~$15–$30/year in electricity — only runs when you press the button';

    const note = isLarge
      ? '📍 DFW tip: Large homes in Frisco, McKinney, Prosper often have 60–80 ft pipe runs — recirculation saves 2,000+ gallons/year'
      : '📍 DFW tip: Even in moderate-sized homes, DFW water waste costs ~$40/year waiting for hot water';

    setResult({ system, cost, operating, note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💧 DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hot Water Recirculation for DFW Homes</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Stop waiting 3 minutes for hot water. DFW's large homes make recirculation pumps especially valuable.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⏱️', label: '2,000+ Gallons', sub: 'wasted/year waiting for hot water' },
            { icon: '🏠', label: 'DFW Homes Avg', sub: '2,800 sqft — long pipe runs' },
            { icon: '💰', label: '$15–$30/yr', sub: 'operating cost for on-demand pump' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.5rem' }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Pump Types Explained</h2>
          {[
            { type: '🔄 Full Recirculation Loop', desc: 'Dedicated return line runs hot water back to heater constantly. Instant hot water everywhere. Best for new construction or major remodels.' },
            { type: '⚡ On-Demand Pump', desc: 'Installs under the farthest sink with a crossover valve. Press a button or use motion sensor — hot water arrives in 15–30 seconds. No return line needed.' },
            { type: '⏰ Timer-Based Pump', desc: 'Runs on a schedule (e.g., 6–8am, 5–7pm). Convenient but wastes energy when no one is home. Less popular in DFW.' },
          ].map(p => (
            <div key={p.type} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1E3A5F' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.3rem' }}>{p.type}</div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Recirculation System Finder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Hot Water Wait Time</label>
              <select value={waitTime} onChange={e => setWaitTime(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {waitTimes.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Find My Recirculation Solution →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your Recommendation</h3>
            {[result.system, result.cost, result.operating, result.note].map((v, i) => (
              <div key={i} style={{ color: '#ccc', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{v}</div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Get quotes from DFW plumbing pros on ProLnk — free, no commitment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

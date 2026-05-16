import { useState } from 'react';

export default function DFWShowerheadGuide2026() {
  const [hardness, setHardness] = useState('extreme');
  const [style, setStyle] = useState('rainfall');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (hardness === 'extreme' && style === 'rainfall') {
      setResult('🚿 Filtered Rainfall Head — KDF-55 filter blocks calcium, 8-inch face, replace filter every 6 months in DFW 300+ ppm water.');
    } else if (hardness === 'extreme' && style === 'handheld') {
      setResult('🚿 Filtered Handheld — KDF filter + 60-inch hose, pressure-compensating for DFW fluctuations, descale monthly with white vinegar.');
    } else if (hardness === 'moderate' && style === 'rainfall') {
      setResult('🚿 Standard Rainfall Head — silicone nozzles self-clean mineral deposits, descale every 2 months, no filter required.');
    } else {
      setResult('🚿 Standard Handheld — rubber nozzles resist scale, 5-setting spray, descale quarterly, good for DFW moderate zones.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚿 DFW Showerhead Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Best showerheads for Dallas-Fort Worth hard water — 300+ ppm calcium means monthly deposits without the right head.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚗️', title: 'DFW Water = 300+ ppm', desc: 'Among hardest in Texas — calcium deposits visible within weeks on standard heads.' },
            { icon: '🔬', title: 'KDF Filters', desc: 'KDF-55 media removes chlorine + reduces scale. Replace every 6 months in DFW conditions.' },
            { icon: '💧', title: 'Pressure Swings', desc: 'DFW water pressure fluctuates 40–80 PSI. Pressure-balancing valves protect handheld heads.' },
            { icon: '🧼', title: 'Descaling Schedule', desc: 'Unfiltered: monthly vinegar soak. Filtered: every 2–3 months. Silicone nozzles self-clear.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Find Your Showerhead</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>DFW Water Hardness Zone</label>
            <select value={hardness} onChange={e => setHardness(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="extreme">Extreme (300+ ppm — Plano, Frisco, McKinney)</option>
              <option value="moderate">Moderate (150–299 ppm — Fort Worth, Arlington)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Preferred Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="rainfall">Rainfall (overhead, spa feel)</option>
              <option value="handheld">Handheld (flexible, rinse control)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation →</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber to install your new showerhead?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>⚡ ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}

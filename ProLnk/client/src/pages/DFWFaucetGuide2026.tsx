import { useState } from 'react';

export default function DFWFaucetGuide2026() {
  const [location, setLocation] = useState('north');
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (budget === 'premium') {
      setResult('🚰 Moen Arbor (Lifetime Warranty) — ceramic disc cartridge handles DFW 300+ ppm minerals without degrading. Brass body resists buildup far better than chrome-plated zinc in DFW hard water.');
    } else if (budget === 'mid' && location === 'north') {
      setResult('🚰 Delta Leland — single-handle ceramic disc, spot-resist finish fights DFW calcium spots, descale every 3 months with vinegar on aerator.');
    } else if (budget === 'mid' && location === 'south') {
      setResult('🚰 Kohler Simplice — brass body, ceramic disc, pull-down head, good for Fort Worth moderate hardness zones. Descale every 4 months.');
    } else {
      setResult('🚰 American Standard Colony — budget-friendly ceramic disc, replace aerator annually in DFW hard water, avoid ball-type valves (mineral clogging common in 300+ ppm zones).');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚰 DFW Faucet Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Best kitchen faucets for Dallas-Fort Worth hard water — ceramics beat ball valves, brass beats chrome in 300+ ppm mineral environments.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🏺', title: 'Ceramic Disc > Ball Valve', desc: 'Ball-type valves fail faster in DFW hard water. Ceramic discs handle mineral-laden water without eroding.' },
            { icon: '🔩', title: 'Brass Body Required', desc: 'Brass resists DFW mineral buildup 3x longer than chrome-plated zinc. Look for solid brass valve body.' },
            { icon: '🛡️', title: 'Moen Lifetime Warranty', desc: 'Best warranty program for DFW hard water damage — covers cartridge failures from mineral wear.' },
            { icon: '🧽', title: 'Descaling Schedule', desc: 'Aerator: every 3 months. Spray head: quarterly vinegar soak. Body: wipe weekly to prevent etch marks.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Find Your DFW Faucet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="north">North DFW (Frisco, Plano, McKinney — extreme hardness)</option>
              <option value="south">South/West DFW (Fort Worth, Arlington — moderate hardness)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="premium">Premium ($300+)</option>
              <option value="mid">Mid-Range ($100–$299)</option>
              <option value="budget">Budget (Under $100)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation →</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber to install your faucet?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>⚡ ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}

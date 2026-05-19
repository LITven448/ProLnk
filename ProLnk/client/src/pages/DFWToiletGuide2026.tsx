import { useState } from 'react';

export default function DFWToiletGuide2026() {
  const [priority, setPriority] = useState('water');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (priority === 'water') {
      setResult('Dual-Flush Elongated: 1.28/0.8 GPF saves water during DFW Stage 1-3 restrictions. TOTO Drake or American Standard Champion. Elongated bowl fits standard DFW 12-inch rough-in.');
    } else if (priority === 'comfort') {
      setResult('Comfort Height Elongated: ADA-compliant 17-19 inch seat height, fastest-growing DFW seller since 2023. Dual-flush still recommended for DFW drought restrictions.');
    } else if (priority === 'durability') {
      setResult('Vitreous China One-Piece: Tower flush valve resists DFW hard water mineral buildup. Flappers in DFW degrade in 12-18 months vs 5+ years for tower valves.');
    } else {
      setResult('Round Two-Piece Budget: compact round bowl saves 2-3 inches, replace internals with Fluidmaster 400AH PerforMax every 2 years in DFW hard water.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Toilet Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Choosing the right toilet for Dallas-Fort Worth homes. Water restrictions, hard water wear on internals, and comfort height trends.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: 'Water', title: 'DFW Water Restrictions', desc: 'Stage 1-3 drought restrictions hit DFW regularly. Dual-flush toilets (1.28/0.8 GPF) keep you compliant and cut bills.' },
            { icon: 'Parts', title: 'Hard Water and Internals', desc: 'DFW 300+ ppm destroys rubber flappers in 12-18 months. Tower flush valves last 5x longer.' },
            { icon: 'Size', title: 'Elongated vs Round', desc: 'Standard DFW rough-in is 12 inches. Elongated adds comfort, round saves 2-3 inches in tighter bathrooms.' },
            { icon: 'Height', title: 'Comfort Height Trend', desc: '17-19 inch seat height now outsells standard in DFW. ADA compliant and aging-in-place friendly.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642', fontSize: 12, textTransform: 'uppercase' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>Find Your DFW Toilet</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Top Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: 12, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="water">Water Savings (DFW restriction compliance)</option>
              <option value="comfort">Comfort Height (aging-in-place, ADA)</option>
              <option value="durability">Durability (hard water resistance)</option>
              <option value="budget">Budget (lowest upfront cost)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber to install your toilet?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}


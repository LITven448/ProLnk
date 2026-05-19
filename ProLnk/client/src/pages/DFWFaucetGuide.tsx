import { useState } from 'react';

const faucets = [
  { valve: 'Ceramic Disc', finish: 'Brushed Nickel', location: 'any', durability: 'Excellent', cost: '$150–$400', lifespan: '20+ years', brands: 'Moen, Delta, Kohler', note: 'Best for DFW hard water — virtually leak-proof' },
  { valve: 'Ceramic Disc', finish: 'Oil-Rubbed Bronze', location: 'kitchen', durability: 'Excellent', cost: '$200–$500', lifespan: '20+ years', brands: 'Pfister, American Standard', note: 'Hides DFW mineral stains beautifully' },
  { valve: 'Cartridge', finish: 'Brushed Nickel', location: 'bathroom', durability: 'Good', cost: '$80–$250', lifespan: '10–15 years', brands: 'Moen, Price Pfister', note: 'Easy DFW repair — cartridges are inexpensive' },
  { valve: 'Ball', finish: 'Chrome', location: 'kitchen', durability: 'Fair', cost: '$50–$150', lifespan: '8–12 years', brands: 'Delta, Various', note: 'Chrome shows DFW hard water spots easily' },
];

export default function DFWFaucetGuide() {
  const [location, setLocation] = useState('');
  const [hardness, setHardness] = useState('');
  const [result, setResult] = useState<typeof faucets[0] | null>(null);

  function getRecommendation() {
    if (!location || !hardness) return;
    let scored = faucets.map((f, i) => ({ ...f, score: 10 - i * 2 }));
    if (location === 'kitchen') scored = scored.map(f => ({ ...f, score: f.location === 'kitchen' || f.location === 'any' ? f.score + 2 : f.score }));
    if (location === 'bathroom') scored = scored.map(f => ({ ...f, score: f.location === 'bathroom' || f.location === 'any' ? f.score + 2 : f.score }));
    if (hardness === 'very-hard') scored = scored.map(f => ({ ...f, score: f.valve === 'Ceramic Disc' ? f.score + 4 : f.valve === 'Cartridge' ? f.score + 1 : f.score - 1 }));
    if (hardness === 'moderate') scored = scored.map(f => ({ ...f, score: f.valve === 'Ceramic Disc' ? f.score + 2 : f.valve === 'Cartridge' ? f.score + 2 : f.score }));
    if (hardness === 'hard' && location === 'kitchen') scored = scored.map(f => ({ ...f, score: f.finish === 'Oil-Rubbed Bronze' ? f.score + 2 : f.finish === 'Chrome' ? f.score - 2 : f.score }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🚰 DFW Plumbing Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Faucet Selection Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>DFW hard water destroys cheap faucets in 3–5 years. Ceramic disc valves and the right finish last decades.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚠️ DFW Faucet Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🔩 Ceramic Disc', 'Most DFW-durable valve — resists mineral buildup best'],['🪩 Finish Matters', 'Brushed nickel hides DFW deposits; chrome shows every spot'],['🔧 Ball Valves', 'Wear faster in DFW water — more maintenance required'],['💧 Cartridge', 'Good DFW choice — easy and cheap to replace when needed']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8′ }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your DFW Faucet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>FAUCET LOCATION</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select location</option>
              <option value='kitchen'>Kitchen sink</option>
              <option value='bathroom'>Bathroom sink</option>
              <option value='laundry'>Utility / laundry</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>DFW WATER HARDNESS (check your city's report)</label>
            <select value={hardness} onChange={e => setHardness(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select hardness level</option>
              <option value='very-hard'>Very hard (300+ mg/L — Frisco, McKinney, Allen)</option>
              <option value='hard'>Hard (200–300 mg/L — Dallas, Plano, Irving)</option>
              <option value='moderate'>Moderate (100–200 mg/L — Fort Worth, Arlington)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Faucet Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP DFW PICK</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{result.valve} Valve — {result.finish}</h3>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 800, color: '#F5E642′ }}>{result.cost}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Price Range</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 800, color: '#F5E642′ }}>{result.lifespan}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>DFW Lifespan</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642′ }}>{result.durability}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Durability</div></div>
            </div>
            <div style={{ padding: 12, background: '#0A1628', borderRadius: 8 }}><span style={{ color: '#8B9CC8', fontSize: 13 }}>Top brands: </span><span style={{ color: '#E8EAF0', fontSize: 13, fontWeight: 600 }}>{result.brands}</span></div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 DFW Pro Tips</h2>
          {['Wipe faucets dry daily in DFW hard water areas to prevent mineral staining','Brushed nickel costs more upfront but saves cleaning time every week in DFW','Check for a lifetime warranty — major brands back ceramic disc faucets fully','Install a whole-house filter or softener to protect all your DFW faucets'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#8B9CC8', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

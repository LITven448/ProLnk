import { useState } from 'react';

const hoses = [
  { material: 'Rubber', diameter: '5/8"', length: '50ft', use: 'foundation', storage: 'Shade or hose reel', score: 10, cost: '$40–$80', lifespan: '10+ years', note: 'Best DFW choice — survives 110°F summers without cracking' },
  { material: 'Rubber', diameter: '5/8"', length: '75ft', use: 'garden', storage: 'Shade or hose reel', score: 9, cost: '$55–$100', lifespan: '10+ years', note: 'Covers full DFW lot, kink-resistant in heat' },
  { material: 'Rubber-Vinyl Blend', diameter: '5/8"', length: '50ft', use: 'car', storage: 'Garage out of direct sun', score: 7, cost: '$30–$60', lifespan: '5–8 years', note: 'Good DFW budget option — store out of UV' },
  { material: 'Expandable', diameter: 'varies', length: 'expands to 50ft', use: 'garden', storage: 'Drain fully before storing', score: 5, cost: '$25–$50', lifespan: '2–4 years', note: 'Struggles in DFW UV/heat — not for foundation watering' },
];

const nozzles = {
  foundation: 'Soaker nozzle or drip — slow, deep watering along DFW foundation',
  garden: 'Adjustable fan nozzle — gentle for DFW clay soil plants',
  car: 'High-pressure pistol nozzle — rinse efficiently with DFW hard water',
};

export default function DFWGardenHoseGuide() {
  const [yardSize, setYardSize] = useState('');
  const [useCase, setUseCase] = useState('');
  const [result, setResult] = useState<typeof hoses[0] | null>(null);

  function getRecommendation() {
    if (!yardSize || !useCase) return;
    let scored = hoses.map(h => ({ ...h }));
    scored = scored.filter(h => h.use === useCase || useCase === 'all');
    if (yardSize === 'large') scored = scored.map(h => ({ ...h, score: h.length === '75ft' ? h.score + 3 : h.score }));
    if (yardSize === 'small') scored = scored.map(h => ({ ...h, score: h.length === '50ft' ? h.score + 2 : h.score }));
    if (useCase === 'foundation') scored = scored.map(h => ({ ...h, score: h.material === 'Rubber' ? h.score + 3 : h.score - 2 }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0] || hoses[0]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🌿 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Garden Hose Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>DFW summers hit 110°F. Vinyl hoses crack and fail in DFW UV exposure — rubber is the only real option.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚠️ DFW Hose Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['☀️ DFW UV Destruction', 'Vinyl hoses crack after 1–2 DFW summers — rubber is mandatory'],['🌡️ Heat Storage', 'Store in shade or hose reel — never leave coiled in DFW sun'],['🏠 Foundation Watering', 'Most critical DFW use — clay soil needs slow, consistent moisture'],['📏 Lot Size', 'Most DFW lots 50–100ft wide — match hose length to your yard']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your DFW Hose</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>DFW YARD SIZE</label>
            <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select yard size</option>
              <option value='small'>Small (townhome / under 5,000 sq ft lot)</option>
              <option value='medium'>Medium (5,000–10,000 sq ft lot)</option>
              <option value='large'>Large (10,000+ sq ft lot)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>PRIMARY DFW USE</label>
            <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select primary use</option>
              <option value='foundation'>Foundation watering (critical in DFW clay soil)</option>
              <option value='garden'>Garden / flower beds</option>
              <option value='car'>Car washing</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Hose Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP DFW PICK</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{result.material} Hose — {result.length}</h3>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 800, color: '#F5E642' }}>{result.cost}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Cost</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 800, color: '#F5E642' }}>{result.lifespan}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>DFW Lifespan</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642' }}>{result.diameter}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Diameter</div></div>
            </div>
            {useCase && nozzles[useCase as keyof typeof nozzles] && (
              <div style={{ padding: 12, background: '#0A1628', borderRadius: 8, marginBottom: 8 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>🔧 DFW Nozzle: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{nozzles[useCase as keyof typeof nozzles]}</span></div>
            )}
            <div style={{ padding: 12, background: '#0A1628', borderRadius: 8 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>📦 Storage: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.storage}</span></div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>💡 DFW Pro Tips</h2>
          {['Water DFW foundations 2–3x per week in summer — clay soil shrinks and cracks in drought','Drain hose after every DFW summer use — standing water grows mold and algae','Brass fittings only — plastic fittings crack in DFW heat and freeze events','DFW hard water leaves deposits in nozzles — soak in vinegar monthly to clear'].map(tip => (
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

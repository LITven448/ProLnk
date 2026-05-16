import { useState } from 'react';

const toilets = [
  { type: 'Elongated Comfort Height', gpf: 1.28, score: 10, brands: 'TOTO Drake, Kohler Cimarron', savings: '20%', note: 'Best for DFW hard water and comfort' },
  { type: 'Elongated Standard Height', gpf: 1.28, score: 8, brands: 'American Standard Champion', savings: '20%', note: 'Classic height, great DFW choice' },
  { type: 'Round Comfort Height', gpf: 1.28, score: 7, brands: 'Kohler Wellworth, TOTO Entrada', savings: '20%', note: 'Good for smaller DFW bathrooms' },
  { type: 'Round Standard Height', gpf: 1.6, score: 4, brands: 'Various', savings: '0%', note: 'Older standard, not WaterSense' },
];

export default function DFWToiletModelGuide() {
  const [bathType, setBathType] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<typeof toilets[0] | null>(null);

  function getRecommendation() {
    if (!bathType || !priority) return;
    let scored = toilets.map(t => ({ ...t }));
    if (bathType === 'small') scored = scored.map(t => ({ ...t, score: t.type.includes('Round') ? t.score + 2 : t.score }));
    if (bathType === 'master') scored = scored.map(t => ({ ...t, score: t.type.includes('Elongated') ? t.score + 2 : t.score }));
    if (priority === 'comfort') scored = scored.map(t => ({ ...t, score: t.type.includes('Comfort') ? t.score + 3 : t.score }));
    if (priority === 'water') scored = scored.map(t => ({ ...t, score: t.gpf === 1.28 ? t.score + 3 : t.score }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🚽 DFW Plumbing Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Toilet Selection Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>DFW hard water demands the right toilet. Standard rough-in is 12 inches — confirm before buying.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚠️ DFW Hard Water Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['💧 Water Hardness', '200–400 mg/L in DFW — causes mineral buildup in trapway'],['📐 Standard Rough-In', '12 inches — always measure before purchasing'],['🌊 WaterSense Required', '1.28 GPF max — DFW water conservation rebates available'],['🪑 Comfort Height', '17–19 inches — most popular in DFW new construction']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your DFW Toilet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>BATHROOM TYPE</label>
            <select value={bathType} onChange={e => setBathType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select bathroom type</option>
              <option value='master'>Master bathroom</option>
              <option value='guest'>Guest bathroom</option>
              <option value='small'>Small / half bath</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>DFW PRIORITY</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select your priority</option>
              <option value='comfort'>Comfort height (ADA-style)</option>
              <option value='water'>Water conservation + rebates</option>
              <option value='value'>Best value for DFW</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Toilet Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP DFW PICK</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{result.type}</h3>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642' }}>{result.gpf}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>GPF</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642' }}>{result.savings}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Water Savings</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642' }}>12"</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Rough-In</div></div>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: '#0A1628', borderRadius: 8 }}><span style={{ color: '#8B9CC8', fontSize: 13 }}>Popular brands: </span><span style={{ color: '#E8EAF0', fontSize: 13, fontWeight: 600 }}>{result.brands}</span></div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>💡 DFW Pro Tips</h2>
          {['Check for DFW city water conservation rebates (up to $100 for WaterSense toilets)','Always verify 12" rough-in — older DFW homes may have 10" or 14"','Hard water = get a toilet with a wide trapway to prevent clogs','TOTO and Kohler ceramic glaze resists DFW mineral staining best'].map(tip => (
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

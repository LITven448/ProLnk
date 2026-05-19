import { useState } from 'react';

const faucetTypes = [
  { type: 'Frost-Free Anti-Siphon Hose Bib', age: 'any', use: 'standard', cost: '$25–$60 fixture + $80–$150 install', shutoff: 'Inside wall — integral to frost-free design', winterize: 'Disconnect hose — leave faucet open if hard freeze expected', score: 10, note: 'Best DFW choice — anti-siphon required by code, frost-free adds protection' },
  { type: 'Standard Anti-Siphon Hose Bib', age: 'new', use: 'standard', cost: '$15–$35 fixture + $60–$120 install', shutoff: 'Dedicated shutoff valve inside (required)', winterize: 'Close inside shutoff, open hose bib to drain, disconnect hose', score: 8, note: 'Good DFW choice — requires dedicated shutoff for freeze protection' },
  { type: 'Irrigation Shutoff Valve', age: 'any', use: 'irrigation', cost: '$20–$50 + install', shutoff: 'Dedicated valve at manifold', winterize: 'Blow out with compressor before DFW freeze', score: 7, note: 'Required for DFW irrigation systems — city inspections check these' },
  { type: 'Wall Hydrant (long-stem)', age: 'older', use: 'heavy', cost: '$60–$120 fixture + $150–$250 install', shutoff: 'Key-operated or inside shutoff', winterize: 'Drain automatically when valve closes', score: 6, note: 'For older DFW homes needing heavy-duty outdoor water access' },
];

export default function DFWOutdoorFaucetGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [waterUse, setWaterUse] = useState('');
  const [result, setResult] = useState<typeof faucetTypes[0] | null>(null);

  function getRecommendation() {
    if (!homeAge || !waterUse) return;
    let scored = faucetTypes.map(f => ({ ...f }));
    if (homeAge === 'new') scored = scored.map(f => ({ ...f, score: f.type.includes('Anti-Siphon') ? f.score + 2 : f.score }));
    if (homeAge === 'older') scored = scored.map(f => ({ ...f, score: f.age === 'older' || f.age === 'any' ? f.score + 2 : f.score }));
    if (waterUse === 'irrigation') scored = scored.map(f => ({ ...f, score: f.use === 'irrigation' ? f.score + 4 : f.score }));
    if (waterUse === 'heavy') scored = scored.map(f => ({ ...f, score: f.use === 'heavy' ? f.score + 3 : f.score }));
    if (waterUse === 'standard') scored = scored.map(f => ({ ...f, score: f.score + (f.type.includes('Frost-Free') ? 2 : 0) }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🚰 DFW Plumbing Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Outdoor Faucet Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>Anti-siphon backflow prevention is required by DFW cities. Know your shutoff location before the next DFW freeze.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚠️ DFW Outdoor Faucet Code</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🛡️ Anti-Siphon Required', 'All DFW cities require backflow prevention on garden hose connections'],['❄️ Freeze Risk', 'DFW gets 1–3 hard freezes per year — know your shutoff location NOW'],['🔧 Frost-Free Best Practice', 'DFW doesn\’t require frost-free but Valentine\’s Day 2021 proved they help'],['🏗️ Permit Required', 'New outdoor faucet installation typically requires DFW city permit']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8′ }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your DFW Outdoor Faucet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>HOME AGE</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select home age</option>
              <option value='new'>Built after 2000 (newer DFW construction)</option>
              <option value='mid'>Built 1980–2000</option>
              <option value='older'>Built before 1980 (older DFW home)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>OUTDOOR WATER USE</label>
            <select value={waterUse} onChange={e => setWaterUse(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select primary use</option>
              <option value='standard'>Standard (garden hose, washing, foundation)</option>
              <option value='irrigation'>Irrigation system connection</option>
              <option value='heavy'>Heavy use (multiple hoses, frequent use)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Faucet Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP DFW PICK</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{result.type}</h3>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>💰 Cost: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.cost}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>🔧 Shutoff: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.shutoff}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>❄️ DFW Winterize: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.winterize}</span></div>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 DFW Pro Tips</h2>
          {['Find and label your outdoor faucet shutoffs NOW — before the next DFW freeze','Disconnect all hoses before DFW freeze events — trapped water bursts pipes','Anti-siphon caps fail over time — replace every 5–7 years or when dripping','After Uri (2021), DFW inspectors now strictly enforce backflow prevention code'].map(tip => (
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

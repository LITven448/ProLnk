import { useState } from 'react';

const materials = [
  { type: 'Cast Aluminum', rating: 5, lifespan: '20+ years', care: 'Annual wipe-down, touch-up paint every 5 years', cost: '$$$', heatScore: 'Excellent' },
  { type: 'Teak Wood', rating: 5, lifespan: '15-25 years', care: 'Teak oil 2x/year, sand if gray patina unwanted', cost: '$$$$', heatScore: 'Excellent' },
  { type: 'Powder-Coated Steel', rating: 3, lifespan: '8-12 years', care: 'Check for rust spots yearly, repaint chips immediately', cost: '$$', heatScore: 'Good' },
  { type: 'HDPE Resin', rating: 4, lifespan: '15+ years', care: 'Soap and water only, UV-stabilized varieties only', cost: '$$', heatScore: 'Good' },
  { type: 'Cheap Plastic/PVC', rating: 1, lifespan: '1-2 seasons', care: 'Not recommended for DFW — warps and fades fast', cost: '$', heatScore: 'Poor' },
  { type: 'Wicker/Rattan', rating: 2, lifespan: '3-5 years', care: 'All-weather synthetic only, store cushions always', cost: '$$', heatScore: 'Fair' },
];

const budgetRecs: Record<string, string[]> = {
  low: ['HDPE Resin', 'Powder-Coated Steel'],
  mid: ['Cast Aluminum', 'HDPE Resin'],
  high: ['Teak Wood', 'Cast Aluminum'],
};

const spaceRecs: Record<string, string[]> = {
  patio: ['Cast Aluminum', 'Teak Wood', 'HDPE Resin'],
  pool: ['Cast Aluminum', 'HDPE Resin'],
  balcony: ['HDPE Resin', 'Cast Aluminum'],
  garden: ['Teak Wood', 'Cast Aluminum'],
};

export default function DFWOutdoorFurnitureGuide() {
  const [spaceType, setSpaceType] = useState('');
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState<typeof materials>([]);

  function getRecs() {
    if (!spaceType || !budget) return;
    const bySpace = spaceRecs[spaceType] || [];
    const byBudget = budgetRecs[budget] || [];
    const matched = bySpace.filter(m => byBudget.includes(m));
    const recs = matched.length ? matched : bySpace;
    setResults(materials.filter(m => recs.includes(m.type)));
  }

  const stars = (n: number) => '⭐'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪑</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Outdoor Furniture Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What survives 110°F heat, hailstorms, and intense UV in the DFW Metroplex</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ DFW Climate Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Surface temps on patios reach 150°F+ in summer</li>
            <li>Cheap plastic warps, fades, and cracks within 1 season</li>
            <li>UV index regularly hits 11+ — bleaches fabrics and plastics fast</li>
            <li>DFW hail can shred flimsy cushions and crack brittle materials</li>
            <li>Humidity swings from 20% to 90% — causes wood to crack without treatment</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your DFW Material Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Outdoor Space Type</label>
              <select value={spaceType} onChange={e => setSpaceType(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select space...</option>
                <option value="patio">Covered Patio</option>
                <option value="pool">Pool Deck</option>
                <option value="balcony">Balcony/Deck</option>
                <option value="garden">Open Garden</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select budget...</option>
                <option value="low">Under $500</option>
                <option value="mid">$500–$1,500</option>
                <option value="high">$1,500+</option>
              </select>
            </div>
          </div>
          <button onClick={getRecs}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get Recommendations →
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>✅ Best Materials for Your DFW Space</h2>
            {results.map(r => (
              <div key={r.type} style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{r.type}</span>
                  <span style={{ color: '#F5E642', fontSize: 13 }}>{stars(r.rating)}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
                  <div style={{ background: '#112240', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>LIFESPAN</div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{r.lifespan}</div>
                  </div>
                  <div style={{ background: '#112240', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>HEAT RATING</div>
                    <div style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>{r.heatScore}</div>
                  </div>
                  <div style={{ background: '#112240', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>PRICE TIER</div>
                    <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{r.cost}</div>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>🛠 <strong>Care:</strong> {r.care}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌧️ Cushion & Cover Tips for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🧴', tip: 'Use Sunbrella-grade fabric only — standard outdoor fabric fades in one Texas summer' },
              { icon: '🌩️', tip: 'Store cushions before any storm — DFW hail shreds foam cores' },
              { icon: '🎀', tip: 'Use furniture covers with UV-blocking coating, not cheap tarps that trap heat' },
              { icon: '📦', tip: 'Deck box with ventilation prevents mold on stored cushions in DFW humidity' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#1e3a5f', borderRadius: 8, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const materials = [
  {
    id: 'concrete',
    name: 'Standard Concrete',
    emoji: '🏗️',
    upfront: 8,
    maintenance: 'Low',
    lifespan: '25-30 yrs',
    heatRating: '🔥🔥🔥',
    dfwNote: 'Stains from DFW red clay runoff, cracks in summer heat cycles',
    budgetScore: 1,
    styleScore: 1,
    barefootScore: 3,
  },
  {
    id: 'stamped',
    name: 'Stamped Concrete',
    emoji: '✨',
    upfront: 14,
    maintenance: 'Medium',
    lifespan: '20-25 yrs',
    heatRating: '🔥🔥🔥🔥',
    dfwNote: 'Decorative but absorbs and radiates DFW summer heat intensely',
    budgetScore: 2,
    styleScore: 3,
    barefootScore: 4,
  },
  {
    id: 'pavers',
    name: 'Concrete or Clay Pavers',
    emoji: '🧱',
    upfront: 18,
    maintenance: 'Low-Medium',
    lifespan: '30-50 yrs',
    heatRating: '🔥🔥🔥',
    dfwNote: 'Clay pavers get hot; light-colored concrete pavers stay cooler',
    budgetScore: 2,
    styleScore: 4,
    barefootScore: 3,
  },
  {
    id: 'flagstone',
    name: 'Flagstone',
    emoji: '🪨',
    upfront: 22,
    maintenance: 'Low',
    lifespan: '50+ yrs',
    heatRating: '🔥🔥',
    dfwNote: 'Natural stone stays noticeably cooler underfoot in DFW heat',
    budgetScore: 3,
    styleScore: 5,
    barefootScore: 1,
  },
  {
    id: 'dg',
    name: 'Decomposed Granite',
    emoji: '🌾',
    upfront: 5,
    maintenance: 'Medium',
    lifespan: '10-15 yrs',
    heatRating: '🔥',
    dfwNote: 'Permeable — soaks up DFW storm runoff, drought-friendly xeriscaping choice',
    budgetScore: 1,
    styleScore: 2,
    barefootScore: 2,
  },
];

export default function DFWPatioMaterialsCompared() {
  const [style, setStyle] = useState<number>(3);
  const [budget, setBudget] = useState<number>(2);
  const [barefoot, setBarefoot] = useState<number>(2);
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (barefoot === 1 && budget >= 3) return 'flagstone';
    if (barefoot === 1 && budget <= 2) return 'pavers';
    if (budget === 1) return 'dg';
    if (style >= 4 && budget >= 2) return 'pavers';
    if (style === 3 && budget === 2) return 'stamped';
    return 'concrete';
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Patio Surface Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>North Texas heat changes which patio surface is right for you</p>
        </div>

        <div style={{ background: '#1a1020', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌡️</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642′ }}>DFW Summer Reality</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Concrete and dark pavers can reach 150°F+ in July. Barefoot comfort is a real design consideration in North Texas.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Priorities</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Style Importance</label>
              <select value={style} onChange={e => setStyle(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Functional — just needs to work</option>
                <option value={2}>Simple and clean</option>
                <option value={3}>Nice but not over the top</option>
                <option value={4}>I want it to look amazing</option>
                <option value={5}>Magazine-worthy outdoor space</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget ($ per sq ft)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Under $10/sq ft</option>
                <option value={2}>$10–$20/sq ft</option>
                <option value={3}>$20+ /sq ft</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>👣 Barefoot Frequency (DFW heat matters here!)</label>
              <select value={barefoot} onChange={e => setBarefoot(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Always barefoot — need cool surface</option>
                <option value={2}>Sometimes barefoot</option>
                <option value={3}>Usually wear shoes or sandals</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ BEST MATCH FOR YOUR DFW PATIO</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {materials.map(m => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ background: selected === m.id ? '#0f2040′ : '#0f1e35', border: `1px solid ${m.id === rec ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name} {m.id === rec && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, padding: '2px 8px', borderRadius: 4, marginLeft: 6 }}>BEST FIT</span>}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>${m.upfront}/sq ft · {m.lifespan}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16 }}>{m.heatRating}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>heat rating</div>
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14 }}>
                  🌡️ <strong>DFW Note:</strong> {m.dfwNote}
                  <div style={{ marginTop: 8 }}>🔧 Maintenance: {m.maintenance}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Get a free quote from a DFW patio contractor</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>🏡 Get Free DFW Patio Quote</button>
        </div>
      </div>
    </div>
  );
}

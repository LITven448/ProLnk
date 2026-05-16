import { useState } from 'react';

const materials = [
  {
    id: 'arch-shingles',
    name: 'Architectural Shingles',
    emoji: '🏠',
    upfront: '4–6',
    lifespan: '20–30 yrs',
    hailRating: 'Class 3',
    insuranceDiscount: 'None',
    dfwNote: 'Standard DFW choice — good value but non-impact-resistant shingles mean higher insurance premiums in hail zones',
    budgetScore: 1,
    hailPriority: 1,
  },
  {
    id: 'impact-shingles',
    name: 'Impact-Resistant Shingles',
    emoji: '🛡️',
    upfront: '5–8',
    lifespan: '25–30 yrs',
    hailRating: 'Class 4',
    insuranceDiscount: '20–30%',
    dfwNote: 'DFW hail essential — Class 4 rating qualifies for major insurance discounts with most DFW carriers',
    budgetScore: 2,
    hailPriority: 3,
  },
  {
    id: 'metal',
    name: 'Metal Roofing (Standing Seam)',
    emoji: '⚡',
    upfront: '10–20',
    lifespan: '40–70 yrs',
    hailRating: 'Class 4',
    insuranceDiscount: '20–35%',
    dfwNote: 'Excellent for DFW — reflects summer heat, survives hail, lasts decades. Strong ROI in DFW market',
    budgetScore: 4,
    hailPriority: 3,
  },
  {
    id: 'tpo',
    name: 'Flat TPO Membrane',
    emoji: '📐',
    upfront: '5–10',
    lifespan: '20–30 yrs',
    hailRating: 'Varies',
    insuranceDiscount: 'None',
    dfwNote: 'Standard for flat/low-slope DFW roofs — white membrane reflects DFW summer heat effectively',
    budgetScore: 2,
    hailPriority: 1,
  },
  {
    id: 'tile',
    name: 'Concrete or Clay Tile',
    emoji: '🏛️',
    upfront: '12–25',
    lifespan: '50+ yrs',
    hailRating: 'Class 3–4',
    insuranceDiscount: '10–20%',
    dfwNote: 'Beautiful but heavy — requires structural assessment. Popular in DFW luxury neighborhoods',
    budgetScore: 4,
    hailPriority: 2,
  },
  {
    id: 'wood-shake',
    name: 'Wood Shake',
    emoji: '🌿',
    upfront: '8–15',
    lifespan: '20–30 yrs',
    hailRating: 'Class 2',
    insuranceDiscount: 'None (often surcharge)',
    dfwNote: 'DFW humidity causes rot and moss growth — high maintenance, increasingly restricted in DFW fire zones',
    budgetScore: 3,
    hailPriority: 1,
  },
];

export default function DFWRoofingMaterialsCompared() {
  const [location, setLocation] = useState<string>('suburban');
  const [budget, setBudget] = useState<number>(2);
  const [insurancePriority, setInsurancePriority] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (budget >= 4) return 'metal';
    if (insurancePriority && budget >= 2) return 'impact-shingles';
    if (insurancePriority && budget >= 3) return 'metal';
    if (budget === 1) return 'arch-shingles';
    return 'impact-shingles';
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌩️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Roofing Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW is the hail capital of the US — your roofing choice affects insurance rates</p>
        </div>

        <div style={{ background: '#1a1020', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>⛈️</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642' }}>DFW Hail Reality</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW averages 5–8 hail events per year with $1B+ in annual hail damage in North Texas. Class 4 impact-resistant materials can save you $500–$1,500/yr in insurance premiums.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Priorities</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="suburban">Suburban DFW (Frisco, McKinney, Prosper)</option>
                <option value="dallas">City of Dallas</option>
                <option value="fortworth">Fort Worth / Tarrant County</option>
                <option value="luxury">Luxury neighborhood (Southlake, Highland Park)</option>
                <option value="rural">Rural DFW outskirts</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget ($ per sq)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Under $5/sq — minimal spend</option>
                <option value={2}>$5–$9/sq — standard</option>
                <option value={3}>$10–$15/sq — premium</option>
                <option value={4}>$15+ /sq — best available</option>
              </select>
            </div>
            <div style={{ background: '#1a3050', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Prioritize Insurance Discount?</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Class 4 rating = 20–35% insurance savings in DFW</div>
              </div>
              <button onClick={() => setInsurancePriority(!insurancePriority)}
                style={{ background: insurancePriority ? '#F5E642' : '#334', color: insurancePriority ? '#0A1628' : '#fff', border: 'none', borderRadius: 20, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
                {insurancePriority ? '✅ Yes' : 'No'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ BEST ROOFING FOR YOUR DFW HOME</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
          {materials.find(m => m.id === rec)?.insuranceDiscount !== 'None' && (
            <div style={{ color: '#4ade80', fontSize: 13, marginTop: 4 }}>💰 Insurance discount: {materials.find(m => m.id === rec)?.insuranceDiscount}</div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {materials.map(m => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ background: selected === m.id ? '#0f2040' : '#0f1e35', border: `1px solid ${m.id === rec ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name} {m.id === rec && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, padding: '2px 8px', borderRadius: 4, marginLeft: 6 }}>BEST FIT</span>}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>${m.upfront}/sq · {m.lifespan} · {m.hailRating}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: m.insuranceDiscount !== 'None' && m.insuranceDiscount !== 'None (often surcharge)' ? '#4ade80' : '#64748b', fontSize: 12, fontWeight: 600 }}>{m.insuranceDiscount}</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>ins. discount</div>
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14 }}>
                  ⛈️ <strong>DFW Note:</strong> {m.dfwNote}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Get a free quote from a DFW roofing contractor</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>🌩️ Get Free DFW Roofing Quote</button>
        </div>
      </div>
    </div>
  );
}

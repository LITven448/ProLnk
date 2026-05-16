import { useState } from 'react';

const materials = [
  {
    id: 'granite',
    name: 'Granite',
    emoji: '🪨',
    upfront: '50–100',
    maintenance: 'Annual sealing',
    dfwNote: 'Classic and durable for DFW — requires annual sealing due to DFW hard water mineral deposits',
    hardWaterRating: 'Medium',
    sealingRequired: true,
    lifespan: '50+ yrs',
    heatResistant: true,
    stainResistant: false,
    budgetScore: 3,
    useScore: 3,
  },
  {
    id: 'quartz',
    name: 'Quartz (Engineered)',
    emoji: '⭐',
    upfront: '60–120',
    maintenance: 'None',
    dfwNote: "DFW's most popular countertop 2022–2025 — no sealing, handles hard water residue with simple cleaning",
    hardWaterRating: 'Excellent',
    sealingRequired: false,
    lifespan: '25+ yrs',
    heatResistant: false,
    stainResistant: true,
    budgetScore: 3,
    useScore: 3,
  },
  {
    id: 'quartzite',
    name: 'Quartzite (Natural Stone)',
    emoji: '💎',
    upfront: '80–140',
    maintenance: 'Frequent sealing',
    dfwNote: 'Often confused with quartz but is natural stone — beautiful marble look but requires sealing in DFW hard water conditions',
    hardWaterRating: 'Medium',
    sealingRequired: true,
    lifespan: '50+ yrs',
    heatResistant: true,
    stainResistant: false,
    budgetScore: 4,
    useScore: 2,
  },
  {
    id: 'marble',
    name: 'Marble',
    emoji: '🏛️',
    upfront: '80–150',
    maintenance: 'Frequent sealing + careful use',
    dfwNote: 'DFW hard water (especially Fort Worth area) causes etching and staining — beautiful but high maintenance in DFW kitchens',
    hardWaterRating: 'Poor',
    sealingRequired: true,
    lifespan: '50+ yrs',
    heatResistant: true,
    stainResistant: false,
    budgetScore: 4,
    useScore: 1,
  },
  {
    id: 'butcher-block',
    name: 'Butcher Block',
    emoji: '🔪',
    upfront: '35–75',
    maintenance: 'Monthly oiling',
    dfwNote: 'DFW humidity cycles cause wood to expand and contract — requires monthly oiling and careful water management near sinks',
    hardWaterRating: 'N/A',
    sealingRequired: true,
    lifespan: '20–40 yrs',
    heatResistant: false,
    stainResistant: false,
    budgetScore: 2,
    useScore: 3,
  },
  {
    id: 'concrete',
    name: 'Concrete (Custom Cast)',
    emoji: '🏗️',
    upfront: '75–150',
    maintenance: 'Sealing + waxing',
    dfwNote: 'Trendy in DFW modern/industrial homes but requires sealing every 1–2 years; DFW hard water leaves mineral spots',
    hardWaterRating: 'Poor',
    sealingRequired: true,
    lifespan: '25+ yrs',
    heatResistant: true,
    stainResistant: false,
    budgetScore: 4,
    useScore: 2,
  },
];

export default function DFWCountertopMaterialsCompared() {
  const [useIntensity, setUseIntensity] = useState<number>(2);
  const [waterHardness, setWaterHardness] = useState<string>('hard');
  const [budget, setBudget] = useState<number>(3);
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (waterHardness === 'very-hard' && useIntensity >= 2) return 'quartz';
    if (useIntensity === 3 && budget >= 3) return 'granite';
    if (useIntensity === 1 && budget >= 4) return 'quartzite';
    if (budget === 2) return 'butcher-block';
    return 'quartz';
  };

  const rec = getRecommendation();

  const hardWaterZones: Record<string, string> = {
    'hard': 'Most DFW suburbs (Plano, Allen, McKinney)',
    'very-hard': 'Fort Worth area — extremely hard water',
    'moderate': 'East DFW (Rockwall, Garland) — softer water',
    'filtered': 'Whole-home water softener installed',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🍽️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Countertop Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW hard water affects which countertops hold up and look good long-term</p>
        </div>

        <div style={{ background: '#1a1020', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>💧</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642' }}>DFW Hard Water Reality</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW water averages 200–400 mg/L of hardness (very hard). Fort Worth area water reaches 500+ mg/L. This etches marble, spots granite, and stains concrete — but quartz wipes clean easily.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Kitchen Profile</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Kitchen Use Intensity</label>
              <select value={useIntensity} onChange={e => setUseIntensity(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Light — mostly reheating, rarely cook</option>
                <option value={2}>Moderate — cook regularly, entertain sometimes</option>
                <option value={3}>Heavy — cook daily, lots of prep work</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>💧 DFW Water Hardness Zone</label>
              <select value={waterHardness} onChange={e => setWaterHardness(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="hard">Hard — {hardWaterZones['hard']}</option>
                <option value="very-hard">Very Hard — {hardWaterZones['very-hard']}</option>
                <option value="moderate">Moderate — {hardWaterZones['moderate']}</option>
                <option value="filtered">Filtered — {hardWaterZones['filtered']}</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget ($ per sq ft installed)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={2}>Under $60/sq ft</option>
                <option value={3}>$60–$100/sq ft</option>
                <option value={4}>$100+ /sq ft — premium</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ BEST COUNTERTOP FOR YOUR DFW KITCHEN</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <div style={{ background: materials.find(m => m.id === rec)?.sealingRequired ? '#2a1010' : '#0f3020', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: materials.find(m => m.id === rec)?.sealingRequired ? '#f87171' : '#4ade80' }}>
              {materials.find(m => m.id === rec)?.sealingRequired ? '⚠️ Sealing required' : '✅ No sealing needed'}
            </div>
            <div style={{ background: materials.find(m => m.id === rec)?.heatResistant ? '#0f3020' : '#2a1020', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: materials.find(m => m.id === rec)?.heatResistant ? '#4ade80' : '#fbbf24' }}>
              {materials.find(m => m.id === rec)?.heatResistant ? '🔥 Heat resistant' : '⚠️ Use trivets'}
            </div>
          </div>
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
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>${m.upfront}/sq ft · {m.maintenance}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: m.hardWaterRating === 'Excellent' ? '#4ade80' : m.hardWaterRating === 'Medium' ? '#fbbf24' : '#f87171' }}>💧 {m.hardWaterRating}</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>hard water</div>
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f' }}>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>💧 <strong>DFW Note:</strong> {m.dfwNote}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Lifespan</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{m.lifespan}</div>
                    </div>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Stain Resistant</div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: m.stainResistant ? '#4ade80' : '#f87171' }}>{m.stainResistant ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Get a free quote from a DFW countertop installer</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>🍽️ Get Free DFW Countertop Quote</button>
        </div>
      </div>
    </div>
  );
}

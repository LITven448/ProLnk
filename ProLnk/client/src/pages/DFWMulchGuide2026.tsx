import { useState } from 'react';

export default function DFWMulchGuide2026() {
  const [bedType, setBedType] = useState('flower');
  const [goal, setGoal] = useState('moisture');
  const [recommendation, setRecommendation] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      flower: { moisture: 'Cedar mulch — 3-inch depth retains moisture and repels DFW pests like fleas and roaches.', soil: 'Hardwood mulch — decomposes slowly, adding organic matter to DFW clay over 1-2 seasons.', pest: 'Cedar mulch — natural oils deter pests, lasts 2-3 years in DFW climate.', budget: 'Pine bark — affordable, widely available at DFW nurseries, decent longevity.' },
      vegetable: { moisture: 'Straw mulch — keeps soil cool and moist, easy to remove for DFW planting rotations.', soil: 'Hardwood mulch — breaks down to enrich DFW soil between seasonal veggie rotations.', pest: 'Cedar mulch around perimeter — deters slugs and soil insects common in DFW gardens.', budget: 'Pine bark nuggets — low cost, available at any DFW big box store.' },
      tree: { moisture: 'Hardwood mulch — wide 6-foot ring keeps soil moisture in DFW heat, 3-inch depth.', soil: 'Compost mulch blend — feeds tree roots as it breaks down in DFW clay.', pest: 'Cedar mulch — repels DFW termites, important for trees near structures.', budget: 'Pine bark — cost-effective for large tree rings, minimal upkeep.' },
      mixed: { moisture: 'Cedar mulch — works across all plant types, holds moisture through DFW summers.', soil: 'Hardwood mulch — universal organic choice, improves mixed bed soil over time.', pest: 'Cedar mulch — broad pest deterrence for mixed DFW plantings.', budget: 'Rubber mulch — long-lasting in mixed beds, no replacement for 10+ years (no decomposition).' },
    };
    setRecommendation(map[bedType]?.[goal] ?? 'Select bed type and goal.');
  };

  const mulches = [
    { icon: '🌲', name: 'Cedar Mulch', life: '2-3 yrs', note: 'Repels fleas, ticks, roaches — best pest deterrent for DFW yards. Natural cedar oil fades but lasts.' },
    { icon: '🍂', name: 'Hardwood Mulch', life: '1-2 yrs', note: 'Decomposes to improve DFW clay soil structure. Refresh annually for best results.' },
    { icon: '🌿', name: 'Pine Bark', life: '1-2 yrs', note: 'Slightly acidic — great for gardenias and azaleas. Affordable DFW option.' },
    { icon: '♻️', name: 'Rubber Mulch', life: '10+ yrs', note: 'Long-lasting but does not decompose or feed soil. Best for play areas or paths.' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Mulch Guide 2026 🍂</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Best mulch for DFW climate — protect soil moisture, deter pests, and improve your beds. Recommended depth: 3 inches.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 40 }}>
          {mulches.map(m => (
            <div key={m.name} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: 28 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{m.name}</span>
                  <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Lifespan: {m.life}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{m.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Mulch Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Bed Type</label>
              <select value={bedType} onChange={e => setBedType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="flower">Flower Bed</option>
                <option value="vegetable">Vegetable Garden</option>
                <option value="tree">Tree Ring</option>
                <option value="mixed">Mixed Planting</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="moisture">Retain Moisture</option>
                <option value="soil">Improve Soil</option>
                <option value="pest">Deter Pests</option>
                <option value="budget">Budget-Friendly</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Mulch Recommendation</button>
          {recommendation && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>🍂 {recommendation}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with DFW landscapers who install and refresh mulch beds.</p>
      </div>
    </div>
  );
}
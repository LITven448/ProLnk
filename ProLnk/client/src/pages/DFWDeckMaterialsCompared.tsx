import { useState } from 'react';

const materials = [
  {
    id: 'pt-pine',
    name: 'Pressure-Treated Pine',
    emoji: '🪵',
    upfront: 15,
    maintenance: 'High',
    lifespan: '10-15 yrs',
    dfwNote: 'UV and heat cause rapid weathering in DFW summers',
    tenYearCost: 8500,
    maintenanceLevel: 3,
    budgetScore: 1,
  },
  {
    id: 'cedar',
    name: 'Cedar',
    emoji: '🌲',
    upfront: 22,
    maintenance: 'Medium-High',
    lifespan: '15-20 yrs',
    dfwNote: 'Natural oils help but annual sealing required in DFW UV',
    tenYearCost: 11000,
    maintenanceLevel: 2,
    budgetScore: 2,
  },
  {
    id: 'composite',
    name: 'Composite (Trex / TimberTech)',
    emoji: '🏗️',
    upfront: 38,
    maintenance: 'Low',
    lifespan: '25-30 yrs',
    dfwNote: 'DFW UV/heat resistant — best long-term value for this climate',
    tenYearCost: 9500,
    maintenanceLevel: 1,
    budgetScore: 3,
  },
  {
    id: 'ipe',
    name: 'Ipe (Tropical Hardwood)',
    emoji: '🏆',
    upfront: 55,
    maintenance: 'Medium',
    lifespan: '40-75 yrs',
    dfwNote: 'Extreme durability, handles DFW heat excellently',
    tenYearCost: 13000,
    maintenanceLevel: 2,
    budgetScore: 4,
  },
];

export default function DFWDeckMaterialsCompared() {
  const [budget, setBudget] = useState<number>(2);
  const [maintenance, setMaintenance] = useState<number>(2);
  const [sunExposure, setSunExposure] = useState<string>('full');
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (sunExposure === 'full' && maintenance === 1) return 'composite';
    if (sunExposure === 'full' && budget >= 3) return 'ipe';
    if (budget === 1) return 'pt-pine';
    if (maintenance <= 2 && budget === 2) return 'cedar';
    return 'composite';
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Deck Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Find the right deck material for North Texas heat & UV</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Tell Us About Your Project</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget Range ($ per sq ft)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Under $20/sq ft (tight budget)</option>
                <option value={2}>$20–$35/sq ft (mid-range)</option>
                <option value={3}>$35–$50/sq ft (premium)</option>
                <option value={4}>$50+ /sq ft (no limit)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Maintenance Willingness</label>
              <select value={maintenance} onChange={e => setMaintenance(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Minimal — set it and forget it</option>
                <option value={2}>Some — willing to do annual upkeep</option>
                <option value={3}>Hands-on — I enjoy maintaining my home</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>☀️ Sun Exposure (DFW heat matters!)</label>
              <select value={sunExposure} onChange={e => setSunExposure(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="full">Full sun — bakes all day</option>
                <option value="partial">Partial shade — some tree cover</option>
                <option value="shaded">Mostly shaded — covered patio</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ DFW RECOMMENDATION FOR YOU</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
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
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>~${m.upfront}/sq ft upfront · {m.lifespan}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${(m.tenYearCost / 1000).toFixed(1)}K</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>10-yr total</div>
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f' }}>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>🌡️ <strong>DFW Note:</strong> {m.dfwNote}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Maintenance</div>
                      <div style={{ fontWeight: 600 }}>{m.maintenance}</div>
                    </div>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Lifespan</div>
                      <div style={{ fontWeight: 600 }}>{m.lifespan}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Get a free quote from a DFW deck pro</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>🔨 Get Free DFW Deck Quote</button>
        </div>
      </div>
    </div>
  );
}

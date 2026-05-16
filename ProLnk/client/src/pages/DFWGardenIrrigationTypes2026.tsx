import { useState } from 'react';

export default function DFWGardenIrrigationTypes2026() {
  const [plantType, setPlantType] = useState('vegetables');
  const [areaSize, setAreaSize] = useState('small');
  const [recommendation, setRecommendation] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      vegetables: { small: 'Drip irrigation — precise delivery, reduces fungal issues on foliage, ideal for DFW heat.', medium: 'Drip irrigation with soaker hose rows — efficient, scalable for raised beds.', large: 'Drip system with timer — automate watering during Stage 3 restrictions, max efficiency.' },
      groundcover: { small: 'Micro-spray heads — even coverage for dense, low-growing plants.', medium: 'Micro-spray zones — divide into sections for uniform moisture.', large: 'Micro-spray system with pressure regulator — handles DFW clay soil runoff risk.' },
      trees: { small: 'Bubblers — slow deep watering builds strong root systems in DFW clay.', medium: 'Bubblers with basin ring — direct water to drip line for young trees.', large: 'Bubbler grid — multiple emitters per tree, scheduled deep soaks.' },
      shrubs: { small: 'Soaker hose — affordable, easy to install around shrub beds.', medium: 'Drip emitters — target individual shrubs, reduce evaporation in DFW summer.', large: 'Drip system with emitter grid — covers large shrub beds efficiently.' },
    };
    setRecommendation(map[plantType]?.[areaSize] ?? 'Select options above.');
  };

  const irrigationTypes = [
    { icon: '💧', name: 'Drip Irrigation', efficiency: '95%', note: 'Most efficient for DFW drought conditions — delivers water directly to root zone.' },
    { icon: '🌊', name: 'Soaker Hose', efficiency: '80%', note: 'Affordable alternative for beds and rows — seeps water slowly.' },
    { icon: '🌫', name: 'Micro-Spray', efficiency: '75%', note: 'Best for ground covers and dense plantings needing wider coverage.' },
    { icon: '🫧', name: 'Bubblers', efficiency: '85%', note: 'Ideal for trees and shrubs — delivers high volume slowly at base.' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Garden Irrigation Types 2026 💧</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Choosing the right irrigation method for DFW gardens — optimized for drought restrictions and clay soil.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {irrigationTypes.map(t => (
            <div key={t.name} style={{ background: '#112240', borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: 28 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</span>
                  <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Efficiency: {t.efficiency}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{t.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Find Your Irrigation Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Plant Type</label>
              <select value={plantType} onChange={e => setPlantType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="vegetables">Vegetables</option>
                <option value="groundcover">Ground Cover</option>
                <option value="trees">Trees</option>
                <option value="shrubs">Shrubs</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Area Size</label>
              <select value={areaSize} onChange={e => setAreaSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="small">Small (&lt;100 sqft)</option>
                <option value="medium">Medium (100-500 sqft)</option>
                <option value="large">Large (500+ sqft)</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
          {recommendation && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>✅ {recommendation}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with certified irrigation pros serving the DFW area.</p>
      </div>
    </div>
  );
}
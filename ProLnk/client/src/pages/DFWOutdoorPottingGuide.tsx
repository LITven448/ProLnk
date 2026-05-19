import { useState } from 'react';

const pottingData: Record<string, { containerSize: string; material: string; wateringFreq: string; placementTips: string }> = {
  'tropical-fullsun': {
    containerSize: 'Minimum 14-16 inch pot for tropicals in DFW full sun — larger containers retain moisture longer between waterings. Root-bound plants in small pots will die in July heat.',
    material: 'Light-colored ceramic or glazed pottery (reflects heat). AVOID dark plastic or metal containers — root zone temperatures hit 130°F+ in DFW full summer sun. Fabric grow bags: excellent drainage and air pruning.',
    wateringFreq: 'DFW full sun July-August: water daily, sometimes twice daily for small containers. Test soil 2 inches deep — water when dry. Self-watering containers with reservoirs extend to every 2-3 days.',
    placementTips: 'Morning sun, afternoon shade (east-facing) is ideal in DFW summer. Full south or west exposure with no afternoon shade will stress most tropicals. Move containers during heat waves.',
  },
  'tropical-partshade': {
    containerSize: '10-14 inch pots work for partial shade tropicals. Less evaporation demand. Still size up — undersized pots still dry out fast in DFW summer even in shade.',
    material: 'More material flexibility in partial shade. Standard terracotta works well — natural wicking prevents overwatering risk. Dark containers ok in shade since soil temps stay manageable.',
    wateringFreq: 'Every 2-3 days in DFW summer under partial shade. Morning water preferred. Check containers after unexpected heat waves — partial shade positions still heat up during 100°F+ days.',
    placementTips: 'North-facing porch or under tree canopy creates ideal partial shade. Covered patios with dappled light are excellent DFW spots. Rotate containers quarterly to equalize light exposure.',
  },
  'vegetables-fullsun': {
    containerSize: 'Tomatoes: minimum 5-gallon (10-gallon preferred). Peppers: 3-5 gallon. Squash: 10+ gallon. In DFW summer heat, undersized containers kill vegetable roots within days.',
    material: 'White or light-colored containers only for vegetables in DFW sun. Root zone must stay below 85°F for most vegetables — dark containers make this impossible. Insulated planters are premium choice.',
    wateringFreq: 'Container vegetables in DFW summer need water every morning, often again by 3pm. Drip irrigation with timer is near-mandatory for containers. Mulch top of soil in container to slow evaporation.',
    placementTips: 'Plant spring vegetables on east-facing area. Move containers in June to east exposure for morning sun + afternoon shade. Pull tender vegetables completely in July-August (DFW summer gap) — replant Sept for fall harvest.',
  },
  'succulents-fullsun': {
    containerSize: 'Succulents prefer slightly tight pots — 1-2 inches larger than root ball. Good drainage critical — add drain hole if missing. Terra cotta 6-8 inch for most varieties.',
    material: 'Terra cotta is ideal for DFW succulents — wicks excess moisture, prevents root rot. Unglazed pottery breathes. Dark containers acceptable since succulents tolerate heat. Never use containers without drainage holes.',
    wateringFreq: 'DFW summer: water every 7-14 days for established succulents. Soak thoroughly, let drain completely, let soil dry completely before next watering. DFW winter: every 3-4 weeks. Overwatering kills more succulents than underwatering.',
    placementTips: 'Full sun (6+ hours) preferred for most succulents. DFW afternoon sun is intense — some varieties appreciate east-facing location. Bring tender succulents inside if freeze forecast (below 28°F).',
  },
};

const plantOptions = ['tropical-fullsun', 'tropical-partshade', 'vegetables-fullsun', 'succulents-fullsun'];
const plantLabels: Record<string, string> = {
  'tropical-fullsun': 'Tropical Plants — Full Sun DFW',
  'tropical-partshade': 'Tropical Plants — Partial Shade DFW',
  'vegetables-fullsun': 'Container Vegetables — Full Sun DFW',
  'succulents-fullsun': 'Succulents/Cacti in Containers — DFW',
};

export default function DFWOutdoorPottingGuide() {
  const [plantType, setPlantType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && plantType ? pottingData[plantType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🪴</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Outdoor Potting Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Container gardening in DFW's extreme heat requires special strategies. Containers dry out daily in summer and dark pots fry roots.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Container Gardening Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🔥', label: 'Root Zone Heat', val: 'Dark containers reach 130°F+ in DFW summer sun — deadly' },
              { icon: '💧', label: 'Drying Speed', val: 'Containers can dry completely within 24hrs in July' },
              { icon: '🪣', label: 'Container Size', val: 'Always size up — undersized pots = guaranteed failure' },
              { icon: '🏺', label: 'Best Material', val: 'Light-colored glazed, fabric grow bags, or terra cotta' },
            ].map((f) => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Get Your Container Recommendations</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>Select your plant type and DFW sun exposure:</label>
          <select value={plantType} onChange={(e) => { setPlantType(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value=>-- Choose your plant setup --</option>
            {plantOptions.map((o) => <option key={o} value={o}>{plantLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!plantType} style={{ width: '100%', padding: '12px', background: plantType ? '#F5E642' : '#1e3a5f', color: plantType ? '#0A1628' : '#4a6080', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: plantType ? 'pointer' : 'not-allowed' }}>
            Show My Container Plan 🪴
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Your DFW Container Strategy</h2>
            {[
              { label: '📦 Container Size', val: result.containerSize },
              { label: '🏺 Best Material', val: result.material },
              { label: '💧 Watering Frequency', val: result.wateringFreq },
              { label: '📍 Placement Tips', val: result.placementTips },
            ].map((item) => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{item.val}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12 }}>
          ProLnk — DFW Home & Garden Intelligence
        </div>
      </div>
    </div>
  );
}

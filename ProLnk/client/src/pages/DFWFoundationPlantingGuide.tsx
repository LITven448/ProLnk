import { useState } from 'react';

const plantTypes = [
  'Small shrub (under 3ft)',
  'Medium shrub (3–6ft)',
  'Large shrub / small ornamental tree',
  'Medium tree (20–40ft canopy)',
  'Large tree (40ft+ canopy)',
  'Live Oak',
  'Crepe Myrtle',
  'Red Oak / Shumard Oak',
  'Bradford Pear',
  'Juniper / Cedar',
];

const soilTypes = ['Heavy black clay (North DFW)', 'Sandy clay loam (East DFW)', 'Limestone/clay mix (West DFW)', 'Dark clay (South DFW)'];

function getPlanting(plant: string, soil: string) {
  const recs: Record<string, { distance: string; risk: string; alternatives: string; note: string }> = {
    'Small shrub (under 3ft)': { distance: '3 ft minimum', risk: '🟢 Low', alternatives: 'Dwarf yaupon holly, compact nandina, knock out rose', note: 'Root spread limited. Drip irrigation at base — avoid heavy watering near foundation.' },
    'Medium shrub (3–6ft)': { distance: '4–5 ft minimum', risk: '🟡 Moderate', alternatives: 'Texas sage, dwarf wax myrtle, Indian hawthorn', note: 'Shallow roots but water demand can dry perimeter clay. Maintain soil moisture uniformly.' },
    'Large shrub / small ornamental tree': { distance: '6–8 ft minimum', risk: '🟡 Moderate', alternatives: 'Mexican plum, desert willow, Texas redbud (small)', note: 'Root competition begins. Ensure soaker hose between plant and foundation.' },
    'Medium tree (20–40ft canopy)': { distance: '15–20 ft minimum', risk: '🔴 High', alternatives: 'Plant away from foundation entirely; use container specimens near home', note: 'Root radius = canopy radius. In DFW clay, roots actively seek moisture near foundation.' },
    'Large tree (40ft+ canopy)': { distance: '25–35 ft minimum', risk: '🔴 Very High', alternatives: 'Do not plant near DFW foundation — use in back open yard', note: 'Large canopy trees in DFW clay cause severe differential settlement by soil moisture extraction.' },
    'Live Oak': { distance: '20–25 ft', risk: '🔴 High', alternatives: 'Texas mountain laurel, Eve\’s necklace for shade without root aggression', note: 'Most damaging DFW tree near foundations. Slow-growing but deep lateral roots reach 30+ ft.' },
    'Crepe Myrtle': { distance: '8–10 ft', risk: '🟡 Moderate', alternatives: 'Dwarf varieties (under 6ft) at 5ft distance', note: 'Non-aggressive roots relative to size. Popular DFW choice. OK at 8–10ft if irrigated separately.' },
    'Red Oak / Shumard Oak': { distance: '25–30 ft', risk: '🔴 Very High', alternatives: 'No equivalent — plant only far from structure', note: 'DFW\’s native Shumard oak is large and aggressive. Beautiful tree, but major foundation risk.' },
    'Bradford Pear': { distance: '10–12 ft', risk: '🟡 Moderate', alternatives: 'Chinese pistache — better structure, similar size, lower risk', note: 'Shallow root system but heavy canopy causes wind-load stress. Bradford Pear banned in some DFW cities.' },
    'Juniper / Cedar': { distance: '5–8 ft', risk: '🟢 Low-Moderate', alternatives: 'Excellent DFW foundation plant — drought tolerant, shallow roots', note: 'Junipers extract little soil moisture. Good perimeter plant in DFW. Avoid overwatering.' },
  };
  const soilMod = soil.includes('Heavy black clay') ? ' Heavy clay amplifies root-moisture interaction — add 2ft to minimum distance.' : soil.includes('Sandy') ? ' Sandy clay drains better — minimum distance still applies but risk slightly lower.' : soil.includes('Limestone') ? ' Limestone limits root depth — lateral spread may increase. Maintain minimum distance.' : '';
  const base = recs[plant] ?? { distance: '10 ft', risk: '🟡 Moderate', alternatives: 'Consult local DFW nursery', note: 'Standard safety distance.' };
  return { ...base, note: base.note + soilMod };
}

export default function DFWFoundationPlantingGuide() {
  const [plant, setPlant] = useState('');
  const [soil, setSoil] = useState('');
  const result = plant && soil ? getPlanting(plant, soil) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation-Safe Planting Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          DFW expansive clay soil responds dramatically to plant root activity. Trees and large shrubs extract moisture from the soil, causing shrinkage and differential settlement directly under your foundation.
        </p>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌱 Why Planting Matters in DFW</h2>
          <ul style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW black clay shrinks when dry — roots accelerate this near foundations</li>
            <li>Root radius typically equals canopy spread — often extends past visible tree edge</li>
            <li>Water-seeking roots find the moist foundation perimeter and cause uneven drying</li>
            <li>Damage is slow and cumulative — often appears 5–10 years after planting</li>
            <li>Removing trees after damage often causes heave as moisture returns to soil</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌳 Safe Distance Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>PLANT TYPE</label>
              <select value={plant} onChange={e => setPlant(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select plant</option>
                {plantTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW SOIL TYPE</label>
              <select value={soil} onChange={e => setSoil(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select soil</option>
                {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SAFE DISTANCE</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.distance}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>FOUNDATION RISK</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{result.risk}</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>🌿 FOUNDATION-SAFE ALTERNATIVES</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.alternatives}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>📏 Quick Reference Distances</h2>
          {[['Small shrubs', '3 ft'], ['Medium shrubs', '4–5 ft'], ['Ornamental trees', '8–10 ft'], ['Medium trees', '15–20 ft'], ['Large trees', '25–35 ft']].map(([type, dist]) => (
            <div key={type} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', fontSize: 14 }}>
              <span>{type}</span><span style={{ color: '#F5E642', fontWeight: 700 }}>{dist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

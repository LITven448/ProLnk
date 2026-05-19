import { useState } from 'react';

const goals = [
  { goal: 'Vegetables', icon: '🥕', space: 'Small (4x4 to 4x8)', tips: ['DFW spring grow season: plant March–May before heat sets in; harvest before June heat peaks', 'Fall season September–November is often better than spring for tomatoes, greens, and brassicas', 'Raised beds beat DFW black clay soil — build with 12-inch depth minimum for root vegetables', 'Cedar or redwood beds resist DFW humidity rot; avoid railroad ties (chemical leaching)', 'Install drip irrigation — DFW summer evaporation is extreme; hand watering wastes water and stresses plants'] },
  { goal: 'Herbs', icon: '🌿', space: 'Small (4x4)', tips: ['Perennial herbs thrive in DFW: rosemary, thyme, oregano, and Mexican mint marigold survive summer heat', 'Basil is DFW summer-friendly but bolts fast — pinch flowers weekly; plant new every 6 weeks', 'Cilantro bolts in DFW heat within weeks; grow in fall or in partial shade in spring', 'Raise beds 6–8 inches for herbs; excellent drainage prevents root rot in DFW clay', 'Group drought-tolerant herbs together; water separately from moisture-loving plants'] },
  { goal: 'Fruits & Berries', icon: '🍓', space: 'Medium (4x8 to 4x16)', tips: ['Blackberries thrive in DFW — plant in full sun, trellis against a fence, water weekly once established', 'Strawberries: plant in October for spring harvest; DFW summer heat kills them — treat as annuals', 'Fig trees are the DFW success story — Chicago Hardy and Celeste varieties survive DFW winters', 'Blueberries need acidic soil (pH 4.5–5.5); DFW soil is alkaline — use peat moss raised beds', 'Drip irrigation is essential for fruiting plants; inconsistent moisture causes blossom end rot'] },
  { goal: 'Pollinator Garden', icon: '🌻', space: 'Any size', tips: ['Native DFW plants: Black-eyed Susan, Mexican sage, coneflower, and zexmenia thrive with minimal water', 'Avoid treated soil or mulch — DFW pollinators are already stressed from habitat loss', 'Plant in clusters of 3–5 same species to help pollinators navigate; diversity is key', 'Leave some bare soil patches — ground-nesting bees (60% of bee species) need access to soil', 'No pesticides in or near pollinator beds; DFW suburbia over-applies lawn chemicals — create a pesticide buffer'] },
];

export default function DFWGardenBedGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = goals.find(g => g.goal === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌱</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Raised Garden Bed Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            DFW clay soil, extreme heat, and two short grow seasons make raised beds the smart choice. Select your garden goal below.
          </p>
        </div>

        <div style={{ background: '#1a2a42', borderRadius: 10, padding: '14px 20px', marginBottom: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><span style={{ color: '#F5E642', fontWeight: 700 }}>🌸 Spring Season:</span><span style={{ color: '#aab', marginLeft: 8 }}>March – May</span></div>
          <div><span style={{ color: '#F5E642', fontWeight: 700 }}>🍂 Fall Season:</span><span style={{ color: '#aab', marginLeft: 8 }}>September – November</span></div>
          <div><span style={{ color: '#F5E642', fontWeight: 700 }}>☀️ Avoid:</span><span style={{ color: '#aab', marginLeft: 8 }}>June – August (most vegetables)</span></div>
          <div><span style={{ color: '#F5E642', fontWeight: 700 }}>💧 Drip Irrigation:</span><span style={{ color: '#aab', marginLeft: 8 }}>Essential in DFW</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
          {goals.map(g => (
            <button key={g.goal} onClick={() => setSelected(g.goal === selected ? null : g.goal)}
              style={{ background: selected === g.goal ? '#F5E642′ : '#1a2a42', border: '2px solid', borderColor: selected === g.goal ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '18px 10px', cursor: ’pointer', color: selected === g.goal ? '#0A1628′ : '#fff', fontWeight: 700, fontSize: 14, transition: ’all .2s' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{g.icon}</div>
              {g.goal}
              <div style={{ fontSize: 11, marginTop: 6, opacity: 0.8 }}>{g.space}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.goal} — DFW Planting Guide</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              {active.tips.map((t, i) => <li key={i} style={{ color: '#dde' }}>{t}</li>)}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Free Garden Bed Installation Quotes from DFW Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}
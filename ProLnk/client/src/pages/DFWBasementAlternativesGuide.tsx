import { useState } from 'react';

const ALTERNATIVES = [
  { id: 'storm_shelter', label: '🌪️ In-Ground Storm Shelter', costLow: 4000, costHigh: 12000, storageCapacity: 'Medium', bestFor: 'Safety + storage combo', details: 'Doubles as storage when not in use. DFW tornado risk makes this a practical dual-purpose investment.' },
  { id: 'attic', label: '🏠 Attic Conversion', costLow: 15000, costHigh: 45000, storageCapacity: 'High', bestFor: 'Large storage volume', details: 'Significant space already exists in most DFW homes. Insulation + flooring required. Summer heat is major challenge.' },
  { id: 'detached_storage', label: '🏗️ Detached Storage Building', costLow: 8000, costHigh: 30000, storageCapacity: 'High', bestFor: 'Flexible, expandable', details: 'Metal buildings (60x40 in DFW) start at $15K. Permits required over 120 sq ft in most cities.' },
  { id: 'understair', label: '🪜 Under-Stair Storage', costLow: 1500, costHigh: 6000, storageCapacity: 'Low', bestFor: 'Low-cost, use existing space', details: 'Built-in drawers, shelves, or a small closet. Best ROI per dollar for modest storage needs.' },
  { id: 'garage_overhead', label: '🚗 Garage Overhead Storage', costLow: 500, costHigh: 3000, storageCapacity: 'Medium', bestFor: 'Quick wins', details: 'Ceiling-mounted platforms in garage. Common in DFW where 2-car garages are standard.' },
];

const NEEDS = [
  { id: 'seasonal', label: '📦 Seasonal storage (decorations, tools)' },
  { id: 'overflow', label: '🛋️ Furniture & overflow storage' },
  { id: 'safe_room', label: '🌪️ Storm shelter / safe room' },
  { id: 'workshop', label: '🔧 Workshop or hobby space' },
  { id: 'vehicle', label: '🚗 Vehicle / equipment storage' },
];

const BUDGETS_ALT = [
  { id: 'minimal', label: 'Under $5K', best: ['understair', 'garage_overhead'] },
  { id: 'moderate', label: '$5K–$15K', best: ['storm_shelter', 'garage_overhead', 'detached_storage'] },
  { id: 'serious', label: '$15K+', best: ['attic', 'detached_storage', 'storm_shelter'] },
];

export default function DFWBasementAlternativesGuide() {
  const [selectedNeed, setSelectedNeed] = useState('seasonal');
  const [budget, setBudget] = useState('moderate');
  const [highlighted, setHighlighted] = useState('storm_shelter');

  const selectedBudget = BUDGETS_ALT.find(b => b.id === budget)!;
  const recommended = ALTERNATIVES.filter(a => selectedBudget.best.includes(a.id));

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE 2026</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>DFW Doesn't Have Basements — Here's What to Do Instead</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 640 }}>Why North Texas homes have no basements, and the best alternatives for extra storage and livable space.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🧪 Why DFW Has No Basements</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🟤', title: 'Expansive Clay Soil (Blackland Prairie)', body: 'DFW sits on some of the most expansive clay soil in North America. This soil swells up to 20% when wet and shrinks when dry — movements that would crack any basement walls within years.' },
                { icon: '💧', title: 'High Water Table in Many Areas', body: 'Much of DFW (especially Trinity River floodplain areas) has a water table just 10–20 feet down. Basements would require constant waterproofing and sump systems.' },
                { icon: '🌡️', title: 'Climate Made It Unnecessary', body: 'Basements historically served as root cellars and tornado shelters. DFW\’s mild-winter climate eliminated the root cellar need, and single-story ranch homes became the default.' },
                { icon: '💰', title: 'Cost Prohibitive Given the Soil', body: 'Building a waterproof basement in DFW clay costs $50,000–$150,000+ vs. $0 for slab — making builders default to grade-level construction for 70+ years.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 16, backgroundColor: '#162840', borderRadius: 10, padding: '16px 18px' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#8090A8', fontSize: 13, lineHeight: 1.6 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🌪️ Storm Shelters — The DFW Basement Substitute</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#A0AABE', marginBottom: 16, fontSize: 14 }}>DFW is in Tornado Alley. An in-ground storm shelter solves the basement's original purpose — protection and below-grade space — at a fraction of the cost.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { icon: '✅', stat: '$4K–$12K', label: 'Installed cost' },
                { icon: '🚪', stat: '6–10 people', label: 'Shelter capacity' },
                { icon: '📦', stat: 'Yes', label: 'Storage when not in use' },
                { icon: '🏠', stat: 'Garage or yard', label: 'Typical installation location' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#162840', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ color: '#8090A8', fontSize: 12 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 All Alternatives at a Glance</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ALTERNATIVES.map(alt => (
              <div key={alt.id} onClick={() => setHighlighted(alt.id)} style={{ backgroundColor: '#0D1E38', border: `2px solid ${highlighted === alt.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{alt.label}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>${(alt.costLow / 1000).toFixed(0)}K–${(alt.costHigh / 1000).toFixed(0)}K</span>
                </div>
                <div style={{ color: '#A0AABE', fontSize: 13, marginBottom: 6 }}>{alt.details}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 12, color: '#8090A8' }}>Storage: {alt.storageCapacity}</span>
                  <span style={{ fontSize: 12, color: '#8090A8' }}>Best for: {alt.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 Find Your Best Alternative</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Primary Need</label>
              <select value={selectedNeed} onChange={e => setSelectedNeed(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {NEEDS.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {BUDGETS_ALT.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Recommended Options for Your Budget</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommended.map(alt => (
              <div key={alt.id} style={{ backgroundColor: '#162840', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{alt.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${(alt.costLow / 1000).toFixed(0)}K–${(alt.costHigh / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

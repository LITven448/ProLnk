import { useState } from 'react';

const options = [
  {
    property: 'house', label: 'Single-Family Home', emoji: '🏠',
    low: { type: 'In-Ground Shelter', cost: '$5,000–$10,000', pros: ['FEMA 361 certified', 'Fits family of 6–10', 'No HOA visibility issues', 'Tornado proof (250 mph rated)'], cons: ['Requires excavation', 'Flood risk in some DFW areas', 'Access from garage or yard'] },
    high: { type: 'Above-Ground Safe Room', cost: '$4,000–$8,000', pros: ['Easier access for elderly/mobility', 'No flood risk', 'Garage or closet install', 'FEMA 361 compliant if steel'], cons: ['Visible from street (HOA review)', 'Takes usable space', 'Slightly less capacity'] },
  },
  {
    property: 'townhome', label: 'Townhome / Row House', emoji: '🏘️',
    low: { type: 'Steel Above-Ground Safe Room', cost: '$4,500–$7,500', pros: ['No excavation needed', 'Garage or first-floor closet', 'HOA approval required but often granted'], cons: ['Shared walls limit installation spots', 'HOA exterior restrictions apply'] },
    high: { type: 'Community Shelter (HOA Shared)', cost: '$0 individual', pros: ['Shared cost across HOA', 'Meets FEMA 361', 'Professionally maintained'], cons: ['Distance to community shelter', 'Capacity may be limited', 'Not always available in DFW TH communities'] },
  },
  {
    property: 'acreage', label: 'Acreage / Rural DFW', emoji: '🌾',
    low: { type: 'In-Ground Underground Bunker', cost: '$8,000–$15,000', pros: ['Maximum tornado protection', 'No HOA restrictions', 'Can store supplies/water', 'FEMA 361 rated options'], cons: ['Water table risk in North TX clay soil', 'Requires French drain system', 'Excavation cost higher on acreage'] },
    high: { type: 'Above-Ground Concrete Safe Room', cost: '$6,000–$12,000', pros: ['No HOA approval needed', 'Attach to existing structure', 'Family + large pets fit'], cons: ['Concrete pour cost', '2–3 week install lead time'] },
  },
];

export default function DFWStormShelterGuide2026B() {
  const [property, setProperty] = useState('house');
  const [budget, setBudget] = useState('high');
  const opt = options.find(o => o.property === property)!;
  const rec = budget === 'low' ? opt.low : opt.high;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌪️</div>
          <h1 style={{ fontSize: 27, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Storm Shelter Guide 2026 — Part 2</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Above-ground vs in-ground comparison with DFW HOA rules, FEMA 361 standards, and real cost data.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span style={{ color: '#94a3b8', fontSize: 13 }}>DFW averages 13 tornadoes per year. Collin, Denton, and Tarrant counties are highest risk. FEMA 361 certification is the gold standard for DFW shelters.</span>
        </div>

        <div style={{ marginBottom: 18 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>PROPERTY TYPE</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {options.map(o => (
              <button key={o.property} onClick={() => setProperty(o.property)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: property === o.property ? '#F5E642′ : '#1e3a5f', color: property === o.property ? '#0A1628' : '#94a3b8' }}>
                {o.emoji} {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>COMPARE</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'high', label: 'Above-Ground' }, { id: 'low', label: 'In-Ground' }].map(b => (
              <button key={b.id} onClick={() => setBudget(b.id)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: budget === b.id ? '#F5E642′ : '#1e3a5f', color: budget === b.id ? '#0A1628' : '#94a3b8' }}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h2 style={{ fontSize: 19, color: '#F5E642', margin: 0 }}>{rec.type}</h2>
            <span style={{ background: '#0A1628', color: '#F5E642', padding: '4px 12px', borderRadius: 6, fontWeight: 700, fontSize: 15 }}>{rec.cost}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ color: '#22c55e', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>ADVANTAGES</p>
              {rec.pros.map((p, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '3px 0′ }}>✓ {p}</div>)}
            </div>
            <div>
              <p style={{ color: '#f87171', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>CONSIDERATIONS</p>
              {rec.cons.map((c, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, padding: '3px 0′ }}>• {c}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🔧 ProLnk Storm Shelter Installation</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Storm shelter installation requires licensed contractors and may need city permits. ProLnk connects DFW homeowners with vetted shelter installers — all permits and work logged in your Home Health Vault.</p>
        </div>
      </div>
    </div>
  );
}

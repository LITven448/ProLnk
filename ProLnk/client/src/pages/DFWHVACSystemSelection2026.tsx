import { useState } from 'react';

const situations = [
  { id: 'standard', label: 'Standard Home 1,500–2,500 sqft', icon: '🏠' },
  { id: 'large', label: 'Large Home 3,000+ sqft', icon: '🏡' },
  { id: 'addition', label: 'Addition / Detached Space', icon: '🏗️' },
  { id: 'older', label: 'Home Built Before 1985', icon: '🏚️' },
  { id: 'efficiency', label: 'Prioritize Energy Efficiency', icon: '⚡' },
];

const recommendations: Record<string, { system: string; icon: string; why: string; cost: string; pros: string[]; cons: string[] }> = {
  standard: { system: 'Split System Heat Pump', icon: '🔄', why: 'DFW mild climate makes heat pumps viable 95% of winter. Heating and cooling from one system.', cost: '$6,000–$12,000 installed', pros: ['Efficient in DFW mild winters', 'One system replaces two', 'Utility rebates available'], cons: ['Struggles below 25°F (rare in DFW)', 'Higher upfront than gas-only'] },
  large: { system: 'Dual Fuel System (Heat Pump + Gas)', icon: '🔥', why: 'Best of both for large DFW homes. Heat pump handles mild days; gas furnace handles rare hard freezes.', cost: '$10,000–$18,000 installed', pros: ['Optimal efficiency year-round', 'Gas backup for freeze events', 'Lower operating cost at scale'], cons: ['Highest upfront cost', 'Two fuel sources to maintain'] },
  addition: { system: 'Mini-Split (Ductless)', icon: '💨', why: 'No ductwork needed. Perfect for DFW sunrooms, garages, and room additions.', cost: '$2,500–$6,000 per zone', pros: ['No ducts required', 'Zone-level control', 'Very efficient for small spaces'], cons: ['Higher cost per ton than central', 'Outdoor unit requires wall space'] },
  older: { system: 'Packaged Unit (Ground Mount)', icon: '📦', why: 'Older DFW homes often lack attic space for air handler. Packaged units sit outside — all-in-one.', cost: '$5,000–$10,000 installed', pros: ['All components outside', 'Simple installation in older homes', 'Reliable in DFW heat'], cons: ['Less efficient than split systems', 'Exposed to DFW hail risk'] },
  efficiency: { system: 'Variable Speed Heat Pump (SEER2 22+)', icon: '🌟', why: 'Highest efficiency available. Variable speed compressor matches exact DFW load — reduces runtime noise and cost.', cost: '$12,000–$20,000 installed', pros: ['Lowest operating cost', 'Utility rebates up to $1,500', 'Quiet operation', 'Best dehumidification'], cons: ['Highest upfront investment', 'More complex electronics'] },
};

export default function DFWHVACSystemSelection2026() {
  const [selected, setSelected] = useState('standard');
  const rec = recommendations[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC System Selection Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Choosing the right HVAC system for your North Texas home</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Describe Your Situation</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                  background: selected === s.id ? '#F5E642' : '#1e3a5f',
                  color: selected === s.id ? '#0A1628' : '#fff', border: 'none', fontSize: '0.85rem' }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a3a6e', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{rec.icon} Recommended: {rec.system}</div>
            <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: 8, opacity: 0.8 }}>💰 {rec.cost}</div>
            <p style={{ color: '#cbd5e1', margin: '0 0 0.8rem', fontSize: '0.9rem' }}>{rec.why}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div>
                <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 4, fontSize: '0.85rem' }}>✅ Pros</div>
                {rec.pros.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 2 }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 4, fontSize: '0.85rem' }}>⚠️ Cons</div>
                {rec.cons.map(c => <div key={c} style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 2 }}>• {c}</div>)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🌡️', title: 'DFW Climate Is Heat Pump Country', text: 'DFW averages only 14 days below freezing annually. Heat pumps are efficient down to 25°F. Dual fuel only needed for homes in Weatherford or North Collin County micro-climates.' },
            { icon: '💧', title: 'Humidity Control Critical', text: 'DFW spring humidity regularly hits 70–80%. Variable speed equipment dehumidifies better than single-stage. Oversized systems short-cycle and leave homes humid.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get DFW HVAC Quotes</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>ProLnk connects you with rated DFW HVAC contractors for proper load calculations and system selection</p>
        </div>
      </div>
    </div>
  );
}
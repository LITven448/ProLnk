import { useState } from 'react';

const pilingTypes = [
  {
    id: 'steel-push',
    name: 'Steel Push Piers',
    icon: '🔩',
    depth: '20–80 ft',
    bestFor: 'Deep competent soil, heavier structures',
    pros: ['Most common in DFW', 'Driven to refusal (bedrock or dense soil)', 'Measurable load capacity', 'Works in tight access'],
    cons: ['Higher cost per pier', 'Requires professional installation'],
    avgCost: '$1,200–$2,000/pier',
    situations: ['heavy', 'clay', 'settled'],
  },
  {
    id: 'helical',
    name: 'Helical Piers',
    icon: '🌀',
    depth: '10–40 ft',
    bestFor: 'Lightweight structures, poor soil access, new construction',
    pros: ['Immediate load bearing', 'Works in wet soil', 'Less excavation'],
    cons: ['Not ideal for very heavy loads', 'Cost varies with soil'],
    avgCost: '$1,000–$1,800/pier',
    situations: ['light', 'wet', 'access'],
  },
  {
    id: 'concrete-pressed',
    name: 'Concrete Pressed Piles',
    icon: '🧱',
    depth: '7–12 ft',
    bestFor: 'Budget repairs, older DFW homes',
    pros: ['Lower upfront cost', 'Fast installation', 'Common in DFW since 1970s'],
    cons: ['Shorter depth', 'Less engineering certainty', 'Can fail in expansive clay'],
    avgCost: '$300–$600/pier',
    situations: ['budget', 'older'],
  },
  {
    id: 'bell-bottom',
    name: 'Bell-Bottom Piers',
    icon: '🔔',
    depth: '8–15 ft',
    bestFor: 'Traditional Texas method, engineered repairs',
    pros: ['Wider base distributes load', 'Engineer-designed', 'Proven in DFW caliche'],
    cons: ['Requires dry conditions to drill', 'More labor intensive', 'Slower installation'],
    avgCost: '$1,000–$1,600/pier',
    situations: ['engineered', 'caliche', 'traditional'],
  },
];

const situations = [
  { id: 'heavy', label: 'Heavy Structure (2-story+)', icon: '🏠' },
  { id: 'light', label: 'Light Structure (porch, addition)', icon: '🏡' },
  { id: 'clay', label: 'Expansive Clay Soil', icon: '🟫' },
  { id: 'wet', label: 'Wet / Saturated Soil', icon: '💧' },
  { id: 'budget', label: 'Budget Priority', icon: '💰' },
  { id: 'engineered', label: 'Engineer-Stamped Required', icon: '📐' },
];

export default function DFWFoundationPilingGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const recommended = pilingTypes.filter(p =>
    selected.length === 0 || p.situations.some(s => selected.includes(s))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Foundation Piling Types Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>All major piling systems used in Dallas-Fort Worth foundation repair — matched to your situation.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Your Situation (select all that apply)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => toggle(s.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  borderColor: selected.includes(s.id) ? '#F5E642' : '#1e3a5f',
                  background: selected.includes(s.id) ? '#F5E642' : '#0A1628',
                  color: selected.includes(s.id) ? '#0A1628' : '#94a3b8' }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {recommended.map(p => (
            <div key={p.id} onClick={() => setActiveCard(activeCard === p.id ? null : p.id)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer', border: '2px solid',
                borderColor: activeCard === p.id ? '#F5E642' : '#1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 24, marginRight: 10 }}>{p.icon}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>{p.name}</span>
                </div>
                <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>{p.avgCost}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0' }}>{p.bestFor} — Depth: {p.depth}</p>
              {activeCard === p.id && (
                <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ color: '#4ade80', fontWeight: 600, fontSize: 12, marginBottom: 6 }}>✅ PROS</div>
                    {p.pros.map((x, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 3 }}>• {x}</div>)}
                  </div>
                  <div>
                    <div style={{ color: '#f87171', fontWeight: 600, fontSize: 12, marginBottom: 6 }}>⚠️ CONS</div>
                    {p.cons.map((x, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 3 }}>• {x}</div>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Foundation Repair Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed foundation specialists in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}
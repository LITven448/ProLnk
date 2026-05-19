import { useState } from 'react';

const edgingTypes = [
  {
    id: 'metal',
    name: 'Steel / Aluminum Metal Edging',
    icon: '⚙️',
    lifespan: '20–30 years',
    costPer10ft: '$8–$15',
    looks: 'Clean, minimal, professional',
    maintenance: 'Very low — re-stake if heaving',
    dfwNote: 'Best choice for DFW Bermuda grass — strong enough to contain aggressive runners.',
    bestFor: ['clean', 'bermuda', 'long'],
  },
  {
    id: 'plastic',
    name: 'Plastic / Vinyl Edging',
    icon: '🟦',
    lifespan: '3–7 years',
    costPer10ft: '$2–$6',
    looks: 'Flexible, curved shapes',
    maintenance: 'Re-secure after heavy rain or soil shift',
    dfwNote: 'DFW UV degrades plastic quickly — expect cracking within 3–5 years. Budget option only.',
    bestFor: ['budget', 'curved'],
  },
  {
    id: 'concrete-mow',
    name: 'Concrete Mow Edge',
    icon: '🏗️',
    lifespan: 'Permanent',
    costPer10ft: '$15–$30 installed',
    looks: 'Professional, seamless, upscale',
    maintenance: 'None — mower rides on top',
    dfwNote: 'Most professional result in DFW. Eliminates hand-edging entirely. Popular in established neighborhoods.',
    bestFor: ['clean', 'long', 'upscale'],
  },
  {
    id: 'stone-brick',
    name: 'Stone / Brick Edging',
    icon: '🪨',
    lifespan: '15–25 years',
    costPer10ft: '$10–$25',
    looks: 'Decorative, traditional, warm',
    maintenance: 'Re-level after DFW clay soil movement',
    dfwNote: 'DFW clay heave can shift brick edging. Set on concrete bed for permanence.',
    bestFor: ['decorative', 'curved', 'traditional'],
  },
];

const answers = [
  { id: 'bermuda', q: 'Grass Type', label: 'Bermuda (most DFW yards)', icon: '🌿' },
  { id: 'other-grass', q: 'Grass Type', label: 'St. Augustine / Zoysia', icon: '🍃' },
  { id: 'budget', q: 'Budget', label: 'Budget-Conscious', icon: '💵' },
  { id: 'upscale', q: 'Budget', label: 'Premium Result', icon: '✨' },
  { id: 'curved', q: 'Bed Shape', label: 'Lots of Curves', icon: '〰️' },
  { id: 'long', q: 'Bed Shape', label: 'Long Straight Runs', icon: '➡️' },
];

export default function DFWLandscapeEdgingGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const recommended = edgingTypes.filter(e =>
    selected.length === 0 || e.bestFor.some(b => selected.includes(b))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌱</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Landscape Edging Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW Bermuda grass is aggressive — edge every 2 weeks or contain it permanently. Here's your guide.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>⚡ DFW Bermuda Fact:</span>
          <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 8 }}>Bermuda runners travel 6–12 inches per month in summer. Without hard edging, beds disappear in one season.</span>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Your Yard (select all that apply)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {answers.map(a => (
              <button key={a.id} onClick={() => toggle(a.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  borderColor: selected.includes(a.id) ? '#F5E642′ : '#1e3a5f',
                  background: selected.includes(a.id) ? '#F5E642′ : '#0A1628',
                  color: selected.includes(a.id) ? '#0A1628′ : '#94a3b8' }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {recommended.map(e => (
            <div key={e.id} onClick={() => setActiveCard(activeCard === e.id ? null : e.id)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer', border: '2px solid',
                borderColor: activeCard === e.id ? '#F5E642′ : '#1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 24, marginRight: 10 }}>{e.icon}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>{e.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>{e.costPer10ft}/10ft</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{e.lifespan}</div>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0′ }}>{e.looks}</p>
              {activeCard === e.id && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>🌡️ DFW NOTE: </span>
                    <span style={{ color: '#cbd5e1', fontSize: 13 }}>{e.dfwNote}</span>
                  </div>
                  <div style={{ color: '#60a5fa', fontSize: 13 }}>🔧 Maintenance: {e.maintenance}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Landscaping Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed landscape pros in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const appliances = [
  { name: 'Gas Furnace', required: true, placement: 'Within 10 ft of furnace on same floor, not in closet', type: 'Combination CO + Smoke', units: 1 },
  { name: 'Gas Water Heater', required: true, placement: 'Utility room or garage near unit, not ceiling-mounted', type: 'Standalone CO Detector', units: 1 },
  { name: 'Gas Range / Oven', required: false, placement: 'Hallway adjacent to kitchen, not directly above stove', type: 'Standalone CO Detector', units: 1 },
  { name: 'Gas Dryer', required: false, placement: 'Laundry room, mounted at breathing height (5 ft)', type: 'Standalone CO Detector', units: 1 },
  { name: 'Gas Fireplace', required: false, placement: 'Living room outside fireplace alcove, not directly above', type: 'Combination CO + Smoke', units: 1 },
  { name: 'Attached Garage', required: true, placement: 'Interior wall between garage and living space', type: 'Standalone CO Detector', units: 1 },
];

export default function DFWCODetectorPlacementDFW() {
  const [selected, setSelected] = useState<string[]>([]);
  const results = appliances.filter(a => selected.includes(a.name));
  const total = [...new Set(results.map(r => r.name))].length;

  const toggle = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>☁️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW CO Detector Placement Guide
          </h1>
          <p style={{ color: '#94a3b8′ }}>
            DFW homes with gas appliances need CO detectors. Select your appliances for placement recommendations and unit count.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Gas Appliances in Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {appliances.map(a => (
              <button
                key={a.name}
                onClick={() => toggle(a.name)}
                style={{
                  background: selected.includes(a.name) ? '#F5E642′ : '#1e3a5f',
                  color: selected.includes(a.name) ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                {a.required && <span style={{ position: 'absolute', top: 4, right: 6, fontSize: '0.65rem', color: selected.includes(a.name) ? '#0A1628′ : '#F5E642' }}>REQUIRED</span>}
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0 }}>Your CO Detector Plan</h2>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '0.25rem 0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>{total} units needed</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {results.map(r => (
                <div key={r.name} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: `4px solid ${r.required ? '#ef4444' : '#F5E642'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{r.name}</span>
                    <span style={{ color: r.required ? '#ef4444′ : '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>{r.required ? ’Required by code' : 'Recommended'}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>📍 {r.placement}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🔧 {r.type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Combination vs Standalone</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { title: 'Combination CO + Smoke', pros: 'One device, simpler wiring, covers both hazards', cons: 'Higher cost ($50–$100), less flexible placement', best: 'Near sleeping areas and furnace rooms' },
              { title: 'Standalone CO Detector', pros: 'Lower cost ($25–$60), optimal placement flexibility', cons: 'Two devices to manage and replace', best: 'Utility rooms, garages, kitchens' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: '0.25rem' }}>+ {item.pros}</div>
                <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '0.25rem' }}>- {item.cons}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Best for: {item.best}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

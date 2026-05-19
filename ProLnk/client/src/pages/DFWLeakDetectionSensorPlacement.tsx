import { useState } from 'react';

const features = [
  { name: 'Under Kitchen Sink', priority: 1, sensor: 'Spot sensor + rope sensor along cabinet floor', system: 'LeakSmart, Moen Flo', cost: '$25–$60′ },
  { name: 'Water Heater', priority: 2, sensor: 'Rope sensor around base perimeter', system: 'Rheem EcoNet, Flo by Moen', cost: '$30–$70′ },
  { name: 'Dishwasher', priority: 3, sensor: 'Spot sensor under unit or at base', system: 'Wally, YoLink', cost: '$20–$45′ },
  { name: 'Refrigerator / Ice Maker', priority: 4, sensor: 'Spot sensor behind fridge near water line', system: 'Govee, Aqara', cost: '$15–$35′ },
  { name: 'Washing Machine', priority: 5, sensor: 'Rope sensor in drain pan or floor loop', system: 'LeakSmart Shutoff Valve', cost: '$40–$90′ },
  { name: 'AC Drain Pan', priority: 6, sensor: 'Float switch + spot sensor in secondary pan', system: 'Wired to air handler cutoff', cost: '$15–$50′ },
];

export default function DFWLeakDetectionSensorPlacement() {
  const [selected, setSelected] = useState<string[]>([]);
  const results = features.filter(f => selected.includes(f.name)).sort((a, b) => a.priority - b.priority);

  const toggle = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW Water Leak Sensor Placement Guide
          </h1>
          <p style={{ color: '#94a3b8′ }}>
            Water damage is the #1 DFW homeowner insurance claim. Select your home features for a prioritized sensor map.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Home Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' }}>
            {features.map(f => (
              <button
                key={f.name}
                onClick={() => toggle(f.name)}
                style={{
                  background: selected.includes(f.name) ? '#F5E642′ : '#1e3a5f',
                  color: selected.includes(f.name) ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s'
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Prioritized Sensor Plan</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map(r => (
                <div key={r.name} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>#{r.priority} {r.name}</span>
                    <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>{r.cost}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>📍 {r.sensor}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🏠 {r.system}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', background: '#1e3a5f', borderRadius: 8, padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              💡 <strong style={{ color: '#F5E642′ }}>System tip:</strong> Consider a whole-home shutoff valve (Moen Flo ~$499) for automatic leak shutoff when sensors trigger.
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌧️ DFW-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌡️', title: 'AC Drain Issues', desc: 'DFW humidity overloads condensate drains — AC pan sensors prevent ceiling damage' },
              { icon: '❄️', title: 'Freeze Bursts', desc: 'Winter storms burst pipes in uninsulated DFW homes — under-sink sensors catch leaks fast' },
              { icon: '🏚️', title: 'Slab Foundations', desc: 'DFW clay soil shifts pipes — water heater and supply line sensors detect slow slab leaks' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const nmTypes = [
  { name: 'NM-B 14/2', color: 'White jacket (older) / White', wires: '2 conductors + ground', amps: '15A', uses: 'Lighting, general outlets in conditioned space' },
  { name: 'NM-B 12/2', color: 'Yellow jacket', wires: '2 conductors + ground', amps: '20A', uses: 'Kitchen, bathroom, garage circuits' },
  { name: 'NM-B 10/2', color: 'Orange jacket', wires: '2 conductors + ground', amps: '30A', uses: 'Dryers, water heaters, A/C feeds' },
  { name: 'NM-B 14/3', color: 'White jacket (3-wire)', wires: '3 conductors + ground', amps: '15A', uses: '3-way switch circuits, multiwire branch circuits' },
  { name: 'NM-B 12/3', color: 'Yellow jacket (3-wire)', wires: '3 conductors + ground', amps: '20A', uses: 'Shared neutral circuits, 240V small appliances' },
];

const projectOptions = [
  { label: 'Living room lighting', location: 'Interior wall', cable: 'NM-B 14/2', conduit: false, permit: 'Required for new circuit; not for fixture swap' },
  { label: 'Kitchen outlet', location: 'Interior wall above counter', cable: 'NM-B 12/2', conduit: false, permit: 'Required — GFCI + 20A circuit mandate' },
  { label: 'Garage outlet', location: 'Interior garage wall (not concrete)', cable: 'NM-B 12/2', conduit: false, permit: 'Required; GFCI required in DFW garages' },
  { label: 'Outdoor outlet on wood-frame wall', location: 'Exterior / sheltered', cable: 'NM-B not allowed outdoors', conduit: true, permit: 'Required — use UF-B or conduit with THWN' },
  { label: 'Basement or crawl space', location: 'Damp / below grade', cable: 'NM-B allowed if not exposed to moisture', conduit: false, permit: 'Required; inspect for moisture before installing' },
  { label: 'Through concrete slab', location: 'In / under concrete', cable: 'NM-B NOT allowed in concrete', conduit: true, permit: 'Required — must use conduit with pull wires or UF-B in conduit' },
  { label: 'Attic run (DFW summer heat)', location: 'Attic / unconditioned', cable: 'NM-B 90°C rated — confirm temperature rating', conduit: false, permit: 'Required; DFW attics exceed 140°F — use 90°C NM-B minimum' },
  { label: 'Exterior panel feed', location: 'Exterior / exposed', cable: 'NM-B NOT allowed exposed outdoors', conduit: true, permit: 'Required — use EMT or PVC conduit with THWN wire' },
];

export default function DFWNMBCableGuide() {
  const [selected, setSelected] = useState('');
  const result = projectOptions.find(p => p.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642′ }}>🏠 DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>NM-B (Romex) Cable Guide for DFW Homes</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6′ }}>
          NM-B (Romex) is the standard indoor wiring cable in DFW homes. Know when you can use it — and when you can't.
        </p>

        <div style={{ background: '#111D33', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#F5E642', marginBottom: '14px' }}>🎨 Identify Your Wire by Jacket Color</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>White Jacket</div>
              <div style={{ fontSize: '13px', color: '#9BA3B5′ }}>14 AWG — 15A circuits. Older DFW homes (pre-2000) may use all-white regardless of gauge.</div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '4px' }}>Yellow Jacket</div>
              <div style={{ fontSize: '13px', color: '#9BA3B5′ }}>12 AWG — 20A circuits. Standard in DFW kitchen and bath circuits built after 2002.</div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontWeight: '600', color: '#E8A020', marginBottom: '4px' }}>Orange Jacket</div>
              <div style={{ fontSize: '13px', color: '#9BA3B5′ }}>10 AWG — 30A circuits. A/C disconnects, dryers, water heaters in DFW homes.</div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontWeight: '600', color: '#A0C8FF', marginBottom: '4px' }}>Gray Jacket</div>
              <div style={{ fontSize: '13px', color: '#9BA3B5′ }}>UF-B (Underground Feeder) — for direct burial. Different product than Romex NM-B.</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', marginBottom: '14px' }}>📦 NM-B Types in DFW Homes</h2>
          {nmTypes.map((t) => (
            <div key={t.name} style={{ background: '#111D33', borderRadius: '8px', padding: '14px 16px', marginBottom: '8px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ minWidth: '120px' }}>
                <div style={{ fontWeight: '600', color: '#F5E642', fontSize: '14px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: '#6B7A94', marginTop: '2px' }}>{t.color}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#C8D0DC' }}>{t.uses}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>🔍 DFW Project Lookup: Can I use NM-B?</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your DFW wiring project...</option>
            {projectOptions.map(p => <option key={p.label}>{p.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontWeight: '600', color: result.conduit ? '#FF6B6B' : '#4CAF50', fontSize: '16px', marginBottom: '8px' }}>
                {result.conduit ? '❌ NM-B NOT suitable here' : '✅ NM-B allowed'}
              </div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', marginBottom: '8px' }}>📦 Cable: {result.cable}</div>
              {result.conduit && <div style={{ fontSize: '14px', color: '#FF9F43', marginBottom: '8px' }}>🔧 Conduit required for this DFW location</div>}
              <div style={{ fontSize: '13px', color: '#F5E642′ }}>📋 Permit: {result.permit}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Code Note</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6′ }}>
            DFW follows NEC 2020 (adopted by Texas). NM-B is prohibited in commercial buildings over 3 stories, concrete, and wet/damp locations. DFW inspectors check for correct jacket color — don't mix gauges on the same circuit.
          </div>
        </div>
      </div>
    </div>
  );
}

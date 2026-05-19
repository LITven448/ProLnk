import { useState } from 'react';

const areas = [
  { id: 'kitchen', icon: '🍳', label: 'Kitchen', type: 'K-Class', reason: 'Grease fires require wet chemical agent. ABC dry chemical can spread burning grease. K-Class is mandatory for serious home cooks.', product: 'Amerex B260 or Badger 6L K-Class', note: 'Mount near exit, NOT next to stove — heat can trap you.' },
  { id: 'living', icon: '🛋️', label: 'Living Room / Garage', type: 'ABC Dry Chemical', reason: 'Handles Class A (wood/paper), B (flammable liquids), and C (electrical) fires — the most versatile for DFW homes.', product: 'Kidde Pro 2.5 or First Alert HOME2', note: '2.5 lb minimum. Mount 4 ft high near exit. DFW garages need one for vehicle fluids.' },
  { id: 'office', icon: '💻', label: 'Home Office / Electronics', type: 'CO2 Extinguisher', reason: 'CO2 leaves zero residue — critical for servers, workstations, and AV equipment. Does not damage electronics.', product: 'Kidde Pro 5 CO2 or Amerex 322', note: 'Not effective outdoors or in windy areas. DFW offices with high-end gear should have one.' },
  { id: 'bedroom', icon: '🛏️', label: 'Master Bedroom', type: 'ABC Dry Chemical', reason: 'Having an extinguisher in the master bedroom allows suppression of small bedroom fires before evacuation becomes necessary.', product: 'Kidde Pro 2.5 or First Alert TUNDRA Aerosol', note: 'Store in closet or under bed. DFW families with children: do bedroom drills annually.' },
];

const inspectionItems = [
  'Pressure gauge in green zone', 'Pin and tamper seal intact', 'No visible corrosion or dents', 'Hose/nozzle unobstructed', 'Weigh unit (matches label)',
];

export default function DFWFireExtinguisherGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [inspectOpen, setInspectOpen] = useState(false);

  const area = areas.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧯</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Fire Extinguisher Guide 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>Right extinguisher, right location, every room</p>
        </div>

        <div style={{ background: '#1A2840', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: '#F5E642′ }}>DFW Fire Fact:</strong> Texas structure fires peak Jan–Feb (heating) and Jun–Jul (fireworks, AC overload). 
          PASS technique: Pull pin → Aim low → Squeeze handle → Sweep side to side.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Select an Area → Get Recommendation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {areas.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ background: selected === a.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === a.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 30 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#E8F4FD', margin: '6px 0 4px' }}>{a.label}</div>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700 }}>{a.type}</div>
            </button>
          ))}
        </div>

        {area && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>{area.icon} {area.label} — {area.type}</h3>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>WHY THIS TYPE</div>
              <p style={{ color: '#B8D4EA', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{area.reason}</p>
            </div>
            <div style={{ background: '#1A2840', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>RECOMMENDED PRODUCT</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{area.product}</div>
            </div>
            <div style={{ fontSize: 13, color: '#8BA5C4', fontStyle: 'italic' }}>💡 {area.note}</div>
          </div>
        )}

        <button onClick={() => setInspectOpen(!inspectOpen)}
          style={{ width: '100%', background: '#0F2040', border: '2px solid #1E3A5F', borderRadius: 10, padding: '14px 18px',
            cursor: 'pointer', textAlign: 'left', color: '#E8F4FD', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
          🔍 Annual Inspection Checklist {inspectOpen ? '▲' : '▼'}
        </button>
        {inspectOpen && (
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '16px 20px', border: '1px solid #1E3A5F', marginBottom: 24 }}>
            {inspectionItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < inspectionItems.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
                <span style={{ color: '#F5E642′ }}>☐</span>
                <span style={{ fontSize: 14, color: '#B8D4EA' }}>{item}</span>
              </div>
            ))}
            <p style={{ color: '#8BA5C4', fontSize: 12, margin: '12px 0 0′ }}>Replace 12 years after manufacture date (stamped on cylinder). Always replace after any use.</p>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: 16, background: '#0F2040', borderRadius: 10, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#8BA5C4', fontSize: 13, margin: 0 }}>Only fight a fire if: it's small, you have an exit behind you, and you’ve already called 911. When in doubt — get out.</p>
        </div>
      </div>
    </div>
  );
}


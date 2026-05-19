import { useState } from 'react';

export default function DFWGarageOrganizationGuide2026() {
  const [garageSize, setGarageSize] = useState('two-car');
  const [primaryUse, setPrimaryUse] = useState('storage');

  const systems: Record<string, Record<string, { system: string; cost: string; items: string[]; climate: string }>> = {
    "one-car": {
      storage: { system: 'Vertical Wall Grid', cost: '$800–$2,000', items: ['Wall-mounted grid panels (floor to ceiling)', 'Heavy-duty hooks for tools', 'Overhead pulley for seasonal bins', 'Magnetic strips for small tools'], climate: 'Basic ventilation fan ($150–$300)' },
      workshop: { system: 'Pegboard + Workbench', cost: '$1,200–$3,500', items: ['Full pegboard wall for tools', '6ft workbench with drawers', 'Task lighting (LED shop lights)', 'Cabinet storage below bench'], climate: 'Mini-split AC essential ($1,500–$2,500)' },
      hobby: { system: 'Flexible Shelving', cost: '$600–$1,800', items: ['Adjustable steel shelving units', 'Dedicated project table', 'Small parts organizer drawers', 'Overhead LED lighting'], climate: 'Portable AC unit ($400–$800)' },
    },
    "two-car": {
      storage: { system: 'Overhead + Wall Hybrid', cost: '$2,000–$5,000', items: ['Ceiling-mounted overhead storage platform', 'Wall panel system one side', 'Floor-to-ceiling shelving units', 'Zone labeling system'], climate: 'Ceiling fan + vent fan ($300–$600)' },
      workshop: { system: 'Full Workshop Layout', cost: '$3,500–$8,000', items: ['Full pegboard wall (16ft)', 'Rolling tool chests', '8ft workbench + vise', 'Overhead storage for seasonal items'], climate: 'Mini-split required for DFW ($2,000–$3,500)' },
      hobby: { system: 'Dedicated Zone System', cost: '$2,500–$6,000', items: ['One side: organization + storage', 'One side: project workspace', 'Wall cabinet system', 'Epoxy floor for easy cleanup'], climate: 'Mini-split or window AC ($800–$2,500)' },
    },
    "three-car": {
      storage: { system: 'Full Storage System', cost: '$4,000–$10,000', items: ['Custom cabinetry wall system', 'Overhead storage racks (multiple)', 'Industrial shelving units', 'Dedicated seasonal zone'], climate: 'Mini-split 2-zone ($3,000–$5,000)' },
      workshop: { system: 'Pro Workshop Build', cost: '$6,000–$15,000', items: ['Full tool storage wall (24ft)', 'Stationary tool area (saw, drill press)', 'Assembly table + clamp rack', 'Dust collection system'], climate: 'Mini-split required — DFW heat kills tools ($3,000–$5,000)' },
      hobby: { system: 'Multi-Zone Studio', cost: '$5,000–$12,000', items: ['Custom built-in storage', 'Dedicated creative workspace', 'Sink rough-in if needed', 'Sound dampening panels'], climate: 'Mini-split essential ($2,500–$4,000)' },
    },
  };

  const result = systems[garageSize]?.[primaryUse];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🗄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Garage Organization Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>No basements in DFW — your garage IS your storage. Get it right.</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🚗 Garage Size</label>
              <select value={garageSize} onChange={e => setGarageSize(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="one-car">1-Car (20x20)</option>
                <option value="two-car">2-Car (20x20 each)</option>
                <option value="three-car">3-Car (large)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🎯 Primary Use</label>
              <select value={primaryUse} onChange={e => setPrimaryUse(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="storage">Storage First</option>
                <option value="workshop">Workshop / Tools</option>
                <option value="hobby">Hobby / Creative Space</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>📦 {result.system}</span>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>{result.cost}</span>
              </div>
              <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
                {result.items.map((item, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{item}</li>)}
              </ul>
              <div style={{ background: '#1e293b', borderRadius: 6, padding: '10px 14px' }}>
                <span style={{ color: '#f97316', fontSize: 13 }}>🌡️ DFW Climate Control: </span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.climate}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{ icon: '🌡️', label: 'Epoxy in DFW Heat', value: 'Requires moisture test first' }, { icon: '📦', label: 'Overhead Storage', value: 'Best use of vertical space' }, { icon: '🔧', label: 'Wall Systems', value: 'Grid vs pegboard vs slatwall' }, { icon: '❄️', label: 'Workshop Climate', value: 'Mini-split recommended' }].map((s, i) => (
            <div key={i} style={{ background: '#111827', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get Garage Organization Quotes</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects DFW homeowners with garage organization specialists — from epoxy floors to custom cabinetry systems.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}

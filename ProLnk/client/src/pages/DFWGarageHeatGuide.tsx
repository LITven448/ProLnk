import { useState } from 'react';

type GarageSize = 'single' | 'double' | 'triple';
type GarageType = 'attached' | 'detached';
type Usage = 'storage' | 'workshop' | 'gym' | 'parking';

interface Strategy {
  priority: string[];
  solution: string;
  cost: string;
  tempReduction: string;
  notes: string;
}

const strategies: Record<Usage, Record<GarageType, Strategy>> = {
  storage: {
    attached: { priority: ['Insulate door (R-18+)', 'Insulate ceiling', 'Add weatherstripping'], solution: 'Insulated door + ceiling insulation + passive ventilation', cost: '$800–$2,200', tempReduction: '30–45°F cooler', notes: 'Focus on keeping stored items safe — chemicals, aerosols, and electronics fail above 120°F' },
    detached: { priority: ['Roof vent + ridge vent', 'Reflective roof coating', 'Insulate north wall'], solution: 'Radiant barrier + ventilation — AC not cost-effective for storage only', cost: '$400–$900', tempReduction: '20–35°F cooler', notes: 'Reflective coating alone drops interior temp 15-25°F in DFW summer sun' },
  },
  workshop: {
    attached: { priority: ['Mini-split (18,000 BTU minimum)', 'Insulate all walls + ceiling', 'Insulate door'], solution: 'Mini-split AC + full insulation package', cost: '$2,800–$5,500', tempReduction: '70–85°F cooler (conditioned space)', notes: 'Mini-split pays back in 3 years vs portable units; attached garage benefits from house insulation' },
    detached: { priority: ['Mini-split (24,000 BTU)', 'Full envelope insulation', 'Vapor barrier on floor'], solution: 'Dedicated mini-split with full insulation — treat as conditioned structure', cost: '$3,500–$7,000', tempReduction: '75–90°F cooler', notes: 'Detached workshop needs its own electrical subpanel for mini-split — budget $1,500 extra' },
  },
  gym: {
    attached: { priority: ['Mini-split (18,000 BTU)', 'Insulate ceiling + walls', 'Exhaust fan for humidity'], solution: 'Mini-split + exhaust fan + rubber flooring as thermal mass', cost: '$2,500–$5,000', tempReduction: '70–80°F cooler', notes: 'DFW humidity during workouts is dangerous above 85°F — dehumidification is as important as cooling' },
    detached: { priority: ['Mini-split (24,000 BTU)', 'Full insulation', 'Dedicated electrical circuit'], solution: 'Full mini-split conditioning with vapor barrier and ventilation', cost: '$4,000–$7,500', tempReduction: '75–90°F cooler', notes: 'Budget for electrical upgrade — gym equipment + mini-split often requires 200A service' },
  },
  parking: {
    attached: { priority: ['Insulated door', 'Attic ventilation fan', 'Weatherstripping'], solution: 'Insulated door + attic fan — full AC not needed for parking only', cost: '$600–$1,800', tempReduction: '25–40°F cooler', notes: 'Car battery life extends significantly when garage stays under 100°F — insulated door alone adds years' },
    detached: { priority: ['Ridge vents + soffit vents', 'Reflective roof coating', 'Shade trees/structures'], solution: 'Passive ventilation system + reflective coating', cost: '$300–$800', tempReduction: '20–30°F cooler', notes: 'A properly ventilated detached garage stays 20-30°F cooler than ambient air without any AC' },
  },
};

const sizeMultiplier: Record<GarageSize, string> = {
  single: '(1-car: standard sizing applies)',
  double: '(2-car: add 20% to cost estimates)',
  triple: '(3-car: add 50% to cost estimates — consider two zones)',
};

export default function DFWGarageHeatGuide() {
  const [size, setSize] = useState<GarageSize | ''>('');
  const [type, setType] = useState<GarageType | ''>('');
  const [usage, setUsage] = useState<Usage | ''>('');
  const [result, setResult] = useState<Strategy | null>(null);

  function getStrategy() {
    if (!size || !type || !usage) return;
    setResult(strategies[usage as Usage]?.[type as GarageType] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Garage Heat Management</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW garages hit 140–150°F in summer — here's how to fight back</p>
        </div>

        <div style={{ background: '#7c1d1d', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #ef4444' }}>
          <h2 style={{ color: '#fca5a5', fontSize: 16, marginBottom: 10 }}>🔥 The DFW Garage Heat Problem</h2>
          <ul style={{ color: '#fecaca', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Interior garage temps reach 140–150°F on peak DFW summer days</li>
            <li>Paint cans, aerosols, and gasoline containers become fire hazards above 120°F</li>
            <li>Electronics, batteries, and adhesives fail within weeks in an unmanaged garage</li>
            <li>Attached garages radiate heat into living space — raising AC costs 15-25%</li>
            <li>Freeze/thaw swings (DFW gets both) crack drywall and warp door panels without insulation</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Get Your Heat Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Garage Size', value: size, setter: setSize, options: [['single','1-Car'],['double','2-Car'],['triple','3-Car']] },
              { label: 'Attached or Detached', value: type, setter: setType, options: [['attached','Attached to House'],['detached','Detached/Separate']] },
              { label: 'Primary Usage', value: usage, setter: setUsage, options: [['storage','Storage'],['workshop','Workshop/Hobby'],['gym','Home Gym'],['parking','Parking Only']] },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>{field.label}</label>
                <select value={field.value} onChange={e => field.setter(e.target.value as never)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                  <option value="">Select...</option>
                  {field.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={getStrategy}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get Heat Strategy →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>✅ Recommended Solution</h2>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{result.solution}</p>
            {size && <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 12 }}>{sizeMultiplier[size as GarageSize]}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#112240', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>ESTIMATED COST</div>
                <div style={{ color: '#4ade80', fontSize: 18, fontWeight: 700 }}>{result.cost}</div>
              </div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>TEMP REDUCTION</div>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{result.tempReduction}</div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>PRIORITY ORDER</h3>
              {result.priority.map((p, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>{i + 1}. {p}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
              💡 {result.notes}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌬️ Ventilation vs AC: Quick Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[['Attic Fan', '$200–600', '10–20°F drop — storage/parking only'],['Mini-Split AC', '$2,500–6,000', 'Full conditioning — workshop/gym'],['Ridge+Soffit Vents', '$300–700', 'Passive 15-25°F drop — lowest cost']].map(([name, cost, use], i) => (
              <div key={i} style={{ background: '#1e3a5f', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{name}</div>
                <div style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>{cost}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{use}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

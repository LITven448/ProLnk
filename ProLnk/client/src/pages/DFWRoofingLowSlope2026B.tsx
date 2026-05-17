import { useState } from 'react';

const systems = [
  {
    id: 'tpo', name: 'TPO', icon: '☀️', dfwRating: '★★★★★',
    desc: 'Thermoplastic polyolefin — white/gray membrane, reflects DFW summer heat, heat-welded seams',
    lifespan: '20-30 years', cost: '$5.50–8.50/sf',
    pros: ['Reflects up to 85% solar heat — critical for DFW summers', 'Heat-welded seams = strongest system', 'Energy Star rated, utility rebates available'],
    cons: ['Can become brittle with age if improperly installed', 'Quality varies significantly by manufacturer'],
    dfwNote: 'Best choice for DFW flat/low-slope roofs — utility bills drop 15-25% vs dark roofs'
  },
  {
    id: 'epdm', name: 'EPDM', icon: '⬛', dfwRating: '★★★☆☆',
    desc: 'Ethylene propylene diene monomer — black rubber membrane, proven technology, glued/ballasted',
    lifespan: '20-25 years', cost: '$4.50–7.00/sf',
    pros: ['Excellent UV and ozone resistance', 'Lower material cost', 'Easy repairs with tape/patches'],
    cons: ['Black absorbs DFW heat — adds cooling load', 'Glued seams can fail in extreme heat cycles'],
    dfwNote: 'Use white-coated EPDM in DFW to offset heat absorption penalty'
  },
  {
    id: 'mod_bit', name: 'Modified Bitumen', icon: '🔥', dfwRating: '★★★★☆',
    desc: 'Modified asphalt with polymer reinforcement — torch-applied or self-adhered, proven DFW track record',
    lifespan: '15-20 years', cost: '$4.00–7.50/sf',
    pros: ['Proven 40+ year DFW track record', 'Easy to inspect and repair', 'Granulated surface reflects some heat'],
    cons: ['Torch application requires experienced contractor', 'Shorter lifespan than TPO'],
    dfwNote: 'SBS (cold-applied) preferred over APP in DFW for flexibility in temperature swings'
  },
  {
    id: 'coating', name: 'Roof Coating', icon: '🪣', dfwRating: '★★★☆☆',
    desc: 'Applied over existing membrane — silicone, acrylic, or polyurea — extends life without tear-off',
    lifespan: '10-15 years (coating life)', cost: '$2.00–4.00/sf',
    pros: ['No tear-off cost or waste', 'Silicone ponding-water resistant', 'Fast application, minimal disruption'],
    cons: ['Only works if existing membrane is structurally sound', 'Not all substrates are coatable'],
    dfwNote: 'Great for DFW commercial warehouses and low-slope residential add-ons'
  },
];

export default function DFWRoofingLowSlope2026B() {
  const [selected, setSelected] = useState('tpo');
  const [priority, setPriority] = useState('heat');
  const current = systems.find(s => s.id === selected)!;

  const priorityRec: Record<string,string> = {
    heat: 'tpo', cost: 'epdm', proven: 'mod_bit', existing: 'coating'
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Low Slope Roofing Guide 2026 (Part 2)</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Which flat/low-slope roofing system wins for Dallas-Fort Worth — detailed comparison</p>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>Your Priority → Best DFW System</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {[{id:'heat',label:'Beat DFW Heat'},{id:'cost',label:'Lowest Cost'},{id:'proven',label:'Proven Track Record'},{id:'existing',label:'Existing Roof'}].map(p => (
              <button key={p.id} onClick={() => { setPriority(p.id); setSelected(priorityRec[p.id]); }}
                style={{ background: priority === p.id ? '#F5E642' : '#1e3a5f', color: priority === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 20, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>Recommended: {systems.find(s=>s.id===priorityRec[priority])?.name}</span>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>{systems.find(s=>s.id===priorityRec[priority])?.dfwNote}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {systems.map(s => (
            <div key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected===s.id?'#1a2a4a':'#111d33', border:`2px solid ${selected===s.id?'#F5E642':'#1e3a5f'}`, borderRadius:10, padding:14, cursor:'pointer' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.cost}</div>
              <div style={{ fontSize: 11, marginTop: 2 }}>{s.dfwRating}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{current.icon}</div>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 6px' }}>{current.name}</h2>
          <p style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 10 }}>{current.desc}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', flex: 1 }}>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>LIFESPAN</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{current.lifespan}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', flex: 1 }}>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>DFW COST</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{current.cost}</div>
            </div>
          </div>
          {current.pros.map((p,i) => <div key={i} style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
          {current.cons.map((c,i) => <div key={i} style={{ color: '#f87171', fontSize: 13, marginBottom: 4 }}>✗ {c}</div>)}
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginTop: 10 }}>
            <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>DFW NOTE: </span>
            <span style={{ color: '#94a3b8', fontSize: 13 }}>{current.dfwNote}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk DFW Homeowner Resource · Dallas-Fort Worth · 2026
        </div>
      </div>
    </div>
  );
}

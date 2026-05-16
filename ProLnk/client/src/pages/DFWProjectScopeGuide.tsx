import { useState } from 'react';

const PROJECT_TEMPLATES: Record<string, { sections: { title: string; placeholder: string }[]; permitNote: string }> = {
  'Flooring': {
    permitNote: 'No permit required in most DFW cities for flooring replacement.',
    sections: [
      { title: '📐 Area & Square Footage', placeholder: 'Install ______ sq ft of ______ [brand] ______ [product line] ______ [color/SKU] in ______ [rooms].' },
      { title: '🧹 Removal', placeholder: 'Remove and haul away existing ______ [carpet/tile/hardwood] including all tack strips, adhesive residue, and underlayment.' },
      { title: '🔗 Transitions & Thresholds', placeholder: 'Install ______ transition strips at all doorways between ______ and ______. Match existing ______ [finish].' },
      { title: '🏗️ Subfloor Prep', placeholder: 'Inspect and repair any soft spots in subfloor. Level to within ______ inch per ______ feet before installation.' },
    ],
  },
  'Kitchen Remodel': {
    permitNote: 'Permit required in all DFW cities for any electrical, plumbing, or structural work in kitchen.',
    sections: [
      { title: '🍳 Cabinet Scope', placeholder: 'Remove and haul existing cabinets. Install ______ [brand] ______ [line] cabinets per attached layout drawing dated ______.' },
      { title: '🪨 Countertop Scope', placeholder: 'Install ______ [material] countertops ______ inches thick. Template after cabinets set. Backsplash height: ______ inches.' },
      { title: '🚿 Plumbing', placeholder: 'Relocate sink drain to ______ [location]. Install ______ [brand/model] faucet. Replace shutoff valves under sink.' },
      { title: '⚡ Electrical', placeholder: 'Install ______ dedicated 20A circuits for appliances. Add ______ GFCI outlets per code. Install ______ [brand] under-cabinet lighting.' },
    ],
  },
  'Roof Replacement': {
    permitNote: 'Permit required for full roof replacement in all DFW cities (Dallas, Fort Worth, Plano, Frisco, McKinney, etc.).',
    sections: [
      { title: '🏚️ Tear-Off', placeholder: 'Remove ______ layers of existing shingles and haul off site. Inspect decking; replace damaged boards at $______ per sheet.' },
      { title: '🛡️ Underlayment', placeholder: 'Install ______ [brand] synthetic underlayment ______ lb minimum. Ice & water shield first ______ feet from eave and all valleys.' },
      { title: '🏠 Shingles', placeholder: 'Install ______ [brand] ______ [product] architectural shingles, ______ [color], ______ year manufacturer warranty.' },
      { title: '💨 Ventilation', placeholder: 'Install ______ ridge vents at ______ NFA per linear foot. Remove existing ______ box vents. Meet DFW IRC ventilation ratio.' },
    ],
  },
  'HVAC Replacement': {
    permitNote: 'Mechanical permit required. DFW inspectors check refrigerant line set, electrical disconnect, and equipment sizing.',
    sections: [
      { title: '❄️ Equipment', placeholder: 'Remove existing ______ [brand] ______ ton unit. Install ______ [brand] ______ [model] ______ ton ______ SEER2 system.' },
      { title: '📡 Line Set & Coil', placeholder: 'Replace line set with new ______ [size] copper line set ______ ft length. Install matching ______ [brand] evaporator coil.' },
      { title: '🌡️ Thermostat', placeholder: 'Install ______ [brand/model] smart thermostat. Program ______ zones. Commission and test all modes.' },
      { title: '🔌 Electrical', placeholder: 'Install ______ amp disconnect at unit. Verify existing ______ amp panel circuit meets load. Run new ______ gauge wire if required.' },
    ],
  },
};

export default function DFWProjectScopeGuide() {
  const [project, setProject] = useState('');
  const template = PROJECT_TEMPLATES[project];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>📝 Write Your Project Scope</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '1rem' }}>Vague scope = contractor disputes. Precise scope = fair bids, fewer surprises, legal protection.</p>
        <div style={{ background: '#1A2A20', border: '1px solid #2A4A30', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '2rem', color: '#7BC47F', fontSize: '0.9rem' }}>
          💡 Don't write "replace flooring." Write "install 800 sq ft of Shaw Floorté Pro LVP in Weathered Oak (SKU FL123) including removal of existing carpet and transition strips at all 3 doorways."
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Select Project Type</h2>
          <select value={project} onChange={e => setProject(e.target.value)}
            style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }}>
            <option value="">— Select Project —</option>
            {Object.keys(PROJECT_TEMPLATES).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        {template && (
          <>
            <div style={{ background: '#1A1A2E', border: '1px solid #3A2A4A', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#B08AE0', fontSize: '0.9rem' }}>
              📋 <strong>Permit Note:</strong> {template.permitNote}
            </div>
            <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem' }}>
              <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Scope Template — Fill In the Blanks</h2>
              {template.sections.map(s => (
                <div key={s.title} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>{s.title}</div>
                  <div style={{ background: '#0A1628', border: '1px dashed #2A3A55', borderRadius: 8, padding: '0.85rem', color: '#7A8A9A', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {s.placeholder}
                  </div>
                </div>
              ))}
              <div style={{ background: '#1A2A20', border: '1px solid #2A4A30', borderRadius: 8, padding: '0.75rem', color: '#7BC47F', fontSize: '0.85rem' }}>
                ✅ Add this scope language word-for-word to your contract. Any deviation requires a written change order.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const months = [
  { id: '1', label: 'January', actions: ['Minimal watering — 1–2x/week max if no rain', 'Check for frost heaving around foundation perimeter', 'Protect exposed pier caps with burlap or foam if freeze is forecast', 'Walk perimeter after hard freezes to spot new cracks'] },
  { id: '3', label: 'March', actions: ['Soil re-hydration check: press screwdriver 6″ into soil near foundation', 'If soil pulls away from slab, begin watering immediately', 'Schedule professional foundation inspection if winter was dry', 'Re-establish drip irrigation zones disabled in fall'] },
  { id: '5', label: 'May', actions: ['Start daily soaker hose watering as temps climb past 80°F', 'Target 6″ of moisture depth uniformly around perimeter', 'Check all downspout extensions — water must discharge 4ft+ from foundation', 'Look for new door/window sticking — early warning of movement'] },
  { id: '7', label: 'July–August', actions: ['Peak daily watering — DFW clay shrinks fast in 100°F+ heat', 'Water early AM to reduce evaporation loss', 'Monitor cracks at brick mortar and window corners daily', 'If soil gap appears (> 1″), call foundation pro immediately'] },
  { id: '10', label: 'October', actions: ['Taper watering as temps drop below 80°F', 'Reduce frequency but maintain soil moisture depth', 'Inspect gutters before fall leaf drop', 'Schedule annual foundation check before winter slowdown'] },
  { id: '12', label: 'December', actions: ['Prepare for freeze: disconnect hoses, shut off irrigation', 'Verify all crawl space vents are operational', 'Minimal watering only if 2+ weeks of no rain', 'Document any new cracks with photos for spring comparison'] },
];

export default function DFWFoundationMonthByMonth2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const month = months.find(m => m.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Month-by-Month Foundation Care for DFW</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>DFW's expansive clay soil is one of the most challenging foundation environments in the US. Consistent seasonal care prevents the majority of costly foundation failures.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Why DFW Foundations Need Year-Round Attention</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['Expansive Clay', 'Swells and shrinks 4–6″ seasonally'], ['Summer Heat', '100°F+ dries soil rapidly near surface'], ['Winter Freeze', 'Uri (2021) showed freeze damage is real'], ['Drought Cycles', 'DFW cycles between extreme wet/dry']].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#F5E642′ }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#C5CAD8', marginTop: '0.25rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Select Your Month → Get Action Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? '#F5E642′ : '#0A1628', color: selected === m.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.9rem' }}>{m.label}</button>
            ))}
          </div>
          {month && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📋 {month.label} Foundation Actions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8′ }}>
                {month.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>⚠️ Warning Signs Requiring Immediate Pro Inspection</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8′ }}>
            <li>Soil gap wider than 1" appearing around foundation</li>
            <li>Doors or windows suddenly difficult to open or close</li>
            <li>New diagonal cracks at window or door corners</li>
            <li>Visible step cracking in brick exterior</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted foundation pro network
        </div>
      </div>
    </div>
  );
}
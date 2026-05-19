import { useState } from 'react';

const components = [
  { id: 'grille', icon: '🔳', name: 'Return Grille', desc: 'The large grille (often in a hallway ceiling) where air is drawn back from your living spaces.', problem: 'Most DFW homes built before 2000 have a single central return — grossly undersized for today’s high-efficiency systems.' },
  { id: 'plenum', icon: '📡', name: 'Return Plenum', desc: 'The duct section or open space between the return grille and the air handler filter rack.', problem: 'Leaky return plenums in DFW attics pull unconditioned 150°F air in, destroying efficiency and creating humidity problems.' },
  { id: 'filter', icon: '🧹', name: 'Filter Rack', desc: 'Where your air filter sits — captures dust, pollen, and allergens before air reaches the blower.', problem: 'Undersized filter racks create static pressure spikes that make DFW systems work harder in summer peak loads.' },
];

const symptoms = [
  { symptom: 'Doors slam or pop open on their own', diagnosis: 'Positive pressure in rooms — insufficient return air creating pressure imbalance.', options: ['Add transfer grilles between rooms', 'Install additional return grille in affected area', 'Undercut interior doors 3/4 inch'], cost: '$150–$800 depending on solution' },
  { symptom: 'System runs constantly but can’t keep up', diagnosis: 'Return air starvation — blower is pulling harder than the return can supply, reducing effective airflow.', options: ['Add dedicated return duct to each zone', 'Upgrade central return to proper CFM size', 'Install return air pathway via attic bypass'], cost: '$400–$1,800′ },
  { symptom: 'Filter gets dirty in 2–3 weeks', diagnosis: 'Return air is pulling dust from attic or wall cavities — duct leaks in return system.', options: ['Seal all return duct joints with mastic', 'Inspect filter rack for air bypass gaps', 'Install high-efficiency media filter cabinet'], cost: '$200–$600′ },
  { symptom: 'High humidity even when AC runs all day', diagnosis: 'Leaky return plenum pulling humid attic air into system — common in DFW’s 70%+ summer humidity.', options: ['Seal return plenum with mastic and foil tape', 'Add dehumidification to system', 'Evaluate for proper duct design'], cost: '$250–$1,500′ },
];

export default function DFWHVACReturnAirSystem() {
  const [active, setActive] = useState<string | null>(null);
  const [symptomIdx, setSymptomIdx] = useState<number | null>(null);

  const selected = components.find(c => c.id === active);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Education</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>Return Air System</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>Most DFW homeowners don't know their return air system exists — until it fails. Single central returns are the #1 comfort problem in DFW homes.</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', border: '1px solid #2A4A7F' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>⚠️ DFW Reality Check: </span>
          <span style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>Over 65% of DFW homes have inadequate return air capacity. This forces your system to work 20-40% harder every summer — and most homeowners blame the system, not the ductwork.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {components.map(c => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? '#F5E642′ : '#0F2140', border: `2px solid ${active === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem 1rem', cursor: ’pointer', textAlign: 'left', color: active === c.id ? '#0A1628′ : '#E8EDF5' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.name}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>{selected.icon} {selected.name}</h3>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 1rem' }}>{selected.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>🌡️ DFW PROBLEM</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selected.problem}</p>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Diagnose Your Return Air Symptom</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {symptoms.map((s, i) => (
            <div key={i} onClick={() => setSymptomIdx(symptomIdx === i ? null : i)}
              style={{ background: '#0F2140', border: `1px solid ${symptomIdx === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, color: symptomIdx === i ? '#F5E642′ : '#E8EDF5' }}>"{s.symptom}"</div>
              {symptomIdx === i && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <div style={{ color: '#CBD5E1', marginBottom: '0.5rem' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Assessment: </span>{s.diagnosis}</div>
                  <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Options: </span>{s.options.map((o, j) => <div key={j} style={{ color: '#94A3B8', paddingLeft: '1rem' }}>• {o}</div>)}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600 }}>Estimated Cost: <span style={{ color: '#E8EDF5′ }}>{s.cost}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Return Air Assessment — No Cost</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 1rem' }}>ProLnk connects you with DFW-certified HVAC pros who do full Manual D return air calculations.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Request Return Air Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

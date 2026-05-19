import { useState } from 'react';

const balanceConcepts = [
  { id: 'pressure', icon: '⚖️', name: 'Air Pressure Balance', desc: 'Each room should be at neutral pressure — air enters and leaves at equal rates.', dfwNote: 'In DFW’s sealed homes, pressure imbalance worsens summer infiltration of hot humid air through wall cracks.' },
  { id: 'airflow', icon: '💨', name: 'Airflow Distribution', desc: 'Each room receives CFM airflow proportional to its size and heat load.', dfwNote: 'DFW west-facing rooms gain 40% more solar heat load — they need proportionally more supply airflow than north rooms.' },
  { id: 'zoning', icon: '🗺️', name: 'Zone Balance', desc: 'Multi-zone systems must balance damper positions to prevent over-conditioning one area.', dfwNote: 'Single-zone DFW systems almost always over-cool common areas while upstairs bedrooms stay hot in July-August.' },
  { id: 'static', icon: '📊', name: 'Static Pressure', desc: 'Total external static pressure (TESP) must stay within equipment rating or airflow degrades.', dfwNote: 'High-efficiency filters in DFW homes often push TESP above 0.5" WC — killing system capacity when it’s needed most.' },
];

const symptoms = [
  {
    symptom: 'Upstairs always 5-8°F hotter than downstairs',
    diagnosis: 'Classic DFW two-story imbalance — heat rises, single thermostat under-serves upper floor',
    solutions: ['Add zone dampers with separate upstairs thermostat', 'Increase supply airflow to upper floor by 15-20%', 'Add mini-split to master bedroom for supplemental cooling'],
    cost: '$800–$4,500',
  },
  {
    symptom: 'One room noticeably colder than others',
    diagnosis: 'Over-supplied room or under-supplied adjacent rooms — duct balancing needed',
    solutions: ['Partially close supply damper in over-cooled room', 'Increase duct size to under-cooled rooms', 'Add booster fan to weak supply runs'],
    cost: '$150–$1,200',
  },
  {
    symptom: 'Whistling or whooshing from registers',
    diagnosis: 'High static pressure — likely undersized ducts, dirty filter, or closed dampers',
    solutions: ['Check and replace filter (use lower MERV rating if needed)', 'Open all supply and return dampers fully', 'Have TESP measured — may need duct upsizing'],
    cost: '$50–$2,000',
  },
  {
    symptom: 'Master bedroom won’t cool at night',
    diagnosis: 'Master wing often at end of duct run — longest static pressure loss path in DFW ranch homes',
    solutions: ['Install duct booster fan on master branch', 'Add dedicated mini-split to master', 'Re-route supply closer to air handler'],
    cost: '$200–$3,500',
  },
  {
    symptom: 'House humidity feels high even when running',
    diagnosis: 'System may be oversized — short cycling means not enough runtime for dehumidification',
    solutions: ['Verify system sizing with Manual J', 'Install variable speed blower for longer lower-capacity runs', 'Add whole-home dehumidifier'],
    cost: '$500–$3,000',
  },
];

export default function DFWHVACSystemBalance() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [activeSymptom, setActiveSymptom] = useState<number | null>(null);

  const selected = balanceConcepts.find(b => b.id === activeConcept);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Education</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>HVAC System Balance</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>A "balanced" HVAC system delivers equal comfort to every room — equal pressure, proper airflow, and no hot spots. In DFW's extreme heat, even small imbalances cause major comfort failures.</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '2rem', border: '1px solid #2A4A7F' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>📐 DFW Balance Baseline: </span>
          <span style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>A properly balanced DFW home should have no more than 2°F variation between rooms, consistent 50-55% summer humidity, and static pressure under 0.5" WC throughout.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {balanceConcepts.map(b => (
            <button key={b.id} onClick={() => setActiveConcept(activeConcept === b.id ? null : b.id)}
              style={{ background: activeConcept === b.id ? '#F5E642' : '#0F2140', border: `2px solid ${activeConcept === b.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem 1rem', cursor: 'pointer', textAlign: 'left', color: activeConcept === b.id ? '#0A1628' : '#E8EDF5' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{b.name}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1E3A5F' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>{selected.icon} {selected.name}</h3>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 1rem' }}>{selected.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>🌡️ DFW CONTEXT</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selected.dfwNote}</p>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Diagnose Your Balance Issue</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {symptoms.map((s, i) => (
            <div key={i} onClick={() => setActiveSymptom(activeSymptom === i ? null : i)}
              style={{ background: '#0F2140', border: `1px solid ${activeSymptom === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, color: activeSymptom === i ? '#F5E642' : '#E8EDF5' }}>"{s.symptom}"</div>
              {activeSymptom === i && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <div style={{ color: '#CBD5E1', marginBottom: '0.75rem' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Diagnosis: </span>{s.diagnosis}</div>
                  <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontWeight: 700 }}>Solutions:</div>
                  {s.solutions.map((sol, j) => <div key={j} style={{ color: '#94A3B8', paddingLeft: '1rem', marginBottom: '0.25rem' }}>• {sol}</div>)}
                  <div style={{ marginTop: '0.75rem', color: '#F5E642', fontWeight: 600 }}>Estimated Cost: <span style={{ color: '#E8EDF5' }}>{s.cost}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚖️</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Get a DFW System Balance Assessment</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 1rem' }}>ProLnk matches you with certified DFW HVAC technicians who perform airflow measurement and balancing — not guesswork.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Request Balance Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}

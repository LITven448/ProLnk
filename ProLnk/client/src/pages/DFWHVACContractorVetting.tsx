import { useState } from 'react';

const projectTypes = [
  {
    type: 'New System Installation',
    criteria: ['Get 3 bids minimum — prices vary $3,000-$8,000+ in DFW', 'Require Manual J load calculation (not just guessing tonnage)', 'Ask which manufacturer they are authorized to install'],
    questions: ['Are you NATE-certified on this equipment type?', 'Will you pull permits with the city?', 'What is your SEER2 recommendation for DFW climate?'],
    goodAnswers: 'Pulls permits every time. Explains Manual J. Names specific manufacturer authorization.',
  },
  {
    type: 'System Repair',
    criteria: ['Verify TDLR HVAC license number on Texas.gov before they arrive', 'Ask if repair requires a permit (refrigerant work often does)', 'Get written diagnosis before authorizing work'],
    questions: ['What is your TDLR license number?', 'Do you charge a diagnostic fee separate from repair?', 'Is this repair or replacement more cost-effective?'],
    goodAnswers: 'Gives license number immediately. Explains trade-off honestly. Documents diagnosis in writing.',
  },
  {
    type: 'Preventive Maintenance',
    criteria: ['Ask exactly what is included in the tune-up checklist', 'Confirm tech is NATE-certified or supervised by one', 'Check if refrigerant pressure test is included'],
    questions: ['What does your maintenance checklist include?', 'Will you check static pressure and airflow?', 'Do you inspect the flue for CO risk?'],
    goodAnswers: 'Provides written checklist. Checks static pressure and airflow — signs of real HVAC knowledge.',
  },
];

const vetItems = [
  { label: 'TDLR License', detail: 'Verify at tdlr.texas.gov — required for all HVAC work in Texas' },
  { label: 'NATE Certification', detail: 'North American Technician Excellence — gold standard for HVAC competence' },
  { label: 'Local DFW Address', detail: 'No P.O. boxes — storm-chasing crews appear after summer heat waves' },
  { label: 'Manufacturer Authorization', detail: 'Lennox/Carrier/Trane dealers get better warranties and training' },
  { label: 'Permit-Pulling History', detail: 'Ask: "Do you pull permits?" Unpermitted work voids homeowner insurance' },
  { label: 'Liability Insurance $1M+', detail: 'Request certificate of insurance naming your address' },
  { label: 'Written Estimate', detail: 'Itemized labor and parts — verbal quotes are unenforceable' },
  { label: 'References in DFW', detail: 'Local references only — 3 jobs in last 6 months in your area' },
];

export default function DFWHVACContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌡️ HVAC Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW summers hit 110°F. A bad HVAC hire costs $3,000–$12,000 in mistakes. Verify these 8 things before signing anything.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>8 Things to Verify</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {vetItems.map((item, i) => (
            <div key={i} style={{ background: '#111f38', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ {item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Project-Specific Criteria</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {projectTypes.map((p, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {p.type}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#111f38', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{projectTypes[selected].type}</h3>
            <div style={{ marginBottom: 12 }}>
              {projectTypes[selected].criteria.map((c, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>• {c}</div>)}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>QUESTIONS TO ASK</div>
              {projectTypes[selected].questions.map((q, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>❓ {q}</div>)}
            </div>
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✅ WHAT GOOD ANSWERS SOUND LIKE</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{projectTypes[selected].goodAnswers}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#111f38', borderRadius: 10, padding: 20, borderTop: '2px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW-Specific Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Demands cash or check only. Can't provide TDLR number on the spot. Quotes tonnage without measuring your home. No local address. Pressure to sign same day.
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const projectTypes = [
  {
    type: 'Pier & Beam Foundation',
    criteria: ['DFW expansive clay soil requires engineered pier depth (typically 12–14 ft)', 'Confirm piers are pressed steel or concrete — not wood', 'Ask if they use a licensed structural engineer to spec the job'],
    questions: ['Will a structural engineer sign off on the pier layout?', 'What type of piers do you install and why?', 'Is your warranty transferable to the next buyer?'],
    goodAnswers: 'References a licensed engineer. Explains pier type based on soil report. Warranty is transferable — no exceptions.',
  },
  {
    type: 'Slab Foundation Repair',
    criteria: ['Require a pre-work elevation survey (plumb readings at multiple points)', 'Ask if they use tunneling vs. pressed piling vs. drilled piers', 'Confirm post-tension slab awareness — cutting PT cables is catastrophic'],
    questions: ['Do you perform an elevation survey before and after?', 'How do you identify post-tension cables before drilling?', 'What is your typical movement correction in inches?'],
    goodAnswers: 'Always does elevation survey. Names a process for locating PT cables. Provides before/after readings in writing.',
  },
  {
    type: 'Drainage & Root Barrier',
    criteria: ['DFW tree roots (especially oak/cedar elm) destroy foundations — ask about root barrier depth', 'French drain systems must slope correctly or they make moisture worse', 'Confirm they assess soil moisture before recommending drainage'],
    questions: ['What depth do you install root barriers?', 'Will you verify existing drainage grade before installing?', 'Do you recommend a soaker hose program alongside drainage?'],
    goodAnswers: 'Recommends 2–3 ft root barrier minimum. Assesses existing grade. Explains moisture-foundation connection clearly.',
  },
];

const vetItems = [
  { label: 'Transferable Lifetime Warranty', detail: 'NON-NEGOTIABLE in DFW — no warranty = no hire. Must transfer to future buyers.' },
  { label: 'Licensed Structural Engineer', detail: 'Ask: "Does a PE stamp your job?" — top firms use engineers, not just salespeople' },
  { label: 'BBB Accreditation A or Better', detail: 'DFW foundation market has chronic complaint patterns — check bbb.org/dfw' },
  { label: 'Local DFW Address', detail: 'No storm chasers — foundation work requires follow-up over years, not months' },
  { label: 'Soil Report Awareness', detail: 'Ask if they review the soil conditions at your specific address before quoting' },
  { label: 'Pre/Post Elevation Survey', detail: 'Required on all serious work — no survey = no way to verify results' },
  { label: 'Permit Pulling', detail: 'Structural work requires city permit in most DFW municipalities — verify they pull it' },
  { label: 'Written Scope of Work', detail: 'Number of piers, pier locations, materials, timeline — nothing verbal' },
];

export default function DFWFoundationContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏗️ Foundation Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW sits on some of the most expansive clay soil in America. Foundation movement is normal — foundation fraud is common. Verify these 8 things before signing.</p>

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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW Foundation Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            No transferable warranty. Quotes without visiting the property. Doesn't mention an engineer. Demands large deposit before work begins. Can't explain what type of piers they use or why. Price seems too low — DFW foundation repair averages $5,000–$20,000+.
          </div>
        </div>
      </div>
    </div>
  );
}

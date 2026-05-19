import { useState } from 'react';

const projectTypes = [
  {
    label: 'Panel Upgrade / Replacement',
    required: 'Master Electrician',
    permits: 'City permit required — contractor must pull it, homeowner cannot',
    questions: ['Are you a licensed Master Electrician?', 'Will you pull the permit and schedule the inspection?', 'What panel brand do you install and why?'],
    rates: 'DFW panel upgrade (200A): $2,500–$5,000 depending on home age and access complexity',
  },
  {
    label: 'EV Charger Installation',
    required: 'Journeyman minimum, Master preferred for panel work',
    permits: 'Permit required in most DFW cities — verify with your city',
    questions: ['Is the existing panel capable or does it need upgrade?', 'What Level 2 charger brand do you install?', 'Is the permit included in your quote?'],
    rates: 'DFW EV charger install: $500–$1,500 for dedicated circuit; $1,500–$4,000 if panel upgrade needed',
  },
  {
    label: 'Whole-Home Rewire',
    required: 'Master Electrician required',
    permits: 'Multiple inspection stages required — rough-in, cover, final',
    questions: ['How do you handle knob-and-tube or aluminum wiring discovered during the job?', 'Who schedules and attends inspections?', 'What is your timeline for a home this size?'],
    rates: 'DFW whole-home rewire: $8,000–$20,000+ depending on square footage and access',
  },
  {
    label: 'Outlets / Switches / Fixtures',
    required: 'Apprentice or Journeyman acceptable for straightforward work',
    permits: 'Generally no permit required for simple device swaps — verify for new circuits',
    questions: ['Is this a new circuit or an existing one?', 'Do you charge flat rate or hourly?', 'How do you handle unexpected issues inside the wall?'],
    rates: 'DFW hourly rate: $85–$150/hr; outlet/switch swap flat rate $150–$300',
  },
  {
    label: 'Generator Installation',
    required: 'Master Electrician for transfer switch / panel connection',
    permits: 'Permit required — transfer switch work is a major installation',
    questions: ['Are you installing a manual or automatic transfer switch?', 'What size generator do you recommend for our load?', 'Does the quote include the transfer switch, pad, and gas line?'],
    rates: 'DFW standby generator installed: $7,000–$20,000 depending on capacity',
  },
];

export default function DFWElectricianSelectionGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>DFW Electrician Selection Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            License levels, permit responsibilities, and how to hire the right electrician in Dallas-Fort Worth.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 TDLR License Types Explained</h2>
          {[
            ['Apprentice Electrician', 'Must work under direct supervision of a Journeyman or Master. Can perform basic work — cannot supervise or lead a job independently.'],
            ['Journeyman Electrician', 'Licensed to perform electrical work independently. Required for most residential jobs. Cannot pull permits in their own name — needs a Master on record.'],
            ['Master Electrician', 'Full license to supervise, pull permits, and take responsibility for all electrical work. Required for panel upgrades, new construction, and any permit-required project.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderBottom: '1px solid #2d3f6b', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⚡ {title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
          <div style={{ color: '#60a5fa', fontSize: 14 }}>Verify all TDLR licenses at tdlr.texas.gov/electrical — enter name or license number.</div>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>📝 Permit Responsibility</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            In DFW, the licensed Master Electrician is responsible for pulling the permit — not the homeowner. Any contractor who asks you to pull your own permit is either unlicensed or trying to evade accountability. If work fails inspection, the licensed contractor is responsible for remediation. Insist that the contractor handles all permit and inspection scheduling.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔌 Project Type → License, Permits & Rates</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectTypes.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#F5E642' : '#2d3f6b',
                  backgroundColor: selected === i ? '#F5E642' : 'transparent',
                  color: selected === i ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e3a', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14 }}>{projectTypes[selected].label}</h3>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: '#60a5fa', fontWeight: 600 }}>Required License Level: </span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{projectTypes[selected].required}</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: '#60a5fa', fontWeight: 600 }}>Permit Requirements: </span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{projectTypes[selected].permits}</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>What to Ask</div>
                {projectTypes[selected].questions.map((q, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>? {q}</div>)}
              </div>
              <div style={{ backgroundColor: '#1a2744', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>DFW Market Rate: </span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{projectTypes[selected].rates}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

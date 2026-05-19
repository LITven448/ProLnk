import { useState } from 'react';

const HOME_FEATURES = [
  'Water pipes and plumbing',
  'Chimney and fireplace',
  'Irrigation system',
  'Outdoor furniture',
  'Central HVAC system',
  'Windows and doors',
  'Outdoor faucets / hose bibs',
  'Pool or spa',
];

const TASK_MAP: Record<string, { task: string; cost: string; decision: string }[]> = {
  'Water pipes and plumbing': [
    { task: 'Identify uninsulated pipes in attic, garage, exterior walls', cost: '$0', decision: 'Insulate or plan for freeze event' },
    { task: 'Buy pipe insulation wrap — DFW freezes can come overnight', cost: '$10–$40', decision: 'DIY or professional install' },
    { task: 'Know your water shutoff location before a pipe bursts', cost: '$0', decision: 'Locate and label now' },
  ],
  'Chimney and fireplace': [
    { task: 'Schedule chimney sweep before first November fire', cost: '$120–$200', decision: 'Book now — fills up fast' },
    { task: 'Stock firewood 2 weeks before first expected cold snap', cost: '$80–$200/cord', decision: 'Buy ahead or source locally' },
    { task: 'Test smoke and CO detectors near fireplace', cost: '$0', decision: 'Required — do now' },
  ],
  'Irrigation system': [
    { task: 'Winterize irrigation system before first DFW freeze', cost: '$75–$150 pro blowout', decision: 'Pro blowout vs DIY shutoff' },
    { task: 'Mark shutoff valve location for emergency access', cost: '$0', decision: 'Label it clearly' },
  ],
  'Outdoor furniture': [
    { task: 'Cover or store outdoor cushions before first frost', cost: '$30–$80 covers', decision: 'Store inside or cover in place' },
    { task: 'Secure lightweight furniture from DFW wind events', cost: '$0', decision: 'Bring in or stake down' },
  ],
  'Central HVAC system': [
    { task: 'Replace HVAC filter before heating season load increases', cost: '$15–$40', decision: 'DIY — replace every 90 days' },
    { task: 'Test heat strips or furnace — DFW furnaces sit idle 8 months', cost: '$0–$150 service call', decision: 'Test now, not during a freeze' },
  ],
  'Windows and doors': [
    { task: 'Apply draft snake or door sweep to exterior doors', cost: '$15–$40', decision: 'Quick DIY energy win' },
    { task: 'Inspect window locks — cold air infiltration check', cost: '$0', decision: 'Seal or accept heating cost' },
  ],
  'Outdoor faucets / hose bibs': [
    { task: 'Disconnect hoses from all exterior faucets', cost: '$0', decision: 'Must-do before first freeze' },
    { task: 'Install insulating covers on hose bibs', cost: '$5–$15 per cover', decision: 'Buy now before shelves clear out' },
  ],
  'Pool or spa': [
    { task: 'Decide: winterize pool or maintain through DFW mild winter', cost: '$150–$300 winterize', decision: 'Winterize vs reduced operation' },
    { task: 'If keeping open: reduce pump hours, keep heater on freeze guard', cost: '$30–$80/mo utility', decision: 'Freeze guard auto-set — verify' },
  ],
};

export default function DFWNovemberHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(feature: string) {
    setSelected(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  }

  const tasks = selected.flatMap(f => TASK_MAP[f] ?? []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Seasonal Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>🌨️ November DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Freeze prep month for DFW. Property tax due January 31 — plan payment now. Pipe risk is real: DFW pipes are less insulated than northern climates. One overnight freeze can burst a hose bib or attic line.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628′ }}>
          <strong>🧊 November DFW Winter Prep Decisions</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Property tax due Jan 31 — plan payment or installment now</li>
            <li>Disconnect garden hoses from all exterior faucets immediately</li>
            <li>Chimney sweep before first fire — carbon monoxide risk if skipped</li>
            <li>Irrigation blowout: schedule before Thanksgiving week books up</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏠 Select Your Home Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {HOME_FEATURES.map(f => (
            <button
              key={f}
              onClick={() => toggle(f)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${selected.includes(f) ? '#F5E642' : '#1E3050'}`,
                background: selected.includes(f) ? '#F5E642′ : '#111F35',
                color: selected.includes(f) ? '#0A1628′ : '#ccc',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {tasks.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your November Priority List + Key Decisions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{t.task}</span>
                    <span style={{ background: '#1E3050', padding: '3px 10px', borderRadius: 6, fontSize: 12, color: '#F5E642', whiteSpace: 'nowrap', maxWidth: 200, textAlign: 'right' }}>{t.decision}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>Est. cost: {t.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select your home features to see November winter prep decisions for DFW.</p>
        )}
      </div>
    </div>
  );
}

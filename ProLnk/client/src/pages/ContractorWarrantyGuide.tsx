import { useState } from 'react';

const projectData: Record<string, {
  workmanship: string;
  material: string;
  questions: string[];
  redFlags: string[];
  requireInWriting: string[];
}> = {
  roofing: {
    workmanship: '5–10 years (premium contractors offer 10–25 years)',
    material: '20–50 years from manufacturer depending on shingle grade',
    questions: [
      'What specific defects does your workmanship warranty cover?',
      'Is the manufacturer warranty transferable if I sell the home?',
      'Who do I call first — you or the manufacturer — if there\’s a leak?',
      'Does your warranty cover flashing, valleys, and penetrations?',
      'What voids your workmanship warranty?',
    ],
    redFlags: [
      '1-year or less workmanship warranty on a major roof replacement',
      'Warranty only covers "materials not installation"',
      'Contractor cannot name the manufacturer warranty program',
      'No warranty documentation provided at project completion',
    ],
    requireInWriting: [
      'Exact warranty duration (start date to end date)',
      'What is covered vs excluded',
      'Process for filing a warranty claim',
      'Whether warranty transfers to new owner',
    ],
  },
  hvac: {
    workmanship: '1–2 years labor (reputable DFW contractors offer 2 years)',
    material: '5–12 years parts from manufacturer; compressor up to 10 years',
    questions: [
      'Is the equipment registered with the manufacturer for full warranty?',
      'Who registers it — you or me — and when?',
      'Does your labor warranty cover refrigerant leaks or just parts failure?',
      'What annual maintenance is required to keep the warranty valid?',
      'Is this a factory-authorized installation for manufacturer warranty?',
    ],
    redFlags: [
      'Contractor won\’t register the equipment with manufacturer',
      'Warranty is verbal only — not in writing',
      'No mention of maintenance requirements to keep warranty active',
      'Labor warranty is under 1 year on a full system replacement',
    ],
    requireInWriting: [
      'Equipment serial numbers and model numbers',
      'Manufacturer registration confirmation',
      'Labor warranty duration and coverage',
      'Required annual maintenance to preserve warranty',
    ],
  },
  foundation: {
    workmanship: 'Lifetime transferable warranty (this is industry standard in DFW)',
    material: 'Pier or piling manufacturer warranty varies (ask)',
    questions: [
      'Is the warranty transferable to future homeowners?',
      'What triggers a warranty repair — measured movement, visible cracks?',
      'Who evaluates a warranty claim — you or a third-party engineer?',
      'Does the warranty cover additional settling or only the repaired areas?',
      'What is the claim response time guarantee?',
    ],
    redFlags: [
      'Warranty is less than 10 years on foundation work',
      'Warranty is not transferable — this is a deal breaker in DFW',
      'No written warranty provided at project completion',
      'Contractor evaluates their own warranty claims with no independent review',
    ],
    requireInWriting: [
      'Lifetime transferable warranty (or documented reason if not)',
      'Specific coverage terms and trigger conditions',
      'Third-party evaluation process for claims',
      'Transfer process when home is sold',
    ],
  },
  windows: {
    workmanship: '1–2 years labor; some premium installers offer lifetime on installation',
    material: 'Lifetime limited from manufacturer on glass, frame, hardware',
    questions: [
      'Is the manufacturer warranty registered to me or the contractor?',
      'Does the warranty cover seal failure and fogging between panes?',
      'What does your installation warranty cover — air infiltration, water leaks?',
      'If a manufacturer goes out of business, what happens to the warranty?',
      'How do I submit a warranty claim — through you or manufacturer directly?',
    ],
    redFlags: [
      'Installation warranty covers "defects" but not air or water infiltration',
      'Manufacturer is an unknown brand with no US service centers',
      'Warranty is non-transferable on a product built to last 30+ years',
      'No warranty on caulking or exterior trim integration',
    ],
    requireInWriting: [
      'Manufacturer warranty certificate in your name',
      'Installation warranty document',
      'Coverage for seal failure and water infiltration',
      'Transferability confirmation',
    ],
  },
  plumbing: {
    workmanship: '1 year minimum; reputable DFW plumbers offer 2 years',
    material: '1–5 years from manufacturer on fixtures and pipe materials',
    questions: [
      'Does your warranty cover the new pipes and all fittings?',
      'What events would void your workmanship warranty?',
      'If a fitting fails within warranty, do you cover water damage to drywall?',
      'Are fixtures warranted by you or am I dealing with the manufacturer?',
      'What is your warranty claim response time?',
    ],
    redFlags: [
      'Warranty only covers leaks visible at the time of installation',
      'No warranty on fittings or connection points',
      'Contractor won\’t cover consequential water damage from their work',
      'Labor warranty under 1 year on a whole-house repipe',
    ],
    requireInWriting: [
      'Scope of what pipes and fittings are covered',
      'Whether consequential damage is covered',
      'Duration and claim process',
      'Material warranty documentation from manufacturer',
    ],
  },
  electrical: {
    workmanship: '1–2 years labor on panels and wiring',
    material: 'Breaker/panel manufacturer warranty 1–5 years',
    questions: [
      'Does your warranty cover the panel, all breakers, and connections?',
      'If a breaker fails within warranty, is the diagnostic trip included?',
      'What documentation do you leave me regarding the installed circuit map?',
      'Does your warranty include any issues found during future inspections?',
      'Are permits and inspections part of what your warranty is based on?',
    ],
    redFlags: [
      'No warranty documentation provided after panel installation',
      'Warranty excludes breakers and covers "installation only"',
      'Permits were not pulled — warranty is meaningless without code compliance',
      'No circuit directory or panel map left for the homeowner',
    ],
    requireInWriting: [
      'Panel brand, model, and amperage installed',
      'Permit number and inspection pass date',
      'Warranty duration covering labor and components',
      'Circuit map and directory',
    ],
  },
};

const projectOptions = [
  { label: 'Roofing', value: 'roofing' },
  { label: 'HVAC', value: 'hvac' },
  { label: 'Foundation Repair', value: 'foundation' },
  { label: 'Window Replacement', value: 'windows' },
  { label: 'Plumbing / Repipe', value: 'plumbing' },
  { label: 'Electrical Panel', value: 'electrical' },
];

export default function ContractorWarrantyGuide() {
  const [selected, setSelected] = useState('');

  const data = projectData[selected];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🛡️ ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Understanding Contractor Warranties
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7 }}>
            A warranty is only as good as the paper it's written on — and most homeowners never ask for the right one. Here's what you should know before any job starts.
          </p>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📋 Workmanship vs. Material Warranty</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#132040', borderRadius: 12, padding: '24px' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🔧</div>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Workmanship Warranty</h3>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
                Covers defects in how the work was performed — improper installation, missing fasteners, incorrect flashing. This comes from the contractor, not the manufacturer. Duration varies wildly: 1 year to lifetime.
              </p>
            </div>
            <div style={{ backgroundColor: '#132040', borderRadius: 12, padding: '24px' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📦</div>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Material Warranty</h3>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
                Covers defects in the products themselves — a shingle that cracks prematurely, a window seal that fails, a breaker that trips incorrectly. This comes from the manufacturer and can be voided by improper installation.
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: '#1a1a00', borderRadius: 10, padding: '18px 22px', marginTop: 16, border: '1px solid #4a4a00' }}>
            <strong style={{ color: '#F5E642' }}>Critical:</strong>
            <span style={{ color: '#CBD5E1' }}> Poor installation can void your manufacturer warranty. Always verify your contractor is factory-authorized for the brand they're installing.</span>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚠️ What Voids a Warranty</h2>
          {[
            'Unauthorized modifications to the work after project completion',
            'Failure to perform required annual maintenance (common with HVAC and roofing)',
            'Using non-approved repair contractors for warranty work',
            'Installing non-compatible materials on top of or adjacent to the warranted work',
            'Damage from events not covered (storms, acts of God — read the exclusions)',
            'Not registering the product with the manufacturer within the required window',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E2D45' }}>
              <span style={{ color: '#f87171' }}>✕</span>
              <span style={{ color: '#CBD5E1' }}>{item}</span>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📝 How to Document a Warranty Claim</h2>
          {[
            ['Document the defect', 'Take dated photos or video as soon as you notice a problem. Include wide shots showing location and close-ups showing the defect.'],
            ['Notify in writing', 'Email or certified letter only — no verbal claims. Include the project date, contract number, and description of the defect.'],
            ['Reference your warranty', 'Attach a copy of the warranty document to your claim notification. This prevents "I don\’t have a record of that" responses.'],
            ['Set a response deadline', 'Request written confirmation within 5 business days and a repair timeline. Document if they miss it.'],
            ['Get the repair in writing', 'When they fix it, get a written confirmation of what was repaired and whether the warranty clock resets on the repaired section.'],
          ].map(([step, detail]) => (
            <div key={step as string} style={{ backgroundColor: '#132040', borderRadius: 10, padding: '16px 20px', marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{step}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ backgroundColor: '#0D2240', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔧 Warranty Guide by Project Type</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Select your project type to see what warranty to require, what questions to ask, and what red flags to watch for.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 28 }}>
            {projectOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                style={{
                  padding: '12px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === opt.value ? '#F5E642' : '#1E3A5F',
                  backgroundColor: selected === opt.value ? '#1a1a00' : 'transparent',
                  color: selected === opt.value ? '#F5E642' : '#94A3B8',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {data && (
            <div style={{ backgroundColor: '#081525', borderRadius: 12, padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ backgroundColor: '#132040', borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ color: '#64748B', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>WORKMANSHIP WARRANTY</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{data.workmanship}</div>
                </div>
                <div style={{ backgroundColor: '#132040', borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ color: '#64748B', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>MATERIAL WARRANTY</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{data.material}</div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 12 }}>Questions to ask before hiring:</div>
                {data.questions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
                    <span style={{ color: '#CBD5E1', fontSize: 14 }}>{q}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 12 }}>⚠️ Red flags to watch for:</div>
                {data.redFlags.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                    <span style={{ color: '#f87171' }}>✕</span>
                    <span style={{ color: '#CBD5E1', fontSize: 14 }}>{r}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 12 }}>📋 Require in writing at project completion:</div>
                {data.requireInWriting.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    <span style={{ color: '#CBD5E1', fontSize: 14 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

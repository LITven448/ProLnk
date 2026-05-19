import { useState } from 'react';

const projectTypes = [
  {
    type: 'Sewer Line Repair / Replacement',
    criteria: ['DFW clay soil causes root intrusion and pipe bellying — most common sewer issue', 'Require camera inspection before and after — not just diagnosis', 'Ask if they use pipe lining (trenchless) vs. open-cut — both have appropriate uses'],
    questions: ['Will you provide a video of my sewer line before and after?', 'Are you pulling a permit from the city?', 'Do you offer trenchless lining or only open-cut?'],
    goodAnswers: 'Always cameras before and after. Pulls permit automatically. Explains trenchless vs. open-cut trade-offs for your specific situation.',
  },
  {
    type: 'Water Heater Replacement',
    criteria: ['DFW market rate: $900–$1,800 installed for standard 40–50 gal tank', 'Require permit — inspectors verify pressure relief valve and seismic strapping', 'Ask about expansion tank requirement — DFW closed systems often require one'],
    questions: ['Do you pull a permit for water heater installations?', 'Will I need an expansion tank with my system?', 'What brand do you install and why?'],
    goodAnswers: 'Always pulls permit. Checks for closed system and recommends expansion tank if needed. Explains brand choice with reasoning.',
  },
  {
    type: 'Leak Detection & Repair',
    criteria: ['Under-slab leaks are common in DFW — ask if they have electronic detection equipment', 'Require written scope: location of leak, method of access, restoration included', 'Ask if they test the repair before closing access — pressure test required'],
    questions: ['Do you have electronic leak detection for slab leaks?', 'What does the restoration of the slab or wall look like after repair?', 'Will you pressure test the repair before patching?'],
    goodAnswers: 'Has electronic detection. Includes slab or drywall restoration in quote or is explicit about exclusion. Always pressure tests.',
  },
];

const vetItems = [
  { label: 'TSBPE License', detail: 'Texas State Board of Plumbing Examiners — verify at tsbpe.texas.gov before they arrive' },
  { label: 'Local DFW Address', detail: 'Plumbing requires follow-up warranty work — out-of-area crews disappear' },
  { label: 'Permit Pulled for Permitted Work', detail: 'Water heaters, sewer lines, gas lines all require permits in DFW cities' },
  { label: 'Insurance $500K+ Liability', detail: 'Plumbing mistakes cause catastrophic water damage — certificate required' },
  { label: 'Master Plumber on Staff', detail: 'Ask: "Is there a Master Plumber supervising this job?" — required by Texas law' },
  { label: 'Camera Inspection Capability', detail: 'For sewer work — no camera = no diagnosis. Non-negotiable.' },
  { label: 'Written Itemized Estimate', detail: 'Parts, labor, permit fees — separate line items. No "flat rate" surprises.' },
  { label: 'Warranty on Parts & Labor', detail: 'Industry standard: 1 year labor, manufacturer warranty on parts' },
];

export default function DFWPlumbingContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔧 Plumbing Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Texas plumbing law is strict — unlicensed work is illegal and voids your homeowner's insurance. DFW market rates vary 40–60%. Verify these 8 things before work begins.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>8 Things to Verify</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {vetItems.map((item, i) => (
            <div key={i} style={{ background: '#111f38', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ {item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Project-Specific Criteria</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {projectTypes.map((p, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
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

        <div style={{ marginTop: 32, background: '#111f38', borderRadius: 10, padding: 20, borderTop: '2px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW Plumbing Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Can't provide TSBPE license number on the spot. Won’t pull permits. No written estimate before work begins. Quotes price over the phone without seeing the problem. Demands payment in full before job is complete.
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#111f38', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 DFW Market Rates (2026)</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {[['Service call / diagnostic', '$75–$150'], ['Toilet replacement', '$350–$600'], ['Water heater (40 gal)', '$900–$1,400'], ['Sewer camera inspection', '$200–$400'], ['Slab leak repair', '$2,500–$6,000']].map(([label, rate]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#cbd5e1′ }}>
                <span>{label}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

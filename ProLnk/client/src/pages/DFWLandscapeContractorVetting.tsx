import { useState } from 'react';

const projectTypes = [
  {
    type: 'Irrigation System Install / Repair',
    criteria: ['TCEQ Licensed Irrigator is legally required for any irrigation work in Texas', 'DFW soils: clay zones need different head spacing than sandy areas in the same yard', 'Ask if they will design zones based on sun exposure and plant type — not just coverage'],
    questions: ['Are you a TCEQ Licensed Irrigator — what is your license number?', 'Will you pull a city permit for the irrigation system?', 'How do you design zones — by coverage area or by plant water needs?'],
    goodAnswers: 'Gives TCEQ license number immediately. Pulls permit. Designs zones by plant type and sun exposure — not just coverage circles.',
  },
  {
    type: 'Lawn Design & Planting',
    criteria: ['DFW native plants: Texas sage, Turks cap, live oak, Mexican feathergrass — ask if contractor knows these', 'Bermuda grass standard in DFW — St. Augustine in shadier areas — ask their recommendation', 'Soil amendment is critical in DFW clay — ask how they prep before planting'],
    questions: ['What grass type do you recommend for my sun/shade situation?', 'Do you amend the soil before planting or installing sod?', 'Which native or adapted plants do you typically use in DFW?'],
    goodAnswers: 'Recommends grass based on site assessment. Amends soil with compost. Names specific native plants appropriate for DFW climate.',
  },
  {
    type: 'Tree Service / Removal',
    criteria: ['Ask if they are ISA Certified Arborist — not required by Texas law but indicates competence', 'Verify liability insurance — falling trees cause serious property and personal injury', 'Get written scope: what is removed, what is hauled away, stump grinding included?'],
    questions: ['Do you have an ISA Certified Arborist on staff or are you one?', 'Does your quote include stump grinding and debris removal?', 'Can you show me the insurance certificate before work begins?'],
    goodAnswers: 'References ISA certification or explains qualifications. Quote includes stump grinding or explicitly excludes with separate price. Provides insurance certificate before arriving.',
  },
];

const vetItems = [
  { label: 'TCEQ Licensed Irrigator', detail: 'LEGALLY REQUIRED for any irrigation work in Texas — verify at tceq.texas.gov' },
  { label: 'General Liability Insurance', detail: 'Landscape equipment causes property damage — certificate of insurance required' },
  { label: 'Local DFW Address', detail: 'DFW plant knowledge is region-specific — avoid contractors without local experience' },
  { label: 'DFW Native Plant Knowledge', detail: 'Ask: "What plants do you recommend for our clay soil and heat?" — test their expertise' },
  { label: 'Soil Assessment Before Planting', detail: 'DFW has extreme clay soil — no amendment = plant failure within 2 years' },
  { label: 'Water-Wise Design Capability', detail: 'DFW water restrictions are real — ask if they design for Stage 1/2 compliance' },
  { label: 'Written Scope with Plant List', detail: 'Species, size, quantity, placement — no vague "assorted plants" language' },
  { label: 'Warranty on Plants & Irrigation', detail: 'Standard: 1 year on plants installed, 1 year on irrigation work' },
];

export default function DFWLandscapeContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌿 Landscape Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's clay soil, 110°F summers, and Stage 2 water restrictions make landscaping genuinely complex. The wrong contractor wastes thousands. Verify these 8 things first.</p>

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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW Landscape Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Does irrigation work without a TCEQ license. Can't name a single native DFW plant. Quotes without visiting the property. No soil amendment included in the plan. Vague plant list with no species names. No warranty on plants or installation.
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#111f38', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 DFW Market Rates (2026)</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {[['Irrigation system install (avg home)', '$3,500–$6,500'], ['Irrigation repair / head replacement', '$75–$250/zone'], ['Sod install (Bermuda, per sq ft)', '$1.50–$2.50'], ['Tree removal (30–50 ft tree)', '$800–$2,000'], ['Full landscape design + install', '$8,000–$35,000+']].map(([label, rate]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#cbd5e1' }}>
                <span>{label}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

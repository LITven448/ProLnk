import { useState } from 'react';

const projectTypes = [
  {
    type: 'Hail Damage Replacement',
    criteria: ['DFW gets 15–20 hail events per year — legitimate claims are common', 'Contractor must work with YOUR adjuster, not pressure you to use theirs', 'Get the insurance scope of work in writing before any contractor signs anything'],
    questions: ['Do you have experience supplementing insurance claims in DFW?', 'Will you install the exact materials listed in the insurance scope?', 'Are you a GAF or Owens Corning certified contractor?'],
    goodAnswers: 'Knows how to supplement. Installs what insurance specifies. Has manufacturer certification on file.',
  },
  {
    type: 'Full Roof Replacement',
    criteria: ['DFW-rated systems: Class 4 impact-resistant shingles reduce insurance premiums 20–30%', 'Require drip edge, ice/water shield in valleys, proper ventilation calc', 'Permit required by most DFW cities — contractors who skip it put you at risk'],
    questions: ['Do you install Class 4 impact-resistant shingles?', 'Will you pull a city permit?', 'What ventilation calculation do you use for my roof area?'],
    goodAnswers: 'Mentions Class 4 options without prompting. Always pulls permits. Can explain net free area ventilation.',
  },
  {
    type: 'Leak Repair / Partial',
    criteria: ['Insist on written diagnosis with photos of the source — not just the wet spot', 'Ask what they are repairing and if it voids any existing warranty', 'Partial repairs on aging roofs often fail — ask about the remaining roof life'],
    questions: ['Can you show me photos of the leak source?', 'Will this repair be covered under warranty?', 'What is the remaining lifespan of the rest of my roof?'],
    goodAnswers: 'Provides photos before and after. Explains warranty implications honestly. Gives realistic lifespan assessment.',
  },
];

const vetItems = [
  { label: 'GAF or Owens Corning Certification', detail: 'Manufacturer-certified contractors get better warranty terms — ask for certificate' },
  { label: 'Local DFW Address', detail: 'CRITICAL: Storm chasers flood DFW after hail — verify a real local office' },
  { label: 'General Liability $1M+ & Workers Comp', detail: 'Request certificate of insurance — roofing is high-risk, uninsured crews are your liability' },
  { label: 'City Permit Pulled', detail: 'Plano, Frisco, McKinney, Arlington all require permits — ask before work starts' },
  { label: 'No Large Cash Upfront', detail: 'Legitimate roofers require 10–30% deposit max — 50%+ upfront is a red flag' },
  { label: 'Written Material Specifications', detail: 'Brand, shingle model, color, weight — vague scopes allow material substitution' },
  { label: 'Manufacturer Warranty Registered', detail: 'Ask: "Will you register the warranty with the manufacturer in my name?"' },
  { label: 'References from DFW Neighborhoods', detail: 'Storm chasers have out-of-state references — ask for local neighbors' },
];

export default function DFWRoofingContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 Roofing Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>After every DFW hail storm, thousands of out-of-state contractors flood the area. Most are gone before your roof leaks again. Verify these 8 things before signing anything.</p>

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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW Roofing Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Knocks on door the day after a storm. Out-of-state plates. Asks you to sign an Assignment of Benefits (AOB). Demands 50%+ deposit. No local office. Won't provide insurance certificate. Offers to waive your deductible (insurance fraud).
          </div>
        </div>
      </div>
    </div>
  );
}

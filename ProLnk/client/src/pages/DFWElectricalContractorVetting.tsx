import { useState } from 'react';

const projectTypes = [
  {
    type: 'Panel Upgrade / Replacement',
    criteria: ['DFW older homes commonly have Federal Pacific or Zinsco panels — fire hazard', 'Panel work requires a TDLR Master Electrician — not just a Journeyman', 'City inspection required after panel work in all DFW municipalities'],
    questions: ['Are you a Master Electrician licensed with TDLR?', 'Will you pull a permit and schedule the city inspection?', 'Do you provide a load calculation before sizing the new panel?'],
    goodAnswers: 'Is or employs a Master Electrician. Always pulls permit. Does load calculation and explains amperage recommendation.',
  },
  {
    type: 'EV Charger Installation',
    criteria: ['Level 2 charger requires 240V dedicated circuit — check panel capacity first', 'DFW market rate: $400–$900 installed depending on panel distance', 'Permit required — inspector verifies breaker sizing and wire gauge'],
    questions: ['Will you assess my panel capacity before quoting?', 'What gauge wire and breaker size do you recommend for my vehicle?', 'Do you pull a permit for EV charger installations?'],
    goodAnswers: 'Checks panel before quoting. Explains wire gauge based on charger amperage (40A circuit for most Level 2). Pulls permit every time.',
  },
  {
    type: 'Outlet / Switch / Lighting Work',
    criteria: ['Journeyman Electrician license sufficient for this scope in Texas', 'GFCI outlets required within 6 ft of water — ask if they upgrade adjacent outlets', 'DFW market rate: $100–$250 per outlet or switch, $150–$400 for fixtures'],
    questions: ['What is your TDLR license number and type?', 'Do you test all outlets after installation with a circuit tester?', 'Are any of the outlets near water that need GFCI upgrade?'],
    goodAnswers: 'Provides TDLR number immediately. Tests every outlet with a tester. Proactively identifies GFCI needs.',
  },
];

const vetItems = [
  { label: 'TDLR Master Electrician License', detail: 'Required for panel work — verify license type at tdlr.texas.gov' },
  { label: 'TDLR Journeyman License', detail: 'Sufficient for outlets, switches, lighting — same verification at tdlr.texas.gov' },
  { label: 'City Permit for Required Work', detail: 'Panel, service upgrade, EV charger, rewiring all require DFW city permits' },
  { label: 'Local DFW Business Address', detail: 'Electrical work has long-tail warranty needs — verify they have a real local office' },
  { label: 'General Liability $1M+', detail: 'Electrical fires are catastrophic — no certificate of insurance = no work' },
  { label: 'Load Calculation for Panel Work', detail: 'Any electrician sizing a panel without a load calc is guessing — unacceptable' },
  { label: 'Written Scope & Itemized Quote', detail: 'Wire type, breaker brand, panel brand, labor hours — all itemized' },
  { label: 'Post-Work Testing', detail: 'All circuits should be tested under load before job is called complete' },
];

export default function DFWElectricalContractorVetting() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚡ Electrical Contractor Vetting — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Bad electrical work causes house fires. Texas law requires specific license levels for specific work. DFW prices vary 60%+ between contractors. Verify these 8 things before any work starts.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>8 Things to Verify</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {vetItems.map((item, i) => (
            <div key={i} style={{ background: '#111f38', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ {item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Project-Specific Requirements</h2>
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚩 DFW Electrical Red Flags</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Can't provide TDLR license number on request. Won’t pull permits. Quotes panel work without a load calculation. Uses aluminum wiring on branch circuits. No written scope before work begins. Requests full payment upfront.
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#111f38', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 DFW Market Rates (2026)</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {[['Service call / diagnostic', '$75–$125'], ['Outlet or switch install', '$100–$250'], ['Panel upgrade (100→200A)', '$1,800–$3,500'], ['EV charger install (Level 2)', '$400–$900'], ['Whole-home rewire', '$8,000–$20,000+']].map(([label, rate]) => (
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

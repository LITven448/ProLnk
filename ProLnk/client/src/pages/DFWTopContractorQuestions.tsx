import { useState } from 'react';

type Trade = keyof typeof tradeData;

const tradeData = {
  'HVAC': {
    license: 'TACL (Texas Air Conditioning Contractor License)',
    questions: [
      { q: 'What is your TACL license number?', good: 'Gives it immediately. Verify at tdlr.texas.gov. No number = walk away.' },
      { q: 'Are you licensed in Texas and insured for $1M+ liability?', good: 'Yes, and offers to send certificate. Never accept "we\’re bonded" as a substitute.' },
      { q: 'Will you pull a city permit for this work?', good: 'Yes for any major repair or installation. Unpermitted HVAC work kills home sales.' },
      { q: 'What brand of equipment do you install and why?', good: 'Has a clear answer — Carrier, Trane, Lennox, Rheem. Vague answers suggest inexperience.' },
      { q: 'Do you provide a written estimate before starting?', good: 'Always yes, itemized. Verbal estimates from HVAC pros are red flags in DFW.' },
      { q: 'What\’s your warranty on parts and labor?', good: '1 year labor minimum, manufacturer warranty on parts (5-10 years for major units).' },
      { q: 'Can you provide 3 recent references in my DFW area?', good: 'Yes, without hesitation. Call them — ask about summer performance specifically.' },
      { q: 'How quickly can you respond to an emergency call in August?', good: 'Same day or next morning. In DFW July-August, 2-3 days is unacceptable.' },
    ],
  },
  'Plumber': {
    license: 'Master Plumber or Journeyman Plumber (TSBPE)',
    questions: [
      { q: 'What is your TSBPE license number?', good: 'Gives it without hesitation. Verify at tsbpe.texas.gov. Required for any plumbing work.' },
      { q: 'Are you licensed and insured — both liability and workers comp?', good: 'Yes, sends certificate on request. Unlicensed plumbing = your liability in TX.' },
      { q: 'Will you pull the required permits?', good: 'Yes for any pipe replacement, water heater, or major repair. Always.' },
      { q: 'Do you do camera inspections for slab leak diagnosis?', good: 'Yes — in DFW, slab leaks are common and camera inspection is non-negotiable before repair.' },
      { q: 'What\’s your experience with DFW clay soil and foundation stress on pipes?', good: 'Should mention clay soil expansion, post-tension slabs, and experience with DFW-specific issues.' },
      { q: 'Do you offer a written scope and price before work begins?', good: 'Always. Never accept "we\’ll figure it out" — plumbing surprises in DFW are expensive.' },
      { q: 'What warranty do you provide on your work?', good: '1-2 years on labor is standard. If they say 30 days, probe further.' },
      { q: 'Can you provide references from similar jobs in my area?', good: 'Yes immediately. For slab jobs, ask specifically for slab leak or repipe references.' },
    ],
  },
  'Electrician': {
    license: 'Master Electrician or Journeyman (TDLR)',
    questions: [
      { q: 'What is your TDLR electrical license number?', good: 'Provides it without prompting. Verify at tdlr.texas.gov before any deposit.' },
      { q: 'Are you licensed and fully insured?', good: 'Yes — liability and workers comp. Unlicensed electrical work voids homeowner insurance.' },
      { q: 'Will you pull the required electrical permits?', good: 'Always yes. Unpermitted electrical work = failed home inspection, every time.' },
      { q: 'Have you worked with homes this age and panel type in DFW?', good: 'Should know Federal Pacific and Zinsco panels (fire risks common in DFW older homes).' },
      { q: 'Do you have experience with EV charger installation and solar tie-ins?', good: 'Important for DFW future-proofing. Good sign if they mention Tesla/ChargePoint compatibility.' },
      { q: 'What\’s your timeline and do you have a crew or subcontract?', good: 'Knows their schedule. Subcontracting is fine — just verify subs are also licensed.' },
      { q: 'Do you provide a written estimate itemizing materials and labor?', good: 'Yes, always. Avoid any electrician who quotes verbally only.' },
      { q: 'Can I get 3 references from recent DFW projects?', good: 'Provided without hesitation. Call and ask specifically about permit clearance and final inspection.' },
    ],
  },
  'Roofer': {
    license: 'No state license required in TX — ask these instead',
    questions: [
      { q: 'Are you insured — general liability AND workers comp?', good: 'Must say yes. Roofing is high-risk; uninsured roofers leave you liable for injuries.' },
      { q: 'Will you pull a city permit for the replacement?', good: 'DFW cities vary — many require permits. A good roofer knows and pulls them.' },
      { q: 'Do you have a physical DFW address and local references?', good: 'Storm chasers flood DFW after hail. Local address + 3 local references = real company.' },
      { q: 'What manufacturer warranty comes with the shingles?', good: '25-50 year on shingles. Ask for GAF, Owens Corning, or CertainTeed — and written warranty.' },
      { q: 'What\’s your workmanship warranty?', good: '5-10 years on labor is standard from reputable DFW roofers. Walk away from 1-year-only.' },
      { q: 'Do you inspect and replace flashing, not just shingles?', good: 'Yes — flashing failure is the #1 cause of DFW roof leaks after storm replacement.' },
      { q: 'Will you provide a post-job inspection report?', good: 'Yes — photos of completed work, detailed report. Non-negotiable for insurance documentation.' },
      { q: 'Can you provide your insurance adjuster communication on my claim?', good: 'If it\’s an insurance job — full transparency. Storm chasers often inflate claims illegally.' },
    ],
  },
  'Foundation': {
    license: 'No state license in TX — specialized, ask these',
    questions: [
      { q: 'How many DFW foundation repairs have you done in the past year?', good: 'Should be able to cite volume — DFW is the most active foundation repair market in the US.' },
      { q: 'Do you provide a written, transferable lifetime warranty?', good: 'Transferable warranty is standard from top DFW companies (Olshan, Perma-Pier, etc.).' },
      { q: 'What method do you use — pressed piers, drilled piers, or slab injection?', good: 'Should explain clearly. Pressed piers common in DFW clay; drilled piers for more severe cases.' },
      { q: 'Do you provide a pre-repair engineer\’s report?', good: 'Top companies use licensed structural engineers to document before and after. Non-negotiable.' },
      { q: 'Will this repair affect my drainage or plumbing?', good: 'Should proactively assess — foundation repair in DFW can stress plumbing on post-tension slabs.' },
      { q: 'Are you insured and do you pull permits?', good: 'Yes and yes — permits required in most DFW cities for foundation work.' },
      { q: 'Can you provide 5 references from my specific neighborhood or soil type?', good: 'DFW soil varies — Frisco clay differs from Allen. Local experience matters enormously.' },
      { q: 'What happens if the repair fails or settles further?', good: 'Clear answer about warranty claim process. Vague answers = red flag.' },
    ],
  },
};

export default function DFWTopContractorQuestions() {
  const [trade, setTrade] = useState<Trade | ''>('');
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const data = trade ? tradeData[trade] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>🔍</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Contractor Questions</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>8 essential questions per trade — with what a good answer sounds like</p>
        </div>

        <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Select the trade you're hiring</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {(Object.keys(tradeData) as Trade[]).map(t => (
            <button key={t} onClick={() => { setTrade(t); setRevealed({}); }} style={{
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: trade === t ? '#F5E642′ : '#111f3a', color: trade === t ? '#0A1628' : '#94a3b8',
            }}>{t}</button>
          ))}
        </div>

        {data && (
          <>
            <div style={{ background: '#111f3a', borderRadius: 8, padding: '10px 16px', marginBottom: 20, fontSize: 13, color: '#F5E642′ }}>
              📋 License to verify: <strong>{data.license}</strong>
            </div>
            {data.questions.map((item, i) => (
              <div key={i} style={{ background: '#111f3a', borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
                <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>
                  <span style={{ color: '#F5E642′ }}>{i + 1}.</span> {item.q}
                </p>
                <button onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
                  style={{ padding: '5px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, background: '#1e3a5f', color: '#94a3b8′ }}>
                  {revealed[i] ? '▲ Hide answer' : '▼ What a good answer sounds like'}
                </button>
                {revealed[i] && (
                  <div style={{ marginTop: 10, background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#22c55e', lineHeight: 1.6 }}>
                    ✅ {item.good}
                  </div>
                )}
              </div>
            ))}
            <p style={{ color: '#F5E642', fontSize: 13, marginTop: 20, textAlign: 'center' }}>
              ProLnk pre-screens every pro on these questions so you don't have to.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

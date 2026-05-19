import { useState } from 'react';

const questions = [
  { q: 'How old is your roof?', a: 'DFW asphalt shingles last 20–25 years under normal conditions, but DFW hail and UV intensity can shorten this to 15–18 years. Find install date in your home disclosure, permit records, or HOA paperwork. A roof over 15 years warrants annual inspection.' },
  { q: 'What shingle type and impact-resistance class do you have?', a: 'Class 4 impact-resistant shingles are the gold standard for DFW hail zones and typically earn a 20–30% insurance discount. Look for the UL 2218 Class 4 rating. Standard 3-tab shingles offer minimal hail protection.' },
  { q: 'When did you last have a professional roof inspection?', a: 'DFW roofers recommend post-hail inspections after any storm with 1″+ hailstones. Annual inspections cost $150–$300. Many DFW insurers require documented inspections for continued coverage on older roofs.' },
  { q: 'Have you had hail damage in the last 5 years?', a: 'DFW is one of the most hail-active regions in North America. Even minor hail (3/4″ to 1″) damages shingle granules and voids manufacturer warranties. If you haven\’t had an inspection since the last storm, schedule one now.' },
  { q: 'Is your attic properly ventilated?', a: 'Inadequate attic ventilation in DFW causes shingle blistering, premature aging, ice damming in rare freezes, and voids most warranties. You need 1 sq ft of ventilation per 150 sq ft of attic space, balanced between soffits and ridge.' },
  { q: 'What is your homeowner insurance deductible for wind/hail?', a: 'Most DFW insurers now use percentage deductibles (1–2% of home value) for wind/hail rather than flat deductibles. On a $400K home, that\’s $4K–$8K out of pocket. Know this before any storm season.' },
  { q: 'Do you know how to identify granule loss?', a: 'Asphalt shingle granules protect against UV and impact. Check your gutters — granules look like coarse sand. Heavy granule loss indicates aging or hail damage. A handful of granules per downspout cleaning per year is normal; cups of granules are not.' },
  { q: 'What is the pitch (slope) of your roof?', a: 'Roof pitch affects what materials can be used and how water drains. Low-slope roofs (under 4:12) require different materials and more maintenance. High-pitch roofs (over 6:12) shed water well but are dangerous to walk on without safety gear.' },
  { q: 'Do you have proper flashing around penetrations?', a: 'Flashing is metal that seals roof penetrations (chimneys, pipes, skylights, valleys). Failed flashing is the #1 cause of roof leaks in DFW. Signs of failure: rust stains, lifted metal edges, or visible gaps. Inspect after major storms.' },
  { q: 'What roofing company installed your current roof?', a: 'Know the installer for warranty claims. Most manufacturer warranties (25–50 year) are voided if not installed by a certified contractor. DFW has significant storm chaser activity — always verify contractor license with TDLR.' },
  { q: 'Do you have an underlayment warranty?', a: 'Modern roofs have a synthetic underlayment beneath shingles as a secondary moisture barrier. This layer has its own warranty (10–30 years) separate from shingles. Ask your installer for documentation.' },
  { q: 'What is the square footage of your roof?', a: 'Roof square footage (measured in "squares" = 100 sq ft) determines material costs for replacement estimates. A 2,500 sq ft home typically has a 28–35 square roof depending on pitch and overhangs. Know this to validate contractor bids.' },
  { q: 'Do you have skylights, and are they in good condition?', a: 'DFW skylights take direct hail impact and UV abuse. Plastic/acrylic domes crack; glass with films hold better. Check the curb flashing annually and look for yellowing (UV degradation) or crazing (stress cracking) on acrylic skylights.' },
  { q: 'Have you checked your gutters and downspouts recently?', a: 'Gutters failing in DFW cause foundation erosion — especially critical given our expansive clay soils. Downspouts should discharge 6–10 feet from the foundation. Check for separation at joints and ensure they\’re sloped toward downspouts.' },
  { q: 'Do you have a manufacturer\’s warranty documentation on file?', a: 'Most DFW homeowners lose their roofing warranty documents. Contact the manufacturer with your address — most can look up warranty status. GAF, Owens Corning, and CertainTeed maintain digital records. Missing documentation = no warranty claim.' },
];

export default function DFWRoofingQuestionsGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggle = (i: number) => setOpen(open === i ? null : i);
  const check = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const score = checked.filter(Boolean).length;
  const riskLevel = score >= 12 ? { label: '🏆 Well-Prepared', color: '#16a34a' } : score >= 8 ? { label: '⚠️ Moderate Risk', color: '#ca8a04′ } : { label: '🚨 High Risk', color: '#dc2626' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Roofing Knowledge Guide</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>15 roofing questions every DFW homeowner must know before the next storm</p>
          <div style={{ marginTop: 12, background: '#1a2a40', borderRadius: 8, padding: '10px 24px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{score}</span>
            <span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} — </span>
            <span style={{ color: riskLevel.color, fontWeight: 700 }}>{riskLevel.label}</span>
          </div>
        </div>
        {score < 8 && score > 0 && (
          <div style={{ background: '#2a1515', border: '1px solid #dc2626', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#fca5a5′ }}>
            ⚠️ DFW hail season runs April–June. Homeowners who can't answer 8+ of these questions are at higher financial risk after a storm event.
          </div>
        )}
        {questions.map((item, i) => (
          <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: checked[i] ? '1.5px solid #F5E642′ : '1.5px solid #1e3050' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', gap: 12 }} onClick={() => toggle(i)}>
              <span onClick={e => { e.stopPropagation(); check(i); }} style={{ fontSize: 20, cursor: 'pointer' }}>{checked[i] ? '✅' : '⬜'}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{i + 1}. {item.q}</span>
              <span style={{ color: '#F5E642', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && <div style={{ padding: '0 16px 16px 52px', color: '#aabbcc', fontSize: 14, lineHeight: 1.7 }}>{item.a}</div>}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 28, color: '#8899aa', fontSize: 13 }}>Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted home services marketplace</div>
      </div>
    </div>
  );
}

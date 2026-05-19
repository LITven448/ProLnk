import { useState } from 'react';

type Question = { q: string; options: string[]; correct: number; category: string; explanation: string; };

const questions: Question[] = [
  { q: 'What SEER rating is considered high-efficiency for a DFW HVAC system?', options: ['8–10 SEER', '14–16 SEER', '18+ SEER', 'SEER doesn\’t apply in Texas'], correct: 2, category: 'HVAC', explanation: '18+ SEER is high-efficiency. DFW\’s brutal summers make efficiency worth the premium — a 20 SEER system can cut cooling costs by 40% vs. a 14 SEER unit.' },
  { q: 'What is the first action when a pipe bursts in your DFW home?', options: ['Call a plumber', 'Shut off the main water valve', 'Open all faucets', 'Call your insurance company'], correct: 1, category: 'Plumbing', explanation: 'Shutting off the main water valve immediately stops the flow and prevents thousands in additional water damage. Know this location before any emergency.' },
  { q: 'Which panel brand should be replaced immediately due to known safety defects?', options: ['Square D', 'Siemens', 'Federal Pacific (Stab-Lok)', 'Eaton'], correct: 2, category: 'Electrical', explanation: 'Federal Pacific Stab-Lok panels have documented breaker failures and are linked to house fires. If you have one, replacement is urgent.' },
  { q: 'DFW clay soil (Blackland Prairie) causes foundation movement primarily because it:', options: ['Contains high iron content', 'Expands when wet and shrinks when dry', 'Is too sandy to support weight', 'Has poor drainage'], correct: 1, category: 'Foundation', explanation: 'Montmorillonite clay (the primary DFW soil type) can change volume by 50%+ based on moisture content. This causes seasonal foundation movement of 1–4 inches.' },
  { q: 'After a DFW hailstorm, you should inspect your roof for:', options: ['Color changes only', 'Granule loss, dents on vents, and cracked shingles', 'Moss growth', 'Only interior ceiling stains'], correct: 1, category: 'Roofing', explanation: 'Granule loss exposes asphalt to UV degradation and voids warranties. Dents on soft metal (vents, flashing, gutters) indicate hail size and impact force on shingles.' },
  { q: 'A GFCI outlet is required by code in which DFW home location?', options: ['Living room only', 'Bedrooms only', 'Kitchens, bathrooms, garages, and outdoors', 'Only in homes built after 2010'], correct: 2, category: 'Electrical', explanation: 'GFCI protection is required in any area where water and electricity might interact. These outlets have saved thousands of lives — test yours monthly.' },
  { q: 'The recommended DFW soil moisture practice around your foundation is:', options: ['Water heavily once a month', 'Maintain consistent moisture with soaker hoses during dry spells', 'Keep soil dry at all times', 'Only water during summer'], correct: 1, category: 'Foundation', explanation: 'Consistent moisture prevents the dramatic soil shrinkage that causes foundation settlement. A soaker hose 12–18 inches from the foundation running 30 min/day during droughts is the standard recommendation.' },
  { q: 'What is a "double-tap" in an electrical panel, and why is it a problem?', options: ['Two panels in one home', 'Two wires on a breaker not rated for it — causes overheating', 'A backup breaker system', 'Running two circuits to the same outlet'], correct: 1, category: 'Electrical', explanation: 'Double-tapping is a common NEC code violation. The connection is loose, overheats, and can cause arcing or fire inside the panel. A licensed electrician can fix this cheaply before it becomes catastrophic.' },
  { q: 'DFW homeowners should water their foundation soaker hoses during which conditions?', options: ['Only when raining', 'During extended dry periods (2+ weeks without significant rain)', 'Year-round, every day', 'Only in summer months'], correct: 1, category: 'Foundation', explanation: 'The goal is consistent soil moisture, not overwatering. During DFW\’s dry summers and occasional winter droughts, 2+ weeks without rain triggers the need for supplemental irrigation.' },
  { q: 'What does Class 4 impact resistance mean for DFW roofing?', options: ['A fire rating', 'The highest hail resistance rating under UL 2218 — resists 2" steel ball drops', 'The number of shingle layers', 'A wind rating for tornadoes'], correct: 1, category: 'Roofing', explanation: 'UL 2218 Class 4 is the highest impact rating and requires a shingle to survive being struck twice by a 2-inch steel ball dropped from 20 feet. In DFW hail country, this earns insurance discounts of 20–30%.' },
  { q: 'What is the normal water pressure range for a DFW home?', options: ['20–40 PSI', '40–80 PSI', '90–120 PSI', '100–150 PSI'], correct: 1, category: 'Plumbing', explanation: 'DFW municipal pressure often runs high (80–100 PSI), stressing pipes and appliances. Above 80 PSI, a pressure regulator is recommended to protect your plumbing system.' },
  { q: 'What is a post-tension slab, and why must you never drill into it without cable location?', options: ['A slab with wooden posts underneath', 'A concrete slab with high-tension steel cables — cutting one is catastrophic', 'A decorative concrete finish', 'A slab poured in sections'], correct: 1, category: 'Foundation', explanation: 'Post-tension cables are under 30,000–50,000 lbs of force. Accidentally cutting one during plumbing work or core sampling releases this force explosively and cannot be repaired — only a patch-and-hope scenario follows.' },
  { q: 'In DFW, why is a whole-home surge protector especially important?', options: ['DFW has poor utility infrastructure', 'DFW averages 60+ lightning days per year — one of the highest in the US', 'DFW uses different voltage than other states', 'Lightning strikes cause more fires in Texas'], correct: 1, category: 'Electrical', explanation: 'The DFW metroplex sits in one of the most lightning-active corridors in North America. A single strike on nearby power lines can destroy $10,000+ in appliances and electronics. A whole-home protector ($150–$400 installed) is essential.' },
  { q: 'What is a hydrostatic pressure test used for in a DFW slab home?', options: ['Testing water pressure at the meter', 'Testing underground plumbing for leaks without opening the slab', 'Testing foundation integrity under pressure', 'Checking water heater pressure relief valves'], correct: 1, category: 'Plumbing', explanation: 'Slab leaks are extremely common in DFW homes. A hydrostatic test pressurizes the plumbing system and monitors for pressure loss, detecting leaks under the slab before they cause foundation damage or mold.' },
  { q: 'Stair-step cracks in DFW brick veneer most commonly indicate:', options: ['Normal settling that requires no action', 'Poor bricklaying technique', 'Foundation movement — warrants professional evaluation', 'Cosmetic mortar shrinkage only'], correct: 2, category: 'Foundation', explanation: 'Stair-step cracks follow mortar joints and indicate differential foundation movement. Hairline stair-step cracks may be cosmetic, but cracks wider than 1/4" or with vertical offset are structural warning signs.' },
  { q: 'When should you check your condensate drain line in DFW?', options: ['Once a year in December', 'Monthly during summer cooling season', 'Only when the AC stops working', 'Every 5 years during maintenance'], correct: 1, category: 'HVAC', explanation: 'DFW summers run AC systems 8+ months per year, and algae grows rapidly in the humid condensate drain. A monthly bleach flush (1/4 cup diluted) during cooling season prevents water damage and system shutdowns.' },
  { q: 'Your DFW roof has lost heavy granules (cups of granules in gutters after rain). You should:', options: ['Wait until it starts leaking', 'Monitor it for another year', 'Schedule an inspection — heavy granule loss indicates damage or end of life', 'Repaint the shingles'], correct: 2, category: 'Roofing', explanation: 'Granules protect asphalt from UV degradation. Heavy loss (more than light dusting per gutter cleaning) indicates hail impact, aging, or manufacturing defect. Your roof may have 2–5 years left and an insurance claim may be valid.' },
  { q: 'What plumbing material in older DFW homes (pre-1990) is a red flag for water quality and flow?', options: ['Copper', 'PEX', 'Galvanized steel', 'CPVC'], correct: 2, category: 'Plumbing', explanation: 'Galvanized steel pipes corrode from the inside out over decades. They restrict water flow (often to a trickle), discolor water brown or orange, and eventually fail. Replacement with PEX or copper is the solution.' },
  { q: 'The R-22 refrigerant used in older DFW HVAC systems is:', options: ['Still widely available and cheap', 'Banned for production since 2020 — expensive to recharge', 'Being phased out by 2030', 'More efficient than R-410A'], correct: 1, category: 'HVAC', explanation: 'R-22 (Freon) production ended in the US in 2020. Remaining supplies are recycled and extremely expensive ($100–$175/lb vs. $10–$25 for R-410A). An R-22 system needing refrigerant is often better replaced than recharged.' },
  { q: 'A DFW homeowner\’s wind/hail insurance deductible is stated as 2% of dwelling coverage on a $500,000 home. Their out-of-pocket for a roof claim is:', options: ['$500', '$2,000', '$5,000', '$10,000'], correct: 3, category: 'Roofing', explanation: '2% of $500,000 = $10,000. Most DFW insurers switched from flat deductibles ($1,000–$2,500) to percentage deductibles after 2011\’s hail year. This change dramatically shifts roof repair costs to homeowners — know your deductible before storm season.' },
];

const CATEGORIES = ['HVAC', 'Plumbing', 'Electrical', 'Foundation', 'Roofing'];

export default function DFWHomeownerKnowledgeQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const answer = (qi: number, ai: number) => {
    if (submitted) return;
    setAnswers(prev => { const n = [...n]; n[qi] = ai; return n; });
    setAnswers(prev => { const n = [...prev]; n[qi] = ai; return n; });
  };

  const allAnswered = answers.every(a => a !== null);
  const totalScore = submitted ? answers.filter((a, i) => a === questions[i].correct).length : 0;
  const pct = Math.round((totalScore / questions.length) * 100);

  const catScores = CATEGORIES.map(cat => {
    const catQs = questions.filter(q => q.category === cat);
    const catCorrect = submitted ? catQs.filter((q, qi) => answers[questions.indexOf(q)] === q.correct).length : 0;
    return { cat, correct: catCorrect, total: catQs.length, pct: Math.round((catCorrect / catQs.length) * 100) };
  });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Homeowner Knowledge Quiz</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>20 questions across HVAC, Plumbing, Electrical, Foundation & Roofing. See where you stand.</p>
          {!submitted && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <span key={cat} style={{ background: '#1a2a40', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#aabbcc' }}>{cat}</span>
              ))}
            </div>
          )}
        </div>

        {submitted ? (
          <div>
            <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: pct >= 80 ? '#16a34a' : pct >= 60 ? '#F5E642' : '#dc2626' }}>{pct}%</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{totalScore} / {questions.length} Correct</div>
              <div style={{ color: '#8899aa', marginTop: 6 }}>{pct >= 80 ? '🏆 Outstanding — you\’re ahead of 95% of DFW homeowners' : pct >= 60 ? '👍 Good foundation — a few gaps to address' : '📚 Time to level up your home knowledge'}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
              {catScores.map(cs => (
                <div key={cs.cat} style={{ background: '#111f35', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{cs.cat}</div>
                  <div style={{ background: '#0A1628', borderRadius: 6, height: 8, marginBottom: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${cs.pct}%`, height: '100%', background: cs.pct >= 80 ? '#16a34a' : cs.pct >= 60 ? '#F5E642' : '#dc2626', transition: 'width 0.6s' }} />
                  </div>
                  <div style={{ fontSize: 13, color: '#8899aa' }}>{cs.correct}/{cs.total} — {cs.pct}% {cs.pct < 60 ? '⚠️' : ''}</div>
                  {cs.pct < 60 && <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 4 }}>Review the {cs.cat} guide →</div>}
                </div>
              ))}
            </div>
            {questions.map((q, i) => (
              <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, padding: 16, borderLeft: `3px solid ${answers[i] === q.correct ? '#16a34a' : '#dc2626'}` }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{i + 1}. {q.q}</div>
                <div style={{ fontSize: 14, color: answers[i] === q.correct ? '#86efac' : '#fca5a5', marginBottom: 6 }}>{answers[i] === q.correct ? '✅ Correct' : `✗ You answered: "${q.options[answers[i]!]}" — Correct: "${q.options[q.correct]}"`}</div>
                <div style={{ fontSize: 13, color: '#8899aa', lineHeight: 1.6 }}>{q.explanation}</div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button onClick={() => { setAnswers(Array(questions.length).fill(null)); setSubmitted(false); setCurrent(0); }} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>🔄 Retake Quiz</button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ color: '#8899aa', fontSize: 14 }}>Question {current + 1} of {questions.length}</span>
              <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>{answers.filter(a => a !== null).length} answered</span>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 6, height: 6, marginBottom: 24, overflow: 'hidden' }}>
              <div style={{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: '#F5E642', transition: 'width 0.3s' }} />
            </div>
            {questions.map((q, i) => i === current && (
              <div key={i} style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{q.category}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 20, lineHeight: 1.5 }}>{q.q}</div>
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => answer(i, oi)} style={{ display: 'block', width: '100%', textAlign: 'left', background: answers[i] === oi ? '#1a3a6a' : '#0f1e33', border: `2px solid ${answers[i] === oi ? '#F5E642' : '#1e3050'}`, borderRadius: 8, padding: '12px 16px', color: '#fff', cursor: 'pointer', marginBottom: 10, fontSize: 15, transition: 'all 0.15s' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, marginRight: 10 }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                  </button>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} style={{ background: '#1a2a40', color: current === 0 ? '#444' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: current === 0 ? 'not-allowed' : 'pointer', fontWeight: 600 }}>← Back</button>
              {current < questions.length - 1 ? (
                <button onClick={() => setCurrent(current + 1)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Next →</button>
              ) : (
                <button onClick={() => allAnswered && setSubmitted(true)} disabled={!allAnswered} style={{ background: allAnswered ? '#16a34a' : '#1a2a40', color: allAnswered ? '#fff' : '#555', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: allAnswered ? 'pointer' : 'not-allowed' }}>Submit Quiz ✓</button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 20, justifyContent: 'center' }}>
              {questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: 28, height: 28, borderRadius: 4, border: 'none', background: i === current ? '#F5E642' : answers[i] !== null ? '#1a4a2a' : '#1a2a40', color: i === current ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>{i + 1}</button>
              ))}
            </div>
            {!allAnswered && <p style={{ textAlign: 'center', color: '#8899aa', fontSize: 13, marginTop: 12 }}>Answer all {questions.length} questions to submit</p>}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 32, color: '#8899aa', fontSize: 13 }}>Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted home services marketplace</div>
      </div>
    </div>
  );
}

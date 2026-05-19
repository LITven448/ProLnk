import { useState } from 'react';

type Question = { q: string; options: string[]; answer: number; explanation: string; category: string };

const questions: Question[] = [
  { q: 'What is the minimum SEER2 rating required for new AC installations in Texas as of 2023?', options: ['SEER2 13.0', 'SEER2 14.3', 'SEER2 15.0', 'SEER2 16.0'], answer: 1, explanation: 'Texas requires SEER2 14.3 minimum for all new residential AC units since January 2023, replacing the old SEER 14 standard.', category: 'Maintenance' },
  { q: 'Which foundation type is most common in DFW homes built after 1980?', options: ['Pier and beam', 'Crawl space', 'Post-tension slab', 'Basement with slab'], answer: 2, explanation: 'Post-tension slabs dominate DFW construction post-1980 due to expansive clay soils. Never cut or drill without engineer approval.', category: 'Systems' },
  { q: 'What is the standard earnest money percentage in a competitive DFW offer?', options: ['0.5% of purchase price', '1% of purchase price', '5% of purchase price', '10% of purchase price'], answer: 1, explanation: 'DFW standard is 1% earnest money. In hot markets (Prosper, Frisco), competitive buyers often offer 2–3%.', category: 'Buying' },
  { q: 'Which MLS system do DFW real estate agents use?', options: ['CRMLS', 'NTREIS', 'HAR', 'SABOR'], answer: 1, explanation: 'North Texas Real Estate Information Systems (NTREIS) is the DFW MLS. Agents access it to list and search properties.', category: 'Buying' },
  { q: 'What does a MERV 13 air filter protect against in DFW specifically?', options: ['Only dust and pet dander', 'Cedar, ragweed, mold spores, and fine particles', 'Only HVAC system damage', 'Carbon monoxide'], answer: 1, explanation: 'DFW has intense cedar fever in winter and ragweed in fall. MERV 13 captures these plus mold spores and fine particles.', category: 'Maintenance' },
  { q: 'What is Texas\’s maximum LTV for a Home Equity Loan (HEL)?', options: ['70%', '80%', '90%', '95%'], answer: 1, explanation: 'Texas constitutional law caps home equity lending at 80% LTV combined — among the strictest in the nation.', category: 'Financial' },
  { q: 'Which state agency licenses real estate agents and inspectors in Texas?', options: ['TDHCA', 'TSAHC', 'TREC', 'TDLR'], answer: 2, explanation: 'TREC (Texas Real Estate Commission) licenses real estate agents, brokers, and inspectors across Texas.', category: 'Buying' },
  { q: 'What does a MUD district add to a DFW homeowner\’s costs?', options: ['Nothing — it\’s federal aid', 'Additional property taxes for water/sewer/drainage infrastructure', 'HOA fees only', 'City income tax'], answer: 1, explanation: 'Municipal Utility Districts (MUDs) fund infrastructure in outer DFW suburbs. MUD taxes can add 0.5–1.5% to effective property tax rates.', category: 'Financial' },
  { q: 'How often should DFW homeowners inspect their foundation for movement?', options: ['Every 10 years', 'Only when buying or selling', 'Seasonally — especially after long droughts or heavy rains', 'Foundation never needs inspection'], answer: 2, explanation: 'DFW\’s expansive clay soil swells and shrinks dramatically with moisture. Inspect doors/windows seasonally; get engineer if cracking appears.', category: 'Maintenance' },
  { q: 'What is tuckpointing and why is it common in DFW?', options: ['Applying stucco over brick', 'Replacing deteriorated mortar in brick joints', 'Waterproofing a foundation', 'Installing drip edge on a roof'], answer: 1, explanation: 'DFW clay soil movement constantly stresses mortar joints. Brick homes 15+ years often need tuckpointing to prevent water intrusion.', category: 'Maintenance' },
  { q: 'Which plumbing test should you demand before buying any DFW slab home?', options: ['Air pressure test', 'Hydrostatic test for underground leaks', 'UV dye test', 'Video inspection only'], answer: 1, explanation: 'Hydrostatic testing detects underground slab leaks. Cast iron pipes common in 1970s–1990s DFW homes frequently fail.', category: 'Buying' },
  { q: 'What R-value does the Texas energy code require for DFW attic insulation?', options: ['R-19', 'R-30', 'R-38', 'R-49'], answer: 2, explanation: 'Texas requires R-38 minimum attic insulation. Many older DFW homes have only R-19 — a major energy efficiency gap.', category: 'Systems' },
  { q: 'What is a deed restriction and who enforces it in DFW?', options: ['A city ordinance enforced by code compliance', 'A recorded legal limit on property use enforced by HOA or neighbors', 'A mortgage condition set by lenders', 'A TREC regulation'], answer: 1, explanation: 'Deed restrictions are recorded in the deed and run with the land. In DFW older neighborhoods (Highland Park), neighbors can sue to enforce them.', category: 'Owning' },
  { q: 'What does AFCI protection prevent that standard breakers cannot?', options: ['Overcurrent from appliances', 'Arc fault fires from damaged or loose wiring', 'Power surges from lightning', 'Ground faults in wet locations'], answer: 1, explanation: 'Arc faults from damaged wiring cause thousands of house fires yearly. AFCI breakers detect these arcs. Required in DFW bedrooms since NEC 2023.', category: 'Systems' },
  { q: 'What is the typical property tax rate range for DFW homeowners?', options: ['0.5–1.0% of assessed value', '1.5–2.0% of assessed value', '2.1–2.7% of assessed value', '3.5–4.0% of assessed value'], answer: 2, explanation: 'DFW property taxes typically run 2.1–2.7% depending on city and school district. This significantly impacts monthly PITI payments.', category: 'Financial' },
  { q: 'What is an easement and how does it affect DFW property use?', options: ['A mortgage penalty clause', 'A right others have to use a portion of your property for a specific purpose', 'A zoning variance', 'A title insurance exclusion'], answer: 1, explanation: 'Utility easements are common in DFW along Oncor power corridors and creek buffers. You own the land but can\’t block the easement use.', category: 'Owning' },
  { q: 'Which Texas program provides down payment assistance to first-time DFW buyers?', options: ['TREC Assistance Fund', 'TSAHC (Texas State Affordable Housing Corporation)', 'NTREIS Grant Program', 'TSBPE Home Fund'], answer: 1, explanation: 'TSAHC offers down payment assistance up to 5% for eligible DFW first-time buyers through participating lenders.', category: 'Buying' },
  { q: 'What does post-tension slab mean for DFW homeowners doing renovations?', options: ['Renovations are unrestricted', 'Never cut or drill the slab without an engineer verifying cable locations', 'The slab is stronger and can support any addition', 'Only licensed plumbers can work near it'], answer: 1, explanation: 'Post-tension cables are under extreme tension. Cutting one causes violent failure. Always get cable locations from a licensed engineer before any slab penetration.', category: 'Systems' },
  { q: 'How does DFW\’s clay soil affect homeowners differently than other Texas cities?', options: ['It has no unique effect', 'It expands significantly when wet and shrinks when dry, stressing foundations constantly', 'It provides better drainage than sandy soil', 'It prevents basement construction only'], answer: 1, explanation: 'DFW\’s expansive clay is one of the worst soils for foundations in the US. Watering foundation perimeter during droughts is essential to minimize movement.', category: 'Maintenance' },
  { q: 'What is a change order and when is one required in DFW contractor work?', options: ['A lien release document', 'A written amendment to a contract modifying scope, cost, or schedule', 'A permit modification filed with the city', 'A warranty extension request'], answer: 1, explanation: 'Any scope change in DFW contractor work should be documented in writing. Verbal agreements are legally unenforceable in Texas construction disputes.', category: 'Owning' },
  { q: 'What is the typical closing timeline for a DFW real estate transaction?', options: ['3–5 days after offer acceptance', '7–10 days', '21–30 days', '60–90 days'], answer: 2, explanation: 'DFW closings typically take 21–30 days for financed offers, allowing time for title work, appraisal, and lender underwriting.', category: 'Buying' },
  { q: 'What is the purpose of a hydrostatic test during a DFW home inspection?', options: ['To test water pressure at fixtures', 'To detect leaks in underground plumbing beneath the slab', 'To measure water hardness', 'To test the water heater pressure relief valve'], answer: 1, explanation: 'Hydrostatic testing plugs drains and fills them with water to detect underground leaks. Critical on any pre-2000 DFW home with cast iron pipes.', category: 'Buying' },
  { q: 'What does drip edge on a DFW roof prevent?', options: ['Ice dams', 'Water intrusion under shingles and fascia rot', 'Wind uplift of shingles', 'UV damage to shingles'], answer: 1, explanation: 'Drip edge directs water off the roof edge and away from fascia. Missing drip edge causes fascia rot — extremely common after DFW hail repairs.', category: 'Systems' },
  { q: 'Which professional should inspect a DFW home\’s electrical panel before purchase?', options: ['HVAC technician', 'Licensed electrician or TREC-licensed home inspector', 'City code inspector', 'Insurance adjuster'], answer: 1, explanation: 'A TREC inspector must assess panel safety. Older DFW panels (Federal Pacific, Zinsco) are fire hazards and should be flagged for replacement.', category: 'Buying' },
  { q: 'What is an HOA\’s CC&R document and why does it matter in DFW?', options: ['Certificate of Completion and Renovation', 'Covenants, Conditions, and Restrictions — legal rules governing property use', 'Commercial Code and Regulation', 'City Compliance and Review document'], answer: 1, explanation: 'CC&Rs govern what you can do with your DFW home — exterior colors, fences, landscaping, parking. Violating them can result in fines or legal action.', category: 'Owning' },
  { q: 'What is efflorescence on a DFW foundation or brick wall?', options: ['Black mold growth', 'White mineral deposits indicating water movement through masonry', 'Paint peeling from UV exposure', 'Stucco delamination'], answer: 1, explanation: 'Efflorescence is a red flag for water intrusion. On DFW foundations, it indicates grading or drainage issues that should be addressed immediately.', category: 'Maintenance' },
  { q: 'What does a lien waiver protect DFW homeowners from?', options: ['HOA fines', 'Mechanics liens filed by unpaid subcontractors or suppliers', 'Foundation warranty voidance', 'Property tax liens'], answer: 1, explanation: 'Without lien waivers, a sub-contractor unpaid by your general contractor can file a lien on your DFW home — even if you paid the GC in full.', category: 'Owning' },
  { q: 'What\’s the typical DFW home inspection cost for a 2,000 sq ft home in 2026?', options: ['$75–150', '$200–350', '$350–550', '$600–900'], answer: 2, explanation: 'A thorough TREC-licensed inspection runs $350–550 for a typical DFW home. Adding WDI (termite), pool, and sewer inspection adds $150–300.', category: 'Buying' },
  { q: 'What is a punch list in DFW new construction?', options: ['The HOA\’s list of prohibited items', 'A final list of deficient items the builder must fix before closing', 'A permit checklist required by the city', 'A home inspector\’s full report'], answer: 1, explanation: 'Hire an independent inspector for your DFW new construction punch list — builders like DR Horton and Toll Brothers miss items that cost thousands to fix post-closing.', category: 'Buying' },
  { q: 'How does Texas homestead exemption benefit DFW homeowners?', options: ['Exempts the home from all property taxes', 'Reduces the taxable value of a primary residence by $100,000 for school taxes', 'Provides a tax credit for energy improvements', 'Eliminates MUD taxes'], answer: 1, explanation: 'Texas\’s homestead exemption reduces school district taxes by $100,000 of appraised value. On a $400K DFW home this saves ~$1,200–1,800 annually.', category: 'Financial' },
];

const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];

type Phase = 'setup' | 'quiz' | 'results';

export default function DFWHomeQuizMaster() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = () => {
    const qs = selectedCategory === 'All' ? questions : questions.filter(q => q.category === selectedCategory);
    setQuizQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentIndex(0);
    setSelected(null);
    setShowExplanation(false);
    setPhase('quiz');
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setPhase('results');
    }
  };

  const score = answers.filter((a, i) => a === quizQuestions[i]?.answer).length;
  const catScores: Record<string, { correct: number; total: number }> = {};
  quizQuestions.forEach((q, i) => {
    if (!catScores[q.category]) catScores[q.category] = { correct: 0, total: 0 };
    catScores[q.category].total++;
    if (answers[i] === q.answer) catScores[q.category].correct++;
  });

  const q = quizQuestions[currentIndex];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Homeowner Quiz</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>30 questions on DFW-specific buying, owning, and maintaining your home</p>
        </div>

        {phase === 'setup' && (
          <div style={{ background: '#0D2137', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#CBD5E1', marginBottom: 16 }}>Choose a category (or take the full quiz):</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
              {categories.map(c => (
                <button key={c} onClick={() => setSelectedCategory(c)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: selectedCategory === c ? '#F5E642′ : '#1E3A5F', color: selectedCategory === c ? '#0A1628' : '#fff' }}>{c}</button>
              ))}
            </div>
            <div style={{ color: '#64748B', fontSize: 14, marginBottom: 20 }}>
              {selectedCategory === 'All' ? questions.length : questions.filter(q => q.category === selectedCategory).length} questions selected
            </div>
            <button onClick={startQuiz} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start Quiz →</button>
          </div>
        )}

        {phase === 'quiz' && q && (
          <div style={{ background: '#0D2137', borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{q.category}</span>
              <span style={{ color: '#64748B', fontSize: 13 }}>{currentIndex + 1} / {quizQuestions.length}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24, lineHeight: 1.5 }}>{q.q}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {q.options.map((opt, i) => {
                let bg = '#1E3A5F';
                let border = '#1E3A5F';
                if (selected !== null) {
                  if (i === q.answer) { bg = '#064E3B'; border = '#10B981'; }
                  else if (i === selected && selected !== q.answer) { bg = '#4C0519'; border = '#EF4444'; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, cursor: selected !== null ? 'default' : 'pointer', textAlign: 'left' }}>
                    {['A', 'B', 'C', 'D'][i]}. {opt}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Explanation</div>
                <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{q.explanation}</div>
              </div>
            )}
            {selected !== null && (
              <button onClick={next} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                {currentIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
              </button>
            )}
          </div>
        )}

        {phase === 'results' && (
          <div style={{ background: '#0D2137', borderRadius: 16, padding: 28 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{score >= quizQuestions.length * 0.8 ? '🏆' : score >= quizQuestions.length * 0.6 ? '👍' : '📚'}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#F5E642′ }}>{score} / {quizQuestions.length}</div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                {score >= quizQuestions.length * 0.8 ? 'DFW Homeowner Expert!' : score >= quizQuestions.length * 0.6 ? 'Solid Knowledge — Keep Learning' : 'Good Start — Review Weak Areas'}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {Object.entries(catScores).map(([cat, { correct, total }]) => (
                <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                  <span style={{ color: '#CBD5E1', fontSize: 15 }}>{cat}</span>
                  <span style={{ color: correct / total >= 0.75 ? '#10B981′ : '#F59E0B', fontWeight: 700 }}>{correct}/{total}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setPhase('setup')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

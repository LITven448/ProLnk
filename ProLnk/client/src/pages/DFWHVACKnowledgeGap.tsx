import { useState } from 'react';

const questions = [
  {
    id: 'q1',
    question: 'What SEER2 rating qualifies for the 2026 federal tax credit in DFW?',
    options: ['13 SEER2', '15 SEER2', '14 SEER2', '16 SEER2'],
    correct: 1,
    explanation: '15 SEER2 (or 8.5 HSPF2 for heat pumps) is the minimum for the IRA 25C credit. DFW\’s climate zone requires 15 SEER2 minimum — higher than cooler regions.',
    resource: 'HVAC Tax Credit Guide',
  },
  {
    id: 'q2',
    question: 'What is the most common DFW HVAC setup — and why is it the least efficient?',
    options: ['Garage units', 'Attic air handlers', 'Closet units', 'Ground-mount condensers'],
    correct: 1,
    explanation: 'Attic air handlers are the most common DFW setup. They sit in 150°F+ unconditioned space all summer, dramatically reducing efficiency and shortening equipment life.',
    resource: 'HVAC Location Guide',
  },
  {
    id: 'q3',
    question: 'When is the WORST time to replace an HVAC unit in DFW?',
    options: ['Spring (Mar–May)', 'Fall (Sep–Nov)', 'Summer (Jun–Aug)', 'Winter (Dec–Feb)'],
    correct: 2,
    explanation: 'Summer in DFW means 2–4 week lead times, 15–30% labor premiums, and limited equipment availability. Every contractor is booked through August.',
    resource: 'Upgrade Timing Guide',
  },
  {
    id: 'q4',
    question: 'R-22 refrigerant was phased out. What does this mean for DFW homeowners with old systems?',
    options: ['Nothing — it\’s still available', 'R-22 now costs $100+/lb, making leaks = replacement', 'EPA provides free replacement', 'Only applies in other states'],
    correct: 1,
    explanation: 'R-22 production and import was banned in 2020. Existing stockpiles command $100+/lb. A refrigerant leak in an R-22 system usually means it\’s more cost-effective to replace the entire system.',
    resource: 'HVAC Knowledge Base',
  },
  {
    id: 'q5',
    question: 'Which DFW utility offers rebates up to $1,800 for qualifying HVAC upgrades?',
    options: ['TXU Energy', 'Oncor Electric Delivery', 'Tri-County Electric', 'CoServ'],
    correct: 1,
    explanation: 'Oncor Electric Delivery (the wires company, not your retail provider) offers rebates up to $1,800 for qualifying heat pumps. These rebates are stackable with the federal 25C credit.',
    resource: 'DFW HVAC Rebate Guide',
  },
  {
    id: 'q6',
    question: 'If you\’re buying a home, where should you find the true age of the HVAC unit?',
    options: ['The seller\’s disclosure', 'The home inspection report', 'The model/serial number on the unit', 'The county records'],
    correct: 2,
    explanation: 'The model and serial number on the unit encodes the manufacture date. Sellers routinely misremember, and home inspectors just confirm it turns on. The serial number decoder is the only reliable source.',
    resource: 'Real Estate HVAC Tips',
  },
  {
    id: 'q7',
    question: 'What does a MUD district (Municipal Utility District) mean for HVAC in new DFW developments?',
    options: ['Cheaper utility rates', 'Additional property taxes that fund infrastructure — affects total cost of ownership', 'Requires special HVAC permits', 'No impact on HVAC decisions'],
    correct: 1,
    explanation: 'MUD districts add $800–1,500/yr to property taxes in many new DFW developments (Frisco, Prosper, etc.). While not directly an HVAC issue, it affects total cost of ownership and upgrade budget decisions.',
    resource: 'New Neighborhood HVAC Guide',
  },
  {
    id: 'q8',
    question: 'Can a landlord claim the IRA 25C tax credit for a rental property HVAC replacement?',
    options: ['Yes, up to $2,000', 'No — 25C only applies to primary/secondary residences', 'Yes, but only for heat pumps', 'Yes, if the property is in DFW'],
    correct: 1,
    explanation: 'The 25C credit is limited to the taxpayer\’s primary or secondary residence. Rental property HVAC replacements must use Section 179 expensing or standard depreciation instead.',
    resource: 'HVAC Tax Planning Guide',
  },
  {
    id: 'q9',
    question: 'What is Manual J, and when is it required in DFW?',
    options: ['An HVAC brand name', 'A load calculation to properly size HVAC equipment', 'An inspection protocol', 'A refrigerant certification'],
    correct: 1,
    explanation: 'Manual J is the industry-standard load calculation that determines the right HVAC size for your home. Some DFW cities (Allen, others) require it for new installs. Skipping it leads to oversized or undersized equipment.',
    resource: 'HVAC Sizing Guide',
  },
  {
    id: 'q10',
    question: 'How much should a DFW homeowner budget monthly per property for HVAC reserves?',
    options: ['$20–30/month', '$75–100/month', '$150–200/month', 'No reserve needed — just pay when it breaks'],
    correct: 1,
    explanation: 'DFW property managers recommend $75–100/month per unit in HVAC reserve. A $10,000 system replacement every 12–15 years works out to ~$65–85/month. Skipping reserves creates cash flow crises in August.',
    resource: 'HVAC Financial Planning Guide',
  },
];

const resources: Record<string, string> = {
  'HVAC Tax Credit Guide': '/dfw-hvac-tax-planning',
  'HVAC Location Guide': '/dfw-hvac-location-guide',
  'Upgrade Timing Guide': '/dfw-hvac-upgrade-timing',
  'HVAC Knowledge Base': '/dfw-hvac-knowledge',
  'DFW HVAC Rebate Guide': '/dfw-hvac-rebates',
  'Real Estate HVAC Tips': '/dfw-hvac-real-estate-tips',
  'New Neighborhood HVAC Guide': '/dfw-hvac-new-neighborhood',
  'HVAC Tax Planning Guide': '/dfw-hvac-tax-planning',
  'HVAC Sizing Guide': '/dfw-hvac-sizing',
  'HVAC Financial Planning Guide': '/dfw-hvac-financial',
};

export default function DFWHVACKnowledgeGap() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qId: string, idx: number) => {
    if (!submitted) setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.correct).length
    : 0;

  const gaps = submitted
    ? questions.filter((q) => answers[q.id] !== q.correct)
    : [];

  const pct = Math.round((score / questions.length) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Knowledge Assessment</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          10 questions to identify what you know — and what ProLnk can help you with.
        </p>
        {!submitted ? (
          <div>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ background: '#0f2040', borderRadius: 14, padding: 20, marginBottom: 16, border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>QUESTION {qi + 1} OF {questions.length}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{q.question}</div>
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(q.id, oi)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: answers[q.id] === oi ? '#1e3a5f' : '#0A1628',
                      color: '#fff',
                      border: '2px solid',
                      borderColor: answers[q.id] === oi ? '#F5E642′ : '#1e3a5f',
                      borderRadius: 8,
                      padding: '10px 14px',
                      marginBottom: 8,
                      cursor: 'pointer',
                      fontSize: 14,
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
              style={{
                background: Object.keys(answers).length === questions.length ? '#F5E642′ : '#1e3a5f',
                color: '#0A1628',
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                fontWeight: 800,
                fontSize: 16,
                cursor: Object.keys(answers).length === questions.length ? 'pointer' : 'not-allowed',
                width: '100%',
                marginTop: 8,
              }}
            >
              {Object.keys(answers).length < questions.length
                ? `Answer all ${questions.length} questions to submit (${Object.keys(answers).length}/${questions.length})`
                : 'See My Results'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 24, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '📚' : '🔧'}</div>
              <div style={{ fontWeight: 800, fontSize: 32, color: '#F5E642′ }}>{score}/{questions.length}</div>
              <div style={{ color: '#94a3b8', marginTop: 4 }}>{pct}% correct</div>
              <div style={{ marginTop: 12, fontSize: 16 }}>
                {pct >= 80 ? 'Strong DFW HVAC knowledge — you\’re well-prepared.' : pct >= 60 ? 'Good foundation with some gaps to fill.' : 'Several key gaps — the resources below will help.'}
              </div>
            </div>
            {gaps.length > 0 && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Your Knowledge Gaps</div>
                {gaps.map((q, i) => (
                  <div key={q.id} style={{ background: '#0f2040', borderRadius: 12, padding: 18, marginBottom: 12, border: '1px solid #ef4444′ }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{i + 1}. {q.question}</div>
                    <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 6 }}>Your answer: {q.options[answers[q.id]]}</div>
                    <div style={{ color: '#34d399', fontSize: 13, marginBottom: 10 }}>Correct: {q.options[q.correct]}</div>
                    <div style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 10 }}>{q.explanation}</div>
                    <div style={{ display: 'inline-block', background: '#0A1628', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#F5E642', fontWeight: 700 }}>
                      📖 Resource: {q.resource}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 24, background: '#0f2040', borderRadius: 16, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk connects you with vetted DFW HVAC pros who can answer all of these questions in person.</div>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Get Free HVAC Quotes via ProLnk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

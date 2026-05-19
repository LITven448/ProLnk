import { useState } from 'react';

const mistakes = [
  {
    id: 'no-inspection',
    label: 'Skipping the home inspection',
    triggers: ['trying to win bidding war', 'buying new construction'],
    risk: 'High',
    detail: 'In DFW\’s competitive market, buyers waive inspections to win. This can mean inheriting $20K–$80K in hidden repairs. Always get an inspection — even on new builds.',
    fix: 'Make your offer strong in other ways (price, earnest money, flexible close). Never waive inspection.',
  },
  {
    id: 'no-preapproval',
    label: 'Touring homes before getting pre-approved',
    triggers: ['just browsing', 'not sure about budget yet'],
    risk: 'High',
    detail: 'DFW homes sell in days. Without pre-approval, sellers won\’t take you seriously and you risk heartbreak over homes you can\’t qualify for.',
    fix: 'Get pre-approved with a lender before your first showing. Know your max budget.',
  },
  {
    id: 'emotion',
    label: 'Falling in love with the wrong home',
    triggers: ['found the perfect house', 'willing to stretch budget'],
    risk: 'Medium',
    detail: 'Emotional attachment leads to overbidding, ignoring red flags, or buying in a bad location. DFW has huge variation by suburb — price appreciation in Frisco vs. older suburbs differs dramatically.',
    fix: 'Set hard limits on price and non-negotiables before you start touring.',
  },
  {
    id: 'foundation',
    label: 'Ignoring DFW foundation history',
    triggers: ['buying in older neighborhood', 'love the look of the home'],
    risk: 'High',
    detail: 'North Texas clay soil expands and contracts with moisture. Foundation issues are endemic and can cost $5K–$40K+. Look for prior repairs, cracks, and sticking doors.',
    fix: 'Get a structural engineer\’s report separately from the general inspection on any home over 15 years old.',
  },
  {
    id: 'flood',
    label: 'Not researching DFW flood zones',
    triggers: ['love the waterfront view', 'great price near creek'],
    risk: 'High',
    detail: 'DFW floods. Many neighborhoods in Carrollton, Rowlett, and parts of Fort Worth sit in FEMA flood zones. Flood insurance adds $1,500–$4,000/yr and is mandatory if in Zone AE.',
    fix: 'Check FEMA flood maps before making an offer. Factor flood insurance into your monthly budget.',
  },
  {
    id: 'taxes',
    label: 'Underestimating DFW property taxes',
    triggers: ['comparing to other states', 'focused only on mortgage payment'],
    risk: 'High',
    detail: 'Texas has no state income tax but property taxes average 2.0–2.5% of assessed value. On a $390K home that\’s $7,800–$9,750/yr or $650–$813/mo added to your payment.',
    fix: 'Always calculate the full PITI payment (Principal + Interest + Taxes + Insurance) when budgeting.',
  },
  {
    id: 'hoa',
    label: 'Not vetting HOA rules and fees',
    triggers: ['new development', 'planned community'],
    risk: 'Medium',
    detail: 'Many DFW communities have HOAs charging $100–$500/mo with strict rules on rentals, landscaping, and renovations. HOA financials can reveal deferred maintenance.',
    fix: 'Request HOA documents during inspection period. Read the financials, rules, and meeting minutes.',
  },
  {
    id: 'commute',
    label: 'Not test-driving the commute',
    triggers: ['love the price in outer suburb', 'remote work currently'],
    risk: 'Medium',
    detail: 'DFW traffic is brutal. Prosper to downtown Dallas at rush hour can be 60–90 minutes. Remote work situations change.',
    fix: 'Drive the commute during rush hour before making an offer. Check future toll road costs.',
  },
  {
    id: 'closing-costs',
    label: 'Forgetting to budget for closing costs',
    triggers: ['maxing out savings for down payment'],
    risk: 'Medium',
    detail: 'Closing costs in Texas run 2–5% of the loan amount — on a $390K home, that\’s $7,800–$19,500 due at closing in addition to your down payment.',
    fix: 'Budget 3–4% of purchase price for closing costs. Ask your lender for a Loan Estimate early.',
  },
  {
    id: 'schools',
    label: 'Assuming school district by city name',
    triggers: ['have kids or plan to', 'buying for resale value'],
    risk: 'Medium',
    detail: 'DFW cities often span multiple school districts. A home in "Plano" might be in Frisco ISD. District quality dramatically affects home values and resale.',
    fix: 'Look up the specific school district for every address using the TEA or district websites.',
  },
];

export default function DFWFirstTimeBuyerMistakes() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const relevantMistakes = showResults
    ? mistakes.filter(m => selected.some(s => m.triggers.some(t => t === s)) || selected.length === 0)
    : [];

  const situations = [
    { id: 'trying to win bidding war', label: '🏆 Trying to win a bidding war' },
    { id: 'just browsing', label: '👀 Just starting to browse homes' },
    { id: 'found the perfect house', label: '❤️ Already found "the one"' },
    { id: 'buying in older neighborhood', label: '🏚️ Buying in an older neighborhood' },
    { id: 'love the waterfront view', label: '💧 Love homes near water or creeks' },
    { id: 'comparing to other states', label: '🗺️ Moving from another state' },
    { id: 'new development', label: '🏗️ Looking at new construction/HOA communities' },
    { id: 'love the price in outer suburb', label: '🚗 Considering far suburbs for price' },
    { id: 'maxing out savings for down payment', label: '💰 Stretching savings for down payment' },
    { id: 'have kids or plan to', label: '🎓 School districts matter to you' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW FIRST-TIME BUYERS</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>10 Costly Mistakes First-Time Buyers Make in DFW</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>North Texas has its own unique pitfalls. Knowing them before you buy can save you tens of thousands.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 28, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>🎯 Find Your Risk Areas</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Select situations that apply to you — we'll highlight the mistakes most likely to affect you.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => toggle(s.id)} style={{
                padding: '10px 14px', borderRadius: 8, textAlign: 'left', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                border: selected.includes(s.id) ? '2px solid #F5E642' : '2px solid #e2e8f0',
                background: selected.includes(s.id) ? '#fffde7' : '#f8fafc', color: '#0A1628'
              }}>{s.label}</button>
            ))}
          </div>
          <button onClick={() => setShowResults(!showResults)} style={{
            background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8,
            padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer'
          }}>{showResults ? 'Show All Mistakes' : '⚡ Show My Risk Areas'}</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(showResults ? (relevantMistakes.length > 0 ? relevantMistakes : mistakes) : mistakes).map((m, i) => (
            <div key={m.id} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ background: m.risk === 'High' ? '#fee2e2' : '#fef9c3', color: m.risk === 'High' ? '#991b1b' : '#92400e', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{m.risk} Risk</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>#{i + 1} {m.label}</h3>
                  <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: '0 0 10px' }}>{m.detail}</p>
                  <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '10px 14px', border: '1px solid #bbf7d0' }}>
                    <span style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>✅ How to avoid: </span>
                    <span style={{ fontSize: 13, color: '#166534' }}>{m.fix}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

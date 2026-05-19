import { useState } from 'react';

const priorities = ['Top Schools', 'Short Commute', 'Lower Home Price', 'Small Town Feel', 'Walkability', 'New Construction'];

const suburbs = [
  {
    name: 'Frisco',
    county: 'Collin',
    medianHome: '$580K',
    schoolRating: '9/10',
    commute: '35 min to Plano/Legacy West',
    population: '220K',
    vibe: 'Master-planned, fast growth, affluent family community',
    employers: ['Toyota North America HQ', 'PGA of America HQ', 'Keurig Dr Pepper'],
    scores: { schools: 5, commute: 3, price: 2, smallTown: 2, walkability: 3, newConstruction: 4 },
    pros: ['Top-rated FISD schools', 'Major corporate employers nearby', 'New development with modern amenities'],
    cons: ['Traffic congestion on 121/Preston', 'Premium pricing', 'Can feel generic/suburban'],
  },
  {
    name: 'Plano',
    county: 'Collin',
    medianHome: '$490K',
    schoolRating: '8/10',
    commute: '25 min to Dallas core',
    population: '290K',
    vibe: 'Established suburb, corporate hub, diverse and mature',
    employers: ['Toyota HQ', 'Capital One', 'Ericsson', 'JC Penney'],
    scores: { schools: 4, commute: 5, price: 3, smallTown: 2, walkability: 3, newConstruction: 2 },
    pros: ['Legacy corridor employment hub', 'Excellent PISD schools', 'More mature neighborhood character'],
    cons: ['Less new construction available', 'Traffic on 75/DNT', 'Higher entry price than Allen'],
  },
  {
    name: 'Allen',
    county: 'Collin',
    medianHome: '$445K',
    schoolRating: '9/10',
    commute: '30 min to Dallas core',
    population: '110K',
    vibe: 'Family-focused, manageable size, great schools and safety',
    employers: ['Kurin', 'Allen ISD', 'Amazon fulfillment nearby'],
    scores: { schools: 5, commute: 4, price: 4, smallTown: 3, walkability: 2, newConstruction: 3 },
    pros: ['Allen ISD consistently top-rated', 'Lower price than Frisco/Plano', 'Lower crime rates'],
    cons: ['Limited walkable retail', 'Long drive to DFW Airport', 'Fewer corporate employers in city'],
  },
  {
    name: 'McKinney',
    county: 'Collin',
    medianHome: '$420K',
    schoolRating: '8/10',
    commute: '40 min to Dallas core',
    population: '200K',
    vibe: 'Historic downtown meets master-planned growth, authentic Texas character',
    employers: ['Raytheon', 'Hemispherx Biopharma', 'McKinney ISD'],
    scores: { schools: 4, commute: 2, price: 4, smallTown: 5, walkability: 4, newConstruction: 4 },
    pros: ['Charming historic downtown square', 'Mix of old and new construction', 'Ranked one of best cities to live in US'],
    cons: ['Longer commute to Dallas', 'Growing pains with traffic on 75N', 'Less corporate employment base'],
  },
  {
    name: 'Prosper',
    county: 'Collin/Denton',
    medianHome: '$560K',
    schoolRating: '9/10',
    commute: '45 min to Dallas core',
    population: '45K',
    vibe: 'Fastest growing, larger lots, newer construction, affluent',
    employers: ['Mostly commuter — work is Frisco/Plano/Dallas'],
    scores: { schools: 5, commute: 1, price: 2, smallTown: 4, walkability: 1, newConstruction: 5 },
    pros: ['Brand-new construction everywhere', 'Large lots vs other suburbs', 'Prosper ISD top-ranked'],
    cons: ['Long commute — plan on 45–60 min each way', 'Limited local amenities still developing', 'Premium pricing for outer suburb'],
  },
];

const metros = [
  { metro: 'DFW', medianHome: '$420K', medianIncome: '$78K', stateTax: 'None', avgCommute: '28 min' },
  { metro: 'Austin', medianHome: '$520K', medianIncome: '$82K', stateTax: 'None', avgCommute: '35 min' },
  { metro: 'Los Angeles', medianHome: '$850K', medianIncome: '$72K', stateTax: '9.3%', avgCommute: '31 min' },
  { metro: 'Chicago', medianHome: '$340K', medianIncome: '$68K', stateTax: '4.95%', avgCommute: '32 min' },
  { metro: 'New York', medianHome: '$680K', medianIncome: '$79K', stateTax: '6.85%', avgCommute: '41 min' },
  { metro: 'Seattle', medianHome: '$710K', medianIncome: '$98K', stateTax: 'None', avgCommute: '27 min' },
];

export default function DFWRelocationGuide() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [showRec, setShowRec] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'suburbs' | 'finder' | 'costliving'>('overview');

  const togglePriority = (p: string) => {
    setSelectedPriorities(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : prev.length < 3 ? [...prev, p] : prev
    );
    setShowRec(false);
  };

  const scoreKey: Record<string, keyof typeof suburbs[0]['scores']> = {
    'Top Schools': 'schools', 'Short Commute': 'commute', 'Lower Home Price': 'price',
    'Small Town Feel': 'smallTown', 'Walkability': 'walkability', 'New Construction': 'newConstruction',
  };

  const getScoredSuburbs = () => {
    if (selectedPriorities.length === 0) return suburbs;
    return [...suburbs].sort((a, b) => {
      const scoreA = selectedPriorities.reduce((acc, p) => acc + (a.scores[scoreKey[p]] || 0), 0);
      const scoreB = selectedPriorities.reduce((acc, p) => acc + (b.scores[scoreKey[p]] || 0), 0);
      return scoreB - scoreA;
    });
  };

  const topThree = getScoredSuburbs().slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✈️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            Relocating to DFW? Your Complete Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>
            5th largest metro in the US. No state income tax. 150+ corporate HQs. Here's everything you need to choose the right suburb.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['overview', 'suburbs', 'finder', 'costliving'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === tab ? '#F5E642' : '#1E3A5F', color: activeTab === tab ? '#0A1628' : '#fff',
              }}
            >
              {tab === 'overview' ? '🌆 DFW Overview' : tab === 'suburbs' ? '🏘️ Compare Suburbs' : tab === 'finder' ? '🧭 Neighborhood Finder' : '💰 Cost of Living'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Metro Population', value: '7.8M', note: '5th largest US metro' },
                { label: 'State Income Tax', value: '$0', note: 'Texas has no personal income tax' },
                { label: 'Major Corporate HQs', value: '150+', note: 'Fortune 500 companies based in DFW' },
                { label: 'DFW Airport Rank', value: '#4 US', note: 'Global connectivity hub' },
                { label: 'Avg Days of Sun', value: '234/yr', note: 'More than Miami' },
                { label: 'Median Home Price', value: '$420K', note: 'vs $520K Austin, $850K LA' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#1E3A5F', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{stat.value}</div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{stat.label}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.note}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏢 Major DFW Employers by Sector</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { sector: 'Technology', cos: ['AT&T (HQ)', 'Texas Instruments (HQ)', 'Ericsson US HQ', 'HP Enterprise', 'Celanese'] },
                  { sector: 'Finance & Banking', cos: ['Goldman Sachs (Dallas ops)', 'Fidelity Investments', 'Capital One', 'Comerica Bank (HQ)', 'American Airlines CU'] },
                  { sector: 'Healthcare', cos: ['UT Southwestern', 'Baylor Scott & White', 'Texas Health Resources', 'Tenet Healthcare (HQ)', 'CHRISTUS Health'] },
                  { sector: 'Transportation & Logistics', cos: ['American Airlines (HQ Fort Worth)', 'BNSF Railway (HQ)', 'Southwest Airlines (HQ)', 'Amazon DFW hub', 'FedEx regional hub'] },
                ].map(s => (
                  <div key={s.sector} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                    <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{s.sector}</div>
                    {s.cos.map(co => (
                      <div key={co} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {co}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>☀️ What to Know Before You Arrive</h3>
              {[
                { tip: 'Summer heat is real', detail: 'June–September averages 95–105°F. Your HVAC will run 8+ hours/day. Budget $250–$400/month in summer electricity.' },
                { tip: 'You need a car', detail: 'DFW is sprawling. DART light rail is useful in Dallas city core but most suburbs require driving. Commutes of 25–45 min are normal.' },
                { tip: 'Property taxes offset no income tax', detail: 'Texas has no income tax but property taxes run 2.0–2.5% of home value annually. On a $450K home, expect $9K–$11K/year.' },
                { tip: 'Hail insurance matters', detail: 'North Texas is in Hail Alley. Make sure your homeowner\’s insurance covers roof replacement. Ask about actual cash value vs replacement cost coverage.' },
                { tip: 'Schools vary dramatically', detail: 'Collin County (Frisco, Allen, Plano, McKinney) has top-rated districts. Dallas ISD is large and uneven — research individual schools.' },
              ].map(item => (
                <div key={item.tip} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>💡 {item.tip}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suburbs' && (
          <div>
            <div style={{ display: 'grid', gap: 20 }}>
              {suburbs.map(sub => (
                <div key={sub.name} style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{sub.name}</h3>
                      <div style={{ color: '#94A3B8', fontSize: 13 }}>{sub.county} County • Pop. {sub.population}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
                        <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{sub.medianHome}</div>
                        <div style={{ color: '#64748B', fontSize: 11 }}>Median Home</div>
                      </div>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
                        <div style={{ color: '#34D399', fontSize: 18, fontWeight: 800 }}>{sub.schoolRating}</div>
                        <div style={{ color: '#64748B', fontSize: 11 }}>Schools</div>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16, fontStyle: 'italic' }}>{sub.vibe}</p>
                  <div style={{ color: '#60A5FA', fontSize: 13, marginBottom: 12 }}>🚗 {sub.commute}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ color: '#34D399', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>✅ Pros</div>
                      {sub.pros.map(p => <div key={p} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
                    </div>
                    <div>
                      <div style={{ color: '#F87171', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>⚠️ Cons</div>
                      {sub.cons.map(c => <div key={c} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 4 }}>• {c}</div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finder' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🧭 Neighborhood Finder</h2>
              <p style={{ color: '#94A3B8', marginBottom: 20 }}>Select up to 3 priorities and we'll rank the suburbs that best match your needs.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                {priorities.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePriority(p)}
                    style={{
                      padding: '10px 18px', borderRadius: 8, border: `2px solid ${selectedPriorities.includes(p) ? '#F5E642' : '#2D4A6B'}`,
                      background: selectedPriorities.includes(p) ? '#F5E642' : 'transparent',
                      color: selectedPriorities.includes(p) ? '#0A1628' : '#CBD5E1',
                      cursor: selectedPriorities.includes(p) || selectedPriorities.length < 3 ? 'pointer' : 'not-allowed',
                      fontWeight: selectedPriorities.includes(p) ? 700 : 400, fontSize: 14,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {selectedPriorities.length > 0 && (
                <button
                  onClick={() => setShowRec(true)}
                  style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                >
                  🎯 Show My Top 3 Suburbs
                </button>
              )}
            </div>
            {showRec && selectedPriorities.length > 0 && (
              <div>
                <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your Top 3 Matches</h3>
                {topThree.map((sub, i) => (
                  <div key={sub.name} style={{ background: '#1E3A5F', borderRadius: 12, padding: 24, marginBottom: 16, borderLeft: `4px solid ${i === 0 ? '#F5E642' : i === 1 ? '#60A5FA' : '#94A3B8'}` }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: i === 0 ? '#F5E642' : i === 1 ? '#60A5FA' : '#94A3B8' }}>#{i + 1}</div>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{sub.name}</div>
                        <div style={{ color: '#94A3B8', fontSize: 13 }}>{sub.medianHome} median • {sub.schoolRating} schools • {sub.commute}</div>
                      </div>
                    </div>
                    <p style={{ color: '#CBD5E1', fontSize: 14 }}>{sub.vibe}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'costliving' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>💰 DFW vs Other Major Metros</h2>
              <p style={{ color: '#94A3B8', marginBottom: 24 }}>How DFW stacks up on the metrics that affect your wallet.</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr>
                      {['Metro', 'Median Home', 'Median Income', 'State Income Tax', 'Avg Commute'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8', borderBottom: '2px solid #2D4A6B', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metros.map((row, i) => (
                      <tr key={row.metro} style={{ borderBottom: '1px solid #1A2E4A', background: i === 0 ? '#0A2040' : 'transparent' }}>
                        <td style={{ padding: '12px 16px', color: i === 0 ? '#F5E642' : '#fff', fontWeight: i === 0 ? 800 : 400 }}>{row.metro} {i === 0 ? '⭐' : ''}</td>
                        <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{row.medianHome}</td>
                        <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{row.medianIncome}</td>
                        <td style={{ padding: '12px 16px', color: row.stateTax === 'None' ? '#34D399' : '#F87171', fontWeight: 600 }}>{row.stateTax}</td>
                        <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{row.avgCommute}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 20 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16 }}>🧮 True Cost Comparison: DFW vs LA</h3>
                {[
                  ['Home Purchase (same quality of life)', '$420K', '$850K'],
                  ['Annual Property Tax (~2.2% DFW, ~1.2% CA)', '$9,240', '$10,200'],
                  ['State Income Tax ($120K salary)', '$0', '$11,160 (9.3%)'],
                  ['Net savings moving DFW from LA (Year 1)', '—', '$430K+ in equity + $11K/yr tax savings'],
                ].map(([label, dfw, la]) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, padding: '10px 0', borderBottom: '1px solid #1A2E4A', fontSize: 13 }}>
                    <div style={{ color: '#94A3B8' }}>{label}</div>
                    <div style={{ color: '#34D399', fontWeight: 600 }}>{dfw}</div>
                    <div style={{ color: '#F87171', fontWeight: 600 }}>{la}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏡</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Ready to Make Your DFW Move?</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Get connected with relocation specialists, movers, and home service pros through ProLnk.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Find DFW Relocation Pros →
          </button>
        </div>
      </div>
    </div>
  );
}

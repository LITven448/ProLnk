import { useState } from 'react';

const mistakes = [
  {
    rank: 1,
    title: 'Skipping Foundation Watering',
    cost: '$8K–$15K',
    when: 'Year 1+',
    detail: 'DFW clay soil expands and contracts violently with moisture swings. Most homeowners stop watering in fall — exactly when clay shrinks and foundations crack. Run soaker hoses 2-3x/week at the drip line year-round except during rain.',
    fix: 'Soaker hose system with timer: $200–400. Pier repair: $8K–$15K. Easy math.',
  },
  {
    rank: 2,
    title: 'Ignoring Slow HVAC Decline',
    cost: '$2K–$4K premium',
    when: 'Year 3–7',
    detail: 'HVAC systems in DFW run 9+ months/year. A system losing efficiency costs 15-25% more in electricity for 2-3 years before dying — usually on the hottest day of August. Emergency replacement carries a 30-40% premium.',
    fix: 'Annual tune-ups ($150/yr) extend life 3-5 years and prevent emergency pricing.',
  },
  {
    rank: 3,
    title: 'Not Protesting Property Taxes',
    cost: '$400–$800/yr',
    when: 'Every year',
    detail: 'DCAD, CCAD, and TCAD appraise aggressively. The majority of protests are settled informally — you don\’t even need a hearing. Missing the May deadline means paying full appraised value all year.',
    fix: 'File online protest by May 15. Bring 3 comp sales lower than your appraisal.',
  },
  {
    rank: 4,
    title: 'Overimproving for the Neighborhood',
    cost: '$15K–$60K',
    when: 'Year 2–5',
    detail: 'DFW home values are neighborhood-capped. A $60K kitchen remodel in a $250K neighborhood adds $10-15K in resale, max. Buyers don\’t pay above neighborhood comparables regardless of your finishes.',
    fix: 'Know your neighborhood ceiling before any project over $10K.',
  },
  {
    rank: 5,
    title: 'No Contractor Relationships Before Emergencies',
    cost: '$500–$2K premium',
    when: 'Year 1',
    detail: 'After a DFW hail storm, every roofer has a 6-week backlog. After a freeze burst pipe, plumbers charge emergency rates. Homeowners without established relationships wait longer and pay more.',
    fix: 'Build ProLnk relationships BEFORE you need them — emergency pricing disappears.',
  },
  {
    rank: 6,
    title: 'Ignoring Drainage Issues',
    cost: '$3K–$20K',
    when: 'Year 1–3',
    detail: 'DFW gets intense rain events — 4-6 inch storms are common. Poor drainage destroys foundations, floods crawl spaces, and erodes landscaping. The tell: water pooling within 10 feet of your foundation for more than 4 hours.',
    fix: 'French drain system: $1,500–4,000. Foundation repair from drainage failure: $15K+.',
  },
  {
    rank: 7,
    title: 'Skipping Roof Inspections After Hail',
    cost: '$8K–$25K',
    when: 'After every hail event',
    detail: 'DFW gets 15-25 hail events per year — most homeowners inspect after only the obvious ones. Small hail leaves micro-fractures in shingles that fail 2-4 years later, often after the insurance window closes.',
    fix: 'Post-hail inspection: free from reputable roofer. Late roof claim: $0 from insurance.',
  },
  {
    rank: 8,
    title: 'Letting Trees Overhang Roof',
    cost: '$2K–$8K',
    when: 'Ongoing',
    detail: 'DFW has significant pecan, oak, and cedar tree coverage. Branches over your roof drop debris, trap moisture, damage shingles, and create squirrel/raccoon entry points. Insurance often excludes tree-contact damage.',
    fix: 'Annual tree trimming: $300-700. Tree-caused roof damage: $2K–$8K, often uninsured.',
  },
  {
    rank: 9,
    title: 'DIY Electrical Without Permits',
    cost: '$5K–$15K',
    when: 'Any time',
    detail: 'Unpermitted electrical work is a material disclosure item in Texas. Buyers\’ inspectors flag it every time. You\’ll pay to redo it at sale — properly this time, plus permit fees, plus code upgrades.',
    fix: 'Always pull permits. DFW cities are reasonable — permits protect you at resale.',
  },
  {
    rank: 10,
    title: 'No Annual Home Inspection',
    cost: '$1K–$5K deferred',
    when: 'Annually',
    detail: 'Buyers get inspections. Homeowners rarely do. An annual inspection ($350-450) catches $1K-5K in deferred maintenance before it becomes $10K+ in emergency repairs.',
    fix: '$400 annual inspection catches problems when they\’re still cheap to fix.',
  },
];

export default function DFWHomeownerTop10Mistakes() {
  const [yearsOwned, setYearsOwned] = useState(3);
  const [expanded, setExpanded] = useState<number | null>(null);

  const relevant = mistakes.filter(m => {
    if (m.when === 'Year 1') return yearsOwned <= 2;
    if (m.when === 'Year 1+') return true;
    if (m.when === 'Year 1–3') return yearsOwned <= 4;
    if (m.when === 'Year 2–5') return yearsOwned >= 2 && yearsOwned <= 6;
    if (m.when === 'Year 3–7') return yearsOwned >= 3 && yearsOwned <= 8;
    return true;
  });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>💸 Top 10 DFW Homeowner Mistakes</h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          The most expensive mistakes DFW homeowners make — ranked by total damage. These aren't hypotheticals. They're what shows up in Texas home inspection reports and insurance claims every year.
        </p>

        <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>How many years have you owned in DFW?</div>
          <input
            type="range" min={1} max={15} value={yearsOwned}
            onChange={e => setYearsOwned(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 8 }}
          />
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{yearsOwned} year{yearsOwned !== 1 ? 's' : ''}</div>
          <div style={{ color: '#8899AA', fontSize: 13, marginTop: 4 }}>Showing {relevant.length} mistakes most relevant to your ownership stage</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mistakes.map(m => {
            const isRelevant = relevant.includes(m);
            const isOpen = expanded === m.rank;
            return (
              <div
                key={m.rank}
                onClick={() => setExpanded(isOpen ? null : m.rank)}
                style={{
                  background: isRelevant ? '#0D1F38' : '#07111F',
                  border: `1px solid ${isRelevant ? '#1E3A5F' : '#0D1F38'}`,
                  borderLeft: isRelevant ? '4px solid #F5E642' : '4px solid #1E3A5F',
                  borderRadius: 10,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  opacity: isRelevant ? 1 : 0.45,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>#{m.rank} {m.title}</div>
                  <div style={{ color: '#FF6B6B', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', marginLeft: 12 }}>{m.cost}</div>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 12 }}>
                    <p style={{ color: '#AABBCC', fontSize: 14, lineHeight: 1.7, marginBottom: 10 }}>{m.detail}</p>
                    <div style={{ background: '#F5E64215', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#F5E642' }}>✅ Fix: {m.fix}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 36, textAlign: 'center', background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Avoid these mistakes with vetted DFW pros.</div>
          <div style={{ color: '#8899AA', fontSize: 14 }}>ProLnk connects you with contractors before emergencies — when you have negotiating power.</div>
        </div>
      </div>
    </div>
  );
}

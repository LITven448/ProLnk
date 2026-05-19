import { useState } from 'react';

const priorities = [
  { key: 'schools', label: 'Top-rated schools' },
  { key: 'price', label: 'Affordable home prices' },
  { key: 'commute', label: 'Short commute' },
  { key: 'community', label: 'Community size (smaller feel)' },
  { key: 'amenities', label: 'Restaurants, parks, entertainment' },
  { key: 'newConstruction', label: 'New construction available' },
  { key: 'established', label: 'Established neighborhood feel' },
];

const suburbs = [
  {
    name: 'Frisco',
    scores: { schools: 5, price: 2, commute: 3, community: 2, amenities: 4, newConstruction: 5, established: 2 },
    why: 'Top-ranked FISD schools, master-planned communities, explosive growth with new retail and dining.',
    lifestyle: 'Family-forward, sporty, suburban prosperity. Think soccer tournaments on weekends and new HEB runs.',
  },
  {
    name: 'McKinney',
    scores: { schools: 4, price: 3, commute: 3, community: 4, amenities: 4, newConstruction: 4, established: 4 },
    why: 'Historic downtown charm meets modern growth. Strong schools, mix of new builds and older neighborhoods.',
    lifestyle: 'Balanced: weekend farmers markets downtown, new breweries, and block parties in established streets.',
  },
  {
    name: 'Southlake',
    scores: { schools: 5, price: 1, commute: 4, community: 3, amenities: 4, newConstruction: 2, established: 5 },
    why: 'Carroll ISD is elite. Minutes from DFW Airport. Upscale Town Square dining. Premium price tag.',
    lifestyle: 'High-income, polished, achievement-oriented. Kids in travel sports, adults in Porsche dealerships.',
  },
  {
    name: 'Allen',
    scores: { schools: 4, price: 3, commute: 3, community: 3, amenities: 3, newConstruction: 3, established: 4 },
    why: 'Slightly more affordable than Frisco, solid AISD schools, good highway access, quieter feel.',
    lifestyle: 'Steady, family-stable, less hype than Frisco. You know your neighbors. Football is a religion.',
  },
  {
    name: 'Flower Mound',
    scores: { schools: 4, price: 3, commute: 4, community: 4, amenities: 3, newConstruction: 2, established: 5 },
    why: 'Lewisville ISD is strong, lower density, close to DFW Airport, nature trails, established feel.',
    lifestyle: 'Quieter, outdoorsy, less congestion. Great for remote workers who want space without sacrificing schools.',
  },
  {
    name: 'Prosper',
    scores: { schools: 5, price: 2, commute: 2, community: 4, amenities: 2, newConstruction: 5, established: 1 },
    why: 'Fastest-growing ISD in Texas. Brand new everything. Tight community feel in a booming corridor.',
    lifestyle: 'New-build suburbs at scale. Young families, construction dust, and Friday night lights culture.',
  },
];

export default function DFWSuburbFitFinder() {
  const [rankings, setRankings] = useState<Record<string, number>>({});
  const [results, setResults] = useState<typeof suburbs>([]);
  const [submitted, setSubmitted] = useState(false);

  function setRank(key: string, val: number) {
    setRankings(prev => ({ ...prev, [key]: val }));
  }

  function findMatches() {
    const scored = suburbs.map(s => {
      let total = 0;
      for (const [k, v] of Object.entries(rankings)) {
        total += (s.scores[k as keyof typeof s.scores] ?? 3) * v;
      }
      return { ...s, total };
    });
    scored.sort((a, b) => b.total - a.total);
    setResults(scored.slice(0, 3));
    setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏘️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Suburb Fit Finder</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>Rank what matters most — get your top 3 DFW suburb matches.</p>
        </div>
        {!submitted ? (
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Rate each priority (1 = low, 5 = must-have)</h2>
            {priorities.map(p => (
              <div key={p.key} style={{ marginBottom: 20 }}>
                <div style={{ color: '#0A1628', fontWeight: 600, marginBottom: 8 }}>{p.label}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setRank(p.key, n)}
                      style={{ width: 44, height: 44, borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 16,
                        borderColor: rankings[p.key] === n ? '#F5E642′ : '#E2E8F0',
                        backgroundColor: rankings[p.key] === n ? '#F5E642′ : '#F9FAFB',
                        color: '#0A1628′ }}>{n}</button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={findMatches}
              style={{ marginTop: 16, backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
              🔍 Find My Suburb Matches
            </button>
          </div>
        ) : (
          <div>
            {results.map((s, i) => (
              <div key={s.name} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: i === 0 ? '4px solid #F5E642′ : '4px solid #E2E8F0' }}>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 4 }}>#{i + 1} MATCH</div>
                <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>{s.name}</h3>
                <p style={{ color: '#334155', marginBottom: 12 }}><strong>Why it fits:</strong> {s.why}</p>
                <p style={{ color: '#334155', margin: 0 }}><strong>Lifestyle:</strong> {s.lifestyle}</p>
              </div>
            ))}
            <button onClick={() => { setSubmitted(false); setResults([]); }}
              style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer' }}>
              ↩ Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const neighborhoods = [
  {
    name: 'Irving',
    diversityScore: 95,
    nonWhitePct: 61,
    communities: ['Hispanic', 'South Asian', 'African American'],
    medianHome: 320000,
    groceries: ['Fiesta Mart', 'India Bazaar', 'Ranch 99'],
    highlight: 'Most diverse city in DFW — 90+ languages spoken in schools',
  },
  {
    name: 'Garland',
    diversityScore: 88,
    nonWhitePct: 58,
    communities: ['Hispanic', 'Vietnamese', 'African American'],
    medianHome: 285000,
    groceries: ['H Mart', 'Fiesta Mart', 'Super Cao Nguyen'],
    highlight: 'Affordable and incredibly diverse — strong Hispanic and Asian roots',
  },
  {
    name: 'Richardson (Chinatown)',
    diversityScore: 85,
    nonWhitePct: 52,
    communities: ['Vietnamese', 'Chinese', 'Korean', 'Indian'],
    medianHome: 430000,
    groceries: ['H Mart', 'Hong Kong Market', 'India Bazaar'],
    highlight: 'Largest Vietnamese community in Texas — authentic cuisine corridor on Belt Line',
  },
  {
    name: 'Carrollton',
    diversityScore: 82,
    nonWhitePct: 50,
    communities: ['Vietnamese', 'Hispanic', 'Korean'],
    medianHome: 370000,
    groceries: ['Lee Lee International', 'Viet Hoa', 'Fiesta Mart'],
    highlight: 'International corridor on Josey Lane — Vietnamese business district',
  },
  {
    name: 'Plano (East)',
    diversityScore: 75,
    nonWhitePct: 42,
    communities: ['South Asian', 'Chinese', 'Korean'],
    medianHome: 480000,
    groceries: ['H Mart', 'India Bazaar', 'Patel Brothers'],
    highlight: 'Fastest-growing South Asian community in North Texas',
  },
  {
    name: 'Farmers Branch',
    diversityScore: 72,
    nonWhitePct: 45,
    communities: ['Hispanic', 'Vietnamese', 'South Asian'],
    medianHome: 310000,
    groceries: ['Fiesta Mart', 'Hong Kong Market'],
    highlight: 'Small city, huge cultural density — great food scene',
  },
];

const culturalOptions = ['Vietnamese', 'Hispanic', 'South Asian', 'Chinese', 'Korean', 'African American'];

export default function DFWDiversityNeighborhoodsGuide() {
  const [budget, setBudget] = useState(400000);
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);
  const [results, setResults] = useState<typeof neighborhoods>([]);
  const [searched, setSearched] = useState(false);

  function toggleCulture(c: string) {
    setSelectedCultures(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  function findNeighborhoods() {
    let filtered = neighborhoods.filter(n => n.medianHome <= budget);
    if (selectedCultures.length > 0) {
      filtered = filtered.filter(n =>
        selectedCultures.some(c => n.communities.includes(c))
      );
    }
    setResults(filtered.sort((a, b) => b.diversityScore - a.diversityScore));
    setSearched(true);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🌍 DFW Neighborhood Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW's Most Diverse Neighborhoods</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          The Dallas-Fort Worth metroplex is one of America's most diverse metros. Irving schools speak 90+ languages. Richardson hosts the largest Vietnamese community in Texas. International grocery stores are the best signal of true neighborhood diversity.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Neighborhood</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Max Home Budget</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={200000} max={600000} step={10000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642' }} />
            <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 100 }}>${budget.toLocaleString()}</span>
          </div>
          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Cultural Communities of Interest (optional)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {culturalOptions.map(c => (
              <button key={c} onClick={() => toggleCulture(c)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: selectedCultures.includes(c) ? '#F5E642' : '#1e3a5f',
                  background: selectedCultures.includes(c) ? '#F5E642' : 'transparent',
                  color: selectedCultures.includes(c) ? '#0A1628' : '#94a3b8' }}>
                {c}
              </button>
            ))}
          </div>
          <button onClick={findNeighborhoods}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Show Recommendations
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: 18 }}>{results.length > 0 ? `✅ ${results.length} Neighborhoods Found` : '❌ No matches — try a higher budget'}</h2>
            {results.map(n => (
              <div key={n.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 20, margin: 0 }}>{n.name}</h3>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{n.diversityScore}/100 🌍</span>
                </div>
                <p style={{ color: '#94a3b8', marginBottom: 8 }}>{n.highlight}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13 }}>
                  <span>👥 {n.nonWhitePct}% non-white</span>
                  <span>🏠 Median ${n.medianHome.toLocaleString()}</span>
                  <span>🛒 {n.groceries.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>💡 Diversity & Home Values</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Diverse neighborhoods in DFW often show strong appreciation — proximity to ethnic business corridors, international restaurants, and cultural institutions drives demand. Richardson's Belt Line corridor has seen consistent value growth driven by its Asian-American community anchoring local commerce.
          </p>
        </div>
      </div>
    </div>
  );
}

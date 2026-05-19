import { useState } from 'react';

const neighborhoods = [
  {
    name: 'Uptown Dallas',
    medianHome: 520000,
    rentPerSqft: 2.8,
    ownerOnly: false,
    foodProfile: ['fine dining', 'brunch', 'cocktail bars'],
    mustVisit: ['Knife Dallas', 'Mot Hai Ba', 'Hawthorn', 'Neighborhood Services'],
    foodHalls: ['Trinity Groves nearby'],
    bbq: false,
    international: false,
    highlight: 'Most walkable food scene in DFW — 100+ restaurants in 1 square mile',
    homePriceRange: [450000, 700000],
  },
  {
    name: 'Bishop Arts (Oak Cliff)',
    medianHome: 390000,
    rentPerSqft: 2.1,
    ownerOnly: false,
    foodProfile: ['international', 'brunch', 'independent restaurants'],
    mustVisit: ['Lucia', 'Eno\’s Pizza', 'Oddfellows', 'Revolver Taco'],
    foodHalls: [],
    bbq: false,
    international: true,
    highlight: 'Most eclectic food neighborhood in Dallas — independent chefs, no chains',
    homePriceRange: [320000, 550000],
  },
  {
    name: 'Henderson Avenue (M Streets)',
    medianHome: 620000,
    rentPerSqft: 2.4,
    ownerOnly: false,
    foodProfile: ['brunch', 'fine dining', 'cocktail bars', 'international'],
    mustVisit: ['Ellen\’s', 'Armoury D.E.', 'Trompo', 'Uchi Dallas'],
    foodHalls: [],
    bbq: false,
    international: true,
    highlight: 'Henderson Ave corridor — highest concentration of acclaimed chefs in DFW',
    homePriceRange: [500000, 900000],
  },
  {
    name: 'Frisco / Star District',
    medianHome: 520000,
    rentPerSqft: 0,
    ownerOnly: true,
    foodProfile: ['bbq', 'brunch', 'sports dining', 'food halls'],
    mustVisit: ['Cowboy Chicken', 'Ford\’s Garage', 'Velvet Taco'],
    foodHalls: ['Star District Food Hall'],
    bbq: true,
    international: false,
    highlight: 'Growing suburban food scene anchored by Cowboys HQ — newer concept restaurants',
    homePriceRange: [420000, 700000],
  },
  {
    name: 'Legacy West (Plano)',
    medianHome: 480000,
    rentPerSqft: 0,
    ownerOnly: true,
    foodProfile: ['fine dining', 'international', 'brunch'],
    mustVisit: ['Hai Hospitality (Uchi)', 'True Food Kitchen', 'Haywire', 'North Italia'],
    foodHalls: ['Legacy Food Hall'],
    bbq: false,
    international: true,
    highlight: 'Best suburban upscale food destination — Legacy Food Hall has 20+ concepts',
    homePriceRange: [380000, 650000],
  },
  {
    name: 'Deep Ellum',
    medianHome: 380000,
    rentPerSqft: 2.0,
    ownerOnly: false,
    foodProfile: ['bbq', 'international', 'late night', 'food halls'],
    mustVisit: ['Pecan Lodge BBQ', 'Cane Rosso', 'Buly 1803 Coffee', 'Stirr'],
    foodHalls: [],
    bbq: true,
    international: true,
    highlight: 'Home of Pecan Lodge — Dallas\’s most famous BBQ. Live music + food all night.',
    homePriceRange: [300000, 500000],
  },
];

const foodTypes = ['bbq', 'international', 'fine dining', 'brunch', 'food halls'];

export default function DFWFoodieNeighborhoodsGuide() {
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [budget, setBudget] = useState(550000);
  const [results, setResults] = useState<typeof neighborhoods>([]);
  const [searched, setSearched] = useState(false);

  function toggleFood(f: string) {
    setSelectedFood(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  function findNeighborhoods() {
    let filtered = neighborhoods.filter(n => n.homePriceRange[0] <= budget);
    if (selectedFood.length > 0) {
      filtered = filtered.filter(n =>
        selectedFood.some(f =>
          f === 'bbq' ? n.bbq :
          f === 'international' ? n.international :
          n.foodProfile.includes(f)
        )
      );
    }
    setResults(filtered);
    setSearched(true);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🍽️ DFW Foodie Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW's Best Foodie Neighborhoods</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Dallas has one of America's most underrated food scenes. Uptown has 100+ restaurants in one square mile. Pecan Lodge in Deep Ellum has a cult following nationally. Legacy Food Hall in Plano is one of the best suburban food halls in the country. Where you live determines what you eat.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Food Neighborhood</h2>

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Food Preferences (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {foodTypes.map(f => (
              <button key={f} onClick={() => toggleFood(f)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: selectedFood.includes(f) ? '#F5E642' : '#1e3a5f',
                  background: selectedFood.includes(f) ? '#F5E642' : 'transparent',
                  color: selectedFood.includes(f) ? '#0A1628' : '#94a3b8' }}>
                {f === 'bbq' ? '🥩 BBQ' : f === 'international' ? '🌍 International' : f === 'fine dining' ? '🍷 Fine Dining' : f === 'brunch' ? '🥞 Brunch' : '🏪 Food Halls'}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Home Budget</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={250000} max={900000} step={10000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642' }} />
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</span>
          </div>

          <button onClick={findNeighborhoods}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Food Neighborhoods
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16 }}>🍴 {results.length} Neighborhoods Match</h2>
            {results.map(n => (
              <div key={n.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 20 }}>{n.name}</h3>
                <p style={{ color: '#94a3b8', marginBottom: 10 }}>{n.highlight}</p>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>
                  🏠 ${n.homePriceRange[0].toLocaleString()}–${n.homePriceRange[1].toLocaleString()}
                  {n.foodHalls.length > 0 && <span> · 🏪 {n.foodHalls[0]}</span>}
                  {n.bbq && <span> · 🥩 BBQ scene</span>}
                  {n.international && <span> · 🌍 International</span>}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Must try: {n.mustVisit.slice(0, 3).join(' · ')}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 12 }}>🔥 Dallas BBQ Culture</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Texas BBQ is not just food — it's identity. Pecan Lodge, Cattleack Barbeque, and Terry Black's are nationally ranked. Deep Ellum and Oak Cliff have the densest concentration. If BBQ matters, location within Dallas matters.
          </p>
        </div>
      </div>
    </div>
  );
}

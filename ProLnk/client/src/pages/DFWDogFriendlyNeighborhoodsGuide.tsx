import { useState } from 'react';

const neighborhoods = [
  {
    name: 'Frisco',
    trailMiles: 220,
    dogParks: 8,
    offLeash: true,
    medianHome: 520000,
    heatWarning: 'moderate',
    activity: 'high',
    size: 'any',
    highlights: ['Largest trail network in DFW', 'Dog-friendly breweries', 'Multiple off-leash areas'],
  },
  {
    name: 'McKinney',
    trailMiles: 80,
    dogParks: 5,
    offLeash: true,
    medianHome: 440000,
    heatWarning: 'moderate',
    activity: 'high',
    size: 'any',
    highlights: ['Bonnie Wenk Dog Park (off-leash)', 'Historic downtown dog-friendly patios', 'Extensive greenbelts'],
  },
  {
    name: 'Plano',
    trailMiles: 75,
    dogParks: 6,
    offLeash: true,
    medianHome: 480000,
    heatWarning: 'moderate',
    activity: 'medium',
    size: 'any',
    highlights: ['Jack Carter Dog Park — large and small sections', 'Arbor Hills Nature Preserve', 'Dog-friendly Legacy West'],
  },
  {
    name: 'Flower Mound',
    trailMiles: 60,
    dogParks: 4,
    offLeash: false,
    medianHome: 490000,
    heatWarning: 'low',
    activity: 'medium',
    size: 'large',
    highlights: ['Lake access for swimming dogs', 'Large lots — room for dogs', 'Grapevine Lake trails nearby'],
  },
  {
    name: 'Garland',
    trailMiles: 40,
    dogParks: 3,
    offLeash: true,
    medianHome: 285000,
    heatWarning: 'high',
    activity: 'low',
    size: 'small',
    highlights: ['Most affordable dog-friendly option', 'Winters Creek Dog Park', 'Smaller yards but good parks'],
  },
  {
    name: 'Rockwall',
    trailMiles: 35,
    dogParks: 3,
    offLeash: false,
    medianHome: 420000,
    heatWarning: 'low',
    activity: 'medium',
    size: 'large',
    highlights: ['Lake Ray Hubbard — dogs love it', 'Smaller city, less traffic', 'Great for water dogs'],
  },
  {
    name: 'Allen',
    trailMiles: 55,
    dogParks: 4,
    offLeash: true,
    medianHome: 460000,
    heatWarning: 'moderate',
    activity: 'medium',
    size: 'any',
    highlights: ['Bethany Lakes Dog Park', 'Well-planned suburban trail connections', 'Dog-friendly community culture'],
  },
];

export default function DFWDogFriendlyNeighborhoodsGuide() {
  const [dogSize, setDogSize] = useState('any');
  const [activityLevel, setActivityLevel] = useState('medium');
  const [budget, setBudget] = useState(500000);
  const [results, setResults] = useState<typeof neighborhoods>([]);
  const [searched, setSearched] = useState(false);

  function findNeighborhoods() {
    const filtered = neighborhoods.filter(n => {
      const budgetOk = n.medianHome <= budget;
      const sizeOk = dogSize === 'any' || n.size === 'any' || n.size === dogSize;
      const activityOk = activityLevel === 'any' || n.activity === activityLevel ||
        (activityLevel === 'high' && n.activity === 'high') ||
        (activityLevel === 'low' && n.activity !== 'high');
      return budgetOk && sizeOk && activityOk;
    });
    setResults(filtered.sort((a, b) => b.trailMiles - a.trailMiles));
    setSearched(true);
  }

  const heatColor = (lvl: string) => lvl === 'high' ? '#ef4444′ : lvl === ’moderate' ? '#f59e0b' : '#4ade80';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🐕 DFW Dog Owner Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW's Most Dog-Friendly Neighborhoods</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Frisco has 220+ miles of trails — more than most US cities. But DFW heat is real: pavement reaches 150°F+ in summer. The 7-second test — hold the back of your hand to pavement for 7 seconds. If you can't hold it, your dog can’t walk it.
        </p>

        <div style={{ background: '#3b1515', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #ef4444′ }}>
          <h3 style={{ color: '#ef4444', marginBottom: 6, fontSize: 15 }}>🌡️ DFW Summer Heat Warning</h3>
          <p style={{ color: '#fca5a5', margin: 0, fontSize: 14 }}>
            July/August temps regularly hit 105°F. Walk dogs before 8am or after 8pm. Asphalt in direct sun can reach 150°F and cause paw burns in 60 seconds. Always carry water. Never leave dogs in parked cars.
          </p>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Neighborhood</h2>

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Dog Size</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['small', 'large', 'any'].map(s => (
              <button key={s} onClick={() => setDogSize(s)}
                style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid', cursor: 'pointer',
                  borderColor: dogSize === s ? '#F5E642′ : '#1e3a5f',
                  background: dogSize === s ? '#F5E642′ : ’transparent',
                  color: dogSize === s ? '#0A1628′ : '#94a3b8' }}>
                {s === 'small' ? '🐩 Small' : s === 'large' ? '🐕 Large' : '🐾 Any'}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Activity Level</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['low', 'medium', 'high'].map(a => (
              <button key={a} onClick={() => setActivityLevel(a)}
                style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid', cursor: 'pointer',
                  borderColor: activityLevel === a ? '#F5E642′ : '#1e3a5f',
                  background: activityLevel === a ? '#F5E642′ : ’transparent',
                  color: activityLevel === a ? '#0A1628′ : '#94a3b8' }}>
                {a === 'low' ? '🛋️ Low' : a === 'medium' ? '🚶 Medium' : '🏃 High'}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Home Budget</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={200000} max={700000} step={10000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642′ }} />
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</span>
          </div>

          <button onClick={findNeighborhoods}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Dog-Friendly Neighborhoods
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16 }}>🐾 Top {results.length} Picks for You</h2>
            {results.map(n => (
              <div key={n.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 20 }}>{n.name}</h3>
                  <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: '#1a2a1a', color: heatColor(n.heatWarning) }}>
                    🌡️ Heat: {n.heatWarning}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8', marginBottom: 10, flexWrap: 'wrap' }}>
                  <span>🏃 {n.trailMiles} trail miles</span>
                  <span>🏕️ {n.dogParks} dog parks</span>
                  <span>{n.offLeash ? '✅ Off-leash areas' : '🔗 Leash required'}</span>
                  <span>🏠 ${n.medianHome.toLocaleString()}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: 13 }}>
                  {n.highlights.map(h => <li key={h}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

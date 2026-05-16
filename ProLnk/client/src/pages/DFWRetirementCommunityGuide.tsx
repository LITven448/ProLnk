import { useState } from 'react';

const communities = [
  {
    name: 'Robson Ranch (Denton)',
    type: 'Active Adult 55+',
    city: 'Denton',
    monthlyHOA: 450,
    homePriceRange: [350000, 650000],
    amenities: ['Golf course', 'Resort pools', 'Tennis', 'Pickleball', '100+ clubs'],
    careLvl: 'Independent',
    highlight: 'Top 55+ community in DFW — 25,000+ sq ft amenity center, gated, 3,600 homes at buildout',
    taxFreeze: true,
  },
  {
    name: 'Sun City (Frisco/Prosper)',
    type: 'Active Adult 55+',
    city: 'Prosper',
    monthlyHOA: 390,
    homePriceRange: [400000, 700000],
    amenities: ['Resort pool', 'Fitness center', 'Social clubs', 'Walking trails'],
    careLvl: 'Independent',
    highlight: 'Del Webb community — brand new construction, premium finishes, suburban location',
    taxFreeze: true,
  },
  {
    name: 'Watermere (Flower Mound)',
    type: 'Senior Living',
    city: 'Flower Mound',
    monthlyHOA: 2800,
    homePriceRange: [0, 0],
    amenities: ['Fine dining', 'Spa', 'Concierge', 'Transportation'],
    careLvl: 'Independent + Assisted',
    highlight: 'Luxury senior living — rental model, all-inclusive pricing, lake views',
    taxFreeze: false,
  },
  {
    name: 'Village on the Green (Plano)',
    type: 'Independent Living',
    city: 'Plano',
    monthlyHOA: 2400,
    homePriceRange: [0, 0],
    amenities: ['Restaurant', 'Library', 'Fitness', 'Social activities'],
    careLvl: 'Independent',
    highlight: 'Walkable Plano location — close to shopping and medical facilities',
    taxFreeze: false,
  },
  {
    name: 'Tradition (Denton)',
    type: '55+ Active Adult',
    city: 'Denton',
    monthlyHOA: 280,
    homePriceRange: [280000, 420000],
    amenities: ['Clubhouse', 'Pool', 'Fitness room', 'Social events'],
    careLvl: 'Independent',
    highlight: 'More affordable 55+ option near Robson Ranch corridor — no age-restricted price premium',
    taxFreeze: true,
  },
];

const careOptions = ['Independent 55+', 'Independent Living', 'Assisted Living'];

export default function DFWRetirementCommunityGuide() {
  const [age, setAge] = useState(65);
  const [careNeed, setCareNeed] = useState('Independent 55+');
  const [budget, setBudget] = useState(500000);
  const [results, setResults] = useState<typeof communities>([]);
  const [searched, setSearched] = useState(false);

  function findCommunities() {
    let filtered = communities.filter(c => {
      if (careNeed === 'Assisted Living') return c.careLvl.includes('Assisted');
      if (careNeed === 'Independent Living') return c.careLvl === 'Independent';
      return true;
    });
    filtered = filtered.filter(c => {
      if (c.homePriceRange[1] === 0) return c.monthlyHOA <= budget / 100;
      return c.homePriceRange[0] <= budget;
    });
    setResults(filtered);
    setSearched(true);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏡 DFW Retirement Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Retirement Communities</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Texas has no state income tax and offers a property tax freeze at age 65 — making DFW one of the top retirement destinations in the US. Robson Ranch in Denton is the premier active adult community in the metro. Here's everything you need to know.
        </p>

        <div style={{ background: '#0d3b6e', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', marginBottom: 8 }}>⭐ Texas Property Tax Freeze — Age 65+</h3>
          <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
            Once you turn 65, your school district taxes are frozen at that year's assessed value — even if your home appreciates. Combined with no state income tax, Texas retirement income stretch significantly further than most states.
          </p>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Community</h2>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Your Age: {age}</label>
          <input type="range" min={55} max={85} value={age} onChange={e => setAge(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 20, accentColor: '#F5E642' }} />

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Care Level Needed</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {careOptions.map(o => (
              <button key={o} onClick={() => setCareNeed(o)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: careNeed === o ? '#F5E642' : '#1e3a5f',
                  background: careNeed === o ? '#F5E642' : 'transparent',
                  color: careNeed === o ? '#0A1628' : '#94a3b8' }}>
                {o}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Budget / Home Price or Monthly</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={200000} max={800000} step={25000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642' }} />
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</span>
          </div>

          <button onClick={findCommunities}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Show Communities
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16 }}>{results.length > 0 ? `✅ ${results.length} Communities Match` : '❌ Adjust filters to see options'}</h2>
            {results.map(c => (
              <div key={c.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{c.name}</h3>
                    <span style={{ color: '#F5E642', fontSize: 12 }}>{c.type} · {c.city}</span>
                  </div>
                  {c.taxFreeze && <span style={{ background: '#1a4a1a', color: '#4ade80', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>Tax Freeze Eligible</span>}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: 12 }}>{c.highlight}</p>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  {c.homePriceRange[1] > 0
                    ? <span>🏠 ${c.homePriceRange[0].toLocaleString()}–${c.homePriceRange[1].toLocaleString()} · HOA ${c.monthlyHOA}/mo</span>
                    : <span>💰 ~${c.monthlyHOA.toLocaleString()}/mo all-inclusive</span>}
                  <div style={{ marginTop: 8 }}>🎯 {c.amenities.slice(0, 3).join(' · ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

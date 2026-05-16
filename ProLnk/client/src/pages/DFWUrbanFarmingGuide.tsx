import { useState } from 'react';

const chickenLegality = [
  { city: 'Dallas', allowed: true, limit: '6 hens, no roosters', notes: 'Permit required; coop must be 50ft from neighbors' },
  { city: 'Fort Worth', allowed: true, limit: '10 hens, no roosters', notes: 'Animal Services permit; coop setback requirements apply' },
  { city: 'Plano', allowed: false, limit: 'Not permitted', notes: 'Urban chickens banned in Plano city limits' },
  { city: 'Frisco', allowed: true, limit: '6 hens', notes: 'Check specific subdivision; some HOAs prohibit regardless of city rules' },
  { city: 'McKinney', allowed: true, limit: '6 hens', notes: 'Permit and annual inspection required' },
  { city: 'Arlington', allowed: true, limit: '6 hens', notes: 'Application required; setback rules enforced' },
];

const fruitTrees = [
  { tree: 'Fig (Celeste/Brown Turkey)', difficulty: 'Easy', yield: '20-40 lbs/year', note: 'Best fruit tree for all DFW - heat tolerant, productive, minimal care' },
  { tree: 'Plum (Methley, Bruce)', difficulty: 'Easy', yield: '10-25 lbs/year', note: 'Very well suited to DFW; disease resistant; prolific producer' },
  { tree: 'Persimmon (Fuyu)', difficulty: 'Very Easy', yield: '25-50 lbs/year', note: 'Extremely heat and drought tolerant; stunning fall color as bonus' },
  { tree: 'Peach (Redhaven)', difficulty: 'Moderate', yield: '15-30 lbs/year', note: 'Needs 850+ chill hours; excellent north of Dallas' },
  { tree: 'Pomegranate', difficulty: 'Easy', yield: '10-20 lbs/year', note: 'Thrives in DFW heat; established trees extremely drought tolerant' },
  { tree: 'Meyer Lemon', difficulty: 'Moderate', yield: '10-30 lbs/year', note: 'Grow in pot; bring indoors Nov-Mar; north-facing wall gives frost protection' },
];

const spaces = ['Small yard or patio (under 500 sqft)', 'Medium yard (500-2000 sqft)', 'Large yard (2000+ sqft)'];
const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Denton', 'Garland', 'Irving', 'Other DFW city'];

export default function DFWUrbanFarmingGuide() {
  const [space, setSpace] = useState('');
  const [city, setCity] = useState('');
  const [guide, setGuide] = useState<null | { chickenNote: string; beds: string; trees: string; yieldEst: string }>(null);

  function generate() {
    if (!space || !city) return;
    const cityData = chickenLegality.find(c => c.city === city);
    const isSmall = space.includes('Small');
    const isLarge = space.includes('Large');
    setGuide({
      chickenNote: cityData
        ? `${city}: ${cityData.allowed ? `Allowed - ${cityData.limit}. ${cityData.notes}` : cityData.notes}`
        : 'Check with your city Animal Services department before getting chickens',
      beds: isSmall
        ? '1-2 raised beds (4x8ft); focus on tomatoes, peppers, herbs - highest value per sqft in DFW'
        : isLarge
        ? '4-8 raised beds; add in-ground section for sweet potatoes and winter squash; compost bin on site'
        : '2-4 raised beds; one dedicated to herbs for year-round production; consider a small greenhouse for winter',
      trees: isSmall
        ? 'One fig tree in a large container or corner spot - most productive small-space fruit for DFW'
        : isLarge
        ? 'Fig + plum + persimmon = 3-season harvest with minimal care; space 15-20ft apart'
        : 'Fig tree plus one plum - both reliably productive in DFW conditions',
      yieldEst: isLarge
        ? 'A well-managed large DFW urban farm can produce 200-400+ lbs of food annually'
        : isSmall
        ? 'Focused small space: 40-80 lbs of vegetables and herbs per year with year-round plantings'
        : '80-150 lbs of produce annually with two crop cycles in DFW climate',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌽</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>DFW Urban Farming Guide</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>DFW homeowners with even modest outdoor space can produce significant food - vegetables, fruit trees, and chickens in many DFW cities. Here is exactly how to start.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '20px' }}>🐓 Backyard Chickens: What DFW Cities Allow</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F5E642' }}>
                  {['City','Allowed','Limit','Notes'].map(h => <th key={h} style={{ color: '#F5E642', padding: '8px 12px', textAlign: 'left', fontWeight: '700' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {chickenLegality.map(r => (
                  <tr key={r.city} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '10px 12px', color: '#e2e8f0' }}>{r.city}</td>
                    <td style={{ padding: '10px 12px' }}><span style={{ background: r.allowed ? '#14532d' : '#7f1d1d', color: r.allowed ? '#86efac' : '#fca5a5', borderRadius: '4px', padding: '2px 8px', fontSize: '0.78rem' }}>{r.allowed ? 'Yes' : 'No'}</span></td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.limit}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.8rem' }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🍑 Best Fruit Trees for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
            {fruitTrees.map(t => (
              <div key={t.tree} style={{ background: '#0A1628', borderRadius: '12px', padding: '16px', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '4px' }}>{t.tree}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>Difficulty: {t.difficulty} | Yield: {t.yield}</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{t.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '20px' }}>🥦 Vegetable Growing in DFW</h2>
          {[['Spring (Apr-May)','Tomatoes, peppers, squash, cucumbers, beans - peak productivity season'],['Summer (Jun-Aug)','Okra, sweet potato, black-eyed peas - only heat-lovers survive 100F DFW summers'],['Fall (Sep-Nov)','Second tomato planting, broccoli, cauliflower, lettuce, carrots - often best season'],['Winter (Dec-Feb)','Garlic, kale, spinach in raised beds; cover crops to build soil for spring']].map(([s,v]) => (
            <div key={s} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: '700', whiteSpace: 'nowrap', minWidth: '95px', textAlign: 'center' }}>{s}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', paddingTop: '4px' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔍 Get Your Urban Farm Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Available Space</label>
              <select value={space} onChange={e => setSpace(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select space...</option>
                {spaces.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select city...</option>
                {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Get My Urban Farm Plan</button>
          {guide && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>🐓 Chickens: </span><span style={{ color: '#94a3b8' }}>{guide.chickenNote}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>🥦 Raised Beds: </span><span style={{ color: '#94a3b8' }}>{guide.beds}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>🌳 Fruit Trees: </span><span style={{ color: '#94a3b8' }}>{guide.trees}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: '600' }}>🌾 Expected Yield: </span><span style={{ color: '#94a3b8' }}>{guide.yieldEst}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

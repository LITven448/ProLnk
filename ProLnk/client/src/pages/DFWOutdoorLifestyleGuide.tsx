import { useState } from 'react';

const neighborhoods = [
  {
    name: 'Flower Mound',
    medianHome: 490000,
    lake: 'Grapevine Lake (5 min)',
    trailMiles: 60,
    activities: ['hiking', 'kayaking', 'cycling', 'fishing'],
    parks: ['Arbor Hills Nature Preserve', 'Twin Coves Park'],
    golf: 3,
    highlight: 'Best lake + trail combo in DFW — Grapevine Lake boat ramps, Arbor Hills preserve hiking',
  },
  {
    name: 'Rockwall',
    medianHome: 420000,
    lake: 'Lake Ray Hubbard (direct access)',
    trailMiles: 35,
    activities: ['kayaking', 'sailing', 'fishing', 'hiking'],
    parks: ['Harry Myers Park', 'East Fork Nature Area'],
    golf: 2,
    highlight: 'Waterfront community on Lake Ray Hubbard — sailboats, marinas, lakefront restaurants',
  },
  {
    name: 'Rowlett',
    medianHome: 310000,
    lake: 'Lake Ray Hubbard (west shore)',
    trailMiles: 28,
    activities: ['kayaking', 'fishing', 'cycling'],
    parks: ['Wet ’N Wild (closed)', 'Harry Myers Regional'],
    golf: 1,
    highlight: 'Affordable lake access — best price-to-lake ratio in DFW',
  },
  {
    name: 'Frisco',
    medianHome: 520000,
    lake: 'Lewisville Lake (15 min)',
    trailMiles: 220,
    activities: ['cycling', 'hiking', 'soccer', 'running'],
    parks: ['Warren Sports Complex', 'Frisco Commons Park'],
    golf: 5,
    highlight: '220+ miles of trails — most in DFW. Sports capital of North Texas.',
  },
  {
    name: 'McKinney',
    medianHome: 440000,
    lake: 'Lake Lavon (20 min)',
    trailMiles: 80,
    activities: ['hiking', 'cycling', 'fishing', 'kayaking'],
    parks: ['Erwin Park MTB Trail', 'Heard Natural Science Museum'],
    golf: 4,
    highlight: 'Erwin Park mountain biking trails — best MTB in DFW metro area',
  },
  {
    name: 'Cedar Hill',
    medianHome: 295000,
    lake: 'Joe Pool Lake (direct)',
    trailMiles: 50,
    activities: ['hiking', 'mountain biking', 'fishing', 'camping'],
    parks: ['Cedar Ridge Preserve', 'Dogwood Canyon Audubon'],
    golf: 2,
    highlight: 'Cedar Ridge Preserve is the crown jewel — 600+ acre preserve with raptors and prairie restoration',
  },
  {
    name: 'Southlake',
    medianHome: 880000,
    lake: 'Grapevine Lake (10 min)',
    trailMiles: 45,
    activities: ['cycling', 'hiking', 'golf', 'tennis'],
    parks: ['Bob Jones Nature Center', 'Bicentennial Park'],
    golf: 6,
    highlight: 'Premium outdoor lifestyle with top golf courses — affluent community, great trail system',
  },
];

const activityOptions = ['hiking', 'cycling', 'kayaking', 'fishing', 'golf', 'mountain biking', 'running'];

export default function DFWOutdoorLifestyleGuide() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [budget, setBudget] = useState(500000);
  const [results, setResults] = useState<typeof neighborhoods>([]);
  const [searched, setSearched] = useState(false);

  function toggleActivity(a: string) {
    setSelectedActivities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }

  function findNeighborhoods() {
    let filtered = neighborhoods.filter(n => n.medianHome <= budget);
    if (selectedActivities.length > 0) {
      filtered = filtered.filter(n =>
        selectedActivities.some(a => n.activities.includes(a) ||
          (a === 'mountain biking' && n.activities.includes('hiking')))
      );
    }
    setResults(filtered.sort((a, b) => b.trailMiles - a.trailMiles));
    setSearched(true);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏔️ DFW Outdoor Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Outdoor Lifestyle for Homebuyers</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW doesn't have mountains, but it has lakes, 500+ miles of trails, and world-class nature preserves. Cedar Ridge Preserve in Cedar Hill is genuinely stunning. Grapevine and Ray Hubbard are boating destinations. Frisco has more trail miles than most major US cities.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🏕️', name: 'Cedar Ridge Preserve', desc: 'Cedar Hill — 600 acre raptor sanctuary' },
            { icon: '⛵', name: 'Lake Ray Hubbard', desc: 'Rockwall — sailing, kayaking, marinas' },
            { icon: '🚵', name: 'Erwin MTB Park', desc: 'McKinney — best mountain biking in DFW' },
            { icon: '🌊', name: 'Grapevine Lake', desc: 'Flower Mound — largest DFW lake park' },
          ].map(s => (
            <div key={s.name} style={{ background: '#111e35', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Neighborhood by Activity</h2>

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Outdoor Activities You Love</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {activityOptions.map(a => (
              <button key={a} onClick={() => toggleActivity(a)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: selectedActivities.includes(a) ? '#F5E642' : '#1e3a5f',
                  background: selectedActivities.includes(a) ? '#F5E642' : 'transparent',
                  color: selectedActivities.includes(a) ? '#0A1628' : '#94a3b8' }}>
                {a === 'hiking' ? '🥾 Hiking' : a === 'cycling' ? '🚴 Cycling' : a === 'kayaking' ? '🛶 Kayaking' :
                 a === 'fishing' ? '🎣 Fishing' : a === 'golf' ? '⛳ Golf' : a === 'mountain biking' ? '🚵 MTB' : '🏃 Running'}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Home Budget</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={200000} max={900000} step={10000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642' }} />
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</span>
          </div>

          <button onClick={findNeighborhoods}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Outdoor Neighborhoods
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16 }}>🌿 {results.length} Neighborhoods Match</h2>
            {results.map(n => (
              <div key={n.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{n.name}</h3>
                  <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>{n.trailMiles} trail mi</span>
                </div>
                <p style={{ color: '#94a3b8', marginBottom: 10 }}>{n.highlight}</p>
                <div style={{ fontSize: 13, color: '#94a3b8', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span>🏠 ${n.medianHome.toLocaleString()}</span>
                  <span>💧 {n.lake}</span>
                  <span>⛳ {n.golf} golf courses</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>
                  📍 {n.parks.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

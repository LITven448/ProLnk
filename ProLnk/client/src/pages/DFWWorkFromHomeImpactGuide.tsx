import { useState } from 'react';

const profiles = [
  {
    profile: 'Tech Worker (Full Remote)',
    origin: 'California / Pacific Northwest',
    neighborhoods: ['Frisco', 'Prosper', 'McKinney', 'Allen'],
    features: ['Dedicated home office (separate room)', 'Fast fiber internet (AT&T Fiber coverage)', 'Large backyard + outdoor workspace', 'Walkable coffee shops for focus sessions'],
    avoid: 'Long commute corridors — no longer relevant. Avoid flood zones (more time at home = more risk exposure).',
    budget: '$450K-$750K',
    reason: 'California income stretches 40-60% further in DFW. Tech compensation unchanged, cost of living dramatically lower.',
  },
  {
    profile: 'Hybrid Worker (2-3 days office)',
    origin: 'National / Various',
    neighborhoods: ['Las Colinas', 'Uptown Dallas', 'Addison', 'Plano Legacy'],
    features: ['30-min commute max', 'Quiet home office nook', 'Coworking proximity (for variety)', 'Amenity-rich building (gym, rooftop)'],
    avoid: 'Far outer suburbs — commute days still matter. Focus on I-35 or DART-accessible neighborhoods.',
    budget: '$320K-$520K',
    reason: 'Hybrid workers want flexibility — near enough to office but with real home workspace. Urban-adjacent suburbs win.',
  },
  {
    profile: 'Entrepreneur / Founder (Remote)',
    origin: 'Coast-to-Coast Migration',
    neighborhoods: ['Knox-Henderson', 'Bishop Arts', 'Lakewood', 'Deep Ellum'],
    features: ['Home studio / recording-ready room', 'Fast upload speeds for video calls', 'Walkability for networking', 'Separate entrance for client meetings'],
    avoid: 'Gated communities with HOA restrictions on signage/business activity. Check HOA rules carefully.',
    budget: '$400K-$700K',
    reason: 'No state income tax = up to 13.3% more kept (vs CA). DFW startup ecosystem + zero commute = productivity premium.',
  },
  {
    profile: 'Family (Remote Parent)',
    origin: 'Northeast / Midwest',
    neighborhoods: ['Southlake', 'Keller', 'Flower Mound', 'Coppell'],
    features: ['5-bedroom minimum (office + bedrooms)', 'Pool (DFW summers mandate it)', 'Top-rated school district', 'Neighborhood with sidewalks and parks'],
    avoid: 'Properties without room for both adult work zone and children\’s activity space. Noise management is critical for video calls.',
    budget: '$500K-$900K',
    reason: 'Top-tier schools + large lots + pool + dedicated office — all achievable under $800K in DFW. Impossible on the coasts.',
  },
];

export default function DFWWorkFromHomeImpactGuide() {
  const [selectedProfile, setSelectedProfile] = useState('');
  const [result, setResult] = useState<null | typeof profiles[0]>(null);

  function find() {
    const found = profiles.find(p => p.profile === selectedProfile);
    setResult(found || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW REMOTE WORK MIGRATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Remote Work Impact on DFW Housing — 2026 Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          DFW has been the #1 destination for California-to-Texas migration since 2020. Remote work didn't just relocate people — it fundamentally changed what they buy. Home offices aren't nice-to-have anymore. Pools are expected. Fiber internet is a deal-breaker. Here's the full picture.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '✈️', label: 'CA→TX Migration', value: '95,000/yr', sub: 'Annual California to Texas movers' },
            { icon: '🏠', label: 'Demand for Home Offices', value: '+340%', sub: 'Listings featuring office vs 2019' },
            { icon: '🌐', label: 'Fiber Internet Priority', value: '#2 Factor', sub: 'After school district in buyer surveys' },
            { icon: '🏊', label: 'Pool Demand', value: '+180%', sub: 'Remote workers prioritize outdoor space' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '28px', marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🗺️ DFW Neighborhood Remote Work Heat Map</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { area: 'Frisco / Prosper', score: '🔥🔥🔥🔥🔥', note: 'Top choice for CA tech migrants' },
              { area: 'McKinney / Allen', score: '🔥🔥🔥🔥', note: 'Great schools, large lots, fiber' },
              { area: 'Uptown / Knox', score: '🔥🔥🔥🔥', note: 'Walkable, cowork density, urban' },
              { area: 'Southlake / Keller', score: '🔥🔥🔥🔥🔥', note: 'Families. Top schools. Pool lots.' },
              { area: 'Las Colinas', score: '🔥🔥🔥', note: 'Hybrid workers. Near DFW airport.' },
              { area: 'Bishop Arts / Lakewood', score: '🔥🔥🔥🔥', note: 'Founders. Creative class. Urban.' },
            ].map(a => (
              <div key={a.area} style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '14px 12px' }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{a.area}</div>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{a.score}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{a.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🎯 Match Your Remote Work Profile</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>Tell us your work situation and we'll show you the best DFW neighborhoods and must-have home features for your profile.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your Remote Work Profile</label>
            <select value={selectedProfile} onChange={e => setSelectedProfile(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15 }}>
              <option value=''>Select your profile...</option>
              {profiles.map(p => <option key={p.profile} value={p.profile}>{p.profile}</option>)}
            </select>
          </div>
          <button onClick={find}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
            Find My DFW Match
          </button>
          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📍 Best DFW Neighborhoods</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.neighborhoods.map(n => (
                    <span key={n} style={{ backgroundColor: '#1e3a5f', color: '#F5E642', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{n}</span>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Must-Have Home Features</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {result.features.map(f => (
                    <div key={f} style={{ color: '#94a3b8', fontSize: 14, display: 'flex', gap: 8 }}>
                      <span>✅</span><span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>Target Budget</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.budget}</div>
                </div>
                <div style={{ maxWidth: 360 }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>⚠️ What to Avoid</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{result.avoid}</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💡 Why DFW for Your Profile</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{result.reason}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

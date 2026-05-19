import { useState } from 'react';

const NEIGHBORHOODS = [
  { name: 'Uptown Dallas', walkScore: 92, transit: 'High (DART + streetcar)', bikeScore: 78, priceRange: '$450K–$900K', highlights: 'Restaurants, bars, shops, Katy Trail. Best walkability in DFW by far.', premium: '+18–25% vs Dallas avg' },
  { name: 'Deep Ellum / East Dallas', walkScore: 80, transit: 'Moderate (DART)', bikeScore: 70, priceRange: '$350K–$650K', highlights: 'Bars, music venues, coffee shops, close to downtown. Growing walkability.', premium: '+10–15% vs Dallas avg' },
  { name: 'Bishop Arts (Oak Cliff)', walkScore: 76, transit: 'Low-Moderate', bikeScore: 65, priceRange: '$300K–$550K', highlights: 'Boutiques, restaurants, community feel. Best value walkable neighborhood in Dallas.', premium: '+8–12% vs Dallas avg' },
  { name: 'Legacy West (Plano)', walkScore: 72, transit: 'Low (car or Lyft)', bikeScore: 60, priceRange: '$400K–$750K', highlights: 'Mixed-use: shops, offices, restaurants. DFW suburb walkability done right.', premium: '+10–18% vs Plano avg' },
  { name: 'Sundance Square (Fort Worth)', walkScore: 82, transit: 'Low-Moderate', bikeScore: 55, priceRange: '$280K–$550K', highlights: 'Downtown FW dining and entertainment core. Walkable to events, restaurants, bars.', premium: '+8–14% vs FW avg' },
  { name: 'Typical Suburban DFW', walkScore: 28, transit: 'Very Low (car only)', bikeScore: 35, priceRange: 'Varies', highlights: 'Strip malls, wide roads, no sidewalks. Represents most of DFW suburban development.', premium: 'Baseline' },
];

const LIFESTYLES = ['Daily errands on foot', 'Walk to restaurants / bars', 'Bike commute possible', 'Public transit access', 'Car-free or car-light lifestyle', 'Kids can walk to school'];
const TRANSPORT = ['Full car-dependent (fine with driving)', 'Prefer walkable but have car', 'Want to reduce driving', 'Minimal car use preferred', 'No car / car-free'];

function rank(lifestyle: string, transport: string) {
  if (transport === 'No car / car-free' || transport === 'Minimal car use preferred') {
    return [NEIGHBORHOODS[0], NEIGHBORHOODS[1], NEIGHBORHOODS[4]];
  }
  if (lifestyle === 'Walk to restaurants / bars' || lifestyle === 'Daily errands on foot') {
    return [NEIGHBORHOODS[0], NEIGHBORHOODS[2], NEIGHBORHOODS[3]];
  }
  if (lifestyle === 'Bike commute possible') {
    return [NEIGHBORHOODS[0], NEIGHBORHOODS[1], NEIGHBORHOODS[2]];
  }
  return [NEIGHBORHOODS[0], NEIGHBORHOODS[3], NEIGHBORHOODS[4]];
}

export default function DFWWalkingDistanceGuide() {
  const [lifestyle, setLifestyle] = useState('');
  const [transport, setTransport] = useState('');
  const [results, setResults] = useState<typeof NEIGHBORHOODS | null>(null);

  function calculate() {
    if (!lifestyle || !transport) return;
    setResults(rank(lifestyle, transport));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Walkability Guide for DFW Neighborhoods</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          DFW is car-dependent — but walkable pockets exist and command a significant home value premium. Here's where they are and what they cost.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🚶 DFW Walkability Rankings</h2>
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} style={{ borderBottom: '1px solid #1E2F4A', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{n.name}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>Walk: {n.walkScore}/100</div>
              </div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 4 }}>
                🚌 Transit: {n.transit} &nbsp;|&nbsp; 🚲 Bike: {n.bikeScore}/100
              </div>
              <div style={{ fontSize: 13, color: '#4ADE80', marginBottom: 4 }}>💰 {n.priceRange} — {n.premium}</div>
              <div style={{ fontSize: 12, color: '#6B7FA0′ }}>{n.highlights}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>💡 Walkability & Home Value in DFW</h2>
          <p style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 0 }}>
            Walkable DFW neighborhoods command an 8–25% price premium over comparable suburban homes. The premium is highest in Uptown Dallas and Legacy West — both of which saw values grow faster than DFW average during 2020–2024. As DFW grows (adding ~100K people/year), walkable urban nodes are becoming increasingly valuable. If you can afford the entry price, walkable DFW neighborhoods historically outperform in appreciation.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Find Your Best DFW Neighborhood</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Most Important Lifestyle Priority</label>
              <select value={lifestyle} onChange={(e) => setLifestyle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select priority</option>
                {LIFESTYLES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Transportation Preference</label>
              <select value={transport} onChange={(e) => setTransport(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select preference</option>
                {TRANSPORT.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get My Neighborhood Matches →
            </button>
          </div>
          {results && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642′ }}>🏆 Top 3 DFW Neighborhoods for You</div>
              {results.map((n, i) => (
                <div key={n.name} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10, borderLeft: `4px solid ${i === 0 ? '#F5E642' : '#1E2F4A'}` }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>#{i + 1} {n.name} — Walk Score {n.walkScore}</div>
                  <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 {n.priceRange} ({n.premium})</div>
                  <div style={{ fontSize: 12, color: '#6B7FA0′ }}>{n.highlights}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          Walk Scores are approximate. Visit each neighborhood at different times of day to assess real walkability before buying.
        </div>
      </div>
    </div>
  );
}

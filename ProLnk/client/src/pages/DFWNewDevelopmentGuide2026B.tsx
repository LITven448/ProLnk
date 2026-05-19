import { useState } from 'react';

const communities = [
  { id: 'painted', name: 'Painted Tree', city: 'McKinney', emoji: '🌳', price: '$450K–$750K', lifestyle: ['family', 'nature'], features: ['5,000+ acres of preserved green space', 'Miles of hiking & biking trails', 'Top-rated McKinney ISD schools', 'On-site recreation center', 'Homes from 1,800–4,500 sqft'] },
  { id: 'walsh', name: 'Walsh Ranch', city: 'Fort Worth', emoji: '🤠', price: '$380K–$680K', lifestyle: ['outdoor', 'community'], features: ['600 acres of open space', 'Private K-8 Walsh STEM Academy', 'Lazy river & resort pools', 'Regular food truck events', 'Western heritage aesthetic'] },
  { id: 'lightfarms', name: 'Light Farms', city: 'Celina', emoji: '☀️', price: '$500K–$900K', lifestyle: ['luxury', 'amenities'], features: ['Multiple resort-style pools', 'On-site elementary school', 'Pickleball & tennis courts', 'Dog parks + walking trails', 'Celina ISD (growing fast)'] },
  { id: 'startrail', name: 'Star Trail', city: 'Prosper', emoji: '⭐', price: '$550K–$950K', lifestyle: ['luxury', 'schools'], features: ['Prosper ISD (top 5 in TX)', 'Lazy river + fitness center', 'Walking distance to shopping', 'Larger lots (65–80 ft)', 'Active HOA community events'] },
];

const lifestyleOptions = [
  { id: 'family', label: 'Top Schools', emoji: '🎓' },
  { id: 'nature', label: 'Nature & Trails', emoji: '🌲' },
  { id: 'luxury', label: 'Luxury Amenities', emoji: '🏊' },
  { id: 'community', label: 'Community Events', emoji: '🎉' },
  { id: 'outdoor', label: 'Outdoor Living', emoji: '⛰️' },
];

export default function DFWNewDevelopmentGuide2026B() {
  const [filter, setFilter] = useState('');
  const filtered = filter ? communities.filter(c => c.lifestyle.includes(filter)) : communities;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🏘️</div>
          <h1 style={{ fontSize: 27, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW New Development Communities 2026 — Part 2</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>4 master-planned communities still under active development. Filter by your lifestyle priority.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
          <button onClick={() => setFilter('')} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: !filter ? '#F5E642′ : '#1e3a5f', color: !filter ? '#0A1628' : '#94a3b8' }}>All</button>
          {lifestyleOptions.map(l => (
            <button key={l.id} onClick={() => setFilter(l.id)}
              style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: filter === l.id ? '#F5E642′ : '#1e3a5f', color: filter === l.id ? '#0A1628' : '#94a3b8' }}>
              {l.emoji} {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: '#1e3a5f', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: '#F5E642', margin: 0 }}>{c.emoji} {c.name}</h2>
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: '2px 0′ }}>{c.city}, TX</p>
                </div>
                <span style={{ background: '#0A1628', color: '#F5E642', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 700 }}>{c.price}</span>
              </div>
              {c.features.map((f, i) => (
                <div key={i} style={{ fontSize: 14, color: '#cbd5e1', padding: '4px 0′ }}>• {f}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🔑 ProLnk New Build Advantage</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>New construction means new contractors. ProLnk connects you with vetted local pros for upgrades, fence installs, landscaping, and warranty repairs — all logged in your Home Health Vault from day one.</p>
        </div>
      </div>
    </div>
  );
}

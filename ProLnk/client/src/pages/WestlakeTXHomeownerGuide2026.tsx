import { useState } from 'react';

export default function WestlakeTXHomeownerGuide2026() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    {
      id: 'medium',
      label: '🏡 Estate (5,000–8,000 sq ft)',
      color: '#F5E642',
      desc: 'Entry-level Westlake estate, $2M–$4M range, private road community',
      tips: [
        '🏗️ Structural engineering inspection annually — custom builds require PE sign-off',
        '🌿 Professional landscaping plan — Westlake curb standards are strictly enforced',
        '⚡ 200A–400A panel assessment — estates need capacity for home office and EV charging',
        '💧 Private road drainage coordination — shared infrastructure maintenance requires agreement',
        '🔐 Perimeter security system — gated Westlake expects full camera and access control',
        '🌡️ Zoned HVAC with air quality monitoring — 5,000+ sq ft demands room-level control',
      ],
    },
    {
      id: 'large',
      label: '🏰 Grand Estate (8,000–15,000 sq ft)',
      color: '#8B5CF6',
      desc: 'Westlake flagship homes, $4M–$8M, resort-level amenities standard',
      tips: [
        '🏊 Pool and spa automation — Westlake estates require resort-grade equipment rooms',
        '🎬 Home theater and AV infrastructure — specialty AV contractors required for this scale',
        '🌳 Arborist contract — large lot tree health directly impacts $4M+ property values',
        '🔧 Whole-home generator with auto-transfer — estates cannot tolerate power interruption',
        '🧹 Estate housekeeping systems — HVAC filtration, air purification, and humidity control',
        '🚗 4-car garage and motor court — drainage, epoxy, and lift installation requires specialists',
      ],
    },
    {
      id: 'ultra',
      label: '🏯 Ultra Estate (15,000+ sq ft)',
      color: '#EF4444',
      desc: 'Top 1% of Westlake, $8M+, Fidelity executive and tech founder tier',
      tips: [
        '🏗️ Quarterly structural report — ultra estates require ongoing PE monitoring',
        '⚡ 800A+ commercial-grade electrical — data centers, car lifts, and entertainment demand it',
        '🌿 Full-time grounds crew coordination — multiple acre lots need year-round management',
        '🔐 Enterprise security infrastructure — biometric, CCTV, and remote monitoring mandatory',
        '🛁 Spa and wellness room maintenance — steam, sauna, and cold plunge require specialty service',
        '📋 Private road and gate maintenance contract — HOA-like coordination at private level',
      ],
    },
  ];

  const selected = sizes.find(s => s.id === selectedSize);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💎</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Westlake TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>One of the wealthiest communities in the US — maintenance at this level requires a different tier of contractor</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>Westlake TX has the highest per-capita income of any incorporated town in the United States. Anchored by Fidelity Investments' regional campus and bordered by Southlake and Keller, Westlake estates average $3.5M and sit on private roads maintained by homeowner associations. Every trade here requires elite credentialing, deep insurance, and experience at this scale.</p>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Estate Size</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {sizes.map(s => (
            <button key={s.id} onClick={() => setSelectedSize(s.id)} style={{ background: selectedSize === s.id ? s.color : '#0D1F3C', border: `2px solid ${s.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedSize === s.id ? '#0A1628' : '#fff', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{s.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — Westlake Maintenance Scope</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 ProLnk maintains a curated network of Westlake-cleared contractors — fully insured, estate-experienced, and background verified to the level this community demands.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

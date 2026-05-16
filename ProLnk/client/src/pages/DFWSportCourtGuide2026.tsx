import { useState } from 'react';

const courts = [
  { sport: 'Basketball', icon: '🏀', minSqFt: 1800, tips: ['Standard half-court: 30x30 ft (900 sq ft); full court: 50x94 ft requires large lot', 'Concrete is best for DFW — acrylic coating over concrete resists heat cracking better than asphalt', 'Acrylic surfaces fade faster in DFW sun; recoat every 3–5 years', 'Lights require permit in most DFW cities; check HOA rules first', 'Grade court to drain 1% slope — DFW clay soil causes pooling without proper drainage'] },
  { sport: 'Pickleball', icon: '🏓', minSqFt: 800, tips: ['Court size: 20x44 ft (880 sq ft) — most DFW lots can accommodate', 'Acrylic over concrete is standard; add cushion layer for joint protection', 'Portable nets make permitting easier — avoid permanent fence enclosures without approval', 'Line paint: use 100% acrylic court paint rated for UV; DFW sun fades cheaper paint in one season', 'Noise ordinance consideration: pickleball paddle impact is louder than expected; check local rules'] },
  { sport: 'Tennis', icon: '🎾', minSqFt: 7200, tips: ['Full court: 60x120 ft — requires 7,200+ sq ft; most DFW residential lots cannot fit without dominating yard', 'Post-tension concrete recommended for DFW clay soil movement', 'Lights and permanent fencing require permits; fence height limits apply (typically 8 ft in residential)', 'Budget $40,000–$80,000 installed; smaller practice court (30x60 ft) is viable alternative', 'HOA approval almost always required for tennis courts in DFW subdivisions'] },
  { sport: 'Multi-Sport', icon: '🏐', minSqFt: 1200, tips: ['Combination basketball + pickleball lines on one court is most popular DFW option', 'Rubber modular tiles are heat-resistant alternatives to acrylic; easier DIY installation', 'DFW summer heat makes dark surfaces (black rubber) dangerously hot — choose lighter colors', 'Budget $8,000–$20,000 for a 30x50 ft multi-sport court installed', 'Add shade structure or pergola nearby — courts are unusable in direct DFW summer sun without shade'] },
];

export default function DFWSportCourtGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = courts.find(c => c.sport === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Sport Court Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            Backyard sport courts in DFW — surface choices, heat impact, permits, and noise rules. Select your sport to see what your lot needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
          {courts.map(c => (
            <button key={c.sport} onClick={() => setSelected(c.sport === selected ? null : c.sport)}
              style={{ background: selected === c.sport ? '#F5E642' : '#1a2a42', border: '2px solid', borderColor: selected === c.sport ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '18px 10px', cursor: 'pointer', color: selected === c.sport ? '#0A1628' : '#fff', fontWeight: 700, fontSize: 14, transition: 'all .2s' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{c.icon}</div>
              {c.sport}
              <div style={{ fontSize: 11, marginTop: 6, opacity: 0.8 }}>Min {c.minSqFt.toLocaleString()} sq ft</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.sport} Court — DFW Feasibility Guide</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              {active.tips.map((t, i) => <li key={i} style={{ color: '#dde' }}>{t}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a2a42', borderRadius: 12, padding: 24, marginTop: 28 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🌡️ DFW Heat Impact on Surfaces</h3>
          <p style={{ color: '#aab', lineHeight: 1.7 }}>DFW summer temperatures regularly hit 100°F+. Dark asphalt and rubber surfaces can reach 140–160°F — dangerously hot for bare feet and accelerating surface degradation. Choose light-colored acrylic or cushioned modular tiles and plan for shade structures.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Free Sport Court Quotes from DFW Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}
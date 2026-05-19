import { useState } from 'react';

const hipRidgeConcerns = [
  { id: 'hipIntersection', label: 'Hip intersection — two slopes meeting', guide: 'Hip intersections require a continuous valley of hip cap shingles nailed at each side. In DFW, use 6-nail pattern for hip caps in high-wind zones. Each cap must overlap the previous by the manufacturer spec (usually 5–6 inches). Improper overlap = blow-off in 70+ mph storms.' },
  { id: 'ridgeLine', label: 'Ridge line — peak of roof', guide: 'Ridge cap must be installed over the last course of field shingles with a 6-inch headlap. In DFW, ventilated ridge caps (with ridge vent cut below) are standard for attic ventilation. Ridge caps should be nailed through into the ridge board — not just the sheathing.' },
  { id: 'flashing', label: 'Flashing at intersections', guide: 'All hip and ridge intersections should be sealed with roofing cement at the termination points. DFW hailstorms expose failed termination points — check after every large storm. Step flashing is used where roof meets wall; it is not optional.' },
  { id: 'hipCap', label: 'Hip cap installation for DFW wind', guide: 'Cut hip caps from 3-tab or use pre-bent hip and ridge shingles. Face nail each cap with 2 nails per side — 4 nails total — in the nailing zone. Exposure for hip caps: 5 inches. In DFW 130 mph zones, some contractors nail 6 per cap for added uplift resistance.' },
];

export default function DFWRoofingHipRidgeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = hipRidgeConcerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW Roofing Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW Hip and Ridge Roofing Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>The critical intersection zones in Dallas-Fort Worth roofing — proper installation, flashing, and wind-rated hip cap techniques.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏔️ Hip vs. Ridge — Key Differences</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>The ridge is the horizontal peak at the top of a gabled roof. The hip is the angled intersection where two sloped roof planes meet at an exterior corner. Both are critical failure points in DFW severe weather — they are the last line of defense where water infiltrates if improperly sealed.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>🔺 Hip: diagonal intersection — requires hip cap shingles</li>
            <li>➖ Ridge: horizontal peak — uses ridge cap over ridge vent</li>
            <li>🌧️ Both must be flashed at termination points</li>
            <li>💨 DFW 130 mph zone: enhanced nailing pattern required</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW Storm Vulnerability at Hips and Ridges</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>Post-hail and severe thunderstorm inspections in DFW consistently show hip cap blow-off as the most common failure. Under-nailed caps, improper overlap, and missing roofing cement at cap terminations account for the majority of these failures. A properly installed DFW roof should survive 130 mph straight-line winds without hip or ridge failure.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: Hip/Ridge Concern → Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {hipRidgeConcerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#1a3a5c', color: selected === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {c.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Hip/Ridge Guide:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Find a DFW Roofing Pro Today</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted roofers who know DFW wind zone requirements. Free quotes.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}
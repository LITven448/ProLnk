import { useState } from 'react';

const situations = [
  { id: 'heat-walk', label: '⚠️ Need to inspect roof in heat', action: 'Never walk a shingle roof above 80°F — shingles soften and footsteps cause granule loss and cracking. Use binoculars from ground or hire a pro. DFW roofs hit 160-180°F surface temp in July.' },
  { id: 'attic-vent', label: '🌬️ Checking attic ventilation', action: 'From attic: look for daylight at ridge and soffits. Blocked soffits (insulation pushed over) = heat and moisture trap. Smell musty? Moisture is accumulating. Proper ventilation = 1 sq ft vent per 150 sq ft attic floor.' },
  { id: 'pipe-boot', label: '🔭 Pipe boot inspection from ground', action: 'Use binoculars from ground — look for rubber collar around all plumbing pipes. Cracked or missing collar = open leak point. In DFW UV, rubber boots last 8-12 years. If 2015 or older roof = inspect every spring.' },
  { id: 'branches', label: '🌳 Branches near roof', action: 'Any branch within 3 feet causes abrasion damage during wind (DFW averages 15-20 mph gusts daily in summer). Scraping removes granules — granules are the UV protection. Trim now before storm season.' },
  { id: 'moss', label: '🟢 Moss or algae streaks', action: 'Dark streaks = Gloeocapsa magma algae (common in humid DFW summers). Not immediately structural but indicates moisture retention. Zinc strip at ridge solves long-term. Short-term: low-pressure 50/50 bleach + water spray (avoid plants).' },
];

export default function DFWRoofingDFWSummer2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏚️ DFW ROOFING SUMMER 2026 — PART 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Advanced DFW Summer Roofing Actions</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Part 2 advanced guide. DFW roofs face UV, 100°F+ heat, hail, and wind simultaneously. Ground-level inspection and attic checks can catch 80% of issues without walking the roof.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ DFW Roof Summer Reality</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Surface temps of 160-180°F soften asphalt shingles daily. This thermal cycling accelerates granule loss 3x faster than northern climates. DFW shingle roofs have a practical life of 15-20 years vs 25-30 year ratings.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#112240',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#e2e8f0', lineHeight: 1.75, fontSize: 15 }}>{match.action}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>📋 Advanced Summer Roofing Checklist</h3>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
            <li>Never walk roof above 80°F — binoculars from ground instead</li>
            <li>Inspect attic ventilation — check for blocked soffits from inside</li>
            <li>Check pipe boots with binoculars (priority on 10+ year roofs)</li>
            <li>Trim branches within 3 feet of any roof surface</li>
            <li>Document algae or moss streaks — treat before storm season</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏠 ProLnk Charter roofers cover all DFW metro</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk.io — Waitlist open, hail season response ready</p>
        </div>
      </div>
    </div>
  );
}
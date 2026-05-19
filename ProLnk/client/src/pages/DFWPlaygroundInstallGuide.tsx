import { useState } from 'react';

const EQUIPMENT_TYPES = [
  { id: 'wood', label: '🪵 Wood/Cedar Structure', note: 'Classic look, naturally cooler to touch than metal, requires annual sealing in DFW heat/rain cycles', costLow: 3000, costHigh: 12000 },
  { id: 'metal', label: '⚠️ Metal Structure', note: 'DANGEROUS IN DFW SUMMER — metal surfaces reach 180°F+ in direct sun. Only consider powder-coated steel with full shade coverage.', costLow: 2000, costHigh: 8000 },
  { id: 'plastic', label: '🟢 Plastic/HDPE Composite', note: 'Heat-resistant, splinter-free, UV-stabilized — best choice for DFW sun exposure, low maintenance', costLow: 4000, costHigh: 15000 },
];

const GROUND_COVERS = [
  { id: 'rubber', label: '🔴 Rubber Mulch', costPer100sqft: 220, note: 'Best for DFW — doesn\’t decompose in heat, won\’t wash in flash floods, ASTM F1292 impact rated' },
  { id: 'peagravel', label: '🪨 Pea Gravel', costPer100sqft: 80, note: 'Affordable but migrates in rain, can be a tripping hazard, requires edging containment' },
  { id: 'woodmulch', label: '🟫 Wood Mulch', costPer100sqft: 60, note: 'Cheapest option — decomposes faster in DFW heat, harbors insects, requires annual top-up' },
  { id: 'turf', label: '🟩 Artificial Turf', costPer100sqft: 380, note: 'Premium look, stays in place, but surface temps reach 150°F+ — shade is non-negotiable with turf' },
];

const AGE_GROUPS = [
  { label: 'Toddlers (2–4)', equipment: 'Low slide, sensory panels, spring riders, sandbox — max 24" deck height' },
  { label: 'Preschool (3–5)', equipment: 'Slides up to 36", small climbing wall, playhouse, swings with bucket seats' },
  { label: 'Elementary (5–12)', equipment: 'Full slide, rope ladder, monkey bars, 2-3 swings, rockwall, overhead bars' },
  { label: 'Mixed Ages (2–12)', equipment: 'Multi-deck structure with graduated challenges — separate toddler bay recommended' },
];

export default function DFWPlaygroundInstallGuide() {
  const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[2]);
  const [equipment, setEquipment] = useState(EQUIPMENT_TYPES[2]);
  const [groundCover, setGroundCover] = useState(GROUND_COVERS[0]);
  const [yardSize, setYardSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hasShade, setHasShade] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const yardSqft = yardSize === 'small' ? 150 : yardSize === 'medium' ? 300 : 500;
  const groundCost = Math.round((yardSqft / 100) * groundCover.costPer100sqft);
  const shadeCost = hasShade ? 0 : 2800;
  const totalLow = equipment.costLow + groundCost + (hasShade ? 0 : shadeCost);
  const totalHigh = equipment.costHigh + groundCost + (hasShade ? 0 : shadeCost);

  const metalWarning = equipment.id === 'metal' && !hasShade;
  const turfWarning = groundCover.id === 'turf' && !hasShade;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🛝 DFW PLAYGROUND INSTALL GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Backyard Playground Installation in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW summer heat makes material selection critical. Metal structures and dark ground cover can cause serious burns. Build it right for Texas.</p>

        <div style={{ background: '#ef444420', border: '2px solid #ef4444', borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <h2 style={{ color: '#ef4444', fontSize: 16, marginBottom: 8 }}>🚨 DFW Heat Danger: Metal Gets Lethal</h2>
          <p style={{ color: '#fca5a5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>In June–August, DFW reaches 104°F+ air temperature. Metal playground surfaces (slides, bars, poles) can reach 150–180°F in direct sunlight — hot enough to cause second-degree burns in under 3 seconds. If you install a metal structure, it MUST have complete shade coverage before first use. Plastic/HDPE composite structures are the safest choice for DFW.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>👶 Age Group Recommendations</h2>
          {AGE_GROUPS.map(a => (
            <div key={a.label} onClick={() => setAgeGroup(a)} style={{ background: ageGroup.label === a.label ? '#1e3a5f' : '#0A1628', border: `2px solid ${ageGroup.label === a.label ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{a.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{a.equipment}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🏗️ Equipment Material</h2>
          {EQUIPMENT_TYPES.map(e => (
            <div key={e.id} onClick={() => setEquipment(e)} style={{ background: equipment.id === e.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${equipment.id === e.id ? (e.id === 'metal' ? '#ef4444' : '#F5E642') : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{e.label}</span>
                <span style={{ color: '#F5E642', fontSize: 13 }}>${e.costLow.toLocaleString()}–${e.costHigh.toLocaleString()}</span>
              </div>
              <div style={{ color: e.id === 'metal' ? '#fca5a5' : '#94a3b8', fontSize: 13 }}>{e.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🌿 Ground Cover</h2>
          {GROUND_COVERS.map(g => (
            <div key={g.id} onClick={() => setGroundCover(g)} style={{ background: groundCover.id === g.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${groundCover.id === g.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{g.label}</span>
                <span style={{ color: '#F5E642', fontSize: 13 }}>${g.costPer100sqft}/100sqft</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{g.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔢 Cost Estimator</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Play Area Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {(['small', 'medium', 'large'] as const).map(s => (
              <div key={s} onClick={() => setYardSize(s)} style={{ background: yardSize === s ? '#1e3a5f' : '#0A1628', border: `2px solid ${yardSize === s ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, cursor: 'pointer', textAlign: 'center', fontWeight: 600 }}>
                {s === 'small' ? '🏘️ 150 sqft' : s === 'medium' ? '🏡 300 sqft' : '🏰 500 sqft'}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <input type="checkbox" id="shade" checked={hasShade} onChange={e => setHasShade(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            <label htmlFor="shade" style={{ color: '#cbd5e1', cursor: 'pointer' }}>I already have adequate shade coverage over this area</label>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Build My Cost Estimate
          </button>
          {showResult && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: '2px solid #F5E642' }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642', marginBottom: 8 }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{equipment.label} structure + {groundCover.label} ({yardSqft} sqft){!hasShade ? ' + shade sail/pergola (~$2,800)' : ''}.</div>
              {metalWarning && <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🚨 Metal structure without shade — DO NOT install until shade is in place. Burn risk is severe.</div>}
              {turfWarning && <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>⚠️ Artificial turf without shade reaches 150°F+ — shade structure required.</div>}
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>Recommended for {ageGroup.label}: {ageGroup.equipment}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>✅ DFW Safety Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              'Shade covers all play surfaces before first use',
              'Ground cover is 12" deep under slides and swings',
              'No equipment within 6 ft of fences or walls',
              'All hardware is stainless or galvanized (humidity)',
              'Check surface temps before letting kids play',
              'Annual inspection — DFW freeze/thaw loosens hardware',
              'Anchor posts 24"+ deep in DFW clay soil',
              'Permit check: most cities require if over 200 sqft',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#0A1628', borderRadius: 8, padding: 10 }}>
                <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

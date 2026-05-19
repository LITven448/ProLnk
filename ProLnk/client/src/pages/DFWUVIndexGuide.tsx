import { useState } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const uvData = [3, 5, 7, 9, 10, 11, 11, 10, 9, 7, 4, 3];

const materials = [
  {
    name: 'Exterior Paint',
    icon: '🎨',
    degradeRate: 'High — 20–30% faster than Chicago or NYC',
    signs: 'Fading, chalking, peeling at edges and south-facing surfaces first',
    dfwLife: '4–6 years (quality exterior)',
    northernLife: '7–10 years (same paint)',
    maintenance: 'Power wash + inspect annually. Repaint at first sign of chalking, not after peeling.',
    uvResistant: ['100% acrylic latex with UV inhibitors (Sherwin-Williams Duration, Benjamin Moore Aura)', 'Elastomeric coatings for stucco surfaces', 'Lighter colors reflect UV; dark colors absorb and degrade faster'],
  },
  {
    name: 'Wood (Deck/Fence)',
    icon: '🪵',
    degradeRate: 'Extreme — DFW UV + heat bleaches and cracks wood rapidly',
    signs: 'Graying within 6 months unsealed, cracking and checking within 1 year',
    dfwLife: '2–3 years unsealed before damage; 4–6 years with annual treatment',
    northernLife: '5–7 years before same damage level',
    maintenance: 'Seal every 1–2 years. Strip and reseal when water no longer beads.',
    uvResistant: ['Cedar and redwood are more UV-resistant than pine', 'Composite decking (Trex, TimberTech) rated for DFW UV', 'Oil-based sealers penetrate better than film-forming in DFW heat'],
  },
  {
    name: 'Asphalt Shingles',
    icon: '🏠',
    degradeRate: 'Moderate-High — DFW UV accelerates granule loss',
    signs: 'Granules in gutters, shiny/bald patches visible, edges curl up on south slope',
    dfwLife: '15–20 years (30-year shingle)',
    northernLife: '25–30 years (same shingle in Zone 5)',
    maintenance: 'Inspect south slope annually with binoculars. Granule loss = 30–50% life remaining.',
    uvResistant: ['Class 4 impact-resistant shingles also have better UV ratings', 'Metal roofing eliminates UV degradation concern entirely', 'Cool-roof rated shingles (Energy Star) reflect UV and reduce attic heat'],
  },
  {
    name: 'Vinyl (Siding/Trim)',
    icon: '🏗️',
    degradeRate: 'Moderate — fading and brittleness from UV exposure',
    signs: 'Color fading (especially dark colors), brittleness, cracking when impacted',
    dfwLife: '15–20 years before significant fading',
    northernLife: '20–30 years',
    maintenance: 'Cannot be repainted effectively. Full replacement when faded.',
    uvResistant: ['Lighter vinyl colors degrade more slowly in DFW', 'Fiber cement (HardiePlank) is dramatically more UV-stable', 'UV-stabilized vinyl specifically rated for southern climates'],
  },
  {
    name: 'Plastics & Rubber',
    icon: '⚙️',
    degradeRate: 'High — outdoor plastics and rubber seals degrade within 3–5 years',
    signs: 'Cracking, brittleness, color change; rubber seals shrink and crack',
    dfwLife: '3–5 years for standard outdoor plastics',
    northernLife: '8–12 years',
    maintenance: 'Check irrigation fittings, hose bibb washers, and door/window seals annually.',
    uvResistant: ['UV-stabilized HDPE or PVC fittings for irrigation', 'EPDM rubber gaskets last longer than standard rubber in DFW', 'Apply rubber protectant (303 Aerospace) to extend garage door seal life'],
  },
  {
    name: 'Caulk & Sealants',
    icon: '🔧',
    degradeRate: 'High — DFW UV + thermal cycling destroys standard caulk fast',
    signs: 'Cracking, shrinking, pulling away from surface, discoloration',
    dfwLife: '2–4 years (standard caulk)',
    northernLife: '5–8 years',
    maintenance: 'Inspect all exterior caulk every spring. Failed caulk = water infiltration.',
    uvResistant: ['NP1 polyurethane or silicone caulk for exterior use', 'Avoid acrylic latex caulk on exterior in DFW — cracks within 2 years', 'Apply only in shade, when temps below 90°F'],
  },
];

const getUvRisk = (uv: number) => {
  if (uv < 3) return { label: '🟢 Low', color: '#00e400′ };
  if (uv < 6) return { label: '🟡 Moderate', color: '#ffff00′ };
  if (uv < 8) return { label: '🟠 High', color: '#ff7e00′ };
  if (uv < 11) return { label: '🔴 Very High', color: '#ff0000′ };
  return { label: '🟣 Extreme', color: '#8f3f97′ };
};

export default function DFWUVIndexGuide() {
  const [month, setMonth] = useState(6);
  const [matIdx, setMatIdx] = useState(0);
  const mat = materials[matIdx];
  const uv = uvData[month];
  const risk = getUvRisk(uv);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>☀️ UV Index Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            DFW receives UV Index 9–11 (Very High to Extreme) from April through September — significantly higher than
            northern markets. This accelerates the degradation of every exterior material on your home. Understanding
            DFW UV exposure is the key to proper material selection and maintenance timing.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📅 DFW UV Index by Month</h2>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            {uvData.map((u, i) => {
              const r = getUvRisk(u);
              return (
                <div key={i} onClick={() => setMonth(i)} style={{ flex: 1, cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ background: r.color, borderRadius: '4px 4px 0 0', height: `${u * 6}px`, border: i === month ? '2px solid #fff' : 'none' }} />
                  <div style={{ color: '#94a3b8', fontSize: '0.6rem', marginTop: 2 }}>{months[i].slice(0,1)}</div>
                  <div style={{ color: '#F5E642', fontSize: '0.7rem', fontWeight: 700 }}>{u}</div>
                </div>
              );
            })}
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: risk.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: '1.2rem' }}>{uv}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{months[month]} — UV Index {uv}: {risk.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                {uv >= 8 ? 'Peak UV season. Exterior materials under maximum stress. Schedule inspections now.' : uv >= 6 ? 'Significant UV load. Good time for exterior maintenance before peak season.' : 'Lower UV. Ideal time for exterior painting, sealing, and repairs.'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>🏠 UV Degradation by Exterior Material</h2>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {materials.map((m, i) => (
              <button key={m.name} onClick={() => setMatIdx(i)}
                style={{ padding: '0.4rem 0.8rem', borderRadius: 20, border: i === matIdx ? '2px solid #F5E642′ : '2px solid #2d4a7a', background: i === matIdx ? '#F5E642' : ’transparent', color: i === matIdx ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer', fontSize: '0.78rem' }}>
                {m.icon} {m.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.25rem' }}>{mat.icon} {mat.name}</div>
            <div style={{ color: '#ff7e00', fontSize: '0.85rem', marginBottom: '1rem' }}>⚡ {mat.degradeRate}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.65rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ color: '#F5E642', fontSize: '0.7rem', fontWeight: 700, marginBottom: 3 }}>DFW LIFESPAN</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{mat.dfwLife}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.65rem', borderLeft: '3px solid #475569′ }}>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, marginBottom: 3 }}>NORTHERN MARKET</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{mat.northernLife}</div>
              </div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong style={{ color: '#fff' }}>Signs of UV damage: </strong>{mat.signs}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}><strong style={{ color: '#fff' }}>Maintenance: </strong>{mat.maintenance}</div>
            <div style={{ borderTop: '1px solid #2d4a7a', paddingTop: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>🛡️ UV-Resistant Alternatives</div>
              {mat.uvResistant.map(r => <div key={r} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>• {r}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📋 DFW Exterior Maintenance Calendar</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {[
              { month: 'February–March', task: 'Inspect and repaint/seal before UV peaks. Best window for exterior work.', icon: '🎨' },
              { month: 'April–May', task: 'Last chance for exterior painting before heat makes application difficult.', icon: '⏰' },
              { month: 'June–September', task: 'Monitor only. Avoid painting in heat. Check for UV damage from ground.', icon: '👀' },
              { month: 'October–November', task: 'Inspect all UV-damaged materials. Replace caulk. Seal wood before winter.', icon: '🔧' },
            ].map(r => (
              <div key={r.month} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.65rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#F5E642′ }}>{r.month}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{r.task}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const LOCATIONS = ['Floor', 'Wall', 'Shower/Wet area'];
const CONDITIONS = ['Good (minor discoloration)', 'Fair (cracking/crumbling sections)', 'Poor (missing chunks, moisture damage)'];
const AREAS = [
  { label: '< 10 sq ft (small repair)', sqft: 8 },
  { label: '10–30 sq ft (bathroom floor)', sqft: 20 },
  { label: '30–60 sq ft (full bathroom)', sqft: 45 },
  { label: '60+ sq ft (multi-room)', sqft: 80 },
];

function getRecommendation(location: string, condition: string, sqft: number) {
  const isShower = location === 'Shower/Wet area';
  const isFloor = location === 'Floor';
  const isPoor = condition.startsWith('Poor');
  const isFair = condition.startsWith('Fair');

  const groutType = isShower ? 'Epoxy grout (Laticrete SpectraLOCK)' : isFloor ? 'Sanded cement grout (Mapei Keracolor S)' : 'Unsanded cement grout (Mapei Ultracolor Plus)';
  const sealer = isShower ? 'Aqua Mix Sealer\’s Choice Gold — apply 72 hrs after grout cures' : 'Aqua Mix Sealer\’s Choice — DFW hard water etches unsealed grout fast';
  const diyVsPro = isPoor ? 'pro' : sqft > 45 ? 'borderline' : 'diy';
  const bags = Math.ceil(sqft / 25);
  const hours = sqft < 20 ? 3 : sqft < 50 ? 6 : 10;
  const cost = bags * 22 + (isShower ? 35 : 15) + (isPoor || isFair ? 40 : 10);
  return { groutType, sealer, diyVsPro, bags, hours, cost };
}

export default function DFWDIYTileGroutGuide() {
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [areaIdx, setAreaIdx] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const ready = location && condition && areaIdx >= 0;
  const area = areaIdx >= 0 ? AREAS[areaIdx] : null;
  const rec = ready && area ? getRecommendation(location, condition, area.sqft) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔲</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Tile Grout Repair Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Remove, replace, and seal grout the right way — DFW hard water and humidity demand the correct grout type and sealing schedule.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>⚠️ DFW Hard Water Warning</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>DFW water hardness averages 15–20 grains per gallon (very hard). Unsealed grout absorbs mineral deposits and turns orange or brown within months. Always seal grout in DFW — even floor grout outside wet areas.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🛠️ Removing Old Grout</h2>
          {[
            ['Oscillating tool (best)', 'Dremel or Fein Multimaster with grout blade — fast, precise, low tile-chip risk'],
            ['Manual grout saw', 'Works for small areas; tiring for anything over 5 sq ft'],
            ['Angle grinder (avoid DIY)', 'High risk of cracking tiles — leave to pros for large floor jobs'],
            ['Depth rule', 'Remove at least 2/3 of grout depth — surface scratching won\’t bond properly'],
          ].map(([method, detail]) => (
            <div key={method} style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{method}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🧪 Grout Type Guide for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Epoxy Grout', 'Showers, wet rooms', 'Stain-proof, DFW hard water won\’t etch it, no sealing needed — harder to apply'],
              ['Sanded Cement', 'Floor joints > 1/8"', 'Strong under foot traffic, seal every 1–2 years in DFW'],
              ['Unsanded Cement', 'Wall tiles, joints < 1/8"', 'Smooth finish, scratches glass tiles — must seal in DFW'],
              ['Premixed Latex', 'Backsplashes only', 'Easy application, never use in wet areas — not DFW humidity rated'],
            ].map(([type, use, note]) => (
              <div key={type} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{type}</div>
                <div style={{ color: '#fff', fontSize: 13, marginBottom: 4 }}>Use: {use}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>💧 Sealing Schedule for DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>DFW's hard water accelerates mineral penetration. Seal more frequently than package directions suggest:</p>
          {[
            ['Shower floor/walls', 'Seal at 72 hrs post-cure, re-seal every 12 months'],
            ['Bathroom floor', 'Seal at 72 hrs, re-seal every 18 months'],
            ['Kitchen floor/backsplash', 'Seal at 72 hrs, re-seal every 24 months'],
            ['Exterior tile', 'Epoxy or epoxy-coated cement only — UV + freeze-thaw cycles in DFW are brutal'],
          ].map(([area, schedule]) => (
            <div key={area} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: '10px 14px', background: '#0A1628', borderRadius: 8 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 180, fontSize: 14 }}>{area}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{schedule}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>🧮 DIY vs. Pro Estimator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Tell us your situation — we'll recommend grout type, cost, and whether to DIY:</p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Location</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LOCATIONS.map(l => (
                <button key={l} onClick={() => setLocation(l)} style={{ padding: '8px 18px', borderRadius: 20, border: '2px solid', borderColor: location === l ? '#F5E642' : '#334155', background: location === l ? '#F5E642' : 'transparent', color: location === l ? '#0A1628' : '#94a3b8', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Grout Condition</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CONDITIONS.map(c => (
                <button key={c} onClick={() => setCondition(c)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: condition === c ? '#F5E642' : '#334155', background: condition === c ? '#F5E64215' : 'transparent', color: condition === c ? '#F5E642' : '#94a3b8', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Tile Area</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AREAS.map((a, i) => (
                <button key={a.label} onClick={() => setAreaIdx(i)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: areaIdx === i ? '#F5E642' : '#334155', background: areaIdx === i ? '#F5E64215' : 'transparent', color: areaIdx === i ? '#F5E642' : '#94a3b8', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: !ready ? 0.4 : 1 }}>
            Get Recommendation →
          </button>

          {showResults && rec && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 12, borderLeft: '4px solid ' + (rec.diyVsPro === 'pro' ? '#f87171' : rec.diyVsPro === 'borderline' ? '#fb923c' : '#4ade80') }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: rec.diyVsPro === 'pro' ? '#f87171' : rec.diyVsPro === 'borderline' ? '#fb923c' : '#4ade80' }}>
                {rec.diyVsPro === 'pro' ? '📞 Recommend calling a pro — moisture damage or large area' : rec.diyVsPro === 'borderline' ? '⚠️ Borderline — confident DIYers can handle, but pro may save time' : '✅ Good DIY project — you can handle this'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[['🕐 Time', `${rec.hours} hrs`], ['💰 Cost', `~$${rec.cost}`], ['🧱 Grout bags', `${rec.bags}`]].map(([label, val]) => (
                  <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642' }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Grout Type: </span><span style={{ color: '#cbd5e1' }}>{rec.groutType}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Sealer: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{rec.sealer}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

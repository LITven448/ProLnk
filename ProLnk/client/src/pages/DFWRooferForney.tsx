import { useState } from 'react';

const roofTypes = ['Architectural Shingles', '3-Tab Shingles', 'Metal Roofing', 'Tile'];
const exposureLevels = ['Low (tree-covered)', 'Moderate (open yard)', 'High (open field/hilltop)', 'Very High (frequent hail)'];

function getPriorityList(roof: string, exposure: string) {
  const expIdx = exposureLevels.indexOf(exposure);
  const isShingle = roof.includes('Shingles');
  const isMetal = roof.includes('Metal');
  const priorities: string[] = [];
  const timing = expIdx >= 2 ? 'Before Next Storm Season' : 'Annual Inspection Sufficient';

  if (isShingle && expIdx >= 2) priorities.push('🔴 Hail damage inspection — immediate');
  if (isShingle && expIdx >= 1) priorities.push('🟡 Granule loss check — gutters & downspouts');
  if (isMetal) priorities.push('🟢 Metal panels — inspect seams & fasteners');
  priorities.push('🔵 Flashing inspection — chimney, vents, skylights');
  if (expIdx >= 3) priorities.push('🔴 Insurance claim documentation recommended');
  priorities.push('🟡 Attic ventilation check — heat & moisture buildup');
  if (isShingle && expIdx <= 1) priorities.push('🟢 Standard 3-year inspection cycle');

  return { priorities, timing };
}

export default function DFWRooferForney() {
  const [roofType, setRoofType] = useState('');
  const [exposure, setExposure] = useState('');
  const result = roofType && exposure ? getPriorityList(roofType, exposure) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Forney TX Roofers — East DFW Storm Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Forney, Terrell, Kaufman County — Metal & Shingle Experts
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Avg Lot Size', value: '0.5–2 acres', icon: '🌾' },
            { label: 'Storm Risk', value: 'High — Hail Alley', icon: '⛈️' },
            { label: 'Metal Roof Adoption', value: 'Growing Fast', icon: '🔩' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🌪️ Forney's Unique Roofing Challenges</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Forney sits east of Dallas in Kaufman County — once rural farmland, now one of the fastest-growing
            outer suburbs in Texas. Homes here range from old rural farmhouses on large lots to brand-new
            subdivisions built after 2015. The open terrain amplifies hail and wind exposure significantly
            compared to inner-ring Dallas suburbs. Metal roofing is increasingly popular for its durability
            against East Texas hail events that routinely exceed 2 inches in diameter.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['⛈️ East DFW sits in prime hail corridor', '🌾 Open terrain = higher wind exposure',
              '🏡 Large lots mean full-exposure rooflines', '🔩 Metal roofing ROI highest in this zone'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 Maintenance Priority Calculator</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Select your roof type and storm exposure level to get a customized maintenance checklist.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Roof Type</label>
              <select
                value={roofType}
                onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select type...</option>
                {roofTypes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Storm Exposure</label>
              <select
                value={exposure}
                onChange={e => setExposure(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select exposure...</option>
                {exposureLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
                📅 Inspection Timing: {result.timing}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.priorities.map((p, i) => (
                  <div key={i} style={{ background: '#112240', borderRadius: 8, padding: '10px 14px', color: '#ccc', fontSize: 14 }}>{p}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Forney Roofing Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Hail & storm damage inspection', '✅ Insurance claim documentation & support',
              '✅ Standing seam metal roof installation', '✅ Architectural shingle replacement',
              '✅ Kaufman County permit-ready work', '✅ Free post-storm inspections'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0′ }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0′ }}>Get a Free Roof Inspection in Forney</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Storm-certified local roofers, insurance-friendly, same-week availability</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Inspection →
          </button>
        </div>

      </div>
    </div>
  );
}

import { useState } from 'react';

const homeEras = ['1920s–1950s (Historic/Near Campus)', '1960s–1980s', '1990s–2010s', '2010s–2020s (New Suburban)'];
const foundationTypes = ['Pier & Beam', 'Post-Tension Slab', 'Conventional Slab', 'Not Sure'];

function getInspectionPlan(era: string, foundation: string) {
  const eraIdx = homeEras.indexOf(era);
  const isPierBeam = foundation === 'Pier & Beam';
  const isPostTension = foundation === 'Post-Tension Slab';
  const urgency = eraIdx === 0 && isPierBeam ? 'IMMEDIATE' : eraIdx <= 1 ? 'HIGH' : 'MODERATE';
  const urgencyColor = urgency === 'IMMEDIATE' ? '#ff4444' : urgency === 'HIGH' ? '#F5E642' : '#44cc44';

  const issues: string[] = [];
  if (isPierBeam && eraIdx === 0) {
    issues.push('🔴 Wood beam rot — common in 1920s–1950s Denton homes');
    issues.push('🔴 Pier settlement — especially near UNT/TWU campus area');
    issues.push('🟡 Subfloor moisture damage from poor ventilation');
    issues.push('🟡 Inadequate crawlspace drainage');
  } else if (isPierBeam) {
    issues.push('🟡 Pier settlement — check for floor bounce/sag');
    issues.push('🟡 Beam deterioration from moisture cycling');
    issues.push('🟢 Ventilation inspection recommended');
  } else if (isPostTension) {
    issues.push('🟡 Post-tension cable corrosion possible near cable ends');
    issues.push('⚠️ NO drilling without post-tension survey first');
    issues.push('🟢 Edge lift from rain/dry cycling — monitor cracks');
  } else {
    issues.push(eraIdx <= 1 ? '🟡 Conventional slab — check for center lift from clay soil' : '🟢 Slab likely stable — monitor door/window alignment');
    issues.push('🟢 Ensure perimeter watering system in place');
  }

  const costRange = eraIdx === 0 && isPierBeam ? '$5,000–$30,000+' : eraIdx <= 1 ? '$3,000–$15,000' : '$800–$5,000';
  return { urgency, urgencyColor, issues, costRange };
}

export default function DFWFoundationRepairDenton() {
  const [era, setEra] = useState('');
  const [foundation, setFoundation] = useState('');
  const result = era && foundation ? getInspectionPlan(era, foundation) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️🎓</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Denton TX Foundation Repair — College Town Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Denton, Corinth, Lake Dallas — UNT & TWU Area Experts
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'City Pop.', value: '150,000+', icon: '👥' },
            { label: 'Oldest Homes', value: '1920s Near Campus', icon: '🏛️' },
            { label: 'Soil Type', value: 'Expansive Clay', icon: '🪨' },
            { label: 'Universities', value: 'UNT + TWU', icon: '🎓' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
              <div style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏛️ Denton's Complex Foundation History</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Denton is unlike any other DFW suburb when it comes to foundation risk. The historic neighborhoods
            surrounding UNT and TWU — Oak/Hickory streets, downtown grid blocks, the college corridors —
            contain 1920s–1950s craftsman homes still on original pier and beam foundations. Many of these
            homes have never had their beams replaced. Denton's expansive black clay soil is among the most
            active in North Texas, with seasonal shrink/swell cycles that impose enormous stress on all
            foundation types. Meanwhile, the outer growth zones off Loop 288 and I-35 feature new slab
            construction that faces its own first-decade settling challenges.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🏛️ 1920s–1950s homes near UNT have original P&B', '🪨 Black clay — worst expansive soil in DFW',
              '⚠️ Post-tension slabs require special survey first', '🌧️ Rain/drought cycles accelerate movement'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 Inspection Urgency Analyzer</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Select your home's era and foundation type to see inspection urgency, likely issues, and cost range.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Home Era</label>
              <select
                value={era}
                onChange={e => setEra(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                <option value="">Select era...</option>
                {homeEras.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Foundation Type</label>
              <select
                value={foundation}
                onChange={e => setFoundation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                <option value="">Select type...</option>
                {foundationTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>INSPECTION URGENCY</div>
                  <div style={{ color: result.urgencyColor, fontSize: 22, fontWeight: 700 }}>{result.urgency}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>LIKELY REPAIR COST</div>
                  <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{result.costRange}</div>
                </div>
              </div>
              <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 12, fontWeight: 600 }}>Likely Issues to Inspect:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.issues.map((issue, i) => (
                  <div key={i} style={{ background: '#112240', borderRadius: 8, padding: '10px 14px', color: '#ccc', fontSize: 14 }}>{issue}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Denton Foundation Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Pier & beam repair & replacement', '✅ Steel pier & pressed concrete pier install',
              '✅ Post-tension slab consulting', '✅ Drainage correction & French drains',
              '✅ Denton County permit-ready work', '✅ Free foundation inspection'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>Get a Free Foundation Inspection in Denton</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Pier & beam specialists, historic home experience, transferable warranty</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Inspection →
          </button>
        </div>

      </div>
    </div>
  );
}

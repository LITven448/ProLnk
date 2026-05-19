import { useState } from 'react';

const dfwApplications = ['Roof decking', 'Wall sheathing', 'Subfloor', 'Exterior project (deck, shed, pergola)', 'Interior shelving or finish work'];
const moistureExposures = ['Fully exposed / outdoor', 'Covered but humidity-exposed', 'Occasional splash / indirect rain', 'Interior / climate controlled'];

function getMaterialRecommendation(application: string, exposure: string) {
  if (exposure === 'Fully exposed / outdoor') {
    return {
      recommendation: 'NEITHER (for structural use)',
      color: '#FF4444',
      detail: 'Neither standard OSB nor plywood should be left permanently exposed to DFW weather without cladding or a protective finish. OSB degrades rapidly when wet. Plywood fares better but still fails without protection.',
      dfwNote: 'DFW\’s heat-humidity swing causes even pressure-treated plywood to delaminate within 5–8 years if not sealed and covered.',
      cost: 'If exposed structure is unavoidable: use ACX or MDO plywood with exterior primer + paint. Add $0.80–$1.50/sq ft vs standard materials.',
      winner: 'Plywood (with finishing)',
    };
  }
  if (application === 'Roof decking') {
    return {
      recommendation: 'OSB IS STANDARD — PLYWOOD IS PREMIUM',
      color: '#F5E642',
      detail: 'OSB 7/16" is the DFW standard for roof decking and meets code. It performs well when dry. However, DFW\’s humidity and heat mean that in any re-roof, plywood decking adds longevity and resistance to humidity-driven swelling.',
      dfwNote: 'OSB swells at edges when exposed during re-roofing. If your roofer removes old shingles during a rainy DFW spring day, OSB decking can swell measurably before new shingles go on.',
      cost: 'OSB 7/16": $1.20–$1.80/sq ft installed. Plywood 15/32": $1.80–$2.60/sq ft installed. Upgrade cost on 2,000 sq ft roof: ~$1,200–$1,600.',
      winner: 'Plywood (if budget allows)',
    };
  }
  if (application === 'Subfloor') {
    return {
      recommendation: 'PLYWOOD STRONGLY PREFERRED',
      color: '#00CC66',
      detail: 'DFW\’s expansive clay soils cause foundation movement that stresses subfloor connections repeatedly. Plywood\’s cross-laminated structure handles repeated loading better than OSB, which can develop fastener pull-through and edge swelling over time.',
      dfwNote: 'After a plumbing leak — common in DFW\’s aging cast-iron supply lines — OSB subfloor can delaminate significantly faster than plywood. Plywood allows more time to dry and recover.',
      cost: 'OSB 23/32": $1.40–$1.90/sq ft installed. Plywood 3/4" T&G: $2.00–$2.80/sq ft installed.',
      winner: 'Plywood (clear winner for DFW)',
    };
  }
  if (application === 'Wall sheathing') {
    return {
      recommendation: 'OSB IS STANDARD — PLYWOOD ADDS WIND PERFORMANCE',
      color: '#F5E642',
      detail: 'OSB wall sheathing meets DFW wind zone requirements when properly nailed. Plywood provides slightly better racking resistance and moisture recovery — relevant in DFW wind events where sheathing may be exposed before re-siding.',
      dfwNote: 'For homes in particularly exposed locations (hilltops, open fields near Frisco/McKinney/Prosper), plywood sheathing is a worthwhile upgrade.',
      cost: 'OSB 7/16": ~$0.90–$1.40/sq ft. Plywood 15/32": ~$1.40–$2.00/sq ft. Premium per 2,000 sq ft home: $1,000–$1,200.',
      winner: 'Plywood (for DFW wind zone exposure)',
    };
  }
  return {
    recommendation: 'OSB IS FINE',
    color: '#00CC66',
    detail: 'For interior and covered applications, OSB performs comparably to plywood at lower cost. DFW\’s interior climate-controlled environments do not stress OSB the way exterior humidity does.',
    dfwNote: 'For garage shelving or interior utility uses, OSB is cost-effective and appropriate. Seal cut edges with wood sealer if any humidity is present.',
    cost: 'OSB: $0.70–$1.10/sq ft. Plywood: $1.20–$1.80/sq ft. Save 30–40% with OSB for interior applications.',
    winner: 'OSB (great value for interior)',
  };
}

export default function DFWOSBvsPlywoodGuide() {
  const [application, setApplication] = useState('');
  const [exposure, setExposure] = useState('');
  const result = application && exposure ? getMaterialRecommendation(application, exposure) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Materials Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>OSB vs Plywood for DFW Construction</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Both OSB and plywood are widely used in DFW homes — but DFW's heat, humidity swings, and clay soils create real performance differences. Know which to choose for your project.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💧', title: 'How DFW Humidity Affects Each', body: 'OSB swells at edges when wet and does not fully recover dimensionally. Plywood\’s cross-laminated layers are more forgiving of moisture cycling. In DFW\’s summer humidity (60–80% RH), this difference matters for exposed or semi-exposed applications.' },
            { icon: '🔥', title: 'Heat Performance', body: 'DFW attic temps exceed 150°F. Both materials perform similarly under dry heat. The risk is combined heat + moisture — common after a rain-interrupted roofing job or an AC condensate leak.' },
            { icon: '💰', title: 'Cost Reality in DFW', body: 'OSB is typically 25–40% cheaper than equivalent plywood. For most code-compliant applications, OSB is the contractor default. Plywood is the upgrade choice where moisture exposure is a real risk.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Material Recommendation Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>DFW application</label>
            <select value={application} onChange={e => setApplication(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select application...</option>
              {dfwApplications.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Moisture exposure level</label>
            <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select exposure...</option>
              {moistureExposures.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 15, marginBottom: 12 }}>{result.recommendation}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.detail}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>🌡️ DFW Note: {result.dfwNote}</div>
              <div style={{ color: '#00CC66', fontSize: 13, marginBottom: 6 }}>💰 {result.cost}</div>
              <div style={{ color: '#8899BB', fontSize: 13, fontWeight: 700 }}>🏆 DFW Winner: {result.winner}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ Material costs reflect 2025–2026 DFW market pricing. Always verify local code requirements with your municipality or permit office before starting structural work.</div>
        </div>
      </div>
    </div>
  );
}

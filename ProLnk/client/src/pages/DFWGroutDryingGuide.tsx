import { useState } from 'react';

export default function DFWGroutDryingGuide() {
  const [groutType, setGroutType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);

  const data = {
    cementSanded: {
      summer: {
        shower: { trafficTime: '72 hrs', cureTime: '28 days', sealTime: '28 days after grouting', hardWater: 'HIGH IMPACT — DFW hard water mineral deposits appear faster on sanded grout', tip: 'Keep shower dry 72 hrs — no humidifying steam. Cure with damp cloth twice daily for 7 days to prevent cracking in DFW summer heat' },
        floor: { trafficTime: '48 hrs light, 72 hrs full', cureTime: '28 days', sealTime: '28 days', hardWater: 'Moderate impact — seal grout lines within 30 days to prevent hard water staining', tip: 'DFW summer AC keeps floors dry — good curing conditions. Avoid wet mopping for first 7 days' },
        exterior: { trafficTime: '72 hrs', cureTime: '28 days', sealTime: '14–21 days (do not wait full 28 — DFW sun will bake stains in)', hardWater: 'Low impact outdoors but UV degrades unsealed grout fast', tip: 'Exterior grout in DFW summer: apply damp cure (wet burlap) for 3 days to prevent premature drying and cracking' },
      },
      mild: {
        shower: { trafficTime: '48–72 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'Plan sealing before DFW summer hard water season', tip: 'Fall/spring ideal for shower grouting — humidity prevents rapid moisture loss during initial set' },
        floor: { trafficTime: '24–48 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'Seal before first wet season for maximum hard water protection', tip: 'Best season for DFW floor tile grouting — predictable cure times, minimal cracking risk' },
        exterior: { trafficTime: '48 hrs', cureTime: '28 days', sealTime: '21–28 days', hardWater: 'Low impact', tip: 'Fall ideal for exterior tile — cool nights slow cure slightly but prevent heat cracking' },
      },
    },
    cementUnsanded: {
      summer: {
        shower: { trafficTime: '48 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'HIGH — narrow grout lines concentrate hard water mineral deposits', tip: 'DFW hard water + summer humidity = fast mineral buildup on wall tile. Use a squeegee after every shower after sealing' },
        floor: { trafficTime: '24–48 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'Moderate', tip: 'Unsanded grout for floor joints under 1/8" — ensure tile is fully leveled before grouting in DFW summer heat (tiles expand)' },
        exterior: { trafficTime: '48–72 hrs', cureTime: '28 days', sealTime: '21 days', hardWater: 'Low impact outdoors', tip: 'Unsanded rarely used outdoors — if used for pool tile: DFW chlorine + minerals accelerate grout degradation' },
      },
      mild: {
        shower: { trafficTime: '24–48 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'Plan sealing at 28 days before summer', tip: 'Install in fall: grout is set before DFW\’s hard water summer season begins' },
        floor: { trafficTime: '24 hrs', cureTime: '28 days', sealTime: '28 days', hardWater: 'Moderate', tip: 'Optimal conditions for unsanded grout — low humidity gives clean tool lines and minimal shrinkage' },
        exterior: { trafficTime: '48 hrs', cureTime: '28 days', sealTime: '21 days', hardWater: 'Low', tip: 'Fall installation recommended for any exterior tile work in DFW' },
      },
    },
    epoxy: {
      summer: {
        shower: { trafficTime: '24 hrs', cureTime: '7 days', sealTime: 'No sealing needed — epoxy is inherently non-porous', hardWater: 'VERY LOW — epoxy resists mineral deposits. Best choice for DFW hard water areas', tip: 'Epoxy sets via chemical reaction — DFW summer heat speeds set time. Work in 2–3 sq ft sections max. Keep AC at 68°F' },
        floor: { trafficTime: '24 hrs', cureTime: '7 days', sealTime: 'No sealing needed', hardWater: 'Very low — excellent choice for DFW commercial kitchens and high-traffic areas', tip: 'Working time is shorter in DFW heat — mix only what you can use in 15 minutes. Have extra mixing buckets ready' },
        exterior: { trafficTime: '24–48 hrs', cureTime: '7 days', sealTime: 'Not required', hardWater: 'Very low', tip: 'Apply before 10 AM in DFW summer — epoxy workability drops significantly above 85°F' },
      },
      mild: {
        shower: { trafficTime: '24 hrs', cureTime: '7 days', sealTime: 'None required', hardWater: 'Best grout choice for DFW hard water — set it and forget it', tip: 'Epoxy in mild DFW temps gives best working time — easier to tool than in summer heat' },
        floor: { trafficTime: '12–24 hrs', cureTime: '7 days', sealTime: 'None required', hardWater: 'Excellent hard water resistance', tip: 'Fall/spring gives most control over epoxy application — critical for large floor installations' },
        exterior: { trafficTime: '24 hrs', cureTime: '7 days', sealTime: 'None required', hardWater: 'Very low', tip: 'Ideal conditions for epoxy exterior work — more working time and predictable set' },
      },
    },
  };

  function calculate() {
    if (!groutType || !season || !location) return;
    setResult(data[groutType][season][location]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Grout Drying & Sealing Guide for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>DFW hard water is the #1 enemy of unsealed grout. Get the timeline right — and know when to seal before minerals stain permanently.</p>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💧 DFW Hard Water: Why It Matters for Grout</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>DFW water has 200–400 ppm hardness (very hard). Calcium and magnesium minerals deposit in unsealed grout pores within weeks. Once stained, mineral deposits are very difficult to remove without acid cleaners that damage grout further.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'DFW Water Hardness', value: '200–400 ppm', note: 'Classified as "Very Hard"', color: '#ef4444' },
              { label: 'Staining Timeline', value: '2–8 weeks', note: 'Unsealed grout in shower', color: '#f97316' },
              { label: 'Sealing Protects', value: '3–5 years', note: 'With quality penetrating sealer', color: '#22c55e' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center', borderTop: `3px solid ${item.color}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>⏱️ Get Your DFW Grout Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>GROUT TYPE</label>
              {[{ val: 'cementSanded', label: '🪨 Sanded Cement', desc: 'Joints 1/8" or wider' }, { val: 'cementUnsanded', label: '🔲 Unsanded Cement', desc: 'Joints under 1/8"' }, { val: 'epoxy', label: '⭐ Epoxy Grout', desc: 'No sealing needed' }].map(opt => (
                <button key={opt.val} onClick={() => setGroutType(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${groutType === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: groutType === opt.val ? '#F5E642' : 'transparent', color: groutType === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 13 }}>{opt.label}<div style={{ fontSize: 11, opacity: 0.7 }}>{opt.desc}</div></button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DFW SEASON</label>
              {[{ val: 'summer', label: '☀️ Summer (May–Sep)' }, { val: 'mild', label: '🍂 Fall / Spring' }].map(opt => (
                <button key={opt.val} onClick={() => setSeason(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${season === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: season === opt.val ? '#F5E642' : 'transparent', color: season === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>LOCATION</label>
              {[{ val: 'shower', label: '🚿 Shower / Bath' }, { val: 'floor', label: '🏠 Interior Floor' }, { val: 'exterior', label: '🌳 Exterior / Patio' }].map(opt => (
                <button key={opt.val} onClick={() => setLocation(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${location === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: location === opt.val ? '#F5E642' : 'transparent', color: location === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get My Grout Timeline →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SAFE FOR TRAFFIC</div><div style={{ fontWeight: 700 }}>{result.trafficTime}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>FULL CURE</div><div style={{ fontWeight: 700 }}>{result.cureTime}</div></div>
              </div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>WHEN TO SEAL</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{result.sealTime}</div>
              </div>
              <div style={{ backgroundColor: '#7c2d12', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: '#fdba74' }}>💧 DFW Hard Water: </span><span style={{ color: '#fed7aa' }}>{result.hardWater}</span>
              </div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642' }}>💡 Tip: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{result.tip}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>28-day cure applies to all cement grout · Epoxy grout eliminates sealing requirement entirely · DFW hard water info based on NTMWD water quality report</div>
      </div>
    </div>
  );
}

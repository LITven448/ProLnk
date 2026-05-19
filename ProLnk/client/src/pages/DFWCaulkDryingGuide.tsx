import { useState } from 'react';

export default function DFWCaulkDryingGuide() {
  const [caulkType, setCaulkType] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);

  const data = {
    silicone: {
      summer: { dryTime: '30–60 min skin-over (humidity actually helps silicone cure)', cureTime: '24–48 hrs full cure', paintReady: 'Cannot paint silicone — use paintable silicone blend', waterproof: '4–6 hrs', tip: 'DFW summer humidity accelerates silicone cure — moisture triggers the chemical cure reaction' },
      mild: { dryTime: '60–90 min skin-over', cureTime: '24–48 hrs full cure', paintReady: 'Cannot paint pure silicone', waterproof: '8–12 hrs', tip: 'Lower humidity slightly slows silicone cure vs summer — still fast enough for same-day projects' },
      winter: { dryTime: '2–4 hrs skin-over (cold slows cure)', cureTime: '48–72 hrs full cure', paintReady: 'Cannot paint pure silicone', waterproof: '12–24 hrs', tip: 'Below 40°F dramatically slows silicone cure — do not apply in unheated spaces during DFW cold snaps' },
    },
    latexPaintable: {
      summer: { dryTime: '30–45 min surface dry (faster in AC, slower in DFW outdoor humidity)', cureTime: '24 hrs for light use, 7 days full cure', paintReady: '2–4 hrs (dry, not cured)', waterproof: '24 hrs', tip: 'If applying outdoors in DFW summer: afternoon humidity spikes can prevent proper skin-over — use morning hours' },
      mild: { dryTime: '30–60 min surface dry', cureTime: '24 hrs for light use', paintReady: '1–2 hrs', waterproof: '12–24 hrs', tip: 'Ideal conditions for latex caulk in DFW — spring and fall give predictable dry times' },
      winter: { dryTime: '1–2 hrs surface dry (cold slows evaporation)', cureTime: '24–48 hrs', paintReady: '2–4 hrs', waterproof: '24–48 hrs', tip: 'Keep space above 50°F — latex caulk should never be applied or dry below 40°F' },
    },
    siliconeBlend: {
      summer: { dryTime: '45–90 min surface dry', cureTime: '24 hrs', paintReady: '2–4 hrs', waterproof: '8–12 hrs', tip: 'Best of both worlds for DFW bathrooms and kitchens — paintable AND flexible for temperature expansion' },
      mild: { dryTime: '45–60 min surface dry', cureTime: '24 hrs', paintReady: '1–2 hrs', waterproof: '8–12 hrs', tip: 'Silicone blends are the standard recommendation for DFW homes — handles thermal expansion from 30°F to 105°F swings' },
      winter: { dryTime: '1–2 hrs surface dry', cureTime: '24–48 hrs', paintReady: '2–4 hrs', waterproof: '12–24 hrs', tip: 'Silicone blend stays flexible in DFW cold — pure latex can crack at joints during freeze events' },
    },
    polyurethane: {
      summer: { dryTime: '2–4 hrs skin-over', cureTime: '3–7 days full cure', paintReady: '24 hrs', waterproof: '24–48 hrs', tip: 'DFW summer heat accelerates surface cure but can cause skinning before full penetration — apply in shade' },
      mild: { dryTime: '3–6 hrs skin-over', cureTime: '5–7 days full cure', paintReady: '24 hrs', waterproof: '24–48 hrs', tip: 'Polyurethane is ideal for DFW exterior expansion joints — paintable and handles extreme temp swings' },
      winter: { dryTime: '6–12 hrs skin-over (cold dramatically slows cure)', cureTime: '7–14 days full cure', paintReady: '48–72 hrs', waterproof: '48–72 hrs', tip: 'Avoid applying polyurethane below 50°F — cure halts completely below 40°F' },
    },
  };

  function calculate() {
    if (!caulkType || !season) return;
    setResult(data[caulkType][season]);
  }

  const caulkOptions = [
    { val: 'silicone', label: '💧 Pure Silicone', desc: 'Bathrooms, windows, wet areas' },
    { val: 'latexPaintable', label: '🎨 Paintable Latex', label2: '(Acrylic)', desc: 'Interior walls, trim, baseboards' },
    { val: 'siliconeBlend', label: '⭐ Paintable Silicone Blend', desc: 'Best all-around for DFW' },
    { val: 'polyurethane', label: '🏗️ Polyurethane', desc: 'Exterior joints, concrete, masonry' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Caulk Drying & Curing Guide for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Dry vs cured are different things — and DFW heat, humidity, and cold snaps all affect both timelines differently by caulk type.</p>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚠️ Dry vs Cured — The Critical Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderTop: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Surface Dry</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Touch-dry, won't smear. Usually 30 min–2 hrs. NOT ready for water or flexing — can be painted in some cases</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderTop: '3px solid #22c55e' }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Fully Cured</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Full strength, waterproof, and flexible. Takes 24 hrs to 7 days. The timeline DFW homeowners most often ignore</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌤️ DFW Conditions Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'DFW Summer', humidity: '60–85% RH', effect: 'Speeds silicone cure; slows latex evaporation', icon: '☀️' },
              { label: 'DFW Fall/Spring', humidity: '35–55% RH', effect: 'Ideal conditions — all types cure predictably', icon: '🌤️' },
              { label: 'DFW Winter', humidity: '20–45% RH', effect: 'Cold dramatically slows all cure types', icon: '❄️' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>{item.humidity}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.effect}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>⏱️ Get Your DFW Dry & Cure Times</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>CAULK TYPE</label>
              {caulkOptions.map(opt => (
                <button key={opt.val} onClick={() => setCaulkType(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${caulkType === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: caulkType === opt.val ? '#F5E642′ : ’transparent', color: caulkType === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 13 }}>{opt.label}<div style={{ fontSize: 11, opacity: 0.7 }}>{opt.desc}</div></button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DFW SEASON</label>
              {[{ val: 'summer', label: '☀️ Summer (May–Sep)' }, { val: 'mild', label: '🌤️ Spring / Fall' }, { val: 'winter', label: '❄️ Winter (Dec–Feb)' }].map(opt => (
                <button key={opt.val} onClick={() => setSeason(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${season === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: season === opt.val ? '#F5E642′ : ’transparent', color: season === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get My Timeline →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SURFACE DRY</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.dryTime}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>FULLY CURED</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.cureTime}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SAFE TO PAINT</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.paintReady}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>WATERPROOF</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.waterproof}</div></div>
              </div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642′ }}>💡 DFW Tip: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{result.tip}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Times are estimates · Always read manufacturer label · Wet areas should reach full cure before water exposure</div>
      </div>
    </div>
  );
}

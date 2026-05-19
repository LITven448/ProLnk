import { useState } from 'react';

export default function DFWPaintApplicationGuide() {
  const [paintType, setPaintType] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);

  const data = {
    exterior: {
      spring: { ok: true, window: 'March – April: Ideal window', temp: '55°F–80°F, 40–60% humidity', dryTime: '1–2 hrs touch, 4–6 hrs recoat', tip: 'Best exterior painting season in DFW — mild temps, manageable humidity', warning: null },
      summer: { ok: false, window: 'May – September: Generally avoid exterior', temp: '95°F–105°F, 60–85% humidity', dryTime: 'Paint may skin before penetrating properly', tip: 'If you must paint: 6–10 AM only, shade areas only, latex only', warning: 'High temps cause paint to dry too fast on the surface, trapping moisture underneath and causing peeling within months' },
      fall: { ok: true, window: 'October – November: Second-best window', temp: '55°F–80°F, 35–55% humidity', dryTime: '1–2 hrs touch, 4–6 hrs recoat', tip: 'Watch for cold fronts — stop painting if temp will drop below 50°F within 24 hours', warning: null },
      winter: { ok: false, window: 'December – February: Risky', temp: '35°F–65°F, highly variable', dryTime: 'Unpredictable — cold nights can ruin a fresh coat', tip: 'Only paint during warmest part of the day (noon–3 PM)', warning: 'DFW winter has frequent freezes — paint applied before a freeze will fail' },
    },
    interior: {
      spring: { ok: true, window: 'Year-round OK with AC', temp: '68°F–72°F indoor (AC controlled)', dryTime: '1 hr touch-dry, 2–4 hrs recoat', tip: 'Open windows in spring for natural ventilation and faster drying', warning: null },
      summer: { ok: true, window: 'AC makes interior painting fine', temp: '68°F–72°F (keep AC at normal setting)', dryTime: '1–2 hrs touch, 2–4 hrs recoat', tip: 'Run AC normally — do not turn off to "save money" while painting', warning: null },
      fall: { ok: true, window: 'Excellent conditions', temp: '68°F–72°F indoor', dryTime: '1 hr touch, 2–4 hrs recoat', tip: 'Great season — can open windows for ventilation without humidity spikes', warning: null },
      winter: { ok: true, window: 'Fine with heat running', temp: '68°F–72°F (keep heat on)', dryTime: '1–2 hrs touch, 2–4 hrs recoat', tip: 'Keep heat running — cold air holds less moisture so paint actually dries faster', warning: null },
    },
    trim: {
      spring: { ok: true, window: 'Ideal conditions', temp: '65°F–80°F', dryTime: 'Oil-based: 6–8 hrs; Water-based: 2–4 hrs', tip: 'Spring is perfect for oil-based trim — low humidity reduces yellowing', warning: null },
      summer: { ok: true, window: 'Interior trim: fine. Exterior trim: early AM only', temp: 'Interior 68°F / Exterior below 90°F', dryTime: 'Oil-based: 8–12 hrs in humidity; Water-based: 2–4 hrs', tip: 'Exterior trim painting: 6–10 AM window, or switch to water-based for faster dry', warning: null },
      fall: { ok: true, window: 'Great for all trim painting', temp: '60°F–78°F', dryTime: 'Oil-based: 6–8 hrs; Water-based: 2–4 hrs', tip: 'Best season for exterior trim — cool nights help cure between coats', warning: null },
      winter: { ok: true, window: 'Interior only recommended', temp: '68°F–72°F (heated)', dryTime: 'Oil-based: 8–12 hrs; Water-based: 2–4 hrs', tip: 'Avoid exterior trim painting — temperature swings can cause adhesion failures', warning: null },
    },
  };

  function calculate() {
    if (!paintType || !season) return;
    setResult(data[paintType][season]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Paint Application Guide for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>DFW's extreme heat and humidity don’t just make painting uncomfortable — they cause paint failures. Timing is everything.</p>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW Paint Temperature Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { range: 'Below 50°F', label: 'Never Paint', color: '#3b82f6', note: 'Paint won\’t cure properly, adhesion fails' },
              { range: '50°F – 90°F', label: 'Ideal Window', color: '#22c55e', note: 'Optimal conditions for all paint types' },
              { range: 'Above 90°F', label: 'Avoid Exterior', color: '#ef4444', note: 'Surface blistering, moisture trap, early peeling' },
            ].map(item => (
              <div key={item.range} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderTop: `3px solid ${item.color}` }}>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{item.range}</div>
                <div style={{ color: item.color, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>☀️ How DFW Sun Affects Paint Differently</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🔆', title: 'Intense UV', body: 'DFW gets 234+ sunny days/year. UV degrades latex faster than northern climates — use exterior paints with UV inhibitors' },
              { icon: '🌡️', title: 'Radiant Heat', body: 'South and west-facing walls reach 130–160°F surface temp in summer — paint expands and contracts more than anywhere in the US' },
              { icon: '💨', title: 'Spray Overspray', body: 'DFW wind (10–15 mph avg) carries overspray — tape off surfaces carefully and choose calm mornings for spray applications' },
              { icon: '🌩️', title: 'Afternoon Storms', body: 'DFW spring/summer afternoon storms are common — never paint if rain is expected within 4 hours of application' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📋 Get Your DFW Paint Timing Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>PAINTING TYPE</label>
              {[{ val: 'exterior', label: '🏠 Exterior Walls' }, { val: 'interior', label: '🛋️ Interior Walls' }, { val: 'trim', label: '🪟 Trim & Doors' }].map(opt => (
                <button key={opt.val} onClick={() => setPaintType(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${paintType === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: paintType === opt.val ? '#F5E642′ : ’transparent', color: paintType === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DFW SEASON</label>
              {[{ val: 'spring', label: '🌸 Spring (Mar–Apr)' }, { val: 'summer', label: '☀️ Summer (May–Sep)' }, { val: 'fall', label: '🍂 Fall (Oct–Nov)' }, { val: 'winter', label: '❄️ Winter (Dec–Feb)' }].map(opt => (
                <button key={opt.val} onClick={() => setSeason(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${season === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: season === opt.val ? '#F5E642′ : ’transparent', color: season === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get Timing Guide →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.ok ? '#22c55e' : '#ef4444'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{result.window}</div>
                <div style={{ backgroundColor: result.ok ? '#22c55e' : '#ef4444', color: '#fff', borderRadius: 6, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{result.ok ? '✅ Good to Go' : '⚠️ Caution'}</div>
              </div>
              {result.warning && <div style={{ backgroundColor: '#7f1d1d', borderRadius: 8, padding: 12, marginBottom: 12, color: '#fca5a5', fontSize: 14 }}>⚠️ {result.warning}</div>}
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>🌡️ Conditions: {result.temp}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>⏱️ Dry time: {result.dryTime}</div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642′ }}>💡 DFW Tip: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{result.tip}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Always check local DFW weather forecast before exterior painting · Manufacturer dry times assume ideal conditions</div>
      </div>
    </div>
  );
}

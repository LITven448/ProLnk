import { useState } from 'react';

export default function DFWGarbageDisposalDFW2026() {
  const [issue, setIssue] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, string> = {
    "smell": "Monthly DFW disposal cleaning: drop 6-8 ice cubes + 1 tbsp coarse salt into disposal, run cold water, turn on. Ice scours the grinding chamber and splash guard. Follow with half a lemon. DFW hard water deposits mineral scale on the splash guard — it traps food particles and causes odor even when clean.",
    "mineral": "DFW hard water (300+ PPM) leaves white scale on the rubber splash guard and grinding ring within 6 months. Lift splash guard flaps and scrub underside with old toothbrush + white vinegar monthly. Scale on grinding components is normal — it does not affect performance but does harbor bacteria.",
    "jammed": "Reset button is on the bottom of the disposal unit under the sink — press the small red or black button. If tripped, it will click when pressed. After resetting: use the hex key (Allen wrench, usually 1/4 inch) in the center bottom port to manually turn the grinding plate and free the jam. Never put hand inside.",
    "slow": "DFW hard water shortens disposal bearing life — slow grinding often signals worn bearings, not a jam. Test: run disposal empty with cold water. Grinding noise + slow = bearings. If unit is 8+ years old in DFW, bearing replacement cost ($150-250 labor) often justifies replacement instead.",
    "repair-replace": "Insinkerator vs Waste King for DFW: Insinkerator (Badger series) is standard in most DFW homes — parts readily available, every plumber knows them. Waste King is quieter and has stainless grinding components that resist DFW hard water scale better. For DFW replacement: Insinkerator Evolution Excel ($250-300) or Waste King L-8000 ($130-160) are top picks. Life expectancy in DFW with hard water: 8-12 years vs 12-15 in soft water areas.",
    "leaking": "Disposal leaks in DFW: check three spots — sink flange (top, putty dries out in DFW heat), discharge pipe gasket (side), and dishwasher drain connection (side). Sink flange putty fails every 5-7 years in DFW summer heat. Re-plumbing with fresh plumber's putty: $80-150 pro or DIY in 30 min."
  };

  function generate() {
    if (!issue) { setGuide('Please select an issue.'); return; }
    setGuide(guides[issue] || 'No guide found for that issue.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🗑️ DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Garbage Disposal Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW hard water (300+ PPM) is the silent disposal killer — mineral scale accumulates on the splash guard and grinding ring, shortening bearing life by 30%. Most DFW disposals need replacement at 8-12 years, 3 years sooner than soft water areas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {([
            ['🧊', 'Monthly Ice + Salt Clean', 'Drop ice cubes + coarse salt monthly, run cold water and disposal 30 sec. Scours grinding chamber. Follow with lemon half for odor.'],
            ['💧', 'Splash Guard Scrub', 'Lift the rubber flaps monthly and scrub the underside with a toothbrush + white vinegar. DFW hard water scales this surface fastest.'],
            ['🔴', 'Know Your Reset Button', 'Red/black button on bottom of unit under sink. Always try reset first before calling a plumber. Keep a 1/4-inch hex key nearby for jams.'],
            ['⚙️', 'Brand Comparison', 'Insinkerator = most common in DFW, easy parts. Waste King = stainless grind components resist DFW hard water better. Both solid choices for DFW.'],
          ] as [string, string, string][]).map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Diagnose Your DFW Disposal Issue</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Issue</option>
              <option value="smell">Bad smell / odor</option>
              <option value="mineral">Mineral buildup / scale</option>
              <option value="jammed">Jammed / humming but not grinding</option>
              <option value="slow">Slow grinding / weak performance</option>
              <option value="repair-replace">Repair vs replace decision</option>
              <option value="leaking">Leaking under sink</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16 }}>⏱️ DFW Disposal Life Expectancy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {([
              ['Builder Grade (Badger 1)', '4-6 years in DFW', '#ef4444'],
              ['Mid-Grade (Badger 5)', '7-10 years in DFW', '#f97316'],
              ['Premium (Evolution Excel)', '10-14 years in DFW', '#22c55e'],
            ] as [string, string, string][]).map(([model, life, color]) => (
              <div key={model} style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: `3px solid ${color}` }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{model}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{life}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Plumber?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW plumbers for disposal installation and repair — average install is $150-250 including parts.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

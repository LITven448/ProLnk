import { useState } from 'react';

export default function DFWOvenMaintenanceDFW2026() {
  const [type, setType] = useState('');
  const [issue, setIssue] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    "gas": {
      "burner": "DFW hard water deposits clog cast iron grate ports. Monthly: remove grates, soak in hot water + dish soap 30 min, scrub ports with wire brush or toothpick. Rinse and dry completely before replacing. Clogged ports cause uneven flame and yellow/orange tips (should be blue).",
      "self-clean": "DFW tip: open windows and run exhaust fan during self-clean cycle. 900F+ cycle burns off grease but creates strong smoke — critical in DFW where homes are sealed for AC. Remove oven racks first (warps at self-clean temps). Do NOT self-clean if you have pet birds — fumes are fatal.",
      "calibration": "Gas ovens drift 25-50F over time — more in heavy-use DFW summer kitchens. Test with oven thermometer: set to 350F, check actual temp after 20 min. Adjust calibration per manual (usually hold BAKE + arrow keys). DFW pros see 30-40F drift common in 5+ year gas ranges.",
      "igniter": "Gas igniter clicking constantly = moisture or food debris on igniter. DFW humidity can cause this after cleaning. Dry igniter with compressed air or hair dryer on low. If clicking persists when burner is off, igniter or spark module needs replacement ($40-100)."
    },
    "electric": {
      "burner": "Electric coil elements: DFW hard water from boilover spills leave white mineral deposits on coils. Clean with damp cloth only when COLD. If element has dark spots or cracks, replace ($20-30 each). Smooth-top ceramic: use ceramic cooktop cleaner (Weiman) — avoid abrasives that scratch.",
      "self-clean": "Electric self-clean: same DFW ventilation advice applies. 900F cycle can trip thermal fuse on older units — if oven goes dead after self-clean, thermal fuse is likely cause ($15-25 part, DIY possible). Self-clean in morning when DFW temps are cooler to reduce thermal stress.",
      "calibration": "Electric oven calibration drift is less common than gas but still happens. Use oven thermometer to verify. Electric ovens: calibration adjustment typically in settings menu. If off more than 50F and adjustment will not hold, oven sensor (RTD sensor) may need replacement ($20-50).",
      "igniter": "Electric ranges use bake and broil elements, not igniters. If bottom element has visible damage (cracks, blistering) replace immediately — DFW power fluctuations (ERCOT grid) can cause element surge failures. Replacement: $30-60 for most brands."
    }
  };

  function generate() {
    if (!type || !issue) { setGuide('Please select both options.'); return; }
    setGuide(guides[type]?.[issue] || 'No guide found for that combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🔥 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Oven Range Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Gas ranges dominate DFW kitchens — about 60% of DFW homes have gas cooking. Hard water deposits on cast iron grates and igniter issues are the most common service calls. Know your range type to maintain it right.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {([
            ['🫧', 'Monthly Grate Soak', 'Gas grates: soak in hot soapy water monthly. DFW hard water + cooking deposits clog burner ports — clogged ports = uneven heat and yellow flame.'],
            ['🌬️', 'Self-Clean Ventilation', 'Always open windows + run exhaust fan during self-clean. DFW homes are tightly sealed for AC — smoke has nowhere to go.'],
            ['🌡️', 'Oven Thermometer', 'DFW gas ovens drift 25-50F — buy a $10 oven thermometer and check calibration twice per year. Baking problems often trace here.'],
            ['⚡', 'ERCOT Surge Awareness', 'DFW grid (ERCOT) voltage fluctuations are real. Use surge protector on electric ranges with digital controls to prevent board failures.'],
          ] as [string, string, string][]).map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Oven Guide</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={type} onChange={e => setType(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Range Type</option>
              <option value="gas">Gas Range</option>
              <option value="electric">Electric Range</option>
            </select>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Issue</option>
              <option value="burner">Burner / cooktop cleaning</option>
              <option value="self-clean">Self-clean cycle safety</option>
              <option value="calibration">Oven calibration / temp drift</option>
              <option value="igniter">Igniter / element issues</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Appliance Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW oven and range technicians — gas certified and familiar with ERCOT-related electrical issues.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWDishwasherMaintenanceDFW2026() {
  const [age, setAge] = useState('');
  const [issue, setIssue] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    "0-5": {
      "spots": "Use Finish Jet-Dry rinse aid — DFW hard water (300+ PPM) causes etching on new units. Set rinse aid dispenser to max.",
      "odor": "Run Affresh tablet on empty hot cycle monthly. Clean filter weekly — DFW minerals clog it fast.",
      "not-cleaning": "Check spray arm holes with toothpick — DFW mineral deposits block jets within months.",
      "noise": "Check dish rack for loose items. At 0-5 years noise is usually user error, not mechanical."
    },
    "6-10": {
      "spots": "Replace rinse aid dispenser if leaking. DFW hard water etches older racks — consider rack coating spray.",
      "odor": "Deep clean: vinegar on top rack + baking soda on floor, run hot cycle. Replace door gasket if moldy.",
      "not-cleaning": "Descale spray arms — soak in white vinegar 30 min. Check water temp at tap: must be 120°F minimum.",
      "noise": "Inspect wash pump bearing — DFW hard water accelerates wear. Budget $150-250 for pump replacement."
    },
    "11+": {
      "spots": "Hard water scale may be permanent etching at this age. Run CLR Dishwasher cleaner. Consider replacement.",
      "odor": "Replace door gasket ($20-40). If persists, control board may be failing — repair vs replace at 11+ years.",
      "not-cleaning": "Heating element may be failing — water below 120°F won't sanitize. Test with thermometer at tap.",
      "noise": "At 11+ years in DFW hard water, motor/pump replacement cost often exceeds unit value. Replace recommended."
    }
  };

  function generate() {
    if (!age || !issue) { setGuide('Please select both options.'); return; }
    setGuide(guides[age]?.[issue] || 'No guide found for that combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🍽️ DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Dishwasher Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Hard water is the #1 dishwasher killer in Dallas-Fort Worth. At 300+ PPM, DFW tap water clogs spray arms, etches glass, and destroys heating elements faster than anywhere in Texas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[["🧊","Monthly Affresh Cycle","Run one Affresh tablet on empty hot cycle every 30 days. DFW minerals accumulate fast."],["🔧","Filter Cleaning","Remove and rinse filter weekly. DFW hard water deposits clog filters 3x faster than national average."],["💧","Rinse Aid Always","Keep dispenser full. Set to max level for DFW water. Finish Jet-Dry outperforms generics here."],["🌡️","Water Temp Check","Run hot water at sink before starting cycle. Must reach 120°F for proper sanitizing."]].map(([icon, title, desc]) => (
            <div key={title as string} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title as string}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Maintenance Guide</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Dishwasher Age</option>
              <option value="0-5">0–5 years</option>
              <option value="6-10">6–10 years</option>
              <option value="11+">11+ years</option>
            </select>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Issue</option>
              <option value="spots">White spots / etching</option>
              <option value="odor">Bad odor</option>
              <option value="not-cleaning">Not cleaning well</option>
              <option value="noise">Unusual noise</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Appliance Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW appliance technicians who understand local hard water challenges.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWDryerMaintenanceDFW2026() {
  const [type, setType] = useState('');
  const [symptom, setSymptom] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    "gas": {
      "slow-drying": "Clean lint trap (every load). Check vent duct — DFW dust + lint compacts fast. Max vent run: 25 ft equivalent (subtract 5 ft per 90-degree elbow). Gas igniter may be weakening if unit is 7+ years old.",
      "no-heat": "Gas igniter or thermal fuse failure. In DFW summer heat, dryers work harder — thermal fuses blow more often June-September. Igniter replacement: $80-150 DIY or $200-300 pro.",
      "noise": "Drum bearing or idler pulley wear. DFW dust enters through vent and accelerates drum bearing wear. Inspect and lubricate idler pulley. Squealing = bearing. Thumping = drum seal.",
      "fire-risk": "DFW risk: dust + lint combo. Clean duct annually minimum. Check bird guard on exterior vent — DFW starlings and sparrows nest in vent caps spring and fall, blocking airflow completely. Inspect every March and September."
    },
    "electric": {
      "slow-drying": "Heating element may be partially failed. Electric dryers in DFW work harder June-September (high ambient temp). Clean vent duct — restricted airflow reduces efficiency 40%. Check vent run length and remove any flex duct kinks.",
      "no-heat": "Heating element failure ($30-80 part). In electric dryers, element burns out faster with restricted airflow. First: clean vent duct fully. If still no heat, test element with multimeter — open circuit = replace.",
      "noise": "Electric dryers: drum glides (plastic slides) wear out. DFW dust accelerates glide wear. Squealing on electric = drum glides ($20-40 DIY kit). Replace all 4 glides at once while you have it apart.",
      "fire-risk": "Electric dryers: ensure 240V outlet is properly grounded. DFW homes built pre-1996 may have 3-prong outlets — confirm proper grounding. Annual vent cleaning is critical. Replace plastic flex duct with rigid metal duct if possible."
    }
  };

  function generate() {
    if (!type || !symptom) { setGuide('Please select both options.'); return; }
    setGuide(guides[type]?.[symptom] || 'No guide found for that combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🔥 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Dryer Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW dust storms and high pollen combine with lint to create vent blockages 2x faster than northern climates. Clogged dryer vents are a leading cause of house fires — DFW has above-average risk due to high dust load and long vent runs in large homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {([
            ['🧹', 'Lint Trap Every Load', 'Clean before every single load. DFW cotton fields + dust = exceptionally heavy lint. A clogged trap reduces efficiency 30% and creates fire risk.'],
            ['📏', 'Vent Run Length', 'Maximum 25 ft equivalent. Each 90-degree elbow = minus 5 ft. DFW homes often have long runs to exterior — measure yours today.'],
            ['🐦', 'Bird Guard Inspection', 'Check exterior vent cap every March and September. DFW starlings actively nest in dryer vents causing complete blockage and fire hazard.'],
            ['📅', 'Annual Duct Cleaning', 'Hire duct cleaning pro annually. DFW dust + lint accumulates in flex duct faster than rigid metal. Use rigid duct if possible — flex kinks reduce airflow.'],
          ] as [string, string, string][]).map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Dryer Guide</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={type} onChange={e => setType(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Dryer Type</option>
              <option value="gas">Gas Dryer</option>
              <option value="electric">Electric Dryer</option>
            </select>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Symptom</option>
              <option value="slow-drying">Slow drying / multiple cycles needed</option>
              <option value="no-heat">No heat</option>
              <option value="noise">Noise / squealing</option>
              <option value="fire-risk">Fire risk / safety check</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16 }}>🌡️ DFW Seasonal Dryer Risk Calendar</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {([
              ['Spring (Mar-May)', 'Bird nesting season — inspect vent cap', '#f97316'],
              ['Summer (Jun-Aug)', 'Peak heat — thermal fuse risk highest', '#ef4444'],
              ['Fall (Sep-Nov)', 'Second bird nesting — re-inspect cap', '#f97316'],
              ['Winter (Dec-Feb)', 'Annual duct cleaning window', '#22c55e'],
            ] as [string, string, string][]).map(([season, tip, color]) => (
              <div key={season} style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: `3px solid ${color}` }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{season}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Dryer Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW appliance technicians for dryer vent cleaning and repair.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

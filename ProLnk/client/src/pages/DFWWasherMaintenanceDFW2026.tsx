import { useState } from 'react';

export default function DFWWasherMaintenanceDFW2026() {
  const [type, setType] = useState('');
  const [issue, setIssue] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    "front-load": {
      "mold": "DFW humidity (avg 65%) + front-load gasket = mold guaranteed without prevention. Wipe door gasket and drum dry after every load. Leave door ajar 2+ hours. Run Affresh monthly on hot cycle.",
      "scale": "Run descale cycle with 2 cups white vinegar + hot water monthly. DFW hard water (300+ PPM) leaves white scale on drum and heating element within 6 months.",
      "smell": "Front-load odor in DFW = mold + detergent residue. Use HE detergent only, 1/3 recommended amount. Run hot clean cycle with Affresh every 30 days.",
      "vibration": "Check leveling feet — DFW clay soil causes foundation shifts that unlevel machines. Also check load balance and spin basket for DFW hard water drum buildup."
    },
    "top-load": {
      "mold": "Top-load mold less common but check under agitator cap and fabric softener dispenser. DFW humidity can allow mold in dispensers if not rinsed.",
      "scale": "Hard water scale in top-load drum: run empty hot cycle with 2 cups CLR Washer Cleaner. Do monthly in DFW. Check agitator for white chalky buildup.",
      "smell": "Run hot cycle with baking soda (1 cup) + white vinegar (1 cup). Leave lid open after wash. DFW hard water leaves mineral smell in drum.",
      "vibration": "Check leveling — all 4 feet must contact floor. DFW clay soil shifts floors. Also inspect suspension rods (top-load) for wear if machine is 5+ years old."
    }
  };

  function generate() {
    if (!type || !issue) { setGuide('Please select both options.'); return; }
    setGuide(guides[type]?.[issue] || 'No guide found for that combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🫧 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Washing Machine Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW presents a unique double threat: 300+ PPM hard water that scales drum interiors, plus 65% average humidity that drives front-load mold. Know your washer type to fight both.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[["🧼","Monthly Affresh Cycle","Run Affresh tablet on hottest cycle empty. DFW hard water + detergent residue builds fast."],["💧","Supply Line Check","Inspect braided supply lines every 2 years. Replace every 5 years — DFW water pressure fluctuates and weakens rubber."],["🌫️","Front-Load Gasket","Wipe DRY after every load. DFW humidity + trapped moisture = black mold within weeks if neglected."],["⚖️","Level Monthly","DFW clay soil shifts foundations. Check and re-level all 4 feet every 3 months to prevent bearing wear."]].map(([icon, title, desc]) => (
            <div key={title as string} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title as string}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Washer Guide</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={type} onChange={e => setType(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Washer Type</option>
              <option value="front-load">Front-Load HE</option>
              <option value="top-load">Top-Load</option>
            </select>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Issue</option>
              <option value="mold">Mold / mildew</option>
              <option value="scale">Hard water scale</option>
              <option value="smell">Bad smell</option>
              <option value="vibration">Vibration / noise</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Appliance Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW technicians who know local hard water and humidity challenges.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

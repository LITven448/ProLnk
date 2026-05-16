import { useState } from 'react';

export default function DFWShowersystemGuide2026() {
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!goal || !budget) { setResult('Please select goal and budget.'); return; }
    const b = parseInt(budget);
    const guides: Record<string,string> = {
      rain: b < 1500 ? '🚿 Rain Head (Budget): A ceiling-mount rain head with diverter valve runs $400–800 installed. In DFW hard water you MUST add a shower filter ($60–120) or the head will clog within 6 months. Kohler and Moen both have solid budget options.' : '🚿 Rain Head (Premium): Go thermostatic ($800–1,500 valve) for consistent temp with DFW pressure fluctuations. Add a in-line filter to protect the valve from hard water. Hansgrohe and Grohe valves last 20+ years with filtered water.',
      body: b < 3000 ? '🌊 Body Spray (Mid-Budget): 4–6 body spray nozzles require upgrading to a 3/4-inch supply line and a water heater that can supply 3+ GPM continuously. Budget $2,000–3,000 for valve, nozzles, and supply upgrade. Hire a plumber to verify your water heater capacity first.' : '🌊 Body Spray (Full System): Full body spray with thermostatic valve, volume controls, and 6+ nozzles: $4,000–8,000 installed. Requires 3/4-inch supply line, demand water heater (tankless recommended), and a water softener to protect the nozzles from DFW hard water deposits.',
      steam: '💨 Steam Shower (DFW): Steam generators need a dedicated 240V circuit and watertight glass enclosure. DFW hard water will destroy a generator without a whole-home water softener or dedicated steam filter. Budget $3,500–7,000 total. Requires licensed electrician + plumber. Permit required in most DFW municipalities.',
      basic: '✅ Basic Upgrade: Replace valve cartridge ($150–300) and showerhead ($80–200 installed). In DFW, add a shower filter ($60) to extend showerhead life 3x. This is the highest ROI upgrade — most DFW homeowners skip it and replace heads every 2 years instead.',
    };
    setResult(guides[goal] || 'Select a goal for your guide.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🚿 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Shower System Upgrade Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW hard water is shower equipments worst enemy. Every upgrade guide below factors in filtration — the step most contractors skip.</p>

        <div style={{ background: '#1e3a5f', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>🏜️ DFW Hard Water Warning:</strong>
          <span style={{ color: '#bfdbfe' }}> Dallas water averages 250–350 mg/L hardness — among the hardest in Texas. Thermostatic valves, rain heads, and body sprays all require filtration to avoid $1,000+ replacement costs every 3–4 years.</span>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Shower Upgrade Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <select value={goal} onChange={e=>setGoal(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem' }}>
              <option value="">Upgrade goal...</option>
              <option value="basic">Basic refresh</option>
              <option value="rain">Rain head system</option>
              <option value="body">Body spray system</option>
              <option value="steam">Steam shower</option>
            </select>
            <select value={budget} onChange={e=>setBudget(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem' }}>
              <option value="">Budget range...</option>
              <option value="500">Under $1,500</option>
              <option value="2000">$1,500–$3,000</option>
              <option value="5000">$3,000+</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get My Upgrade Guide</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>💡 DFW Shower Pro Tips</h3>
          {['Install a shower filter before any premium valve — saves $800+ in valve replacements','Thermostatic valves maintain temperature during DFW city pressure swings','Body sprays need 3/4-inch supply — most DFW homes have 1/2-inch to shower','Steam showers require sealed glass doors — not just a curtain'].map((s,i)=>(
            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#cbd5e1' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

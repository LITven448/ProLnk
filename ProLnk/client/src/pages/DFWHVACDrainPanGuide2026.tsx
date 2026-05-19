import { useState } from 'react';

export default function DFWHVACDrainPanGuide2026() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');

  const components = [
    { icon: '💧', name: 'Primary Drain Pan', detail: 'Directly under evaporator coil inside air handler. Catches condensate year-round — DFW produces 20–30 gallons per day in summer. Drains to condensate line.' },
    { icon: '🛡️', name: 'Secondary Drain Pan', detail: 'Sits under entire air handler unit. Only fills if primary pan clogs or overflows. Usually connected to visible drain (drip line outside, or into utility sink).' },
    { icon: '🔌', name: 'Float Switch', detail: 'Safety switch inside primary pan. If water rises (clogged drain), switch shuts off AC system. Prevents water damage. Critical in DFW attic installs.' },
    { icon: '💊', name: 'Drain Pan Tablets', detail: 'Monthly tablet drops into primary pan. Contains algaecide to prevent algae growth in DFW humidity. $10–$20 per year insurance against drain clogs.' },
  ];

  const guides: Record<string, string> = {
    rust: '🔴 RUSTED DRAIN PAN: Primary drain pan rust = replacement required. A rusted-through pan will leak onto ceiling below (DFW attic installs) causing $2,000–$10,000 in drywall/structural damage. Replacement cost: $150–$400 for pan + labor. Do not delay — rust accelerates in DFW humidity. If pan is cast aluminum or plastic, it will not rust (newer systems). Only older galvanized steel pans rust.',
    clog: '🚫 CLOGGED DRAIN LINE: Most common DFW HVAC service call in summer. Algae builds in condensate drain from humidity. Fix: (1) Pour 1/4 cup white vinegar into drain pan access port monthly. (2) Wet/dry vac the drain line exit from outside. (3) If float switch tripped, reset after clearing clog. Prevent with drain pan tablets. If clogging repeatedly, install condensate pump or increase drain line slope.',
    overflow: '🌊 PAN OVERFLOW / WATER LEAK: If water on floor below air handler: (1) Check if float switch tripped — system off = float switch working correctly. (2) Turn off AC at thermostat. (3) Find and clear drain clog before restarting. (4) Check secondary pan — if it also has water, primary has been overflowing for a while. DFW attic overflow = ceiling damage risk. Call HVAC same day.',
    no_float: '⚠️ NO FLOAT SWITCH INSTALLED: High risk for DFW attic systems. Without float switch, clogged drain overflows silently for days until ceiling collapses. Float switch installation: $75–$150. Best investment for any DFW attic HVAC system. Can be added to existing systems easily. Some DFW HOAs require it for coverage of water damage claims.',
    algae: '🦠 ALGAE / SLIME IN PAN: Common in DFW June–September. Green/black slime in pan = algae from moisture + heat. Solution: (1) Turn off system. (2) Remove standing water with wet/dry vac. (3) Spray pan with diluted bleach solution (1:16). (4) Let dry. (5) Drop in drain pan tablet. (6) Install UV light to prevent recurrence. Monthly vinegar treatment prevents return.',
  };

  const assess = () => {
    if (!issue) { setResult('Please select a drain pan issue.'); return; }
    setResult(guides[issue] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 Drain Pan Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>
          DFW summer produces <strong style={{ color: '#F5E642′ }}>20–30 gallons of condensate per day</strong> from your AC system. Drain pans and condensate lines are small components with massive damage potential when they fail.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 8, padding: '12px 16px', marginBottom: 28, color: '#94a3b8', fontSize: 13 }}>
          📊 No. 1 cause of homeowner insurance claims from HVAC in DFW: condensate overflow into ceiling/walls. Average claim: $4,200.
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Drain Pan System Components</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {components.map(c => (
            <div key={c.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.icon} {c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{c.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Drain Pan Issue to Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Issue</label>
            <select value={issue} onChange={e => setIssue(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select issue...</option>
              <option value="rust">Drain pan is rusty or corroded</option>
              <option value="clog">Drain line keeps clogging</option>
              <option value="overflow">Water on floor / ceiling stain below air handler</option>
              <option value="no_float">No float switch installed (attic system)</option>
              <option value="algae">Algae or slime visible in pan</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Drain Pan Guide
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 13, lineHeight: 1.7 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          🗓️ <strong style={{ color: '#F5E642′ }}>DFW Drain Pan Maintenance Schedule:</strong> Every April — inspect pan for rust, drop in tablet, pour vinegar in drain. Every June/July — check secondary pan for water. Every filter change — glance at primary pan. ProLnk connects you with DFW HVAC pros for annual tune-ups that include drain pan service.
        </div>
      </div>
    </div>
  );
}

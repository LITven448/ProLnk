import { useState } from 'react';

export default function DFWGasValveGuide2026() {
  const [situation, setSituation] = useState('smell-gas');
  const [guide, setGuide] = useState('');

  const situations = [
    { value: 'smell-gas', label: 'Smelling Gas Indoors' },
    { value: 'appliance-shutoff', label: 'Shutting Off Single Appliance' },
    { value: 'main-shutoff', label: 'Shutting Off Main Gas Meter' },
    { value: 'after-flood', label: 'After Flooding / Storm' },
    { value: 'csst-bonding', label: 'CSST Flexible Gas Lines' },
    { value: 'restoration', label: 'Restoring Gas After Shutoff' },
  ];

  const guides: Record<string, string> = {
    'smell-gas': '🚨 Evacuate Immediately: Do NOT flip light switches, use phone indoors, or create sparks. Leave door open as you exit. Call Atmos Energy from outside: 1-888-286-6700 (24/7 emergency). Do not re-enter until cleared by Atmos. Atmos response is free and typically under 60 minutes in DFW.',
    'appliance-shutoff': '🔵 Ball Valve (Quarter Turn): Look for valve on gas line directly behind/below appliance (water heater, furnace, range, dryer). Ball valve = lever handle. Turn 90° perpendicular to pipe = OFF. Gate valve = round wheel knob, turn clockwise to close. If no valve present, call a DFW plumber to install one ($75–$150).',
    'main-shutoff': '🔑 Meter Valve Requires Tool: The main shutoff at your Atmos gas meter has a rectangular stem — requires a crescent wrench or gas shutoff key. Turn 90° to close (perpendicular to pipe). IMPORTANT: Only Atmos Energy can restore gas after main shutoff — they must perform a safety inspection and re-light pilots. Call 1-888-286-6700.',
    'after-flood': '⚠️ Shut Main Before Water Enters: If flood water threatens gas appliances, shut main meter valve preemptively. After flood: do NOT restore gas yourself — call Atmos. Flood water contaminates pilot assemblies and can block gas orifices. Full appliance inspection required before relighting.',
    'csst-bonding': '⚡ CSST Lightning Risk: Corrugated Stainless Steel Tubing (CSST) — yellow flexible gas line common in DFW homes built after 1990 — is vulnerable to lightning strike arc-through. IRC requires CSST to be bonded to electrical ground. If your home has CSST and you see yellow flexible gas pipe without a bonding clamp, have a licensed plumber add bonding. Cost: $200–$500. Shutoff valves on CSST: same quarter-turn ball valve standard applies.',
    'restoration': '📞 Atmos Only: After any main meter shutoff, Atmos Energy must restore gas — this is non-negotiable for safety and liability. Call 1-888-286-6700. Technician will: pressurize line, check for leaks, relight all pilots (water heater, furnace, range). Typical response: same-day in DFW. Restoration is free. Do NOT attempt to restore main gas yourself.',
  };

  const getGuide = () => setGuide(guides[situation] || '');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Gas Shutoff Valve Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Understanding Gas Shutoffs in DFW — Atmos Energy, Ball Valves, CSST Bonding</p>
        </div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: 20, border: '1px solid #EF4444', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🚨</span>
            <div>
              <div style={{ color: '#FCA5A5', fontWeight: 700, fontSize: 16 }}>Gas Emergency: Call Atmos 24/7</div>
              <div style={{ color: '#FECACA', fontSize: 14 }}>1-888-286-6700 — Free emergency response throughout DFW</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '🔵', title: 'Ball Valve (Best)', body: 'Quarter-turn lever handle. Turn 90° (perpendicular to pipe) = OFF. Modern DFW homes and new installations use ball valves. Reliable even after years of disuse.' },
            { icon: '⚙️', title: 'Gate Valve (Older)', body: 'Round wheel knob. Turn clockwise to close. Older DFW homes (pre-1990) often have gate valves. These can seize when unused for years — replace with ball valves proactively.' },
            { icon: '🔑', title: 'Meter Valve', body: 'Rectangular stem at Atmos meter — requires wrench or gas key. Turn 90°. Only Atmos can restore after main shutoff. Keep a crescent wrench accessible in garage.' },
            { icon: '⚡', title: 'CSST Valves', body: 'Yellow flexible CSST lines have ball valves at connections. Ensure CSST is properly bonded to electrical ground — DFW lightning risk is significant. Inspect bonding clamps annually.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Gas Situation Guide</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Gas Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              {situations.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Gas Shutoff Guide</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642′ }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Gas Shutoff Valve Guide 2026</p>
      </div>
    </div>
  );
}

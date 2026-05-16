import { useState } from 'react';

export default function DFWWaterPressureBoosterGuide2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');

  const diagnose = () => {
    if (!location) { setResult('Please select a pressure problem location.'); return; }
    const solutions: Record<string,string> = {
      whole: '🔧 Whole-home low pressure: Start with pressure regulator replacement ($250–400 parts + labor). If PRV is fine, add a booster pump ($400–800 + $300–500 install). Most DFW homes with PRVs built 1990–2010 need this by now.',
      showers: '🚿 Shower-only low pressure: Likely a flow restrictor or clogged showerhead from DFW hard water. Try a water softener or descaler first ($30). If multiple showers, check PRV setting — ideal 60–80 PSI.',
      upstairs: '🏠 Upstairs only: Classic pressure drop. Each floor loses ~5 PSI. If you have 3+ stories or upstairs feels weak, a booster pump with pressure tank ($700–1,200 installed) solves this permanently.',
      kitchen: '🍳 Kitchen only: Check aerator (unscrew and clean). Hard water clogs aerators in DFW every 6–12 months. If clean, check shutoff valve under sink — often partially closed after repairs.',
      outside: '🌿 Outdoor low pressure: Irrigation systems can drop pressure for the whole house when running. Add a dedicated irrigation pressure regulator ($50–150). Also check for leaks in your main line.',
    };
    setResult(solutions[location] || 'Select a specific location for tailored advice.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💧 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Water Pressure Booster Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Low water pressure plagues many DFW homes. City pressure fluctuates, PRVs age out, and hard water clogs everything. Here are your solutions.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{icon:'💰',label:'PRV replacement',val:'$250–400'},{icon:'⚡',label:'Booster pump',val:'$700–1,300'},{icon:'📊',label:'Ideal PSI range',val:'60–80 PSI'}].map(c=>(
            <div key={c.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem' }}>{c.val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Pressure Problem Locator</h2>
          <select value={location} onChange={e=>setLocation(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Where is pressure low?</option>
            <option value="whole">Whole house</option>
            <option value="showers">Showers only</option>
            <option value="upstairs">Upstairs only</option>
            <option value="kitchen">Kitchen only</option>
            <option value="outside">Outdoor / irrigation</option>
          </select>
          <button onClick={diagnose} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get My Solution</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ DFW-Specific Pressure Issues</h3>
          {['City pressure varies widely — Dallas city limits vs. suburbs can differ by 20+ PSI','PRVs typically last 10–15 years; many 2000s-era DFW homes are overdue','Hard water deposits narrow pipe interiors 10–20% over 20 years','Booster pumps require dedicated 120V outlet near main line — factor into install cost'].map((s,i)=>(
            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.6rem' }}>
              <span style={{ color: '#F5E642' }}>›</span>
              <span style={{ color: '#cbd5e1' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

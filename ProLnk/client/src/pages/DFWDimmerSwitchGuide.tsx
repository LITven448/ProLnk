import { useState } from 'react';

const recommendations: Record<string, { dimmer: string; neutral: string; cost: string; note: string }> = {
  led_smart: { dimmer: 'Lutron Caseta PD-6WCL', neutral: 'No neutral required', cost: '$60–$80', note: 'Best for DFW — Lutron mesh is far more reliable than Z-Wave in DFW\’s dense suburbs.' },
  led_basic: { dimmer: 'Lutron Diva DVELV-300P', neutral: 'Not required', cost: '$25–$40', note: 'Eliminates buzzing from most LED bulbs. Check bulb compatibility list on Lutron site.' },
  incandescent_smart: { dimmer: 'Lutron Caseta PD-6ANS', neutral: 'Required — check your box', cost: '$65–$85', note: 'Works with any incandescent load. If no neutral wire, use PD-6WCL instead.' },
  incandescent_basic: { dimmer: 'Lutron Skylark CL', neutral: 'Not required', cost: '$15–$25', note: 'Simple, reliable, no-fuss dimmer for traditional incandescent bulbs.' },
};

export default function DFWDimmerSwitchGuide() {
  const [wiring, setWiring] = useState('');
  const [bulb, setBulb] = useState('');
  const [smart, setSmart] = useState('');
  const [result, setResult] = useState<null | { dimmer: string; neutral: string; cost: string; note: string }>(null);

  function assess() {
    if (!wiring || !bulb || !smart) return;
    const key = `${bulb}_${smart}`;
    setResult(recommendations[key] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🔆 DFW Dimmer Switch Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Upgrading to dimmers saves 5–10% on lighting costs and transforms your home's ambiance. But DFW homeowners with LED bulbs need the right dimmer.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚠️ The DFW LED Buzzing Problem</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Most DFW homes have switched to LED bulbs, but older dimmers (designed for incandescent) cause LEDs to buzz, flicker, or not dim smoothly. The fix: a <strong style={{ color: '#F5E642' }}>CL-rated dimmer</strong> designed for LED/CFL loads.
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔌 Neutral Wire Requirement</div>
          <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Smart dimmers often need a <strong style={{ color: '#cbd5e1' }}>neutral wire</strong> (white wire in switch box). Homes built after 2000 usually have it. Pre-2000 DFW homes often do not.</div>
          <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            💡 Check: turn off circuit, remove switch, look for a white wire bundle not connected to the switch. That's your neutral.
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Dimmer Recommendation Tool</div>
          {[
            { label: 'Current Wiring', value: wiring, setter: setWiring, options: [['has_neutral', 'Has neutral wire'], ['no_neutral', 'No neutral wire'], ['unknown', "Don't know yet"]] },
            { label: 'Bulb Type', value: bulb, setter: setBulb, options: [['led', 'LED (most DFW homes)'], ['incandescent', 'Incandescent / Halogen']] },
            { label: 'Want Smart Control?', value: smart, setter: setSmart, options: [['smart', 'Yes — app + voice control'], ['basic', 'No — just a dimmer']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155' }}>
                <option value="">Select...</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: '#001a2e', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>✅ Recommended: {result.dimmer}</div>
              <div style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>🔌 {result.neutral} &nbsp;|&nbsp; 💰 {result.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📡 Why Lutron Caseta for DFW</div>
          <div style={{ color: '#94a3b8' }}>Lutron uses its own Clear Connect RF protocol — not Z-Wave or Zigbee. In DFW's dense suburban neighborhoods, Lutron is dramatically more reliable and doesn't compete with neighbor WiFi or smart home interference.</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const cordData: Record<string, Record<string, { gauge: string; warning: string; alternative: string }>> = {
  'ac-window': {
    'indoor-temporary': { gauge: '12 AWG (20A rated)', warning: 'Window ACs draw 5-15A continuously. Extension cords overheat under sustained load.', alternative: 'Have an electrician install a dedicated 20A outlet — DFW summer demand makes this essential.' },
    'outdoor-temporary': { gauge: 'Not recommended', warning: 'Outdoor AC units must be on dedicated circuits. Extension cords are a code violation and fire hazard.', alternative: 'Call a licensed DFW electrician for a dedicated outdoor circuit.' },
  },
  'power-tool': {
    'indoor-temporary': { gauge: '14 AWG (15A)', warning: 'Keep cord length under 50 ft. Longer runs increase resistance and heat.', alternative: 'Use a heavy-duty extension rated for tools with a built-in circuit breaker.' },
    'outdoor-temporary': { gauge: '12 AWG outdoor-rated (SJTW)', warning: 'Must be marked "W" for outdoor use. DFW heat degrades non-rated cords quickly.', alternative: 'Look for cords with lighted ends to confirm power delivery.' },
  },
  'lamp': {
    'indoor-temporary': { gauge: '16 AWG (13A)', warning: 'Only for low-wattage lamps. Do not run under rugs or furniture.', alternative: 'Use a surge-protected power strip for permanent lamp placement.' },
    'outdoor-temporary': { gauge: '16 AWG outdoor-rated (SPT-2)', warning: 'Only for temporary lighting. DFW afternoon temps can soften non-rated cord insulation.', alternative: 'Install outdoor outlets with GFCI protection for patio or yard lighting.' },
  },
  'space-heater': {
    'indoor-temporary': { gauge: 'Never use an extension cord', warning: 'Space heaters draw 1,000-1,500W continuously. This is the #1 cause of extension cord fires in DFW homes.', alternative: 'Plug directly into a wall outlet. If the outlet will not reach, move the heater.' },
    'outdoor-temporary': { gauge: 'Never use an extension cord', warning: 'Outdoor space heater use on extension cords is a severe fire risk regardless of cord gauge.', alternative: 'Use a properly installed outdoor-rated heater on a GFCI outlet.' },
  },
};

const deviceOptions = [
  { value: 'ac-window', label: 'Window / Portable AC' },
  { value: 'power-tool', label: 'Power Tool' },
  { value: 'lamp', label: 'Lamp / Light' },
  { value: 'space-heater', label: 'Space Heater' },
];

const useOptions = [
  { value: 'indoor-temporary', label: 'Indoor - Temporary Use' },
  { value: 'outdoor-temporary', label: 'Outdoor - Temporary Use' },
];

export default function DFWExtensionCordSafety() {
  const [device, setDevice] = useState('');
  const [use, setUse] = useState('');

  const result = device && use ? cordData[device]?.[use] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔌</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Extension Cord Safety Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          Every DFW summer, electrical fires spike as homeowners plug window ACs and fans into undersized extension cords.
          In 2023, extension cord misuse caused over 4,700 residential fires nationally — and DFW extreme AC demand puts local homes at elevated risk.
        </p>
        <div style={{ background: '#FF4444', borderRadius: 10, padding: '14px 18px', marginBottom: 28, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 22 }}>🚨</span>
          <div>
            <strong>DFW Summer Risk:</strong> Running a window AC on an extension cord for 8+ hours a day is one of the most common causes of house fires in North Texas. Extension cords are not designed for sustained high-amperage loads.
          </div>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Get Your Cord Recommendation</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Device Type</label>
          <select value={device} onChange={e => setDevice(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select device...</option>
            {deviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Intended Use</label>
          <select value={use} onChange={e => setUse(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select use...</option>
            {useOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642′ }}>Recommended Cord:</strong> <span>{result.gauge}</span></div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#FF9944′ }}>Warning:</strong> {result.warning}</div>
              <div><strong style={{ color: '#44BBFF' }}>Better Alternative:</strong> {result.alternative}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Extension Cord Rules</h2>
          {[
            { icon: '🌡️', title: 'Heat degrades cords faster', body: 'DFW attic and garage temps exceed 130F in summer. Never store or run cords through hot spaces.' },
            { icon: '🚫', title: 'No cords under rugs or through walls', body: 'This is a fire code violation in Texas and hides damage that causes ignition.' },
            { icon: '🔍', title: 'Inspect before every season', body: 'Cracked insulation, bent prongs, or melted plastic means replace immediately.' },
            { icon: '🏠', title: 'Permanent use means permanent wiring', body: 'If you have used the same extension cord for 30+ days, it is time to call an electrician.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div><strong style={{ color: '#E8EDF5′ }}>{item.title}:</strong> <span style={{ color: '#8FA3BF' }}>{item.body}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

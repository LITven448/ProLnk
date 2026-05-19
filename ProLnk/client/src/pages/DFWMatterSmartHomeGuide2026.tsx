import { useState } from 'react';

export default function DFWMatterSmartHomeGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');

  const devices = [
    { id: 'ecobee', label: '🌡️ Ecobee Thermostat', matter: true },
    { id: 'yale', label: '🔐 Yale Smart Lock', matter: true },
    { id: 'aqara', label: '💡 Aqara Devices', matter: true },
    { id: 'eve', label: '🌿 Eve Energy', matter: true },
    { id: 'ring', label: '📷 Ring Cameras', matter: false },
    { id: 'nest', label: '🔵 Nest Thermostat', matter: false },
    { id: 'kasa', label: '🔌 Kasa Smart Plugs', matter: false },
    { id: 'wemo', label: '⚡ Wemo Switches', matter: false },
  ];

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function checkCompatibility() {
    const compatible = selected.filter(id => devices.find(d => d.id === id)?.matter);
    const notCompatible = selected.filter(id => !devices.find(d => d.id === id)?.matter);
    let msg = '';
    if (compatible.length > 0) msg += `✅ Matter-compatible: ${compatible.join(', ')}. `;
    if (notCompatible.length > 0) msg += `⚠️ Not yet Matter: ${notCompatible.join(', ')}. Check for firmware updates.`;
    if (selected.length === 0) msg = 'Select your devices above first.';
    setResult(msg);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0' }}>Matter Smart Home Standard — DFW Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>No more ecosystem lock-in. Matter lets your DFW smart home devices talk to each other, regardless of brand.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {['🏠 Works with Alexa, Google, Apple','🔒 Local control, no cloud dependency','⚡ Instant device pairing','🌡️ Ecobee Matter-ready (firmware update)','🔐 Yale Assure Lock 2 Matter-native','💡 Aqara full Matter lineup 2025'].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '1rem', color: '#cbd5e1', fontSize: '.9rem', lineHeight: '1.5' }}>{item}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Matter Compatibility Checker</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Select your existing or planned DFW smart home devices:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1rem' }}>
            {devices.map(d => (
              <button key={d.id} onClick={() => toggle(d.id)}
                style={{ padding: '.75rem', borderRadius: '8px', border: selected.includes(d.id) ? '2px solid #F5E642' : '2px solid #1e3a5f', backgroundColor: selected.includes(d.id) ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '.9rem' }}>
                {d.label} {d.matter ? '✅' : '🔄'}
              </button>
            ))}
          </div>
          <p style={{ color: '#64748b', fontSize: '.8rem', marginBottom: '1rem' }}>✅ = Matter compatible | 🔄 = Update pending or roadmap</p>
          <button onClick={checkCompatibility} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Check My Devices →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642', lineHeight: '1.6' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>🏗️ Why Matter Matters for DFW Homeowners</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>DFW has one of the fastest smart home adoption rates in the US. Matter eliminates the frustration of buying a device that only works with one ecosystem. A Frisco homeowner can now control their Yale lock, Ecobee thermostat, and Eve sensors all from a single app — regardless of whether they prefer Alexa, Google, or Apple HomeKit.</p>
        </div>
      </div>
    </div>
  );
}

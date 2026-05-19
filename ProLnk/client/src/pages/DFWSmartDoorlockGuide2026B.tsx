import { useState } from 'react';

export default function DFWSmartDoorlockGuide2026B() {
  const [doorType, setDoorType] = useState('standard');
  const [ecosystem, setEcosystem] = useState('amazon');

  const getRec = () => {
    const recs: Record<string, Record<string, { lock: string; protocol: string; install: string; autoLock: string; tip: string }>> = {
      standard: {
        amazon: { lock: 'Schlage Encode Plus (Matter/Wi-Fi)', protocol: 'Wi-Fi + Matter', install: '30 min DIY — replaces deadbolt, no wiring', autoLock: 'Set 5-min auto-lock for DFW security', tip: 'Check deadbolt backset: 2-3/8″ or 2-3/4″ before ordering' },
        apple: { lock: 'Schlage Encode Plus (HomeKit)', protocol: 'Wi-Fi + Matter', install: '30 min DIY', autoLock: 'Works with Apple Home automation', tip: 'HomeKit requires Apple Home hub (HomePod or Apple TV) for remote access' },
        google: { lock: 'Yale Assure Lock 2 (Matter)', protocol: 'Matter over Wi-Fi', install: '45 min DIY', autoLock: 'Set via Google Home app', tip: 'Yale has the slimmest profile — good for DFW interior doors' },
        zwave: { lock: 'Schlage BE469ZP (Z-Wave)', protocol: 'Z-Wave 700', install: '45 min DIY', autoLock: 'Set via SmartThings or Hubitat', tip: 'Z-Wave locks most reliable for home automation triggers' },
      },
      commercial: {
        amazon: { lock: 'Kwikset Halo Touch (Fingerprint)', protocol: 'Wi-Fi', install: '60 min — commercial-grade deadbolt prep needed', autoLock: 'Always-on auto-lock recommended', tip: 'Fingerprint entry ideal for frequent contractor access in DFW' },
        apple: { lock: 'Level Lock+ (HomeKit, flush mount)', protocol: 'Bluetooth + Wi-Fi bridge', install: '60 min DIY', autoLock: 'Automations via Apple Home', tip: 'Level Lock installs inside existing hardware — looks unchanged from outside' },
        google: { lock: 'Yale Keyless Connected (Zigbee)', protocol: 'Zigbee', install: '60 min DIY', autoLock: '3-min auto-lock for commercial use', tip: 'Hire locksmith for commercial door prep in DFW if needed' },
        zwave: { lock: 'Kwikset 914 (Z-Wave)', protocol: 'Z-Wave 500', install: '60 min DIY', autoLock: 'Configurable via hub', tip: 'Use Z-Wave for commercial if running full home automation' },
      },
    };
    return recs[doorType]?.[ecosystem] || recs.standard.amazon;
  };

  const rec = getRec();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Smart Lock Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Smart lock installation and setup guide for DFW homeowners</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ DFW Security Best Practices</h2>
          {[
            { icon: '⏱️', tip: 'Set auto-lock to 5 minutes — most DFW break-ins are through unlocked doors' },
            { icon: '👷', tip: 'Create unique contractor codes — delete immediately after job completion' },
            { icon: '🔋', tip: 'Check battery monthly — most smart locks fail silently at low battery' },
            { icon: '📱', tip: 'Enable lock/unlock notifications for real-time DFW home awareness' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{item.tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your Lock Recommendation</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Door Type</label>
              <select value={doorType} onChange={e => setDoorType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="standard">Standard Residential Door</option>
                <option value="commercial">Commercial / Heavy-Use Door</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Smart Home Ecosystem</label>
              <select value={ecosystem} onChange={e => setEcosystem(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="amazon">Amazon Alexa</option>
                <option value="apple">Apple HomeKit</option>
                <option value="google">Google Home</option>
                <option value="zwave">Z-Wave / SmartThings</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recommended: {rec.lock}</div>
            {[
              { label: 'Protocol', value: rec.protocol },
              { label: 'Install', value: rec.install },
              { label: 'Auto-Lock', value: rec.autoLock },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: 13, minWidth: 90 }}>{row.label}</span>
                <span style={{ color: '#e2e8f0', fontSize: 13, textAlign: 'right', maxWidth: '65%' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#112240', borderRadius: 6, color: '#F5E642', fontSize: 13 }}>
              💡 {rec.tip}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW locksmith or smart home pro to install your smart lock? <span style={{ color: '#F5E642′ }}>ProLnk connects you with vetted local pros.</span></p>
        </div>
      </div>
    </div>
  );
}

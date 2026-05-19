import { useState } from 'react';

const detectors = [
  { id: 'nest', icon: '🟢', label: 'Nest Protect', ecosystem: 'Google / Matter', price: '$119/unit', selfTest: true, phoneAlert: true, falseAlarm: 'Split-spectrum sensor reduces DFW kitchen false alarms. Pathlight doubles as night light.', standout: 'Steam Check technology reduces false alarms from DFW summer steam; ERCOT-awareness via API integration possible.' },
  { id: 'kidde', icon: '🔵', label: 'Kidde Alexa-Integrated', ecosystem: 'Amazon Alexa', price: '$49–$79/unit', selfTest: true, phoneAlert: true, falseAlarm: 'Standard ionization sensor — can false alarm in DFW kitchens with high-heat cooking.', standout: 'Alexa announces alarm verbally room-by-room. Works with Echo devices already in 60% of DFW homes.' },
  { id: 'firstalert', icon: '🔴', label: 'First Alert Z-Wave', ecosystem: 'Z-Wave / SmartThings / Hubitat', price: '$45–$65/unit', selfTest: false, phoneAlert: true, falseAlarm: 'Photoelectric sensor — fewer DFW kitchen false alarms. Ideal near cooking areas.', standout: 'Best for DFW homeowners with existing Z-Wave smart home hubs. Deep automation — trigger lights, unlock doors on alarm.' },
  { id: 'hardwired', icon: '⚡', label: 'Hardwired Interconnected Smart', ecosystem: 'Ring / SimpliSafe / ADT', price: '$60–$150/unit + install', selfTest: true, phoneAlert: true, falseAlarm: 'Professional-grade dual sensor. Hush button accessible via app — critical for DFW kitchens.', standout: 'Required in DFW new construction per IRC 2021. Integrates with full security system — police/fire dispatch on alarm.' },
];

const homeTypes = [
  { type: 'New Construction (2020+)', guide: 'Hardwired interconnected smart detectors required by code. Choose Ring or SimpliSafe integration if you have a security system. Nest Protect if Google ecosystem.' },
  { type: 'Existing Home (Pre-2010)', guide: 'Battery smart detectors easiest to add. Nest Protect or Kidde with Alexa are DFW favorites. Add one per floor minimum, near each bedroom.' },
  { type: 'Rental Property', guide: 'First Alert Z-Wave or Kidde — lower cost, easy tenant management via app. Landlords can test remotely. DFW code requires one per bedroom.' },
  { type: 'Large DFW Home (4,000+ sq ft)', guide: 'Full interconnected system essential. Nest Protect allows 18 devices per account. Hardwired + battery hybrid covers outages.' },
];

export default function DFWSmartSmokeDetector2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [homeType, setHomeType] = useState<string | null>(null);

  const det = detectors.find(d => d.id === selected);
  const home = homeTypes.find(h => h.type === homeType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📱</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Smart Smoke Detector Guide 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>Connected detectors for North Texas homes</p>
        </div>

        <div style={{ background: '#1A2840', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: '#F5E642′ }}>DFW Kitchen Alert:</strong> High-heat Texas cooking (cast iron, outdoor-style indoor grills) causes frequent false alarms.
          Choose photoelectric or dual-sensor smart detectors with a hush-from-app feature. Reduces alarm fatigue that leads to disabled detectors.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Choose a Smart Detector</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))', gap: 12, marginBottom: 24 }}>
          {detectors.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              style={{ background: selected === d.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === d.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 28 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#E8F4FD', margin: '6px 0 4px' }}>{d.label}</div>
              <div style={{ fontSize: 12, color: '#F5E642′ }}>{d.price}</div>
              <div style={{ fontSize: 11, color: '#8BA5C4', marginTop: 4 }}>{d.ecosystem}</div>
            </button>
          ))}
        </div>

        {det && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 14px' }}>{det.icon} {det.label}</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ background: det.selfTest ? '#0A2010′ : '#200A0A', borderRadius: 8, padding: '8px 12px', flex: 1, textAlign: ’center' }}>
                <div style={{ fontSize: 18 }}>{det.selfTest ? '✅' : '❌'}</div>
                <div style={{ fontSize: 12, color: '#8BA5C4′ }}>Self-Test</div>
              </div>
              <div style={{ background: det.phoneAlert ? '#0A2010′ : '#200A0A', borderRadius: 8, padding: '8px 12px', flex: 1, textAlign: ’center' }}>
                <div style={{ fontSize: 18 }}>{det.phoneAlert ? '✅' : '❌'}</div>
                <div style={{ fontSize: 12, color: '#8BA5C4′ }}>Phone Alert</div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DFW KITCHEN BEHAVIOR</div>
              <p style={{ color: '#B8D4EA', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{det.falseAlarm}</p>
            </div>
            <div style={{ background: '#1A2840', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>STANDOUT FEATURE</div>
              <p style={{ color: '#F5E642', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{det.standout}</p>
            </div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Your Home Type → Guide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {homeTypes.map(h => (
            <button key={h.type} onClick={() => setHomeType(h.type)}
              style={{ background: homeType === h.type ? '#1E3A5F' : '#0F2040', border: `2px solid ${homeType === h.type ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: homeType === h.type ? 8 : 0 }}>{h.type}</div>
              {homeType === h.type && <div style={{ fontSize: 14, color: '#B8D4EA', lineHeight: 1.6 }}>{h.guide}</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';

export default function DFWSmartHomeProtocolsGuide2026() {
  const [goal, setGoal] = useState('reliability');

  const getProtocol = () => {
    const protocols: Record<string, { name: string; why: string; devices: string; hub: string; tip: string }> = {
      reliability: { name: 'Z-Wave', why: 'Dedicated 908MHz spectrum — zero Wi-Fi interference in DFW homes', devices: 'Locks, switches, sensors, thermostats', hub: 'SmartThings, Hubitat, or Home Assistant', tip: 'Z-Wave mesh self-heals — more devices = stronger network' },
      future: { name: 'Matter', why: 'Industry standard — works with Apple, Google, Amazon ecosystems', devices: 'Lights, plugs, locks, thermostats (Matter 1.3+)', hub: 'Any Matter-certified controller (no single hub lock-in)', tip: 'Buy Matter-compatible devices now — older devices can’t upgrade' },
      easy: { name: 'Wi-Fi Direct', why: 'No hub needed — works with any router you already have', devices: 'Cameras, video doorbells, smart plugs, bulbs', hub: 'None required — app-controlled', tip: 'Limit to 20-30 Wi-Fi smart devices max — 2.4GHz gets crowded' },
      automation: { name: 'Zigbee', why: 'Low power, fast mesh — ideal for sensors and automation triggers', devices: 'Motion sensors, door/window sensors, smart bulbs', hub: 'Philips Hue bridge, SmartThings, Hubitat', tip: 'Zigbee and Z-Wave can coexist on same hub for best coverage' },
    };
    return protocols[goal] || protocols.reliability;
  };

  const rec = getProtocol();

  const protocols = [
    { name: 'Matter', icon: '🌐', freq: 'Wi-Fi/Thread/BT', range: 'Varies', note: 'Future standard — buy these first' },
    { name: 'Z-Wave', icon: '📡', freq: '908 MHz', range: '100ft', note: 'Most reliable for locks and switches' },
    { name: 'Zigbee', icon: '🔷', freq: '2.4 GHz', range: '30ft', note: 'Great for sensors, large mesh' },
    { name: 'Wi-Fi Direct', icon: '📶', freq: '2.4/5 GHz', range: '150ft', note: 'Easy setup, congested spectrum' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Smart Home Protocols Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Z-Wave vs Zigbee vs Matter vs Wi-Fi — which is right for your DFW home?</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Protocol Comparison</h2>
          {protocols.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 90px 1fr 1fr', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{p.name}</span>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>{p.freq} · {p.range}</span>
              <span style={{ color: '#cbd5e1', fontSize: 12 }}>{p.note}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Get Your Protocol Recommendation</h2>
          <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14, marginBottom: 20 }}>
            <option value="reliability">Maximum Reliability</option>
            <option value="future">Future-Proof Ecosystem</option>
            <option value="easy">Easiest Setup</option>
            <option value="automation">Heavy Automation / Sensors</option>
          </select>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Recommended: {rec.name}</div>
            {[
              { label: 'Why', value: rec.why },
              { label: 'Best Devices', value: rec.devices },
              { label: 'Hub', value: rec.hub },
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
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW smart home installer to set up your protocol and devices? <span style={{ color: '#F5E642′ }}>ProLnk connects you with vetted local smart home pros.</span></p>
        </div>
      </div>
    </div>
  );
}

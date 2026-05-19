import { useState } from 'react';

const needs = [
  {
    label: 'Basic WFH Setup',
    icon: '💻',
    priorities: [
      { item: 'Wi-Fi Mesh System (Eero Pro 6E / Orbi)', reason: 'DFW large homes kill Wi-Fi dead zones', cost: '$300–600' },
      { item: 'UPS Battery Backup', reason: 'ERCOT grid events can crash unprotected computers', cost: '$80–200' },
      { item: 'Smart Lighting (Philips Hue)', reason: 'Color-tuned light improves video call quality and focus', cost: '$150–300' },
    ],
  },
  {
    label: 'Video-Heavy (Calls/Streaming)',
    icon: '🎥',
    priorities: [
      { item: 'Wired Ethernet to Desk', reason: 'Eliminates Wi-Fi drops during video calls', cost: '$50–200 install' },
      { item: 'Smart Dimmer + Bias Lighting', reason: 'Controls background appearance on camera', cost: '$100–200' },
      { item: 'GFCI Protected Office Circuit', reason: 'Protects expensive AV gear from surges', cost: '$200–400 install' },
    ],
  },
  {
    label: 'Power-User / Creator',
    icon: '⚡',
    priorities: [
      { item: 'Dedicated 20A Circuit', reason: 'Prevents tripping from high-wattage gear', cost: '$300–600 install' },
      { item: 'Whole-Home UPS / Generator', reason: 'ERCOT outages can last hours — keep working', cost: '$500–5K' },
      { item: 'Smart Thermostat (Ecobee/Nest)', reason: 'Auto-adjust office temp during work hours, save on WFH energy bill', cost: '$200–300' },
    ],
  },
];

export default function DFWSmartHomeWorkFromHome2026() {
  const [idx, setIdx] = useState(0);
  const rec = needs[idx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Smart Home for Remote Work 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Tech stack for DFW remote workers — ERCOT-proof and always-on</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[['📡','Mesh Wi-Fi','#1 upgrade for large DFW homes'],['🔋','UPS Backup','ERCOT grid events are real'],['💡','Smart Lighting','Video call quality game-changer']].map(([icon,title,desc]) => (
            <div key={String(title)} style={{ background: '#0f2035', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Prioritize by Need</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {needs.map((n, i) => (
              <button key={n.label} onClick={() => setIdx(i)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, flex: 1,
                  background: idx === i ? '#F5E642' : '#1e3a5f', color: idx === i ? '#0A1628' : '#fff', fontWeight: idx === i ? 700 : 400 }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
          {rec.priorities.map(p => (
            <div key={p.item} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{p.item}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 12 }}>{p.cost}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.reason}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ DFW-Specific Considerations</h3>
          {['ERCOT grid events (2021 freeze + summer demand spikes) make UPS essential for remote workers','DFW homes average 2,400 sqft — single routers leave dead zones; mesh systems solve this','Surge protectors alone are not enough — use UPS for computers and NAS drives','Smart thermostats with occupancy sensing reduce WFH energy costs 10–15%','Outdoor-rated equipment needed for any backyard office Wi-Fi extension'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

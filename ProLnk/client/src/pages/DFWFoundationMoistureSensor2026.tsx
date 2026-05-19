import { useState } from 'react';

const concerns = [
  {
    concern: 'Seasonal Cracking',
    icon: '🔍',
    system: 'Basic Soil Moisture Monitor ($200–$280)',
    detail: '4 sensors at foundation corners. Alerts when soil drops below 35% moisture — the threshold where DFW clay begins shrinking. Connects to standard irrigation timer.',
  },
  {
    concern: 'Active Settlement',
    icon: '📉',
    system: 'Smart Foundation System ($350–$500)',
    detail: '8–12 sensors + real-time app monitoring. Tracks both moisture AND elevation change. Triggers automatic irrigation when readings drop. Best for homes with prior repair history.',
  },
  {
    concern: 'Post-Repair Monitoring',
    icon: '🛡️',
    system: 'Full Perimeter Array ($450–$600)',
    detail: 'Sensors every 8 feet around perimeter plus interior load areas. Continuous logging to cloud. Monthly ProLnk Vault report. Required by some DFW warranty programs to stay valid.',
  },
  {
    concern: 'Pre-Sale Documentation',
    icon: '🏷️',
    system: 'Data Logger Package ($250–$350)',
    detail: '12-month historical data export. Proves stable moisture management to buyer. Can increase foundation-related home value by $5,000–$15,000 in DFW market with documented stable readings.',
  },
];

const readings = [
  { label: 'Below 25%', status: 'CRITICAL', color: '#F87171', action: 'Irrigate immediately — clay shrinkage risk high. Run drip system 2–3 hours daily until restored.' },
  { label: '25%–35%', status: 'WARNING', color: '#FB923C', action: 'Increase watering frequency. Check for drainage issues pulling moisture away from foundation.' },
  { label: '35%–55%', status: 'OPTIMAL', color: '#4ADE80', action: 'Maintain current irrigation. DFW clay in stable range — low foundation movement risk.' },
  { label: 'Above 55%', status: 'TOO WET', color: '#60A5FA', action: 'Reduce watering. Check gutters and grading — excess moisture causes upward heaving in DFW clay.' },
];

export default function DFWFoundationMoistureSensor2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>💧</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Moisture Sensor Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>High-tech monitoring for DFW's notoriously active clay soil</p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Select Your Foundation Concern</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {concerns.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ padding: '12px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '2px solid #334155',
                  backgroundColor: selected === i ? '#0A1628′ : '#0F2340', color: selected === i ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
                {c.icon} {c.concern}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{concerns[selected].system}</p>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>{concerns[selected].detail}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>📊 Reading Your Sensor Data</h2>
          {readings.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, backgroundColor: '#0F2340', borderRadius: 8, padding: 12 }}>
              <span style={{ backgroundColor: r.color, color: '#0A1628', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', minWidth: 72, textAlign: 'center' }}>{r.status}</span>
              <div>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>{r.label} volumetric moisture</p>
                <p style={{ color: '#CBD5E1', fontSize: 13 }}>{r.action}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>📡 ProLnk Vault stores your sensor history alongside repair records — the complete picture for every DFW home.</p>
        </div>
      </div>
    </div>
  );
}

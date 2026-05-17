import { useState } from 'react';

const thermostatTypes = [
  { id: 'manual', label: 'Manual', icon: '🔘', desc: 'Simple dial or slider, no programming, lowest cost', cost: '$20-60', dfwFit: 'Low', note: 'Works but wastes energy in DFW summer peaks' },
  { id: 'programmable', label: 'Programmable', icon: '📅', desc: '7-day scheduling, set-and-forget, saves 10-15%', cost: '$30-100', dfwFit: 'Medium', note: 'Good for consistent schedules, no ERCOT awareness' },
  { id: 'smart', label: 'Smart', icon: '🧠', desc: 'Learning AI, geofencing, ERCOT demand alerts', cost: '$150-350', dfwFit: 'Best', note: 'Nest/Ecobee integrate with ERCOT demand response' },
  { id: 'communicating', label: 'Communicating', icon: '📡', desc: 'Talks directly to HVAC equipment, most accurate control', cost: '$300-700', dfwFit: 'Premium', note: 'Required for variable-speed systems, zoning control' },
];

const situations = [
  { q: 'Rental property', rec: 'programmable', reason: 'Low cost, tenant-proof, set seasonal schedule' },
  { q: 'Primary DFW home', rec: 'smart', reason: 'ERCOT demand response saves $200-400/yr' },
  { q: 'Variable-speed HVAC system', rec: 'communicating', reason: 'Must match system protocol (Carrier Infinity, Trane ComfortLink)' },
  { q: 'Tight budget', rec: 'programmable', reason: 'Still saves vs manual with zero subscription' },
];

const connectivity = [
  { type: 'WiFi', icon: '📶', range: 'Whole home', pros: 'Works with Alexa/Google, remote app control', cons: 'Router dependent, security exposure' },
  { type: 'Zigbee', icon: '🔗', range: '30-60 ft mesh', pros: 'Low power, fast response', cons: 'Needs hub (SmartThings, Hubitat)' },
  { type: 'Z-Wave', icon: '🌐', range: '30-100 ft mesh', pros: 'Interference-free band, very reliable', cons: 'Needs hub, fewer thermostat options' },
];

export default function DFWHVACThermostatTypesGuide2026() {
  const [selected, setSelected] = useState('smart');
  const [situation, setSituation] = useState(0);
  const current = thermostatTypes.find(t => t.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW HVAC Thermostat Types Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Every thermostat type for Dallas-Fort Worth homes — matched to your situation</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {thermostatTypes.map(t => (
            <div key={t.id} onClick={() => setSelected(t.id)}
              style={{ background: selected === t.id ? '#1a2a4a' : '#111d33', border: `2px solid ${selected === t.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '14px', cursor: 'pointer' }}>
              <div style={{ fontSize: 22 }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{t.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{t.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{current.icon}</div>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 8px' }}>{current.label} Thermostat</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>{current.desc}</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
            <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>DFW FIT: {current.dfwFit}</span>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>{current.note}</p>
          </div>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Your DFW Situation → Best Thermostat</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSituation(i)}
                style={{ background: situation === i ? '#F5E642' : '#1e3a5f', color: situation === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 20, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                {s.q}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              Recommended: {thermostatTypes.find(t => t.id === situations[situation].rec)?.label}
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{situations[situation].reason}</p>
          </div>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📶 Connectivity Options</h3>
          {connectivity.map(c => (
            <div key={c.type} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{c.type} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: 12 }}>({c.range})</span></div>
                <div style={{ color: '#4ade80', fontSize: 12 }}>✓ {c.pros}</div>
                <div style={{ color: '#f87171', fontSize: 12 }}>✗ {c.cons}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk DFW Homeowner Resource · Dallas-Fort Worth · 2026
        </div>
      </div>
    </div>
  );
}

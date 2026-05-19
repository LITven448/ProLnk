import { useState } from 'react';

const goals = [
  {
    goal: 'Cut Electric Bill', icon: '⚡',
    upgrades: [
      { name: 'Smart Thermostat', desc: 'Save 15% on cooling — ERCOT flex alerts auto-adjust setpoint', cost: '$180–280', priority: 1 },
      { name: 'Smart Power Strips', desc: 'Eliminate phantom load from TVs and devices', cost: '$25–45 each', priority: 2 },
      { name: 'Smart Water Heater Controller', desc: 'Schedule heating off-peak for ERCOT rate savings', cost: '$150–250', priority: 3 },
    ]
  },
  {
    goal: 'Prevent Water Damage', icon: '💧',
    upgrades: [
      { name: 'Smart Leak Detector', desc: 'Under-sink sensors with phone alerts — catches slow leaks early', cost: '$35–80 each', priority: 1 },
      { name: 'Whole-Home Water Shutoff', desc: 'Auto-shutoff on leak detection — prevents $15K+ water damage claims', cost: '$500–900 installed', priority: 2 },
      { name: 'Smart Irrigation Controller', desc: 'Saves 30% on DFW water bills and catches irrigation leaks', cost: '$150–300', priority: 3 },
    ]
  },
  {
    goal: 'Better Security', icon: '🔒',
    upgrades: [
      { name: 'Smart Doorbell Camera', desc: 'Package theft is #1 DFW property crime — motion alerts and 2-way audio', cost: '$150–250', priority: 1 },
      { name: 'Smart Lock (Front + Back)', desc: 'Auto-lock, access codes for contractors, no key lockouts', cost: '$180–350 each', priority: 2 },
      { name: 'Whole-Home Wi-Fi (Mesh)', desc: 'Reliable coverage for all smart devices in larger DFW homes', cost: '$250–500', priority: 3 },
    ]
  },
  {
    goal: 'EV Charging', icon: '🚗',
    upgrades: [
      { name: 'Level 2 EV Charger (Smart)', desc: 'Charges overnight at off-peak ERCOT rates — saves $80+/mo vs public charging', cost: '$500–900 installed', priority: 1 },
      { name: 'Smart Panel Upgrade', desc: 'Required for most DFW homes adding EV + future solar', cost: '$1,500–3,000', priority: 2 },
      { name: 'ERCOT Rate App Integration', desc: 'Schedule charging during 9¢/kWh overnight hours automatically', cost: 'Free with smart charger', priority: 3 },
    ]
  },
];

export default function DFWSmartHomeMay2026() {
  const [active, setActive] = useState(goals[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Smart Home — May 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Smart thermostats save <span style={{ color: '#4ade80', fontWeight: 700 }}>15% on DFW bills</span>. Smart shutoffs prevent <span style={{ color: '#F5E642', fontWeight: 700 }}>$15K+ in leak damage</span>. Choose your goal and get a priority upgrade path.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {goals.map(g => (
            <button key={g.goal} onClick={() => setActive(g)}
              style={{ background: active.goal === g.goal ? '#F5E642′ : '#111c35', color: active.goal === g.goal ? '#0A1628' : '#fff', border: `1px solid ${active.goal === g.goal ? '#F5E642' : '#1e3a5f'}`, borderRadius: 8, padding: '10px 16px', cursor: ’pointer', fontWeight: 700, fontSize: 13 }}>
              {g.icon} {g.goal}
            </button>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>{active.icon} Recommended Upgrade Path: {active.goal}</div>
          {active.upgrades.map((u, i) => (
            <div key={i} style={{ background: '#0d1f3a', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: `3px solid ${i === 0 ? '#F5E642' : i === 1 ? '#60a5fa' : '#4ade80'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>Priority {u.priority}: {u.name}</span>
                <span style={{ color: '#F5E642', fontSize: 13 }}>{u.cost}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{u.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔧 ProLnk Smart Home Installers</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with licensed electricians and smart home specialists across DFW — verified, insured, and familiar with ERCOT and Oncor rebate programs.</p>
        </div>
      </div>
    </div>
  );
}
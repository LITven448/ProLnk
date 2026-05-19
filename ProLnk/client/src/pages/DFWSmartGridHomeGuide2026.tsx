import { useState } from 'react';

const programs = [
  { name: 'Oncor Smart Meter', icon: '📡', benefit: 'Free 15-min usage data', detail: 'View real-time usage at smartmetertexas.com — catch phantom loads costing $30+/mo' },
  { name: 'Demand Response', icon: '💰', benefit: '$50-200/yr bill credits', detail: 'Opt into Oncor peak response. Auto-reduce AC 2-4°F during ERCOT emergencies, get paid for it' },
  { name: 'TOU Rate Optimization', icon: '⏰', benefit: 'Save $40-100/mo', detail: 'Shift dishwasher, EV charging, and laundry to midnight–6am off-peak window' },
  { name: 'Solar Export', icon: '☀️', benefit: 'Net metering credits', detail: 'DFW solar owners can export to Oncor grid. Current: $0.037/kWh buy-back. Optimize system size accordingly' },
];

const setups = [
  { label: 'Renter, No Solar', rec: 'Oncor Smart Meter + TOU plan', detail: 'Switch to TOU electricity plan. Shift heavy loads to midnight. Saves $480/yr average for DFW apartment.' },
  { label: 'Homeowner, No Solar', rec: 'Smart meter + demand response enrollment', detail: 'Enroll in Oncor demand response for $150/yr credit. Add smart thermostat to auto-respond to grid events.' },
  { label: 'Solar Owner', rec: 'Battery + grid export optimization', detail: 'Store solar noon-3pm, export 4-8pm (peak pricing). Tesla Powerwall 3 can auto-arbitrage for $800+/yr savings.' },
  { label: 'Solar + EV + Battery', rec: 'Full smart grid home — V2G ready', detail: 'Your home becomes a grid asset. Charge battery from solar, power home from battery at peak, earn from V2G when available 2027+.' },
];

export default function DFWSmartGridHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = setups.find(s => s.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔆</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Smart Grid Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How DFW homes connect, optimize, and earn from the smart grid</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>🔮 Bidirectional Power Flow Coming 2027</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>ERCOT is piloting Vehicle-to-Grid programs. F-150 Lightning and future EVs will export power back to the grid during peak demand — earning DFW homeowners $500-1,500/yr. Homes with solar+battery+EV become mini power plants.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Smart Grid Programs for DFW Homes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {programs.map(p => (
            <div key={p.name} style={{ background: '#112240', borderRadius: 10, padding: 16, display: 'flex', gap: 14, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 30, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 3 }}>{p.name} — {p.benefit}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚡ Your Smart Grid Strategy</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What is your current home energy setup?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {setups.map(s => (
            <button key={s.label} onClick={() => setSelected(s.label)}
              style={{ background: selected === s.label ? '#F5E642' : '#1e3a5f', color: selected === s.label ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Strategy: {result.rec}</div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.detail}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk connects you with DFW energy optimization pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
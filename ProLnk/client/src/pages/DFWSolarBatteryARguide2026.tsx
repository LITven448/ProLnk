import { useState } from 'react';

const batteries = [
  { name: 'Tesla Powerwall 3', icon: '⚡', capacity: '13.5 kWh', power: '11.5 kW', price: '$11,000', backup: 'Whole-home capable' },
  { name: 'Enphase IQ Battery 5P', icon: '🔋', capacity: '5 kWh', power: '3.84 kW', price: '$4,500', backup: 'Critical loads only' },
  { name: 'Franklin WH10', icon: '🏠', capacity: '10 kWh', power: '5 kW', price: '$8,200', backup: 'Essential circuits' },
];

const loads = [
  { label: 'Just Fridge + Lights', kWh: 5, rec: 'Enphase IQ Battery 5P', note: 'One 5P handles overnight critical loads — ideal for Uri-style outages' },
  { label: 'Fridge + AC + Medical', kWh: 15, rec: 'Tesla Powerwall 3', note: 'Powerwall 3 at 13.5 kWh keeps AC running ~6 hrs during peak DFW summer heat' },
  { label: 'Whole Home 24hr', kWh: 30, rec: '2× Tesla Powerwall 3', note: 'Stack two Powerwalls for 27 kWh — covers most DFW homes through overnight outage' },
];

export default function DFWSolarBatteryARguide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = loads.find(l => l.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Solar + Battery Storage Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>After Uri 2021, DFW homeowners are done relying on ERCOT alone</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#112240', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 28 }}>❄️</div>
            <div style={{ color: '#F5E642', fontWeight: 700, margin: '6px 0 4px' }}>Uri 2021 Changed Everything</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>4.5M Texas homes lost power. DFW solar+battery installs jumped 340% in 2022-2025.</div>
          </div>
          <div style={{ background: '#112240', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 28 }}>💰</div>
            <div style={{ color: '#F5E642', fontWeight: 700, margin: '6px 0 4px' }}>30% Federal Tax Credit</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>ITC through 2032. $11K Powerwall = $3,300 back. $35K solar+battery = $10,500 back.</div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>2026 Battery Storage Options</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {batteries.map(b => (
            <div key={b.name} style={{ background: '#112240', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32 }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{b.name} — {b.price}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{b.capacity} capacity • {b.power} output • {b.backup}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔌 Size Your Battery</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What do you need powered during an outage?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {loads.map(l => (
            <button key={l.label} onClick={() => setSelected(l.label)}
              style={{ background: selected === l.label ? '#F5E642' : '#1e3a5f', color: selected === l.label ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {l.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Recommended: {result.rec}</div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.note}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk connects you with DFW solar + battery installers • prolnk.io
        </div>
      </div>
    </div>
  );
}
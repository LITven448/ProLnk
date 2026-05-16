import { useState } from 'react';

export default function DFWBatteryBackupGuide2026() {
  const [loads, setLoads] = useState<string[]>([]);

  const loadOptions = [
    { id: 'lights', label: 'Lights & outlets', kWh: 1.5 },
    { id: 'fridge', label: 'Refrigerator', kWh: 1.2 },
    { id: 'hvac', label: 'HVAC (1 zone)', kWh: 4.0 },
    { id: 'medical', label: 'Medical equipment', kWh: 2.0 },
    { id: 'water', label: 'Water heater', kWh: 3.5 },
    { id: 'internet', label: 'Internet + TV', kWh: 0.5 },
  ];

  const toggle = (id: string) => setLoads(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  const totalKwh = loadOptions.filter(l => loads.includes(l.id)).reduce((s, l) => s + l.kWh, 0);
  const batteriesNeeded = Math.ceil(totalKwh / 10);
  const estCost = batteriesNeeded * 12000;
  const afterItc = Math.round(estCost * 0.7);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔋</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW Battery Backup Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>After Winter Storm Uri left 4.5 million Texans without power, home batteries became essential in DFW.</p>

        <div style={{ background: '#1e3a5f', border: '1px solid #F5E642', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#fbbf24', fontWeight: 600 }}>❄️ Uri Changed Everything — Feb 2021 left DFW without power for days. A home battery backs up critical loads for 8–12+ hours.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', label: 'Typical Capacity', value: '10–15 kWh' },
            { icon: '🏠', label: 'Essentials Coverage', value: '8–12 hrs' },
            { icon: '💵', label: 'After 30% ITC', value: '~$8,400' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔋 Popular Battery Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { name: 'Tesla Powerwall 3', kWh: '13.5 kWh', price: '~$11,500' },
              { name: 'Enphase IQ Battery 5P', kWh: '5 kWh', price: '~$5,000' },
              { name: 'Franklin WH', kWh: '13.6 kWh', price: '~$10,000' },
            ].map(b => (
              <div key={b.name} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{b.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.kWh}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{b.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Battery Size Calculator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>Select critical loads to back up during an outage:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            {loadOptions.map(opt => (
              <button key={opt.id} onClick={() => toggle(opt.id)}
                style={{ padding: 10, borderRadius: 8, border: `2px solid ${loads.includes(opt.id) ? '#F5E642' : '#334155'}`,
                  background: loads.includes(opt.id) ? '#1e3a5f' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: 13 }}>
                {opt.label}<br /><span style={{ color: '#94a3b8', fontSize: 11 }}>{opt.kWh} kWh/hr</span>
              </button>
            ))}
          </div>
          {loads.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { label: 'Load / Hour', value: `${totalKwh.toFixed(1)} kWh` },
                { label: 'Batteries Needed', value: `${batteriesNeeded}x` },
                { label: 'Est. Cost (after ITC)', value: `$${afterItc.toLocaleString()}` },
              ].map(r => (
                <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

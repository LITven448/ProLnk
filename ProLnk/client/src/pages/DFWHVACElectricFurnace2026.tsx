import { useState } from 'react';

const situations = [
  { q: 'I have no gas service at my address', a: 'Electric furnace or heat pump is your only option. Outer DFW parcels without gas lines must use electric resistance or heat pump systems. Expect $180-$280/month heating bills in January vs $60-$90 for gas-equivalent homes.' },
  { q: 'My builder offered electric only to save upfront cost', a: 'Decline if gas is available. Electric resistance heating costs 3x more to operate than gas in DFW. A $1,200 savings upfront means $1,500+ extra per year in utility bills. Insist on gas or a heat pump with gas backup.' },
  { q: 'I have a heat pump with electric heat strips', a: 'Heat strips are backup-only emergency heat — not primary heat. If your system runs on heat strips during normal cold weather, your heat pump refrigerant or reversing valve may be failing. Call an HVAC tech.' },
  { q: 'My electric furnace runs constantly in winter', a: 'Electric resistance furnaces have 100% efficiency but low economy. Running constantly in DFW winters (teens to 20s during blue northers) is expected. The problem is cost — not performance. A heat pump retrofit cuts bills by 60-70%.' },
  { q: 'Is electric heat better for indoor air quality', a: 'Yes — no combustion byproducts, no risk of CO or gas leak. If health is a priority and cost is secondary, electric resistance or heat pump is cleaner. DFW allergy sufferers sometimes prefer all-electric for this reason.' },
];

export default function DFWHVACElectricFurnace2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const facts = [
    { icon: '⚡', label: 'Electric Resistance Efficiency', value: '100% (but expensive)' },
    { icon: '💰', label: 'DFW Cost vs Gas', value: '~3x higher per BTU' },
    { icon: '🌡️', label: 'Electric Furnace Range', value: '5kW – 20kW capacity' },
    { icon: '🏠', label: 'When Electric Makes Sense', value: 'No gas service, all-electric build' },
    { icon: '🔥', label: 'Heat Strips Role', value: 'Emergency backup only' },
    { icon: '📍', label: 'DFW Areas Without Gas', value: 'Rural Kaufman, Parker, outer Hood Co.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Electric Furnace Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>All-electric heating for DFW homes — when it makes sense and what it costs</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ DFW Electric Heating Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {facts.map((f, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', border: '1px solid #2d5a8e' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>{f.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🔥 Why DFW Went Gas-Dominant</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            DFW sits on the Barnett Shale — one of the largest natural gas fields in North America. Gas infrastructure reached nearly every subdivision built after 1970. Historically, gas heating cost $0.60-$0.90 per therm vs electricity at $0.12/kWh ($3.50/therm equivalent). The economics drove a 90%+ gas adoption rate in DFW residential construction. Only no-gas-service parcels in outer counties defaulted to electric resistance.
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 My Electric Heating Situation</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>Select your situation for a DFW-specific guide:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map((s, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  style={{ width: '100%', textAlign: 'left', background: open[i] ? '#0d2137′ : '#0A1628', border: '1px solid', borderColor: open[i] ? '#F5E642' : '#2d5a8e', borderRadius: 8, padding: '12px 16px', color: open[i] ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 14, fontWeight: open[i] ? 700 : 400, display: 'flex', justifyContent: 'space-between' }}>
                  {s.q} <span>{open[i] ? '▲' : '▼'}</span>
                </button>
                {open[i] && <div style={{ background: '#0d2137', border: '1px solid #F5E642', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 16px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{s.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW HVAC Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}

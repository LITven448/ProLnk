import { useState } from 'react';

export default function DFWGasApplianceCostGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const comparisons = [
    {
      id: 'furnace',
      icon: '🌡️',
      appliance: 'Home Heating (2,000 sq ft)',
      gas: { label: 'Gas Furnace 95% AFUE', annual: '$680', unit: '$1.10/therm' },
      electric: { label: 'Heat Pump (HSPF2 10)', annual: '$420', unit: '$0.12/kWh Oncor' },
      winner: 'electric',
      note: 'DFW averages only 2,400 HDD/yr — heat pumps are efficient even in rare freezes with backup strips',
    },
    {
      id: 'waterheater',
      icon: '🚿',
      appliance: 'Water Heating (4-person home)',
      gas: { label: 'Gas WH 0.62 EF', annual: '$310', unit: '$1.10/therm' },
      electric: { label: 'Heat Pump WH 3.5 UEF', annual: '$185', unit: '$0.12/kWh' },
      winner: 'electric',
      note: 'Exception: in unheated garages below 50°F, HPWH loses efficiency — consider insulating garage first',
    },
    {
      id: 'range',
      icon: '🍳',
      appliance: 'Cooking Range (avg household)',
      gas: { label: 'Gas Range 40% eff.', annual: '$120', unit: '$1.10/therm' },
      electric: { label: 'Induction Range 90% eff.', annual: '$95', unit: '$0.12/kWh' },
      winner: 'electric',
      note: 'Savings depend on cooking habits; heavy cooks see bigger induction savings — faster boil = less energy',
    },
    {
      id: 'dryer',
      icon: '👕',
      appliance: 'Clothes Dryer (6 loads/wk)',
      gas: { label: 'Gas Dryer', annual: '$95', unit: 'gas + elec combined' },
      electric: { label: 'Heat Pump Dryer', annual: '$65', unit: '$0.12/kWh only' },
      winner: 'electric',
      note: 'Heat pump dryer is gentler on fabrics and costs 30–50% less — longer cycle time is the trade-off',
    },
  ];

  const item = comparisons.find(c => c.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡💰</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Gas vs Electric Appliance Cost Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Which fuel source is actually cheaper for DFW homeowners?</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>
            📊 Calculated using Oncor average residential rate ($0.12/kWh) and Atmos Energy DFW rate ($1.10/therm). Updated Q1 2026.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select an appliance to compare operating costs:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {comparisons.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? '#F5E642′ : '#1e2d45', border: '2px solid',
                borderColor: selected === c.id ? '#F5E642′ : '#2d3f5a', borderRadius: 10,
                padding: 16, cursor: 'pointer', textAlign: 'left',
                color: selected === c.id ? '#0A1628′ : '#fff' }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{c.appliance}</div>
              <div style={{ fontSize: 12, marginTop: 4, color: selected === c.id ? '#0A1628′ : '#22c55e' }}>Winner: {c.winner === ’electric' ? 'Electric ⚡' : 'Gas 🔥'}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>{item.icon} {item.appliance}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderTop: '3px solid #ef4444′ }}>
                <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>🔥 {item.gas.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{item.gas.annual}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>per year · {item.gas.unit}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderTop: '3px solid #22c55e' }}>
                <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>⚡ {item.electric.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{item.electric.annual}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>per year · {item.electric.unit}</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>💡 DFW Context: {item.note}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk Charter pros provide transparent, itemized quotes — no hidden fuel cost surprises.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Get matched with DFW appliance specialists who know Oncor rebate programs.</p>
        </div>
      </div>
    </div>
  );
}

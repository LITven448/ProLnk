import { useState } from 'react';

export default function DFWHVACInverterDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const situations = [
    {
      id: 'shoulder',
      label: '🌤️ Mild DFW Shoulder Season',
      title: 'Inverter Dominates March–May & Oct–Nov',
      body: 'DFW shoulders run 55–80°F for weeks. Two-stage locks at 65% or 100%. Inverter holds 20–40% — no short cycling, perfect dehumidification, steady 74.5°F while two-stage swings 75–76°F.',
    },
    {
      id: 'summer',
      label: '🌡️ DFW Peak Summer Heat',
      title: 'Inverter at 95–110% Capacity in July',
      body: 'At 108°F outdoor temps, inverter boosts above rated capacity for 10–15 min, then settles at 95%. Two-stage maxes out and short cycles. Inverter holds setpoint 30 min faster on the hottest days.',
    },
    {
      id: 'humidity',
      label: '💧 High DFW Humidity Days',
      title: 'Inverter Dehumidifies at Partial Load',
      body: 'At 70% speed, evaporator runs colder longer — removes 20–35% more moisture than two-stage cycling on/off. DFW humidity peaks May–Sep. Inverter keeps relative humidity at 45–50% vs two-stage at 55–60%.',
    },
    {
      id: 'cost',
      label: '💰 Upfront Cost vs Long-Term ROI',
      title: '$2,000–$4,000 More Upfront, 7–10 Year Payback',
      body: 'DFW inverter systems run $6,500–$11,000 installed. Two-stage runs $4,500–$8,000. Inverter saves 25–40% on cooling bills. At DFW average $280/mo cooling bill, saves $70–$110/mo — payback in 7–10 years.',
    },
    {
      id: 'vault',
      label: '🏠 ProLnk Vault HVAC Tracking',
      title: 'Every Inverter Service Call in Your Vault',
      body: 'ProLnk documents inverter model, install date, refrigerant type, compressor hours, and all service records in your Home Health Vault. Future buyers see full HVAC history — inverter systems add $3,000–$6,000 to DFW home value.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>HVAC GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌀 DFW Inverter Technology HVAC Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          True inverter compressors modulate speed continuously — not 65% or 100% like two-stage. DFW's long shoulder seasons and brutal summers make inverter the clear winner for comfort and efficiency.
        </p>

        <div style={{ backgroundColor: '#0f2240', borderRadius: 8, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚡ Inverter vs Two-Stage Quick Facts</div>
          {['Inverter: 20–110% capacity · Two-stage: 65% or 100% only', 'Holds 74.5°F setpoint vs 75–76°F range', 'Dehumidifies 20–35% better at partial load', '25–40% lower cooling bills in DFW'].map((f, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{f}</div>
          ))}
        </div>

        <div style={{ color: '#94a3b8', marginBottom: 16 }}>Select your DFW situation:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ backgroundColor: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (() => {
          const s = situations.find(x => x.id === selected)!;
          return (
            <div style={{ backgroundColor: '#0f2240', border: '1px solid #F5E642', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{s.body}</div>
            </div>
          );
        })()}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>🔧 Get a DFW Inverter HVAC Quote</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with Charter-tier HVAC techs — licensed, EPA 608, TDLR verified. Every install documented in your Vault.</div>
        </div>
      </div>
    </div>
  );
}

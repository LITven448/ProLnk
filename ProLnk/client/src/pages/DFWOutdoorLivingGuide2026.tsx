import { useState } from 'react';

const projects = [
  { type: 'Covered Patio', cost: '$20K-$30K', roi: '80%+', permit: 'Yes', note: 'Most requested DFW outdoor project. Attached to home requires permit. Top ROI driver in DFW market.' },
  { type: 'Pergola', cost: '$10K-$18K', roi: '65%', permit: 'Sometimes', note: 'Freestanding pergolas under 200sqft often permit-exempt. Attached always requires permit.' },
  { type: 'Outdoor Kitchen', cost: '$15K-$40K', roi: '70%', permit: 'Yes (gas/elec)', note: 'Gas line and electrical require licensed sub. DFW outdoor season makes this high ROI.' },
  { type: 'Extended Deck', cost: '$8K-$20K', roi: '60%', permit: 'Yes (>200sqft)', note: 'Composite decking (Trex) recommended for DFW UV and heat. Pressure-treated adds 30%.' },
];

export default function DFWOutdoorLivingGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Outdoor Living Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW homeowners enjoy approximately 9 months of outdoor season — here is how to maximize that asset.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', label: 'DFW Outdoor Season', value: '~9 Months' },
            { icon: '🏠', label: 'Covered Patio Avg', value: '$25K' },
            { icon: '🍳', label: 'Outdoor Kitchen', value: '$15K - $40K' },
            { icon: '📋', label: 'Permit Required', value: 'Permanent Structures' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>☀️ Why Outdoor Living ROI Is High in DFW</h2>
          {[
            'DFW buyers actively shop for covered outdoor space — it is a resale accelerator.',
            '9-month usable season means outdoor space functions like a year-round room.',
            'Outdoor kitchens reduce summer indoor cooking heat, lowering AC costs.',
            'DFW luxury market expects outdoor living. Missing it costs more in resale than build cost.',
          ].map((note) => (
            <div key={note} style={{ color: '#fff', fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: '3px solid #F5E642' }}>{note}</div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Project Type — DFW Cost + ROI</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {projects.map((item, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {item.type} — {item.cost}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{projects[selected].type}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>ROI: {projects[selected].roi} · Permit: {projects[selected].permit}</div>
              <div style={{ color: '#fff', fontSize: 14 }}>{projects[selected].note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

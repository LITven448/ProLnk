import { useState } from 'react';

const rooms = [
  { room: 'Living Room', rec: 'LVP (Luxury Vinyl Plank)', cost: '$4-$7/sqft installed', why: 'Handles DFW humidity swings, durable, wood-look aesthetics. Most popular 2023-2026.' },
  { room: 'Kitchen', rec: 'Tile or LVP', cost: '$5-$12/sqft installed', why: 'Tile for longevity, LVP for budget. Avoid hardwood near dishwasher and sink.' },
  { room: 'Bedroom', rec: 'Carpet or Hardwood', cost: '$3-$9/sqft installed', why: 'Carpet still dominates DFW bedrooms for comfort. Hardwood adds resale value.' },
  { room: 'Bathroom', rec: 'Porcelain Tile', cost: '$8-$18/sqft installed', why: 'Only safe choice in wet areas. 12x24 or larger format tiles trending in DFW.' },
  { room: 'Garage / Utility', rec: 'Epoxy Coating', cost: '$3-$6/sqft', why: 'Handles TX heat and humidity. Much cheaper than tile. Easy to clean.' },
];

export default function DFWFlooringGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🪵</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Flooring Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Climate-specific flooring recommendations for Dallas-Fort Worth homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏆', label: 'Most Popular 2026', value: 'LVP' },
            { icon: '🛏️', label: 'Bedroom King', value: 'Carpet' },
            { icon: '🌡️', label: 'DFW Challenge', value: 'Humidity Swings' },
            { icon: '🔨', label: 'Hardwood Note', value: 'Acclimate 7+ Days' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌡️ DFW Climate Notes for Flooring</h2>
          {[
            'Hardwood requires 7+ day acclimation period before install in DFW.',
            'Engineered hardwood performs better than solid in DFW humidity cycles.',
            'LVP with 6mm+ wear layer handles DFW heat without warping.',
            'Never install hardwood directly on slab — moisture barrier required.',
          ].map((note) => (
            <div key={note} style={{ color: '#fff', fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: '3px solid #F5E642' }}>{note}</div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Room Type — DFW Flooring Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {rooms.map((item, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {item.room}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{rooms[selected].rec}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{rooms[selected].cost}</div>
              <div style={{ color: '#fff', fontSize: 14 }}>{rooms[selected].why}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

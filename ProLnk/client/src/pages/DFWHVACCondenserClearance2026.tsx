import { useState } from 'react';

const situations = [
  { id: 'tight', label: 'Unit against fence/wall', recommendation: 'Minimum 18" clearance required on all sides. Move fence or unit — restricted airflow causes 5–10% efficiency loss and compressor failure risk.' },
  { id: 'deck', label: 'Deck built over unit', recommendation: 'Decks must be 5 feet above the unit top. Anything lower traps hot discharge air, causing high-head pressure faults and premature compressor failure.' },
  { id: 'landscaping', label: 'Shrubs/bushes near unit', recommendation: 'Keep all vegetation 18" back minimum. Overgrown landscaping reduces airflow by 5–10%, raising energy bills. Trim annually.' },
  { id: 'service', label: 'Need service access', recommendation: 'Tech needs 24" of clear access on at least one side (service panel side). Less space adds labor time and cost to every visit.' },
  { id: 'privacy', label: 'Privacy fence around unit', recommendation: 'Privacy fencing must leave 18" on all sides and be open-top or 5 feet above unit. Solid enclosures with low tops trap heat and void manufacturer warranty.' },
];

export default function DFWHVACCondenserClearance2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>AC Condenser Clearance Requirements</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW-specific clearance rules to protect your outdoor unit, maintain warranty, and maximize efficiency in extreme Texas heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '📏', label: 'Sides (min)', value: '18 inches' },
            { icon: '🔧', label: 'Service Access', value: '24 inches' },
            { icon: '☀️', label: 'Above Unit', value: '5 feet' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🌡️ Why DFW Clearance Matters More</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>DFW summer ambient temps hit 100–110°F. Your condenser rejects heat from inside your home — it needs unobstructed airflow to do that. Every inch of blockage raises head pressure, cuts efficiency, and shortens compressor life. In a DFW summer, that's not a small detail.</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Select Your Clearance Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1A2F50', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderLeft: '4px solid #F5E642', padding: 16, borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{match.recommendation}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📍 Need a DFW HVAC Pro?</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>ProLnk connects you with vetted local techs who know DFW code and manufacturer requirements.</div>
        </div>
      </div>
    </div>
  );
}

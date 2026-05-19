import { useState } from 'react';

const modifications = [
  { concern: 'Balance & Fall Risk', icon: '🦯', items: ['Grab bars in bathroom', 'Non-slip flooring', 'Handrails on both sides of stairs', 'Improved lighting throughout'] },
  { concern: 'Mobility / Wheelchair', icon: '♿', items: ['Wider doorways (36″+)', 'No-threshold entries', 'Roll-under sink & counters', 'Accessible shower with bench'] },
  { concern: 'Stair Difficulty', icon: '🪜', items: ['Stair lift installation', 'First-floor bedroom conversion', 'Vertical platform lift', 'Ramp at entry steps'] },
  { concern: 'Grip Strength / Arthritis', icon: '🤲', items: ['Lever door handles', 'Pull-out cabinet drawers', 'Rocker light switches', 'Touch faucets'] },
];

export default function DFWAgingInPlaceGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 Aging in Place — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          35% of DFW homeowners are baby boomers. With the right home modifications, most can safely stay in their homes for decades. CAPS-certified contractors through ProLnk specialize in aging-in-place retrofits.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'DFW Boomer Homeowners', value: '35%', icon: '👴' }, { label: 'Prefer to Age at Home', value: '90%', icon: '❤️' }, { label: 'Avg Modification Cost', value: '$8K–$15K', icon: '💰' }, { label: 'CAPS Contractors via ProLnk', value: '200+', icon: '🏅' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Select Your Primary Mobility Concern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {modifications.map((m, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#F5E642′ : '#132036', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{m.icon}</div>
              {m.concern}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Recommended Modifications: {modifications[selected].concern}</h3>
            <ul style={{ paddingLeft: '1.2rem', lineHeight: 2 }}>
              {modifications[selected].items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🏅 Get a CAPS-Certified Contractor</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>Certified Aging-in-Place Specialists (CAPS) are trained by NAHB to design and build modifications that meet ADA and universal design standards.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Match Me with a DFW CAPS Contractor →
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const stairTypes = [
  {
    type: 'Straight Staircase',
    icon: '📐',
    options: [
      { label: 'Purchase (Standard)', cost: '$3,000–$5,000', detail: 'Most common. Installed in 1 day. Weight capacity 250–350 lbs. Battery backup included on most models.' },
      { label: 'Rental Option', cost: '$150–$300/mo', detail: 'Good for short-term recovery. Rental companies include installation and removal. Ask about rent-to-own.' },
      { label: 'Reconditioned Unit', cost: '$1,500–$3,000', detail: 'Factory-refurbished with warranty. Same quality as new at lower price.' },
    ]
  },
  {
    type: 'Curved or Custom Staircase',
    icon: '🔄',
    options: [
      { label: 'Custom Curved Lift', cost: '$10,000–$15,000', detail: 'Rail is custom-fabricated to match your stair curve. Takes 4–6 weeks to manufacture. Install is 1 day.' },
      { label: 'Platform Lift Alternative', cost: '$6,000–$10,000', detail: 'Vertical platform lift may work if stair area has ceiling clearance. Requires permit in most DFW cities.' },
    ]
  },
  {
    type: 'Outdoor Steps',
    icon: '🌿',
    options: [
      { label: 'Exterior Stair Lift', cost: '$4,000–$7,000', detail: 'Weather-rated units available. Must be covered or retractable in DFW climate. Less common than indoor units.' },
      { label: 'Accessibility Ramp', cost: '$1,500–$5,000', detail: 'Often better value for outdoor steps. ADA 1:12 slope standard. Modular aluminum is most popular.' },
    ]
  },
];

export default function DFWStairLiftGuide2026() {
  const [typeIdx, setTypeIdx] = useState<number | null>(null);
  const [optionIdx, setOptionIdx] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🪜 Stair Lift Guide — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Stair lifts are the fastest way to restore access to all floors. Straight models cost $3,000–$5,000 and install in one day. Curved models run $10,000–$15,000 with a 4–6 week lead time. Medicare and Medicaid rarely cover stair lifts — but VA benefits may apply for veterans.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'Straight Lift Cost', value: '$3K–$5K', icon: '📐' }, { label: 'Curved Lift Cost', value: '$10K–$15K', icon: '🔄' }, { label: 'Install Time', value: '1 Day', icon: '⚡' }, { label: 'Rental Available', value: 'Yes', icon: '🔑' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>What type of staircase do you have?</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {stairTypes.map((s, i) => (
            <button key={i} onClick={() => { setTypeIdx(i); setOptionIdx(null); }}
              style={{ background: typeIdx === i ? '#F5E642' : '#132036', color: typeIdx === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.65rem 1.1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {s.icon} {s.type}
            </button>
          ))}
        </div>

        {typeIdx !== null && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Select an option:</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {stairTypes[typeIdx].options.map((o, i) => (
                <button key={i} onClick={() => setOptionIdx(i)}
                  style={{ background: optionIdx === i ? '#1a3a60' : '#132036', color: '#fff', border: optionIdx === i ? '2px solid #F5E642' : '2px solid transparent', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 700 }}>{o.label} — <span style={{ color: '#F5E642' }}>{o.cost}</span></div>
                  {optionIdx === i && <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{o.detail}</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get Stair Lift Quotes in DFW</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>ProLnk connects you with certified stair lift dealers and installers across DFW. Compare purchase, rental, and reconditioned options side-by-side.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Free Stair Lift Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
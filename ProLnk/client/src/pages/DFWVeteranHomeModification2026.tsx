import { useState } from 'react';

const disabilityTypes = [
  {
    type: 'Loss of Limb / Amputation',
    icon: '🦾',
    grants: [
      { name: 'SAH Grant', amount: 'Up to $109,986', description: 'Specially Adapted Housing grant for veterans with severe service-connected disability. Covers ramps, widened doors, roll-in showers, adapted kitchens.' },
      { name: 'TRA Grant', amount: 'Up to $49,470', description: 'Temporary Residence Adaptation grant helps a family member adapt their home where the veteran temporarily lives.' },
    ],
    mods: ['Roll-in shower', 'Widened doorways (36"+)', 'Lowered countertops', 'Accessible parking', 'Ramp at all entries']
  },
  {
    type: 'Spinal Cord Injury / Paralysis',
    icon: '♿',
    grants: [
      { name: 'SAH Grant', amount: 'Up to $109,986', description: 'Primary grant for veterans requiring wheelchair-accessible homes. One of the most comprehensive federal housing grants available.' },
      { name: 'SHA Grant', amount: 'Up to $21,935', description: 'Special Home Adaptation grant for veterans with blindness or loss of use of both hands. Broader eligibility than SAH.' },
    ],
    mods: ['Elevator or vertical platform lift', 'Wheelchair turning radius (60" min)', 'Roll-under sink and range', 'Automatic door openers', 'Grab bars and transfer areas']
  },
  {
    type: 'Vision Loss / Blindness',
    icon: '👁️',
    grants: [
      { name: 'SHA Grant', amount: 'Up to $21,935', description: 'Special Home Adaptation grant specifically covers veterans with loss of vision in both eyes. Can be used for smart home accessibility tech.' },
      { name: 'HISA Grant', amount: 'Up to $6,800', description: 'Home Improvement and Structural Alterations grant through VA for medically necessary modifications. Simpler application process.' },
    ],
    mods: ['Smart home voice controls', 'Tactile flooring markers', 'High-contrast color schemes', 'Motion-activated lighting', 'Smart doorbell with voice alerts']
  },
  {
    type: 'Hearing Loss / TBI',
    icon: '👂',
    grants: [
      { name: 'HISA Grant', amount: 'Up to $6,800', description: 'Home Improvement and Structural Alterations. Covers medically necessary modifications for service-connected disabilities including TBI accommodations.' },
      { name: 'State Programs', amount: 'Varies', description: 'Texas Veterans Commission has additional home modification programs. DFW veterans should call 1-800-252-8387 for local resources.' },
    ],
    mods: ['Visual door / smoke alerts', 'Video doorbell system', 'Smart home notification hub', 'Vibrating alarm systems', 'Enhanced room acoustics']
  },
];

export default function DFWVeteranHomeModification2026() {
  const [typeIdx, setTypeIdx] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🎖️ Veteran Home Modification Guide — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW has one of the largest veteran populations in the US. The VA offers the SAH grant (up to $109K) and SHA grant (up to $21K) for qualifying veterans with service-connected disabilities. ProLnk connects you with contractors experienced in VA-grant modifications.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'SAH Grant Maximum', value: '$109,986', icon: '🏅' }, { label: 'SHA Grant Maximum', value: '$21,935', icon: '🎖️' }, { label: 'DFW Veterans', value: '400K+', icon: '⭐' }, { label: 'HISA Grant', value: '$6,800', icon: '🏠' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Select your service-connected disability type:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {disabilityTypes.map((d, i) => (
            <button key={i} onClick={() => setTypeIdx(i === typeIdx ? null : i)}
              style={{ background: typeIdx === i ? '#F5E642' : '#132036', color: typeIdx === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{d.icon}</div>
              {d.type}
            </button>
          ))}
        </div>

        {typeIdx !== null && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>VA Grants You May Qualify For</h3>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {disabilityTypes[typeIdx].grants.map((g, i) => (
                <div key={i} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{g.name}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>{g.amount}</span>
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{g.description}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Recommended Modifications</h3>
            <ul style={{ background: '#132036', borderRadius: 10, padding: '1rem 1rem 1rem 2rem', lineHeight: 2 }}>
              {disabilityTypes[typeIdx].mods.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Connect with a VA-Grant Experienced DFW Contractor</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>ProLnk works with contractors experienced in VA grant documentation, modification standards, and inspection requirements. No upfront cost to match.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Connect with a VA-Experienced Contractor →
          </button>
        </div>
      </div>
    </div>
  );
}
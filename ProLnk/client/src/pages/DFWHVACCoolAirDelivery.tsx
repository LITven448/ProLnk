import { useState } from 'react';

const deliveryParts = [
  {
    id: 'plenum',
    name: 'Supply Plenum',
    icon: '📦',
    desc: 'The pressurized box attached directly to the air handler where cooled air first enters the duct system.',
    dfwImpact: 'In DFW attics reaching 150°F, a poorly insulated plenum loses 15-20% of cooling capacity before air even enters the trunks.',
  },
  {
    id: 'trunk',
    name: 'Main Trunk Ducts',
    icon: '🛤️',
    desc: 'Large rectangular or round ducts that carry air from the plenum to branch distribution points.',
    dfwImpact: 'Trunk ducts running through DFW attics absorb radiant heat continuously — insulation R-8 minimum is required.',
  },
  {
    id: 'branch',
    name: 'Branch Ducts',
    icon: '🌿',
    desc: 'Smaller ducts that split off from trunks and route air to individual rooms.',
    dfwImpact: 'Flex duct branches in DFW attics are prone to kinking and compression, cutting airflow by up to 50% per bend.',
  },
  {
    id: 'register',
    name: 'Supply Registers',
    icon: '🔲',
    desc: 'The grilles in your ceiling or floor where cooled air enters each room.',
    dfwImpact: 'Undersized registers create high-velocity noise and uneven cooling in DFW homes with open floor plans.',
  },
];

const complaints = [
  { symptom: 'One room is always warmer', part: 'branch', fix: 'Check flex duct for kinks or disconnection in that branch run. Re-route or replace.' },
  { symptom: 'Weak airflow from registers', part: 'register', fix: 'Register may be undersized or blocked. Upgrade to larger grille or clear obstruction.' },
  { symptom: 'System runs but house stays warm', part: 'plenum', fix: 'Plenum may be leaking or uninsulated. Seal all joints with mastic and add R-8 wrap.' },
  { symptom: 'Uneven cooling across floors', part: 'trunk', fix: 'Trunk sizing may be inadequate for your square footage. Manual D calculation needed.' },
];

export default function DFWHVACCoolAirDelivery() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeComplaint, setActiveComplaint] = useState<number | null>(null);

  const selectedPart = deliveryParts.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Education</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>Cool Air Delivery System</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>How your DFW HVAC system moves cooled air from the air handler to every room — and why each component matters in Dallas-Fort Worth's extreme heat.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {deliveryParts.map(part => (
            <button key={part.id} onClick={() => setSelected(selected === part.id ? null : part.id)}
              style={{ background: selected === part.id ? '#F5E642' : '#0F2140', border: `2px solid ${selected === part.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem 1rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: selected === part.id ? '#0A1628' : '#E8EDF5' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{part.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{part.name}</div>
            </button>
          ))}
        </div>

        {selectedPart && (
          <div style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem', fontSize: '1.1rem' }}>{selectedPart.icon} {selectedPart.name}</h3>
            <p style={{ margin: '0 0 1rem', color: '#CBD5E1', lineHeight: 1.7 }}>{selectedPart.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>🌡️ DFW IMPACT</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selectedPart.dfwImpact}</p>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>🔧 Diagnose Your Comfort Complaint</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {complaints.map((c, i) => (
            <div key={i} onClick={() => setActiveComplaint(activeComplaint === i ? null : i)}
              style={{ background: '#0F2140', border: `1px solid ${activeComplaint === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, color: activeComplaint === i ? '#F5E642' : '#E8EDF5' }}>"{c.symptom}"</div>
              {activeComplaint === i && (
                <div style={{ marginTop: '0.75rem', color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>Likely issue: </span>{deliveryParts.find(p => p.id === c.part)?.name}<br/>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>Solution: </span>{c.fix}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#0F2140', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Get a DFW HVAC Delivery Audit</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 1rem' }}>ProLnk matches you with NATE-certified DFW technicians who specialize in duct system analysis.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Request Free Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const concerns = [
  { id: 'flex', label: '🌀 Lots of flex duct in my attic', diagnosis: 'Flex duct is 25-30% less efficient than rigid sheet metal due to friction. In DFW attics hitting 140°F, flex duct should be R-8 insulated minimum. Keep runs under 15 feet and avoid sharp bends — each 90° equals 25 equivalent feet of resistance.' },
  { id: 'return', label: '🔁 Only one return air vent in home', diagnosis: 'Single return air is the most common DFW duct design deficiency. Homes over 1,500 sq ft need multiple returns or one oversized central return (minimum 20″x25″ for 3-ton system). Closing doors creates pressure imbalance and backdrafts.' },
  { id: 'attic', label: '🔥 Ducts running through unconditioned attic', diagnosis: 'DFW attics reach 130-140°F in summer. Uninsulated or under-insulated ducts lose 20-30% of cooling capacity before air reaches rooms. R-8 flex duct or R-6 rigid duct with exterior wrap is DFW minimum code for attic runs.' },
  { id: 'size', label: '📐 Not sure if ducts are properly sized', diagnosis: 'Manual D calculation required for proper sizing. Rules of thumb: 6″ round duct handles ~100 CFM, 8″ handles ~200 CFM, 10″ handles ~350 CFM. Many DFW homes have 6″ flex where 8″ is needed, causing high static pressure and poor airflow.' },
  { id: 'leak', label: '💨 Suspect duct leaks', diagnosis: 'DFW homes average 25-30% duct leakage — industry standard is under 4%. Leaky ducts dump conditioned air into 140°F attic. Signs: rooms that never cool, high bills, dusty house. Duct blaster test quantifies leakage; mastic sealant or Aeroseal fixes it.' },
];

export default function DFWHVACDuctDesignGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = concerns.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>🏗️ Duct Design Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>Proper duct design is the difference between a comfortable DFW home and one with hot spots, high bills, and premature HVAC failure. Manual D calculations — not guesswork — determine correct sizing.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📋', label: 'Manual D', sub: 'Required duct sizing method' },
            { icon: '🌡️', label: 'R-8 min', sub: 'DFW attic duct insulation' },
            { icon: '📏', label: '<15 ft', sub: 'Max flex duct run length' },
            { icon: '💧', label: '<4%', sub: 'Target duct leakage rate' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642′ }}>{card.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>🔍 Duct Concern → Design Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select your duct concern:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {concerns.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ textAlign: 'left', background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '0.75rem 1rem', cursor: ’pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {found && (
            <div style={{ marginTop: '1rem', backgroundColor: '#0A1628', borderRadius: 6, padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{found.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ DFW Duct Design & Testing Pros</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk connects you with ACCA-certified DFW HVAC contractors who perform Manual D calculations and duct testing.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Get Duct Assessment →</a>
        </div>
      </div>
    </div>
  );
}
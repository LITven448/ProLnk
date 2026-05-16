import { useState } from 'react';

const problems = [
  { id: 'hot', label: '🔥 One room is always hot in summer', diagnosis: 'Insufficient supply CFM to that room. Solutions in order: (1) Check for closed/blocked supply register, (2) Partially close registers in over-cooled rooms to redirect airflow, (3) Inspect duct branch for kinks or disconnection, (4) Add a booster fan to that duct run, (5) Install zoning damper for permanent fix.' },
  { id: 'cold', label: '🧊 One room is always cold in summer', diagnosis: 'Over-supplied room — common in master bedrooms near air handler. Partially close the supply damper (the lever on the register face) to 50-70% open. If room has multiple registers, close one completely. Redirecting that airflow improves whole-home balance.' },
  { id: 'upstairs', label: '🏠 Upstairs always warmer than downstairs', diagnosis: 'Classic DFW two-story problem. Heat rises and solar gain hits upper floors harder. Solutions: (1) Close 20-30% of downstairs registers in summer to push more air upstairs, (2) Install zone dampers with separate thermostat for each floor, (3) Ensure attic insulation is R-38+ to reduce heat transfer.' },
  { id: 'master', label: '🛏️ Master bedroom overcools while other rooms are warm', diagnosis: 'Master near air handler receives highest pressure. Close master supply register 40-60%, or install a manual damper in the duct. Long-term: zoning system with master on its own zone. Short term cost: /bin/zsh. Zoning system cost: ,000-6,000 installed.' },
  { id: 'zone', label: '🎛️ Considering a zoning system', diagnosis: 'DFW zoning systems split home into 2-4 zones, each with own thermostat. Cost: ,500-6,000 depending on zones. Best for: two-story homes, homes with bonus rooms, master suites with large glass areas. Pairs with variable-speed air handler for best efficiency. ROI: 2-4 years in DFW energy savings.' },
];

export default function DFWHVACBalancingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = problems.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>⚖️ Airflow Balancing Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>Hot spots and cold spots plague DFW homes — especially two-story builds with attic ductwork. Proper balancing improves comfort without new equipment and can be started today for free.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🆓', label: 'Free', sub: 'Register adjustment cost' },
            { icon: '💰', label: '-6K', sub: 'Full zoning system' },
            { icon: '⚡', label: '2-4 yr', sub: 'Zoning system ROI in DFW' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642' }}>{card.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>🔍 Comfort Problem → Balancing Solution</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select your comfort issue:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {problems.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ textAlign: 'left', background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {found && (
            <div style={{ marginTop: '1rem', backgroundColor: '#0A1628', borderRadius: 6, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{found.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ DFW HVAC Balancing Specialists</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk connects DFW homeowners with zoning and balancing experts who provide written airflow reports and guaranteed comfort improvements.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Get Balancing Quote →</a>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const issues = [
  { id: 'high', label: '📈 High static pressure reading (above 0.8")', diagnosis: 'Severely restricted system. Common DFW causes: undersized flex duct (6" where 8" needed), dirty evaporator coil, collapsed ductwork in attic. High static damages blower motor over time.' },
  { id: 'low', label: '📉 Low static pressure reading (below 0.3")', diagnosis: 'Duct leakage or oversized equipment. In DFW attics, flex duct connections loosen with heat cycling. Leaking ducts dump conditioned air into 130°F attic space — major energy loss.' },
  { id: 'noisy', label: '🔊 System runs loud, feels labored', diagnosis: 'Blower working against high static. Measure at supply plenum and return plenum — subtract for total external static pressure (TESP). Over 0.5" w.c. on typical DFW system is elevated.' },
  { id: 'rooms', label: '🌡️ Some rooms never reach setpoint', diagnosis: 'Excessive static in branches starving far rooms. DFW ranch homes with long duct runs lose pressure over distance. Each 90° flex duct bend adds 25-50 equivalent feet of resistance.' },
  { id: 'bills', label: '💸 Unusually high electric bills', diagnosis: 'High static pressure increases power draw significantly. A system fighting 1.0" static uses 30-40% more electricity than same system at 0.5". DFW summer bills hit -600 for affected homes.' },
];

export default function DFWHVACStaticPressureGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = issues.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>📊 Static Pressure Guide for DFW HVAC Systems</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>Static pressure is the hidden killer of DFW HVAC systems. Undersized flex duct — the most common issue in DFW homes built 1985-2010 — creates high static that shortens equipment life and spikes energy bills.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '✅', label: '0.5" w.c.', sub: 'Design target' },
            { icon: '⚠️', label: '0.7" w.c.', sub: 'Elevated — investigate' },
            { icon: '🚨', label: '1.0"+ w.c.', sub: 'Critical — immediate action' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642' }}>{card.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>🔍 Static Pressure Symptom → Diagnosis</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select what you are experiencing:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {issues.map(s => (
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ Get a DFW Static Pressure Test</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk-verified HVAC techs perform complete static pressure diagnostics with manometer testing and written reports.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Schedule Diagnostic →</a>
        </div>
      </div>
    </div>
  );
}
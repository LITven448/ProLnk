import { useState } from 'react';

const tests = [
  { id: 'temp', label: '🌡️ Temperature differential test', guidance: 'Place thermometer at return air grille (reads return air temp). Place second thermometer at supply register closest to air handler. Run AC 15 minutes then measure. Ideal DFW summer differential: 16-22°F. Under 14°F = refrigerant issue or airflow problem. Over 24°F = restricted airflow, possible frozen coil risk.' },
  { id: 'time', label: '⏱️ Time-to-cool efficiency test', guidance: 'On a 95°F DFW afternoon, set thermostat 5°F below current indoor temp and time how long to reach setpoint. A properly sized, efficient system should cool 1°F per 3-5 minutes in typical DFW conditions. If taking more than 8-10 minutes per degree, suspect refrigerant shortage, dirty coil, or undersized equipment.' },
  { id: 'energy', label: '⚡ Energy use monitoring test', guidance: 'Install a smart thermostat (Ecobee, Nest) and review runtime reports. A 3-ton DFW system should run 60-80% duty cycle on 95°F days. If running 95-100% and not reaching setpoint, system is undersized or has efficiency problem. Check SEER rating: 14-16 SEER is baseline; 18-20 SEER is high efficiency.' },
  { id: 'humid', label: '💧 Humidity performance test', guidance: 'Use a digital hygrometer to measure indoor relative humidity. DFW summer target: 45-55% RH. Above 60% RH while AC runs = short-cycling issue (oversized equipment), airflow too high, or refrigerant overcharge. Proper dehumidification requires 350-400 CFM/ton and sufficient runtime.' },
  { id: 'static', label: '📊 Efficiency via static pressure check', guidance: 'High static pressure (above 0.7″ w.c.) forces the blower to work harder, reducing efficiency dramatically. A system fighting 1.0″ static uses 30-40% more electricity than same system at design pressure. Measure with a digital manometer at supply plenum and return plenum — professional tool, worth requesting in any service call.' },
];

export default function DFWHVACEfficiencyTestGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = tests.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>🔬 HVAC Efficiency Testing Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>DFW summers punish inefficient HVAC systems with electric bills of -700/month. These tests help you identify efficiency losses before they become expensive failures.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: '16-22°F', sub: 'Ideal DFW temp differential' },
            { icon: '💧', label: '45-55%', sub: 'Target indoor humidity' },
            { icon: '⚡', label: '14-16 SEER', sub: 'DFW minimum efficiency' },
            { icon: '⏱️', label: '60-80%', sub: 'Healthy runtime duty cycle' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642′ }}>{card.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>🔍 Efficiency Concern → Testing Approach</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select an efficiency test to learn how to perform it:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tests.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ textAlign: 'left', background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '0.75rem 1rem', cursor: ’pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {found && (
            <div style={{ marginTop: '1rem', backgroundColor: '#0A1628', borderRadius: 6, padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{found.guidance}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ DFW HVAC Efficiency Audit Pros</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk connects you with DFW HVAC contractors who perform full efficiency audits including static pressure, refrigerant charge, and airflow measurements — with written reports.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Book Efficiency Audit →</a>
        </div>
      </div>
    </div>
  );
}
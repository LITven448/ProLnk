import { useState } from 'react';

const scenarios = [
  { id: 'new', label: '📋 Label My Panel', steps: ['Turn on all lights, appliances, and outlets in one room', 'Trip breaker, note which room went dark (helper makes this faster)', 'Use a circuit tracer plug-in tool for outlets without a helper', 'Mark directory inside panel door: Room + device (e.g. "Master BR outlets")', '15A breakers: lighting and bedroom outlets', '20A breakers: kitchen, bathroom, laundry, garage' ] },
  { id: 'tripped', label: '⚠️ Breaker Keeps Tripping', steps: ['Unplug devices on that circuit before resetting', 'Push breaker fully OFF then firmly ON — some need a hard push', 'If it trips immediately: likely a wiring fault, call an electrician', 'Kitchen/bath 20A: check GFCI outlets upstream — reset those first', 'Dryer/HVAC 240V: breaker in off-center position means both legs tripped' ] },
  { id: 'upgrade', label: '⚡ EV or Large Appliance', steps: ['EV charger (Level 2): requires dedicated 50A 240V circuit', 'Electric range: 50A 240V, 4-wire (hot/hot/neutral/ground)', 'Electric dryer: 30A 240V — confirm current wire gauge is 10 AWG', 'HVAC condenser: typically 30–50A 240V dedicated circuit', 'Panel capacity: confirm total load does not exceed main breaker rating (100–200A)', 'DFW code: Oncor service upgrade may be needed for panels under 150A' ] },
];

const breakerTypes = [
  { amps: '15A', color: '#3b82f6', uses: 'Bedroom outlets, hallway lighting, most standard circuits' },
  { amps: '20A', color: '#10b981', uses: 'Kitchen, bathrooms, garage, laundry — any circuit with appliances' },
  { amps: '30A', color: '#f59e0b', uses: 'Electric dryer, water heater, single HVAC units' },
  { amps: '50A', color: '#ef4444', uses: 'Electric range, EV charger, large HVAC systems' },
];

export default function DFWCircuitBreakerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW Circuit Breaker Identification Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Label your DFW breaker panel correctly and understand every circuit — critical before any service visit or renovation.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>🔌 Breaker Amperage Reference Chart</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {breakerTypes.map((b, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ background: b.color, color: '#fff', borderRadius: '4px', padding: '2px 8px', fontWeight: '800', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{b.amps}</span>
                <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{b.uses}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Situation → Panel Guide</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0' }}>Guide: {match.label}</h3>
            <ol style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6' }}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Need a licensed DFW electrician?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with vetted DFW electrical pros. Free quotes, no pressure.</div>
        </div>
      </div>
    </div>
  );
}
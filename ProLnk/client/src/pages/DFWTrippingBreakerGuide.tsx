import { useState } from 'react';

const causes = {
  overloaded: {
    label: 'Overloaded Circuit',
    action: 'Unplug 2–3 devices before resetting. Redistribute load across circuits.',
    emergency: false,
  },
  short: {
    label: 'Short Circuit',
    action: 'Do NOT reset. Unplug all devices on that circuit and call an electrician.',
    emergency: true,
  },
  ground: {
    label: 'Ground Fault',
    action: 'Check for damaged cords or wet areas. Call electrician if unsure.',
    emergency: true,
  },
};

export default function DFWTrippingBreakerGuide() {
  const [location, setLocation] = useState('');
  const [frequency, setFrequency] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<null | { cause: string; action: string; emergency: boolean }>(null);

  function assess() {
    if (!location || !frequency || !season) return;
    let cause: keyof typeof causes = 'overloaded';
    if (frequency === 'immediate') cause = 'short';
    else if (location === 'bathroom' || location === 'outdoor') cause = 'ground';
    else if (season === 'summer') cause = 'overloaded';
    setResult({ cause: causes[cause].label, action: causes[cause].action, emergency: causes[cause].emergency });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ DFW Tripping Breaker Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW summers push circuits to their limits — AC units, fans, and cooling appliances all competing for power. Here's what you need to know.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Why Breakers Trip</div>
          {[
            ['⚠️ Overloaded Circuit', 'Too many high-draw devices on one circuit. DFW peak: AC + space heater + microwave.'],
            ['⚡ Short Circuit', 'Hot wire contacts neutral — causes immediate trip. Often a wiring defect or damaged cord.'],
            ['💧 Ground Fault', 'Current leaks to ground (often via moisture). Common in DFW bathrooms and outdoor outlets.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔧 DIY Reset vs Call Electrician</div>
          <div style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>✅ Safe to DIY: breaker tripped once, no smell, no visible damage — flip OFF then ON.</div>
          <div style={{ color: '#f87171′ }}>🚨 Call electrician: trips repeatedly, burning smell, sparks, or after a storm.</div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Cause Assessment Tool</div>
          {[
            { label: 'Outlet Location', value: location, setter: setLocation, options: [['kitchen', 'Kitchen'], ['bathroom', 'Bathroom'], ['outdoor', 'Outdoor'], ['living', 'Living Room'], ['garage', 'Garage']] },
            { label: 'How Often?', value: frequency, setter: setFrequency, options: [['once', 'Tripped once'], ['repeat', 'Repeats after reset'], ['immediate', 'Trips immediately']] },
            { label: 'DFW Season', value: season, setter: setSeason, options: [['summer', 'Summer (Jun–Sep)'], ['winter', 'Winter'], ['spring', 'Spring/Fall']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155′ }}>
                <option value="">Select...</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Assess My Breaker</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: result.emergency ? '#3b0000′ : '#003b1a', borderLeft: `4px solid ${result.emergency ? '#f87171' : '#4ade80'}` }}>
              <div style={{ fontWeight: 700, color: result.emergency ? '#f87171′ : '#4ade80' }}>{result.emergency ? '🚨 Emergency' : '✅ Manageable'}: {result.cause}</div>
              <div style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>{result.action}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 DFW Tip</div>
          <div style={{ color: '#94a3b8′ }}>DFW homes built before 1990 often have undersized panels (100A). If your AC trips breakers every summer, a panel upgrade to 200A may be the permanent fix.</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const responses = {
  strong_outside: {
    severity: 'HIGH',
    steps: ['Leave the area immediately — do not go back inside', 'Call 911 from a safe distance (minimum 300 feet)', 'Call Atmos Energy emergency line: 1-866-322-8667', 'Do not use your phone or any electronics inside the home', 'Keep neighbors away from the area'],
    callTech: 'Tell the technician: strong gas odor outside, possible main line or meter issue, your address and nearest cross street',
    wait: 'Wait for Atmos or fire department clearance before re-entering. Do not enter until given all-clear.',
  },
  strong_inside: {
    severity: 'CRITICAL',
    steps: ['Leave immediately — do not turn on/off any lights or electronics', 'Do not use your phone until you are outside and away from the building', 'Leave the door open as you exit to allow ventilation', 'Call 911 from neighbor\’s phone or safe distance', 'Call Atmos Energy: 1-866-322-8667'],
    callTech: 'Tell the technician: strong odor inside home, evacuated, specific room where smell is strongest, type of appliances on gas (furnace, water heater, stove)',
    wait: 'Do not re-enter until fire department and Atmos Energy clear the structure.',
  },
  faint_outside: {
    severity: 'MODERATE',
    steps: ['Do not light matches or smoke near the area', 'Check gas meter for visible damage or hissing sound', 'Check exterior gas appliance connections', 'Call Atmos Energy non-emergency: 1-866-322-8667 — they respond free', 'Avoid operating any equipment near the smell'],
    callTech: 'Tell the technician: faint odor detected outside, location relative to meter or appliances, whether you noticed any recent construction near gas lines',
    wait: 'Atmos will send a technician to check for leaks at no charge — never ignore even faint gas odors.',
  },
  faint_inside: {
    severity: 'MODERATE',
    steps: ['Open windows and doors immediately for ventilation', 'Check pilot lights on gas appliances — a blown pilot smells like gas', 'Do not use stove, oven, or any open flame', 'Call Atmos Energy: 1-866-322-8667 for free inspection', 'If smell intensifies, evacuate and call 911'],
    callTech: 'Tell the technician: faint odor in specific room/area, appliances in that area, whether pilot lights are lit, when you first noticed the smell',
    wait: 'If odor intensifies or you feel dizzy/nauseous, evacuate immediately and call 911.',
  },
};

const severityColors: Record<string, string> = { HIGH: '#f59e0b', CRITICAL: '#ef4444', MODERATE: '#3b82f6' };

export default function DFWGasLeakGuide() {
  const [location, setLocation] = useState('');
  const [intensity, setIntensity] = useState('');
  const [result, setResult] = useState<null | typeof responses.strong_inside>(null);

  function handleAssess() {
    const key = `${intensity}_${location}` as keyof typeof responses;
    if (responses[key]) setResult(responses[key]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🔥</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Gas Leak Emergency Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          DFW's clay soil expands and contracts with temperature swings, stressing buried gas lines year-round. CSST (corrugated stainless steel tubing) used in many DFW homes since the 1990s is vulnerable to lightning-induced arcing. If you smell rotten eggs — act immediately.
        </p>

        <div style={{ background: '#422006', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #f59e0b' }}>
          <h2 style={{ color: '#fcd34d', fontSize: '1rem', marginBottom: '0.5rem' }}>⚡ DFW-Specific Risk: CSST Flexible Gas Lines</h2>
          <p style={{ color: '#fde68a', margin: 0, fontSize: '0.9rem' }}>Homes built 1990–2010 commonly have CSST flexible gas tubing. Lightning strikes near the home can arc through CSST and create pinhole gas leaks. Have a licensed plumber bond your CSST — required by DFW code since 2008.</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Describe What You're Experiencing</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Where do you smell gas?</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'inside', label: '🏠 Inside the home' }, { key: 'outside', label: '🌳 Outside / yard / meter' }].map(opt => (
              <button key={opt.key} onClick={() => setLocation(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: location === opt.key ? '#F5E642' : '#334155', background: location === opt.key ? '#F5E642' : 'transparent', color: location === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>How strong is the odor?</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'faint', label: '🟡 Faint / intermittent' }, { key: 'strong', label: '🔴 Strong / constant' }].map(opt => (
              <button key={opt.key} onClick={() => setIntensity(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: intensity === opt.key ? '#F5E642' : '#334155', background: intensity === opt.key ? '#F5E642' : 'transparent', color: intensity === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={handleAssess} disabled={!location || !intensity} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', opacity: (!location || !intensity) ? 0.5 : 1 }}>
            Get Emergency Steps
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid ${severityColors[result.severity]}` }}>
            <div style={{ background: severityColors[result.severity], color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '20px', fontWeight: 700, marginBottom: '1rem' }}>{result.severity} RISK</div>
            <ol style={{ color: '#cbd5e1', lineHeight: 2.1, paddingLeft: '1.2rem', margin: '0 0 1rem 0' }}>
              {result.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📞 What to Tell the Technician</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.callTech}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⏳ When to Re-enter</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.wait}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>📞 Emergency Contacts</h2>
          <div style={{ color: '#cbd5e1', lineHeight: 2 }}>
            <div>🚨 <strong style={{ color: '#fff' }}>911</strong> — Life-threatening gas emergency</div>
            <div>🔵 <strong style={{ color: '#fff' }}>Atmos Energy: 1-866-322-8667</strong> — Free 24/7 gas leak response</div>
            <div>🔧 <strong style={{ color: '#fff' }}>Licensed gas plumber:</strong> Required for interior line repairs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

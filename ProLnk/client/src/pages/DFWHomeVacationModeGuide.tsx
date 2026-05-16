import { useState } from 'react';

interface VacationPlan {
  hvac: string;
  water: string;
  lights: string;
  security: string;
  plants: string;
  mail: string;
  neighbor: string;
  utilitySavings: string;
  smartHomeSettings: string[];
}

function buildPlan(length: string, homeType: string, hasSmartHome: boolean): VacationPlan {
  const isExtended = length === 'week' || length === 'month';
  const isSummer = true; // DFW context always considers summer risk

  return {
    hvac: isSummer
      ? `Set to 82°F — NEVER turn off in DFW summer. 82°F prevents mold, warping, and pipe stress. ${isExtended ? 'Smart thermostat recommended for remote monitoring.' : ''}`
      : 'Set to 60°F minimum in winter — DFW freeze events (Feb 2021-style) require minimum heat.',
    water: isExtended
      ? 'Turn off water main if gone 7+ days — burst pipes and slow leaks cost $10K+ in DFW homes. Leave water heater on VACATION mode.'
      : 'Leave water on for shorter trips — know shutoff location. Check under sinks before leaving.',
    lights: hasSmartHome
      ? 'Program lights on 2 random schedules (7–9pm + 10pm–12am) — smart bulbs deter break-ins better than timers'
      : 'Use $15 mechanical timer on 1–2 lamps. Consistent on/off times signal vacancy — randomize if possible.',
    security: hasSmartHome
      ? 'Enable 24/7 recording mode on cameras. Set motion alerts to phone. Share temporary access with trusted neighbor.'
      : 'Notify trusted neighbor of dates. Hold mail (USPS Hold Mail online). Pause newspaper/delivery subscriptions.',
    plants: isExtended
      ? 'Water thoroughly 24hrs before leaving. Self-watering spikes for indoor plants (2-week supply). Ask neighbor for outdoor plant check.'
      : 'Water all plants night before. Indoor plants handle 3–5 days without water if fully hydrated.',
    mail: 'USPS Hold Mail via usps.com — hold for exact dates. Amazon Locker or neighbor for packages.',
    neighbor: 'Give trusted neighbor: spare key, your cell, emergency contacts (HVAC, plumber), and knowledge of pet/plant needs.',
    utilitySavings: length === 'weekend' ? '$30–50 on electric' : length === 'week' ? '$80–150 on electric' : '$300–500 on electric',
    smartHomeSettings: hasSmartHome ? [
      'Set Ecobee/Nest to AWAY mode — enables adaptive vacation setpoint',
      'Enable camera motion zones on driveways and entries',
      'Set smart lock to "Auto-Lock every 15 min" mode',
      'Turn off smart plugs for non-essential devices (TVs, coffee makers)',
      'Enable leak sensor notifications if installed',
      'Schedule exterior smart lights on random sunset-based schedule',
    ] : [
      'Unplug TVs, gaming consoles, and coffee makers (phantom load + surge risk)',
      'Set programmable thermostat HOLD to 82°F (not schedule mode)',
      'Turn off water heater pilot or set to VACATION mode on tank heaters',
    ],
  };
}

export default function DFWHomeVacationModeGuide() {
  const [length, setLength] = useState('');
  const [homeType, setHomeType] = useState('');
  const [hasSmartHome, setHasSmartHome] = useState(false);
  const [plan, setPlan] = useState<VacationPlan | null>(null);

  function generate() {
    if (!length || !homeType) return;
    setPlan(buildPlan(length, homeType, hasSmartHome));
  }

  const sections = plan ? [
    { icon: '🌡️', title: 'HVAC Settings', content: plan.hvac, critical: true },
    { icon: '💧', title: 'Water Management', content: plan.water, critical: length === 'week' || length === 'month' },
    { icon: '💡', title: 'Lighting Strategy', content: plan.lights, critical: false },
    { icon: '🔒', title: 'Security Plan', content: plan.security, critical: false },
    { icon: '🌿', title: 'Plant Care', content: plan.plants, critical: false },
    { icon: '📬', title: 'Mail & Deliveries', content: plan.mail, critical: false },
    { icon: '🤝', title: 'Trusted Neighbor Protocol', content: plan.neighbor, critical: false },
  ] : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✈️🏠</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Vacation Mode Home Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>DFW's 100°F+ summers make vacation prep non-negotiable. A home left wrong for 1 week can cost $5,000+ in damage.</p>

        <div style={{ background: '#2d1515', border: '1px solid #f87171', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#f87171', fontWeight: 700 }}>⚠️ DFW Summer Critical Rule</p>
          <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 6 }}>NEVER turn off your AC in DFW summer. Attic temps reach 150°F — within 48 hours, furniture warps, pipes stress, and mold begins in humid areas. Set to 82°F minimum.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛫 Configure Your Vacation Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Vacation Length</label>
            <select value={length} onChange={e => setLength(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="weekend">Weekend (2–3 days)</option>
              <option value="week">1 Week</option>
              <option value="month">2+ Weeks / Extended</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="house">Single Family House</option>
              <option value="townhome">Townhome / HOA Community</option>
              <option value="condo">Condo / Apartment</option>
            </select>
          </div>
          <div onClick={() => setHasSmartHome(!hasSmartHome)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 20, padding: 12, background: hasSmartHome ? '#1a3a5c' : '#0A1628', borderRadius: 8, border: `1px solid ${hasSmartHome ? '#F5E642' : '#1e3a5f'}` }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: hasSmartHome ? '#F5E642' : 'transparent', border: `2px solid ${hasSmartHome ? '#F5E642' : '#475569'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 700, fontSize: 14 }}>{hasSmartHome ? '✓' : ''}</div>
            <span style={{ color: '#cbd5e1' }}>📱 I have smart home devices (thermostat, cameras, locks)</span>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Build My DFW Vacation Plan</button>
        </div>

        {plan && (
          <>
            {sections.map(s => (
              <div key={s.title} style={{ background: s.critical ? '#1a2a1a' : '#112240', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: `4px solid ${s.critical ? '#22c55e' : '#1e3a5f'}` }}>
                <h3 style={{ color: s.critical ? '#22c55e' : '#F5E642', marginBottom: 8, fontSize: 16 }}>{s.icon} {s.title}</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{s.content}</p>
              </div>
            ))}
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 12 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>{hasSmartHome ? '📱' : '🔌'} {hasSmartHome ? 'Smart Home Settings' : 'Non-Smart Home Actions'}</h3>
              {plan.smartHomeSettings.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <p style={{ color: '#cbd5e1', fontSize: 14 }}>{s}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a3a5c', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>Estimated Utility Savings</p>
              <p style={{ color: '#F5E642', fontSize: 28, fontWeight: 700 }}>{plan.utilitySavings}</p>
              <p style={{ color: '#64748b', fontSize: 12 }}>vs. normal DFW summer usage</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

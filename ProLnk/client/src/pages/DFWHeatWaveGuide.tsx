import { useState } from 'react';

const homeTypes = [
  { id: 'old_single', label: '🏚️ Pre-1990 single family (older AC, less insulation)' },
  { id: 'new_single', label: '🏠 Post-2000 single family (modern HVAC)' },
  { id: 'townhome', label: '🏢 Townhome or condo (shared walls)' },
  { id: 'manufactured', label: '🏕️ Manufactured or mobile home' },
];

const hvacAges = [
  { id: 'new', label: '✅ Under 7 years old' },
  { id: 'mid', label: '⚠️ 7–14 years old' },
  { id: 'old', label: '🚨 15+ years old' },
];

const coolingCenters: { city: string; location: string }[] = [
  { city: 'Dallas', location: 'Dallas City Hall, libraries, and recreation centers (call 311 for nearest open site)' },
  { city: 'Fort Worth', location: 'Fort Worth Public Library branches, Will Rogers Memorial Center' },
  { city: 'Plano', location: 'Plano Recreation Center, Plano Public Library branches' },
  { city: 'Arlington', location: 'Arlington Public Libraries, George W. Hawkes Downtown Library' },
  { city: 'Irving', location: 'Irving Public Library system, Heritage Senior Center' },
];

export default function DFWHeatWaveGuide() {
  const [homeType, setHomeType] = useState('');
  const [hvacAge, setHvacAge] = useState('');
  const [showResults, setShowResults] = useState(false);

  const riskScore = (homeType === 'old_single' || homeType === 'manufactured' ? 2 : homeType === 'townhome' ? 1 : 0) + (hvacAge === 'old' ? 3 : hvacAge === 'mid' ? 1 : 0);
  const risk = riskScore >= 4 ? { label: 'HIGH RISK', color: '#ef4444' } : riskScore >= 2 ? { label: 'MODERATE RISK', color: '#f59e0b' } : { label: 'LOWER RISK', color: '#22c55e' };

  const preventionList = [
    'Replace AC filter every 30 days during summer (dirty filter = 15% efficiency loss)',
    'Shade condenser unit with an awning or shade screen — but maintain 2ft clearance for airflow',
    'Set thermostat to 78°F when home, 85°F when away — do NOT drop below 72°F (causes freeze-ups)',
    'Close blinds on south and west-facing windows between 11am–5pm',
    'Run ceiling fans counterclockwise in summer — feels 4°F cooler',
    'Avoid heat-generating appliances (oven, dryer) during peak hours (2pm–8pm)',
    ...(hvacAge === 'old' ? ['PRIORITY: Schedule pre-emptive capacitor and refrigerant check — these are the #1 failure points on older units'] : []),
    ...(homeType === 'manufactured' ? ['Add radiant barrier under roof decking — manufactured homes lose significantly more heat than site-built'] : []),
  ];

  const backupPlan = [
    { step: 'AC failing (warm air blowing)', action: 'Check filter, circuit breaker, and thermostat first. Call HVAC for service if not resolved.' },
    { step: 'AC down 1-2 hours', action: 'Draw shades, move to lowest floor, set up battery fans. Monitor for vulnerable family members.' },
    { step: 'AC down 4+ hours on 100°F+ day', action: 'Call HVAC for emergency service (expect 2-4hr wait). Consider hotel or cooling center if vulnerable occupants.' },
    { step: 'AC down overnight', action: 'Take a cool bath before bed, sleep on lowest floor, use a battery fan. Go to cooling center if over 80°F inside at midnight.' },
    { step: 'No HVAC repair available for 24h+', action: 'Move to cooling center or family/friend’s home. Do not remain in a home above 90°F if elderly, infant, or medically fragile.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Heat Wave Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>100°F+ Day Protocols for North Texas Homes</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#ef4444', color: '#fff', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          🌡️ DFW FACT: Dallas averages 16 days above 100°F per summer. Heat indexes frequently reach 110°F. Your AC is not optional equipment — it is life safety infrastructure.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚠️ Health Risks on 100°F+ Days</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {[
            { group: '👴 Elderly residents', risk: 'Cannot regulate body temperature efficiently. Risk of heat stroke begins at 90°F indoors.' },
            { group: '👶 Infants & young children', risk: 'Heat up 5x faster than adults. Never leave in cars, even briefly.' },
            { group: '🐕 Pets', risk: 'Pavement above 95°F burns paw pads. Walk before 8am or after 8pm. Outdoor water refresh 3x daily.' },
            { group: '💊 Medically fragile', risk: 'Many medications impair heat regulation. Consult doctor about heat wave protocols for your prescriptions.' },
          ].map(item => (
            <div key={item.group} style={{ background: '#111f35', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.group}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{item.risk}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Calculate Your Heat Wave Risk</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>Home type:</p>
        <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
          {homeTypes.map(h => (
            <button key={h.id} onClick={() => setHomeType(h.id)} style={{ background: homeType === h.id ? '#1a3a5c' : '#111f35', border: `2px solid ${homeType === h.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '11px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {h.label}
            </button>
          ))}
        </div>

        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>HVAC age:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
          {hvacAges.map(a => (
            <button key={a.id} onClick={() => setHvacAge(a.id)} style={{ background: hvacAge === a.id ? '#1a3a5c' : '#111f35', border: `2px solid ${hvacAge === a.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 10px', color: '#fff', cursor: 'pointer', fontSize: 13 }}>
              {a.label}
            </button>
          ))}
        </div>

        <button onClick={() => setShowResults(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
          Show My Risk Score + Prevention Plan →
        </button>

        {showResults && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#111f35', borderRadius: 12, padding: '20px 24px', border: `2px solid ${risk.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>Prevention Checklist</h3>
                <div style={{ background: risk.color, color: '#fff', fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{risk.label}</div>
              </div>
              {preventionList.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < preventionList.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>☑</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#111f35', borderRadius: 12, padding: '20px 24px' }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🔋 Backup Plan if AC Fails</h3>
              {backupPlan.map((item, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < backupPlan.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 14, marginBottom: 4 }}>{item.step}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.action}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#111f35', borderRadius: 12, padding: '20px 24px' }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🏛️ DFW Cooling Centers</h3>
              {coolingCenters.map(c => (
                <div key={c.city} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ fontWeight: 600, color: '#F5E642', fontSize: 14 }}>{c.city}: </span>
                  <span style={{ color: '#cbd5e1', fontSize: 13 }}>{c.location}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

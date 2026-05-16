import { useState } from 'react';

const guestSituations = [
  { id: 'weekend', label: '🏨 Weekend Visitors (2-3 people, 2 days)', people: 3, days: 2, showers: 6, severity: 'LOW' },
  { id: 'weeklong', label: '🧳 Week-Long Family Stay (4-5 people, 7 days)', people: 5, days: 7, showers: 35, severity: 'MEDIUM' },
  { id: 'holiday', label: '🎄 Holiday Gathering (8-12 people, 3 days)', people: 10, days: 3, showers: 20, severity: 'HIGH' },
  { id: 'extended', label: '🏡 Extended Family Stay (3-4 people, 14+ days)', people: 4, days: 14, showers: 56, severity: 'HIGH' },
  { id: 'party', label: '🎉 Large Party (20+ people, single day)', people: 22, days: 1, showers: 5, severity: 'EXTREME' },
];

const dfwHomes = [
  { id: 'apt', label: 'DFW Apartment or Condo' },
  { id: 'starter', label: 'DFW Starter Home (<1800 sq ft)' },
  { id: 'mid', label: 'DFW Mid-Size Home (1800-3000 sq ft)' },
  { id: 'large', label: 'DFW Large Home (3000+ sq ft)' },
];

function buildPlan(situation: typeof guestSituations[0], home: typeof dfwHomes[0]) {
  const tips: string[] = [];
  tips.push(`🌡️ Pre-cool ${situation.people >= 8 ? '3 hours' : '1 hour'} before guests arrive — target 70°F`);
  if (situation.showers > 20) tips.push('🚿 Stagger shower times — each hot shower adds humidity and raises feels-like temp');
  if (situation.severity === 'HIGH' || situation.severity === 'EXTREME') tips.push('⚠️ DFW air already carries high humidity — extra showers compound HVAC load significantly');
  tips.push('💨 Run bathroom exhaust fans for 30 min after each shower');
  if (situation.people >= 8) tips.push('🪟 Keep blinds closed during DFW daytime hours — solar gain is brutal');
  if (home.id === 'apt' || home.id === 'starter') tips.push('🏠 Small DFW spaces heat fast — check thermostat every 2 hours during peak occupancy');
  if (situation.days >= 7) tips.push('🔧 Check filter after day 5 — more people = more particles = faster clogging');
  tips.push('🌬️ Place portable fans strategically — they let you raise thermostat 4°F with same comfort');
  if (situation.severity === 'EXTREME') tips.push('📞 Have a DFW HVAC pro\'s number ready — large gatherings can trip systems');
  tips.push('🌙 At night: bump up 2°F — sleeping guests generate less heat');
  return tips;
}

export default function DFWHVACGuestGuide() {
  const [situation, setSituation] = useState('');
  const [home, setHome] = useState('');

  const selectedSituation = guestSituations.find(s => s.id === situation);
  const selectedHome = dfwHomes.find(h => h.id === home);
  const plan = selectedSituation && selectedHome ? buildPlan(selectedSituation, selectedHome) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>👥 Guests & Your DFW HVAC</h1>
        <p style={{ color: '#8899AA', marginBottom: 12 }}>
          Every person in your DFW home adds 300-400 BTUs of body heat per hour. More people = more showers = more cooking = an AC that's fighting for its life in DFW's climate.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontWeight: 600, fontSize: 14 }}>
          ⚡ DFW's ambient summer temps of 95-107°F mean your AC is already working near max capacity before guests arrive.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>👥 Guest Situation</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {guestSituations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)}
                style={{ background: situation === s.id ? '#F5E642' : '#1A2D4A', color: situation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
                <span style={{ display: 'block', fontWeight: 400, fontSize: 12, marginTop: 2, opacity: 0.8 }}>Severity: {s.severity}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🏠 Your DFW Home</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {dfwHomes.map(h => (
              <button key={h.id} onClick={() => setHome(h.id)}
                style={{ background: home === h.id ? '#F5E642' : '#1A2D4A', color: home === h.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {plan.length > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Your DFW Guest HVAC Plan</h2>
            {plan.map((tip, i) => (
              <div key={i} style={{ background: '#1A2D4A', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 15 }}>{tip}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

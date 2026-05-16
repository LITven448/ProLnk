import { useState } from 'react';

const homeProfiles = [
  { id: 'new', label: 'New home (built 2015–present)', age: 0 },
  { id: 'mid', label: 'Mid-age home (built 2000–2014)', age: 12 },
  { id: 'older', label: 'Older home (built 1985–1999)', age: 28 },
  { id: 'vintage', label: 'Vintage home (built before 1985)', age: 45 },
];

const hvacAges = [
  { id: 'new', label: 'HVAC system 0–4 years old', age: 2 },
  { id: 'mid', label: 'HVAC system 5–9 years old', age: 7 },
  { id: 'aging', label: 'HVAC system 10–14 years old', age: 12 },
  { id: 'old', label: 'HVAC system 15+ years old', age: 17 },
];

function getAssessment(homeAge: number, hvacAge: number) {
  if (hvacAge >= 15) {
    return {
      rating: 'Critical',
      color: '#C0392B',
      summary: 'System is past typical DFW lifespan. In 100°F+ summers, aging systems face compressor failure risk. Budget for replacement this year.',
      priorities: [
        'Capacitor and contactor: replace proactively — near end of life',
        'Evaporator coil: inspect for formicary corrosion from DFW water',
        'Blower wheel: likely due for cleaning or replacement',
        'Ductwork: check for air leaks and insulation degradation',
        'Get replacement quotes now before peak season demand',
      ],
    };
  }
  if (hvacAge >= 10) {
    return {
      rating: 'Monitor Closely',
      color: '#E67E22',
      summary: 'Mid-age system entering the risk zone for DFW summers. Most components still functional but starting to show wear.',
      priorities: [
        'Capacitor: test annually — this age group has 40% failure risk in DFW summer',
        'Condenser coil: clean annually, inspect for cottonwood damage',
        'Drain line: quarterly flush essential at this system age',
        'Filter schedule: monthly changes to reduce blower wheel buildup',
        'Annual tune-up: most cost-effective investment at this system age',
      ],
    };
  }
  if (hvacAge >= 5) {
    return {
      rating: 'Good — Stay Ahead',
      color: '#27AE60',
      summary: 'System is in its prime. DFW-specific maintenance keeps it performing at peak efficiency through the long cooling season.',
      priorities: [
        'Annual condenser coil cleaning before cooling season',
        'Drain line quarterly flush — DFW humidity demands it',
        'Monthly filter changes during summer peak',
        'Confirm float switch is installed and functional',
        homeAge > 20 ? 'Older home: inspect ductwork for leaks — older DFW homes often have undersized ducts' : 'Ductwork health: generally good at this system age',
      ],
    };
  }
  return {
    rating: 'Excellent',
    color: '#2ECC71',
    summary: 'New system. Focus is on establishing good maintenance habits now to maximize the 15–20 year lifespan in DFW conditions.',
    priorities: [
      'Register the equipment warranty — many manufacturers require it within 30–90 days',
      'Set monthly filter reminders for June–September',
      'Install float switch if not already present',
      'Quarterly drain line flush habit: start it now',
      'Annual tune-up: optional at this age but builds a tech relationship for when you need one fast',
    ],
  };
}

export default function DFWHVACSystemIntegrity() {
  const [homeProfile, setHomeProfile] = useState<string | null>(null);
  const [hvacAge, setHvacAge] = useState<string | null>(null);

  const homeData = homeProfiles.find(h => h.id === homeProfile);
  const hvacData = hvacAges.find(h => h.id === hvacAge);
  const assessment = homeData && hvacData ? getAssessment(homeData.age, hvacData.age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🏠</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC System Integrity</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          A complete DFW HVAC system integrity assessment considers every component and how DFW's climate — extreme heat, high humidity, cottonwood season, and frequent storms — affects each one. Use this guide to understand your full system health and know exactly what to prioritize.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🗺️ Full System Component Map</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '❄️', name: 'Evaporator Coil', dfwRisk: 'High — mold from DFW humidity' },
              { icon: '🌬️', name: 'Condenser Coil', dfwRisk: 'High — cottonwood + dust clogging' },
              { icon: '💧', name: 'Drain Line', dfwRisk: 'Very High — algae from heat + condensate' },
              { icon: '💨', name: 'Blower Wheel', dfwRisk: 'Medium-High — dust + pollen buildup' },
              { icon: '🔋', name: 'Capacitor', dfwRisk: 'Very High — #1 DFW summer failure' },
              { icon: '⚡', name: 'Contactor', dfwRisk: 'High — #2 DFW summer failure' },
              { icon: '🖥️', name: 'Control Board', dfwRisk: 'Medium — DFW lightning/surge risk' },
              { icon: '🔧', name: 'Compressor', dfwRisk: 'High at 10+ yrs — DFW heat stress' },
            ].map(item => (
              <div key={item.name} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>DFW Risk: {item.dfwRisk}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Integrity Assessment</h2>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Your home age:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {homeProfiles.map(h => (
                <button key={h.id} onClick={() => setHomeProfile(h.id)} style={{
                  background: homeProfile === h.id ? '#1E3A5F' : '#0A1628',
                  border: `2px solid ${homeProfile === h.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 8, padding: '10px 16px', color: '#E8EDF5', textAlign: 'left', cursor: 'pointer', fontSize: 14,
                }}>{h.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Your HVAC system age:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {hvacAges.map(h => (
                <button key={h.id} onClick={() => setHvacAge(h.id)} style={{
                  background: hvacAge === h.id ? '#1E3A5F' : '#0A1628',
                  border: `2px solid ${hvacAge === h.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 8, padding: '10px 16px', color: '#E8EDF5', textAlign: 'left', cursor: 'pointer', fontSize: 14,
                }}>{h.label}</button>
              ))}
            </div>
          </div>

          {assessment && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${assessment.color}` }}>
              <div style={{ fontWeight: 700, color: assessment.color, fontSize: 18, marginBottom: 8 }}>
                System Integrity: {assessment.rating}
              </div>
              <div style={{ color: '#94A3B8', marginBottom: 16, lineHeight: 1.6 }}>{assessment.summary}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 10 }}>Priority Actions:</div>
              <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
                {assessment.priorities.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
          {(!homeProfile || !hvacAge) && (
            <div style={{ color: '#94A3B8', fontSize: 14, fontStyle: 'italic' }}>Select your home age and HVAC age above to get your personalized DFW integrity assessment.</div>
          )}
        </div>
      </div>
    </div>
  );
}

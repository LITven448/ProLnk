import { useState } from 'react';

const emergencies = [
  {
    id: 'burst_pipe',
    icon: '💧',
    label: 'Burst Pipe',
    who: 'Emergency Plumber',
    first30: [
      'Shut off main water valve immediately',
      'Turn off electrical breakers in affected area',
      'Move valuables off floor',
      'Document damage with photos',
      'Call emergency plumber',
    ],
    dontDo: 'Do NOT turn water back on until plumber has assessed the break.',
    avgPremium: '$250–$500 emergency dispatch fee + repair cost',
    avgRepair: '$1,200–$3,500',
  },
  {
    id: 'no_ac',
    icon: '🌡️',
    label: 'No AC (100°F day)',
    who: 'Emergency HVAC Tech',
    first30: [
      'Check thermostat batteries first',
      'Check circuit breaker for HVAC unit',
      'Check outdoor unit — is it running?',
      'Open windows at night, close during day',
      'Call emergency HVAC — heat is dangerous',
    ],
    dontDo: 'Do NOT leave elderly or pets in a sealed home above 85°F.',
    avgPremium: '$150–$300 after-hours dispatch fee',
    avgRepair: '$200–$4,000 depending on component',
  },
  {
    id: 'roof_leak',
    icon: '🏠',
    label: 'Roof Leak (Active Storm)',
    who: 'Emergency Roofer',
    first30: [
      'Do NOT go on the roof during a storm',
      'Place buckets under active drips',
      'Move electronics and valuables',
      'Photograph all water intrusion',
      'Call roofer for emergency tarping',
    ],
    dontDo: 'Do NOT wait — standing water causes mold in 24–48 hours.',
    avgPremium: '$400–$800 emergency tarping',
    avgRepair: '$800–$15,000 depending on scope',
  },
  {
    id: 'gas_smell',
    icon: '⚠️',
    label: 'Gas Smell',
    who: '911 + Gas Utility',
    first30: [
      'Evacuate everyone immediately — do not stop to gather belongings',
      'Do NOT flip any light switches',
      'Do NOT use your phone inside the home',
      'Call 911 from outside or neighbor\’s house',
      'Call Atmos Energy: 1-888-286-6700',
    ],
    dontDo: 'Do NOT re-enter until cleared by fire department.',
    avgPremium: 'Free emergency response (911)',
    avgRepair: '$200–$2,000 for gas line repair after leak located',
  },
  {
    id: 'power_out',
    icon: '⚡',
    label: 'Power Outage',
    who: 'Oncor / Utility',
    first30: [
      'Check your breaker panel first',
      'Check if neighbors are also out',
      'Report outage to Oncor: 888-313-4747',
      'Unplug sensitive electronics to avoid surge damage',
      'Keep refrigerator closed — safe 4 hours, freezer 48 hours',
    ],
    dontDo: 'Do NOT run a gas generator indoors or in the garage.',
    avgPremium: 'Free utility response',
    avgRepair: 'If internal wiring: $300–$2,000+ for electrician',
  },
  {
    id: 'foundation',
    icon: '🏗️',
    label: 'New Foundation Crack',
    who: 'Structural Engineer',
    first30: [
      'Photograph crack with ruler showing width',
      'Note if crack is horizontal, vertical, or diagonal',
      'Check if doors or windows are newly sticking',
      'Do NOT fill crack with caulk — may hide worsening',
      'Schedule structural engineer inspection (not just a repair contractor)',
    ],
    dontDo: 'Do NOT hire a foundation repair company before getting an independent engineer opinion.',
    avgPremium: '$400–$700 structural engineer consultation',
    avgRepair: '$3,000–$30,000+ depending on severity',
  },
];

export default function EmergencyContractorGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const emergency = emergencies.find(e => e.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚨</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Emergency Home Repair
          </h1>
          <p style={{ color: '#94a3b8' }}>Who to call, what to do first, and what NOT to do — by emergency type</p>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>🔖</span>
          <strong>Bookmark this page now</strong> — emergencies happen when you're least prepared. Share it with your household.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Select Your Emergency
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {emergencies.map(e => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id === selected ? null : e.id)}
              style={{
                background: selected === e.id ? '#F5E642' : '#112240',
                color: selected === e.id ? '#0A1628' : '#fff',
                border: `2px solid ${selected === e.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{e.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{e.label}</div>
              <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.8 }}>{e.who}</div>
            </button>
          ))}
        </div>

        {emergency && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem' }}>{emergency.icon}</span>
              <div>
                <h2 style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{emergency.label}</h2>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Call: <strong style={{ color: '#fff' }}>{emergency.who}</strong></div>
              </div>
            </div>

            <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem' }}>⏱️ First 30 Minutes:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {emergency.first30.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', background: '#0A1628', borderRadius: 8, padding: '0.625rem 0.875rem' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#2d1515', border: '1px solid #ef4444', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.25rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>🚫 DO NOT: </span>
              <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{emergency.dontDo}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '0.875rem 1rem', flex: 1, minWidth: 160 }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>EMERGENCY PREMIUM</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{emergency.avgPremium}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '0.875rem 1rem', flex: 1, minWidth: 160 }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>AVG REPAIR COST</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{emergency.avgRepair}</div>
              </div>
            </div>
          </div>
        )}

        {!emergency && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '2rem', textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☝️</div>
            Select an emergency type above to see your action plan
          </div>
        )}

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Need an Emergency Contractor Now?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>ProLnk connects DFW homeowners with vetted contractors — plumbers, HVAC, roofers, and more.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Find a Contractor Fast
          </button>
        </div>
      </div>
    </div>
  );
}

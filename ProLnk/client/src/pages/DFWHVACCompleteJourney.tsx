import { useState } from 'react';

const journeyStages = [
  {
    stage: 'Day 1: New Home',
    years: 'Year 0',
    icon: '🏠',
    description: 'You just moved into a DFW home. You do not know the HVAC system history.',
    whatHappens: [
      'Unknown service history — previous owner may have deferred maintenance',
      'Unknown system age — could be 2 years or 14 years old',
      'Possible deferred repairs waiting to surface in first summer or winter',
      'Thermostat, filter, and drain all need immediate inspection',
    ],
    proLnkProvides: [
      'Verified new-home HVAC inspection matched to DFW-experienced contractor',
      'Home Health Vault record created — your permanent system history starts here',
      'System age and efficiency rating documented for future decisions',
    ],
    yourJob: 'Request a new-homeowner HVAC inspection within 30 days. Do not wait for a failure to learn your system.',
  },
  {
    stage: 'Active Maintenance',
    years: 'Years 1-7',
    icon: '🔧',
    description: 'System is running. Your job is consistent maintenance to maximize efficiency and lifespan.',
    whatHappens: [
      'Annual spring tune-up (cooling prep) and fall tune-up (heating prep)',
      'Monthly filter changes during peak seasons (June-August, January)',
      'Condensate drain flush each spring before cooling season',
      'Minor repairs: capacitors, contactors, drain pan sensors',
    ],
    proLnkProvides: [
      'Annual service agreement matching with contractors who offer tune-up priority scheduling',
      'Seasonal reminders tied to your DFW area and system type',
      'All maintenance records stored in Home Health Vault for warranty and resale value',
    ],
    yourJob: 'Sign an annual service agreement. The cost is $150-350/year. The savings in avoided emergency repairs is $800-2000/year average.',
  },
  {
    stage: 'First Major Repair',
    years: 'Years 3-10 (unpredictable)',
    icon: '⚠️',
    description: 'First significant repair decision: fix it or start planning replacement.',
    whatHappens: [
      'Common first failures: capacitor ($150-300), contactor ($200-400), blower motor ($400-700)',
      'At this stage, repair almost always makes financial sense',
      'Exception: compressor failure — evaluate replacement if system is over 8 years old',
      'DFW hail can accelerate this stage if outdoor coil was not replaced after storm damage',
    ],
    proLnkProvides: [
      'Second-opinion matching for any repair quote over $800',
      'Home Health Vault shows full repair history to inform repair vs replace math',
      'Contractor transparency scoring from ProLnk verified reviews',
    ],
    yourJob: 'Do not skip the second opinion on any repair over $800. ProLnk can get you a second quote same day.',
  },
  {
    stage: 'System Decision Point',
    years: 'Years 10-15',
    icon: '⚖️',
    description: 'System is aging. Every repair prompts the repair vs. replace calculation.',
    whatHappens: [
      'Apply the 5000 rule: multiply system age by repair cost. If over 5000, lean toward replacement',
      'R-22 refrigerant systems (pre-2010) cannot be refilled after 2020 — replacement is mandatory at next refrigerant issue',
      'Efficiency gap: 2010 system at 13 SEER vs 2024 replacement at 20 SEER = 35% energy savings',
      'DFW utility rebates (Oncor, TXU) often available for high-efficiency replacement systems',
    ],
    proLnkProvides: [
      'Replacement bid matching — multiple verified contractors for major system replacement',
      'System lifecycle data from your Home Health Vault informs the decision with real numbers',
      'ProLnk contractors familiar with DFW utility rebate programs and can apply on your behalf',
    ],
    yourJob: 'Request three bids for any replacement. Get efficiency ratings, warranty terms, and labor warranty in writing from each.',
  },
  {
    stage: 'New System Installation',
    years: 'Replacement Year',
    icon: '✨',
    description: 'You have decided to replace. This is your biggest HVAC investment and the moment where quality of contractor matters most.',
    whatHappens: [
      'Manual J load calculation should be done — right-sizing for your DFW home is critical',
      'Installation quality determines system lifespan more than brand — 80% of failures are installation-related',
      'Permit required in most DFW cities — insist on permitted installation',
      'Refrigerant charge must be verified after installation — improper charge reduces lifespan by 30%',
    ],
    proLnkProvides: [
      'Replacement-specialist contractors matched — not just service techs doing installs as a side job',
      'Permit verification and post-installation inspection coordination',
      'New Home Health Vault entry created for new system — journey starts again with full data',
    ],
    yourJob: 'Require a Manual J calculation. Require a permit. Verify the refrigerant charge reading in writing at installation completion.',
  },
  {
    stage: 'Long-Term Ownership',
    years: 'Years 1-15 on new system',
    icon: '♻️',
    description: 'The cycle restarts. You now have system history, a contractor network, and Home Health Vault records.',
    whatHappens: [
      'New system should run efficiently with proper maintenance for 15-20 years in DFW',
      'Technology improvements: smart thermostats, zoning, air quality integration all become options',
      'Home Health Vault records add to your home value — documented system history matters at resale',
      'Your HVAC contractor network is now an asset — nurture it',
    ],
    proLnkProvides: [
      'Lifetime Home Health Vault access — system records follow you through future moves and sales',
      'ProLnk commitment to DFW homeowners does not end at installation — we are here for the full journey',
      'Network continuity: your ProLnk-matched contractors stay in your profile for future needs',
    ],
    yourJob: 'You are now an informed DFW HVAC owner. Share your knowledge. Refer neighbors to ProLnk. The community improves when everyone has access to quality contractors.',
  },
];

export default function DFWHVACCompleteJourney() {
  const [selected, setSelected] = useState(0);
  const current = journeyStages[selected];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗺️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>The Complete DFW HVAC Journey</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>From Day 1 of homeownership to system replacement — and everything ProLnk provides along the way</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>📍 Where Are You on the Journey?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            {journeyStages.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ backgroundColor: selected === i ? '#F5E642' : '#1A2E4A', color: selected === i ? '#0A1628' : '#E8EDF2', border: 'none', borderRadius: '8px', padding: '0.75rem 0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.4rem' }}>{s.icon}</div>
                <div style={{ marginTop: '0.3rem' }}>{s.stage}</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.75, marginTop: '0.15rem', fontWeight: 400 }}>{s.years}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>{current.icon}</span>
            <div>
              <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700 }}>{current.stage}</h2>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{current.years}</p>
            </div>
          </div>
          <p style={{ color: '#E8EDF2', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{current.description}</p>

          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ color: '#E8EDF2', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>What Happens at This Stage</h3>
            {current.whatHappens.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.9rem', color: '#CBD5E1' }}>
                <span style={{ color: '#94A3B8', flexShrink: 0 }}>→</span>{w}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>What ProLnk Provides</div>
            {current.proLnkProvides.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.3rem 0', fontSize: '0.9rem', color: '#E8EDF2' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>{p}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#1A3A2A', border: '1px solid #22C55E', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Your Job at This Stage</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem', lineHeight: 1.5 }}>{current.yourJob}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>ProLnk is committed to DFW homeowners through every stage of the HVAC journey — not just the first call.</p>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Your Home Health Vault records follow you for life. Your contractor network is always one click away.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Start Your ProLnk HVAC Journey</button>
        </div>
      </div>
    </div>
  );
}

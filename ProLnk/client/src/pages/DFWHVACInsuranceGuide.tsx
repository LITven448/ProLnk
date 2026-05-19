import { useState } from 'react';

const damageTypes = [
  'Sudden Mechanical Failure',
  'Wear and Tear',
  'Lightning Surge',
  'Hail Damage',
  'Ice Storm Damage',
  'Flood or Water Damage',
];

const coverageData: Record<string, { covered: boolean; label: string; detail: string; steps: string[]; docs: string[] }> = {
  'Sudden Mechanical Failure': {
    covered: true,
    label: 'Covered by Some Policies',
    detail: 'Some DFW homeowner policies cover sudden, accidental mechanical failure of HVAC systems — for example, a compressor that fails without warning. However, standard HO-3 policies typically exclude mechanical breakdown. You need a mechanical breakdown endorsement or separate equipment breakdown policy ($25-50/yr add-on) for this coverage.',
    steps: [
      'Document the failure with photos and a technician diagnosis report',
      'Get a written statement from your HVAC tech confirming sudden failure (not wear and tear)',
      'Call your insurance agent before authorizing repairs — premature repair voids the claim',
      'File claim within 30 days of failure for DFW policies',
    ],
    docs: ['Tech diagnosis report', 'Photos of failed component', 'System age and maintenance records', 'Purchase receipt if available'],
  },
  'Wear and Tear': {
    covered: false,
    label: 'Not Covered — Standard Exclusion',
    detail: 'All standard DFW homeowner policies exclude wear and tear, deterioration, and mechanical breakdown from normal use. A compressor that fails after 15 years of DFW use is not covered. A cracked heat exchanger from age and use is not covered. This is the most common HVAC insurance dispute in DFW.',
    steps: [
      'Accept that standard policies do not cover gradual decline',
      'Review your policy for equipment breakdown or mechanical breakdown endorsement',
      'Consider home warranty plans ($400-700/yr) for wear and tear protection',
      'Maintain records of regular maintenance to support any future claims',
    ],
    docs: ['Policy declarations page', 'Your maintenance history (supports warranty claims)', 'Tech diagnosis showing age-related failure'],
  },
  'Lightning Surge': {
    covered: true,
    label: 'Covered With Proper Documentation',
    detail: 'Lightning surge damage to HVAC systems is covered under most DFW homeowner policies as a sudden and accidental loss. However, insurers require proof the surge was caused by lightning — not a power spike from the grid. DFW averages 50+ thunderstorm days annually, making surge damage common.',
    steps: [
      'Document the storm date and time — cross-reference with NOAA weather data for DFW',
      'Get a tech report confirming electrical surge damage to the control board or compressor',
      'File the claim promptly — DFW insurers typically require claims within 60 days',
      'Do not repair before the adjuster inspects unless system is a health/safety hazard',
    ],
    docs: ['NOAA storm report for your zip code', 'Tech diagnosis confirming surge damage', 'Photos of burned components', 'Utility company outage records'],
  },
  'Hail Damage': {
    covered: true,
    label: 'Covered — Common DFW Claim',
    detail: 'Hail damage to the outdoor condenser coil fins and refrigerant lines is typically covered under DFW homeowner policies as storm damage. DFW is in one of the most active hail corridors in the US — north Dallas, Collin, and Denton counties average 3-5 significant hail events per year.',
    steps: [
      'Photograph condenser damage immediately after the storm',
      'Get a written HVAC assessment — distinguish between cosmetic fin damage and functional damage',
      'File your claim within the policy window (typically 1 year for storm damage in Texas)',
      'Insurers often want to repair rather than replace — get your tech to document reduced efficiency',
    ],
    docs: ['Time-stamped storm photos', 'HVAC tech assessment report', 'NOAA hail size records for your DFW zip', 'Any neighbor claims for same storm (supports cause)'],
  },
  'Ice Storm Damage': {
    covered: true,
    label: 'Covered — Winter Storm Event',
    detail: 'DFW ice storm damage (like the February 2021 Winter Storm Uri event) is typically covered as a sudden, weather-related loss. Pipe freezes from HVAC-related causes, compressor damage from running in extreme cold without proper protection, and electrical damage from power surges are all potentially covered.',
    steps: [
      'Document all damage during and immediately after the storm',
      'For freeze-related damage, stop water damage spread first — document before repairs',
      'Get separate claims for water damage and HVAC damage if applicable',
      'Texas Department of Insurance can assist if your DFW insurer disputes a valid ice storm claim',
    ],
    docs: ['Time-stamped photos during and after storm', 'Tech diagnosis report', 'Texas DPS winter storm declarations (if applicable)', 'NOAA temperature records for your DFW area'],
  },
  'Flood or Water Damage': {
    covered: false,
    label: 'Not Covered — Flood Exclusion',
    detail: 'Standard DFW homeowner policies exclude flood damage. If a Trinity River flood or major DFW rainfall event causes water to enter your home and damage your HVAC air handler or furnace, standard homeowner insurance does not cover it. Only NFIP (National Flood Insurance Program) or private flood insurance covers flood-related HVAC damage.',
    steps: [
      'Review your policy for flood coverage — standard HO-3 does not include it',
      'Contact FEMA about NFIP coverage if you are in a DFW flood zone',
      'Document all flood damage for FEMA disaster assistance if a federal disaster is declared',
      'Do not turn on a flooded HVAC system — gas and electrical hazards are serious',
    ],
    docs: ['Photos of flood damage', 'FEMA flood zone determination for your DFW property', 'NFIP policy if applicable', 'Contractor estimate for replacement'],
  },
};

export default function DFWHVACInsuranceGuide() {
  const [activeType, setActiveType] = useState(damageTypes[0]);
  const data = coverageData[activeType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC Insurance Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>What your homeowner policy covers — and what it does not — for HVAC in DFW</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {damageTypes.map(type => (
            <button key={type} onClick={() => setActiveType(type)}
              style={{ padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: activeType === type ? '#F5E642′ : '#1e2d45', color: activeType === type ? '#0A1628' : '#94a3b8' }}>
              {type}
            </button>
          ))}
        </div>

        {data && (
          <div>
            <div style={{ background: data.covered ? '#14532d' : '#7f1d1d', borderRadius: 14, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 36 }}>{data.covered ? '✅' : '❌'}</div>
              <div>
                <div style={{ color: data.covered ? '#86efac' : '#fca5a5', fontWeight: 800, fontSize: 18 }}>{data.label}</div>
                <div style={{ color: data.covered ? '#4ade80′ : '#f87171', fontSize: 13, marginTop: 4 }}>{activeType}</div>
              </div>
            </div>

            <div style={{ background: '#1e2d45', borderRadius: 14, padding: '22px 24px', marginBottom: 16, border: '1px solid #2a3f5f' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: 16 }}>Coverage Details</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.7 }}>{data.detail}</p>
            </div>

            <div style={{ background: '#1e2d45', borderRadius: 14, padding: '22px 24px', marginBottom: 16, border: '1px solid #2a3f5f' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 14px', fontSize: 16 }}>📋 How to File</h3>
              {data.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#1e2d45', borderRadius: 14, padding: '22px 24px', border: '1px solid #2a3f5f' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 14px', fontSize: 16 }}>📁 Required Documentation</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {data.docs.map((doc, i) => (
                  <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', color: '#94a3b8', fontSize: 13, border: '1px solid #2a3f5f' }}>
                    📄 {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', background: '#1e2d45', borderRadius: 16, padding: '28px 24px' }}>
          <div style={{ fontSize: 32 }}>🔧</div>
          <h3 style={{ color: '#F5E642', margin: '10px 0 8px' }}>Need an HVAC Diagnosis for Your Claim?</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>ProLnk connects you with DFW HVAC professionals who provide insurance-ready diagnosis reports.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Find a DFW Tech
          </button>
        </div>
      </div>
    </div>
  );
}

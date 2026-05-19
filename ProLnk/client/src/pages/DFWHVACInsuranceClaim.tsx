import { useState } from 'react';

const damageTypes = [
  {
    type: 'Lightning / Power Surge',
    icon: '⚡',
    covered: 'Usually YES',
    coverageDetail: 'Sudden electrical surge is typically a covered peril under HO-3 policies. Includes compressor, control board, and capacitor damage caused by direct or induced lightning strike.',
    docs: ['Utility outage report or weather service record', 'HVAC technician diagnosis letter stating surge as cause', 'Photos of burned components', 'Model/serial numbers of damaged equipment', 'Repair or replacement estimate from licensed contractor'],
    adjuster: 'Request an independent adjuster if initial offer seems low. Surge claims are often undervalued. Get two contractor estimates before signing any settlement.',
  },
  {
    type: 'Hail Damage to Outdoor Unit',
    icon: '🌨️',
    covered: 'Usually YES',
    coverageDetail: 'Hail denting or cracking the condenser coil, refrigerant lines, or cabinet is a covered wind/hail peril. Document before cleanup or any repairs.',
    docs: ['Weather.gov hail report for your ZIP and date', 'Photos of dents, fin damage, and refrigerant line impact', 'Adjuster-acceptable repair estimate', 'Manufacturer’s documentation on hail damage thresholds'],
    adjuster: 'Insist on including refrigerant recharge cost in estimate. Adjusters often exclude it. Also include fin straightening or full coil replacement if warranted.',
  },
  {
    type: 'Flood / Water Damage',
    icon: '🌊',
    covered: 'Usually NO (standard HO)',
    coverageDetail: 'Standard homeowner policies exclude flood. FEMA NFIP or private flood policy required. Ground-level or below-grade units are highest risk. Air handler in attic — ask about wind-driven rain coverage.',
    docs: ['FEMA flood zone determination for your address', 'NFIP or private flood policy number', 'Photos of water line on unit', 'Technician assessment of internal water damage'],
    adjuster: 'If flood-caused, file with flood insurer separately from your HO claim. Do not mix claims — it can reduce payout on both.',
  },
  {
    type: 'Normal Wear / Mechanical Failure',
    icon: '🔧',
    covered: 'NO',
    coverageDetail: 'Compressor failure from age, refrigerant leak from corrosion, capacitor failure from heat cycling — these are maintenance and wear issues. No standard HO policy covers them. Home warranty may apply.',
    docs: ['Home warranty contract (if applicable)', 'Service history showing maintenance was performed', 'Technician statement of cause'],
    adjuster: 'File with home warranty provider, not insurer. Check if your warranty covers refrigerant, labor, and code upgrades separately.',
  },
  {
    type: 'Fire Damage',
    icon: '🔥',
    covered: 'YES',
    coverageDetail: 'HVAC fire damage — whether from wiring, external fire spread, or compressor overload fire — is a covered peril. Smoke damage to air handler and ductwork is also typically covered.',
    docs: ['Fire department report', 'Photos of all fire damage', 'Technician documentation of smoke/heat damage to components', 'Ductwork inspection report (smoke infiltration)'],
    adjuster: 'Include ductwork cleaning or replacement in claim. Smoke-contaminated ductwork is a covered item that is frequently missed in initial estimates.',
  },
];

export default function DFWHVACInsuranceClaim() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = damageTypes.find((d) => d.type === selected) ?? null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>HVAC Insurance Claim Guide</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          Select your HVAC damage type to see coverage assessment, required documentation, and adjuster strategy for DFW homeowners.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {damageTypes.map((d) => (
            <button
              key={d.type}
              onClick={() => setSelected(selected === d.type ? null : d.type)}
              style={{
                background: selected === d.type ? '#132040' : '#0F1E35',
                border: `1.5px solid ${selected === d.type ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 10,
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 26 }}>{d.icon}</span>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{d.type}</div>
                <div style={{ color: d.covered.startsWith('Usually YES') || d.covered === 'YES' ? '#4ADE80' : d.covered === 'NO' ? '#F87171' : '#FACC15', fontSize: 13, fontWeight: 600 }}>{d.covered}</div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>{active.type}</h2>
            <div style={{ fontWeight: 700, marginBottom: 12, color: active.covered.startsWith('Usually YES') || active.covered === 'YES' ? '#4ADE80' : active.covered === 'NO' ? '#F87171' : '#FACC15' }}>Coverage: {active.covered}</div>
            <p style={{ color: '#C8CDD8', lineHeight: 1.7, marginBottom: 18 }}>{active.coverageDetail}</p>
            <div style={{ marginBottom: 18 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📁 Documentation Required</div>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {active.docs.map((doc, i) => (
                  <li key={i} style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.7, marginBottom: 4 }}>{doc}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#0F1E35', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🤝 Adjuster Strategy</div>
              <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.6 }}>{active.adjuster}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
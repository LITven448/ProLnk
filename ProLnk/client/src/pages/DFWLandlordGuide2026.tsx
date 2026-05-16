import { useState } from 'react';

const propertyTypes = [
  { label: 'Single-Family Home', tasks: ['HVAC filter monthly', 'Gutter clean (spring/fall)', 'Pest control quarterly', 'Lawn care weekly', 'Water heater flush annually', 'Roof inspect annually'] },
  { label: 'Duplex', tasks: ['HVAC filters x2 monthly', 'Shared plumbing inspect', 'Exterior paint every 5yr', 'Pest control quarterly', 'Common area lighting monthly'] },
  { label: 'Condo/Townhome', tasks: ['HVAC filter monthly', 'Interior-only repairs', 'HOA coordinates exterior', 'Appliance inspect annually', 'Smoke detector test monthly'] },
  { label: 'Multi-Family (3–8 units)', tasks: ['HVAC filters all units monthly', 'Centralized pest control', 'Parking/lighting monthly', 'Fire extinguisher annual', 'Water heaters inspect semi-annually', 'Roof inspect annually'] },
];

export default function DFWLandlordGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Landlord Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Texas rental market facts, landlord obligations & ProLnk repair access</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['$1,850/mo', 'Avg DFW Rent'], ['6%', 'Vacancy Rate'], ['No Rent Control', 'TX State Law'], ['30 Days', 'Repair Deadline']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#0f1f3d', borderRadius: 10, padding: '18px 16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>⚖️ Texas Landlord Law Basics</h2>
          {[
            '✅ No statewide rent control — set market-rate rents freely',
            '✅ Must maintain habitability: working HVAC, plumbing, roof',
            '✅ Repair window: reasonable time (typically 7–30 days after notice)',
            '✅ Security deposit: max 2 months rent, return in 30 days',
            '✅ Notice to enter: 24 hours required unless emergency',
          ].map(t => <div key={t} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>{t}</div>)}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📅 Maintenance Calendar by Property Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {propertyTypes.map((pt, i) => (
              <button key={pt.label} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {pt.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{propertyTypes[selected].label} — Key Tasks</div>
            {propertyTypes[selected].tasks.map(t => (
              <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>🔧 {t}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Need a licensed contractor fast?</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk connects DFW landlords to vetted pros — plumbing, HVAC, electrical & more.</div>
        </div>
      </div>
    </div>
  );
}
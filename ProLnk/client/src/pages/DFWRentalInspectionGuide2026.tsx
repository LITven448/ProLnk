import { useState } from 'react';

const propertyTypes = {
  'Single Family Home': [
    { room: 'Foundation', checks: ['Document any existing cracks (DFW clay = common)', 'Measure crack width if visible', 'Check for uneven floors near perimeter', 'Photograph all corners'] },
    { room: 'Roof / Attic', checks: ['Photograph roof from ground', 'Check attic for daylight, moisture stains', 'Note any missing or curled shingles', 'Verify attic insulation present'] },
    { room: 'HVAC', checks: ['Record make, model, age of unit', 'Run heat and AC — verify output', 'Check vents in all rooms', 'Note filter condition at move-in'] },
    { room: 'Plumbing', checks: ['Run all faucets — check pressure and drainage', 'Flush all toilets', 'Check under sinks for stains or soft cabinet floors', 'Record water heater age'] },
    { room: 'Electrical', checks: ['Test every outlet with phone charger', 'Test all light switches', 'Note any flickering or non-working fixtures', 'Photograph breaker panel label'] },
    { room: 'Interior Rooms', checks: ['Photograph all walls — note scuffs, holes, stains', 'Test all windows open and lock', 'Check closet doors and hardware', 'Note carpet or flooring stains'] },
  ],
  'Apartment': [
    { room: 'Entry / Common', checks: ['Photograph front door condition and locks', 'Test buzzer/key fob if applicable', 'Document mailbox condition', 'Note hallway carpet condition near unit'] },
    { room: 'Kitchen', checks: ['Test all appliances', 'Run garbage disposal', 'Check cabinet interiors for pests or moisture', 'Photograph countertop scratches or burns'] },
    { room: 'Bathroom', checks: ['Check caulk and grout condition', 'Test exhaust fan', 'Run tub and shower — check pressure', 'Note any mold staining in corners'] },
    { room: 'Living / Bedrooms', checks: ['Test all outlets and switches', 'Check ceiling fan and light kit', 'Document blinds or window covering condition', 'Photograph all wall damage'] },
  ],
  'Townhome': [
    { room: 'Exterior', checks: ['Photograph all exterior surfaces', 'Check shared wall condition for moisture or mold', 'Document patio/balcony condition', 'Verify HOA-maintained areas'] },
    { room: 'Interior Systems', checks: ['HVAC — record age and model', 'Water heater location and age', 'Plumbing under all sinks', 'Test all outlets in all rooms'] },
    { room: 'Garage (if present)', checks: ['Test garage door opener and manual override', 'Check floor for oil stains', 'Verify keypad and exterior light', 'Document wall condition'] },
  ],
};

export default function DFWRentalInspectionGuide2026() {
  const [type, setType] = useState('');

  const rooms = propertyTypes[type as keyof typeof propertyTypes] || [];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Rental Move-In Inspection Guide 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>Document everything on day one — protect your deposit in DFW</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <span>📸</span>
            <span style={{ fontSize: 14, color: '#E8EAF0' }}>Texas law: landlords must return deposit within 30 days of move-out. Your move-in documentation is your evidence of pre-existing damage.</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>📁</span>
            <span style={{ fontSize: 14, color: '#E8EAF0' }}>Most DFW property management companies (Invitation Homes, Pathlight, Progress) use online portals — upload photos there AND email to yourself for backup.</span>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Property Type → Move-In Inspection Checklist</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select your property type...</option>
            {Object.keys(propertyTypes).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {rooms.map(section => (
          <div key={section.room} style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>📍 {section.room}</h2>
            {section.checks.map(c => (
              <div key={c} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span>🔲</span>
                <span style={{ fontSize: 14, color: '#E8EAF0' }}>{c}</span>
              </div>
            ))}
          </div>
        ))}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>Moving into a DFW rental? Get repair quotes before move-in so you know what's pre-existing.</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects DFW renters and landlords with vetted local home pros — free estimates.</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const cityInspData: Record<string, { schedulingNote: string; commonFailures: string; prepTip: string }> = {
  Dallas: { schedulingNote: 'Schedule via Dallas DSD portal; 24-48 hr notice required. Inspector arrives 8am-5pm window — no time guarantee', commonFailures: 'HVAC duct sealing gaps, missing bond wire on gas piping, plumbing pressure test failures (leaks at PEX fittings)', prepTip: 'Have permit card posted at job site. Tag all rough-in work with contractor name. Clear access to attic and crawlspace.' },
  Plano: { schedulingNote: 'Online scheduling via Plano permits portal; same-day available for some inspection types with early request', commonFailures: 'Electrical bond at panel not complete, condensate line slope insufficient, missing cleanout at sewer', prepTip: 'Inspector expects contractor on site for rough inspections. Have material specs sheet for insulation and windows if applicable.' },
  Frisco: { schedulingNote: 'Frisco ISD (Inspection Services Division) — schedule 24 hrs ahead; inspector calls en route', commonFailures: 'Duct leakage test failures on new construction, missing attic hatch fire stops, window egress sizing in bedrooms', prepTip: 'Frisco inspectors are thorough — review the Frisco residential inspection checklist PDF before scheduling.' },
  McKinney: { schedulingNote: '24-hr notice required; McKinney has dedicated commercial and residential inspector routes', commonFailures: 'Missing smoke detector in required locations, HVAC equipment clearance from combustibles, plumbing vent stack termination height', prepTip: 'Have load calculations available if inspector questions HVAC sizing. Keep material safety data sheets on site.' },
  Arlington: { schedulingNote: 'Arlington Development Services — online portal; 48-hr notice standard; phone scheduling available', commonFailures: 'Return air sizing inadequate (undersized for tonnage), roof sheathing nail pattern, exterior flashings at windows', prepTip: 'For final, ensure all fixtures operational and GFCI outlets tested. Smoke/CO detectors installed and operational.' },
  'Fort Worth': { schedulingNote: 'Fort Worth DSD portal; inspection calendar fills fast — schedule immediately after rough work passes pressure test', commonFailures: 'Gas piping pressure test leaks, missing arc-fault on required circuits, window flashing at rough frame', prepTip: 'Fort Worth inspectors look for permit card prominently displayed. Address posted at site for visibility from street.' },
};

const inspectionTypes = [
  { id: 'foundation', label: 'Foundation / Slab', notes: 'Inspector checks: rebar placement and spacing per plan, vapor barrier, post-tension cable layout (DFW standard), form height and grade. Common DFW failure: rebar too close to edge — 3-inch minimum cover required.' },
  { id: 'rough', label: 'Rough Framing + MEP Rough-In', notes: 'Inspector checks: framing per plan (header sizing, stud spacing, shear wall nailing), plumbing rough-in (pressure test, DWV slope), electrical rough-in (wire secured, box fill), HVAC rough (duct rough, equipment rough, refrigerant line set). All three trades must be ready simultaneously.' },
  { id: 'insulation', label: 'Insulation Inspection', notes: 'Inspector verifies R-value meets IECC Zone 3 requirements (R-13 walls, R-38 attic minimum). Batt insulation must fill cavity without voids. Vapor barrier placement verified. Fire stops in top plates and floor penetrations required before covering.' },
  { id: 'drywall', label: 'Drywall / Sheathing', notes: 'Inspector checks fire-rated assembly compliance (garage-house separation), nail spacing at shear walls, backing for heavy fixtures. In DFW, garage wall to living space must be 5/8" type X drywall. Inspect before taping in some cities.' },
  { id: 'final', label: 'Final Inspection', notes: 'Inspector verifies: all mechanical systems operational, smoke and CO detector placement per NFPA 72, GFCI/AFCI protection operational, plumbing fixtures operational, HVAC thermostat functional, exterior grading away from foundation.' },
];

export default function DFWBuildingInspectorGuide() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const inspection = inspectionTypes.find(i => i.id === selectedType);
  const city = selectedCity ? cityInspData[selectedCity] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔍 DFW Building Inspector Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>What DFW inspectors check at each phase, common DFW-specific failures, and how to prepare for each inspection type.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Inspection Type</label>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select inspection...</option>
              {inspectionTypes.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>DFW City</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select city...</option>
              {Object.keys(cityInspData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {inspection && (
          <div style={{ background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{inspection.label}</div>
            <div style={{ color: '#C5D0DC', lineHeight: 1.7 }}>{inspection.notes}</div>
          </div>
        )}

        {city && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {[
              { label: 'Scheduling in This City', value: city.schedulingNote },
              { label: 'Common DFW Failures', value: city.commonFailures },
              { label: 'How to Prepare', value: city.prepTip },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1E35', border: '1px solid #F5E642', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                <div style={{ color: '#C5D0DC', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {!inspection && !city && (
          <div style={{ background: '#0D1E35', borderRadius: 12, padding: 32, textAlign: 'center', color: '#8899AA' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 16 }}>Select an inspection type and DFW city to see what the inspector will check, common DFW failures, and how to prepare your job site.</div>
          </div>
        )}
      </div>
    </div>
  );
}

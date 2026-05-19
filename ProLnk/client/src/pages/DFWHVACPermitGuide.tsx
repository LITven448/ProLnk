import { useState } from 'react';

const projectTypes = [
  {
    label: 'Full system replacement (same capacity)',
    requiresPermit: true,
    requiresInspection: true,
    notes: 'Required in virtually all DFW cities. Inspection covers refrigerant line connections, electrical disconnect, drain line, and equipment labeling.',
    risk: 'Without permit: no inspection, no warranty protection, potential sale complications, insurance claim denial for equipment failure.',
  },
  {
    label: 'Refrigerant recharge only',
    requiresPermit: false,
    requiresInspection: false,
    notes: 'Maintenance work - no permit required. However, technician must be EPA 608 certified. Adding refrigerant to a system with a leak without fixing the leak is an EPA violation.',
    risk: 'No permit risk, but ensure technician is EPA certified. Recharging a leaking system repeatedly is illegal and wasteful.',
  },
  {
    label: 'R-22 to R-410A system conversion (new equipment)',
    requiresPermit: true,
    requiresInspection: true,
    notes: 'New equipment installation always requires permit. R-22 systems cannot be recharged with R-410A - this requires full equipment replacement which is a permitted job.',
    risk: 'Without permit: city can require removal and reinstallation at your expense. Inspector verifies correct refrigerant lines and electrical.',
  },
  {
    label: 'Adding a mini-split system',
    requiresPermit: true,
    requiresInspection: true,
    notes: 'New system addition requires permit. Electrical sub-panel work is also required and has its own permit. Some cities require separate HVAC and electrical permits.',
    risk: 'Mini-splits added without permit are increasingly flagged during real estate appraisals and inspections.',
  },
  {
    label: 'Duct repair or duct sealing only',
    requiresPermit: false,
    requiresInspection: false,
    notes: 'Maintenance and repair work generally does not require a permit in most DFW cities. Full duct replacement or major duct additions may require a permit - verify with your city.',
    risk: 'Low risk for sealing. Major duct additions - check with your city building department.',
  },
  {
    label: 'Thermostat replacement',
    requiresPermit: false,
    requiresInspection: false,
    notes: 'Simple thermostat replacement never requires a permit. Smart thermostat installation is also exempt.',
    risk: 'No permit risk.',
  },
];

const dfwCities = [
  { label: 'Dallas', portal: 'dallas.gov/permits', processingDays: '5-10 business days', fee: '$75-$150′ },
  { label: 'Fort Worth', portal: 'fortworthtexas.gov/permits', processingDays: '3-7 business days', fee: '$65-$125′ },
  { label: 'Plano', portal: 'plano.gov/permits', processingDays: '2-5 business days', fee: '$70-$140′ },
  { label: 'Frisco', portal: 'friscotexas.gov/permits', processingDays: '3-7 business days', fee: '$80-$160′ },
  { label: 'McKinney', portal: 'mckinneytexas.org/permits', processingDays: '4-8 business days', fee: '$70-$130′ },
  { label: 'Arlington', portal: 'arlingtontx.gov/permits', processingDays: '5-10 business days', fee: '$75-$145′ },
  { label: 'Irving', portal: 'cityofirving.org/permits', processingDays: '4-8 business days', fee: '$65-$125′ },
  { label: 'Other DFW city', portal: 'your city building department website', processingDays: '3-10 business days', fee: '$60-$160′ },
];

export default function DFWHVACPermitGuide() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [cityIdx, setCityIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const project = projectTypes[projectIdx];
  const city = dfwCities[cityIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>Permits DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>HVAC Permit Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Many DFW homeowners discover unpermitted HVAC work only when they try to sell their home. Knowing which jobs require permits protects your investment, ensures inspection, and prevents costly surprises at closing.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>What Happens Without a Permit</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['Real estate disclosure', 'Texas requires disclosure of unpermitted work. Buyers can demand remediation or price reduction.'],
              ['Insurance claims', 'Insurers can deny claims for equipment failure if work was unpermitted and uninspected.'],
              ['City enforcement', 'Cities can require permit retroactively and force inspection - including opening walls if needed.'],
              ['HOA issues', 'Many DFW HOAs require proof of permit for exterior HVAC equipment changes.'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#E8EAF0', marginBottom: 4, fontSize: 14 }}>{k}</div>
                <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Check My Project</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>HVAC project type:</label>
            <select value={projectIdx} onChange={e => { setProjectIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {projectTypes.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>DFW city:</label>
            <select value={cityIdx} onChange={e => { setCityIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {dfwCities.map((c, i) => <option key={i} value={i}>{c.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Check Permit Requirement
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${project.requiresPermit ? '#EF4444' : '#22C55E'}` }}>
              <div style={{ fontWeight: 700, color: project.requiresPermit ? '#EF4444′ : '#22C55E', marginBottom: 12, fontSize: 18 }}>
                {project.requiresPermit ? 'Permit Required' : 'No Permit Required'}
                {project.requiresInspection ? ' + Inspection Required' : ''}
              </div>
              <div style={{ color: '#CBD2E0', lineHeight: 1.7, marginBottom: 12 }}>{project.notes}</div>
              {project.requiresPermit && (
                <div style={{ background: '#162035', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>For {city.label}:</div>
                  <div style={{ color: '#CBD2E0', fontSize: 14, marginBottom: 4 }}>Portal: {city.portal}</div>
                  <div style={{ color: '#CBD2E0', fontSize: 14, marginBottom: 4 }}>Processing: {city.processingDays}</div>
                  <div style={{ color: '#CBD2E0', fontSize: 14 }}>Typical fee: {city.fee}</div>
                </div>
              )}
              <div style={{ background: '#1A0A0A', borderRadius: 8, padding: 14, borderLeft: '3px solid #EF4444′ }}>
                <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>Risk if ignored:</div>
                <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>{project.risk}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

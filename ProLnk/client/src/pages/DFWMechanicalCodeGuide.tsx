import { useState } from 'react';

const cityMechData: Record<string, { permitReq: string; inspectorFocus: string; manualJ: string }> = {
  Dallas: { permitReq: 'Permit required for all HVAC replacement and new installation; like-for-like swap still requires permit', inspectorFocus: 'Duct sealing (Aeroseal or mastic), refrigerant line insulation, disconnect within sight of unit', manualJ: 'Manual J required for new construction; replacement does not mandate but oversizing triggers reinspection' },
  Plano: { permitReq: 'Permit required for system replacement; coil-only swap may be exempt if no refrigerant line change', inspectorFocus: 'Filter-drier install, suction line insulation, thermostat wiring gauge, condensate drain slope', manualJ: 'Manual J required for new builds and additions; encouraged for replacement — inspector may ask for documentation' },
  Frisco: { permitReq: 'Permit required for all replacements; Frisco enforces strictly — contractors report permit pull rates above 95%', inspectorFocus: 'Duct leakage test on new systems, SEER2 label verification, breaker sizing match to equipment nameplate', manualJ: 'Manual J required for new construction and any load-bearing change (additions, window changes)' },
  McKinney: { permitReq: 'Permit required; homeowner can pull own permit but licensed HVAC contractor must do the work', inspectorFocus: 'Platform drain pan, float switch on primary drain, refrigerant recovery documentation', manualJ: 'Manual J required for new construction; inspectors may request for oversized replacements' },
  Arlington: { permitReq: 'Permit required for replacement; same-capacity swap requires permit but expedited review available', inspectorFocus: 'Secondary drain pan and float switch, duct support spacing (every 4 ft), return air sizing', manualJ: 'Manual J required for new homes; optional for replacement but best practice in Arlington market' },
  'Fort Worth': { permitReq: 'Permit required; Fort Worth DSD has online permit portal for HVAC contractors', inspectorFocus: 'Duct sealing per IMC, equipment clearances, refrigerant line set insulation R-3 minimum', manualJ: 'Manual J required for new construction; replacement encouraged to size correctly for older DFW housing stock' },
};

const projectTypes = [
  { id: 'replace', label: 'HVAC System Replacement', notes: 'Minimum SEER2 of 14.3 (equivalent to old SEER 15) for split systems in Climate Zone 3 (DFW). Permit required in all DFW cities. Inspector verifies equipment nameplate, refrigerant type (R-410A phaseout underway — R-454B replacing), and duct condition.' },
  { id: 'newinstall', label: 'New HVAC Installation', notes: 'Manual J load calculation required by most DFW cities for new construction. Equipment must meet Zone 3 SEER2 minimums. Duct design must follow ACCA Manual D. Final inspection required before drywall in new construction.' },
  { id: 'ductwork', label: 'Ductwork Replacement/Repair', notes: 'Duct replacement requires permit in most DFW cities. New ducts must be sealed with mastic or UL-181 tape — duct tape not code-compliant. Leakage test may be required at inspection. Flex duct max 5 ft run recommended; rigid preferred for trunk lines.' },
  { id: 'coil', label: 'Evaporator/Condenser Coil Swap', notes: 'Coil replacement typically requires permit if refrigerant lines are opened. Matched system required — mixing coil and air handler from different manufacturers triggers efficiency re-rating. Inspector may require AHRI certificate showing matched efficiency.' },
  { id: 'zoning', label: 'Zoning System Add', notes: 'Adding zone dampers to existing system requires permit in most DFW cities. Bypass damper sizing is critical — undersized bypass causes static pressure issues and equipment failure. Manual J per zone required for proper damper sizing.' },
];

export default function DFWMechanicalCodeGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const project = projectTypes.find(p => p.id === selectedProject);
  const city = selectedCity ? cityMechData[selectedCity] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>❄️ DFW Mechanical (HVAC) Code Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>SEER2 minimums for Zone 3, Manual J requirements, equipment sizing, permit process, and what DFW inspectors check at HVAC inspection.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Project Type</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select project...</option>
              {projectTypes.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>DFW City</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select city...</option>
              {Object.keys(cityMechData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {project && (
          <div style={{ background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{project.label}</div>
            <div style={{ color: '#C5D0DC', lineHeight: 1.7 }}>{project.notes}</div>
          </div>
        )}

        {city && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {[
              { label: 'Permit Requirements', value: city.permitReq },
              { label: 'Inspector Focus Areas', value: city.inspectorFocus },
              { label: 'Manual J Requirement', value: city.manualJ },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1E35', border: '1px solid #F5E642', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                <div style={{ color: '#C5D0DC', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {!project && !city && (
          <div style={{ background: '#0D1E35', borderRadius: 12, padding: 32, textAlign: 'center', color: '#8899AA' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌡️</div>
            <div style={{ fontSize: 16 }}>Select a project type and DFW city to see HVAC code requirements, SEER2 minimums, permit process, and what the inspector checks.</div>
          </div>
        )}
      </div>
    </div>
  );
}

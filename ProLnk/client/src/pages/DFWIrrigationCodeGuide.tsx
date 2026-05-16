import { useState } from 'react';

const cityIrrigationData: Record<string, { backflowType: string; permitNeeded: string; winterization: string }> = {
  Dallas: { backflowType: 'RP assembly required on all residential irrigation tie-ins; annual test by licensed tester', permitNeeded: 'Permit required for new irrigation system installation and backflow device install', winterization: 'No code mandate but TWDB recommends October blowout; freeze damage is homeowner liability' },
  Plano: { backflowType: 'RP or double-check depending on system pressure zone; city inspector verifies at install', permitNeeded: 'Permit for new system; backflow replacement requires permit and test report', winterization: 'City issues voluntary winterization notice in November; no code requirement' },
  Frisco: { backflowType: 'RP assembly required with annual certification by TCEQ-licensed tester', permitNeeded: 'Permit required for new install, backflow upgrade, and any zone addition over 2 heads', winterization: 'Sprinkler winterization advisory issued; RP assembly must be drained and insulated' },
  McKinney: { backflowType: 'Double-check valve minimum; RP required for booster pump systems', permitNeeded: 'Permit for new system installation; backflow must be inspected at install', winterization: 'No ordinance; TWDB recommends blowout by Oct 31 for North Texas climate zone' },
  'Allen': { backflowType: 'RP assembly required; test required within 30 days of install and annually', permitNeeded: 'Permit for new irrigation, backflow install, and significant zone modifications', winterization: 'Advisory program; freeze protection strongly encouraged for RP assemblies' },
  Garland: { backflowType: 'RP required for all potable-connected irrigation; annual certification required', permitNeeded: 'Permit for new system and backflow replacement', winterization: 'No city code; contractor typically offers seasonal service for continuity' },
};

const projectTypes = [
  { id: 'newsystem', label: 'New Irrigation System', notes: 'All new DFW irrigation systems connecting to potable water require a backflow preventer (RP assembly in most cities). System must include a dedicated shutoff valve and meet zone head spacing codes. Most cities require permit and final inspection.' },
  { id: 'backflow', label: 'Backflow Preventer Install/Replace', notes: 'RP (reduced pressure zone) assembly is required in most DFW cities for irrigation. Must be installed above grade, accessible for testing. Annual test by TCEQ-licensed tester required. Test report submitted to city water department.' },
  { id: 'dripconvert', label: 'Drip vs Spray Conversion', notes: 'Drip emitters preferred near impervious surfaces (driveways, patios) — most DFW cities allow spray within 24" of impervious, drip required within 12". Conversion does not always require permit but may trigger inspection if tied to zone changes.' },
  { id: 'winterize', label: 'Winterization', notes: 'No DFW city codes mandate winterization but TWDB Zone 3 freeze advisories apply. RP assemblies must be drained or insulated — frozen RP assemblies can crack and fail test, triggering replacement permit.' },
  { id: 'expansion', label: 'Zone Addition', notes: 'Adding zones to existing system may require permit depending on city and number of heads. New zones must meet minimum dynamic pressure at head (typically 25 PSI for spray, 15 PSI for drip). Smart controller integration encouraged but not required.' },
];

export default function DFWIrrigationCodeGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const project = projectTypes.find(p => p.id === selectedProject);
  const city = selectedCity ? cityIrrigationData[selectedCity] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💧 DFW Irrigation Code Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>Backflow preventer requirements, drip vs. spray rules near impervious surfaces, winterization code, and permit thresholds by DFW city.</p>

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
              {Object.keys(cityIrrigationData).map(c => <option key={c} value={c}>{c}</option>)}
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
              { label: 'Backflow Preventer Type Required', value: city.backflowType },
              { label: 'Permit Required', value: city.permitNeeded },
              { label: 'Winterization Code', value: city.winterization },
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
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
            <div style={{ fontSize: 16 }}>Select a project type and DFW city to see irrigation code requirements, backflow preventer type, permit thresholds, and winterization rules.</div>
          </div>
        )}
      </div>
    </div>
  );
}

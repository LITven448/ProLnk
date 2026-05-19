import { useState } from 'react';

const cityData: Record<string, { backflow: string; permit: string; inspector: string }> = {
  Dallas: { backflow: 'RP backflow preventer required on all potable connections', permit: 'Permit required for any new fixture, re-pipe, or water heater', inspector: 'Checks pressure test (static 125 PSI for 15 min), joint inspection, bonding' },
  Plano: { backflow: 'Double-check valve or RP depending on hazard level', permit: 'Permit required for re-pipe, water heater, sewer line work', inspector: 'Verifies PEX crimp rings, expansion joints, cleanout placement' },
  Frisco: { backflow: 'RP assembly required for irrigation tie-ins', permit: 'Permit required for any work beyond faucet/fixture swap', inspector: 'Pressure test, PEX support spacing, TCEQ water heater compliance' },
  McKinney: { backflow: 'RP backflow required; annual test by licensed tester', permit: 'Permit for water heater, sewer, gas line, re-pipe', inspector: 'Joint inspection, cleanout access, venting compliance' },
  Arlington: { backflow: 'Double-check valve minimum; RP for higher-hazard uses', permit: 'Permit required for water heater replacement and any re-pipe', inspector: 'Static pressure test, support spacing, bonding wire continuity' },
  'Fort Worth': { backflow: 'RP assembly required citywide for irrigation and commercial', permit: 'Permit required for most plumbing beyond fixture repairs', inspector: 'Gas pressure test if applicable, PEX fittings, drain slope' },
};

const projectTypes = [
  { id: 'repipe', label: 'Re-pipe (PEX/Copper)', notes: 'PEX-A and PEX-B both allowed in DFW under updated IPC adoption. Copper still code-compliant. PEX support every 32″ horizontal, every 48″ vertical.' },
  { id: 'waterheater', label: 'Water Heater Replacement', notes: 'TCEQ requires licensed plumber for gas water heater. TPR valve required, drain pan for elevated installs. Must match BTU/efficiency of replaced unit or meet current minimums.' },
  { id: 'sewer', label: 'Sewer Line Work', notes: 'Any sewer line replacement or repair over 5 feet requires permit. Two cleanouts required: one near structure, one near property line. Camera inspection often required post-repair.' },
  { id: 'backflow', label: 'Backflow Preventer Install', notes: 'Required on all irrigation tie-ins and commercial connections. Annual testing by a licensed backflow tester required in most DFW cities. RP assembly preferred over double-check for higher-hazard.' },
  { id: 'fixture', label: 'Fixture Addition', notes: 'Adding a new fixture (toilet, sink, shower) requires a permit in most DFW cities. Must verify existing drain has adequate slope (1/4″ per foot) and venting meets IPC.' },
];

export default function DFWPlumbingCodeGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const project = projectTypes.find(p => p.id === selectedProject);
  const city = selectedCity ? cityData[selectedCity] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔧 DFW Plumbing Code Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>What DFW plumbing codes require — updated for current IPC adoption, TCEQ rules, and city-specific permit thresholds.</p>

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
              {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
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
              { label: 'Backflow Requirements', value: city.backflow },
              { label: 'Permit Threshold', value: city.permit },
              { label: 'What Inspector Checks', value: city.inspector },
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
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
            <div style={{ fontSize: 16 }}>Select a project type and city to see applicable DFW plumbing codes, permit requirements, and inspection checklist.</div>
          </div>
        )}
      </div>
    </div>
  );
}

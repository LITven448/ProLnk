import { useState } from 'react';

const vintageData: Record<string, { afci: string; gfci: string; grandfathered: string }> = {
  'Pre-1970': { afci: 'Not required unless adding new circuits in bedrooms', gfci: 'Required only on new work near water — bathrooms, kitchen, exterior', grandfathered: 'Ungrounded outlets, fused panels, knob-and-tube wiring allowed unless work triggers upgrade' },
  '1970-1990': { afci: 'Required when adding circuits in bedrooms or living areas', gfci: 'Required on new and replaced outlets near water sources', grandfathered: '2-prong outlets, AL wiring (if rated), 200A panels — allowed unless disturbed' },
  '1990-2005': { afci: 'Required for bedroom circuits on any panel work', gfci: 'Required near water and for all exterior outlets', grandfathered: 'Existing unprotected circuits tolerated; any new run requires updated protection' },
  '2006-2020': { afci: 'Required for most living areas — bedroom, family room, dining', gfci: 'Required: bathrooms, kitchen, exterior, garage, crawlspace, unfinished basement', grandfathered: 'Very limited — most work triggers full compliance on affected circuits' },
  '2021+': { afci: 'All 15A and 20A branch circuits in dwelling units (2020 NEC)', gfci: 'Expanded to include laundry, dishwasher, kitchen circuits, and more', grandfathered: 'Minimal — built to current NEC, any alteration must maintain compliance' },
};

const projectTypes = [
  { id: 'panel', label: 'Panel Upgrade', notes: 'Any DFW panel upgrade requires a permit and inspection. Inspector will verify breaker sizing, bonding, grounding electrode, and neutral/ground separation. AFCI/GFCI protection required for circuits per NEC adoption.' },
  { id: 'circuit', label: 'New Circuit Add', notes: 'New circuits trigger full code compliance on that run. AFCI required for bedroom/living circuits (2014+ NEC). Inspector checks wire gauge, breaker size, outlet placement spacing (12-ft rule).' },
  { id: 'remodel', label: 'Remodel (Electrical)', notes: 'If more than 50% of a rooms wiring is disturbed, full upgrade typically required. Triggers GFCI and AFCI compliance for affected areas. DFW cities vary on interpretation — confirm with AHJ.' },
  { id: 'ev', label: 'EV Charger Install', notes: 'Level 2 charger (240V) requires dedicated 50A circuit and permit in all DFW cities. Inspector checks wire sizing (6 AWG minimum), breaker, and weatherproof outlet if exterior. GFCI protection required per 2020 NEC.' },
  { id: 'exterior', label: 'Exterior Outlets/Lighting', notes: 'All exterior outlets must be GFCI-protected and weatherproof rated. Exterior circuits require AFCI on 2020 NEC adopted cities. Buried conductors need conduit or UF-rated cable at proper depth.' },
];

export default function DFWElectricalCodeGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedVintage, setSelectedVintage] = useState('');

  const project = projectTypes.find(p => p.id === selectedProject);
  const vintage = selectedVintage ? vintageData[selectedVintage] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚡ DFW Electrical Code Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>NEC updates adopted in DFW — AFCI and GFCI requirements, arc-fault expansion, and what triggers compliance on remodels.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Project Type</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select project...</option>
              {projectTypes.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Home Vintage</label>
            <select value={selectedVintage} onChange={e => setSelectedVintage(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select vintage...</option>
              {Object.keys(vintageData).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {project && (
          <div style={{ background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{project.label}</div>
            <div style={{ color: '#C5D0DC', lineHeight: 1.7 }}>{project.notes}</div>
          </div>
        )}

        {vintage && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {[
              { label: 'AFCI Requirements', value: vintage.afci },
              { label: 'GFCI Requirements', value: vintage.gfci },
              { label: 'What Is Grandfathered', value: vintage.grandfathered },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1E35', border: '1px solid #F5E642', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                <div style={{ color: '#C5D0DC', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {!project && !vintage && (
          <div style={{ background: '#0D1E35', borderRadius: 12, padding: 32, textAlign: 'center', color: '#8899AA' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
            <div style={{ fontSize: 16 }}>Select a project type and home vintage to see DFW electrical code requirements, AFCI/GFCI rules, and what is grandfathered vs. required.</div>
          </div>
        )}
      </div>
    </div>
  );
}

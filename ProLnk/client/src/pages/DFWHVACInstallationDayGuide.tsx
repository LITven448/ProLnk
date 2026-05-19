import { useState } from 'react';

const phases = [
  {
    id: 'morning', label: 'Morning Arrival (7–9am)', icon: '🌅',
    should: ['Review Manual J load calc with homeowner', 'Confirm equipment matches invoice specs', 'Walk through access path and protect floors/walls', 'Discuss lineset decision: reuse or replace (replace is almost always right)'],
    verify: ['Permit posted at job site', 'Correct tonnage unit on truck', 'Team has gauge manifold and refrigerant certification'],
    redFlags: ['No permit', 'Skip the load calc conversation', 'Pressure you to reuse old lineset without inspection'],
  },
  {
    id: 'removal', label: 'Old System Removal (9–11am)', icon: '🔨',
    should: ['Recover existing refrigerant (EPA 608 required — not vented)', 'Document existing refrigerant type and charge', 'Inspect ductwork at air handler connection', 'Check and document drain pan condition'],
    verify: ['Refrigerant recovery equipment on site', 'Old unit staged for proper disposal', 'Ductwork connection points inspected — photos taken'],
    redFlags: ['Refrigerant vented to atmosphere (illegal)', 'Old unit left on your property', 'No ductwork inspection'],
  },
  {
    id: 'install', label: 'Equipment Installation (11am–2pm)', icon: '⚙️',
    should: ['Level and secure outdoor condenser on pad', 'Install new lineset or inspect and clean existing', 'Connect electrical with correct breaker sizing', 'Install new drain line with secondary pan and float switch'],
    verify: ['Condenser is level (use a level — ask to see)', 'Lineset insulated and UV-protected where exposed', 'Float switch installed on secondary drain pan'],
    redFlags: ['Condenser tilted or on unstable surface', 'Uninsulated lineset runs', 'No secondary drain protection'],
  },
  {
    id: 'startup', label: 'System Startup & Testing (2–4pm)', icon: '🔬',
    should: ['Pressure test system before adding refrigerant', 'Pull vacuum to remove moisture', 'Charge refrigerant to manufacturer specs (not "feels right")', 'Measure and record supply/return air temps'],
    verify: ['Pressure test held 15+ min with no drop', 'Vacuum pulled to 500 microns or lower', 'Refrigerant charge documented on paper, not verbal', 'Delta-T between supply and return air measured'],
    redFlags: ['Skipped pressure test', 'No vacuum or short vacuum', 'Charge by "feel" without gauges', 'No temp measurement'],
  },
  {
    id: 'closeout', label: 'Closeout & Walkthrough (4–5pm)', icon: '✅',
    should: ['Walk homeowner through thermostat operation', 'Show drain line access point and pan', 'Provide startup documentation and warranty paperwork', 'Schedule permit inspection (within 10 business days)'],
    verify: ['Startup sheet signed and in your hands', 'Permit inspection date on calendar', 'Warranty registration initiated or completed'],
    redFlags: ['No documentation left behind', 'No mention of permit inspection', 'Rushed exit with no walkthrough'],
  },
];

export default function DFWHVACInstallationDayGuide() {
  const [activePhase, setActivePhase] = useState('morning');

  const phase = phases.find(p => p.id === activePhase)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔧 DFW HVAC Installation Day Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 28 }}>What to expect — and what to verify — at every phase of your DFW HVAC installation day.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {phases.map(p => (
            <button key={p.id} onClick={() => setActivePhase(p.id)}
              style={{ background: activePhase === p.id ? '#F5E642′ : '#132035', color: activePhase === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: '#F5E642′ }}>{phase.icon} {phase.label}</h2>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, color: '#4ADE80', marginBottom: 10 }}>✅ What Good Installers Do</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {phase.should.map((s, i) => <li key={i} style={{ color: '#C8D8E8', lineHeight: 2, fontSize: 14 }}>{s}</li>)}
            </ul>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, color: '#60A5FA', marginBottom: 10 }}>🔍 What to Verify Yourself</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {phase.verify.map((v, i) => <li key={i} style={{ color: '#C8D8E8', lineHeight: 2, fontSize: 14 }}>{v}</li>)}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 15, color: '#F87171', marginBottom: 10 }}>🚩 Red Flags — Stop & Ask</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {phase.redFlags.map((r, i) => <li key={i} style={{ color: '#C8D8E8', lineHeight: 2, fontSize: 14 }}>{r}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginTop: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📸 Document Everything</h3>
          <p style={{ color: '#C8D8E8', lineHeight: 1.7, margin: 0 }}>Take photos at each phase: equipment nameplate, lineset connections, electrical panel breaker, drain line, and the startup sheet. These protect your warranty and help resolve disputes. Email photos to yourself with the date in the subject line.</p>
        </div>
      </div>
    </div>
  );
}

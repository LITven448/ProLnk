import { useState } from 'react';

const stages = [
  {
    id: 'day1', label: 'Day 1 — Right After Install', icon: '📅',
    checks: [
      { task: 'Register warranty online', why: 'Most manufacturers require registration within 60 days — clock starts now.' },
      { task: 'Review startup sheet', why: 'Contractor should have left a sheet with refrigerant charge, delta-T, and system pressures. Request it if missing.' },
      { task: 'Test all zones & thermostats', why: 'Confirm heating AND cooling modes work before contractor leaves your area.' },
      { task: 'Photo the equipment', why: 'Nameplate, lineset, drain line, electrical disconnect. Timestamp these.' },
    ],
    doc: 'Startup documentation, warranty registration confirmation, equipment photos.'
  },
  {
    id: 'week1', label: 'Week 1 — Observe Operation', icon: '👁️',
    checks: [
      { task: 'Listen for abnormal sounds', why: 'Banging = loose part. Hissing = refrigerant leak. High-pitched squeal = bearing issue. All warrant a callback.' },
      { task: 'Check drain line', why: 'Confirm condensate is draining — look for drip outside or in designated pan. Blockage causes water damage fast.' },
      { task: 'Verify thermostat reads accurately', why: 'Some thermostats need 24–48hrs to calibrate. If temp feels off, check against a thermometer.' },
      { task: 'Confirm permit inspection is scheduled', why: 'DFW municipalities require inspection within 10 business days of permit issue.' },
    ],
    doc: 'Note any unusual sounds with date/time. Save inspector contact info.'
  },
  {
    id: 'week2', label: 'Weeks 2–4 — Performance Baseline', icon: '📊',
    checks: [
      { task: 'Log utility usage', why: 'Download your Oncor usage data to establish a baseline. Compare same period next year to validate efficiency claims.' },
      { task: 'Permit inspection completed', why: 'Inspector confirms installation is code-compliant. Get the signed inspection card — it proves legal install.' },
      { task: 'Inspect insulation on lineset', why: 'UV exposure causes insulation to crack quickly. Re-wrap if showing wear after first month.' },
      { task: 'Check air filter status', why: 'New installs sometimes leave construction debris. Check filter at day 14 even if MERV rating says monthly.' },
    ],
    doc: 'Signed inspection card, Oncor baseline usage report, filter inspection date.'
  },
  {
    id: 'day30', label: 'Day 30 — First Review', icon: '🏁',
    checks: [
      { task: 'Schedule follow-up with contractor', why: 'Quality contractors offer a 30-day checkup. If not offered, request one — it is reasonable to ask.' },
      { task: 'Verify all warranty registrations', why: 'Confirm equipment, labor, and extended warranty paperwork is in order and filed.' },
      { task: 'Review billing for Oncor rebate status', why: 'Oncor rebates typically post 4–8 weeks after approval. Confirm contractor submitted application.' },
      { task: 'Document any callbacks or issues', why: 'Any problems within 30 days should be covered under workmanship warranty. Note dates and descriptions.' },
    ],
    doc: 'All warranty documents in one folder. Oncor rebate confirmation. Contractor callback log if applicable.'
  },
];

export default function DFWHVACPostInstallationGuide() {
  const [activeStage, setActiveStage] = useState('day1');

  const stage = stages.find(s => s.id === activeStage)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📋 DFW HVAC Post-Installation Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 28 }}>What to check, verify, and document in the first 30 days after your DFW HVAC installation.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setActiveStage(s.id)}
              style={{ background: activeStage === s.id ? '#F5E642′ : '#132035', color: activeStage === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 20 }}>{stage.icon} {stage.label}</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            {stage.checks.map((c, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#4ADE80', fontWeight: 800, marginTop: 2 }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.task}</div>
                    <div style={{ color: '#8FA3BF', fontSize: 13, lineHeight: 1.6 }}>{c.why}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 14 }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📁 Document This Stage: </span>
            <span style={{ color: '#C8D8E8', fontSize: 13 }}>{stage.doc}</span>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginTop: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🚨 When to Call Immediately</h3>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>Water pooling near indoor unit (drain failure)</li>
            <li>Ice forming on outdoor unit or lineset</li>
            <li>System not reaching setpoint within 2 hours on a mild day</li>
            <li>Any burning smell from vents or unit</li>
            <li>Electric bill spike {'>'}30% beyond expected for season</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

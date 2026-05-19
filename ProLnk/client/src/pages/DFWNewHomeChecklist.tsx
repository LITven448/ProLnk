import { useState } from 'react';

const PHASES = [
  {
    label: 'Month 1',
    emoji: '🔑',
    color: '#F5E642',
    items: [
      'Change all exterior door locks and garage codes',
      'Locate and photograph main water shut-off valve',
      'Locate gas shut-off valve and electric main panel',
      'Set up utilities auto-pay (Oncor, Atmos Gas, water)',
      'Register with local municipality for trash/recycling pickup',
      'Install or test all smoke detectors and CO detectors',
      'Forward mail and update address with USPS, IRS, bank',
      'Join Nextdoor neighborhood app for local alerts',
      'Introduce yourself to immediate neighbors',
      'Test all doors, windows, and deadbolts for proper operation',
    ],
  },
  {
    label: 'Month 3',
    emoji: '🛠️',
    color: '#60a5fa',
    items: [
      'Replace HVAC air filter and set a 90-day reminder',
      'Schedule first HVAC tune-up (pre-summer critical in DFW)',
      'Find a trusted local plumber, electrician, and HVAC tech',
      'Set up homeowners insurance and confirm coverage limits',
      'Register major appliances with manufacturer for warranty',
      'Purchase or confirm emergency kit (72-hour supplies)',
      'Set up or transfer HOA account and read CC&Rs',
      'Identify foundation watering system or install soaker hose',
      'Research DFW-specific pest control for termites and roaches',
    ],
  },
  {
    label: 'Month 6',
    emoji: '📋',
    color: '#a78bfa',
    items: [
      'Replace water heater anode rod if unit is over 5 years old',
      'Flush water heater tank to remove sediment',
      'Clean dryer vent duct from exterior — fire risk in DFW heat',
      'Inspect caulking around tubs, showers, and kitchen sink',
      'Check attic insulation and ensure vents aren\’t blocked',
      'Deep clean range hood filter and test exhaust fan',
      'Apply weatherstripping to exterior doors if drafts noticed',
      'Test sprinkler zones and adjust heads for season',
      'Document any foundation movement since move-in',
    ],
  },
  {
    label: 'Month 12',
    emoji: '🎉',
    color: '#34d399',
    items: [
      'Schedule annual home inspection if warranty is expiring',
      'File homestead exemption by April 30 deadline for tax savings',
      'Review and appeal property tax appraisal if overvalued',
      'Test all GFCI outlets (kitchen, bath, garage, exterior)',
      'Flush and test all exterior hose bibs before first freeze',
      'Hire chimney sweep if fireplace was used this year',
      'Review HOA dues for upcoming year and calendar meetings',
      'Document any repairs completed for future resale disclosure',
      'Confirm you have a recommended contractor for each trade',
    ],
  },
];

export default function DFWNewHomeChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = PHASES.reduce((s, p) => s + p.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW New Homeowner First-Year Checklist
          </h1>
          <p style={{ color: '#8899aa', fontSize: 14, margin: 0 }}>
            Everything you need to do in your first year in DFW
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Year 1 Progress: {pct}%</span>
            <span style={{ color: '#8899aa', fontSize: 13 }}>{checkedCount} / {totalItems} tasks</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 99, height: 10 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 10, width: `${pct}%`, transition: 'width 0.3s' }} />
          </div>
          {pct === 100 && (
            <p style={{ color: '#34d399', fontWeight: 700, textAlign: 'center', margin: '12px 0 0′ }}>
              Year 1 complete! You are a pro DFW homeowner.
            </p>
          )}
        </div>

        {PHASES.map((phase) => {
          const phaseChecked = phase.items.filter((item) => checked[`${phase.label}::${item}`]).length;
          const phasePct = Math.round((phaseChecked / phase.items.length) * 100);
          return (
            <div key={phase.label} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: phase.color }}>
                  {phase.emoji} {phase.label}
                </h2>
                <span style={{ fontSize: 12, color: '#8899aa' }}>{phaseChecked}/{phase.items.length}</span>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 99, height: 5, marginBottom: 14 }}>
                <div style={{ background: phase.color, borderRadius: 99, height: 5, width: `${phasePct}%`, transition: 'width 0.3s' }} />
              </div>
              {phase.items.map((item) => {
                const key = `${phase.label}::${item}`;
                return (
                  <div
                    key={item}
                    onClick={() => toggle(key)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #1a3050', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked[key] ? phase.color : '#334466'}`,
                      background: checked[key] ? phase.color : 'transparent', flexShrink: 0, marginTop: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 900,
                    }}>
                      {checked[key] ? '✓' : ''}
                    </div>
                    <span style={{ fontSize: 14, color: checked[key] ? '#556677′ : '#cdd9e5', textDecoration: checked[key] ? ’line-through' : 'none', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

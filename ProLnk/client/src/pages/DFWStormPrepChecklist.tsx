import { useState } from 'react';

const PHASES = [
  {
    label: 'Day Before Storm',
    emoji: '📡',
    color: '#fbbf24',
    desc: 'Storm watch issued — 12-24 hours out',
    tasks: [
      'Charge all phones, power banks, and battery lanterns to 100%',
      'Fill bathtubs with water in case municipal supply is disrupted',
      'Move patio furniture, grills, and décor indoors or tie down securely',
      'Fuel up all vehicles — gas stations empty fast in DFW pre-storm',
      'Fill generator with fresh fuel and test it runs',
      'Stock 72-hour food and water supply (1 gallon/person/day)',
      'Locate and test flashlights — replace batteries',
      'Bring in potted plants and lightweight outdoor items',
    ],
  },
  {
    label: 'Approaching Storm',
    emoji: '⛈️',
    color: '#f97316',
    desc: 'Severe thunderstorm or tornado warning in effect',
    tasks: [
      'Move to interior room on lowest floor (tornado: avoid windows)',
      'Put on shoes — protects from debris and broken glass',
      'Keep phone charged and NOAA weather alert app active',
      'Unplug major electronics to avoid surge damage',
      'Pool: lower water level 6 inches to handle heavy rain runoff',
      'Close all interior doors to reduce tornado pressure damage',
      'Know your nearest tornado shelter if no interior room available',
      'Keep car keys accessible — but stay inside unless flooding risk',
    ],
  },
  {
    label: 'Ice Storm Specific',
    emoji: '🧊',
    color: '#60a5fa',
    desc: 'DFW-specific — ice storms can disable city for days',
    tasks: [
      'Know your pipe locations — insulate any exposed exterior pipes',
      'Let interior faucets drip slightly when below 20°F overnight',
      'Open cabinet doors under exterior-wall sinks',
      'Stock 5+ days of food — roads freeze solid and stay icy',
      'Do NOT run generator indoors or in garage — CO kills quickly',
      'If power out: do NOT open fridge/freezer unnecessarily',
      'Check on elderly neighbors — DFW cold deaths spike in ice storms',
      'Know how to manually open your garage door if power is out',
    ],
  },
  {
    label: 'After The Storm',
    emoji: '🌤️',
    color: '#34d399',
    desc: 'Storm has passed — damage assessment time',
    tasks: [
      'Photograph all visible damage before any cleanup begins (insurance)',
      'Check roof from ground level for visible missing shingles or damage',
      'Walk property perimeter — look for foundation-level water pooling',
      'Check attic for new water intrusion or daylight through roof deck',
      'Document downed fences, uprooted trees, pool damage with photos',
      'Call your insurance company to open a claim same day if damage exists',
      'Do NOT use a contractor that knocked on your door uninvited after storm',
      'Inspect pool equipment for debris and run pump before closing cover',
    ],
  },
];

export default function DFWStormPrepChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState<string>(PHASES[0].label);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = PHASES.reduce((s, p) => s + p.tasks.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((checkedCount / totalItems) * 100);

  const currentPhase = PHASES.find((p) => p.label === activePhase) || PHASES[0];
  const phaseDone = currentPhase.tasks.filter((t) => checked[`${currentPhase.label}::${t}`]).length;
  const phasePct = Math.round((phaseDone / currentPhase.tasks.length) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌪️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Storm Preparation Checklist
          </h1>
          <p style={{ color: '#8899aa', fontSize: 14, margin: 0 }}>
            Severe storms, tornadoes, and ice — DFW gets them all
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Overall Readiness: {overallPct}%</span>
            <span style={{ color: '#8899aa', fontSize: 13 }}>{checkedCount} / {totalItems} items</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 99, height: 10 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 10, width: `${overallPct}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {PHASES.map((phase) => {
            const done = phase.tasks.filter((t) => checked[`${phase.label}::${t}`]).length;
            return (
              <button
                key={phase.label}
                onClick={() => setActivePhase(phase.label)}
                style={{
                  background: activePhase === phase.label ? '#1a3a5c' : '#112240',
                  border: `2px solid ${activePhase === phase.label ? phase.color : '#1a3050'}`,
                  borderRadius: 8, padding: '8px 14px', cursor: 'pointer', color: phase.color, fontWeight: 700, fontSize: 13,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {phase.emoji} {phase.label}
                {done === phase.tasks.length && <span style={{ color: '#34d399′ }}>✓</span>}
              </button>
            );
          })}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: currentPhase.color }}>
              {currentPhase.emoji} {currentPhase.label}
            </h2>
            <p style={{ margin: '0 0 12px', color: '#8899aa', fontSize: 13 }}>{currentPhase.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 99, height: 7 }}>
              <div style={{ background: currentPhase.color, borderRadius: 99, height: 7, width: `${phasePct}%`, transition: 'width 0.3s' }} />
            </div>
            <div style={{ color: '#8899aa', fontSize: 12, marginTop: 4 }}>{phaseDone}/{currentPhase.tasks.length} items complete</div>
          </div>

          {currentPhase.tasks.map((task) => {
            const key = `${currentPhase.label}::${task}`;
            return (
              <div
                key={task}
                onClick={() => toggle(key)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: '1px solid #1a3050', cursor: 'pointer' }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 4, border: `2px solid ${checked[key] ? currentPhase.color : '#334466'}`,
                  background: checked[key] ? currentPhase.color : 'transparent', flexShrink: 0, marginTop: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 900,
                }}>
                  {checked[key] ? '✓' : ''}
                </div>
                <span style={{ fontSize: 14, color: checked[key] ? '#556677′ : '#cdd9e5', textDecoration: checked[key] ? ’line-through' : 'none', lineHeight: 1.5 }}>
                  {task}
                </span>
              </div>
            );
          })}

          {phaseDone === currentPhase.tasks.length && (
            <p style={{ color: '#34d399', fontWeight: 700, textAlign: 'center', margin: '14px 0 0′ }}>
              {currentPhase.emoji} Phase complete — you are ready!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

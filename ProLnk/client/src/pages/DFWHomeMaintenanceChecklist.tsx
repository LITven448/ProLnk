import { useState } from 'react';

const SEASONS = [
  {
    label: 'Spring',
    emoji: '🌸',
    color: '#34d399',
    months: 'March – May',
    tasks: [
      'Schedule HVAC tune-up before DFW summer heat arrives',
      'Replace HVAC filter and note date on unit',
      'Inspect roof for winter hail damage — file claim if needed',
      'Check foundation perimeter and begin soaker hose schedule',
      'Test sprinkler system and adjust heads after winter',
      'Trim trees and shrubs before storm season starts',
      'Check window and door screens for damage',
      'Flush water heater tank to remove sediment buildup',
    ],
  },
  {
    label: 'Summer',
    emoji: '☀️',
    color: '#fbbf24',
    months: 'June – August',
    tasks: [
      'Monitor HVAC performance — DFW units work hardest now',
      'Keep foundation moist — water clay soil during droughts',
      'Clean AC condenser coils and clear debris from unit',
      'Test pool water chemistry weekly during heavy use',
      'Inspect and clean range hood grease filter monthly',
      'Check attic temp — should not exceed 130°F with good ventilation',
      'Water lawn early morning to reduce evaporation',
      'Inspect exterior caulking around windows for summer heat cracking',
    ],
  },
  {
    label: 'Fall',
    emoji: '🍂',
    color: '#f97316',
    months: 'September – November',
    tasks: [
      'Schedule furnace tune-up before heating season',
      'Clean gutters after leaves fall (Oct/Nov)',
      'Winterize outdoor hose bibs before first freeze',
      'Test smoke and CO detectors — replace batteries',
      'Check attic insulation depth before heating bills spike',
      'Seal any gaps around pipes or ducts in exterior walls',
      'Drain and store garden hoses before freeze',
      'Test generator if you own one — fuel and oil check',
    ],
  },
  {
    label: 'Winter',
    emoji: '❄️',
    color: '#60a5fa',
    months: 'December – February',
    tasks: [
      'Know your pipe freeze protocol — DFW ice storms hit fast',
      'Insulate exposed pipes in garage and under-sink exterior walls',
      'Keep cabinet doors under sinks open during hard freezes',
      'Let faucets drip if temps drop below 20°F overnight',
      'Check weather stripping on all exterior doors',
      'Clean chimney and fireplace before use if equipped',
      'Confirm emergency supplies: flashlights, blankets, water',
      'Document and photograph any storm damage for insurance',
    ],
  },
];

export default function DFWHomeMaintenanceChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeSeason, setActiveSeason] = useState<string | null>(null);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = SEASONS.reduce((s, season) => s + season.tasks.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((checkedCount / totalItems) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Seasonal Home Maintenance
          </h1>
          <p style={{ color: '#8899aa', fontSize: 14, margin: 0 }}>
            DFW-specific tasks for every season — stay ahead of problems
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Annual Progress: {overallPct}%</span>
            <span style={{ color: '#8899aa', fontSize: 13 }}>{checkedCount} / {totalItems} tasks</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 99, height: 10 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 10, width: `${overallPct}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {SEASONS.map((season) => {
            const done = season.tasks.filter((t) => checked[`${season.label}::${t}`]).length;
            const pct = Math.round((done / season.tasks.length) * 100);
            return (
              <button
                key={season.label}
                onClick={() => setActiveSeason(activeSeason === season.label ? null : season.label)}
                style={{
                  background: activeSeason === season.label ? '#1a3a5c' : '#112240',
                  border: `2px solid ${activeSeason === season.label ? season.color : '#1a3050'}`,
                  borderRadius: 10, padding: '14px 12px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{season.emoji}</div>
                <div style={{ color: season.color, fontWeight: 700, fontSize: 15 }}>{season.label}</div>
                <div style={{ color: '#8899aa', fontSize: 11, marginBottom: 8 }}>{season.months}</div>
                <div style={{ background: '#0A1628', borderRadius: 99, height: 5 }}>
                  <div style={{ background: season.color, borderRadius: 99, height: 5, width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
                <div style={{ color: '#8899aa', fontSize: 11, marginTop: 4 }}>{done}/{season.tasks.length} done</div>
              </button>
            );
          })}
        </div>

        {SEASONS.filter((s) => !activeSeason || s.label === activeSeason).map((season) => {
          const done = season.tasks.filter((t) => checked[`${season.label}::${t}`]).length;
          const pct = Math.round((done / season.tasks.length) * 100);
          return (
            <div key={season.label} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: season.color }}>
                  {season.emoji} {season.label} Tasks
                </h2>
                <span style={{ fontSize: 12, color: '#8899aa' }}>{pct}% done</span>
              </div>
              {season.tasks.map((task) => {
                const key = `${season.label}::${task}`;
                return (
                  <div
                    key={task}
                    onClick={() => toggle(key)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #1a3050', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked[key] ? season.color : '#334466'}`,
                      background: checked[key] ? season.color : 'transparent', flexShrink: 0, marginTop: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 900,
                    }}>
                      {checked[key] ? '✓' : ''}
                    </div>
                    <span style={{ fontSize: 14, color: checked[key] ? '#556677' : '#cdd9e5', textDecoration: checked[key] ? 'line-through' : 'none', lineHeight: 1.5 }}>
                      {task}
                    </span>
                  </div>
                );
              })}
              {done === season.tasks.length && (
                <p style={{ color: '#34d399', fontWeight: 700, textAlign: 'center', margin: '12px 0 0', fontSize: 14 }}>
                  {season.emoji} {season.label} complete!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

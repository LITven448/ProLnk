import { useState } from 'react';

const CHECKLIST = [
  { month: 'January', task: 'Replace HVAC air filter (1″–4″ filters)', icon: '🔄' },
  { month: 'February', task: 'Test thermostat accuracy and recalibrate if needed', icon: '🌡️' },
  { month: 'March', task: 'Schedule professional spring tune-up (cooling season prep)', icon: '📅' },
  { month: 'April', task: 'Clean outdoor condenser unit fins and remove debris', icon: '🌿' },
  { month: 'May', task: 'Replace air filter again and check refrigerant line insulation', icon: '🔄' },
  { month: 'June', task: 'Clear condensate drain line with diluted bleach flush', icon: '💧' },
  { month: 'July', task: 'Check condensate pan for standing water; inspect indoor coil', icon: '🪣' },
  { month: 'August', task: 'Replace air filter; verify airflow through all vents', icon: '💨' },
  { month: 'September', task: 'Schedule professional fall tune-up (heating season prep)', icon: '📅' },
  { month: 'October', task: 'Replace air filter; test heat strips on heat pump', icon: '🔥' },
  { month: 'November', task: 'Check and seal ductwork leaks in attic and crawlspace', icon: '🔍' },
  { month: 'December', task: 'Replace air filter; verify carbon monoxide detector near furnace', icon: '🛡️' },
];

export default function DFWHVACPreventiveChecklist() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  function toggle(index: number) {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const nextDue = CHECKLIST.find((_, i) => !completed[i]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>
          🏠 DFW Home Health
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
          HVAC Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 24px', fontSize: 15 }}>
          Annual checklist for DFW homeowners — 12 monthly tasks to keep your system running efficiently.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#8B9BB4′ }}>Annual completion</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 2 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Next task due</div>
            <div style={{ fontSize: 15, color: '#FFFFFF', fontWeight: 600 }}>
              {nextDue ? `${nextDue.month}: ${nextDue.task.slice(0, 50)}…` : '✅ All tasks complete!'}
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, overflow: 'hidden' }}>
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px',
                borderBottom: i < CHECKLIST.length - 1 ? '1px solid #1A2E4A' : 'none',
                cursor: 'pointer', transition: 'background 0.15s',
                background: completed[i] ? '#0A1E38′ : ’transparent',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6, border: `2px solid ${completed[i] ? '#F5E642' : '#2A3F5F'}`,
                background: completed[i] ? '#F5E642′ : ’transparent', flexShrink: 0, marginTop: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              }}>
                {completed[i] ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 600, marginBottom: 2 }}>{item.month}</div>
                <div style={{ fontSize: 15, color: completed[i] ? '#6B7B99′ : '#E8EAF0', textDecoration: completed[i] ? ’line-through' : 'none' }}>
                  {item.icon} {item.task}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: '#0F2040', borderRadius: 10, borderLeft: '3px solid #F5E642′ }}>
          <span style={{ fontSize: 13, color: '#8B9BB4′ }}>💡 DFW Tip: Replace filters every 30 days during peak summer cooling — high humidity and dust loads clog filters fast in North Texas.</span>
        </div>
      </div>
    </div>
  );
}

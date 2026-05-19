import { useState } from 'react';

const CHECKLIST = [
  { month: 'January', task: 'Descale water heater — flush sediment buildup from DFW hard water', icon: '♨️' },
  { month: 'February', task: 'Locate and test all main and individual shut-off valves', icon: '🔧' },
  { month: 'March', task: 'Flush all drain lines with baking soda + vinegar or enzyme cleaner', icon: '🚿' },
  { month: 'April', task: 'Inspect hose bibs and outdoor spigots for winter damage', icon: '🌿' },
  { month: 'May', task: 'Check washing machine supply hoses for bulges or cracks', icon: '👁️' },
  { month: 'June', task: 'Check for slow drains — summer hair and grease buildup peaks', icon: '🌊' },
  { month: 'July', task: 'Inspect under-sink areas for moisture or early leak signs', icon: '🔍' },
  { month: 'August', task: 'Test water heater pressure relief valve — pull lever briefly', icon: '⚙️' },
  { month: 'September', task: 'Check toilet flappers and fill valves — replace if running', icon: '🚽' },
  { month: 'October', task: 'Inspect water heater anode rod — replace if over 50% depleted', icon: '🔩' },
  { month: 'November', task: 'Wrap or insulate outdoor hose bibs before first freeze risk', icon: '❄️' },
  { month: 'December', task: 'Locate main shutoff valve; confirm household knows location', icon: '🏠' },
];

export default function DFWPlumbingPreventiveChecklist() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  function toggle(index: number) {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const nextDue = CHECKLIST.find((_, i) => !completed[i]);

  function getHealthLabel() {
    if (pct >= 75) return { label: 'Healthy', color: '#4CAF50′ };
    if (pct >= 40) return { label: 'Fair', color: '#F5E642′ };
    return { label: 'Needs Work', color: '#FF6B6B' };
  }

  const health = getHealthLabel();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>
          🏠 DFW Home Health
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
          Plumbing Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 24px', fontSize: 15 }}>
          Annual checklist for DFW homeowners — hard water and freeze risk make plumbing maintenance essential.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#8B9BB4′ }}>Annual completion</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Plumbing health</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: health.color }}>{health.label}</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 2 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Next due</div>
            <div style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 600 }}>
              {nextDue ? `${nextDue.month}: ${nextDue.task.slice(0, 40)}…` : '✅ All complete!'}
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
                cursor: 'pointer', background: completed[i] ? '#0A1E38′ : ’transparent',
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
          <span style={{ fontSize: 13, color: '#8B9BB4′ }}>💡 DFW Tip: DFW water is extremely hard (200–400 ppm). Flush your water heater annually and consider a whole-home softener — hard water cuts water heater lifespan by 30–50%.</span>
        </div>
      </div>
    </div>
  );
}

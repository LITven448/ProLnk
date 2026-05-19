import { useState } from 'react';

const CHECKLIST = [
  { month: 'January', task: 'Test all GFCI outlets — press test/reset in kitchen, baths, garage, exterior', icon: '⚡' },
  { month: 'February', task: 'Test smoke detectors — replace batteries in all units', icon: '🔋' },
  { month: 'March', task: 'Inspect all exterior outlets and covers for weathering or cracks', icon: '🌧️' },
  { month: 'April', task: 'Check panel for tripped breakers; look for signs of corrosion or scorch', icon: '🗄️' },
  { month: 'May', task: 'Test CO detectors — replace any unit over 5 years old', icon: '💨' },
  { month: 'June', task: 'Check outlets and switches for warm or discolored cover plates', icon: '🌡️' },
  { month: 'July', task: 'Inspect attic wiring if accessible — look for rodent damage or overheating', icon: '🔍' },
  { month: 'August', task: 'Check panel load during peak A/C — listen for buzzing or repeated trips', icon: '📊' },
  { month: 'September', task: 'Test smoke and CO detectors again (bi-annual per NFPA code)', icon: '🛡️' },
  { month: 'October', task: 'Inspect holiday lighting storage — check for frayed cords before use', icon: '🎄' },
  { month: 'November', task: 'Test all outdoor GFCI outlets before holiday exterior lighting installs', icon: '💡' },
  { month: 'December', task: 'Check for overloaded circuits during holiday usage peak', icon: '⚠️' },
];

export default function DFWElectricalPreventiveChecklist() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  function toggle(index: number) {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const nextDue = CHECKLIST.find((_, i) => !completed[i]);
  const overdue = CHECKLIST.filter((_, i) => !completed[i]).length;

  function getSafetyScore() {
    if (pct >= 80) return { label: 'Safe', color: '#4CAF50', icon: '✅' };
    if (pct >= 50) return { label: 'Review Needed', color: '#F5E642', icon: '⚠️' };
    return { label: 'At Risk', color: '#FF6B6B', icon: '🚨' };
  }

  const safety = getSafetyScore();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>
          🏠 DFW Home Health
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
          Electrical Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 24px', fontSize: 15 }}>
          Annual checklist for DFW homeowners — electrical safety checks that protect your family year-round.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642' }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#8B9BB4' }}>Annual completion</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Safety score</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: safety.color }}>{safety.icon} {safety.label}</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Overdue</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: overdue > 4 ? '#FF6B6B' : '#F5E642' }}>{overdue} tasks</div>
          </div>
        </div>

        {nextDue && (
          <div style={{ background: '#1A2E4A', borderRadius: 10, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#8B9BB4', marginBottom: 2 }}>Next task due</div>
            <div style={{ fontSize: 14, color: '#FFFFFF' }}>{nextDue.month}: {nextDue.task}</div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, overflow: 'hidden' }}>
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px',
                borderBottom: i < CHECKLIST.length - 1 ? '1px solid #1A2E4A' : 'none',
                cursor: 'pointer', background: completed[i] ? '#0A1E38' : 'transparent',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6, border: `2px solid ${completed[i] ? '#F5E642' : '#2A3F5F'}`,
                background: completed[i] ? '#F5E642' : 'transparent', flexShrink: 0, marginTop: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              }}>
                {completed[i] ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 600, marginBottom: 2 }}>{item.month}</div>
                <div style={{ fontSize: 15, color: completed[i] ? '#6B7B99' : '#E8EAF0', textDecoration: completed[i] ? 'line-through' : 'none' }}>
                  {item.icon} {item.task}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: '#0F2040', borderRadius: 10, borderLeft: '3px solid #F5E642' }}>
          <span style={{ fontSize: 13, color: '#8B9BB4' }}>💡 DFW Tip: Panels in homes built before 2000 may be undersized for modern A/C loads. If breakers trip repeatedly in July–August, have an electrician evaluate your panel capacity.</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const CHECKLIST = [
  { month: 'January', task: 'Survey interior floors and walls for new cracks after winter cold snap', icon: '🔍' },
  { month: 'February', task: 'Check drainage around foundation — clear any settled soil against slab', icon: '⛏️' },
  { month: 'March', task: 'Inspect all downspouts extend at least 5 ft from foundation', icon: '💧' },
  { month: 'April', task: 'Start consistent foundation watering schedule as clay begins to dry', icon: '🌱' },
  { month: 'May', task: 'Check for new gaps under doors or misaligned door frames', icon: '🚪' },
  { month: 'June', task: 'Monitor irrigation system — maintain soil moisture around perimeter', icon: '🌊' },
  { month: 'July', task: 'Increase watering frequency as DFW clay shrinks under extreme heat', icon: '☀️' },
  { month: 'August', task: 'Survey for new cracks — peak clay shrinkage month in DFW', icon: '⚠️' },
  { month: 'September', task: 'Photograph all cracks with tape measure for size reference', icon: '📸' },
  { month: 'October', task: 'Full exterior survey: look for separation at brick, stucco, or trim', icon: '🏗️' },
  { month: 'November', task: 'Reduce watering gradually as temps drop; avoid abrupt cutoff', icon: '🍂' },
  { month: 'December', task: 'Check plumbing under slab — listen for running water when off', icon: '🔧' },
];

export default function DFWFoundationPreventiveChecklist() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  function toggle(index: number) {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);
  const overdueItems = CHECKLIST.filter((_, i) => !completed[i]);
  const nextDue = overdueItems[0];

  function getHealthLabel() {
    if (pct >= 80) return { label: 'Healthy', color: '#4CAF50′ };
    if (pct >= 50) return { label: 'Needs Attention', color: '#F5E642′ };
    return { label: 'At Risk', color: '#FF6B6B' };
  }

  const health = getHealthLabel();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>
          🏠 DFW Home Health
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
          Foundation Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 24px', fontSize: 15 }}>
          Annual checklist for DFW homeowners — expansive clay soil makes foundation care critical year-round.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#8B9BB4′ }}>Annual completion</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Foundation health</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: health.color }}>{health.label}</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 4 }}>Overdue tasks</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: overdueItems.length > 3 ? '#FF6B6B' : '#F5E642′ }}>
              {overdueItems.length}
            </div>
          </div>
        </div>

        {nextDue && (
          <div style={{ background: '#1A2E4A', borderRadius: 10, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #F5E642′ }}>
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
          <span style={{ fontSize: 13, color: '#8B9BB4′ }}>💡 DFW Tip: Consistent soil moisture is the #1 foundation protector in North Texas. Inconsistent watering during summer causes expansive clay to shrink and swell — damaging slabs over time.</span>
        </div>
      </div>
    </div>
  );
}

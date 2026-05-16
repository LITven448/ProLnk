import { useState } from 'react';

const CHECKLIST = [
  { month: 'January', task: 'Document roof condition with photos from ground level', icon: '📸' },
  { month: 'February', task: 'Check attic for signs of moisture, dark spots, or sagging', icon: '🔦' },
  { month: 'March', task: 'Clean gutters and downspouts after winter debris accumulation', icon: '🍂' },
  { month: 'April', task: 'Full spring inspection after storm season — look for lifted or missing shingles', icon: '🔍' },
  { month: 'May', task: 'Inspect all roof flashings around chimney, vents, and valleys', icon: '🏗️' },
  { month: 'June', task: 'Check gutters for granule buildup — indicates shingle wear', icon: '🪣' },
  { month: 'July', task: 'Inspect soffit and fascia for rot or pest entry points', icon: '🐛' },
  { month: 'August', task: 'Look for granule loss in gutters after summer hailstorm season', icon: '⛈️' },
  { month: 'September', task: 'Clear gutters before fall; check for sagging gutter sections', icon: '🌿' },
  { month: 'October', task: 'Second gutter cleaning after fall leaf drop in DFW', icon: '🍁' },
  { month: 'November', task: 'Trim overhanging tree branches before winter ice storms', icon: '🌲' },
  { month: 'December', task: 'Inspect attic insulation and ventilation before cold snaps', icon: '❄️' },
];

export default function DFWRoofPreventiveChecklist() {
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
          Roof Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 24px', fontSize: 15 }}>
          Annual checklist for DFW homeowners — protect your roof through hail season, heat, and ice storms.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '16px 24px', flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642' }}>{pct}%</div>
            <div style={{ fontSize: 13, color: '#8B9BB4' }}>Annual completion</div>
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
                background: completed[i] ? '#0A1E38' : 'transparent',
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
          <span style={{ fontSize: 13, color: '#8B9BB4' }}>💡 DFW Tip: April through June is peak hail season. Check gutters for granule accumulation after any storm — it's the #1 early indicator of shingle damage.</span>
        </div>
      </div>
    </div>
  );
}

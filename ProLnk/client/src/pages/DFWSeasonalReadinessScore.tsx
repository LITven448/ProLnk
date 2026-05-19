import { useState } from 'react';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

const CHECKLISTS: Record<Season, { task: string; emoji: string; critical: boolean }[]> = {
  spring: [
    { task: 'HVAC tune-up before cooling season', emoji: '❄️', critical: true },
    { task: 'Inspect roof for hail / winter damage', emoji: '🏠', critical: true },
    { task: 'Check foundation for winter settling cracks', emoji: '🏚️', critical: true },
    { task: 'Clean gutters of spring debris', emoji: '🍂', critical: false },
    { task: 'Test smoke & CO detectors', emoji: '🔥', critical: true },
    { task: 'Inspect irrigation system', emoji: '💧', critical: false },
    { task: 'Check window / door seals for summer heat', emoji: '🪟', critical: false },
    { task: 'Trim trees away from structure', emoji: '🌳', critical: false },
    { task: 'Check attic insulation / ventilation', emoji: '🌡️', critical: false },
    { task: 'Test whole-home generator if applicable', emoji: '⚡', critical: false },
  ],
  summer: [
    { task: 'Change HVAC filters (monthly in DFW summer)', emoji: '❄️', critical: true },
    { task: 'Check for foundation movement after dry spells', emoji: '🏚️', critical: true },
    { task: 'Water foundation perimeter during drought', emoji: '💧', critical: true },
    { task: 'Inspect attic temp — should be under 150°F', emoji: '🌡️', critical: true },
    { task: 'Check outdoor faucets for leaks', emoji: '🔧', critical: false },
    { task: 'Inspect roof flashings after storms', emoji: '⛈️', critical: true },
    { task: 'Test ceiling fans (counterclockwise for summer)', emoji: '💨', critical: false },
    { task: 'Check weatherstripping on all exterior doors', emoji: '🚪', critical: false },
    { task: 'Inspect and clean dryer vent', emoji: '🧺', critical: false },
    { task: 'Check electrical panel for warm breakers', emoji: '⚡', critical: true },
  ],
  fall: [
    { task: 'HVAC tune-up before heating season', emoji: '🔥', critical: true },
    { task: 'Inspect chimney and fireplace', emoji: '🏠', critical: true },
    { task: 'Clear gutters of fall leaves', emoji: '🍂', critical: true },
    { task: 'Winterize irrigation system', emoji: '💧', critical: true },
    { task: 'Seal foundation cracks before freeze', emoji: '🏚️', critical: true },
    { task: 'Check pipe insulation in crawl spaces', emoji: '🔧', critical: false },
    { task: 'Test heating system before first cold front', emoji: '❄️', critical: true },
    { task: 'Check roof before storm season ramp-up', emoji: '⛈️', critical: false },
    { task: 'Inspect weather seals and caulking', emoji: '🪟', critical: false },
    { task: 'Stock up on ice melt / emergency supplies', emoji: '🧊', critical: false },
  ],
  winter: [
    { task: 'Know your pipe shutoff valve location', emoji: '🔧', critical: true },
    { task: 'Insulate exposed pipes in garage / exterior', emoji: '🥶', critical: true },
    { task: 'Leave cabinet doors open during freeze warnings', emoji: '🚪', critical: true },
    { task: 'Set thermostat no lower than 55°F when away', emoji: '🌡️', critical: true },
    { task: 'Test smoke and CO detectors', emoji: '🔥', critical: true },
    { task: 'Check roof after ice / snow events', emoji: '❄️', critical: false },
    { task: 'Inspect for condensation / mold around windows', emoji: '🪟', critical: false },
    { task: 'Check HVAC filter monthly', emoji: '💨', critical: false },
    { task: 'Keep garage door closed to protect pipes', emoji: '🏚️', critical: true },
    { task: 'Have plumber contact ready for emergencies', emoji: '📞', critical: true },
  ],
};

const SEASON_LABELS: Record<Season, string> = { spring: '🌸 Spring', summer: '☀️ Summer', fall: '🍁 Fall', winter: '❄️ Winter' };

export default function DFWSeasonalReadinessScore() {
  const [season, setSeason] = useState<Season>('summer');
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => setChecked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const changeSeason = (s: Season) => { setSeason(s); setChecked(new Set()); };

  const list = CHECKLISTS[season];
  const criticals = list.filter(i => i.critical);
  const criticalsDone = criticals.filter((_, i) => checked.has(list.indexOf(criticals[i]))).length;
  const total = list.length;
  const done = checked.size;
  const score = Math.round((done / total) * 100);
  const missing = list.filter((_, i) => !checked.has(i));
  const firstMissing = missing[0];

  const scoreColor = score >= 80 ? '#4ade80′ : score >= 50 ? '#F5E642' : '#f87171';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Seasonal Readiness Score</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Select your season — check off what you've done</p>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {(Object.keys(SEASON_LABELS) as Season[]).map(s => (
            <button key={s} onClick={() => changeSeason(s)}
              style={{ background: season === s ? '#F5E642′ : '#111f38', color: season === s ? '#0A1628' : '#94a3b8', border: '1px solid', borderColor: season === s ? '#F5E642' : '#2d4166', borderRadius: 8, padding: '8px 16px', fontWeight: season === s ? 700 : 400, cursor: ’pointer', fontSize: 13 }}>
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, background: '#111f38', border: '2px solid', borderColor: scoreColor, borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: scoreColor }}>{score}%</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Readiness Score</div>
            <div style={{ color: scoreColor, fontSize: 12, marginTop: 4 }}>{score >= 80 ? '✅ Well prepared!' : score >= 50 ? '⚠️ Needs attention' : '🚨 Action required'}</div>
          </div>
          <div style={{ flex: 1, background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#F5E642′ }}>{done}/{total}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Tasks Complete</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{criticalsDone}/{criticals.length} critical</div>
          </div>
        </div>
        <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 16 }}>{SEASON_LABELS[season]} Checklist</h2>
          {list.map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < list.length - 1 ? '1px solid #1e2d4a' : 'none', cursor: 'pointer' }}>
              <input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ color: checked.has(i) ? '#4ade80′ : '#e2e8f0', textDecoration: checked.has(i) ? ’line-through' : 'none', fontSize: 14 }}>{item.task}</span>
                {item.critical && !checked.has(i) && <span style={{ marginLeft: 8, background: '#7f1d1d', color: '#f87171', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>CRITICAL</span>}
              </div>
            </label>
          ))}
        </div>
        {firstMissing && (
          <div style={{ background: '#111f38', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚡ Do This First:</div>
            <div style={{ fontSize: 14 }}>{firstMissing.emoji} {firstMissing.task}</div>
          </div>
        )}
        <div style={{ textAlign: 'center', padding: 20, background: '#111f38', borderRadius: 12, border: '1px solid #2d4166′ }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Need a DFW pro to tackle your checklist items? ProLnk connects you with vetted contractors.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Find a Pro via ProLnk
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

type System = 'hvac' | 'roof' | 'foundation' | 'plumbing' | 'electrical';

const MONTHLY_TASKS: Record<string, { system: System; task: string; icon: string }[]> = {
  January: [
    { system: 'hvac', task: 'Replace HVAC air filter', icon: '🔄' },
    { system: 'plumbing', task: 'Descale water heater — flush sediment', icon: '♨️' },
    { system: 'electrical', task: 'Test all GFCI outlets', icon: '⚡' },
    { system: 'foundation', task: 'Survey interior for new cracks after winter cold snap', icon: '🔍' },
  ],
  February: [
    { system: 'hvac', task: 'Test thermostat accuracy', icon: '🌡️' },
    { system: 'plumbing', task: 'Locate and test all shut-off valves', icon: '🔧' },
    { system: 'electrical', task: 'Test smoke detectors; replace batteries', icon: '🔋' },
    { system: 'foundation', task: 'Check drainage — clear soil settled against slab', icon: '⛏️' },
  ],
  March: [
    { system: 'hvac', task: 'Schedule spring HVAC tune-up', icon: '📅' },
    { system: 'plumbing', task: 'Flush drain lines with enzyme cleaner', icon: '🚿' },
    { system: 'electrical', task: 'Inspect exterior outlets and covers', icon: '🌧️' },
    { system: 'roof', task: 'Clean gutters after winter debris', icon: '🍂' },
    { system: 'foundation', task: 'Confirm downspouts extend 5+ ft from foundation', icon: '💧' },
  ],
  April: [
    { system: 'hvac', task: 'Clean outdoor condenser unit fins', icon: '🌿' },
    { system: 'roof', task: 'Full spring inspection — lifted or missing shingles', icon: '🔍' },
    { system: 'plumbing', task: 'Inspect hose bibs for winter damage', icon: '🌿' },
    { system: 'electrical', task: 'Check panel for tripped breakers or corrosion', icon: '🗄️' },
    { system: 'foundation', task: 'Start consistent foundation watering schedule', icon: '🌱' },
  ],
  May: [
    { system: 'hvac', task: 'Replace filter; check refrigerant line insulation', icon: '🔄' },
    { system: 'roof', task: 'Inspect all flashings — chimney, vents, valleys', icon: '🏗️' },
    { system: 'plumbing', task: 'Check washing machine hoses for cracks', icon: '👁️' },
    { system: 'electrical', task: 'Test CO detectors', icon: '💨' },
    { system: 'foundation', task: 'Check for gaps under doors or misaligned frames', icon: '🚪' },
  ],
  June: [
    { system: 'hvac', task: 'Clear condensate drain line with bleach flush', icon: '💧' },
    { system: 'roof', task: 'Check gutters for granule buildup (shingle wear)', icon: '🪣' },
    { system: 'plumbing', task: 'Check for slow drains — peak buildup season', icon: '🌊' },
    { system: 'electrical', task: 'Check outlets for warm cover plates', icon: '🌡️' },
    { system: 'foundation', task: 'Monitor irrigation — maintain perimeter moisture', icon: '🌊' },
  ],
  July: [
    { system: 'hvac', task: 'Check condensate pan; inspect indoor coil', icon: '🪣' },
    { system: 'roof', task: 'Inspect soffit and fascia for rot or pest entry', icon: '🐛' },
    { system: 'plumbing', task: 'Inspect under-sink areas for moisture', icon: '🔍' },
    { system: 'electrical', task: 'Inspect attic wiring for rodent damage or heat', icon: '🔍' },
    { system: 'foundation', task: 'Increase watering frequency — peak clay shrink month', icon: '☀️' },
  ],
  August: [
    { system: 'hvac', task: 'Replace filter; verify airflow through all vents', icon: '💨' },
    { system: 'roof', task: 'Look for granule loss after summer hail season', icon: '⛈️' },
    { system: 'plumbing', task: 'Test water heater pressure relief valve', icon: '⚙️' },
    { system: 'electrical', task: 'Check panel load during peak A/C season', icon: '📊' },
    { system: 'foundation', task: 'Survey for new cracks — peak clay shrinkage month', icon: '⚠️' },
  ],
  September: [
    { system: 'hvac', task: 'Schedule fall HVAC tune-up', icon: '📅' },
    { system: 'roof', task: 'Clear gutters before fall; check for sag', icon: '🌿' },
    { system: 'plumbing', task: 'Check toilet flappers and fill valves', icon: '🚽' },
    { system: 'electrical', task: 'Test smoke and CO detectors (bi-annual)', icon: '🛡️' },
    { system: 'foundation', task: 'Photograph all cracks with tape measure for reference', icon: '📸' },
  ],
  October: [
    { system: 'hvac', task: 'Replace filter; test heat strips on heat pump', icon: '🔥' },
    { system: 'roof', task: 'Second gutter cleaning after fall leaf drop', icon: '🍁' },
    { system: 'plumbing', task: 'Inspect water heater anode rod', icon: '🔩' },
    { system: 'electrical', task: 'Check holiday cord storage for fraying', icon: '🎄' },
    { system: 'foundation', task: 'Full exterior survey — brick, stucco, or trim gaps', icon: '🏗️' },
  ],
  November: [
    { system: 'hvac', task: 'Check and seal ductwork leaks in attic', icon: '🔍' },
    { system: 'roof', task: 'Trim overhanging tree branches before ice storms', icon: '🌲' },
    { system: 'plumbing', task: 'Wrap outdoor hose bibs before first freeze', icon: '❄️' },
    { system: 'electrical', task: 'Test outdoor GFCI before holiday lights install', icon: '💡' },
    { system: 'foundation', task: 'Reduce watering gradually as temps drop', icon: '🍂' },
  ],
  December: [
    { system: 'hvac', task: 'Replace filter; verify CO detector near furnace', icon: '🛡️' },
    { system: 'roof', task: 'Inspect attic insulation and ventilation', icon: '❄️' },
    { system: 'plumbing', task: 'Locate main shutoff; confirm household knows it', icon: '🏠' },
    { system: 'electrical', task: 'Check for overloaded circuits during holiday peak', icon: '⚠️' },
    { system: 'foundation', task: 'Listen for running water under slab when plumbing is off', icon: '🔧' },
  ],
};

const SYSTEM_COLORS: Record<System, string> = {
  hvac: '#3B82F6',
  roof: '#8B5CF6',
  foundation: '#F59E0B',
  plumbing: '#10B981',
  electrical: '#EF4444',
};

const SYSTEM_LABELS: Record<System, string> = {
  hvac: '❄️ HVAC',
  roof: '🏠 Roof',
  foundation: '🏗️ Foundation',
  plumbing: '🚿 Plumbing',
  electrical: '⚡ Electrical',
};

const MONTHS = Object.keys(MONTHLY_TASKS);

export default function DFWHomePreventiveMasterChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);

  function toggle(key: string) {
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const allTasks = MONTHS.flatMap(m => MONTHLY_TASKS[m].map((_, i) => `${m}-${i}`));
  const totalDone = allTasks.filter(k => completed[k]).length;
  const totalPct = Math.round((totalDone / allTasks.length) * 100);

  const monthTasks = MONTHLY_TASKS[selectedMonth] || [];
  const monthDone = monthTasks.filter((_, i) => completed[`${selectedMonth}-${i}`]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>
          🏠 DFW Home Health
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
          Master Preventive Maintenance
        </h1>
        <p style={{ color: '#8B9BB4', margin: '0 0 20px', fontSize: 15 }}>
          All 5 systems — HVAC, Roof, Foundation, Plumbing, Electrical — organized by month for DFW climate.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '14px 20px', flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>{totalPct}%</div>
            <div style={{ fontSize: 12, color: '#8B9BB4′ }}>Annual completion</div>
            <div style={{ fontSize: 12, color: '#8B9BB4′ }}>{totalDone}/{allTasks.length} tasks</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '14px 20px', flex: 2 }}>
            <div style={{ fontSize: 12, color: '#8B9BB4', marginBottom: 6 }}>Systems legend</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(Object.entries(SYSTEM_LABELS) as [System, string][]).map(([k, label]) => (
                <span key={k} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: SYSTEM_COLORS[k] + '33', color: SYSTEM_COLORS[k], border: `1px solid ${SYSTEM_COLORS[k]}55` }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {MONTHS.map(m => {
            const mTasks = MONTHLY_TASKS[m];
            const mDone = mTasks.filter((_, i) => completed[`${m}-${i}`]).length;
            const mPct = Math.round((mDone / mTasks.length) * 100);
            return (
              <button key={m} onClick={() => setSelectedMonth(m)} style={{
                padding: '6px 12px', borderRadius: 8, border: '1px solid',
                borderColor: selectedMonth === m ? '#F5E642′ : '#1A2E4A',
                background: selectedMonth === m ? '#F5E642′ : '#0F2040',
                color: selectedMonth === m ? '#0A1628′ : '#8B9BB4',
                cursor: 'pointer', fontSize: 12, fontWeight: selectedMonth === m ? 700 : 400,
              }}>
                {m.slice(0, 3)} {mPct > 0 ? `${mPct}%` : ''}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>{selectedMonth}</h2>
            <span style={{ fontSize: 13, color: '#8B9BB4′ }}>{monthDone}/{monthTasks.length} done</span>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, overflow: 'hidden' }}>
          {monthTasks.map((item, i) => {
            const key = `${selectedMonth}-${i}`;
            const isDone = !!completed[key];
            return (
              <div key={i} onClick={() => toggle(key)} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px',
                borderBottom: i < monthTasks.length - 1 ? '1px solid #1A2E4A' : 'none',
                cursor: 'pointer', background: isDone ? '#0A1E38′ : ’transparent',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, border: `2px solid ${isDone ? '#F5E642' : '#2A3F5F'}`,
                  background: isDone ? '#F5E642′ : ’transparent', flexShrink: 0, marginTop: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                }}>
                  {isDone ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 20, marginBottom: 4, display: 'inline-block',
                    background: SYSTEM_COLORS[item.system] + '33', color: SYSTEM_COLORS[item.system], border: `1px solid ${SYSTEM_COLORS[item.system]}55` }}>
                    {SYSTEM_LABELS[item.system]}
                  </span>
                  <div style={{ fontSize: 15, color: isDone ? '#6B7B99′ : '#E8EAF0', textDecoration: isDone ? ’line-through' : 'none' }}>
                    {item.icon} {item.task}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: '#0F2040', borderRadius: 10, borderLeft: '3px solid #F5E642′ }}>
          <span style={{ fontSize: 13, color: '#8B9BB4′ }}>💡 DFW Tip: April through August is the highest-risk window for all 5 systems — hail hits roofs, heat strains HVAC, clay shrinks foundations, and electrical panels peak-load. Front-load your maintenance before summer arrives.</span>
        </div>
      </div>
    </div>
  );
}

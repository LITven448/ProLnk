import { useState } from 'react';

const features = {
  pool: [
    { task: '🏊 Test pool chemistry 2x per week (chlorine/pH)', tip: 'Heat + algae = green pool fast' },
    { task: '🌿 Run pool pump 10-12 hrs/day in peak heat', tip: 'Shorter runs cause algae blooms' },
    { task: '🧴 Shock pool weekly during 100°F+ weeks', tip: 'Sunlight burns off chlorine' },
    { task: '🍃 Clean skimmer baskets daily when windy', tip: 'Clogs strain the pump' },
  ],
  nopool: [
    { task: '🚿 Check water heater relief valve', tip: 'Extreme heat stresses tank pressure' },
    { task: '💧 Inspect outdoor faucets for drips', tip: 'Small leaks = big bills in summer' },
  ],
  solar: [
    { task: '☀️ Rinse solar panels monthly', tip: 'Dust film cuts output 15-25%' },
    { task: '📊 Monitor output — watch for shading issues', tip: 'Trees grow fast in DFW summers' },
  ],
};

const generalChecklist = [
  { task: '❄️ Set AC: 78°F when away, 74°F when home', note: 'Every degree below 78° = ~3% more energy' },
  { task: '🌀 Set ceiling fans counterclockwise (summer mode)', note: 'Creates wind chill effect, feels 4°F cooler' },
  { task: '🪟 Close west-facing blinds 2pm–6pm', note: 'West sun is the #1 heat gain source in DFW' },
  { task: '🔁 Replace AC filter (June, July, August)', note: 'Dust + pollen clog filters fast in summer' },
  { task: '🌡️ Check attic temp — should not exceed 130°F', note: 'Overheated attic drives up cooling costs 20%+' },
  { task: '🚪 Weatherstrip exterior doors', note: 'Cool air leaks cost $30-80/month' },
  { task: '🌳 Water trees deeply 1x/week', note: 'DFW clay soil cracks — damages foundation' },
  { task: '🏠 Inspect exterior caulking on south/west walls', note: 'UV degrades caulk fast — gaps let heat in' },
];

export default function DFWSummerSurvivalGuide2026() {
  const [hasPool, setHasPool] = useState<boolean | null>(null);
  const [hasSolar, setHasSolar] = useState<boolean | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allTasks = [
    ...generalChecklist.map((t, i) => ({ ...t, id: `g${i}`, type: 'general' })),
    ...(hasPool === true ? features.pool.map((t, i) => ({ task: t.task, note: t.tip, id: `p${i}`, type: 'pool' })) : []),
    ...(hasPool === false ? features.nopool.map((t, i) => ({ task: t.task, note: t.tip, id: `np${i}`, type: 'nopool' })) : []),
    ...(hasSolar === true ? features.solar.map((t, i) => ({ task: t.task, note: t.tip, id: `s${i}`, type: 'solar' })) : []),
  ];

  const done = allTasks.filter(t => checked[t.id]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          ☀️ DFW Summer Home Survival Guide 2026
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          DFW averages 20+ days above 100°F every summer. Your home needs a strategy — not just a thermostat setting.
        </p>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🌡️ DFW Summer Stats</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
            {[['100°F+', '20+ days avg'], ['$400+', 'avg electric bill Jul-Aug'], ['78°F', 'optimal away setting']].map(([val, label]) => (
              <div key={val} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.2rem' }}>{val}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏊 Do you have a pool?</div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => setHasPool(v)} style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: hasPool === v ? '#F5E642′ : '#1e3a5f', background: hasPool === v ? '#F5E642' : ’transparent', color: hasPool === v ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                {v ? '✅ Yes' : '❌ No'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>☀️ Do you have solar panels?</div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => setHasSolar(v)} style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: hasSolar === v ? '#F5E642′ : '#1e3a5f', background: hasSolar === v ? '#F5E642' : ’transparent', color: hasSolar === v ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                {v ? '✅ Yes' : '❌ No'}
              </button>
            ))}
          </div>
        </div>
        {(hasPool !== null && hasSolar !== null) && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600 }}>Your Summer Optimization Checklist</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{done}/{allTasks.length} done</div>
            </div>
            {allTasks.map((item, i) => (
              <div key={item.id} onClick={() => setChecked(c => ({ ...c, [item.id]: !c[item.id] }))} style={{ padding: '0.6rem 0', borderBottom: i < allTasks.length - 1 ? '1px solid #1e3a5f' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span>{checked[item.id] ? '✅' : '⬜'}</span>
                  <span style={{ textDecoration: checked[item.id] ? 'line-through' : 'none', color: checked[item.id] ? '#64748b' : '#fff' }}>{item.task}</span>
                </div>
                {item.note && <div style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '1.85rem' }}>{item.note}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
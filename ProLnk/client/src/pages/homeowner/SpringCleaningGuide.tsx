import { useState } from 'react';

const ROOMS = [
  {
    id: 'kitchen',
    label: '🍳 Kitchen',
    tasks: [
      { task: 'Check refrigerator coils', detail: 'Pet dander + DFW dust clogs them — reduces efficiency and lifespan.', time: 15 },
      { task: 'Deep clean oven', detail: 'Use self-clean cycle or manual deep clean before summer use increases.', time: 45 },
      { task: 'Clean range hood filter', detail: 'Soak in degreaser. Clogged filters are a fire risk.', time: 20 },
      { task: 'Clean dishwasher filter', detail: 'Most people never do this. Monthly in hard-water DFW.', time: 10 },
      { task: 'Check cabinet hinges and handles', detail: 'Tighten loose hardware before it becomes a bigger issue.', time: 15 },
    ],
  },
  {
    id: 'bathrooms',
    label: '🚿 Bathrooms',
    tasks: [
      { task: 'Replace caulk if yellowing', detail: 'DFW hard water causes faster deterioration. Fresh caulk prevents mold.', time: 60 },
      { task: 'Clean exhaust fan cover', detail: 'Dusty fans barely work — DFW dust makes this critical.', time: 10 },
      { task: 'Check under-sink for leaks', detail: 'Spring is a good time to catch slow leaks before summer humidity.', time: 10 },
      { task: 'Deep clean toilet base and behind tank', detail: 'Bacteria and mineral deposits accumulate year-round.', time: 15 },
    ],
  },
  {
    id: 'living',
    label: '🛋️ Living Areas',
    tasks: [
      { task: 'Wipe down ceiling fans and reverse for summer', detail: 'Counter-clockwise in summer pushes cool air down.', time: 20 },
      { task: 'Clean HVAC vents', detail: 'DFW dust in HVAC is above the national average. Remove and wash all covers.', time: 30 },
      { task: 'Test CO detector', detail: 'Replace batteries or units older than 7 years.', time: 5 },
      { task: 'Wipe baseboards', detail: 'DFW clay soil dust settles heavily on baseboards.', time: 30 },
      { task: 'Clean window tracks', detail: 'Spring pollen clogs window tracks fast in DFW.', time: 20 },
    ],
  },
  {
    id: 'garage',
    label: '🚗 Garage',
    tasks: [
      { task: 'Sweep and check for rodent evidence', detail: 'DFW mice move inside during cold months — check for droppings or chew marks.', time: 30 },
      { task: 'Check garage door bottom seal', detail: 'Cracked seals let in pests and water. Replace for under $30.', time: 10 },
      { task: 'Test garage door safety reversal', detail: 'Required by code — door should reverse when it hits an object.', time: 5 },
      { task: 'Organize storage', detail: 'DFW garage heat is extreme — move temperature-sensitive items inside.', time: 60 },
    ],
  },
  {
    id: 'exterior',
    label: '🏡 Exterior',
    tasks: [
      { task: 'Power wash siding and driveway', detail: 'DFW pollen + clay soil = significant buildup. Spring wash is essential.', time: 120 },
      { task: 'Check window screens for hail damage', detail: 'Small hail dents are easy to miss but screens fail fast after damage.', time: 20 },
      { task: 'Inspect roof from ground', detail: 'Use binoculars. Look for lifted or missing shingles after winter storms.', time: 15 },
      { task: 'Clean gutters', detail: 'Spring leaf drop and winter debris. Critical before summer storms.', time: 45 },
    ],
  },
  {
    id: 'hvac',
    label: '❄️ HVAC',
    tasks: [
      { task: 'Replace HVAC filter', detail: 'Critical before cooling season. Use MERV 8–11 for DFW dust levels.', time: 10 },
      { task: 'Check outdoor unit for debris', detail: 'Clear leaves, mulch, and winter debris from condenser fins.', time: 15 },
      { task: 'Schedule AC tune-up', detail: 'DFW summer is brutal — tune up in March/April before demand surges.', time: 0 },
      { task: 'Check refrigerant lines for damage', detail: 'Look for frost or oil stains on the copper lines.', time: 10 },
    ],
  },
  {
    id: 'attic',
    label: '🏠 Attic',
    tasks: [
      { task: 'Peek in attic for critter damage', detail: 'June heat makes attic access dangerous — do this in March. Look for nests and chewed insulation.', time: 20 },
      { task: 'Check insulation depth', detail: 'DFW needs R-38 minimum. Thin insulation spikes summer energy bills.', time: 10 },
      { task: 'Check attic fan operation', detail: 'Attic fans reduce AC load by 10–15% in DFW summer heat.', time: 10 },
    ],
  },
];

export default function SpringCleaningGuide() {
  const [activeRoom, setActiveRoom] = useState('kitchen');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const room = ROOMS.find(r => r.id === activeRoom)!;
  const totalTasks = ROOMS.flatMap(r => r.tasks).length;
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);
  const remainingTime = ROOMS.flatMap(r => r.tasks)
    .filter(t => !checked[t.task])
    .reduce((acc, t) => acc + t.time, 0);

  function toggle(task: string) {
    setChecked(prev => ({ ...prev, [task]: !prev[task] }));
  }

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
        <h1 style={{ fontSize: 'clamp(22px, 5vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
          DFW Spring Cleaning Guide
        </h1>
        <p style={{ fontSize: 18, color: '#86efac', maxWidth: 600, margin: '0 auto' }}>The Texas Version</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* DFW Context */}
        <div style={{ background: '#1a2a1a', border: '1px solid #2a4a2a', borderRadius: 16, padding: 28, margin: '40px 0′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#4ade80', margin: '0 0 12px' }}>Why DFW Spring Cleaning is Different</h2>
          <p style={{ color: '#ccc', lineHeight: 1.8, margin: 0 }}>
            DFW spring cleaning must account for <strong style={{ color: '#fff' }}>cedar fever season (January–March)</strong>, high winds, and the impending AC season. Skip the HVAC prep and you'll pay for it in July.
          </p>
        </div>

        {/* Progress */}
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4e', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color: '#a0c4ff' }}>Overall Progress: {completedTasks}/{totalTasks} tasks</span>
            <span style={{ fontSize: 13, color: '#aaa' }}>~{remainingTime} min remaining</span>
          </div>
          <div style={{ background: '#0f0f0f', borderRadius: 999, height: 10, overflow: 'hidden' }}>
            <div style={{ background: '#4ade80', height: '100%', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#4ade80', fontWeight: 700 }}>{progress}% complete</div>
        </div>

        {/* Room Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {ROOMS.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRoom(r.id)}
              style={{
                background: activeRoom === r.id ? '#4ade80′ : '#1a1a2e',
                color: activeRoom === r.id ? '#000′ : '#ccc',
                border: '1px solid ' + (activeRoom === r.id ? '#4ade80′ : '#2a2a4e'),
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {room.tasks.map(t => (
            <div
              key={t.task}
              onClick={() => toggle(t.task)}
              style={{
                background: checked[t.task] ? '#0f1a0f' : '#1a1a2e',
                border: '1px solid ' + (checked[t.task] ? '#4ade80′ : '#2a2a4e'),
                borderRadius: 12,
                padding: 20,
                cursor: 'pointer',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                opacity: checked[t.task] ? 0.7 : 1,
              }}
            >
              <div style={{ fontSize: 20, marginTop: 2 }}>{checked[t.task] ? '✅' : '⬜'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: checked[t.task] ? '#4ade80′ : '#fff', marginBottom: 4, textDecoration: checked[t.task] ? ’line-through' : 'none' }}>
                  {t.task}
                </div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{t.detail}</div>
                {t.time > 0 && <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>~{t.time} min</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Pollen Tips */}
        <div style={{ background: '#2a1a0a', border: '1px solid #4a2a0a', borderRadius: 16, padding: 28, margin: '40px 0′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fbbf24', margin: '0 0 12px' }}>🌾 DFW Pollen Season Tips</h2>
          <p style={{ color: '#ccc', lineHeight: 1.8, margin: 0 }}>
            Keep windows closed March–May. Run HVAC on recirculate. A HEPA air purifier helps significantly — especially for cedar and oak pollen which peak in DFW.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ color: '#aaa', marginBottom: 16 }}>Found items you can't DIY?</p>
          <a href="/waitlist/homeowner" style={{ background: '#4ade80', color: '#000', textDecoration: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700 }}>
            Find a TrustyPro Contractor
          </a>
        </div>
      </div>
    </div>
  );
}

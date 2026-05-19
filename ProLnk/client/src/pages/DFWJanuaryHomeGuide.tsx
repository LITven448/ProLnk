import { useState } from 'react';

const HOME_FEATURES = [
  'Central HVAC system',
  'Fireplace / chimney',
  'Smoke & CO detectors',
  'Irrigation system',
  'Pool or spa',
  'Wood deck or fence',
  'Sump pump',
  'Attic insulation',
];

const TASK_MAP: Record<string, { task: string; cost: string; priority: string }[]> = {
  'Central HVAC system': [
    { task: 'Replace air filter (heating mode)', cost: '$15–$40', priority: 'High' },
    { task: 'Check thermostat calibration for mild DFW winter', cost: '$0', priority: 'Medium' },
  ],
  'Fireplace / chimney': [
    { task: 'Schedule chimney sweep before next use', cost: '$120–$200', priority: 'High' },
    { task: 'Test damper opens and closes fully', cost: '$0', priority: 'High' },
  ],
  'Smoke & CO detectors': [
    { task: 'Replace batteries in all units (post-holiday reset)', cost: '$20–$50', priority: 'Critical' },
    { task: 'Test every detector manually', cost: '$0', priority: 'Critical' },
  ],
  'Irrigation system': [
    { task: 'Keep system winterized — DFW freezes possible through Feb', cost: '$0', priority: 'Medium' },
    { task: 'Inspect controller settings for dormant lawn mode', cost: '$0', priority: 'Low' },
  ],
  'Pool or spa': [
    { task: 'Check water chemistry monthly even in winter', cost: '$30–$60', priority: 'Medium' },
    { task: 'Inspect pump and heater seals', cost: '$0', priority: 'Medium' },
  ],
  'Wood deck or fence': [
    { task: 'Inspect for post-holiday foot traffic wear', cost: '$0', priority: 'Low' },
    { task: 'Clear debris from between deck boards', cost: '$0', priority: 'Low' },
  ],
  'Sump pump': [
    { task: 'Test sump pump before spring rains arrive', cost: '$0', priority: 'Medium' },
  ],
  'Attic insulation': [
    { task: 'Check insulation coverage before heating bills spike', cost: '$0', priority: 'Medium' },
    { task: 'Inspect for critter entry points after cool months', cost: '$0', priority: 'Medium' },
  ],
};

export default function DFWJanuaryHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(feature: string) {
    setSelected(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  }

  const tasks = selected.flatMap(f => TASK_MAP[f] ?? []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Seasonal Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>❄️ January DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Post-holiday reset month. Property tax bills arrive (due Jan 31). DFW winters are mild but cold snaps happen — stay ready.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628′ }}>
          <strong>📋 January DFW Reminders</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Property tax bills due January 31 — pay or set up installment plan</li>
            <li>Check smoke detector batteries after holiday decorations come down</li>
            <li>Heating runs a few weeks per month — filter check is worth it</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏠 Select Your Home Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {HOME_FEATURES.map(f => (
            <button
              key={f}
              onClick={() => toggle(f)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${selected.includes(f) ? '#F5E642' : '#1E3050'}`,
                background: selected.includes(f) ? '#F5E642′ : '#111F35',
                color: selected.includes(f) ? '#0A1628′ : '#ccc',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {tasks.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your January Priority Task List</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{t.task}</span>
                    <div style={{ fontSize: 12, color: '#8899AA', marginTop: 2 }}>Estimated cost: {t.cost}</div>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                    background: t.priority === 'Critical' ? '#FF4444′ : t.priority === ’High' ? '#F5E642′ : '#1E3050',
                    color: t.priority === 'Critical' || t.priority === 'High' ? '#0A1628′ : '#aaa',
                  }}>{t.priority}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select your home features above to build your January task list.</p>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const homeAges = ['New (0-10 years)', 'Mid-age (10-25 years)', 'Older (25-50 years)', 'Historic (50+ years)'];
const features = ['Water heater', 'Sewer line', 'Older galvanized pipes', 'None of the above'];

const calendars: Record<string, { task: string; interval: string; dfwNote: string }[]> = {
  'New (0-10 years)': [
    { task: 'Water heater flush', interval: 'Annual', dfwNote: 'DFW hard water causes sediment — do not skip' },
    { task: 'Anode rod inspection', interval: 'Every 3 years', dfwNote: 'Hard water degrades anodes faster than average' },
    { task: 'All shutoff valve test', interval: 'Annual', dfwNote: 'Prevents seizure — turn off/on under sink and at meter' },
    { task: 'PRV (pressure reducing valve) check', interval: 'Every 3 years', dfwNote: 'DFW municipal pressure can run high' },
  ],
  'Mid-age (10-25 years)': [
    { task: 'Water heater flush + anode rod', interval: 'Annual', dfwNote: 'By year 10-12 consider tankless upgrade' },
    { task: 'Sewer camera inspection', interval: 'Every 5 years', dfwNote: 'Root intrusion common in DFW tree-heavy neighborhoods' },
    { task: 'All shutoff valve test', interval: 'Annual', dfwNote: 'Seized valves are a plumbing emergency risk' },
    { task: 'PRV replacement if original', interval: 'Once by year 15', dfwNote: 'Factory PRVs often fail in the 10-15 year range' },
    { task: 'Toilet flapper + fill valve', interval: 'Every 3-5 years', dfwNote: 'DFW minerals degrade rubber seals faster' },
  ],
  'Older (25-50 years)': [
    { task: 'Full plumbing inspection', interval: 'Every 2 years', dfwNote: 'Transition from galvanized to copper common in this era' },
    { task: 'Sewer camera inspection', interval: 'Every 3 years', dfwNote: 'Cracked clay tile or orangeburg may be present' },
    { task: 'Water heater flush + anode', interval: 'Annual', dfwNote: 'If unit is 10+ years, budget for replacement' },
    { task: 'Shutoff valve replacement', interval: 'If any fail test', dfwNote: 'Gate valves from this era commonly seize' },
    { task: 'Water line pressure test', interval: 'Every 2 years', dfwNote: 'Detect pinhole leaks in aging copper' },
  ],
  'Historic (50+ years)': [
    { task: 'Full plumbing video inspection', interval: 'Annual', dfwNote: 'Original cast iron or clay tile sewer is high risk' },
    { task: 'Whole-home repipe evaluation', interval: 'Once — get a quote', dfwNote: 'Galvanized pipe over 50 years rarely passes pressure test' },
    { task: 'Water heater flush', interval: 'Annual', dfwNote: 'If over 12 years old, replace proactively' },
    { task: 'Sewer lateral hydro-jet', interval: 'Every 2 years', dfwNote: 'Buildup in old lines causes backups fast' },
    { task: 'All angle stops replaced', interval: 'If original', dfwNote: 'Compression valves from the 1970s are ticking time bombs' },
  ],
};

export default function DFWPlumbingMaintenanceFrequency2026() {
  const [age, setAge] = useState('');
  const tasks = age ? calendars[age] : [];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔧💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Plumbing Maintenance Frequency Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Dallas-Fort Worth's hard water and clay-soil ground movement create unique plumbing challenges. Get your personalized service calendar below.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Home Age</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeAges.map((a) => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: '12px 16px', borderRadius: 8, border: age === a ? '2px solid #F5E642' : '2px solid #2d3f5a', backgroundColor: age === a ? '#F5E642' : '#0d1f36', color: age === a ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {tasks.length > 0 && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 Your DFW Plumbing Service Calendar</h2>
            {tasks.map((t, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #2d3f5a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 15 }}>{t.task}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{t.interval}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 13 }}>💡 {t.dfwNote}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>💧 DFW Hard Water Alert</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            DFW water hardness ranges from <strong style={{ color: '#e2e8f0' }}>200-400 mg/L</strong> (very hard).
            This accelerates anode rod degradation, causes sediment in water heaters, and clogs aerators.
            A whole-home water softener can reduce plumbing maintenance frequency by up to <strong style={{ color: '#F5E642' }}>40%</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
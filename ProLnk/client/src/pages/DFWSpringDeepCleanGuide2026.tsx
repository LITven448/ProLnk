import { useState } from 'react';

const tasks = {
  small: [
    { task: '🌬️ Replace HVAC filters (pollen peak)', time: '15 min' },
    { task: '🪟 Wash all windows inside & out', time: '2 hrs' },
    { task: '🌿 Clean window screens of pollen buildup', time: '45 min' },
    { task: '🏠 Pressure wash front & back exterior', time: '3 hrs' },
    { task: '🍃 Clear gutters of winter debris', time: '1 hr' },
    { task: '💨 Vacuum HVAC vents & registers', time: '30 min' },
    { task: '🧹 Deep clean kitchen exhaust fan', time: '45 min' },
  ],
  medium: [
    { task: '🌬️ Replace HVAC filters + schedule tune-up', time: '15 min + appt' },
    { task: '🪟 Wash all windows inside & out', time: '3 hrs' },
    { task: '🌿 Clean window screens of pollen buildup', time: '1 hr' },
    { task: '🏠 Pressure wash full exterior + driveway', time: '5 hrs' },
    { task: '🍃 Clear gutters — all sections', time: '2 hrs' },
    { task: '💨 Vacuum all HVAC vents & registers', time: '1 hr' },
    { task: '🧹 Deep clean kitchen + 2 bathrooms', time: '4 hrs' },
    { task: '🛖 Clean garage floor and organize', time: '3 hrs' },
  ],
  large: [
    { task: '🌬️ Replace all HVAC filters + full system check', time: '15 min + appt' },
    { task: '🪟 Professional window cleaning recommended', time: '4-6 hrs' },
    { task: '🌿 Clean all window screens', time: '2 hrs' },
    { task: '🏠 Pressure wash full exterior + patio + drive', time: '6-8 hrs' },
    { task: '🍃 Full gutter cleaning + downspout flush', time: '3 hrs' },
    { task: '💨 Professional duct cleaning recommended', time: 'Appt' },
    { task: '🧹 Full interior deep clean', time: '8+ hrs' },
    { task: '🛖 Garage + shed organization', time: '4 hrs' },
    { task: '🌳 Trim cedar/oak branches away from roofline', time: '2 hrs' },
  ],
};

export default function DFWSpringDeepCleanGuide2026() {
  const [size, setSize] = useState<'small' | 'medium' | 'large' | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const list = size ? tasks[size] : [];
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🌸 DFW Spring Deep Clean Guide 2026
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Cedar and oak pollen coats every surface from February through May. Here's your post-winter deep clean playbook for DFW homes.
        </p>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>⚠️ DFW Spring Reality Check</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>DFW cedar fever peaks Jan–March; oak pollen hits March–May. Your home exterior collects a visible yellow-green film. HVAC systems pull this pollen inside 24/7 — filters clog fast and indoor air quality tanks without action.</p>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏠 What size is your home?</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(['small', 'medium', 'large'] as const).map(s => (
              <button key={s} onClick={() => { setSize(s); setChecked({}); }} style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: size === s ? '#F5E642' : '#1e3a5f', background: size === s ? '#F5E642' : 'transparent', color: size === s ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                {s === 'small' ? '🏠 Under 1,500 sqft' : s === 'medium' ? '🏡 1,500–3,000 sqft' : '🏰 3,000+ sqft'}
              </button>
            ))}
          </div>
        </div>
        {list.length > 0 && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600 }}>Your Spring Clean Checklist</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{done}/{list.length} done</div>
            </div>
            {list.map((item, i) => (
              <div key={i} onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < list.length - 1 ? '1px solid #1e3a5f' : 'none', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem' }}>{checked[i] ? '✅' : '⬜'}</span>
                <span style={{ flex: 1, textDecoration: checked[i] ? 'line-through' : 'none', color: checked[i] ? '#64748b' : '#fff' }}>{item.task}</span>
                <span style={{ color: '#F5E642', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>⏱ {item.time}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: '1.5rem', background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>💡 Pro Tip</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Use ProLnk to get quotes from local pressure washing and HVAC pros. Spring is peak season — book early for the best rates.</p>
        </div>
      </div>
    </div>
  );
}
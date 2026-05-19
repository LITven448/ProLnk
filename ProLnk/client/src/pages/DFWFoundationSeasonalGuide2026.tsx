import { useState } from 'react';

export default function DFWFoundationSeasonalGuide2026() {
  const [foundationType, setFoundationType] = useState('');
  const [schedule, setSchedule] = useState('');

  const months = [
    { season: 'Spring (Mar–May)', icon: '🌱', task: 'Soil Re-Hydration Check', detail: 'DFW clay soil swells with spring rains. Check for new cracks or door misalignment after wet spells.', color: '#22c55e' },
    { season: 'Summer (Jun–Aug)', icon: '🔥', task: 'Daily Watering Protocol', detail: 'DFW drought shrinks clay up to 4 inches. Water foundation perimeter 30 min/day during heat waves to prevent settlement.', color: '#ef4444' },
    { season: 'Fall (Sep–Nov)', icon: '🍁', task: 'Reduce Watering Gradually', detail: 'As temps drop below 80°F, taper watering to avoid over-saturation. Inspect for fall cracks before winter freeze.', color: '#f97316' },
    { season: 'Winter (Dec–Feb)', icon: '🧊', task: 'Freeze Protection for Piers', detail: 'Exposed piers on pier-and-beam homes can shift in hard freezes. Skirt the perimeter and check for frost heave after cold snaps.', color: '#3b82f6' },
  ];

  const getSchedule = () => {
    if (foundationType === 'slab') setSchedule('🏠 Slab Foundation: Focus on consistent moisture year-round. Daily watering June–Aug is critical. Inspect quarterly for cracks wider than 1/4 inch.');
    else if (foundationType === 'pier') setSchedule('🔩 Pier & Beam: Inspect joists annually. Winter freeze protection is essential. Ensure crawlspace ventilation in summer to prevent wood rot.');
    else if (foundationType === 'basement') setSchedule('🏗️ Basement: Rare in DFW but requires waterproofing checks each spring. Monitor for efflorescence and ensure sump pump is operational.');
    else setSchedule('Select your foundation type to get a personalized seasonal care plan.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Foundation Seasonal Care 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Month-by-month foundation protection for DFW clay soil conditions</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {months.map((m) => (
            <div key={m.season} style={{ background: '#111e35', borderRadius: 12, padding: 20, borderLeft: `4px solid ${m.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: m.color }}>{m.season}</div>
                  <div style={{ color: '#F5E642', fontSize: 14 }}>{m.task}</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{m.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Foundation Type Selector</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select your foundation type for a customized seasonal schedule:</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['slab', 'pier', 'basement'].map((type) => (
              <button key={type} onClick={() => setFoundationType(type)}
                style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${foundationType === type ? '#F5E642' : '#1e3a5f'}`,
                  background: foundationType === type ? '#F5E642' : '#0A1628', color: foundationType === type ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14, textTransform: 'capitalize' }}>
                {type === 'slab' ? '🧱 Slab' : type === 'pier' ? '🔩 Pier & Beam' : '🏗️ Basement'}
              </button>
            ))}
          </div>
          <button onClick={getSchedule} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14, marginBottom: 16 }}>
            Get My Schedule
          </button>
          {schedule && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14 }}>{schedule}</div>}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#64748b', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Vetted foundation pros across all 7 DFW counties
        </div>
      </div>
    </div>
  );
}

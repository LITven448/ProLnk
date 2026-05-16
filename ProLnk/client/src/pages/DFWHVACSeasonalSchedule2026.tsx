import { useState } from 'react';

export default function DFWHVACSeasonalSchedule2026() {
  const [age, setAge] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const schedule = [
    { month: 'March', icon: '🌸', task: 'AC Tune-Up', detail: 'Clean coils, check refrigerant, test cooling before DFW heat hits', priority: 'HIGH' },
    { month: 'June', icon: '☀️', task: 'Mid-Summer Filter Check', detail: 'Replace filters monthly in peak heat — DFW dust loads filters 3x faster', priority: 'MEDIUM' },
    { month: 'September', icon: '🍂', task: 'Heating System Check', detail: 'Test furnace/heat pump before first cold snap — DFW winters surprise fast', priority: 'HIGH' },
    { month: 'December', icon: '❄️', task: 'Winter Operation Check', detail: 'Inspect heat exchanger, test carbon monoxide detector, check vents', priority: 'MEDIUM' },
  ];

  const getRecommendation = () => {
    const years = parseInt(age);
    if (isNaN(years)) { setRecommendation('Enter a valid age'); return; }
    if (years < 5) setRecommendation('✅ Annual tune-up only — your system is new. March AC check + September heat check.');
    else if (years < 10) setRecommendation('⚠️ Bi-annual service recommended. Add June refrigerant check to your schedule.');
    else if (years < 15) setRecommendation('🔴 Quarterly inspections advised. System nearing end of life — budget for replacement.');
    else setRecommendation('🚨 Replace soon. 15+ year systems in DFW heat lose 40% efficiency. Monthly checks + replacement plan.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW HVAC Seasonal Schedule 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Year-round HVAC care for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {schedule.map((item) => (
            <div key={item.month} style={{ background: '#111e35', borderRadius: 12, padding: 20, borderLeft: `4px solid ${item.priority === 'HIGH' ? '#F5E642' : '#3b82f6'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{item.month} — {item.task}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>Priority: {item.priority}</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Service Frequency Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Enter your HVAC system age to get a personalized maintenance schedule:</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <input type="number" placeholder="System age in years" value={age} onChange={(e) => setAge(e.target.value)}
              style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14 }} />
            <button onClick={getRecommendation}
              style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              Get Schedule
            </button>
          </div>
          {recommendation && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14 }}>{recommendation}</div>}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#64748b', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Connecting DFW homeowners with vetted HVAC pros
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWACMaintenanceSchedule2026() {
  const [acAge, setAcAge] = useState(7);

  const getFrequency = () => {
    if (acAge < 5) return { label: 'Annual', color: '#14532d', icon: '✅', note: 'Once per year spring tune-up is sufficient' };
    if (acAge < 10) return { label: 'Semi-Annual', color: '#92400e', icon: '⚠️', note: 'Spring AC prep + fall furnace check recommended' };
    return { label: 'Quarterly', color: '#7f1d1d', icon: '🔴', note: 'Aging systems need more frequent attention in DFW heat' };
  };

  const freq = getFrequency();

  const schedule = [
    { month: 'January', icon: '🔥', task: 'Furnace Check', detail: 'Test heat exchanger, check igniter, replace furnace filter before cold fronts' },
    { month: 'March', icon: '🌿', task: 'AC Spring Prep', detail: 'Clear condenser coils of cedar debris, check refrigerant pressure, replace air filter' },
    { month: 'May', icon: '☀️', task: 'Pre-Summer Tune-Up', detail: 'Full AC tune-up before DFW heat season — coil cleaning, drain flush, capacitor check' },
    { month: 'July', icon: '🌡️', task: 'Mid-Summer Check', detail: 'Inspect drain line, check refrigerant in peak heat, verify thermostat calibration' },
    { month: 'September', icon: '🍂', task: 'Post-Summer Assessment', detail: 'Evaluate wear from summer run time, plan for fall/winter, replace filter' },
    { month: 'November', icon: '❄️', task: 'Winter Prep', detail: 'Switch to heat mode, test emergency heat, cover condenser if freeze expected' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>📅 ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Annual Maintenance Schedule 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW runs AC 8+ months per year — your maintenance schedule must match this intensity.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {schedule.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600 }}>{item.month}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.task}</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔧 Maintenance Frequency Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>Your AC Age: {acAge} years</label>
            <input type="range" min={1} max={20} value={acAge} onChange={e => setAcAge(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ backgroundColor: freq.color, borderRadius: 8, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>{freq.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{freq.label} Service</div>
            <div style={{ fontSize: 14, color: '#e2e8f0′ }}>{freq.note}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Schedule Your DFW AC Maintenance</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>Book vetted DFW HVAC technicians before peak season — spots fill fast in April/May</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Book Spring Tune-Up →
          </button>
        </div>
      </div>
    </div>
  );
}
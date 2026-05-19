import { useState } from 'react';

const tasks = [
  { freq: 'Monthly', icon: '📅', title: 'Filter Check / Replace', dfwNote: 'DFW dust & pollen — check every 30 days, replace every 1–3 months', months: [1,2,3,4,5,6,7,8,9,10,11,12], critical: true },
  { freq: 'Monthly', icon: '💧', title: 'Condensate Drain Peek', dfwNote: 'High humidity in DFW spring/summer — check for blockage', months: [4,5,6,7,8,9,10], critical: false },
  { freq: 'Quarterly', icon: '🔍', title: 'Drain Line Flush', dfwNote: 'Flush with bleach every 3 months during cooling season', months: [4,7,10], critical: true },
  { freq: 'Quarterly', icon: '🌡️', title: 'Thermostat Calibration', dfwNote: 'Verify accuracy before each season shift', months: [3,6,9,12], critical: false },
  { freq: 'Biannual', icon: '🛠️', title: 'Professional Tune-Up', dfwNote: 'Spring (Mar/Apr) before DFW summer + Fall (Sep/Oct) before winter', months: [3,9], critical: true },
  { freq: 'Annual', icon: '🧹', title: 'Evaporator Coil Clean', dfwNote: 'DFW pollen coats coils — annual cleaning is essential', months: [3], critical: true },
  { freq: 'Annual', icon: '🏭', title: 'Condenser Coil Clean', dfwNote: 'DFW storms deposit debris — clean outdoor coil annually', months: [3], critical: true },
  { freq: 'Annual', icon: '📋', title: 'Warranty Documentation Check', dfwNote: 'Verify maintenance is logged to keep warranty valid', months: [1], critical: false },
];

const profiles = [
  { id: 'basic', label: '🏠 Standard Home', desc: 'Single-family, 1 system, no pets' },
  { id: 'pets', label: '🐾 Pets / Allergies', desc: 'More frequent filter changes' },
  { id: 'large', label: '🏡 Large Home (3000+ sqft)', desc: 'Multiple systems, higher stakes' },
  { id: 'rental', label: '🏘️ Rental Property', desc: 'Minimal-contact maintenance schedule' },
];

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function DFWHVACMaintenanceSummaryFinal() {
  const [profile, setProfile] = useState('');
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const filtered = activeMonth
    ? tasks.filter(t => t.months.includes(activeMonth))
    : tasks;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🛠️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW HVAC Maintenance Calendar</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>Complete DFW maintenance schedule — monthly, quarterly, biannual, and annual tasks with DFW timing</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {profiles.map(p => (
            <button key={p.id} onClick={() => setProfile(profile === p.id ? '' : p.id)} style={{ padding: '0.75rem', borderRadius: 10, border: `2px solid ${profile === p.id ? '#F5E642' : '#1E3A5F'}`, background: profile === p.id ? '#1a2a0a' : '#0D1F35', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#8899AA', marginTop: 2 }}>{p.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#8899AA', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>Filter by month (click to see what's due):</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {monthNames.map((m, i) => (
              <button key={m} onClick={() => setActiveMonth(activeMonth === i + 1 ? null : i + 1)} style={{ padding: '0.3rem 0.7rem', borderRadius: 20, border: `2px solid ${activeMonth === i + 1 ? '#F5E642' : '#1E3A5F'}`, background: activeMonth === i + 1 ? '#F5E642' : 'transparent', color: activeMonth === i + 1 ? '#0A1628' : '#fff', fontWeight: activeMonth === i + 1 ? 700 : 400, cursor: 'pointer', fontSize: '0.8rem' }}>
                {m}
              </button>
            ))}
            {activeMonth && <button onClick={() => setActiveMonth(null)} style={{ padding: '0.3rem 0.7rem', borderRadius: 20, border: '1px solid #FF6B6B', background: 'transparent', color: '#FF6B6B', cursor: 'pointer', fontSize: '0.8rem' }}>✕ Clear</button>}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((task, i) => (
            <div key={i} style={{ background: '#0D1F35', border: `1px solid ${task.critical ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>{task.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>{task.title}</h3>
                  <span style={{ background: task.critical ? '#F5E642' : '#1E3A5F', color: task.critical ? '#0A1628' : '#8899AA', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{task.freq}</span>
                </div>
                <p style={{ color: '#8899AA', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>{task.dfwNote}</p>
                <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {task.months.map(m => <span key={m} style={{ fontSize: '0.7rem', padding: '1px 6px', background: '#0A1628', borderRadius: 10, color: '#F5E642' }}>{monthNames[m-1]}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

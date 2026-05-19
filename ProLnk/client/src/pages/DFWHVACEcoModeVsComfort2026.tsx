import { useState } from 'react';

export default function DFWHVACEcoModeVsComfort2026() {
  const [lifestyle, setLifestyle] = useState('');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, string> = {
      remote: '🏡 Comfort Mode: You are home most of the day. Set 74°F cooling / 69°F heating. Tight 2°F swing keeps you comfortable. ERCOT demand response enrollment earns bill credits during peak events.',
      commuter: '🚗 Eco Mode: Away 8–10 hrs/day. Set 82°F when away (cooling) / 62°F (heating). Return setpoint 74°F triggers 45 min before arrival. Saves $40–$70/mo in DFW summers.',
      family: '👨‍👩‍👧 Comfort Mode with Sleep Schedule: 74°F days, 76°F nights (cooling). Kids in school → Eco Mode 8am–3pm. SmartThings or Ecobee family schedules handle this automatically.',
      light_sleeper: '😴 Sleep Mode: 76°F cooling setpoint at bedtime (DFW humidity makes 78°F feel clammy). Fan-only assist keeps air moving. Avoid Eco Mode overnight — recovery ramp disturbs sleep.',
    };
    setResult(map[lifestyle] || 'Select your lifestyle pattern above.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          ❄️ DFW HVAC Eco vs Comfort Mode Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW-optimized HVAC mode settings — balance ERCOT grid friendliness, comfort, and monthly bill control.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌿', title: 'Eco Mode', desc: 'Higher setpoint when away. ERCOT-friendly. Saves $40–$70/mo in DFW summers. Best for commuters away 8+ hours.' },
            { icon: '🛋️', title: 'Comfort Mode', desc: 'Tight 2°F temperature swing. Higher bills but consistent comfort. Best for remote workers and families home all day.' },
            { icon: '😴', title: 'Sleep Mode', desc: 'Slightly elevated setpoint at night. DFW humidity means 76°F feels better than 78°F. Fan assist helps comfort.' },
            { icon: '⚡', title: 'ERCOT Demand Response', desc: 'Enroll with Oncor/TXU to earn bill credits during grid emergencies. Smart thermostat required. Up to $150/yr back.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🧭 Mode Recommender</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>What is your daily lifestyle pattern?</label>
            <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
              <option value="">Select your lifestyle...</option>
              <option value="remote">Work from home / home most of the day</option>
              <option value="commuter">Commuter — away 8–10 hours on weekdays</option>
              <option value="family">Family with school-age kids</option>
              <option value="light_sleeper">Light sleeper / sensitive to temp changes at night</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get My Mode Recommendation
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
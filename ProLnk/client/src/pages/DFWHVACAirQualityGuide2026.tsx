import { useState } from 'react';

export default function DFWHVACAirQualityGuide2026() {
  const [concern, setConcern] = useState('');
  const [solution, setSolution] = useState('');

  const solutions: Record<string, { title: string; detail: string; icon: string }> = {
    dust: {
      title: 'High-MERV Filtration',
      detail: 'Upgrade to MERV 11-13 filter. Change every 45 days in DFW due to high dust. Consider whole-home air purifier with HEPA.',
      icon: '🌀',
    },
    humidity: {
      title: 'Humidity Control',
      detail: 'Install whole-home dehumidifier (target 45-55% RH in summer). In rare DFW winters, humidifier prevents dry-air damage.',
      icon: '💧',
    },
    allergens: {
      title: 'UV Germicidal Lights + ERV',
      detail: 'UV-C lights kill mold/bacteria on evaporator coil. ERV (Energy Recovery Ventilator) brings fresh outside air while controlling humidity.',
      icon: '☀️',
    },
    odors: {
      title: 'Activated Carbon + Ventilation',
      detail: 'Add activated carbon filter stage. Ensure bathroom/kitchen exhaust fans vent outside, not into attic. Check for duct leaks pulling in attic air.',
      icon: '🍃',
    },
    mold: {
      title: 'Dehumidification + UV Treatment',
      detail: 'DFW humidity creates mold risk. Install UV light on evaporator coil, whole-home dehumidifier, and ensure proper drain pan slope.',
      icon: '🦠',
    },
  };

  const handleCheck = () => {
    if (concern && solutions[concern]) setSolution(concern);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC & Indoor Air Quality Guide 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 32 }}>
          How your HVAC system manages air quality — filtration, ventilation, humidity control, and UV germicidal lights for DFW homes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔲', title: 'MERV Ratings', desc: 'MERV 8 = basic. MERV 11 = good. MERV 13 = hospital-grade. Higher MERV = more airflow restriction — check your system capacity.' },
            { icon: '🌬️', title: 'ERV / HRV', desc: 'Energy Recovery Ventilators bring fresh outside air in while pre-conditioning it — critical for tight DFW homes.' },
            { icon: '💧', title: 'DFW Humidity', desc: 'Summers average 70-80% RH outdoors. Your HVAC dehumidifies as it cools — but may need help in shoulder seasons.' },
            { icon: '☀️', title: 'UV Germicidal Lights', desc: 'Installed on evaporator coil — kill mold spores and bacteria that thrive in DFW humidity. ~$300-600 installed.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#132240', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#8899aa', fontSize: 14 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Air Quality Concern Finder</div>
          <select
            value={concern}
            onChange={(e) => { setConcern(e.target.value); setSolution(''); }}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', marginBottom: 12, fontSize: 15 }}
          >
            <option value="">Select your air quality concern...</option>
            <option value="dust">Excess dust / dirty filters</option>
            <option value="humidity">High or low humidity</option>
            <option value="allergens">Allergens / respiratory issues</option>
            <option value="odors">Persistent odors</option>
            <option value="mold">Mold concerns</option>
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}
          >
            Get HVAC Solution
          </button>
          {solution && solutions[solution] && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: '16px' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{solutions[solution].icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{solutions[solution].title}</div>
              <div style={{ color: '#cdd9e5', fontSize: 14 }}>{solutions[solution].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Find a DFW HVAC Pro on ProLnk</div>
          <div style={{ fontSize: 14 }}>Charter-tier HVAC techs available across all DFW submarkets. Get matched in minutes.</div>
        </div>
      </div>
    </div>
  );
}
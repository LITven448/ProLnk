import { useState } from 'react';

export default function DFWAirQualityPM25Guide2026() {
  const [concern, setConcern] = useState<string | null>(null);

  const concerns = [
    { id: 'asthma', label: '🫁 Asthma / Respiratory', tip: 'Run HEPA purifier 24/7, upgrade to MERV-13 filter, check AirNow.gov before opening windows during high PM2.5 days.' },
    { id: 'allergy', label: '🤧 Seasonal Allergies', tip: 'Keep windows closed during cedar/oak season. Run HVAC fan continuously with MERV-13 to scrub recirculated air.' },
    { id: 'child', label: '👶 Young Children at Home', tip: 'Children breathe 50% more air per pound of body weight. Portable HEPA in bedroom is highest-impact action.' },
    { id: 'general', label: '🏠 General Health', tip: 'MERV-8 minimum baseline for DFW. Change filter every 60 days during high-pollution months (Jun–Sep).' },
  ];

  const facts = [
    { icon: '🌫️', stat: '40–55 μg/m³', label: 'DFW avg peak PM2.5 in summer ozone season' },
    { icon: '🏗️', stat: '0.3 micron', label: 'Particle size HEPA filters capture at 99.97% efficiency' },
    { icon: '🔄', stat: 'MERV-13', label: 'Minimum filter rating to trap fine particulate matter' },
    { icon: '💨', stat: '35 μg/m³', label: 'EPA 24-hour PM2.5 standard for unhealthy air' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌫️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW PM2.5 Air Quality Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Fine particulate matter enters your home through your HVAC — here's how to stop it</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.stat} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>{f.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚙️ How PM2.5 Enters DFW Homes</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['HVAC infiltration during high-traffic door opens pulls outdoor PM2.5 inside','Duct leaks in attic or crawlspace draw in unconditioned outdoor air','Standard MERV-8 filters only capture particles larger than 3 microns','PM2.5 (2.5 micron) passes straight through most builder-grade filters','DFW summer ozone season (Jun–Sep) produces highest PM2.5 concentrations'].map(item => (
              <li key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                <span style={{ color: '#F5E642' }}>→</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Select Your Health Concern</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id === concern ? null : c.id)}
                style={{ background: concern === c.id ? '#F5E642' : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {c.label}
              </button>
            ))}
          </div>
          {concern && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{concerns.find(c => c.id === concern)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ DFW PM2.5 Action Checklist</h2>
          {['Upgrade HVAC filter to MERV-13 (traps particles down to 1 micron)','Add portable HEPA purifier to bedroom (HEPA captures 0.3 micron at 99.97%)','Check AirNow.gov before opening windows during ozone season','Seal duct leaks in attic to prevent unfiltered infiltration','Change filters every 60 days during high-PM2.5 months'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', marginTop: 2 }}>☑</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

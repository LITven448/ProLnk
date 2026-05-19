import { useState } from 'react';

const iaqParams: Record<string, { name: string; unit: string; good: string; action: string; dfwNote: string; improvements: string[] }> = {
  co2: {
    name: 'CO2 (Carbon Dioxide)',
    unit: 'ppm',
    good: '< 1,000 ppm (ASHRAE); < 800 ppm optimal',
    action: 'Action at > 1,200 ppm',
    dfwNote: 'DFW tight homes with poor ventilation see CO2 spike to 1,500–2,000 ppm overnight — causes headaches and fatigue',
    improvements: ['Add ERV/HRV for fresh air', 'Open windows during mild DFW weather (Oct–Nov, Mar–Apr)', 'Increase HVAC fan runtime for mixing'],
  },
  pm25: {
    name: 'PM2.5 (Fine Particulates)',
    unit: 'µg/m³',
    good: '< 12 µg/m³ annual average (EPA)',
    action: 'Action at > 35 µg/m³',
    dfwNote: 'DFW spring wind events and wildfire smoke from West Texas can push PM2.5 to 50–100+ µg/m³ indoors without proper filtration',
    improvements: ['MERV-13 or better filter on HVAC', 'Standalone HEPA air purifier for high-use rooms', 'Seal duct leaks in attic to prevent particle infiltration'],
  },
  humidity: {
    name: 'Relative Humidity',
    unit: '% RH',
    good: '35–55% RH (ASHRAE 55)',
    action: 'Act below 30% or above 60%',
    dfwNote: 'DFW swings from 15-20% RH in winter to 70-80% RH in summer — both extremes cause health and structural problems',
    improvements: ['Whole-home humidifier for winter', 'Whole-home dehumidifier for summer', 'Tune AC runtime — short-cycling causes high RH'],
  },
  voc: {
    name: 'VOCs (Volatile Organic Compounds)',
    unit: 'ppb TVOC',
    good: '< 500 ppb (TVOC)',
    action: 'Action at > 2,200 ppb',
    dfwNote: 'New DFW construction and renovation off-gassing is significant — new carpet, paint, and cabinets release VOCs for 1–2 years',
    improvements: ['Ventilate aggressively for 6 months after renovation', 'Use low-VOC materials on next remodel', 'ERV + carbon filter combo for VOC removal'],
  },
  temperature: {
    name: 'Temperature Comfort',
    unit: '°F',
    good: '68–76°F (ASHRAE 55)',
    action: 'Action below 65°F or above 80°F',
    dfwNote: 'DFW HVAC commonly creates 4–8°F temperature swings room-to-room due to poor duct design or oversizing',
    improvements: ['Zoning system with dampers', 'Variable-speed air handler for better distribution', 'Duct sealing to fix unbalanced airflow'],
  },
};

const concerns = [
  { id: 'co2', label: '🫁 Headaches, fatigue, stuffy feeling' },
  { id: 'pm25', label: '🫧 Allergies, respiratory irritation' },
  { id: 'humidity', label: '💧 Dry skin / clammy feeling' },
  { id: 'voc', label: '🧪 Chemical smell after renovation' },
  { id: 'temperature', label: '🌡️ Hot/cold spots room to room' },
];

export default function DFWHVACIndoorAirQualityStandards() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const param = result ? iaqParams[result] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🫁 DFW IAQ GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Indoor Air Quality Standards for DFW Homes
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          ASHRAE sets minimum indoor air quality standards for CO2, particulates, humidity, VOCs, and temperature.
          DFW's climate creates specific challenges for each. Here’s what to monitor and when to act.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 What Symptom Are You Experiencing?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem', marginBottom: '1rem' }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => { setConcern(c.id); setResult(c.id); }}
                style={{ background: concern === c.id ? '#F5E642′ : '#1a2f55', color: concern === c.id ? '#0A1628' : '#fff',
                  padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #2a4080', cursor: 'pointer',
                  fontWeight: concern === c.id ? 700 : 400, textAlign: 'left', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {param && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>📊 Monitor: {param.name}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.6 }}>{param.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>HEALTHY RANGE</div><div style={{ fontSize: '0.9rem' }}>{param.good}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>TAKE ACTION WHEN</div><div style={{ fontSize: '0.9rem' }}>{param.action}</div></div>
            </div>
            <div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: '0.5rem' }}>HOW TO IMPROVE IN DFW</div>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: 2, margin: 0 }}>
                {param.improvements.map(i => <li key={i} style={{ fontSize: '0.9rem' }}>{i}</li>)}
              </ul>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📋 All IAQ Parameters at a Glance</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1a2f55′ }}>
                {['Parameter', 'Unit', 'Healthy Range', 'Action Level'].map(h => (
                  <th key={h} style={{ padding: '0.7rem', textAlign: 'left', color: '#F5E642', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(iaqParams).map((p, i) => (
                <tr key={p.name} style={{ background: i % 2 === 0 ? '#0f1f3d' : '#0a1628', borderBottom: '1px solid #1a2f55′ }}>
                  <td style={{ padding: '0.7rem', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '0.7rem', color: '#94a3b8′ }}>{p.unit}</td>
                  <td style={{ padding: '0.7rem', color: '#94a3b8′ }}>{p.good}</td>
                  <td style={{ padding: '0.7rem', color: '#f87171′ }}>{p.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginTop: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🛒 DFW IAQ Monitor Recommendation</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Invest in a multi-parameter IAQ monitor that tracks CO2, PM2.5, TVOC, humidity, and temperature simultaneously.
            Good options for DFW homeowners: Airthings Wave Plus (~$230), Awair Element (~$200), or IQAir AirVisual Pro (~$270).
            Place in main living area and primary bedroom for best coverage of your DFW home's air quality.
          </p>
        </div>
      </div>
    </div>
  );
}

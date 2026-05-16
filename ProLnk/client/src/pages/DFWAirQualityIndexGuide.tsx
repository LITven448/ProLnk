import { useState } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const aqiData = [
  { avg: 42, ozone: 'Low', risk: 'Minimal', season: 'Winter' },
  { avg: 45, ozone: 'Low', risk: 'Minimal', season: 'Winter' },
  { avg: 52, ozone: 'Moderate', risk: 'Low', season: 'Spring' },
  { avg: 58, ozone: 'Moderate', risk: 'Low', season: 'Spring' },
  { avg: 68, ozone: 'Moderate-High', risk: 'Moderate', season: 'Spring' },
  { avg: 88, ozone: 'High', risk: 'High', season: 'Summer' },
  { avg: 96, ozone: 'Very High', risk: 'High', season: 'Summer' },
  { avg: 92, ozone: 'Very High', risk: 'High', season: 'Summer' },
  { avg: 78, ozone: 'High', risk: 'Moderate', season: 'Fall' },
  { avg: 55, ozone: 'Moderate', risk: 'Low', season: 'Fall' },
  { avg: 44, ozone: 'Low', risk: 'Minimal', season: 'Fall' },
  { avg: 40, ozone: 'Low', risk: 'Minimal', season: 'Winter' },
];

const activities = ['Sedentary (indoor)', 'Light outdoor', 'Moderate outdoor', 'Intense outdoor'];
const activityMultiplier = [0.6, 1.0, 1.4, 1.8];

const getMerv = (aqi: number, activity: number) => {
  const exposure = aqi * activityMultiplier[activity];
  if (exposure < 50) return { merv: 'MERV 8', note: 'Standard filtration. Change every 90 days.', windows: '✅ Open windows OK most days', action: 'Normal operation. Run HVAC fan 15 min/hour.' };
  if (exposure < 90) return { merv: 'MERV 11', note: 'Captures fine particles and allergens. Change every 60 days.', windows: '⚠️ Limit window opening to morning hours', action: 'Run HVAC fan continuously. Check filter monthly.' };
  if (exposure < 130) return { merv: 'MERV 13', note: 'Hospital-grade filtration. Change every 45 days.', windows: '🚫 Keep windows closed on high-AQI days', action: 'Run air purifier. Replace filter immediately if gray.' };
  return { merv: 'MERV 16 + HEPA purifier', note: 'Maximum home filtration. Change every 30 days.', windows: '🚫 Seal gaps. Use positive pressure if available.', action: 'Emergency: run purifier at max, seal returns, avoid outdoor exposure.' };
};

const getAqiColor = (aqi: number) => {
  if (aqi < 51) return '#00e400';
  if (aqi < 101) return '#ffff00';
  if (aqi < 151) return '#ff7e00';
  if (aqi < 201) return '#ff0000';
  return '#8f3f97';
};

const getAqiLabel = (aqi: number) => {
  if (aqi < 51) return '🟢 Good';
  if (aqi < 101) return '🟡 Moderate';
  if (aqi < 151) return '🟠 Unhealthy for Sensitive Groups';
  if (aqi < 201) return '🔴 Unhealthy';
  return '🟣 Very Unhealthy';
};

export default function DFWAirQualityIndexGuide() {
  const [month, setMonth] = useState(6);
  const [activity, setActivity] = useState(1);

  const data = aqiData[month];
  const rec = getMerv(data.avg, activity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>💨 Air Quality Index Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            DFW consistently ranks among Texas's worst ozone cities, especially June–September. Ground-level ozone forms when heat and sunlight
            react with vehicle and industrial emissions. Your home's filtration strategy should match the season.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>⚡ DFW Ozone Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { icon: '🏙️', fact: 'DFW exceeds EPA ozone standards ~20+ days per summer' },
              { icon: '☀️', fact: 'Ozone peaks 1–6pm on hot sunny days — worst time to ventilate' },
              { icon: '🏠', fact: 'Indoor ozone is typically 10–50% of outdoor levels without filtration' },
              { icon: '🌬️', fact: 'HVAC recirculation mode + MERV 13 filter cuts indoor ozone 60–80%' },
            ].map(f => (
              <div key={f.fact} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{f.fact}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>🧮 AQI + Activity Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Month</label>
              <select value={month} onChange={e => setMonth(+e.target.value)}
                style={{ width: '100%', background: '#1a2f55', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                {months.map((m, i) => <option key={m} value={i}>{m} — AQI ~{aqiData[i].avg}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Activity Level</label>
              <select value={activity} onChange={e => setActivity(+e.target.value)}
                style={{ width: '100%', background: '#1a2f55', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                {activities.map((a, i) => <option key={a} value={i}>{a}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: getAqiColor(data.avg), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: '1.1rem' }}>{data.avg}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{getAqiLabel(data.avg)}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Ozone: {data.ozone} • Season: {data.season}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #2d4a7a', paddingTop: '1rem', display: 'grid', gap: '0.6rem' }}>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>🔧 Filter: </span>{rec.merv} — {rec.note}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>🪟 Windows: </span>{rec.windows}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>💡 Action: </span>{rec.action}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📊 AQI by Month at a Glance</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.3rem', height: 80 }}>
            {aqiData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: getAqiColor(d.avg), borderRadius: '4px 4px 0 0', height: `${(d.avg / 110) * 64}px`, border: i === month ? '2px solid #fff' : 'none' }} />
                <span style={{ color: '#94a3b8', fontSize: '0.6rem' }}>{months[i].slice(0,1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

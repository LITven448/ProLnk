import { useState } from 'react';

const heatIndex = (t: number, h: number) => {
  const hi =
    -42.379 +
    2.04901523 * t +
    10.14333127 * h -
    0.22475541 * t * h -
    0.00683783 * t * t -
    0.05481717 * h * h +
    0.00122874 * t * t * h +
    0.00085282 * t * h * h -
    0.00000199 * t * t * h * h;
  return Math.round(hi);
};

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const avgTemps = [45,50,58,67,75,83,87,87,80,69,57,48];
const avgHumids = [55,55,54,56,60,62,60,58,63,58,56,55];

const getImpact = (hi: number) => {
  if (hi < 80) return { label: '🟢 Comfortable', home: 'HVAC runs normally. No extra strain.', rec: 'Standard thermostat settings. Good time for outdoor work.' };
  if (hi < 91) return { label: '🟡 Caution', home: 'HVAC cycles more frequently. Energy use up 10-15%.', rec: 'Set thermostat 1-2°F higher. Pre-cool home before peak hours (2-6pm).' };
  if (hi < 104) return { label: '🟠 Extreme Caution', home: 'HVAC under heavy load. Risk of coil freeze if undersized.', rec: 'Check air filter. Close blinds on west/south windows. Avoid 2-7pm outdoor work.' };
  if (hi < 125) return { label: '🔴 Danger', home: 'HVAC at maximum capacity. System failures common. Attic can exceed 160°F.', rec: 'Call HVAC if unit runs nonstop. Ceiling fans help. Consider whole-house fan shutdown.' };
  return { label: '🚨 Extreme Danger', home: 'Life-threatening. AC units may freeze up. Ductwork can separate under heat stress.', rec: 'Stay indoors. If AC fails, go to cooling center immediately. Schedule emergency HVAC check.' };
};

export default function DFWHeatIndexGuide() {
  const [month, setMonth] = useState(6);
  const [temp, setTemp] = useState(avgTemps[6]);
  const [humid, setHumid] = useState(avgHumids[6]);

  const hi = heatIndex(temp, humid);
  const impact = getImpact(hi);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>🌡️ Heat Index Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            DFW regularly hits heat index values of 105–115°F in summer. A 100°F day with 50% humidity feels like 110°F+.
            Heat index — not air temperature — determines the real strain on your home systems and your health.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📊 What Heat Index Means for Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { range: 'Below 80°F', effect: 'HVAC normal operation' },
              { range: '80–91°F', effect: 'Energy use up 10–15%' },
              { range: '91–104°F', effect: 'Risk of coil freeze if undersized unit' },
              { range: '104–124°F', effect: 'System failures possible; attic hits 160°F' },
            ].map(r => (
              <div key={r.range} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{r.range}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>{r.effect}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>🧮 DFW Heat Index Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Month</label>
              <select value={month} onChange={e => { const m = +e.target.value; setMonth(m); setTemp(avgTemps[m]); setHumid(avgHumids[m]); }}
                style={{ width: '100%', background: '#1a2f55', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Temperature (°F): {temp}</label>
              <input type="range" min={60} max={110} value={temp} onChange={e => setTemp(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Humidity (%): {humid}</label>
              <input type="range" min={20} max={90} value={humid} onChange={e => setHumid(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#F5E642′ }}>{hi}°F <span style={{ fontSize: '1.1rem', color: '#fff' }}>feels like</span></div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0′ }}>{impact.label}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 8 }}>🏠 Home Impact: {impact.home}</div>
            <div style={{ color: '#F5E642', fontSize: '0.9rem' }}>💡 {impact.rec}</div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📅 DFW Average Heat Index by Month</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
            {months.map((m, i) => {
              const hi2 = heatIndex(avgTemps[i], avgHumids[i]);
              return (
                <div key={m} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.6rem', textAlign: 'center', border: i === month ? '2px solid #F5E642′ : '2px solid transparent' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{m}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>{hi2}°</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

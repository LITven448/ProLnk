import { useState } from 'react';

const heatIndex = (t: number, rh: number) => {
  const hi =
    -42.379 +
    2.04901523 * t +
    10.14333127 * rh -
    0.22475541 * t * rh -
    0.00683783 * t * t -
    0.05481717 * rh * rh +
    0.00122874 * t * t * rh +
    0.00085282 * t * rh * rh -
    0.00000199 * t * t * rh * rh;
  return Math.round(hi);
};

const dutyFromHI = (hi: number) => Math.min(100, Math.max(0, Math.round((hi - 70) * 2.5)));

export default function DFWHVACHeatStressCalc() {
  const [temp, setTemp] = useState(95);
  const [rh, setRh] = useState(55);
  const [sqft, setSqft] = useState(2000);
  const [submitted, setSubmitted] = useState(false);

  const hi = heatIndex(temp, rh);
  const duty = dutyFromHI(hi);

  const stressLevel =
    duty < 50 ? 'Low' : duty < 70 ? 'Moderate' : duty < 85 ? 'High' : 'Critical';
  const stressColor =
    duty < 50 ? '#22c55e' : duty < 70 ? '#eab308' : duty < 85 ? '#f97316' : '#ef4444';

  const tons = Math.ceil(sqft / 500);
  const symptoms =
    duty >= 85
      ? ['Unit running non-stop', 'Home never reaches set temp', 'Ice forming on coils', 'Warm air from vents']
      : duty >= 70
      ? ['Long run cycles 45–60 min', 'Humidity above 55%', 'Upstairs 5°F+ warmer than down']
      : duty >= 50
      ? ['Mild humidity creep', 'Slight temperature lag in afternoon']
      : ['System cycling normally', 'Comfortable humidity'];

  const actions =
    duty >= 85
      ? 'Call HVAC tech today — system is at capacity. Raise thermostat 2°F to prevent lockout.'
      : duty >= 70
      ? 'Check and replace filter. Ensure vents are open. Schedule tune-up this week.'
      : duty >= 50
      ? 'Monitor closely. Keep blinds closed 10am–4pm. Pre-cool before peak hours.'
      : 'No action needed. System is operating normally for DFW conditions.';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>🌡️ DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Heat Stress Calculator</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Enter today's DFW conditions to see exactly how hard your HVAC is working.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { label: '🌡️ Outdoor Temp (°F)', val: temp, set: setTemp, min: 70, max: 115 },
            { label: '💧 Relative Humidity (%)', val: rh, set: setRh, min: 20, max: 90 },
            { label: '🏠 Home Size (sq ft)', val: sqft, set: setSqft, min: 800, max: 6000, step: 100 },
          ].map(({ label, val, set, min, max, step = 1 }) => (
            <div key={label} style={{ background: '#111c35', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{label}</div>
              <input
                type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }}
              />
              <div style={{ textAlign: 'right', fontWeight: 700, color: '#F5E642', fontSize: 20 }}>{val}{label.includes('sq') ? ' sq ft' : label.includes('%') ? '%' : '°F'}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 24 }}
        >
          Calculate Heat Stress ⚡
        </button>

        {submitted && (
          <div style={{ background: '#111c35', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Heat Index</div>
                <div style={{ fontSize: 36, fontWeight: 800 }}>{hi}°F</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Stress Level</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: stressColor }}>{stressLevel}</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>HVAC Duty Cycle</span>
                <span style={{ fontWeight: 700, color: stressColor }}>{duty}%</span>
              </div>
              <div style={{ background: '#1e2d4a', borderRadius: 99, height: 12 }}>
                <div style={{ width: `${duty}%`, background: stressColor, borderRadius: 99, height: '100%', transition: 'width 0.4s' }} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>📋 Expected Symptoms</div>
              {symptoms.map(s => (
                <div key={s} style={{ background: '#1e2d4a', borderRadius: 8, padding: '8px 12px', marginBottom: 6, fontSize: 14 }}>• {s}</div>
              ))}
            </div>

            <div style={{ background: '#1a2f1a', border: '1px solid #22c55e33', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, color: '#22c55e', marginBottom: 4 }}>✅ Recommended Action</div>
              <div style={{ fontSize: 14 }}>{actions}</div>
            </div>

            <div style={{ marginTop: 16, fontSize: 13, color: '#64748b', textAlign: 'center' }}>
              Estimated system size for {sqft} sq ft DFW home: <strong style={{ color: '#F5E642' }}>{tons} ton{tons > 1 ? 's' : ''}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const sections = [
  {
    emoji: '❄️',
    title: 'Why Heat Pumps Temporarily Blow Warm Air in Winter',
    body: 'Heat pumps reverse their cycle periodically to melt ice that builds up on the outdoor coil in cold weather. During defrost, refrigerant flows in cooling direction — pulling heat from indoors and sending it outside to melt the coil ice. This means your indoor unit blows slightly warm or neutral air for 5–15 minutes. This is normal and expected.',
  },
  {
    emoji: '🌨️',
    title: 'DFW Winter Context',
    body: "Dallas-Fort Worth winters produce temperatures in the 25–45°F range during the handful of truly cold nights. At these temps, outdoor coil frosting can occur — especially with high humidity. DFW's sporadic cold snaps mean a properly functioning heat pump may enter defrost 1–4 times per day during a cold front, then not defrost again for weeks.",
  },
  {
    emoji: '⏱️',
    title: 'How Long Defrost Cycles Should Last',
    body: 'A normal defrost cycle lasts 5–15 minutes. The system initiates via temperature sensor or timer logic, reverses refrigerant, melts coil ice, detects completion (coil temp rises above ~57°F), then returns to heat mode. If your system is in defrost for more than 20 minutes or cycles into defrost every 30–60 minutes, that indicates a problem.',
  },
  {
    emoji: '🚨',
    title: 'When Excessive Defrost Indicates a Problem',
    body: '1) Defrost running every 30–60 minutes = defrost board or sensor fault. 2) Defrost never completing = refrigerant undercharge or coil restriction. 3) Ice never fully melting = reversing valve partially stuck. 4) System running in defrost all night = defrost relay stuck closed. 5) Outdoor unit encased in ice = airflow blocked or severely undercharged.',
  },
];

type DefrostResult = { status: string; detail: string; color: string };

function assessDefrost(tempF: number, frequency: string, duration: string): DefrostResult {
  if (duration === 'over20') return { status: 'Abnormal — Defrost Too Long', detail: 'Cycles over 20 min indicate sensor failure, refrigerant issue, or stuck reversing valve. Service call needed.', color: '#EF4444′ };
  if (frequency === 'every30') return { status: 'Abnormal — Defrost Too Frequent', detail: 'Cycling every 30–60 min suggests defrost board or sensor fault. Not normal even in cold weather.', color: '#EF4444′ };
  if (tempF <= 25 && frequency === 'several') return { status: 'Monitor — Edge of Normal', detail: 'At extreme temps defrost frequency increases. Watch for ice accumulation that does not clear.', color: '#F59E0B' };
  if (tempF >= 40) return { status: 'Possible Issue', detail: 'Defrost at 40°F+ is unusual. May indicate defrost sensor stuck or board failure.', color: '#F59E0B' };
  return { status: 'Normal Operation', detail: 'Periodic defrost at these temps and duration is expected. System working correctly.', color: '#10B981′ };
}

export default function DFWHVACDefrostCycleGuide() {
  const [temp, setTemp] = useState(34);
  const [frequency, setFrequency] = useState('several');
  const [duration, setDuration] = useState('normal');
  const result = assessDefrost(temp, frequency, duration);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Heat Pump Defrost Cycle Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Understanding why heat pumps temporarily blow warm air in winter — and when to call a tech</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h2>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>🔍 Defrost Behavior Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Outdoor Temp: {temp}°F</label>
              <input type="range" min={15} max={55} value={temp} onChange={e => setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Defrost Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="once">Once per day</option>
                <option value="several">2–4 times per day</option>
                <option value="every30″>Every 30–60 minutes</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Defrost Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="normal">Under 15 minutes</option>
                <option value="long">15–20 minutes</option>
                <option value="over20″>Over 20 minutes</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{result.status}</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.detail}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, background: '#0F2140', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '8px 0 12px' }}>Seeing abnormal defrost behavior? Get a DFW heat pump technician fast via ProLnk.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a Pro via ProLnk →</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const weekdaySchedule = [
  { time: '6:00 AM', cooling: '74°F', heating: '68°F', label: 'Wake Up' },
  { time: '8:00 AM', cooling: '78°F', heating: '65°F', label: 'Away (Work)' },
  { time: '5:30 PM', cooling: '74°F', heating: '68°F', label: 'Return Home' },
  { time: '10:00 PM', cooling: '72°F', heating: '66°F', label: 'Sleep' },
];

const weekendSchedule = [
  { time: '7:30 AM', cooling: '74°F', heating: '68°F', label: 'Wake Up' },
  { time: '9:00 AM', cooling: '74°F', heating: '68°F', label: 'Active Home' },
  { time: '10:00 PM', cooling: '72°F', heating: '66°F', label: 'Sleep' },
];

const seasonTips: Record<string, string[]> = {
  summer: [
    'Set away temp to 80°F max — humidity above 82°F risks mold in walls',
    'Pre-cool to 72°F starting at 5 PM before Oncor peak ends at 7 PM',
    'Use ceiling fans to feel 4°F cooler without lowering thermostat',
    'Night temps below 70°F? Open windows instead of running AC',
  ],
  winter: [
    'DFW winters rarely drop below 20°F — heat pump is efficient year-round',
    'Backup heat strips kick in below 35°F outside — expect higher bills',
    'Set away heat to 62°F minimum to protect pipes in north-facing rooms',
    'Ice storms: pre-heat to 70°F before the front hits',
  ],
};

const savingsEstimates: Record<string, string> = {
  summer: 'Est. savings: $28–$55/month vs. leaving at 72°F all day',
  winter: 'Est. savings: $14–$30/month vs. constant 68°F',
};

export default function DFWHVACThermostatProgrammingGuide() {
  const [scheduleType, setScheduleType] = useState<'weekday' | 'weekend'>('weekday');
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');

  const schedule = scheduleType === 'weekday' ? weekdaySchedule : weekendSchedule;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🌡️ DFW HVAC Guide</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Thermostat Programming Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', fontSize: '15px' }}>Optimal schedules tuned for North Texas heat, humidity, and Oncor peak hours.</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>SCHEDULE TYPE</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['weekday', 'weekend'] as const).map(t => (
                <button key={t} onClick={() => setScheduleType(t)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', backgroundColor: scheduleType === t ? '#F5E642′ : '#1E2D45', color: scheduleType === t ? '#0A1628' : '#E8EDF5' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>DFW SEASON</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['summer', 'winter'] as const).map(s => (
                <button key={s} onClick={() => setSeason(s)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', backgroundColor: season === s ? '#F5E642′ : '#1E2D45', color: season === s ? '#0A1628' : '#E8EDF5' }}>{s === ’summer' ? '☀️ Summer' : '❄️ Winter'}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E642', marginBottom: '14px' }}>📅 {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)} Schedule — {season === 'summer' ? 'Cooling' : 'Heating'} Mode</div>
          {schedule.map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < schedule.length - 1 ? '1px solid #2D3F58′ : ’none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{row.time}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8′ }}>{row.label}</div>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: season === 'summer' ? '#60A5FA' : '#FB923C' }}>{season === 'summer' ? row.cooling : row.heating}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⚡ DFW {season === 'summer' ? 'Summer' : 'Winter'} Tips</div>
          {seasonTips[season].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '14px', color: '#CBD5E1′ }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>›</span><span>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D2137', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 700 }}>💰 {savingsEstimates[season]}</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Based on average DFW Oncor rates and 2,000 sq ft home</div>
        </div>
      </div>
    </div>
  );
}

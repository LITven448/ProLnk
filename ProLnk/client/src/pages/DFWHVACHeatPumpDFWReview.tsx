import { useState } from 'react';

const seasons = [
  { label: 'DFW Summer (Jun-Sep)', tempRange: '95-110°F outside', targetIndoor: '72-74°F' },
  { label: 'DFW Spring/Fall', tempRange: '60-85°F outside', targetIndoor: '70-72°F' },
  { label: 'DFW Winter (Dec-Feb)', tempRange: '25-55°F outside', targetIndoor: '68-70°F' },
];

const redFlags = [
  'Cannot maintain 72-74°F when outdoor temp exceeds 100°F',
  'System runs continuously without reaching setpoint',
  'Indoor humidity above 55% in summer',
  'Ice forming on refrigerant lines or outdoor unit',
  'Loud grinding, banging, or screeching noises',
  'Electric bills spiked 25%+ vs same month last year',
  'Airflow noticeably weaker than prior year',
  'Heat pump blowing cold air in heat mode below 35°F outside',
];

export default function DFWHVACHeatPumpDFWReview() {
  const [season, setSeason] = useState('');
  const [maintainsTemp, setMaintainsTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [noise, setNoise] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function assess() {
    const issues: string[] = [];
    if (maintainsTemp === 'no') issues.push('Cannot maintain setpoint');
    if (humidity === 'high') issues.push('High indoor humidity');
    if (noise === 'yes') issues.push('Abnormal noise detected');
    if (issues.length === 0) {
      setResult('✅ Your heat pump is performing well for DFW conditions. Schedule a professional tune-up annually to keep it that way.');
    } else if (issues.length === 1) {
      setResult('⚠️ One concern: ' + issues[0] + '. Monitor closely and call a tech if it persists more than 48 hours.');
    } else {
      setResult('🚨 Multiple issues: ' + issues.join(', ') + '. Call a licensed DFW HVAC technician within 24-48 hours.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW Heat Pump Performance Review
        </h1>
        <p style={{ color: '#9AAFC4', marginBottom: 32 }}>
          Evaluate your heat pump after installation or service. DFW’s 100°F+ summers demand performance far above national averages.
        </p>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>DFW Performance Benchmarks by Season</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {seasons.map(s => (
            <div key={s.label} style={{ background: '#1A2B45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#9AAFC4', fontSize: 14 }}>Outside: {s.tempRange} → Target indoor: {s.targetIndoor}</div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🚩 Red Flags — Call a Tech</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 16, marginBottom: 32 }}>
          {redFlags.map(flag => (
            <div key={flag} style={{ color: '#E8EDF5', padding: '6px 0', borderBottom: '1px solid #243B55', fontSize: 14 }}>
              ❌ {flag}
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Interactive Assessment</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          {[
            { label: 'Current DFW Season', val: season, set: setSeason, opts: [['', 'Select season'], ...seasons.map(s => [s.label, s.label])] },
            { label: 'Can your system maintain target indoor temp?', val: maintainsTemp, set: setMaintainsTemp, opts: [['', 'Select'], ['yes', 'Yes — hits setpoint reliably'], ['no', 'No — struggles or never reaches it']] },
            { label: 'Indoor humidity in summer?', val: humidity, set: setHumidity, opts: [['', 'Select'], ['normal', 'Normal (below 55%)'], ['high', 'High / feels muggy (55%+)']] },
            { label: 'Unusual noises (grinding, banging, screeching)?', val: noise, set: setNoise, opts: [['', 'Select'], ['no', 'No unusual noises'], ['yes', 'Yes — abnormal sounds']] },
          ].map(({ label, val, set, opts }) => (
            <label key={label} style={{ display: 'block', marginBottom: 16 }}>
              <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4' }}>{label}</div>
              <select value={val} onChange={e => set(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
                {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          ))}
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Assessment
          </button>
          {result && <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a DFW HVAC Expert?</div>
          <div style={{ color: '#9AAFC4', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC professionals — free quotes, no pressure.</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const systems = [
  { label: 'Basic Thermostat', cost: '$50–$150', controls: 'Single zone heat/cool on/off', best: 'Budget homes, simple 1-zone systems' },
  { label: 'Programmable Thermostat', cost: '$80–$200', controls: 'Scheduled heating/cooling cycles', best: 'Consistent schedules, energy savings' },
  { label: 'Smart Thermostat', cost: '$150–$350', controls: 'WiFi, learning, remote app, zoning support', best: 'Tech-forward DFW homeowners' },
  { label: 'HVAC Controller/BAS', cost: '$500–$5,000+', controls: 'Multi-zone, dampers, ventilation, humidity', best: 'Large DFW homes, custom builds' },
];

const goals = [
  { label: 'Cut energy bills', rec: 'Smart Thermostat', note: 'Learning algorithms save 10–23% in DFW summers.' },
  { label: 'Control multiple zones', rec: 'HVAC Controller', note: 'Damper-based zoning needs a dedicated controller.' },
  { label: 'Simple reliable control', rec: 'Programmable Thermostat', note: 'Fewer failure points, DFW storm-resilient.' },
  { label: 'Remote monitoring', rec: 'Smart Thermostat', note: 'App alerts for DFW heat spikes are invaluable.' },
];

export default function DFWHVACControlSystemGuide() {
  const [hvacType, setHvacType] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<{ rec: string; note: string } | null>(null);

  function evaluate() {
    const matched = goals.find(g => g.label === goal);
    if (matched) setResult({ rec: matched.rec, note: matched.note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌡️ HVAC Control Systems Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>Thermostats vs smart thermostats vs HVAC controllers — what each controls, what it costs, and which DFW homeowners need it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
          {systems.map(s => (
            <div key={s.label} style={{ background: '#0f2035', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔧 {s.label}</div>
              <div style={{ color: '#60a5fa', fontSize: 14, marginBottom: 4 }}>💰 {s.cost}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>⚡ {s.controls}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>✅ {s.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 24 }}>🏠 Find Your Control System</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your DFW HVAC system type</label>
            <select value={hvacType} onChange={e => setHvacType(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select system…</option>
              <option>Central forced air (single zone)</option>
              <option>Central forced air (multi-zone)</option>
              <option>Mini-split / ductless</option>
              <option>Heat pump</option>
              <option>Geothermal</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your primary control goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select goal…</option>
              {goals.map(g => <option key={g.label}>{g.label}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended: {result.rec}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{result.note}</div>
              <div style={{ color: '#60a5fa', fontSize: 13, marginTop: 12 }}>ProLnk matches you with DFW HVAC techs who specialize in {result.rec} installation.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const sections = [
  {
    emoji: '🛢️',
    title: 'Why Compressor Oil Matters',
    body: 'Refrigerant compressors rely on oil to lubricate internal moving parts, reduce friction-driven heat, and form seals that maintain compression efficiency. Without proper lubrication, metal-on-metal contact accelerates wear and ultimately destroys the compressor — the most expensive single component in your HVAC system.',
  },
  {
    emoji: '🌡️',
    title: 'DFW Extreme Run Hours Accelerate Degradation',
    body: 'Dallas-Fort Worth averages 2,800–3,200 cooling hours per year — roughly 3× the national average. That runtime pounds compressor oil hard. Heat breaks down oil viscosity, moisture infiltrates over time, and acids form from refrigerant decomposition. A unit running 8–10 months of cooling sees oil degradation equivalent to 3 years of moderate-climate use.',
  },
  {
    emoji: '🔥',
    title: 'Acid Testing After a Burnout',
    body: 'When a compressor burns out, acid contaminates the entire refrigerant circuit. DFW technicians must perform acid tests on the oil and refrigerant before installing a replacement compressor. Skipping this step means the new compressor will fail within months. An acid test kit costs $15; a replacement compressor costs $1,200–$2,800.',
  },
  {
    emoji: '🔧',
    title: 'What Technicians Should Check',
    body: '1) Oil color and viscosity (dark/thick = degraded). 2) Acid neutralization number (TAN test). 3) Moisture content via sight glass indicator. 4) Oil return from evaporator coil — low oil return signals a flow restriction. 5) Compressor amp draw trending — rising amps with age signals lubrication failure.',
  },
];

type OilResult = { condition: string; service: string; color: string };

function assessOil(age: number, usage: string): OilResult {
  if (age >= 10 && usage === 'heavy') return { condition: 'High Risk — Oil likely degraded', service: 'Full oil change + acid flush + refrigerant recharge recommended', color: '#EF4444' };
  if (age >= 7 || usage === 'heavy') return { condition: 'Moderate Risk — Oil aging', service: 'Oil sample analysis + acid test at next tune-up', color: '#F59E0B' };
  if (age >= 4) return { condition: 'Monitor — Within normal range', service: 'Annual tune-up with oil inspection sufficient', color: '#3B82F6' };
  return { condition: 'Low Risk — Oil likely fresh', service: 'Standard seasonal maintenance; no oil service needed yet', color: '#10B981' };
}

export default function DFWHVACCompressorOilGuide() {
  const [age, setAge] = useState(5);
  const [usage, setUsage] = useState('moderate');
  const result = assessOil(age, usage);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🛢️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW AC Compressor Oil Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Why extreme DFW run hours make oil condition critical for compressor survival</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h2>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>🔍 Oil Condition Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>System Age: {age} years</label>
              <input type="range" min={1} max={20} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Usage Pattern</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="light">Light (vacation home / rarely used)</option>
                <option value="moderate">Moderate (typical DFW household)</option>
                <option value="heavy">Heavy (runs 24/7 all summer)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{result.condition}</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>Recommended Action: {result.service}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, background: '#0F2140', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '8px 0 12px' }}>Need a DFW-certified HVAC technician to inspect your compressor oil?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a Pro via ProLnk →</button>
        </div>
      </div>
    </div>
  );
}

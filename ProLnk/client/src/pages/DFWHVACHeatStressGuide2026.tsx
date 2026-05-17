import { useState } from 'react';

const ages = ['0-5 years', '6-10 years', '11-15 years', '16-20 years', '20+ years'];
const situations = [
  { id: 'running', label: 'Running constantly' },
  { id: 'warm', label: 'Not cooling enough' },
  { id: 'tripped', label: 'Tripped breaker' },
  { id: 'noisy', label: 'Loud/unusual noise' },
  { id: 'off', label: 'Stopped working' },
];

const riskMatrix: Record<string, Record<string, { level: string; color: string; action: string; cause: string }>> = {
  'Running constantly': {
    '0-5 years': { level: 'Low', color: '#4ADE80', cause: 'Normal in 100°F+ weather — monitor refrigerant levels', action: 'Watch for ice buildup on lines; schedule fall tune-up' },
    '6-10 years': { level: 'Moderate', color: '#EAB308', cause: 'Coils may be dirty, reducing heat transfer efficiency', action: 'Schedule coil cleaning + refrigerant check immediately' },
    '11-15 years': { level: 'High', color: '#F97316', cause: 'Compressor working overtime — head pressure building', action: 'Have compressor amperage tested — replacement risk rising' },
    '16-20 years': { level: 'Critical', color: '#EF4444', cause: 'End-of-life stress — compressor failure likely in summer peak', action: 'Plan replacement before July peak — Charter pros have priority scheduling' },
    '20+ years': { level: 'Emergency', color: '#DC2626', cause: 'Unit is running on borrowed time in DFW heat', action: 'Replace now — Charter pros offer emergency install within 48 hrs' },
  },
  'Not cooling enough': {
    '0-5 years': { level: 'Moderate', color: '#EAB308', cause: 'Refrigerant leak or restricted airflow', action: 'Check filter, then call for refrigerant check' },
    '6-10 years': { level: 'High', color: '#F97316', cause: 'Failing capacitor or low refrigerant common at this age', action: 'Capacitor test + refrigerant check within 48 hours' },
    '11-15 years': { level: 'High', color: '#F97316', cause: 'Multiple components degrading under heat stress', action: 'Full system diagnostic — weigh repair vs replace' },
    '16-20 years': { level: 'Critical', color: '#EF4444', cause: 'Major component failure imminent', action: 'Emergency diagnostic — budget for replacement' },
    '20+ years': { level: 'Emergency', color: '#DC2626', cause: 'System failing', action: 'Replace immediately — health risk in DFW summer' },
  },
};

const defaultRisk = { level: 'Moderate', color: '#EAB308', cause: 'Heat stress accelerates component wear at all ages', action: 'Schedule diagnostic with a Charter ProLnk HVAC professional' };

export default function DFWHVACHeatStressGuide2026() {
  const [age, setAge] = useState('6-10 years');
  const [situation, setSituation] = useState(situations[0]);

  const risk = riskMatrix[situation.label]?.[age] || defaultRisk;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC HEAT STRESS GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>How DFW Extreme Heat Damages Your HVAC System</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>DFW averages 60+ days above 100°F. At sustained extreme temps, HVAC components fail faster than anywhere else in the country.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🌡️ Your HVAC Situation</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 8 }}>System Age</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ages.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ background: age === a ? '#F5E642' : '#1A2F50', color: age === a ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 8 }}>Current Situation</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {situations.map(s => (
                <button key={s.id} onClick={() => setSituation(s)} style={{ background: situation.id === s.id ? '#F5E642' : '#1A2F50', color: situation.id === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: `4px solid ${risk.color}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ color: risk.color, fontWeight: 800, fontSize: 22 }}>⚠️ {risk.level} Risk</div>
          </div>
          <div style={{ color: '#9BA3AF', fontSize: 14, marginBottom: 8 }}><strong style={{ color: '#E8EAF0' }}>Likely cause:</strong> {risk.cause}</div>
          <div style={{ color: '#F5E642', fontSize: 14 }}><strong>Action:</strong> {risk.action}</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔧 DFW HVAC Heat Stress Facts</div>
          {['Compressors fail 3x faster when ambient temps exceed 100°F for 7+ consecutive days', 'Capacitors are #1 summer failure — $150-300 fix, easy to ignore until it kills compressor', 'Head pressure spikes at high ambient temps — oversized units handle this better', 'Condenser coil cleaning before summer = 8-12% efficiency gain in DFW heat', 'Charter ProLnk HVAC pros prioritize members during July-August surge periods'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
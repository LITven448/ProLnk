import { useState } from 'react';

const risks = [
  { label: 'Flickering or dimming lights', key: 'flicker' },
  { label: 'Burning smell from outlets or panels', key: 'smell' },
  { label: 'Tripping breakers (frequent)', key: 'breaker' },
  { label: 'Hot outlets or switch plates', key: 'hot' },
  { label: 'Discolored or charred outlets', key: 'charred' },
  { label: 'Sparks when plugging in devices', key: 'sparks' },
];

const ageRisk: Record<string, { label: string; note: string }> = {
  pre1970: { label: 'High Risk', note: 'Likely has aluminum wiring or ungrounded circuits — common fire hazard.' },
  '1970s': { label: 'Elevated Risk', note: 'Federal Pacific or Zinsco panels common — known to fail under load.' },
  '1980s': { label: 'Moderate Risk', note: 'Older GFCI standards; inspect panel and service entrance.' },
  '1990s': { label: 'Lower Risk', note: 'More modern codes but AC expansion may have overloaded circuits.' },
  post2000: { label: 'Lower Risk', note: 'Modern code compliance; still inspect annually.' },
};

export default function DFWElectricalFireRiskGuide() {
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | { level: string; actions: string[]; callNow: boolean }>(null);

  function toggle(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  function assess() {
    const urgent = selected.includes('smell') || selected.includes('charred') || selected.includes('sparks');
    const high = selected.length >= 3 || age === 'pre1970' || age === '1970s';
    const actions: string[] = [];
    if (selected.includes('breaker')) actions.push('Schedule panel inspection — breakers should not trip under normal DFW summer AC load.');
    if (selected.includes('flicker')) actions.push('Check for loose connections at panel and outlets; could indicate arc fault.');
    if (selected.includes('hot')) actions.push('Stop using that outlet immediately; hot plates indicate overload or wiring fault.');
    if (age === 'pre1970' || age === '1970s') actions.push('Request full electrical inspection including wiring type and panel brand.');
    if (actions.length === 0) actions.push('Schedule annual inspection before summer AC season begins.');
    setResult({ level: urgent ? 'Critical' : high ? 'High' : 'Moderate', actions, callNow: urgent });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Electrical Fire Risk Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Electrical failures are the #2 cause of home fires in DFW. Summer AC loads push aging systems to their limits — know your risk before peak season.</p>
        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Top DFW Fire Causes</h2>
          {[['🔥 #1 Cooking equipment', 'Unattended stovetop — still top cause.'],['⚡ #2 Electrical failures', 'Overloaded circuits from AC, aging panels, aluminum wiring.'],['🕯️ #3 Heating equipment', 'Space heaters during rare DFW freezes.'],['🚬 #4 Smoking materials', 'Improper disposal outdoors during dry summers.']].map(([t, d]) => (
            <div key={t} style={{ borderBottom: '1px solid #1E2D4A', padding: '10px 0' }}>
              <div style={{ fontWeight: 600 }}>{t}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Your Risk Assessment</h2>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Home Age</label>
          <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value=''>Select age range</option>
            <option value='pre1970'>Before 1970</option>
            <option value='1970s'>1970s</option>
            <option value='1980s'>1980s</option>
            <option value='1990s'>1990s</option>
            <option value='post2000'>2000 or newer</option>
          </select>
          {age && <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: '3px solid #F5E642' }}><strong>{ageRisk[age].label}:</strong> {ageRisk[age].note}</div>}
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Warning Signs Present</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {risks.map(r => (
              <button key={r.key} onClick={() => toggle(r.key)} style={{ background: selected.includes(r.key) ? '#F5E642' : '#0A1628', color: selected.includes(r.key) ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>{r.label}</button>
            ))}
          </div>
          <button onClick={assess} disabled={!age} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: age ? 'pointer' : 'not-allowed', width: '100%' }}>Assess My Risk</button>
        </div>
        {result && (
          <div style={{ background: result.callNow ? '#3B0A0A' : '#111D35', border: `2px solid ${result.callNow ? '#EF4444' : '#F5E642'}`, borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: result.callNow ? '#EF4444' : '#F5E642', marginBottom: 12 }}>{result.callNow ? '🚨' : '⚠️'} Risk Level: {result.level}</h2>
            {result.callNow && <p style={{ color: '#FCA5A5', marginBottom: 12, fontWeight: 600 }}>Do not ignore these signs — call a licensed electrician today.</p>}
            <ul style={{ paddingLeft: 20 }}>{result.actions.map((a, i) => <li key={i} style={{ color: '#E8EDF5', marginBottom: 8 }}>{a}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const assessments: Record<string, { label: string; color: string; detail: string }> = {
  low: { label: '❄️ Too Low (< 15°F)', color: '#F59E0B', detail: 'Differential below 15°F suggests low refrigerant charge, dirty evaporator coil, or restricted airflow. In DFW summer heat this causes the system to run longer without cooling adequately.' },
  good: { label: '✅ Normal (15–20°F)', color: '#22C55E', detail: 'A 15–20°F differential is the DFW target range. Your AC is removing heat effectively. Monitor on extreme 100°F+ days — differential may drop slightly, which is normal.' },
  high: { label: '🔥 Too High (> 20°F)', color: '#EF4444', detail: 'Differential above 20°F usually means restricted return airflow — clogged filter, closed vents, or undersized return ducts. Ice can form on the evaporator coil. Check filter immediately.' },
};

export default function DFWHVACTempDiff2026() {
  const [supply, setSupply] = useState('');
  const [ret, setRet] = useState('');
  const [result, setResult] = useState<null | typeof assessments[string]>(null);

  function assess() {
    const s = parseFloat(supply);
    const r = parseFloat(ret);
    if (isNaN(s) || isNaN(r)) return;
    const diff = r - s;
    if (diff < 15) setResult(assessments.low);
    else if (diff <= 20) setResult(assessments.good);
    else setResult(assessments.high);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🌡️ AC Temperature Differential Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>Testing your DFW AC performance with supply vs. return air temperature measurements. The target differential is 15–20°F in DFW summer conditions.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 How to Test</h2>
          {[
            ['1', '🌀 Supply Air', 'Hold thermometer 1–2 inches inside the supply register (where cold air blows out). Let it stabilize for 60 seconds.'],
            ['2', '↩️ Return Air', 'Hold thermometer at the return grille (where air is pulled back to the unit). Typically in hallways or central areas.'],
            ['3', '🔢 Calculate', 'Subtract supply temp from return temp. Result should be 15–20°F in DFW summer.'],
          ].map(([n, icon, text]) => (
            <div key={n} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>{n}</div>
              <div><span style={{ color: '#FFFFFF', fontWeight: 600 }}>{icon} </span><span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{text}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔢 Temperature Differential Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['Supply Air Temp (°F)', supply, setSupply], ['Return Air Temp (°F)', ret, setRet]].map(([label, val, setter]) => (
              <div key={label as string}>
                <label style={{ color: '#94A3B8', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>{label as string}</label>
                <input type="number" value={val as string} onChange={e => (setter as Function)(e.target.value)} placeholder="°F" style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2D4A7A', borderRadius: 8, padding: '0.6rem 0.8rem', color: '#FFFFFF', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Assess Performance ➜</button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderLeft: `4px solid ${result.color}`, borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: result.color, fontWeight: 700, marginBottom: '0.5rem' }}>{result.label}</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ DFW-Specific Notes</h2>
          {['On days above 100°F, differentials can drop to 13–14°F even on healthy systems due to high load.', 'DFW humidity (May–Sep) affects evaporator performance — a dehumidification mode may widen differential.', 'Test when system has run for at least 15 minutes and outdoor temp is above 85°F for accurate results.'].map((t, i) => (
            <div key={i} style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #2D4A7A' }}>{t}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW HVAC Resource · 2026</div>
      </div>
    </div>
  );
}
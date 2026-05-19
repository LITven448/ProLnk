import { useState } from 'react';

export default function DFWHVACDFWTrouble() {
  const [outdoor, setOutdoor] = useState('');
  const [indoor, setIndoor] = useState('');
  const [setpoint, setSetpoint] = useState('');
  const [result, setResult] = useState('');
  const [severity, setSeverity] = useState('');

  function assess() {
    const out = parseFloat(outdoor);
    const ind = parseFloat(indoor);
    const set = parseFloat(setpoint) || 78;

    if (!out || !ind) { setResult('⚠️ Enter outdoor and indoor temperatures to assess.'); setSeverity(''); return; }

    const gap = ind - set;
    const outHeat = out >= 100 ? 'extreme' : out >= 95 ? 'high' : out >= 88 ? 'moderate' : 'mild';

    if (outHeat === 'extreme' && gap <= 2) {
      setSeverity('ok');
      setResult(`✅ Normal DFW operation. At ${out}°F outside, your system is doing well to maintain within 2°F of setpoint. DFW systems are designed for 95°F — at 100°F+ they work beyond design capacity. Current indoor temp of ${ind}°F vs setpoint of ${set}°F is acceptable.`);
    } else if (outHeat === 'extreme' && gap > 2 && gap <= 6) {
      setSeverity('watch');
      setResult(`🟡 Watch closely. At ${out}°F outside, being ${gap}°F above your ${set}°F setpoint is borderline. Check: (1) Is your filter dirty? (2) Are supply vents blocked? (3) Is the outdoor unit running? If still struggling after 20 minutes with good airflow, call a DFW tech.`);
    } else if (outHeat === 'extreme' && gap > 6) {
      setSeverity('problem');
      setResult(`🔴 Problem detected. At ${out}°F outside, being ${gap}°F above your ${set}°F setpoint suggests a real issue — likely low refrigerant, frozen evaporator coil, or failed compressor. Turn the system to FAN ONLY for 30 minutes to let coils thaw, then restart. If it doesn't recover, this is a same-day service call.`);
    } else if (outHeat === 'high' && gap <= 0) {
      setSeverity('ok');
      setResult(`✅ Excellent. Maintaining setpoint at ${out}°F is strong DFW performance. Your system is in good shape.`);
    } else if (outHeat === 'high' && gap > 0 && gap <= 3) {
      setSeverity('watch');
      setResult(`🟡 Slightly struggling at ${out}°F. A ${gap}°F gap is minor but worth noting. Schedule a tune-up — refrigerant check and coil cleaning at this stage can prevent bigger problems in peak summer.`);
    } else if (outHeat === 'high' && gap > 3) {
      setSeverity('problem');
      setResult(`🔴 Definite problem. At ${out}°F outside — which is not even DFW peak — being ${gap}°F above setpoint is a significant issue. This will get worse as summer peaks. Low refrigerant or duct leaks are most likely. Call a DFW HVAC tech this week.`);
    } else if (outHeat === 'moderate' && gap > 0) {
      setSeverity('emergency');
      setResult(`🚨 Emergency level. At ${out}°F outside — moderate DFW conditions — your system should easily maintain setpoint. Being ${gap}°F above your ${set}°F target at ${out}°F outside means your system has a serious failure. Stop cooling, check the outdoor unit, and call a DFW HVAC tech today.`);
    } else {
      setSeverity('ok');
      setResult(`✅ No concern. At ${out}°F outdoor temp with indoor at ${ind}°F, your DFW HVAC is performing normally.`);
    }
  }

  const borderColor = severity === 'ok' ? '#22c55e' : severity === 'watch' ? '#f59e0b' : severity === 'problem' ? '#ef4444′ : severity === ’emergency' ? '#dc2626′ : '#2d5a8e';
  const inputStyle = { background: '#1e3a5f', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 14px', color: 'white', fontSize: 15, width: '100%', boxSizing: 'border-box' as const };
  const labelStyle = { color: '#94a3b8', fontSize: 14, marginBottom: 6, display: 'block' };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Trouble Guide ⚠️</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          DFW homeowners need DFW thresholds. National guidance says "call if the AC can't maintain setpoint" — but in a 105°F Texas summer, some struggle is expected. And if it can't maintain 78°F at 88°F outside, that’s an emergency. Know the difference.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📏 DFW Trouble Thresholds (Quick Reference)</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { temp: '105°F+ outside', status: '✅ Normal', desc: 'System may struggle — designed for 95°F' },
              { temp: '100°F outside, 5°F+ above setpoint', status: '🟡 Watch', desc: 'Check filter and airflow, monitor closely' },
              { temp: '95°F outside, 3°F+ above setpoint', status: '🔴 Problem', desc: 'Schedule a tech this week' },
              { temp: '88°F outside, any above setpoint', status: '🚨 Emergency', desc: 'Call a DFW HVAC tech today' },
            ].map(row => (
              <div key={row.temp} style={{ background: '#1e3a5f', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 200, color: '#cbd5e1', fontSize: 14 }}>{row.temp}</div>
                <div style={{ minWidth: 100, fontWeight: 700, fontSize: 14 }}>{row.status}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{row.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🌡️ Check Your Current Situation</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div><label style={labelStyle}>Outdoor temperature (°F) *</label><input style={inputStyle} placeholder="e.g. 98″ value={outdoor} onChange={e => setOutdoor(e.target.value)} /></div>
            <div><label style={labelStyle}>Current indoor temperature (°F) *</label><input style={inputStyle} placeholder="e.g. 81″ value={indoor} onChange={e => setIndoor(e.target.value)} /></div>
            <div><label style={labelStyle}>Your thermostat setpoint (°F, default 78)</label><input style={inputStyle} placeholder="e.g. 78″ value={setpoint} onChange={e => setSetpoint(e.target.value)} /></div>
          </div>
          <button onClick={assess}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Assess My DFW Situation →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#1e3a5f', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.7, fontSize: 15, borderLeft: `4px solid ${borderColor}` }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🚨 Need a DFW HVAC Tech Now?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk connects DFW homeowners with vetted local HVAC pros — including emergency service. Don't go through a hot Texas summer without a reliable contact. prolnk.io</div>
        </div>
      </div>
    </div>
  );
}

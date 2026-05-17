import { useState } from 'react';

export default function DFWHVACLongRunGuide2026() {
  const [pattern, setPattern] = useState('');
  const [temp, setTemp] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!pattern || !temp) { setResult('Please select both options.'); return; }
    if (pattern === 'variable') {
      setResult('✅ NORMAL — Variable-speed systems are designed to run continuously at low capacity. This is more efficient than cycling on/off. No action needed.');
    } else if (pattern === 'constant' && temp === '100plus') {
      setResult('✅ LIKELY NORMAL — When it's 100°F+ in DFW, even a properly functioning single-stage AC may run all day to maintain setpoint. Check that indoor temp is actually reaching your setting.');
    } else if (pattern === 'constant' && temp === 'under100') {
      setResult('⚠️ INVESTIGATE — Continuous run below 100°F and not reaching setpoint may indicate low refrigerant, dirty coils, or undersized system. Book a ProLnk HVAC check.');
    } else if (pattern === 'never-cools') {
      setResult('🚨 PROBLEM — If your AC runs constantly but never reaches setpoint, something is wrong. Common causes: refrigerant leak, failed compressor, severely dirty filter. Get a diagnostic now.');
    } else {
      setResult('Based on your inputs, monitor for 24 hours. If indoor temp never reaches setpoint, schedule a ProLnk HVAC inspection.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>❄️ Why Your DFW AC Runs All Day</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          In DFW summers, constant AC operation is often normal — but sometimes it signals a problem. Here's how to tell the difference.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 System Types & What's Normal</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '✅', label: 'Variable-Speed Systems', desc: 'Designed to run all day at low capacity — this is the efficient mode. Expect 18-22 hours/day runtime in July.' },
              { icon: '⚠️', label: 'Single-Stage in July (100°F+)', desc: 'May run 20+ hours/day and still be fine. The system is fighting DFW heat. Check your actual indoor temp.' },
              { icon: '🚨', label: 'Never Reaches Setpoint', desc: 'If indoor temp never hits your target, that's a system problem regardless of runtime. Refrigerant, coils, or sizing issue.' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, padding: '12px', background: '#1a2f4a', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎛️ DFW AC Runtime Diagnostic</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Your AC Runtime Pattern</label>
            <select value={pattern} onChange={e => setPattern(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select pattern...</option>
              <option value="variable">Variable-speed system running all day</option>
              <option value="constant">Single-stage running constantly</option>
              <option value="never-cools">Runs constantly, never cools to setpoint</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Current DFW Outside Temperature</label>
            <select value={temp} onChange={e => setTemp(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select temperature...</option>
              <option value="100plus">100°F or above</option>
              <option value="under100">Below 100°F</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get Assessment
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk DFW HVAC Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Local, licensed, performance-rated. Get matched in minutes.</div>
        </div>
      </div>
    </div>
  );
}
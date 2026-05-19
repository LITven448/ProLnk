import { useState } from 'react';

export default function DFWHVACOutdoorAmbientGuide2026() {
  const [temp, setTemp] = useState(100);
  const [age, setAge] = useState(5);

  const getExpectation = () => {
    if (temp >= 115) return { label: '🚨 High-Pressure Lockout Risk', detail: 'Standard AC systems are rated to 115°F outdoor ambient. At or above this threshold, high-pressure safeties may trip and shut the system down. Call a pro immediately.' };
    if (temp >= 108) return { label: '⚠️ Severe Strain Zone', detail: 'Head pressure spikes dramatically above 108°F. Older systems (10+ years) may cycle off on high-pressure limits. Capacity drops 15–25%. Expect indoor temps to lag.' };
    if (temp >= 100) {
      if (age >= 10) return { label: '🟡 Reduced Efficiency (Aging System)', detail: 'DFW peaks at 100–105°F regularly. Your aging system will struggle — reduced capacity, higher energy draw, potential refrigerant issues. Consider replacement before next summer.' };
      return { label: '🟢 Manageable — Monitor Closely', detail: 'Modern systems handle 100–105°F but efficiency drops. Variable-speed compressors adapt best. Keep filters clean and coils clear for best performance.' };
    }
    return { label: '✅ Normal Operating Range', detail: 'Below 100°F outdoor ambient, most systems run near rated capacity. Routine maintenance keeps efficiency high.' };
  };

  const exp = getExpectation();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>❄️ DFW AC Outdoor Ambient Temperature Limits</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>How DFW summer heat pushes your AC system to its design limits — and what to expect.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 Key Facts</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Standard AC systems rated to <strong style={{ color: '#fff' }}>115°F outdoor ambient</strong></li>
            <li>DFW peak days reach <strong style={{ color: '#fff' }}>100–105°F</strong> regularly in July/August</li>
            <li>High ambient temp = high head pressure = reduced cooling capacity</li>
            <li>At 110°F+, capacity can drop <strong style={{ color: '#fff' }}>15–20%</strong> vs rated output</li>
            <li>Variable-speed systems modulate better under extreme heat</li>
            <li>High-pressure lockout safety trips protect the compressor</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌡️ Performance Estimator</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>
              Outdoor Temperature (°F): <strong style={{ color: '#F5E642' }}>{temp}°F</strong>
            </label>
            <input type="range" min={85} max={120} value={temp} onChange={e => setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
              <span>85°F</span><span>120°F</span>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>
              System Age (years): <strong style={{ color: '#F5E642' }}>{age} yrs</strong>
            </label>
            <input type="range" min={1} max={20} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
              <span>1 yr</span><span>20 yrs</span>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{exp.label}</div>
            <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{exp.detail}</div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔧 ProLnk DFW HVAC Pros</div>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            ProLnk Charter HVAC technicians in DFW are trained on high-ambient performance issues. Get a verified pro dispatched before peak season hits.
          </p>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}

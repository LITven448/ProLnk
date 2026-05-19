import { useState } from 'react';

const comparison = [
  { aspect: 'Installation', wireless: 'DIY-friendly, no new wiring', wired: 'Requires low-voltage wire runs' },
  { aspect: 'Reliability', wireless: 'Depends on WiFi — vulnerable to DFW storm outages', wired: 'Works without internet, storm-resilient' },
  { aspect: 'Best DFW use', wireless: 'Mild upgrade, modern systems, single zone', wired: 'Whole-home zoning, older DFW homes' },
  { aspect: 'Cost', wireless: '$150–$350 installed', wired: '$300–$600+ with labor' },
  { aspect: 'DFW storm risk', wireless: 'Medium — WiFi outages during severe weather', wired: 'Low — operates offline' },
];

const scenarios = [
  { label: 'Single-zone central AC, no zoning needs', rec: 'Wireless', reason: 'Smart thermostat handles DFW heat beautifully. Easy install.' },
  { label: 'Multi-zone home, damper system', rec: 'Wired', reason: 'Damper controllers need direct wired communication for reliability.' },
  { label: 'Frequent DFW thunderstorm power/WiFi outages', rec: 'Wired', reason: 'Wired controls keep running through WiFi outages.' },
  { label: 'Rental property, remote monitoring priority', rec: 'Wireless', reason: 'App-based alerts and remote control are worth it for landlords.' },
  { label: 'New construction or major renovation', rec: 'Wired', reason: 'Wire while walls are open — best long-term reliability.' },
];

export default function DFWHVACWirelessVsWired() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<{ rec: string; reason: string } | null>(null);

  function evaluate() {
    const matched = scenarios.find(s => s.label === situation);
    if (matched) setResult({ rec: matched.rec, reason: matched.reason });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📡 Wireless vs Wired HVAC Controls — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>When wireless smart thermostats are the right call vs when wired control systems win — especially in DFW storm season.</p>

        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Aspect', '📡 Wireless', '🔌 Wired'].map(h => (
                  <th key={h} style={{ background: '#0f2035', color: '#F5E642', padding: '12px 16px', textAlign: 'left', fontSize: 14 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.aspect} style={{ background: i % 2 === 0 ? '#0A1628′ : '#0f2035' }}>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>{row.aspect}</td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1', fontSize: 13 }}>{row.wireless}</td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1', fontSize: 13 }}>{row.wired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 24 }}>🏡 Wireless or Wired for Your DFW Home?</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your DFW situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select situation…</option>
              {scenarios.map(s => <option key={s.label}>{s.label}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>✅ Go {result.rec}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12 }}>{result.reason}</div>
              <div style={{ color: '#60a5fa', fontSize: 13 }}>ProLnk connects you with DFW HVAC techs who specialize in {result.rec.toLowerCase()} control installation.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWHVACNewTechGuide2026() {
  const [systemAge, setSystemAge] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [result, setResult] = useState('');

  const techData: Record<string, Record<string, string>> = {
    '0-5': {
      small: '✅ Your newer system is ready for a communicating thermostat upgrade (Trane ComfortLink II or Carrier Infinity). Add a smart IAQ sensor to unlock predictive maintenance alerts.',
      medium: '✅ Pair a DC brushless blower upgrade with an Ecobee or Nest for zone-level optimization. AI diagnostics via Trane Home app can flag efficiency drops before failure.',
      large: '✅ Variable refrigerant flow (VRF) zoning is your next step. DFW multi-zone homes benefit from inverter-driven scroll compressors — 40% more efficient than single-stage.',
    },
    '6-15': {
      small: '⚡ Retrofit an inverter-driven compressor modulator to your existing system. Add a Carrier Infinity communicating stat — reduces DFW peak-hour cycling by 35%.',
      medium: '⚡ Replace the condenser fan motor with a DC brushless ECM motor. Pair with AI maintenance monitoring via Google Nest Pro integration to extend system life 5+ years.',
      large: '⚡ Full communicating system conversion: Trane XR15 + ComfortLink II + smart zone dampers. DFW homes this size see -320/mo savings in peak summer billing.',
    },
    '16+': {
      small: '🔄 Full system replacement recommended. Inverter-driven mini-split (Mitsubishi MXZ series) sized for DFW climate zones 2-3. 25 SEER2 rating + AI fault detection built-in.',
      medium: '🔄 Two-stage or variable-capacity gas furnace (Lennox SLP99V) + 18+ SEER2 variable compressor. DFW humidity control requires variable capacity — single-stage cannot dehumidify properly.',
      large: '🔄 Geothermal heat pump feasibility study first. DFW soil temps 65-68°F year-round = ideal for ground-source efficiency. 400-600% COP vs 200-300% for air-source.',
    },
  };

  const generate = () => {
    if (!systemAge || !homeSize) return;
    setResult(techData[systemAge]?.[homeSize] || '');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW HVAC New Technology Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Emerging HVAC tech arriving in Dallas-Fort Worth homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔄', title: 'Inverter Compressors', desc: 'Variable-capacity units match exact load — no on/off cycling. 30-50% more efficient in DFW summer heat.' },
            { icon: '⚙️', title: 'DC Brushless Motors', desc: 'ECM blower motors run at precise speeds. Quieter, 75% less energy than PSC motors in older DFW systems.' },
            { icon: '📡', title: 'Communicating Stats', desc: 'Trane ComfortLink II and Carrier Infinity exchange real-time data with every component for self-optimization.' },
            { icon: '🤖', title: 'AI Predictive Maintenance', desc: 'Sensors detect refrigerant drift, coil fouling, and bearing wear weeks before failure. DFW contractors alerted instantly.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔍 Find Your DFW Tech Upgrade Path</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Current System Age</label>
              <select value={systemAge} onChange={(e) => setSystemAge(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
                <option value=''>Select age...</option>
                <option value='0-5'>0–5 years (newer system)</option>
                <option value='6-15'>6–15 years (mid-life)</option>
                <option value='16+'>16+ years (aging system)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={(e) => setHomeSize(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
                <option value=''>Select size...</option>
                <option value='small'>Under 2,000 sq ft</option>
                <option value='medium'>2,000–3,500 sq ft</option>
                <option value='large'>3,500+ sq ft</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Get My Tech Upgrade Path ⚡</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>{result}</div>}
        </div>

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk connects you with DFW HVAC tech specialists</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Get quotes from certified inverter and communicating system installers in your DFW service area</div>
        </div>
      </div>
    </div>
  );
}
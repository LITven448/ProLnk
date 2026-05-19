import { useState } from 'react';

export default function DFWSmartThermostatGuide2026() {
  const [sqft, setSqft] = useState(2200);
  const [zones, setZones] = useState(1);
  const [result, setResult] = useState('');

  const recommend = () => {
    if (zones >= 3 || sqft >= 3500) {
      setResult('🏆 Ecobee SmartThermostat Premium recommended. Best multi-zone support with SmartSensor remote sensors ($79 each). Handles large homes with uneven cooling. ERCOT demand response enrolled automatically. Est. annual savings: $180-280.');
    } else if (sqft >= 2000) {
      setResult('✅ Nest Learning Thermostat or Ecobee SmartThermostat both excellent. Nest learns your schedule in 1 week. Ecobee pairs with Alexa/Google natively. Both support ERCOT Rush Hour Rewards — earn $20-60/summer. Est. annual savings: $120-200.');
    } else {
      setResult('💡 Honeywell Home T6 Pro or Google Nest Thermostat (budget). Simple, reliable, app-controlled. Supports ERCOT demand response. Perfect for smaller DFW homes. Est. annual savings: $80-140. Install yourself in 30 minutes.');
    }
  };

  const erTips = [
    { icon: '⚡', title: 'ERCOT Rush Hour Rewards', body: 'Enrolled through Oncor or TXU Energy. Pre-cool home before event, earn $1-3/kWh avoided. Avg DFW household earns $30-80/summer automatically.' },
    { icon: '🌡️', title: 'DFW Schedule Tips', body: 'Set 78°F when away, 74°F when home. Pre-cool to 72°F by 3pm before peak 4-7pm rates. Smart thermostats automate this — no manual adjustments needed.' },
    { icon: '🏠', title: 'Smart Zoning', body: 'Multi-zone systems with dampers + smart vents reduce wasted cooling by 20-30% in large DFW homes. Ecobee SmartSensors enable room-by-room control without full zoning install.' },
    { icon: '🔗', title: 'ProLnk HVAC Monitoring', body: 'Connect smart thermostat to ProLnk for predictive maintenance alerts. System usage anomalies trigger automatic quote requests from nearby HVAC pros.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🌡️ DFW SMART HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Smart Thermostat Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Nest vs Ecobee vs Honeywell — plus ERCOT demand response programs that pay you</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {erTips.map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { brand: '🟢 Nest', model: 'Learning Thermostat', price: '$249', best: 'Self-learning, Apple/Google' },
              { brand: '🔵 Ecobee', model: 'SmartThermostat Premium', price: '$249', best: 'Multi-sensor, Alexa built-in' },
              { brand: '🟡 Honeywell', model: 'T6 Pro / T9', price: '$89-199', best: 'Reliable, easy install' },
            ].map(b => (
              <div key={b.brand} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{b.brand}</div>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700 }}>{b.model}</div>
                <div style={{ fontSize: 18, fontWeight: 800, margin: '6px 0′ }}>{b.price}</div>
                <div style={{ fontSize: 11, color: '#94a3b8′ }}>{b.best}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Smart Thermostat Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home size: <strong style={{ color: '#F5E642' }}>{sqft.toLocaleString()} sq ft</strong></label>
            <input type="range" min={800} max={6000} step={100} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Number of floors/zones: <strong style={{ color: '#F5E642' }}>{zones}</strong></label>
            <input type="range" min={1} max={4} value={zones} onChange={(e) => setZones(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Recommendation
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>ProLnk-verified electricians install smart thermostats for $89-129 and handle ERCOT demand response enrollment at no extra charge.</div>
        </div>
      </div>
    </div>
  );
}

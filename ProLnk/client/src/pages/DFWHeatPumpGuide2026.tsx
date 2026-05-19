import { useState } from 'react';

export default function DFWHeatPumpGuide2026() {
  const [systemType, setSystemType] = useState('gas');
  const [sqft, setSqft] = useState(2000);
  const [result, setResult] = useState('');

  const assess = () => {
    const credit = 2000;
    if (systemType === 'gas') {
      const savings = Math.round(sqft * 0.18);
      setResult(`✅ Dual-fuel heat pump recommended for DFW. Keep existing gas furnace for rare hard freezes (<30°F), heat pump handles everything else. Est. annual savings: $${savings}. Federal tax credit: $${credit.toLocaleString()}. Payback: ~6 years.`);
    } else if (systemType === 'electric') {
      const savings = Math.round(sqft * 0.22);
      setResult(`🔥 Excellent heat pump candidate. Replace resistance heating with inverter-driven heat pump — 3x more efficient. Est. annual savings: $${savings}. Federal tax credit: $${credit.toLocaleString()}. Payback: ~5 years.`);
    } else {
      setResult('⚠️ Heat pump replacement with newer variable-speed model can improve efficiency 25-35%. DFW climate is ideal — heat pumps work best in mild winter zones like North Texas.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🌿 DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Heat Pump Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>30% federal tax credit + 5-8 year payback — is a heat pump right for your DFW home?</p>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🌡️ Why Heat Pumps Work in DFW Now</div>
          <div style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>Modern cold-climate heat pumps operate efficiently down to <strong style={{ color: '#F5E642′ }}>-13°F</strong>. DFW rarely drops below 20°F. Dual-fuel systems pair a heat pump with existing gas backup — giving you heat pump efficiency 95% of the year with gas reliability during rare ice storms.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💰', title: 'Federal Tax Credit', body: '30% tax credit (up to $2,000/year) through 2032 under Inflation Reduction Act. On a $8,000 install, that is $2,000 back at tax time. Income not required.' },
            { icon: '🔄', title: 'Dual-Fuel Systems', body: 'Gas furnace + heat pump: heat pump runs when temps are 35°F+, gas kicks in below. Perfect for DFW where hard freezes are rare but do happen (Uri 2021).' },
            { icon: '📊', title: 'DFW Payback Math', body: 'Typical 2,000 sq ft DFW home: $180-280/year heating savings, $120/year cooling savings vs. older system. Total payback 5-8 years pre-credit.' },
            { icon: '⚡', title: 'Efficiency Advantage', body: 'Heat pumps move heat rather than create it: 300% efficient vs. 95% for best gas furnaces. In DFW mild winters, COP (efficiency) often reaches 3.5-4.5.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Heat Pump Feasibility Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Current system type:</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{v:'gas',l:'Gas Furnace + AC'},{v:'electric',l:'Electric + AC'},{v:'heatpump',l:'Older Heat Pump'}].map(opt => (
                <button key={opt.v} onClick={() => setSystemType(opt.v)}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: systemType===opt.v?'2px solid #F5E642':'1px solid #1e3a5f', background: systemType===opt.v?'#F5E642':'#0A1628', color: systemType===opt.v?'#0A1628':'#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home size: <strong style={{ color: '#F5E642' }}>{sqft.toLocaleString()} sq ft</strong></label>
          <input type="range" min={800} max={5000} step={100} value={sqft} onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 16, accentColor: '#F5E642′ }} />
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Assess Feasibility
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>ProLnk connects you with heat pump specialists certified in Mitsubishi, Bosch, and Carrier systems — all eligible for the 30% federal tax credit through 2032.</div>
        </div>
      </div>
    </div>
  );
}

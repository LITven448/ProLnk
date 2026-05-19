import { useState } from 'react';

const section = {
  background: '#0F1E35',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '16px',
};

const label = {
  color: '#A0AEC0',
  fontSize: '13px',
  marginBottom: '4px',
};

const value = {
  color: '#FFFFFF',
  fontSize: '15px',
  marginBottom: '12px',
};

const tag = {
  display: 'inline-block',
  background: '#1A2F50',
  color: '#F5E642',
  borderRadius: '6px',
  padding: '3px 10px',
  fontSize: '12px',
  marginRight: '6px',
  marginBottom: '6px',
};

export default function DFWElectricityBillGuide() {
  const [kwh, setKwh] = useState(1200);
  const [rate, setRate] = useState(12);
  const [result, setResult] = useState<null | {
    current: number;
    fixed: number;
    variable: number;
    tou: number;
    best: string;
  }>(null);

  function calculate() {
    const current = kwh * (rate / 100) * 12;
    const fixed = kwh * 0.099 * 12;
    const variable = kwh * 0.108 * 12;
    const tou = kwh * 0.089 * 12;
    let best = 'Time-of-Use';
    if (kwh < 800) best = 'Fixed Rate';
    else if (kwh > 1500) best = 'Time-of-Use';
    setResult({ current, fixed, variable, tou, best });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>⚡ DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>Understanding Your DFW Electricity Bill</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>Texas has a deregulated electricity market. Your bill has two parts — and only one of them you can shop around for.</p>

        <div style={section}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>📦 TDU Charges (Not Negotiable)</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>Transmission & Distribution Utility charges pay for the poles, wires, and meter. In most of DFW, your TDU is <strong style={{ color: '#FFF' }}>Oncor Electric Delivery</strong>.</p>
          <div style={tag}>Fixed monthly: ~$3.42</div>
          <div style={tag}>Per kWh: ~$0.037</div>
          <div style={tag}>Same regardless of REP</div>
          <p style={{ color: '#718096', fontSize: '13px', marginTop: '10px' }}>At 1,000 kWh/mo, Oncor charges add ~$40/mo before energy costs.</p>
        </div>

        <div style={section}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>🛒 Energy Charges (Shop Around)</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>Your Retail Electric Provider (REP) sets the energy rate. In DFW you can choose from 50+ REPs on <strong style={{ color: '#FFF' }}>PowerToChoose.org</strong>.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { name: '🔒 Fixed Rate', desc: 'Locked price for 6–24 months. Best for budgeting.', range: '9–12¢/kWh' },
              { name: '📈 Variable Rate', desc: 'Follows wholesale market. Can spike in summer.', range: '7–15¢/kWh' },
              { name: '⏰ Time-of-Use', desc: 'Cheap off-peak (night/weekends), expensive peak.', range: '5–18¢/kWh' },
            ].map(p => (
              <div key={p.name} style={{ background: '#1A2F50', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '14px' }}>{p.name}</div>
                <div style={{ color: '#A0AEC0', fontSize: '12px', marginBottom: '8px' }}>{p.desc}</div>
                <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: 700 }}>{p.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={section}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 DFW Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={label}>Monthly Usage (kWh)</div>
              <input type="number" value={kwh} onChange={e => setKwh(Number(e.target.value))}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
              <div style={{ color: '#718096', fontSize: '11px', marginTop: '4px' }}>DFW avg: 1,200 kWh/mo</div>
            </div>
            <div>
              <div style={label}>Current Rate (¢/kWh)</div>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
              <div style={{ color: '#718096', fontSize: '11px', marginTop: '4px' }}>Check your current bill</div>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Calculate Annual Savings
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '15px', marginBottom: '14px' }}>📊 Annual Cost by Plan Type</div>
              {[
                { name: 'Your Current Plan', cost: result.current, highlight: false },
                { name: 'Fixed Rate (9.9¢)', cost: result.fixed, highlight: false },
                { name: 'Variable Rate (10.8¢)', cost: result.variable, highlight: false },
                { name: 'Time-of-Use (8.9¢)', cost: result.tou, highlight: true },
              ].map(r => (
                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', marginBottom: '8px', background: r.highlight ? '#1A3A20′ : '#0F1E35', border: r.highlight ? '1px solid #48BB78' : '1px solid transparent' }}>
                  <span style={{ color: r.highlight ? '#68D391′ : '#CBD5E0', fontSize: '14px' }}>{r.highlight ? '✅ ' : ''}{r.name}</span>
                  <span style={{ color: '#FFF', fontWeight: 700 }}>${r.cost.toFixed(0)}/yr</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', background: '#1A2F50', borderRadius: '8px', padding: '12px' }}>
                <span style={{ color: '#A0AEC0', fontSize: '13px' }}>Best plan for your usage: </span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.best}</span>
                <span style={{ color: '#A0AEC0', fontSize: '13px' }}> — estimated savings vs current: </span>
                <span style={{ color: '#68D391', fontWeight: 700 }}>${Math.abs(result.current - Math.min(result.fixed, result.tou, result.variable)).toFixed(0)}/yr</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ ...section, borderLeft: '3px solid #F5E642′ }}>
          <div style={{ fontSize: '14px', color: '#CBD5E0′ }}>💡 <strong style={{ color: '#F5E642' }}>Pro tip:</strong> Always compare "Energy Charge Only" rates on PowerToChoose.org — the advertised rate often includes TDU pass-through fees that make plans look cheaper than they are.</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const plans = [
  { type: 'Fixed Rate', icon: '🔒', desc: 'Locked rate for contract term. Best for budget certainty.', best: 'stability' },
  { type: 'Variable Rate', icon: '📈', desc: 'Rate fluctuates monthly with market. Risky in winter.', best: 'risk' },
  { type: 'Indexed Plan', icon: '⚠️', desc: 'Tied to natural gas or ERCOT index. Dangerous in winter storms.', best: 'risk' },
  { type: 'Green Plan', icon: '🌱', desc: '100% renewable energy credits. Usually 1-2¢ more per kWh.', best: 'eco' },
];

const usage = [
  { label: 'Low (< 800 kWh/mo)', value: 'low', rec: 'Fixed Rate', tip: 'Lock in a low rate — you use little enough that predictability matters most.' },
  { label: 'Medium (800–1500 kWh/mo)', value: 'med', rec: 'Fixed Rate or Green Plan', tip: 'Average DFW usage. Fixed rate gives stability; green plan is worth the small premium.' },
  { label: 'High (> 1500 kWh/mo)', value: 'high', rec: 'Fixed Rate (long-term)', tip: 'High usage means rate swings hit hard. Lock in 12–24 months when rates are low.' },
  { label: 'Unpredictable', value: 'flex', rec: 'Month-to-Month Fixed', tip: 'Avoid variable or indexed. Get a short-term fixed so you can switch easily.' },
];

export default function DFWElectricityPlanGuide2026() {
  const [selected, setSelected] = useState('');
  const result = usage.find(u => u.value === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Electricity Plan Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Texas deregulated market — choose your plan on PowerToChoose.org</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ background: '#1e3a5f', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>Avg rate: $0.12–0.16/kWh</span>
            <span style={{ background: '#1e3a5f', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>350+ DFW providers</span>
            <span style={{ background: '#1e3a5f', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>Compare at PowerToChoose.org</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {plans.map(p => (
            <div key={p.type} style={{ background: '#112240', borderRadius: 12, padding: '16px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28 }}>{p.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 6 }}>{p.type}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>🔍 Plan Recommender</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>What's your monthly usage pattern?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {usage.map(u => (
              <button key={u.value} onClick={() => setSelected(u.value)}
                style={{ background: selected === u.value ? '#F5E642′ : '#1e3a5f', color: selected === u.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: selected === u.value ? 700 : 400 }}>
                {u.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>Recommended: {result.rec}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, marginTop: 6 }}>{result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 Contract Length Tips</h2>
          {[
            { term: '3–6 months', use: 'Bridge contract while you shop. OK if rates are high and dropping.' },
            { term: '12 months', use: 'Standard DFW choice. Good balance of flexibility and stability.' },
            { term: '24 months', use: 'Best when rates are at historic lows. Locks out inflation.' },
            { term: 'Month-to-month', use: 'Maximum flexibility. Usually highest rate. Use only temporarily.' },
          ].map(c => (
            <div key={c.term} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{c.term}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{c.use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
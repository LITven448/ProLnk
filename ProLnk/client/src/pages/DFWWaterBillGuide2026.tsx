import { useState } from 'react';

export default function DFWWaterBillGuide2026() {
  const [household, setHousehold] = useState('');
  const [bill, setBill] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    const people = parseInt(household);
    const amount = parseFloat(bill);
    if (!people || !amount) { setResult('Enter household size and bill amount.'); return; }
    const expectedBase = people * 18;
    const expectedSummer = expectedBase + 200;
    const savings = Math.round(amount * 0.30);
    let assessment = amount <= expectedBase ? '✅ Your usage looks efficient for your household size.' : amount <= expectedSummer ? '⚠️ Moderate usage — likely summer irrigation adding cost.' : '🚨 High usage detected — audit irrigation and check for leaks.';
    setResult(`${assessment} Smart irrigation could save ~$${savings}/mo. Expected base: $${expectedBase}/mo.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>💧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Water Bill Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Understand your DFW water bill, compare usage, and find savings opportunities.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '💵', label: 'Avg DFW Water Bill', value: '$85/mo' },
            { icon: '☀️', label: 'Summer Irrigation Add', value: '$150–$300/mo' },
            { icon: '📊', label: 'Pricing Model', value: 'Tiered rates' },
            { icon: '💡', label: 'Smart Irrigation Savings', value: 'Up to 30%' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 How to Audit Your Water Use</h2>
          {[
            { step: '1', action: 'Check meter at night', detail: 'No usage = no leak; any movement = active leak' },
            { step: '2', action: 'Review irrigation runtime', detail: 'DFW needs ~1 inch/week; adjust controller seasonally' },
            { step: '3', action: 'Inspect heads monthly', detail: 'Broken heads waste 3–10 gal/min while running' },
            { step: '4', action: 'Upgrade to smart controller', detail: 'Weather-based scheduling saves 30% on average' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #334155′ : ’none' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.step}</div>
              <div><div style={{ fontWeight: 600 }}>{r.action}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{r.detail}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 Usage Assessment</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <input value={household} onChange={e => setHousehold(e.target.value)} placeholder="Household size (people)" style={{ flex: 1, minWidth: 160, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <input value={bill} onChange={e => setBill(e.target.value)} placeholder="Monthly bill ($)" style={{ flex: 1, minWidth: 140, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <button onClick={assess} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Assess</button>
          </div>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>Bill averages vary by city utility. Contact your local DFW water provider for tier rate details.</p>
      </div>
    </div>
  );
}

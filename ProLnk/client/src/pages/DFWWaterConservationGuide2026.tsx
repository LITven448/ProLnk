import { useState } from 'react';

export default function DFWWaterConservationGuide2026() {
  const [features, setFeatures] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const options = [
    { id: 'irrigation', label: '🌱 Irrigation System', savings: 30 },
    { id: 'pool', label: '🏊 Pool', savings: 25 },
    { id: 'lawn', label: '🌿 Large Lawn', savings: 20 },
    { id: 'fixtures', label: '🚿 Old Fixtures', savings: 20 },
    { id: 'dishwasher', label: '🍽️ Old Dishwasher', savings: 10 },
  ];

  function toggle(id: string) {
    setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    setResult('');
  }

  function analyze() {
    if (features.length === 0) { setResult('Select at least one water feature.'); return; }
    const selected = options.filter(o => features.includes(o.id));
    const topSaving = selected.sort((a, b) => b.savings - a.savings)[0];
    const totalPct = Math.min(selected.reduce((sum, o) => sum + o.savings, 0), 65);
    setResult(`Top opportunity: ${topSaving.label} (up to ${topSaving.savings}% savings). Combined potential: ${totalPct}% reduction. Check your city's current restriction stage before scheduling irrigation runs.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>♻️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Water Conservation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW cities enforce Stage 1–3 water restrictions. Know your options and reduce usage before restrictions hit.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🚦', label: 'Restriction Stages', value: 'Stage 1–3′ },
            { icon: '🚿', label: 'Low-Flow Fixture Savings', value: '20–30%' },
            { icon: '🌱', label: 'Smart Irrigation Savings', value: 'Up to 30%' },
            { icon: '🏊', label: 'Pool Cover Evap Reduction', value: '90%' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🚦 DFW Water Restriction Stages</h2>
          {[
            { stage: 'Stage 1', trigger: 'Reservoir at 50%', rule: '2 days/week irrigation', color: '#22c55e' },
            { stage: 'Stage 2', trigger: 'Reservoir at 40%', rule: '1 day/week irrigation', color: '#f59e0b' },
            { stage: 'Stage 3', trigger: 'Reservoir at 30%', rule: 'No outdoor irrigation', color: '#ef4444′ },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #334155′ : ’none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: r.color }}></div>
                <div><div style={{ fontWeight: 600 }}>{r.stage}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{r.trigger}</div></div>
              </div>
              <div style={{ color: r.color, fontSize: 13, fontWeight: 600 }}>{r.rule}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 Conservation Opportunity Ranker</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select all water features at your home:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {options.map(o => (
              <button key={o.id} onClick={() => toggle(o.id)} style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${features.includes(o.id) ? '#F5E642' : '#475569'}`, background: features.includes(o.id) ? '#F5E642′ : '#0f172a', color: features.includes(o.id) ? '#0A1628' : '#fff', fontWeight: features.includes(o.id) ? 700 : 400, cursor: ’pointer' }}>{o.label}</button>
            ))}
          </div>
          <button onClick={analyze} style={{ padding: '10px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Rank Opportunities</button>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14, marginTop: 12 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>Check your city's water authority website for current restriction stage and rebate programs.</p>
      </div>
    </div>
  );
}

import { useState } from 'react';

const scenarios = [
  { zestimate: 380000, actual: 412000, label: 'Foundation repair completed (undisclosed)', trust: false },
  { zestimate: 455000, actual: 428000, label: 'Busy street, school zone noise', trust: false },
  { zestimate: 390000, actual: 389500, label: 'Stable neighborhood, standard finishes', trust: true },
  { zestimate: 510000, actual: 548000, label: 'Full kitchen + bath remodel past 12 months', trust: false },
  { zestimate: 340000, actual: 305000, label: 'HOA issues, deferred maintenance', trust: false },
];

export default function DFWZillowEstimateGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  const scenario = selected !== null ? scenarios[selected] : null;
  const diff = scenario ? scenario.actual - scenario.zestimate : 0;
  const pct = scenario ? ((Math.abs(diff) / scenario.zestimate) * 100).toFixed(1) : '0';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔎 DFW Zillow Zestimate Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Zillow's median error rate in DFW is <strong style={{ color: '#F5E642' }}>6.9%</strong> — that's off by $26K on an average $380K home.
          DFW comps move fast, recent renovations aren't captured, and foundation repairs rarely show in public records.
          Here's when to trust it and when to ignore it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚡', label: 'DFW Comps Move', value: 'Every 30 days', sub: 'Zillow lags 60-90 days' },
            { icon: '🔨', label: 'Reno Blindspot', value: '~40% of homes', sub: 'Unpermitted work invisible' },
            { icon: '🏗️', label: 'Foundation Discount', value: '$30K-50K', sub: 'Not reflected in Zestimate' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0f2040', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🧪 Zestimate vs Reality Simulator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Pick a scenario to see the gap:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {scenarios.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1a3a5c' : '#0d2035',
                  border: selected === i ? '2px solid #F5E642' : '2px solid transparent',
                  color: '#fff', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', textAlign: 'left', fontSize: 13
                }}
              >{s.label}</button>
            ))}
          </div>
          {scenario && (
            <div style={{ background: '#1a3a5c', borderRadius: 10, padding: 16, borderLeft: `4px solid ${scenario.trust ? '#22c55e' : '#ef4444'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div><div style={{ fontSize: 12, color: '#94a3b8' }}>Zestimate</div><div style={{ fontSize: 22, fontWeight: 800 }}>${scenario.zestimate.toLocaleString()}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#94a3b8' }}>Actual Value</div><div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>${scenario.actual.toLocaleString()}</div></div>
              </div>
              <div style={{ color: diff > 0 ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: 14 }}>
                {diff > 0 ? '+' : ''}${diff.toLocaleString()} ({pct}% off) — {scenario.trust ? '✅ Trust it' : '⚠️ Do not rely on it'}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>✅ When to Trust the Zestimate</h2>
          {['Stable neighborhood with no recent major changes', 'Home hasn\’t been renovated in 5+ years', 'Multiple recent comps within 0.5 miles', 'No foundation, roof, or HOA issues'].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #22c55e' }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📊 Get a ProLnk Precision Estimate</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>Uses live DFW MLS data — not a 90-day lag</div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const homeAges = [
  { label: 'Pre-1980 (45+ years)', risk: 'Critical', color: '#ef4444', sensor: 'Whole-home shutoff (Flo by Moen) + 4 under-sink sensors', note: 'Cast iron & galvanized pipes near end-of-life — slab leak probability high' },
  { label: '1980–2000 (25–45 years)', risk: 'High', color: '#f97316', sensor: 'Whole-home shutoff + 2 under-sink sensors + water meter reader', note: 'Polybutylene pipe risk zone — recall-era plumbing common in DFW suburbs' },
  { label: '2000–2015 (10–25 years)', risk: 'Moderate', color: '#eab308', sensor: 'Phyn Plus smart water meter + 2 under-sink sensors', note: 'CPVC & PEX era — less corrosion but fittings begin to fatigue' },
  { label: '2015–Present (under 10 years)', risk: 'Low', color: '#22c55e', sensor: 'Smart water meter reader + 1 under-sink sensor near water heater', note: 'Modern PEX-A — still worth monitoring; DFW soil movement stresses connections' },
];

export default function DFWWaterLeakDetection2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const rec = selected !== null ? homeAges[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Water Leak Detection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Stop slab leaks before they cost you thousands</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Avg slab leak repair', value: '$3,000–$8,000', icon: '💸' },
            { label: 'Water damage avg claim', value: '$12,400', icon: '🏚️' },
            { label: 'Sensor system cost', value: '$300–$800', icon: '📡' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🔍 Top Whole-Home Shutoff Systems</h2>
          {[
            { name: 'Flo by Moen', price: '$499', rating: '⭐⭐⭐⭐⭐', note: 'Auto-shutoff + leak learning, best for DFW slab homes' },
            { name: 'Phyn Plus', price: '$399', rating: '⭐⭐⭐⭐', note: 'Smart water meter reads + burst detection, Wi-Fi only' },
            { name: 'Flume 2', price: '$199', rating: '⭐⭐⭐⭐', note: 'Non-invasive meter reader — no plumber install required' },
          ].map(d => (
            <div key={d.name} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 10, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#cbd5e1′ }}>{d.name}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{d.price}</span>
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{d.rating} · {d.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏡 How old is your DFW home?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeAges.map((h, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label} — <span style={{ color: selected === i ? '#0A1628′ : h.color }}>{h.risk} Risk</span>
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${rec.color}` }}>
              <div style={{ color: rec.color, fontWeight: 700, marginBottom: 6 }}>Risk Level: {rec.risk}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Recommended: {rec.sensor}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>💡 {rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with licensed DFW plumbers who install leak detection systems</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>Vetted pros, transparent pricing — get matched in minutes</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const homeTypes = [
  { label: 'Single-Story (under 1,800 sq ft)', cdds: 3500, hours: 2200, note: 'System runs ~6 months at near-full load. Filter every 30 days.' },
  { label: 'Two-Story (1,800–3,500 sq ft)', cdds: 3750, hours: 2600, note: 'Upper zone works hardest. Dual-zone adds 3–5 yrs equipment life.' },
  { label: 'Large Home (over 3,500 sq ft)', cdds: 4000, hours: 3100, note: 'Multi-unit system. Each unit should be serviced annually.' },
  { label: 'Older Home (pre-1990, poor insulation)', cdds: 4000, hours: 3400, note: 'Insulation upgrades reduce run hours 20–30% and extend system life.' },
  { label: 'New Build (2015+, Energy Star)', cdds: 3500, hours: 1900, note: 'Tight envelope cuts run hours. Still service annually — DFW dust is relentless.' },
];

export default function DFWHVACCoolSeasonGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>❄️ DFW HVAC Cooling Season Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          DFW runs AC from <strong style={{ color: '#F5E642' }}>March through November</strong> — roughly 9 months per year.
          That's 2–3× more run hours than northern US markets, which is why DFW systems wear out faster and need more frequent maintenance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🌡️', label: 'Cooling Season', value: 'Mar – Nov (9 months)' },
            { icon: '📊', label: 'Cooling Degree Days', value: '3,500 – 4,000 CDDs/yr' },
            { icon: '⏱️', label: 'Avg Annual Run Hours', value: '2,000 – 3,400 hrs' },
            { icon: '🔧', label: 'Replacement Interval', value: '12–15 yrs (vs 20 up north)' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏠 Your Home Type → Cooling Season Impact</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {homeTypes.map((h, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{h.label}</div>
              {selected === i && (
                <div style={{ marginTop: 10, color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
                  <div>📊 <strong style={{ color: '#F5E642' }}>CDDs:</strong> {h.cdds.toLocaleString()} per year</div>
                  <div>⏱️ <strong style={{ color: '#F5E642' }}>Est. run hours:</strong> {h.hours.toLocaleString()} per year</div>
                  <div style={{ marginTop: 6 }}>💡 {h.note}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📅 DFW Maintenance Schedule</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>🔧 <strong style={{ color: '#fff' }}>February:</strong> Pre-season tune-up before March heat arrives</div>
            <div>🧹 <strong style={{ color: '#fff' }}>June:</strong> Mid-season coil cleaning + refrigerant check</div>
            <div>🍂 <strong style={{ color: '#fff' }}>November:</strong> Post-season inspection before winter</div>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW HVAC Cooling Season Guide 2026 · Data: NOAA, ACCA Manual J
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const hvacAges = [
  { label: 'Under 5 years', risk: 'Low', color: '#22c55e', roiYears: 8, rec: 'Smart thermostat only', sensors: 'Filter life sensor + thermostat efficiency tracking', note: 'Modern units rarely fail early — focus on efficiency monitoring' },
  { label: '5–10 years', risk: 'Moderate', color: '#eab308', roiYears: 4, rec: 'Smart thermostat + efficiency sensor', sensors: 'Ecobee + Sense energy monitor for HVAC circuit', note: 'Watch for refrigerant decline signals — efficiency drop >15% is a red flag' },
  { label: '10–15 years', risk: 'High', color: '#f97316', roiYears: 2, rec: 'Full monitoring suite', sensors: 'Refrigerant sensor + airflow monitor + filter sensor + thermostat', note: 'Average DFW HVAC replacement cost $7,000–$12,000 — sensors pay off quickly' },
  { label: 'Over 15 years', risk: 'Critical', color: '#ef4444', roiYears: 1, rec: 'Immediate sensor install + budget for replacement', sensors: 'Full suite + ProLnk HVAC tech match', note: 'DFW summer peaks at 110°F — a 15+ year unit is a failure risk during heat waves' },
];

export default function DFWHVACMonitoring2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const rec = selected !== null ? hvacAges[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC Monitoring Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Detect issues before your AC dies during a 108°F DFW summer</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '💸', label: 'HVAC replacement cost', value: '$7K–$12K', sub: 'DFW avg 2026' },
            { icon: '🌡️', label: 'DFW summer peak', value: '108–112°F', sub: 'Grid stress period' },
            { icon: '📉', label: 'Efficiency decline signal', value: '>15% drop', sub: 'Refrigerant or filter issue' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{s.value}</div>
              <div style={{ color: '#cbd5e1', fontSize: 12 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>📡 What Smart HVAC Sensors Detect</h2>
          <ul style={{ paddingLeft: 18, margin: 0, color: '#cbd5e1', fontSize: 14, lineHeight: 1.9 }}>
            <li>🔵 Refrigerant level decline — catch before compressor burns out</li>
            <li>🟡 Filter life tracking — dirty filters spike energy use 10–15%</li>
            <li>🟠 Efficiency decline — Sense or Emporia detect HVAC circuit draw changes</li>
            <li>🔴 Runtime anomalies — unit running longer than usual signals capacity loss</li>
            <li>🟢 Airflow monitoring — duct pressure sensors catch blockages early</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏡 How old is your HVAC system?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hvacAges.map((h, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label} — <span style={{ color: selected === i ? '#0A1628' : h.color }}>{h.risk} Risk</span>
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${rec.color}` }}>
              <div style={{ color: rec.color, fontWeight: 700, marginBottom: 6 }}>Risk: {rec.risk} — Sensor ROI in ~{rec.roiYears} year{rec.roiYears > 1 ? 's' : ''}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Action: {rec.rec}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Sensors: {rec.sensors}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>💡 {rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>🤖 How ProLnk Uses HVAC Data</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>When your HVAC monitoring system detects an anomaly, ProLnk can proactively match you with a certified DFW HVAC tech — before you experience a full breakdown. AI-driven dispatch, not reactive panic calls.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Get matched with a certified DFW HVAC tech through ProLnk</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>Proactive service before the DFW summer crunch hits</div>
        </div>
      </div>
    </div>
  );
}

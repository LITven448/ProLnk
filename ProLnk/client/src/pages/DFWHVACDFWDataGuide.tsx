import { useState } from 'react';

const climateData = [
  {
    decision: 'System Sizing',
    metric: '100°F Design Temperature',
    value: '100°F outdoor design temp',
    detail: 'ACCA Manual J requires sizing to 100°F outdoor design for DFW. Undersized systems run constantly during peak summer, wearing out faster and failing to dehumidify.',
    icon: '🌡️',
  },
  {
    decision: 'Dehumidification Load',
    metric: '74°F Wet Bulb',
    value: '74°F wet bulb (summer peak)',
    detail: 'DFW summer wet bulb of 74°F means latent (moisture) load is substantial. Your system must be sized and configured to handle both sensible and latent cooling, not just temperature.',
    icon: '💧',
  },
  {
    decision: 'Cooling Capacity Planning',
    metric: '2,900 CDD',
    value: '2,900 Cooling Degree Days/year',
    detail: '2,900 CDDs annually means DFW systems work harder than most U.S. cities. Use this for energy modeling, equipment selection, and estimating annual runtime hours.',
    icon: '❄️',
  },
  {
    decision: 'Heating Capacity Planning',
    metric: '1,100 HDD',
    value: '1,100 Heating Degree Days/year',
    detail: 'Mild winters (1,100 HDD) mean heating is secondary. Heat pumps are viable year-round. Backup heat strips or gas only needed for rare freezes — size accordingly.',
    icon: '🔥',
  },
  {
    decision: 'Humidity Management',
    metric: '50% Summer Humidity',
    value: '50% average relative humidity (summer)',
    detail: 'Combined with 100°F temps, 50% RH creates real feel temps near 110°F. HVAC must maintain indoor RH below 55% for comfort and mold prevention.',
    icon: '🌫️',
  },
];

export default function DFWHVACDFWDataGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = climateData.find((d) => d.decision === selected) ?? null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>DFW Climate Data Guide</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          The DFW-specific climate numbers every HVAC decision should use — and exactly why each one matters.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {climateData.map((d) => (
            <button
              key={d.decision}
              onClick={() => setSelected(selected === d.decision ? null : d.decision)}
              style={{
                background: selected === d.decision ? '#132040' : '#0F1E35',
                border: `1.5px solid ${selected === d.decision ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 10,
                padding: '16px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'border-color 0.15s',
              }}
            >
              <span style={{ fontSize: 28 }}>{d.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{d.decision}</div>
                <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>{d.metric}</div>
                <div style={{ color: '#9AA3B2', fontSize: 13 }}>{d.value}</div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>{active.metric}</h2>
            <div style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: 12 }}>{active.value}</div>
            <p style={{ color: '#C8CDD8', lineHeight: 1.7, margin: 0 }}>{active.detail}</p>
          </div>
        )}

        <div style={{ marginTop: 40, background: '#0F1E35', borderRadius: 10, padding: '18px 22px', border: '1px solid #1E2D45' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📋 Quick Reference</div>
          <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.7 }}>
            Design Temp: 100°F · Wet Bulb: 74°F · CDD: 2,900 · HDD: 1,100 · Summer RH: ~50%
          </div>
        </div>
      </div>
    </div>
  );
}
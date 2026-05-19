import { useState } from 'react';

export default function DFWPainterProGuide2026() {
  const [specialty, setSpecialty] = useState('interior');

  const projections: Record<string, { jobs: number; avg: number; label: string }> = {
    interior: { jobs: 4, avg: 3500, label: 'Interior Residential' },
    exterior: { jobs: 3, avg: 4500, label: 'Exterior Residential' },
    commercial: { jobs: 2, avg: 8500, label: 'Commercial' },
    cabinet: { jobs: 5, avg: 2800, label: 'Cabinet Refinishing' },
  };

  const p = projections[specialty];
  const monthly = p.jobs * p.avg;
  const annual = monthly * 10;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🎨</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Painter Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything DFW licensed painters need to maximize earnings on ProLnk.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', label: 'Interior Avg Job', value: '$3,500′ },
            { icon: '🏡', label: 'Exterior Avg Job', value: '$4,500′ },
            { icon: '☀️', label: 'Summer Hours', value: 'Before 10am' },
            { icon: '🌸', label: 'Peak Seasons', value: 'Spring & Fall' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16, margin: '0 0 16px' }}>💰 DFW Income Projector</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.entries(projections).map(([key, val]) => (
              <button key={key} onClick={() => setSpecialty(key)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, backgroundColor: specialty === key ? '#F5E642′ : '#1e3a5f', color: specialty === key ? '#0A1628' : '#94a3b8' }}>
                {val.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Jobs/Month</div>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{p.jobs}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${monthly.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Annual Potential</div>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${annual.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>⭐ Charter Tier Benefits</h2>
          {['Priority match placement in DFW feed', 'Locked $149/mo rate before price increases', 'Network income on pros you refer', '1.5% origination rights on homes you source', 'Direct access to ProLnk success team'].map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>🌡️ DFW Painter Field Notes</h2>
          {['DFW summers regularly exceed 100°F — exterior jobs limited to 6–10am work windows', 'Spring and fall generate 60%+ of annual exterior painting revenue', 'Interior work is year-round and weather-independent', 'HOA neighborhoods require color approval — factor 2–3 week delays', 'ProLnk routes jobs by zip code — coverage density matters'].map((n) => (
            <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
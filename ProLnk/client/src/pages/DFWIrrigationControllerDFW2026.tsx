import { useState } from 'react';

const controllers = [
  { name: 'Rachio 3', icon: '⭐', price: '$229–$279', zones: '8 or 16 zone', rating: 5, dfwFit: 'Best for DFW', highlights: ['Hyperlocal weather intelligence — pulls DFW hourly data', 'ET-based scheduling adapts to DFW summer heat', 'Auto-skips watering after Dallas/FW rain events', 'Integrates with DFW odd/even day restrictions', 'ERCOT-aware — optional pre-heat wave deep soak'] },
  { name: 'Rain Bird ST8I-2.0', icon: '🔵', price: '$120–$160', zones: '8 zone', rating: 4, dfwFit: 'Contractor favorite', highlights: ['Most-installed by DFW irrigation contractors', 'Reliable, proven in DFW heat', 'Simple programming, good warranty', 'Wi-Fi connected, app control', 'No ET scheduling (manual seasonal adjust)'] },
  { name: 'Hunter HC-800i', icon: '🟢', price: '$130–$180', zones: '8 zone', rating: 4, dfwFit: 'Solid mid-range', highlights: ['Popular with DFW commercial and residential pros', 'Hydrawise app with flow monitoring', 'Predictive watering based on local weather', 'Can link to flow sensor for leak detection'] },
  { name: 'Orbit B-hyve XR', icon: '🟡', price: '$60–$90', zones: '6 or 12 zone', rating: 3, dfwFit: 'Budget option', highlights: ['Best price for smart features', 'Weather-based skipping included', 'App can be slow vs Rachio', 'Good for rental properties or budget installs'] },
];

const upgradeGuide: Record<string, string> = {
  'No controller / manual timer': 'Start fresh with Rachio 3 — DFW water savings often pay back the $229 cost within one summer season.',
  'Basic timer (non-smart)': 'Upgrade to Rachio 3 or Rain Bird ST8I. Smart scheduling saves 30–50% water in DFW heat.',
  'Older smart controller (5+ years)': 'Replace with Rachio 3 for ET scheduling. Older controllers lack DFW hyperlocal weather data.',
  'Rain Bird (current)': 'If working well, keep it. If you want ET scheduling, upgrade to Rachio 3 for automatic DFW weather adaptation.',
  'Hunter (current)': 'If 5+ years old, upgrade to Hunter HC-800i or Rachio 3 for Hydrawise monitoring and flow alerts.',
  'Rachio (current)': 'Make sure you are on Rachio 3 with latest firmware. Enable flex daily scheduling with DFW soil type (clay loam).',
};

export default function DFWIrrigationControllerDFW2026() {
  const [current, setCurrent] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🎛️ DFW Smart Irrigation Controller Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>The right smart controller for DFW cuts water bills 30–50%, auto-skips rain days, and handles odd/even restrictions — here's how they compare.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
          {controllers.map(c => (
            <div key={c.name} style={{ background: '#0F2040', borderRadius: 12, padding: 20, borderTop: c.dfwFit === 'Best for DFW' ? '3px solid #F5E642' : '3px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 22 }}>{c.icon}</div>
                  <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 16, marginTop: 4 }}>{c.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{c.price}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>{c.zones}</div>
                </div>
              </div>
              <div style={{ background: c.dfwFit === 'Best for DFW' ? '#1A2F4A' : '#162035', borderRadius: 6, padding: '4px 10px', display: 'inline-block', marginBottom: 10 }}>
                <span style={{ color: c.dfwFit === 'Best for DFW' ? '#F5E642' : '#94A3B8', fontSize: 12, fontWeight: 700 }}>{c.dfwFit}</span>
              </div>
              {c.highlights.map((h, i) => <div key={i} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 3 }}>• {h}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔄 Your Upgrade Path</h2>
          <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>What controller do you currently have?</label>
          <select value={current} onChange={e => setCurrent(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '12px 14px', fontSize: 15, marginBottom: 16 }}>
            <option value=''>Select current setup</option>
            {Object.keys(upgradeGuide).map(k => <option key={k}>{k}</option>)}
          </select>
          {current && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, marginBottom: 8 }}>💡 DFW Upgrade Advice</div>
              <div style={{ color: '#E8EAF6', fontSize: 14 }}>{upgradeGuide[current]}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🌵 DFW-Specific Controller Features That Matter</div>
          {[
            'ET (evapotranspiration) scheduling — adjusts for DFW summer soil moisture loss',
            'Local weather station integration — not just zip code averages',
            'Odd/even day programming — required by most DFW city codes',
            'Cycle + soak capability — essential for DFW clay soil runoff prevention',
            'Flow monitoring — catches DFW pipe breaks from freeze damage quickly',
          ].map((f, i) => <div key={i} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 5 }}>✓ {f}</div>)}
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW Smart Controller Installed</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Licensed DFW irrigation pros, controller supply + install, same-week service.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}
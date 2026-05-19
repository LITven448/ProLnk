import { useState } from 'react';

const technologies = [
  { id: 'ai', icon: '🤖', title: 'AI Predictive Maintenance', desc: 'Detects failure before it happens — sensors flag anomalies weeks early', eta: 'Q1 2027′ },
  { id: 'ercot', icon: '⚡', title: 'ERCOT Demand Response', desc: 'Auto-participates in grid programs during peak events, earns bill credits', eta: 'Q2 2027′ },
  { id: 'co2', icon: '🌿', title: 'CO₂ Refrigerant Systems', desc: 'Ultra-low GWP refrigerant replacing R-410A across DFW installs', eta: 'Q3 2027′ },
  { id: 'hpwh', icon: '💧', title: 'Heat Pump Water Heater Integration', desc: 'HVAC and water heat unified under one smart controller', eta: 'Q2 2027′ },
  { id: 'vault', icon: '🏠', title: 'ProLnk Vault Performance Tracking', desc: 'Every system reading logged automatically — one source of truth', eta: 'Live Now' },
];

const priorities = [
  { label: 'Lower Energy Bills', match: ['ercot', 'hpwh', 'co2'] },
  { label: 'Avoid Surprise Failures', match: ['ai', 'vault'] },
  { label: 'Eco-Friendly Upgrade', match: ['co2', 'hpwh', 'ercot'] },
  { label: 'Smart Home Integration', match: ['ai', 'vault', 'ercot'] },
];

export default function DFWHVACTech2027Preview2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<typeof technologies | null>(null);

  function handlePriority(priority: typeof priorities[0]) {
    setSelected(priority.label);
    setResult(technologies.filter(t => priority.match.includes(t.id)));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🌬️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>DFW HVAC Technology 2027 Preview</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>What is coming to DFW HVAC systems by 2027 — and how ProLnk Vault tracks it all.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '1rem' }}>What matters most to you?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '2rem' }}>
          {priorities.map(p => (
            <button key={p.label} onClick={() => handlePriority(p)}
              style={{ background: selected === p.label ? '#F5E642′ : '#1e3a5f', color: selected === p.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '.6rem 1.1rem', cursor: 'pointer', fontWeight: 600 }}>
              {p.label}
            </button>
          ))}
        </div>

        {result && (
          <div>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your 2027 HVAC Technology Preview</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.map(t => (
                <div key={t.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ fontSize: '1.5rem' }}>{t.icon}</div>
                  <div style={{ fontWeight: 700, marginTop: '.4rem' }}>{t.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.9rem', marginTop: '.3rem' }}>{t.desc}</div>
                  <div style={{ color: '#F5E642', fontSize: '.8rem', marginTop: '.5rem' }}>ETA: {t.eta}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', background: '#F5E64220', borderRadius: 10, padding: '1rem', color: '#F5E642′ }}>
              🏠 ProLnk Vault logs every HVAC performance reading automatically — your 2027-ready data starts today.
            </div>
          </div>
        )}

        {!result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {technologies.map(t => (
              <div key={t.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.85rem' }}>{t.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#F5E642', fontSize: '.8rem', whiteSpace: 'nowrap' }}>{t.eta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
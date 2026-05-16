import { useState } from 'react';

export default function DFWPanelUpgradeGuide2026() {
  const [trigger, setTrigger] = useState('');

  const triggers = [
    { id: 'ev', label: '🔌 EV Charger Install', scope: 'Add 50A or 60A dedicated circuit. 100A panel often maxed — 200A upgrade recommended.', cost: '$3,800–5,200', days: '1–2 days' },
    { id: 'hvac', label: '❄️ HVAC Replacement', scope: 'New high-efficiency systems draw more current. Panel capacity check required before install.', cost: '$3,000–4,500', days: '1 day' },
    { id: 'addition', label: '🏠 Home Addition / Remodel', scope: 'New circuits for rooms, kitchen, or garage. Often requires 200A upgrade + subpanel.', cost: '$4,000–6,000', days: '1–2 days' },
    { id: 'solar', label: '☀️ Solar Panel System', scope: 'Interconnection requires panel assessment. 200A panel typically needed for solar + home load.', cost: '$3,500–5,000', days: '1–2 days' },
    { id: 'hot-tub', label: '🛁 Hot Tub / Pool', scope: 'Dedicated 240V 60A circuit required. Older 100A panels almost always need upgrade.', cost: '$3,200–4,800', days: '1–2 days' },
    { id: 'age', label: '📅 Panel 30+ Years Old', scope: 'Older panels (Federal Pacific, Zinsco) are fire hazards. Full replacement recommended.', cost: '$2,800–4,500', days: '1 day' },
  ];

  const selected = triggers.find(t => t.id === trigger);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚡</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW Electrical Panel Upgrade Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>100A → 200A upgrades for Dallas-Fort Worth homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '💵', label: 'Typical Cost', value: '$3,000–5,000' },
            { icon: '📋', label: 'Permit Required', value: 'Yes — TDLR Licensed' },
            { icon: '🏢', label: 'Utility Coord', value: 'Oncor Disconnect' },
            { icon: '📅', label: 'Timeline', value: '1–2 Days' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>🔍 What's Your Upgrade Trigger?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {triggers.map(t => (
              <button key={t.id} onClick={() => setTrigger(t.id === trigger ? '' : t.id)}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid', cursor: 'pointer', textAlign: 'left', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                  borderColor: trigger === t.id ? '#F5E642' : '#1e3a5f', backgroundColor: trigger === t.id ? '#1a2e4a' : '#0d1f35', color: trigger === t.id ? '#F5E642' : '#cbd5e1' }}>
                {t.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: '20px', backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: '18px' }}>{selected.label}</h3>
              <p style={{ color: '#cbd5e1', margin: '0 0 12px', lineHeight: '1.6' }}>{selected.scope}</p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ color: '#4ade80', fontWeight: '700' }}>💰 {selected.cost}</span>
                <span style={{ color: '#60a5fa', fontWeight: '700' }}>⏱ {selected.days}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>📋 DFW Panel Upgrade Process</h2>
          {['Electrician assesses current panel load and upgrade scope', 'Pull permit with city (required — no permit = no final inspection)', 'Schedule Oncor disconnect (1–3 day lead time)', 'Install new 200A panel, main breaker, and ground rod', 'City inspection + Oncor reconnect (same or next day)', 'Final test: all circuits verified, load balanced'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <span style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{i + 1}</span>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{step}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
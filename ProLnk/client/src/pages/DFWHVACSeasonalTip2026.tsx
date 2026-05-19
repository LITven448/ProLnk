import { useState } from 'react';

const seasons = [
  { id: 'fall', label: '🍂 Fall (Oct–Nov): Cooling → Heating', tasks: ['Test furnace before first cold night', 'Replace air filter (1" every 30 days, 4" every 6 months)', 'Set thermostat to HEAT mode', 'Run furnace 10 min — listen for odd sounds', 'Check pilot light or igniter status', 'Clear 2-ft radius around outdoor heat pump unit', 'Schedule professional tune-up (book early, fills fast)'] },
  { id: 'spring', label: '🌸 Spring (Mar–Apr): Heating → Cooling', tasks: ['Test AC before first hot day', 'Replace air filter at seasonal switch', 'Set thermostat to COOL mode', 'Run AC 15 min — confirm cold air at vents', 'Inspect outdoor condenser coils for debris', 'Check refrigerant lines for ice (sign of low charge)', 'Schedule pre-season AC tune-up'] },
  { id: 'summer', label: '☀️ Summer (Jun–Sep): AC Running Continuously', tasks: ['Check filter monthly (DFW dust is relentless)', 'Keep thermostat at 78°F or above when away', 'Ensure vents are open and unobstructed', 'Listen for unusual sounds (squealing = belt, grinding = motor)', 'Watch for water near air handler (drain clog sign)'] },
];

const warnings = [
  { icon: '⚠️', title: 'Emergency Heat Risk', body: 'Emergency heat on a heat pump bypasses the heat pump entirely and uses electric resistance strips — extremely expensive. Only use during actual equipment failure, not just cold weather.' },
  { icon: '🌡️', title: 'DFW Temperature Swings', body: 'DFW can swing 40°F in 24 hours. Test both systems in October when mild — don\’t wait until the first freeze at 28°F to discover your furnace won\’t fire.' },
  { icon: '🔧', title: 'Thermostat Mode Verification', body: 'Always physically verify the thermostat mode matches the season. A thermostat left in HEAT mode in July will fight your AC and spike your electric bill.' },
];

export default function DFWHVACSeasonalTip2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW HVAC Seasonal Switch Tips 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Smooth transitions between heating and cooling in North Texas</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📅 Select Your Current DFW Season</h2>
          {seasons.map(s => (
            <div key={s.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', background: active === s.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: 600 }}>
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>Seasonal switch checklist:</p>
                  {s.tasks.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#F5E642', fontSize: 14 }}>✅</span>
                      <span style={{ color: '#CBD5E1', fontSize: 14 }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🚨 Critical DFW HVAC Warnings</h2>
          {warnings.map((w, i) => (
            <div key={i} style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{w.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{w.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{w.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW HVAC Pros Ready</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Connect with licensed DFW HVAC technicians for seasonal tune-ups and system switches. No guessing — get it done right.</div>
        </div>
      </div>
    </div>
  );
}
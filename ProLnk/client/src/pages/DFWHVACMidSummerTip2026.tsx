import { useState } from 'react';

const situations = [
  { id: 'drain', label: '💧 Condensate Drain Clog', tip: 'At sustained 95°F+, algae grows in condensate lines at 3x normal rate. Flush monthly in July–August: pour 1 cup diluted bleach (1:16) into the access port near the air handler. Follow with plain water. Prevents $500+ water damage calls.' },
  { id: 'temp', label: '🌡️ Thermostat Setting', tip: 'Set to 78°F when away — NOT higher. Settings above 80°F allow humidity to rise and mold to grow within 24–48 hours in DFW summers. 78°F keeps humidity controlled while saving energy. Use a 30-min pre-cool before returning home.' },
  { id: 'fan', label: '🌀 Ceiling Fan Direction', tip: 'In summer, ceiling fans should spin counterclockwise (when looking up). This creates a wind-chill effect and allows you to raise thermostat 4°F without comfort loss — saving 10–15% on cooling bills.' },
  { id: 'filter', label: '🌬️ Filter Replacement', tip: 'Check every 30 days minimum in summer. In July–August, replace every 3–4 weeks if you have pets or allergies. A clogged filter in peak heat reduces airflow 20–30% and can freeze the evaporator coil.' },
  { id: 'shade', label: '☀️ Outdoor Unit Shade', tip: 'If you can shade your outdoor condenser unit (without blocking airflow), you can achieve a 5–10% efficiency gain. Use a lattice screen or strategic shrubs 2+ feet away. Never cover the top or restrict the 2-foot clearance zone.' },
];

export default function DFWHVACMidSummerTip2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW MID-SUMMER HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Mid-Summer Maintenance Tips 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          July and August are the most demanding months for DFW HVAC systems. These targeted tips keep your system running efficiently at sustained 95°F+ temperatures.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🌡️', label: 'Peak Sustained Temp', val: '95–105°F' },
            { icon: '💧', label: 'Algae Risk Level', val: 'CRITICAL' },
            { icon: '🌡️', label: 'Away Thermostat', val: '78°F MAX' },
            { icon: '🌬️', label: 'Filter Check', val: 'Every 30d' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{s.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Select Your Mid-Summer Situation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#111f38',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>HVAC TIP GUIDE</div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{situations.find(s => s.id === selected)?.tip}</p>
          </div>
        )}

        <div style={{ background: '#111f38', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📞 EMERGENCY HVAC — PROLNK CHARTER</div>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
            If your system fails during a heat event, Charter Pros are dispatched within 4 hours. 95°F+ indoor temps are a health emergency — don\'t wait. Request service at prolnk.io.
          </p>
        </div>
      </div>
    </div>
  );
}
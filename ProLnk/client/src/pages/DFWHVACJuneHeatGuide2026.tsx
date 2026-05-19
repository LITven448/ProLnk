import { useState } from 'react';

const concerns = [
  { id: 'filter', label: '🌬️ Filter Check', action: 'Replace or clean your filter NOW — June is peak dust and pollen month. Use MERV 8-11 filters. Check every 30 days minimum through September.' },
  { id: 'condensate', label: '💧 Condensate Drain', action: 'Flush condensate drain with 1 cup of diluted bleach (1:16 ratio). Algae peaks in June heat. A clogged drain = water damage + system shutdown.' },
  { id: 'ercot', label: '⚡ ERCOT Demand Event', action: 'Pre-cool your home to 72°F before demand events (usually 3–7 PM). Set thermostat to 78°F during event. Do NOT turn off AC — mold risk.' },
  { id: 'emergency', label: '🚨 AC Not Cooling', action: 'Check breaker, filter, and thermostat first. If outdoor unit is off, reset breaker once. Still down? Contact a ProLnk Charter Pro immediately — they prioritize members.' },
  { id: 'outdoor', label: '🌡️ Outdoor Unit Care', action: 'Keep 2 feet of clearance around unit. Rinse coils gently with garden hose. Do NOT use pressure washer. Shade the unit if possible for 5–10% efficiency gain.' },
];

export default function DFWHVACJuneHeatGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW June HVAC Survival Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          June temperatures reach 95–100°F in DFW. Your AC runs 20+ hours per day. This is the highest-stress month for your system.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🌡️', label: 'Avg June High', val: '97°F' },
            { icon: '⏱️', label: 'Daily AC Runtime', val: '20+ hrs' },
            { icon: '🔧', label: 'Filter Interval', val: '30 days' },
            { icon: '💧', label: 'Drain Risk Level', val: 'PEAK' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{s.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Select Your June HVAC Concern</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#111f38',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>ACTION GUIDE</div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{concerns.find(c => c.id === selected)?.action}</p>
          </div>
        )}

        <div style={{ background: '#111f38', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>PROLNK CHARTER PROS — DFW</div>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
            Charter Pros are verified, background-checked HVAC technicians available for emergency June service. Slots are limited — waitlist closes at 500 pros.
          </p>
        </div>
      </div>
    </div>
  );
}
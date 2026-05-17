import { useState } from 'react';

const diagnoses = [
  { id: 'high-high', label: 'High side HIGH (>420 PSI)', diagnosis: 'Overcharge or condenser restriction', detail: 'In DFW summer heat, anything above 420 PSI on the high side suggests refrigerant overcharge, dirty condenser coils, or restricted airflow around the outdoor unit. Check condenser clearances and clean coils before adjusting refrigerant.' },
  { id: 'high-low', label: 'High side LOW (<350 PSI)', diagnosis: 'Undercharge or refrigerant leak', detail: 'Low high-side pressure in DFW summer points to refrigerant undercharge — typically from a leak. System is starved for refrigerant and cannot reject heat properly. Leak search and recharge required.' },
  { id: 'low-high', label: 'Low side HIGH (>80 PSI)', diagnosis: 'Overcharge or bad TXV/metering device', detail: 'High suction pressure usually means too much refrigerant getting to the evaporator (overcharge or stuck-open metering device). This causes the compressor to handle liquid refrigerant — a damaging condition.' },
  { id: 'low-low', label: 'Low side LOW (<45 PSI)', diagnosis: 'Undercharge, restriction, or iced coil', detail: 'Low suction pressure in DFW summer often means undercharge or a restriction (dirty filter, clogged TXV). Check your air filter first — a clogged filter starves the evaporator and causes freeze-ups.' },
  { id: 'both-normal', label: 'Both sides normal (DFW summer)', diagnosis: 'System operating correctly', detail: 'For R-410A in DFW summer (95–105°F ambient): high side 375–415 PSI, low side 55–75 PSI is normal. System is operating within spec. If comfort issues persist, check ductwork, airflow, and insulation.' },
];

export default function DFWHVACPressureGuagesGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = diagnoses.find(d => d.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>HVAC Pressure Gauge Reading Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW summer heat creates unique pressure conditions for R-410A systems. Know what your gauges mean before the tech arrives.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🔴', label: 'High Side (DFW Summer)', value: '375–415 PSI' },
            { icon: '🔵', label: 'Low Side (DFW Summer)', value: '55–75 PSI' },
            { icon: '🌡️', label: 'DFW Ambient (Peak)', value: '95–110°F' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 15, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🌡️ Why DFW Ambient Changes Everything</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>Refrigerant pressure is temperature-dependent. Target pressures in DFW peak summer are significantly higher than national averages. A tech comparing your readings to a 75°F reference chart will misdiagnose your system. DFW-calibrated targets: high side +15–25 PSI above average.</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Select Your Pressure Reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {diagnoses.map(d => (
              <button key={d.id} onClick={() => setSelected(d.id)}
                style={{ background: selected === d.id ? '#F5E642' : '#1A2F50', color: selected === d.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {d.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderLeft: '4px solid #F5E642', padding: 16, borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Diagnosis: {match.diagnosis}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{match.detail}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📍 Need a DFW HVAC Diagnostic?</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>ProLnk matches you with certified DFW HVAC techs who know how to read systems in Texas heat.</div>
        </div>
      </div>
    </div>
  );
}

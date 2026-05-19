import { useState } from 'react';

const systemTypes = [
  { label: 'Fixed Metering Device (TXV-less)', value: 'fixed' },
  { label: 'TXV / EEV System', value: 'txv' },
];

const seasons = [
  { label: 'Spring (75-85°F ambient)', value: 'spring', superheatRange: '8–18°F', subcoolRange: '10–18°F' },
  { label: 'Summer (95-105°F ambient)', value: 'summer', superheatRange: '5–12°F', subcoolRange: '10–20°F' },
  { label: 'Peak Heat (105°F+ ambient)', value: 'peak', superheatRange: '5–10°F', subcoolRange: '12–22°F' },
];

const deviations = [
  { label: 'Readings within range', value: 'ok', meaning: 'Charge appears correct for DFW conditions. System likely healthy.' },
  { label: 'Superheat too high', value: 'high_sh', meaning: 'Low refrigerant charge or restricted metering — common in DFW summer when charge is marginal.' },
  { label: 'Superheat too low', value: 'low_sh', meaning: 'Overcharge or metering device stuck open — can flood compressor with liquid refrigerant.' },
  { label: 'Subcooling too high', value: 'high_sc', meaning: 'Overcharge or liquid line restriction — causes elevated head pressure in DFW heat.' },
  { label: 'Subcooling too low', value: 'low_sc', meaning: 'Low charge or TXV not feeding enough — system starved of refrigerant.' },
];

export default function DFWHVACSuperheatingGuide() {
  const [system, setSystem] = useState(systemTypes[1]);
  const [season, setSeason] = useState(seasons[1]);
  const [deviation, setDeviation] = useState(deviations[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>🌡️ Superheat & Subcooling Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Superheat and subcooling measurements are the gold standard for verifying refrigerant charge. In DFW's extreme heat, these readings are critical — a charge that looks fine in mild weather can cause system damage at 105°F+.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📌 Why DFW Is Different</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Superheat targets drop as ambient temps rise. At 105°F, a target superheat of 15°F (acceptable at 75°F) is too high and indicates undercharge. DFW techs must use temperature-corrected charts, not generic spec sheets.
          </p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>⚙️ System Type</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {systemTypes.map(s => (
              <button key={s.value} onClick={() => setSystem(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: system.value === s.value ? '#F5E642' : '#1e3a5f', color: system.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>

          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 20 }}>🌤️ DFW Season / Ambient</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {seasons.map(s => (
              <button key={s.value} onClick={() => setSeason(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: season.value === s.value ? '#F5E642' : '#1e3a5f', color: season.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>

          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 20 }}>🩺 What Are Readings Showing?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {deviations.map(d => (
              <button key={d.value} onClick={() => setDeviation(d)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: deviation.value === d.value ? '#F5E642' : '#1e3a5f', color: deviation.value === d.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{d.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>📊 For {system.label} — {season.label}</div>
          <div style={{ color: '#F5E642', marginBottom: 4 }}>Target Superheat: {season.superheatRange} &nbsp;|&nbsp; Target Subcooling: {season.subcoolRange}</div>
          <div style={{ color: '#cbd5e1', marginTop: 8 }}>{deviation.meaning}</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Find a DFW HVAC Tech Who Uses Charts</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px' }}>ProLnk connects you with vetted DFW HVAC pros trained in ambient-corrected diagnostics.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 24px', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>Get Your Free Quote →</div>
        </div>
      </div>
    </div>
  );
}


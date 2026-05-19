import { useState } from 'react';

const situations = [
  { label: 'Compressor humming but not starting', value: 'hum', burnoutChance: 40, cause: 'Possible locked rotor — may be mechanical failure, not burnout' },
  { label: 'Tripped breaker + burning smell from unit', value: 'smell', burnoutChance: 80, cause: 'Strong indicator of winding burnout — acid contamination likely' },
  { label: 'Compressor dead, acid test positive', value: 'acid', burnoutChance: 95, cause: 'Confirmed burnout with acid — full system flush required before new compressor' },
  { label: 'Unit stopped on a 105°F+ DFW day, won’t restart', value: 'heat', burnoutChance: 65, cause: 'Thermal overload or burnout from sustained extreme heat operation' },
];

const ages = [
  { label: 'Under 5 years', value: 'new', modifier: -20, note: 'Burnout in young systems usually indicates electrical issue or improper service' },
  { label: '5–10 years', value: 'mid', modifier: 0, note: 'Mid-life burnout often from years of refrigerant issues or extreme DFW heat cycling' },
  { label: '10–15 years', value: 'old', modifier: 15, note: 'High risk — consider full system replacement vs. compressor swap' },
  { label: '15+ years', value: 'veryold', modifier: 25, note: 'Replacement almost always more cost-effective than compressor-only repair' },
];

export default function DFWHVACBurntOutGuide() {
  const [situation, setSituation] = useState(situations[0]);
  const [age, setAge] = useState(ages[1]);

  const burnoutLikelihood = Math.min(99, situation.burnoutChance + age.modifier);
  const flushRequired = burnoutLikelihood >= 70;
  const compressorCost = { low: 1800, high: 3200 };
  const fullSystemCost = { low: 5500, high: 9000 };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>🔥 Compressor Burnout Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Compressor burnout is one of the most expensive HVAC failures — and DFW's extreme heat makes it more common than in any other major US metro. Understanding burnout helps you ask the right questions and avoid being sold a replacement that fails again within a year.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📌 What Is a Compressor Burnout?</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            When winding insulation fails inside a compressor, it releases copper oxides and acids into the refrigerant circuit. These acids travel to every component in the system — TXV, filter drier, evaporator, condenser. Installing a new compressor without flushing the acid is a guaranteed second failure within 6–18 months.
          </p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🩺 Your Situation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSituation(s)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: situation.value === s.value ? '#F5E642′ : '#1e3a5f', color: situation.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>

          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 20 }}>📅 Compressor Age</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {ages.map(a => (
              <button key={a.value} onClick={() => setAge(a)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: age.value === a.value ? '#F5E642′ : '#1e3a5f', color: age.value === a.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{a.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🧠 Burnout Likelihood: {burnoutLikelihood}%</div>
          <div style={{ color: '#94a3b8', marginBottom: 6 }}>{situation.cause}</div>
          <div style={{ color: '#94a3b8', marginBottom: 10 }}>{age.note}</div>
          {flushRequired && <div style={{ color: '#F5E642', fontWeight: 700 }}>⚠️ System flush required before compressor replacement</div>}
          <div style={{ marginTop: 12, color: '#cbd5e1′ }}>
            Compressor + Flush: ~${compressorCost.low.toLocaleString()}–${compressorCost.high.toLocaleString()}<br/>
            Full System Replacement: ~${fullSystemCost.low.toLocaleString()}–${fullSystemCost.high.toLocaleString()}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a Burnout Assessment from a DFW Pro</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px' }}>ProLnk connects you with DFW HVAC pros who test for acid, flush properly, and warranty their work.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 24px', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>Get Your Free Quote →</div>
        </div>
      </div>
    </div>
  );
}


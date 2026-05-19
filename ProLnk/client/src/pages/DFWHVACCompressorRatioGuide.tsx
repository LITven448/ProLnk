import { useState } from 'react';

const ambientTemps = [
  { label: '85°F (Spring/Fall)', value: 85, basePressure: 175, baseRatio: 2.8 },
  { label: '95°F (Typical DFW Summer)', value: 95, basePressure: 200, baseRatio: 3.2 },
  { label: '105°F (Peak DFW Heat)', value: 105, basePressure: 230, baseRatio: 3.8 },
  { label: '110°F+ (Extreme DFW Heat)', value: 110, basePressure: 250, baseRatio: 4.2 },
];

const symptoms = [
  { label: 'Unit cooling fine', ratioMod: 0, meaning: 'Compression ratio likely within spec' },
  { label: 'Longer run cycles than usual', ratioMod: 0.3, meaning: 'Slightly elevated ratio — monitor refrigerant charge' },
  { label: 'Warm air, unit runs constantly', ratioMod: 0.7, meaning: 'High ratio likely — refrigerant or airflow issue' },
  { label: 'Compressor trips on thermal cutout', ratioMod: 1.1, meaning: 'Dangerously high ratio — compressor at risk' },
];

export default function DFWHVACCompressorRatioGuide() {
  const [temp, setTemp] = useState(ambientTemps[1]);
  const [symptom, setSymptom] = useState(symptoms[0]);

  const ratio = (temp.baseRatio + symptom.ratioMod).toFixed(1);
  const pressure = temp.basePressure;

  const severity =
    Number(ratio) < 3.0 ? '✅ Normal' :
    Number(ratio) < 3.8 ? '⚠️ Elevated' :
    '🔴 High Risk';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>🔧 Compressor Pressure Ratio Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Compression ratio is a key diagnostic for AC health. DFW's extreme ambient temperatures push condensers harder than almost anywhere in the US — understanding what ratios mean in your climate prevents misdiagnosis.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📌 What Is Compression Ratio?</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Compression ratio = discharge pressure ÷ suction pressure. Higher ambient temps in DFW raise discharge pressure — a ratio of 3.2 is normal at 95°F but may indicate refrigerant loss at 75°F. Context is everything.
          </p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🌡️ DFW Ambient Temp</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {ambientTemps.map(t => (
              <button key={t.value} onClick={() => setTemp(t)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: temp.value === t.value ? '#F5E642' : '#1e3a5f', color: temp.value === t.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{t.label}</button>
            ))}
          </div>

          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 20 }}>🩺 Symptoms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {symptoms.map(s => (
              <button key={s.label} onClick={() => setSymptom(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: symptom.label === s.label ? '#F5E642' : '#1e3a5f', color: symptom.label === s.label ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>📊 Estimated Ratio: {ratio} : 1 &nbsp; {severity}</div>
          <div style={{ color: '#94a3b8', marginBottom: 6 }}>Estimated discharge pressure at {temp.value}°F: ~{pressure} psig</div>
          <div style={{ color: '#cbd5e1' }}>{symptom.meaning}</div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW Homeowner Takeaway</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Technicians who ignore ambient temperature when diagnosing your system may misdiagnose a perfectly working unit or miss a real problem. Ask your tech: "What is your target ratio at today's ambient?" A good DFW HVAC tech accounts for the heat.
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW-Experienced HVAC Tech</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px' }}>ProLnk matches you with pros who know DFW's extreme heat conditions — not generic technicians.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 24px', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>Get Your Free Quote →</div>
        </div>
      </div>
    </div>
  );
}


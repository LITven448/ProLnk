import { useState } from 'react';

const symptomSets = [
  { label: 'Unit runs but barely cools', value: 'low_cool', likelihood: 55, note: 'TXV starving the evaporator — very common in DFW heat extremes' },
  { label: 'System freezes up then defrosts, cycles', value: 'freeze', likelihood: 70, note: 'TXV hunting or stuck closed — refrigerant not metering evenly' },
  { label: 'High superheat, correct charge', value: 'high_sh', likelihood: 75, note: 'Classic TXV restriction: charge is fine but valve won’t open fully' },
  { label: 'Low superheat flooding compressor', value: 'flood', likelihood: 65, note: 'TXV stuck open — liquid refrigerant entering compressor' },
  { label: 'System short-cycles on high-pressure cutout', value: 'trip', likelihood: 60, note: 'TXV restriction causing head pressure spike in DFW summer heat' },
];

const seasons = [
  { label: 'Spring/Mild', value: 'spring', costMod: 0, riskNote: 'TXV failure less acute — good time to diagnose and replace proactively' },
  { label: 'Summer Peak (95°F+)', value: 'summer', costMod: 100, riskNote: 'TXV failure in DFW summer heat causes rapid compressor damage — urgent repair' },
  { label: 'Extreme Heat (105°F+)', value: 'extreme', costMod: 200, riskNote: 'Emergency condition — TXV failure at 105°F+ can destroy a compressor in hours' },
];

export default function DFWHVACTXVGuide() {
  const [symptom, setSymptom] = useState(symptomSets[0]);
  const [season, setSeason] = useState(seasons[1]);

  const baseCost = { replace: 350, compressor: 1800 };
  const totalReplace = baseCost.replace + season.costMod;
  const action = symptom.likelihood >= 65 ? 'Replace TXV' : 'Diagnose Further';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>🔩 TXV (Thermostatic Expansion Valve) Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          The TXV meters refrigerant into your evaporator. In DFW's extreme heat, TXVs operate near their design limits all summer — making them one of the most common failure points in aging DFW HVAC systems.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📌 What Does a TXV Do?</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            The TXV senses evaporator outlet temperature and pressure, then opens or closes to keep refrigerant metering correct. In DFW's 100°F+ conditions, a weakened TXV bulb, wax element, or stuck needle will cause the entire system to underperform or damage the compressor.
          </p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🩺 Your Symptoms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {symptomSets.map(s => (
              <button key={s.value} onClick={() => setSymptom(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: symptom.value === s.value ? '#F5E642′ : '#1e3a5f', color: symptom.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>

          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 20 }}>🌡️ DFW Season</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {seasons.map(s => (
              <button key={s.value} onClick={() => setSeason(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: season.value === s.value ? '#F5E642′ : '#1e3a5f', color: season.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🧠 TXV Likelihood: {symptom.likelihood}%</div>
          <div style={{ color: '#94a3b8', marginBottom: 8 }}>{symptom.note}</div>
          <div style={{ color: '#F5E642', marginBottom: 4 }}>⚠️ {season.riskNote}</div>
          <div style={{ marginTop: 12, fontWeight: 700 }}>Recommended: {action}</div>
          <div style={{ color: '#94a3b8', marginTop: 4 }}>TXV Replacement: ~${totalReplace} — vs. Compressor Replacement: ~${baseCost.compressor}+</div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 Repair vs. Replace</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            TXVs are not repairable — they are replaced. Cost is typically $300–$600 including labor. In DFW, replacing a failing TXV before summer peak is almost always cheaper than replacing the compressor it damages.
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW HVAC Quote Before Summer Peaks</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px' }}>ProLnk matches you with vetted DFW technicians experienced in TXV diagnosis and replacement.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 24px', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>Get Your Free Quote →</div>
        </div>
      </div>
    </div>
  );
}


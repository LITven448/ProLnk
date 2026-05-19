import { useState } from 'react';

const symptomGroups = [
  { label: 'System cools but inefficiently, high electric bill', value: 'inefficient', likelihood: 35, type: 'Non-condensable gases (air/nitrogen)', service: 'Recover refrigerant, evacuate system, recharge', cost: '$350–$600′ },
  { label: 'Freeze-up or fluctuating pressures', value: 'freeze', likelihood: 50, type: 'Moisture contamination', service: 'Deep vacuum evacuation + filter drier replacement', cost: '$400–$700′ },
  { label: 'Compressor makes noise, high amp draw', value: 'noisy', likelihood: 65, type: 'Acid contamination from partial burnout', service: 'System flush + compressor evaluation + driers', cost: '$800–$2,000′ },
  { label: 'Acid test strips positive', value: 'acid', likelihood: 90, type: 'Confirmed acid contamination', service: 'Full flush, new compressor, dual filter driers, oil change', cost: '$1,500–$3,500′ },
  { label: 'System was recently serviced and now underperforms', value: 'post_service', likelihood: 60, type: 'Air or nitrogen left in system (improper recovery)', service: 'Recover, triple-evacuate, recharge to spec', cost: '$300–$550′ },
];

const causes = [
  'Improper service (no recovery, no vacuum)',
  'Compressor burnout releasing acid',
  'Moisture entry through Schrader valve or open line',
  'Leaking system with air infiltration',
  'Refrigerant added without evacuation',
];

export default function DFWHVACContaminationGuide() {
  const [symptom, setSymptom] = useState(symptomGroups[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>☣️ HVAC System Contamination Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Contaminated refrigerant systems are a silent killer of DFW HVAC equipment. Moisture, air, and acid contamination cause premature failures — and are often introduced by poor service practices, not just equipment age.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚠️ How Contamination Happens</div>
          <ul style={{ color: '#94a3b8', paddingLeft: 20, lineHeight: 2, margin: 0 }}>
            {causes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🩺 Select Your Symptoms</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {symptomGroups.map(s => (
              <button key={s.value} onClick={() => setSymptom(s)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: symptom.value === s.value ? '#F5E642′ : '#1e3a5f', color: symptom.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>🔬 Contamination Likelihood: {symptom.likelihood}%</div>
          <div style={{ color: '#F5E642', marginBottom: 6 }}>Likely Type: {symptom.type}</div>
          <div style={{ color: '#cbd5e1', marginBottom: 6 }}>Required Service: {symptom.service}</div>
          <div style={{ color: '#94a3b8′ }}>Estimated Cost: {symptom.cost}</div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW Homeowner Warning</div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            In DFW's heat, contaminated systems run harder and fail faster. Acid contamination after a burnout will destroy a new compressor within months if not flushed. Always ask your tech: "Did you pull a deep vacuum? What did you use to test for moisture and acid?"
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW HVAC Contamination Assessment</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px' }}>ProLnk connects you with vetted DFW pros who test properly — not just add refrigerant and leave.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 24px', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>Get Your Free Quote →</div>
        </div>
      </div>
    </div>
  );
}


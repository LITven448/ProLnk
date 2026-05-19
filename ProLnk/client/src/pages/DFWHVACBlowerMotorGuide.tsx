import { useState } from 'react';

const airflowSymptoms = ['Weak airflow from all vents', 'No airflow despite unit running', 'Airflow only from some vents', 'Airflow fine but room stays hot', 'Loud squealing from air handler'];
const motorAges = ['Under 5 years', '5–8 years', '8–12 years', '12–15 years', 'Over 15 years'];

function getBlowerAssessment(symptom: string, age: string) {
  const isOld = age.includes('12') || age.includes('15') || age.includes('Over');
  const isMidAge = age.includes('8') || age.includes('5–8');
  const isMotorSymptom = symptom.includes('Weak') || symptom.includes('No airflow') || symptom.includes('squealing');
  const isCapacitorSymptom = symptom.includes('No airflow') || symptom.includes('Weak');

  const motorLikelihood = isMotorSymptom && isOld ? 'High (75%)' : isMotorSymptom && isMidAge ? 'Moderate (50%)' : 'Lower (30%)';
  const capacitorLikelihood = isCapacitorSymptom ? 'Check capacitor first — cheaper fix ($150–$400)' : 'Less likely';
  const cost = isOld ? '$450–$950 blower motor replacement' : '$350–$700 blower motor or $150–$400 capacitor';
  const urgency = symptom.includes('No airflow') ? '🔴 Urgent — DFW heat dangerous without cooling' : '🟡 Schedule within 48 hours';

  return { motorLikelihood, capacitorLikelihood, cost, urgency };
}

export default function DFWHVACBlowerMotorGuide() {
  const [symptom, setSymptom] = useState('');
  const [motorAge, setMotorAge] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getBlowerAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>💨 Blower Motor Failure Guide</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW HVAC systems run nearly 24/7 in summer. Blower motors face extreme wear — often 4,000+ operating hours per year vs 2,000 in cooler climates. Know the difference between a failed motor and a failed capacitor before you spend.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔄 DFW Wear Pattern</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW motors run May–September almost constantly — 16+ hrs/day</li>
            <li>Heat from attic-mounted air handlers accelerates bearing wear</li>
            <li>Bearings fail first: squealing, then grinding, then seized motor</li>
            <li>ECM (variable speed) motors last longer but cost more to replace</li>
            <li>PSC motors (older units): cheaper, replaced more frequently</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔎 Motor vs Capacitor: Quick Test</h2>
          <div style={{ color: '#C8D8E8', lineHeight: 1.8 }}>
            <p><strong style={{ color: '#F5E642′ }}>Capacitor failed:</strong> Motor tries to start, hums, shuts off. Replace capacitor first (~$150) — it may be the only problem.</p>
            <p style={{ marginTop: 12 }}><strong style={{ color: '#F5E642′ }}>Motor failed:</strong> No attempt to start even with good capacitor, burning smell, or motor is seized/hot to touch.</p>
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Assess My Blower</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>AIRFLOW SYMPTOM</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select symptom...</option>
              {airflowSymptoms.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>BLOWER MOTOR AGE (ESTIMATE)</label>
            <select value={motorAge} onChange={e => setMotorAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select age range...</option>
              {motorAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <button onClick={() => { if (symptom && motorAge) setResult(getBlowerAssessment(symptom, motorAge)); }} disabled={!symptom || !motorAge} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!symptom || !motorAge) ? 0.5 : 1 }}>
            Assess Blower Motor
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 Blower Assessment</h3>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>MOTOR FAILURE LIKELIHOOD: </span><span style={{ color: '#E8EFF8', fontWeight: 700 }}>{result.motorLikelihood}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>CAPACITOR CHECK: </span><span style={{ color: '#E8EFF8′ }}>{result.capacitorLikelihood}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>ESTIMATED COST: </span><span style={{ color: '#E8EFF8′ }}>{result.cost}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>URGENCY: </span><span style={{ color: '#E8EFF8′ }}>{result.urgency}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

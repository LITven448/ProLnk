import { useState } from 'react';

const scenarios = ['Saw ice on refrigerant lines outside', 'AC running but no cool air — hot day', 'AC iced over inside air handler', 'AC stopped cooling after filter change', 'Water pooling under indoor unit'];
const additionalSymptoms = ['Dirty/clogged filter confirmed', 'Low refrigerant (tech diagnosed)', 'All vents were closed or blocked', 'Filter was fine — unknown cause', 'Just moved in, unknown history'];

function getCoilAssessment(scenario: string, symptom: string) {
  const isRefrigerant = symptom.includes('Low refrigerant');
  const isAirflow = symptom.includes('Dirty') || symptom.includes('vents') || symptom.includes('filter');
  const cause = isRefrigerant ? '🧊 Low refrigerant — refrigerant leak likely' : isAirflow ? '💨 Restricted airflow — most fixable cause' : '❓ Unknown — needs diagnostic';
  const immediateSteps = ['1. Turn AC off immediately — running a frozen coil damages compressor', '2. Switch fan to ON (not auto) to thaw coil — takes 1–3 hours', '3. Check and replace filter while thawing', '4. Do NOT run AC until fully thawed and cause identified'];
  const whatNotToDo = ['Do NOT chip ice off coils — damages delicate fins', 'Do NOT use heat gun or hair dryer to thaw', 'Do NOT restart AC until root cause fixed', 'Do NOT ignore — DFW heat will cause compressor damage'];
  const urgency = scenario.includes('hot day') || scenario.includes('running but') ? '🔴 Critical — compressor at risk in DFW heat' : '🟠 High — resolve within hours';
  return { cause, immediateSteps, whatNotToDo, urgency };
}

export default function DFWHVACCoilFreezeGuide() {
  const [scenario, setScenario] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getCoilAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🧊 Coil Freeze Guide</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Paradox: your AC can freeze in 105°F DFW heat. Frozen coils are a symptom of a bigger problem — and running a frozen AC in DFW summer can destroy a $3,000+ compressor in hours.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>❄️ Why Coils Freeze in DFW Summer</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EFF8' }}>Low refrigerant (most serious):</strong> Refrigerant pressure drops, coil temperature falls below 32°F</li>
            <li><strong style={{ color: '#E8EFF8' }}>Dirty air filter:</strong> Restricted airflow starves coil of warm return air</li>
            <li><strong style={{ color: '#E8EFF8' }}>Blocked vents:</strong> Closing too many vents creates same airflow restriction</li>
            <li><strong style={{ color: '#E8EFF8' }}>Dirty evaporator coil:</strong> Insulating layer of dust prevents heat transfer</li>
            <li>DFW danger: heat outside makes indoor coil work harder — freeze is more catastrophic here than in mild climates</li>
          </ul>
        </div>

        <div style={{ background: '#1A0A0A', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #8B0000' }}>
          <h2 style={{ color: '#FF6B6B', fontSize: 18, marginBottom: 12 }}>🚨 DFW-Specific Warning</h2>
          <p style={{ color: '#C8D8E8', lineHeight: 1.7 }}>
            In DFW 100°F+ heat, running a frozen AC for even 30 minutes can cause liquid refrigerant to flood the compressor (slugging). Compressor replacement: $1,500–$3,500. Turn it off now and thaw first.
          </p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Diagnose My Coil Freeze</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>WHAT I SAW</label>
            <select value={scenario} onChange={e => setScenario(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select scenario...</option>
              {scenarios.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>ADDITIONAL INFO</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select what you know...</option>
              {additionalSymptoms.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => { if (scenario && symptom) setResult(getCoilAssessment(scenario, symptom)); }} disabled={!scenario || !symptom} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!scenario || !symptom) ? 0.5 : 1 }}>
            Get Immediate Steps
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Coil Freeze Action Plan</h3>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>LIKELY CAUSE: </span><span style={{ color: '#E8EFF8', fontWeight: 700 }}>{result.cause}</span></div>
            <div style={{ marginBottom: 8, color: '#8BA0B8', fontSize: 13 }}>URGENCY: <span style={{ color: '#E8EFF8' }}>{result.urgency}</span></div>
            <div style={{ marginTop: 16 }}>
              <div style={{ color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>✅ DO THIS NOW:</div>
              {result.immediateSteps.map(s => <div key={s} style={{ color: '#C8D8E8', marginBottom: 6, paddingLeft: 8 }}>{s}</div>)}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ color: '#FF6B6B', marginBottom: 8, fontWeight: 700 }}>🚫 DO NOT:</div>
              {result.whatNotToDo.map(s => <div key={s} style={{ color: '#C8D8E8', marginBottom: 6, paddingLeft: 8 }}>{s}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

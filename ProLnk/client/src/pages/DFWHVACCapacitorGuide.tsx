import { useState } from 'react';

const symptoms = ['AC clicks but won\’t start', 'Motor hums but doesn\’t spin', 'AC shuts off quickly', 'Warm air from vents', 'Unusual buzzing noise'];
const seasons = ['Peak Summer (Jun-Sep)', 'Early Summer (May)', 'Fall (Oct-Nov)', 'Winter (Dec-Feb)', 'Spring (Mar-Apr)'];

function getAssessment(symptom: string, season: string) {
  const isPeak = season.includes('Peak') || season.includes('Early');
  const isCapacitorSymptom = symptom.includes('clicks') || symptom.includes('hums') || symptom.includes('quickly');
  const likelihood = isCapacitorSymptom ? (isPeak ? 'Very High (85%)' : 'High (65%)') : (isPeak ? 'Moderate (45%)' : 'Low (25%)');
  const urgency = isPeak ? '🔴 Critical — DFW heat can damage compressor within hours' : '🟡 Moderate — Schedule within 1-2 days';
  const cost = '$150–$450 for capacitor replacement vs $350–$700 full service call';
  const rec = isCapacitorSymptom
    ? '⚡ DIY possible but high-voltage risk. Capacitors store lethal charge even unpowered. Tech recommended for safety.'
    : '🔧 Schedule a full diagnostic — multiple causes possible.';
  return { likelihood, urgency, cost, rec };
}

export default function DFWHVACCapacitorGuide() {
  const [symptom, setSymptom] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getAssessment> | null>(null);

  function handleCheck() {
    if (symptom && season) setResult(getAssessment(symptom, season));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>⚡ Capacitor Failure Guide</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          The #1 HVAC failure in DFW summers. Capacitors power your compressor and fan motors — extreme heat (100°F+) degrades them fast. A failed capacitor strands your AC in peak heat.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ How DFW Heat Kills Capacitors</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Capacitors rated to 105°F — attic temps reach 140°F in DFW July</li>
            <li>Each 18°F above rated temp cuts capacitor lifespan in half</li>
            <li>Units running 16+ hrs/day in summer accelerate wear exponentially</li>
            <li>Dual-run capacitors (run both compressor + fan) fail together</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚠️ Warning: High Voltage</h2>
          <p style={{ color: '#C8D8E8', lineHeight: 1.7 }}>
            Capacitors store 370–440V even when power is off. Discharge before touching. If unfamiliar with electrical safety, call a tech — a $200 service call beats an ER visit.
          </p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Check My Symptoms</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>AC SYMPTOM</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select symptom...</option>
              {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>DFW SEASON</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select season...</option>
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={handleCheck} disabled={!symptom || !season} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!symptom || !season) ? 0.5 : 1 }}>
            Assess Capacitor Risk
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 Assessment Result</h3>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>CAPACITOR LIKELIHOOD: </span><span style={{ color: '#E8EFF8', fontWeight: 700 }}>{result.likelihood}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>URGENCY: </span><span style={{ color: '#E8EFF8′ }}>{result.urgency}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>COST RANGE: </span><span style={{ color: '#E8EFF8′ }}>{result.cost}</span></div>
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#C8D8E8', lineHeight: 1.6 }}>{result.rec}</div>
          </div>
        )}
      </div>
    </div>
  );
}

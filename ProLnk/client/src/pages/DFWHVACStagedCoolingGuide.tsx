import { useState } from 'react';

const homeSituations = ['New construction — choosing system', 'Replacing old single-stage system', 'High humidity complaints year-round', 'Energy bills feel too high', 'Uneven temps room to room'];
const humidityComplaints = ['House feels clammy even when cool', 'Condensation on windows in summer', 'No humidity issues — just want cold', 'Allergies or mold concerns', 'Some rooms feel muggy'];

function getStagedAssessment(situation: string, humidity: string) {
  const hasHumidityIssue = humidity.includes('clammy') || humidity.includes('Condensation') || humidity.includes('mold') || humidity.includes('muggy');
  const isNewOrReplace = situation.includes('New') || situation.includes('Replacing');
  const recommendation = hasHumidityIssue ? 'Two-Stage or Variable Speed — Strong Recommendation' : isNewOrReplace ? 'Two-Stage — Recommended for DFW' : 'Two-Stage worthwhile — cost/benefit favorable';
  const humidityImprovement = hasHumidityIssue ? '30–50% improvement in relative humidity control' : 'Noticeable improvement, especially June–September';
  const costPremium = '$600–$1,400 over single-stage at time of installation';
  const dfwAdvantage = 'DFW\’s long humid shoulder seasons (May, October) make two-stage run times ideal — low-stage dehumidifies while maintaining comfort at lower cost';
  const payback = hasHumidityIssue ? '2–4 years via energy savings + avoided dehumidifier costs' : '4–7 years via energy savings alone';
  return { recommendation, humidityImprovement, costPremium, dfwAdvantage, payback };
}

export default function DFWHVACStagedCoolingGuide() {
  const [situation, setSituation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getStagedAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🌡️ Two-Stage vs Single-Stage Cooling</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW's climate — extreme heat plus significant humidity — makes this decision more impactful than almost anywhere in the US. A two-stage system isn’t just comfort, it’s humidity control that matters 7 months a year.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔄 Why DFW Favors Two-Stage</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EFF8′ }}>Single-stage:</strong> 100% capacity or off. Short cycles = poor dehumidification</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Two-stage low (67%):</strong> Runs longer at lower cost, removing more moisture</li>
            <li>DFW humidity averages 70–80% in summer — dehumidification matters as much as cooling</li>
            <li>Longer low-stage run times = better air circulation and filtration</li>
            <li>Variable speed (top tier): near-continuous operation, best humidity control</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 System Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#C8D8E8', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E3A5F' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#F5E642′ }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px', color: '#F5E642′ }}>Single</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px', color: '#F5E642′ }}>Two-Stage</th>
                </tr>
              </thead>
              <tbody>
                {[['Humidity control', 'Poor', 'Good'], ['Energy use', 'Higher', 'Lower 15-25%'], ['Upfront cost', 'Lower', '+$600–$1,400'], ['DFW summers', 'Works', 'Recommended']].map(([f, s, t]) => (
                  <tr key={f} style={{ borderBottom: '1px solid #0A1628′ }}>
                    <td style={{ padding: '10px 12px' }}>{f}</td>
                    <td style={{ textAlign: 'center', padding: '10px 12px' }}>{s}</td>
                    <td style={{ textAlign: 'center', padding: '10px 12px', color: '#F5E642′ }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get My DFW Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>MY SITUATION</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select situation...</option>
              {homeSituations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>HUMIDITY SITUATION</label>
            <select value={humidity} onChange={e => setHumidity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select humidity complaint...</option>
              {humidityComplaints.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <button onClick={() => { if (situation && humidity) setResult(getStagedAssessment(situation, humidity)); }} disabled={!situation || !humidity} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!situation || !humidity) ? 0.5 : 1 }}>
            Get DFW Recommendation
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>✅ DFW System Recommendation</h3>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>RECOMMENDATION: </span><span style={{ color: '#E8EFF8', fontWeight: 700 }}>{result.recommendation}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>HUMIDITY IMPROVEMENT: </span><span style={{ color: '#E8EFF8′ }}>{result.humidityImprovement}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>COST PREMIUM: </span><span style={{ color: '#E8EFF8′ }}>{result.costPremium}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>PAYBACK PERIOD: </span><span style={{ color: '#E8EFF8′ }}>{result.payback}</span></div>
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#C8D8E8', lineHeight: 1.6, fontSize: 14 }}>{result.dfwAdvantage}</div>
          </div>
        )}
      </div>
    </div>
  );
}

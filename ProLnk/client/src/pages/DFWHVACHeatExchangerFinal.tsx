import { useState } from 'react';

const furnaceAge = ['Under 5 years', '5–10 years', '10–15 years', '15–20 years', 'Over 20 years', "Don't know"];
const situations = ['Smelling something odd when heat runs', 'Carbon monoxide alarm went off', 'Annual maintenance coming up', 'Buying or selling a DFW home', 'My bill seems higher', 'No specific concern — just learning'];

const getAssessment = (age: string, situation: string) => {
  if (!age || !situation) return null;
  const isOld = age.includes('15') || age.includes('20') || age.includes('Over');
  const isMid = age.includes('10');
  const isAlarm = situation.includes('alarm');
  const isSmell = situation.includes('Smelling');

  if (isAlarm) return {
    urgency: '🚨 Emergency — Leave Home Now',
    color: '#ef4444',
    assessment: 'A CO alarm means CO may be present. Evacuate immediately, call 911, then call your HVAC company. Do not re-enter until cleared by fire department. A cracked heat exchanger is the most common HVAC source of CO.',
    recommendation: 'Emergency inspection required before system can be operated. Replacement likely if crack confirmed.',
    inspectionNote: 'Combustion analysis + visual inspection + CO test mandatory. Do not accept "it looks fine" — require written report.',
    cost: 'Emergency inspection: $150–$300 | Replacement if cracked: $1,500–$3,500 (exchanger only) or $4,500–$8,000 (full system if old)'
  };
  if (isSmell && isOld) return {
    urgency: '🔴 High Priority — Inspect This Week',
    color: '#ef4444',
    assessment: 'Metallic or burning smell from an older DFW furnace is a classic cracked heat exchanger symptom. DFW furnaces cycle through large temperature swings Jan-Feb causing thermal fatigue. Do not delay.',
    recommendation: 'Schedule combustion safety inspection. If crack found, replace heat exchanger or full system.',
    inspectionNote: 'Ask specifically for: combustion analysis, visual inspection with mirrors, CO reading at supply registers.',
    cost: 'Inspection: $100–$200 | Heat exchanger repair/replacement: $1,500–$3,500 | Full system: $4,500–$8,000'
  };
  if (isSmell) return {
    urgency: '🟡 Schedule Inspection Soon',
    color: '#f59e0b',
    assessment: 'Unusual smells during furnace operation should always be investigated. Even newer systems can have manufacturing defects or early fatigue cracks. DFW\’s humidity and temperature extremes stress components.',
    recommendation: 'Schedule inspection within 2 weeks. Likely nothing serious but should be confirmed.',
    inspectionNote: 'Ask for combustion analysis — it\’s the only reliable way to detect a crack that looks fine visually.',
    cost: 'Inspection: $100–$200 | Usually no repair needed on newer systems'
  };
  if (isOld) return {
    urgency: '🟡 Annual Inspection Critical',
    color: '#f59e0b',
    assessment: 'A 15-20+ year DFW furnace has experienced hundreds of heating cycles. The heat exchanger is under thermal stress every time it fires. At this age, annual combustion analysis is not optional.',
    recommendation: 'Schedule inspection before next heating season. Begin budgeting for system replacement.',
    inspectionNote: 'For furnaces over 20 years: replacement is often more economical than major heat exchanger repair.',
    cost: 'Annual inspection: $100–$200 | At this age, budget $5,000–$9,000 for eventual replacement'
  };
  if (isMid) return {
    urgency: '🟢 Normal Maintenance Window',
    color: '#22c55e',
    assessment: 'A 10-15 year DFW furnace is entering the age where heat exchanger inspection becomes important. DFW\’s short but intense heating season means fewer cycles than northern cities, but temperature extremes cause more stress per cycle.',
    recommendation: 'Include combustion analysis in annual tune-up. No immediate concern.',
    inspectionNote: 'Start keeping records now — if a crack develops, you\’ll want documentation for warranty or insurance.',
    cost: 'Annual tune-up with combustion analysis: $100–$175'
  };
  return {
    urgency: '🟢 Normal — Annual Check Sufficient',
    color: '#22c55e',
    assessment: 'Your furnace is in the low-risk window for heat exchanger issues. DFW homeowners benefit from annual maintenance to catch issues early, but heat exchanger failure at this age is uncommon.',
    recommendation: 'Annual tune-up is sufficient. Ask your tech to check for any visible issues during maintenance.',
    inspectionNote: 'Good time to photograph your heat exchanger and start a maintenance log for future reference.',
    cost: 'Annual tune-up: $80–$150'
  };
};

export default function DFWHVACHeatExchangerFinal() {
  const [age, setAge] = useState('');
  const [situation, setSituation] = useState('');
  const assessment = getAssessment(age, situation);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Heat Exchangers in DFW Furnaces: Safety, Lifespan & Inspection Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>A cracked heat exchanger is the #1 CO danger in DFW homes. Learn what it does, when to worry, and what to ask your HVAC tech.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔥 What Does a Heat Exchanger Do?</h2>
          <div style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>The heat exchanger is a metal chamber inside your furnace that separates combustion gases (CO, NOx) from the air blown into your home. Flame heats the metal; your air handler blows over it to capture that heat without mixing with combustion byproducts. When it cracks, those gases enter your living space.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🌡️ DFW Stress Factor', 'DFW furnaces cycle from 40°F to 140°F per firing. Short intense winters cause fewer cycles but more thermal shock than northern cities.'],['⏰ Expected Lifespan', '15-25 years. DFW\’s humidity in off-season causes internal corrosion — inspect earlier than northern markets.'],['🚨 Crack Warning Signs', 'Burning/metallic smell, CO alarm, soot on furnace, visible rust streaks, higher bills when heating.'],['🔬 Inspection Method', 'Combustion analysis + mirror/camera visual + CO reading at registers. Dye test for definitive confirmation.']].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🩺 Assess Your DFW Furnace</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Furnace age</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select furnace age...</option>
              {furnaceAge.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Your situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {situations.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {assessment && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${assessment.color}` }}>
              <div style={{ color: assessment.color, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{assessment.urgency}</div>
              <div style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>{assessment.assessment}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642' }}>✅ Recommendation: </span><span style={{ color: '#e2e8f0', fontSize: 14 }}>{assessment.recommendation}</span></div>
              <div style={{ background: '#0f2040', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <span style={{ color: '#F5E642' }}>🔧 What to ask your inspector: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{assessment.inspectionNote}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 13 }}>💰 {assessment.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Find a DFW Furnace Safety Inspection Pro</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk connects you with DFW HVAC pros who perform proper combustion analysis — not just a visual check</div>
        </div>
      </div>
    </div>
  );
}

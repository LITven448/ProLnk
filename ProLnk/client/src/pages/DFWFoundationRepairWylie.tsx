import { useState } from 'react';

const homeAges = ['Built 2010+', 'Built 2000–2010', 'Built 1990–2000', 'Built before 1990'];
const symptoms = ['None — Preventive', 'Sticking Doors/Windows', 'Visible Cracks — Interior', 'Visible Cracks — Exterior', 'Uneven Floors'];

type FoundResult = { severity: string; action: string; cost: string; urgency: string };

const matrix: Record<string, Record<string, FoundResult>> = {
  'Built 2010+': {
    'None — Preventive': { severity: '✅ Low Risk', action: 'New construction on clay-rocky mix soils still requires annual moisture management. Inspect perimeter drainage.', cost: '$200 – $500', urgency: 'Annual inspection recommended.' },
    'Sticking Doors/Windows': { severity: '🟡 Early Warning', action: 'Seasonal movement common in Wylie clay soils. Monitor over 90 days — if worsening, schedule evaluation.', cost: '$800 – $2,500', urgency: 'Schedule within 60 days.' },
    'Visible Cracks — Interior': { severity: '🟡 Evaluate Now', action: 'Hairline drywall cracks normal in new construction settling. Stair-step or diagonal cracks need inspection.', cost: '$2,000 – $6,000', urgency: 'Schedule within 30 days.' },
    'Visible Cracks — Exterior': { severity: '🔴 Inspect Immediately', action: 'Exterior brick cracks on newer homes indicate foundation movement beyond normal settling. Do not delay.', cost: '$5,000 – $15,000', urgency: 'Inspect within 1–2 weeks.' },
    'Uneven Floors': { severity: '🔴 High Concern', action: 'Floor slope in new construction suggests soil compression or poor compaction at build time. Get structural evaluation.', cost: '$6,000 – $18,000', urgency: 'Inspect immediately.' },
  },
  'Built 2000–2010': {
    'None — Preventive': { severity: '✅ Proactive Smart Move', action: 'Wylie\’s east Collin County soils shrink in drought and expand in rain. Evaluate drainage and root barriers.', cost: '$300 – $700', urgency: 'Schedule before next dry season.' },
    'Sticking Doors/Windows': { severity: '🟡 Probable Soil Movement', action: 'Homes this age in Wylie commonly show soil-driven movement. Hydraulic pier evaluation is the next step.', cost: '$3,000 – $8,000', urgency: 'Schedule within 30 days.' },
    'Visible Cracks — Interior': { severity: '🟡 Evaluate Soon', action: 'Interior cracks in this age bracket often indicate progressive settlement. Document crack widths before evaluation.', cost: '$4,000 – $12,000', urgency: 'Schedule within 2–3 weeks.' },
    'Visible Cracks — Exterior': { severity: '🔴 Urgent', action: 'Exterior cracks on homes 15–25 years old in Wylie are a significant signal. Hydraulic piers likely needed.', cost: '$8,000 – $20,000', urgency: 'Do not delay — schedule this week.' },
    'Uneven Floors': { severity: '🔴 Structural Concern', action: 'Floor slope exceeding 1 inch per 20 feet requires immediate professional structural evaluation in Collin County.', cost: '$10,000 – $25,000', urgency: 'Immediate evaluation required.' },
  },
  'Built 1990–2000': {
    'None — Preventive': { severity: '🟡 Preventive Evaluation Advised', action: 'Homes 25–35 years old in east Collin County rocky clay soils benefit from proactive pier inspection.', cost: '$350 – $800', urgency: 'Schedule this season.' },
    'Sticking Doors/Windows': { severity: '🔴 Likely Foundation Movement', action: 'At this age, sticking doors and windows in Wylie soil almost always trace to foundation settlement.', cost: '$5,000 – $14,000', urgency: 'Schedule within 2 weeks.' },
    'Visible Cracks — Interior': { severity: '🔴 Action Required', action: 'Interior stair-step cracks in 25+ year Wylie homes are a red flag. Get three foundation contractor bids.', cost: '$7,000 – $18,000', urgency: 'Schedule this week.' },
    'Visible Cracks — Exterior': { severity: '🚨 Emergency Assessment', action: 'Wide exterior cracks (>1/4 inch) on older Wylie homes indicate significant soil-driven movement. Act now.', cost: '$12,000 – $28,000', urgency: 'Schedule inspection immediately.' },
    'Uneven Floors': { severity: '🚨 Structural Emergency', action: 'Severe floor slope on 30-year Wylie construction requires engineer\’s report alongside contractor evaluation.', cost: '$15,000 – $35,000', urgency: 'Structural engineer + contractor today.' },
  },
  'Built before 1990': {
    'None — Preventive': { severity: '🟡 High-Priority Inspection', action: 'Pre-1990 Wylie homes have had 35+ years of soil movement cycles. Baseline inspection is essential.', cost: '$400 – $900', urgency: 'Do not skip annual inspection.' },
    'Sticking Doors/Windows': { severity: '🔴 Foundation Movement Confirmed', action: 'Sticking doors in older Wylie homes almost always confirm decades of progressive settlement.', cost: '$8,000 – $20,000', urgency: 'Do not wait — book evaluation.' },
    'Visible Cracks — Interior': { severity: '🚨 Urgent Repair', action: 'Multiple interior cracks in pre-1990 Wylie homes indicate compounding settlement. Structural review needed.', cost: '$10,000 – $28,000', urgency: 'Inspection this week.' },
    'Visible Cracks — Exterior': { severity: '🚨 Emergency Repair', action: 'Extensive exterior cracking in older homes signals decades of unchecked movement. Full pier system likely needed.', cost: '$18,000 – $40,000', urgency: 'Emergency inspection — call today.' },
    'Uneven Floors': { severity: '🚨 Structural Failure Risk', action: 'Significant floor slope in pre-1990 Wylie construction is a life-safety concern. Halt use of affected areas.', cost: '$22,000 – $50,000+', urgency: 'Engineer evaluation today.' },
  },
};

export default function DFWFoundationRepairWylie() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');

  const result = age && symptom ? matrix[age]?.[symptom] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏗️ ProLnk · Wylie TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Wylie TX Foundation Repair</h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>East Collin County Specialists</p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          Wylie sits on some of east Collin County's most challenging soil — a mix of rocky subsoil and expansive clay that swells in wet seasons and shrinks in drought. Rapid new construction growth adds soil compaction risk for newer homes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[
            ['🪨', 'Rocky Clay Mix Soils', 'East Collin County soil expands and contracts with moisture — the primary driver of foundation movement in Wylie.'],
            ['📈', 'Rapid Growth Risk', 'New developments sometimes face improper soil compaction at build time, causing early settlement.'],
            ['🌧️', 'Drought + Rain Cycles', 'North Texas drought cycles accelerate soil shrinkage under slabs — preventive drainage is critical.'],
            ['💰', 'Resale Protection', 'Foundation repair with warranty transfers significantly protects Wylie home resale values in Collin County market.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🏠 Wylie Foundation Assessment Tool</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>When was your home built?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeAges.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1e3a5f', backgroundColor: age === a ? '#F5E642' : 'transparent', color: age === a ? '#0A1628' : '#fff', fontWeight: age === a ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{a}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>What symptoms are you seeing?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {symptoms.map(s => (
                <button key={s} onClick={() => setSymptom(s)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: symptom === s ? '#F5E642' : '#1e3a5f', backgroundColor: symptom === s ? '#F5E642' : 'transparent', color: symptom === s ? '#0A1628' : '#fff', fontWeight: symptom === s ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{result.severity}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 8, fontSize: 14 }}>{result.action}</div>
              <div style={{ color: '#fbbf24', marginBottom: 16, fontSize: 13 }}>⏰ {result.urgency}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Wylie Market Estimate</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.cost}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>Get Foundation Quotes →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk connects Wylie homeowners with Collin County's most trusted foundation repair specialists.
        </div>
      </div>
    </div>
  );
}

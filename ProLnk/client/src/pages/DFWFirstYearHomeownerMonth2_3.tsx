import { useState } from 'react';

export default function DFWFirstYearHomeownerMonth2_3() {
  const [season, setSeason] = useState('');

  const checklists: Record<string, string[]> = {
    spring: [
      '❄️ Schedule AC tune-up NOW — DFW summer hits fast and technicians book up by May',
      '🔌 Test all GFCI outlets (bathrooms, kitchen, garage, exterior)',
      '🌡️ Check attic insulation — DFW needs R-38 minimum to survive summer',
      '📄 Read HOA documents fully — grass height violations start when it gets warm',
      '🌱 Start foundation watering routine — clay soil shrinks when dry',
      '👋 Introduce yourself to neighbors on each side',
    ],
    summer: [
      '💨 Replace HVAC filter again — summer runs your system 12+ hrs/day',
      '🔌 Test GFCI outlets — moisture and heat cause more trips in summer',
      '🌡️ Check attic for signs of heat damage (warped wood, animal entry)',
      '📄 Check HOA rules on pools, structures, visible storage',
      '💧 Increase foundation watering — 30 min every other day during July heat',
      '👋 Meet neighbors — summer block activity is high in DFW suburbs',
    ],
    fall: [
      '🔥 Schedule furnace tune-up — DFW winters are short but cold snaps are real',
      '🔌 Test all GFCI outlets before holiday appliance loads increase',
      '🌡️ Inspect attic before holiday storage goes in',
      '📄 Review HOA docs for holiday decoration rules — many DFW HOAs restrict display dates',
      '🌧️ Reduce foundation watering — fall rains usually handle it',
      '👋 Introduce yourself before the holidays if you haven't yet',
    ],
    winter: [
      '🔥 Test furnace now — DFW had a freeze event in 2021 that exposed many unready homes',
      '🔌 Test GFCI outlets — less frequent use means faults go unnoticed',
      '🌡️ Check attic insulation before January — DFW pipes are at risk below 28°F',
      '📄 Read HOA parking and holiday rules before Super Bowl parties and visitors',
      '❄️ Know your pipe locations — wrap exterior hose bibs if temps drop below 28°F',
      '👋 Check on elderly neighbors during cold snaps',
    ],
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏡 Months 2–3 DFW Homeowner Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>You are settled in. Now it is time to get ahead of seasonal issues before they become expensive repairs.</p>

        <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>What season did you move in?</label>
        <select
          value={season}
          onChange={e => setSeason(e.target.value)}
          style={{ background: '#1e2d45', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', marginBottom: 28 }}
        >
          <option value="">Select your move-in season</option>
          <option value="spring">Spring (Mar–May)</option>
          <option value="summer">Summer (Jun–Aug)</option>
          <option value="fall">Fall (Sep–Nov)</option>
          <option value="winter">Winter (Dec–Feb)</option>
        </select>

        {season && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your Months 2–3 Checklist</h2>
            {checklists[season].map((item, i) => (
              <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', marginBottom: 10, fontSize: 15, borderLeft: '3px solid #F5E642' }}>
                {item}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ HOA Reality Check</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            Over 60% of DFW homes are in HOA communities. Violations for grass height, unapproved paint, visible trash bins, and parked vehicles are the top 4 complaints. Read your CCRs before months 2–3.
          </div>
        </div>
      </div>
    </div>
  );
}


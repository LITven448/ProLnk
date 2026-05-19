import { useState } from 'react';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const currentMonth = new Date().getMonth();

const seasonData: Record<string, { label: string; emoji: string; todayFocus: string; weekFocus: string; seasonFocus: string; yearFocus: string }> = {
  winter: {
    label: 'Winter (Dec–Feb)',
    emoji: '❄️',
    todayFocus: 'Drip your faucets if temps drop below 28°F tonight. Check your heating system is running clean.',
    weekFocus: 'Inspect pipe insulation under sinks and in the garage. Review your emergency water shutoff location.',
    seasonFocus: 'DFW winters can freeze fast. Your generator, backup heat plan, and plumber\’s number should be ready now — not during the storm.',
    yearFocus: 'Winter is planning season. Use the quiet months to schedule your spring HVAC service, get roofing quotes, and set your home improvement budget.',
  },
  spring: {
    label: 'Spring (Mar–May)',
    emoji: '🌸',
    todayFocus: 'Check gutters after last night\’s storm. DFW spring storms hit fast and leave debris that blocks drainage.',
    weekFocus: 'Schedule your AC service now — before June backlogs hit and every HVAC company in DFW is slammed.',
    seasonFocus: 'Spring is your maintenance window. Roof inspection after hail season, foundation watering schedule starting now, pest control refresh.',
    yearFocus: 'The moves you make in spring determine your summer comfort. Deferred maintenance compounds in DFW heat.',
  },
  summer: {
    label: 'Summer (Jun–Aug)',
    emoji: '☀️',
    todayFocus: 'Set your thermostat to 78°F when home, 85°F when away. DFW grid peaks 3-7 PM — every degree counts.',
    weekFocus: 'Water your foundation 3x per week. DFW clay soil shrinks in heat — consistent moisture prevents movement.',
    seasonFocus: 'Summer is about protection, not improvement. Keep your AC running, your foundation watered, and your emergency contacts ready.',
    yearFocus: 'Fall is your big improvement window. Start planning projects now so you can execute September-November when weather cooperates.',
  },
  fall: {
    label: 'Fall (Sep–Nov)',
    emoji: '🍂',
    todayFocus: 'Fall is DFW\’s best building season. Hire now while contractor availability is highest and before the holiday slowdown.',
    weekFocus: 'Get your heating system inspected. DFW doesn\’t freeze often — but when it does, you want proof your heater works.',
    seasonFocus: 'The best 10 weeks to do home improvement in DFW: September 15 through November 30. Mild temps, available pros, no holiday premium.',
    yearFocus: 'Prepare your home for winter now. Pipe insulation, generator test, heating inspection — do it in October, not February.',
  },
};

const situationInsights: Record<string, string[]> = {
  'New homeowner (first 2 years)': [
    '📋 Build your home binder: permits, warranties, appliance manuals, contractor contacts.',
    '🔍 Schedule a one-year inspection — catches issues before warranties expire.',
    '💧 Learn your foundation watering system. In DFW, this is not optional.',
    '📞 Find and save: 1 plumber, 1 HVAC, 1 electrician you trust before you need them.',
  ],
  'Established owner (3–10 years)': [
    '🏠 By year 5-7, major systems are aging together. AC, water heater, and roof often hit end-of-life in the same 3-year window.',
    '📊 Consider a home inspection now — before things break — to build a proactive replacement timeline.',
    '💰 Start a home reserve fund: 1-2% of home value per year for maintenance and replacement.',
    '🔧 Review what\’s been deferred. DFW heat accelerates deferred maintenance consequences.',
  ],
  'Preparing to sell': [
    '💡 In DFW, buyers care most about: HVAC age, roof condition, and foundation stability — in that order.',
    '📸 Get a pre-listing inspection. Surprises during buyer inspection kill deals. Surprises you find first are manageable.',
    '🎨 High-ROI pre-sale moves: fresh interior paint, updated light fixtures, landscaping refresh, pressure wash.',
    '⚠️ Disclose everything about foundation history. Texas disclosure law is strict and buyers\’ inspectors always find it.',
  ],
  'Investment/rental property': [
    '🔧 Rental properties in DFW need HVAC service twice a year — tenants run AC 9 months out of 12.',
    '📋 Build a vendor list: after-hours plumber, locksmith, HVAC emergency — you will need all of them.',
    '💰 Budget 12-15% of gross rent for maintenance + CapEx reserves in DFW. More than national average due to climate.',
    '📊 Annual walkthrough before lease renewal: catches tenant damage and deferred maintenance before it compounds.',
  ],
  'Long-term owner (10+ years)': [
    '🔄 Systems age: AC 15-20 years, water heater 10-15, roof 20-30. Where are you in each cycle?',
    '🏠 Older DFW homes often have original plumbing (galvanized), original electrical panels, original insulation — all worth assessing.',
    '💡 Energy efficiency upgrades pay back fastest in DFW: attic insulation, air sealing, smart thermostat.',
    '📊 Consider a full home assessment — your home has likely never been fully evaluated since you moved in.',
  ],
};

function getSeason(month: number) {
  if (month >= 11 || month <= 1) return 'winter';
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  return 'fall';
}

export default function DFWProLnkMorningPage() {
  const [situation, setSituation] = useState('');
  const [customMonth, setCustomMonth] = useState(currentMonth);

  const season = getSeason(customMonth);
  const sd = seasonData[season];
  const insights = situationInsights[situation] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>{sd.emoji}</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Good Morning, DFW Homeowner</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Your ProLnk morning brief — what matters today, this week, this season, and this year</p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>DFW Month</label>
            <select value={customMonth} onChange={e => setCustomMonth(Number(e.target.value))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#111f3a', border: '1px solid #1e3a5f', color: '#fff', fontSize: 14 }}>
              {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 2, minWidth: 240 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Your Home Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#111f3a', border: '1px solid #1e3a5f', color: '#fff', fontSize: 14 }}>
              <option value=''>Select situation...</option>
              {Object.keys(situationInsights).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 20 }}>
          {sd.emoji} {sd.label} in DFW
        </div>

        {[
          { label: '📍 TODAY', color: '#22c55e', content: sd.todayFocus },
          { label: '📅 THIS WEEK', color: '#3b82f6', content: sd.weekFocus },
          { label: '🌤️ THIS SEASON', color: '#F5E642', content: sd.seasonFocus },
          { label: '🗓️ THIS YEAR', color: '#a855f7', content: sd.yearFocus },
        ].map(({ label, color, content }) => (
          <div key={label} style={{ background: '#111f3a', borderRadius: 10, padding: '16px', marginBottom: 12 }}>
            <div style={{ color, fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>{label}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{content}</p>
          </div>
        ))}

        {insights.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🏠 For Your Situation: {situation}</div>
            {insights.map((ins, i) => (
              <div key={i} style={{ background: '#111f3a', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 13, lineHeight: 1.6 }}>{ins}</div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, background: '#F5E642', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: '0 0 8px' }}>Your home is your largest asset.</p>
          <p style={{ color: '#0A1628', fontSize: 13, margin: 0 }}>ProLnk connects you to vetted DFW pros — before the emergency, on your schedule.</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const REPAIR_SCOPES = ['1–5 piers (minor repair)', '6–15 piers (moderate repair)', '16+ piers (major repair)', 'Full slab lift'];
const SEASONS_OF_REPAIR = ['Spring (Mar–May)', 'Summer (Jun–Aug)', 'Fall (Sep–Nov)', 'Winter (Dec–Feb)'];

type CareResult = { wateringSchedule: string; firstMonth: string; months2to6: string; monitoring: string[]; callBack: string };

const carePlans: Record<string, CareResult> = {
  '1–5 piers (minor repair)-Spring (Mar–May)': { wateringSchedule: '3x per week, 15–25 gal per session at foundation perimeter', firstMonth: 'Establish baseline soil moisture with meter. Target 55–65% volumetric content. Spring rains may handle some of this.', months2to6: 'Monitor weekly. Increase to daily if temps exceed 90°F for 3+ consecutive days.', monitoring: ['Check sticking doors weekly — should improve or stay stable', 'Walk perimeter after each rain — look for new pooling', 'Re-measure floors monthly with a level'], callBack: 'Doors worsen after month 2, or new exterior cracks appear' },
  '1–5 piers (minor repair)-Summer (Jun–Aug)': { wateringSchedule: 'Daily watering required — 20–30 gal per session. Critical first 90 days.', firstMonth: 'Summer repair is hardest to maintain. Soil dries in 24–48 hrs. Set soaker hose on timer. Check meter every 3 days. Target 60–70%.', months2to6: 'Continue daily through September. Fall rains will help — reduce to 3x/week when consistent rain arrives.', monitoring: ['Soil meter readings every 3 days', 'Note any new cracks in drywall — minor is OK, widening is not', 'Watch for tree proximity issues (roots competing for moisture)'], callBack: 'Any worsening crack width or new floor slope in first 6 months' },
  '1–5 piers (minor repair)-Fall (Sep–Nov)': { wateringSchedule: '2x per week, 15–20 gal. Fall rains often assist — check meter before each scheduled session.', firstMonth: 'Ideal season for repair — soil moisture more stable. Establish watering routine before winter dormancy.', months2to6: 'Reduce to weekly in December–February. Prepare for spring increase.', monitoring: ['Monthly level checks', 'Check gutter and downspout flow before winter rains'], callBack: 'New cracks or door issues emerging after 3+ months' },
  '1–5 piers (minor repair)-Winter (Dec–Feb)': { wateringSchedule: 'Weekly watering, 10–15 gal. Supplement during dry stretches over 2 weeks.', firstMonth: 'Winter repairs settle quickly in cool temps. Minimal watering needed but don\’t neglect during dry spells.', months2to6: 'Ramp up watering in March as temps rise. Have soaker hose and timer ready.', monitoring: ['Bimonthly level checks', 'Spring transition is highest risk period — increase monitoring in April'], callBack: 'Any sudden change in spring — this is when seasonal movement stress peaks' },
  '6–15 piers (moderate repair)-Spring (Mar–May)': { wateringSchedule: 'Daily for first 30 days, then 3x/week for months 2–6. 30–50 gal per session.', firstMonth: 'More piers = more soil disturbance. Watering is critical. Set multiple soaker zones around perimeter.', months2to6: 'Cosmetic repair (drywall, paint) should wait until month 3. Allow full settling cycle.', monitoring: ['Weekly door and window checks', 'Monthly elevation readings (hire a surveyor at month 6)', 'Log all watering sessions — needed for warranty claims'], callBack: 'New crack wider than ¼ inch, floor slope visibly worsening, or any pier movement sounds' },
  '6–15 piers (moderate repair)-Summer (Jun–Aug)': { wateringSchedule: 'Daily watering is non-negotiable — 40–60 gal per session for first 90 days.', firstMonth: 'Critical: Summer moderate repair requires the most intensive post-care of any scenario. Install timer-controlled soaker hose before crews leave.', months2to6: 'Continue heavy watering through October. Professional re-evaluation strongly recommended at 6 months.', monitoring: ['Soil meter every 48 hrs first month', 'Weekly visual inspection of all pier locations', 'Document before/after with photos dated'], callBack: 'Any worsening in first 90 days — company should provide free re-level if within warranty' },
  '6–15 piers (moderate repair)-Fall (Sep–Nov)': { wateringSchedule: '3x per week, 30–45 gal. Increase if October is dry. Winter reduction to weekly.', firstMonth: 'Good repair window. Establish watering before winter.', months2to6: 'Spring ramp-up most critical — April/May are peak stress months for post-repair homes.', monitoring: ['Bimonthly professional-grade level readings', 'Spring soil moisture check in March'], callBack: 'Any changes in spring — most common failure point for fall repairs' },
  '6–15 piers (moderate repair)-Winter (Dec–Feb)': { wateringSchedule: 'Weekly, 20–30 gal. Don\’t neglect dry January/February stretches.', firstMonth: 'Winter repairs are low-risk for first 3 months. Focus on preparing for spring.', months2to6: 'March–June are the test. Aggressive watering and monitoring required.', monitoring: ['Monthly level checks all winter', 'Daily monitoring in April–May'], callBack: 'Anything new in March–June period' },
  '16+ piers (major repair)-Spring (Mar–May)': { wateringSchedule: 'Daily for 90 days, then 3x/week. 50–80 gal per session. Professional irrigation system recommended.', firstMonth: 'Major repair requires professional-grade post-care plan. Request written care instructions from contractor.', months2to6: 'No cosmetic repairs until month 4 minimum. Hire surveyor for month 3 and month 6 evaluations.', monitoring: ['Professional elevation survey at months 3 and 6', 'Weekly door/window/floor checks', 'All observations documented for warranty'], callBack: 'Contractor must be notified of ANY new cracks within 30 days of repair — this is a warranty trigger' },
  '16+ piers (major repair)-Summer (Jun–Aug)': { wateringSchedule: 'Daily watering, 60–100 gal/session. This is a serious commitment — consider hiring a landscaping crew.', firstMonth: 'Summer major repair is the highest-risk scenario in DFW. Soil moisture management is a full-time job for first 90 days.', months2to6: 'Professional re-evaluation at 3 months required by most warranties. Document everything.', monitoring: ['Soil meter daily first 30 days', 'Professional survey at month 3', 'Photo log of all exterior and interior conditions'], callBack: 'Any change at all — you are in warranty protection period, use it' },
  '16+ piers (major repair)-Fall (Sep–Nov)': { wateringSchedule: 'Daily first 30 days, 3x/week months 2–3, 2x/week months 4–6.', firstMonth: 'Fall is optimal for major repairs. Still requires aggressive care.', months2to6: 'Spring monitoring most critical. Plan professional survey for March.', monitoring: ['Monthly professional-grade checks', 'Spring protocol starts March 1'], callBack: 'Any spring changes — April/May are highest risk' },
  '16+ piers (major repair)-Winter (Dec–Feb)': { wateringSchedule: '2x per week minimum, 30–50 gal. No neglect during dry stretches.', firstMonth: 'Winter major repair is lower risk but spring transition is high risk.', months2to6: 'Aggressive spring preparation. Surveyor at month 6 (likely June/July).', monitoring: ['Bimonthly all winter', 'Daily monitoring from March–May'], callBack: 'Spring transition — highest failure risk for winter major repairs' },
  'Full slab lift-Spring (Mar–May)': { wateringSchedule: 'Daily, 80–120 gal. Professional irrigation system required.', firstMonth: 'Full slab lift is the most intensive repair possible. Follow contractor post-care document exactly.', months2to6: 'Structural engineer re-evaluation at months 3, 6, and 12. Document obsessively.', monitoring: ['Professional survey months 3, 6, 12', 'Weekly interior inspection', 'Keep contractor on speed dial'], callBack: 'Immediately on any change — you have a full warranty, use it aggressively' },
  'Full slab lift-Summer (Jun–Aug)': { wateringSchedule: 'Daily, 100+ gal. Hire irrigation professional to set up and monitor.', firstMonth: 'Highest risk scenario. Consider delaying non-urgent full lifts until fall.', months2to6: 'Intensive monitoring protocol. PE surveys at months 3, 6, 12.', monitoring: ['PE survey every 3 months year one', 'Daily soil moisture readings', 'Full photo documentation'], callBack: 'Any change at all — call immediately' },
  'Full slab lift-Fall (Sep–Nov)': { wateringSchedule: 'Daily first 60 days, then 3x/week.', firstMonth: 'Best season for full lift. Lower immediate risk.', months2to6: 'Spring transition critical. PE survey at month 6.', monitoring: ['PE survey months 6 and 12', 'Spring daily monitoring'], callBack: 'Spring changes or anything new at month 6′ },
  'Full slab lift-Winter (Dec–Feb)': { wateringSchedule: '3x/week, 50–70 gal. Spring ramp-up to daily.', firstMonth: 'Lower immediate risk. Prepare aggressively for spring.', months2to6: 'Spring transition is high risk. PE survey at month 6.', monitoring: ['Monthly all winter', 'Daily April–June'], callBack: 'Spring transition — highest failure risk period' },
};

export default function DFWPostFoundationCare() {
  const [scope, setScope] = useState('');
  const [season, setSeason] = useState('');
  const key = scope && season ? `${scope}-${season}` : '';
  const result = key ? carePlans[key] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🏠</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Post-Foundation Repair Care Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            Foundation repair doesn't end when the crew leaves. In DFW, the first 6 months after pier installation are critical. 
            What you do — and don't do — determines whether the repair lasts or fails prematurely.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your Post-Repair Care Plan</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Repair Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select repair scope</option>
                {REPAIR_SCOPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Season of Repair</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select season</option>
                {SEASONS_OF_REPAIR.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💧 Watering Schedule</div><div style={{ color: '#E8EAF0', lineHeight: 1.6 }}>{result.wateringSchedule}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>📅 First 30 Days</div><div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.firstMonth}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>📅 Months 2–6</div><div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.months2to6}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>👁️ Monitoring Checklist</div>{result.monitoring.map((item, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', marginBottom: 3 }}>☐ {item}</div>)}</div>
              <div style={{ backgroundColor: '#1E1A2E', borderRadius: 8, padding: '0.8rem', borderLeft: '3px solid #EF4444′ }}><div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 4 }}>🚨 Call Your Contractor When:</div><div style={{ color: '#CBD5E1' }}>{result.callBack}</div></div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🌳 Tree Proximity Monitoring</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: '1rem' }}>
            Trees within 20 ft of your foundation compete directly for soil moisture — especially during DFW summers. Post-repair, monitor tree proximity carefully.
          </p>
          {[
            { icon: '🌳', label: 'Live Oaks & Pecans (30+ ft radius root zone)', action: 'Water tree drip line separately — do not rely on foundation watering to reach tree roots' },
            { icon: '🌿', label: 'Bradford Pears & Crepe Myrtles (15–20 ft radius)', action: 'Trim aggressively and monitor moisture zone overlap with foundation perimeter' },
            { icon: '⚠️', label: 'Any tree within 10 ft of foundation', action: 'Consult arborist — may need root barrier or removal to protect long-term pier performance' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.8rem', display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div><div style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.action}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

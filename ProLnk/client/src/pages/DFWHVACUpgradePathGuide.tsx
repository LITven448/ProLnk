import { useState } from 'react';

const situations = ['New to DFW, just bought home', 'High bills but system is only 5 years old', 'System is 12+ years old, bills climbing', 'Recent addition or renovation', 'Allergies or air quality concerns', 'Limited budget — want best ROI first'];
const budgets = ['Under $2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000–$20,000', '$20,000+ (comprehensive upgrade)'];

type UpgradeRec = { first_step: string; why: string; impact: string; next_steps: string };

const matrix: Record<string, Record<string, UpgradeRec>> = {
  'New to DFW, just bought home': {
    'Under $2,000': { first_step: 'Air sealing + blower door test', why: 'Before spending on anything else, find out how leaky your new home is. A blower door test ($300–$500) maps every air leak. Sealing attic bypasses and top plates costs $800–$1,500 and reduces cooling load by 15–25%.', impact: 'Reduces cooling load 15–25%, lowers humidity infiltration, extends system life.', next_steps: 'After air sealing: attic insulation if below R-38, then duct testing.' },
    '$2,000–$5,000': { first_step: 'Air sealing + attic insulation', why: 'DFW attics hit 140°F in summer. If you\’re below R-38, adding insulation to R-60 is the single highest-ROI improvement. Pair with air sealing for maximum impact.', impact: '20–30% reduction in cooling load. Payback typically 4–6 years.', next_steps: 'Duct testing and sealing next — poorly sealed ducts lose 25–40% of conditioned air in DFW.' },
    '$5,000–$10,000': { first_step: 'Air sealing + insulation + duct sealing', why: 'The three-part building envelope upgrade. In DFW, these three together reduce cooling load more than a new HVAC system would. Do these before replacing any equipment.', impact: '30–40% total load reduction. Existing system may now be oversized — good problem to have.', next_steps: 'After envelope is tight, evaluate whether existing HVAC is properly sized. May be able to downsize at replacement.' },
    '$10,000–$20,000': { first_step: 'Full envelope package + smart thermostat + assess HVAC', why: 'With $10K–$20K, complete the envelope, add smart controls, and replace HVAC only if it\’s 12+ years old or failing.', impact: 'Comprehensive improvement. Home will be dramatically more comfortable and efficient.', next_steps: 'If HVAC is newer, invest remainder in solar evaluation or battery backup prep.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Comprehensive assessment first ($500–$800)', why: 'At this budget, get a professional energy audit before spending anything. The audit tells you exactly where the money will have the most impact in your specific home.', impact: 'Full home optimization achievable. Potential 50–60% reduction in HVAC energy use.', next_steps: 'Air seal → insulate → duct seal → HVAC replace (inverter) → smart controls → solar evaluation.' },
  },
  'High bills but system is only 5 years old': {
    'Under $2,000': { first_step: 'Duct testing and sealing', why: 'If your system is only 5 years old and bills are high, duct leakage is the most likely culprit. DFW ducts in attics lose 25–40% of conditioned air. Test first ($150–$300), seal if needed ($500–$1,500).', impact: 'Duct sealing alone often reduces cooling bills 15–25%.', next_steps: 'Air sealing attic bypasses if duct test comes back acceptable.' },
    '$2,000–$5,000': { first_step: 'Duct sealing + air sealing', why: 'New system + high bills = envelope problem, not equipment problem. Duct and air sealing are the right fix.', impact: '20–35% reduction in cooling bills. System efficiency increases dramatically when air stays where it should.', next_steps: 'Attic insulation if below R-38 after air sealing is complete.' },
    '$5,000–$10,000': { first_step: 'Comprehensive duct + air + insulation upgrade', why: 'Your 5-year-old system is fine. The house is the problem. Fix the house.', impact: '30–40% bill reduction. System will now be properly loaded.', next_steps: 'Smart thermostat + scheduling optimization. No equipment changes needed.' },
    '$10,000–$20,000': { first_step: 'Full envelope upgrade + smart controls', why: 'Same answer — the house needs fixing before spending on equipment. With this budget, do a complete job.', impact: '35–45% improvement. System may even be slightly oversized after tightening — that\’s fine at 5 years old.', next_steps: 'Investigate TOU electricity rate plans. With a tight house, scheduling can further reduce bills.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Energy audit, then full envelope + consider solar', why: 'At 5 years old, the system isn\’t the issue. Get the audit, fix the house comprehensively, then evaluate solar — which pairs well with a tight, efficient home.', impact: 'Potential 50%+ bill reduction. At this investment level, solar ROI becomes compelling.', next_steps: 'Solar evaluation after envelope is complete. Consider battery backup if grid reliability is a concern.' },
  },
  'System is 12+ years old, bills climbing': {
    'Under $2,000': { first_step: 'Air sealing only — system replacement is imminent', why: 'With a 12+ year old system, replacement is coming. Use this $2K on air sealing to reduce the load, then replace with a properly sized system.', impact: 'Load reduction before replacement means you can potentially use a smaller, less expensive replacement unit.', next_steps: 'Budget for system replacement: $5,500–$10,000 depending on size and type.' },
    '$2,000–$5,000': { first_step: 'Air seal + insulate, defer system replacement if possible', why: 'If the system is still functional, squeeze more life out of it while fixing the house. Reduces replacement urgency.', impact: 'Each year of extended system life on a fixed house saves $500–$800 vs running it in a leaky home.', next_steps: 'When system does fail, replace with properly sized inverter unit based on post-upgrade load.' },
    '$5,000–$10,000': { first_step: 'Air sealing + insulation, then budget for system replacement', why: 'Envelope work first, even if brief. Replace with properly sized inverter unit. Correct order matters — sized to the improved house, not the original leaky house.', impact: 'Envelope + new inverter system: 40–50% efficiency improvement total.', next_steps: 'Get a Manual J load calculation done post-envelope before ordering new system.' },
    '$10,000–$20,000': { first_step: 'Full upgrade: air seal + insulate + duct seal + new inverter system', why: 'This budget covers a complete renovation. Do it in the right order: envelope first, then system.', impact: 'Comprehensive improvement. Properly sized inverter system in a tight house is the ideal DFW outcome.', next_steps: 'Smart thermostat, UV air purifier if air quality is a concern, consider dehumidifier.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Complete home energy renovation', why: 'At $20K+, do everything: audit, air seal, insulate, duct seal, new inverter system, smart controls, and consider solar/battery prep.', impact: '50–60% reduction in HVAC energy. Comprehensive comfort and reliability improvement.', next_steps: 'Document all improvements for appraisal and resale value — energy efficiency adds measurable value in DFW.' },
  },
  'Recent addition or renovation': {
    'Under $2,000': { first_step: 'Air seal the addition first', why: 'New additions often have poor air sealing where they connect to the original structure. Address this before anything else.', impact: 'Prevents conditioned air loss between old and new structures. Critical step.', next_steps: 'Evaluate whether existing HVAC can handle the added load.' },
    '$2,000–$5,000': { first_step: 'Ductless mini-split for the addition', why: 'Extending existing ductwork to additions rarely works well. Independent mini-split for the new space is almost always the correct solution.', impact: 'Addition gets reliable, independent climate control without stressing the main system.', next_steps: 'Ensure main system is sized for original square footage only.' },
    '$5,000–$10,000': { first_step: 'Mini-split for addition + duct testing on main system', why: 'The addition should have its own system. Meanwhile, test the main system\’s ducts — additions often disturb existing ductwork.', impact: 'Addition is properly conditioned. Main system performance verified and sealed if needed.', next_steps: 'Consider smart thermostat integration between systems.' },
    '$10,000–$20,000': { first_step: 'Mini-split + main system optimization + air sealing', why: 'Comprehensive approach: independent addition control, optimized main system, tight envelope.', impact: 'Both spaces conditioned properly and efficiently.', next_steps: 'Evaluate whether main system needs replacement to handle overall load efficiently.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Full system re-evaluation with addition included in load calculation', why: 'At this budget, get a fresh Manual J for the whole house including the addition. May justify a new system sized for the total home.', impact: 'Optimal system sizing for the complete home as it exists today.', next_steps: 'Inverter system with zoning can handle both spaces from one outdoor unit if sized correctly.' },
  },
  'Allergies or air quality concerns': {
    'Under $2,000': { first_step: 'MERV-13 filter upgrade + duct cleaning assessment', why: 'DFW is a high-allergy market. Upgrading to MERV-13 filters ($30–$80/yr ongoing) and assessing duct cleanliness addresses the most common IAQ issue.', impact: 'Captures 85%+ of particles >1 micron. Meaningful allergy reduction for most DFW homeowners.', next_steps: 'Duct cleaning if contaminated ($400–$800). Air sealing to reduce pollen infiltration.' },
    '$2,000–$5,000': { first_step: 'Air sealing + MERV-13 or HEPA filtration', why: 'Air sealing reduces unfiltered air infiltration through cracks — a major pollen entry point in DFW. Pair with upgraded filtration.', impact: 'Two-pronged attack on allergen infiltration and recirculation.', next_steps: 'Consider UV air purifier ($600–$1,200) installed in air handler for mold and pathogen control.' },
    '$5,000–$10,000': { first_step: 'Air sealing + whole-home dehumidifier + MERV-13', why: 'DFW humidity (65–80% in spring/fall) enables mold and dust mite growth. Whole-home dehumidifier ($1,500–$2,500 installed) is transformative for allergy sufferers.', impact: 'Controlling humidity below 50% RH dramatically reduces mold and dust mite populations.', next_steps: 'HRV or ERV for fresh air ventilation if home is now tight after air sealing.' },
    '$10,000–$20,000': { first_step: 'Comprehensive IAQ package: air seal + dehumidifier + UV + filtration + ventilation', why: 'With this budget, address all IAQ factors: infiltration, humidity, filtration, pathogen control, and fresh air balance.', impact: 'Hospital-grade indoor air quality achievable in a DFW home.', next_steps: 'Consider air quality monitoring ($200–$500) to verify results.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Full home IAQ + HVAC renovation', why: 'Comprehensive air quality renovation including envelope, new inverter system with advanced filtration, dedicated ventilation, dehumidification, and UV treatment.', impact: 'Dramatically improved air quality. Life-changing for severe allergy or asthma sufferers.', next_steps: 'Monitor and document air quality improvements for health records.' },
  },
  'Limited budget — want best ROI first': {
    'Under $2,000': { first_step: 'Attic air sealing + smart thermostat', why: 'The two highest-ROI improvements per dollar in DFW. Attic air sealing ($800–$1,500) stops the biggest energy losses. Smart thermostat ($150–$300 installed) optimizes runtime. Combined payback: 2–3 years.', impact: 'Typical DFW savings: $300–$500/yr combined.', next_steps: 'Save for attic insulation upgrade ($1,500–$3,000) as next step.' },
    '$2,000–$5,000': { first_step: 'Air sealing + attic insulation to R-60', why: 'In DFW, every dollar spent on attic insulation and air sealing returns more than any equipment upgrade. Payback 3–5 years.', impact: '$400–$700/yr savings typical for DFW homes with pre-R-38 attics.', next_steps: 'Duct sealing if blower door test shows significant duct leakage (common in DFW).' },
    '$5,000–$10,000': { first_step: 'Full envelope: air seal + insulate + duct seal', why: 'Maximum ROI sequence. Fix the house before fixing the equipment.', impact: '$600–$1,000/yr savings. Payback 5–8 years on $5K–$8K investment.', next_steps: 'System upgrade only if equipment is 12+ years old or failing.' },
    '$10,000–$20,000': { first_step: 'Envelope upgrade + inverter system replacement if 10+ years old', why: 'At this budget, combine building envelope with system upgrade if the system is aging. Right sequence: envelope → load calc → right-sized inverter system.', impact: '$900–$1,400/yr savings. Payback 8–12 years.', next_steps: 'Solar evaluation — a tight, efficient home is the ideal solar candidate.' },
    '$20,000+ (comprehensive upgrade)': { first_step: 'Complete ROI-optimized package: audit → envelope → system → solar eval', why: 'Start with an energy audit to prioritize. Then execute in order: envelope, system, controls, solar. Each step makes the next more effective.', impact: 'Total savings $1,200–$2,000/yr. Payback 12–18 years including solar.', next_steps: 'Document for resale: energy-efficient DFW homes command 3–7% premium in current market.' },
  },
};

export default function DFWHVACUpgradePathGuide() {
  const [situation, setSituation] = useState('');
  const [budget, setBudget] = useState('');

  const result = situation && budget ? matrix[situation]?.[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>HVAC Upgrade Path Guide</h1>
        <p style={{ color: '#A0AEC0', marginBottom: '2rem', fontSize: '0.97rem' }}>The order you upgrade matters as much as what you upgrade. Doing things out of order wastes money in DFW.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📋 The Correct DFW Upgrade Sequence</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {[['1. Air Sealing', 'Stop conditioned air from escaping and outside air from entering. Attic bypasses, top plates, penetrations.'],['2. Insulation', 'DFW attics need R-60. If you\’re below R-38, insulation delivers exceptional ROI.'],['3. Duct Sealing', 'DFW ducts in hot attics lose 25–40% of conditioned air. Test and seal before replacing equipment.'],['4. HVAC System', 'Only replace equipment after the building is sealed and insulated. Size to the improved house, not the original.'],['5. Smart Controls', 'Scheduling and zoning extract additional efficiency from a tight house and right-sized system.']].map(([step, desc]) => (
              <div key={step} style={{ background: '#162035', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '0.9rem', whiteSpace: 'nowrap', minWidth: 120 }}>{step}</div>
                <div style={{ color: '#A0AEC0', fontSize: '0.85rem', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Your Situation + Budget → Where to Start</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>CURRENT SITUATION</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select situation...</option>
                {situations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>AVAILABLE BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>✅ START HERE</div>
                <p style={{ color: '#CBD5E0', fontSize: '0.95rem', fontWeight: 600 }}>{result.first_step}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>💡 WHY THIS FIRST</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem', lineHeight: 1.6 }}>{result.why}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>📈 EXPECTED IMPACT</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem' }}>{result.impact}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>➡️ NEXT STEPS</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem' }}>{result.next_steps}</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#4A6080', fontSize: '0.78rem', textAlign: 'center' }}>ProLnk • DFW HVAC Upgrade Path Guide • 2026 DFW market estimates</div>
      </div>
    </div>
  );
}

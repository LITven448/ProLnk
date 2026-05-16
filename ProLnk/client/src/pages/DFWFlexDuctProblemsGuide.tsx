import { useState } from 'react';

const problems = ['Weak airflow from one or more vents', 'Room never cools even with system running', 'Hissing sound near duct in attic', 'High energy bills with no other explanation', 'Visible sag in flex duct run'];
const locations = ['Attic', 'Interior ceiling', 'Crawl space', 'Mechanical room / closet'];

const diagnoses: Record<string, Record<string, { issue: string; fix: string; approach: string }>> = {
  'Weak airflow from one or more vents': {
    'Attic': { issue: '🔴 Kinked or compressed flex duct. Most common DFW attic problem — flex duct gets stepped on during HVAC service or pushed against joists. A 90° kink reduces airflow 50–80%.', fix: 'Locate kink (look for sharp bends or crushed sections). Straighten and support with saddle hangers every 4 ft. Replace if liner is damaged.', approach: '🔧 DIY possible if accessible. HVAC tech if in tight attic space.' },
    'Interior ceiling': { issue: '⚠️ Possible compression from insulation or framing contact. Interior flex can get compressed during construction or remodel.', fix: 'Access ceiling cavity, locate compressed section, add rigid support or replace with hard duct elbow at sharp turns.', approach: '🔧 HVAC tech recommended for ceiling access.' },
    'Crawl space': { issue: '⚠️ Flex duct sag causing flow restriction. In DFW crawl spaces, flex can sag between supports, creating low points that restrict airflow.', fix: 'Add duct saddles every 4 ft. Straighten any sags. Ensure no standing water contact.', approach: '🔧 DIY if crawl space is accessible. HVAC tech if tight.' },
    'Mechanical room / closet': { issue: '⚠️ Undersized flex leaving air handler. If flex duct runs from air handler are undersized, all downstream rooms are starved.', fix: 'Measure duct diameter vs CFM requirements. May need to upsize duct or add parallel run.', approach: '🔧 HVAC tech required — sizing calculation needed.' },
  },
  'Room never cools even with system running': {
    'Attic': { issue: '🔴 Disconnected duct dumping conditioned air into attic. One of the most expensive DFW HVAC problems — disconnected flex duct sends your 55°F air directly into a 150°F attic space.', fix: 'Inspect all duct connections at boot boxes and trunk line. Re-connect with mastic sealant + metal tape (NOT duct tape). Duct tape fails in DFW attic heat.', approach: '🔧 HVAC tech strongly recommended. Disconnected ducts can double energy bills.' },
    'Interior ceiling': { issue: '⚠️ Possible partial disconnection at ceiling boot. Boot box connection may have separated from flex duct, leaking air into ceiling cavity.', fix: 'Check boot box connections from above (attic access) or below (remove register cover). Re-secure with mastic + foil tape.', approach: '🔧 DIY possible with attic access.' },
    'Crawl space': { issue: '🔴 Disconnected duct under floor. Crawl space duct disconnections are often missed for months. Conditioned air goes under house.', fix: 'Inspect all crawl space duct connections. Use mastic sealant and metal-backed tape. Check for rodent damage to flex duct liner.', approach: '🔧 HVAC tech recommended for full crawl space inspection.' },
    'Mechanical room / closet': { issue: '⚠️ Check filter restriction first. A clogged filter starves airflow to entire system before any duct issue.', fix: 'Replace filter. If problem persists, check duct connections at air handler cabinet for leaks.', approach: '🔧 DIY: Replace filter. Then call HVAC tech if problem continues.' },
  },
  'Hissing sound near duct in attic': {
    'Attic': { issue: '🔴 Duct leakage at connection point. Hissing = pressurized air escaping. In DFW attics, this is typically at the collar connection between flex duct and sheet metal boot or trunk line.', fix: 'Locate the sound source. Apply mastic sealant (not tape) to all metal-to-flex connections. Seal inner liner separately from outer jacket.', approach: '🔧 HVAC tech recommended for proper mastic application.' },
    'Interior ceiling': { issue: '⚠️ Possible leak at register boot. Hissing at ceiling registers often indicates the flex-to-boot connection has loosened.', fix: 'Access from attic if possible. Re-clamp flex to boot with draw band and apply mastic.', approach: '🔧 DIY with attic access or HVAC tech.' },
    'Crawl space': { issue: '⚠️ Duct leak at floor boot or trunk connection.', fix: 'Locate hissing source. Seal with mastic sealant. Check rodent screen on all crawl space duct penetrations.', approach: '🔧 HVAC tech for full crawl space inspection.' },
    'Mechanical room / closet': { issue: '⚠️ Air handler cabinet leak. Hissing at mechanical room is often the air handler cabinet itself, not the duct.', fix: 'Inspect air handler cabinet panels for gaps. Seal with mastic or metal tape. Check drain pan area.', approach: '🔧 HVAC tech recommended.' },
  },
  'High energy bills with no other explanation': {
    'Attic': { issue: '🔴 Multiple small duct leaks or poor insulation. DFW attics cause significant duct heat gain even without obvious disconnections. Multiple small leaks at joints add up.', fix: 'Schedule Duct Blaster test to quantify leakage. If leakage to outside >10% of system airflow, seal all attic duct joints with mastic and verify R-8 insulation intact.', approach: '🔧 HVAC tech with Duct Blaster equipment for testing.' },
    'Interior ceiling': { issue: '⚠️ Less likely to be duct-related if interior only. Check attic ducts first.', fix: 'Verify attic ducts are the primary focus. Interior leaks are low-priority if attic ducts are sealed.', approach: '🔧 Test attic ducts first before interior.' },
    'Crawl space': { issue: '⚠️ Crawl space duct leakage. Conditioned air leaking under the house and into unconditioned crawl space.', fix: 'Duct Blaster test to quantify. Seal all joints in crawl space with mastic.', approach: '🔧 HVAC tech for testing and sealing.' },
    'Mechanical room / closet': { issue: '⚠️ Air handler cabinet leakage. Return air leakage at the cabinet can pull unconditioned attic or garage air into the system.', fix: 'Seal all cabinet seams with mastic. Verify return plenum connections are airtight.', approach: '🔧 HVAC tech recommended.' },
  },
  'Visible sag in flex duct run': {
    'Attic': { issue: '⚠️ Insufficient hanger supports. DFW code requires flex duct supports every 4 ft maximum. Sags create low spots that reduce velocity and cause condensation issues in DFW humidity.', fix: 'Add saddle hangers every 4 ft. Maximum sag between supports: 1/2 inch per foot of duct. Straighten duct after adding supports.', approach: '🔧 DIY if attic is safely accessible. Add hangers available at any HVAC supply house.' },
    'Interior ceiling': { issue: '⚠️ Rare for interior but check framing support.', fix: 'Add framing support bracket or replace flex section with rigid duct if space allows.', approach: '🔧 HVAC tech for ceiling work.' },
    'Crawl space': { issue: '🔴 Common in DFW crawl spaces. Crawl space flex duct often lacks proper support and sags to the ground. Ground contact causes moisture damage in DFW humidity.', fix: 'Elevate all duct above ground. Add support straps every 4 ft. If touching ground, inspect for moisture damage to insulation and liner.', approach: '🔧 DIY if crawl space is accessible. HVAC tech for damage assessment.' },
    'Mechanical room / closet': { issue: '⚠️ Check connection points at sag location. Sagging duct near mechanical room often indicates the connection has partly separated.', fix: 'Re-support and re-connect. Verify draw band clamps are tight on both ends.', approach: '🔧 DIY or HVAC tech depending on access.' },
  },
};

export default function DFWFlexDuctProblemsGuide() {
  const [problem, setProblem] = useState('');
  const [location, setLocation] = useState('');
  const result = problem && location ? diagnoses[problem]?.[location] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚠️ Flex Duct Problems in DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          90% of DFW homes use flex duct. It is flexible, affordable, and prone to specific failure modes in North Texas heat. Learn to identify and fix the most common DFW flex duct problems.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏆 DFW Top 3 Flex Duct Failures</h2>
          <div style={{ color: '#cbd5e1', lineHeight: 2 }}>
            <div>1. 🔴 <strong>Kinked duct</strong> — reduces airflow 50–80%, caused by foot traffic or poor install</div>
            <div>2. 🔴 <strong>Disconnected duct</strong> — dumps conditioned air into attic, doubles energy bills</div>
            <div>3. ⚠️ <strong>Sagging duct</strong> — moisture and flow restriction, especially in crawl spaces</div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Diagnose Your Problem</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>What problem are you experiencing?</label>
          <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 14 }}>
            <option value=''>Select problem...</option>
            {problems.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Duct location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
            <option value=''>Select location...</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}><strong>Likely Issue:</strong> {result.issue}</p>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}><strong>Fix:</strong> {result.fix}</p>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>{result.approach}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Get a ProLnk-verified DFW HVAC tech to inspect your flex duct system. Free quote comparison — no obligation.</p>
        </div>
      </div>
    </div>
  );
}

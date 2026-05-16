import { useState } from 'react';

type InspectionResult = { checks: string[]; commonFailures: string[]; prepSteps: string[]; note: string };

const inspectionData: Record<string, InspectionResult> = {
  'Dallas-split': { checks: ['Equipment nameplate matches approved permit — model number, BTU, and SEER2 rating', 'Disconnect box within sight of unit, properly rated, GFCI protected', 'Refrigerant line sets properly insulated and supported with no kinks', 'Condensate drain pan, drain line, and secondary drain line properly installed with P-trap', 'Supply and return air plenum connections sealed with mastic — no raw duct tape', 'Thermostat location per manufacturer spec — not in direct sun or near heat sources', 'Electrical whip connections at unit with proper strain relief and correct wire gauge', 'Filter rack accessible and sized correctly for system airflow', 'All penetrations through framing and exterior sealed with fire-rated caulk'], commonFailures: ['Drain line discharged without P-trap — fails immediately', 'Electrical disconnect not within sight of outdoor unit', 'Model number on unit does not match permit — inspector will red-tag', 'Duct connections at air handler made with duct tape instead of mastic', 'Secondary drain pan not installed over finished ceilings'], prepSteps: ['Have permit and equipment spec sheets on site during inspection', 'Verify nameplate matches permit BEFORE scheduling inspection', 'Test condensate drain with water before inspector arrives', 'Leave thermostat accessible and system powered on', 'Clean up wiring — inspectors note professionalism in their write-up'], note: 'Dallas inspectors are strict on nameplate/permit matching. A single model number mismatch is an automatic re-inspection.' },
  'Dallas-package': { checks: ['Package unit nameplate matches permit for model, BTU, and SEER2', 'Curb mounting level and sealed to prevent water infiltration', 'Gas connections (if applicable) with sediment trap and shutoff within 6 feet', 'Electrical connections at unit with correct breaker and wire gauge per nameplate', 'Condensate drain path verified — package units drain to exterior', 'Supply and return duct connections sealed at unit curb', 'Filter access panel secured and intact', 'Unit location per setback requirements — typically 3 feet from property line'], commonFailures: ['Curb not level — causes premature compressor failure and may fail structural inspection', 'Gas sediment trap missing on package unit gas connection', 'Condensate drain not stubbed to exterior — pooling inside curb', 'Duct collar connections at unit not sealed with mastic'], prepSteps: ['Verify curb is level with a torpedo level before scheduling', 'Run system through a full cooling cycle to verify condensate flow', 'Have gas pressure test results available if gas package unit', 'Photo document duct connections before covering — Dallas may ask for proof'], note: 'Dallas commercial and residential package units have different inspection tracks — confirm which track your permit is on.' },
  'Plano-split': { checks: ['Permit card posted at job site or accessible to inspector on request', 'Equipment matches permit — Plano inspectors cross-reference online permit system', 'Outdoor unit on proper pad, leveled, and secured — no direct soil contact', 'Electrical disconnect properly labeled with correct amperage', 'Low-voltage thermostat wiring properly run and labeled at air handler', 'Condensate line with P-trap, secondary drain, and float switch on primary drain', 'Return air pathway properly sealed — no air short-circuiting at air handler', 'Supply plenums and boot connections sealed with UL-181 tape or mastic', 'Filter rack installed with proper fit — no gaps around filter frame'], commonFailures: ['Float switch missing on primary condensate — Plano requires this for all attic installations', 'Low-voltage wiring run through same knockout as high-voltage — code violation', 'Outdoor unit pad cracked or tilted more than 5 degrees — immediate re-inspection', 'Return air ducted directly to attic — major violation in Plano'], prepSteps: ['Download Plano inspection checklist from plano.gov/permits before scheduling', 'Install float switch on condensate drain and test it', 'Label all circuit breakers serving HVAC equipment before inspector arrives', 'Have manufacturer installation manual on site during inspection'], note: 'Plano uses an online permit portal — inspectors look up the permit live. Ensure your contractor uploaded all documents before calling for inspection.' },
  'Plano-package': { checks: ['Nameplate data matches permit — Plano strictly enforces this', 'Curb installation level with proper anchoring', 'Gas connection with sediment trap and union fitting for serviceability', 'Electrical service disconnect within 50 feet of unit per Plano code', 'Condensate drainage verified to exterior'], commonFailures: ['Gas union missing — required for serviceability access', 'Disconnect too far from unit per Plano distance requirements'], prepSteps: ['Verify gas union and sediment trap before scheduling', 'Confirm electrical disconnect distance meets Plano 50-foot maximum', 'Have all permit documents uploaded to Plano portal'], note: 'Plano package unit inspections are typically combined with electrical — coordinate both inspectors on the same day to avoid re-inspection fees.' },
  'FortWorth-split': { checks: ['Fort Worth requires IQA (Installation Quality Assurance) report for new systems over 5 tons', 'Equipment nameplate matches permit — model, serial, and SEER2 required', 'Refrigerant charge verified by weight, not pressure alone — contractors must document', 'Airflow verification — Fort Worth inspectors may require static pressure test documentation', 'Condensate drain to approved location with P-trap and secondary pan', 'Electrical: correct breaker size, wire gauge, and disconnect within sight', 'All combustion appliance venting not impacted by new air handler installation'], commonFailures: ['Refrigerant charge not documented by weight — re-inspection required', 'Airflow not verified — Fort Worth is one of the strictest for commissioning documentation', 'Combustion appliance depressurization check skipped when new air handler installed'], prepSteps: ['Complete IQA report if system is 5+ tons before scheduling inspection', 'Document refrigerant charge by weight in contractor records', 'Run static pressure test and keep results on site', 'Verify combustion appliance venting with blower door or CAZ test if required by permit'], note: 'Fort Worth is the most commissioning-focused city in DFW. Do not schedule inspection without refrigerant charge documentation in hand.' },
  'FortWorth-package': { checks: ['Package unit IQA documentation for 5+ ton systems', 'Curb sealed to roof deck preventing water infiltration', 'Gas connections with all required fittings and pressure test documentation', 'Electrical service and disconnect properly rated', 'Condensate drain to approved exterior location', 'Duct system sealed and balanced per original permit scope'], commonFailures: ['Roof curb flashing not properly sealed — water infiltration at next rain', 'IQA documentation missing on commercial-size package units'], prepSteps: ['Coordinate roofing and HVAC inspection simultaneously for curb and flashing review', 'Have gas pressure test results documented before inspector visit', 'Complete IQA form if system is 5+ tons'], note: 'Fort Worth package unit inspections on commercial properties require separate structural and mechanical sign-offs — plan for two inspector visits.' },
  'Arlington-split': { checks: ['Permit and approved plans on site — Arlington inspectors require physical copy', 'Equipment nameplate verifiable on site — all data plates legible', 'Electrical panel schedule updated to reflect new circuit', 'Condensate drain with P-trap — Arlington requires secondary float switch for attic installs', 'Refrigerant lines sealed where penetrating exterior sheathing or top plates', 'All exposed refrigerant lines in unconditioned spaces insulated to R-4 minimum'], commonFailures: ['Physical permit copy not available — inspector will not proceed', 'Refrigerant line penetrations through framing not fire-blocked', 'Panel schedule not updated — Arlington requires this be current at inspection'], prepSteps: ['Print permit and have it at job site — digital copy is not accepted by all Arlington inspectors', 'Update electrical panel schedule with new HVAC circuit before inspector arrives', 'Fire-block all refrigerant line penetrations through top plates'], note: 'Arlington requires the physical permit card at the job site. This is one of the few DFW cities where a digital copy on your phone may not be accepted.' },
  'Arlington-package': { checks: ['Physical permit on site', 'Package unit nameplate data matches permit', 'Electrical panel schedule updated', 'Gas connections with sediment trap and shutoff', 'Condensate and drainage to approved location', 'Curb or pad installation level and structurally sound'], commonFailures: ['Missing physical permit — Arlington will turn away without it', 'Panel schedule not updated to reflect new circuit'], prepSteps: ['Print permit before scheduling — no exceptions in Arlington', 'Update panel schedule and have contractor sign off on it'], note: 'Same as split systems — physical permit card is mandatory for Arlington inspections.' },
};

export default function DFWHVACFinalInspection() {
  const [city, setCity] = useState('');
  const [systemType, setSystemType] = useState('');
  const key = city && systemType ? city + '-' + systemType : '';
  const result = key && inspectionData[key] ? inspectionData[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW HVAC GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🏗️ HVAC Final Inspection Guide — DFW Cities</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Every permitted HVAC installation in DFW requires a final inspection before the system can be placed in permanent service.
            Each city has different requirements, documentation expectations, and common failure points.
            Use this guide to know exactly what the inspector will check so you can prepare and pass the first time.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem', border: '1px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>📋 Why HVAC Permits &amp; Inspections Matter in DFW</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            Unpermitted HVAC work can void your homeowner's insurance, create disclosure liability when you sell, and leave you without recourse if the installation causes water or fire damage.
            Re-inspection fees in DFW range from $75 to $200 per trip — passing the first time saves money and avoids project delays.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔍 City-Specific Inspection Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select city...</option>
                <option value='Dallas'>Dallas</option>
                <option value='Plano'>Plano</option>
                <option value='FortWorth'>Fort Worth</option>
                <option value='Arlington'>Arlington</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>HVAC System Type</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select type...</option>
                <option value='split'>Split System (indoor + outdoor unit)</option>
                <option value='package'>Package Unit (all-in-one)</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: '2px solid #1e3a5f' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ Inspector Checklist Items</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.checks.map((c, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.84rem', marginBottom: '0.35rem' }}>{c}</li>)}</ul>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>❌ Common Failure Points</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.commonFailures.map((f, i) => <li key={i} style={{ color: '#fca5a5', fontSize: '0.84rem', marginBottom: '0.35rem' }}>{f}</li>)}</ul>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>🛠 How to Prepare</div>
                <ol style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.prepSteps.map((s, i) => <li key={i} style={{ color: '#86efac', fontSize: '0.84rem', marginBottom: '0.35rem' }}>{s}</li>)}</ol>
              </div>
              <div style={{ padding: '0.75rem', background: '#0f1e35', borderRadius: '8px', color: '#94a3b8', fontSize: '0.82rem', borderLeft: '3px solid #F5E642' }}>
                💡 {result.note}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

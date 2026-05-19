import { useState } from 'react';

const odorTypes = [
  { id: 'musty', label: 'Musty / Mildew', emoji: '🍄' },
  { id: 'burning', label: 'Burning / Electrical', emoji: '🔥' },
  { id: 'sweet', label: 'Sweet / Chemical', emoji: '🍬' },
  { id: 'sulfur', label: 'Sulfur / Rotten Eggs', emoji: '🥚' },
  { id: 'dirty-socks', label: 'Dirty Socks / Gym Bag', emoji: '🧦' },
  { id: 'exhaust', label: 'Exhaust / Car Fumes', emoji: '💨' },
];

const locations = [
  { id: 'vents', label: 'From Vents When AC Runs' },
  { id: 'unit', label: 'Near Indoor Air Handler' },
  { id: 'outside', label: 'Near Outdoor Unit' },
  { id: 'everywhere', label: 'Throughout Whole House' },
];

type DiagEntry = { diagnosis: string; urgency: 'EMERGENCY' | 'URGENT' | 'SOON' | 'ROUTINE'; action: string[]; dfwNote: string };
const diagnostics: Record<string, Record<string, DiagEntry>> = {
  'musty': {
    'vents': { diagnosis: 'Mold on evaporator coil — #1 DFW HVAC complaint. DFW humidity causes coil mold in 2–3 seasons without UV treatment or maintenance.', urgency: 'URGENT', action: ['Schedule professional coil cleaning ($150–$300)', 'Install UV-C light on coil ($300–$600)', 'Check drain pan for standing water', 'Add Aprilaire whole-home dehumidifier'], dfwNote: 'DFW humidity makes coil mold nearly inevitable without annual cleaning and UV protection.' },
    'unit': { diagnosis: 'Mold in air handler — drain pan overflow, dirty evaporator, or wet insulation. Moisture accumulating inside unit.', urgency: 'URGENT', action: ['Inspect and clean drain pan', 'Clear condensate drain line', 'Clean evaporator coil', 'Check for refrigerant issues causing coil freeze-thaw cycles'], dfwNote: 'DFW summer means your air handler works harder and generates more condensate — clogs are common.' },
    'outside': { diagnosis: 'Likely from yard debris or organic material near condenser. Less common for odor to originate outdoors.', urgency: 'ROUTINE', action: ['Clear all debris within 2 feet of outdoor unit', 'Check for dead animals or organic buildup', 'Inspect condenser coil for buildup', 'Schedule annual condenser cleaning'], dfwNote: 'DFW grass clippings and tree pollen clog condenser coils — clean twice per year in DFW.' },
    'everywhere': { diagnosis: 'Mold in ductwork or at air handler — odor is distributed through entire system. Can also be a dirty or wet air filter.', urgency: 'URGENT', action: ['Replace air filter immediately', 'Schedule duct inspection for mold', 'Professional duct cleaning if confirmed', 'Full system inspection for moisture source'], dfwNote: 'Whole-house musty smell after AC runs = mold in the system. Do not ignore in DFW.' },
  },
  'burning': {
    'vents': { diagnosis: 'Electrical burning from motor, capacitor, or wiring — possibly overheating contactor or failing blower motor. Serious safety issue.', urgency: 'EMERGENCY', action: ['Turn off AC at thermostat AND breaker immediately', 'Call HVAC emergency service', 'Do not run system until inspected', 'Check for breaker trips or flickers'], dfwNote: 'DFW peak summer: motors run near capacity for months. Burning smell = imminent failure or fire risk.' },
    'unit': { diagnosis: 'Blower motor, capacitor, or control board failure. Burning near the unit with AC running = electrical fault.', urgency: 'EMERGENCY', action: ['Shut down system immediately', 'Emergency HVAC call', 'Inspect capacitor and contactor for burn marks', 'Do not restart until cleared by tech'], dfwNote: 'Capacitors fail frequently in DFW — heat accelerates failure. Never ignore burning smell near the unit.' },
    'outside': { diagnosis: 'Contactor burning or compressor overheating. Outdoor unit in DFW runs in 100°F+ ambient — compressor stress is extreme.', urgency: 'URGENT', action: ['Check contactor for burn marks', 'Verify compressor amperage is within spec', 'Clean condenser coil for better heat rejection', 'Call HVAC tech for inspection'], dfwNote: 'DFW compressors run in brutal heat — regular condenser cleaning extends life significantly.' },
    'everywhere': { diagnosis: 'Burning smell throughout house = something in ductwork or air handler is overheating and distributing odor through system.', urgency: 'EMERGENCY', action: ['Shut down HVAC system immediately', 'Check for visible smoke', 'Call emergency HVAC — potential fire hazard', 'Verify no burning in attic or air handler'], dfwNote: 'Distributed burning smell is a fire emergency. Shut down and call immediately.' },
  },
  'sweet': {
    'vents': { diagnosis: 'Refrigerant (Freon/R-410A) leak — sweet chemical smell is a classic refrigerant indicator. R-410A is an environmental concern and system efficiency drops dramatically.', urgency: 'URGENT', action: ['Schedule HVAC leak check immediately', 'Do not top off refrigerant without finding the leak', 'Expect $300–$800+ for leak repair', 'R-22 systems: consider full replacement (R-22 discontinued)'], dfwNote: 'DFW summer refrigerant leaks = no cooling during hottest days. Catch early — heat can destroy compressor.' },
    'unit': { diagnosis: 'Refrigerant leak at indoor coil or line connections. Sweet smell near air handler with reduced cooling = strong refrigerant indicator.', urgency: 'URGENT', action: ['HVAC tech inspection for leak', 'Check evaporator coil for frost or ice', 'Verify suction line temperature', 'Full refrigerant charge and leak test'], dfwNote: 'Low refrigerant in DFW summer = coil freeze, then flood when it thaws. Act fast.' },
    'outside': { diagnosis: 'Refrigerant leak at outdoor unit, Schrader valves, or line set connections. Outdoor leak wastes refrigerant and reduces efficiency.', urgency: 'URGENT', action: ['HVAC tech to pressure test and find leak', 'Inspect all line connections and valves', 'UV dye leak detection if leak is subtle', 'Repair and recharge system'], dfwNote: 'Line set vibration from DFW traffic/wind can loosen connections over time.' },
    'everywhere': { diagnosis: 'Large refrigerant leak distributing through whole system. Major efficiency loss and potential health concern in enclosed spaces.', urgency: 'URGENT', action: ['Ventilate home — open windows', 'Schedule emergency HVAC inspection', 'Do not run system in enclosed space with refrigerant smell', 'Full leak detection and repair'], dfwNote: 'Modern refrigerants are not immediately toxic but can displace oxygen in enclosed spaces.' },
  },
  'sulfur': {
    'vents': { diagnosis: 'GAS EMERGENCY. Natural gas leak or dead animal in ductwork. Sulfur/rotten egg from vents = treat as gas leak until ruled out.', urgency: 'EMERGENCY', action: ['Evacuate immediately if strong smell', 'Call 911 and gas company from outside', 'Do not operate any switches', 'If mild, call HVAC for animal check first'], dfwNote: 'Natural gas is odorized with mercaptan (rotten egg smell). Never ignore this near HVAC vents.' },
    'unit': { diagnosis: 'Dead animal near or in equipment, or gas connection near air handler. Must rule out gas leak first.', urgency: 'EMERGENCY', action: ['Check gas connections to furnace/heat strip', 'Inspect for dead animals near or in unit', 'Call HVAC immediately for inspection', 'Evacuate if strong and persistent'], dfwNote: 'DFW wildlife (mice, squirrels) die in HVAC equipment regularly — smells similar to gas but less sharp.' },
    'outside': { diagnosis: 'Likely dead animal near outdoor unit. Birds and small animals die near condenser fans. Strong sulfur outside is less likely to be gas.', urgency: 'SOON', action: ['Inspect around and under outdoor unit', 'Remove any animal remains', 'Clean condenser coil area', 'Call HVAC if smell is coming from inside the unit'], dfwNote: 'DFW condenser units attract animals seeking shade — inspect seasonally.' },
    'everywhere': { diagnosis: 'EVACUATE. Whole-house rotten egg/sulfur smell = natural gas leak until proven otherwise.', urgency: 'EMERGENCY', action: ['Evacuate home immediately', 'Do not flip switches or use phone inside', 'Call 911 and gas company from outside', 'Do not re-enter until cleared by gas company'], dfwNote: 'DFW Atmos Energy emergency line: 1-800-555-8000. Never take chances with gas smell.' },
  },
  'dirty-socks': {
    'vents': { diagnosis: '"Dirty Sock Syndrome" — bacteria buildup on evaporator coil. Named by HVAC industry specifically for this musty/sweaty smell. Very common in DFW.', urgency: 'SOON', action: ['Professional coil cleaning with antimicrobial treatment', 'Install UV-C coil sterilizer ($300–$600)', 'Clean or replace air filter', 'Add whole-home dehumidifier to reduce coil moisture time'], dfwNote: 'DFW humidity keeps coils wet long enough for bacteria to colonize. UV lights prevent recurrence.' },
    'unit': { diagnosis: 'Bacteria in drain pan or on coil surface. Standing water in drain pan accelerates bacterial growth.', urgency: 'SOON', action: ['Clean drain pan with antimicrobial solution', 'Clear condensate drain', 'Professional coil cleaning', 'UV-C light installation'], dfwNote: 'Clean drain pan quarterly in DFW — standing water becomes a bacteria farm in summer heat.' },
    'outside': { diagnosis: 'Unusual for dirty sock smell to originate outdoors — likely tracking inside or from nearby source.', urgency: 'ROUTINE', action: ['Inspect for nearby standing water or vegetation decay', 'Verify smell is not from indoor system', 'Clean condenser area of organic debris', 'Check for algae on condenser coil'], dfwNote: 'DFW lawn clippings on the condenser can create similar organic smell.' },
    'everywhere': { diagnosis: 'Bacteria or mold distributed through ductwork system. Dirty sock smell throughout house = systemic issue.', urgency: 'SOON', action: ['Full system inspection and coil cleaning', 'UV-C light installation', 'Duct inspection and cleaning if mold confirmed', 'Whole-home dehumidifier'], dfwNote: 'A distributed dirty-sock smell in DFW summer = HVAC maintenance overdue. Annual coil cleaning prevents this.' },
  },
  'exhaust': {
    'vents': { diagnosis: 'Carbon monoxide / combustion gas leak in furnace or heat exchanger. Exhaust gas entering air stream is a CO hazard.', urgency: 'EMERGENCY', action: ['Install CO detector immediately if not present', 'Turn off HVAC and evacuate if CO alarm sounds', 'Call HVAC for heat exchanger inspection', 'Never run furnace with cracked heat exchanger'], dfwNote: 'DFW gas furnaces rarely run in summer — exhaust smell in summer may be from neighboring equipment or car fumes near return air.' },
    'unit': { diagnosis: 'Heat exchanger crack in gas furnace (winter concern) or combustion gases from water heater near air handler.', urgency: 'EMERGENCY', action: ['CO detector test immediately', 'Inspect heat exchanger for cracks', 'Check proximity of water heater to air handler', 'HVAC inspection for combustion gas intrusion'], dfwNote: 'DFW homes often co-locate air handler and water heater — ensure proper venting for both.' },
    'outside': { diagnosis: 'Car exhaust, generator, or lawn equipment near outdoor unit. AC can pull outdoor exhaust through the return air system.', urgency: 'SOON', action: ['Identify and eliminate exhaust source near unit', 'Never idle vehicles near HVAC outdoor unit', 'Check return air location for proximity to garage', 'Verify return air is not pulling from garage'], dfwNote: 'DFW homes with attached garages: verify return air is not located in garage — CO risk from cars.' },
    'everywhere': { diagnosis: 'CO or exhaust gas distributed throughout house. Whole-home exhaust smell = serious safety concern.', urgency: 'EMERGENCY', action: ['Test CO detectors immediately', 'Evacuate if CO above 35 ppm', 'Call 911 if occupants feel symptoms', 'HVAC emergency inspection for combustion gas intrusion'], dfwNote: 'CO symptoms: headache, nausea, dizziness. Evacuate first, call 911, then HVAC.' },
  },
};

const urgencyStyle: Record<string, { bg: string; color: string }> = {
  'EMERGENCY': { bg: '#EF4444', color: '#fff' },
  'URGENT': { bg: '#F97316', color: '#fff' },
  'SOON': { bg: '#F5E642', color: '#0A1628′ },
  'ROUTINE': { bg: '#60A5FA', color: '#0A1628′ },
};

export default function DFWHVACOdorGuide() {
  const [odor, setOdor] = useState('');
  const [loc, setLoc] = useState('');
  const result = odor && loc ? diagnostics[odor]?.[loc] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👃</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Odor Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Comprehensive DFW HVAC smell diagnosis — identify cause, urgency, and exact action</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>👃 What Does It Smell Like?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {odorTypes.map(o => (
              <button key={o.id} onClick={() => setOdor(o.id)}
                style={{ background: odor === o.id ? '#F5E642′ : '#1A3060', color: odor === o.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: odor === o.id ? 700 : 400, textAlign: 'left' }}>
                {o.emoji} {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Where Is the Smell Coming From?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {locations.map(l => (
              <button key={l.id} onClick={() => setLoc(l.id)}
                style={{ background: loc === l.id ? '#F5E642′ : '#1A3060', color: loc === l.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: loc === l.id ? 700 : 400 }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: urgencyStyle[result.urgency].bg, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
              <span style={{ color: urgencyStyle[result.urgency].color, fontWeight: 700, fontSize: 20 }}>⚡ {result.urgency}</span>
            </div>
            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Diagnosis</h2>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: 16 }}>{result.diagnosis}</p>
              <div style={{ background: '#1A3060', borderRadius: 8, padding: 14, borderLeft: '4px solid #F5E642′ }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>🌡️ DFW Note: </span>
                <span style={{ color: '#CBD5E1′ }}>{result.dfwNote}</span>
              </div>
            </div>
            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>✅ Action Steps</h2>
              {result.action.map((a, i) => (
                <div key={i} style={{ background: '#1A3060', borderRadius: 8, padding: 14, marginBottom: 8, color: '#E2E8F0′ }}>
                  {i + 1}. {a}
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 40 }}>
            Select the smell type and location above to get your DFW HVAC odor diagnosis
          </div>
        )}
      </div>
    </div>
  );
}

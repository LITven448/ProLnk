import { useState } from 'react';

const tempSymptoms = [
  { id: 'hot-rooms', label: 'Some Rooms Too Hot' },
  { id: 'whole-hot', label: 'Whole House Not Cooling' },
  { id: 'cold-rooms', label: 'Some Rooms Too Cold' },
  { id: 'temp-ok', label: 'Temperature Seems OK' },
];

const humiditySymptoms = [
  { id: 'sticky', label: 'Feels Sticky / Humid' },
  { id: 'dry', label: 'Feels Very Dry' },
  { id: 'humid-ok', label: 'Humidity Seems OK' },
];

const noiseSymptoms = [
  { id: 'banging', label: 'Banging or Thumping' },
  { id: 'squealing', label: 'Squealing or Screeching' },
  { id: 'clicking', label: 'Clicking or Buzzing' },
  { id: 'rattling', label: 'Rattling or Whooshing' },
  { id: 'quiet', label: 'No Unusual Noises' },
];

const smellSymptoms = [
  { id: 'musty', label: 'Musty or Mildew Smell' },
  { id: 'burning', label: 'Burning or Electrical' },
  { id: 'sweet', label: 'Sweet or Chemical' },
  { id: 'sulfur', label: 'Sulfur or Rotten Eggs' },
  { id: 'no-smell', label: 'No Unusual Smell' },
];

const airflowSymptoms = [
  { id: 'weak', label: 'Weak Airflow From Vents' },
  { id: 'no-air', label: 'No Air From Some Vents' },
  { id: 'normal', label: 'Airflow Seems Normal' },
];

type Diagnosis = { title: string; priority: 'EMERGENCY' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; cause: string; tellTech: string[]; estimatedCost: string };

function getDiagnosis(temp: string, humidity: string, noise: string, smell: string, airflow: string): Diagnosis {
  if (smell === 'sulfur') return { title: 'Possible Gas Leak', priority: 'EMERGENCY', cause: 'Rotten egg smell is mercaptan — the odorant added to natural gas. Treat as a gas leak emergency.', tellTech: ['Evacuate home immediately', 'Call 911 and gas company from outside', 'Do not operate any switches or appliances', 'Return only when gas company clears the building'], estimatedCost: 'Gas company inspection free; repairs $200–$2,000+' };
  if (smell === 'burning' && (noise === 'banging' || noise === 'clicking')) return { title: 'Electrical / Mechanical Failure', priority: 'EMERGENCY', cause: 'Burning smell combined with abnormal noise = active electrical fault or mechanical failure. Fire risk present.', tellTech: ['Shut system off at breaker immediately', 'Describe: burning smell + specific noise type + location', 'Ask for emergency appointment — do not run system', 'Check for visible smoke or scorch marks near air handler'], estimatedCost: '$300–$2,500 depending on failed component' };
  if (smell === 'sweet') return { title: 'Refrigerant Leak', priority: 'CRITICAL', cause: 'Sweet chemical smell is R-410A refrigerant. Low refrigerant means no cooling and potential compressor damage in DFW summer heat.', tellTech: ['Report sweet/chemical smell when AC runs', 'Note if cooling has decreased recently', 'Ask for leak detection (UV dye or electronic sniffer)', 'Do not just ask for "a recharge" — find the leak first'], estimatedCost: '$300–$1,500 for leak repair + recharge' };
  if (temp === 'whole-hot' && airflow === 'no-air') return { title: 'System Not Running or Major Failure', priority: 'CRITICAL', cause: 'No cooling + no airflow = system not running. Could be thermostat, breaker, failed capacitor, or compressor failure.', tellTech: ['Check thermostat is set to Cool and below current temp', 'Check breaker — reset if tripped', 'Listen for clicking/humming from outdoor unit', 'If outdoor unit silent and hot = likely capacitor or compressor failure'], estimatedCost: '$150–$4,000 depending on cause (capacitor vs. compressor)' };
  if (temp === 'whole-hot' && airflow === 'weak') return { title: 'Airflow or Refrigerant Issue', priority: 'CRITICAL', cause: 'Whole house hot with weak airflow = dirty filter, blower failure, or low refrigerant. DFW peak season — diagnose immediately.', tellTech: ['Change filter first — check if this helps', 'If filter was dirty, run 30 min and recheck', 'If still warm, likely low refrigerant or blower motor issue', 'Note: how long has it been since last service?'], estimatedCost: '$25–$1,200 depending on cause' };
  if (smell === 'musty' && humidity === 'sticky') return { title: 'Mold on Evaporator Coil', priority: 'HIGH', cause: '#1 DFW HVAC complaint — mold on evaporator coil. Humid air + musty smell = classic coil mold. Common after 2–3 years without maintenance.', tellTech: ['Describe musty smell when AC first turns on', 'Ask specifically for evaporator coil inspection and cleaning', 'Request UV-C light quote for coil sterilization', 'Ask about whole-home dehumidifier to prevent recurrence'], estimatedCost: '$150–$600 for cleaning + UV install' };
  if (noise === 'banging') return { title: 'Mechanical Component Damage', priority: 'HIGH', cause: 'Banging from HVAC = loose or broken part. Blower wheel, fan blade, or debris in system. Can escalate quickly.', tellTech: ['Describe banging: from indoors or outdoors?', 'Note when it occurs: startup, shutdown, or while running', 'Ask tech to inspect blower wheel and outdoor fan blade first', 'Shut system off if banging is very loud or constant'], estimatedCost: '$100–$800 for part replacement' };
  if (noise === 'squealing') return { title: 'Motor Bearing Failure', priority: 'HIGH', cause: 'Squealing = bearing failing. In DFW summer, a failing bearing means a broken motor within weeks. Act before full failure.', tellTech: ['Describe squeal: indoor or outdoor unit?', 'Note: constant or only at startup/shutdown?', 'Ask for blower motor and outdoor fan motor bearing inspection', 'Request quote for motor replacement before it fails completely'], estimatedCost: '$300–$700 for motor replacement' };
  if (temp === 'hot-rooms' && humidity === 'sticky' && airflow === 'weak') return { title: 'Undersized System or Duct Issues', priority: 'HIGH', cause: 'Hot rooms + humidity + weak airflow = system cannot keep up. Likely oversized single-speed cycling off too quickly or duct restrictions.', tellTech: ['Note which rooms are hot (distance from air handler?)', 'Report that AC runs but humidity still feels high', 'Ask about duct balancing and static pressure test', 'Request Manual J calculation to verify system sizing'], estimatedCost: '$150–$3,000 depending on solution' };
  if (temp === 'hot-rooms' && airflow === 'normal') return { title: 'Duct Imbalance or Room Heat Gain', priority: 'MEDIUM', cause: 'Normal airflow but some rooms hot = airflow distribution issue or specific room has high heat gain (west wall, above garage, etc.).', tellTech: ['Identify which specific rooms are hot', 'Note room characteristics: west-facing, above garage, bonus room?', 'Ask about duct balancing and airflow measurement per room', 'Discuss room-specific solutions (zoning, mini-split, attic insulation)'], estimatedCost: '$150–$5,000 depending on solution' };
  if (humidity === 'sticky' && temp === 'temp-ok') return { title: 'Humidity Control Issue', priority: 'MEDIUM', cause: 'Temperature OK but humid = AC is removing temperature but not humidity. Common with oversized systems that short-cycle in DFW.', tellTech: ['Report: house cools but feels sticky', 'Ask about system run-time — is it short-cycling?', 'Request humidity level check with hygrometer (should be 45–55%)', 'Ask about whole-home dehumidifier options'], estimatedCost: '$1,500–$3,000 for dehumidifier' };
  if (noise === 'clicking' && temp === 'whole-hot') return { title: 'Failed Capacitor', priority: 'HIGH', cause: 'Clicking + no cooling = capacitor likely failed. Capacitors start the compressor and fan motor. DFW #1 summer failure.', tellTech: ['Describe: clicking from outdoor unit but not cooling', 'Ask tech to test capacitor first — quick diagnosis', 'Capacitor replacement is typically same-day service', 'Ask about dual-run vs start capacitor'], estimatedCost: '$150–$300 for capacitor replacement' };
  if (airflow === 'weak' && smell === 'no-smell' && noise === 'quiet') return { title: 'Dirty Filter or Return Air Restriction', priority: 'LOW', cause: 'Weak airflow without other symptoms = start with the filter. DFW filters clog fast in spring/summer.', tellTech: ['Change filter first — use MERV 8 minimum', 'Check all return air grilles for blockage', 'If filter change does not help, mention to tech', 'Ask about upgrading to better filter and media cabinet'], estimatedCost: '$0–$400' };
  return { title: 'System Performing Within Normal Parameters', priority: 'LOW', cause: 'Based on selected symptoms, your DFW HVAC system appears to be functioning normally. Schedule annual maintenance to keep it that way.', tellTech: ['Schedule annual maintenance before each summer (March/April)', 'Ask for coil cleaning, filter replacement, refrigerant check, and capacitor test', 'DFW recommendation: clean coils and test capacitor every year', 'Ask about UV-C light and dehumidifier for proactive comfort'], estimatedCost: '$150–$350 for annual maintenance' };
}

const priorityStyle: Record<string, { bg: string; color: string }> = {
  'EMERGENCY': { bg: '#EF4444', color: '#fff' },
  'CRITICAL': { bg: '#F97316', color: '#fff' },
  'HIGH': { bg: '#F5E642', color: '#0A1628' },
  'MEDIUM': { bg: '#60A5FA', color: '#0A1628' },
  'LOW': { bg: '#22C55E', color: '#fff' },
};

export default function DFWHVACDiagnosticGuide() {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [noise, setNoise] = useState('');
  const [smell, setSmell] = useState('');
  const [airflow, setAirflow] = useState('');

  const allSelected = temp && humidity && noise && smell && airflow;
  const result = allSelected ? getDiagnosis(temp, humidity, noise, smell, airflow) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔬</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Complete Diagnostic</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Select all symptoms → get the most likely cause, priority, and exactly what to tell your HVAC tech</p>
        </div>

        {[
          { label: '🌡️ Temperature', options: tempSymptoms, value: temp, setValue: setTemp },
          { label: '💧 Humidity / Comfort', options: humiditySymptoms, value: humidity, setValue: setHumidity },
          { label: '🔊 Noise', options: noiseSymptoms, value: noise, setValue: setNoise },
          { label: '👃 Smell', options: smellSymptoms, value: smell, setValue: setSmell },
          { label: '💨 Airflow', options: airflowSymptoms, value: airflow, setValue: setAirflow },
        ].map(group => (
          <div key={group.label} style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>{group.label}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.options.map((opt: { id: string; label: string }) => (
                <button key={opt.id} onClick={() => group.setValue(opt.id)}
                  style={{ background: group.value === opt.id ? '#F5E642' : '#1A3060', color: group.value === opt.id ? '#0A1628' : '#E2E8F0', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: group.value === opt.id ? 700 : 400, fontSize: 14 }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {!allSelected && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 24 }}>
            Select one option in each category above to generate your complete diagnosis
            <div style={{ marginTop: 8, color: '#F5E642', fontSize: 14 }}>
              {[temp, humidity, noise, smell, airflow].filter(Boolean).length} of 5 categories selected
            </div>
          </div>
        )}

        {result && (
          <div>
            <div style={{ background: priorityStyle[result.priority].bg, borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ color: priorityStyle[result.priority].color, fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{result.title}</div>
              <div style={{ color: priorityStyle[result.priority].color, opacity: 0.9, fontSize: 15 }}>Priority: {result.priority}</div>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Most Likely Cause</h2>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.cause}</p>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📞 What to Tell Your HVAC Tech</h2>
              {result.tellTech.map((tip, i) => (
                <div key={i} style={{ background: '#1A3060', borderRadius: 8, padding: 14, marginBottom: 8, color: '#E2E8F0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94A3B8' }}>Estimated Repair Cost</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.estimatedCost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

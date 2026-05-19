import { useState } from 'react';

type SymptomKey = 'no_cool' | 'weak_cool' | 'ice_buildup' | 'noisy' | 'wont_start' | 'runs_nonstop';

const diagnoses: Record<SymptomKey, { title: string; likelyCause: string; dfwNote: string; urgency: string; urgencyColor: string; cost: string; techTip: string }> = {
  no_cool: {
    title: 'No Cooling at All',
    likelyCause: 'Failed capacitor, low refrigerant, or compressor failure',
    dfwNote: 'In DFW summer heat, capacitor failures spike dramatically. The capacitor helps start the compressor and condenser fan - it is the most common single failure on outdoor units during 100F+ days.',
    urgency: 'Same Day - Health Risk',
    urgencyColor: '#7F1D1D',
    cost: 'Capacitor: $150-$350 | Refrigerant: $300-$700 | Compressor: $1,500-$2,800',
    techTip: 'Tell the tech: outdoor unit is running but not cooling, or outdoor unit is completely off. Mention when symptoms started and outdoor temp at time of failure.',
  },
  weak_cool: {
    title: 'Weak or Insufficient Cooling',
    likelyCause: 'Low refrigerant, dirty condenser coil, or restricted airflow',
    dfwNote: 'A dirty condenser coil is extremely common in DFW due to cottonwood, grass clippings, and debris. When coils are clogged, the system cannot reject heat efficiently and cooling capacity drops 20-30%.',
    urgency: 'Within 48 Hours',
    urgencyColor: '#78350F',
    cost: 'Coil cleaning: $150-$300 | Refrigerant: $300-$700 | Filter replacement: $20-$80',
    techTip: 'Tell the tech: system runs constantly but never reaches setpoint. Mention last time filters were changed and whether outdoor unit has visible debris.',
  },
  ice_buildup: {
    title: 'Ice on Unit or Lines',
    likelyCause: 'Low refrigerant or restricted airflow causing coil to freeze',
    dfwNote: 'Ice on an HVAC system in DFW summer is counterintuitive but common. It means the refrigerant is too cold due to low charge or airflow restriction. Do not ignore - continued operation can damage the compressor.',
    urgency: 'Today - Turn Off System',
    urgencyColor: '#7F1D1D',
    cost: 'Depends on cause: $150-$800 typically',
    techTip: 'IMPORTANT: Turn the system off and let ice melt before the tech arrives. Run the fan only for 2-3 hours. Tell the tech you found ice on the indoor coil or refrigerant lines.',
  },
  noisy: {
    title: 'Unusual Noises',
    likelyCause: 'Failing capacitor, loose parts, or refrigerant leak hissing',
    dfwNote: 'Banging or clanking usually means loose fan blades or debris in the outdoor unit - check for sticks. A hissing or bubbling sound often indicates a refrigerant leak. Squealing can be a failing blower motor bearing.',
    urgency: 'Within 24-48 Hours',
    urgencyColor: '#78350F',
    cost: '$150-$600 depending on component',
    techTip: 'Tell the tech exactly what the noise sounds like and where it comes from - indoor unit, outdoor unit, or ductwork. Note if it happens at startup, during operation, or shutdown.',
  },
  wont_start: {
    title: 'System Will Not Start',
    likelyCause: 'Tripped breaker, failed capacitor, or thermostat issue',
    dfwNote: 'Before calling a tech, check the breaker panel. DFW HVAC systems draw heavy current and can trip breakers during peak summer load. Reset once and see if it holds. Do not reset a breaker more than once - call a tech if it trips again.',
    urgency: 'Same Day in Summer',
    urgencyColor: '#7F1D1D',
    cost: 'Breaker: $20-$200 | Capacitor: $150-$350 | Control board: $400-$900',
    techTip: 'Tell the tech: checked breaker (was it tripped?), thermostat is set correctly and batteries are fresh, and when the system last ran normally.',
  },
  runs_nonstop: {
    title: 'Runs Constantly, Never Shuts Off',
    likelyCause: 'Undersized system, dirty filter, or refrigerant issue',
    dfwNote: 'On DFW days over 100F, an appropriately sized system may run 80-90% of the time - that can be normal. But if it never cycles off even at night when temps drop, that indicates a problem. Check if it is actually cooling or just running.',
    urgency: 'Within 48 Hours',
    urgencyColor: '#78350F',
    cost: 'Filter: $20-$80 | Refrigerant: $300-$700 | Sizing evaluation: $100-$200',
    techTip: 'Tell the tech your indoor temp vs thermostat setpoint, outdoor temp when you noticed the issue, and when you last changed the filter.',
  },
};

export default function DFWIndoorOutdoorUnitGuide() {
  const [symptom, setSymptom] = useState<SymptomKey | ''>('');
  const [result, setResult] = useState<(typeof diagnoses)[SymptomKey] | null>(null);

  function calculate() {
    if (!symptom) return;
    setResult(diagnoses[symptom]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Indoor vs Outdoor Unit Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Most DFW homeowners do not know what equipment they have or what fails first in extreme heat. This guide helps you diagnose symptoms and talk to your HVAC tech.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Know Your System</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Outdoor Unit (Condenser)', 'Removes heat from your home and dumps it outside. Contains the compressor and condenser coil. In DFW, this unit takes a beating from 100F+ ambient temps.'],
              ['Indoor Unit (Air Handler/Furnace)', 'Moves air and contains the evaporator coil where cooling happens. Located in your attic, closet, or utility room.'],
              ['Heat Pump vs Straight Cool', 'Heat pumps have a reversing valve and can heat and cool. Straight cool systems have a separate gas furnace for heat. Look for two copper lines on the outdoor unit.'],
              ['Most Common DFW Summer Failures', 'Capacitor (start/run), condenser fan motor, refrigerant leak, dirty coil. The capacitor is the number one call during DFW heat waves.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Diagnose Your Symptoms</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>What is your system doing?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value as SymptomKey)}
              style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select symptom</option>
              <option value="no_cool">Not cooling at all</option>
              <option value="weak_cool">Cooling weakly or insufficiently</option>
              <option value="ice_buildup">Ice visible on unit or copper lines</option>
              <option value="noisy">Making unusual noises</option>
              <option value="wont_start">Will not turn on at all</option>
              <option value="runs_nonstop">Runs constantly, never shuts off</option>
            </select>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Diagnose My System
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{result.title}</h3>
            <div style={{ display: 'inline-block', background: result.urgencyColor, borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
              {result.urgency}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>LIKELY CAUSE</div>
              <div style={{ fontSize: 14 }}>{result.likelyCause}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 11, color: '#F5E642', marginBottom: 4 }}>DFW SPECIFIC</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.dfwNote}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>WHAT TO TELL YOUR TECH</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.techTip}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>ESTIMATED REPAIR COST</div>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{result.cost}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

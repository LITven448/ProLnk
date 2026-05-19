import { useState } from 'react';

type SymptomKey = 'not_cooling' | 'tripped_breaker' | 'blowing_warm' | 'frozen_unit' | 'wont_turn_on' | 'unusual_noise';

const guides: Record<SymptomKey, { urgency: string; urgencyColor: string; steps: string[]; callNow: boolean; techScript: string; cost: string }> = {
  not_cooling: {
    urgency: 'Call Immediately - 100F+ is a health risk',
    urgencyColor: '#7F1D1D',
    steps: [
      'Set all ceiling fans to counterclockwise (summer mode) at high speed',
      'Close all blinds and curtains, especially west-facing windows',
      'Move to the lowest floor - it will be coolest',
      'Fill a bowl with ice and set a fan behind it for a quick cool spot',
      'Check Dallas cooling centers: rec centers and libraries are free during heat advisories',
      'Keep refrigerator closed to maintain cold food storage',
      'Drink water constantly - heat exhaustion risk is real in DFW homes above 90F indoors',
    ],
    callNow: true,
    techScript: 'AC is completely not cooling. I am in DFW and indoor temp is [X]. I need same-day service. What is your emergency rate?',
    cost: 'Emergency service call: $150-$250 plus repair parts',
  },
  tripped_breaker: {
    urgency: 'Check Breaker First - May Be Simple Fix',
    urgencyColor: '#78350F',
    steps: [
      'Go to your electrical panel and find the HVAC or AC breaker',
      'If it is tripped (middle position), switch it fully OFF then back ON once',
      'Wait 10 minutes then check if the outdoor unit starts running',
      'If the breaker trips again immediately, do NOT reset - call a tech',
      'A breaker that keeps tripping indicates a serious electrical issue',
      'Check the air filter - a clogged filter can cause the system to overheat and trip the breaker',
    ],
    callNow: false,
    techScript: 'My HVAC breaker tripped and keeps tripping after I reset it. I need a tech to check the system - concerned about electrical issue or compressor problem.',
    cost: 'Breaker replacement: $150-$350 | Electrical repair: varies | Compressor issue: $1,500+',
  },
  blowing_warm: {
    urgency: 'Call Within 2-4 Hours',
    urgencyColor: '#78350F',
    steps: [
      'Check the air filter - a completely clogged filter causes the coil to ice over and blow warm air',
      'Go outside and check if the condenser fan is spinning on the outdoor unit',
      'Look for ice on the copper refrigerant lines coming out of the house',
      'If you see ice, turn the system OFF and run fan only for 2-3 hours before calling',
      'Make sure the thermostat is set to COOL not HEAT and fan to AUTO',
      'Check that all supply vents in your home are open and not blocked by furniture',
    ],
    callNow: false,
    techScript: 'System is running but blowing warm or room-temp air. Outdoor unit is [running/not running]. I [did/did not] see ice on the lines. Last filter change was [date].',
    cost: 'Filter: $20-$80 | Refrigerant: $300-$700 | Coil cleaning: $150-$300',
  },
  frozen_unit: {
    urgency: 'Turn Off NOW - Then Call',
    urgencyColor: '#7F1D1D',
    steps: [
      'Turn the thermostat to OFF immediately - do not just raise the setpoint',
      'Switch the fan setting to ON (not auto) to blow warm air across the coils and melt ice',
      'Do NOT try to chip or break the ice - you will damage the coils',
      'Expect 2-4 hours for the ice to fully melt before a tech can properly diagnose',
      'Place towels under the indoor unit - melting ice can overflow the drain pan',
      'Check your drain line access point for a float switch that may have shut the system off',
    ],
    callNow: true,
    techScript: 'I have ice on my indoor coil and refrigerant lines. I have turned the system off and am running fan only to melt the ice. The unit will be clear of ice in about [X] hours.',
    cost: 'Refrigerant recharge: $300-$700 | Leak repair: $200-$1,500 | Coil cleaning: $150-$300',
  },
  wont_turn_on: {
    urgency: 'Check These First Before Calling',
    urgencyColor: '#94A3B8',
    steps: [
      'Check thermostat batteries - dead batteries are a very common no-start cause',
      'Make sure thermostat is set to COOL and temperature is set below current room temp',
      'Go to the breaker panel and check if the HVAC breaker is tripped',
      'Check for a disconnect switch near the outdoor unit - it may have been turned off',
      'Look for a condensate float switch near the indoor unit - a full drain pan shuts the system off',
      'Check if the indoor unit door is fully closed - most air handlers have a door safety switch',
    ],
    callNow: false,
    techScript: 'System will not turn on. I checked the thermostat batteries, breaker, and outdoor disconnect. I [did/did not] find a tripped float switch at the drain pan.',
    cost: 'Service call: $100-$200 | Float switch: $75-$150 | Control board: $400-$900',
  },
  unusual_noise: {
    urgency: 'Call Within 24 Hours',
    urgencyColor: '#78350F',
    steps: [
      'Banging or clanking: check outdoor unit for debris like sticks that may be hitting the fan blade',
      'Hissing near indoor unit: possible refrigerant leak - reduce AC use and call tech',
      'Squealing or screeching: blower motor bearing failing - do not ignore, it will fail completely',
      'Clicking on startup: normal for a few clicks, but constant clicking means control board issue',
      'Rattling from ducts: loose duct joint or debris in the ductwork',
      'Gurgling sound: usually a drain line issue with air in the condensate line',
    ],
    callNow: false,
    techScript: 'My HVAC system is making a [describe sound] noise from the [indoor/outdoor] unit. It happens [at startup/during operation/constantly]. The system is [still cooling/not cooling as well].',
    cost: 'Depends on component: $150-$1,500',
  },
};

export default function DFWEmergencyACGuide() {
  const [symptom, setSymptom] = useState<SymptomKey | ''>('');
  const [result, setResult] = useState<(typeof guides)[SymptomKey] | null>(null);

  function calculate() {
    if (!symptom) return;
    setResult(guides[symptom]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Emergency AC Guide for DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 8, lineHeight: 1.6 }}>
          When AC fails during a DFW 100F+ day, the clock is ticking. Use this guide for immediate steps while you wait for a tech.
        </p>
        <div style={{ background: '#7F1D1D', borderRadius: 8, padding: '10px 16px', marginBottom: 32, fontSize: 13 }}>
          Indoor temps above 95F are dangerous for elderly, children, and pets. Do not wait - act immediately.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>What Is Your AC Doing?</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Select your situation</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value as SymptomKey)}
              style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select your situation</option>
              <option value="not_cooling">AC is completely not cooling</option>
              <option value="tripped_breaker">Breaker tripped or keeps tripping</option>
              <option value="blowing_warm">Running but blowing warm air</option>
              <option value="frozen_unit">Ice on the unit or lines</option>
              <option value="wont_turn_on">Will not turn on at all</option>
              <option value="unusual_noise">Making unusual noises</option>
            </select>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Emergency Steps
          </button>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: result.urgencyColor, borderRadius: 8, padding: '12px 16px', fontWeight: 700, fontSize: 15 }}>
              {result.urgency}
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Do These Right Now</h3>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ background: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#F5E642', flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>{step}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>What to Tell the Tech</h3>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6, fontStyle: 'italic', color: '#94A3B8' }}>
                "{result.techScript}"
              </div>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated cost</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{result.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>DFW Cooling Centers</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>During heat advisories, Dallas County and Tarrant County open free cooling centers.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              ['Dallas', 'Dallas City Hall lobby, Dallas Public Library branches, Dallas Recreation Centers'],
              ['Fort Worth', 'Fort Worth Community Centers, Tarrant County Public Health locations'],
              ['Denton/Collin', 'Check county emergency management websites for current locations'],
              ['All Areas', 'Call 211 for the nearest open cooling center during a heat emergency'],
            ].map(([area, locations]) => (
              <div key={area as string} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 2 }}>{area as string}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>{locations as string}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const problems = [
  'AC running but no cold air',
  'AC not turning on at all',
  'AC blowing warm air',
  'Water dripping/flooding inside',
  'Strange loud noise from unit',
  'Ice/frost on unit or lines',
  'House won\’t cool below 80°F',
  'Burning smell from vents',
];

const protocols: Record<string, { steps: { step: number; action: string; why: string; diy: boolean }[]; verdict: 'emergency' | 'wait' | 'same-day'; callNote: string }> = {
  'Burning smell from vents': {
    steps: [
      { step: 1, action: 'Turn off system at thermostat immediately', why: 'Electrical fires can start within minutes — do not run system', diy: true },
      { step: 2, action: 'Turn off breaker for HVAC system', why: 'Cuts all power to prevent escalation while you investigate', diy: true },
      { step: 3, action: 'Check for visible smoke or fire around air handler', why: 'If smoke present, evacuate and call 911 first', diy: true },
      { step: 4, action: 'Call HVAC emergency line immediately', why: 'Electrical burning smell = fire risk — this is a true emergency', diy: false },
    ],
    verdict: 'emergency',
    callNote: 'Tell the dispatcher: "burning smell from HVAC vents, system off." This is a same-day emergency in any DFW temperature.',
  },
  'Water dripping/flooding inside': {
    steps: [
      { step: 1, action: 'Turn off system at thermostat', why: 'Running system with blocked drain continues flooding', diy: true },
      { step: 2, action: 'Find the drain pan under your air handler', why: 'If overflowing, you have hours before ceiling/drywall damage ($3,000-8,000)', diy: true },
      { step: 3, action: 'Try wet-vac or turkey baster to clear standing water', why: 'Buys time while waiting for tech — every hour matters', diy: true },
      { step: 4, action: 'Find the drain line access cap (usually PVC near air handler)', why: 'Pour 1 cup white vinegar to break up algae blockage', diy: true },
      { step: 5, action: 'Call for same-day service if water continues', why: 'Secondary drain float switch may have failed — needs tech', diy: false },
    ],
    verdict: 'same-day',
    callNote: 'Tell dispatcher: "condensate drain flooding, water near air handler." Request same-day — in DFW summer this can cause structural damage in 24 hours.',
  },
  'Ice/frost on unit or lines': {
    steps: [
      { step: 1, action: 'Turn system to FAN ONLY (not OFF, not COOL)', why: 'Fan melts ice without stressing frozen components', diy: true },
      { step: 2, action: 'Check air filter — replace if visibly clogged', why: 'Restricted airflow is #1 cause of freeze-ups in DFW', diy: true },
      { step: 3, action: 'Check all supply vents — open any that are closed', why: 'Closed vents cause pressure buildup and freezing', diy: true },
      { step: 4, action: 'Wait 2-4 hours for full thaw before cooling again', why: 'Running on ice stresses compressor and can cause $2,000+ failure', diy: true },
      { step: 5, action: 'If freezing recurs, call for refrigerant check', why: 'Repeat freeze-ups = low refrigerant = slow leak somewhere in system', diy: false },
    ],
    verdict: 'wait',
    callNote: 'Schedule within 48 hours if freeze-up recurs after filter change. Not an emergency unless it\’s above 95°F and you have no backup cooling.',
  },
  'AC running but no cold air': {
    steps: [
      { step: 1, action: 'Check thermostat — confirm set to COOL, not FAN', why: 'Fan-only mode is the most common "emergency" call in DFW', diy: true },
      { step: 2, action: 'Check air filter — hold up to light to test blockage', why: 'Severely clogged filter prevents airflow entirely', diy: true },
      { step: 3, action: 'Go outside and check if condenser fan is spinning', why: 'Dead fan motor = no heat rejection = warm air inside', diy: true },
      { step: 4, action: 'Look at refrigerant lines (copper pipes) for ice', why: 'Ice = refrigerant issue — switch to fan only for 2 hours', diy: true },
      { step: 5, action: 'Call for service — refrigerant or electrical fault likely', why: 'In 100°F+ DFW heat, this is a same-day or emergency call', diy: false },
    ],
    verdict: 'same-day',
    callNote: 'If temperature inside exceeds 85°F with elderly, young children, or pets, escalate to emergency service.',
  },
  'AC not turning on at all': {
    steps: [
      { step: 1, action: 'Check thermostat batteries', why: 'Dead thermostat batteries cause 15% of "AC failure" calls in DFW', diy: true },
      { step: 2, action: 'Check circuit breaker — look for tripped breaker (middle position)', why: 'Reset once; if it trips again do not reset — call immediately', diy: true },
      { step: 3, action: 'Check disconnect box at outdoor unit — confirm fuses intact', why: 'Blown disconnect fuses are a common DFW summer failure', diy: true },
      { step: 4, action: 'Check if indoor air handler has reset button', why: 'Some units have safety reset — hold 5 seconds', diy: true },
      { step: 5, action: 'If no power confirmed — call for emergency service', why: 'Complete no-power failure in DFW summer = same-day emergency', diy: false },
    ],
    verdict: 'emergency',
    callNote: 'In July/August DFW heat, complete AC failure with indoor temp above 85°F qualifies for emergency service. Request emergency line.',
  },
  'Strange loud noise from unit': {
    steps: [
      { step: 1, action: 'Identify noise location — indoor or outdoor unit', why: 'Location determines urgency: outdoor bang = possible compressor', diy: true },
      { step: 2, action: 'Squealing = belt or bearing. Banging = loose component. Rattling = debris', why: 'Sound type narrows the diagnosis before you call', diy: true },
      { step: 3, action: 'Turn off system if noise is grinding or loud banging', why: 'Running a damaged compressor turns $600 repair into $2,400 replacement', diy: true },
      { step: 4, action: 'Check outdoor unit for debris (sticks, rocks in fan)', why: 'Foreign objects in condenser fan make loud noise — often DIY fix', diy: true },
      { step: 5, action: 'Call for diagnosis — describe sound type and location', why: 'Noise diagnosis over phone can determine if emergency or scheduled', diy: false },
    ],
    verdict: 'same-day',
    callNote: 'Loud banging or grinding = shut off and call same-day. Rattling or light squealing = schedule within a week.',
  },
  'AC blowing warm air': {
    steps: [
      { step: 1, action: 'Confirm thermostat is set to COOL and below current indoor temp', why: 'Simple setting error accounts for 20% of warm air calls', diy: true },
      { step: 2, action: 'Check outdoor unit — is condenser fan running?', why: 'Dead condenser fan = system cooling nothing outdoors = warm air inside', diy: true },
      { step: 3, action: 'Feel refrigerant lines at air handler — should be cold/cool', why: 'Warm lines = refrigerant issue or compressor not running', diy: true },
      { step: 4, action: 'Check for ice on evaporator coil', why: 'Frozen coil blocks airflow — switch to fan only for 2 hours', diy: true },
      { step: 5, action: 'Call for refrigerant check or capacitor test', why: 'Most warm-air causes in DFW are capacitor failure or refrigerant leak', diy: false },
    ],
    verdict: 'same-day',
    callNote: 'Warm air in DFW July/August with indoor temps climbing above 85°F = emergency call priority.',
  },
  'House won\’t cool below 80°F': {
    steps: [
      { step: 1, action: 'Check thermostat set point and confirm COOL mode', why: 'Confirm system is actually trying to reach your target temp', diy: true },
      { step: 2, action: 'Check all vents are open and unobstructed', why: 'Furniture blocking vents reduces cooling capacity 10-20%', diy: true },
      { step: 3, action: 'Check air filter condition', why: 'Dirty filter reduces airflow and cooling capacity significantly', diy: true },
      { step: 4, action: 'Note outdoor temperature — above 105°F = normal struggle', why: 'DFW systems are typically designed for 95-100°F design day', diy: true },
      { step: 5, action: 'If outdoor temp is under 100°F and house won\’t cool, call for service', why: 'Refrigerant leak or failing compressor likely — schedule diagnostic', diy: false },
    ],
    verdict: 'wait',
    callNote: 'Schedule within 2-3 days unless temps inside exceed 85°F with vulnerable occupants. This is typically not an emergency.',
  },
};

export default function DFWHVACEmergencyProtocol() {
  const [problem, setProblem] = useState('');
  const [showProtocol, setShowProtocol] = useState(false);

  const protocol = problem ? protocols[problem] : null;
  const verdictStyle = protocol?.verdict === 'emergency'
    ? { bg: '#1A1010', border: '#EF4444', text: '#FCA5A5', label: '🚨 CALL EMERGENCY LINE NOW' }
    : protocol?.verdict === 'same-day'
    ? { bg: '#1A1A10', border: '#F5E642', text: '#FEF08A', label: '⚡ SAME-DAY SERVICE NEEDED' }
    : { bg: '#0F1E38', border: '#60A5FA', text: '#93C5FD', label: '📅 SCHEDULE WITHIN 48-72 HOURS' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Emergency Protocol Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 36 }}>When AC fails in 100°F+ DFW heat, every minute matters. Follow this protocol before you call — it can save hours of wait time and hundreds of dollars.</p>

        <div style={{ background: '#1A1010', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #EF4444' }}>
          <div style={{ fontWeight: 700, color: '#FCA5A5', marginBottom: 8 }}>🌡️ DFW Summer Reality Check</div>
          <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>DFW averages 15-20 days above 105°F annually. At 110°F outdoor temps, an uninsulated home becomes unsafe in 2-4 hours without AC. Heat exhaustion risk begins at indoor temps above 90°F. Know your protocol before it happens.</div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 What's Your Problem?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {problems.map(p => (
            <button key={p} onClick={() => { setProblem(p); setShowProtocol(false); }} style={{ textAlign: 'left', padding: '14px 18px', borderRadius: 10, border: '1px solid', borderColor: problem === p ? '#F5E642' : '#1E3A5F', background: problem === p ? '#1A2A10' : '#111D35', color: problem === p ? '#F5E642' : '#CBD5E1', fontSize: 15, cursor: 'pointer' }}>
              {problem === p ? '● ' : '○ '}{p}
            </button>
          ))}
        </div>

        {problem && (
          <button onClick={() => setShowProtocol(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 24, width: '100%' }}>
            Show Emergency Protocol →
          </button>
        )}

        {showProtocol && protocol && (
          <div>
            <div style={{ background: verdictStyle.bg, borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `4px solid ${verdictStyle.border}` }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: verdictStyle.text }}>{verdictStyle.label}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 8 }}>{protocol.callNote}</div>
            </div>

            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Step-by-Step Protocol:</h3>
            {protocol.steps.map((step) => (
              <div key={step.step} style={{ background: '#111D35', borderRadius: 10, padding: '16px 18px', marginBottom: 12, borderLeft: step.diy ? '4px solid #22C55E' : '4px solid #F5E642' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: step.diy ? '#22C55E' : '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{step.action}</div>
                    <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{step.why}</div>
                    <div style={{ fontSize: 12, color: step.diy ? '#22C55E' : '#F5E642', marginTop: 6 }}>{step.diy ? '✅ DIY — do this yourself' : '📞 Call required'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, padding: '20px 24px', background: '#0F1E38', borderRadius: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642' }}>📋 When to Go to a Cooling Center Instead</div>
          <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>
            If indoor temps exceed 90°F and you have: elderly residents (65+), infants under 1 year, serious medical conditions, or pets — do not wait for HVAC repair. DFW cooling centers are available at most libraries and recreation centers during heat emergencies. Your life is not worth the wait.
          </div>
        </div>
      </div>
    </div>
  );
}

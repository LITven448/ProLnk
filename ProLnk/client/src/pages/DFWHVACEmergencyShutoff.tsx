import { useState } from 'react';

const emergencies = [
  {
    id: 'gas',
    label: 'Gas Smell',
    emoji: '💨',
    severity: 'CRITICAL',
    severityColor: '#EF4444',
    steps: [
      { action: 'LEAVE NOW', detail: 'Evacuate everyone immediately. Do not stop to gather belongings.' },
      { action: 'Do NOT flip any switches', detail: 'No lights, no phones inside, no thermostat — any spark can ignite gas.' },
      { action: 'Leave the door open', detail: 'As you exit, leave the front door open to help ventilate.' },
      { action: 'Call 911 from outside', detail: 'From the street or a neighbor\’s home. Do not re-enter.' },
      { action: 'Call Atmos Energy (DFW gas utility)', detail: '1-888-286-6700 — 24/7 emergency line. They will dispatch and shut off gas at street.' },
    ],
    doNext: 'Do NOT re-enter until cleared by fire department AND Atmos Energy. Then call HVAC tech to inspect furnace and gas lines before restarting.',
    doNotDo: 'Do NOT try to find the leak. Do NOT shut off the HVAC yourself. Do NOT re-enter.',
  },
  {
    id: 'burning',
    label: 'Electrical Burning Smell',
    emoji: '🔥',
    severity: 'HIGH',
    severityColor: '#F97316',
    steps: [
      { action: 'Turn thermostat to OFF immediately', detail: 'Kills the call for cooling/heating — reduces electrical load.' },
      { action: 'Go to your breaker panel', detail: 'Find the HVAC breaker (usually 240V double-pole, labeled AC, HVAC, or HEAT).' },
      { action: 'Flip the HVAC breaker to OFF', detail: 'This kills power to both the air handler and outdoor condenser.' },
      { action: 'Do NOT restart the system', detail: 'Burning smell = motor failure, shorted wire, or capacitor failure. Running it again risks fire.' },
      { action: 'Ventilate the area', detail: 'Open windows near the air handler. If smell is severe or smoke is visible, call 911.' },
    ],
    doNext: 'Call a DFW HVAC tech same-day for an emergency diagnostic. Common culprits: seized blower motor, failed capacitor, burnt wiring harness.',
    doNotDo: 'Do NOT reset the breaker and try again. Do NOT ignore and wait — electrical fires can smolder in ductwork.',
  },
  {
    id: 'flooding',
    label: 'Flooding Near Unit',
    emoji: '💧',
    severity: 'MODERATE',
    severityColor: '#F5E642',
    steps: [
      { action: 'Turn thermostat to OFF', detail: 'Stop the system from generating more condensate water.' },
      { action: 'Turn off the HVAC breaker', detail: 'Water and electricity near your air handler is a shock risk.' },
      { action: 'Find the primary drain line', detail: 'Usually a PVC pipe exiting the air handler. Check if it\’s clogged or disconnected.' },
      { action: 'Check the overflow drain pan', detail: 'The pan under your air handler should not have standing water. If it does, drain is clogged.' },
      { action: 'Clear the drain line', detail: 'Use a wet/dry vac on the end of the drain line outside. Or pour diluted bleach into the drain port.' },
    ],
    doNext: 'Once cleared, turn system back on and monitor for 30 min. If flooding recurs, call a tech — secondary drain may be missing or pan may be cracked.',
    doNotDo: 'Do NOT leave the system running with active flooding. Mold in DFW humidity can establish in 24–48 hours.',
  },
  {
    id: 'nopower',
    label: 'Total Unit Failure / No Power',
    emoji: '⚡',
    severity: 'LOW',
    severityColor: '#60A5FA',
    steps: [
      { action: 'Check the thermostat', detail: 'Is it on? Dead batteries? Set to the right mode (COOL vs HEAT)?' },
      { action: 'Check the HVAC breaker', detail: 'A tripped breaker is the #1 cause of "no power." Reset once — if it trips again, call a tech.' },
      { action: 'Check the emergency shutoff switch', detail: 'Red switch near air handler (looks like a light switch). Should be ON.' },
      { action: 'Check the condensate overflow switch', detail: 'If drain pan is full, a float switch may have killed power. Drain pan first.' },
      { action: 'Check the furnace door panel', detail: 'Most air handlers have a safety switch in the door — if door is slightly ajar, unit won\’t run.' },
    ],
    doNext: 'If all above checks pass and unit still won\’t run, call a DFW HVAC tech. In July/August DFW heat, same-day service is warranted.',
    doNotDo: 'Do NOT keep resetting a tripping breaker — it means the compressor or motor is drawing too many amps.',
  },
];

export default function DFWHVACEmergencyShutoff() {
  const [selected, setSelected] = useState('gas');
  const em = emergencies.find((e) => e.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC Emergency Shutoff Guide</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>Select your emergency — get exact steps for DFW</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {emergencies.map((e) => (
            <button key={e.id} onClick={() => setSelected(e.id)}
              style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: selected === e.id ? e.severityColor : '#1E3A5F', background: selected === e.id ? e.severityColor : '#112240', color: selected === e.id ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>
              {e.emoji} {e.label}
            </button>
          ))}
        </div>

        <div style={{ background: em.severityColor + '22', border: `2px solid ${em.severityColor}`, borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>{em.emoji}</span>
          <div>
            <div style={{ color: em.severityColor, fontWeight: 700, fontSize: '0.85rem' }}>SEVERITY: {em.severity}</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{em.label}</div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Exact Shutoff Steps</h3>
          {em.steps.map((step, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '0.75rem', borderLeft: `4px solid ${em.severityColor}` }}>
              <div style={{ color: em.severityColor, fontWeight: 700, marginBottom: 4 }}>Step {i + 1}: {step.action}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{step.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F4C2A', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ color: '#4ADE80', marginTop: 0 }}>✅ What to Do Next</h3>
          <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7 }}>{em.doNext}</p>
        </div>
        <div style={{ background: '#4C1F0F', borderRadius: 10, padding: '1.25rem' }}>
          <h3 style={{ color: '#FB923C', marginTop: 0 }}>🚫 Do NOT</h3>
          <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7 }}>{em.doNotDo}</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

type Symptom = { label: string; icon: string; steps: string[]; emergency: boolean; tip: string };

const symptoms: Symptom[] = [
  { label: 'Blowing Warm Air', icon: '🌡️', emergency: false,
    steps: ['Check thermostat — confirm it is set to COOL and fan is on AUTO', 'Check air filter — clogged filters cause freeze-overs that blow warm air', 'Check outdoor unit — is it running? Listen for compressor hum', 'Look for ice on the copper line near the indoor unit — if iced, turn AC off and run fan only for 2 hours', 'Check circuit breaker — reset once if tripped'],
    tip: 'If the outdoor unit is not running but the indoor fan is, the compressor may be off on thermal overload. Give it 30 minutes before calling.' },
  { label: 'Thermostat Blank', icon: '⬛', emergency: false,
    steps: ['Check if thermostat is battery-powered — replace batteries first', 'Check the circuit breaker for the furnace/air handler', 'Check the furnace/air handler door — a safety switch may have tripped if the panel is open', 'Look for a tripped float switch near the drain pan (indicates overflow)', 'Check 3A fuse on the control board inside the air handler'],
    tip: 'A blank thermostat is almost never a thermostat failure — it is almost always power supply related. Work through each power source methodically.' },
  { label: 'AC Not Turning On', icon: '🔇', emergency: false,
    steps: ['Verify thermostat settings and replace batteries if battery-powered', 'Check breaker — reset once, wait 5 minutes, and try again', 'Check the disconnect box at the outdoor unit — verify fuses are not blown', 'Check the drain line for overflow — a clogged drain triggers a safety shutoff', 'Listen and look at outdoor unit — if capacitor is bad, compressor tries to start and hums briefly then stops'],
    tip: 'DFW emergency HVAC rates run $150-$250/hour after hours. Diagnosing the issue before calling saves time and money.' },
  { label: 'Water Leaking Inside', icon: '💧', emergency: true,
    steps: ['Turn off AC immediately at thermostat', 'Turn off air handler power at breaker', 'Place towels and containers — ceiling water damage is expensive', 'Locate the drain pan under the air handler — if full, the drain line is clogged', 'Try flushing the drain line with bleach-water mixture (1 cup bleach, 1 gallon water) through the access port', 'If water is actively dripping through ceiling, this is an emergency — call now'],
    tip: 'Most DFW water leaks are from clogged condensate drain lines — a $15 DIY fix with a wet vac and bleach. But if water is in the ceiling, call immediately.' },
  { label: 'Loud Banging Noise', icon: '💥', emergency: true,
    steps: ['Turn off the system immediately — a banging noise indicates a mechanical failure', 'Do not restart the system', 'Check if the outdoor unit fan blade is hitting something — small debris can cause banging', 'A banging from inside the air handler may be a broken blower wheel', 'Call an HVAC technician — operating a system with a broken component causes compressor damage ($1,500-$3,000)'],
    tip: 'A one-time clunk at startup can be normal expansion. Persistent or repeated banging is always an emergency — shut it off.' },
  { label: 'Ice on Unit', icon: '🧊', emergency: false,
    steps: ['Turn AC to OFF at thermostat — switch fan to ON to melt ice', 'Do not chip or force ice off — let it melt naturally (2-4 hours)', 'Check air filter immediately — a clogged filter is the most common cause', 'After thaw, change filter, then turn AC back on and monitor', 'If ice returns within 24 hours, the refrigerant is likely low — call a technician'],
    tip: 'Running a frozen AC system damages the compressor. Always let it fully thaw before restarting. This is not an emergency unless it is above 95°F and you have vulnerable people at home.' },
];

const faqs = [
  { q: 'How long can I wait for an HVAC tech in DFW summer?', a: 'In peak summer (July-August) when temperatures exceed 100°F, same-day emergency service is typically available but may cost $150-$250/hour for after-hours. Next-day service is more common and 30-40% cheaper. If you have elderly, infants, or pets, prioritize emergency service. Most DFW systems can be diagnosed and repaired in 1-2 hours.' },
  { q: 'What emergency cooling options do I have while waiting for repairs?', a: 'Close blinds and curtains immediately — this alone reduces indoor heat by 10-15°F. Use portable fans to create cross-ventilation. Wet towels on the back of the neck provide immediate relief. If temperatures inside exceed 85°F and you have vulnerable family members, consider a hotel room. DFW has cooling centers at libraries and rec centers during heat emergencies.' },
  { q: 'At what indoor temperature is it an emergency for vulnerable people?', a: 'Heat-related illness risk rises rapidly above 80°F indoors for infants, elderly (65+), and those with heart/respiratory conditions. Above 90°F indoors is dangerous for everyone. In DFW summer heat, a non-functioning AC in a sealed home can reach 110°F+ within hours. Treat as an emergency if you cannot cool the home below 85°F.' },
  { q: 'How much does emergency HVAC service cost in DFW?', a: 'Expect $100-$200 diagnostic fee plus parts and labor. Common repairs: capacitor replacement ($150-$400 total), refrigerant recharge ($200-$600 depending on amount), contactor replacement ($150-$350). After-hours emergency dispatch adds $75-$150 to any bill. Always ask for a written estimate before approving repairs.' },
  { q: 'How do I clear a clogged AC drain line myself?', a: 'Locate the PVC drain line exit (usually outside near the foundation). Use a wet/dry shop vac on the end of the drain line for 3-5 minutes. Alternatively, pour 1 cup of distilled white vinegar into the access port near the air handler monthly as prevention. A clogged drain is the most common DFW HVAC emergency and often a $0 fix.' },
  { q: 'Should I add refrigerant myself?', a: 'No. Refrigerant handling requires EPA 608 certification in Texas. DIY refrigerant is illegal and the diagnostic tools needed to determine proper charge level cost $500+. A low refrigerant system usually has a leak — adding refrigerant without fixing the leak means another service call within months.' },
];

export default function DFWHVACEmergencyFAQ() {
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW HVAC Emergency FAQ</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>What to do when your AC fails in 100°F DFW heat — select your symptom</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px', fontSize: 14 }}>🔍 SELECT YOUR SYMPTOM</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
            {symptoms.map((s, i) => (
              <button key={i} onClick={() => setSelectedSymptom(selectedSymptom === i ? null : i)}
                style={{ padding: '12px 14px', borderRadius: 10, border: selectedSymptom === i ? '2px solid #F5E642' : '1px solid #1e3a5f', cursor: 'pointer', textAlign: 'left',
                  background: selectedSymptom === i ? '#1e3a5f' : '#0A1628' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{s.label}</div>
                {s.emergency && <div style={{ color: '#f87171', fontSize: 10, fontWeight: 700, marginTop: 4 }}>⚡ EMERGENCY</div>}
              </button>
            ))}
          </div>
        </div>

        {selectedSymptom !== null && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 28, border: `2px solid ${symptoms[selectedSymptom].emergency ? '#f87171' : '#F5E642'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{symptoms[selectedSymptom].icon}</span>
              <div>
                <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 800, margin: 0 }}>{symptoms[selectedSymptom].label}</h2>
                {symptoms[selectedSymptom].emergency && <span style={{ color: '#f87171', fontSize: 12, fontWeight: 700 }}>⚡ CALL AN HVAC TECH NOW</span>}
              </div>
            </div>
            <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px', fontSize: 13 }}>IMMEDIATE STEPS:</p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 20 }}>
              {symptoms[selectedSymptom].steps.map((step, i) => (
                <li key={i} style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>{step}</li>
              ))}
            </ol>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: '3px solid #F5E642' }}>
              <p style={{ color: '#e2e8f0', fontSize: 13, margin: 0 }}>💡 <strong>Pro tip:</strong> {symptoms[selectedSymptom].tip}</p>
            </div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>HVAC Emergency FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, overflow: 'hidden', border: open === i ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
                <span style={{ color: '#F5E642', fontSize: 16, marginLeft: 12 }}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && <div style={{ padding: '0 18px 14px', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 20, background: '#ef4444', borderRadius: 10, textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: 16, margin: '0 0 6px' }}>🚨 AC out in DFW summer heat?</p>
          <p style={{ color: '#fecaca', fontSize: 13, margin: 0 }}>ProLnk connects you with licensed DFW HVAC technicians — many available same day.</p>
        </div>
      </div>
    </div>
  );
}

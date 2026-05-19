import { useState } from 'react';

const symptoms = [
  { id: 'hum_nospin', label: 'Outdoor unit hums but fan does not spin', diagnosis: 'Capacitor failure — the most common DFW HVAC service call in summer. The run capacitor stores energy to start and run the compressor and fan motors. DFW heat degrades capacitors 2-3x faster than moderate climates. Capacitor replacement costs $150-300 and is a quick 30-minute repair. Do not run system with failed capacitor — you will burn out the motor.' },
  { id: 'wont_start', label: 'System does not turn on at all', diagnosis: 'Start at the basics: check breaker (HVAC needs dedicated 240V breaker), check thermostat batteries, check disconnect box at outdoor unit. If all good, likely contactor, control board, or transformer failure. Contactor ($200-350) is a high-voltage relay that activates the outdoor unit — contacts burn out in DFW heat after 5-8 years.' },
  { id: 'trips_breaker', label: 'System trips the breaker when running', diagnosis: 'Hard start — compressor is drawing too much current on startup. Hard start kit ($75-150 installed) adds an extra capacitor to boost starting torque. If breaker continues tripping after hard start kit, compressor may be failing. Get a compressor amp draw test before deciding on compressor replacement ($1,500-2,500) vs new system.' },
  { id: 'short_cycle', label: 'System turns on and off rapidly', diagnosis: 'Short cycling caused by electrical fault, refrigerant pressure issue, or failing control board. Control board ($400-800) manages all system functions — timing, safety lockouts, diagnostics. A failing board often causes erratic behavior before complete failure. Have tech pull fault codes from board before replacing — codes identify root cause.' },
  { id: 'burning', label: 'Burning smell from air handler or outdoor unit', diagnosis: 'Electrical burning smell is an emergency — shut system off immediately. Possible causes: failing motor burning out windings, control board overheating, wiring insulation melting. Turn system off at thermostat AND breaker. Do not restart until inspected. Electrical fires in attic air handlers are rare but serious in DFW homes.' },
];

export default function DFWHVACElectricalGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>⚡ HVAC Electrical Components Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          DFW heat destroys electrical components faster than any other climate factor. Capacitors, contactors, and control boards all have shorter lifespans in North Texas — here is what to know.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔋', title: 'Capacitor ($150-300)', body: 'The #1 electrical failure in DFW HVAC. Run capacitors power the compressor and fan motors. DFW attic temperatures of 140°F+ degrade capacitor fluid rapidly — average DFW lifespan is 6-9 years vs 12-15 nationally. Symptoms: motor hums but will not start, unit blows warm air, fan spinning slowly. Always replace both run capacitors (dual capacitor) at same time.' },
            { icon: '🔌', title: 'Contactor ($200-350)', body: 'The contactor is a high-voltage relay that physically connects power to your compressor and outdoor fan when the thermostat calls for cooling. Contact points burn and pit from 240V arcing, especially in DFW where systems run 2,500+ hours per year. Pitted contacts cause intermittent failures and eventual system no-start. Replace at first signs of pitting.' },
            { icon: '🖥️', title: 'Control Board ($400-800)', body: 'The brain of modern HVAC systems. Controls timing, safety lockouts, diagnostics, and variable-speed functions. Expensive to replace but rarely fails before 10-12 years. Before replacing a control board, pull diagnostic fault codes — most boards display codes via LED blinks that identify the root cause. Do not replace board until fault codes are interpreted.' },
            { icon: '🔧', title: 'Transformer & Start Relay ($150-300)', body: 'The 24V transformer powers your thermostat and control board. Failure causes complete system shutdown with no thermostat response. Start relay (in some systems) gives compressor an extra electrical kick on startup. If your system trips the breaker repeatedly at startup, a hard start kit (additional capacitor + relay, $75-150) often resolves it without compressor replacement.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Electrical Symptom Guide</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your symptom to identify the likely electrical component:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Get a DFW HVAC Electrical Repair Quote</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}
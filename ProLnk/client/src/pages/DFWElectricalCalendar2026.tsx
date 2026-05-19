import { useState } from 'react';

const MONTHS = [
  { name: 'January', short: 'Jan', tasks: ['Test all smoke detectors — replace batteries if needed', 'Test carbon monoxide detectors', 'Check breaker panel for tripped breakers or signs of heat (discoloration)', 'Inspect extension cords — winter overloading is common'], urgency: 'HIGH', context: 'Post-holiday season — overloaded circuits and space heater use peak in January. Verify detector function.' },
  { name: 'February', short: 'Feb', tasks: ['Check space heater cords for fraying', 'Verify outdoor outlets have covers intact', 'Test AFCI breakers if panel has them (press test button, reset)'], urgency: 'MEDIUM', context: 'Cold snap portable heating use continues. Arc-fault protection is critical for bedroom circuits.' },
  { name: 'March', short: 'Mar', tasks: ['Inspect all outdoor GFCI outlets before summer outdoor use', 'Test GFCI outlets — press test and reset buttons', 'Check exterior outlet covers for winter damage', 'Inspect landscape lighting connections for moisture damage'], urgency: 'HIGH', context: 'Pre-summer GFCI check is critical. DFW outdoor outlets need to be ready for summer patio and yard use.' },
  { name: 'April', short: 'Apr', tasks: ['Inspect holiday light extension cords stored in attic — heat damage is common', 'Check attic wiring for rodent damage (common after winter)', 'Test smoke detectors with actual smoke if battery test passes but detector is old'], urgency: 'MEDIUM', context: 'Attic inspection season before summer heat. DFW attic temps hit 140°F in summer — check wiring now.' },
  { name: 'May', short: 'May', tasks: ['Check whole-home surge protector status light (if installed)', 'Inspect breaker panel before HVAC summer load begins', 'Verify 240V HVAC breaker is tight and not overheating', 'Check outdoor kitchen and pool electrical for GFCIs'], urgency: 'HIGH', context: 'DFW summer storm season begins. Surge protection is critical — grid fluctuations peak June-Sept.' },
  { name: 'June', short: 'Jun', tasks: ['Test surge protectors — replace if indicator light is off', 'Check HVAC circuit — if breaker trips repeatedly, schedule electrician', 'Verify generator transfer switch works if generator is present', 'Inspect pool pump and filter electrical connections'], urgency: 'HIGH', context: 'Summer storm season peak. DFW averages 50+ thunderstorm days/year. Surge events are frequent.' },
  { name: 'July', short: 'Jul', tasks: ['Check outdoor GFCI outlets after July 4th use', 'Monitor breaker panel — summer AC + pool + appliances test capacity', 'Look for flickering lights (loose connections amplified by heat)'], urgency: 'MEDIUM', context: 'Peak electrical load month. HVAC, pool, and appliances run simultaneously. Watch for capacity issues.' },
  { name: 'August', short: 'Aug', tasks: ['Check for warm outlets or switches (sign of overloaded circuit)', 'Inspect ceiling fans for wobble or electrical noise before winter use', 'Test smoke detectors mid-year (6-month check)'], urgency: 'MEDIUM', context: 'End of peak summer load. Cumulative heat stress on wiring can cause connection issues.' },
  { name: 'September', short: 'Sep', tasks: ['Final summer storm surge check — replace tripped surge protectors', 'Inspect outdoor outlets before fall yard work season', 'Check landscape lighting timers and connections'], urgency: 'MEDIUM', context: 'Storm season winding down. Assess any surge damage and replace protectors that absorbed events.' },
  { name: 'October', short: 'Oct', tasks: ['Test ALL smoke detectors (DST time change reminder)', 'Test ALL carbon monoxide detectors', 'Replace batteries in all detectors', 'Check heating equipment connections before winter turn-on'], urgency: 'HIGH', context: 'Daylight saving time = battery check time. Heating season start means CO risk from furnaces rises.' },
  { name: 'November', short: 'Nov', tasks: ['Check holiday light strings before decorating — discard damaged ones', 'Inspect outdoor outlets for winter use', 'Verify generator is operational before freeze season', 'Check breaker panel before holiday electrical load'], urgency: 'HIGH', context: 'Holiday decoration load + heating load = peak winter demand. Pre-season inspection prevents fires.' },
  { name: 'December', short: 'Dec', tasks: ['Do not overload outlets with holiday decorations — use power strips with surge protection', 'Check space heater cords before heavy use', 'Verify smoke and CO detectors are operational', 'Know breaker panel location in case of emergency during holiday gatherings'], urgency: 'HIGH', context: 'Highest fire risk month nationally. DFW holiday electrical fires spike in December.' },
];

const URGENCY_COLOR = { HIGH: '#F5E642', MEDIUM: '#60A5FA', LOW: '#34D399′ };

export default function DFWElectricalCalendar2026() {
  const [selected, setSelected] = useState(0);
  const month = MONTHS[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Electrical Seasonal Calendar 2026</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>DFW storm surges and extreme summer load make electrical maintenance critical — click a month</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 32 }}>
          {MONTHS.map((m, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              background: selected === i ? '#F5E642′ : '#1E293B',
              color: selected === i ? '#0A1628′ : '#94A3B8',
              border: 'none', borderRadius: 8, padding: '10px 4px',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s'
            }}>{m.short}</button>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 32, border: '1px solid #334155′ }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>📅 {month.name} Tasks</h2>
            <span style={{
              background: URGENCY_COLOR[month.urgency] + '22',
              color: URGENCY_COLOR[month.urgency],
              border: `1px solid ${URGENCY_COLOR[month.urgency]}`,
              borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700
            }}>{month.urgency} PRIORITY</span>
          </div>

          <div style={{ background: '#0F172A', borderRadius: 10, padding: '14px 18px', marginBottom: 20, borderLeft: '3px solid #F5E642′ }}>
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>⚡ <strong style={{ color: '#F5E642′ }}>DFW Season Context:</strong> {month.context}</p>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {month.tasks.map((task, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < month.tasks.length - 1 ? '1px solid #0F172A' : 'none' }}>
                <span style={{ color: '#F5E642', fontSize: 16, marginTop: 1 }}>✓</span>
                <span style={{ color: '#E2E8F0', fontSize: 15 }}>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748B', fontSize: 13 }}>
          ⚡ Electrical concerns? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk connects you with licensed DFW electricians.</span>
        </div>
      </div>
    </div>
  );
}

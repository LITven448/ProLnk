import { useState } from 'react';

const MONTHS = [
  { name: 'January', short: 'Jan', tasks: ['Schedule heating system inspection', 'Replace air filters (1″ monthly, 4″ every 3 months)', 'Test thermostat accuracy', 'Check blower motor and belts', 'Clear vents of furniture/blockages'], urgency: 'HIGH', context: 'DFW January lows avg 35°F — heating failures are costly emergencies.' },
  { name: 'February', short: 'Feb', tasks: ['Check heat pump defrost cycle', 'Inspect refrigerant lines for ice', 'Test carbon monoxide detectors near unit', 'Lubricate motor bearings if accessible'], urgency: 'MEDIUM', context: 'Freeze events possible. Ensure system handles rapid temp swings.' },
  { name: 'March', short: 'Mar', tasks: ['Schedule spring tune-up (book early — fills fast)', 'Inspect outdoor unit for winter debris', 'Test cooling mode before summer', 'Check electrical connections'], urgency: 'HIGH', context: 'DFW spring tune-up season — HVAC pros book out 4-6 weeks by April.' },
  { name: 'April', short: 'Apr', tasks: ['Complete spring tune-up', 'Clean evaporator and condenser coils', 'Check refrigerant levels', 'Test all cooling zones', 'Inspect ductwork for leaks'], urgency: 'HIGH', context: 'Last chance before summer heat. 90°F days start in May.' },
  { name: 'May', short: 'May', tasks: ['Replace air filter', 'Pour bleach in condensate drain pan', 'Check drain line for clogs (critical in DFW humidity)', 'Set thermostat to cooling schedule', 'Inspect insulation on refrigerant lines'], urgency: 'HIGH', context: 'DFW humidity spikes — clogged drains cause water damage fast.' },
  { name: 'June', short: 'Jun', tasks: ['Replace filter (monthly during summer)', 'Check condensate drain bi-weekly', 'Trim vegetation 2ft from outdoor unit', 'Monitor energy bills for efficiency drops'], urgency: 'HIGH', context: 'Peak cooling season begins. Avg highs 95°F+. System runs 12-16 hrs/day.' },
  { name: 'July', short: 'Jul', tasks: ['Replace filter', 'Check drain line', 'Verify thermostat settings', 'Listen for unusual sounds — refrigerant issues peak in heat'], urgency: 'HIGH', context: 'Hottest month in DFW. Average high 96°F. Systems under maximum stress.' },
  { name: 'August', short: 'Aug', tasks: ['Replace filter', 'Check drain line', 'Test system at peak — run diagnostics if efficiency drops', 'Schedule fall tune-up now before backlog'], urgency: 'HIGH', context: 'Second hottest month. Book fall tune-up now to avoid October wait times.' },
  { name: 'September', short: 'Sep', tasks: ['Replace filter', 'Last condensate drain check', 'Prepare for shoulder season — test heat mode', 'Clean outdoor unit after summer'], urgency: 'MEDIUM', context: 'Temps begin dropping. Transition from cooling to heating prep.' },
  { name: 'October', short: 'Oct', tasks: ['Complete fall tune-up', 'Inspect heat exchanger for cracks', 'Test ignitor and burners', 'Check flue pipe for blockages', 'Replace filter'], urgency: 'HIGH', context: 'First cold fronts arrive. DFW temp swings 40°F+ in a single week.' },
  { name: 'November', short: 'Nov', tasks: ['Test heating to full capacity', 'Verify thermostat switches to heat mode', 'Check for gas leaks near furnace', 'Seal duct leaks before winter'], urgency: 'HIGH', context: 'Heating season begins. DFW lows can hit freezing with little warning.' },
  { name: 'December', short: 'Dec', tasks: ['Replace filter', 'Prepare freeze protocol — know how to shut off system', 'Keep backup space heater if system is aging', 'Schedule Jan inspection proactively'], urgency: 'MEDIUM', context: 'Holiday freeze events possible. 2021 Uri showed how unprepared DFW can be.' },
];

const URGENCY_COLOR = { HIGH: '#F5E642', MEDIUM: '#60A5FA', LOW: '#34D399′ };

export default function DFWHVACSeasonalCalendar2026() {
  const [selected, setSelected] = useState(0);
  const month = MONTHS[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Seasonal Calendar 2026</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Click a month to see what your HVAC system needs right now</p>
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
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>🌤️ <strong style={{ color: '#F5E642′ }}>DFW Context:</strong> {month.context}</p>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {month.tasks.map((task, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < month.tasks.length - 1 ? '1px solid #1E293B' : 'none' }}>
                <span style={{ color: '#F5E642', fontSize: 16, marginTop: 1 }}>✓</span>
                <span style={{ color: '#E2E8F0', fontSize: 15 }}>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748B', fontSize: 13 }}>
          🔧 Need an HVAC pro in DFW? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk matches you in minutes.</span>
        </div>
      </div>
    </div>
  );
}

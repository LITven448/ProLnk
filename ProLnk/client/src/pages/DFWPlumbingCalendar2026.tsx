import { useState } from 'react';

const MONTHS = [
  { name: 'January', short: 'Jan', tasks: ['Flush water heater to remove sediment', 'Descale water heater if on hard water (DFW water hardness: 200-400 ppm)', 'Test pressure relief valve on water heater', 'Inspect water heater anode rod — replace if heavily corroded'], urgency: 'HIGH', context: 'DFW hard water rapidly builds scale in water heaters. Annual descaling extends lifespan 5+ years.' },
  { name: 'February', short: 'Feb', tasks: ['Monitor pipes in exterior walls during cold snaps', 'Know location of main water shutoff (critical for freezes)', 'Insulate any exposed pipes in garage or crawlspace'], urgency: 'MEDIUM', context: 'Freeze events can occur in Feb. DFW pipes in uninsulated walls are vulnerable.' },
  { name: 'March', short: 'Mar', tasks: ['Test all interior shut-off valves (under sinks, toilets, washing machine)', 'Lubricate ball valves that havent been operated in 12+ months', 'Check water pressure (ideal: 45-65 PSI) — high pressure stresses pipes', 'Inspect washing machine hoses for bulging or cracking'], urgency: 'HIGH', context: 'Spring is ideal for valve maintenance before summer demand increases. Stuck valves fail in emergencies.' },
  { name: 'April', short: 'Apr', tasks: ['Check sump pump if applicable', 'Inspect all visible drain lines under sinks for slow drains', 'Test garbage disposal — flush with ice and salt', 'Check toilet flappers — silent leaks waste 200 gal/day'], urgency: 'MEDIUM', context: 'Spring rains increase drainage demand. Ensure all drains are clear before summer.' },
  { name: 'May', short: 'May', tasks: ['Activate irrigation system after winter dormancy', 'Check all irrigation heads for proper coverage', 'Inspect backflow preventer on irrigation system', 'Test hose bibs — replace washers if leaking', 'Check for leaks at all hose connections'], urgency: 'HIGH', context: 'DFW irrigation season starts. Backflow preventers are required by code and protect drinking water.' },
  { name: 'June', short: 'Jun', tasks: ['Monitor water bill for unexpected increases (leak indicator)', 'Check water softener salt level if applicable', 'Inspect supply lines under sinks and toilets'], urgency: 'MEDIUM', context: 'Summer usage peaks. High bills often signal silent leaks or irrigation inefficiency.' },
  { name: 'July', short: 'Jul', tasks: ['Check water heater temperature setting (120°F recommended)', 'Test all bathroom faucets for consistent pressure', 'Listen for running water sounds when all fixtures are off (slab leak indicator)'], urgency: 'MEDIUM', context: 'Summer heat increases demand. Slab leaks from thermal expansion are more common in July.' },
  { name: 'August', short: 'Aug', tasks: ['Check outdoor spigots and hose connections for wear', 'Inspect water heater for corrosion signs at fittings', 'Test water quality — DFW municipal water TDS often rises in summer'], urgency: 'LOW', context: 'Late summer. Focus on outdoor fixtures that have been under heavy use all season.' },
  { name: 'September', short: 'Sep', tasks: ['Adjust irrigation schedule for cooler temps', 'Check toilet tanks for internal leaks (dye test)', 'Inspect washing machine water supply hoses before heavy fall laundry season'], urgency: 'MEDIUM', context: 'Transitioning out of peak summer. Reduce irrigation and inspect fixtures for summer wear.' },
  { name: 'October', short: 'Oct', tasks: ['Schedule water heater inspection before winter demand', 'Check expansion tank on water heater if applicable', 'Inspect sewer cleanout access — locate before ground freezes'], urgency: 'MEDIUM', context: 'Pre-winter plumbing prep. Water heater failure in winter is an emergency in DFW.' },
  { name: 'November', short: 'Nov', tasks: ['Disconnect and drain all garden hoses', 'Shut off and drain irrigation system', 'Insulate hose bibs and outdoor pipes', 'Know your freeze protocol — main shutoff + drain low points'], urgency: 'HIGH', context: 'Winterization is critical after 2021 Uri. DFW freeze events happen with little warning.' },
  { name: 'December', short: 'Dec', tasks: ['Prepare freeze kit: pipe insulation foam, heat tape, shut-off wrench', 'Know forecast and pre-drip faucets if below 20°F expected', 'Have plumber contact ready for freeze emergencies', 'Check water heater pilot light remains lit in cold'], urgency: 'HIGH', context: 'DFW freeze readiness. 2021 showed how unprepared the region was. Be proactive.' },
];

const URGENCY_COLOR = { HIGH: '#F5E642', MEDIUM: '#60A5FA', LOW: '#34D399' };

export default function DFWPlumbingCalendar2026() {
  const [selected, setSelected] = useState(0);
  const month = MONTHS[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Plumbing Seasonal Calendar 2026</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>DFW hard water and freeze risk make plumbing maintenance non-optional — click a month</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 32 }}>
          {MONTHS.map((m, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              background: selected === i ? '#F5E642' : '#1E293B',
              color: selected === i ? '#0A1628' : '#94A3B8',
              border: 'none', borderRadius: 8, padding: '10px 4px',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s'
            }}>{m.short}</button>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 32, border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>📅 {month.name} Tasks</h2>
            <span style={{
              background: URGENCY_COLOR[month.urgency] + '22',
              color: URGENCY_COLOR[month.urgency],
              border: `1px solid ${URGENCY_COLOR[month.urgency]}`,
              borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700
            }}>{month.urgency} PRIORITY</span>
          </div>

          <div style={{ background: '#0F172A', borderRadius: 10, padding: '14px 18px', marginBottom: 20, borderLeft: '3px solid #F5E642' }}>
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>💧 <strong style={{ color: '#F5E642' }}>DFW Context:</strong> {month.context}</p>
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
          🔧 Plumbing issue? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk matches you with licensed DFW plumbers — fast.</span>
        </div>
      </div>
    </div>
  );
}

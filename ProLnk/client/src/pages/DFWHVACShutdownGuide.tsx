import { useState } from 'react';

type SystemType = 'central-ac' | 'heat-pump' | 'dual-fuel';
type Timing = 'early-fall' | 'mid-fall' | 'winter';

const systemInfo = {
  'central-ac': { label: '❄️ Central AC (Gas Heat)', desc: 'Separate AC condenser + gas furnace. Most common in DFW.' },
  'heat-pump': { label: '🔄 Heat Pump', desc: 'Single outdoor unit handles both heating and cooling. Never cover outdoor unit.' },
  'dual-fuel': { label: '⚡ Dual Fuel (Heat Pump + Gas Backup)', desc: 'Heat pump with gas backup for extreme DFW cold snaps.' },
};

const timingInfo = {
  'early-fall': { label: '🍂 Early Fall (Oct–Nov)', desc: 'Nights cooling, days still warm' },
  'mid-fall': { label: '🌬️ Mid Fall (Nov–Dec)', desc: 'Consistent heating weather arriving' },
  'winter': { label: '❄️ Winter (Dec–Feb)', desc: 'Cold snaps, freeze risk in DFW' },
};

const checklists: Record<SystemType, Record<Timing, { task: string; why: string; priority: 'critical' | 'important' | 'optional' }[]>> = {
  'central-ac': {
    'early-fall': [
      { task: 'Replace air filter', why: 'Fresh filter before heating season prevents restricted airflow on cold nights.', priority: 'critical' },
      { task: 'Test heat mode — set thermostat to HEAT, 75°F', why: 'Verify furnace fires before first cold snap. DFW cold snaps arrive suddenly.', priority: 'critical' },
      { task: 'Check smoke + CO detectors', why: 'Combustion heating season begins — CO detector is life safety.', priority: 'critical' },
      { task: 'Clear debris from condenser unit', why: 'Fall leaves clog condenser fins — clean before winter even if not using it.', priority: 'important' },
      { task: 'Turn off and drain exterior hose bibs', why: 'DFW freeze events (2021, 2023) damaged millions of pipes.', priority: 'important' },
      { task: 'Optional: cover condenser top only', why: 'AC-only condensers can have top covered to keep debris out — never wrap sides.', priority: 'optional' },
    ],
    'mid-fall': [
      { task: 'Schedule professional tune-up', why: 'Technicians less booked in fall than spring. Heat exchanger inspection is critical.', priority: 'critical' },
      { task: 'Inspect visible ductwork in attic or crawl space', why: 'DFW summer heat degrades duct seals — check before heating stresses system.', priority: 'important' },
      { task: 'Program thermostat for heating schedule', why: 'DFW heating season is short — program setbacks to 65°F overnight.', priority: 'important' },
    ],
    'winter': [
      { task: 'Know your emergency shutoff locations', why: 'If a pipe bursts, you need to shut off water and HVAC fast.', priority: 'critical' },
      { task: 'Keep thermostat at 68°F+ during freeze events', why: 'DFW homes are not insulated for sustained sub-freezing — don\’t let it drop.', priority: 'critical' },
      { task: 'Open cabinet doors under sinks during freeze', why: 'Interior plumbing in DFW homes runs near exterior walls.', priority: 'important' },
    ],
  },
  'heat-pump': {
    'early-fall': [
      { task: 'Replace air filter', why: 'Heat pump uses same air handler year-round — filter change is mandatory.', priority: 'critical' },
      { task: 'Test heat mode — verify outdoor unit runs in heat', why: 'Heat pump runs outdoor unit even in heating mode. Verify both indoor and outdoor unit operate.', priority: 'critical' },
      { task: 'NEVER cover outdoor heat pump unit — ever', why: 'Heat pump operates year-round. Covering it causes refrigerant and motor damage.', priority: 'critical' },
      { task: 'Check defrost mode works (set to 30°F on thermostat)', why: 'Heat pumps defrost outdoor coil — verify board initiates defrost cycle.', priority: 'important' },
    ],
    'mid-fall': [
      { task: 'Know your aux/emergency heat setting', why: 'DFW cold snaps below 35°F may require aux heat strips. Know how to activate.', priority: 'critical' },
      { task: 'Schedule tune-up — refrigerant check included', why: 'Heat pump efficiency drops sharply with low refrigerant in cold weather.', priority: 'important' },
    ],
    'winter': [
      { task: 'Ice on outdoor unit is normal — heavy ice is not', why: 'Light frost normal, heavy ice block means defrost failure. Call tech.', priority: 'critical' },
      { task: 'Keep outdoor unit clear of snow/ice accumulation', why: 'DFW rare ice storms can accumulate on coil — gently pour warm (not hot) water.', priority: 'important' },
    ],
  },
  'dual-fuel': {
    'early-fall': [
      { task: 'Replace air filter', why: 'Shared air handler serves both heat pump and furnace modes.', priority: 'critical' },
      { task: 'Test both heat pump AND furnace modes', why: 'Set to 72°F heat pump mode, then test gas furnace by setting balance point manually.', priority: 'critical' },
      { task: 'Verify balance point setting (typically 35–40°F for DFW)', why: 'Below balance point, system should switch from heat pump to gas. Verify with your tech.', priority: 'important' },
    ],
    'mid-fall': [
      { task: 'Schedule dual-fuel tune-up — specify dual fuel to tech', why: 'Both refrigerant charge and gas pressure must be checked.', priority: 'critical' },
      { task: 'Stock extra filters', why: 'Dual-fuel systems cycle between modes frequently — filter changes every 30 days in heavy use.', priority: 'important' },
    ],
    'winter': [
      { task: 'Monitor which mode is active during cold snaps', why: 'Gas backup should engage automatically below balance point. Verify during first hard freeze.', priority: 'important' },
      { task: 'Keep gas supply valve open to furnace', why: 'Some homeowners close gas seasonally — verify it\’s open before cold weather.', priority: 'critical' },
    ],
  },
};

export default function DFWHVACShutdownGuide() {
  const [systemType, setSystemType] = useState<SystemType | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const checklist = systemType && timing ? checklists[systemType][timing] : null;

  const priorityStyle = (p: string) => ({
    critical: { dot: '🔴', color: '#FCA5A5' },
    important: { dot: '🟡', color: '#FDE68A' },
    optional: { dot: '🔵', color: '#93C5FD' },
  }[p] || { dot: '⚪', color: '#CBD5E1' });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🍂</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Seasonal Shutdown Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Switching from AC to heat in DFW fall — the right steps for your system</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>YOUR SYSTEM TYPE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(Object.entries(systemInfo) as [SystemType, typeof systemInfo[SystemType]][]).map(([id, info]) => (
                <button key={id} onClick={() => setSystemType(systemType === id ? null : id)}
                  style={{ background: systemType === id ? '#1E3A5F' : '#0F2237', border: `2px solid ${systemType === id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ color: systemType === id ? '#F5E642' : '#CBD5E1', fontSize: 13, fontWeight: 700 }}>{info.label}</div>
                  <div style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>{info.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>WHEN ARE YOU DOING THIS?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(Object.entries(timingInfo) as [Timing, typeof timingInfo[Timing]][]).map(([id, info]) => (
                <button key={id} onClick={() => setTiming(timing === id ? null : id)}
                  style={{ background: timing === id ? '#1E3A5F' : '#0F2237', border: `2px solid ${timing === id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ color: timing === id ? '#F5E642' : '#CBD5E1', fontSize: 13, fontWeight: 700 }}>{info.label}</div>
                  <div style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>{info.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {checklist ? (
          <div style={{ background: '#0F2237', border: '2px solid #1E3A5F', borderRadius: 14, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 16px' }}>Your Seasonal Transition Checklist</h2>
            {checklist.map((item, i) => {
              const ps = priorityStyle(item.priority);
              return (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: i < checklist.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
                  <span style={{ fontSize: 16, minWidth: 20 }}>{ps.dot}</span>
                  <div>
                    <div style={{ color: ps.color, fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{item.task}</div>
                    <div style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6 }}>{item.why}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
              <span style={{ color: '#94A3B8', fontSize: 11 }}>🔴 Critical &nbsp; 🟡 Important &nbsp; 🔵 Optional</span>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
            <p style={{ color: '#64748B', margin: 0 }}>Select your system type and timing to get your DFW seasonal transition checklist</p>
          </div>
        )}
      </div>
    </div>
  );
}

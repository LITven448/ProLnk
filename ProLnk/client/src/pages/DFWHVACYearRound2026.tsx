import { useState } from 'react';

const monthData: Record<string, { temp: string; action: string; watch: string; avoid: string }> = {
  jan: { temp: 'Avg high 55F, lows 34F', action: 'Keep heat at 68F day / 60F overnight. Verify heat pump is not stuck in emergency heat mode. Check carbon monoxide detectors.', watch: 'Polar vortex events — DFW can drop to 15F. Have emergency heat confirmed working.', avoid: 'Blocking vents to "save" on heating — causes uneven temps and longer runtimes.' },
  feb: { temp: 'Avg high 59F, lows 37F', action: 'Schedule spring AC tune-up now (2-3 month wait by April). Inspect outdoor unit for ice from January freezes. Test AC briefly on a warm day.', watch: 'Lingering cold snaps. February 2021 showed DFW vulnerability — confirm your system handles 20F.', avoid: 'Ignoring refrigerant levels — low refrigerant means AC won\’t cool when summer hits.' },
  mar: { temp: 'Avg high 67F, lows 45F', action: 'Replace HVAC filter. Open windows mornings (55-65F window). AC tune-up appointment month. Program thermostat for spring schedule.', watch: 'Humidity starts climbing in late March — watch indoor RH. Above 55%: run AC briefly to dehumidify.', avoid: 'Running AC and heat on same day without checking setpoints — wastes energy and confuses equipment.' },
  apr: { temp: 'Avg high 75F, lows 53F', action: 'Enjoy lowest energy bills of the year. Windows open most days. AC only needed above 80F indoors. Whole-house fan ideal this month.', watch: 'Storm season begins — protect outdoor unit from hail. Cover with hail guard or move patio furniture away.', avoid: 'Ignoring the annual AC check — pros have availability now; by May, 3-week waits are normal.' },
  may: { temp: 'Avg high 83F, lows 62F', action: 'Close windows by May 15 — humidity and heat make AC more efficient than ventilation. Set to 76F cooling. Check drain line for algae.', watch: 'First 90F+ days arrive. Confirm system can hold setpoint on a 95F test day.', avoid: 'Delaying filter change — DFW spring allergens and dust clog filters fast.' },
  jun: { temp: 'Avg high 91F, lows 70F', action: 'Pre-cool to 72F by 2 PM, raise to 78F 3-7 PM if on TOU plan. Monthly filter change required. Check condensate drain pan weekly.', watch: 'Heat index days above 100F. If AC struggles to maintain setpoint, call for service immediately.', avoid: 'Closing vents in unused rooms — unbalances system pressure, stresses blower motor.' },
  jul: { temp: 'Avg high 96F, lows 75F', action: 'Monthly filter change. Keep setpoint at 76-78F. Run ceiling fans to feel 4F cooler at same setpoint. Shade west windows 2-6 PM.', watch: 'Peak ERCOT grid stress — expect demand response events. Pre-cool before 3 PM.', avoid: 'Setting thermostat to 68F when coming home hot — system runs 100% and still takes 45 min to cool.' },
  aug: { temp: 'Avg high 96F, lows 75F', action: 'Identical strategy to July. Check refrigerant signs: ice on lines = low refrigerant or airflow issue. Schedule early — August backlogs are severe.', watch: 'Hottest month in DFW. System running 16+ hrs/day is normal — efficiency matters most now.', avoid: 'Ignoring condensate backup — clogged drains cause water damage and trigger high-limit shutoff.' },
  sep: { temp: 'Avg high 89F, lows 67F', action: 'Still summer mode until Sept 20 typically. Last two weeks: start transitioning. Schedule fall furnace tune-up for October.', watch: 'First cold fronts arrive late September. Test heat mode briefly when first cold front drops temps to 55F.', avoid: 'Thinking summer is over Sept 1 — DFW routinely hits 95F through mid-September.' },
  oct: { temp: 'Avg high 77F, lows 54F', action: 'Shoulder season returns. Windows open again. Furnace tune-up this month. Change filter and check heat exchanger for cracks.', watch: 'Mold risk in homes that stayed closed all summer — dehumidify and ventilate in October.', avoid: 'Skipping fall furnace tune-up — cracked heat exchangers are a CO risk that a tech would catch.' },
  nov: { temp: 'Avg high 65F, lows 42F', action: 'Heating season begins. Set 68F day / 60F night. Weatherstrip doors. Add attic pull-down insulation cover if not done.', watch: 'First hard freezes arrive. Protect outdoor heat pump unit from ice accumulation — defrost cycle is normal; full ice coating is not.', avoid: 'Using space heaters as primary heat — DFW homes have large square footage; space heaters waste electricity.' },
  dec: { temp: 'Avg high 56F, lows 36F', action: 'Full winter mode. Keep at 68F. Check for drafts around outlets on exterior walls (install foam gaskets — $8 fix). Reverse ceiling fans to clockwise.', watch: 'Holiday cooking raises humidity — run exhaust fans and crack a window to prevent condensation on windows.', avoid: 'Setting heat to 75F+ — every degree above 68F adds 3% to heating bill in DFW mild winters.' },
};

const monthList = [
  { id: 'jan', label: 'Jan' }, { id: 'feb', label: 'Feb' }, { id: 'mar', label: 'Mar' },
  { id: 'apr', label: 'Apr' }, { id: 'may', label: 'May' }, { id: 'jun', label: 'Jun' },
  { id: 'jul', label: 'Jul' }, { id: 'aug', label: 'Aug' }, { id: 'sep', label: 'Sep' },
  { id: 'oct', label: 'Oct' }, { id: 'nov', label: 'Nov' }, { id: 'dec', label: 'Dec' },
];

export default function DFWHVACYearRound2026() {
  const [selected, setSelected] = useState('');
  const data = monthData[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          📅 Year-Round HVAC Guide for DFW 2026
        </h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
          Complete month-by-month HVAC guidance for North Texas homeowners. Select any month to see exactly what to do, what to watch for, and what to avoid with your heating and cooling system in 2026.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 28 }}>
          {monthList.map(m => (
            <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? '#F5E642′ : '#0F2140', color: selected === m.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '12px 4px', cursor: ’pointer', fontWeight: selected === m.id ? 800 : 400, fontSize: 14, textAlign: 'center' }}>
              {m.label}
            </button>
          ))}
        </div>

        {data ? (
          <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #8FA3BF' }}>
              <div style={{ color: '#8FA3BF', fontSize: 13, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>DFW Temperature</div>
              <div style={{ color: '#E8EDF5', fontSize: 16 }}>{data.temp}</div>
            </div>
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>✅ What To Do</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7 }}>{data.action}</div>
            </div>
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F0A500′ }}>
              <div style={{ color: '#F0A500', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>👀 What To Watch</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7 }}>{data.watch}</div>
            </div>
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #E05555′ }}>
              <div style={{ color: '#E05555', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>🚫 What To Avoid</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7 }}>{data.avoid}</div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: 40, textAlign: 'center', marginBottom: 32, color: '#8FA3BF' }}>
            Select a month above to see your complete DFW HVAC guidance for 2026
          </div>
        )}

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 ProLnk: Year-Round DFW HVAC Support</div>
          <div style={{ color: '#8FA3BF', fontSize: 14 }}>Connect with vetted North Texas HVAC pros for any month's maintenance needs — tune-ups, repairs, and system upgrades from background-checked contractors.</div>
        </div>
      </div>
    </div>
  );
}

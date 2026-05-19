import { useState } from 'react';

type HomeType = 'new-construction' | 'resale-recent' | 'resale-older' | 'rental';

const homeTypes = [
  { id: 'new-construction' as HomeType, label: '🏗️ New Construction', desc: 'Builder-installed system, warranty period' },
  { id: 'resale-recent' as HomeType, label: '🏠 Resale — Recent Build (2010+)', desc: 'Previous owner, modern equipment' },
  { id: 'resale-older' as HomeType, label: '🏚️ Resale — Older Home (Pre-2010)', desc: 'Unknown history, older equipment possible' },
  { id: 'rental' as HomeType, label: '🔑 Rental / Lease', desc: 'Tenant responsibilities in DFW rental' },
];

type TaskPriority = 'day1' | 'week1' | 'month1' | 'ongoing';

const tasks: Record<HomeType, { task: string; why: string; how: string; priority: TaskPriority }[]> = {
  'new-construction': [
    { task: 'Locate the air filter and replace it', why: 'Builder-installed filters are often cheap 1" fiberglass — upgrade to MERV 8.', how: 'Find return air grille (large vent, usually in hallway ceiling or wall). The filter slot is just behind it.', priority: 'day1' },
    { task: 'Find and label the thermostat', why: 'New construction often uses a builder-grade programmable thermostat — learn its programming.', how: 'Check hallway, living room, or landing. Take a photo of the model number for the manual.', priority: 'day1' },
    { task: 'Locate the indoor air handler', why: 'Know where it is so you can check it, access the filter, and shut it down in emergency.', how: 'Typically in closet, attic, or utility room. Builder should have shown you during walkthrough.', priority: 'day1' },
    { task: 'Find the condensate drain and test it', why: 'DFW humidity causes condensate drain blockages — most common source of water damage in new DFW homes.', how: 'Look for white PVC pipe near the air handler. Confirm it exits the house (typically through exterior wall or into floor drain).', priority: 'week1' },
    { task: 'Register your equipment warranty', why: 'Builder warranty vs. manufacturer warranty — both apply. Register within 30 days to avoid losing extended coverage.', how: 'Find brand label on air handler and condenser. Go to manufacturer website to register serial number.', priority: 'week1' },
    { task: 'Document system specs', why: 'Know your system age, size, and SEER rating before you need a repair.', how: 'Photo both unit nameplates. Note: tonnage (e.g. "3 TON"), SEER rating, model and serial numbers.', priority: 'week1' },
    { task: 'Schedule first tune-up at year 1', why: 'Builder systems often have minor issues — contractor-grade installation vs. premium. Year 1 tune-up catches them.', how: 'Schedule with a NATE-certified DFW technician. Tell them it\’s a new construction first-year check.', priority: 'month1' },
    { task: 'Change filter monthly in DFW summer', why: 'DFW dust, pollen, and construction debris clog filters fast in new neighborhoods.', how: 'Set a phone reminder for the 1st of each month April through September.', priority: 'ongoing' },
  ],
  'resale-recent': [
    { task: 'Change the air filter immediately', why: 'Previous owner\’s filter maintenance is unknown. Start fresh day one.', how: 'Locate return air grille, note current filter size (printed on frame), replace with MERV 8-11.', priority: 'day1' },
    { task: 'Test heating and cooling modes', why: 'Verify both work before a DFW weather emergency reveals a problem.', how: 'Set to COOL 3° below room temp, run 15 min. Set to HEAT 3° above room temp, run 15 min.', priority: 'day1' },
    { task: 'Locate and flush the condensate drain', why: 'Unknown maintenance history — drain line may be partially blocked.', how: 'Pour 1 cup of diluted bleach into drain line access port (usually PVC tee near air handler). Run AC 30 min, confirm water drains outside.', priority: 'day1' },
    { task: 'Find the emergency shutoff', why: 'If condensate overflows or you smell burning, you need to shut off the air handler fast.', how: 'Look for a switch near the air handler that looks like a light switch. Flip it to test — system should stop.', priority: 'week1' },
    { task: 'Get system age from serial number', why: 'Average DFW HVAC system lasts 12-15 years. Know if replacement is on your horizon.', how: 'Most manufacturers encode the year in positions 3-4 of the serial number. Google "[brand] serial number year decoder".', priority: 'week1' },
    { task: 'Schedule a tune-up + inspection', why: 'Unknown maintenance history. Inspect refrigerant charge, heat exchanger, and electrical.', how: 'Schedule with NATE-certified tech. Request full inspection, not just tune-up — mention it\’s a new purchase.', priority: 'month1' },
    { task: 'Install a condensate overflow shutoff switch', why: 'If not present, add one — costs $50 installed and prevents thousands in water damage.', how: 'Ask tech to install a secondary float switch in condensate pan during tune-up visit.', priority: 'month1' },
  ],
  'resale-older': [
    { task: 'Change the air filter immediately — then check blower', why: 'Old dirty filter may have been restricting airflow for years, stressing the blower motor.', how: 'Replace filter, run system, listen for any strained motor sounds or reduced airflow.', priority: 'day1' },
    { task: 'Note the system brand, age, and size', why: 'Pre-2010 systems are 15+ years old. Know the age before any repair decision.', how: 'Photograph both unit nameplates. Older systems use R-22 refrigerant (phased out) — critical to know.', priority: 'day1' },
    { task: 'Check if system uses R-22 refrigerant', why: 'R-22 is discontinued. Recharge costs $150+/lb and parts are scarce. Leak = consider replacement.', how: 'Check equipment nameplate for "R-22" or "Refrigerant: HCFC-22". If found, plan for replacement.', priority: 'day1' },
    { task: 'Flush condensate drain aggressively', why: 'Older systems have years of algae buildup. Drain line blockage is near-certain.', how: 'Pour bleach solution, then wet-vac the drain line outlet to clear. Repeat.', priority: 'day1' },
    { task: 'Schedule full system inspection — not just tune-up', why: 'Heat exchanger cracks in older furnaces are a safety hazard — CO risk.', how: 'Request combustion analysis and heat exchanger inspection specifically. This is non-negotiable on a 15+ year system.', priority: 'week1' },
    { task: 'Get a replacement cost estimate', why: 'Older DFW systems fail most often in peak summer heat. Know your options before you\’re in a 95°F emergency.', how: 'Ask tech for honest system assessment. Get a quote for full replacement so you\’re informed.', priority: 'month1' },
    { task: 'Inspect attic ductwork for duct tape failure', why: 'Original duct tape (not mastic) fails in DFW attic heat. Disconnected ducts = 30% efficiency loss.', how: 'With a flashlight, inspect accessible attic duct connections. Any with fallen or curling tape should be sealed with mastic.', priority: 'month1' },
  ],
  'rental': [
    { task: 'Photograph current filter and condition on move-in', why: 'Protect your security deposit — document the filter\’s state before you\’re responsible for it.', how: 'Take dated photos of filter, air handler, and thermostat on move-in day.', priority: 'day1' },
    { task: 'Know your filter change responsibility', why: 'DFW leases typically require tenants to change filters monthly — check your lease.', how: 'Read your lease\’s maintenance section. If unclear, ask in writing so you have documentation.', priority: 'day1' },
    { task: 'Locate the condensate drain and check for a drip pan sensor', why: 'If drain blocks and overflows, landlord will try to charge you. Know the system\’s safeguards.', how: 'Look under the air handler for a secondary drain pan. Check if a float switch is installed.', priority: 'week1' },
    { task: 'Report any issues to landlord IN WRITING immediately', why: 'Tenant liability in Texas requires prompt written reporting of maintenance issues.', how: 'Email or text landlord any HVAC issues within 24 hours. Keep copies.', priority: 'ongoing' },
    { task: 'Know the landlord\’s emergency HVAC contact', why: 'DFW summer HVAC failures are common. Know who to call at 9pm when it\’s 90° inside.', how: 'Ask for 24/7 emergency contact before you need it. Get it in writing.', priority: 'week1' },
    { task: 'Change filter monthly — keep receipts', why: 'Filter receipts prove you fulfilled your maintenance obligation if landlord disputes deposit.', how: 'Buy filters in bulk from hardware store. Keep receipt photos in your rental folder.', priority: 'ongoing' },
  ],
};

const priorityColors = { day1: '#F5E642', week1: '#86EFAC', month1: '#93C5FD', ongoing: '#C4B5FD' };
const priorityLabels = { day1: '🔑 Day 1', week1: '📅 Week 1', month1: '📆 Month 1', ongoing: '🔄 Ongoing' };

export default function DFWHVACNewHomeGuide() {
  const [homeType, setHomeType] = useState<HomeType | null>(null);
  const [filter, setFilter] = useState<TaskPriority | 'all'>('all');
  const activeTasks = homeType ? (filter === 'all' ? tasks[homeType] : tasks[homeType].filter(t => t.priority === filter)) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🔑</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>New DFW Home HVAC Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>What to do with your HVAC when moving into a new DFW home — prioritized by timing</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
          {homeTypes.map(h => (
            <button key={h.id} onClick={() => { setHomeType(homeType === h.id ? null : h.id); setFilter('all'); }}
              style={{ background: homeType === h.id ? '#1E3A5F' : '#0F2237', border: `2px solid ${homeType === h.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ color: homeType === h.id ? '#F5E642' : '#CBD5E1', fontSize: 14, fontWeight: 700 }}>{h.label}</div>
              <div style={{ color: '#64748B', fontSize: 11, marginTop: 3 }}>{h.desc}</div>
            </button>
          ))}
        </div>

        {homeType && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {(['all', 'day1', 'week1', 'month1', 'ongoing'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ background: filter === f ? '#1E3A5F' : '#0F2237', border: `2px solid ${filter === f ? '#F5E642' : '#1E3A5F'}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', color: filter === f ? '#F5E642' : '#94A3B8', fontSize: 12, fontWeight: 700 }}>
                  {f === 'all' ? '📋 All Tasks' : priorityLabels[f]}
                </button>
              ))}
            </div>

            <div>
              {activeTasks.map((t, i) => (
                <div key={i} style={{ background: '#0F2237', border: '1px solid #1E3A5F', borderRadius: 12, padding: 18, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ color: '#E8EDF5', fontSize: 14, fontWeight: 700, flex: 1 }}>{t.task}</div>
                    <span style={{ background: '#0A1628', color: priorityColors[t.priority], fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, marginLeft: 10, whiteSpace: 'nowrap' }}>{priorityLabels[t.priority]}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <div style={{ color: '#64748B', fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>WHY</div>
                      <p style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{t.why}</p>
                    </div>
                    <div>
                      <div style={{ color: '#64748B', fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>HOW</div>
                      <p style={{ color: '#CBD5E1', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{t.how}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!homeType && (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
            <p style={{ color: '#64748B', margin: 0 }}>Select your home type above to get your DFW HVAC orientation checklist</p>
          </div>
        )}
      </div>
    </div>
  );
}

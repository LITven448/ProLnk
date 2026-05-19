import { useState } from 'react';

const steps = [
  {
    id: 'load-calc',
    label: 'Load Calculation',
    icon: '📐',
    what: 'A Manual J load calculation determines the exact BTU capacity your DFW home needs. Contractors measure square footage, ceiling height, insulation R-values, window area/orientation, duct leakage, and local design temperatures (DFW: 100F summer, 22F winter).',
    verify: 'Ask to see the Manual J report. If the contractor skips this and just matches old equipment size, walk away — oversizing is the #1 HVAC mistake in DFW.',
  },
  {
    id: 'equipment',
    label: 'Equipment Selection',
    icon: '🏭',
    what: 'Based on load calc results, the contractor selects an outdoor condenser, indoor air handler or furnace, and coil. In DFW, minimum SEER2 14.3 is required. Most pros recommend 16-18 SEER2 given our 3,000+ cooling hours per year.',
    verify: 'Confirm the AHRI-certified matched system. Mixing brands on coil and condenser can void efficiency ratings and warranties.',
  },
  {
    id: 'removal',
    label: 'Old System Removal',
    icon: '🔧',
    what: 'EPA 608-certified technicians must recover refrigerant before disconnecting the old system. R-22 systems require certified recovery — illegal to vent. Old equipment is removed and properly disposed of or recycled.',
    verify: 'Ask if the tech is EPA 608 certified. Verify refrigerant recovery equipment is on site before they disconnect anything.',
  },
  {
    id: 'lineset',
    label: 'Lineset Decision',
    icon: '🔩',
    what: 'Copper refrigerant lines (lineset) may be reused or replaced. In DFW, linesets in attics that are 10+ years old are often brittle or contaminated with old oil. R-410A and R-32 systems require clean, properly sized linesets.',
    verify: 'Request a nitrogen pressure test and flush of existing lineset. If contaminated, new lineset is worth the cost.',
  },
  {
    id: 'air-handler',
    label: 'Air Handler Placement',
    icon: '🌀',
    what: 'DFW homes typically have attic air handlers. Proper clearance, condensate drainage slope, and secondary drain pan are critical. Poorly sloped condensate lines cause water damage — a major DFW insurance claim source.',
    verify: 'Confirm secondary drain pan is installed and both primary and secondary drain lines are clear and properly sloped.',
  },
  {
    id: 'thermostat',
    label: 'Thermostat Wiring',
    icon: '🌡️',
    what: 'New systems often require a C-wire (common wire) for smart thermostats. Technician runs new thermostat wire if needed and programs the system. Two-stage and variable-speed systems need compatible communicating thermostats.',
    verify: 'Confirm thermostat is compatible with your new system tier. Mismatched thermostats prevent variable-speed operation.',
  },
  {
    id: 'permit',
    label: 'Permit and Inspection',
    icon: '📋',
    what: 'All HVAC replacements in DFW municipalities require a mechanical permit. City inspector verifies refrigerant handling, electrical disconnect, duct connections, and condensate drainage. Unpermitted work can void homeowner insurance.',
    verify: 'Get the permit number before work begins. Never accept contractors who skip permits to save time — that is liability on you.',
  },
  {
    id: 'startup',
    label: 'Startup and Commissioning',
    icon: '✅',
    what: 'Technician checks refrigerant charge (superheat and subcooling measurements), airflow (ideally 350-400 CFM per ton), static pressure, and temperatures across supply and return. DFW humidity control depends on correct refrigerant charge.',
    verify: 'Request to see superheat/subcooling readings. Proper charge is not guesswork — it requires gauges and math.',
  },
];

export default function DFWHVACInstallationGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = steps.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW HVAC Installation: Step by Step</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          What actually happens during a full HVAC replacement in Dallas-Fort Worth — and what to verify at each stage.
        </p>
        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>Select a stage to see what happens and what to verify:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {steps.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#0f2240', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === s.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '0.9rem 0.75rem', cursor: ’pointer', textAlign: 'left', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: '#F5E642′ }}>{active.icon} {active.label}</h2>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>WHAT HAPPENS</div>
              <p style={{ lineHeight: 1.7, color: '#e2e8f0′ }}>{active.what}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>WHAT TO VERIFY</div>
              <p style={{ lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>{active.verify}</p>
            </div>
          </div>
        )}
        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Get a ProLnk-Vetted HVAC Contractor</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>Every ProLnk HVAC pro in DFW is verified for EPA 608 certification, active TACL license, and permit-pulling history.</p>
        </div>
      </div>
    </div>
  );
}

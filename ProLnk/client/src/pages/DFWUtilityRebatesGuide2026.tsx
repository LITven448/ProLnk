import { useState } from 'react';

const utilities = [
  { id: 'oncor', name: '⚡ Oncor Electric', programs: [
    { name: 'Smart Thermostat Rebate', desc: '$85–$150 instant rebate on qualifying smart thermostats (Nest, Ecobee, Honeywell). Must purchase through Oncor marketplace or submit receipt.', amt: '$85–$150' },
    { name: 'Oncor Demand Response Program', desc: 'Earn bill credits when you allow Oncor to briefly adjust your thermostat during peak demand events (10–15 events/yr, 2–4 hrs each). Average $60–$120/yr savings.', amt: '$60–$120/yr' },
    { name: 'HVAC Tune-Up Rebate', desc: '$50 rebate for qualifying AC tune-up by a certified HVAC technician. Improves efficiency and extends equipment life.', amt: '$50' },
    { name: 'High-Efficiency AC Replacement', desc: 'Up to $300 rebate when replacing central AC unit with a 16+ SEER2 rated system. Pre-approval recommended.', amt: 'Up to $300' },
  ]},
  { id: 'atmos', name: '🔥 Atmos Energy', programs: [
    { name: 'Atmos Weatherization Rebate', desc: 'Rebates for attic insulation (up to $400), air sealing (up to $200), and duct sealing (up to $200) for qualifying homes.', amt: 'Up to $800' },
    { name: 'High-Efficiency Water Heater', desc: 'Up to $200 rebate on ENERGY STAR tankless natural gas water heaters. Must be installed by licensed plumber.', amt: 'Up to $200' },
    { name: 'Smart Thermostat (Gas Systems)', desc: '$50 rebate on qualifying smart thermostats controlling gas heating systems.', amt: '$50' },
  ]},
  { id: 'trinity', name: '💧 Trinity River Authority', programs: [
    { name: 'Water Efficiency Rebate', desc: '$1.50/sq ft rebate for removing turf grass and replacing with native Texas plants or xeriscaping (up to 2,000 sq ft).', amt: 'Up to $3,000' },
    { name: 'Rain Barrel Program', desc: 'Subsidized rain barrels at $35 each (retail $80+). Limit 2 per household. Pick up at local distribution events.', amt: '$45 discount each' },
    { name: 'Irrigation Efficiency Audit', desc: 'Free irrigation system audit + $100 rebate on upgraded smart irrigation controller for Trinity service area customers.', amt: 'Free + $100' },
  ]},
];

export default function DFWUtilityRebatesGuide2026() {
  const [selected, setSelected] = useState('oncor');
  const util = utilities.find(u => u.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>⚡ Utility Rebates · DFW 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Utility Rebate Programs 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Select your utility provider to see available rebate programs for your home.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {utilities.map(u => (
            <button key={u.id} onClick={() => setSelected(u.id)} style={{ padding: '0.5rem 1.1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', backgroundColor: selected === u.id ? '#F5E642' : '#1e3a5f', color: selected === u.id ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{u.name}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {util.programs.map((p, i) => (
            <div key={i} style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1.05rem' }}>{p.name}</div>
                <div style={{ backgroundColor: '#F5E64220', color: '#F5E642', borderRadius: '8px', padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.amt}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Stack Your Savings</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>Utility rebates stack with Federal IRA tax credits and city municipal programs. A heat pump HVAC replacement could qualify for: Oncor $300 + Federal IRA $2,000 + Dallas $100 = $2,400+ in incentives on a $12,000 install. Always confirm program availability before starting work.</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const cities = [
  { id: 'dallas', name: '🏙️ Dallas', programs: [
    { name: 'Dallas Green Building Program', desc: 'Rebates up to $1,500 for ENERGY STAR rated new construction and major renovations. Requires third-party certification.', amt: 'Up to $1,500′ },
    { name: 'Dallas Water Utilities Rebate', desc: '$75–$200 rebate on WaterSense toilets and irrigation controllers.', amt: '$75–$200′ },
  ]},
  { id: 'fortworth', name: '🤠 Fort Worth', programs: [
    { name: 'FW Conservation Rebate Program', desc: 'Rebates on smart irrigation systems, WaterSense fixtures, and rainwater harvesting tanks.', amt: '$50–$500′ },
    { name: 'FW Energy Efficiency Incentive', desc: 'Rebates for insulation upgrades and HVAC replacement through the city building department.', amt: '$100–$400′ },
  ]},
  { id: 'plano', name: '🌿 Plano', programs: [
    { name: 'Plano Water Efficiency Rebate', desc: 'Rain sensor rebate ($25), WaterSense toilet rebate ($75), smart irrigation controller ($100).', amt: '$25–$100′ },
    { name: 'Plano Turf Replacement', desc: '$0.50/sq ft rebate (up to 2,000 sq ft) to replace lawn with native drought-resistant plants.', amt: 'Up to $1,000′ },
  ]},
  { id: 'frisco', name: '☀️ Frisco', programs: [
    { name: 'Frisco Solar Incentive', desc: 'No city permit fee for rooftop solar systems under 10kW. Pairs with federal IRA 30% credit.', amt: 'Permit fee waived' },
    { name: 'Frisco Water Rebate Program', desc: 'Rebates for WaterSense fixtures, smart sprinkler upgrades, and pool covers.', amt: '$25–$150′ },
  ]},
  { id: 'mckinney', name: '🏡 McKinney', programs: [
    { name: 'McKinney Irrigation Rebate', desc: 'Smart controller rebate ($100), rain/freeze sensor ($25), and weather-based irrigation audit credit.', amt: '$25–$100′ },
    { name: 'McKinney Tree Rebate', desc: '$50 rebate per qualifying shade tree planted (up to 4 per household per year).', amt: 'Up to $200′ },
  ]},
];

export default function DFWMunicipalRebatesGuide2026() {
  const [selected, setSelected] = useState('dallas');
  const city = cities.find(c => c.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏛️ City-Level Rebates · DFW 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Municipal Rebate Programs 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Select your city to see available municipal rebate programs for homeowners.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {cities.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{ padding: '0.5rem 1.1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', backgroundColor: selected === c.id ? '#F5E642′ : '#1e3a5f', color: selected === c.id ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{c.name}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {city.programs.map((p, i) => (
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
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>💡 Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>Municipal rebates can be stacked with Federal IRA credits and utility rebates (Oncor, Atmos). Always apply to the city program first — some require pre-approval before the project starts. Contact your city water or building department to confirm current availability.</div>
        </div>
      </div>
    </div>
  );
}

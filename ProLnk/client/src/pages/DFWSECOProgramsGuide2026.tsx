import { useState } from 'react';

const ownerTypes = [
  { id: 'residential', label: '🏠 Homeowner', programs: [
    { name: 'LMI Solar Program (Low-to-Moderate Income)', desc: 'SECO partners with utilities and nonprofits to provide subsidized solar for income-qualifying Texas homeowners. Income limit: 80% of area median income. DFW residents apply through SECO or local community action agency.', amt: 'Income-based subsidy' },
    { name: 'Weatherization Assistance Program (WAP)', desc: 'Federally funded through SECO. Free weatherization services (insulation, air sealing, HVAC tune-up) for income-eligible homeowners. Priority: elderly, families with children, disabled. Apply through local community action agency.', amt: 'Free (income-eligible)' },
    { name: 'SECO Energy Efficiency Resources', desc: 'Free online energy audit tools, contractor finder, and rebate database at seco.cpa.state.tx.us. No income requirement — available to all Texas homeowners.', amt: 'Free tools' },
  ]},
  { id: 'lowincome', label: '💼 Low Income', programs: [
    { name: 'Weatherization Assistance Program (WAP) — Priority', desc: 'Income-qualifying households receive full weatherization at no cost: insulation, air sealing, window repairs, HVAC servicing. DFW applications processed through Community Council of Greater Dallas and Tarrant County Community Development.', amt: 'Free' },
    { name: 'LMI Solar — Community Solar Option', desc: 'If rooftop solar is not feasible, SECO supports community solar subscription programs where LMI households receive bill credits from a shared solar array. Coming to DFW in 2026.', amt: 'Bill credits' },
    { name: 'Home Energy Assistance Program (HEAP)', desc: 'SECO administers HEAP funding to help low-income households with energy bills and emergency HVAC repairs. Apply at your local community action agency or call 2-1-1.', amt: 'Emergency assistance' },
  ]},
  { id: 'nonprofit', label: '🏫 Nonprofit / Public', programs: [
    { name: 'LoanSTAR Revolving Loan Program', desc: 'Low-interest loans (typically 3%) for energy efficiency improvements in state-funded facilities: schools, hospitals, local government buildings. Up to $1M per project. NOT for private homeowners — public entities only.', amt: 'Loans up to $1M' },
    { name: 'SECO Technical Assistance', desc: 'Free energy audits and technical assistance for nonprofit organizations, schools, and local governments to identify efficiency opportunities and access funding.', amt: 'Free' },
    { name: 'Energy Systems Lab Grant Support', desc: 'SECO partners with Texas A&M ESL to help public institutions qualify for ASHRAE-standard energy audits required for certain federal grant programs.', amt: 'Audit support' },
  ]},
  { id: 'rural', label: '🌾 Rural / Agricultural', programs: [
    { name: 'USDA REAP (Rural Energy for America)', desc: 'Grants (25% of project cost) and loans for rural small businesses and agricultural producers to install renewable energy or make energy efficiency improvements. SECO helps Texans navigate applications.', amt: 'Up to 25% grant' },
    { name: 'SECO Rural Weatherization Resources', desc: 'SECO connects rural homeowners with WAP services and USDA 504 loan/grant programs for home weatherization outside city limits.', amt: 'Varies' },
  ]},
];

export default function DFWSECOProgramsGuide2026() {
  const [selected, setSelected] = useState('residential');
  const group = ownerTypes.find(o => o.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🌱 Texas SECO Programs · DFW 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>Texas SECO Energy Programs Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>State Energy Conservation Office programs available to DFW homeowners, low-income households, nonprofits, and rural Texans. Select your type to see relevant programs.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {ownerTypes.map(o => (
            <button key={o.id} onClick={() => setSelected(o.id)} style={{ padding: '0.5rem 1.1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', backgroundColor: selected === o.id ? '#F5E642' : '#1e3a5f', color: selected === o.id ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{o.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {group.programs.map((p, i) => (
            <div key={i} style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1.05rem' }}>{p.name}</div>
                <div style={{ backgroundColor: '#F5E64220', color: '#F5E642', borderRadius: '8px', padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{p.amt}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Access SECO Programs</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>Visit <span style={{ color: '#F5E642' }}>seco.cpa.state.tx.us</span> or call SECO at (512) 463-1931. For WAP and income-based programs, contact the Community Council of Greater Dallas (214-871-5065) or Tarrant County Community Development (817-531-5632).</div>
        </div>
      </div>
    </div>
  );
}

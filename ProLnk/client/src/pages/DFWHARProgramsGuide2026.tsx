import { useState } from 'react';

const eligibilityTypes = [
  { id: 'veteran', label: '🎖️ Veteran / Military', programs: [
    { name: 'VA SAH Grant (Specially Adapted Housing)', desc: 'Up to $109,986 (2026 limit) for veterans with severe service-connected disabilities to build or modify a home for independent living.', amt: 'Up to $109,986' },
    { name: 'VA SHA Grant (Special Housing Adaptation)', desc: 'Up to $21,997 (2026 limit) for veterans adapting a family member's home. Covers ramps, widened doorways, roll-in showers.', amt: 'Up to $21,997' },
    { name: 'VA TRA Grant (Temporary Residence Adaptation)', desc: 'SAH-eligible veterans: up to $43,462. SHA-eligible: up to $7,748. Temporary modifications while permanent housing is arranged.', amt: 'Up to $43,462' },
  ]},
  { id: 'lowincome', label: '💼 Low Income', programs: [
    { name: 'USDA Rural Development Section 504', desc: 'For rural DFW homeowners: loans up to $40,000 at 1% interest + grants up to $10,000 for those 62+. Must be unable to obtain affordable credit elsewhere.', amt: 'Up to $50,000' },
    { name: 'Texas HHSC HCBS Program', desc: 'Home and Community-Based Services for Medicaid-eligible Texans. Covers ramps, grab bars, lifts, and other modifications to remain at home.', amt: 'Medicaid-funded' },
    { name: 'Community Development Block Grant (CDBG)', desc: 'Dallas and Fort Worth both administer CDBG funds for low-income homeowner rehab including accessibility modifications. Income limits apply.', amt: 'Varies by city' },
  ]},
  { id: 'senior', label: '👴 Senior (62+)', programs: [
    { name: 'Area Agency on Aging — North Texas', desc: 'Free minor home modifications (grab bars, handrails, ramps) for seniors 60+ in DFW. Funded through Older Americans Act Title III-B. Limited availability.', amt: 'Free (limited)' },
    { name: 'USDA 504 Grant Component', desc: 'Grants (not loans) up to $10,000 for rural seniors 62+ who cannot repay a loan. Used for removing accessibility hazards.', amt: 'Up to $10,000' },
    { name: 'Tarrant County Senior Services', desc: 'Minor home repair and modification assistance for low-income seniors in Tarrant County through the Community Development Division.', amt: 'Case-by-case' },
  ]},
  { id: 'disability', label: '♿ Disability', programs: [
    { name: 'Texas DADS HCBS Waiver', desc: 'Department of Aging and Disability Services waivers cover home modifications for Medicaid-eligible Texans with physical disabilities.', amt: 'Medicaid-funded' },
    { name: 'AbilityPath DFW Home Mod Fund', desc: 'Local nonprofit fund providing emergency home accessibility grants for DFW residents with physical disabilities. Rolling applications.', amt: 'Up to $2,500' },
  ]},
];

export default function DFWHARProgramsGuide2026() {
  const [selected, setSelected] = useState('veteran');
  const group = eligibilityTypes.find(e => e.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>♿ Accessibility Grants · DFW 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Home Accessibility Rebate Programs 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Grants and funded programs for home accessibility improvements. Select your eligibility type to see qualifying programs.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {eligibilityTypes.map(e => (
            <button key={e.id} onClick={() => setSelected(e.id)} style={{ padding: '0.5rem 1.1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', backgroundColor: selected === e.id ? '#F5E642' : '#1e3a5f', color: selected === e.id ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{e.label}</button>
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
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>📞 Get Help Applying</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>Call 2-1-1 (Texas Health and Human Services helpline) to connect with local case managers who can identify all programs you qualify for and help with applications. Many programs have waitlists — apply early.</div>
        </div>
      </div>
    </div>
  );
}

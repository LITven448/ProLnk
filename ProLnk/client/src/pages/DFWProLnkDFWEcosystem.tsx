import { useState } from 'react';

const professionalTypes = [
  {
    id: 'contractor',
    label: '🔨 Home Service Contractor',
    value: 'How ProLnk creates value for contractors',
    points: [
      'Contractors receive qualified leads — homeowners who need their specific trade',
      'ProLnk partners are NOT contractors — partners refer homeowners and pros connect',
      'No chasing cold leads; homeowners have already requested quotes',
      'Contractors pay a match fee only when connected to a homeowner — no monthly obligation',
      'DFW contractors benefit from concentrated, local homeowner demand in their trade area',
    ],
    note: 'Contractors and ProLnk partners are complementary roles — a partner can also be a contractor, but the roles are separate.',
  },
  {
    id: 'realtor',
    label: '🏡 Real Estate Professional',
    value: 'How ProLnk creates value for real estate professionals',
    points: [
      'Home Health Vault data is valuable to agents — it reveals property history buyers care about',
      'Agents can refer clients to ProLnk and earn referral income as a partner',
      'Pre-listing home services (painting, HVAC tune-up, landscaping) connect easily through ProLnk',
      'Post-close homeowners need service pros — ProLnk is a natural referral for agents to make',
      'Vault data helps agents differentiate listings with documented maintenance records',
    ],
    note: 'Real estate professionals are strong ProLnk partner candidates — they already have homeowner relationships.',
  },
  {
    id: 'hoa',
    label: '🏘 HOA Manager',
    value: 'How ProLnk creates value for HOA managers',
    points: [
      'HOAs manage hundreds of homes — ProLnk can organize service access at scale',
      'HOA managers can refer homeowners in their community, earning partner income',
      'Bulk home additions to the Vault through HOA partnerships unlock origination rights',
      'Community-wide service events (inspections, cleanings) can be organized through ProLnk',
      'HOA endorsement of ProLnk creates high-trust referral pipeline across entire neighborhoods',
    ],
    note: 'HOA managers as ProLnk partners can generate significant passive income through origination rights on community homes.',
  },
  {
    id: 'insurance',
    label: '🛡 Insurance Professional',
    value: 'How ProLnk creates value for insurance professionals',
    points: [
      'Home maintenance data in the Vault is directly relevant to underwriting and claims',
      'Insurance agents can refer homeowners needing repairs or inspections through ProLnk',
      'Well-maintained homes = fewer claims; ProLnk helps homeowners stay proactive',
      'Insurance professionals can earn partner income by referring homeowners and pros',
      'Claims-related repairs (water damage, roof) connect to ProLnk pros quickly',
    ],
    note: 'Insurance professionals benefit from the same data-rich, service-connected ecosystem that makes ProLnk valuable.',
  },
];

export default function DFWProLnkDFWEcosystem() {
  const [selected, setSelected] = useState(professionalTypes[0]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🌐</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '0.5rem 0 0' }}>DFW Home Services Ecosystem</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>How ProLnk fits into — and amplifies — the DFW professional landscape</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {professionalTypes.map(p => (
            <button key={p.id} onClick={() => setSelected(p)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: `2px solid ${selected.id === p.id ? '#F5E642' : '#1E3A5F'}`, backgroundColor: selected.id === p.id ? '#1E3A5F' : 'transparent', color: selected.id === p.id ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}>
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>{selected.value}</div>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {selected.points.map((point, i) => (
              <li key={i} style={{ color: '#CBD5E1', marginBottom: '0.6rem', lineHeight: 1.55 }}>{point}</li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #F5E64240' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>💡 Key Insight</div>
          <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{selected.note}</div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[['🔁', 'Referral Network', 'Partners → Homeowners → Contractors'], ['🏠', 'Vault Data', 'Home history benefits every professional'], ['💰', 'Partner Income', 'Every professional category can earn']].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginTop: 4, fontSize: '0.9rem' }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

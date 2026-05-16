import { useState } from 'react';

const categories = [
  { id: 'hail', label: '⛈️ Hail Damage', icon: '⛈️' },
  { id: 'materials', label: '🧱 Materials', icon: '🧱' },
  { id: 'contractors', label: '👷 Contractors', icon: '👷' },
  { id: 'gutters', label: '🌧️ Gutters', icon: '🌧️' },
  { id: 'cost', label: '💰 Cost Guides', icon: '💰' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  hail: [
    { title: 'DFW Hail Damage Roof Inspection Guide 2026', desc: 'What to look for after a DFW storm — shingle dents, granule loss, and flashing damage.', tag: 'Most Critical' },
    { title: 'Filing a Hail Damage Insurance Claim in Texas', desc: 'Step-by-step from storm to settlement in North Texas.', tag: 'Insurance' },
    { title: 'Hail-Resistant Roofing Materials for DFW', desc: 'Class 4 impact-resistant shingles and Texas insurance discounts.', tag: 'Prevention' },
    { title: 'Storm Chaser Contractor Warning Signs in DFW', desc: 'How to avoid roofing scams after North Texas hailstorms.', tag: 'Safety' },
  ],
  materials: [
    { title: 'Asphalt Shingles vs Metal Roofing in DFW', desc: 'Cost, lifespan, and performance for North Texas climate.', tag: 'Comparison' },
    { title: 'Best Roofing Materials for DFW Heat and Hail', desc: 'Top-rated options for 100°F summers and severe storms.', tag: 'Top Guide' },
    { title: 'Solar Roof vs Traditional Roof in DFW 2026', desc: 'Tesla, Qcells, and GAF solar shingles compared for Texas.', tag: 'Solar' },
    { title: 'Roof Ventilation Guide for DFW Homes', desc: 'Ridge vents, soffit vents, and attic airflow for Texas heat.', tag: 'Ventilation' },
  ],
  contractors: [
    { title: 'How to Hire a Roofing Contractor in DFW', desc: '10 questions to ask before signing any roofing contract.', tag: 'Hiring' },
    { title: 'Roofing License Requirements in Texas', desc: 'What Texas law requires — and what it doesn\'t.', tag: 'Legal' },
    { title: 'Roofing Contract Red Flags in Texas', desc: 'Assignment of benefits, waived deductibles, and other traps.', tag: 'Warning' },
    { title: 'Join ProLnk as a DFW Roofing Pro', desc: 'Get vetted leads with Charter membership and 5 income streams.', tag: '⭐ ProLnk' },
  ],
  gutters: [
    { title: 'Gutter System Guide for DFW Homes 2026', desc: 'K-style vs half-round, sizing, and material options.', tag: 'Gutters' },
    { title: 'Seamless Gutters vs Sectional in DFW', desc: 'Why seamless dominates North Texas and what it costs.', tag: 'Comparison' },
    { title: 'Gutter Guard Comparison for DFW 2026', desc: 'LeafFilter, MasterShield, and DIY options for Texas trees.', tag: 'Products' },
    { title: 'Downspout Extensions and Foundation Protection', desc: 'Directing water away from DFW foundations — critical in clay soil.', tag: 'Foundation' },
  ],
  cost: [
    { title: 'DFW Roof Replacement Cost Guide 2026', desc: 'Average costs by square footage, material, and contractor tier.', tag: 'Pricing' },
    { title: 'Roof Repair vs Replacement Decision Guide', desc: 'When patching makes sense vs full re-roof in DFW.', tag: 'Decision' },
    { title: 'Financing a New Roof in DFW — 2026 Options', desc: 'Manufacturer programs, HELOCs, and PACE loans in Texas.', tag: 'Financing' },
    { title: 'Texas Roofing Tax Credits and Rebates 2026', desc: 'IRA energy credits for cool roofs and solar in Texas.', tag: 'Save Money' },
  ],
};

export default function DFWRoofingResourceHub2026() {
  const [active, setActive] = useState('hail');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            DFW Roofing Complete Resource Hub 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            Every roofing guide for North Texas homeowners — from storm damage to replacement to finding a trusted contractor.
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 16, marginBottom: 28, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>⛈️ DFW Storm Season Alert</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
            Dallas-Fort Worth averages 6-8 hailstorms per year, many exceeding 2" in diameter. North Texas consistently ranks #1 for hail damage insurance claims nationally.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === c.id ? '#F5E642' : '#1e3a5f', color: active === c.id ? '#0A1628' : '#94a3b8',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 40 }}>
          {guides[active].map((g, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0, flex: 1, marginRight: 8 }}>{g.title}</h3>
                <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>{g.tag}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>{g.desc}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Read Guide →
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Get Matched with a Trusted DFW Roofer</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk verifies DFW roofing contractors so you don\'t have to. No storm chasers, no scams.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Roofing Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
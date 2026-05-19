import { useState } from 'react';

const projectTypes = [
  {
    label: 'Full Roof Replacement',
    vetting: ['Manufacturer certification (GAF Master Elite or OC Platinum preferred)', 'General liability $1M+ and workers comp', 'Local DFW address — not a storm chaser', 'References from jobs within last 12 months'],
    certifications: 'GAF Master Elite and Owens Corning Platinum are the strongest signals for shingle work — only 3% and 1% of contractors qualify respectively',
    contract: ['Specific shingle brand, model, and color in writing', 'Deck inspection and decking replacement policy', 'Drip edge and ice-and-water shield included', 'Permit pulled by contractor', 'Manufacturer warranty activation included'],
  },
  {
    label: 'Storm Damage / Insurance Claim',
    vetting: ['Do NOT sign an Assignment of Benefits (AOB) — you lose control of your claim', 'Contractor should provide a supplemental scope, not pressure you to settle', 'Verify they are not out-of-state storm chasers post-hail event'],
    certifications: 'Xactimate experience is a plus — tells you they know how to document storm work for insurers',
    contract: ['Supplement clause: contractor handles underpayments from insurer', 'No payment until insurance funds received', 'Scope tied to insurance adjuster estimate'],
  },
  {
    label: 'Roof Repair / Patch',
    vetting: ['Ask if repair is a permanent fix or a temporary patch', 'Request a written scope with area measured in squares', 'Manufacturer certification still matters for quality materials'],
    certifications: 'For repairs, certification matters less — focus on materials warranty and written scope',
    contract: ['Exact location of repair defined', 'Materials brand and type specified', 'Labor warranty minimum 1 year', 'What happens if repair fails within warranty period'],
  },
  {
    label: 'Flat / Commercial Roofing',
    vetting: ['TPO, EPDM, and modified bitumen require specialized training', 'Ask for manufacturer certification on specific flat roofing system', 'Drain location and water flow plan required'],
    certifications: 'Firestone Red Shield, GAF TPO, or Carlisle authorized applicator certifications are the standard for flat systems',
    contract: ['System type and thickness specified', 'Drainage plan included', 'Manufacturer warranty (not just labor warranty) required'],
  },
];

export default function DFWRooferSelectionGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>DFW Roofer Selection Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            Texas does not license roofers. Anyone can call themselves a roofing contractor. Here is how to protect yourself in DFW.
          </p>
        </div>

        <div style={{ backgroundColor: '#dc2626', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🚨</div>
          <h2 style={{ color: '#fff', fontSize: 20, marginBottom: 10 }}>Texas Does Not License Roofers</h2>
          <p style={{ color: '#fecaca', fontSize: 15, lineHeight: 1.7 }}>
            Unlike HVAC, plumbing, and electrical, Texas has no state licensing requirement for roofing contractors. This means anyone with a truck and ladder can legally call themselves a roofer. After DFW hailstorms, out-of-state contractors flood the market looking for quick paydays. Manufacturer certification is your primary vetting tool because it requires training, inspections, and ongoing accountability.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏅 Manufacturer Certifications as Vetting Alternative</h2>
          {[
            ['GAF Master Elite', 'Less than 3% of roofing contractors qualify. Requires training, insurance verification, and ongoing performance standards. Enables 50-year Golden Pledge warranty.'],
            ['Owens Corning Platinum Preferred', 'Less than 1% qualify. Strongest signal in the market. Enables Owens Corning system warranty on both materials and labor.'],
            ['CertainTeed SELECT ShingleMaster', 'Rigorous certification program — training, insurance, and installation standards required to maintain status.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderBottom: '1px solid #2d3f6b', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>🏅 {title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>☔ Insurance for DFW Storm Work</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            Require a certificate of insurance showing general liability of at least $1M and workers' compensation. Ask for the certificate naming you as additional insured. An uninsured roofer who falls off your home could trigger a lawsuit against your homeowners policy. This is non-negotiable.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔨 Project Type → Vetting & Contract Must-Haves</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectTypes.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#F5E642' : '#2d3f6b',
                  backgroundColor: selected === i ? '#F5E642' : 'transparent',
                  color: selected === i ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e3a', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14 }}>{projectTypes[selected].label}</h3>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Vetting Criteria</div>
                {projectTypes[selected].vetting.map((v, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {v}</div>)}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Certifications to Request</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{projectTypes[selected].certifications}</div>
              </div>
              <div>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Contract Must-Haves</div>
                {projectTypes[selected].contract.map((c, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

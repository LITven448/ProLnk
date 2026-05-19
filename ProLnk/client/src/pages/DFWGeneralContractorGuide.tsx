import { useState } from 'react';

const projectScopes = [
  {
    label: 'Kitchen or Bath Remodel',
    needsGC: true,
    reason: 'Multiple licensed trades (plumbing, electrical, HVAC if applicable) plus finish work require coordination. A GC manages the sequence and takes accountability.',
    verify: ['Ask which subcontractors they use and whether they carry their own licenses', 'Request proof the GC carries general liability AND workers comp for subs', 'Verify any city-specific contractor registration (Dallas, Fort Worth, Plano, etc. have their own requirements)'],
    markup: 'DFW GC markup for kitchen/bath remodels: typically 15–25% over subcontractor costs',
    contract: ['Detailed scope with brands and models for fixtures', 'Draw schedule tied to completion milestones, not calendar dates', 'Lien waiver requirement from all subs', 'Change order policy in writing'],
  },
  {
    label: 'Addition or New Build',
    needsGC: true,
    reason: 'Additions require structural engineering, multiple permits, and sequenced trade work. This is the primary use case for a GC.',
    verify: ['Verify city-specific contractor registration — DFW cities vary significantly', 'Confirm they have architect and engineer relationships for permit drawings', 'Check references on projects of similar scope and value'],
    markup: 'DFW GC markup for additions: typically 18–28% over subcontractor and materials costs',
    contract: ['Architect-stamped drawings referenced by name', 'All permits listed and confirmed as contractor responsibility', 'Substantial completion definition and final payment trigger', 'Warranty period post-completion (1 year is standard)'],
  },
  {
    label: 'Single Trade Project (e.g., flooring, painting)',
    needsGC: false,
    reason: 'Single-trade projects do not require a GC. Hire the specialist directly and eliminate the markup layer.',
    verify: ['Hire the trade directly — no GC needed', 'Ask for references from local DFW jobs', 'Verify any relevant license (e.g., TDLR for some painting/coatings work)'],
    markup: 'No GC markup — hire the trade directly. DFW flooring installers: $3–$8/sq ft labor; painters: $1.50–$4/sq ft',
    contract: ['Scope defined by area and materials', 'Material brand and grade specified', 'Payment tied to punch list completion, not scheduling'],
  },
  {
    label: 'Outdoor / Landscape Project',
    needsGC: false,
    reason: 'Unless the project involves permitted structures (deck, pergola, pool), outdoor projects do not require a GC.',
    verify: ['If adding a pool: pool contractor must be TREC licensed', 'Structural decks require permit — verify contractor pulls it', 'Irrigation requires licensed irrigator in Texas'],
    markup: 'If a GC is used for complex outdoor build: 15–22% markup typical',
    contract: ['Plant list with species and sizes specified', 'Irrigation design and head count specified', 'Warranty on plant material (1 year is standard)', 'Grading and drainage plan if applicable'],
  },
];

export default function DFWGeneralContractorGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>DFW General Contractor Guide</h1>
          <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6 }}>
            When you need a GC in DFW, how to verify them, and how to understand their markup before you sign.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 16 }}>📋 Texas GC Licensing Reality</h2>
          <div style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 4 }}>⚠️ Texas Does Not License General Contractors at the State Level</div>
            <div style={{ color: '#78350f', fontSize: 14, lineHeight: 1.6 }}>Unlike California or Florida, Texas has no statewide GC license. However, Dallas, Fort Worth, Plano, Arlington, and other DFW cities have their own contractor registration or permit-pulling requirements. Always verify at your specific city's building department.</div>
          </div>
          {[
            ['What to Verify', 'City contractor registration (check your city\’s building department), general liability insurance ($1M minimum), workers\’ compensation coverage for all employees and subs, and references from comparable local projects.'],
            ['Bonding', 'A surety bond protects you if the GC abandons the project. For projects over $50K, require the GC to carry a bond. Ask for the bond number and verify it is current.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ color: '#0A1628', fontWeight: 600, marginBottom: 4 }}>📌 {title}</div>
              <div style={{ color: '#475569', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 12 }}>💰 How GC Markup Works</h2>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
            A GC typically marks up subcontractor labor and materials by 15–25% in DFW. This markup pays for their coordination, schedule management, insurance, and warranty obligation. You are not just paying for someone to make phone calls — a good GC takes accountability that individual subs cannot. On complex projects, the GC markup is earned. On simple single-trade projects, it is an unnecessary cost layer.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 16 }}>🏗️ Project Scope → Do You Need a GC?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectScopes.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#0A1628′ : '#e2e8f0',
                  backgroundColor: selected === i ? '#0A1628′ : ’transparent',
                  color: selected === i ? '#F5E642′ : '#1e293b' }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#f1f5f9', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#0A1628', marginBottom: 8 }}>{projectScopes[selected].label}</h3>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontWeight: 700, color: projectScopes[selected].needsGC ? '#16a34a' : '#dc2626′ }}>
                  {projectScopes[selected].needsGC ? '✅ You Need a GC' : '❌ GC Not Required'}
                </span>
                <div style={{ color: '#475569', fontSize: 14, marginTop: 4 }}>{projectScopes[selected].reason}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#0A1628', fontWeight: 600, marginBottom: 6 }}>What to Verify</div>
                {projectScopes[selected].verify.map((v, i) => <div key={i} style={{ color: '#334155', fontSize: 14, marginBottom: 4 }}>• {v}</div>)}
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#0A1628', fontWeight: 600 }}>DFW Markup Range: </span>
                <span style={{ color: '#475569', fontSize: 14 }}>{projectScopes[selected].markup}</span>
              </div>
              <div>
                <div style={{ color: '#0A1628', fontWeight: 600, marginBottom: 6 }}>Contract Essentials</div>
                {projectScopes[selected].contract.map((c, i) => <div key={i} style={{ color: '#334155', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

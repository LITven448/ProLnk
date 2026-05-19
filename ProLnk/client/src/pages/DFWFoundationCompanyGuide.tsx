import { useState } from 'react';

const concerns = [
  {
    label: 'Cracks in Walls or Floors',
    vetting: ['Get an independent engineer assessment before any contractor bid', 'Engineer-certified companies use PE-stamped repairs — always require this', 'Ask how many piers they propose and how they calculated the number'],
    warnings: ['Company refuses independent engineer review', 'Pier count quote without soil report or engineering', 'Extremely low bid with no engineering documentation'],
    contract: ['Engineer-stamped repair plan attached to contract', 'Number of piers, placement map, and depth specified', 'Lifetime transferable warranty — this is industry standard in DFW, require it', 'Warranty transferability confirmed in writing for future sale'],
  },
  {
    label: 'Doors / Windows Not Closing',
    vetting: ['Sticking doors can be foundation or just seasonal wood movement — get engineer assessment first', 'Engineer distinguishes cosmetic vs structural issues', 'Multi-company bids only after engineer defines scope'],
    warnings: ['Immediate diagnosis without measurement or monitoring', 'Contractor claims foundation issue without soil investigation', 'Push to start work before engineer review'],
    contract: ['Specific trigger events defined (how much more movement before warranty activates)', 'Engineer sign-off on completed work included', 'Transferable warranty required'],
  },
  {
    label: 'Slab Heave / Raised Floor',
    vetting: ['Slab heave is often caused by expansive clay soil moisture change — DFW-specific issue', 'Heave repair is different from settlement repair — confirm company specializes in heave', 'Interior drainage systems may be required — get multiple opinions'],
    warnings: ['Company proposes same pier solution used for settlement — heave needs different approach', 'No mention of drainage or moisture management', 'Short warranty on heave repair (should be lifetime)'],
    contract: ['Heave-specific repair method specified', 'Drainage or moisture management component included if recommended', 'Engineer certification of heave diagnosis in contract'],
  },
  {
    label: 'Pre-Purchase Inspection Finding',
    vetting: ['Independent structural engineer (not the foundation company) should assess first', 'Get 2–3 foundation company bids based on engineer report', 'Negotiate repair cost into purchase price or seller concession'],
    warnings: ['Only one company\’s opinion before making purchase decision', 'Foundation company diagnosis without independent engineer first', 'Seller insisting on specific contractor'],
    contract: ['Full repair scope tied to engineer\’s findings', 'Warranty transferable to you as new owner — confirmed before close', 'Right to re-inspect after repair before purchase closes'],
  },
];

export default function DFWFoundationCompanyGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>DFW Foundation Company Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            How to choose a foundation repair company in Dallas-Fort Worth — warranties, engineering, and red flags.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 DFW Foundation Basics</h2>
          {[
            ['Lifetime Transferable Warranty is Standard', 'DFW foundation companies routinely offer lifetime transferable warranties because the expansive clay soil makes repeat settlement possible. If a company does not offer a transferable warranty, walk away — this is table stakes in this market.'],
            ['Engineer-Certified vs Self-Certified Repair', 'Engineer-certified repair means a licensed Professional Engineer reviews the site, designs the repair plan, and signs off on completion. Self-certified means the foundation company decides everything themselves. Always require PE involvement.'],
            ['Get the Independent Engineer First', 'Before calling a single foundation company, pay $300–$600 for an independent structural engineer assessment. The engineer has no interest in selling you repairs — they just report what they see. Foundation companies have a financial incentive to recommend more piers.'],
            ['DFW Clay Soil Reality', 'North Texas sits on some of the most expansive clay soil in the country. Homes shift with moisture changes — extreme drought followed by heavy rain is the leading driver of DFW foundation movement. This is not a sign of poor construction; it is the geology.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderBottom: '1px solid #2d3f6b', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>📌 {title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏚️ Foundation Concern → Vetting, Warnings & Contract</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {concerns.map((c, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#F5E642′ : '#2d3f6b',
                  backgroundColor: selected === i ? '#F5E642′ : ’transparent',
                  color: selected === i ? '#0A1628′ : '#94a3b8' }}>
                {c.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e3a', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14 }}>{concerns[selected].label}</h3>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Vetting Criteria</div>
                {concerns[selected].vetting.map((v, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {v}</div>)}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 6 }}>Warning Signs</div>
                {concerns[selected].warnings.map((w, i) => <div key={i} style={{ color: '#fca5a5', fontSize: 14, marginBottom: 4 }}>🚩 {w}</div>)}
              </div>
              <div>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>What the Contract Must Include</div>
                {concerns[selected].contract.map((c, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

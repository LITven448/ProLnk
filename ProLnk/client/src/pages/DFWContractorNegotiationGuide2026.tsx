import { useState } from 'react';

export default function DFWContractorNegotiationGuide2026() {
  const [projectType, setProjectType] = useState<string>('kitchen');

  const strategies: Record<string, { label: string; tactics: { icon: string; tactic: string; detail: string }[] }> = {
    kitchen: {
      label: 'Kitchen Remodel',
      tactics: [
        { icon: '📋', tactic: 'Get 3 Bids Minimum', detail: 'DFW kitchen remodels range $18K–$65K for similar scopes. One quote gives you no leverage. Three bids reveal the market rate and give you ammunition to negotiate the lowest.' },
        { icon: '📅', tactic: 'Schedule Off-Peak (Jan–Feb)', detail: 'DFW contractors slow down January–February after the holiday rush. Some offer 10–20% discounts to fill their schedule. Ask directly: "Do you offer any off-peak pricing?"' },
        { icon: '💳', tactic: 'Offer Prompt Payment', detail: 'Offer 50% upfront and the balance within 7 days of completion. Many DFW contractors will drop 5–10% for guaranteed fast payment — it reduces their collections risk.' },
        { icon: '📦', tactic: 'Bundle with a Bathroom', detail: 'Ask about bundling your kitchen with a bathroom remodel. Mobilizing a crew twice costs contractors money — one mobilization for two projects often means 8–12% savings.' },
        { icon: '🏗️', tactic: 'Ask About Leftover Materials', detail: 'Contractors often have leftover tile, cabinet hardware, or countertop remnants from other DFW projects. Ask if they can use these — saves cost and reduces waste.' },
      ],
    },
    bathroom: {
      label: 'Bathroom Remodel',
      tactics: [
        { icon: '📋', tactic: '3 Bids, Compare Line by Line', detail: 'DFW bathroom remodels vary $6K–$28K. Ask each contractor to break down labor vs. materials so you can compare apples to apples, not just totals.' },
        { icon: '🪚', tactic: 'Supply Your Own Fixtures', detail: 'Contractor markup on fixtures is 15–40%. Buy your vanity, toilet, and faucet from Floor and Decor or Costco yourself — then pay labor only. Saves $500–1,500 on a mid-range bath.' },
        { icon: '📅', tactic: 'Ask About Crew Availability', detail: 'If a DFW contractor has a crew with a gap in the schedule, they may take your job at cost just to keep workers paid. "Can you start in the next 2 weeks?" often triggers better pricing.' },
        { icon: '✍️', tactic: 'Lock In Change Order Policy', detail: 'Get the change order rate in writing before signing. DFW change orders average $2,400 per change. Agreeing to a cap (max 10% overage) protects you from scope creep.' },
      ],
    },
    hvac: {
      label: 'HVAC Replacement',
      tactics: [
        { icon: '🌡️', tactic: 'Replace in Spring or Fall', detail: 'DFW HVAC companies are slammed in summer and winter. Spring or fall replacement can save 10–15% — and you wont be negotiating in a panic during a heat emergency.' },
        { icon: '📋', tactic: 'Get 3 Bids, Same SEER Rating', detail: 'DFW HVAC bids often compare different SEER efficiencies. Ask all three contractors to bid the same brand, same SEER, same tonnage — or you cannot compare them fairly.' },
        { icon: '🏷️', tactic: 'Ask About Manufacturer Rebates', detail: 'Trane, Carrier, and Lennox run seasonal rebates for DFW customers. Ask your contractor to include any available rebates in the quote — some are $500–1,500 and not always mentioned.' },
        { icon: '🔧', tactic: 'Bundle Duct Sealing', detail: 'If your ducts are leaky (most DFW homes over 15 years old), ask for duct sealing in the same project. Bundled labor is always cheaper than separate mobilizations.' },
      ],
    },
    roofing: {
      label: 'Roofing',
      tactics: [
        { icon: '🌪️', tactic: 'Post-Storm Timing Matters', detail: 'After a DFW hail storm, roofing contractors flood the market and prices drop due to competition. However, fraudulent storm chasers also appear — always verify license and insurance.' },
        { icon: '📋', tactic: '3 Bids, Same Shingle Brand', detail: 'Ask all three contractors to bid GAF Timberline HDZ (or equivalent) so bids are comparable. Shingle quality dramatically affects price — same labor, different materials.' },
        { icon: '📄', tactic: 'Ask for Itemized Proposals', detail: 'DFW roofing bids should break down tear-off, underlayment, shingles, flashing, and dump fees separately. Hidden fees in non-itemized bids are common.' },
        { icon: '💰', tactic: 'Pay on Completion', detail: 'Reputable DFW roofers only ask for a material deposit (30–40%) upfront. Never pay more than 50% before work begins — hold final payment until final inspection passes.' },
      ],
    },
  };

  const projectTypes = Object.keys(strategies);
  const active = strategies[projectType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤝</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Contractor Negotiation Guide 2026</h1>
          <p style={{ color: '#8B9AB5', marginTop: '0.5rem' }}>Project-specific tactics to get better prices in DFW</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {projectTypes.map((pt) => (
            <button
              key={pt}
              onClick={() => setProjectType(pt)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 20,
                border: `1px solid ${projectType === pt ? '#F5E642' : '#1E3050'}`,
                background: projectType === pt ? '#F5E642′ : '#0F1E35',
                color: projectType === pt ? '#0A1628′ : '#8B9AB5',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {strategies[pt].label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {active.tactics.map((t, i) => (
            <div key={i} style={{ background: '#0F1E35', border: '1px solid #1E3050', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{t.tactic}</div>
                  <p style={{ color: '#8B9AB5', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0F1E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050', textAlign: 'center' }}>
          <p style={{ color: '#8B9AB5', margin: 0, fontSize: '0.9rem' }}>
            🔗 <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk</span> sends your project to 3+ licensed DFW contractors — so you always start with competitive bids.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const situations = [
  {
    label: 'Pre-listing discovery',
    outcome: 'Repaired proactively → sold at list price',
    docs: ['Structural engineer evaluation report', 'Repair contractor invoice', 'Transferable lifetime warranty', 'Before/after photos'],
    buyerScript: 'We discovered and repaired foundation movement proactively. Here is the engineer report, the repair warranty, and photos. This home is now stronger than most in the area.',
    detail: 'The Martinsons in Garland discovered pier issues during their pre-listing home inspection. They hired a structural engineer for $450, got 3 repair bids, chose a licensed contractor, and completed the work in 5 days. They listed 2 weeks later with full documentation and sold in 6 days at asking price.',
  },
  {
    label: 'Buyer inspection finding',
    outcome: 'Negotiated credit → closed on time',
    docs: ['Independent structural engineer report', 'Two contractor repair estimates', 'Explanation of DFW clay soil causes'],
    buyerScript: 'Our engineer confirms this is common DFW clay soil movement and is fully repairable. We are crediting $X at closing so you can choose your own contractor.',
    detail: 'The Petersons were selling their 1988 McKinney home when the buyer\’s inspector flagged cracks. The sellers ordered an independent engineer report ($450) confirming minor pier movement. They provided two repair estimates and offered a $9,800 credit. Buyer accepted. Closed on schedule.',
  },
  {
    label: 'Already disclosed at listing',
    outcome: 'Full transparency → bidding war',
    docs: ['Completed repair records', 'Engineer clearance letter', 'Home warranty documentation'],
    buyerScript: 'Foundation was repaired in 2021. Engineer clearance letter is attached. This is fully documented and comes with an existing transferable warranty.',
    detail: 'The Nguyens in Plano repaired their foundation in 2021 and kept all records. When they listed in 2024, they disclosed upfront and attached the clearance letter to the MLS. Three buyers competed. The winning offer was $11K over asking. Buyers said the documentation gave them more confidence, not less.',
  },
  {
    label: 'Failed to disclose — cautionary',
    outcome: 'Buyer discovered at closing → $22K loss',
    docs: ['What you should have disclosed', 'Required Texas disclosure forms', 'Seller liability risk'],
    buyerScript: 'N/A — this seller did not disclose. The buyer\’s lender required a repair before funding. Seller paid $18K for emergency repair plus $4K in concessions.',
    detail: 'A Frisco seller chose not to mention known foundation cracks. The buyer\’s appraiser flagged it. The lender required repairs before funding. The seller paid $18,000 in rushed repairs, gave a $4,000 concession, and nearly lost the buyer entirely. Texas disclosure law requires known foundation issues to be disclosed.',
  },
];

export default function DFWFoundationRepairSuccessStory() {
  const [selected, setSelected] = useState(0);
  const s = situations[selected];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW FOUNDATION REPAIR GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Repair Doesn't Kill a Sale — Hiding It Does</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>DFW's clay soil means foundation movement is extremely common. Here's how homeowners handled it and what happened at closing.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
              backgroundColor: selected === i ? '#0A1628' : '#E5E7EB', color: selected === i ? '#F5E642' : '#0A1628',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{s.label}</span>
            <span style={{ backgroundColor: selected === 3 ? '#FEE2E2' : '#D1FAE5', padding: '4px 10px', borderRadius: 4, fontWeight: 700, fontSize: 13 }}>{s.outcome}</span>
          </div>
          <p style={{ lineHeight: 1.7, marginBottom: 20 }}>{s.detail}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 Documentation Needed</div>
            {s.docs.map((d, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #F3F4F6', fontSize: 14 }}>✅ {d}</div>
            ))}
          </div>

          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>💬 What to Tell Buyers</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151', fontStyle: 'italic' }}>"{s.buyerScript}"</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Need a licensed foundation contractor in DFW?</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Get 3 Bids Free → prolnk.io
          </div>
        </div>
      </div>
    </div>
  );
}

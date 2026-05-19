import { useState } from 'react';

const situations = [
  {
    id: 'paying-off',
    label: 'I just paid off my mortgage',
    implications: 'Your lender must release the deed of trust lien within a reasonable timeframe after final payment. In Texas, they are legally required to file a release of lien.',
    process: [
      'Lender sends Release of Lien document (usually within 30–90 days of payoff)',
      'You or lender records the release with the County Clerk (Dallas County, Tarrant County, etc.)',
      'Cost: $25–$40 filing fee at county clerk',
      'Verify the release was recorded by checking county clerk records online',
      'Keep a copy of the recorded release in your permanent records',
    ],
    verify: 'Search your name at the Dallas County Clerk (dallascounty.org) or Tarrant County Clerk (tarrantcountytx.gov) to confirm lien release was recorded.',
    cost: '$25–$40 county recording fee',
  },
  {
    id: 'selling-before-payoff',
    label: 'I\’m selling my home before the mortgage is paid off',
    implications: 'At closing, the title company will pay off your existing mortgage from sale proceeds. The lender\’s lien is released as part of the closing process — you don\’t have to manage this separately.',
    process: [
      'Request a payoff quote from your lender (valid 30 days)',
      'Provide payoff quote to title company handling closing',
      'Title company pays lender at closing from sale proceeds',
      'Lender files release of lien after receiving payoff',
      'Title company confirms lien release before disbursing your proceeds',
    ],
    verify: 'Your title company handles this — but you can verify 60–90 days after closing by checking county clerk records to confirm the release was filed.',
    cost: 'No direct cost — handled through closing; title company charges are included in closing costs.',
  },
  {
    id: 'refinancing',
    label: 'I\’m refinancing my mortgage',
    implications: 'When you refinance, your old lender\’s deed of trust lien is paid off and released. A new lien is placed by your new lender. Both are handled by the title company at refi closing.',
    process: [
      'New lender orders title search to verify first lien position',
      'At closing, new loan funds pay off old mortgage',
      'Old lender files release of lien (may take 30–90 days)',
      'New lender\’s deed of trust is recorded immediately at closing',
      'Confirm old lien was released by checking county records after 90 days',
    ],
    verify: 'Check county clerk records 90 days post-refi closing. If old lien isn\’t released, contact your old lender directly — they are legally obligated to file.',
    cost: 'Included in refinance closing costs; recording fees $25–$40 per instrument.',
  },
  {
    id: 'inherited',
    label: 'I inherited a home with a mortgage',
    implications: 'The deed of trust lien transfers with the property. If the deceased had a mortgage, it stays on the home and must be paid, assumed, or the home must be sold. Due-on-sale clauses may or may not apply to inherited property under federal law (Garn–St. Germain Act).',
    process: [
      'Obtain certified copy of death certificate',
      'Contact lender to notify of death and discuss options',
      'Request assumption options — federal law protects heirs in many cases',
      'Consult a Texas probate attorney if there\’s no will or complex estate',
      'Title must be clear before you can refinance or sell',
    ],
    verify: 'Order a title search from a Texas title company to identify all liens on the property. Costs $150–$300 and reveals everything recorded against the home.',
    cost: 'Title search: $150–$300. Probate attorney: $2,500–$10,000 depending on complexity.',
  },
];

export default function DFWHomeMortgageLienGuide() {
  const [selected, setSelected] = useState('');
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠 📜 🔓</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Mortgage Lien Guide for Homeowners</h1>
          <p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>
            Texas uses a <strong>Deed of Trust</strong> — not a traditional mortgage — when you borrow to buy a home. Understanding how your lien works, when it releases, and what to verify can save you legal headaches.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '📄', title: 'Texas Uses Deed of Trust (Not a Mortgage)', body: 'In Texas, you sign a Deed of Trust — not a traditional mortgage — when buying with a loan. This means a third-party trustee holds the lien on your property for the lender. It functions similarly but affects how foreclosure works (Texas allows non-judicial foreclosure, meaning faster process).' },
            { icon: '🔒', title: 'What a Lien Means for Your Ownership', body: 'A lien is a legal claim against your property. While you own the home, the lender has a security interest recorded in county records. You can live in, rent, and benefit from the property — but you cannot sell or refinance without satisfying (paying off) the lien first.' },
            { icon: '📋', title: 'Release of Lien: What Happens When You Pay Off', body: 'After final payment, your lender must file a Release of Lien with the county clerk. This clears the lien from public record. If they fail to do so within a reasonable time, you can send written demand. Texas law requires the release be filed promptly or lender faces penalties.' },
            { icon: '🔍', title: 'How to Verify Your Lien Status', body: 'Search the county property records online. Dallas County: dallascounty.org. Tarrant County: tarrantcountytx.gov. Search by your name or property address to see all recorded documents — deeds, liens, and releases. It\’s free and public.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>🎯 Your Mortgage Situation → Lien Process & What to Verify</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#2563eb' : '#e0e0e0'}`, background: selected === s.id ? '#eff6ff' : '#fafafa', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              <div style={{ background: '#f0f7ff', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Lien Implication</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>{match.implications}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 Process Steps</div>
                {match.process.map((step, i) => <div key={i} style={{ fontSize: 14, padding: '7px 0', borderBottom: '1px solid #f0f0f0', color: '#333' }}>{i + 1}. {step}</div>)}
              </div>
              <div style={{ background: '#fff8e1', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ What to Verify</div>
                <div style={{ fontSize: 13, color: '#555' }}>{match.verify}</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>💵 Estimated Cost</div>
                <div style={{ fontSize: 13, color: '#555' }}>{match.cost}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

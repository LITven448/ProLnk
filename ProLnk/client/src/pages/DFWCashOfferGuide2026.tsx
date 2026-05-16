import { useState } from 'react';

const buyerProfiles = [
  { label: 'Traditional financed buyer', guide: 'Use a Power Buyer program: lend-to-own services like Knock, HomeLight Cash Close, or Ribbon convert your financed offer to cash. Typical fee is 1–2.5% of purchase price. You still get your mortgage — program fronts the cash, you pay them back at close.' },
  { label: 'High-income buyer, strong assets', guide: 'Ask your lender about Certified Pre-Approval or Underwritten Pre-Approval. Some DFW lenders offer same-day underwriting. While not technically cash, underwritten approval removes financing risk — nearly as strong as cash in DFW seller eyes.' },
  { label: 'Investor / builder', guide: 'If you have liquid assets, direct cash purchase is cleanest. Use hard money or private lender for fast-close. In DFW, investors with proof of funds close in 7–15 days. Accepted 30–40% more often than financed offers on distressed or estate-sale properties.' },
  { label: 'First-time buyer, limited cash', guide: 'You likely cannot compete on cash — focus instead on offer certainty: strong pre-approval, high earnest money (2%+), short option period. Target homes listed 20+ days — less competition. NACA, Texas DHCA, and DFW-area Down Payment Assistance programs can help with funds.' },
];

export default function DFWCashOfferGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          💵 DFW Cash Offer Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Cash offers dominate DFW. Here is how to access cash offer programs or compete without cash.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📊 Why Cash Wins in DFW</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[['Cash Acceptance Premium', '~30% higher'], ['Avg Cash Close Time', '14 days'], ['DFW Cash Offer Rate', '~28% of sales']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.4rem' }}>{val}</div>
                <div style={{ color: '#aac', fontSize: '0.8rem', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏦 DFW Cash Offer Programs</div>
          {[
            ['Knock', 'Bridge loan to buy before you sell — converts financed to cash-like offer'],
            ['HomeLight Cash Close', 'Fronts cash, you use mortgage — 1–2.5% fee'],
            ['Ribbon (Offer Boost)', 'Cash backing for financed buyers in TX — competitive acceptance rates'],
            ['Orchard', 'Trade-in program: buy new, sell old — reduces home sale contingency need'],
          ].map(([prog, desc]) => (
            <div key={prog} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid #1e3054', gap: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.93rem', minWidth: 120 }}>{prog}</span>
              <span style={{ color: '#ccd', fontSize: '0.93rem' }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 Your Buyer Type — Cash Access Guide</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {buyerProfiles.map((b, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {b.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💡 Your Cash Strategy</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{buyerProfiles[selected].guide}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const sides = [
  { label: 'Buying a home in DFW', guide: 'Post-NAR settlement: you MUST sign a Buyer Representation Agreement before touring homes. Negotiate agent fee upfront — typically 2.5–3% or flat fee. Seller may offer Buyer Agent Compensation (BAC) in MLS — if not, you pay your agent out of pocket or negotiate into purchase price. Ask upfront: does the seller offer BAC?' },
  { label: 'Selling a home in DFW', guide: 'You still pay your listing agent (1.5–3%). You can optionally offer BAC to attract buyer agents — not required but still common (2–2.5% in DFW). Offering BAC increases buyer pool. Net commission for full-service sale in DFW typically 4–5% total vs. old standard 5–6%.' },
  { label: 'Using a discount or flat-fee agent', guide: 'Listing-only services in DFW charge $500–$2,000 flat to list on MLS. You handle showings and negotiations. Buyer agent still expects BAC if representing a buyer. Hybrid models (1% listing + 2.5% BAC) are growing in DFW — saves seller $8–15K on median home.' },
  { label: 'Selling without an agent (FSBO)', guide: 'In DFW, FSBO accounts for ~7% of sales. You still may owe BAC (2–2.5%) if buyer has an agent. Use TREC forms — required in Texas for all residential transactions. FSBO homes in DFW sell for average 5–8% less than agent-listed — weigh carefully.' },
];

export default function DFWAgentCommissionGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          🤝 DFW Agent Commission Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Post-NAR settlement: how commissions work in DFW real estate today and what changed.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📰 What Changed in 2024–2025 (NAR Settlement)</div>
          {[
            ['Old Rule', 'Seller automatically offered BAC (buyer agent commission) in MLS'],
            ['New Rule', 'BAC no longer required — must be negotiated separately'],
            ['New Requirement', 'Buyer must sign Buyer Rep Agreement before touring any home'],
            ['DFW Reality', 'Most sellers still offer BAC (2–2.5%) to attract buyer agents'],
            ['Buyer Impact', 'If seller does not offer BAC, buyer pays agent out of pocket or rolls into price'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3054', gap: '1rem' }}>
              <span style={{ color: '#aac', fontSize: '0.9rem', minWidth: 160 }}>{label}</span>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>💲 Typical DFW Commission Rates 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {[['Listing Agent', '1.5–3%'], ['Buyer Agent', '2–3%'], ['Total (Full Service)', '4–5%'], ['Flat Fee Listing', '$500–$2,000']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem' }}>{val}</div>
                <div style={{ color: '#aac', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 Your Transaction Side — Commission Guide</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {sides.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📌 What You Need to Know</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{sides[selected].guide}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const scenarios = [
  { label: 'Single-family, low competition', rec: 'Lead with list price or slight discount. Standard TREC One to Four Family contract. 1% earnest money (min $1K). 30-day close. Full option period (7-10 days). Standard financing contingency.' },
  { label: 'Single-family, moderate competition', rec: 'Offer list price + escalation clause up to 3% over. 1.5% earnest money. Shorten option to 5 days. 21-day close if pre-underwritten. Appraisal gap coverage up to $10K.' },
  { label: 'Townhome/condo, hot area', rec: 'Escalate 2-4% over ask. 2% earnest money. 3-day option period with pre-inspection. Appraisal gap up to $15K. Ask listing agent preferred title company and closing date.' },
  { label: 'New construction', rec: 'Builders use their own contracts — not TREC. Negotiate upgrades not price. Builder rarely accepts escalation. Focus on rate buy-down concessions instead.' },
];

export default function DFWOfferLetterGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          📝 DFW Offer Letter Strategy Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Write winning offers on DFW homes using Texas TREC forms and seller-focused positioning.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Texas TREC Offer Essentials</div>
          {[
            ['Form Used', 'TREC One to Four Family Residential Contract'],
            ['Earnest Money Norm', '1–3% of purchase price (DFW standard)'],
            ['Option Fee', 'Typically $100–$500, paid within 3 days'],
            ['Option Period', '5–10 days (buyers waive for advantage)'],
            ['Financing Contingency', 'Built into TREC form (Third Party Financing Addendum)'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3054′ }}>
              <span style={{ color: '#aac', fontSize: '0.93rem' }}>{label}</span>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.93rem', textAlign: 'right', maxWidth: '55%' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏠 What DFW Sellers Actually Care About</div>
          {[
            ['💰 Price', 'Net proceeds after commissions and concessions'],
            ['✅ Certainty', 'Strong pre-approval, less contingencies = less risk'],
            ['📅 Timing', 'Close date matching seller\’s move-out timeline'],
            ['🔑 Possession', 'Leaseback option (seller stays after close) is often a win-win'],
          ].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem' }}>
              <span style={{ color: '#F5E642', minWidth: 28 }}>{icon}</span>
              <span style={{ color: '#dde', fontSize: '0.93rem' }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 Property Type + Competition</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📌 Offer Structure Recommendation</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{scenarios[selected].rec}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>⚙️ Escalation Clause Mechanics</div>
          <p style={{ color: '#ccd', fontSize: '0.93rem', lineHeight: 1.65 }}>
            An escalation clause states you will beat any bona fide competing offer by X dollars, up to your ceiling price. In DFW, common increments are $1K–$5K with caps of 3–5% over list. Sellers must provide proof of competing offer to trigger escalation. Some DFW agents reject escalation clauses and call for highest-and-best instead.
          </p>
        </div>
      </div>
    </div>
  );
}
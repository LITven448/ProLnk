import { useState } from 'react';

const situations = [
  { label: 'Listed under 7 days', strategy: 'Move fast: submit within 24-48 hrs, escalation clause up to 5% over asking, waive option period only if pre-inspected, 2% earnest money minimum.' },
  { label: '2-5 competing offers', strategy: 'Escalate $2,500 increments up to your ceiling, include appraisal gap coverage up to $15K, shorten close to 21 days if possible, strong pre-underwritten approval letter.' },
  { label: '6+ offers (hot home)', strategy: 'Lead with your best number immediately, offer 3% earnest money, appraisal gap up to $25K, escalation clause is table stakes — sellers may decline and request highest/best.' },
  { label: 'Investor-heavy competition', strategy: 'Highlight owner-occupant status, personal letter if permitted, flexible close date, full price + escalation, certified pre-approval from DFW lender.' },
];

export default function DFWMultipleOffersGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          🏆 DFW Multiple Offers Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Win in DFW multiple-offer situations with proven escalation and positioning strategies.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>📊 DFW Market Snapshot 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[['Avg Days on Market', '18 days'], ['Multiple Offer Rate', '62%'], ['Avg Over-Ask Premium', '2.8%']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.4rem' }}>{val}</div>
                <div style={{ color: '#aac', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🎯 Your Situation</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>✅ Recommended Strategy</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{situations[selected].strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚠️ DFW-Specific Warnings</div>
          {['Personal letters must comply with fair housing — avoid mentioning family or religion.',
            'Waiving option period removes your right to back out for any reason — only do this if pre-inspected.',
            'Escalation clauses require a cap — never leave open-ended.',
            'DFW sellers often counter with highest-and-best instead of accepting escalation clauses.'].map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>⚡</span>
              <span style={{ color: '#ccd', fontSize: '0.93rem' }}>{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

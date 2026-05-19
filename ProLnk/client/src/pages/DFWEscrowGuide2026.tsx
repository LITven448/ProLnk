import { useState } from 'react';

const stages = [
  { label: 'Offer Executed (Day 0)', status: 'Buyer delivers earnest money to title company within 24–48 hours of executed contract. Option fee paid to seller directly within 3 days.' },
  { label: 'Option Period (Days 1–7)', status: 'Buyer has unrestricted right to terminate. Inspections happen now. Title company opens escrow file and begins title search.' },
  { label: 'Under Contract (Days 8–20)', status: 'Lender orders appraisal. Title company clears title, researches liens and encumbrances. Buyer finalizes loan application.' },
  { label: 'Appraisal & Clear to Close (Days 21–35)', status: 'Appraisal results come in. Lender issues clear to close. Title company prepares closing disclosure (CD) — buyer gets 3 days to review.' },
  { label: 'Closing Day', status: 'Buyer signs at title company. Funds wire. Title company records deed with county. Keys released. Earnest money credited to buyer at closing.' },
];

export default function DFWEscrowGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          🔒 DFW Escrow Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Texas uses title companies for escrow — not escrow agents. Here is how every DFW transaction flows.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏢 Texas Escrow: Key Differences</div>
          {[
            ['Who Holds Escrow', 'Title company (not a separate escrow company)'],
            ['Earnest Money Deadline', '24–48 hours after executed contract'],
            ['Option Fee', 'Paid directly to seller — not held in escrow'],
            ['Title Search', 'Title company researches liens, judgments, and ownership history'],
            ['Typical Close Timeline', '30–45 days from executed contract'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3054' }}>
              <span style={{ color: '#aac', fontSize: '0.93rem' }}>{label}</span>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.93rem', textAlign: 'right', maxWidth: '55%' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🗓️ Transaction Stage — Escrow Status</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {stages.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📋 What Is Happening in Escrow</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{stages[selected].status}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💡 DFW Escrow Tips</div>
          {['Wire earnest money from a verified account — wire fraud is the #1 real estate scam in DFW.',
            'Confirm wire instructions by phone with title company before sending — never trust email-only instructions.',
            'Earnest money is at risk if buyer defaults without a valid contingency.',
            'Title insurance is required in DFW transactions — owner policy protects buyer, lender policy protects lender.'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>✔</span>
              <span style={{ color: '#ccd', fontSize: '0.93rem' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
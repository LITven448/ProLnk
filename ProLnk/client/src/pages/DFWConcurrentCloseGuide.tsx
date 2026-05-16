import { useState } from 'react';

const scenarios = [
  { label: 'Selling current DFW home + buying new DFW home same day', value: 'same_day' },
  { label: 'Buying in DFW, selling in another city', value: 'out_of_town' },
  { label: 'Investor flipping — buy, renovate later, sell old home', value: 'investor' },
  { label: 'Downsizing — using proceeds to buy smaller home', value: 'downsize' },
];

type Result = { feasibility: string; steps: string[]; risks: string[]; backup: string };

const results: Record<string, Result> = {
  same_day: {
    feasibility: '✅ Feasible — Very common in DFW. Both transactions close at same title company.',
    steps: [
      '1. Use same title company for both transactions if possible',
      '2. Schedule sale closing in AM, purchase closing in PM same day',
      '3. Proceeds wire from sale directly fund purchase closing',
      '4. Coordinate lenders — buyer lender for new home must know about same-day sale',
    ],
    risks: ['Buyer falls through on your sale last minute', 'Wire transfer delays between title companies', 'Lender funding delay on purchase side'],
    backup: 'Bridge loan pre-approval — draw it only if sale falls through day-of',
  },
  out_of_town: {
    feasibility: '⚠️ Feasible but complex — different title companies, different markets, time zones matter.',
    steps: [
      '1. Confirm both title companies can coordinate wire timing across states',
      '2. Allow 2+ business days for out-of-state wire settlement',
      '3. Consider closing sale first, using temporary housing, then close DFW purchase',
      '4. Remote online notarization (RON) available in Texas for signing flexibility',
    ],
    risks: ['Out-of-state closing delays ripple to DFW purchase', 'Different closing customs — some states use attorneys not title companies'],
    backup: 'Book short-term rental for 2–4 weeks as buffer between closes',
  },
  investor: {
    feasibility: '✅ Straightforward — no same-day dependency needed.',
    steps: [
      '1. Close on acquisition independently — no sale proceeds needed',
      '2. Sell existing property on your own timeline',
      '3. Use DSCR or hard money loan for acquisition if needed',
      '4. 1031 exchange possible if selling investment property',
    ],
    risks: ['Carrying two properties if old home sits longer than expected'],
    backup: 'List old home before or during acquisition due diligence period',
  },
  downsize: {
    feasibility: '✅ Excellent candidate for concurrent close — often funds the purchase fully.',
    steps: [
      '1. Negotiate sale close 1–2 hrs before purchase close',
      '2. Confirm purchase price can be covered by sale net proceeds',
      '3. Bring cashier check for any gap amount',
      '4. Arrange moving truck for same day — storage unit as buffer recommended',
    ],
    risks: ['Moving logistics stress', 'Undisclosed defects discovered in final walk-through of purchase'],
    backup: 'Short-term stay with family or hotel if purchase close is delayed',
  },
};

export default function DFWConcurrentCloseGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? results[selected] : null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📅🔄📅</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700 }}>DFW Concurrent Close Guide</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 16 }}>
            Buy and sell on the same day in DFW — coordination is everything.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a3a5c' }}>How Concurrent Closes Work in Texas</h2>
          <p style={{ color: '#444', lineHeight: 1.6, margin: '0 0 12px' }}>
            Texas title companies are experienced coordinators. You sell your home, proceeds wire to the title company, and the funds are applied to your new purchase — often within hours on the same day.
          </p>
          <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 14, fontSize: 14, color: '#2e7d32' }}>
            <strong>💡 Pro Tip:</strong> Using the same title company for both transactions dramatically reduces coordination risk and speeds up wire transfers.
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#1a3a5c' }}>🏘️ What is your situation?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {scenarios.map(s => (
              <button key={s.value} onClick={() => setSelected(s.value)}
                style={{ padding: '14px 18px', borderRadius: 8, border: selected === s.value ? '2px solid #1a3a5c' : '2px solid #e0e0e0', background: selected === s.value ? '#e8f0fb' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: selected === s.value ? 600 : 400, color: '#333' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: 24 }}>
              <h2 style={{ margin: '0 0 10px', fontSize: 18 }}>Feasibility Assessment</h2>
              <p style={{ margin: 0, fontSize: 16 }}>{result.feasibility}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>📋 Coordination Steps</h3>
              {result.steps.map((s, i) => <p key={i} style={{ margin: '0 0 8px', color: '#444', lineHeight: 1.5 }}>{s}</p>)}
            </div>
            <div style={{ background: '#fff3cd', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 12px', color: '#856404' }}>⚠️ Timing Risks</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#555' }}>
                {result.risks.map((r, i) => <li key={i} style={{ marginBottom: 6 }}>{r}</li>)}
              </ul>
            </div>
            <div style={{ background: '#e8f5e9', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 8px', color: '#2e7d32' }}>🛡️ Backup Plan</h3>
              <p style={{ margin: 0, color: '#444' }}>{result.backup}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

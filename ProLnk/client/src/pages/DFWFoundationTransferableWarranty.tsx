import { useState } from 'react';

const WARRANTY_TYPES = ['Lifetime transferable', '10-year transferable', '5-year non-transferable', 'No warranty offered'];
const TRANSFER_FEES = ['No fee', 'Under $500', '$500–$1,000', 'Over $1,000'];

type WarrantyResult = { rating: string; score: number; questions: string[]; flags: string[] };

const assessments: Record<string, WarrantyResult> = {
  'Lifetime transferable-No fee': { rating: 'Excellent', score: 95, questions: ['Does warranty cover all installed piers or just certain areas?', 'What voids the warranty (landscaping changes, additions, plumbing leaks)?', 'Is the company A-rated or accredited with a warranty backer?'], flags: [] },
  'Lifetime transferable-Under $500': { rating: 'Good', score: 82, questions: ['What triggers the transfer fee — sale only or any ownership change?', 'How long is the transfer window after closing?', 'Is there an inspection required at transfer?'], flags: ['Transfer fee reduces marketability slightly'] },
  'Lifetime transferable-$500–$1,000': { rating: 'Fair', score: 65, questions: ['Is fee negotiable at time of sale?', 'Does buyer know about fee upfront in disclosure?', 'Can you prepay transfer fee at installation?'], flags: ['High transfer fee is a buyer negotiation point', 'Some buyers may walk away'] },
  'Lifetime transferable-Over $1,000': { rating: 'Poor', score: 40, questions: ['Is this warranty backed by a third party or just the company?', 'What happens if company goes out of business?', 'Has anyone successfully transferred this warranty?'], flags: ['Fee exceeds typical buyer tolerance', 'Likely a sales tactic — not a real benefit', 'Verify company longevity before accepting'] },
  '10-year transferable-No fee': { rating: 'Good', score: 78, questions: ['When does the 10 years start — installation date or closing date?', 'Is the warranty prorated after 5 years?', 'Who backs the warranty if company folds?'], flags: ['10-year window may not cover full ownership period'] },
  '10-year transferable-Under $500': { rating: 'Acceptable', score: 62, questions: ['How many years remain at time of sale?', 'Is remaining coverage disclosed to buyers?'], flags: ['Short remaining term reduces value significantly'] },
  '10-year transferable-$500–$1,000': { rating: 'Poor', score: 38, questions: ['Is any portion of this warranty worth the fee?'], flags: ['Fee likely exceeds warranty value', 'Negotiate reduction or avoid this company'] },
  '10-year transferable-Over $1,000': { rating: 'Very Poor', score: 15, questions: ['Are you sure this warranty is real?'], flags: ['Red flag: high fee on limited warranty', 'Do not proceed without independent legal review'] },
  '5-year non-transferable-No fee': { rating: 'Below Average', score: 45, questions: ['What coverage exists for you personally?', 'Does warranty cover labor and materials?'], flags: ['Non-transferable warranties have zero resale value', 'May indicate company knows issues will resurface'] },
  '5-year non-transferable-Under $500': { rating: 'Very Poor', score: 20, questions: ['Why charge for a non-transferable warranty?'], flags: ['Fee for non-transferable warranty is unusual', 'Request removal of this fee in negotiation'] },
  '5-year non-transferable-$500–$1,000': { rating: 'Red Flag', score: 5, questions: ['Get a second opinion before signing'], flags: ['High fee, no transfer benefit = cash grab', 'Walk away or negotiate aggressively'] },
  '5-year non-transferable-Over $1,000': { rating: 'Red Flag', score: 0, questions: ['Do not sign this contract'], flags: ['This warranty structure is designed to extract money, not protect homeowners', 'Consult a real estate attorney'] },
  'No warranty offered-No fee': { rating: 'No Warranty', score: 0, questions: ['Why no warranty?', 'How long has the company been in business?', 'Do they use certified pier systems?'], flags: ['No warranty = no accountability', 'Avoid for major structural work'] },
  'No warranty offered-Under $500': { rating: 'N/A', score: 0, questions: [], flags: ['Fee with no warranty makes no sense — clarify what you are paying for'] },
  'No warranty offered-$500–$1,000': { rating: 'N/A', score: 0, questions: [], flags: ['Serious red flag — do not proceed'] },
  'No warranty offered-Over $1,000': { rating: 'N/A', score: 0, questions: [], flags: ['Walk away immediately'] },
};

const ratingColors: Record<string, string> = { Excellent: '#22C55E', Good: '#84CC16', Acceptable: '#EAB308', 'Below Average': '#F97316', Poor: '#EF4444', 'Very Poor': '#DC2626', 'Red Flag': '#991B1B', 'No Warranty': '#6B7280', 'N/A': '#6B7280', Fair: '#EAB308′ };

export default function DFWFoundationTransferableWarranty() {
  const [warrantyType, setWarrantyType] = useState('');
  const [transferFee, setTransferFee] = useState('');
  const key = warrantyType && transferFee ? `${warrantyType}-${transferFee}` : '';
  const result = key ? assessments[key] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>📜</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Foundation Transferable Warranty Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            A foundation warranty is only as good as what it actually covers and what it costs to transfer. In DFW's active 
            real estate market, a poorly structured warranty can hurt your home's resale value.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 What "Transferable" Actually Means</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            A transferable warranty moves to the new homeowner at the time of sale. It requires <strong style={{ color: '#F5E642′ }}>formal disclosure</strong> in the seller’s 
            disclosure form (required in Texas), a <strong style={{ color: '#F5E642′ }}>transfer notification to the company</strong> within 30–60 days of closing, 
            and sometimes a <strong style={{ color: '#F5E642′ }}>transfer fee</strong>. Lifetime means the company agrees to service the piers indefinitely — 
            but only if they're still in business.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Warranty Quality Evaluator</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Warranty Type</label>
              <select value={warrantyType} onChange={e => setWarrantyType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select warranty type</option>
                {WARRANTY_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Transfer Fee</label>
              <select value={transferFee} onChange={e => setTransferFee(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select transfer fee</option>
                {TRANSFER_FEES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: ratingColors[result.rating] || '#6B7280', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700 }}>{result.rating}</div>
                {result.score > 0 && <div style={{ color: '#9CA3AF' }}>Quality Score: <strong style={{ color: '#F5E642′ }}>{result.score}/100</strong></div>}
              </div>
              {result.flags.length > 0 && <div style={{ marginBottom: '0.8rem' }}><div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 4 }}>⚠️ Red Flags</div>{result.flags.map((f, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', marginBottom: 4 }}>• {f}</div>)}</div>}
              {result.questions.length > 0 && <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>❓ Ask These Questions</div>{result.questions.map((q, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', marginBottom: 4 }}>• {q}</div>)}</div>}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ How to Verify a Warranty is Still Valid</h2>
          {['Call the company with your warranty number and ask for written confirmation of active coverage.', 'Search Texas SOS (sos.state.tx.us) to confirm the business is still registered.', 'Ask your realtor to include warranty verification as a condition of sale if you\’re buying.', 'Keep all original paperwork, photos, and work orders — they\’re required for warranty claims.'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
              <span style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

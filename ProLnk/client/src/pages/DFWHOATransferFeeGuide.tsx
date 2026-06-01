import { useState } from 'react';

const situations = [
  { label: 'Buying a home in an HOA community', value: 'buyer' },
  { label: 'Selling a home in an HOA community', value: 'seller' },
  { label: 'Both buying and selling in HOA communities', value: 'both' },
  { label: 'Not sure if HOA applies to my transaction', value: 'unsure' },
];

type HOAResult = { payer: string; fees: string[]; documents: string[]; review: string[] };

const hoaResults: Record<string, HOAResult> = {
  buyer: {
    payer: 'Typically paid by Seller, but negotiate — ask for it in your offer.',
    fees: [
      'Resale Certificate fee: $200–$400 (document package summarizing HOA financials)',
      'Transfer fee: $100–$300 (paid to HOA to update ownership records)',
      'New owner setup fee: $50–$200 at some DFW HOAs',
    ],
    documents: [
      'Resale Certificate — required by Texas law (§207.003)',
      'Current HOA budget and reserve fund status',
      'Meeting minutes from last 12 months',
      'Rules, restrictions, and CC&Rs',
    ],
    review: [
      'Check reserve fund: underfunded HOAs risk special assessments',
      'Review any pending litigation against the HOA',
      'Look for rental restrictions if you plan to rent',
      'Ask about upcoming dues increases or rule changes',
    ],
  },
  seller: {
    payer: 'You typically pay transfer fees and the resale certificate cost.',
    fees: [
      'Resale Certificate: $200–$400 — you order and pay for this',
      'Transfer fee: $100–$300 — typically your responsibility',
      'Account statement/estoppel letter: $50–$200 some HOAs charge',
      'Unpaid dues or violations: settled at closing from proceeds',
    ],
    documents: [
      'Order resale certificate early — can take 5–10 business days in DFW',
      'Estoppel letter confirms your account is current',
      'Provide HOA contact info to title company immediately',
    ],
    review: [
      'Clear any open violations before listing — buyers will see them',
      'Confirm dues are current — liens can delay closing',
      'Ask HOA for balance confirmation in writing before listing',
    ],
  },
  both: {
    payer: 'You pay as seller on your sale, negotiate as buyer on your purchase.',
    fees: [
      'As seller: resale certificate (–) + transfer fee (–)',
      'As buyer: ask seller to cover transfer fee — common in DFW buyer requests',
      'Total exposure: $500–$1,500 across both transactions if not negotiated',
    ],
    documents: [
      'Order your sale resale certificate immediately — do not wait',
      'Review purchase resale certificate before option period expires',
      'Both HOA contact details to respective title companies',
    ],
    review: [
      'Same-day concurrent close: HOA payoff confirmation needed from both HOAs',
      'Verify both HOAs allow same-day ownership transfer processing',
      'Budget extra time if either HOA is slow to respond (some DFW HOAs take 10+ days)',
    ],
  },
  unsure: {
    payer: 'Check your address on Texas HOA search tools or ask your agent.',
    fees: [
      'Not all DFW neighborhoods have HOAs — many older neighborhoods do not',
      'Some communities have voluntary HOAs with no mandatory fees',
      'Deed restrictions may exist without a formal HOA board',
    ],
    documents: [
      'Ask title company to check for HOA liens during title search',
      'Review deed records at the county for any HOA covenants',
      'Your Realtor can confirm HOA status from MLS listing data',
    ],
    review: [
      'Even without HOA, deed restrictions (no RVs, fence height rules, etc.) may apply',
      'Check with city of Dallas/Fort Worth for any municipal deed overlays',
      'POA (Property Owner Associations) have similar requirements to HOAs',
    ],
  },
};

export default function DFWHOATransferFeeGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? hoaResults[selected] : null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏘️💸📋</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700 }}>DFW HOA Transfer Fee Guide</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 16 }}>
            Know exactly what HOA fees to expect — and who pays — before you close in DFW.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a3a5c' }}>HOA Fees at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Transfer Fee', value: '–', note: 'Typically seller pays' },
              { label: 'Resale Certificate', value: '–', note: 'Required by TX law' },
              { label: 'Setup Fee', value: '–', note: 'Some HOAs charge buyer' },
              { label: 'Estoppel Letter', value: '–', note: 'Account status snapshot' },
            ].map(item => (
              <div key={item.label} style={{ background: '#f0f4ff', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#1a3a5c', fontSize: 15 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c', margin: '4px 0' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#1a3a5c' }}>🏠 What is your situation?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSelected(s.value)}
                style={{ padding: '14px 18px', borderRadius: 8, border: selected === s.value ? '2px solid #1a3a5c' : '2px solid #e0e0e0', background: selected === s.value ? '#e8f0fb' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: selected === s.value ? 600 : 400, color: '#333' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#1a3a5c', borderRadius: 12, padding: 24, color: '#fff' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>💰 Who Pays?</h3>
              <p style={{ margin: 0, fontSize: 15 }}>{result.payer}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>📊 Expected Fees</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#444', lineHeight: 1.8 }}>
                {result.fees.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>📄 Required Documents</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#444', lineHeight: 1.8 }}>
                {result.documents.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
            <div style={{ background: '#fff8e1', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 12px', color: '#b8860b' }}>🔍 What to Review</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#555', lineHeight: 1.8 }}>
                {result.review.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

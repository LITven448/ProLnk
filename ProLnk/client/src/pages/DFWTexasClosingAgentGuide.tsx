import { useState } from 'react';

const transactionTypes = [
  { label: 'Buying a home (standard purchase)', value: 'buy' },
  { label: 'Selling a home (standard sale)', value: 'sell' },
  { label: 'Cash purchase — no lender involved', value: 'cash' },
  { label: 'Refinancing an existing mortgage', value: 'refi' },
];

type ClosingResult = { process: string[]; fees: string[]; bring: string[]; note: string };

const closingData: Record<string, ClosingResult> = {
  buy: {
    process: [
      '1. After accepted offer, buyer selects title company (or negotiate with seller)',
      '2. Title company opens escrow and orders title search — takes 3–5 days',
      '3. Title commitment issued — review Schedule B exceptions carefully',
      '4. Lender coordinates with title company for closing disclosure (CD)',
      '5. CD delivered 3 business days before closing — review all line items',
      '6. Closing day: sign at title company, lender funds, deed records same day',
    ],
    fees: [
      'Title insurance (owner policy): ~0.5–1% of purchase price — one-time, protects forever',
      'Title search/exam: –',
      'Closing/escrow fee: – split between buyer and seller',
      'Recording fee: – per document (deed + deed of trust)',
      'Survey: – if required by lender or HOA',
    ],
    bring: [
      'Government-issued photo ID (driver license or passport)',
      'Cashier check or wire confirmation for closing funds',
      'Proof of homeowner insurance (binder from insurer)',
      'Any remaining earnest money if not already deposited',
    ],
    note: 'Texas is a dry-funding state — lender must fund before deed records. Same-day recording is standard in Dallas and Tarrant counties.',
  },
  sell: {
    process: [
      '1. Open title with company of choice — DFW agents often have preferred partners',
      '2. Title company orders payoff statement from your lender',
      '3. Any liens (HOA, mechanics, IRS) flagged and must clear before closing',
      '4. Review closing disclosure: verify your net proceeds line',
      '5. Sign seller documents (deed, affidavits) — often done remotely via RON in Texas',
      '6. Proceeds wire to you typically within 24 hrs of funding',
    ],
    fees: [
      'Owner title policy: seller typically pays in DFW — ~0.5–1% of price',
      'Closing/escrow fee: ~– (split or seller pays per contract)',
      'Texas has no transfer/documentary stamp tax — major savings vs. other states',
      'HOA resale certificate: – if applicable',
      'Agent commissions: negotiated separately, paid from proceeds',
    ],
    bring: [
      'Photo ID — seller must verify identity for deed signing',
      'Bank wire instructions for proceeds (voided check or bank letter)',
      'Keys, garage openers, and access codes to hand over at closing',
      'Any warranty documents or appliance manuals per contract',
    ],
    note: 'Sellers in Texas do NOT have to be present in person — remote online notarization (RON) is legal and widely used in DFW.',
  },
  cash: {
    process: [
      '1. Open title immediately after contract execution',
      '2. Title search and commitment: 3–5 business days',
      '3. No lender to coordinate — closing can happen in as few as 7 days',
      '4. Wire full purchase price + closing costs to title escrow before closing day',
      '5. Sign cash buyer closing documents (shorter than financed closing)',
      '6. Deed records same day in most DFW counties',
    ],
    fees: [
      'Title insurance (optional for cash buyers, highly recommended): ~0.5% of price',
      'Title search: –',
      'Closing fee: – (no lender fee)',
      'Recording: –',
      'No appraisal required — saves – vs financed purchase',
    ],
    bring: [
      'Photo ID',
      'Wire confirmation showing funds sent to title escrow',
      'No lender docs needed — simplified signing package',
    ],
    note: 'Cash closings in DFW can close in 7–10 days. This speed is a major negotiating advantage in competitive DFW neighborhoods.',
  },
  refi: {
    process: [
      '1. Lender orders new title search and title insurance (lender policy required)',
      '2. Title company coordinates closing disclosure with lender',
      '3. 3-day right of rescission: you have 3 days after signing to cancel',
      '4. Funding occurs after rescission period ends (day 4)',
      '5. Old lien paid off, new deed of trust recorded',
    ],
    fees: [
      'Lender title policy (required by lender): –,500 depending on loan amount',
      'Owner title policy update (optional but cheap): –',
      'Closing/escrow fee: –',
      'Recording: – for new deed of trust',
    ],
    bring: [
      'Photo ID',
      'Proof of homeowner insurance',
      'Any funds required for escrow impound setup',
    ],
    note: 'Texas has unique refinance rules — cash-out refis are limited to 80% LTV by Texas Constitution, and you can only do one cash-out refi per year.',
  },
};

export default function DFWTexasClosingAgentGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? closingData[selected] : null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏛️✍️🔑</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700 }}>Texas Closing Agent Guide</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 16 }}>
            In Texas, title companies handle closings — no attorney required. Here is exactly how it works in DFW.
          </p>
        </div>

        <div style={{ background: '#e8f5e9', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a3a5c' }}>🌟 Texas Closing Advantage</h2>
          <p style={{ margin: 0, color: '#444', lineHeight: 1.6 }}>
            Unlike states that require real estate attorneys at closing (NY, MA, GA), <strong>Texas uses title companies</strong> — faster, cheaper, and more efficient. DFW title companies are highly experienced and often close in under 30 minutes.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#1a3a5c' }}>📋 Select your transaction type</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {transactionTypes.map(t => (
              <button key={t.value} onClick={() => setSelected(t.value)}
                style={{ padding: '14px 18px', borderRadius: 8, border: selected === t.value ? '2px solid #1a3a5c' : '2px solid #e0e0e0', background: selected === t.value ? '#e8f0fb' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: selected === t.value ? 600 : 400, color: '#333' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>🔄 Closing Process</h3>
              {result.process.map((p, i) => <p key={i} style={{ margin: '0 0 8px', color: '#444', lineHeight: 1.5 }}>{p}</p>)}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>💰 Expected Fees</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#444', lineHeight: 1.8 }}>
                {result.fees.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div style={{ background: '#e8f0fb', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 12px', color: '#1a3a5c' }}>🎒 What to Bring</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#444', lineHeight: 1.8 }}>
                {result.bring.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div style={{ background: '#1a3a5c', borderRadius: 12, padding: 24, color: '#fff' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>📌 Texas-Specific Note</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{result.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

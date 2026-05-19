import { useState } from 'react';

const LOAN_TYPES = [
  { id: 'conventional', label: 'Conventional', giftRules: 'If down payment is 20%+: 100% can be gift. If <20%: gift allowed with conditions.', maxGift: 'Unlimited if 20%+ down', docReqs: ['Gift letter signed by donor', 'Bank statement showing transfer', 'Donor bank statement showing funds available', 'No repayment clause in letter'] },
  { id: 'fha', label: 'FHA Loan', giftRules: '100% of down payment can be a gift. FHA is most gift-friendly. Most common for first-time DFW buyers.', maxGift: '100% of down payment', docReqs: ['Gift letter with donor relationship', 'Bank statement showing transfer', 'Donor statement showing funds leaving account', 'FHA-specific gift letter wording'] },
  { id: 'va', label: 'VA Loan', giftRules: 'Gift funds allowed. VA borrowers often put $0 down, so gifts typically go toward closing costs.', maxGift: 'Unlimited', docReqs: ['Gift letter', 'Transfer documentation', 'No repayment clause'] },
  { id: 'conventional5', label: 'Conventional 5% Down', giftRules: 'Gift funds can cover entire down payment. Donor must be family member or domestic partner.', maxGift: 'Full down payment allowed', docReqs: ['Gift letter with family relationship stated', 'Bank statements (both parties)', 'Paper trail showing transfer', 'No repayment language'] },
];

const RED_FLAGS = [
  { flag: '"Loan" language in gift letter', detail: 'If letter mentions repayment at any point, lender counts it as debt, increasing your DTI.' },
  { flag: 'Undocumented cash deposits', detail: 'Cash gifts without a paper trail cannot be used. Lenders require bank-to-bank transfers.' },
  { flag: 'Gift from non-allowed sources', detail: 'Conventional loans require gifts from family, employer, or nonprofit. Gifts from sellers are not allowed.' },
  { flag: 'Deposited too recently', detail: 'Most lenders require gift funds to be "seasoned" (in account 2-3 months) or have full documentation of the transfer.' },
  { flag: 'Missing donor bank statement', detail: 'The lender needs to see the funds leave the donor account, not just arrive in yours.' },
];

export default function DFWGiftFundsGuide() {
  const [loanTypeIdx, setLoanTypeIdx] = useState(1);
  const [giftAmount, setGiftAmount] = useState(30000);
  const [homePrice, setHomePrice] = useState(350000);

  const loan = LOAN_TYPES[loanTypeIdx];
  const downFHA = homePrice * 0.035;
  const downConv = homePrice * 0.05;
  const giftCoversDown = giftAmount >= (loanTypeIdx === 1 ? downFHA : downConv);
  const giftCoversPartial = !giftCoversDown && giftAmount > 0;
  const closingCosts = homePrice * 0.025;
  const totalNeeded = (loanTypeIdx === 1 ? downFHA : downConv) + closingCosts;
  const stillNeeded = Math.max(0, totalNeeded - giftAmount);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>🎁 DFW Gift Funds Guide</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>How to use family money for your DFW home purchase — rules, documentation, and traps to avoid.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>💡 What Are Gift Funds?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Gift funds are money given to you by a family member (parents, grandparents, siblings, in-laws) to help with your down payment or closing costs. The key rule: it must be a TRUE gift — no repayment expected or implied.</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>📋 Select Your Loan Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {LOAN_TYPES.map((t, i) => (
              <div key={i} onClick={() => setLoanTypeIdx(i)} style={{
                border: `2px solid ${loanTypeIdx === i ? '#F5E642' : '#e2e8f0'}`,
                borderRadius: 8, padding: '0.75rem', cursor: 'pointer',
                background: loanTypeIdx === i ? '#fefce8' : '#fff', fontWeight: loanTypeIdx === i ? 700 : 400
              }}>{t.label}</div>
            ))}
          </div>
          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{loan.label} Gift Rules</div>
            <div style={{ fontSize: 14, color: '#475569' }}>{loan.giftRules}</div>
            <div style={{ marginTop: 8, fontWeight: 600, color: '#22c55e', fontSize: 13 }}>Max Gift Allowed: {loan.maxGift}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🧮 Gift Impact Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Gift Amount ($)</label>
              <input type="number" value={giftAmount} onChange={e => setGiftAmount(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>DFW Home Price ($)</label>
              <input type="number" value={homePrice} onChange={e => setHomePrice(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
          </div>
          {[
            { label: loanTypeIdx === 1 ? 'FHA Down Payment (3.5%)' : 'Down Payment (5%)', val: loanTypeIdx === 1 ? downFHA : downConv },
            { label: 'DFW Closing Costs (2.5%)', val: closingCosts },
            { label: 'Total Cash Needed', val: totalNeeded },
            { label: 'Gift Covers', val: Math.min(giftAmount, totalNeeded) },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9', fontWeight: i === 3 ? 700 : 400 }}>
              <span>{r.label}</span><span style={{ color: i === 3 ? '#22c55e' : '#0A1628' }}>${Math.round(r.val).toLocaleString()}</span>
            </div>
          ))}
          {stillNeeded > 0 && <div style={{ marginTop: 12, background: '#fef3c7', borderRadius: 8, padding: '0.75rem', fontSize: 14 }}>⚠️ You still need ${Math.round(stillNeeded).toLocaleString()} from your own funds after the gift.</div>}
          {giftCoversDown && <div style={{ marginTop: 12, background: '#dcfce7', borderRadius: 8, padding: '0.75rem', fontSize: 14 }}>✅ This gift fully covers your down payment requirement!</div>}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>📄 Documentation Checklist</h2>
          {loan.docReqs.map((req, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 18 }}>☐</span>
              <span>{req}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642' }}>🚨 Red Flags That Kill Gift Fund Deals</h2>
          {RED_FLAGS.map((r, i) => (
            <div key={i} style={{ background: '#7c2d12', borderRadius: 8, padding: '0.75rem', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#fed7aa' }}>⚠️ {r.flag}</div>
              <div style={{ color: '#fca5a5', fontSize: 13, marginTop: 4 }}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

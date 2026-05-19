import { useState } from 'react';

const txTypes = [
  { id: 'purchase', label: 'Home Purchase', how: 'Blockchain-recorded title eliminates the 3–5 day title search. Smart contract releases funds when all conditions are verified automatically — inspection, appraisal, and lender approval flags on-chain. DFW closings could shrink from 30 days to 10.', status: 'Pilot phase in Harris County TX. TREC monitoring developments for DFW adoption in 2026–2027.', savings: '$1,200–$2,400 in title/closing fees' },
  { id: 'refi', label: 'Refinance', how: 'Your property record is already on-chain from purchase. Lender reads verified title history instantly. No new title search needed. Appraisal data can be blockchain-verified from previous transaction, reducing redundant costs.', status: 'Several DFW credit unions exploring blockchain mortgage pilots as of early 2026.', savings: '$800–$1,800 in title + recording fees' },
  { id: 'heloc', label: 'HELOC / Equity Loan', how: 'Lender confirms equity position via on-chain title and recorded lien history in minutes. No manual title rundown. Smart contract enforces draw limits and auto-records lien changes as you borrow and repay.', status: 'Concept stage for DFW — traditional HELOC process still standard. Watch 2026–2028.', savings: '$400–$900 in title fees' },
  { id: 'permit', label: 'Permit & HOA Records', how: 'Building permits, HOA violations, and code enforcement actions recorded on blockchain provide buyers a verified, tamper-proof history. DFW buyers could see full permit history without FOIA requests or title company research.', status: 'Fort Worth piloting digital permit records. Dallas exploring blockchain integration for 2027.', savings: '$200–$600 in due diligence costs' },
];

export default function DFWBlockchainPropertyGuide() {
  const [selected, setSelected] = useState('purchase');
  const tx = txTypes.find(t => t.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⛓️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>Blockchain Property Records Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>What DFW homeowners need to know about digital property titles, blockchain records, and how they could change Texas real estate</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📚 Blockchain Property Basics for DFW Owners</h2>
          {[
            ['🔐', 'What It Is', 'A blockchain property record is a tamper-proof digital ledger entry recording ownership, liens, and title history — updated automatically when a transaction closes.'],
            ['📜', 'Texas Context', 'Texas counties handle property records independently. Tarrant and Dallas counties are both evaluating digital record modernization as part of broader Gov 2.0 initiatives.'],
            ['⚡', 'The Speed Promise', 'Traditional DFW title search: 3–5 business days. Blockchain title search: minutes. For sellers, this means faster closes and fewer failed transactions from title surprises.'],
            ['🛡️', 'Fraud Prevention', 'Title fraud is a growing DFW problem. Blockchain creates a cryptographically verified chain of ownership that cannot be forged or altered — protecting your equity.'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, marginBottom: 14, background: '#0A1628', borderRadius: 12, padding: 14 }}>
              <span style={{ fontSize: 26 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🏠 Transaction Type → Blockchain Impact</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select your transaction type to see how blockchain could affect your DFW real estate deal:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {txTypes.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === t.id ? '#F5E642′ : '#1e3a5f', background: selected === t.id ? '#F5E642' : ’transparent', color: selected === t.id ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{t.label}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⛓️ How Blockchain Changes This</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{tx.how}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#94a3b8', fontWeight: 700, marginBottom: 8, fontSize: 13 }}>📍 DFW Status</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{tx.status}</div>
            </div>
            <div style={{ background: '#003d1a', borderRadius: 12, padding: 16, border: '1px solid #006630′ }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8, fontSize: 13 }}>💰 Potential Savings</div>
              <div style={{ color: '#22c55e', fontSize: 20, fontWeight: 800 }}>{tx.savings}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ProLnk Keeps Your Home Data Ready for What Comes Next</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>Your Home Health Vault data is structured to integrate with emerging blockchain property systems — future-proofing your biggest asset.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const scenarios = [
  {
    key: 'relocation',
    label: 'Out-of-State Relocation',
    emoji: '✈️',
    canDoMultiple: true,
    explanation: 'Yes — relocating buyers commonly go under contract on 2 homes simultaneously when moving to DFW from another state. You may make an offer on your "backup" while awaiting inspection results on your first choice.',
    howItWorks: ['Offer on Home A — under contract with option period (7-10 days)', 'Find Home B you also love — submit offer before releasing Home A option', 'During option period on Home A, evaluate both', 'Terminate one option before option period expires', 'You forfeit option fee (~$200-$500) on the terminated contract — not earnest money'],
    legalNote: 'Fully legal in Texas. Both contracts must be executed in good faith. You cannot simultaneously close on two homes unless you intend to own both.',
    agentNote: 'Tell your agent upfront. Most experienced DFW agents understand relocation scenarios. Some agents will refuse — find one who handles relocation.',
    risks: ['Option fees on both contracts ($200-$500 each)', 'Emotional stress of managing two negotiations', 'Seller may find out and feel misled (transparency recommended)'],
  },
  {
    key: 'backup',
    label: 'Backup Contract Position',
    emoji: '📋',
    canDoMultiple: true,
    explanation: 'In DFW\’s competitive market, a seller may accept your offer as a "backup contract" while already under contract. This is a distinct legal position — you are second in line.',
    howItWorks: ['Seller accepts your offer in "backup position" — marked in MLS', 'If primary contract falls through, yours automatically activates', 'You cannot actively pursue that home while in backup position', 'Primary buyers have incentive to terminate during option — backup activates immediately'],
    legalNote: 'Texas backup contracts are a standard TREC addendum. You can simultaneously be shopping other homes while in backup position on one property.',
    agentNote: 'Being in backup is not the same as being under contract. You can and should continue shopping until backup activates.',
    risks: ['Uncertain timeline — could activate in 3 days or 3 months', 'Earnest money tied up during backup period', 'May miss other opportunities while waiting'],
  },
  {
    key: 'investor',
    label: 'Investment / Portfolio Buyer',
    emoji: '💼',
    canDoMultiple: true,
    explanation: 'Investors routinely submit offers on multiple DFW properties simultaneously. This is standard practice — real estate investing is speculative by nature.',
    howItWorks: ['Submit offers on multiple investment properties at once', 'Negotiate each independently', 'Exercise option on best opportunity, terminate others', 'Some investors close on multiple properties in same month'],
    legalNote: 'Legal with no restrictions as an investor. Option fees are the cost of evaluating multiple opportunities simultaneously.',
    agentNote: 'Work with a DFW investor-specialist agent who understands volume contract management and won\’t be put off by the process.',
    risks: ['Option fees accumulate across multiple contracts', 'Earnest money exposure if you default outside option period', 'Reputation with DFW agents if you terminate too often without good cause'],
  },
  {
    key: 'primary_resident',
    label: 'Primary Residence Buyer',
    emoji: '🏠',
    canDoMultiple: false,
    explanation: 'While technically legal, being under contract on two homes you intend to use as a primary residence creates ethical and practical problems in DFW.',
    howItWorks: ['You can be under contract on two homes during option periods', 'Texas law does not prohibit this', 'However, you cannot close on two primary residences', 'Lenders will question two simultaneous loan applications'],
    legalNote: 'Mortgage fraud risk: applying for two owner-occupied mortgages simultaneously can trigger lender fraud investigations. Do not do this without legal counsel.',
    agentNote: 'Most ethical agents will advise against this for primary residence buyers. Stick to option periods only — never beyond.',
    risks: ['Lender fraud investigation if two loan apps submitted', 'Earnest money loss if terminated outside option', 'Damaged relationships with DFW agents and sellers'],
  },
];

export default function DFWMultipleHomeContractGuide() {
  const [buyerSituation, setBuyerSituation] = useState('');
  const selected = scenarios.find(s => s.key === buyerSituation);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📄📄</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Multiple Home Contracts in DFW</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>Can you be under contract on two homes at once? Yes — sometimes. Here\'s when it makes sense.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#DBEAFE', border: '2px solid #3B82F6', borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 15 }}>📋 The Key Distinction: Option Period vs. Closing</p>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 2 }}>
            <li><strong>During option period</strong> (7-10 days in DFW): You can back out for any reason, lose only the option fee ($200-$500)</li>
            <li><strong>After option period:</strong> Terminating puts earnest money (1-2% of price) at risk</li>
            <li><strong>Multiple contracts during option periods</strong> = legal and common for relocation/investors</li>
            <li><strong>Multiple closings</strong> = only legal if you intend to own both properties</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Select Your Buyer Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {scenarios.map(s => (
            <div key={s.key} onClick={() => setBuyerSituation(s.key)} style={{ background: buyerSituation === s.key ? '#0A1628' : '#fff', color: buyerSituation === s.key ? '#fff' : '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${buyerSituation === s.key ? '#F5E642' : '#E2E8F0'}`, cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.emoji}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{s.label}</h3>
              <div style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, display: 'inline-block', background: s.canDoMultiple ? '#DCFCE7' : '#FEE2E2', color: s.canDoMultiple ? '#166534' : '#991B1B', fontWeight: 700 }}>
                {s.canDoMultiple ? '✅ Multiple Contracts: Generally OK' : '⚠️ Multiple Contracts: Use Caution'}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{selected.emoji}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{selected.label}</h3>
                <div style={{ fontSize: 12, marginTop: 4, padding: '3px 10px', borderRadius: 20, display: 'inline-block', background: selected.canDoMultiple ? '#DCFCE7' : '#FEE2E2', color: selected.canDoMultiple ? '#166534' : '#991B1B', fontWeight: 700 }}>
                  {selected.canDoMultiple ? '✅ Multiple Contracts Generally Appropriate' : '⚠️ Proceed with Caution'}
                </div>
              </div>
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 14, marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
              {selected.explanation}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📋 How This Works in DFW</p>
                {selected.howItWorks.map((h, i) => <div key={i} style={{ fontSize: 13, padding: '5px 0', borderBottom: '1px solid #F1F5F9' }}>Step {i+1}: {h}</div>)}
                <div style={{ marginTop: 16, background: '#DBEAFE', borderRadius: 8, padding: 10 }}>
                  <p style={{ margin: 0, fontSize: 12 }}>⚖️ <strong>Legal Note:</strong> {selected.legalNote}</p>
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🤝 What to Tell Your Agent</p>
                <div style={{ background: '#F0FDF4', borderRadius: 8, padding: 10, marginBottom: 16, fontSize: 13 }}>{selected.agentNote}</div>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚠️ Risks to Know</p>
                {selected.risks.map((r, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9', color: '#DC2626' }}>• {r}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

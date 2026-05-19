import { useState } from 'react';

const SITUATIONS = [
  {
    type: "Contractor Filed a Lien",
    icon: '🔨',
    steps: ['Verify lien was filed within 15 days of contract start (perfected mechanic’s lien in TX)', 'Pull lien from Tarrant or Dallas County Clerk — confirm it’s valid', 'Dispute with contractor in writing within 30 days', 'Request itemized accounting of unpaid balance', 'If legitimate, negotiate lien release in exchange for payment'],
    timeline: '4–16 weeks to resolve depending on dispute complexity',
    cost: 'Lien release negotiation: $300–$800 | Lien bond to release: 1.5x lien amount | Litigation: $5,000–$25,000'
  },
  {
    type: 'HOA Assessment Lien',
    icon: '🏘️',
    steps: ['Pull HOA lien from county clerk to verify amount', 'Request itemized accounting from HOA board', 'Pay or dispute through HOA dispute resolution process', 'Texas HOA Reform Act: right to 45-day notice before foreclosure', 'Negotiate payment plan — HOAs generally prefer payment over foreclosure'],
    timeline: '30–90 days to resolve with payment or negotiation',
    cost: 'Lien payoff: assessed amount + penalties + attorney fees | Payment plan: may waive penalties'
  },
  {
    type: 'Tax Lien',
    icon: '📋',
    steps: ['Check tax lien at county appraisal district website', 'Delinquent taxes accrue 12% interest per year plus penalties', 'Pay immediately or enter installment agreement with county', 'Seek homestead exemption if not applied', 'Contact county tax assessor for hardship deferral (65+ or disabled)'],
    timeline: 'Immediate action critical — county can foreclose after 2 years delinquent',
    cost: 'Tax payoff + interest + penalties | Tax loan to cure: 8–12% interest | Deferral: available for eligible homeowners'
  },
  {
    type: 'How to Protect Yourself',
    icon: '🛡️',
    steps: ['Get lien waiver from contractor before each payment', 'Use joint checks payable to contractor AND all subcontractors', 'Require contractor to provide lien releases from all subs', 'Do not pay final draw until you have final unconditional lien waiver', 'Check for existing liens at county clerk before starting large projects'],
    timeline: 'Best done before project starts — retroactive protection is limited',
    cost: 'Lien waiver templates: free | Attorney review of contracts: $300–$600'
  }
];

export default function DFWLienGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? SITUATIONS[selected] : null;

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Lien Guide for DFW Homeowners</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0 }}>Mechanic's liens, HOA liens, tax liens — how to find them, fight them, and prevent them.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#FFF7ED', border: '2px solid #FCD34D', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <strong style={{ color: '#92400E' }}>🔍 Check for Liens Free:</strong>
          <span style={{ color: '#78350F', fontSize: 14 }}> Dallas County Clerk: dallascountytx.gov | Tarrant County: tarrantcounty.com | Collin County: collincountytx.gov — search by property address or owner name.</span>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Your lien situation:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {SITUATIONS.map((s, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#0A1628' : '#FFFFFF', border: `2px solid ${selected === i ? '#F5E642' : '#E5E7EB'}`, borderRadius: 10, padding: '16px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected === i ? '#F5E642' : '#1A2B3C' }}>{s.type}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 14, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>{item.icon} {item.type}</h2>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#374151', letterSpacing: 1, marginBottom: 12 }}>ACTION STEPS</h3>
            <ol style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {item.steps.map((s, i) => <li key={i} style={{ fontSize: 14, color: '#4B5563', marginBottom: 8, lineHeight: 1.5 }}>{s}</li>)}
            </ol>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#F0F4FF', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>⏱️ TIMELINE</div>
                <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{item.timeline}</p>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 4 }}>💰 COST</div>
                <p style={{ fontSize: 13, color: '#78350F', margin: 0 }}>{item.cost}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function ProLnkForInsuranceAgents() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is this a referral arrangement I need to disclose to my clients?',
      a: 'ProLnk referral fees are paid as marketing compensation, not insurance-regulated kickbacks. Consult your E&O carrier and state insurance department for disclosure requirements in your state.',
    },
    {
      q: 'Do I need to be licensed as a contractor to participate?',
      a: 'No. You earn income as a referral partner, not a contractor. You refer homeowners to the ProLnk network; licensed contractors do the work.',
    },
    {
      q: 'How do I track my earnings?',
      a: 'Your ProLnk partner dashboard shows all referral activity, job completions, and earnings in real time. Payouts processed monthly.',
    },
  ];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#0F2137', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#0F2137', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Pro</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#FACC15', letterSpacing: -0.5 }}>Lnk</span>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ display: 'inline-block', background: '#FEF9C3', color: '#854D0E', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
          For Insurance Professionals
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: '#0F2137' }}>
          ProLnk for Insurance Agents
        </h1>
        <p style={{ fontSize: 20, color: '#475569', marginBottom: 48, maxWidth: 620 }}>
          A New Income Stream From Your Existing Network
        </p>

        <div style={{ background: '#0F2137', borderRadius: 14, padding: '32px 36px', marginBottom: 48, color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>The Opportunity</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.75, fontSize: 16 }}>
            You already know which homes have issues. After every hail claim, every water loss, every wind event — you're on the phone recommending contractors. <strong style={{ color: '#fff' }}>ProLnk pays you for those recommendations</strong> and connects contractors with homeowners who need quotes.
          </p>
          <p style={{ color: '#FACC15', fontWeight: 700, marginTop: 16, fontSize: 15 }}>
            "After every hail claim, you're recommending roofers. With ProLnk, those recommendations earn you income."
          </p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>How Insurance Agents Earn</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            {
              icon: '🏠',
              stream: 'Homeowner Referrals',
              detail: '$25–$100 per qualified homeowner added to the TrustyPro network',
              sub: 'Every client with a damage claim is a qualified referral.',
            },
            {
              icon: '🔗',
              stream: 'Contractor Partner Referrals',
              detail: '7% of commission income from licensed contractors you recruit as ProLnk partners',
              sub: 'Recruit the roofer you've been recommending for years.',
            },
            {
              icon: '🏛️',
              stream: 'Origination Rights (Founding Tier)',
              detail: '1.5% of future service commissions on every home you add to the vault — permanently',
              sub: 'Available to Founding tier partners only.',
            },
          ].map(({ icon, stream, detail, sub }) => (
            <div key={stream} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '24px' }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: '12px 0 8px', color: '#0F2137' }}>{stream}</h3>
              <p style={{ color: '#1E3A5F', fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{detail}</p>
              <p style={{ color: '#64748B', fontSize: 13 }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '28px 32px', marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Why It Fits Your Workflow</h2>
          <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: 12 }}>
            Insurance agents are already the most trusted referral source for home contractors in the DFW market. When a client has a loss, they call their agent. ProLnk formalizes that workflow into a tracked, compensated referral system.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Hail claim? Refer to ProLnk roofing contractors → earn $25–$100 + network income',
              'Water loss? Refer to plumbing + restoration contractors → earn on every job',
              'Pre-renewal inspection? Add the home to TrustyPro vault → earn origination rights forever',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, color: '#374151', fontSize: 15 }}>
                <span style={{ color: '#FACC15', fontSize: 18 }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Common Questions</h2>
        <div style={{ marginBottom: 48 }}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 0',
                  background: 'none',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#0F2137',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {q}
                <span style={{ color: '#FACC15', fontSize: 18 }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, paddingBottom: 16 }}>{a}</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/apply"
            style={{
              display: 'inline-block',
              background: '#0F2137',
              color: '#FACC15',
              fontWeight: 800,
              fontSize: 17,
              padding: '18px 44px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Apply as a Partner →
          </a>
          <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 12 }}>DFW insurance agents only. Limited Founding tier spots available.</p>
        </div>

      </div>
    </div>
  );
}

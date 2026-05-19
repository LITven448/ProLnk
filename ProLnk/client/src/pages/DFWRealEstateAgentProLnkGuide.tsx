import { useState } from 'react';

const streams = [
  { icon: '🏡', title: 'Origination Rights', desc: 'Earn a permanent revenue share for every home you onboard to the ProLnk Vault.' },
  { icon: '💼', title: 'Referral Commissions', desc: 'Refer new homeowners and pros — earn recurring income from their activity.' },
  { icon: '🔗', title: 'Network Overrides', desc: 'Build a referral network up to 4 levels deep with cascade commissions.' },
  { icon: '📈', title: 'Subscription Overrides', desc: 'Earn 10% recurring on every Pro subscription you refer.' },
];

const faqs = [
  { q: 'Does this conflict with my real estate license?', a: 'No. ProLnk referral income is classified as marketing compensation, not a real estate commission. Consult your broker to confirm compliance with your brokerage agreement.' },
  { q: 'When do I get paid?', a: 'Origination rights pay monthly as long as homes you enrolled remain active. Referral commissions pay within 30 days of a confirmed match.' },
  { q: 'How do I onboard a home?', a: 'After a closing, invite your buyer to register their new home in ProLnk\’s Home Health Vault. Takes 3 minutes and locks in your origination rights permanently.' },
];

export default function DFWRealEstateAgentProLnkGuide() {
  const [closings, setClosings] = useState(24);
  const [avgHomeValue, setAvgHomeValue] = useState(450000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const annualHomes = closings;
  const referralIncome = Math.round(annualHomes * 125);
  const originationValue = Math.round(annualHomes * avgHomeValue * 0.00015 * 12);
  const networkIncome = Math.round(annualHomes * 38);
  const totalEstimate = referralIncome + originationValue + networkIncome;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Real Estate Agents</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>Turn every closing into a long-term income stream</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Why Real Estate Agents Partner with ProLnk</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 16 }}>
            The moment a buyer gets keys is the moment they need contractors — movers, painters, HVAC tune-ups, landscapers.
            ProLnk captures that demand and shares the revenue with the agent who made the introduction. Better yet, registering
            each home in the ProLnk Home Health Vault locks in <strong>origination rights</strong>: a permanent slice of every
            service transaction at that address, forever.
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            For DFW agents closing 20–50 homes a year, ProLnk can add $15K–$60K+ in supplemental annual income without changing
            how you work — just one extra conversation at the closing table.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {streams.map((s) => (
            <div key={s.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Your ProLnk Income Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Annual Closings</label>
              <input type="range" min={5} max={150} value={closings} onChange={(e) => setClosings(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{closings}</div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Avg Home Value</label>
              <input type="range" min={200000} max={1500000} step={25000} value={avgHomeValue} onChange={(e) => setAvgHomeValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>${(avgHomeValue / 1000).toFixed(0)}K</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Referral Income', value: `$${referralIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Origination Rights', value: `$${originationValue.toLocaleString()}`, sub: 'annual residual' },
              { label: 'Network Override', value: `$${networkIncome.toLocaleString()}`, sub: 'per year' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Estimated Total Annual ProLnk Income</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>${totalEstimate.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Based on DFW market averages. Actual results vary.</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>❓ Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: 16, marginBottom: 16 }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: 15, width: '100%', padding: 0, color: '#1a2233' }}>
                {openFaq === i ? '▼' : '▶'} {faq.q}
              </button>
              {openFaq === i && <p style={{ margin: '10px 0 0 20px', color: '#4a5568', lineHeight: 1.6 }}>{faq.a}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to Add ProLnk to Your Business?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Join the DFW agent network. Lock in Charter-tier pricing before the waitlist closes at 500 applications.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Partner Agent →
          </a>
        </div>
      </div>
    </div>
  );
}

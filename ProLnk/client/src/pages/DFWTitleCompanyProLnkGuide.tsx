import { useState } from 'react';

const opportunities = [
  { icon: '📦', title: 'ProLnk Welcome Kits', desc: 'Co-brand a ProLnk enrollment kit for every closing packet. Buyers leave the table with immediate contractor access.' },
  { icon: '💰', title: 'Closing Table Referrals', desc: 'The most receptive moment for a home services referral is the exact second a buyer gets keys.' },
  { icon: '🤝', title: 'B2B Partnership Model', desc: 'Title companies partner at the business level — not just individual referrals. Revenue shares scale with closing volume.' },
  { icon: '🏠', title: 'Origination Rights at Closing', desc: 'Register every home you close and lock in a permanent revenue share on every future service transaction.' },
];

const kitContents = [
  'Personalized ProLnk welcome card with QR code',
  'Home Health Vault enrollment instructions (3 min)',
  'Title company co-branding and logo placement',
  'First-service discount voucher for the new homeowner',
  'Emergency contractor hotline access (ProLnk Network)',
];

const tiers = [
  { name: 'Standard Partner', closings: '1–25/mo', share: '0.8%', perClosing: '$38', welcome: 'Digital kit' },
  { name: 'Preferred Partner', closings: '26–75/mo', share: '1.2%', perClosing: '$62', welcome: 'Printed + digital kit' },
  { name: 'Enterprise Partner', closings: '75+/mo', share: '1.8%', perClosing: '$95', welcome: 'Custom co-branded kit' },
];

export default function DFWTitleCompanyProLnkGuide() {
  const [monthlyClosings, setMonthlyClosings] = useState(40);

  const annualClosings = monthlyClosings * 12;
  const originationResidue = Math.round(annualClosings * 18 * 12);
  const referralIncome = Math.round(annualClosings * 62);
  const kitValue = Math.round(annualClosings * 28);
  const total = originationResidue + referralIncome + kitValue;

  const tier = monthlyClosings <= 25 ? tiers[0] : monthlyClosings <= 75 ? tiers[1] : tiers[2];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Title Companies</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>The closing table is the highest-intent moment in home services — and you own it</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Why Title Companies Are ProLnk's #1 Partner</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 12 }}>
            Every real estate transaction flows through a title company. The moment a buyer signs and receives keys, they have a
            list of immediate needs — movers, painters, HVAC checks, new locks, landscaping. No professional in the transaction
            ecosystem is better positioned to make that introduction than you.
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            ProLnk's title company partnership model is unique: you partner at the <strong>business level</strong>, embedding
            ProLnk into your closing process. Every home that closes through your office gets registered in the ProLnk Health Vault,
            generating origination rights revenue for your company — permanently — on every service call that ever happens at
            that address.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {opportunities.map((o) => (
            <div key={o.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{o.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{o.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📦 What's in a ProLnk Closing Kit</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {kitContents.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <span style={{ color: '#4a5568', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏆 Partnership Tiers</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {tiers.map((t) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: t.name === tier.name ? '#0A1628′ : '#f8f9fb', color: t.name === tier.name ? '#fff' : '#1a2233', border: t.name === tier.name ? '2px solid #F5E642' : '2px solid transparent' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name} {t.name === tier.name ? '← Your Tier' : ''}</div>
                  <div style={{ fontSize: 13, color: t.name === tier.name ? '#94a3b8′ : '#64748b' }}>{t.closings} closings/mo · {t.welcome}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: t.name === tier.name ? '#F5E642′ : '#0A1628' }}>{t.perClosing}</div>
                  <div style={{ fontSize: 11, color: t.name === tier.name ? '#94a3b8′ : '#64748b' }}>est. per closing</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Title Company Partnership Calculator</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Monthly Closings</label>
            <input type="range" min={5} max={200} step={5} value={monthlyClosings} onChange={(e) => setMonthlyClosings(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 22 }}>{monthlyClosings} closings/month ({annualClosings}/year)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { label: 'Origination Residual', value: `$${originationResidue.toLocaleString()}`, sub: 'annual recurring' },
              { label: 'Referral Income', value: `$${referralIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Kit Engagement Value', value: `$${kitValue.toLocaleString()}`, sub: 'per year' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628′ }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Estimated Annual ProLnk Partnership Value</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Estimates based on DFW closing averages. Origination rights are permanent.</div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤝</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to Make Every Closing More Valuable?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Title company partnerships are by application. We're onboarding DFW title offices on a rolling basis through the Charter period.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Title Partner →
          </a>
        </div>
      </div>
    </div>
  );
}

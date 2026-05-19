import { useState } from 'react';

const reasons = [
  { icon: '🛡️', title: 'Reduce Claims Risk', desc: 'Maintained homes file fewer claims. ProLnk helps policyholders stay on top of repairs before they become disasters.' },
  { icon: '📋', title: 'Renewal Touch Point', desc: 'Use ProLnk as a value-add at renewal — a reason to call beyond the premium quote.' },
  { icon: '🏠', title: 'Origination Rights', desc: 'Register insured properties in the ProLnk Vault and earn a permanent revenue share on every service transaction.' },
  { icon: '🔁', title: 'Book of Business Income', desc: 'Your existing policy book becomes a ProLnk income stream — no additional sales effort required.' },
];

const talkingPoints = [
  'Keeping your home well-maintained can prevent costly claims and keep your premiums stable.',
  'ProLnk connects you with vetted, insured contractors — the kind we like to see doing work on your home.',
  'As your agent, I\’ve enrolled your home in the ProLnk Health Vault so you always have a trusted resource.',
  'No subscription fee for homeowners — it\’s a benefit I\’m providing as part of our relationship.',
];

export default function DFWInsuranceAgentProLnkGuide() {
  const [policies, setPolicies] = useState(250);
  const [avgPremium, setAvgPremium] = useState(2400);

  const enrollRate = 0.35;
  const enrolledHomes = Math.round(policies * enrollRate);
  const originationResidue = Math.round(enrolledHomes * 18 * 12);
  const referralIncome = Math.round(enrolledHomes * 85);
  const networkIncome = Math.round(policies * 12);
  const total = originationResidue + referralIncome + networkIncome;
  const claimsReduction = Math.round(enrolledHomes * avgPremium * 0.04);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Insurance Agents</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>Your policy book is a ProLnk goldmine — and it reduces claims too</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Insurance + Home Maintenance = Perfect Partnership</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 12 }}>
            Home insurance agents already have the most valuable asset in home services: a book of homeowners who are motivated to
            protect their property. ProLnk turns that relationship into recurring income — while genuinely helping your clients keep
            their homes in better shape (which means fewer claims and more stable renewals).
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            At renewal or any service call, you can introduce ProLnk as a complimentary tool. Register each home in the Vault and
            you lock in origination rights — a permanent revenue share on every service transaction at that address, regardless of
            whether you're still their agent years from now.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {reasons.map((r) => (
            <div key={r.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{r.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Insurance Agent Income Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Home Policies in Your Book</label>
              <input type="range" min={50} max={2000} step={50} value={policies} onChange={(e) => setPolicies(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{policies.toLocaleString()} policies</div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Avg Annual Premium</label>
              <input type="range" min={1200} max={8000} step={200} value={avgPremium} onChange={(e) => setAvgPremium(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>${avgPremium.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13, color: '#166534' }}>
            📌 Estimate assumes ~35% enrollment rate of your book. Enrolled homes: <strong>{enrolledHomes}</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {[
              { label: 'Origination Residual', value: `$${originationResidue.toLocaleString()}`, sub: 'annual recurring' },
              { label: 'Referral Income', value: `$${referralIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Network Override', value: `$${networkIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Est. Claims Reduction Value', value: `$${claimsReduction.toLocaleString()}`, sub: 'avoided losses' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628' }}>{item.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Estimated Total Annual ProLnk Network Income</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Estimates only. Based on DFW market averages.</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💬 Talking Points for Your Clients</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {talkingPoints.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 18, marginTop: 2 }}>✅</span>
                <span style={{ color: '#4a5568', lineHeight: 1.6 }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Monetize Your Book of Business</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Charter-tier agents get the highest income rates and earliest lock on origination rights. Waitlist closes at 500.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Partner Agent →
          </a>
        </div>
      </div>
    </div>
  );
}

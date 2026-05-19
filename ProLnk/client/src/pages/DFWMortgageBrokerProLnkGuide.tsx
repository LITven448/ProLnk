import { useState } from 'react';

const benefits = [
  { icon: '🎁', title: 'Closing Gift Alternative', desc: 'Offer ProLnk membership instead of a gift basket — delivers ongoing value your clients remember.' },
  { icon: '💰', title: 'Dual Income Stream', desc: 'Earn referral commissions when clients use ProLnk and origination rights for every home registered.' },
  { icon: '🔁', title: 'Recurring Revenue', desc: 'Origination rights pay every month as long as the home is active — long after the loan closes.' },
  { icon: '🤝', title: 'Client Retention', desc: 'Clients who use your ProLnk referral stay engaged with your brand through every service call.' },
];

const steps = [
  { num: '01', title: 'Sign Up as a Partner Broker', desc: 'Apply for your ProLnk Partner account — takes 5 minutes, no tech setup required.' },
  { num: '02', title: 'Get Your Referral Link', desc: 'Receive a personalized link and QR code for closing packets, email signatures, and social media.' },
  { num: '03', title: 'Register Homes at Closing', desc: 'Walk clients through the 3-minute Home Health Vault enrollment. Lock in origination rights permanently.' },
  { num: '04', title: 'Collect Monthly Income', desc: 'ProLnk tracks every service match. Your dashboard shows earnings in real time, payouts monthly.' },
];

export default function DFWMortgageBrokerProLnkGuide() {
  const [monthlyClosings, setMonthlyClosings] = useState(8);
  const [avgLoanSize, setAvgLoanSize] = useState(380000);

  const annualClosings = monthlyClosings * 12;
  const referralIncome = Math.round(annualClosings * 110);
  const originationResidue = Math.round(annualClosings * avgLoanSize * 0.00012 * 12);
  const networkIncome = Math.round(annualClosings * 32);
  const total = referralIncome + originationResidue + networkIncome;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏦</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Mortgage Brokers</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>New homeowners need services immediately — and you made the introduction</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>The Mortgage-to-Maintenance Connection</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 12 }}>
            The day a loan closes, your client is flooded with needs: HVAC inspection, pest control, window treatments, lawn care.
            They're searching Google, trusting strangers. ProLnk gives mortgage brokers a way to be <strong>the trusted source</strong>
            for that next phase — and earn income from every service job that follows.
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            Instead of a $50 closing gift, hand every client a ProLnk membership card. They get vetted contractors; you get
            origination rights on that home forever. DFW brokers closing 8–15 loans a month are projecting $30K–$80K in
            supplemental ProLnk income annually.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {benefits.map((b) => (
            <div key={b.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{b.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Mortgage Broker Income Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Monthly Loan Closings</label>
              <input type="range" min={1} max={50} value={monthlyClosings} onChange={(e) => setMonthlyClosings(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{monthlyClosings}/mo</div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Avg Loan Size</label>
              <input type="range" min={150000} max={1200000} step={25000} value={avgLoanSize} onChange={(e) => setAvgLoanSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>${(avgLoanSize / 1000).toFixed(0)}K</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Referral Income', value: `$${referralIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Origination Residual', value: `$${originationResidue.toLocaleString()}`, sub: 'annual recurring' },
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
            <div style={{ fontSize: 36, fontWeight: 900 }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>DFW market estimates. Results vary by activity level.</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 18 }}>{s.num}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Start Earning Beyond the Loan</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Charter membership locks in the highest income tier. Only 500 spots available at founding rates.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Partner Broker →
          </a>
        </div>
      </div>
    </div>
  );
}

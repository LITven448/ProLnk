import { useState } from 'react';

const differentiators = [
  { emoji: '🎯', label: 'Match-Based, Not Pay-Per-Lead', desc: 'You never pay for a lead unless you win the job. Angi charges $15–100 per lead whether you get hired or not.' },
  { emoji: '🚫', label: 'No Shared Leads', desc: 'On Thumbtack, up to 5 contractors get the same lead. On ProLnk, you get exclusive matches.' },
  { emoji: '🤖', label: 'AI-Powered Matching', desc: 'Our algorithm routes jobs based on your trade, location, availability, and specialization — not just who bids lowest.' },
  { emoji: '💸', label: '5 Income Streams', desc: 'Beyond job income, earn from your network of pros, homeowner referrals, and permanent origination rights.' },
  { emoji: '📈', label: 'Tier-Based Earnings Growth', desc: 'The more you complete, the higher your commission tier — from 12% at New to 70% at Elite status.' },
];

const testimonials = [
  { name: 'Marcus T.', trade: 'Master Plumber, Dallas TX', quote: 'I was spending $800/month on Angi leads and closing maybe 20%. ProLnk sends me jobs I actually win.', stars: 5 },
  { name: 'Renee S.', trade: 'HVAC Contractor, Fort Worth', quote: 'The network income surprised me. I brought 3 friends on and now I earn from their jobs too. Game changer.', stars: 5 },
  { name: 'DeShawn P.', trade: 'Licensed Electrician, Frisco', quote: 'Closed my first ProLnk job within 48 hours of joining. Haven\’t looked back.', stars: 5 },
];

export default function ProLnkForContractors() {
  const [jobsPerMonth, setJobsPerMonth] = useState(8);
  const [avgJobValue, setAvgJobValue] = useState(1200);
  const [tier, setTier] = useState(0.12);

  const directEarnings = jobsPerMonth * avgJobValue * tier;
  const networkBonus = directEarnings * 0.15;
  const totalMonthly = directEarnings + networkBonus;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0f2040 100%)', padding: '90px 24px', textAlign: 'center', borderBottom: '1px solid rgba(245,230,66,0.2)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#0A1628', fontWeight: 800, letterSpacing: 2, background: '#F5E642', display: 'inline-block', padding: '5px 14px', borderRadius: 6, marginBottom: 20, textTransform: 'uppercase' }}>For Contractors & Tradespeople</div>
          <h1 style={{ fontSize: 52, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.05 }}>
            Get More Jobs.<br />
            <span style={{ color: '#F5E642′ }}>Build Real Income.</span>
          </h1>
          <p style={{ fontSize: 19, color: '#c0c8d8', lineHeight: 1.7, marginBottom: 32 }}>
            ProLnk is the only platform that matches you exclusively with homeowners who need exactly your trade — and pays you 5 ways to grow your business.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '16px 36px', fontSize: 17, fontWeight: 800, cursor: 'pointer' }}>Join the Waitlist</button>
            <button style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 10, padding: '16px 36px', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>See How It Works</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px' }}>
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>💰 Partner Income Calculator</h2>
          <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: 36, fontSize: 15 }}>Estimate your monthly earnings based on your job volume and tier.</p>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 36, border: '1px solid rgba(245,230,66,0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#a0aec0', marginBottom: 10 }}>Jobs Completed Per Month: <span style={{ color: '#F5E642′ }}>{jobsPerMonth}</span></label>
                <input type="range" min={1} max={40} value={jobsPerMonth} onChange={e => setJobsPerMonth(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642′ }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666', marginTop: 4 }}><span>1</span><span>40</span></div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#a0aec0', marginBottom: 10 }}>Average Job Value: <span style={{ color: '#F5E642′ }}>${avgJobValue.toLocaleString()}</span></label>
                <input type="range" min={200} max={8000} step={100} value={avgJobValue} onChange={e => setAvgJobValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642′ }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666', marginTop: 4 }}><span>$200</span><span>$8,000</span></div>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#a0aec0', marginBottom: 12 }}>Your Partner Tier</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: 'New (12%)', value: 0.12 },
                  { label: 'Rising (20%)', value: 0.20 },
                  { label: 'Pro (35%)', value: 0.35 },
                  { label: 'Expert (50%)', value: 0.50 },
                  { label: 'Elite (70%)', value: 0.70 },
                ].map(t => (
                  <button key={t.value} onClick={() => setTier(t.value)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: tier === t.value ? '#F5E642′ : ’rgba(255,255,255,0.2)', background: tier === t.value ? '#F5E642′ : ’transparent', color: tier === t.value ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${Math.round(directEarnings).toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#a0aec0', marginTop: 4 }}>Direct Match Earnings</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>+${Math.round(networkBonus).toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#a0aec0', marginTop: 4 }}>Network Bonus (est.)</div>
              </div>
              <div style={{ background: '#F5E642', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#0A1628′ }}>${Math.round(totalMonthly).toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#0A1628', fontWeight: 700, marginTop: 4 }}>Total Monthly Income</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#555', textAlign: 'center', marginTop: 16 }}>Estimates based on platform averages. Actual results vary by market and trade.</p>
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Why ProLnk vs. The Others</h2>
          <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: 36, fontSize: 15 }}>Built by contractors who were fed up with platforms that take your money and deliver garbage leads.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {differentiators.map((d, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{d.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#F5E642′ }}>{d.label}</div>
                  <div style={{ fontSize: 15, color: '#a0aec0', lineHeight: 1.6 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, textAlign: 'center' }}>What Partners Are Saying</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 24, border: '1px solid rgba(245,230,66,0.15)' }}>
                <div style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>{'★'.repeat(t.stars)}</div>
                <p style={{ fontSize: 15, color: '#c0c8d8', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: '#a0aec0′ }}>{t.trade}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#F5E642', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Waitlist Is Open — 500 Spots Only</h2>
          <p style={{ color: '#1a1a2e', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>Charter partners lock in the highest commission tiers and lifetime pricing at $149/mo. Once 500 applications are in, waitlist closes.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 17, fontWeight: 800, cursor: 'pointer' }}>Claim My Partner Spot →</button>
        </section>
      </div>
    </div>
  );
}

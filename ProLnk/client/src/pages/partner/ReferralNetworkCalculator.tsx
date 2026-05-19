import { useState } from 'react';

const RATES = [0.07, 0.04, 0.02, 0.01];
const LEVEL_LABELS = ['Level 1 (Direct)', 'Level 2', 'Level 3', 'Level 4'];
const LEVEL_COLORS = ['#F5E642', '#60a5fa', '#34d399', '#f472b6'];
const PARTNER_KEEP = 0.72;

export default function ReferralNetworkCalculator() {
  const [partners, setPartners] = useState(['', '', '', '']);
  const [jobsPerMonth, setJobsPerMonth] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [calculated, setCalculated] = useState(false);

  const updatePartner = (i: number, val: string) => {
    const next = [...partners];
    next[i] = val;
    setPartners(next);
  };

  const avgJobValue = parseFloat(jobValue) || 0;
  const jobs = parseFloat(jobsPerMonth) || 0;

  const levelEarnings = RATES.map((rate, i) => {
    const count = parseFloat(partners[i]) || 0;
    const partnerMonthlyEarned = jobs * avgJobValue * PARTNER_KEEP;
    return count * partnerMonthlyEarned * rate;
  });

  const totalMonthly = levelEarnings.reduce((a, b) => a + b, 0);
  const totalAnnual = totalMonthly * 12;

  const calculate = () => setCalculated(true);

  const totalPartners = partners.reduce((a, p) => a + (parseFloat(p) || 0), 0);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌐</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0A1628', marginBottom: '0.5rem' }}>
            ProLnk Referral Network Calculator
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            See how much your partner network generates in monthly override income across 4 levels
          </p>
        </div>

        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #e2e8f0′ }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628', marginBottom: '1rem' }}>📖 How It Works</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            When sub-partners you recruit earn income on the platform, you earn a <strong>network override</strong> — a percentage of the commission they keep (72% of job value). Overrides cascade 4 levels deep:
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {RATES.map((rate, i) => (
              <div key={i} style={{ flex: '1', minWidth: '150px', background: '#fff', borderRadius: '8px', padding: '0.75rem', border: `2px solid ${LEVEL_COLORS[i]}`, textAlign: 'center' }}>
                <div style={{ color: LEVEL_COLORS[i], fontSize: '1.4rem', fontWeight: 700 }}>{(rate * 100).toFixed(0)}%</div>
                <div style={{ color: '#0A1628', fontWeight: 600, fontSize: '0.85rem' }}>{LEVEL_LABELS[i]}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>of partner\'s 72% earned</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628', marginBottom: '1.2rem' }}>⚙️ Your Network Inputs</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ color: '#475569', display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Avg jobs/month (per partner):</label>
              <input type="number" value={jobsPerMonth} onChange={e => setJobsPerMonth(e.target.value)} placeholder="e.g. 8″
                style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#0A1628', width: '100%', fontSize: '0.95rem' }} />
            </div>
            <div>
              <label style={{ color: '#475569', display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Avg job value ($):</label>
              <input type="number" value={jobValue} onChange={e => setJobValue(e.target.value)} placeholder="e.g. 350″
                style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#0A1628', width: '100%', fontSize: '0.95rem' }} />
            </div>
          </div>

          <h3 style={{ color: '#0A1628', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>Partners at each level:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.2rem' }}>
            {LEVEL_LABELS.map((label, i) => (
              <div key={i}>
                <label style={{ color: LEVEL_COLORS[i], display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                  {label} ({(RATES[i] * 100).toFixed(0)}%):
                </label>
                <input type="number" value={partners[i]} onChange={e => updatePartner(i, e.target.value)} placeholder="0″
                  style={{ border: `2px solid ${LEVEL_COLORS[i]}`, borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#0A1628', width: '100%', fontSize: '0.95rem' }} />
              </div>
            ))}
          </div>

          <button onClick={calculate}
            style={{ background: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '0.7rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            Calculate Network Income →
          </button>
        </div>

        {calculated && avgJobValue > 0 && jobs > 0 && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628', marginBottom: '1rem' }}>📊 Income Breakdown by Level</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {LEVEL_LABELS.map((label, i) => {
                  const count = parseFloat(partners[i]) || 0;
                  const earning = levelEarnings[i];
                  const pct = totalMonthly > 0 ? (earning / totalMonthly) * 100 : 0;
                  return (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', border: `1px solid #e2e8f0` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: '#0A1628′ }}>{label}</span>
                          <span style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{count} partners × {(RATES[i] * 100).toFixed(0)}% override</span>
                        </div>
                        <span style={{ fontWeight: 700, color: LEVEL_COLORS[i], fontSize: '1.1rem' }}>${earning.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                      </div>
                      <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: LEVEL_COLORS[i], transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.5rem', color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Total Network Override Income</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>
                ${totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
              </div>
              <div style={{ color: '#60a5fa', fontSize: '1.1rem', fontWeight: 600 }}>
                ${totalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Based on {totalPartners} total partners generating {jobs} jobs/mo at ${avgJobValue} avg value
              </div>
            </div>

            <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1.5rem', border: '1px solid #bbf7d0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.75rem' }}>💡 Network Growth Tips</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Focus first on recruiting strong L1 partners — they build the rest of your tree',
                  'Help your L1 partners recruit their own L1s (your L2) — doubles compound fast',
                  'Higher-value trades (HVAC, roofing, remodeling) generate more override per job',
                  'Partners who close 10+ jobs/mo are your most valuable network nodes',
                ].map(tip => (
                  <div key={tip} style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#475569', fontSize: '0.9rem' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0′ }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀</div>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.25rem' }}>Ready to build your ProLnk partner network?</p>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Join as a Charter Partner and lock in your position in the network</p>
        </div>
      </div>
    </div>
  );
}

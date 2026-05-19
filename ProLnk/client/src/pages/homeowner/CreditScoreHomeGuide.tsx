import { useState } from 'react';

const creditImpacts = [
  { event: 'Mortgage inquiry (pre-approval)',     impact: '−5 pts',        severity: 'low',  note: 'Temporary; recovers in 3–6 months' },
  { event: 'Hard inquiry for home improvement',  impact: '−5 pts',        severity: 'low',  note: 'Each application is a separate inquiry' },
  { event: 'New credit card for home costs',     impact: '−5 to −10 pts', severity: 'low',  note: 'Improves over time as balance stays low' },
  { event: 'Missing mortgage payment (30 days)', impact: '−60 to −110 pts',severity: 'high', note: 'Catastrophic. Stays on report 7 years.' },
];

const improvements = [
  { icon: '🏦', label: 'Auto-pay mortgage', detail: 'Never miss. One missed payment destroys 60–110 points.' },
  { icon: '💳', label: 'Keep debt below 30% utilization', detail: 'High utilization is the #2 score killer after missed payments.' },
  { icon: '🕰️', label: 'Don’t close old cards', detail: 'Closing them lowers average account age and available credit.' },
  { icon: '🏘️', label: 'Report rental income if applicable', detail: 'Some bureaus now count rent payment history in your score.' },
];

const scoreRanges = [
  { range: '750+',     label: 'Excellent', helocRate: '~7.2%', monthly200k: '$1,361/mo', color: '#4ADE80' },
  { range: '700–749', label: 'Good',       helocRate: '~7.9%', monthly200k: '$1,453/mo', color: '#86EFAC' },
  { range: '650–699', label: 'Fair',       helocRate: '~9.5%', monthly200k: '$1,680/mo', color: '#F59E0B' },
  { range: '<650',    label: 'Poor',       helocRate: 'FHA / secured only', monthly200k: 'N/A — consider FHA loan', color: '#EF4444' },
];

export default function CreditScoreHomeGuide() {
  const [score, setScore]   = useState('');
  const [result, setResult] = useState<null | typeof scoreRanges[0]>(null);

  function lookup() {
    const s = parseInt(score) || 0;
    if (s < 300 || s > 850) { setResult(null); return; }
    if (s >= 750) setResult(scoreRanges[0]);
    else if (s >= 700) setResult(scoreRanges[1]);
    else if (s >= 650) setResult(scoreRanges[2]);
    else setResult(scoreRanges[3]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64B5F6', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
          Credit Score Guide for DFW Homeowners
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginBottom: 48 }}>
          Protect and leverage your score — especially in 2026.
        </p>

        {/* Why Homeowners Care */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Why Homeowners Need to Care About Credit</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#64B5F6', marginBottom: 4 }}>🏦 HELOC Qualification</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>Minimum 660 to qualify. 720+ to access best rates. HELOCs let you tap your equity for renovations, emergencies, or investments.</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#64B5F6', marginBottom: 4 }}>📉 Refinancing Power</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>Every 0.25% rate difference = ~$40/mo on a $200K mortgage. On a $400K mortgage, that's $80/mo or $960/year. Over 10 years — $9,600.</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#64B5F6', marginBottom: 4 }}>🏗️ Home Improvement Financing</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>Major renovations — roof, HVAC, additions — often require a home equity loan. Better score = lower rate = lower monthly payment.</div>
            </div>
          </div>
        </section>

        {/* Credit Impact Table */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>How Home Events Affect Your Score</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1E3A5F' }}>
                  <th style={{ textAlign: 'left',   padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Event</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Impact</th>
                  <th style={{ textAlign: 'left',   padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {creditImpacts.map((row, i) => (
                  <tr key={row.event} style={{ background: i % 2 === 0 ? '#111E33' : '#0A1628', borderBottom: '1px solid #1E3A5F' }}>
                    <td style={{ padding: '14px 16px', color: '#E8EDF5', fontSize: 14 }}>{row.event}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: row.severity === 'high' ? '#EF4444' : '#F59E0B' }}>{row.impact}</td>
                    <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: 13 }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Improvement Tips */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>How Homeowners Improve Credit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {improvements.map(tip => (
              <div key={tip.label} style={{ background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{tip.icon}</div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{tip.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{tip.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DFW Timing */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: '#1B2E4A', borderRadius: 12, padding: 24, borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontWeight: 700, color: '#F59E0B', marginBottom: 8 }}>📅 DFW 2026 Timing Tip</div>
            <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.8 }}>
              If you're planning to refinance or get a HELOC in 2026, <strong style={{ color: '#FFFFFF' }}>start improving credit 6 months before applying</strong>. Pay down balances, avoid new applications, and let any inquiries age. The 6-month window is enough to meaningfully raise a borderline score.
            </p>
          </div>
        </section>

        {/* HELOC Rate Calculator */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>🧮 See Your HELOC Rate by Credit Score</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Your Credit Score (300–850)</label>
              <input
                type="number" min="300" max="850"
                value={score}
                onChange={e => setScore(e.target.value)}
                placeholder="e.g. 720"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <button
              onClick={lookup}
              style={{ background: '#1D6FE8', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Show My Rate Tier
            </button>
            {result && (
              <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: result.color }}>{result.label}</div>
                    <div style={{ color: '#64748B', fontSize: 13 }}>Score range: {result.range}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: result.color }}>{result.helocRate}</div>
                    <div style={{ color: '#64748B', fontSize: 12 }}>Est. HELOC rate</div>
                  </div>
                </div>
                <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>$200K HELOC monthly payment</div>
                  <div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 16, marginTop: 4 }}>{result.monthly200k}</div>
                </div>
              </div>
            )}
          </div>

          {/* Score Range Summary */}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {scoreRanges.map(r => (
              <div key={r.range} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1E3A5F', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color }} />
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{r.range}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{r.label}</div>
                </div>
                <div style={{ color: r.color, fontWeight: 700 }}>{r.helocRate}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1D6FE8, #0D47A1)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>💰</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Finance Home Improvements Smarter</h3>
          <p style={{ color: '#93C5FD', marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk connects you with licensed pros who work with all financing levels — HELOC, home equity loans, or flexible payment plans.
          </p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}>
            Find Financing-Friendly Pros →
          </a>
        </div>

      </div>
    </div>
  );
}

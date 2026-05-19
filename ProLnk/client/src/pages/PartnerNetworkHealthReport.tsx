import { useState } from 'react';

type HealthMetric = {
  key: string;
  label: string;
  target: string;
  unit: string;
  min: number;
  max: number;
  goodThreshold: number;
  warningThreshold: number;
};

const metrics: HealthMetric[] = [
  { key: 'activeRate', label: 'Active Recruit Rate', target: '70%+', unit: '%', min: 0, max: 100, goodThreshold: 70, warningThreshold: 50 },
  { key: 'jobsPerRecruit', label: 'Avg Jobs per Recruit/mo', target: '5+ jobs', unit: 'jobs', min: 0, max: 20, goodThreshold: 5, warningThreshold: 3 },
  { key: 'retention', label: 'Recruit Retention (60 days)', target: '80%+', unit: '%', min: 0, max: 100, goodThreshold: 80, warningThreshold: 60 },
  { key: 'depthGrowth', label: 'L1 Recruits Recruiting (mo)', target: '0.5+ each', unit: '/recruit', min: 0, max: 3, goodThreshold: 0.5, warningThreshold: 0.2 },
  { key: 'incomeGrowth', label: 'Monthly Income Growth', target: '10–15%/mo', unit: '%', min: 0, max: 50, goodThreshold: 10, warningThreshold: 5 },
];

const diagnoses: Record<string, string> = {
  activeRate: "Your recruits haven't mastered the photo documentation process yet. Schedule a 30-minute photo training call this week. Walk them through the exact steps live — it's almost always a knowledge gap, not a motivation problem.",
  jobsPerRecruit: "Low job volume per recruit means they're not converting their existing customer relationships into vault scans. Coach them on the opening conversation: 'I can show you the ROI on your home health data — it takes 20 minutes.' Role-play this with them until it's natural.",
  retention: "Partners who haven't been active in 60 days almost always churn. Early intervention is your only lever. Reach out personally within 30 days of inactivity — ask what's blocking them, offer a coaching call. One conversation can save the relationship.",
  depthGrowth: "Your L1 recruits aren't recruiting their own downlines. They've probably never had the recruiting conversation modeled for them. Host a short group call showing exactly how you recruited them, and how they can duplicate it. Make the script available to everyone.",
  incomeGrowth: "Income plateaus usually mean your recruits are all in the same trade category or geographic area. Diversify — if you have 10 HVAC techs, recruit 5 plumbers and 5 electricians. Complementary trades don't compete; they compound.",
};

export default function PartnerNetworkHealthReport() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { score: number; issues: string[] }>(null);

  const setValue = (key: string, val: string) => setValues(prev => ({ ...prev, [key]: val }));

  const analyze = () => {
    let totalScore = 0;
    const issues: string[] = [];
    metrics.forEach(m => {
      const val = parseFloat(values[m.key] || '0');
      if (val >= m.goodThreshold) {
        totalScore += 20;
      } else if (val >= m.warningThreshold) {
        totalScore += 10;
        issues.push(m.key);
      } else {
        totalScore += 0;
        issues.push(m.key);
      }
    });
    setResult({ score: totalScore, issues });
  };

  const scoreColor = result ? (result.score >= 80 ? '#22c55e' : result.score >= 50 ? '#eab308′ : '#ef4444') : '#94a3b8';
  const scoreLabel = result ? (result.score >= 80 ? 'Healthy Network' : result.score >= 50 ? 'Needs Attention' : 'Urgent Action Required') : '';

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#6366f1', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Partner Intelligence</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.2 }}>
          Your Network Health Report — Is Your Downline Growing the Right Way?
        </h1>
        <p style={{ color: '#64748b', fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          Most partners track their own income — but the real signal is in your downline's behavior. These five metrics tell you where your network is healthy, where it’s at risk, and exactly what to do about each.
        </p>

        {/* Metrics to Track */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>📊 Network Health Metrics Every Partner Should Track</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                label: 'Active Recruit Rate',
                target: '70%+ of recruits active in last 30 days',
                desc: 'Inactive recruits earn nothing for you or themselves. If it drops below 50%, you have a training gap — not a people problem.',
                icon: '👥',
              },
              {
                label: 'Average Jobs per Recruit',
                target: '5+ jobs/month per active recruit',
                desc: 'Below 3 jobs/month means your recruits aren’t hitting their earning threshold. They need coaching on the client conversation, not more motivation.',
                icon: '🔨',
              },
              {
                label: 'Recruit Retention (60 days)',
                target: 'Partners inactive 60 days often churn',
                desc: 'Early intervention saves them. One personal outreach call within 30 days of inactivity prevents most churn.',
                icon: '📅',
              },
              {
                label: 'Depth Growth',
                target: 'Each L1 recruit brings in 0.5 recruits/month',
                desc: 'If your recruits aren’t recruiting, your network income flatlines. Teach them the same conversation you used to recruit them.',
                icon: '🌳',
              },
              {
                label: 'Income Growth Rate',
                target: '10–15%/month in first 12 months',
                desc: 'Network income should compound in the early months. If it’s plateauing at 6+ months in, diagnose the specific weak metric first.',
                icon: '📈',
              },
            ].map(item => (
              <div key={item.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', gap: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#6366f1', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Target: {item.target}</div>
                  <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnosing Problems */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>🩺 Diagnosing Network Problems</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { problem: 'Low Recruit Activity', fix: 'They haven’t learned the photo documentation process. Schedule a 30-minute live training call. Watch how fast it turns around.' },
              { problem: 'No L2/L3 Growth', fix: 'Recruits aren’t recruiting. Teach them the same conversation you had with them. Role-play it. Make the script available.' },
              { problem: 'Income Plateau', fix: 'All your recruits are in the same trade or area. Diversify — recruit complementary trades. HVAC + plumbing + electrical = compounding, non-competing referrals.' },
              { problem: 'High Churn', fix: 'Partners quitting usually means they didn’t earn in their first 30 days. Front-load coaching for new recruits in week 1-2, not week 4.' },
            ].map(item => (
              <div key={item.problem} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚠️ {item.problem}</div>
                <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 13 }}>✅ Fix: {item.fix}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Health Check Tool */}
        <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>🔍 Network Health Check</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Enter your current network stats to get a health score and specific action recommendations for each weak metric.</p>

          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {metrics.map(m => (
              <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#374151', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{m.label}</label>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Target: {m.target}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="number"
                    value={values[m.key] || ''}
                    onChange={e => setValue(m.key, e.target.value)}
                    placeholder="0″
                    style={{ width: 80, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#0f172a', padding: '8px 12px', fontSize: 14, textAlign: 'right' }}
                  />
                  <span style={{ color: '#94a3b8', fontSize: 13, minWidth: 30 }}>{m.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <button onClick={analyze} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Check My Network Health
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#f8fafc', borderRadius: 12, padding: 24, border: `2px solid ${scoreColor}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: scoreColor }}>{result.score}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: scoreColor }}>{scoreLabel}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>out of 100 — {result.issues.length === 0 ? 'All metrics on target' : `${result.issues.length} metric${result.issues.length > 1 ? 's' : ''} need attention`}</div>
                </div>
              </div>
              {result.issues.length > 0 && (
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 12, fontSize: 14 }}>ACTION PLAN</div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {result.issues.map(key => {
                      const m = metrics.find(x => x.key === key)!;
                      return (
                        <div key={key} style={{ background: '#fff', borderRadius: 10, padding: 16, border: '1px solid #e2e8f0′ }}>
                          <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Fix: {m.label}</div>
                          <div style={{ color: '#374151', fontSize: 13, lineHeight: 1.6 }}>{diagnoses[key]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: 16, padding: 36, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Low scores? The fastest fix is growing your network.</div>
          <p style={{ color: '#c7d2fe', fontSize: 14, marginBottom: 24, maxWidth: 440, margin: '0 auto 24px' }}>
            More recruits means more data points, more income streams, and more compounding over time. Every partner you recruit starts the clock on L2/L3 growth.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#fff', color: '#4f46e5', padding: '12px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Recruit More Partners →</a>
        </div>
      </div>
    </div>
  );
}

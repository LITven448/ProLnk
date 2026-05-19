import { useState } from 'react';

const comparisonRows = [
  { category: 'Lead Generation', alone: 'Cold calls, door knocking, word-of-mouth', prolnk: 'Pre-qualified homeowner leads delivered to your area' },
  { category: 'Marketing Cost', alone: '$500–$2,000/mo on ads, mailers, Angi', prolnk: '$149/mo flat — no per-lead fees' },
  { category: 'Time Prospecting', alone: '10–20 hrs/week finding new work', prolnk: 'Under 2 hrs/week managing matches' },
  { category: 'Income Ceiling', alone: 'Revenue from your labor only', prolnk: '5 income streams including network overrides' },
  { category: 'Referral Income', alone: 'One-time referral bonus if any', prolnk: '4-level cascade: earn on every pro you recruit' },
  { category: 'Subscription Override', alone: 'None', prolnk: '10% recurring on every pro signup you refer' },
  { category: 'Home Origination', alone: 'None', prolnk: 'Permanent revenue share on every home you onboard' },
  { category: 'Admin & Scheduling', alone: 'Manual — phone, text, spreadsheets', prolnk: 'Automated matching and scheduling tools' },
  { category: 'Reviews & Reputation', alone: 'Manage Google, Yelp, BBB separately', prolnk: 'Centralized ProLnk verified review system' },
  { category: 'Insurance Visibility', alone: 'Verify manually for each homeowner', prolnk: 'Verified badge displayed to all homeowners' },
];

export default function ProLnkVsGoingAlone() {
  const [jobsPerMonth, setJobsPerMonth] = useState(8);
  const [avgJobValue, setAvgJobValue] = useState(1200);
  const [prosReferred, setProsReferred] = useState(3);

  const directCommissionRate = 0.20;
  const networkOverrideRate = 0.01;
  const subscriptionOverrideRate = 0.10;
  const proMonthlyFee = 149;

  const aloneMonthly = jobsPerMonth * avgJobValue;
  const directEarnings = jobsPerMonth * avgJobValue * directCommissionRate;
  const networkEarnings = prosReferred * (8 * 1200) * networkOverrideRate;
  const subscriptionEarnings = prosReferred * proMonthlyFee * subscriptionOverrideRate;
  const prolnkTotal = aloneMonthly + directEarnings + networkEarnings + subscriptionEarnings;
  const uplift = prolnkTotal - aloneMonthly;
  const upliftPct = Math.round((uplift / aloneMonthly) * 100);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: '#1A202C', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
          ProLnk Partner vs. Going Alone
        </h1>
        <p style={{ fontSize: 18, color: '#93C5FD', maxWidth: 620, margin: '0 auto' }}>
          Most contractors leave 30–60% of potential income on the table. Here is what the numbers actually look like side by side.
        </p>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px' }}>

        {/* Income Calculator */}
        <div style={{ background: '#F0F7FF', borderRadius: 16, padding: 36, marginBottom: 48, border: '2px solid #BFDBFE' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', margin: '0 0 8px', textAlign: 'center' }}>
            💰 Income Uplift Calculator
          </h2>
          <p style={{ color: '#4B6A8A', textAlign: 'center', margin: '0 0 32px' }}>
            Enter your numbers to see your ProLnk income potential
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1e3a5f', marginBottom: 8, fontSize: 15 }}>
                Jobs per month
              </label>
              <input
                type="number"
                value={jobsPerMonth}
                onChange={e => setJobsPerMonth(Number(e.target.value))}
                min={1}
                max={50}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #BFDBFE', fontSize: 18, fontWeight: 700, color: '#1e3a5f', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1e3a5f', marginBottom: 8, fontSize: 15 }}>
                Avg job value ($)
              </label>
              <input
                type="number"
                value={avgJobValue}
                onChange={e => setAvgJobValue(Number(e.target.value))}
                min={100}
                max={50000}
                step={100}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #BFDBFE', fontSize: 18, fontWeight: 700, color: '#1e3a5f', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1e3a5f', marginBottom: 8, fontSize: 15 }}>
                Pros you would refer
              </label>
              <input
                type="number"
                value={prosReferred}
                onChange={e => setProsReferred(Number(e.target.value))}
                min={0}
                max={100}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #BFDBFE', fontSize: 18, fontWeight: 700, color: '#1e3a5f', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
              <p style={{ color: '#64748B', fontWeight: 600, margin: '0 0 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Going Alone (Monthly)</p>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#1e3a5f', margin: 0 }}>
                ${aloneMonthly.toLocaleString()}
              </p>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '4px 0 0′ }}>Labor income only</p>
            </div>
            <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 24, border: '2px solid #2563EB' }}>
              <p style={{ color: '#2563EB', fontWeight: 600, margin: '0 0 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>ProLnk Partner (Monthly)</p>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#1e3a5f', margin: 0 }}>
                ${prolnkTotal.toLocaleString()}
              </p>
              <p style={{ color: '#2563EB', fontSize: 13, margin: '4px 0 0', fontWeight: 600 }}>
                +{upliftPct}% vs going alone
              </p>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 10, padding: 20, border: '1px solid #BFDBFE' }}>
            <p style={{ fontWeight: 700, color: '#1e3a5f', margin: '0 0 12px', fontSize: 15 }}>Income Breakdown:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Your labor revenue', amount: aloneMonthly, color: '#64748B' },
                { label: 'Direct commission (Tier 2: 20%)', amount: directEarnings, color: '#2563EB' },
                { label: `Network override (${prosReferred} pros × 1%)`, amount: networkEarnings, color: '#7C3AED' },
                { label: `Subscription override (${prosReferred} × $149 × 10%)`, amount: subscriptionEarnings, color: '#059669′ },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#4B5563', fontSize: 14 }}>{row.label}</span>
                  <span style={{ color: row.color, fontWeight: 700, fontSize: 15 }}>${row.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #BFDBFE', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#1e3a5f' }}>Additional income vs. going alone</span>
                <span style={{ fontWeight: 800, color: '#059669', fontSize: 18 }}>+${uplift.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f', margin: '0 0 24px', textAlign: 'center' }}>
          Side-by-Side Comparison
        </h2>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#1e3a5f' }}>
            <div style={{ padding: '14px 20px', color: '#93C5FD', fontWeight: 700, fontSize: 14 }}>Category</div>
            <div style={{ padding: '14px 20px', color: '#FFFFFF', fontWeight: 700, fontSize: 14, borderLeft: '1px solid #2d4f73′ }}>Going Alone</div>
            <div style={{ padding: '14px 20px', color: '#60A5FA', fontWeight: 700, fontSize: 14, borderLeft: '1px solid #2d4f73′ }}>ProLnk Partner ✓</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.category}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: i % 2 === 0 ? '#F8FAFC' : '#FFFFFF', borderTop: '1px solid #E2E8F0′ }}
            >
              <div style={{ padding: '14px 20px', color: '#374151', fontWeight: 600, fontSize: 14 }}>{row.category}</div>
              <div style={{ padding: '14px 20px', color: '#6B7280', fontSize: 14, borderLeft: '1px solid #E2E8F0′ }}>{row.alone}</div>
              <div style={{ padding: '14px 20px', color: '#1D4ED8', fontSize: 14, fontWeight: 500, borderLeft: '1px solid #E2E8F0′ }}>{row.prolnk}</div>
            </div>
          ))}
        </div>

        {/* The 5 Streams */}
        <div style={{ background: '#F0F7FF', borderRadius: 16, padding: 36, marginBottom: 48, border: '1px solid #BFDBFE' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e3a5f', margin: '0 0 20px' }}>
            🔑 The 5 ProLnk Income Streams
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Direct Commission', desc: '12–70% of match value based on your tier (hits 50% at 100 matches)', color: '#2563EB' },
              { n: '2', title: 'Pro Network Override', desc: 'Earn 1% on every job your recruited pros complete — 4 levels deep', color: '#7C3AED' },
              { n: '3', title: 'Subscription Override', desc: '10% recurring on every pro that signs up through your referral link', color: '#059669′ },
              { n: '4', title: 'Homeowner Override', desc: '$25–100 per qualified homeowner you bring onto the platform', color: '#D97706′ },
              { n: '5', title: 'Home Origination Rights', desc: 'Permanent revenue share on every home you help add to the Vault', color: '#DC2626′ },
            ].map(stream => (
              <div key={stream.n} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: '#FFFFFF', borderRadius: 10, border: '1px solid #BFDBFE', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: stream.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {stream.n}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#1e3a5f', margin: '0 0 4px', fontSize: 16 }}>{stream.title}</p>
                  <p style={{ color: '#4B6A8A', margin: 0, fontSize: 14 }}>{stream.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563EB)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>
            Ready to Stop Leaving Money Behind?
          </h2>
          <p style={{ color: '#93C5FD', fontSize: 16, margin: '0 auto 28px', maxWidth: 480 }}>
            Charter membership is limited to 500 pros. Lock in your spot and your territory before it closes.
          </p>
          <button style={{ background: '#FFFFFF', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            Join as a Charter Pro
          </button>
        </div>
      </div>
    </div>
  );
}

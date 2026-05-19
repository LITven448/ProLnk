import { useState } from 'react';

const tiers = [
  {
    stars: '🌟🌟🌟🌟🌟',
    name: 'Gold — Storm Dispatch',
    closeRate: 78,
    color: '#F59E0B',
    bg: '#2D1A00',
    border: '#92400E',
    desc: 'AI-detected storm damage. Homeowner is already aware of the issue and motivated to act. This is the hottest lead type in the ProLnk system.',
    tips: [
      'Respond within 15 minutes — gold leads are dispatched to 2 pros simultaneously',
      'Use ProLnk’s pre-drafted storm estimate template (in your partner dashboard)',
      'Mention the specific storm date and damage type — shows you know the situation',
      'Offer same-day or next-day estimate — storm leads move fast or go cold',
    ],
  },
  {
    stars: '🌟🌟🌟🌟',
    name: 'Silver — Photo Detection',
    closeRate: 61,
    color: '#94A3B8',
    bg: '#1A2030',
    border: '#374151',
    desc: 'AI found an opportunity in YOUR job photos from a recent visit. The homeowner has not yet been notified. You have a short exclusivity window.',
    tips: [
      'Call within 24 hours of lead dispatch',
      'Reference the specific finding: "Our AI detected signs of X at your property"',
      'Offer to come back and show them in person — creates trust',
      'Do not oversell — let the finding speak for itself',
    ],
  },
  {
    stars: '🌟🌟🌟',
    name: 'Bronze — Homeowner Request',
    closeRate: 54,
    color: '#CD7F32',
    bg: '#1A1000',
    border: '#78350F',
    desc: 'Homeowner requested a quote through the TrustyPro app. They know what they want and are actively seeking bids.',
    tips: [
      'Respond within 2 hours during business hours',
      'Ask one qualifying question before the estimate: "Is this urgent or are you planning for next season?"',
      'Bring your portfolio of similar jobs to the estimate',
      'Present a detailed written scope — homeowners who request quotes compare bids carefully',
    ],
  },
  {
    stars: '🌟🌟',
    name: 'Standard — Cold Referral',
    closeRate: 34,
    color: '#6B7280',
    bg: '#111827',
    border: '#374151',
    desc: 'Partner-referred lead with basic contact information. Requires outreach and qualification. Lower close rate but still valuable at volume.',
    tips: [
      'Call from a local number if possible — local area codes increase answer rates 40%',
      'Lead with value: "I’m calling about the home improvement referral from [partner name]"',
      'Qualify need and timeline in the first 60 seconds',
      'Add to nurture sequence if no immediate need',
    ],
  },
];

export default function PartnerLeadQualityGuide() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(20);
  const [avgJobValue, setAvgJobValue] = useState(4500);
  const [selectedTier, setSelectedTier] = useState(0);
  const [expandedTier, setExpandedTier] = useState<number | null>(null);

  const tier = tiers[selectedTier];
  const closeRate = tier.closeRate / 100;
  const monthlyCommission = Math.round(leadsPerMonth * closeRate * avgJobValue * 0.15);
  const closedJobs = Math.round(leadsPerMonth * closeRate);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2 }}>
            Lead Quality Guide — Not All ProLnk Leads Are Equal
          </h1>
          <p style={{ fontSize: 18, color: '#93C5FD', margin: 0 }}>Understand your lead tiers and how to close each one.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* Tier Cards */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A8A', marginBottom: 24 }}>Lead Quality Tiers</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {tiers.map((t, i) => (
              <div key={t.name} style={{ background: t.bg, border: `2px solid ${t.border}`, borderRadius: 14, overflow: 'hidden' }}>
                <div
                  onClick={() => setExpandedTier(expandedTier === i ? null : i)}
                  style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 18 }}>{t.stars}</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: t.color, marginTop: 4 }}>{t.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: t.color }}>{t.closeRate}%</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>Close Rate</div>
                    </div>
                    <div style={{ color: '#6B7280', fontSize: 20 }}>{expandedTier === i ? '▲' : '▼'}</div>
                  </div>
                </div>
                {expandedTier === i && (
                  <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${t.border}` }}>
                    <p style={{ color: '#D1D5DB', fontSize: 14, margin: '16px 0 16px', lineHeight: 1.7 }}>{t.desc}</p>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.color, marginBottom: 10 }}>How to Win These Leads:</div>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {t.tips.map(tip => (
                        <li key={tip} style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PPS Score */}
        <section style={{ marginTop: 48, background: '#EFF6FF', border: '2px solid #BFDBFE', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E3A8A', marginBottom: 12 }}>📊 Lead Acceptance Strategy</h2>
          <p style={{ color: '#1E40AF', fontSize: 15, margin: '0 0 12px', lineHeight: 1.7 }}>
            <strong>Accept 85%+ of leads you receive</strong> to maintain a high Partner Performance Score (PPS). A low PPS reduces your priority in the dispatch queue — you'll receive fewer gold leads and more standard leads.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: 16 }}>
            {[
              { label: 'PPS 90-100', desc: 'Gold leads first', color: '#059669′ },
              { label: 'PPS 75-89', desc: 'Silver priority', color: '#F59E0B' },
              { label: 'PPS 60-74', desc: 'Bronze & Standard', color: '#EA580C' },
              { label: 'PPS <60', desc: 'Review required', color: '#DC2626′ },
            ].map(s => (
              <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #DBEAFE', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#6B7280′ }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI Calculator */}
        <section style={{ marginTop: 48, background: '#FFFFFF', border: '2px solid #E5E7EB', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>💰 Monthly Commission Calculator</h2>
          <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>Estimate your monthly earnings based on lead volume and lead tier.</p>

          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Lead Tier</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {tiers.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTier(i)}
                    style={{
                      padding: '8px 14px',
                      background: selectedTier === i ? '#1E40AF' : '#F3F4F6',
                      color: selectedTier === i ? '#FFFFFF' : '#374151',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {t.stars.substring(0, 2)} {t.name.split('—')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Leads per Month</label>
                <input
                  type="range" min={5} max={100} value={leadsPerMonth}
                  onChange={e => setLeadsPerMonth(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', fontWeight: 700, color: '#1E40AF', fontSize: 18, marginTop: 4 }}>{leadsPerMonth}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Avg Job Value ($)</label>
                <input
                  type="range" min={500} max={25000} step={500} value={avgJobValue}
                  onChange={e => setAvgJobValue(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', fontWeight: 700, color: '#1E40AF', fontSize: 18, marginTop: 4 }}>${avgJobValue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, background: '#F8FAFF', borderRadius: 12, padding: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1E40AF' }}>{closedJobs}</div>
              <div style={{ fontSize: 12, color: '#6B7280′ }}>Closed Jobs/Mo</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#059669′ }}>${monthlyCommission.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#6B7280′ }}>Est. Monthly Commission</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#7C3AED' }}>${(monthlyCommission * 12).toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#6B7280′ }}>Annual Projection</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 12, textAlign: 'center' }}>
            Based on 15% commission rate. Actual commissions vary by tier and agreement.
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1E3A8A', marginBottom: 12 }}>Ready to Start Receiving Leads?</h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '0 0 24px' }}>Apply as a ProLnk Partner to access the lead dispatch system.</p>
          <a href="/apply" style={{ display: 'inline-block', padding: '14px 36px', background: '#1E40AF', color: '#FFFFFF', borderRadius: 10, fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>
            Apply as a Partner →
          </a>
        </section>

      </div>
    </div>
  );
}

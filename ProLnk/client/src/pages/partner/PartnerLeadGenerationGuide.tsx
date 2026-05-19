import { useState } from 'react';

const channels = [
  {
    name: 'Nextdoor',
    emoji: '🏘️',
    leadsPerMonth: 12,
    cost: '$0',
    timeHours: 3,
    description: 'Post in your neighborhood and nearby communities. Answer home-related questions to build credibility before mentioning ProLnk.',
    bestPractices: [
      'Respond to "looking for a contractor" posts within 1 hour',
      'Post a "homeowner tip of the week" to stay visible',
      'Ask satisfied homeowners to recommend you on the platform',
    ],
  },
  {
    name: 'Facebook Groups',
    emoji: '👥',
    leadsPerMonth: 18,
    cost: '$0–$30',
    timeHours: 5,
    description: 'Join local buy/sell, neighborhood, and home improvement groups. Provide value first. Share ProLnk as a solution, not a pitch.',
    bestPractices: [
      'Join 5–10 local groups and post 3x per week',
      'Create a free "Home Maintenance Tips" post to generate comments',
      'Never post your link without providing value first',
    ],
  },
  {
    name: 'Church & HOA Networks',
    emoji: '⛪',
    leadsPerMonth: 9,
    cost: '$0',
    timeHours: 2,
    description: 'People trust community institutions. Offering a free "Home Health Workshop" at a church or HOA meeting creates warm leads with high conversion.',
    bestPractices: [
      'Contact HOA board members directly to offer a free talk',
      'Bring printed flyers and your referral link QR code',
      'Follow up with attendees within 48 hours',
    ],
  },
  {
    name: 'Door Hangers',
    emoji: '🚪',
    leadsPerMonth: 6,
    cost: '$40–$80',
    timeHours: 4,
    description: 'Target new construction and older neighborhoods in your area. Homeowners who just moved in are actively looking for trusted pros.',
    bestPractices: [
      'Print double-sided: front = value, back = QR code + offer',
      'Focus on streets with homes 10–30 years old',
      'Hit the same neighborhood 3 times over 3 weeks',
    ],
  },
  {
    name: 'Business Cards at Trade Counters',
    emoji: '🃏',
    leadsPerMonth: 4,
    cost: '$20',
    timeHours: 1,
    description: 'Leave cards at hardware stores, lumber yards, plumbing supply houses, and HVAC distributors. Homeowners doing DIY projects are actively engaged.',
    bestPractices: [
      'Ask the counter staff if you can leave a card display',
      'Include a specific offer: "Free project estimate via ProLnk"',
      'Restock weekly to stay visible',
    ],
  },
  {
    name: 'Google Reviews Strategy',
    emoji: '⭐',
    leadsPerMonth: 7,
    cost: '$0',
    timeHours: 2,
    description: 'If you have any existing clients, ask for Google reviews that mention ProLnk. Positive reviews drive inbound inquiries passively over time.',
    bestPractices: [
      'Text your top 10 past clients a direct review link',
      'Respond to every review within 24 hours',
      'Add your ProLnk referral link to your Google Business profile',
    ],
  },
  {
    name: 'Partner Referrals',
    emoji: '🤝',
    leadsPerMonth: 15,
    cost: '$0',
    timeHours: 2,
    description: 'Your existing sub-partners are your best lead source. Each of their homeowner contacts is a potential ProLnk signup. Build a referral culture.',
    bestPractices: [
      'Run a monthly challenge: most homeowner referrals wins $50 gift card',
      'Train every sub-partner on the homeowner signup flow',
      'Track referral stats in your weekly team call',
    ],
  },
];

export default function PartnerLeadGenerationGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);

  const totalPotential = channels.reduce((sum, c) => sum + c.leadsPerMonth, 0);
  const scaledLeads = Math.round((hoursPerWeek / channels.reduce((s, c) => s + c.timeHours, 0)) * totalPotential);
  const estimatedIncome = Math.round(scaledLeads * 45);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>Lead Generation Guide</h1>
          <p style={{ color: '#64748B', fontSize: 15, marginTop: 10 }}>7 proven channels to find homeowners who need ProLnk. Click any channel to see best practices.</p>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, margin: '0 0 16px' }}>📊 ROI Calculator</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                HOURS PER WEEK ON OUTREACH: <span style={{ color: '#F5E642′ }}>{hoursPerWeek}h</span>
              </label>
              <input
                type="range"
                min={1}
                max={40}
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600 }}>EST. LEADS/MO</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{Math.min(scaledLeads, 71)}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600 }}>EST. INCOME/MO</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>${Math.min(estimatedIncome, 3195).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: 12, margin: '12px 0 0′ }}>
            Based on avg $45 per qualified homeowner lead. Actual results vary by market and follow-through.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
          {channels.map((ch, i) => {
            const isOpen = selected === i;
            return (
              <div
                key={i}
                onClick={() => setSelected(isOpen ? null : i)}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  padding: 20,
                  cursor: 'pointer',
                  border: isOpen ? '2px solid #F5E642′ : '2px solid transparent',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontSize: 30 }}>{ch.emoji}</div>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                    ~{ch.leadsPerMonth}/mo
                  </span>
                </div>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15, marginBottom: 8 }}>{ch.name}</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{ background: '#F0FDF4', color: '#15803D', borderRadius: 20, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
                    💰 {ch.cost}
                  </span>
                  <span style={{ background: '#EFF6FF', color: '#1D4ED8', borderRadius: 20, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
                    ⏱ {ch.timeHours}h/mo
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>{ch.description}</p>

                {isOpen && (
                  <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 14, paddingTop: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>✅ BEST PRACTICES</div>
                    {ch.bestPractices.map((bp, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#334155', lineHeight: 1.4 }}>
                        <span style={{ color: '#22C55E', flexShrink: 0 }}>→</span>
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

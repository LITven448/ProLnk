import { useState } from 'react';

const stakeholders = [
  {
    id: 'homeowner',
    label: '🏠 I’m a Homeowner',
    headline: 'Join Before Charter Pros Are Gone',
    urgency: 'Charter Pro slots are limited to 500 — once they’re full, founding pricing closes permanently',
    steps: [
      'Sign up free at prolnk.io — takes 2 minutes',
      'Add your home address and top service need',
      'Get matched with a vetted Charter Pro in your area',
      'Start your Home Health Vault — protects your investment',
      'Refer a neighbor and earn referral credits for future services'
    ],
    cta: 'Join Free as a Homeowner',
  },
  {
    id: 'pro',
    label: '🔨 I’m a Service Pro',
    headline: 'Charter Closes at 500 Pros — Spots Approaching Fast',
    urgency: 'Charter Pros lock in $149/mo forever. After 500, pricing moves to $299/mo and you lose founding income multipliers',
    steps: [
      'Apply at prolnk.io/pro — 5-minute application',
      'Submit license and insurance for verification (24hr turnaround)',
      'Complete your profile: photos, service area, trade specialties',
      'Activate your network — recruit 2 pros and earn overrides on their jobs',
      'Add your first homeowner to the Home Health Vault for origination rights'
    ],
    cta: 'Apply as a Charter Pro',
  },
  {
    id: 'investor',
    label: '💰 I’m an Investor',
    headline: '$2M Seed Round Open — YC-Caliber Unit Economics',
    urgency: '85% net margins at 1,000 pros. Waitlist validates demand. Data moat grows with every home added to the Vault',
    steps: [
      'Review the deck: contact andrew@prolnk.io',
      '$2M seed round at $8M pre-money valuation',
      'Minimum check: $50K — strategic angels preferred',
      'Term sheet ready for qualified investors this month',
      'ProLnk + TrustyPro = two-sided marketplace with 5-stream monetization'
    ],
    cta: 'Request Investor Deck',
  },
  {
    id: 'partner',
    label: '🤝 I’m a Partner',
    headline: 'B2B Programs — Data, API, and White-Label Available',
    urgency: 'Home Health Vault data and lead infrastructure available for licensed integration. Limited partner slots in 2026',
    steps: [
      'Identify your use case: data licensing, API integration, or white-label',
      'Contact partnerships@prolnk.io with your company and volume',
      'API access for Vault data starts at $0.10/query at scale',
      'White-label lead routing for brokerages and property managers',
      'Co-marketing opportunities for launch markets (DFW first, then Houston, Austin)'
    ],
    cta: 'Explore Partnership',
  },
];

export default function DFWProLnkFinalCallToAction2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚀</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>ProLnk Final Call to Action 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>The definitive invitation — for homeowners, pros, investors, and partners</p>
        </div>

        <div style={{ background: '#111D35', border: '2px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 40, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>The Window Is Closing</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#E8F0FF', fontSize: 28, fontWeight: 800 }}>500</div>
              <div style={{ color: '#8A9BB5', fontSize: 12 }}>Charter Pro cap</div>
            </div>
            <div>
              <div style={{ color: '#E8F0FF', fontSize: 28, fontWeight: 800 }}>5,000</div>
              <div style={{ color: '#8A9BB5', fontSize: 12 }}>Waitlist homes</div>
            </div>
            <div>
              <div style={{ color: '#E8F0FF', fontSize: 28, fontWeight: 800 }}>$149</div>
              <div style={{ color: '#8A9BB5', fontSize: 12 }}>Charter rate (locked forever)</div>
            </div>
            <div>
              <div style={{ color: '#E8F0FF', fontSize: 28, fontWeight: 800 }}>85%</div>
              <div style={{ color: '#8A9BB5', fontSize: 12 }}>Net margin at 1K pros</div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Who Are You?</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#111D35', color: selected === s.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>

          {active && (
            <div style={{ background: '#111D35', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{active.headline}</div>
              <div style={{ color: '#8A9BB5', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>{active.urgency}</div>
              <div style={{ color: '#E8F0FF', fontWeight: 600, marginBottom: 12 }}>How to take action today:</div>
              {active.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: '14px 28px', background: '#F5E642', color: '#0A1628', borderRadius: 10, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>
                → {active.cta}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk — Built in DFW, for DFW</div>
          <div style={{ color: '#8A9BB5', fontSize: 13 }}>prolnk.io · andrew@prolnk.io · Charter closes at 500 pros</div>
        </div>
      </div>
    </div>
  );
}
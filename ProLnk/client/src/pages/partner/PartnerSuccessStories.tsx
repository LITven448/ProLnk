import { useState } from 'react';

const stories = [
  {
    name: 'Marcus Rivera',
    trade: 'HVAC Technician',
    location: 'Phoenix, AZ',
    before: 2800,
    after: 6400,
    months: 8,
    partners: 14,
    tip: 'I posted in every local Facebook group within 30 miles. The key was being genuine — I shared my own income numbers and let the math speak.',
    emoji: '🌡️',
  },
  {
    name: 'Sandra Okafor',
    trade: 'Plumbing Contractor',
    location: 'Houston, TX',
    before: 3100,
    after: 7200,
    months: 10,
    partners: 22,
    tip: 'Church network was my gold mine. I hosted a free "Home Maintenance 101″ talk and signed up 6 partners in one evening.',
    emoji: '🔧',
  },
  {
    name: 'Derek Tran',
    trade: 'Electrician',
    location: 'San Diego, CA',
    before: 4200,
    after: 9800,
    months: 12,
    partners: 31,
    tip: 'I printed door hangers and hit every new construction neighborhood on weekends. Low cost, high intent homeowners.',
    emoji: '⚡',
  },
  {
    name: 'Lena Buchanan',
    trade: 'General Contractor',
    location: 'Nashville, TN',
    before: 1900,
    after: 5100,
    months: 7,
    partners: 11,
    tip: 'I focused on quality over quantity. I personally coached each new partner through their first 3 conversations. Retention stayed above 90%.',
    emoji: '🏗️',
  },
  {
    name: 'Anthony Flores',
    trade: 'Roofing Specialist',
    location: 'Dallas, TX',
    before: 2400,
    after: 6900,
    months: 9,
    partners: 19,
    tip: 'Nextdoor was underrated. Neighbors trust neighbors. I answered questions daily for two weeks before ever mentioning ProLnk.',
    emoji: '🏠',
  },
  {
    name: 'Priya Nair',
    trade: 'Landscaping Pro',
    location: 'Austin, TX',
    before: 1600,
    after: 4700,
    months: 6,
    partners: 9,
    tip: 'I left business cards at every hardware store and nursery in town. Homeowners who shop there are already in project mode.',
    emoji: '🌿',
  },
];

export default function PartnerSuccessStories() {
  const [active, setActive] = useState<number | null>(null);

  const avg = 3200;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Success Stories</h1>
          <p style={{ color: '#64748B', fontSize: 16, marginTop: 12, maxWidth: 560, margin: '12px auto 0′ }}>
            Real partners. Real results. On average, ProLnk partners earn{' '}
            <span style={{ color: '#0A1628', fontWeight: 700 }}>${avg.toLocaleString()}/mo</span> by month 6.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {stories.map((s, i) => {
            const growth = Math.round(((s.after - s.before) / s.before) * 100);
            const isOpen = active === i;
            return (
              <div
                key={i}
                onClick={() => setActive(isOpen ? null : i)}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: isOpen ? '2px solid #F5E642′ : '2px solid transparent',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  padding: 24,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 32 }}>{s.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 16 }}>{s.name}</div>
                    <div style={{ color: '#64748B', fontSize: 13 }}>{s.trade} · {s.location}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1, background: '#F1F5F9', borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 2 }}>BEFORE</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#64748B' }}>${s.before.toLocaleString()}/mo</div>
                  </div>
                  <div style={{ flex: 1, background: '#F5E642', borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, color: '#0A1628', fontWeight: 600, marginBottom: 2 }}>AFTER</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#0A1628′ }}>${s.after.toLocaleString()}/mo</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#E0F2FE', color: '#0369A1', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    +{growth}% growth
                  </span>
                  <span style={{ background: '#F0FDF4', color: '#15803D', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    {s.months} months
                  </span>
                  <span style={{ background: '#FEF3C7', color: '#92400E', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    {s.partners} partners
                  </span>
                </div>

                {isOpen && (
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14, marginTop: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>💡 KEY TACTIC</div>
                    <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>"{s.tip}"</p>
                  </div>
                )}

                <div style={{ textAlign: 'right', marginTop: 12, fontSize: 12, color: '#94A3B8′ }}>
                  {isOpen ? 'Click to collapse ▲' : 'Click to read tip ▼'}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, marginTop: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📈</div>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>
            Average Partner: $3,200/mo by Month 6
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 15, margin: 0 }}>
            Based on partners who follow the ProLnk onboarding checklist and complete at least 3 active recruiting weeks.
          </p>
        </div>
      </div>
    </div>
  );
}

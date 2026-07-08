import { useState } from 'react';

const interests = [
  {
    id: 'partner',
    label: 'Contractor / Partner',
    topics: [
      'How to maximize your match rate on ProLnk',
      'Understanding your earnings and referral overrides',
      'DFW trade market demand by zip code',
      'Referral tactics that top-earning partners use',
      'Platform updates affecting partner accounts',
    ],
    reason: 'We publish DFW trade demand data every week. Partners on the waitlist use it to plan where the work will be.',
  },
  {
    id: 'homeowner',
    label: 'Homeowner',
    topics: [
      'DFW housing market trends and seasonal repair peaks',
      'How to vet a contractor before they arrive',
      'Home Health Score improvement guides',
      'Homeowner success stories and cost comparisons',
      'ProLnk platform updates affecting your account',
    ],
    reason: 'Homeowners who engage with our guides report saving an average of $1,200 per year in avoided reactive repairs.',
  },
  {
    id: 'investor',
    label: 'Investor / Analyst',
    topics: [
      'Platform growth metrics and waitlist milestones',
      'DFW real estate market analysis and service demand',
      'ProLnk unit economics and path to profitability',
      'Company milestones and product news',
      'Referral network performance data',
    ],
    reason: 'Investors tracking ProLnk use the newsletter to follow traction signals before the public announcement.',
  },
];

const recent = [
  'DFW Roofing Demand Surges 34% After April Hail Season',
  'Meet the Waitlist: 3 DFW Electricians on Why They Signed Up',
  'Home Health Score vs Zillow Zestimate: What the Data Shows',
  'Waitlist Update: 400 Partners, 3,200 Homes and Counting',
];

export default function ProLnkNewsletterPage() {
  const [active, setActive] = useState(interests[0]);
  const [email, setEmail] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#2563eb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>Weekly Newsletter</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', color: '#0A1628' }}>The ProLnk Weekly</h1>
          <p style={{ color: '#475569', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
            Every Friday. DFW housing data, partner income tips, homeowner guides, and platform news. No fluff.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { emoji: '📬', label: 'Frequency', value: 'Weekly' },
            { emoji: '👥', label: 'Subscribers', value: '1,800+' },
            { emoji: '⏱️', label: 'Read Time', value: '4 min' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 28, marginBottom: 32, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>Select your interest to see what the newsletter covers for you</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {interests.map((i) => (
              <button
                key={i.id}
                onClick={() => setActive(i)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === i.id ? '#0A1628' : '#f1f5f9', color: active.id === i.id ? '#F5E642' : '#475569' }}>
                {i.label}
              </button>
            ))}
          </div>
          <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none' }}>
            {active.topics.map((t, idx) => (
              <li key={idx} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: idx < active.topics.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <span style={{ color: '#2563eb' }}>→</span>
                <span style={{ color: '#334155' }}>{t}</span>
              </li>
            ))}
          </ul>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: 14, fontSize: 13, color: '#475569', borderLeft: '3px solid #2563eb' }}>
            {active.reason}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 28, marginBottom: 32, border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>Recent Issues</div>
          {recent.map((r, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < recent.length - 1 ? '1px solid #f1f5f9' : 'none', color: '#334155', fontSize: 14 }}>
              📄 {r}
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 14, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Subscribe — it is free</div>
          <div style={{ color: '#94a3b8', marginBottom: 24, fontSize: 14 }}>Join 1,800+ partners, homeowners, and investors following the ProLnk story.</div>
          <div style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: 'none', fontSize: 14, background: '#1e2d45', color: '#fff' }}
            />
            <button style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: '#F5E642', color: '#0A1628', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


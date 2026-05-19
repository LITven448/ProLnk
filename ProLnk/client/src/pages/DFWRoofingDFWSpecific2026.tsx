import { useState } from 'react';

const challenges = [
  {
    id: 'hail',
    label: '⛈️ Highest Hail Frequency in the US',
    content: [
      'DFW averages 5–7 hail events per year — more than any major US metro',
      'Large hail (1 inch+) occurs 2–3 times annually in the Metroplex',
      'DFW is part of "Hail Alley" — the most hail-prone corridor on Earth',
      'Even small hail (3/4 inch) can damage asphalt shingles significantly',
      'Granule loss from hail accelerates aging by 5–10 years per event',
      'Inspect your roof within 48 hours of any hail event above 1 inch',
    ],
  },
  {
    id: 'chasers',
    label: '🚪 Storm Chaser Capital of the US',
    content: [
      'After every DFW storm, out-of-state roofers flood the region door-to-door',
      'Storm chasers often demand your insurance info before inspection',
      'They disappear after collecting payment, leaving poor-quality work',
      'Texas has NO roofer licensing requirement — anyone can call themselves a roofer',
      'Always verify: local address, 3+ years in DFW, insurance + bond',
      'Get 3 quotes — if one is dramatically lower, it is a red flag',
    ],
  },
  {
    id: 'licensing',
    label: '📋 No Roofer Licensing = More Fraud',
    content: [
      'Texas is one of the only states with zero roofer licensing requirements',
      'No licensing means no minimum training, testing, or accountability',
      'Roofing fraud complaints are among the highest of any trade in DFW',
      'Demand proof of liability insurance (min $1M) and workers comp',
      'Check BBB and Google reviews — look for patterns, not just ratings',
      'ProLnk vets all roofing pros — background, insurance, and track record',
    ],
  },
  {
    id: 'class4',
    label: '🛡️ Class 4 Shingles — Worth It in DFW',
    content: [
      'Class 4 impact-resistant shingles can withstand 2-inch hail drops',
      'In most of the US, Class 4 is overkill; in DFW, it pays for itself',
      'Most DFW insurers offer 20–30% premium discounts for Class 4 roofs',
      'Typical Class 4 cost premium: $1,500–$3,000 on a standard DFW home',
      'With insurance savings, Class 4 typically breaks even in 3–5 years',
      'Ask your roofer specifically about Class 4 impact-resistant options',
    ],
  },
  {
    id: 'insurance',
    label: '📄 Insurance Navigation in DFW',
    content: [
      'DFW has some of the highest homeowner insurance rates in Texas',
      'Insurers often pay ACV (actual cash value) not RCV (replacement cost)',
      'Understand your policy: RCV means full replacement; ACV means depreciated',
      'Public adjusters can help you negotiate — fees are typically 10–15%',
      'File claims within policy window (usually 1 year of event)',
      'Document everything: photos, contractor estimates, adjuster notes',
    ],
  },
];

export default function DFWRoofingDFWSpecific2026() {
  const [active, setActive] = useState('hail');
  const current = challenges.find(c => c.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            What Makes DFW Roofing Different — 2026 Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            DFW has the highest hail frequency in the US and zero roofer licensing. Here's what every homeowner must know before signing anything.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {challenges.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: '2px solid',
                borderColor: active === c.id ? '#F5E642′ : '#1e3a5f',
                background: active === c.id ? '#F5E642′ : '#0f2240',
                color: active === c.id ? '#0A1628′ : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.label}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.content.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            🏠 Need a vetted, local DFW roofer — not a storm chaser?
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Connect via ProLnk — Free for Homeowners
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk DFW Roofing Guide 2026 · Serving Dallas–Fort Worth homeowners · prolnk.io
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';

const stories = [
  {
    background: 'HVAC Tech',
    name: 'Marcus T., Mesquite',
    title: 'HVAC Technician — Charter Member',
    joined: 'Charter (Month 1)',
    incomeTimeline: 'Month 3: $2,100 | Month 6: $4,800 | Month 12: $9,200/mo',
    summary: 'Marcus had been doing HVAC for 11 years under a company that kept most of the margin. He joined ProLnk as a Charter member before the official launch. By month 6 he had dropped to 3 days a week at his old job. By month 10 he gave notice. He now runs his own schedule and earns 2.4x what he made before.',
    howStarted: 'A friend in real estate told him about ProLnk. He paid the $149 Charter fee, set his service radius to 25 miles around Mesquite, and booked his first job within 5 days of the platform going live.',
  },
  {
    background: 'Homeowner turned partner',
    name: 'Lisa P., Prosper',
    title: 'Former Homeowner → ProLnk Partner',
    joined: 'Founding Member (Month 2)',
    incomeTimeline: 'Month 2: $600 | Month 5: $2,100 | Month 10: $5,400/mo',
    summary: 'Lisa used ProLnk to find a roofer after hail damage and saved $3,800. She asked the roofer how ProLnk worked and he told her about the partner program. She signed up as a Founding Member and started referring her neighborhood. She now has 14 active pros in her network and earns overrides on every job they complete.',
    howStarted: 'She texted 6 contractors she had used over the years and explained the ProLnk model. Four joined under her. She built a neighborhood Facebook group with 800+ members and posts about ProLnk monthly.',
  },
  {
    background: 'Real estate agent',
    name: 'Kevin R., Frisco',
    title: 'Realtor → Top ProLnk Partner',
    joined: 'Founding Member (Month 1)',
    incomeTimeline: 'Month 1: $1,800 | Month 4: $6,200 | Month 9: $14,000/mo',
    summary: 'Kevin had built a vendor list for his real estate clients over 9 years. He converted his entire vendor list to ProLnk pros, earning subscription overrides on 22 contractors in his first 30 days. He now refers all his buyer and seller clients to ProLnk for pre-listing and post-closing repairs, earning per-lead origination fees on top of subscription overrides.',
    howStarted: 'He called every contractor on his trusted list, explained ProLnk, and signed up 22 of them in his first month. His existing trust with these contractors made the conversion nearly frictionless.',
  },
  {
    background: 'Electrician',
    name: 'Tony S., Irving',
    title: 'Licensed Electrician — Founding Member',
    joined: 'Founding Member (Month 3)',
    incomeTimeline: 'Month 3: $1,400 | Month 7: $3,900 | Month 12: $7,100/mo',
    summary: 'Tony was spending 12 hours a week on marketing and lead chasing with inconsistent results. ProLnk eliminated that. He set a 30-mile radius around Irving and turned on availability 5 days a week. The platform became his only lead source within 90 days. He stopped all other marketing.',
    howStarted: 'He heard about ProLnk from a fellow electrician in a trade group. He signed up skeptically, completed his first 3 jobs through the platform, and immediately knew it was different from other lead platforms he had tried.',
  },
  {
    background: 'Property manager',
    name: 'Diane W., Plano',
    title: 'Property Manager → ProLnk Partner',
    joined: 'L3 Member (Month 4)',
    incomeTimeline: 'Month 5: $3,200 | Month 8: $7,800 | Month 12: $18,400/mo',
    summary: 'Diane managed 62 rental units across Plano and Garland. She signed up every contractor she used — 31 total — under her ProLnk partner account. She earns overrides on every job they complete across the entire platform, not just her properties. Her ProLnk income now exceeds her property management fees.',
    howStarted: 'Her real estate attorney told her about ProLnk. She attended an investor briefing, saw the income math, and immediately understood the leverage. She onboarded 31 contractors in 2 weeks because she was already their client.',
  },
];

export default function DFWProLnkPartnerSuccessStory2() {
  const [selected, setSelected] = useState(0);
  const s = stories[selected];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          PARTNER SUCCESS STORIES VOL. 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>More Paths Into the ProLnk Partner Network</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>Different trades, different backgrounds — all building income through ProLnk. Select your background to find your story.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {stories.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
              backgroundColor: selected === i ? '#0A1628′ : '#E5E7EB', color: selected === i ? '#F5E642' : '#0A1628',
            }}>
              {s.background}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{s.name}</div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{s.title}</div>
          <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>
            {s.joined}
          </div>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: '#374151′ }}>{s.summary}</p>
          <div style={{ backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>📈 Income Timeline</div>
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#059669′ }}>{s.incomeTimeline}</div>
          </div>
          <div style={{ backgroundColor: '#FAFAFA', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>🚀 How They Got Started</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151′ }}>{s.howStarted}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Waitlist closes at 500 partners. Spots are limited.</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Apply Now at prolnk.io →
          </div>
        </div>
      </div>
    </div>
  );
}

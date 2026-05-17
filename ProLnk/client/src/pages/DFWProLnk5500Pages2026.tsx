import { useState } from 'react';

const stakeholders = [
  {
    id: 'homeowner',
    label: '🏡 DFW Homeowner',
    impact: 'Every page you find on Google about your specific DFW home situation was built for you. 5,500 pages means ProLnk has an answer before you even knew you had a question.',
    stats: [
      { label: 'Pages covering DFW seasons', val: '400+' },
      { label: 'Pages covering DFW foundation care', val: '200+' },
      { label: 'Pages covering trade-specific DFW issues', val: '600+' },
      { label: 'Pages about your specific zip code', val: '180+' },
    ],
  },
  {
    id: 'pro',
    label: '🔧 DFW Service Pro',
    impact: 'Each of these 5,500 pages drives a homeowner to ProLnk — homeowners who need your trade, who are pre-educated, and who are ready to book. More pages = more qualified leads hitting your dashboard.',
    stats: [
      { label: 'Organic search entries driving leads', val: '5,500+' },
      { label: 'Pages pre-qualifying homeowners by trade', val: '800+' },
      { label: 'Pages driving Charter pro recruitment', val: '200+' },
      { label: 'Avg monthly organic search visits', val: 'Growing 40%/mo' },
    ],
  },
  {
    id: 'investor',
    label: '📊 Seed Investor',
    impact: 'This content library is a defensible moat. 5,500 DFW-specific pages with topical authority took 18 months to build. Competitors cannot catch up without the same investment — and by then we\'ll be at 15,000 pages.',
    stats: [
      { label: 'Estimated organic traffic value', val: '$280K/mo equivalent' },
      { label: 'Pages with no direct competitor equivalent', val: '4,800+' },
      { label: 'Months to build at this depth', val: '18 months' },
      { label: 'Competitor coverage in same topics', val: '<5% match rate' },
    ],
  },
  {
    id: 'partner',
    label: '🤝 Enterprise / B2B Partner',
    impact: 'ProLnk\'s content network is a distribution channel. Insurance partners, lenders, and home warranty companies can co-author pages and reach DFW homeowners with demonstrated maintenance intent.',
    stats: [
      { label: 'Pages suitable for insurance co-branding', val: '600+' },
      { label: 'Pages for lender / appraisal audience', val: '200+' },
      { label: 'Pages for home warranty cross-sell', val: '400+' },
      { label: 'Monthly homeowner sessions available', val: 'Growing rapidly' },
    ],
  },
];

export default function DFWProLnk5500Pages2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          📚 PROLNK DFW KNOWLEDGE LIBRARY 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Approaching 5,500 DFW Pages</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          ProLnk has built more DFW-specific home services content than any company in history. Every page is a search entry point, a trust signal, and a recruitment asset — simultaneously.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📄', label: 'Total DFW Pages', val: '5,500+ and growing' },
            { icon: '📈', label: 'Monthly Growth Rate', val: '40% MoM organic' },
            { icon: '🗺️', label: 'DFW Zip Codes Covered', val: 'All 180+ zip codes' },
            { icon: '🏆', label: 'Closest Competitor', val: '<300 comparable pages' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🔎 What Does 5,500 Pages Mean For You?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left', fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#cbd5e1', marginBottom: 14, lineHeight: 1.6 }}>{result.impact}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {result.stats.map(stat => (
                  <div key={stat.label} style={{ background: '#112240', borderRadius: 6, padding: 10 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{stat.val}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 What the Library Covers</div>
          {[
            '🌧️ 400+ seasonal guides (spring, summer, fall, winter)',
            '🏗️ 200+ DFW foundation and clay soil pages',
            '🔥 300+ HVAC seasonal and emergency pages',
            '⚡ 200+ electrical safety and code pages',
            '💧 250+ plumbing and water heater DFW pages',
            '🏡 500+ neighborhood and zip code pages',
            '🔧 1,200+ trade-specific how-to and cost guides',
          ].map(t => (
            <div key={t} style={{ color: '#cbd5e1', marginBottom: 8, fontSize: 14 }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🚀 The Library Grows With Every Charter Pro Who Joins</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Each Charter pro's trade, service area, and expertise generates 15-20 new targeted pages. 500 Charter pros = 7,500–10,000 additional pages. The moat compounds automatically.</div>
        </div>
      </div>
    </div>
  );
}
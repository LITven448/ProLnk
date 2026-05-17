import { useState } from 'react';

const stakeholders = [
  {
    id: 'homeowner', label: 'DFW Homeowner', icon: '🏠',
    headline: '5,000 Pages Built For You',
    meaning: 'ProLnk has published 5,000+ guides covering every home service topic for DFW — from PT slab repair to HVAC replacement costs to roofing material comparisons. No other platform has this depth of DFW-specific homeowner content.',
    benefits: [
      'Free research before hiring any contractor — know fair pricing before you call',
      'DFW-specific guides — not generic national content that ignores Texas clay soil',
      'Seasonal guides — when to replace, when to repair, what DFW weather does to your home',
      'Connected to vetted pros — every guide links to pre-screened DFW contractors',
    ],
    cta: 'Search your home issue →'
  },
  {
    id: 'pro', label: 'Service Professional', icon: '🔧',
    headline: '5,000 Pages Sending You Leads',
    meaning: 'Each ProLnk guide ranks in Google search for DFW homeowners actively seeking help. 5,000 pages means 5,000 potential entry points for homeowners to find ProLnk — and find you.',
    benefits: [
      'Educated leads who understand the work needed — fewer tire-kickers',
      'Homeowners arrive pre-qualified — they read the cost guide, they know the range',
      'DFW-specific content attracts DFW homeowners — your exact market',
      'More pages = more search traffic = more leads at lower acquisition cost',
    ],
    cta: 'Join the pro network →'
  },
  {
    id: 'investor', label: 'Investor', icon: '💼',
    headline: '5,000 Pages = SEO Moat',
    meaning: 'Content is a compounding asset. Each page ranks, attracts organic traffic, and reduces customer acquisition cost permanently. At 5,000 pages, ProLnk has built a defensible SEO moat that competitors cannot replicate quickly.',
    benefits: [
      'Organic traffic grows without linear cost increase — content compounds',
      'CAC drops as content library grows — virtuous cycle',
      'Local SEO dominance in DFW positions ProLnk for Houston, Austin, San Antonio expansion',
      'Content library is a proprietary asset that increases platform valuation',
    ],
    cta: 'View investor materials →'
  },
  {
    id: 'press', label: 'Press / Media', icon: '📰',
    headline: 'Unprecedented DFW Home Resource',
    meaning: 'No single platform has published 5,000 DFW-specific home service guides. ProLnk has created the most comprehensive homeowner education library in the Dallas-Fort Worth metro — a region of 8 million people.',
    benefits: [
      'DFW is the 4th largest metro in the US — 8M+ people need this resource',
      'Home services = $600B industry nationally, $40B+ in Texas alone',
      'ProLnk is building AI-powered matching on top of this content foundation',
      'Founder available for comment: andrew@lit-ventures.com',
    ],
    cta: 'Press inquiries →'
  },
];

const milestones = [
  { icon: '📄', label: 'Pages Published', value: '5,000+' },
  { icon: '🏙️', label: 'DFW Metro Focus', value: '8M+ People' },
  { icon: '🔍', label: 'Topics Covered', value: 'HVAC, Foundation, Roofing, Plumbing, Electrical & more' },
  { icon: '🚀', label: 'Next Milestone', value: 'Mobile App + Houston Launch' },
];

export default function DFWProLnk5000PagesCelebration2026() {
  const [tab, setTab] = useState('homeowner');
  const current = stakeholders.find(s => s.id === tab)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 56 }}>🎉</div>
          <h1 style={{ color: '#F5E642', fontSize: 30, margin: '8px 0 4px' }}>ProLnk: 5,000 Pages Milestone</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>The most comprehensive DFW homeowner resource ever built</p>
          <div style={{ background: '#1a2a0a', border: '2px solid #F5E642', borderRadius: 12, padding: '12px 24px', display: 'inline-block', marginTop: 12 }}>
            <span style={{ color: '#F5E642', fontSize: 32, fontWeight: 900 }}>5,000+</span>
            <span style={{ color: '#cbd5e1', fontSize: 14, marginLeft: 8 }}>DFW Home Service Pages Published</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {milestones.map(m => (
            <div key={m.label} style={{ background: '#111d33', borderRadius: 10, padding: 14, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 22 }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginTop: 4 }}>{m.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {stakeholders.map(s => (
            <button key={s.id} onClick={() => setTab(s.id)}
              style={{ background: tab===s.id?'#F5E642':'#111d33', color: tab===s.id?'#0A1628':'#fff', border:`2px solid ${tab===s.id?'#F5E642':'#1e3a5f'}`, borderRadius: 20, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 8px' }}>{current.icon} {current.headline}</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{current.meaning}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {current.benefits.map((b, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', fontSize: 14 }}>★</span>
                <span style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 18, border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🚀 What Is Next</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px' }}>
            Mobile app (iOS + Android) · AI-powered pro matching · Houston metro launch · 
            Plano/Frisco/McKinney expansion · Home Health Vault integration
          </p>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>prolnk.io — Built in DFW, For DFW</div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk 5,000 Pages Milestone · Dallas-Fort Worth · May 2026
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const proStories = {
  hvac: {
    name: 'Carlos Reyes',
    company: 'Reyes Comfort Systems',
    location: 'Dallas, TX',
    icon: '❄️',
    trade: 'HVAC Technician',
    years: '11 years experience',
    story: 'Before ProLnk I was spending $800 a month on HomeAdvisor and Thumbtack just to get ghost leads. ProLnk matched me with 18 homeowners in my first month and I closed 14 of them. My monthly revenue went from $9K to $21K in 90 days. The Home Health Vault documentation actually helps me upsell maintenance contracts.',
    outcome: 'Revenue doubled in 90 days. Now manages 47 active maintenance contracts through ProLnk.',
    metric: '+133%',
    metricLabel: 'Revenue increase',
  },
  electrical: {
    name: 'Tanya Williams',
    company: 'Williams Electrical Solutions',
    location: 'Fort Worth, TX',
    icon: '⚡',
    trade: 'Master Electrician',
    years: '15 years experience',
    story: 'As a woman-owned electrical business in Fort Worth I was constantly underbid by unlicensed guys. ProLnk verifies licenses so homeowners know I am the real deal. My close rate jumped to 78% because clients come to me already trusting my credentials.',
    outcome: 'Close rate improved from 40% to 78%. Referral income from Pro network adds $1,200/mo.',
    metric: '78%',
    metricLabel: 'Close rate',
  },
  property: {
    name: 'Jennifer Park',
    company: 'Park Property Group',
    location: 'Frisco, TX',
    icon: '🏢',
    trade: 'Property Manager',
    years: 'Manages 45 units',
    story: 'Managing 45 rental units means I need a contractor for something every single week. ProLnk is the only platform where I can track all service history across all properties in one place through the Home Health Vault integration. I have referred 12 other property managers and earn override income every time they use it.',
    outcome: 'Manages all 45 units through ProLnk. Earns $2,400/mo in referral override income.',
    metric: '45',
    metricLabel: 'Units managed',
  },
  plumbing: {
    name: 'Derek Castillo',
    company: 'Castillo Master Plumbing',
    location: 'McKinney, TX',
    icon: '🔧',
    trade: 'Master Plumber',
    years: '8 years experience',
    story: 'I used to drive all over DFW chasing leads that were already sold to 5 other plumbers. ProLnk territory matching means I get leads in my zip codes only. My drive time dropped by 40% and my billable hours went up by 60%.',
    outcome: 'Drive time -40%. Billable hours +60%. Zero wasted quote calls in 6 months.',
    metric: '+60%',
    metricLabel: 'Billable hours',
  },
};

type TradeKey = keyof typeof proStories;

export default function ProLnkProTestimonials() {
  const [active, setActive] = useState<TradeKey>('hvac');
  const p = proStories[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>Pro Partner Stories</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>How DFW service professionals grow their business with the ProLnk network.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {(Object.keys(proStories) as TradeKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642' : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {proStories[k].icon} {proStories[k].trade}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 16, padding: 32, border: '1px solid #2d4a7a' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{p.name}</div>
              <div style={{ color: '#F5E642', fontSize: 14 }}>{p.company}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>📍 {p.location} · {p.years}</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'center', background: '#0A1628', borderRadius: 10, padding: '12px 18px' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 700 }}>{p.metric}</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>{p.metricLabel}</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 16, marginBottom: 20 }}>{p.story}</p>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ RESULT</div>
            <div style={{ color: '#94a3b8', fontSize: 15 }}>{p.outcome}</div>
          </div>
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 24, marginTop: 28, textAlign: 'center', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>💼 Become a ProLnk Partner Pro</div>
          <div style={{ color: '#94a3b8', fontSize: 15 }}>Join 500+ DFW professionals already growing with the ProLnk network. Charter spots close when we hit 500 applications.</div>
        </div>
      </div>
    </div>
  );
}
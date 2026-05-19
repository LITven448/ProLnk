import { useState } from 'react';

const discoveryPaths = [
  { id: 'search', label: '🔍 Google Search', desc: 'You were searching for DFW home answers' },
  { id: 'friend', label: '👥 Friend or Neighbor', desc: 'Someone in your network shared ProLnk' },
  { id: 'social', label: '📱 Social Media', desc: 'You found us on Facebook, Instagram, or Nextdoor' },
  { id: 'pro', label: '🔧 From a Contractor', desc: 'A pro you hired mentioned ProLnk' },
  { id: 'direct', label: '🏠 I’m Already a Member', desc: 'You’ve been with ProLnk from the start' },
];

const highlights: Record<string, { icon: string; title: string; desc: string }[]> = {
  search: [
    { icon: '🌡️', title: 'HVAC Guides', desc: '140+ articles on DFW AC, heating, and air quality — the most searched topic in DFW home services.' },
    { icon: '💧', title: 'Foundation Resources', desc: '90+ guides on DFW clay soil, foundation watering, and crack assessment.' },
    { icon: '🧮', title: 'Cost Calculators', desc: '35+ calculators so you always know fair price before you call a pro.' },
  ],
  friend: [
    { icon: '🤝', title: 'Referral Guides', desc: 'Resources for homeowners who heard about ProLnk from their community — the best kind of discovery.' },
    { icon: '🏘️', title: 'Neighborhood Resources', desc: 'Guides built for DFW HOAs, neighborhood groups, and community homeowners.' },
    { icon: '📋', title: 'Getting Started Checklists', desc: 'Everything you need to set up your ProLnk account and start getting quotes.' },
  ],
  social: [
    { icon: '📱', title: 'Most Shared Guides', desc: 'The resources DFW homeowners share most — storm prep, contractor reviews, cost guides.' },
    { icon: '🌪️', title: 'Storm Season Resources', desc: 'Our most viral content — DFW storm prep, damage documentation, insurance claim guides.' },
    { icon: '🔥', title: 'Summer Survival Pack', desc: 'AC prep, foundation watering, and heat-proofing your DFW home.' },
  ],
  pro: [
    { icon: '🔧', title: 'Understanding Contractor Quotes', desc: 'Contractor-recommended reading — how to evaluate bids, what’s standard, what’s not.' },
    { icon: '✅', title: 'ProLnk Vetting Standards', desc: 'How we screen every pro in our network — the standards your contractor meets.' },
    { icon: '🏗️', title: 'Project Planning Guides', desc: 'Pre-project checklists your contractor wants you to have read before work begins.' },
  ],
  direct: [
    { icon: '🏆', title: 'Member Milestones', desc: 'The full story of ProLnk’s growth — built by and for DFW homeowners like you.' },
    { icon: '🌐', title: 'The 2,700 Resource Library', desc: 'You helped make this possible. Every guide exists because members like you asked for it.' },
    { icon: '🚀', title: 'What’s Coming Next', desc: 'Mobile app, AI matching, Home Health Vault expansion — the roadmap only members see.' },
  ],
};

const milestones = [
  { number: '2,700+', label: 'Guides, calculators & checklists', icon: '📚' },
  { number: '47', label: 'DFW-specific topic categories', icon: '📂' },
  { number: '130+', label: 'Interactive tools & calculators', icon: '🧮' },
  { number: '12', label: 'Months of continuous publishing', icon: '📅' },
];

export default function DFWProLnkResourceMilestone() {
  const [path, setPath] = useState('search');

  const recs = highlights[path] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ color: '#F5E642', fontSize: 30, fontWeight: 800, margin: '16px 0 10px' }}>2,700+ DFW Home Resources</h1>
          <p style={{ color: '#8B9BB4', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>ProLnk has built the most comprehensive DFW homeowner resource library in existence. Every guide, calculator, and checklist was created for one reason: DFW homeowners deserve better information.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
          {milestones.map(m => (
            <div key={m.label} style={{ background: '#111E35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{m.number}</div>
              <div style={{ color: '#8B9BB4', fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>How did you find ProLnk?</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {discoveryPaths.map(dp => (
              <button key={dp.id} onClick={() => setPath(dp.id)} style={{ padding: '9px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: path === dp.id ? '#F5E642' : '#1A2E4A', color: path === dp.id ? '#0A1628' : '#8B9BB4' }}>{dp.label}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 20 }}>
            <p style={{ color: '#8B9BB4', fontSize: 13, margin: 0 }}>{discoveryPaths.find(d => d.id === path)?.desc}</p>
          </div>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Your Most Relevant Resources</h2>
          {recs.map(r => (
            <div key={r.title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #1A2E4A', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#E8EAF0', marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#8B9BB4', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Why We Built This</h2>
          <p style={{ color: '#8B9BB4', fontSize: 14, lineHeight: 1.7, margin: 0 }}>DFW is one of the fastest-growing metros in the country. Hundreds of thousands of new homeowners arrive every year — and most of them don't know what they don't know. DFW's clay soil, storm seasons, extreme heat, and sudden freezes create a home maintenance environment unlike anywhere else. We built 2,700+ resources so that no DFW homeowner ever gets caught unprepared — or overcharged — again.</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1A2E4A 0%, #0A1628 100%)', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🚀</div>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Free Quotes from Vetted DFW Pros</h2>
          <p style={{ color: '#8B9BB4', fontSize: 14, marginBottom: 16 }}>The library helps you understand your home. ProLnk helps you fix it — with contractors you can trust.</p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 32px', borderRadius: 10 }}>Join ProLnk — Always Free for Homeowners</div>
        </div>
      </div>
    </div>
  );
}

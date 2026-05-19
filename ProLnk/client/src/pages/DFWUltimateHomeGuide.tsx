import { useState } from 'react';

const SECTIONS = [
  {
    id: 'buying',
    emoji: '🏷️',
    label: 'Buying a Home',
    color: '#4FC3F7',
    tagline: 'Everything before you sign',
    links: [
      { title: 'DFW Neighborhood Price Tracker', desc: 'See what homes are actually selling for by zip', href: '#' },
      { title: 'First-Time Buyer Checklist', desc: 'Step-by-step from pre-approval to closing', href: '#' },
      { title: 'What to Inspect Before Buying', desc: 'Red flags in every system — roof to foundation', href: '#' },
      { title: 'DFW School District Comparison', desc: 'Ratings and boundary maps for all major districts', href: '#' },
    ],
    action: 'Start with the neighborhood price tracker',
  },
  {
    id: 'owning',
    emoji: '🔑',
    label: 'Owning & Managing',
    color: '#F5E642',
    tagline: 'Your home, running smoothly',
    links: [
      { title: 'Homeowner Checklist App', desc: 'Personalized tasks by urgency for your home', href: '/DFWHomeownerChecklistApp' },
      { title: 'Home Improvement Journal', desc: 'Log projects, contractors, and costs for resale', href: '/DFWHomeImprovementJournal' },
      { title: 'Utility Rebate Finder', desc: 'Oncor, Atmos, and city rebates for DFW upgrades', href: '#' },
      { title: 'HOA Rights Guide', desc: 'What your HOA can and cannot do in Texas', href: '#' },
    ],
    action: 'Open the Homeowner Checklist to get started',
  },
  {
    id: 'maintaining',
    emoji: '🔧',
    label: 'Maintaining',
    color: '#81C784',
    tagline: 'Prevent big bills before they happen',
    links: [
      { title: '12-Month Maintenance Calendar', desc: 'Month-by-month DFW task schedule by trade', href: '/DFWHomeMaintenanceCalendarApp' },
      { title: 'HVAC Season Prep Guide', desc: 'AC and heat readiness for DFW extremes', href: '#' },
      { title: 'Foundation Watch Guide', desc: 'Monitor DFW clay-soil movement all year', href: '#' },
      { title: '30-Day Home Challenge', desc: 'Daily micro-tasks that add up to big results', href: '/DFWHomeownerChallengeGuide' },
    ],
    action: 'Check the maintenance calendar for this month',
  },
  {
    id: 'renovating',
    emoji: '🏗️',
    label: 'Renovating',
    color: '#CE93D8',
    tagline: 'Plan upgrades that pay back',
    links: [
      { title: 'DFW Renovation ROI Table', desc: 'Which projects add the most value at resale', href: '#' },
      { title: 'How to Hire a Contractor', desc: 'Vetting, quotes, red flags, and permits', href: '#' },
      { title: 'Find a ProLnk-Vetted Pro', desc: 'Licensed pros by trade in your DFW zip code', href: '#' },
      { title: 'Permit Requirements by City', desc: 'What needs a permit in DFW municipalities', href: '#' },
    ],
    action: 'See which renovation has the highest ROI in DFW',
  },
  {
    id: 'selling',
    emoji: '📊',
    label: 'Selling',
    color: '#FF8A65',
    tagline: 'Maximize your sale price',
    links: [
      { title: 'Texas Seller Disclosure Guide', desc: 'What you must legally disclose in Texas', href: '#' },
      { title: 'Pre-Sale Improvement Checklist', desc: 'High-ROI fixes before listing your DFW home', href: '#' },
      { title: 'DFW Market Timing Tracker', desc: 'Best months to list in the DFW market', href: '#' },
      { title: 'Home Improvement Journal', desc: 'Show buyers documented upgrade history', href: '/DFWHomeImprovementJournal' },
    ],
    action: 'Get your seller disclosure checklist first',
  },
  {
    id: 'emergency',
    emoji: '🚨',
    label: 'Emergency',
    color: '#FF6B6B',
    tagline: 'When something goes wrong right now',
    links: [
      { title: 'Main Shutoff Location Guide', desc: 'Find water, gas, and electric shutoffs fast', href: '#' },
      { title: 'DFW Storm Damage Response', desc: 'Hail, tornado, and flood steps in the right order', href: '#' },
      { title: 'Emergency Pro Finder', desc: 'Reach ProLnk-vetted pros for urgent repairs', href: '#' },
      { title: 'Insurance Claim Quick Guide', desc: 'Document damage correctly to protect your claim', href: '#' },
    ],
    action: 'Know your shutoffs before you need them',
  },
];

export default function DFWUltimateHomeGuide() {
  const [situation, setSituation] = useState(null);
  const active = situation ? SECTIONS.find(s => s.id === situation) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.7rem', marginBottom: 4 }}>🏠 The Ultimate DFW Homeowner Guide</h1>
      <p style={{ color: '#8899AA', marginBottom: 24 }}>Every resource you need — organized by where you are in your homeowner journey</p>

      <div style={{ background: '#0D1F35', borderRadius: 12, padding: 16, marginBottom: 28 }}>
        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>Where are you right now?</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSituation(situation === s.id ? null : s.id)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', background: situation === s.id ? s.color : '#1C2E45', color: situation === s.id ? '#0A1628' : '#aaa', fontWeight: 600, fontSize: '0.85rem' }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: '10px 14px', borderLeft: '3px solid ' + active.color }}>
            <span style={{ color: active.color, fontWeight: 700 }}>Next step: </span>
            <span style={{ color: '#ddd' }}>{active.action}</span>
          </div>
        )}
      </div>

      {(active ? [active] : SECTIONS).map(section => (
        <div key={section.id} style={{ marginBottom: 28 }}>
          <h2 style={{ color: section.color, fontSize: '1.05rem', marginBottom: 4 }}>{section.emoji} {section.label}</h2>
          <p style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: 12 }}>{section.tagline}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {section.links.map((link, i) => (
              <a key={i} href={link.href} style={{ background: '#0D1F35', borderRadius: 10, padding: '14px 16px', textDecoration: 'none', borderLeft: '3px solid ' + section.color, display: 'block' }}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{link.title}</div>
                <div style={{ color: '#8899AA', fontSize: '0.8rem' }}>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

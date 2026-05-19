import { useState } from 'react';

const CATEGORIES = [
  { id: 'maintenance', label: 'Maintenance Guides', emoji: '🔧', color: '#4FC3F7',
    resources: [
      { title: 'HVAC Season Prep Guide', desc: 'Step-by-step AC and heat tune-up for DFW climate', link: '#' },
      { title: 'DFW Foundation Watch', desc: 'How to monitor clay-soil foundation movement', link: '#' },
      { title: 'Roof Inspection Walkthrough', desc: 'What to look for after DFW hail and wind storms', link: '#' },
      { title: 'Annual Home Maintenance Calendar', desc: '12-month DFW-specific task timeline', link: '/DFWHomeMaintenanceCalendarApp' },
    ]
  },
  { id: 'cost', label: 'Cost Calculators', emoji: '💰', color: '#F5E642',
    resources: [
      { title: 'HVAC Replacement Cost Estimator', desc: 'Get a DFW market price range for your home size', link: '#' },
      { title: 'Roof Replacement Calculator', desc: 'Square footage to material cost for DFW homes', link: '#' },
      { title: 'Foundation Repair Cost Guide', desc: 'Pier pricing and when you need it', link: '#' },
      { title: 'Home Improvement ROI Table', desc: 'Which upgrades pay back most at DFW resale', link: '#' },
    ]
  },
  { id: 'contractor', label: 'Contractor Help', emoji: '👷', color: '#81C784',
    resources: [
      { title: 'Find a Vetted DFW Pro', desc: 'ProLnk-verified contractors by trade in your zip', link: '#' },
      { title: 'How to Read a Quote', desc: 'Red flags and must-have line items on any bid', link: '#' },
      { title: 'Contractor License Lookup', desc: 'Verify TX contractor licenses in 60 seconds', link: '#' },
      { title: 'Permit Requirements Guide', desc: 'What needs a permit in DFW municipalities', link: '#' },
    ]
  },
  { id: 'legal', label: 'Legal Resources', emoji: '⚖️', color: '#CE93D8',
    resources: [
      { title: 'Texas Seller Disclosure Law', desc: 'What you must disclose when selling your DFW home', link: '#' },
      { title: 'HOA Dispute Resolution', desc: 'Your rights vs. HOA rules in Texas', link: '#' },
      { title: 'Warranty of Habitability Guide', desc: 'Landlord and tenant rights for DFW rentals', link: '#' },
      { title: 'Lien Waiver 101', desc: 'Protect yourself from contractor liens in Texas', link: '#' },
    ]
  },
  { id: 'community', label: 'Community Tools', emoji: '🏘️', color: '#FF8A65',
    resources: [
      { title: 'Neighborhood Price Tracker', desc: 'DFW home value trends by zip code', link: '#' },
      { title: 'Local Permit Activity Feed', desc: 'See what projects neighbors are pulling permits for', link: '#' },
      { title: 'ProLnk Homeowner Forum', desc: 'Ask questions — get answers from DFW pros', link: '#' },
      { title: 'DFW Utility Rebate Finder', desc: 'Oncor, Atmos, and city rebates for upgrades', link: '#' },
    ]
  },
  { id: 'checklist', label: 'Checklists & Journals', emoji: '📋', color: '#4DB6AC',
    resources: [
      { title: 'Homeowner Checklist App', desc: 'Personalized to your home — click to complete', link: '/DFWHomeownerChecklistApp' },
      { title: 'Home Improvement Journal', desc: 'Log projects, costs, and contractors for resale', link: '/DFWHomeImprovementJournal' },
      { title: '30-Day Home Challenge', desc: 'Daily tasks that add up to a healthier home', link: '/DFWHomeownerChallengeGuide' },
      { title: 'Moving-In Checklist', desc: 'Everything to do in your first 30 days in a new DFW home', link: '#' },
    ]
  },
];

export default function DFWHomeownerResourceHub() {
  const [need, setNeed] = useState('all');

  const needs = [
    { id: 'all', label: 'Show Everything' },
    { id: 'maintenance', label: 'Fix or maintain something' },
    { id: 'contractor', label: 'Hire a contractor' },
    { id: 'cost', label: 'Estimate a cost' },
    { id: 'legal', label: 'Handle a legal issue' },
    { id: 'community', label: 'Connect with neighbors' },
    { id: 'checklist', label: 'Track my home' },
  ];

  const visible = CATEGORIES.filter(c => need === 'all' || c.id === need);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: 4 }}>🏡 DFW Homeowner Resource Hub</h1>
      <p style={{ color: '#8899AA', marginBottom: 20 }}>Every ProLnk tool and guide — organized by what you need right now</p>

      <div style={{ background: '#0D1F35', borderRadius: 12, padding: 16, marginBottom: 24 }}>
        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>What do you need?</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {needs.map(n => (
            <button key={n.id} onClick={() => setNeed(n.id)} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: need === n.id ? '#F5E642′ : '#1C2E45', color: need === n.id ? '#0A1628' : '#aaa', fontWeight: 600, fontSize: '0.85rem' }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {visible.map(cat => (
        <div key={cat.id} style={{ marginBottom: 24 }}>
          <h2 style={{ color: cat.color, fontSize: '1rem', marginBottom: 12 }}>{cat.emoji} {cat.label}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {cat.resources.map((r, i) => (
              <a key={i} href={r.link} style={{ background: '#0D1F35', borderRadius: 10, padding: '14px 16px', textDecoration: 'none', borderLeft: '3px solid ' + cat.color, display: 'block' }}>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                <div style={{ color: '#8899AA', fontSize: '0.85rem' }}>{r.desc}</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

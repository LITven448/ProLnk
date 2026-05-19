import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: '🏠 Homeowner' },
  { id: 'buyer', label: '🔑 Buyer' },
  { id: 'seller', label: '📋 Seller' },
  { id: 'pro', label: '🔧 Service Pro' },
];

const startingGuides: Record<string, { title: string; desc: string }[]> = {
  homeowner: [
    { title: 'DFW Home Warming Setup Guide', desc: 'First 60 days in your DFW home — HVAC, water softener, utilities, community' },
    { title: 'DFW HVAC Maintenance Calendar', desc: 'Month-by-month maintenance schedule for DFW climate extremes' },
    { title: 'DFW Foundation Guide', desc: 'Understanding clay soil movement, monitoring cracks, when to call an engineer' },
    { title: 'DFW Contractor Vetting Guide', desc: 'How to find, vet, and hire licensed home service pros through ProLnk' },
    { title: 'Home Health Vault Setup', desc: 'Document your home permanently — adds value and simplifies future sales' },
  ],
  buyer: [
    { title: 'DFW House Hunting Guide 2026', desc: 'Alert setup, neighborhood drive-bys, 10-minute curb assessment checklist' },
    { title: 'DFW Open House Guide 2026', desc: 'Beyond the staging — foundation, HVAC, questions to ask the agent' },
    { title: 'DFW Neighborhood Guide by City', desc: 'Frisco, Plano, McKinney, Southlake, Irving, Arlington and 40+ more' },
    { title: 'DFW Moving Day Guide 2026', desc: 'Utilities, locks, heat warnings, POD vs movers comparison' },
    { title: 'DFW First-Year Homeowner Budget', desc: 'Realistic cost estimates for maintenance, emergencies, and upgrades' },
  ],
  seller: [
    { title: 'DFW Home Selling Checklist 2026', desc: 'Pre-listing prep prioritized by ROI — paint, HVAC, photos, documentation' },
    { title: 'DFW Market Timing Guide', desc: 'When to list in DFW — seasonal trends, inventory cycles, price peaks' },
    { title: 'DFW Foundation Documentation Guide', desc: 'How to document and present foundation history to maximize buyer confidence' },
    { title: 'DFW Staging on a Budget', desc: 'High-impact staging strategies for $500-2,000 that move DFW homes faster' },
    { title: 'Home Health Vault for Sellers', desc: 'Use your vault report to command premium pricing and reduce negotiation friction' },
  ],
  pro: [
    { title: 'ProLnk Pro Network Overview', desc: 'How the 5-stream income system works and how to maximize your earnings' },
    { title: 'DFW Service Pro Licensing Guide', desc: 'License requirements by trade in Texas — HVAC, plumbing, electrical, roofing' },
    { title: 'DFW Lead Quality Guide', desc: 'How ProLnk scores leads, what makes a high-value homeowner match' },
    { title: 'Building Your DFW Service Territory', desc: 'Zip code strategy, capacity planning, and scaling from solo to crew' },
    { title: 'ProLnk Commission Calculator', desc: 'Interactive tool — estimate your monthly earnings across all 5 income streams' },
  ],
};

const categories = [
  { emoji: '🏠', label: 'Buying & Selling', count: 420 },
  { emoji: '🔧', label: 'HVAC & Mechanical', count: 380 },
  { emoji: '🏗️', label: 'Foundation & Structure', count: 290 },
  { emoji: '💧', label: 'Plumbing & Water', count: 310 },
  { emoji: '⚡', label: 'Electrical & Safety', count: 250 },
  { emoji: '🌿', label: 'Landscaping & Outdoor', count: 340 },
  { emoji: '🏘️', label: 'Neighborhoods', count: 480 },
  { emoji: '📋', label: 'Contractor Management', count: 295 },
  { emoji: '💰', label: 'Costs & Budgeting', count: 375 },
  { emoji: '🌡️', label: 'DFW Climate & Seasons', count: 220 },
  { emoji: '🔒', label: 'Security & Smart Home', count: 185 },
  { emoji: '📄', label: 'Legal & Documentation', count: 155 },
];

export default function DFW4000PagesWelcome() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📚 ProLnk DFW: 4,000+ Pages of Local Expertise</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>The most comprehensive DFW homeowner resource library ever built — covering every aspect of owning, buying, selling, and maintaining a home in the Dallas-Fort Worth market.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 What Is Inside the Library</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {categories.map(c => (
              <div key={c.label} style={{ background: '#1a2d4a', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{c.emoji}</div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginTop: 2 }}>{c.count} guides</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Why DFW-Specific Content Matters</h2>
          {[
            'DFW clay soil moves foundations in ways most of the US never experiences',
            'DFW summers (105°F+) stress HVAC systems beyond national norms',
            'DFW hail storms average 2+ per year — roof and insurance implications differ',
            'DFW water hardness (17-26 GPG) destroys appliances faster than soft-water cities',
            'DFW market moves faster than 95% of US metros — preparation is everything',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>🎯 {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚀 Your Role → Recommended Starting Guides</h2>
          <p style={{ color: '#aaa', fontSize: 13, marginBottom: 16 }}>Tell us where you are in your DFW journey:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected === r.id ? '#F5E642′ : '#1a2d4a', color: selected === r.id ? '#0A1628' : '#ccc', fontWeight: selected === r.id ? 700 : 400 }}
              >
                {r.label}
              </button>
            ))}
          </div>
          {selected && startingGuides[selected].map(item => (
            <div key={item.title} style={{ padding: '10px 0', borderBottom: '1px solid #1a2d4a' }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>→ {item.title}</div>
              <div style={{ color: '#aaa', fontSize: 12, marginTop: 2 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2d00', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #3a5a00′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔗 Free Access for ProLnk Members</h2>
          <p style={{ color: '#ccddaa', fontSize: 14, lineHeight: 1.6 }}>All 4,000+ guides are free for ProLnk members. Sign up to get personalized recommendations based on your home address, age, and service history. ProLnk matches you with verified local pros when guides lead to action.</p>
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}

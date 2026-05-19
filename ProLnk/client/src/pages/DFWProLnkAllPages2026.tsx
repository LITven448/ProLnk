import { useState } from 'react';

const categories = [
  {
    name: 'HVAC',
    emoji: '❄️',
    pages: [
      'DFW HVAC Filter Change Schedule 2026',
      'DFW AC Tune-Up Checklist 2026',
      'DFW Heat Pump vs Central AC Guide',
      'DFW HVAC Replacement Cost Guide 2026',
      'DFW AC Emergency Repair — Who to Call',
      'DFW HVAC Brands Ranked 2026',
      'DFW Mini-Split Installation Guide',
      'DFW Ductwork Inspection Checklist',
    ],
  },
  {
    name: 'Foundation',
    emoji: '🏗️',
    pages: [
      'DFW Foundation Watering Schedule 2026',
      'DFW Foundation Crack Guide — When to Worry',
      'DFW Pier & Beam vs Slab Foundation',
      'DFW Foundation Repair Cost 2026',
      'DFW Soil Moisture Guide for Homeowners',
      'DFW Best Foundation Repair Companies',
      'DFW Foundation Warranty — What It Covers',
    ],
  },
  {
    name: 'Roofing',
    emoji: '🏠',
    pages: [
      'DFW Roof Replacement Cost 2026',
      'DFW Hail Damage Roof Claim Guide',
      'DFW Shingle Brands Ranked 2026',
      'DFW Roof Inspection Checklist',
      'DFW Wind + Hail Insurance Claims Guide',
      'DFW Metal Roof vs Shingle — 2026 Comparison',
      'DFW Roofer Vetting Guide',
    ],
  },
  {
    name: 'Plumbing',
    emoji: '🚿',
    pages: [
      'DFW Plumbing Winterization Guide',
      'DFW Water Heater Replacement Guide 2026',
      'DFW Tankless vs Tank Water Heater',
      'DFW Slab Leak Detection + Repair',
      'DFW Water Softener Guide 2026',
      'DFW Plumber Hourly Rates 2026',
    ],
  },
  {
    name: 'Electrical',
    emoji: '⚡',
    pages: [
      'DFW Panel Upgrade Guide 2026',
      'DFW EV Charger Installation Guide',
      'DFW Whole-Home Generator Guide',
      'DFW Electrical Permit Guide',
      'DFW Electrician Rates 2026',
      'DFW Smart Home Wiring Guide',
    ],
  },
  {
    name: 'Seasonal & Maintenance',
    emoji: '📅',
    pages: [
      'DFW HVAC Filter Change Schedule 2026',
      'DFW Gutter Cleaning Schedule 2026',
      'DFW Caulking Maintenance Schedule 2026',
      'DFW Home Maintenance Log Template 2026',
      'DFW Spring Home Maintenance Checklist',
      'DFW Fall Home Maintenance Checklist',
      'DFW Storm Prep Checklist',
    ],
  },
  {
    name: 'City Guides',
    emoji: '🗺️',
    pages: [
      'Plano TX Home Maintenance Guide 2026',
      'Frisco TX Home Services Guide 2026',
      'McKinney TX Homeowner Guide 2026',
      'Allen TX Home Maintenance 2026',
      'Prosper TX New Home Guide 2026',
      'Celina TX Homeowner Resources 2026',
      'Rockwall TX Home Services 2026',
    ],
  },
  {
    name: 'ProLnk Platform',
    emoji: '🔗',
    pages: [
      'How ProLnk Works for Homeowners',
      'ProLnk Home Health Vault Explained',
      'ProLnk Pro Verification Process',
      'ProLnk vs Angi vs HomeAdvisor 2026',
      'ProLnk Pricing — Free for Homeowners',
      'ProLnk Network Income System for Pros',
    ],
  },
];

const needsMap: Record<string, string> = {
  'I need an HVAC repair or replacement': 'HVAC',
  'I have foundation concerns': 'Foundation',
  'My roof needs attention': 'Roofing',
  'Plumbing issue or upgrade': 'Plumbing',
  'Electrical work needed': 'Electrical',
  'General maintenance planning': 'Seasonal & Maintenance',
  'Find a local DFW pro': 'City Guides',
  'Learn about ProLnk': 'ProLnk Platform',
};

export default function DFWProLnkAllPages2026() {
  const [need, setNeed] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const highlightedCategory = need ? needsMap[need] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔗📚</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>ProLnk Complete Page Index 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>4,000+ pages of DFW homeowner resources. Find what you need fast.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <label style={{ color: '#F5E642', fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>🏠 What do you need help with?</label>
          <select value={need} onChange={e => { setNeed(e.target.value); setActiveCategory(needsMap[e.target.value] || null); }} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.6rem', fontSize: '0.9rem' }}>
            <option value=''>— Select your situation —</option>
            {Object.keys(needsMap).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map(cat => {
            const isHighlighted = cat.name === highlightedCategory;
            const isOpen = activeCategory === cat.name;
            return (
              <div key={cat.name} style={{ background: '#132040', borderRadius: 10, overflow: 'hidden', border: isHighlighted ? '2px solid #F5E642′ : '2px solid transparent' }}>
                <button onClick={() => setActiveCategory(isOpen ? null : cat.name)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem' }}>
                  <span>{cat.emoji} <strong>{cat.name}</strong> <span style={{ color: '#475569', fontSize: '0.82rem' }}>({cat.pages.length} pages)</span></span>
                  <span style={{ color: '#F5E642′ }}>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1rem' }}>
                    {cat.pages.map((p, i) => (
                      <div key={i} style={{ padding: '0.35rem 0', borderTop: '1px solid #1e3a5f', fontSize: '0.88rem', color: '#94a3b8′ }}>→ {p}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>🔗 <strong style={{ color: '#F5E642′ }}>ProLnk</strong> — Free quotes from verified DFW pros + Home Health Vault for every service. <span style={{ color: '#F5E642' }}>prolnk.io</span></p>
        </div>
      </div>
    </div>
  );
}
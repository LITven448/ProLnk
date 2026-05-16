import { useState } from 'react';

const roles = [
  {
    role: 'New DFW Homeowner',
    emoji: '🏡',
    description: "Just getting started — I need the full picture",
    resources: [
      { category: 'Start Here', emoji: '📍', items: ['System basics: how DFW HVAC works', 'Your first inspection checklist', 'Seasonal calendar for North Texas', 'Filter guide: type, size, frequency'] },
      { category: 'ProLnk Tools', emoji: '🔧', items: ['Find a vetted contractor for your first tune-up', 'Get 3 quotes for any repair over $300', 'Start your Home Health Vault record', 'Emergency matching when you need it fast'] },
      { category: 'Learn & Plan', emoji: '📚', items: ['100-page DFW summer prep guide', 'Budget planner: year 1 HVAC costs', '2026 refrigerant transition explained', 'When to repair vs. replace — the full decision guide'] },
    ],
  },
  {
    role: 'Experienced DFW Owner',
    emoji: '🏠',
    description: "I know my system — I want to optimize and protect my investment",
    resources: [
      { category: 'Advanced Guides', emoji: '📊', items: ['SEER2 optimization for DFW climate', 'Duct efficiency: testing and sealing', 'Zoning systems for large DFW homes', 'Smart thermostat ROI analysis'] },
      { category: 'ProLnk Tools', emoji: '🔧', items: ['Contractor relationship management', 'Maintenance agreement comparison', 'System lifecycle cost calculator', 'Pre-replacement planning toolkit'] },
      { category: 'Protect Value', emoji: '💰', items: ['Home Health Vault: 10-year service history', 'Pre-sale HVAC inspection guide', 'Buyer disclosure documentation', 'Replacement timing for maximum ROI'] },
    ],
  },
  {
    role: 'Landlord / Investor',
    emoji: '🏘️',
    description: "I manage multiple DFW properties — efficiency and documentation matter",
    resources: [
      { category: 'Multi-Property', emoji: '📋', items: ['Portfolio HVAC tracking system', 'Tenant communication templates', 'Emergency protocol for rentals', 'Annual maintenance scheduling across properties'] },
      { category: 'ProLnk Tools', emoji: '🔧', items: ['Bulk contractor agreements for multiple units', 'Priority emergency matching for rentals', 'Portfolio Home Health Vault management', 'Contractor vetting for investment properties'] },
      { category: 'Cost Control', emoji: '💵', items: ['Preventive vs. reactive cost analysis', 'Equipment standardization guide', 'Tenant vs. landlord responsibility guide', '1031 exchange HVAC capital expense strategy'] },
    ],
  },
  {
    role: 'DFW HVAC Pro',
    emoji: '🔩',
    description: "I'm a contractor — I want to serve DFW homeowners better through ProLnk",
    resources: [
      { category: 'ProLnk Network', emoji: '🌐', items: ['How matching works: homeowner to pro', '5-tier commission and income system', 'Home Health Vault contractor access', 'Partner network and referral cascade'] },
      { category: 'Business Growth', emoji: '📈', items: ['Building a maintenance agreement base', 'Emergency availability advantages', 'Rating system and reputation management', 'ProLnk\'s 3,200+ DFW HVAC resource library'] },
      { category: 'DFW Market', emoji: '🗺️', items: ['2026 refrigerant transition: R-454B prep', 'DFW peak season capacity planning', 'Commercial expansion through ProLnk', 'Territory management and lead targeting'] },
    ],
  },
];

export default function DFWHVACDFWCompleteResource() {
  const [selected, setSelected] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The Complete DFW HVAC Resource 2026
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            3,200+ pages of DFW HVAC knowledge — organized by who you are and what you need.
            ProLnk's complete partner network, Home Health Vault, and matching system in one final reference.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
          {[
            { num: '3,200+', label: 'Resource Pages' },
            { num: '47', label: 'AI Agents' },
            { num: '130+', label: 'Database Tables' },
            { num: '5', label: 'Income Streams' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{item.num}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            👤 Who are you? Get your complete resource guide.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            {roles.map((item, i) => (
              <button
                key={i}
                onClick={() => { setSelected(i); setExpandedCategory(null); }}
                style={{
                  backgroundColor: selected === i ? '#F5E642' : '#0f172a',
                  color: selected === i ? '#0A1628' : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#334155',
                  borderRadius: 10,
                  padding: '16px 12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{item.emoji}</div>
                {item.role}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16, fontStyle: 'italic' }}>
                {roles[selected].description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {roles[selected].resources.map((cat, ci) => (
                  <div key={ci}>
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === ci ? null : ci)}
                      style={{
                        width: '100%',
                        backgroundColor: expandedCategory === ci ? '#1e293b' : '#0f172a',
                        color: '#fff',
                        border: '1px solid #334155',
                        borderRadius: 8,
                        padding: '12px 16px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.category}</span>
                      <span style={{ marginLeft: 'auto', color: '#F5E642' }}>{expandedCategory === ci ? '▲' : '▼'}</span>
                    </button>
                    {expandedCategory === ci && (
                      <div style={{ backgroundColor: '#1e293b', borderRadius: '0 0 8px 8px', padding: '12px 16px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {cat.items.map((item, ii) => (
                            <li key={ii} style={{ padding: '5px 0', fontSize: 13, color: '#e2e8f0', borderBottom: ii < cat.items.length - 1 ? '1px solid #0A1628' : 'none' }}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🏆</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0' }}>
            ProLnk: The Complete DFW HVAC Platform
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            From your first homeowner question to your 20-year service history in Home Health Vault —
            ProLnk is the only platform built specifically for DFW's climate, market, and homeowners.
            Every contractor vetted. Every service documented. Every homeowner protected.
          </p>
        </div>
      </div>
    </div>
  );
}

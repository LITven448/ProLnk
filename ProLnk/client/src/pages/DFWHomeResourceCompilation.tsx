import { useState } from 'react';

const categories = [
  {
    id: 'foundation',
    label: '🏚️ Foundation',
    desc: 'The most critical DFW home system — clay soil demands it.',
    resources: [
      { title: 'Foundation Watering Guide', url: '/dfw-foundation-watering-guide', desc: 'When, how much, and where to water for DFW clay.' },
      { title: 'Foundation Warning Signs', url: '/dfw-foundation-warning-signs', desc: 'Catch settlement early before $12K in pier repairs.' },
      { title: 'Soil Type Impact on DFW Homes', url: '/dfw-soil-types-home-impact', desc: 'Why DFW clay behaves differently across Collin/Dallas/Tarrant.' },
    ],
  },
  {
    id: 'hvac',
    label: '❄️ HVAC',
    desc: 'HVAC runs 9 months/year in DFW. It matters more here.',
    resources: [
      { title: 'HVAC Efficiency in DFW Climate', url: '/dfw-hvac-efficiency', desc: 'Optimize for 100°F summers and surprise freezes.' },
      { title: 'HVAC Replacement vs Repair', url: '/dfw-hvac-replacement-vs-repair', desc: 'When to stop repairing and start budgeting for replacement.' },
      { title: 'DFW HVAC Brands & Local Reputation', url: '/dfw-hvac-brands', desc: 'Which brands hold up in Texas heat — backed by local data.' },
    ],
  },
  {
    id: 'seasonal',
    label: '📅 Seasonal',
    desc: 'DFW has four distinct homeownership seasons.',
    resources: [
      { title: 'Q4 DFW Home Guide', url: '/dfw-fourth-quarter-home-guide', desc: 'October-December checklist for DFW homeowners.' },
      { title: 'Spring Storm Preparation', url: '/dfw-spring-storm-prep', desc: 'Hail, tornadoes, and flooding — DFW spring survival guide.' },
      { title: 'Summer Energy Management', url: '/dfw-summer-energy-management', desc: 'Keep bills under control when temps hit triple digits.' },
      { title: 'Freeze Prep for DFW', url: '/dfw-freeze-preparation', desc: 'DFW gets 2-4 hard freezes yearly — most homes aren\’t ready.' },
    ],
  },
  {
    id: 'financial',
    label: '💰 Financial',
    desc: 'Protect and grow your most valuable asset.',
    resources: [
      { title: 'Property Tax Protest Guide', url: '/dfw-property-tax-protest-guide', desc: 'Step-by-step: protest DCAD/CCAD/TCAD and win.' },
      { title: 'Top 10 DFW Improvements by ROI', url: '/dfw-top-10-improvements', desc: 'Ranked by actual DFW resale data and appraisal patterns.' },
      { title: 'Top 10 DFW Homeowner Mistakes', url: '/dfw-homeowner-top-10-mistakes', desc: 'Most expensive mistakes ranked by total damage.' },
      { title: 'DFW Home Equity Calculator', url: '/dfw-home-equity-calculator', desc: 'Track what you\’ve built based on local appreciation data.' },
    ],
  },
  {
    id: 'contractors',
    label: '🔧 Contractors',
    desc: 'How to find, vet, and work with DFW contractors.',
    resources: [
      { title: 'DFW Contractor Vetting Checklist', url: '/dfw-contractor-vetting', desc: 'Verify license, insurance, and local reputation before hiring.' },
      { title: 'Emergency vs Planned Work', url: '/dfw-emergency-vs-planned-work', desc: 'How to pay planned prices instead of emergency rates.' },
      { title: 'Understanding DFW Labor Market', url: '/dfw-contractor-market', desc: 'Why costs vary by trade, zip, and season across DFW.' },
    ],
  },
  {
    id: 'neighborhood',
    label: '🏘️ Neighborhood',
    desc: 'DFW is 11 counties and 100+ cities — location matters.',
    resources: [
      { title: 'DFW Neighborhood Comparison Guide', url: '/dfw-neighborhood-comparison', desc: 'Collin vs Dallas vs Tarrant vs Denton — what to know by county.' },
      { title: 'School District Impact on Home Value', url: '/dfw-school-district-home-value', desc: 'FISD, PISD, LISD, AISD — how districts affect appreciation.' },
      { title: 'HOA Navigation in DFW', url: '/dfw-hoa-guide', desc: 'Rights, responsibilities, and common HOA disputes in DFW.' },
    ],
  },
];

const situations: Record<string, string[]> = {
  'new-owner': ['foundation', 'seasonal', 'contractors'],
  'improving': ['financial', 'contractors', 'neighborhood'],
  'selling': ['financial', 'contractors', 'seasonal'],
  'long-term': ['seasonal', 'financial', 'neighborhood'],
};

export default function DFWHomeResourceCompilation() {
  const [search, setSearch] = useState('');
  const [situation, setSituation] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const situationCategories = situation ? situations[situation] : null;

  const filtered = categories.filter(c => {
    if (situationCategories && !situationCategories.includes(c.id)) return false;
    if (activeCategory && c.id !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.label.toLowerCase().includes(q) || c.resources.some(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>📚 Complete DFW Home Resource Compilation</h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Every ProLnk DFW resource in one place — organized by category, searchable by need, filterable by your situation. The most comprehensive DFW homeowner reference available.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="🔍 Search resources…" value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}
          />
          <select
            value={situation} onChange={e => setSituation(e.target.value)}
            style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: situation ? '#fff' : '#8899AA', fontSize: 14 }}
          >
            <option value="">All Situations</option>
            <option value="new-owner">New DFW Owner</option>
            <option value="improving">Planning Improvements</option>
            <option value="selling">Preparing to Sell</option>
            <option value="long-term">Long-Term Owner</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <button onClick={() => setActiveCategory(null)} style={{ background: !activeCategory ? '#F5E642' : '#0D1F38', color: !activeCategory ? '#0A1628' : '#fff', border: '1px solid #1E3A5F', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>All</button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)} style={{ background: activeCategory === c.id ? '#F5E642' : '#0D1F38', color: activeCategory === c.id ? '#0A1628' : '#fff', border: '1px solid #1E3A5F', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{c.label}</button>
          ))}
        </div>

        {filtered.map(cat => (
          <div key={cat.id} style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{cat.label}</div>
            <div style={{ color: '#8899AA', fontSize: 13, marginBottom: 12 }}>{cat.desc}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.resources.map(r => (
                <a key={r.url} href={r.url} style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 10, padding: '14px 18px', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 4 }}>{r.title} →</div>
                  <div style={{ fontSize: 13, color: '#8899AA', lineHeight: 1.5 }}>{r.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#8899AA' }}>No resources match your search. Try clearing filters.</div>
        )}
      </div>
    </div>
  );
}

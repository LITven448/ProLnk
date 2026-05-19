import { useState } from 'react';

const categories = [
  { id: 'hvac', label: '❄️ HVAC', count: 340, desc: 'System sizing, seasonal maintenance, filter guides, freeze protection, UV systems, ductless mini-splits, zoning.' },
  { id: 'foundation', label: '🏗️ Foundation', count: 280, desc: 'Pier and beam vs slab, drainage, tree root risk, watering schedules, crack assessment, engineer thresholds.' },
  { id: 'plumbing', label: '🚰 Plumbing', count: 310, desc: 'Shutoff maps, freeze protection, slab leak detection, water heater replacement, pressure regulators, sewer scopes.' },
  { id: 'electrical', label: '⚡ Electrical', count: 250, desc: 'Panel labeling, GFCI/AFCI upgrades, EV charger installs, generator hookups, panel replacement guides.' },
  { id: 'roofing', label: '🏠 Roofing', count: 290, desc: 'Hail damage assessment, shingle types, TPO vs modified bitumen, attic ventilation, ice dam prevention.' },
  { id: 'cities', label: '🗺️ 100+ DFW Cities', count: 800, desc: 'City-specific guides for Frisco, Plano, McKinney, Allen, Prosper, Celina, Forney, Rockwall, Weatherford, and 90+ more.' },
];

const situationGuides: Record<string, { label: string; pages: string[] }> = {
  new: { label: 'New DFW Homeowner', pages: ['Start: DFW Home Systems Overview', 'Foundation Watering Schedule Guide', 'First Year HVAC Maintenance Checklist', 'Building Your Home Health Vault', 'ProLnk Contractor Network Intro'] },
  repair: { label: 'Have a Repair Needed', pages: ['Find your trade category above', 'City-specific contractor pricing guide', 'Insurance claim documentation guide', 'Getting 3 quotes with ProLnk', 'Understanding DFW contractor licenses'] },
  selling: { label: 'Selling Your Home', pages: ['Pre-listing inspection prep guide', 'Foundation documentation for buyers', 'HVAC age and condition disclosure', 'Electrical panel upgrade ROI guide', 'Home Health Vault transfer to buyer'] },
  investor: { label: 'Investor / Landlord', pages: ['Multi-property maintenance tracking', 'DFW rental market seasonal costs', 'Tenant maintenance request handling', 'CapEx planning by home age', 'ProLnk pro network for volume discounts'] },
};

export default function DFWProLnk4500Pages2026() {
  const [activeCategory, setActiveCategory] = useState('hvac');
  const [situation, setSituation] = useState('');

  const active = categories.find(c => c.id === activeCategory);
  const guide = situation ? situationGuides[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ProLnk: 4,500+ Pages of DFW Homeowner Resources</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>We have built the most comprehensive library of DFW home ownership content on the internet — all free, all local, all actionable.</p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#1e2d4a', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>4,500+</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Pages Published</div>
          </div>
          <div style={{ background: '#1e2d4a', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>100+</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>DFW Cities Covered</div>
          </div>
          <div style={{ background: '#1e2d4a', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>12</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Trade Categories</div>
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: 12 }}>Browse by Category</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)}
              style={{ background: activeCategory === c.id ? '#F5E642' : '#1e2d4a', color: activeCategory === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {c.label} ({c.count})
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{active.label} — {active.count} Pages</div>
            <p style={{ color: '#94a3b8', margin: 0 }}>{active.desc}</p>
          </div>
        )}

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Situation → Best Starting Resources</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(situationGuides).map(([key, val]) => (
              <button key={key} onClick={() => setSituation(key)}
                style={{ background: situation === key ? '#F5E642' : '#0A1628', color: situation === key ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {val.label}
              </button>
            ))}
          </div>
          {guide && guide.pages.map((page, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #0A1628' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{page}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Ready to connect with a DFW pro?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>ProLnk matches DFW homeowners with vetted contractors — free quotes, no middleman markup.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}

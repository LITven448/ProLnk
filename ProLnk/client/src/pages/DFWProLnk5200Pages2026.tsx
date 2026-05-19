import { useState } from 'react';

const categories = [
  { id: 'hvac', label: '❄️ HVAC Guides', count: 820, desc: 'DFW HVAC seasonal guides, tune-up checklists, system replacement timelines, contractor selection, emergency protocols, and city-by-city coverage across 100+ DFW municipalities.' },
  { id: 'foundation', label: '🏗 Foundation Guides', count: 940, desc: 'Expansive clay soil education, seasonal watering protocols, crack classification guides, pier and beam vs. slab repair comparisons, drainage solutions, and warranty evaluation content.' },
  { id: 'roofing', label: '🏠 Roofing Guides', count: 680, desc: 'Hail damage documentation, insurance claim guides, material comparison (asphalt vs. metal vs. tile), pipe boot lifecycle, gutters, and DFW storm season preparation content.' },
  { id: 'plumbing', label: '🔧 Plumbing Guides', count: 590, desc: 'Water heater replacement windows, sewer line inspection guides, hard water solutions, leak detection, DFW municipal water quality data, and emergency shutoff guides.' },
  { id: 'electrical', label: '⚡ Electrical Guides', count: 510, desc: 'Panel upgrade guides, EV charger installation, smart home wiring, whole-home surge protection, code compliance guides for DFW and surrounding municipalities.' },
  { id: 'financial', label: '💰 Financial & Career', count: 660, desc: 'Pro career guides covering income projections, territory strategy, network income system mechanics, commission optimization, and 5-stream earning guides for ProLnk professionals.' },
];

export default function DFWProLnk5200Pages2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = categories.find(c => c.id === selected);
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK CONTENT LIBRARY · MAY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          ProLnk 5,200+ Pages of<br />DFW Content — 2026 Update
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          ProLnk's DFW knowledge library now exceeds 5,200 pages of hyperlocal home services content.
          HVAC, foundation, roofing, plumbing, electrical, financial guides, pro career content,
          and 100+ city guides — all staged for deployment at launch.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>LIBRARY BREAKDOWN</div>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{total.toLocaleString()}+ pages</div>
          </div>
          <div style={{ display: 'grid', gap: 2 }}>
            {categories.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0A1628', borderRadius: 6 }}>
                <span style={{ fontSize: 14 }}>{c.label}</span>
                <span style={{ fontWeight: 700, color: '#F5E642', fontSize: 14 }}>{c.count} pages</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>EXPLORE A CONTENT CATEGORY</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{
                background: selected === c.id ? '#F5E642' : '#111D2E',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.desc}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>CONTENT DEPLOYMENT STATUS</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            All 5,200+ pages are staged and ready for deployment at ProLnk's DFW launch.
            Content covers 100+ DFW cities and municipalities with hyperlocal seasonal guides
            — the most comprehensive DFW home services library ever built.
          </p>
        </div>
      </div>
    </div>
  );
}
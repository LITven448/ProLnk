import { useState } from 'react';

const styles = {
  transitional: { label: '🏡 Transitional', recs: ['White oak shaker cabinets', 'Waterfall quartz island', 'Statement range hood (plaster or wood)', 'Under-cabinet lighting standard'] },
  modern: { label: '🔲 Modern/Contemporary', recs: ['Flat-front cabinets in matte finish', 'Hidden appliances behind panel fronts', 'Minimal hardware or integrated pulls', 'Large format backsplash tile'] },
  farmhouse: { label: '🌾 Farmhouse/Traditional', recs: ['Painted inset cabinets (warm white)', 'Farmhouse sink (apron front)', 'Open shelving accent', 'Shiplap or brick backsplash'] },
  luxury: { label: '💎 Luxury', recs: ["Butler's pantry behind concealed door", 'Two islands or island + peninsula', 'Integrated refrigerator columns', 'Unlacquered brass or aged gold hardware'] },
};

export default function DFWKitchenTrends2026() {
  const [selected, setSelected] = useState<keyof typeof styles | null>(null);
  const result = selected ? styles[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🍳</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Kitchen Trends 2026</h1>
          <p style={{ color: '#94a3b8' }}>What Dallas-Fort Worth homeowners are remodeling right now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔥 Hottest DFW Kitchen Moves in 2026</h2>
          {[
            ['🪵', 'White oak cabinetry replacing painted white', 'Natural grain, warm undertone — contractors report 3x demand increase YoY'],
            ['💧', 'Waterfall islands', 'Quartz or porcelain cascading down island sides — still #1 remodel request'],
            ['🙈', 'Hidden appliances', 'Panel-front dishwashers, integrated fridges, appliance garages for countertop clutter'],
            ['🎩', 'Statement range hoods', 'Plaster, wood, or custom metal hoods as focal point over range'],
            ['🧺', "Butler's pantry demand up 40%", 'Second prep space, wine fridge, and extra storage — luxury segment and above'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Match Your Style → 2026 DFW Kitchen Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {Object.entries(styles).map(([k, v]) => (
              <button key={k} onClick={() => setSelected(k as keyof typeof styles)}
                style={{ background: selected === k ? '#F5E642' : '#1a3050', color: selected === k ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {v.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>2026 Recommendations for {result.label}</div>
              {result.recs.map((r, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.4rem' }}>✅ {r}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📉 What's Out in DFW Kitchens</h2>
          {['All-white painted cabinets (yellowing issues in Texas sun)', 'Subway tile backsplash (perceived as dated)', 'Granite countertops (quartz dominates)', 'Stainless steel appliances showing fingerprints (black SS and panel-front winning)'].map((item, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.4rem' }}>❌ {item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}
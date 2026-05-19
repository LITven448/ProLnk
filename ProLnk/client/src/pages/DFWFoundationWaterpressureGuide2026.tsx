import { useState } from 'react';

const situations = [
  { id: 'trinity-near', label: 'Property near Trinity River / Elm Fork', guide: 'High seasonal water table risk. Install French drain perimeter system + sump pump. Monitor moisture quarterly.' },
  { id: 'creek-adjacent', label: 'Adjacent to creek or drainage easement', guide: 'Water table rises after heavy DFW rain events. Extend gutters 6ft+ from foundation, grade slope away at 6in/10ft.' },
  { id: 'low-lot', label: 'Low-lying lot / poor drainage', guide: 'Standing water after rain indicates poor drainage. Install catch basins, channel drains, and raise grade over time.' },
  { id: 'seasonal-wet', label: 'Wet spots in yard seasonally', guide: 'Seasonal perched water table. French drain to street or daylight outfall. Consider sump pump in crawl/basement.' },
  { id: 'high-lot', label: 'Elevated lot, no drainage issues', guide: 'Lower groundwater risk. Standard perimeter drainage adequate. Maintain gutters and grade.' },
];

export default function DFWFoundationWaterpressureGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  const facts = [
    { icon: '🌊', title: 'DFW Water Table', body: 'DFW sits on the Trinity Aquifer system. Water table depth varies widely — from 3ft near rivers to 50ft+ on upland sites.' },
    { icon: '🌧️', title: 'Seasonal Fluctuation', body: 'Spring rains (Apr-May) raise water table 2-8ft in low-lying DFW areas. Summer drought drops it rapidly.' },
    { icon: '🏠', title: 'Foundation Impact', body: 'Hydrostatic pressure pushes against foundation walls. Sustained pressure causes lateral cracking and water intrusion.' },
    { icon: '🔩', title: 'Perimeter Drainage', body: 'French drains around foundation perimeter intercept groundwater before it reaches the foundation wall.' },
    { icon: '💧', title: 'Sump Pumps in DFW', body: 'Rare in standard DFW slab homes. More common in homes with basements, crawl spaces, or near waterways.' },
    { icon: '📍', title: 'High-Risk DFW Areas', body: 'Oak Cliff, Lake Highlands, areas near White Rock Lake, Rowlett Creek, Bear Creek — all see elevated seasonal water tables.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW FOUNDATION 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Water Table Pressure Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Managing groundwater near DFW foundations: seasonal fluctuation, perimeter drainage strategies, and sump pump applications.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Property Water Situation → Management Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: '#0d1f2e', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📋 Recommended Approach</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.guide}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8′ }}>
          <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> DFW expansive clay soils retain moisture — water table issues often manifest as foundation movement rather than visible flooding. Connect homeowners with a licensed foundation specialist for hydrostatic assessment.
        </div>
      </div>
    </div>
  );
}
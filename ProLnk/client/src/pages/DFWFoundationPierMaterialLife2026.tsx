import { useState } from 'react';

const pierTypes = [
  { id: 'galvanized', label: 'Galvanized Steel', guide: 'Galvanized steel piers last 30-50 years in DFW clay soil. The zinc coating resists corrosion but DFW soil pH (7.5-8.5, alkaline) and sulfate content accelerate oxidation. Install depth matters — piers below the active zone (8-12 ft in DFW) last longer. Annual inspection recommended after year 25.' },
  { id: 'powdercoated', label: 'Powder-Coated Steel', guide: 'Powder-coated steel piers last 35-55 years in DFW conditions. The polymer coating provides better protection than galvanizing against DFW alkaline soil chemistry. Coating integrity depends on installation — any breach during driving accelerates corrosion at that point.' },
  { id: 'stainless', label: 'Stainless Steel', guide: 'Stainless steel piers last 50+ years in DFW soil. 316-grade stainless resists DFW sulfate soil chemistry best. Higher upfront cost ($400-600/pier vs $250-400 for galvanized) justified for homes with severe movement history or high-value structures.' },
  { id: 'concrete', label: 'Concrete Piers', guide: 'Concrete piers (pressed or bell-bottom) last 60+ years. Pressed concrete segments transfer load to stable soil; bell-bottoms are drilled to bedrock equivalent depth. Most common in older DFW repairs. Vulnerable to DFW clay heave if installed too shallow — depth is everything.' },
  { id: 'soil', label: 'DFW Soil Chemistry', guide: 'DFW Blackland Prairie clay (expansive soil, PI 20-50+) is uniquely aggressive. High sulfate content reacts with standard concrete causing sulfate attack. Clay pH 7.5-8.5 accelerates zinc oxidation on galvanized. Pier material choice must account for local soil report — ask your contractor for the geotechnical data.' },
];

export default function DFWFoundationPierMaterialLife2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = pierTypes.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · Foundation</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW Foundation Pier Material Longevity Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>How long different pier materials last in DFW Blackland Prairie clay soil. Select a pier type to learn more.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {pierTypes.map(p => (
            <button key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === p.id ? '#F5E642' : '#1e3a5f', backgroundColor: selected === p.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🏗️ {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Longevity Guide</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🏗️ {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642' }}>📊 DFW Pier Longevity at a Glance</h2>
          {[{label:'Galvanized Steel',life:'30-50 years'},{label:'Powder-Coated Steel',life:'35-55 years'},{label:'Stainless Steel (316)',life:'50+ years'},{label:'Concrete (pressed/bell)',life:'60+ years'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>🏗️ {r.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '14px' }}>{r.life}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🏠</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Need a foundation pro in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk matches DFW homeowners with verified foundation repair specialists.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}

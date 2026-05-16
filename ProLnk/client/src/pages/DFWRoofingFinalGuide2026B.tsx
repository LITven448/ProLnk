import { useState } from 'react';

const situations = [
  { id: 'hail', label: '⛈️ Hail Damage', title: 'Hail Damage Resources for DFW', items: ['DFW averages 8-10 significant hail events per year — highest in TX', 'Document damage within 24-48 hrs: photos, video, GPS timestamps', 'Contact insurance before calling a roofer — adjuster visit first', 'Hail leaves circular dents on shingles, soft metal damage on gutters/AC', 'Beware storm chasers: use local contractors with permanent DFW addresses', 'ProLnk connects you with licensed roofers who work your zip code year-round'] },
  { id: 'materials', label: '🧱 Roofing Materials', title: 'Roofing Materials Guide for DFW', items: ['3-tab shingles: cheapest, 20-25yr life, vulnerable to DFW hail — avoid on new roofs', 'Architectural shingles: standard for DFW, 30-50yr, Class 3-4 impact options', 'Class 4 impact-resistant shingles: 10-20% insurance discount in DFW', 'Metal roofing: 50-70yr lifespan, premium upfront, excellent hail resistance', 'Tile: beautiful but heavy — structural check required on DFW homes', 'Synthetic shake: good aesthetics + Class 4 impact rating — growing in DFW'] },
  { id: 'contractors', label: '👷 Choosing a Contractor', title: 'Roofing Contractor Selection in DFW', items: ['Verify TX Dept of Insurance contractor license — required in DFW', 'Ask for proof of liability insurance and workers comp before any work starts', 'Get 3 written bids with identical scope — apple-to-apple comparison', 'Check BBB, Google, and Angi reviews specifically for DFW area work', 'Avoid contractors who ask for full payment upfront — standard is 50% deposit', 'Manufacturer certification (GAF Master Elite, Owens Corning Preferred) matters'] },
  { id: 'ventilation', label: '🌬️ Ventilation', title: 'Roof Ventilation for DFW Homes', items: ['Proper attic ventilation extends shingle life 5-10 yrs in DFW heat', 'Rule: 1 sq ft of vent per 150 sq ft of attic floor (1:150 ratio)', 'Ridge vent + soffit vent = best passive airflow system for DFW', 'Powered attic fans can help but must balance with intake — consult pro', 'Radiant barrier in attic reduces cooling load 15-25% in DFW summers', 'Signs of poor ventilation: ice dams, hot attic, premature shingle failure'] },
  { id: 'gutters', label: '🌧️ Gutters & Drainage', title: 'Gutters & Drainage for DFW Roofs', items: ['5" K-style gutters standard; 6" recommended for DFW heavy rain events', 'Seamless aluminum gutters: minimal leaks, lasts 20+ years in DFW climate', 'DFW flash floods: undersized gutters overflow and cause foundation damage', 'Gutter guards reduce maintenance — micro-mesh performs best in DFW', 'Downspouts: 1 per 30-40 linear feet, extend 6+ feet from foundation', 'Clean gutters twice yearly: after spring storms and fall leaf season'] },
  { id: 'insurance', label: '📋 Insurance Claims', title: 'Roofing Insurance Claims in DFW', items: ['DFW homeowners file more roof claims per capita than anywhere in US', 'Document storm date/time using weather.gov historical data for your zip', 'Supplemental claims: if adjuster misses items, you can reopen the claim', 'Public adjuster: hires out for 10-15% of claim — worth it on large roofs', 'ACV vs RCV policy: ACV pays depreciated value; RCV pays full replacement', 'Deductibles: TX allows percentage deductibles (1-5% of home value) for wind/hail'] },
];

export default function DFWRoofingFinalGuide2026B() {
  const [selected, setSelected] = useState(situations[0].id);
  const active = situations.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>DFW Roofing Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Final Summary — All Resources by Situation</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#1e2d4a', color: selected === s.id ? '#0A1628' : '#cbd5e1', border: 'none', borderRadius: '8px', padding: '0.5rem 0.9rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#1e2d4a', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 {active.title}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {active.items.map((item, i) => (
              <li key={i} style={{ color: '#e2e8f0', padding: '0.6rem 0', borderBottom: i < active.items.length - 1 ? '1px solid #2d3f5e' : 'none', fontSize: '0.95rem' }}>
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: '#1e2d4a', borderRadius: '10px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.3rem' }}>🏠 ProLnk — Built for DFW Homeowners</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Find verified roofing contractors in your DFW area at prolnk.io</p>
        </div>
      </div>
    </div>
  );
}

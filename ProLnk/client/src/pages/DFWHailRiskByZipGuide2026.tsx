import { useState } from 'react';

const counties = [
  { id: 'tarrant', label: '🟥 Tarrant County', risk: 'HIGHEST RISK', score: 95, desc: 'Tarrant County (Fort Worth area) is historically the hardest-hit county in DFW for hail. Its position in the typical southwest-to-northeast storm track makes it a direct target. Hailstorms averaging 1.5-2 inch diameter are common in spring and early summer.', guidance: 'If you are in Tarrant County, Class 4 impact-resistant roofing is essentially mandatory. Expect 15-30% premium discounts and far fewer claim disputes.' },
  { id: 'dallas', label: '🟧 Dallas County', risk: 'HIGH RISK', score: 78, desc: 'Dallas County sees frequent hail events, especially in the northern suburbs (Addison, Richardson, Garland). Storms often arrive weakened compared to Tarrant but golf-ball-size hail is common during peak season (March-June).', guidance: 'Check your roof age. Insurers increasingly require roofs under 15 years for full replacement coverage — older roofs may get ACV (actual cash value) payouts only.' },
  { id: 'collin', label: '🟨 Collin County', risk: 'MODERATE-HIGH RISK', score: 68, desc: 'Collin County (Plano, McKinney, Frisco) sits in the upper-right portion of the typical storm track. Some storms skip through; others deliver significant hail. The 2016 Wylie hailstorm caused over $1B in insured losses.', guidance: 'Research your specific ZIP using NOAA Storm Events Database. Request hail history for your address from your insurance agent before renewal.' },
  { id: 'denton', label: '🟩 Denton County', risk: 'MODERATE RISK', score: 55, desc: 'Denton County sees fewer direct hail hits than Tarrant or Dallas but is not immune. Lewisville and Denton city proper have seen significant events. Being west of the main storm track helps but does not eliminate risk.', guidance: 'Even at moderate risk, impact-resistant roofing pays off in premium savings over 10 years. Consider it during your next re-roof regardless of current damage.' },
];

export default function DFWHailRiskByZipGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = counties.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW INSURANCE GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>⛈️ DFW Hail Risk by Area Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>Not all DFW neighborhoods face equal hail risk. Tarrant County tops the charts historically, while storm tracks mean some areas get hit repeatedly. Know your risk before your next insurance renewal.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🌩️ Typical DFW Storm Track</h2>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            Storms typically enter from the <strong style={{ color: '#F5E642′ }}>southwest</strong> (toward Weatherford/Granbury) and track <strong style={{ color: '#F5E642' }}>northeast</strong> through Fort Worth, Arlington, Dallas, and into the northeast suburbs. Tarrant County sits directly in the primary corridor. Understanding this path helps predict which neighborhoods face maximum exposure each storm season.
          </div>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Select your county for hail risk profile:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {counties.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)} style={{ background: selected === c.id ? '#F5E642′ : '#112240', color: selected === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s' }}>{c.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#F5E642', margin: 0 }}>{active.label}</h3>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '0.2rem 0.8rem', fontWeight: 800, fontSize: '0.85rem' }}>{active.risk} — {active.score}/100</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 Guidance: </span>
              <span style={{ color: '#94a3b8′ }}>{active.guidance}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🔧 Hail Damage? Get ProLnk-Vetted Roofers</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>After a hail event, out-of-state contractors flood DFW neighborhoods. ProLnk only sends licensed, locally-based roofing professionals — no storm chasers, guaranteed.</p>
        </div>
      </div>
    </div>
  );
}
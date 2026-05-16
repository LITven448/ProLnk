import { useState } from 'react';

const locations = [
  { label: '🌩️ North DFW (Collin / Denton County)', risk: 'Extreme', freq: '4.2 hail events/yr avg', tip: 'Class 4 impact-resistant roof can save 15–30% on premium. Document every storm with photos immediately.' },
  { label: '🏠 Central DFW (Dallas / Tarrant County)', risk: 'Very High', freq: '3.6 hail events/yr avg', tip: 'Separate wind/hail deductible is standard in TX — typically 1–2% of home value, not a flat dollar amount.' },
  { label: '🌤️ South DFW (Ellis / Johnson County)', risk: 'High', freq: '2.9 hail events/yr avg', tip: 'Still in Hail Alley. Check if your insurer offers "cosmetic damage" exclusion — avoid it.' },
];

export default function DFWHailAlleyCoverage2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Home Resilience · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>⛈️ DFW in Hail Alley: What Homeowners Must Know</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>The DFW Metroplex sits at the center of North Texas Hail Alley — the highest hail frequency zone in the United States. Understanding this shapes every home insurance and roofing decision you make.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['#1','DFW Hail Rank','Most hail-prone major metro in the US (NOAA 2025)'],['💰','Avg Roof Claim','$12,400 in DFW — up 38% since 2020'],['🛡️','Class 4 Savings','15–30% premium discount with impact-resistant roof'],['📋','TX Wind/Hail','Separate deductible required by TX law for coastal + high-risk zones']].map(([icon,label,val]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.4rem', color: '#F5E642' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 DFW Hail Documentation Strategy</div>
          {['Take timestamped photos within 24 hours of storm','Use NOAA Storm Data to confirm hail size + date for claims','Request a written roof inspection from a licensed roofer','File claim within policy window — TX standard is 1 year','Keep receipts: Class 4 shingles qualify for premium discounts'].map((t,i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, color: '#CBD5E1', fontSize: '0.9rem' }}><span style={{ color: '#F5E642' }}>✓</span>{t}</div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Select Your DFW Location</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {locations.map((loc, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#1E3A5F' : '#111C30', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
              {loc.label} <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 400, marginLeft: 8 }}>{loc.freq}</span>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⛈️ Risk: {locations[selected].risk}</div>
            <p style={{ color: '#CBD5E1', margin: 0, fontSize: '0.95rem' }}>{locations[selected].tip}</p>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: 12 }}>ProLnk connects you with Class 4 roofing contractors in your specific DFW county.</p>
          </div>
        )}
      </div>
    </div>
  );
}
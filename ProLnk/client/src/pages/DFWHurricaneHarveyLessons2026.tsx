import { useState } from 'react';

const floodZones = [
  { label: '🏘️ Near Trinity River or Floodplain', risk: 'High', tips: ['Install sump pump with battery backup', 'Elevate HVAC + water heater', 'Get FEMA flood insurance (NFIP)', 'Know your evacuation route'] },
  { label: '🏠 Standard DFW Neighborhood', risk: 'Moderate', tips: ['Clear storm drains annually', 'Grade yard away from foundation', 'Keep sandbags on hand', 'Review homeowners policy for water coverage'] },
  { label: '🏔️ Elevated / North DFW suburb', risk: 'Lower', tips: ['Still maintain gutters + downspouts', 'Inspect foundation drainage', 'Document valuables for insurance', 'Have 72-hour emergency kit'] },
];

export default function DFWHurricaneHarveyLessons2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Home Resilience · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🌊 Hurricane Harvey Lessons for North Texas</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Harvey (2017) devastated Houston but also stressed the Trinity River basin through DFW. Here's what 9 years of lessons mean for your home in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['📍', 'Trinity River Peak', '47.4 ft — record flood stage in Fort Worth'],['🏚️', 'DFW Homes Flooded', '~2,400 homes impacted across Tarrant County'],['💰', 'FEMA Payouts TX', '$9.7B statewide — biggest disaster payout in US history'],['📋', 'Flood Maps Updated', 'FEMA revised 14 DFW counties after Harvey']].map(([icon,label,val]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏡 What's Your Home Location Type?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {floodZones.map((z, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#1E3A5F' : '#111C30', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem 1.2rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
              {z.label} — <span style={{ color: '#F5E642′ }}>{z.risk} Risk</span>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🛡️ Your Flood Prep Priorities</div>
            {floodZones[selected].tips.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, color: '#CBD5E1′ }}>
                <span style={{ color: '#F5E642′ }}>✓</span>{t}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', marginTop: '2rem', borderTop: '2px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔗 ProLnk Connects You Fast</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>After a flood event, finding a trusted plumber, waterproofing pro, or restoration contractor is the hardest part. ProLnk matches DFW homeowners with vetted local pros — no call centers, no guesswork.</p>
        </div>
      </div>
    </div>
  );
}
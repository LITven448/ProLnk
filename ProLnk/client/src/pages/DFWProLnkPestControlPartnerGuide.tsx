import { useState } from 'react';

const businessTypes = [
  { type: 'General Pest Control', opportunity: 'Quarterly contracts, ant & roach programs', recurring: '$1,200–$2,400/yr per home', seasonality: 'Year-round, peak spring/fall' },
  { type: 'Termite Specialists', opportunity: 'Pre-purchase inspections, new-build treatments', recurring: '$800–$3,500/inspection', seasonality: 'Peak March–June' },
  { type: 'Mosquito Control', opportunity: 'Seasonal barrier spray programs', recurring: '$600–$1,800/season', seasonality: 'April–October DFW' },
  { type: 'Wildlife & Exclusion', opportunity: 'Attic rodents, squirrels, raccoon exclusion', recurring: '$400–$2,200/job', seasonality: 'Peak Oct–Feb' },
];

const stats = [
  { icon: '🦟', label: 'DFW Pest Control Market Size', value: '$890M/yr' },
  { icon: '🏡', label: 'Avg DFW Homeowner Pest Spend/Yr', value: '$1,400' },
  { icon: '🐜', label: 'Fire Ant Calls (DFW, 2025)', value: '214,000+' },
  { icon: '📊', label: 'Quarterly Contract Renewal Rate', value: '78%' },
];

export default function DFWProLnkPestControlPartnerGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🦟</span>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Pest Control on ProLnk</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 36, maxWidth: 620 }}>
          Fire ants, termites, mosquitoes — DFW homeowners need pest pros year-round. ProLnk connects licensed exterminators to recurring contract opportunities before competitors get there.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Select Your Pest Business Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {businessTypes.map((b, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1A3A5C' : '#112240', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{b.type}</div>
              {selected === i && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8 }}>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>OPPORTUNITY</div><div style={{ fontSize: 14 }}>{b.opportunity}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>RECURRING REVENUE</div><div style={{ fontSize: 14 }}>{b.recurring}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>SEASONALITY</div><div style={{ fontSize: 14 }}>{b.seasonality}</div></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk Pest Network</div>
          <div style={{ color: '#1A3050', fontSize: 14 }}>Get recurring contract leads — quarterly, seasonal, and emergency. Charter rate $149/mo locked.</div>
        </div>
      </div>
    </div>
  );
}

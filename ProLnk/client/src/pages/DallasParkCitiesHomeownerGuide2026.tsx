import { useState } from 'react';

export default function DallasParkCitiesHomeownerGuide2026() {
  const [propertyScale, setPropertyScale] = useState<string>();

  const scales = [
    {
      id: 'starter', label: '🏡 $1M–$2M Home', desc: 'Entry Park Cities — lot 8,000–12,000 sqft',
      annual: ['HVAC service (2 units): $600/yr', 'Landscaping: $8,000–$15,000/yr', 'Pool service: $2,400/yr', 'Exterior paint cycle (5 yr): $12,000', 'Irrigation system: $800/yr'],
      specialty: ['HP/UP-approved landscapers required for tree removal', 'Specialty HVAC for high-end systems', 'Copper gutters require specialty metalwork' ]
    },
    {
      id: 'luxury', label: '🏰 $2M–$5M Estate', desc: 'Mid-tier Park Cities — lot 15,000–25,000 sqft',
      annual: ['HVAC service (3–4 units): $1,200/yr', 'Landscaping: $20,000–$40,000/yr', 'Pool/spa service: $4,800/yr', 'Generator annual service: $600/yr', 'Security system monitoring: $3,600/yr'],
      specialty: ['Structured wiring and AV specialists', 'Commercial-grade generator maintenance', 'Custom iron gate and fence specialists' ]
    },
    {
      id: 'estate', label: '👑 $5M+ Trophy Estate', desc: 'Top tier — lot 30,000+ sqft, full staff common',
      annual: ['HVAC (5+ zones): $2,400/yr', 'Landscaping: $50,000–$120,000/yr', 'Pool/spa/water features: $9,600/yr', 'Smart home maintenance contract: $6,000/yr', 'Exterior stone/masonry: $5,000/yr'],
      specialty: ['Estate management firm coordination', 'Specialty art lighting and HVAC for collections', 'Custom millwork craftsmen for interior maintenance' ]
    },
  ];

  const parkTips = [
    { icon: '📐', tip: 'HP and UP have strict setback and height codes — any addition needs city approval before contractor hire' },
    { icon: '🌲', tip: 'Mature trees require arborist not landscaper — improper trimming voids liability and violates city code' },
    { icon: '🔒', tip: 'Park Cities contractors are vetted differently — ask for proof of luxury project portfolio and insurance' },
    { icon: '💡', tip: 'Structured wiring and smart home systems require certified integrators — not general electricians' },
    { icon: '🏊', tip: 'Pool code in HP/UP differs from Dallas proper — verify your pool service tech knows local requirements' },
  ];

  const selected = scales.find(s => s.id === propertyScale);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Park Cities Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Highland Park & University Park — luxury maintenance at scale</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Select Your Property Scale</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {scales.map(s => (
              <button key={s.id} onClick={() => setPropertyScale(s.id)}
                style={{ background: propertyScale === s.id ? '#F5E642' : '#0f1f3d', color: propertyScale === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {s.label} <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.75 }}>— {s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>📋 Annual Maintenance Budget</h3>
              {selected.annual.map((a, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>• {a}</p>)}
            </div>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>⭐ Specialty Contractors Needed</h3>
              {selected.specialty.map((s, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>• {s}</p>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Park Cities Insider Tips</h2>
          {parkTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 ProLnk connects Park Cities homeowners with verified luxury contractors.</p>
        </div>
      </div>
    </div>
  );
}
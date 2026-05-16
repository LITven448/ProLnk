import { useState } from 'react';

export default function DFWMasterBathRemodelCosts2026() {
  const [budget, setBudget] = useState('midrange');

  const tiers: Record<string, { label: string; range: string; features: string[]; save: string; splurge: string }> = {
    budget: {
      label: 'Budget Refresh',
      range: '$8,000 – $15,000',
      features: ['New vanity & fixtures', 'Tile surround (builder grade)', 'Basic lighting update', 'Toilet replacement', 'Paint & accessories'],
      save: 'Keep existing layout, reface cabinets instead of replace',
      splurge: 'Heated tile floor adds $800–$1,500 and lasting value',
    },
    midrange: {
      label: 'Mid-Range Remodel',
      range: '$18,000 – $30,000',
      features: ['Custom vanity & countertop', 'Walk-in tile shower', 'Soaking tub (freestanding)', 'Upgraded fixtures', 'Recessed lighting & mirrors'],
      save: 'Skip the freestanding tub if not a lifestyle fit — saves $2,500+',
      splurge: 'Frameless glass shower enclosure adds polish and resale value',
    },
    luxury: {
      label: 'Luxury Master Suite',
      range: '$35,000 – $60,000+',
      features: ['Full layout reconfiguration', 'Steam shower + multiple heads', 'Heated floors throughout', 'Custom cabinetry & built-ins', 'Smart mirror & lighting controls'],
      save: 'Design consultation upfront prevents $5K+ in change orders',
      splurge: 'Radiant floor heating — comfort ROI is exceptional in DFW winters',
    },
  };

  const tier = tiers[budget];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DFW Home Cost Guide 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>🛁 Master Bath Remodel Cost Guide</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 32 }}>What DFW homeowners spend at each level — and where to save vs. splurge.</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['budget', 'midrange', 'luxury'].map((t) => (
            <button key={t} onClick={() => setBudget(t)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: budget === t ? '#F5E642' : '#111D33', color: budget === t ? '#0A1628' : '#8892A4' }}>
              {t === 'budget' ? 'Budget' : t === 'midrange' ? 'Mid-Range' : 'Luxury'}
            </button>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 4 }}>{tier.label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#F5E642', marginBottom: 20 }}>{tier.range}</div>
          <h3 style={{ fontSize: 14, color: '#FFFFFF', margin: '0 0 12px' }}>What's Included</h3>
          {tier.features.map((f) => (
            <div key={f} style={{ padding: '8px 0', borderBottom: '1px solid #1E2D45', fontSize: 14, color: '#C8D0DC' }}>✅ {f}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#111D33', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>💾 Where to Save</div>
            <div style={{ fontSize: 13, color: '#C8D0DC' }}>{tier.save}</div>
          </div>
          <div style={{ background: '#111D33', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✨ Where to Splurge</div>
            <div style={{ fontSize: 13, color: '#C8D0DC' }}>{tier.splurge}</div>
          </div>
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>ProLnk Tip:</strong> Master bath remodels return 60–70% at resale in DFW. Get competing quotes from verified contractors on ProLnk before committing.</p>
        </div>
      </div>
    </div>
  );
}

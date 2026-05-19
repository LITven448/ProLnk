import { useState } from 'react';

const floorPlanTypes = [
  { id: 'open', label: 'Open Concept', appeal: 95, description: 'Great room combining kitchen, dining, and living' },
  { id: 'traditional', label: 'Traditional Compartmentalized', appeal: 55, description: 'Separate formal rooms with defined walls' },
  { id: 'split', label: 'Split Bedroom', appeal: 80, description: 'Primary suite separated from secondary bedrooms' },
  { id: 'twostory', label: 'Two-Story Primary Up', appeal: 60, description: 'Primary suite on second floor' },
  { id: 'firstprimary', label: 'First-Floor Primary', appeal: 92, description: 'Primary suite on main level' },
  { id: 'ranch', label: 'Single Story Ranch', appeal: 88, description: 'All bedrooms on one level' },
];

const modifications: Record<string, { mod: string; cost: string }[]> = {
  open: [{ mod: 'Add kitchen island with seating', cost: '$4,000–$8,000′ }, { mod: ’Upgrade to 10-ft ceilings if possible', cost: '$8,000–$15,000′ }, { mod: ’Extend sliding doors to outdoor patio', cost: '$6,000–$12,000′ }],
  traditional: [{ mod: 'Remove wall between kitchen and dining', cost: '$3,000–$7,000′ }, { mod: ’Open kitchen to family room', cost: '$5,000–$12,000′ }, { mod: ’Convert formal living to home office', cost: '$1,500–$4,000′ }],
  split: [{ mod: 'Expand primary suite closet', cost: '$2,000–$6,000′ }, { mod: ’Add ensuite to second bedroom', cost: '$8,000–$15,000′ }, { mod: ’Widen hallway to secondary bedrooms', cost: '$2,500–$5,000′ }],
  twostory: [{ mod: 'Convert downstairs flex room to primary', cost: '$10,000–$25,000′ }, { mod: ’Add main-floor half bath', cost: '$5,000–$10,000′ }, { mod: ’Create dedicated home office on main', cost: '$2,000–$5,000′ }],
  firstprimary: [{ mod: 'Extend primary bath with spa shower', cost: '$8,000–$18,000′ }, { mod: ’Add 3-car garage if lot allows', cost: '$25,000–$50,000′ }, { mod: ’Create mudroom entry from garage', cost: '$3,000–$8,000′ }],
  ranch: [{ mod: 'Open kitchen to living area', cost: '$4,000–$10,000′ }, { mod: ’Add dedicated home office', cost: '$2,000–$6,000′ }, { mod: ’Extend covered patio for outdoor living', cost: '$10,000–$25,000′ }],
};

export default function DFWFloorPlanGuide() {
  const [selected, setSelected] = useState('');
  const plan = floorPlanTypes.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Floor Plan Optimization<br />for DFW Buyers</h1>
        <p style={{ color: '#8B9DC3', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          DFW buyers in 2026 have clear preferences shaped by Texas lifestyle: open entertaining spaces, first-floor primary suites, dedicated home offices, and 3-car garages for truck culture. Know your floor plan's appeal before listing.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Why DFW Buyers Demand Specific Floor Plans</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 20 }}>
            {[
              { icon: '🛏️', label: 'First-Floor Primary', note: 'Multigenerational living trend + aging DFW buyer pool' },
              { icon: '🚗', label: '3-Car Garage', note: '72% of DFW households own a truck or SUV' },
              { icon: '💻', label: 'Dedicated Office', note: 'Remote work normalized post-2020; separate from living areas' },
              { icon: '🎉', label: 'Open Entertaining', note: 'Texas hospitality culture drives open-concept demand' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Your Floor Plan Appeal Analyzer</h2>
          <p style={{ color: '#8B9DC3', marginBottom: 16, fontSize: 14 }}>Select your current floor plan type:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
            {floorPlanTypes.map(fp => (
              <button key={fp.id} onClick={() => setSelected(fp.id)} style={{ background: selected === fp.id ? '#F5E642′ : '#0A1628', color: selected === fp.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: selected === fp.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {fp.label}
              </button>
            ))}
          </div>
          {plan && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{plan.label}</div>
                  <div style={{ color: '#8B9DC3', fontSize: 14 }}>{plan.description}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 40, fontWeight: 800, color: plan.appeal >= 80 ? '#4CAF50′ : plan.appeal >= 65 ? '#F5E642' : '#FF6B6B' }}>{plan.appeal}</div>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Appeal / 100</div>
                </div>
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642', fontSize: 15 }}>⚡ Highest-Value Modifications for DFW Buyers</h3>
              {modifications[plan.id].map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #1E3A5F' : 'none', gap: 12 }}>
                  <div style={{ fontSize: 14 }}>✅ {m.mod}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{m.cost}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 DFW Floor Plan Ranking (2026 Buyer Preferences)</h2>
          {[...floorPlanTypes].sort((a, b) => b.appeal - a.appeal).map(fp => (
            <div key={fp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 180, fontSize: 14 }}>{fp.label}</div>
              <div style={{ flex: 1, background: '#0A1628', borderRadius: 4, height: 20, overflow: 'hidden' }}>
                <div style={{ width: `${fp.appeal}%`, background: fp.appeal >= 80 ? '#4CAF50′ : fp.appeal >= 65 ? '#F5E642' : '#FF6B6B', height: '100%', borderRadius: 4, transition: ’width 0.3s' }} />
              </div>
              <div style={{ width: 40, textAlign: 'right', fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{fp.appeal}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const categories = [
  { id: 'watering', label: '💧 Watering', icon: '💧' },
  { id: 'repair', label: '🔧 Repair', icon: '🔧' },
  { id: 'drainage', label: '🌊 Drainage', icon: '🌊' },
  { id: 'insurance', label: '🛡️ Insurance', icon: '🛡️' },
  { id: 'prevention', label: '🏠 Prevention', icon: '🏠' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  watering: [
    { title: 'DFW Foundation Watering Guide 2026', desc: 'Precise watering schedules for North Texas clay soil by season.', tag: 'Essential' },
    { title: 'Soaker Hose Installation for DFW Foundations', desc: 'Placement, timing, and moisture targets for expansive clay.', tag: 'How-To' },
    { title: 'Drip Irrigation vs Soaker Hose for Foundations', desc: 'Which system is best for DFW homes.', tag: 'Comparison' },
    { title: 'Drought Restrictions and Foundation Health in DFW', desc: 'Managing foundation moisture during Stage 3 water restrictions.', tag: 'DFW Specific' },
  ],
  repair: [
    { title: 'Steel Pier vs Pressed Concrete Pier in Texas', desc: 'Complete comparison for DFW soil conditions.', tag: 'Pier Guide' },
    { title: 'Foundation Repair Cost Guide — DFW 2026', desc: 'Average costs by method, pier count, and severity.', tag: 'Pricing' },
    { title: 'Engineer vs Contractor — Who to Call First', desc: 'Why a PE evaluation changes everything in Texas.', tag: 'Critical' },
    { title: 'Lifetime Warranties on Foundation Repair in Texas', desc: 'What\’s real, what\’s transferable, and what to avoid.', tag: 'Warranty' },
  ],
  drainage: [
    { title: 'French Drain Installation for DFW Homes', desc: 'Solving positive slope and foundation water intrusion.', tag: 'Drainage' },
    { title: 'Grading and Slope Requirements Near Foundations', desc: 'Texas code minimums and best practices.', tag: 'Code' },
    { title: 'Root Barrier Installation in DFW', desc: 'Protecting foundations from oak and elm root damage.', tag: 'Prevention' },
    { title: 'Sump Pump Guide for DFW Basements', desc: 'Rare but real — when DFW homes need sump pumps.', tag: 'Specialty' },
  ],
  insurance: [
    { title: 'Does Texas Homeowners Insurance Cover Foundation?', desc: 'The real answer — and what riders to add.', tag: 'Insurance' },
    { title: 'Foundation Repair Insurance Claims in Texas', desc: 'Step-by-step process for filing and winning claims.', tag: 'Claims' },
    { title: 'Home Warranty and Foundation Repair', desc: 'What HMS, AHS, and Choice cover in Texas.', tag: 'Warranty' },
    { title: 'Disclosing Foundation Repairs When Selling in Texas', desc: 'Legal requirements and buyer expectations.', tag: 'Legal' },
  ],
  prevention: [
    { title: 'Annual Foundation Inspection Checklist for DFW', desc: 'What to look for every spring and fall.', tag: 'Checklist' },
    { title: 'Tree Distance Guidelines for DFW Foundations', desc: 'Safe planting distances by species for clay soil.', tag: 'Landscaping' },
    { title: 'New Construction Foundation Monitoring in DFW', desc: 'What to watch in the first 3 years of settling.', tag: 'New Homes' },
    { title: 'Join ProLnk — Find Vetted DFW Foundation Pros', desc: 'Get matched with PE-backed foundation specialists.', tag: '⭐ ProLnk' },
  ],
};

export default function DFWFoundationResourceHub2026() {
  const [active, setActive] = useState('watering');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            DFW Foundation Complete Resource Hub 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            Everything North Texas homeowners need to protect and repair their foundations on expansive clay soil.
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 16, marginBottom: 28, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>⚠️ DFW Foundation Alert</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
            North Texas black clay soil (Vertisols) expands and contracts dramatically with moisture — the #1 cause of DFW foundation issues. Consistent watering is your best prevention.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === c.id ? '#F5E642' : '#1e3a5f', color: active === c.id ? '#0A1628' : '#94a3b8',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 40 }}>
          {guides[active].map((g, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0, flex: 1, marginRight: 8 }}>{g.title}</h3>
                <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>{g.tag}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>{g.desc}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Read Guide →
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏗️</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Get a Foundation Evaluation Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects DFW homeowners with certified structural engineers and foundation specialists.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Foundation Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const categories = [
  { id: 'emergency', label: '🚨 Emergency', icon: '🚨' },
  { id: 'seasonal', label: '🌡️ Seasonal', icon: '🌡️' },
  { id: 'replacement', label: '🔄 Replacement', icon: '🔄' },
  { id: 'financing', label: '💰 Financing', icon: '💰' },
  { id: 'career', label: '👷 Career', icon: '👷' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  emergency: [
    { title: 'AC Not Cooling in DFW Summer', desc: 'Step-by-step emergency diagnosis when temps hit 105°F.', tag: 'Most Viewed' },
    { title: 'Furnace Won\’t Start in DFW Winter', desc: 'Immediate steps before calling a pro.', tag: 'Critical' },
    { title: 'Refrigerant Leak Detection Guide', desc: 'Signs, risks, and emergency response.', tag: 'Safety' },
    { title: 'Frozen AC Coil Troubleshooting', desc: 'Causes, fixes, and prevention for DFW heat.', tag: 'Common' },
  ],
  seasonal: [
    { title: 'DFW Spring HVAC Prep Checklist', desc: 'Get your AC ready before the DFW heat season hits.', tag: 'Seasonal' },
    { title: 'DFW Fall Heating Tune-Up Guide', desc: 'Furnace and heat pump prep for mild DFW winters.', tag: 'Seasonal' },
    { title: 'Summer Energy-Saving HVAC Tips', desc: 'Cut bills while keeping DFW homes cool.', tag: 'Popular' },
    { title: 'Humidity Control in DFW Homes', desc: 'Managing moisture in North Texas climate.', tag: 'DFW Specific' },
  ],
  replacement: [
    { title: 'HVAC Brand Comparison 2026', desc: 'Carrier vs Trane vs Lennox vs Goodman for DFW.', tag: 'Top Guide' },
    { title: 'When to Replace vs Repair Your HVAC', desc: 'The 5,000 rule and DFW-specific factors.', tag: 'Decision Guide' },
    { title: 'HVAC Sizing Guide for DFW Homes', desc: 'Manual J calculations for North Texas climate.', tag: 'Technical' },
    { title: 'Heat Pump vs Gas Furnace in DFW', desc: 'Best choice for DFW\’s mild winters.', tag: 'Comparison' },
  ],
  financing: [
    { title: 'HVAC Financing Options in DFW 2026', desc: 'Manufacturer programs, PACE loans, and local lenders.', tag: 'Financial' },
    { title: 'Texas HVAC Tax Credits & Rebates', desc: 'Federal IRA credits + Oncor and Atmos rebates.', tag: 'Save Money' },
    { title: 'HVAC Home Warranty Guide for DFW', desc: 'What\’s covered and what\’s not in Texas policies.', tag: 'Protection' },
    { title: 'Leasing vs Buying HVAC in Texas', desc: 'Pros, cons, and what to watch out for.', tag: 'Decision' },
  ],
  career: [
    { title: 'Becoming a Licensed HVAC Tech in Texas', desc: 'TDLR requirements, exams, and career path.', tag: 'Career' },
    { title: 'HVAC Apprenticeship Programs in DFW', desc: 'Local union and non-union apprenticeships.', tag: 'Entry Level' },
    { title: 'Starting an HVAC Business in DFW', desc: 'Licensing, insurance, bonding, and first clients.', tag: 'Business' },
    { title: 'Join ProLnk as a DFW HVAC Pro', desc: 'Earn 5 income streams with Charter membership.', tag: '⭐ ProLnk' },
  ],
};

export default function DFWHVACResourceHub2026() {
  const [active, setActive] = useState('emergency');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>❄️🔥</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            DFW HVAC Complete Resource Hub 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            Every HVAC guide a North Texas homeowner needs — organized by what matters to you right now.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === c.id ? '#F5E642′ : '#1e3a5f', color: active === c.id ? '#0A1628' : '#94a3b8',
                transition: 'all 0.2s',
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

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Find a Trusted DFW HVAC Pro</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with vetted HVAC professionals across Dallas-Fort Worth.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free HVAC Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';

const GRANTS = [
  {
    name: 'HUD Community Development Block Grant (CDBG)',
    category: 'all',
    types: ['income', 'disability', 'veteran'],
    maxAmt: 25000,
    desc: 'Critical home repair grants for low-to-moderate income homeowners. Covers roof, HVAC, foundation, plumbing, and electrical.',
    contact: 'Contact your city hall or county CDBG office',
    deadline: 'Rolling — apply year-round',
  },
  {
    name: 'Texas GLO Homeowner Assistance Program',
    category: 'all',
    types: ['income', 'senior', 'disability'],
    maxAmt: 30000,
    desc: 'Post-disaster home repair for income-eligible Texans. Active in DFW counties affected by recent severe weather events.',
    contact: 'texasrebuilds.com',
    deadline: 'Active — check GLO website for county availability',
  },
  {
    name: 'Weatherization Assistance Program (WAP)',
    category: 'energy',
    types: ['income', 'senior'],
    maxAmt: 6500,
    desc: 'Free energy efficiency upgrades: insulation, air sealing, HVAC tune-up, weather stripping. Average $6,500 in improvements.',
    contact: 'Oncor / Atmos Energy / Community Action agencies',
    deadline: 'Rolling — wait list typical 3-6 months in DFW',
  },
  {
    name: 'Area Agency on Aging — Home Repair',
    category: 'senior',
    types: ['senior'],
    maxAmt: 10000,
    desc: 'For homeowners 60+: accessibility modifications (ramps, grab bars), safety repairs, and critical system replacements.',
    contact: 'aacog.com (DFW area)',
    deadline: 'Rolling — limited funding, apply early',
  },
  {
    name: 'Rebuilding Together Dallas',
    category: 'all',
    types: ['income', 'senior', 'disability', 'veteran'],
    maxAmt: 15000,
    desc: 'Volunteer-led critical home repair. Focuses on elderly, disabled, and veteran homeowners with safety hazards.',
    contact: 'rebuildingtogetherdallas.org',
    deadline: 'Spring and Fall application windows',
  },
  {
    name: 'Veterans Housing Assistance Program (VHAP)',
    category: 'veteran',
    types: ['veteran'],
    maxAmt: 20000,
    desc: 'Texas Land Board program for veterans: low-interest home improvement loans. Not a grant, but below-market rates.',
    contact: 'glo.texas.gov/vlb',
    deadline: 'Rolling — ongoing program',
  },
  {
    name: 'DFW United Way Critical Home Repair',
    category: 'all',
    types: ['income', 'senior', 'disability'],
    maxAmt: 8000,
    desc: 'Emergency and critical repairs for families under 200% poverty level. Electrical, plumbing, roof, and HVAC.',
    contact: 'unitedwaydfw.org',
    deadline: 'Annual application window — typically January-March',
  },
  {
    name: 'ONCOR Home Performance with ENERGY STAR',
    category: 'energy',
    types: ['income', 'all'],
    maxAmt: 4500,
    desc: 'Rebates for energy efficiency upgrades: HVAC, insulation, smart thermostats. Not income-restricted.',
    contact: 'oncor.com/save',
    deadline: 'Rolling — rebates available year-round',
  },
];

export default function DFWHOMEGrantsGuide() {
  const [ownerType, setOwnerType] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const typeOptions = [
    { value: 'senior', label: '60+ years old', icon: '👴' },
    { value: 'income', label: 'Low-to-moderate income', icon: '💰' },
    { value: 'disability', label: 'Disability / accessibility needs', icon: '♿' },
    { value: 'veteran', label: 'Military veteran', icon: '🎖️' },
    { value: 'all', label: 'None of the above', icon: '🏠' },
  ];

  function toggleType(val: string) {
    if (val === 'all') { setOwnerType(['all']); return; }
    setOwnerType(prev => {
      const without = prev.filter(v => v !== 'all');
      return without.includes(val) ? without.filter(v => v !== val) : [...without, val];
    });
  }

  const qualifying = GRANTS.filter(g => {
    if (ownerType.length === 0) return true;
    if (ownerType.includes('all')) return g.types.includes('all') || g.category !== 'veteran';
    return ownerType.some(t => g.types.includes(t));
  });

  const totalPotential = qualifying.reduce((sum, g) => sum + g.maxAmt, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW Home Repair Grants 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          Federal, state, and local programs that pay for home repairs — roof, HVAC, foundation, accessibility, and energy efficiency.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💵', label: 'Max HUD CDBG', value: '$25,000', sub: 'Per household' },
            { icon: '🌤️', label: 'Texas GLO Max', value: '$30,000', sub: 'Post-disaster repair' },
            { icon: '⚡', label: 'WAP Avg Value', value: '$6,500', sub: 'Energy efficiency' },
            { icon: '🏗️', label: 'Programs Available', value: '8+', sub: 'DFW metro' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: 18, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, margin: '4px 0′ }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>🔍 Find Grants For Your Situation</h2>
          <p style={{ color: '#64748B', margin: '0 0 20px', fontSize: 14 }}>Select all that apply to you:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {typeOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => toggleType(opt.value)}
                style={{
                  padding: '10px 18px', borderRadius: 24, border: '2px solid',
                  borderColor: ownerType.includes(opt.value) ? '#0A1628′ : '#E2E8F0',
                  background: ownerType.includes(opt.value) ? '#0A1628′ : ’white',
                  color: ownerType.includes(opt.value) ? '#F5E642′ : '#475569',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResults(!showResults)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showResults ? 'Hide' : 'Show'} Matching Grants
          </button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#16A34A' }}>✅ {qualifying.length} grants found</span>
                <span style={{ color: '#64748B', fontSize: 14 }}>Combined max value: <strong>${totalPotential.toLocaleString()}</strong></span>
              </div>
              {qualifying.map(g => (
                <div key={g.name} style={{ background: '#F8FAFC', borderRadius: 10, padding: 18, marginBottom: 12, borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{g.name}</div>
                    <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700 }}>Up to ${g.maxAmt.toLocaleString()}</div>
                  </div>
                  <p style={{ color: '#475569', fontSize: 13, margin: '8px 0 10px' }}>{g.desc}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94A3B8', flexWrap: 'wrap' }}>
                    <span>📞 {g.contact}</span>
                    <span>📅 {g.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 20, border: '1px solid #FDE68A' }}>
          <h3 style={{ margin: '0 0 8px', color: '#92400E' }}>⚡ DFW Weather & Grant Priority</h3>
          <p style={{ margin: 0, color: '#78350F', fontSize: 14 }}>
            After severe weather events (DFW averages 2-3 major hail/wind events annually), Texas GLO and CDBG emergency funds often open with faster approval timelines. Sign up for alerts from your county emergency management office and apply immediately after qualifying events — funds exhaust quickly.
          </p>
        </div>
      </div>
    </div>
  );
}

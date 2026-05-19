import { useState } from 'react';

const PRIORITY_MAP: Record<string, string[]> = {
  newOwner: [
    'Locate your main water shut-off valve before any emergency',
    'Schedule HVAC filter change now — DFW dust loads filters fast',
    'Test smoke/CO detectors and replace batteries',
    'Review HOA CC&Rs — most DFW communities enforce exterior rules strictly',
    'Get a water softener assessment — hard water kills appliances early',
  ],
  established: [
    'Annual foundation inspection — clay soil movement is cumulative',
    'Pre-hail-season roof inspection (spring/fall) to document condition',
    'Flush water heater annually — sediment buildup shortens life in hard water',
    'HVAC tune-up every spring before 100°F+ cooling season',
    'Check attic insulation R-value — DFW needs R-38+ to control energy bills',
  ],
  longTerm: [
    'Repoint brick mortar every 10-15 years — DFW heat expansion cracks grout',
    'Re-level pier-and-beam or slab if doors/windows begin sticking',
    'Pool equipment lifespan: pump 8-12 yrs, heater 10-15 yrs — plan ahead',
    'Update main panel if original to home — 60-amp service is undersized today',
    'Property tax protest annually — DFW valuations rise faster than most markets',
  ],
};

const DFW_FACTS = [
  { icon: '🏗️', label: 'Foundation', desc: 'Clay soil expands/contracts with rain cycles — inspect every 1-2 years' },
  { icon: '🌡️', label: 'HVAC', desc: 'Runs 7+ months per year — replace filters monthly May-Sept' },
  { icon: '💧', label: 'Hard Water', desc: 'Scale buildup destroys fixtures, dishwashers, water heaters' },
  { icon: '☀️', label: 'Extreme Heat', desc: '100°F+ days June-Sept; attic temps hit 160°F — insulation is critical' },
  { icon: '⛈️', label: 'Hail Season', desc: 'Apr-May and Sept-Oct; document roof annually for insurance' },
  { icon: '💰', label: 'Property Taxes', desc: '2.1-2.8% of appraised value — protest every year to cap increases' },
  { icon: '🏘️', label: 'HOA Rules', desc: '~70% of DFW communities have HOAs with exterior maintenance rules' },
];

export default function DFWHomeOwningSummaryGuide() {
  const [stage, setStage] = useState<string>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>DFW Home Owning Guide</h1>
          <p style={{ color: '#a0aec0', margin: 0 }}>What makes DFW homeownership uniquely demanding</p>
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.15rem' }}>🌆 DFW-Specific Factors</h2>
          {DFW_FACTS.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: i < DFW_FACTS.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 22, minWidth: 30 }}>{f.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{f.label}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.875rem', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.15rem' }}>🎯 Your DFW Priority List</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.875rem', margin: '0 0 1rem' }}>Select your ownership stage:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[['newOwner', '🌱 New Owner'], ['established', '🏠 1-5 Years'], ['longTerm', '🏛️ 5+ Years']].map(([val, label]) => (
              <button key={val} onClick={() => setStage(val)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: stage === val ? '#F5E642′ : '#1e3a5f', background: stage === val ? '#F5E642' : ’transparent', color: stage === val ? '#0A1628′ : '#e2e8f0', fontWeight: 700, cursor: ’pointer', fontSize: '0.875rem' }}>
                {label}
              </button>
            ))}
          </div>
          {stage && (
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: '1.25rem' }}>
              {(PRIORITY_MAP[stage] || []).map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 0', fontSize: '0.9rem', borderBottom: i < PRIORITY_MAP[stage].length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span>⚡</span><span style={{ color: '#e2e8f0′ }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

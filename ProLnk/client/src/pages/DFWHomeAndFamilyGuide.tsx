import { useState } from 'react';

const stages = [
  {
    id: 'young-couple',
    label: '💑 Young Couple',
    strategy: 'Start with a condo or townhome in an inner DFW suburb like Frisco, Allen, or Plano.',
    optimize: 'Commute distance, HOA amenities, low-maintenance living, and future resale value.',
    prolnk: 'Use ProLnk to vet HVAC and appliance pros — your first home needs reliable contractors fast.',
  },
  {
    id: 'growing-family',
    label: '👨‍👩‍👧‍👦 Growing Family',
    strategy: 'Upsize into school-district-focused neighborhoods: Southlake, Coppell, or McKinney.',
    optimize: 'Square footage per dollar, ISD ratings, backyard space, and proximity to parks.',
    prolnk: 'ProLnk matches you with remodelers and landscapers as your space needs evolve.',
  },
  {
    id: 'established-family',
    label: '🏡 Established Family',
    strategy: 'Upgrade or renovate in place — DFW luxury corridors in Westlake, Prosper, or Colleyville.',
    optimize: 'Master suite upgrades, outdoor kitchens, smart home systems, and curb appeal.',
    prolnk: 'ProLnk connects you with vetted general contractors for major renovation projects.',
  },
  {
    id: 'empty-nester',
    label: '🧳 Empty Nester',
    strategy: 'Rightsize into a lower-maintenance DFW home — condos near Uptown or Legacy West.',
    optimize: 'Monthly cost reduction, walkability, proximity to dining, and travel-friendly upkeep.',
    prolnk: 'ProLnk handles seasonal maintenance and repairs so you can travel freely.',
  },
  {
    id: 'retirement',
    label: '🌅 Retirement',
    strategy: 'Lock in comfort in established DFW communities like Trophy Club or North Garland.',
    optimize: 'Accessibility upgrades, energy efficiency, fixed costs, and healthcare proximity.',
    prolnk: 'ProLnk provides trusted, pre-vetted pros so you never navigate contractors alone again.',
  },
];

export default function DFWHomeAndFamilyGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = stages.find((s) => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>DFW Home &amp; Family Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            Your family stage shapes everything about your DFW home decisions.
            Select where you are today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                backgroundColor: selected === s.id ? '#F5E642′ : '#1e2d45',
                color: selected === s.id ? '#0A1628′ : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#1e2d45', borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: '#F5E642', fontSize: 24, marginBottom: 24 }}>{active.label} Strategy</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>DFW Home Strategy</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.strategy}</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>What to Optimize</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.optimize}</p>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>ProLnk Role</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.prolnk}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select your family stage above to see your personalized DFW home strategy.
          </div>
        )}
      </div>
    </div>
  );
}

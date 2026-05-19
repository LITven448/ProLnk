import { useState } from 'react';

const priorities = [
  {
    id: 'maintenance',
    label: '🔧 Regular Maintenance',
    description: 'Annual HVAC service, roof inspections, gutter cleaning, and foundation checks.',
    cost: '$800–$2,400/year depending on home size',
    impact: 'Prevents $10,000+ emergency repairs. Keeps insurance valid. Protects resale value.',
  },
  {
    id: 'improvements',
    label: '🛠️ Strategic Improvements',
    description: 'Energy-efficient windows, updated kitchens, and modern landscaping that fit the neighborhood.',
    cost: '$5,000–$50,000 depending on scope',
    impact: 'Adds 70–85 cents of value per dollar spent in DFW\’s high-demand market.',
  },
  {
    id: 'permits',
    label: '📋 Responsible Renovation',
    description: 'Always pull permits, hire licensed contractors, and document all work completed.',
    cost: 'Permits run $200–$2,000. Saves 3–5% on sales price by eliminating buyer concerns.',
    impact: 'Protects your investment, keeps neighbors safe, and avoids HOA and city violations.',
  },
  {
    id: 'neighborhood',
    label: '🏘️ Neighborhood Contribution',
    description: 'Maintain curb appeal, participate in HOA, and support block-level beautification.',
    cost: 'Time + $200–$800/year for exterior care',
    impact: 'A well-maintained street lifts every home\’s value including yours by 2–5%.',
  },
  {
    id: 'contractors',
    label: '👷 Qualified Contractors',
    description: 'Use licensed, insured, and reviewed professionals for every trade job.',
    cost: '10–20% premium vs. unlicensed, but zero risk of shoddy work or liability.',
    impact: 'Quality work lasts 2–3x longer. Unlicensed work can void insurance and permits.',
  },
];

export default function DFWHomeStewardship() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = priorities.find((p) => p.id === selected);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>DFW Home Stewardship</h1>
          <p style={{ color: '#475569', fontSize: 18, lineHeight: 1.6 }}>
            Being a great steward of your DFW home protects your investment and strengthens your community.
            Explore each stewardship priority below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
          {priorities.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                backgroundColor: selected === p.id ? '#0A1628′ : '#e2e8f0',
                color: selected === p.id ? '#F5E642′ : '#0A1628',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>{active.label}</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>What Good Stewardship Looks Like</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.description}</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Typical Cost</div>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#0A1628', fontWeight: 600 }}>{active.cost}</p>
            </div>
            <div style={{ backgroundColor: '#f1f5f9', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#0A1628', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>Community Impact</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.impact}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select a stewardship priority above to explore what it means and what it costs.
          </div>
        )}
      </div>
    </div>
  );
}

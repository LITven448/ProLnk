import { useState } from 'react';

const concerns = [
  {
    id: 'finding',
    label: '🔍 Finding Reliable Contractors',
    tips: [
      '✅ Use ProLnk — all pros are background-checked and license-verified, no cold-callers',
      '✅ Ask for references from other seniors in your neighborhood',
      '✅ Get at least 2 written estimates before agreeing to any work',
      '✅ Check TDLR (Texas Dept of Licensing) license lookup before hiring',
      '🚫 Never hire door-to-door contractors — seniors are primary targets',
      '🚫 Never pay full price upfront — 10-30% deposit max is standard',
    ],
  },
  {
    id: 'diy',
    label: '🔧 DIY vs Hire Help',
    tips: [
      '✅ Safe DIY: changing light bulbs (with step stool), replacing filters, caulking low areas',
      '✅ Safe DIY: checking smoke detectors, cleaning dryer vents at floor level',
      '🚫 Never DIY: anything on a ladder (fall risk is #1 senior injury)',
      '🚫 Never DIY: electrical work, gas lines, roof repairs',
      '💡 Rule of thumb: if it requires climbing or crawling, hire a pro',
      '📞 ProLnk can match you with a senior-friendly pro same day',
    ],
  },
  {
    id: 'budget',
    label: '💵 Budgeting on Fixed Income',
    tips: [
      '📅 Annual maintenance budget: 1-2% of home value per year (e.g., $300K home = $3-6K/yr)',
      '🏦 PACE loans available for major upgrades (Property Assessed Clean Energy)',
      '🏠 TX HUD programs: free home repair assistance for income-qualified seniors',
      '📋 Prioritize: HVAC, roof, plumbing — ignore cosmetics',
      '💡 Ask contractors about senior discounts — many offer 5-15%',
      '📞 ProLnk transparent pricing — see cost ranges before you commit',
    ],
  },
  {
    id: 'seasonal',
    label: '🌡️ DFW Seasonal Maintenance',
    tips: [
      '🔥 Summer (May-Sep): HVAC tune-up is CRITICAL — 100°F+ days are dangerous for seniors',
      '❄️ Winter (Nov-Feb): pipe insulation check — DFW freezes hit fast and hard',
      '🌪️ Spring (Mar-May): storm damage inspection after every major storm',
      '🍂 Fall (Oct): gutters, roof check before winter rains',
      '📞 ProLnk emergency match available 24/7 for HVAC and plumbing failures',
      '✅ Schedule HVAC inspection every April before heat season',
    ],
  },
];

export default function DFWSeniorHomeMaintenanceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = concerns.find((c) => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior Homeowner Maintenance Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Trusted resources for DFW homeowners 65+ — stay safe, avoid scams, protect your home
          </p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#F5E642' }}>
            📌 <strong>ProLnk Verified Pros</strong> — every contractor is background-checked and license-verified through TDLR. No door-to-door scammers. No surprises.
          </p>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select your concern to see your senior homeowner resource guide:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {concerns.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#1e2d45',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>{active.label}</h2>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🔒 ProLnk — The Safe Way for Seniors to Find Home Help
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            No cold calls. No door-to-door. Verified pros matched to your job. DFW seniors trust ProLnk.
          </p>
        </div>
      </div>
    </div>
  );
}

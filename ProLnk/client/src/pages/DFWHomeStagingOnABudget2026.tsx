import { useState } from 'react';

export default function DFWHomeStagingOnABudget2026() {
  const [budget, setBudget] = useState<string>('500');

  const tiers = [
    {
      id: '500',
      label: '$500 Budget',
      steps: [
        { icon: '🛋️', item: 'Furniture Rental (key pieces)', cost: 200, note: 'Rent a sofa, dining table, or bed frame for 30 days from CORT or AFR Furniture Rental — both have DFW locations.' },
        { icon: '📸', item: 'Professional Photography', cost: 250, note: 'Professional real estate photos in DFW average $200–300. Homes with pro photos sell 32% faster. Non-negotiable for staged listings.' },
        { icon: '🌸', item: 'Fresh Flowers (entry + kitchen)', cost: 30, note: "Trader Joe's and Central Market DFW carry $10–15 bouquets. Two arrangements in key rooms signal a well-loved home." },
        { icon: '🎨', item: 'Neutral Paint Touch-Ups', cost: 20, note: 'Match existing wall color or use Swiss Coffee for touch-ups. Filling scuffs and dings in high-traffic areas is essential before any showing.' },
      ],
    },
    {
      id: '250',
      label: '$250 Budget',
      steps: [
        { icon: '📸', item: 'Professional Photography', cost: 250, note: 'Start here — photos drive clicks. DFW listings with pro photos get 2x the online views vs. phone photos.' },
        { icon: '🧹', item: 'Deep Clean (DIY)', cost: 0, note: 'Clean windows, wipe baseboards, scrub bathrooms, shampoo carpets. Buyers smell and see cleanliness immediately.' },
        { icon: '📦', item: 'Declutter and Depersonalize', cost: 0, note: 'Remove 50% of items from every surface. Remove all family photos. Rent a storage unit ($60–80/mo in DFW) if needed.' },
      ],
    },
    {
      id: '100',
      label: '$100 Budget',
      steps: [
        { icon: '🧹', item: 'Deep Clean', cost: 0, note: 'The single highest-impact free action. Every surface, every room. DFW buyers walk in expecting move-in ready.' },
        { icon: '💡', item: 'Maximize Natural Light', cost: 0, note: 'Open all blinds and curtains before every showing. Replace burned-out bulbs. Bright equals bigger in buyers eyes.' },
        { icon: '🌿', item: 'Entry Plant or Wreath', cost: 25, note: 'A single potted plant by the front door creates instant warmth and curb appeal for under $25.' },
        { icon: '🕯️', item: 'Neutral Scent', cost: 15, note: 'Febreze or a subtle plug-in neutralizer. No heavy candles — buyers are suspicious of strong scents masking odors.' },
      ],
    },
  ];

  const selected = tiers.find((t) => t.id === budget) ?? tiers[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏡</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Staging on a Budget 2026</h1>
          <p style={{ color: '#8B9AB5', marginTop: '0.5rem' }}>Staged DFW homes sell 73% faster — select your budget</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setBudget(t.id)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 20,
                border: `1px solid ${budget === t.id ? '#F5E642' : '#1E3050'}`,
                background: budget === t.id ? '#F5E642′ : '#0F1E35',
                color: budget === t.id ? '#0A1628′ : '#8B9AB5',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {selected.steps.map((s, i) => (
            <div key={i} style={{ background: '#0F1E35', border: '1px solid #1E3050', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{s.item}</span>
                    <span style={{ color: s.cost === 0 ? '#4ADE80′ : '#F5E642', fontWeight: 700 }}>{s.cost === 0 ? ’Free' : `$${s.cost}`}</span>
                  </div>
                  <p style={{ color: '#8B9AB5', margin: '0.4rem 0 0', fontSize: '0.85rem', lineHeight: 1.5 }}>{s.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0F1E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050', textAlign: 'center' }}>
          <p style={{ color: '#8B9AB5', margin: 0, fontSize: '0.9rem' }}>
            🔗 Need a painter, cleaner, or handyman before listing? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk</span> gets you 3 quotes from verified DFW pros.
          </p>
        </div>
      </div>
    </div>
  );
}

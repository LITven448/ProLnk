import { useState } from 'react';

const surfaces = [
  {
    id: 'faucets',
    label: '🚿 Faucets & Showerheads',
    steps: [
      'Fill zip-lock bag with undiluted white vinegar',
      'Wrap around faucet/showerhead and secure with rubber band',
      'Soak 30-60 minutes — up to 2 hours for severe DFW buildup',
      'Scrub with old toothbrush to remove loosened deposits',
      'Rinse with warm water and dry to prevent new spotting',
      'Repeat monthly to prevent DFW calcium from hardening permanently',
    ],
  },
  {
    id: 'toilet',
    label: '🚽 Toilet Bowl',
    steps: [
      'DFW hard water creates brown/orange ring at water line',
      'Pour 1 cup citric acid powder directly into bowl',
      'Let sit 30 minutes — do not flush',
      'Scrub with toilet brush focusing on the ring',
      'For stubborn DFW scale: use pumice stone (wet both stone and porcelain)',
      'Drop-in CLR tablet monthly prevents DFW calcium from returning',
    ],
  },
  {
    id: 'glassdoors',
    label: '🪟 Glass Shower Doors',
    steps: [
      'DFW water leaves etched white film on glass after months of buildup',
      'Apply CLR Calcium, Lime & Rust Remover with damp cloth',
      'Wait 2 minutes — do not let dry on glass',
      'Scrub with non-scratch pad and rinse immediately',
      'For deep DFW etching: Bar Keepers Friend paste works better than CLR',
      'Squeegee after every shower — single best prevention habit in DFW',
    ],
  },
  {
    id: 'tile',
    label: '🧱 Tile & Grout',
    steps: [
      'DFW mineral deposits embed into porous grout over time',
      'Mix equal parts white vinegar and water in spray bottle',
      'Spray and let sit 10 minutes before scrubbing',
      'Use stiff grout brush — not metal, which damages grout',
      'Severe DFW buildup on grout: professional steam cleaning recommended',
      'Seal grout annually — sealed grout resists DFW mineral penetration',
    ],
  },
  {
    id: 'dishes',
    label: '🍽️ Dishes & Glassware',
    steps: [
      'DFW water leaves cloudy film (etching) on glasses over time',
      'Soak cloudy glasses in 50/50 white vinegar and water 15 minutes',
      'For etched glass: film is permanent mineral damage — prevention only',
      'Add 1 tbsp citric acid to dishwasher rinse aid compartment',
      'Use rinse aid every cycle — mandatory for DFW dishwashers',
      'Hand wash delicate glassware and dry immediately to prevent DFW spots',
    ],
  },
];

export default function DFWCalciumRemovalGuide2026() {
  const [selected, setSelected] = useState('faucets');
  const current = surfaces.find((s) => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧂</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Calcium & Limescale Removal Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            Step-by-step removal for every surface in your DFW home
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {surfaces.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === s.id ? '#F5E642' : '#1e3a5f',
                background: selected === s.id ? '#F5E642' : '#0d1f3c',
                color: selected === s.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginTop: 0 }}>{current.label} — Removal Method</h2>
          <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
            {current.steps.map((step, i) => (
              <li key={i} style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>{step}</li>
            ))}
          </ol>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
          ProLnk • DFW Water Quality Resources 2026
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';

const concerns = [
  {
    id: 'chlorine',
    label: '🧪 Chlorine Taste/Smell',
    recs: [
      { type: 'Activated Carbon Filter', rating: '⭐⭐⭐⭐⭐', note: 'Best for DFW — removes chlorine, chloramines, VOCs, taste and odor' },
      { type: 'Whole-House Carbon + Sediment', rating: '⭐⭐⭐⭐⭐', note: 'DFW standard setup: sediment pre-filter + large carbon tank' },
      { type: 'KDF-55 Media', rating: '⭐⭐⭐⭐', note: 'Great for DFW chloramines that carbon alone may miss' },
    ],
    note: 'DFW municipal water is heavily chlorinated — carbon filtration is the #1 whole-house upgrade for DFW homeowners',
  },
  {
    id: 'hardness',
    label: '💎 Hard Water / Scale',
    recs: [
      { type: 'Salt-Based Water Softener', rating: '⭐⭐⭐⭐⭐', note: 'Only true fix for DFW 300+ ppm hardness — remove calcium/magnesium completely' },
      { type: 'Salt-Free Conditioner', rating: '⭐⭐⭐', note: 'Partial scale reduction — not full softening at DFW hardness levels' },
      { type: 'Whole-House Carbon (no effect)', rating: '⭐', note: 'Carbon filters do NOT remove hardness minerals — add softener separately' },
    ],
    note: 'Filtration and softening are different systems — most DFW homes need both',
  },
  {
    id: 'sediment',
    label: '🌫️ Sediment / Particles',
    recs: [
      { type: '5-Micron Sediment Pre-Filter', rating: '⭐⭐⭐⭐⭐', note: 'First stage in all DFW whole-house setups — catches rust, sand, debris' },
      { type: '20-Micron Pre-Filter', rating: '⭐⭐⭐⭐', note: 'Coarser filtration — good for DFW well water entry point' },
      { type: 'Spin-Down Sediment Filter', rating: '⭐⭐⭐⭐', note: 'Reusable DFW option — flush and reuse vs replace cartridges' },
    ],
    note: 'DFW municipal water has low sediment — sediment filters mainly protect from aging pipes in older DFW homes',
  },
  {
    id: 'iron',
    label: '🦷 Iron / Staining',
    recs: [
      { type: 'Iron Filter (Birm/Greensand)', rating: '⭐⭐⭐⭐⭐', note: 'Required for DFW well water with orange staining on fixtures' },
      { type: 'Air Injection Oxidizer', rating: '⭐⭐⭐⭐⭐', note: 'DFW well water with both iron and sulfur odor — dual fix' },
      { type: 'Carbon Filter (partial)', rating: '⭐⭐', note: 'Removes some dissolved iron but not enough for high DFW well iron levels' },
    ],
    note: 'DFW municipal water has minimal iron — iron issues in DFW are typically well water or aging galvanized pipes',
  },
  {
    id: 'multistage',
    label: '🏠 Full DFW Solution',
    recs: [
      { type: 'Sediment → Carbon → Softener', rating: '⭐⭐⭐⭐⭐', note: 'Most common DFW whole-house setup — covers all municipal water issues' },
      { type: 'Sediment → Carbon → UV', rating: '⭐⭐⭐⭐', note: 'Add UV if DFW well water or concerned about bacteria' },
      { type: 'Full System + Under-Sink RO', rating: '⭐⭐⭐⭐⭐', note: 'Gold standard DFW setup — whole-house treatment plus pure drinking water' },
    ],
    note: 'DFW water quality professional can test your specific water before recommending a system — ask ProLnk for a referral',
  },
];

export default function DFWWholehouseFilter2026() {
  const [selected, setSelected] = useState('chlorine');
  const current = concerns.find((c) => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Whole-House Water Filter Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            Match your DFW water concern to the right filtration system
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {concerns.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === c.id ? '#F5E642′ : '#1e3a5f',
                background: selected === c.id ? '#F5E642′ : '#0d1f3c',
                color: selected === c.id ? '#0A1628′ : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          {current.recs.map((r, i) => (
            <div key={i} style={{ background: '#0d1f3c', borderRadius: '10px', padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.95rem' }}>{r.type}</span>
                <span style={{ fontSize: '0.9rem' }}>{r.rating}</span>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>{r.note}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1rem', border: '1px solid #F5E642′ }}>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>💡 {current.note}</p>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
          ProLnk • DFW Water Quality Resources 2026
        </p>
      </div>
    </div>
  );
}
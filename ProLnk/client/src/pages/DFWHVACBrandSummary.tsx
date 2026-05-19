import { useState } from 'react';

const brands = [
  {
    id: 'carrier',
    name: 'Carrier',
    icon: '🔵',
    dfwHeat: 5,
    localService: 5,
    warranty: 5,
    price: '$$$',
    reliability: 'Excellent',
    warrantyYears: '10 yr parts + 10 yr compressor',
    dfwNotes: 'Dominant in DFW market. Huge dealer network. Premium Infinity series handles 110°F well.',
  },
  {
    id: 'trane',
    name: 'Trane',
    icon: '🔴',
    dfwHeat: 5,
    localService: 5,
    warranty: 5,
    price: '$$$',
    reliability: 'Excellent',
    warrantyYears: '10 yr parts + 12 yr compressor',
    dfwNotes: '"It\’s Hard to Stop a Trane." Built for extreme heat. XR and XV series excel in DFW summers.',
  },
  {
    id: 'lennox',
    name: 'Lennox',
    icon: '🟢',
    dfwHeat: 4,
    localService: 4,
    warranty: 5,
    price: '$$$',
    reliability: 'Very Good',
    warrantyYears: '10 yr parts + 5 yr labor (registered)',
    dfwNotes: 'Highest SEER2 ratings available. Signature series up to 28 SEER2. Good DFW dealer base.',
  },
  {
    id: 'rheem',
    name: 'Rheem',
    icon: '🟡',
    dfwHeat: 4,
    localService: 4,
    warranty: 4,
    price: '$$',
    reliability: 'Good',
    warrantyYears: '10 yr parts (registered)',
    dfwNotes: 'Strong value in DFW. Prestige series solid performer. Good warranty if registered.',
  },
  {
    id: 'goodman',
    name: 'Goodman',
    icon: '⚪',
    dfwHeat: 3,
    localService: 3,
    warranty: 4,
    price: '$',
    reliability: 'Good',
    warrantyYears: 'Lifetime compressor + 10 yr parts',
    dfwNotes: 'Best budget option in DFW. Owned by Daikin. Surprising lifetime compressor warranty.',
  },
];

const priorities = ['DFW Heat Performance', 'Local Service Network', 'Warranty Coverage', 'Lowest Price', 'Best Reliability'];

const sortKeys: Record<string, keyof typeof brands[0]> = {
  'DFW Heat Performance': 'dfwHeat',
  'Local Service Network': 'localService',
  'Warranty Coverage': 'warranty',
  'Lowest Price': 'price',
  'Best Reliability': 'reliability',
};

export default function DFWHVACBrandSummary() {
  const [priority, setPriority] = useState('DFW Heat Performance');

  const sorted = [...brands].sort((a, b) => {
    const key = sortKeys[priority];
    if (key === 'price') {
      return a.price.length - b.price.length;
    }
    const av = typeof a[key] === 'number' ? (a[key] as number) : 0;
    const bv = typeof b[key] === 'number' ? (b[key] as number) : 0;
    return bv - av;
  });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW HVAC Brand Rankings</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>Final rankings for the Dallas-Fort Worth climate — sort by what matters most</p>
        </div>

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <label style={{ color: '#8899AA', fontSize: '0.85rem', display: 'block', marginBottom: 8 }}>Sort by Priority</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{ padding: '0.4rem 1rem', borderRadius: 20, border: '2px solid', borderColor: priority === p ? '#F5E642' : '#1E3A5F', background: priority === p ? '#F5E642' : 'transparent', color: priority === p ? '#0A1628' : '#fff', fontWeight: priority === p ? 700 : 400, cursor: 'pointer', fontSize: '0.85rem' }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sorted.map((brand, idx) => (
            <div key={brand.id} style={{ background: '#0D1F35', border: `2px solid ${idx === 0 ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem', minWidth: 32, textAlign: 'center' }}>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: idx === 0 ? '#F5E642' : '#fff', margin: 0, fontSize: '1.1rem' }}>{brand.icon} {brand.name}</h3>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{brand.price}</span>
                  <span style={{ color: '#8899AA', fontSize: '0.8rem' }}>{brand.warrantyYears}</span>
                </div>
                <p style={{ color: '#AAB8C2', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>{brand.dfwNotes}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {'⭐'.repeat(brand.dfwHeat)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

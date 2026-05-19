import { useState } from 'react';

const areas = [
  {
    name: 'Uptown Dallas',
    housingTypes: ['Condo / High-rise', 'Loft', 'Townhome'],
    hvacType: 'Building central system or mini-split',
    ownership: 'HOA controls common systems',
    challenges: 'HOA approval required for unit-level changes. Building HVAC limits individual control.',
    notes: 'Most buildings have central plant HVAC. Individual units may have fan coil units (FCUs). Contact HOA before any work.',
  },
  {
    name: 'Deep Ellum',
    housingTypes: ['Converted loft', 'Row home', 'Apartment'],
    hvacType: 'Mini-split or window unit (older), split systems (converted)',
    ownership: 'Varies — converted industrial',
    challenges: 'Irregular floor plans from industrial conversion complicate ductwork routing.',
    notes: 'Many lofts lack ductwork entirely. Mini-splits are often the best solution. High ceilings increase cooling load.',
  },
  {
    name: 'Knox-Henderson',
    housingTypes: ['Bungalow', 'Townhome', 'Small condo'],
    hvacType: '2–3 ton split system typical',
    ownership: 'Individual',
    challenges: 'Small lots and older homes; some bungalows have crawl space ductwork.',
    notes: '1920s–1950s bungalows may have minimal attic space. Ductwork replacement can be expensive. Mini-splits viable for additions.',
  },
  {
    name: 'Downtown Fort Worth',
    housingTypes: ['Converted office loft', 'High-rise condo', 'Historic building'],
    hvacType: 'Central plant or individual mini-splits',
    ownership: 'HOA / building managed',
    challenges: 'Historic preservation rules may restrict exterior condenser placement.',
    notes: 'Some buildings are historic designated — exterior condenser placement requires city approval. Check before bidding.',
  },
  {
    name: 'Oak Cliff / Bishop Arts',
    housingTypes: ['Craftsman', 'Bungalow', 'Duplex'],
    hvacType: '2.5–3.5 ton split system',
    ownership: 'Individual',
    challenges: 'Older homes, some with original gravity-fed systems replaced incorrectly.',
    notes: '1930s–1960s homes common. Ductwork is often undersized or improperly installed by previous owners. Full inspection recommended.',
  },
];

export default function DFWHVACUrbanCore() {
  const [selected, setSelected] = useState<string | null>(null);
  const [housingType, setHousingType] = useState<string | null>(null);

  const profile = areas.find((a) => a.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏠 DFW HVAC Guide — Urban Core</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Urban Core HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Uptown, Deep Ellum, Knox-Henderson, and downtown Fort Worth present unique HVAC challenges: HOA-controlled
          building systems, converted industrial spaces, and historic preservation restrictions.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏙️ Urban Core HVAC Realities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🏢', label: 'Building-Controlled Systems', desc: 'HOA or building management controls core HVAC in most high-rises' },
              { icon: '🔧', label: 'Mini-Splits Dominate', desc: 'Converted lofts without ductwork rely heavily on ductless mini-splits' },
              { icon: '🏛️', label: 'Historic Restrictions', desc: 'Some buildings require city approval for condenser placement' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>
          🗺️ Select Your Urban Area
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {areas.map((a) => (
            <button
              key={a.name}
              onClick={() => { setSelected(a.name); setHousingType(null); }}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: 8,
                border: `2px solid ${selected === a.name ? '#F5E642' : '#1e3a5f'}`,
                background: selected === a.name ? '#F5E642′ : '#0F2040',
                color: selected === a.name ? '#0A1628′ : '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {a.name}
            </button>
          ))}
        </div>

        {profile && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Housing type in {profile.name}:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {profile.housingTypes.map((ht) => (
                  <button
                    key={ht}
                    onClick={() => setHousingType(ht)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: 6,
                      border: `2px solid ${housingType === ht ? '#F5E642' : '#2a4a6f'}`,
                      background: housingType === ht ? '#F5E64222′ : ’transparent',
                      color: housingType === ht ? '#F5E642′ : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    {ht}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: '1rem' }}>📍 {profile.name} HVAC Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { label: 'HVAC Type', value: profile.hvacType },
                  { label: 'Ownership', value: profile.ownership },
                  { label: 'Key Challenge', value: profile.challenges.split('.')[0] },
                ].map((item) => (
                  <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '0.85rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                    <div style={{ fontWeight: 600, color: '#F5E642', fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', color: '#cbd5e1′ }}>
                🏙️ {profile.notes}
              </div>
            </div>
          </>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ Urban Core HVAC Tips</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Always check HOA rules before scheduling any HVAC work in condos or high-rises</li>
            <li>Mini-splits are ideal for lofts — no ductwork required, highly controllable</li>
            <li>Historic buildings: get written approval for exterior condenser before purchasing equipment</li>
            <li>High ceilings in lofts require larger systems — standard sizing calculators underestimate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

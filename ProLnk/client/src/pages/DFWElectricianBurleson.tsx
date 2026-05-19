import { useState } from 'react';

const propertyTypes = ['Primary Home', 'Workshop / Metal Shop', 'Barn / Agricultural', 'Pool & Outdoor Area'];

function getElectricalNeeds(propType: string) {
  if (propType === 'Primary Home') return {
    needs: ['200A panel upgrade if pre-2000', 'EV charger rough-in (240V)', 'Arc fault breakers for bedrooms', 'GFCI in kitchen/bath/garage', 'Whole-home surge protector'],
    costRange: '$800–$8,000',
    icon: '🏠',
  };
  if (propType === 'Workshop / Metal Shop') return {
    needs: ['100–200A subpanel dedicated to shop', '240V circuits for welders/compressors', 'LED high-bay shop lighting', 'Grounding electrode system', 'Conduit wiring (not romex)'],
    costRange: '$2,500–$12,000',
    icon: '🔧',
  };
  if (propType === 'Barn / Agricultural') return {
    needs: ['Weather-rated exterior wiring', 'Dedicated circuits for water pumps', 'Motion sensor lighting', 'GFCI in wet/wash areas', 'Disconnect at barn entry'],
    costRange: '$1,500–$6,000',
    icon: '🐄',
  };
  return {
    needs: ['GFCI protection all outdoor outlets', '50A circuit for pool pump/heater', 'Low-voltage landscape lighting', 'Weatherproof outlet covers', 'Dedicated spa/hot tub circuit (240V)'],
    costRange: '$1,200–$5,000',
    icon: '🏊',
  };
}

export default function DFWElectricianBurleson() {
  const [propType, setPropType] = useState('');
  const result = propType ? getElectricalNeeds(propType) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡🏚️</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Burleson TX Electricians — South Fort Worth Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Burleson, Joshua, Crowley — Rural & Suburban Electrical Experts
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'City Pop.', value: '50,000+', icon: '👥' },
            { label: 'Lot Size', value: '0.25–10 acres', icon: '🌾' },
            { label: 'Home Mix', value: '1980s–2020s', icon: '🏠' },
            { label: 'Ag Buildings', value: 'Very Common', icon: '🐴' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>⚡ Burleson's Unique Electrical Challenges</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Burleson is one of the few DFW suburbs where rural and suburban lifestyles genuinely coexist.
            You'll find neighborhoods with HOA rules right next to 5-acre horse properties with barns,
            metal shops, and water wells. This creates an unusually wide range of electrical needs —
            from standard residential panel work to agricultural subpanels, pump systems, and
            outbuilding wiring that must meet both residential and commercial codes in Johnson County.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🐴 Horse properties need dedicated barn panels', '⛏️ Metal shops common — need 240V heavy circuits',
              '🌊 Water wells require pump disconnect', '⚡ Johnson County permit required all work'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 Electrical Needs Checklist Builder</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Select your property type to see a customized electrical needs checklist and cost estimate.</p>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 12, fontSize: 14 }}>Property Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              {propertyTypes.map(p => (
                <button
                  key={p}
                  onClick={() => setPropType(p)}
                  style={{
                    background: propType === p ? '#F5E642′ : '#0A1628',
                    color: propType === p ? '#0A1628′ : '#fff',
                    border: '1px solid #334',
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontSize: 14,
                    cursor: 'pointer',
                    fontWeight: propType === p ? 700 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{result.icon}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{propType} — Electrical Needs</div>
                  <div style={{ color: '#aaa', fontSize: 13 }}>Estimated project cost: <strong style={{ color: '#fff' }}>{result.costRange}</strong></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.needs.map((n, i) => (
                  <div key={i} style={{ background: '#112240', borderRadius: 8, padding: '10px 14px', color: '#ccc', fontSize: 14 }}>
                    ✅ {n}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Burleson Electrical Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Panel upgrades to 200A/400A', '✅ Agricultural & shop electrical installs',
              '✅ Generator hookup & transfer switches', '✅ EV charger installation',
              '✅ Johnson County permit-ready work', '✅ 24/7 emergency electrician'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0′ }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0′ }}>Get a Free Electrical Quote in Burleson</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Licensed master electricians, rural & residential, same-week scheduling</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Quote →
          </button>
        </div>

      </div>
    </div>
  );
}

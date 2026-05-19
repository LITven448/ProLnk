import { useState } from 'react';

const propertySizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const fuelTypes = ['Electric only', 'Propane + Electric', 'Natural Gas (Atmos)', 'Propane only'];

function getSystemRec(size: string, fuel: string) {
  const sizeIdx = propertySizes.indexOf(size);
  const isPropane = fuel.includes('Propane');
  const isGas = fuel.includes('Natural Gas');
  const tons = sizeIdx === 0 ? '2–3 ton' : sizeIdx === 1 ? '3–4 ton' : sizeIdx === 2 ? '4–5 ton' : '5+ ton';
  const systemType = isGas ? 'Gas Furnace + AC split system' : isPropane ? 'Dual-fuel heat pump (electric + propane backup)' : 'High-efficiency heat pump';
  const costLow = [4500, 6000, 8000, 11000][sizeIdx];
  const costHigh = [8000, 11000, 15000, 22000][sizeIdx];
  const note = isPropane && !isGas ? 'Dual-fuel heat pumps maximize efficiency where Atmos gas is unavailable' : isGas ? 'Weatherford has Atmos service in city limits — gas furnaces preferred' : 'All-electric heat pumps eligible for federal 30% tax credit';
  return { tons, systemType, cost: `$${costLow.toLocaleString()}–$${costHigh.toLocaleString()}`, note };
}

export default function DFWHVACWeatherford() {
  const [size, setSize] = useState('');
  const [fuel, setFuel] = useState('');
  const result = size && fuel ? getSystemRec(size, fuel) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️🌾</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Weatherford TX HVAC — Parker County Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Weatherford, Aledo, Springtown — Western DFW Exurb Experts
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Avg Property Size', value: '1–10+ acres', icon: '🌾' },
            { label: 'Gas Coverage', value: 'Partial (Atmos city only)', icon: '🔥' },
            { label: 'Distance from DFW', value: '30–45 min west', icon: '📍' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏡 Why Weatherford HVAC is Different</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Weatherford and the broader Parker County exurb zone presents unique HVAC challenges.
            Many rural properties sit outside Atmos Natural Gas territory — meaning propane or
            all-electric systems are the only options. Properties are larger, often 2,500–5,000+ sqft
            on multi-acre lots with older systems running well past their 15-year design life.
            The Parker County climate also sees colder winters than inner DFW, making heat source
            selection more critical. Dual-fuel heat pump systems (electric with propane backup)
            have become the gold standard for new installs here.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🔥 Propane common — Atmos doesn’t reach all areas', '🏡 Larger homes need 4–5+ ton systems',
              '❄️ Colder winters than inner DFW suburbs', '⚡ Dual-fuel heat pumps = best efficiency'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 System Size & Type Recommender</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Enter your property size and fuel access to get a system size recommendation and cost estimate.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Property Size</label>
              <select
                value={size}
                onChange={e => setSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select size...</option>
                {propertySizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Fuel Available</label>
              <select
                value={fuel}
                onChange={e => setFuel(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select fuel...</option>
                {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>SYSTEM SIZE</div>
                  <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{result.tons}</div>
                </div>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>SYSTEM TYPE</div>
                  <div style={{ color: '#fff', fontSize: 13 }}>{result.systemType}</div>
                </div>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>COST ESTIMATE</div>
                  <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{result.cost}</div>
                </div>
              </div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 14, color: '#aaa', fontSize: 14 }}>
                💡 {result.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Weatherford HVAC Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Dual-fuel heat pump installation', '✅ Propane & all-electric system expertise',
              '✅ Large-home zoned system design', '✅ Parker County permit-ready installs',
              '✅ Rural property service calls', '✅ Emergency HVAC service'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0' }}>Get a Free HVAC Quote in Weatherford</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Rural HVAC experts, propane-certified, same-week scheduling</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Quote →
          </button>
        </div>

      </div>
    </div>
  );
}

import { useState } from 'react';

const suburbs = [
  { name: 'Wylie', pop: '60,000+', founded: 1887, growth: 'Fast' },
  { name: 'Murphy', pop: '22,000+', founded: 1959, growth: 'Steady' },
  { name: 'Sachse', pop: '30,000+', founded: 1959, growth: 'Fast' },
];

const ageRanges = ['Pre-2000', '2000–2010', '2011–2020', '2021+'];
const sqftRanges = ['Under 1,500', '1,500–2,500', '2,500–3,500', '3,500+'];

function getSystemEstimate(age: string, sqft: string) {
  const ageScore = ageRanges.indexOf(age);
  const sqftScore = sqftRanges.indexOf(sqft);
  const combined = ageScore + sqftScore;
  if (ageScore === 0) return { years: '15–25 yrs', score: 90, action: 'Replace Now', color: '#ff4444′ };
  if (ageScore === 1) return { years: '10–18 yrs', score: 65, action: 'Inspect This Season', color: '#F5E642′ };
  if (ageScore === 2) return { years: '5–12 yrs', score: 35, action: 'Tune-Up Recommended', color: '#44cc44′ };
  return { years: '0–5 yrs', score: combined > 5 ? 20 : 10, action: 'New — Just Monitor', color: '#44cc44′ };
}

export default function DFWHVACWylie() {
  const [homeAge, setHomeAge] = useState('');
  const [sqft, setSqft] = useState('');
  const estimate = homeAge && sqft ? getSystemEstimate(homeAge, sqft) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️🔥</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Wylie TX HVAC — Growing Suburb Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Wylie, Murphy, Sachse & East Collin County — Heat Pump Experts
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {suburbs.map(s => (
            <div key={s.name} style={{ background: '#112240', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642′ }}>{s.name}</div>
              <div style={{ color: '#aaa', fontSize: 13, margin: '4px 0′ }}>Pop. {s.pop}</div>
              <div style={{ fontSize: 12, color: '#66aaff' }}>Growth: {s.growth}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏡 Why Wylie Homes Need HVAC Attention</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Wylie exploded from a small farm town into one of DFW's fastest-growing suburbs over the last 25 years.
            That means a huge mix of home vintages — from pre-2000 originals running ancient R-22 systems to
            2020s new builds specced for high-efficiency heat pumps. With Texas summers pushing 110°F+,
            knowing your system's age and capacity is critical before peak season.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌡️ Heat pump adoption fastest in DFW', '⚡ Collin County utility incentives available',
              '🏗️ New subdivisions spec dual-stage systems', '🔧 Older Wylie homes often on R-22 (discontinued)'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 System Age Estimator</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Enter your home's vintage and size to estimate system age and replacement readiness.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Home Built</label>
              <select
                value={homeAge}
                onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select era...</option>
                {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Square Footage</label>
              <select
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select size...</option>
                {sqftRanges.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {estimate && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: `2px solid ${estimate.color}` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: estimate.color, marginBottom: 8 }}>{estimate.action}</div>
              <div style={{ color: '#ccc', marginBottom: 8 }}>Estimated system age: <strong style={{ color: '#fff' }}>{estimate.years}</strong></div>
              <div style={{ background: '#112240', borderRadius: 6, height: 12, overflow: 'hidden' }}>
                <div style={{ width: `${estimate.score}%`, background: estimate.color, height: '100%', transition: 'width 0.5s' }} />
              </div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 8 }}>Replacement Readiness Score: {estimate.score}/100</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Wylie HVAC Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Heat pump installation & conversion', '✅ R-410A & R-32 refrigerant service',
              '✅ Collin County permit-ready installs', '✅ Zoned system design for large homes',
              '✅ Pre-season tune-ups (spring & fall)', '✅ Emergency same-day service'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0′ }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0′ }}>Get a Free HVAC Quote in Wylie</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Vetted local pros, transparent pricing, same-week availability</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Quote →
          </button>
        </div>

      </div>
    </div>
  );
}

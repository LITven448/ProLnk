import { useState } from 'react';

const homeSizes = ['Under 2,500 sqft', '2,500 – 4,000 sqft', '4,000 – 6,000 sqft', '6,000+ sqft'];
const systemAges = ['Under 5 years', '5 – 10 years', '10 – 15 years', '15+ years'];

type Rec = { system: string; brand: string; cost: string; note: string };

const matrix: Record<string, Record<string, Rec>> = {
  'Under 2,500 sqft': {
    'Under 5 years': { system: 'No action needed', brand: 'Maintain current system', cost: '$150 – $300/yr tune-up', note: '✅ System is new and sized correctly.' },
    '5 – 10 years': { system: 'Maintenance plan', brand: 'Carrier / Lennox', cost: '$200 – $500/yr', note: '🟡 Begin annual maintenance to extend life.' },
    '10 – 15 years': { system: 'Plan for replacement', brand: 'Carrier 24ACC6 or Lennox XC21', cost: '$7,500 – $11,000', note: '🟡 System approaching end of life — lock in efficiency gains now.' },
    '15+ years': { system: 'Replace now', brand: 'Trane XV20i or Lennox SL28XCV', cost: '$10,000 – $15,000', note: '🔴 Beyond typical lifespan. Failure risk is high heading into summer.' },
  },
  '2,500 – 4,000 sqft': {
    'Under 5 years': { system: 'Zoning upgrade optional', brand: 'Carrier Infinity with zoning', cost: '$2,500 – $4,000 add-on', note: '✅ Consider zoning for comfort across floors.' },
    '5 – 10 years': { system: 'Maintenance + efficiency audit', brand: 'Carrier / Trane', cost: '$300 – $600/yr', note: '🟡 These homes benefit from duct leakage testing.' },
    '10 – 15 years': { system: 'Dual-zone replacement', brand: 'Carrier Infinity 21 or Trane XV20i', cost: '$14,000 – $20,000', note: '🟡 Dual-zone system dramatically improves comfort in larger homes.' },
    '15+ years': { system: 'Full premium replacement', brand: 'Lennox SL28XCV + iComfort S30', cost: '$18,000 – $26,000', note: '🔴 Colleyville standard — premium system is the neighborhood norm.' },
  },
  '4,000 – 6,000 sqft': {
    'Under 5 years': { system: 'Zoning + smart thermostat', brand: 'Carrier Infinity + zoning', cost: '$3,000 – $5,500 add-on', note: '✅ Multi-zone control maximizes comfort and ROI in large homes.' },
    '5 – 10 years': { system: 'Performance audit + tune-up', brand: 'Current brand preferred', cost: '$500 – $900', note: '🟡 Test static pressure and refrigerant charge for peak output.' },
    '10 – 15 years': { system: 'Multi-zone replacement', brand: 'Trane XV20i or Carrier Infinity 21', cost: '$22,000 – $34,000', note: '🟡 At this size, two systems likely. Budget accordingly.' },
    '15+ years': { system: 'Full dual-system replacement', brand: 'Lennox SL28XCV (2 units)', cost: '$30,000 – $45,000', note: '🔴 Homes this size need full replacement for reliable coverage.' },
  },
  '6,000+ sqft': {
    'Under 5 years': { system: 'Smart home HVAC integration', brand: 'Carrier Infinity or Lennox iComfort', cost: '$4,000 – $8,000 controls', note: '✅ Automate zones with home automation for maximum efficiency.' },
    '5 – 10 years': { system: 'Commercial-grade tune-up', brand: 'All units serviced', cost: '$800 – $1,500', note: '🟡 Multiple systems require coordinated service schedule.' },
    '10 – 15 years': { system: 'Phased replacement plan', brand: 'Trane / Lennox premium', cost: '$40,000 – $60,000', note: '🟡 Stage replacements to manage cost while maintaining reliability.' },
    '15+ years': { system: 'Full estate HVAC overhaul', brand: 'Carrier or Trane commercial hybrid', cost: '$55,000 – $80,000+', note: '🔴 Estate-level replacement — get three contractor bids.' },
  },
};

export default function DFWHVACColleyville() {
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');

  const result = size && age ? matrix[size]?.[age] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          ❄️ ProLnk · Colleyville TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Colleyville TX HVAC
        </h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Affluent Mid-Cities Specialists</p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          Colleyville homeowners invest in premium HVAC systems — and expect contractors who know the difference between a Carrier Infinity and an entry-level unit. Large homes, high ceilings, and discerning clients define this market.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[
            ['🏰', 'Premium Brands Standard', 'Carrier, Lennox, and Trane dominate Colleyville. Homeowners research brands and expect contractors to match their knowledge.'],
            ['📐', 'Larger Homes, Complex Systems', 'Many Colleyville homes exceed 4,000 sqft. Multi-zone, dual-system installs are common — not the exception.'],
            ['💰', 'Quality Over Price', 'Colleyville homeowners prioritize system longevity and efficiency ratings over lowest bid. Premium pays here.'],
            ['🌡️', 'North Texas Heat Exposure', 'Summer peaks above 105°F demand systems engineered for sustained heavy load, not just average temp.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🏠 Premium System Recommender</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Home size?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeSizes.map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: size === s ? '#F5E642′ : '#1e3a5f', backgroundColor: size === s ? '#F5E642' : ’transparent', color: size === s ? '#0A1628′ : '#fff', fontWeight: size === s ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Current system age?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {systemAges.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642′ : '#1e3a5f', backgroundColor: age === a ? '#F5E642' : ’transparent', color: age === a ? '#0A1628′ : '#fff', fontWeight: age === a ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{a}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{result.system}</div>
              <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>Recommended: {result.brand}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>{result.note}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Colleyville Market Estimate</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.cost}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>Get Premium Quotes →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk connects Colleyville homeowners with vetted premium HVAC contractors only.
        </div>
      </div>
    </div>
  );
}

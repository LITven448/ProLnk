import { useState } from 'react';

const cities: Record<string, { waterRate: number; restrictions: string; rebates: string }> = {
  Dallas: { waterRate: 3.10, restrictions: 'Stage 1 at <50% lake capacity', rebates: 'Smart irrigation rebate $200' },
  Frisco: { waterRate: 4.20, restrictions: 'Stage 2 watering 2x/week summer', rebates: 'Rain sensor rebate $75' },
  Plano: { waterRate: 3.65, restrictions: 'Stage 1 at <45% reservoir', rebates: 'Landscape audit free' },
  McKinney: { waterRate: 3.80, restrictions: 'Odd/even day watering year-round', rebates: 'Smart controller rebate $150' },
  Arlington: { waterRate: 3.25, restrictions: 'Stage 1 voluntary restrictions', rebates: 'WaterWise landscape rebate' },
  'Fort Worth': { waterRate: 3.40, restrictions: 'Stage 2 limits 2x/week irrigation', rebates: 'Rain gauge rebate $25' },
  Garland: { waterRate: 3.55, restrictions: 'Stage 1 at <40% capacity', rebates: 'Smart irrigation rebate $100' },
  Irving: { waterRate: 3.30, restrictions: 'Year-round 2x/week limit', rebates: 'Water audit free' },
};

export default function DFWWaterConservationGuide() {
  const [city, setCity] = useState('Dallas');
  const [yardSqFt, setYardSqFt] = useState('');
  const [hasSmartIrrigation, setHasSmartIrrigation] = useState(false);
  const [hasLowFlow, setHasLowFlow] = useState(false);
  const [result, setResult] = useState<{ monthlyBase: number; savings: number; compliance: string } | null>(null);

  function calculate() {
    const yard = parseFloat(yardSqFt) || 2000;
    const cityData = cities[city];
    const gallonsPerMonth = yard * 0.6;
    const monthlyBase = Math.round((gallonsPerMonth / 1000) * cityData.waterRate);
    let savings = 0;
    if (hasSmartIrrigation) savings += Math.round(monthlyBase * 0.30);
    if (hasLowFlow) savings += Math.round(monthlyBase * 0.10);
    const compliance = hasSmartIrrigation ? '✅ Compliant with all restriction stages' : '⚠️ Manual irrigation may violate Stage 2 restrictions';
    setResult({ monthlyBase, savings, compliance });
  }

  const cityData = cities[city];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>💧</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Water Conservation Guide
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            DFW irrigation accounts for <strong style={{ color: '#F5E642' }}>50–70% of summer water bills</strong>. Know your city's rules and how to save.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🏙️ Select Your DFW City</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.keys(cities).map(c => (
              <button key={c} onClick={() => setCity(c)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: `1px solid ${city === c ? '#F5E642' : '#1E3A5F'}`, background: city === c ? '#F5E642' : '#0A1628', color: city === c ? '#0A1628' : '#E8F0FE', cursor: 'pointer', fontWeight: city === c ? 700 : 400 }}>
                {c}
              </button>
            ))}
          </div>
          {cityData && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.5rem' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>💰 Rate: <strong style={{ color: '#E8F0FE' }}>${cityData.waterRate}/1,000 gal</strong></div>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>🚫 Restrictions: <strong style={{ color: '#FF9F43' }}>{cityData.restrictions}</strong></div>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>🎁 Rebates: <strong style={{ color: '#34D399' }}>{cityData.rebates}</strong></div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🧮 Calculate Your Water Conservation Plan</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>Yard / Irrigated Area (sq ft)</label>
            <input value={yardSqFt} onChange={e => setYardSqFt(e.target.value)} type="number" placeholder="e.g. 3000"
              style={{ width: 200, padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { label: '🌧️ Smart irrigation controller installed', value: hasSmartIrrigation, setter: setHasSmartIrrigation },
              { label: '🚿 Low-flow fixtures throughout home', value: hasLowFlow, setter: setHasLowFlow },
            ].map((item, i) => (
              <div key={i} onClick={() => item.setter(!item.value)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.3rem' }}>{item.value ? '✅' : '⬜'}</span>
                <span style={{ color: '#E8F0FE' }}>{item.label}</span>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Generate Conservation Plan
          </button>
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📊 Your Water Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642' }}>${result.monthlyBase}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Est. summer monthly bill</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#34D399' }}>${result.savings}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Monthly savings potential</div>
              </div>
            </div>
            <div style={{ padding: '0.75rem', background: '#0A1628', borderRadius: 8, fontSize: '0.9rem' }}>{result.compliance}</div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#111D35', borderRadius: 10, border: '1px solid #1E3A5F', color: '#94A3B8', fontSize: '0.85rem' }}>
          🔍 Leak detection tip: Read your water meter before and after a 2-hour no-use window. Any movement = a leak costing $30–$100/mo.
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function DFWHomeMaintenanceCalc() {
  const [homeAge, setHomeAge] = useState(15);
  const [sqft, setSqft] = useState(2200);
  const [hasPool, setHasPool] = useState(false);
  const [hvacCount, setHvacCount] = useState(1);
  const [roofAge, setRoofAge] = useState(8);

  function calcCosts() {
    const base = sqft * 1.2;
    const ageMult = homeAge < 10 ? 1.0 : homeAge < 20 ? 1.2 : homeAge < 30 ? 1.45 : 1.7;
    const roofFactor = roofAge > 15 ? 800 : roofAge > 10 ? 400 : 150;
    const poolCost = hasPool ? 1800 : 0;
    const hvacCost = hvacCount * 350;

    const hvac = Math.round(hvacCost * ageMult);
    const roofing = Math.round(roofFactor + sqft * 0.08);
    const plumbing = Math.round(280 * ageMult);
    const electrical = Math.round(200 * ageMult);
    const exterior = Math.round(320 * ageMult);
    const pool = poolCost;
    const landscaping = 600;
    const pest = 480;
    const misc = Math.round(sqft * 0.15 * ageMult);

    const total = hvac + roofing + plumbing + electrical + exterior + pool + landscaping + pest + misc;
    return { hvac, roofing, plumbing, electrical, exterior, pool, landscaping, pest, misc, total };
  }

  const costs = calcCosts();
  const monthly = Math.round(costs.total / 12);

  const categories = [
    { label: '❄️ HVAC Service & Repairs', value: costs.hvac },
    { label: '🏠 Roof Maintenance', value: costs.roofing },
    { label: '🚿 Plumbing', value: costs.plumbing },
    { label: '⚡ Electrical', value: costs.electrical },
    { label: '🪟 Exterior & Foundation', value: costs.exterior },
    { label: '🌿 Landscaping', value: costs.landscaping },
    { label: '🐜 Pest Control', value: costs.pest },
    { label: '🔧 Misc Repairs', value: costs.misc },
    ...(hasPool ? [{ label: '🏊 Pool Maintenance', value: costs.pool }] : []),
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🧮</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Home Maintenance Cost Calculator</h1>
          <p style={{ color: '#8B9BB4', fontSize: 15 }}>Estimate your annual maintenance spend and monthly reserve — based on your DFW home profile.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>🏠 Your Home Profile</h2>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ color: '#8B9BB4', fontSize: 13 }}>Home Age</label>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge} years</span>
            </div>
            <input type="range" min={1} max={60} value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4A5568', marginTop: 4 }}>
              <span>New</span><span>60 yrs</span>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ color: '#8B9BB4', fontSize: 13 }}>Square Footage</label>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{sqft.toLocaleString()} sq ft</span>
            </div>
            <input type="range" min={800} max={6000} step={100} value={sqft} onChange={e => setSqft(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4A5568', marginTop: 4 }}>
              <span>800</span><span>6,000</span>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ color: '#8B9BB4', fontSize: 13 }}>Roof Age</label>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{roofAge} years</span>
            </div>
            <input type="range" min={0} max={25} value={roofAge} onChange={e => setRoofAge(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4A5568', marginTop: 4 }}>
              <span>New</span><span>25 yrs</span>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ color: '#8B9BB4', fontSize: 13 }}>HVAC Units</label>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{hvacCount}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setHvacCount(n)} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, background: hvacCount === n ? '#F5E642′ : '#1A2E4A', color: hvacCount === n ? '#0A1628' : '#8B9BB4' }}>{n}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={() => setHasPool(p => !p)} style={{ width: 44, height: 24, borderRadius: 12, background: hasPool ? '#F5E642′ : '#1A2E4A', cursor: ’pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 3, left: hasPool ? 23 : 3, transition: 'left 0.2s' }} />
            </div>
            <label style={{ color: '#8B9BB4', fontSize: 13, cursor: 'pointer' }} onClick={() => setHasPool(p => !p)}>Has Pool</label>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, marginBottom: 24, textAlign: 'center' }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 8 }}>Estimated Annual Maintenance</p>
          <div style={{ color: '#F5E642', fontSize: 44, fontWeight: 800 }}>${costs.total.toLocaleString()}</div>
          <div style={{ color: '#22C55E', fontSize: 18, fontWeight: 600, marginTop: 8 }}>Monthly Reserve: ${monthly.toLocaleString()}/mo</div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Cost Breakdown</h2>
          {categories.map(cat => (
            <div key={cat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1A2E4A' }}>
              <span style={{ fontSize: 14, color: '#8B9BB4′ }}>{cat.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#E8EAF0′ }}>${cat.value.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, margin: 0 }}>ProLnk helps you get competitive quotes on every category above. <span style={{ color: '#F5E642', fontWeight: 600 }}>Free for DFW homeowners.</span></p>
        </div>
      </div>
    </div>
  );
}

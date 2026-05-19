import { useState } from 'react';

const areaData: Record<string, { hasGas: boolean; label: string }> = {
  'Forney': { hasGas: false, label: 'Limited natural gas — propane common' },
  'Kaufman': { hasGas: false, label: 'Rural — propane primary fuel' },
  'Waxahachie': { hasGas: false, label: 'Partial gas access — propane used widely' },
  'Midlothian': { hasGas: false, label: 'Newer areas rely on propane' },
  'Rockwall': { hasGas: true, label: 'Natural gas available in most areas' },
  'Mansfield': { hasGas: true, label: 'Natural gas widely available' },
  'Burleson': { hasGas: false, label: 'Outer DFW — propane common' },
  'Cleburne': { hasGas: false, label: 'Rural — propane primary' },
  'Weatherford': { hasGas: false, label: 'Parker County — propane standard' },
  'Granbury': { hasGas: false, label: 'Hood County — propane primary' },
  'Other DFW City': { hasGas: true, label: 'Natural gas likely available' },
};

const householdSizes = ['1–2 people', '3–4 people', '5–6 people', '7+ people'];

export default function DFWTanklessPropaneGuide() {
  const [area, setArea] = useState('');
  const [household, setHousehold] = useState('');
  const [result, setResult] = useState<null | { btu: string; tank: string; monthly: string; rec: string }>(null);

  function calculate() {
    if (!area || !household) return;
    const idx = householdSizes.indexOf(household);
    const btuMap = ['120,000 BTU', '180,000 BTU', '240,000 BTU', '300,000+ BTU'];
    const tankMap = ['120-gallon tank', '250-gallon tank', '500-gallon tank', '500–1,000-gallon tank'];
    const costMap = ['$35–55/mo', '$55–85/mo', '$85–130/mo', '$130–200/mo'];
    const rec = areaData[area]?.hasGas
      ? 'Natural gas tankless is more cost-effective in your area, but propane tankless is a viable backup option.'
      : 'Propane tankless is the right choice — better efficiency than tank propane, endless hot water.';
    setResult({ btu: btuMap[idx], tank: tankMap[idx], monthly: costMap[idx], rec });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🔥 DFW Propane Tankless Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Propane Tankless Water Heaters for DFW</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>Why Propane Tankless for Outer DFW?</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0′ }}>
            Many outer DFW communities — Parker County, Hood County, Kaufman County, parts of Ellis County — lack natural gas infrastructure.
            Propane tankless water heaters offer the <strong style={{ color: '#F5E642′ }}>same endless hot water and efficiency benefits</strong> as
            natural gas tankless, burning cleaner and more efficiently than traditional propane storage tank heaters.
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>Propane Tankless vs. Tank Propane</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              ['⚡', 'Tankless', '94–96% efficiency — far better than 60–70% for tank models'],
              ['♾️', 'Tankless', 'Endless hot water — never run out mid-shower'],
              ['📦', 'Storage Tank', 'Simpler setup — no venting modifications'],
              ['💰', 'Storage Tank', 'Lower upfront cost — $800–$1,500 vs. $1,500–$3,000'],
            ].map(([icon, type, desc]) => (
              <div key={desc} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.4rem' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.3rem' }}>{type}</div>
                <div style={{ color: '#c8d8f0', fontSize: '0.85rem', marginTop: '0.3rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>🪣 Propane Tank Sizing Matters</h2>
          <ul style={{ lineHeight: 2, color: '#c8d8f0', paddingLeft: '1.5rem' }}>
            <li>Tankless units fire at high BTU — needs a larger supply tank than storage heaters</li>
            <li>Minimum 120-gallon tank for a 1–2 person home</li>
            <li>Most families need 250–500 gallon for reliable supply</li>
            <li>Leased vs. owned tank affects refill flexibility and pricing</li>
          </ul>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Get Your Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select area...</option>
                {Object.keys(areaData).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {area && <div style={{ color: '#c8d8f0', fontSize: '0.85rem', marginTop: '0.4rem' }}>{areaData[area]?.label}</div>}
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Household Size</label>
              <select value={household} onChange={e => setHousehold(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select size...</option>
                {householdSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Get Recommendation
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Your Propane Tankless Profile</div>
              <div style={{ color: '#c8d8f0', lineHeight: 1.9 }}>
                <div>🔥 Recommended BTU: <strong style={{ color: '#fff' }}>{result.btu}</strong></div>
                <div>🪣 Propane Tank Size: <strong style={{ color: '#fff' }}>{result.tank}</strong></div>
                <div>💳 Est. Monthly Propane Cost: <strong style={{ color: '#fff' }}>{result.monthly}</strong></div>
                <div style={{ marginTop: '0.75rem', color: '#F5E642′ }}>{result.rec}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Connect with a DFW Propane Water Heater Specialist</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk finds licensed plumbers experienced with propane tankless systems in your area.</div>
        </div>
      </div>
    </div>
  );
}

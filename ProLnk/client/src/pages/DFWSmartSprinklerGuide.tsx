import { useState } from 'react';

const CONTROLLERS = [
  {
    name: 'Rachio 3',
    price: 229,
    zones: 16,
    weatherBased: true,
    rebateEligible: true,
    app: '⭐⭐⭐⭐⭐',
    bestFor: 'Most DFW homeowners — best weather intelligence',
    features: ['EPA WaterSense certified', 'Hyperlocal weather from NWS/PWS', 'Flex Daily schedules use ET data', 'Works with Alexa, Google, HomeKit'],
    waterSavings: '40–50%',
  },
  {
    name: 'RainBird WiFi',
    price: 189,
    zones: 12,
    weatherBased: true,
    rebateEligible: true,
    app: '⭐⭐⭐⭐',
    bestFor: 'Existing RainBird system upgrades',
    features: ['Drop-in replacement for RainBird controllers', 'ET-based scheduling', 'Flow monitoring add-on', 'Local control backup'],
    waterSavings: '30–45%',
  },
  {
    name: 'Hunter Hydrawise',
    price: 199,
    zones: 12,
    weatherBased: true,
    rebateEligible: true,
    app: '⭐⭐⭐⭐',
    bestFor: 'Commercial-grade precision for large yards',
    features: ['Predictive watering algorithm', 'Flow sensor integration', 'Multi-site management', 'Pro installer favorite'],
    waterSavings: '35–50%',
  },
];

const DFW_RESTRICTIONS = [
  { city: 'Dallas', schedule: 'Assigned days only (Stage 1)', etBased: 'Allowed anytime with approved controller' },
  { city: 'Fort Worth', schedule: '2 days/week residential', etBased: 'ET-based controllers exempt from day restrictions' },
  { city: 'Plano', schedule: 'Odd/Even by address', etBased: 'Smart controllers can water any day if < ET target' },
  { city: 'Frisco', schedule: '1 day/week Stage 2', etBased: 'WaterSense controllers qualify for exemptions' },
  { city: 'McKinney', schedule: '2 days/week May–Oct', etBased: 'ET-based watering bypasses day restrictions' },
];

function calcSavings(zones: number, sqft: number) {
  const gallonsPerZone = sqft * 0.62 / zones;
  const monthlyGallons = gallonsPerZone * zones * 8;
  const savings = Math.round(monthlyGallons * 0.4 * 0.004);
  const payback = Math.round(229 / savings);
  return { monthly: savings, payback, eligible: sqft > 1500 };
}

export default function DFWSmartSprinklerGuide() {
  const [zones, setZones] = useState(8);
  const [sqft, setSqft] = useState(5000);
  const [showResult, setShowResult] = useState(false);

  const savings = calcSavings(zones, sqft);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>💧 DFW SMART IRRIGATION</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            DFW Smart Sprinkler Controller Guide
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW water restrictions and extreme summer heat make smart irrigation controllers a must-have — not a luxury. Cities across DFW are offering rebates up to $150 for WaterSense-certified smart controllers.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🌿 ET-Based Watering: The DFW Game Changer</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            Evapotranspiration (ET) is a measure of how much water your yard loses to evaporation and plant transpiration each day. Smart controllers like Rachio use real-time DFW weather data to calculate exactly how much water your lawn needs — and skip watering on cool or rainy days automatically.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { month: 'July (Peak)', etPerDay: '0.38″', weekly: '2.66″', note: 'Hot, dry — max watering needed' },
              { month: 'October', etPerDay: '0.18″', weekly: '1.26″', note: 'Cooler — smart controllers auto-reduce' },
              { month: 'January', etPerDay: '0.05″', weekly: '0.35″', note: 'Near-zero — smart controllers pause automatically' },
            ].map(m => (
              <div key={m.month} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{m.month}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{m.etPerDay}/day</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{m.weekly}/week needed</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          {CONTROLLERS.map(ctrl => (
            <div key={ctrl.name} style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{ctrl.name}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8′ }}>{ctrl.bestFor}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>${ctrl.price}</div>
                  {ctrl.rebateEligible && <div style={{ fontSize: 11, color: '#34D399', marginTop: 4 }}>✅ Rebate Eligible</div>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  {ctrl.features.map(f => <div key={f} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>• {f}</div>)}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>UP TO WATER SAVINGS</div>
                  <div style={{ color: '#34D399', fontWeight: 700, fontSize: 18 }}>{ctrl.waterSavings}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 8, marginBottom: 4 }}>APP RATING</div>
                  <div style={{ fontSize: 13 }}>{ctrl.app}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 8, marginBottom: 4 }}>MAX ZONES</div>
                  <div style={{ fontWeight: 600 }}>{ctrl.zones} zones</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏙️ DFW City Water Restriction Rules</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E3A5F' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#64748B', fontWeight: 600 }}>City</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#64748B', fontWeight: 600 }}>Standard Restriction</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#34D399', fontWeight: 600 }}>Smart Controller Benefit</th>
                </tr>
              </thead>
              <tbody>
                {DFW_RESTRICTIONS.map(r => (
                  <tr key={r.city} style={{ borderBottom: '1px solid #1E3A5F' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.city}</td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>{r.schedule}</td>
                    <td style={{ padding: '10px 12px', color: '#34D399′ }}>{r.etBased}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>💧 Calculate Your Water Savings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Number of Irrigation Zones</label>
              <input type="range" min="4″ max="24" step="1" value={zones} onChange={e => { setZones(+e.target.value); setShowResult(false); }}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{zones} zones</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Yard / Irrigated Area (sq ft)</label>
              <input type="range" min="1000″ max="20000" step="500" value={sqft} onChange={e => { setSqft(+e.target.value); setShowResult(false); }}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sq ft</div>
            </div>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate My Savings →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>EST. MONTHLY SAVINGS</div><div style={{ color: '#34D399', fontWeight: 800, fontSize: 22 }}>${savings.monthly}/mo</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>PAYBACK PERIOD</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{savings.payback} mo</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>CITY REBATE</div><div style={{ color: savings.eligible ? '#34D399′ : '#94A3B8', fontWeight: 800, fontSize: 22 }}>{savings.eligible ? ’Up to $150′ : ’Check city'}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Need a DFW irrigation pro to install or reprogram your system?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with certified DFW irrigation specialists 💧</div>
        </div>

      </div>
    </div>
  );
}

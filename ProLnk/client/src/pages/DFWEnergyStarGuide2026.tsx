import { useState } from 'react';

export default function DFWEnergyStarGuide2026() {
  const [category, setCategory] = useState('');

  const specs: Record<string, { emoji: string; title: string; dfwSpec: string; why: string; rebate: string; tip: string }> = {
    hvac: {
      emoji: '🌀',
      title: 'ENERGY STAR HVAC',
      dfwSpec: 'Min SEER2 15.2 for Texas Climate Zone 3 (as of Jan 2023)',
      why: 'DFW summer AC runtime is 1,800-2,200 hours/year — higher SEER pays off fast. Target SEER2 17-18 for best DFW ROI.',
      rebate: 'Oncor: up to $300 | Atmos (heat pump): up to $500 | Federal tax credit: 30% up to $2,000',
      tip: 'Variable-speed inverter compressor is worth the premium in DFW — handles 100°F+ days efficiently',
    },
    windows: {
      emoji: '🪟',
      title: 'ENERGY STAR Windows',
      dfwSpec: 'U-factor ≤ 0.27 | SHGC ≤ 0.25 for Texas South-Central Climate Zone',
      why: 'Low SHGC blocks solar heat gain — critical in DFW where windows face direct Texas sun 6+ months/year.',
      rebate: 'Federal tax credit: 30% up to $600/yr | Some cities offer property tax exemption for energy upgrades',
      tip: 'Triple-pane not needed in DFW — double-pane Low-E with argon fills the ENERGY STAR spec perfectly',
    },
    refrigerator: {
      emoji: '🧊',
      title: 'ENERGY STAR Refrigerators',
      dfwSpec: '10-15% more efficient than federal minimum | Look for CEE Tier 2 or higher for DFW rebates',
      why: 'Refrigerators run 24/7. In DFW garages (110°F+), non-ES models work up to 40% harder — use indoor models only.',
      rebate: 'CoServ: $50 rebate | Oncor: $50 rebate | Check energystar.gov for retail partner rebates',
      tip: 'Never put refrigerator in non-insulated DFW garage — heat kills efficiency and compressor lifespan',
    },
    dishwasher: {
      emoji: '🍽️',
      title: 'ENERGY STAR Dishwashers',
      dfwSpec: '≤ 3.5 gallons/cycle | ≤ 270 kWh/year energy use',
      why: 'ENERGY STAR dishwashers use 3x less water than handwashing — major savings in DFW where water rates are rising.',
      rebate: 'Dallas Water Utilities: $50 rebate for qualifying models | Oncor: select smart models qualify',
      tip: 'Run during off-peak hours (9pm-6am) with TXU or Reliant time-of-use plans for additional DFW savings',
    },
    washer: {
      emoji: '👕',
      title: 'ENERGY STAR Washers',
      dfwSpec: 'Integrated Water Factor (IWF) ≤ 3.2 | Modified Energy Factor (MEF) ≥ 2.0',
      why: 'Front-load ENERGY STAR washers use 25 gallons vs 40 for top-loaders — critical for DFW water conservation programs.',
      rebate: 'Dallas Water Utilities: $75 rebate | Fort Worth Water: $50 rebate | CEE Tier 2 qualifies for additional savings',
      tip: 'Pair with heat pump dryer (30% less energy) for full laundry ENERGY STAR stack in DFW',
    },
  };

  const sel = category ? specs[category] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>⭐</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>DFW ENERGY STAR Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>DFW-specific specs, rebates, and tips for every ENERGY STAR product category</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔍 Select a Product Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {Object.entries(specs).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              style={{ backgroundColor: category === key ? '#F5E642' : '#1e3a5f', color: category === key ? '#0A1628' : '#ffffff', border: 'none', borderRadius: '10px', padding: '14px 8px', cursor: 'pointer', textAlign: 'center', fontWeight: 600, fontSize: '13px', transition: 'all 0.2s' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{val.emoji}</div>
              {val.title.split(' ').slice(-1)}
            </button>
          ))}
        </div>

        {sel && (
          <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', border: '2px solid #F5E642', marginBottom: '24px' }}>
            <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px' }}>{sel.emoji}</div>
            <h3 style={{ color: '#F5E642', fontSize: '22px', textAlign: 'center', marginBottom: '20px' }}>{sel.title}</h3>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>🎯 DFW ENERGY STAR Specification</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{sel.dfwSpec}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>💡 Why It Matters in DFW</div>
              <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{sel.why}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>💰 Available DFW Rebates</div>
              <div style={{ color: '#22c55e', lineHeight: '1.6' }}>{sel.rebate}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>🔧 DFW Pro Tip</div>
              <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{sel.tip}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2540', borderRadius: '10px', padding: '18px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>Find all ENERGY STAR certified products and DFW rebates at energystar.gov/rebate-finder — enter your DFW zip code for local utility rebates</p>
        </div>
      </div>
    </div>
  );
}
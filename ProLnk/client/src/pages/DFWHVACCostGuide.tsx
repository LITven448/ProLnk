import { useState } from 'react';

const SYSTEM_PRICES: Record<string, Record<string, [number, number]>> = {
  '1.5': { basic: [3200, 4200], mid: [4200, 5800], premium: [5800, 8000] },
  '2': { basic: [3800, 5200], mid: [5200, 7000], premium: [7000, 10000] },
  '2.5': { basic: [4200, 5800], mid: [5800, 7800], premium: [7800, 11000] },
  '3': { basic: [4800, 6500], mid: [6500, 8800], premium: [8800, 12500] },
  '3.5': { basic: [5400, 7200], mid: [7200, 9800], premium: [9800, 13500] },
  '4': { basic: [6000, 8000], mid: [8000, 10800], premium: [10800, 14500] },
  '5': { basic: [7200, 9500], mid: [9500, 12000], premium: [12000, 16500] },
};

const BRANDS = [
  { name: 'Trane', tier: 'Top Tier', note: 'Best reliability, highest cost' },
  { name: 'Carrier', tier: 'Top Tier', note: 'Industry standard, wide service network' },
  { name: 'Lennox', tier: 'Premium', note: 'Highest efficiency ratings, premium price' },
  { name: 'Daikin', tier: 'Premium', note: 'Excellent inverter tech, growing dealer network' },
  { name: 'Goodman', tier: 'Value', note: 'Reliable, affordable, 10-year warranty standard' },
  { name: 'Rheem', tier: 'Value', note: 'Good value, widespread parts availability' },
];

const TIER_COLORS: Record<string, string> = {
  'Top Tier': '#1B2B4B',
  'Premium': '#4A5568',
  'Value': '#718096',
};

export default function DFWHVACCostGuide() {
  const [size, setSize] = useState('2');
  const [type, setType] = useState('basic');

  const range = SYSTEM_PRICES[size][type];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1B2B4B' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 14, color: '#718096′ }}>ProLnk Cost Guide · Dallas-Fort Worth · Updated May 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px' }}>
          DFW HVAC Cost Guide 2026 —<br />What You Should Actually Pay
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4A5568', margin: '0 0 40px', maxWidth: 680 }}>
          DFW HVAC contractors are among the most expensive in the US due to summer demand peaks. Knowing the right price protects you from overcharging and helps you recognize legitimate quotes.
        </p>

        {/* Calculator */}
        <div style={{ background: '#fff', border: '2px solid #E8D87A', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>New System Price Estimator</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#4A5568′ }}>SYSTEM SIZE (TON)</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #CBD5E0', fontSize: 15, background: '#fff', color: '#1B2B4B', cursor: 'pointer' }}>
                {Object.keys(SYSTEM_PRICES).map(s => <option key={s} value={s}>{s} Ton</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#4A5568′ }}>SYSTEM TIER</label>
              <select value={type} onChange={e => setType(e.target.value)}
                style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #CBD5E0', fontSize: 15, background: '#fff', color: '#1B2B4B', cursor: 'pointer' }}>
                <option value="basic">Basic (Goodman/Rheem)</option>
                <option value="mid">Mid (Carrier/Daikin)</option>
                <option value="premium">Premium (Trane/Lennox)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#1B2B4B', borderRadius: 10, padding: '20px 28px', display: 'inline-block' }}>
            <div style={{ fontSize: 13, color: '#A0AEC0', marginBottom: 4 }}>Estimated installed cost in DFW</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#E8D87A' }}>
              ${range[0].toLocaleString()} – ${range[1].toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>Includes equipment + labor + permits</div>
          </div>
        </div>

        {/* Pricing Table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>DFW HVAC Service Pricing</h2>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: 40 }}>
          {[
            ['Tune-up / seasonal service', '$89 – $150'],
            ['Refrigerant recharge', '$200 – $500'],
            ['Capacitor replacement', '$150 – $350'],
            ['Evaporator / condenser coil cleaning', '$100 – $400'],
            ['New system — 2-ton basic', '$3,800 – $5,200'],
            ['New system — 5-ton premium', '$8,000 – $14,000'],
            ['Ductwork repair (per section)', '$300 – $1,500'],
            ['Full duct replacement', '$2,500 – $6,000'],
          ].map(([service, price], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: i % 2 === 0 ? '#fff' : '#F7F9FC', borderBottom: i < 7 ? '1px solid #E2E8F0′ : ’none' }}>
              <span style={{ fontSize: 15, color: '#2D3748′ }}>{service}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1B2B4B', whiteSpace: 'nowrap' }}>{price}</span>
            </div>
          ))}
        </div>

        {/* Surge Warning */}
        <div style={{ background: '#FFF3CD', border: '1px solid #E8D87A', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>DFW Summer Surge Pricing</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#4A5568′ }}>
            June–August emergency rates run <strong>25–40% above normal</strong>. Best time to buy a new system: <strong>March–April or October–November</strong> when demand is low and contractors negotiate. Emergency weekend calls add $150–$300 on top of listed prices.
          </p>
        </div>

        {/* Brand Rankings */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>Brands Ranked by Reliability</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {BRANDS.map((b, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ background: TIER_COLORS[b.tier], color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{b.tier}</span>
              <span style={{ fontWeight: 700, fontSize: 16, minWidth: 80 }}>{b.name}</span>
              <span style={{ fontSize: 14, color: '#718096′ }}>{b.note}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#1B2B4B', borderRadius: 14, padding: '36px 40px', textAlign: 'center' }}>
          <h3 style={{ color: '#E8D87A', fontSize: 22, fontWeight: 800, margin: '0 0 12px' }}>Get 3 HVAC Estimates from ProLnk Partners</h3>
          <p style={{ color: '#A0AEC0', margin: '0 0 24px', fontSize: 15 }}>
            All ProLnk HVAC contractors are licensed, insured, and price-verified. No surprise charges.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#E8D87A', color: '#1B2B4B', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
            Get Free Estimates →
          </a>
        </div>

      </div>
    </div>
  );
}

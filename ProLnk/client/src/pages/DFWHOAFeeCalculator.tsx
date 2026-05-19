import { useState } from 'react';

const AMENITY_LEVELS = [
  { label: 'Basic (gate, lawn)', typical: 150 },
  { label: 'Standard (pool, gym)', typical: 275 },
  { label: 'Premium (golf, concierge)', typical: 550 },
  { label: 'Luxury (resort amenities)', typical: 900 },
];

export default function DFWHOAFeeCalculator() {
  const [monthlyHOA, setMonthlyHOA] = useState(275);
  const [amenityLevel, setAmenityLevel] = useState(1);
  const [homePrice, setHomePrice] = useState(450000);
  const [income, setIncome] = useState(120000);

  const annualHOA = monthlyHOA * 12;
  const fiveYear = monthlyHOA * 60;
  const tenYear = monthlyHOA * 120;
  const thirtyYear = monthlyHOA * 360;

  const monthlyIncome = income / 12;
  const maxDTI = 0.43;
  const mortgageRate = 0.07;
  const maxTotalMonthly = monthlyIncome * maxDTI;
  const hoaReducesBuyingPower = monthlyHOA / (mortgageRate / 12) * (1 - Math.pow(1 + mortgageRate / 12, -360));
  const effectivePurchasingPower = homePrice - hoaReducesBuyingPower;

  const amenities = [
    '🚪 Gated entry & security',
    '🌿 Common area landscaping',
    '🏊 Pool & recreation center',
    '🏋️ Fitness center',
    '🎾 Tennis / pickleball courts',
    '🛤️ Walking trails & parks',
    '🎉 Clubhouse & event spaces',
    '🏌️ Golf course access',
  ].slice(0, amenityLevel * 2 + 2);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>🏘️ DFW HOA Fee Impact Calculator</h1>
          <p style={{ color: '#555', marginTop: 8 }}>See the true long-term cost and buying power impact of HOA fees</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>Monthly HOA Fee: {fmt(monthlyHOA)}</span>
            <input type="range" min={50} max={1200} step={25} value={monthlyHOA}
              onChange={e => setMonthlyHOA(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#2563eb' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888′ }}>
              <span>$50</span><span>$1,200</span>
            </div>
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>Amenities Level</span>
            <select value={amenityLevel} onChange={e => { setAmenityLevel(Number(e.target.value)); setMonthlyHOA(AMENITY_LEVELS[Number(e.target.value)].typical); }}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}>
              {AMENITY_LEVELS.map((a, i) => <option key={i} value={i}>{a.label} — ~{fmt(a.typical)}/mo</option>)}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>Home Price: {fmt(homePrice)}</span>
            <input type="range" min={200000} max={1500000} step={10000} value={homePrice}
              onChange={e => setHomePrice(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#7c3aed' }} />
          </label>

          <label style={{ display: 'block' }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>Annual Income: {fmt(income)}</span>
            <input type="range" min={50000} max={500000} step={5000} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#059669′ }} />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[['Annual Cost', fmt(annualHOA), '#dc2626'],
            ['5-Year Total', fmt(fiveYear), '#d97706'],
            ['10-Year Total', fmt(tenYear), '#7c3aed'],
            ['30-Year Total', fmt(thirtyYear), '#1d4ed8']].map(([label, value, color]) => (
            <div key={label as string} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: color as string }}>{value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>💰 Buying Power Impact</h2>
          <p style={{ color: '#555', fontSize: 14 }}>At {fmt(monthlyHOA)}/mo HOA, your effective purchasing power drops by <strong style={{ color: '#dc2626′ }}>{fmt(hoaReducesBuyingPower)}</strong></p>
          <p style={{ color: '#555', fontSize: 14 }}>A {fmt(homePrice)} home with this HOA is equivalent in cost to a <strong style={{ color: '#7c3aed' }}>{fmt(effectivePurchasingPower)}</strong> home without one.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>✅ What Your HOA Covers</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {amenities.map(a => <span key={a} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>{a}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

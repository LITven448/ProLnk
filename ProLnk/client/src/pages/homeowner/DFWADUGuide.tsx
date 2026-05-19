import { useState } from 'react';

const aduTypes = [
  { label: 'Garage Conversion', minCost: 25000, maxCost: 60000 },
  { label: 'Detached Backyard Studio', minCost: 60000, maxCost: 120000 },
  { label: 'Attached Addition', minCost: 80000, maxCost: 180000 },
  { label: 'Basement Apartment', minCost: 40000, maxCost: 100000 },
];

const sizes = [
  { label: '300 sq ft', multiplier: 0.6 },
  { label: '450 sq ft', multiplier: 0.8 },
  { label: '600 sq ft', multiplier: 1.0 },
  { label: '750 sq ft', multiplier: 1.2 },
];

export default function DFWADUGuide() {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [monthlyRent, setMonthlyRent] = useState(900);

  const type = aduTypes[selectedType];
  const size = sizes[selectedSize];
  const estMinCost = Math.round(type.minCost * size.multiplier);
  const estMaxCost = Math.round(type.maxCost * size.multiplier);
  const midCost = (estMinCost + estMaxCost) / 2;
  const annualRent = monthlyRent * 12;
  const paybackYears = (midCost / annualRent).toFixed(1);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#7c8db5', marginBottom: 8 }}>🏠 DFW Homeowner Resources</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', margin: '0 0 12px' }}>
            DFW ADU Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Accessory Dwelling Units in Dallas-Fort Worth — rules, costs, and how to get started
          </p>
        </div>

        {/* What is an ADU */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 12 }}>🏡 What Is an ADU?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Accessory Dwelling Units are secondary housing units on the same property as a primary residence.
            Types include <strong style={{ color: '#e2e8f0′ }}>garage apartments</strong>, <strong style={{ color: '#e2e8f0' }}>backyard cottages</strong>,
            <strong style={{ color: '#e2e8f0′ }}> basement apartments</strong>, and <strong style={{ color: '#e2e8f0' }}>attached in-law suites</strong>.
            They let homeowners generate rental income without buying a second property.
          </p>
        </div>

        {/* City Rules */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 16 }}>📋 DFW City-by-City ADU Rules</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { city: 'Dallas', emoji: '🟢', status: 'Allowed', detail: 'Allows ADUs in most residential zones since 2023 ordinance change. Max 600–800 sq ft depending on zone.' },
              { city: 'Fort Worth', emoji: '🟡', status: 'Conditional', detail: 'Allows ADUs with conditional use permit in most zones. Owner must live on property.' },
              { city: 'Frisco', emoji: '🔴', status: 'Restrictive', detail: 'Limited to certain zones, requires HOA approval. More restrictive than Dallas/Fort Worth.' },
              { city: 'Plano', emoji: '🟡', status: 'Application Required', detail: 'Allows in some zones — application and approval process required.' },
              { city: 'McKinney', emoji: '⚪', status: 'Check Status', detail: 'Considering ADU ordinance. Verify current status before planning.' },
            ].map(row => (
              <div key={row.city} style={{ background: '#0f1117', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{row.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{row.city} <span style={{ fontSize: 12, color: '#7c8db5', fontWeight: 400 }}>— {row.status}</span></div>
                  <div style={{ fontSize: 14, color: '#94a3b8′ }}>{row.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Case */}
        <div style={{ background: '#1a2e1a', border: '1px solid #2d5a2d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#86efac', marginTop: 0, marginBottom: 12 }}>💰 The Financial Case</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Monthly Rental Income', value: '$500–$1,500′ },
              { label: 'Typical ADU Cost', value: '$60K–$150K' },
              { label: 'Avg Payback Period', value: '6–12 years' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#4ade80′ }}>{item.value}</div>
                <div style={{ fontSize: 13, color: '#86efac', marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADU Types by Cost */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 16 }}>🏗️ ADU Types Ranked by Cost</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { rank: 1, type: 'Garage Conversion', cost: '$25,000–$60,000', note: 'Lowest cost — uses existing structure' },
              { rank: 2, type: 'Detached Backyard Studio', cost: '$60,000–$120,000', note: 'Most common new build option' },
              { rank: 3, type: 'Attached Addition', cost: '$80,000–$180,000', note: 'Higher cost but connects to main home' },
              { rank: 4, type: 'Basement Apartment', cost: '$40,000–$100,000', note: 'Rare in DFW — few basements due to soil' },
            ].map(item => (
              <div key={item.rank} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0f1117', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{item.rank}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f1f5f9′ }}>{item.type}</div>
                  <div style={{ fontSize: 13, color: '#7c8db5′ }}>{item.note}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#60a5fa', flexShrink: 0 }}>{item.cost}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Steps */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 16 }}>📌 Key Steps to Build an ADU</h2>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
            {['Check Zoning', 'Get Design Approved', 'Pull Permits', 'Build', 'Final Inspection', 'Certificate of Occupancy'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '8px 12px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, margin: '0 auto 6px' }}>{i + 1}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', maxWidth: 80 }}>{step}</div>
                </div>
                {i < 5 && <div style={{ color: '#374151', fontSize: 18, margin: '0 4px', paddingBottom: 18 }}>›</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Cost Calculator */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 20 }}>🧮 ADU Cost & Payback Calculator</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#7c8db5', display: 'block', marginBottom: 8 }}>ADU Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {aduTypes.map((t, i) => (
                  <button key={t.label} onClick={() => setSelectedType(i)}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: selectedType === i ? '#3b82f6′ : '#2d3748', background: selectedType === i ? '#1e3a5f' : '#0f1117', color: selectedType === i ? '#60a5fa' : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#7c8db5', display: 'block', marginBottom: 8 }}>ADU Size</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {sizes.map((s, i) => (
                  <button key={s.label} onClick={() => setSelectedSize(i)}
                    style={{ padding: '10px 8px', borderRadius: 8, border: '2px solid', borderColor: selectedSize === i ? '#3b82f6′ : '#2d3748', background: selectedSize === i ? '#1e3a5f' : '#0f1117', color: selectedSize === i ? '#60a5fa' : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#7c8db5', display: 'block', marginBottom: 8 }}>Expected Monthly Rent: ${monthlyRent.toLocaleString()}</label>
              <input type="range" min={400} max={1800} step={50} value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3b82f6′ }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4b5563', marginTop: 4 }}>
                <span>$400/mo</span><span>$1,800/mo</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, padding: 20, background: '#0f1117', borderRadius: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa' }}>${estMinCost.toLocaleString()}–${estMaxCost.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#7c8db5', marginTop: 4 }}>Estimated Build Cost</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#4ade80′ }}>${annualRent.toLocaleString()}/yr</div>
              <div style={{ fontSize: 12, color: '#7c8db5', marginTop: 4 }}>Annual Rental Income</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fb923c' }}>{paybackYears} yrs</div>
              <div style={{ fontSize: 12, color: '#7c8db5', marginTop: 4 }}>Estimated Payback</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="/apply" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            🔨 Find ADU Contractors in DFW
          </a>
          <p style={{ color: '#4b5563', fontSize: 14, marginTop: 12 }}>Pre-vetted contractors. Free quotes. No obligation.</p>
        </div>

      </div>
    </div>
  );
}

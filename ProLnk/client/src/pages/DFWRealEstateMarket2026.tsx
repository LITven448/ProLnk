import { useState } from 'react';

interface CityRow {
  city: string;
  medianPrice: string;
  avgDOM: number;
  priceChangeYoY: string;
}

const cityData: CityRow[] = [
  { city: 'Frisco', medianPrice: '$578K', avgDOM: 18, priceChangeYoY: '+4.2%' },
  { city: 'McKinney', medianPrice: '$462K', avgDOM: 22, priceChangeYoY: '+3.8%' },
  { city: 'Plano', medianPrice: '$489K', avgDOM: 20, priceChangeYoY: '+2.9%' },
  { city: 'Allen', medianPrice: '$451K', avgDOM: 19, priceChangeYoY: '+3.1%' },
  { city: 'Arlington', medianPrice: '$342K', avgDOM: 31, priceChangeYoY: '+1.7%' },
  { city: 'Garland', medianPrice: '$298K', avgDOM: 34, priceChangeYoY: '+1.2%' },
  { city: 'Irving', medianPrice: '$371K', avgDOM: 27, priceChangeYoY: '+2.4%' },
  { city: 'Mesquite', medianPrice: '$274K', avgDOM: 38, priceChangeYoY: '+0.9%' },
];

export default function DFWRealEstateMarket2026() {
  const [activeTab, setActiveTab] = useState<'buyers' | 'sellers'>('buyers');

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#1a1a2e', color: '#F5C518', fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            DFW Market Report 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', color: '#1a1a2e' }}>
            DFW Real Estate Market 2026 — What Home Sellers and Buyers Need to Know
          </h1>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 700 }}>
            The Dallas-Fort Worth market remains one of the most active in the country. Here is what the numbers say and what they mean for you.
          </p>
        </div>

        {/* Market overview cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Median Home Price', value: '$378K', note: 'Up 3.1% YoY' },
            { label: 'Avg Days on Market', value: '28', note: 'Seller’s market pace' },
            { label: 'Sale-to-List Ratio', value: '97.8%', note: 'Homes near asking price' },
            { label: 'Inventory', value: '2.1 mo', note: 'Seller’s market territory' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '20px 16px' }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#F5C518', fontWeight: 600 }}>{card.note}</div>
            </div>
          ))}
        </div>

        {/* City snapshot table */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#1a1a2e' }}>City-by-City Snapshot</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <thead>
                <tr style={{ background: '#1a1a2e', color: '#fff' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>City</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600 }}>Median Price</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600 }}>Avg DOM</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600 }}>Price Change YoY</th>
                </tr>
              </thead>
              <tbody>
                {cityData.map((row, i) => (
                  <tr key={row.city} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafaf9' }}>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#1a1a2e' }}>{row.city}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', color: '#333' }}>{row.medianPrice}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', color: '#333' }}>{row.avgDOM} days</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>{row.priceChangeYoY}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buyer / Seller tabs */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {(['buyers', 'sellers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 15,
                  background: activeTab === tab ? '#1a1a2e' : '#e5e5e5',
                  color: activeTab === tab ? '#F5C518' : '#555',
                  transition: 'all 0.15s',
                }}
              >
                {tab === 'buyers' ? '🏠 Buyer Tips' : '💰 Seller Tips'}
              </button>
            ))}
          </div>

          {activeTab === 'buyers' && (
            <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: '#1a1a2e' }}>Buyer Tips for 2026 DFW</h3>
              {[
                { emoji: '📋', title: 'Get pre-approved before looking', body: 'In DFW, listing agents routinely reject showings without a pre-approval letter. Get it done before you fall in love with a home.' },
                { emoji: '⚡', title: 'Move fast — avg 3–5 offers per desirable home', body: 'Hesitation costs you. Top homes in Frisco, McKinney, and Allen routinely close within 5–7 days of listing.' },
                { emoji: '🔒', title: 'Inspection contingency is non-negotiable', body: 'DFW clay soil creates foundation movement. Never waive your inspection contingency regardless of market pressure.' },
              ].map((tip) => (
                <div key={tip.title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{tip.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 4 }}>{tip.title}</div>
                    <div style={{ color: '#555', lineHeight: 1.6 }}>{tip.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sellers' && (
            <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: '#1a1a2e' }}>Seller Tips for 2026 DFW</h3>
              {[
                { emoji: '🔍', title: 'Pre-list inspection adds $14K to sale price', body: 'Sellers who complete repairs before listing receive 3.7% higher offers on average. Buyers pay a premium for certainty.' },
                { emoji: '📸', title: 'Professional photos matter more than ever', body: 'Over 92% of DFW buyers start their search online. Listings with professional photography receive 39% more showings.' },
                { emoji: '🎯', title: 'Price right the first time', body: 'Homes that reduce price after 30+ days on market sell for 4.2% less than initial list. Accurate pricing from day one outperforms aspirational pricing.' },
              ].map((tip) => (
                <div key={tip.title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{tip.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 4 }}>{tip.title}</div>
                    <div style={{ color: '#555', lineHeight: 1.6 }}>{tip.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TrustyPro CTA */}
        <div style={{ background: '#1a1a2e', borderRadius: 16, padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Before You Sell or Buy, Scan Your Home</h3>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
            TrustyPro helps sellers know exactly what an inspector will find — and helps buyers understand what they are actually purchasing. No surprises at closing.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C518', color: '#1a1a2e', fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Get Your Home Health Scan →
          </a>
        </div>
      </div>
    </div>
  );
}

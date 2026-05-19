import { useState } from 'react';

const cities = [
  { name: 'Frisco', area: 'North DFW', months: 1.8, dom: 17, lsr: 100.2, reductions: 10 },
  { name: 'Plano', area: 'North DFW', months: 1.9, dom: 18, lsr: 99.8, reductions: 11 },
  { name: 'Allen', area: 'North DFW', months: 1.7, dom: 16, lsr: 100.5, reductions: 9 },
  { name: 'McKinney', area: 'North DFW', months: 2.1, dom: 20, lsr: 99.5, reductions: 12 },
  { name: 'Garland', area: 'Inner Suburbs', months: 3.4, dom: 28, lsr: 98.2, reductions: 18 },
  { name: 'Mesquite', area: 'Inner Suburbs', months: 3.6, dom: 30, lsr: 97.9, reductions: 20 },
  { name: 'Irving', area: 'Inner Suburbs', months: 3.5, dom: 27, lsr: 98.0, reductions: 19 },
  { name: 'Grand Prairie', area: 'Inner Suburbs', months: 3.8, dom: 32, lsr: 97.5, reductions: 22 },
  { name: 'DeSoto', area: 'Outer Suburbs', months: 4.5, dom: 42, lsr: 96.5, reductions: 26 },
  { name: 'Duncanville', area: 'Outer Suburbs', months: 4.6, dom: 44, lsr: 96.2, reductions: 28 },
  { name: 'Lancaster', area: 'Outer Suburbs', months: 4.8, dom: 46, lsr: 95.8, reductions: 30 },
  { name: 'Cedar Hill', area: 'Outer Suburbs', months: 4.3, dom: 40, lsr: 96.8, reductions: 25 },
];

const homeTypes = ['Single Family', 'Townhome', 'Condo', 'Multi-Family'];

function getMarketType(months: number, dom: number, lsr: number, reductions: number) {
  let score = 0;
  if (months < 3) score += 2; else if (months <= 6) score += 1;
  if (dom < 20) score += 2; else if (dom <= 45) score += 1;
  if (lsr > 99) score += 2; else if (lsr >= 95) score += 1;
  if (reductions < 15) score += 2; else if (reductions <= 30) score += 1;
  if (score >= 6) return 'seller';
  if (score >= 3) return 'balanced';
  return 'buyer';
}

export default function DFWBuyerVsSellerMarketGuide() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [role, setRole] = useState<'buying' | 'selling' | ''>('');

  const city = cities.find(c => c.name === selectedCity);
  const marketType = city ? getMarketType(city.months, city.dom, city.lsr, city.reductions) : null;

  const sellerStrategy = {
    buying: "Pre-approve now and move fast. Offer at or above list price, minimize contingencies, be ready to waive inspection or shorten timelines. Letters to sellers can help. Losing 2-3 bids before winning is normal here.",
    selling: "List at full market value — you don't need to leave money on the table. Accept the strongest offer within 48-72 hours. Multiple offers are common. Don't over-negotiate; the market is doing the work for you.",
  };
  const balancedStrategy = {
    buying: "You have some leverage but don't push too hard. Inspect and negotiate minor repairs. Standard contingencies are acceptable. Expect to move within a week of finding the right home.",
    selling: "Price competitively based on recent comps. Expect 15-30 days on market. Offer typical concessions if needed — closing costs, minor repairs. The buyer has options, so presentation matters.",
  };
  const buyerStrategy = {
    buying: "Take your time and negotiate hard. Inspection contingencies are expected. Sellers may offer concessions — closing cost credits, rate buy-downs, repairs. Submit offers 3-5% below list as a starting point.",
    selling: "Price realistically — overpricing leads to sits, which leads to price cuts. Consider pre-listing repairs to compete. Offering buyer incentives (closing costs, rate buy-down) can significantly accelerate your sale.",
  };

  const getStrategy = () => {
    if (!marketType || !role) return null;
    if (marketType === 'seller') return sellerStrategy[role];
    if (marketType === 'balanced') return balancedStrategy[role];
    return buyerStrategy[role];
  };

  const marketLabel = marketType === 'seller' ? "🔥 Seller's Market" : marketType === 'balanced' ? "⚖️ Balanced Market" : "🏷️ Buyer's Market";
  const marketColor = marketType === 'seller' ? '#f97316′ : marketType === ’balanced' ? '#eab308′ : '#22c55e';

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Market Intelligence</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.2 }}>
          DFW Buyer's vs. Seller’s Market — How to Read the Market Right Now
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          Reading the DFW market correctly determines your entire strategy — whether you're buying or selling. Use this guide to understand what the numbers mean and exactly what to do about them.
        </p>

        {/* How to Read the Market */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>📊 How to Read the Market</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                label: 'Months of Inventory',
                desc: 'How long it would take to sell all homes if no new listings appeared.',
                ranges: [
                  { range: '< 3 months', label: "Strong Seller's Market", color: '#f97316′ },
                  { range: '3–6 months', label: 'Balanced Market', color: '#eab308′ },
                  { range: '> 6 months', label: "Buyer's Market", color: '#22c55e' },
                ],
              },
              {
                label: 'Days on Market (DOM)',
                desc: 'Average time from listing to contract.',
                ranges: [
                  { range: '< 20 days', label: "Seller's Market", color: '#f97316′ },
                  { range: '20–45 days', label: 'Balanced', color: '#eab308′ },
                  { range: '> 45 days', label: "Buyer's Market", color: '#22c55e' },
                ],
              },
              {
                label: 'List-to-Sale Price Ratio',
                desc: 'What percent of list price homes actually sell for.',
                ranges: [
                  { range: '> 99%', label: "Seller's Market", color: '#f97316′ },
                  { range: '95–99%', label: 'Balanced', color: '#eab308′ },
                  { range: '< 95%', label: "Buyer's Market", color: '#22c55e' },
                ],
              },
              {
                label: 'Price Reductions',
                desc: 'Percentage of active listings that have cut their price.',
                ranges: [
                  { range: '< 15% of listings', label: "Seller's Market", color: '#f97316′ },
                  { range: '15–30%', label: 'Balanced', color: '#eab308′ },
                  { range: '> 30%', label: "Buyer's Market", color: '#22c55e' },
                ],
              },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#f8fafc', marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>{item.desc}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.ranges.map(r => (
                    <div key={r.range} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111', borderRadius: 6, padding: '6px 12px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                      <span style={{ fontSize: 12, color: '#cbd5e1′ }}><strong>{r.range}</strong> → {r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DFW 2026 Current Reading */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>📍 DFW 2026 Current Reading</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { area: 'North DFW (Frisco, Plano, Allen)', status: "Seller's Market", detail: '1.8 months inventory — homes flying off the market', color: '#f97316′ },
              { area: 'Inner Suburbs (Garland, Mesquite, Irving)', status: 'Balanced Market', detail: '3.5 months inventory — give and take on both sides', color: '#eab308′ },
              { area: 'Outer Suburbs (DeSoto, Duncanville, Lancaster)', status: "Moving Toward Buyer's", detail: '4.5 months inventory — buyers gaining leverage', color: '#22c55e' },
            ].map(item => (
              <div key={item.area} style={{ background: '#1a1a1a', border: `1px solid ${item.color}33`, borderRadius: 12, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4 }}>{item.area}</div>
                  <div style={{ color: item.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.status}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategy by Market Type */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🧭 How to Use This Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>🏡 If You're BUYING</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#f97316', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>In a Seller's Market:</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Pre-approve now, move fast, offer at or above list, minimize contingencies. Speed wins.</p>
              </div>
              <div>
                <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>In a Buyer's Market:</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Negotiate hard, take your time, inspect thoroughly, ask for concessions.</p>
              </div>
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>💰 If You're SELLING</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#f97316', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>In a Seller's Market:</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>List at full price, accept the strongest offer, don't over-negotiate — market works for you.</p>
              </div>
              <div>
                <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>In a Buyer's Market:</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Price competitively, offer concessions, make the home immaculate for showings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Analyzer */}
        <section style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>🔍 Your Market Analyzer</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>Select your city, home type, and role to get your current market conditions and exact strategy.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your City</label>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, color: '#f1f5f9', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c.name} value={c.name}>{c.name} ({c.area})</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Home Type</label>
              <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, color: '#f1f5f9', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>I Am...</label>
              <select value={role} onChange={e => setRole(e.target.value as 'buying' | 'selling' | '')} style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, color: '#f1f5f9', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select role...</option>
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
              </select>
            </div>
          </div>

          {city && marketType && (
            <div style={{ background: '#0f0f0f', borderRadius: 12, padding: 24, border: `1px solid ${marketColor}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: marketColor }}>{marketLabel}</div>
                <div style={{ color: '#64748b', fontSize: 14 }}>in {city.name} for {selectedType || 'all home types'}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'Inventory', value: `${city.months} mo` },
                  { label: 'Avg DOM', value: `${city.dom} days` },
                  { label: 'List/Sale', value: `${city.lsr}%` },
                  { label: 'Price Cuts', value: `${city.reductions}%` },
                ].map(m => (
                  <div key={m.label} style={{ background: '#161616', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                    <div style={{ color: marketColor, fontWeight: 700, fontSize: 18 }}>{m.value}</div>
                    <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              {role && (
                <div style={{ background: '#1a1a1a', borderRadius: 10, padding: 18, border: `1px solid ${marketColor}33` }}>
                  <div style={{ color: marketColor, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>YOUR STRATEGY ({role.toUpperCase()})</div>
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{getStrategy()}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

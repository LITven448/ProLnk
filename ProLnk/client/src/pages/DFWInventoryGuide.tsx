import { useState } from 'react';

type Role = 'buyer' | 'seller';

const areas = [
  { name: 'Frisco', months: 1.4, trend: 'tightening', buyers: 32, sellers: 8 },
  { name: 'Plano', months: 1.8, trend: 'stable', buyers: 28, sellers: 11 },
  { name: 'McKinney', months: 1.6, trend: 'tightening', buyers: 30, sellers: 9 },
  { name: 'Allen', months: 1.7, trend: 'stable', buyers: 27, sellers: 10 },
  { name: 'Prosper', months: 2.1, trend: 'loosening', buyers: 22, sellers: 14 },
  { name: 'Celina', months: 2.8, trend: 'loosening', buyers: 18, sellers: 18 },
  { name: 'Uptown Dallas', months: 2.4, trend: 'stable', buyers: 20, sellers: 15 },
  { name: 'Oak Cliff', months: 1.9, trend: 'stable', buyers: 25, sellers: 12 },
  { name: 'Fort Worth', months: 2.6, trend: 'loosening', buyers: 19, sellers: 16 },
  { name: 'Arlington', months: 3.1, trend: 'loosening', buyers: 15, sellers: 20 },
  { name: 'Denton', months: 2.9, trend: 'stable', buyers: 17, sellers: 17 },
  { name: 'Irving', months: 2.2, trend: 'stable', buyers: 21, sellers: 13 },
];

function getMarketLabel(months: number) {
  if (months < 2) return "🔥 Strong Seller's Market";
  if (months < 3.5) return "⚖️ Balanced / Slight Seller Lean";
  return "🏠 Buyer-Friendly Market";
}

function getBuyerStrategy(area: (typeof areas)[0]): string {
  if (area.months < 2) return `Inventory is extremely tight in ${area.name} — expect multiple offers. Get pre-approved, offer above ask if possible, and minimize contingencies. Speed wins here.`;
  if (area.months < 3.5) return `${area.name} has moderate supply. You have some negotiating room on price and concessions. Inspect thoroughly — this is not a waive-inspection market.`;
  return `${area.name} is more buyer-friendly. Negotiate seller concessions, closing cost credits, and price reductions. Take your time comparing options.`;
}

function getSellerStrategy(area: (typeof areas)[0]): string {
  if (area.months < 2) return `${area.name} is a seller's market. Price aggressively, expect full or above-ask offers within days. Minimal prep needed — demand is doing the work.`;
  if (area.months < 3.5) return `Balanced conditions in ${area.name}. Price at market, invest in staging and photos, and expect 2–4 weeks on market before an offer.`;
  return `${area.name} has higher inventory — price competitively and be prepared for concessions. Differentiate with upgrades, warranties, and flexibility on closing date.`;
}

export default function DFWInventoryGuide() {
  const [selectedArea, setSelectedArea] = useState('');
  const [role, setRole] = useState<Role>('buyer');
  const [result, setResult] = useState<null | (typeof areas)[0]>(null);

  function analyze() {
    const area = areas.find((a) => a.name === selectedArea);
    if (!area) return;
    setResult(area);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Housing Inventory Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Months of supply by submarket — and what low vs. high inventory means for your strategy.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['DFW Avg Supply', '2.3 months'], ['Balanced Market', '5–6 months'], ['Trend', 'Tightening NTX']].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📦 UNDERSTANDING INVENTORY LEVELS</div>
          {[
            '⚡ Under 2 months: Severe seller\’s market — homes sell in days, often above ask with multiple offers',
            '⚖️ 2–4 months: Balanced to slight seller lean — normal negotiation, reasonable timelines',
            '🏠 4–6 months: Balanced — buyer and seller have equal leverage',
            '🌊 6+ months: Buyer\’s market — price reductions, concessions, and longer days on market are common',
            '🌸 Seasonal pattern: DFW inventory peaks April–June, tightens September–November',
          ].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🧭 INVENTORY STRATEGY TOOL</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW AREA</label>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select area...</option>
                {areas.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>I AM A</label>
              <select value={role} onChange={(e) => setRole(e.target.value as Role)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value='buyer'>Buyer</option>
                <option value='seller'>Seller</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get My Strategy</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{result.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{result.months} months of supply · {getMarketLabel(result.months)}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{result.buyers} days</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>Avg Days on Market</div>
                </div>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, textTransform: 'capitalize' }}>{result.trend}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>Inventory Trend</div>
                </div>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7, borderTop: '1px solid #1e3a5f', paddingTop: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Your Strategy: </span>
                {role === 'buyer' ? getBuyerStrategy(result) : getSellerStrategy(result)}
              </div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Inventory data from DFW MLS as of Q1 2026. Conditions change rapidly — verify with your agent.</div>
      </div>
    </div>
  );
}

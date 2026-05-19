import { useState } from 'react';

type FoodResult = {
  allowed: boolean;
  verdict: string;
  color: string;
  labelReqs: string[];
  howToSell: string[];
  incomePotential: string;
  caveat?: string;
};

const foodRules: Record<string, FoodResult> = {
  'Baked Goods (bread, cookies, cakes)': {
    allowed: true, verdict: 'Allowed Under Texas Cottage Food Law', color: '#22C55E',
    labelReqs: ['Product name', 'Your full name and home address', '"This food is made in a home kitchen and is not inspected by the Department of State Health Services or a local health department."', 'Net weight or volume', 'Ingredients list', 'Common allergens (peanuts, dairy, gluten)'],
    howToSell: ['Direct to consumer at your home', 'Farmers markets and roadside stands', 'Online orders (pickup or delivery in person — no shipping)', 'Church or community events'],
    incomePotential: '$500–3,000/mo part-time; $2,000–8,000/mo full-time DFW market',
  },
  'Candy & Chocolate': {
    allowed: true, verdict: 'Allowed — Non-Hazardous Confections', color: '#22C55E',
    labelReqs: ['Same labeling as baked goods', 'Chocolate tempering area must be kept at proper temperature', 'Nut allergens especially important'],
    howToSell: ['Farmers markets (DFW has 40+ active markets)', 'Etsy / local pickup', 'Holiday pop-up markets', 'Direct orders via social media'],
    incomePotential: '$800–4,000/mo depending on specialty (artisan chocolate commands premium)',
  },
  'Pickles & Fermented Foods': {
    allowed: true, verdict: 'Allowed — Acidic/Shelf-Stable Only', color: '#F59E0B',
    caveat: 'Only high-acid pickles (pH 4.6 or below) qualify. Low-acid vegetables require pressure canning and are NOT allowed under cottage food.',
    labelReqs: ['Standard cottage food label', 'pH verification recommended', 'Batch date helpful for consumer trust'],
    howToSell: ['Farmers markets', 'Direct sales at home', 'Local gift shops (consignment)', 'DFW-area food festivals'],
    incomePotential: '$300–1,500/mo — niche but loyal customer base',
  },
  'Jams & Jellies': {
    allowed: true, verdict: 'Allowed — High-Sugar Shelf Stable', color: '#22C55E',
    labelReqs: ['Cottage food label required', 'Net weight in oz/grams', 'Fruit type and allergens'],
    howToSell: ['Farmers markets', 'Home sales', 'Gift baskets / bundling with baked goods', 'Holiday markets'],
    incomePotential: '$400–2,000/mo; bundling with baked goods boosts revenue',
  },
  'Meat, Poultry, or Seafood': {
    allowed: false, verdict: 'NOT Allowed Under Cottage Food Law', color: '#EF4444',
    caveat: 'Any product containing meat, poultry, or seafood requires a licensed commercial kitchen and USDA/DSHS inspection. This includes jerky, meat pies, and seafood dips.',
    labelReqs: [],
    howToSell: ['Must use licensed commercial kitchen — rent at $15–40/hr in DFW'],
    incomePotential: 'Possible through licensed kitchen — requires separate licensing',
  },
  'Dairy (cheese, yogurt, ice cream)': {
    allowed: false, verdict: 'NOT Allowed Under Cottage Food Law', color: '#EF4444',
    caveat: 'Dairy products are classified as potentially hazardous foods. Texas does not permit their sale from home kitchens regardless of refrigeration.',
    labelReqs: [],
    howToSell: ['Licensed kitchen + Texas Department of Agriculture dairy permit required'],
    incomePotential: 'Requires significant licensing investment — plan for $500–2,000 in permits',
  },
};

const products = Object.keys(foodRules);

export default function DFWHomeBasedFoodBusinessGuide() {
  const [product, setProduct] = useState(products[0]);
  const result = foodRules[product];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2 }}>TEXAS COTTAGE FOOD LAW GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Sell Food from Your DFW Home</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>Texas Cottage Food Law lets you sell certain foods from your home kitchen without a commercial license. Here's exactly what’s allowed.</p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📜 Texas Cottage Food Law — Key Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[['💰', 'No Sales Cap', 'Texas removed the $50K/year gross sales limit. No ceiling on how much you can earn.'],['🏪', 'Direct Sales Only', 'No selling through grocery stores, restaurants, or third-party retailers. Consumer must buy directly from you.'],['🏠', 'Home Kitchen OK', 'No commercial kitchen required for allowed products. Your home kitchen qualifies.'],['🚫', 'No Shipping Allowed', 'You cannot ship cottage food products via USPS, UPS, or FedEx. In-person delivery only.']].map(([ico, title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{ico as string}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title as string}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🛒 Where to Sell in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {[['🌿', 'Farmers Markets', '40+ active markets in DFW — Dallas Farmers Market, Plano Saturday Market, Grapevine Vintage Railroad Market'],['📱', 'Social Media Orders', 'Instagram and Facebook marketplace — post pickup times, take Venmo/Zelle/cash'],['🎪', 'Pop-Up Events', 'Holiday markets, church fundraisers, neighborhood events — high volume in Oct-Dec'],['🏘️', 'Neighborhood Direct', 'Nextdoor app is powerful in DFW — many cottage food sellers build full clientele this way']].map(([ico, title, desc]) => (
              <div key={title as string} style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{ico as string}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title as string}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🔍 Check Your Food Product</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 8, fontWeight: 600 }}>WHAT DO YOU WANT TO SELL?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {products.map(p => (
                <button key={p} onClick={() => setProduct(p)} style={{ padding: '10px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: product === p ? '#F5E642′ : '#0A1628', color: product === p ? '#0A1628' : '#94A3B8', fontWeight: 600, fontSize: 13 }}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ borderLeft: `4px solid ${result.color}`, background: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: result.color, marginBottom: 6 }}>{result.allowed ? '✅' : '❌'} {result.verdict}</div>
            {result.caveat && <div style={{ fontSize: 13, color: '#FCA5A5', marginTop: 8, lineHeight: 1.6 }}>⚠️ {result.caveat}</div>}
          </div>
          {result.allowed && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 10 }}>🏷️ LABEL REQUIREMENTS</div>
                {result.labelReqs.map(r => <div key={r} style={{ fontSize: 12, color: '#E8EDF5', marginBottom: 6, lineHeight: 1.5 }}>• {r}</div>)}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 10 }}>🛍️ HOW TO SELL</div>
                {result.howToSell.map(s => <div key={s} style={{ fontSize: 12, color: '#E8EDF5', marginBottom: 6 }}>• {s}</div>)}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 10 }}>💵 INCOME POTENTIAL</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, lineHeight: 1.6 }}>{result.incomePotential}</div>
              </div>
            </div>
          )}
          {!result.allowed && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 10 }}>🔧 WHAT YOU CAN DO INSTEAD</div>
              {result.howToSell.map(s => <div key={s} style={{ fontSize: 13, color: '#E8EDF5', marginBottom: 6 }}>• {s}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

const HOME_SIZES = ['1BR/Condo', '2BR House', '3BR House', '4BR House', '5BR+ House'];
const CONTENTS_VALUES = ['Under $10K', '$10K–$25K', '$25K–$50K', '$50K–$100K', '$100K+'];

const COMPANY_COMMISSION = 0.35;

const VALUE_ESTIMATES: Record<string, number> = {
  'Under $10K': 7500,
  '$10K–$25K': 17500,
  '$25K–$50K': 37500,
  '$50K–$100K': 75000,
  '$100K+': 120000,
};

const SELLS_WELL = [
  { category: 'Tools & Workshop Equipment', note: 'DFW buyers love power tools, vintage hand tools, workbenches' },
  { category: 'Mid-Century Modern Furniture', note: 'High demand in Oak Cliff, Lakewood, Inwood areas' },
  { category: 'Collectibles & Glassware', note: 'Depression glass, Pyrex, vintage kitchenware — strong market' },
  { category: 'Art & Framed Prints', note: 'Original art sells; mass prints do not' },
  { category: 'Jewelry & Watches', note: 'Best performers — authenticated pieces fetch premium' },
  { category: 'Books & Records', note: 'Vintage vinyl, first editions, local history books move fast' },
  { category: 'Lawn & Garden Equipment', note: 'Riding mowers, tractors — strong demand in suburbs' },
];

export default function DFWEstateSaleGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [contentsValue, setContentsValue] = useState('');
  const [view, setView] = useState<'estimate' | 'compare'>('estimate');

  const rawValue = contentsValue ? VALUE_ESTIMATES[contentsValue] : null;
  const saleRevenue = rawValue ? Math.round(rawValue * 0.65) : null;
  const companyNet = saleRevenue ? Math.round(saleRevenue * (1 - COMPANY_COMMISSION)) : null;
  const diyNet = rawValue ? Math.round(rawValue * 0.4) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>DFW Home Services</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>DFW Estate Sale Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32, fontSize: 16 }}>Know when to hire a company, what sells, and what your estate sale could net in the DFW market.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '🏠', label: 'Company Commission', value: '30–40%', note: 'Of gross sale proceeds' },
            { emoji: '📅', label: 'Timeline to Organize', value: '3–4 Weeks', note: 'From first visit to sale day' },
            { emoji: '💰', label: 'Typical Gross Sale', value: '60–80%', note: 'Of estimated contents value' },
            { emoji: '📦', label: 'Leftovers', value: 'Buyout or Donation', note: 'Most companies offer both' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#131F35', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 20, color: '#F5E642', fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 13, color: '#9BA3B8' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1E2D45' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {(['estimate', 'compare'] as const).map(tab => (
              <button key={tab} onClick={() => setView(tab)} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, backgroundColor: view === tab ? '#F5E642' : '#1E2D45', color: view === tab ? '#0A1628' : '#9BA3B8' }}>
                {tab === 'estimate' ? '💰 Net Proceeds Estimator' : '⚖️ Company vs. DIY'}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                <option value="">Select size</option>
                {HOME_SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Estimated Contents Value</label>
              <select value={contentsValue} onChange={e => setContentsValue(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                <option value="">Select value range</option>
                {CONTENTS_VALUES.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          {view === 'estimate' && saleRevenue && companyNet && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #2A3A55' }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Gross Sale Revenue</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>${saleRevenue.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#9BA3B8', marginTop: 4 }}>~65% of contents value</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642' }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Your Net (After Commission)</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>${companyNet.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#9BA3B8', marginTop: 4 }}>After 35% company fee</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #2A3A55' }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Company Earns</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>${(saleRevenue - companyNet).toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#9BA3B8', marginTop: 4 }}>For organizing + running sale</div>
              </div>
            </div>
          )}

          {view === 'compare' && rawValue && companyNet && diyNet && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏢 Hire a Company</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>${companyNet.toLocaleString()}</div>
                {['Professional pricing + marketing', 'Handles all setup and cleanup', 'Draws serious buyers', 'No effort from you', '3–4 week timeline'].map(p => (
                  <div key={p} style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 6 }}>✓ {p}</div>
                ))}
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #2A3A55' }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 16, marginBottom: 12 }}>🧑 DIY Garage Sale</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#9BA3B8', marginBottom: 12 }}>${diyNet.toLocaleString()}</div>
                {['No commission — keep everything', '20–30 hours of your labor', 'Requires Facebook/Nextdoor marketing', 'Lower prices — buyers expect deals', 'Must handle leftovers yourself'].map(p => (
                  <div key={p} style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 6 }}>• {p}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, border: '1px solid #1E2D45' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏆 What Sells Well in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {SELLS_WELL.map(item => (
              <div key={item.category} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{item.category}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

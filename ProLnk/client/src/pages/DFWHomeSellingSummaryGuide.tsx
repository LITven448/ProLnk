import { useState } from 'react';

const SELLER_CHECKLISTS: Record<string, string[]> = {
  fastSale: [
    'Order foundation letter from licensed engineer ($300-500) — buyers will ask',
    'Pre-listing HVAC service + new filter — inspectors flag dirty filters',
    'Deep clean + neutral paint: DFW buyers expect move-in ready condition',
    'Price at or slightly below comps — DFW buyers are well-informed via Zillow',
    'List Thursday; hold open house Saturday AM for maximum weekend traffic',
  ],
  maxPrice: [
    'Kitchen update ROI in DFW: quartz counters + hardware = strong return',
    'Add storage in garage — DFW buyers prize 3-car garage or max storage',
    'Stage open floor plan to emphasize square footage flow',
    'Landscaping matters: DFW curb appeal = clean beds, fresh mulch, green lawn',
    'Pre-inspection lets you address issues and list with confidence pricing',
  ],
  investorSale: [
    'Texas disclosure laws still apply — foundation cracks must be disclosed',
    'As-is pricing must reflect repair costs + investor margin (typically 20-30% below ARV)',
    'Cash buyer timeline: 14-21 days typical; no financing contingency',
    'Confirm buyer is end-buyer not wholesaler if you want clean close',
    'Option period still applies unless buyer waives it in writing',
  ],
};

const TOP_TIPS = [
  { icon: '🏗️', tip: 'Get a foundation letter ($300-500) — it removes the #1 buyer objection' },
  { icon: '🌡️', tip: 'Pre-list HVAC service — inspectors note every deferred maintenance item' },
  { icon: '🏎️', tip: '3-car garage or extended driveway: massive DFW selling advantage' },
  { icon: '🍳', tip: 'Open floor plan + updated kitchen = premium pricing in DFW suburbs' },
  { icon: '💰', tip: 'Property tax disclosure: buyers calculate total housing cost with taxes' },
  { icon: '⛈️', tip: 'Hail-resistant roof (Class 4 shingles): mention it — saves buyers on insurance' },
  { icon: '📋', tip: 'Option Period: expect 7-10 days; buyer can walk for any reason — normal' },
  { icon: '🔑', tip: 'Lock box vs. showing service: use ShowingTime for maximum showing volume' },
];

export default function DFWHomeSellingSummaryGuide() {
  const [situation, setSituation] = useState<string>('');

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🏷️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>DFW Home Selling Guide</h1>
          <p style={{ color: '#a0aec0', margin: 0 }}>The complete condensed guide to selling in Dallas-Fort Worth</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#0A1628' }}>🏆 DFW Seller Essentials</h2>
          {TOP_TIPS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < TOP_TIPS.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{item.tip}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#0A1628' }}>🎯 Your Personalized Selling Checklist</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 1rem' }}>Select your seller situation:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[['fastSale', '⚡ Fast Sale'], ['maxPrice', '💎 Max Price'], ['investorSale', '💼 Investor Sale']].map(([val, label]) => (
              <button key={val} onClick={() => setSituation(val)}
                style={{ padding: '0.5rem 1.1rem', borderRadius: 8, border: '2px solid', borderColor: situation === val ? '#F5E642' : '#e2e8f0', background: situation === val ? '#0A1628' : '#fff', color: situation === val ? '#F5E642' : '#333', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                {label}
              </button>
            ))}
          </div>
          {situation && (
            <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.25rem' }}>
              {(SELLER_CHECKLISTS[situation] || []).map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.9rem' }}>
                  <span>✅</span><span>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

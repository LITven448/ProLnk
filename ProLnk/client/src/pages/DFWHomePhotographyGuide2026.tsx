import { useState } from 'react';

const tiers = [
  {
    id: 'starter', label: 'Starter Photography', price: 'Under $350K', emoji: '📱',
    invest: '$200–$400', roi: '$3,000–$6,000 value add',
    tips: ['Hire a real estate photographer (not phone)', '8–12 photos minimum for MLS', 'Shoot midday for bright DFW light', 'Declutter before shoot (1 weekend)', 'Virtual tour optional at this price point'],
  },
  {
    id: 'mid', label: 'Mid-Range Photography', price: '$350K–$600K', emoji: '📷',
    invest: '$400–$700', roi: '$6,000–$12,000 value add',
    tips: ['Professional photographer + wide-angle lens', 'Golden hour exterior shot (7–9am DFW)', '15–20 MLS photos', 'Twilight shot of exterior (adds ~$2K)', '3D Matterport virtual tour ($150 add-on)'],
  },
  {
    id: 'luxury', label: 'Luxury Photography', price: '$600K–$1M+', emoji: '🚁',
    invest: '$700–$1,500', roi: '$10,000–$20,000 value add',
    tips: ['Architectural photographer (not just RE)', 'Drone footage for lot & neighborhood ($300 add)', '25–40 MLS photos', 'Lifestyle staging photos (pool, patio)', 'Video walkthrough for luxury portals', 'Shoot all 3 light conditions: morning, afternoon, dusk'],
  },
];

export default function DFWHomePhotographyGuide2026() {
  const [active, setActive] = useState('mid');
  const tier = tiers.find(t => t.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>📸</div>
          <h1 style={{ fontSize: 27, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Photography for Listings 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>High-quality listing photos add $5,000–$15,000 to DFW sale prices. Select your home's listing range.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '14px 18px', marginBottom: 24, textAlign: 'center' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Golden Hour: </span>
          <span style={{ color: '#cbd5e1', fontSize: 14 }}>Best exterior light is 7–9am and 7–8pm CT. Schedule shoots accordingly — DFW harsh afternoon sun washes out brick and stone exteriors.</span>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {tiers.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              style={{ padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: active === t.id ? '#F5E642' : '#1e3a5f', color: active === t.id ? '#0A1628' : '#94a3b8' }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 20px', flex: 1 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PHOTO INVESTMENT</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{tier.invest}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 20px', flex: 1 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ESTIMATED VALUE ADD</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{tier.roi}</div>
            </div>
          </div>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>Photography Checklist — {tier.price}</h3>
          {tier.tips.map((tip, i) => (
            <div key={i} style={{ fontSize: 14, color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid #0A1628' }}>✓ {tip}</div>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🏡 ProLnk Pre-Listing Prep</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Before photos, your home needs to shine. ProLnk connects you with DFW painters, landscapers, and stagers for pre-listing prep — all tracked in your Home Health Vault for buyer confidence.</p>
        </div>
      </div>
    </div>
  );
}

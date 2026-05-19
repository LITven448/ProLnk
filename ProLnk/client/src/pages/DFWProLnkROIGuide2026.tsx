import { useState } from 'react';

export default function DFWProLnkROIGuide2026() {
  const [userType, setUserType] = useState('homeowner');

  const roiData: Record<string, { title: string; headline: string; items: { label: string; value: string; detail: string }[]; cta: string }> = {
    homeowner: {
      title: '🏡 Homeowner ROI',
      headline: 'DFW homeowners save an average of $5,000+ per project with ProLnk',
      items: [
        { label: 'Avg Contractor Fraud Avoided', value: '$5,000', detail: 'FBI estimates DFW homeowners lose $5K+ annually to contractor fraud and overcharging' },
        { label: 'Savings via Competitive Bidding', value: '12-22%', detail: 'Multiple competing bids on ProLnk drop price by 12-22% on avg vs. single quote' },
        { label: 'Home Health Vault Resale Value', value: '+3-6%', detail: 'Documented home history increases buyer confidence and justifies higher offers' },
        { label: 'Time Saved Finding Contractors', value: '8+ hours', detail: 'Average DFW homeowner spends 8+ hours finding and vetting a contractor. ProLnk: 5 min.' },
      ],
      cta: 'Join ProLnk — Free for Homeowners',
    },
    pro: {
      title: '🔧 Pro / Contractor ROI',
      headline: 'Charter Membership pays back in as few as 2 jobs',
      items: [
        { label: 'Charter Membership Cost', value: '$149/mo', detail: 'Locked-in Charter rate — grandfathered for life while you maintain membership' },
        { label: 'Avg DFW Service Ticket', value: '$1,200-$4,500', detail: 'DFW HVAC, plumbing, and electrical jobs avg $1,200-$4,500 depending on trade' },
        { label: 'Breakeven', value: '1-2 Jobs', detail: 'At a $149/mo fee and 1 closed job, ROI is positive within the first month' },
        { label: 'Network Income Upside', value: '$500-$5K+/mo', detail: 'Charter members who build their network earn $500-$5K+/mo in passive overrides' },
      ],
      cta: 'Apply for Charter Membership',
    },
    scout: {
      title: '🗺️ Scout / Referral Partner ROI',
      headline: 'Scouts earn without doing the work',
      items: [
        { label: 'Per Homeowner Referred', value: '$25-$100', detail: 'Negotiated per-lead fee for qualified DFW homeowners you bring to the platform' },
        { label: 'Per Pro Recruited', value: '$17.88/mo', detail: '12% of each Charter pro subscription at $149/mo — recurring, forever' },
        { label: 'Network Override (4 levels)', value: '1-4%', detail: 'Earn on every job your recruited pros complete, cascading 4 levels deep' },
        { label: 'Origination Rights', value: '1.5%', detail: 'Permanent 1.5% share of platform fees for every home you add to the Vault' },
      ],
      cta: 'Become a ProLnk Scout',
    },
  };

  const data = roiData[userType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0′ }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>ProLnk Platform 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>📈 ProLnk ROI Guide — DFW</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 28 }}>See exactly how ProLnk delivers value to your situation — whether you are a homeowner, contractor, or referral partner.</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['homeowner', 'pro', 'scout'].map((t) => (
            <button key={t} onClick={() => setUserType(t)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: userType === t ? '#F5E642′ : '#111D33', color: userType === t ? '#0A1628' : '#8892A4' }}>
              {t === 'homeowner' ? '🏡 Homeowner' : t === 'pro' ? '🔧 Pro' : '🗺️ Scout'}
            </button>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>{data.title}</div>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 20 }}>{data.headline}</div>
          {data.items.map((item) => (
            <div key={item.label} style={{ padding: '14px 0', borderBottom: '1px solid #1E2D45′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: '#C8D0DC' }}>{item.label}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#F5E642′ }}>{item.value}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7A90′ }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <button style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
          {data.cta} →
        </button>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45', marginTop: 16 }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>DFW Context:</strong> The average DFW home service project is $3,200. ProLnk competitive bidding saves 12-22%, meaning $384-$704 in savings per project on average.</p>
        </div>
      </div>
    </div>
  );
}

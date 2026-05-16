import { useState } from 'react';

const communityImpacts = {
  homeowner: {
    label: 'Homeowners',
    icon: '🏠',
    headline: 'Protecting homeowners and their most valuable asset',
    impacts: [
      { icon: '🔒', title: 'Fraud prevention at scale', detail: 'ProLnk eliminates unlicensed contractor access. Every pro is verified before ever contacting a homeowner. DFW loses an estimated $180M per year to contractor fraud — ProLnk is built to eliminate that.' },
      { icon: '📋', title: 'Permanent service documentation', detail: 'The Home Health Vault stores every repair, every permit, and every contractor visit permanently. When you sell your home, you have documented proof of every upgrade and repair — adding real dollar value to the transaction.' },
      { icon: '⚡', title: 'Fast response when it matters', detail: 'Emergency HVAC failure in July. Burst pipe in January. ProLnk matches you with available, verified pros in your area — fast. Not a call center. Not a wait-and-see form.' },
      { icon: '💰', title: 'Fair pricing through competition', detail: 'Multiple verified quotes for the same job creates natural price competition without race-to-the-bottom quality. Homeowners get fair market pricing from licensed professionals.' },
    ],
  },
  local: {
    label: 'Local Economy',
    icon: '🏙️',
    headline: 'Keeping DFW money in DFW communities',
    impacts: [
      { icon: '🤝', title: 'Local pros over national chains', detail: 'ProLnk prioritizes independently owned service businesses over franchises and national chains. Every dollar spent goes to a local DFW business owner, their employees, and their families.' },
      { icon: '📈', title: 'Income growth for local trades', detail: 'ProLnk pros earn more per job, earn network income, and build sustainable businesses. The platform is designed to help local tradespeople build generational wealth — not just find gig work.' },
      { icon: '🔧', title: 'Skilled trades career development', detail: 'ProLnk publishes performance data and reviews for every pro, creating real reputation capital that translates to higher rates, more jobs, and better career outcomes.' },
      { icon: '🏘️', title: 'Neighborhood investment', detail: 'Properly maintained homes increase property values for entire neighborhoods. Home Health Vault data helps homeowners prioritize repairs that protect and grow neighborhood equity.' },
    ],
  },
  safety: {
    label: 'Public Safety',
    icon: '🚨',
    headline: 'Making DFW homes safer through verified expertise',
    impacts: [
      { icon: '⚡', title: 'Eliminating unlicensed electrical work', detail: 'Unlicensed electrical work is the leading cause of residential fires in Texas. Every ProLnk electrician holds a valid TDLR Master Electrician license — no exceptions.' },
      { icon: '💧', title: 'Certified plumbing prevents water damage', detail: 'Improper plumbing repairs cause mold, structural damage, and public health hazards. ProLnk requires TSBPE Master Plumber credentials for all plumbing work.' },
      { icon: '🏗️', title: 'Structural integrity standards', detail: 'Foundation and structural work by unqualified contractors has caused home collapses in North Texas. ProLnk requires engineering documentation for all structural work, stored in the Home Health Vault.' },
      { icon: '📞', title: 'Emergency response coordination', detail: 'ProLnk is building NOAA weather integration to pre-stage verified contractors before major weather events — so help is ready when DFW needs it most.' },
    ],
  },
};

type ImpactKey = keyof typeof communityImpacts;

export default function ProLnkCommunityImpactPage() {
  const [active, setActive] = useState<ImpactKey>('homeowner');
  const c = communityImpacts[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌟</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>ProLnk Community Impact</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>A better home services market is better for everyone in DFW — homeowners, local businesses, and entire communities.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {(Object.keys(communityImpacts) as ImpactKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642' : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {communityImpacts[k].icon} {communityImpacts[k].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 16, padding: 28, border: '1px solid #2d4a7a', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>{c.icon} {c.headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {c.impacts.map(imp => (
              <div key={imp.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{imp.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 5 }}>{imp.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{imp.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {[
            ['$180M', 'Annual contractor fraud loss in DFW we are eliminating'],
            ['2.3M', 'DFW homes that deserve verified service pros'],
            ['100%', 'Local independent businesses — no national chains'],
            ['Permanent', 'Home Health Vault data stays with your home forever'],
          ].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

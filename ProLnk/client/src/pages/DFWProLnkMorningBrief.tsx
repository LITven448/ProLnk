import { useState } from 'react';

const userTypes = ['Homeowner on Waitlist', 'Pro on Waitlist', 'DFW HVAC Contractor', 'Investor Following ProLnk'];

const briefs: Record<string, { title: string; status: string; items: { icon: string; headline: string; detail: string }[]; cta: string; ctaLabel: string }> = {
  'Homeowner on Waitlist': {
    title: 'Your May 16 Morning Brief',
    status: 'Waitlist closing soon — you are in the right place',
    items: [
      { icon: '✅', headline: 'You are on the ProLnk DFW waitlist', detail: 'Your spot is reserved. When ProLnk launches full matching in DFW, waitlist members get priority access to vetted HVAC, plumbing, electrical, and roofing pros.' },
      { icon: '📚', headline: '3,000+ DFW home service pages now live', detail: 'ProLnk has published over 3,000 pages of DFW-specific home service guides — HVAC sizing, insurance coverage, regulations, seasonal prep, and contractor questions. Use them now while you wait.' },
      { icon: '🏗️', headline: 'Full platform launching on Render upgrade', detail: 'The full ProLnk matching platform is build-complete. Infrastructure is being upgraded to handle launch-day demand. DFW homeowners will be first to access the pro matching network.' },
      { icon: '💰', headline: 'DFW HVAC season is peak right now', detail: 'May-June is when DFW HVAC systems fail most — they have been sitting idle since fall and get stress-tested by the first 90°F+ days. If your system is 10+ years old, this is the time to plan.' },
      { icon: '🔔', headline: 'What happens next', detail: 'You will receive an email when DFW matching goes live. First 500 homeowners get the Charter Member rate — zero platform fees for the first year of service requests.' },
    ],
    cta: '#',
    ctaLabel: 'Explore DFW HVAC Guides',
  },
  'Pro on Waitlist': {
    title: 'Your May 16 Pro Morning Brief',
    status: 'Waitlist closes at 500 — secure your territory now',
    items: [
      { icon: '🏆', headline: 'Charter Pro status still available — not for long', detail: 'ProLnk DFW waitlist closes at 500 approved pros. Charter Pros ($149/mo locked forever) get first access to homeowner leads in their territory. Current DFW slots: limited.' },
      { icon: '💸', headline: '5-income stream is ready for Charter Pros', detail: 'Once the platform launches: direct job commissions, 4-level network overrides, subscription overrides from pros you refer, homeowner lead origination fees, and permanent home vault origination rights.' },
      { icon: '📱', headline: 'Pro portal is build-complete', detail: 'Your dashboard, lead feed, match history, commission tracker, and earnings history are all built and tested. Waiting only on infrastructure deployment.' },
      { icon: '🗺️', headline: 'DFW territory map is first-come', detail: 'DFW territories are assigned by zip code cluster. Charter Pros who claim their primary service zip code get first-right-of-refusal on all homeowner requests in that territory.' },
      { icon: '🚀', headline: 'Launch timeline', detail: 'Platform goes live once Render infrastructure is scaled. Estimated: within days. You will receive a direct email with your login, territory confirmation, and first lead feed access.' },
    ],
    cta: '#',
    ctaLabel: 'Confirm Your Pro Waitlist Spot',
  },
  'DFW HVAC Contractor': {
    title: 'DFW HVAC Contractor Morning Brief — May 16',
    status: 'Peak DFW HVAC season is starting — position now',
    items: [
      { icon: '🌡️', headline: 'DFW entering peak demand window', detail: 'May 16 marks the beginning of DFW\’s high-demand HVAC window. First 90-95°F days expose systems that struggled all winter. System failures peak in the next 6-8 weeks — your busiest time.' },
      { icon: '📋', headline: 'SEER2 compliance reminder', detail: 'All DFW installations must be 15 SEER2 minimum. New R-454B systems are entering the market — ensure your techs have updated recovery equipment and EPA 608 compliance for the new refrigerant.' },
      { icon: '💼', headline: 'ProLnk DFW contractor waitlist is still open', detail: 'ProLnk is accepting DFW HVAC contractors for the launch cohort. Charter Pros get locked $149/mo pricing, first-territory access, and 5-stream income potential from the launch day.' },
      { icon: '📊', headline: '3,000+ pages of DFW HVAC content driving homeowner education', detail: 'ProLnk has published a comprehensive DFW HVAC resource library — homeowners arriving via ProLnk are pre-educated on SEER2, proper sizing, and fair pricing. Less time spent on basics, more time closing.' },
      { icon: '🔧', headline: 'What Charter Contractors get at launch', detail: 'Verified profile with license confirmation, territory-based lead routing, job posting with same-day homeowner response, and commission tracking dashboard. Zero per-lead fees for Charter Pros during Year 1.' },
    ],
    cta: '#',
    ctaLabel: 'Join as a Charter DFW Contractor',
  },
  'Investor Following ProLnk': {
    title: 'ProLnk Investor Morning Brief — May 16, 2026',
    status: 'Build complete — infrastructure scaling to launch',
    items: [
      { icon: '🏗️', headline: '3,000+ page content library complete', detail: 'ProLnk has built and deployed over 3,000 pages of DFW-specific home service content across HVAC, plumbing, electrical, and roofing verticals. SEO indexing is ongoing — organic traffic compound begins now.' },
      { icon: '⚙️', headline: 'Full platform build complete — deployment pending', detail: 'Both ProLnk and TrustyPro portals are build-complete (80+ pages each). The matching engine, commission calculator, and admin dashboards are tested and ready. Infrastructure upgrade is the final gate.' },
      { icon: '📈', headline: 'Waitlist metrics', detail: 'DFW homeowner and pro waitlists are collecting signups. Waitlist closes at 500 pros — artificial scarcity creates urgency and allows quality control of the launch cohort. Data shared with seed investors upon request.' },
      { icon: '💰', headline: 'Unit economics at scale', detail: 'At 500 DFW active pros ($149/mo each): $74,500 MRR from subscriptions alone before any match fees. Variable cost per transaction: minimal. Target path to profitability: 500 active pros.' },
      { icon: '🗓️', headline: 'Next milestones', detail: 'Render infrastructure upgrade → platform launch → seed round with traction data → geographic expansion to Houston and Austin → national rollout. DFW is the proof-of-concept market.' },
    ],
    cta: '#',
    ctaLabel: 'Request Investor Data Room Access',
  },
};

export default function DFWProLnkMorningBrief() {
  const [activeType, setActiveType] = useState(userTypes[0]);
  const data = briefs[activeType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk DFW Morning Brief</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>May 16, 2026 — Select your role for your personalized brief</p>
          <div style={{ display: 'inline-block', background: '#1e2d45', borderRadius: 8, padding: '6px 16px', marginTop: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📍 DFW Metroplex</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {userTypes.map(type => (
            <button key={type} onClick={() => setActiveType(type)}
              style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeType === type ? '#F5E642' : '#1e2d45', color: activeType === type ? '#0A1628' : '#94a3b8' }}>
              {type}
            </button>
          ))}
        </div>

        {data && (
          <div>
            <div style={{ background: '#1e2d45', borderRadius: 14, padding: '20px 24px', marginBottom: 20, border: '1px solid #F5E642' }}>
              <h2 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 22, fontWeight: 800 }}>{data.title}</h2>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>{data.status}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {data.items.map((item, i) => (
                <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', border: '1px solid #2a3f5f', display: 'flex', gap: 16 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>{item.headline}</h3>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.7 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 14, padding: '24px', textAlign: 'center' }}>
              <h3 style={{ color: '#0A1628', margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Ready to move forward?</h3>
              <p style={{ color: '#0A1628', margin: '0 0 16px', fontSize: 14 }}>Join the DFW waitlist before it closes at 500.</p>
              <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                {data.ctaLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

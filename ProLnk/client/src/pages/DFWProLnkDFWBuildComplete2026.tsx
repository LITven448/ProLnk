import { useState } from 'react';

const stakeholders = [
  {
    id: 'investor',
    label: '💼 Investor / VC',
    headline: '36-Hour Sprint: 5,500+ Pages Built and Staged',
    points: [
      'ProLnk now has 5,500+ DFW-specific pages covering every home service category',
      'Content covers plumbing, HVAC, electrical, roofing, foundation, painting, fencing, and 40+ more trades',
      'All pages are SEO-structured — DFW homeowners find ProLnk organically, no paid ads needed',
      'Pages staged in GitHub LITven448/ProLnk — ready to deploy when Render AI credits unlock infrastructure',
      'This is the data moat: 5,500 DFW pages indexed by Google = millions in free organic traffic',
      'Compare: Angie, HomeAdvisor have generic national content. ProLnk has DFW-specific hyperlocal depth',
      'Each page links homeowners to platform signup — content becomes a conversion machine at zero marginal cost'
    ]
  },
  {
    id: 'founder',
    label: '🚀 Co-Founder / Team',
    headline: 'Build Status: All Systems Green',
    points: [
      '5,500+ pages pushed: DFW homeowner guides, pro guides, trade-specific resources, neighborhood pages',
      '47 AI agents built and staged — operations, financial, marketing, customer success, intelligence, legal, engineering, field',
      'Database: 130+ tables in TiDB, schema complete, Drizzle ORM typed',
      'Infrastructure: Railway (production), Render (AI credit target), Cloudflare (DNS), GitHub (source)',
      'Next unlock: Render AI credits ($50K–$250K value) = deploy everything live',
      'Stripe credit ($25K) pending — unlocks payment processing + commission system',
      'Waitlist collecting: prolnk.io live, homeowner and pro signups flowing'
    ]
  },
  {
    id: 'pro',
    label: '🔧 DFW Home Service Pro',
    headline: 'Your Platform Is Ready — Be Charter or Be Late',
    points: [
      '5,500+ DFW pages means thousands of homeowners will find ProLnk through Google every month',
      'Every page points homeowners to get a quote from a vetted pro — that pro is you',
      'Charter members (500 max) are locked in at $149/mo permanently — this rate never increases',
      'Charter pros get first-call priority as leads come in from DFW organic search traffic',
      'The 5 income streams: direct commissions, network override, subscription override, lead fees, origination rights',
      'Waitlist closes at 500 Charters + 5,000 homes — we are building toward that now',
      'Join now at prolnk.io — before the 5,500 pages go live and demand explodes'
    ]
  },
  {
    id: 'homeowner',
    label: '🏠 DFW Homeowner',
    headline: 'The Most Complete DFW Home Resource Is Coming',
    points: [
      'ProLnk built 5,500+ guides specifically for DFW homeowners — free, detailed, and local',
      'Guides cover: when to call a pro, how to assess damage, how to file insurance claims, what questions to ask',
      'Every guide connects you to vetted DFW pros — not national call centers',
      'Home Health Vault: add your home now and start building your property health record',
      'Vault protects your home value, speeds insurance claims, and documents all repairs permanently',
      'It is free for homeowners — ProLnk earns from pros, not from you',
      'Join free at prolnk.io while the platform is in early access'
    ]
  },
  {
    id: 'media',
    label: '📰 Press / Media',
    headline: 'ProLnk: DFW-First Home Services Platform Completes Major Content Build',
    points: [
      'ProLnk completed a 36-hour intensive build deploying 5,500+ DFW homeowner and pro pages',
      'The platform serves both sides of the DFW home services market: homeowners seeking vetted pros and pros seeking qualified leads',
      'Home Health Vault is a first-of-its-kind permanent health record for residential properties',
      'Five-stream Network Income System creates unprecedented pro retention economics',
      'DFW is the launch market — 7M+ residents, $28B+ annual home services spend',
      'Platform is at prolnk.io — currently collecting waitlist ahead of full launch',
      'Founder: Andrew Frakes, CEO. Press contact: andrew@lit-ventures.com'
    ]
  }
];

export default function DFWProLnkDFWBuildComplete2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            ProLnk DFW 5,500 Pages Build Complete
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            2026 MILESTONE — DEFINITIVE DFW BUILD REPORT
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0′ }}>
            36 hours. 5,500+ pages. Every DFW home service category covered. The most comprehensive DFW homeowner resource in existence — staged and ready to deploy.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['5,500+ Pages','36 Hours','47 AI Agents','130+ DB Tables'].map(stat => (
              <div key={stat} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px 16px', flex: '1 1 120px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: '800', fontSize: '14px' }}>{stat}</div>
              </div>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '16px 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            View Build Report As →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stakeholders.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642′ : '#1e3a5f',
                  color: selected === s.id ? '#0A1628′ : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ color: '#F5E642', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{active.headline}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {active.points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5′ }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px' }}>
            The build is staged. Deployment unlocks with Render AI credits. Join the waitlist now.
          </p>
          <a href="https://prolnk.io" style={{
            background: '#F5E642', color: '#0A1628', padding: '14px 32px',
            borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-block'
          }}>
            Join Waitlist → prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}

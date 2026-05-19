import { useState } from 'react';

const roles = [
  {
    id: 'homeowner',
    label: '🏠 I am a DFW Homeowner',
    headline: 'ProLnk Is Free For You — Always',
    points: [
      'Join free at prolnk.io — no payment, no credit card, no catch',
      'Describe your home service need and get matched to vetted local pros',
      'Every pro in ProLnk is screened: license verified, reviews checked, background checked',
      'Your Home Health Vault stores everything about your home — history, repairs, permits, systems',
      'Vault data protects your home value and speeds up insurance claims for life',
      'DFW homeowners: most plumbers, electricians, HVAC pros, roofers, and foundation specialists available'
    ],
    cta: 'Join as a Homeowner Free',
    url: 'https://prolnk.io'
  },
  {
    id: 'pro',
    label: '🔧 I am a DFW Home Service Professional',
    headline: 'Charter Membership: $149/mo — 5 Income Streams',
    points: [
      'Stream 1: Get matched to qualified DFW homeowner leads in your trade and territory',
      'Stream 2: Earn 7% override on every job your recruited pros complete — 4 levels deep',
      'Stream 3: Earn 12% recurring on every monthly subscription your referred pros pay',
      'Stream 4: Negotiate per-lead fees for homeowners you bring to the platform',
      'Stream 5: 1.5% permanent origination rights on homes you add to the Vault',
      'Charter tier locks in at $149/mo permanently — rate never increases for founding members',
      'Waitlist closes at 500 Charter members + 5,000 homes — join now'
    ],
    cta: 'Apply for Charter Membership',
    url: 'https://prolnk.io'
  },
  {
    id: 'investor',
    label: '💼 I am an Investor or Partner',
    headline: 'The Most Defensible Home Services Platform Ever Built',
    points: [
      'ProLnk + TrustyPro: two-sided marketplace with 5-stream network income lock-in',
      'Home Health Vault: permanent data asset growing with every home added',
      'DFW is the pilot market — 7M+ residents, $28B+ annual home services spend',
      '47 AI agents built and running — 80% of platform operations automated',
      '130+ database tables, 5,500+ pages of DFW content, Railway + Render infrastructure',
      'Unit economics: 500 pros = break even, 85% net margin at scale',
      'Network income system: patent pending — switching cost makes churn economics extraordinary'
    ],
    cta: 'Contact ProLnk Founder',
    url: 'https://prolnk.io'
  },
  {
    id: 'realtor',
    label: '🏡 I am a DFW Realtor or Property Manager',
    headline: 'Vault Data Is a Listing Superpower',
    points: [
      'Homes in the ProLnk Vault sell faster — documented history = buyer confidence',
      'Offer Vault enrollment to seller clients as a free value-add before listing',
      'Property managers: Vault tracks all unit repairs, vendors, and warranties in one place',
      'Landlords: all ProLnk pros are vetted — no chasing down unlicensed contractors',
      'Become a ProLnk affiliate and earn homeowner origination income permanently',
      'DFW real estate community: first to join gets charter territory advantage'
    ],
    cta: 'Join as a DFW Affiliate',
    url: 'https://prolnk.io'
  }
];

export default function DFWProLnkDFWFinal2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = roles.find(r => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            ProLnk DFW Final Platform Guide
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            FINAL GUIDE 2026 — DEFINITIVE DFW RESOURCE
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0' }}>
            The most comprehensive home services platform in DFW history — for homeowners, pros, investors, and realtors.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Who Are You? →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{
                  background: selected === r.id ? '#F5E642' : '#1e3a5f',
                  color: selected === r.id ? '#0A1628' : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ color: '#F5E642', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{active.headline}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {active.points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642' }}>✓</span>
                  <span style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>{pt}</span>
                </div>
              ))}
            </div>
            <a href={active.url} style={{
              display: 'block', textAlign: 'center',
              background: '#F5E642', color: '#0A1628', padding: '14px',
              borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none'
            }}>
              {active.cta} → prolnk.io
            </a>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 8px' }}>Waitlist closes at 500 Charter pros + 5,000 homes</p>
          <p style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0' }}>prolnk.io — Join the DFW platform built to last</p>
        </div>
      </div>
    </div>
  );
}

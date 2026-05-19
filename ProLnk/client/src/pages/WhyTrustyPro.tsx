import { useState } from 'react';

const competitors = [
  {
    name: 'TrustyPro',
    logo: '🏠',
    highlight: true,
    features: {
      aiScan: true,
      verifiedPros: true,
      homeRecord: true,
      stormDispatch: true,
      community: true,
      leadSelling: false,
    },
    note: 'AI home intelligence platform — your home works for you',
  },
  {
    name: 'Angi',
    logo: '📋',
    highlight: false,
    features: {
      aiScan: false,
      verifiedPros: false,
      homeRecord: false,
      stormDispatch: false,
      community: false,
      leadSelling: true,
    },
    note: 'Sells your contact info to multiple contractors simultaneously',
  },
  {
    name: 'HomeAdvisor',
    logo: '🔨',
    highlight: false,
    features: {
      aiScan: false,
      verifiedPros: false,
      homeRecord: false,
      stormDispatch: false,
      community: false,
      leadSelling: true,
    },
    note: 'Same parent company as Angi. Lead resale model, not homeowner-first',
  },
  {
    name: 'Thumbtack',
    logo: '📌',
    highlight: false,
    features: {
      aiScan: false,
      verifiedPros: false,
      homeRecord: false,
      stormDispatch: false,
      community: false,
      leadSelling: true,
    },
    note: 'Contractors bid on your project — you filter through them',
  },
  {
    name: 'Yelp',
    logo: '⭐',
    highlight: false,
    features: {
      aiScan: false,
      verifiedPros: false,
      homeRecord: false,
      stormDispatch: false,
      community: false,
      leadSelling: false,
    },
    note: 'Review platform, not a home services platform. No verification.',
  },
  {
    name: 'Google Search',
    logo: '🔍',
    highlight: false,
    features: {
      aiScan: false,
      verifiedPros: false,
      homeRecord: false,
      stormDispatch: false,
      community: false,
      leadSelling: false,
    },
    note: 'Starting point only. No curation, no verification, no home context.',
  },
];

const featureLabels: Record<string, string> = {
  aiScan: 'AI Home Scan',
  verifiedPros: 'Verified Local Pros',
  homeRecord: 'Permanent Home Record',
  stormDispatch: 'Storm Dispatch Automation',
  community: 'Neighbor Community Pricing',
  leadSelling: 'Sells Your Data to Contractors',
};

const advantages = [
  {
    icon: '🤖',
    title: 'AI Scans Your Home for Issues',
    body: "Other platforms list contractors. TrustyPro's AI analyzes your specific home — foundation patterns, HVAC efficiency, roof age, electrical indicators — and alerts you to developing issues before they become expensive emergencies.",
  },
  {
    icon: '✅',
    title: 'Verified Pros with Origination Rights',
    body: "Every pro in TrustyPro's network is verified, licensed, and background-checked. Origination rights ensure the pro who first serves your home has a relationship stake in your property's care — aligning incentives with quality.",
  },
  {
    icon: '📁',
    title: 'Permanent Home Health Record',
    body: "Every inspection, repair, upgrade, and service call is logged to your home's permanent record. When you sell, this history transfers to the new owner — a real, documentable asset that increases your home's perceived value.",
  },
  {
    icon: '⛈️',
    title: 'Storm Dispatch Automation',
    body: "Other platforms react when you call. TrustyPro monitors NOAA weather data and automatically dispatches roof, water, and structural assessments when severe weather hits your specific zip code. You get ahead of the damage.",
  },
  {
    icon: '🏘️',
    title: 'Community Pricing Through the Vault',
    body: "Neighbors who both use TrustyPro can aggregate demand for shared services — HVAC tune-ups, tree trimming, exterior painting. Bulk pricing is negotiated on your behalf. The more homes in your area on the platform, the better your deals.",
  },
];

export default function WhyTrustyPro() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'advantages' | 'vault'>('comparison');

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#1a1a2e', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ background: '#0A1628', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Platform Overview</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: '0 0 20px', color: '#fff', lineHeight: 1.2 }}>Why TrustyPro — The AI-Powered Home Intelligence Platform</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: '0 0 12px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            "You would not pick a doctor from a phonebook. Why pick a contractor from a generic listing site?"
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 8, margin: '48px 0 40px', background: '#fff', border: '1px solid #e5e5e3', borderRadius: 12, padding: 6, width: 'fit-content' }}>
          {([['comparison', 'Platform Comparison'], ['advantages', 'TrustyPro Advantages'], ['vault', 'The Vault Difference']] as [string, string][]).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'comparison' | 'advantages' | 'vault')}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                background: activeTab === tab ? '#0A1628′ : ’transparent', color: activeTab === tab ? '#fff' : '#555',
              }}
            >{label}</button>
          ))}
        </div>

        {activeTab === 'comparison' && (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #e5e5e3', borderRadius: 16, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#0A1628′ }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', color: '#fff', fontSize: 14, fontWeight: 600 }}>Platform</th>
                    {Object.values(featureLabels).map(label => (
                      <th key={label} style={{ padding: '16px 12px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, minWidth: 90 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, i) => (
                    <tr key={i} style={{ background: comp.highlight ? 'rgba(245,200,66,0.06)' : i % 2 === 0 ? '#fff' : '#fafaf9', borderTop: '1px solid #e5e5e3′ }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 20 }}>{comp.logo}</span>
                          <div>
                            <div style={{ fontWeight: comp.highlight ? 800 : 600, color: comp.highlight ? '#0A1628′ : '#333', fontSize: 15 }}>{comp.name}</div>
                            <div style={{ color: '#888', fontSize: 11, marginTop: 2, maxWidth: 180 }}>{comp.note}</div>
                          </div>
                        </div>
                      </td>
                      {Object.entries(comp.features).map(([key, val]) => (
                        <td key={key} style={{ padding: '16px 12px', textAlign: 'center' }}>
                          {key === 'leadSelling' ? (
                            <span style={{ color: val ? '#dc2626′ : '#16a34a', fontSize: 18 }}>{val ? ’x' : 'check'}</span>
                          ) : (
                            <span style={{ color: val ? '#16a34a' : '#ccc', fontSize: 18 }}>{val ? 'check' : '-'}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'advantages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {advantages.map((adv, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 16, padding: 32, display: 'flex', gap: 20 }}>
                <span style={{ fontSize: 36, flexShrink: 0 }}>{adv.icon}</span>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 12px', color: '#0A1628′ }}>{adv.title}</h3>
                  <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{adv.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vault' && (
          <div>
            <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 20, padding: 48, textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 48 }}>🏛️</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: '20px 0 16px', color: '#0A1628′ }}>Your Home History Travels With the Property</h2>
              <p style={{ color: '#555', fontSize: 17, lineHeight: 1.8, maxWidth: 640, margin: '0 auto 32px' }}>
                When you sell, your Home Health Vault record transfers to the new owner. Every inspection, repair, upgrade, and service call becomes part of the property documented history — a real auditable asset that increases buyer confidence and your home perceived value.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'left' }}>
                {[
                  ['📊', 'Documented Maintenance History', 'Buyers pay more for homes with proven maintenance records. No guessing about roof age or HVAC service history.'],
                  ['🔒', 'Permanent Digital Record', 'Cloud-stored, homeowner-controlled. Not lost when you move, not stored in a filing cabinet drawer.'],
                  ['💎', 'Real Resale Value', 'Agents report TrustyPro homes sell with less negotiation — buyers have the data they need upfront.'],
                ].map(([icon, title, body], i) => (
                  <div key={i} style={{ background: '#FAFAF9', borderRadius: 12, padding: 24 }}>
                    <span style={{ fontSize: 28 }}>{icon}</span>
                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: '12px 0 8px', color: '#0A1628′ }}>{title}</h4>
                    <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0A1628', borderRadius: 20, padding: 48, textAlign: 'center', marginTop: 48 }}>
          <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: '0 0 16px' }}>Join the TrustyPro Waitlist</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: '0 0 28px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            DFW homeowners get early access to AI home scanning, verified pro dispatch, and the Home Health Vault.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, padding: '14px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>Get Early Access →</a>
        </div>
      </div>
    </div>
  );
}

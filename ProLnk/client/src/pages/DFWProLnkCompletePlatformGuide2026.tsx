import { useState } from 'react';

const ROLES = [
  { id: 'homeowner', label: '🏠 Homeowner' },
  { id: 'pro', label: '🔧 Service Pro' },
  { id: 'vault', label: '🏛️ Home Health Vault' },
  { id: 'dfw', label: '📍 DFW Market' },
];

const GUIDES: Record<string, { title: string; items: string[] }> = {
  homeowner: {
    title: 'ProLnk for Homeowners',
    items: [
      '📋 Submit service request — trade, ZIP, urgency level, and description',
      '🤖 AI matching — ProLnk scores and ranks Charter Pros for your project',
      '🏆 Charter Pros are better — they pass background, license, and insurance checks',
      '💬 Direct messaging — communicate before committing to any pro',
      '🏛️ Home Health Vault — your home structural and service history, always yours',
      '✅ Every match includes: license verification, insurance confirmation, reviews',
    ],
  },
  pro: {
    title: 'ProLnk for Service Pros',
    items: [
      '🥇 Charter Tier: first 500 applications — $149/month, locked for life',
      '💰 5 income streams: direct commissions, pro overrides, subscriptions, leads, origination',
      '📊 60% of each job revenue flows directly to the Charter Pro',
      '🌐 4-level network: your downline earns you passive override income',
      '📱 Dispatch notifications — matched leads delivered to your phone in real time',
      '🏛️ Origination rights — homes you service earn you a permanent revenue share',
    ],
  },
  vault: {
    title: 'Home Health Vault',
    items: [
      '🏠 Every home gets a Vault — permanent health and service history record',
      '📊 4,500+ DFW resources indexed — permits, inspections, utility history',
      '🔒 Privacy-first — homeowner controls who sees what, always',
      '📄 Transferable at sale — Vault follows the home, increases resale value',
      '🛡️ Service documentation — every ProLnk job auto-logged to your Vault',
      '🌍 50M+ homes nationwide — the largest home health data asset in the US',
    ],
  },
  dfw: {
    title: 'ProLnk DFW Market',
    items: [
      '📍 DFW coverage: all 13 DFW counties, 200+ cities and suburbs',
      '🌡️ DFW-specific expertise: foundation, HVAC, roofing, plumbing specialists',
      '🏆 4,500+ vetted DFW service professionals in the ProLnk network',
      '⚡ Average match time: under 4 minutes for standard service requests',
      '🌪️ Storm response network — activated during DFW severe weather events',
      '📊 DFW home data: permits, inspections, service history across DFW',
    ],
  },
};

export default function DFWProLnkCompletePlatformGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DEFINITIVE PLATFORM REFERENCE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🌐 ProLnk Complete Platform Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          The definitive ProLnk reference — everything homeowners, pros, and DFW residents need to know about how ProLnk works, what Charter tier means, and why Home Health Vault matters.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            What do you want to know about?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{
                  background: selected === r.id ? '#F5E642' : '#1e3a5f',
                  color: selected === r.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{GUIDES[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {GUIDES[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: '0.9rem' }}>For Homeowners</div>
            <div style={{ color: '#1e3a5f', fontSize: '0.8rem', marginTop: '0.25rem' }}>Get matched with Charter Pros</div>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '2px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '0.9rem' }}>For Pros</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>Apply for Charter tier — 500 spots</div>
          </div>
        </div>
      </div>
    </div>
  );
}

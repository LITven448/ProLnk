import { useState } from 'react';

const partners = [
  { icon: '✅', name: 'Checkr', status: 'Live', desc: 'Background checks for every pro — criminal, MVR, and license verification before activation.' },
  { icon: '📧', name: 'Resend', status: 'Live', desc: 'Transactional email delivery for confirmations, match alerts, and commission statements.' },
  { icon: '⚙️', name: 'n8n', status: 'Live', desc: 'Automation engine powering 47 AI agent workflows — lead routing, payout triggers, alerts.' },
  { icon: '🌦️', name: 'NOAA Weather API', status: 'Planned', desc: 'Storm-based lead surge routing — freeze alerts trigger plumbing lead boosts automatically.' },
  { icon: '📜', name: 'Permit API', status: 'Planned', desc: 'Auto-flag jobs requiring city permits in DFW — routed only to licensed, permit-ready pros.' },
  { icon: '🛡️', name: 'Insurance API', status: 'Planned', desc: 'Real-time COI verification — confirm pro insurance is current before every match.' },
];

const industryMap: Record<string, string[]> = {
  'Insurance / Risk': ['Real-time COI (Certificate of Insurance) pull before job assignment', 'Lapsed coverage auto-pause for pros', 'Claim history flags for high-risk jobs', 'Integration with major carriers for instant verification'],
  'Property Management': ['Bulk property upload via API for landlords and PMCs', 'Automated work order creation from property health alerts', 'Portfolio-level reporting for multi-property owners', 'Priority routing to pre-vetted pro pools'],
  'Real Estate': ['Home Health Vault linked to MLS listings', 'Pre-sale inspection scheduling automation', 'New-owner onboarding trigger at closing', 'Agent co-branded portal access'],
  'Smart Home / IoT': ['Sensor-triggered maintenance requests (leak detected → plumber dispatched)', 'Appliance manufacturer warranty integration', 'Automated service reminders via smart device data', 'Two-way API for monitoring platforms'],
};

export default function ProLnkAPIPartnersPage() {
  const [industry, setIndustry] = useState<string>('Insurance / Risk');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk Partner API</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Integrated with best-in-class partners today — and building the API layer that powers the future of home services.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14, marginBottom: 40 }}>
          {partners.map((p, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <span style={{ fontWeight: 700, color: '#F5E642' }}>{p.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 12,
                  background: p.status === 'Live' ? '#16a34a' : '#1e3a5f', color: p.status === 'Live' ? '#fff' : '#94a3b8' }}>
                  {p.status}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏗️ Industry Integration Explorer</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select an industry to see how ProLnk's API could work for your business:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(industryMap).map(ind => (
              <button key={ind} onClick={() => setIndustry(ind)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: industry === ind ? '#F5E642' : '#1e3a5f', color: industry === ind ? '#0A1628' : '#fff' }}>
                {ind}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {industryMap[industry].map((item, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>🔗 {item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
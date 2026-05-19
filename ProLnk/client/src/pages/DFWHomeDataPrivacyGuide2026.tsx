import { useState } from 'react';

const DATA_TYPES = [
  {
    type: '🏛️ Property Tax Records',
    who: 'Dallas/Tarrant/Collin/Denton County Appraisal District (public)',
    public: true,
    data: 'Owner name, purchase price, assessed value, square footage, lot size, improvement history',
    protect: 'Cannot be hidden — Texas public records. Use a trust or LLC for privacy on future purchases.',
    link: 'DCAD.org, TCAD.org, CCAD.org, DCAD-Denton.com',
  },
  {
    type: '💧 Utility Usage Data',
    who: 'Oncor (electric delivery) + your Retail Electric Provider (REP)',
    public: false,
    data: '15-min interval usage, peak demand, billing history, smart meter data',
    protect: 'Access via SmartMeterTexas.com — only you and your authorized REP can access. Opt out of 3rd party sharing in your REP account settings.',
    link: 'SmartMeterTexas.com · Your REP account portal',
  },
  {
    type: '📱 Smart Device Data',
    who: 'Device manufacturer (Nest/Google, Ring/Amazon, Ecobee, etc.)',
    public: false,
    data: 'Temperature schedules, motion patterns, lock/unlock history, camera footage, voice recordings',
    protect: 'Review privacy settings in each app. Use a dedicated IoT WiFi VLAN. Delete cloud storage after 30 days. Check data sharing policies annually.',
    link: 'Your Google, Amazon, or Apple account privacy settings',
  },
  {
    type: '🏘️ HOA Inspection Records',
    who: 'Your Homeowners Association (semi-private, accessible by HOA members)',
    public: false,
    data: 'Exterior inspection violations, architectural requests, landscaping compliance, fines history',
    protect: 'Request your file under your CC&Rs. Dispute errors in writing within 30 days. HOA records follow the home — check before purchasing.',
    link: 'Request directly from your HOA management company',
  },
  {
    type: '🔐 ProLnk Home Health Vault',
    who: 'You — owner-controlled, you decide who sees it',
    public: false,
    data: 'HVAC service history, foundation measurements, appliance records, inspection reports, permit history',
    protect: 'You control all access. Share with contractors only when needed. Data stays with the home and transfers to new owner on your terms. Never sold to third parties.',
    link: 'Your ProLnk account — prolnk.io',
  },
  {
    type: '📋 Building Permits',
    who: 'City of Dallas / Fort Worth / Frisco / Allen / McKinney (public)',
    public: true,
    data: 'All permitted work: additions, pools, HVAC replacements, foundation repairs, electrical upgrades',
    protect: 'Cannot be hidden — public record. Always pull permits on your own work to protect resale value. Unpermitted work is a liability.',
    link: 'City permit portals — search by address',
  },
  {
    type: '🏦 Mortgage & Title Records',
    who: 'County deed records (public) + your lender (private)',
    public: true,
    data: 'Deed of trust, loan amount, liens, easements, title history',
    protect: 'Deed is public. Monitor for deed fraud at your county — some counties offer free alert services. Keep title insurance current.',
    link: 'Your county deed records portal',
  },
];

export default function DFWHomeDataPrivacyGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? DATA_TYPES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK PRIVACY GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔒 DFW Home Data<br />Privacy Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32 }}>Multiple parties hold data about your DFW home. Know who has what — and how to control it. ProLnk Home Health Vault puts data ownership back in your hands.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🗂️ Select a data type to see who has it</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DATA_TYPES.map((d, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, background: '#0A1628', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{d.type.split(' ')[0]}</span>
                <span style={{ fontSize: 14, color: selected === i ? '#F5E642′ : '#e2e8f0', fontWeight: selected === i ? 700 : 400 }}>{d.type.slice(3)}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 8px', borderRadius: 99, background: d.public ? '#7c2d12′ : '#14532d', color: d.public ? '#fca5a5' : '#86efac', flexShrink: 0 }}>{d.public ? ’PUBLIC' : 'PRIVATE'}</span>
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0 }}>{result.type}</h3>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 99, background: result.public ? '#7c2d12′ : '#14532d', color: result.public ? '#fca5a5' : '#86efac' }}>{result.public ? ’PUBLIC RECORD' : 'PRIVATE DATA'}</span>
            </div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>Held by: <span style={{ color: '#94a3b8′ }}>{result.who}</span></div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>WHAT DATA THEY HAVE</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{result.data}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>HOW TO PROTECT IT</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{result.protect}</div>
            </div>
            <div style={{ fontSize: 12, color: '#475569′ }}>Access: {result.link}</div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏆 ProLnk Vault: The Privacy-First Alternative</div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>Unlike contractor databases or utility portals, ProLnk Home Health Vault is owner-controlled. You decide who sees your home's service history, foundation records, and appliance data — and revoke access anytime. Your data is never sold or shared without your explicit consent.</p>
        </div>
      </div>
    </div>
  );
}
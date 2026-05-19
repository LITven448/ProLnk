import { useState } from 'react';

const services = ['HVAC', 'Roofing', 'Plumbing', 'Electrical', 'Foundation', 'General Remodel'];

const scamData: Record<string, { rate: string; avgLoss: string; redFlags: string[]; prolnkAdvantage: string }> = {
  'HVAC': { rate: '34%', avgLoss: '$2,100', redFlags: ['Upfront cash demand', 'No company vehicle', 'Quote only via Facebook message'], prolnkAdvantage: 'ProLnk HVAC pros carry EPA cert + insurance. Verified before first call.' },
  'Roofing': { rate: '41%', avgLoss: '$4,800', redFlags: ['Storms chasers after weather', 'No physical address', 'Paid in full upfront'], prolnkAdvantage: 'Roofing requires highest fraud rate protection. ProLnk screens every roofer.' },
  'Plumbing': { rate: '22%', avgLoss: '$1,400', redFlags: ['Unusually low bid', 'No pull permit offer', 'Requests payment app only'], prolnkAdvantage: 'ProLnk plumbers are state-licensed and background-checked.' },
  'Electrical': { rate: '18%', avgLoss: '$1,900', redFlags: ['No permit mention', 'Personal Facebook only', 'Won\’t provide license number'], prolnkAdvantage: 'Electrical requires licensed electricians. ProLnk verifies every license number.' },
  'Foundation': { rate: '29%', avgLoss: '$6,200', redFlags: ['Engineered solution pushed fast', 'No written estimate', 'Door-to-door solicitation'], prolnkAdvantage: 'Foundation work is highest dollar scam in TX. ProLnk only uses licensed structural contractors.' },
  'General Remodel': { rate: '26%', avgLoss: '$3,300', redFlags: ['Facebook Marketplace listing only', 'No contractor bond', 'Requests 80%+ upfront'], prolnkAdvantage: 'Remodel scams peak post-storm. ProLnk general contractors carry bond and license.' },
};

export default function DFWFacebookMarketplaceVsProLnkGuide2026() {
  const [service, setService] = useState('HVAC');
  const d = scamData[service];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🚨</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>ProLnk vs Facebook Marketplace — DFW Contractor Scam Data 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Facebook contractors have zero licensing requirements. Here&apos;s the DFW scam landscape by trade.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🏠', '2,400+', 'DFW Contractor Scams (2025)'], ['💸', '$3,100', 'Average Loss Per Victim'], ['📱', '67%', 'Found via Facebook/Craigslist']].map(([icon, val, label]) => (
            <div key={String(label)} style={{ background: '#1e293b', borderRadius: 10, padding: '1.2rem', textAlign: 'center', border: '1px solid #ef4444′ }}>
              <div style={{ fontSize: '1.6rem' }}>{icon}</div>
              <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🔎 Scam Risk by Service Type</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {services.map((s) => (
              <button key={s} onClick={() => setService(s)}
                style={{ background: service === s ? '#F5E642′ : '#0f172a', color: service === s ? '#0A1628' : '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '0.4rem 0.9rem', cursor: ’pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 700 }}>{d.rate}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Facebook Marketplace Scam Rate — {service}</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 700 }}>{d.avgLoss}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Average Dollar Loss — {service}</div>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ color: '#f87171', fontWeight: 700, margin: '0 0 0.5rem' }}>🚩 Red Flags to Watch For:</p>
            {d.redFlags.map((f) => (
              <div key={f} style={{ color: '#f1f5f9', fontSize: '0.9rem', padding: '0.3rem 0′ }}>• {f}</div>
            ))}
          </div>

          <div style={{ background: '#052e16', borderRadius: 8, padding: '1rem', border: '1px solid #22c55e' }}>
            <p style={{ color: '#4ade80', fontWeight: 700, margin: '0 0 0.4rem' }}>✅ ProLnk Advantage:</p>
            <p style={{ color: '#f1f5f9', margin: 0, lineHeight: 1.7, fontSize: '0.9rem' }}>{d.prolnkAdvantage}</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', fontSize: '0.9rem' }}>
          🛡️ Every ProLnk pro is licensed, insured, and background-checked — prolnk.io
        </p>
      </div>
    </div>
  );
}
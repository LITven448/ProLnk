import { useState } from 'react';

const roles = [
  {
    id: 'homeowner',
    label: '🏠 DFW Homeowner',
    desc: 'Own your home, need HVAC service or replacement',
    scenarios: [
      { icon: '🔍', title: 'Find Vetted HVAC Techs', detail: 'ProLnk matches you with pre-screened, licensed DFW HVAC contractors — no random Google searches, no risk.' },
      { icon: '🚨', title: 'Emergency HVAC Service', detail: '105°F DFW day and your AC died? ProLnk\’s emergency match connects you to available techs within hours.' },
      { icon: '🏦', title: 'Home Health Vault', detail: 'Document your HVAC system — model, age, service history — in your permanent Home Health Vault. Increases home value.' },
      { icon: '💰', title: 'Compare Multiple Quotes', detail: 'Get 3 competitive quotes from vetted DFW pros. Never overpay for HVAC work again.' },
    ],
  },
  {
    id: 'pro',
    label: '🔧 HVAC Contractor / Tech',
    desc: 'DFW HVAC professional seeking qualified leads',
    scenarios: [
      { icon: '📋', title: 'Receive Qualified DFW Leads', detail: 'Get matched with homeowners in your DFW territory who need your exact services — no cold calling, no bidding wars.' },
      { icon: '🌐', title: 'Partner Network Access', detail: 'Join ProLnk\’s vetted HVAC contractor network. Build reputation through verified reviews and job history.' },
      { icon: '📈', title: '5-Stream Income System', detail: 'Earn commissions on matches, referrals, and subscription overrides. HVAC techs in the network average $2,400+/mo additional income.' },
      { icon: '🗂️', title: 'Vault-Documented Jobs', detail: 'Every job you complete gets logged in the homeowner\’s Vault — builds your track record automatically.' },
    ],
  },
  {
    id: 'landlord',
    label: '🏘️ DFW Landlord / Investor',
    desc: 'Own rental properties, manage HVAC across portfolio',
    scenarios: [
      { icon: '🏡', title: 'Portfolio HVAC Tracking', detail: 'Manage HVAC health across all properties in one dashboard. Know which units need service before tenants complain.' },
      { icon: '📊', title: 'Health Vault per Property', detail: 'Each property gets its own Vault — HVAC age, service history, warranty status. Essential for DFW property valuations.' },
      { icon: '⚡', title: 'Fast Emergency Dispatch', detail: 'Tenant calls at 10pm with no AC? ProLnk emergency matching gets a tech there fast, protecting your investment.' },
      { icon: '💼', title: 'Preferred Contractor Rates', detail: 'Volume relationships with DFW HVAC contractors through ProLnk — better rates for your portfolio.' },
    ],
  },
  {
    id: 'scout',
    label: '🏅 ProLnk Scout / Referrer',
    desc: 'Earn income by connecting pros and homeowners',
    scenarios: [
      { icon: '🔗', title: 'Refer HVAC Contractors', detail: 'Know DFW HVAC pros? Refer them to ProLnk. Earn 12% subscription override on every monthly payment they make.' },
      { icon: '🏠', title: 'Originate Home Vaults', detail: 'Help DFW homeowners add their HVAC data to Health Vault. Earn permanent origination rights — 1.5% of all future platform fees on that home.' },
      { icon: '🌐', title: 'Build Your Network', detail: '4-level referral cascade — earn on everyone your recruits bring in. Charter Scouts cap at 25 in your network.' },
      { icon: '📱', title: 'Scout Dashboard', detail: 'Real-time earnings tracking, territory map, leaderboard ranking among DFW scouts.' },
    ],
  },
];

export default function DFWHVACProLnkSummaryFinal() {
  const [activeRole, setActiveRole] = useState('homeowner');

  const role = roles.find(r => r.id === activeRole) ?? roles[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0′ }}>How ProLnk Helps with DFW HVAC</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>ProLnk's role in every DFW HVAC scenario — find your situation below</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => setActiveRole(r.id)} style={{ padding: '1rem', borderRadius: 12, border: `2px solid ${activeRole === r.id ? '#F5E642' : '#1E3A5F'}`, background: activeRole === r.id ? '#0D2A0D' : '#0D1F35', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: activeRole === r.id ? '#F5E642′ : '#fff' }}>{r.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899AA', marginTop: 4 }}>{r.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0D1F35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.2rem' }}>{role.label} — ProLnk Scenarios</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {role.scenarios.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{s.icon}</div>
                <h3 style={{ color: '#fff', margin: '0 0 0.4rem', fontSize: '0.95rem' }}>{s.title}</h3>
                <p style={{ color: '#8899AA', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem' }}>🚀 Join the ProLnk Waitlist</h3>
          <p style={{ color: '#AAB8C2', fontSize: '0.9rem', margin: '0 0 1rem' }}>Waitlist closes at 500 pros + 5,000 homes. Charter members lock in $149/mo forever.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '0.75rem 2rem', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Join as Pro / Scout</button>
            <button style={{ padding: '0.75rem 2rem', background: 'transparent', color: '#F5E642', fontWeight: 700, borderRadius: 10, border: '2px solid #F5E642', cursor: 'pointer', fontSize: '1rem' }}>Join as Homeowner</button>
          </div>
        </div>
      </div>
    </div>
  );
}

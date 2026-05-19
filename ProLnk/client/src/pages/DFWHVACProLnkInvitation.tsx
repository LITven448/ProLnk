import { useState } from 'react';

const invitations = [
  { id: 'homeowner', label: 'DFW Homeowner', title: 'Your Homeowner Invitation', message: 'Join ProLnk as a homeowner and get: same-day access to licensed, background-checked DFW HVAC pros; neighborhood price benchmarks before every job; a permanent Home Health Vault record for your property. Zero cost to you — ever. We earn when the pro gets paid. Waitlist status: 312 of 500 homeowner slots filled.' },
  { id: 'pro', label: 'HVAC Professional', title: 'Your Pro Invitation', message: 'Join as a founding HVAC pro and lock in 12% commission — the lowest rate we will ever offer. As your match volume grows, you ascend to 70% at Tier 5. You get: pre-vetted homeowner leads, automated scheduling, digital job history, and ProLnk marketing support. Charter Pro spots: 89 remaining.' },
  { id: 'scout', label: 'Field Scout / Referrer', title: 'Your Scout Invitation', message: 'Earn up to $100 per qualified homeowner you refer and 1% of every job your recruited pros complete — for life. Stream 4 (homeowner origination) and Stream 2 (pro override) combine to create passive income that scales without additional work. Scout applications: open, no cap.' },
  { id: 'investor', label: 'Investor / Strategic Partner', title: 'Your Investor Invitation', message: 'ProLnk is raising a seed round. The Home Health Vault is a permanent data moat. The Network Income System creates structural lock-in unlike any other marketplace. DFW alone represents $4.2B in annual HVAC spend. If you want to be part of this, reach out directly: andrew@lit-ventures.com.' },
];

export default function DFWHVACProLnkInvitation() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = invitations.find(i => i.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>The ProLnk Invitation</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
            A formal, personal invitation to join the platform that is changing how DFW homeowners and HVAC pros find each other.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>The ProLnk Promise</h2>
          {[
            { icon: '🛡️', promise: 'Homeowners: You will never overpay for HVAC again. Our price benchmarks and vetted pros protect every job.' },
            { icon: '💼', promise: 'Pros: You will never chase bad leads again. Every ProLnk match is pre-verified, pre-funded, and ready to hire.' },
            { icon: '📈', promise: 'Scouts: You will earn passive income from every job in your network — long after you referred them.' },
            { icon: '🏛️', promise: 'Investors: You will own a piece of the data moat that makes ProLnk permanently defensible.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>{item.promise}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⏳', label: 'Waitlist Closes', value: 'At 500 homes + 500 pros' },
            { icon: '🚀', label: 'Launch Date', value: 'May 2026′ },
            { icon: '💰', label: 'Cost to Join', value: 'Free for homeowners' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F5E642', textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 600 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Your Personalized Invitation</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>What best describes you?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {invitations.map(inv => (
              <button key={inv.id} onClick={() => setSelected(inv.id)} style={{ background: selected === inv.id ? '#F5E642′ : '#1e3a5f', color: selected === inv.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}>
                {inv.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 24, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{result.title}</div>
              <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.8 }}>{result.message}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>The Invitation Is Open — But Not Forever</div>
          <div style={{ fontSize: 15, color: '#0A1628', lineHeight: 1.6, maxWidth: 500, margin: '0 auto' }}>Founding member pricing and priority access close when the waitlist fills. DFW homeowners and pros who join now will always have an edge over those who wait.</div>
        </div>
      </div>
    </div>
  );
}

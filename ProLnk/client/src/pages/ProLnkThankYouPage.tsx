import { useState } from 'react';

const locations = ['North Dallas / Plano / Frisco', 'Fort Worth / Keller / Southlake', 'East Dallas / Garland / Mesquite', 'Irving / Las Colinas / Coppell', 'Arlington / Mansfield / Grand Prairie', 'McKinney / Allen / Prosper', 'Denton / Lewisville / Flower Mound'];

const roleNextSteps = {
  homeowner: [
    { icon: '📧', step: 'Check your email — confirmation + queue position just sent' },
    { icon: '🏠', step: 'Add your home to the Home Health Vault — unlocks origination rights' },
    { icon: '🔗', step: 'Share your referral link — every homeowner you bring in earns you points' },
    { icon: '📋', step: 'Complete your home profile — trade, urgency, contact preference' },
    { icon: '🤝', step: 'Expect your first match within 5-7 business days of launch' },
  ],
  partner: [
    { icon: '📧', step: 'Check email — partner welcome + onboarding checklist sent' },
    { icon: '📋', step: 'Submit license and insurance docs within 48 hours to secure your spot' },
    { icon: '🔗', step: 'Share your partner referral link — each pro you recruit = override income for life' },
    { icon: '🗺️', step: 'Set your service territory and trade categories in your dashboard' },
    { icon: '💰', step: 'Charter Founding rate: $149/mo locked — price rises at 500 partners' },
  ],
  both: [
    { icon: '📧', step: 'Two emails incoming — one for each role' },
    { icon: '📋', step: 'Complete partner verification first (time-sensitive for Charter rate)' },
    { icon: '🏠', step: 'Add your home to the Vault — you earn origination rights on your own property' },
    { icon: '🔗', step: 'Your dual-role referral link earns on both homeowner and partner conversions' },
    { icon: '⭐', step: 'Dual-role members get priority matching and dedicated onboarding support' },
  ],
};

const accelerators = [
  { icon: '👥', title: 'Refer 3 Homeowners', desc: 'Move up 15 spots in the match queue + earn origination rights on their homes' },
  { icon: '🔧', title: 'Refer 1 Partner', desc: 'Earn 10% of their monthly subscription + override income on their matches forever' },
  { icon: '🏠', title: 'Add Your Home to the Vault', desc: 'Permanent origination rights — earn every time a pro is matched to your address' },
  { icon: '📸', title: 'Complete Full Home Profile', desc: 'Priority placement in matching algorithm when your service need goes live' },
];

export default function ProLnkThankYouPage() {
  const [role, setRole] = useState<'homeowner' | 'partner' | 'both' | ''>('');
  const [location, setLocation] = useState('');
  const steps = role ? roleNextSteps[role] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 64 }}>🎉</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>You Are In!</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Welcome to ProLnk — Dallas-Fort Worth's home services network</p>
          <div style={{ background: '#111d30', borderRadius: 12, padding: '14px 24px', display: 'inline-block', marginTop: 16, border: '1px solid #1e3a5f' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Confirmation email sent — check your inbox now</span>
          </div>
        </div>
        <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642′ }}>Personalize your next steps:</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>I joined as a...</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {(['homeowner', 'partner', 'both'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  style={{ padding: '12px 8px', background: role === r ? '#F5E642′ : '#0A1628', color: role === r ? '#0A1628' : '#cbd5e1', border: '1.5px solid #1e3a5f', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: ’pointer' }}>
                  {r === 'homeowner' ? '🏠 Homeowner' : r === 'partner' ? '🔧 Partner' : '⭐ Both'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>My DFW area:</div>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#cbd5e1', border: '1.5px solid #1e3a5f', borderRadius: 10, fontSize: 15 }}>
              <option value="">Select your area...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        {steps && (
          <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 24, border: '2px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: '#F5E642′ }}>
              Your Next Steps {location ? `— ${location}` : ''}
            </div>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24 }}>{s.icon}</div>
                <div style={{ color: '#cbd5e1', fontSize: 15 }}><strong style={{ color: '#fff' }}>Step {i+1}:</strong> {s.step}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ background: '#111d30', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642′ }}>⚡ Accelerate Your Results</div>
          {accelerators.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #1e3a5f', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24 }}>{a.icon}</div>
              <div><div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{a.title}</div><div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{a.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
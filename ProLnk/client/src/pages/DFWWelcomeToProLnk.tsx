import { useState } from 'react';

const memberTypes = ['Homeowner', 'Service Pro', 'Both'];

const steps: Record<string, { icon: string; title: string; desc: string; time: string }[]> = {
  Homeowner: [
    { icon: '🏠', title: 'Add Your Home to Health Vault', desc: 'Enter your address so we can match contractors to your exact home type, age, and systems.', time: '3 min' },
    { icon: '🔧', title: 'Set Your Service Preferences', desc: 'Tell us what trades you may need — HVAC, plumbing, electrical, roofing — so we send only relevant matches.', time: '2 min' },
    { icon: '📋', title: 'Complete Your Homeowner Profile', desc: 'Home age, square footage, HOA status — this helps contractors give you accurate quotes faster.', time: '4 min' },
    { icon: '📣', title: 'Share ProLnk with One Neighbor', desc: 'Every home in your area that joins makes your matches more competitive. One share helps everyone.', time: '1 min' },
    { icon: '🔔', title: 'Enable Quote Notifications', desc: 'When a pro matches your request, you want to know immediately — enable alerts so you don’t miss it.', time: '1 min' },
  ],
  'Service Pro': [
    { icon: '🪪', title: 'Upload Your License & Insurance', desc: 'ProLnk verifies every pro. Upload your state license and COI now — unverified pros don’t receive leads.', time: '5 min' },
    { icon: '📍', title: 'Set Your Service Territory', desc: 'Define the zip codes or radius you serve. You’ll only receive leads inside your territory.', time: '3 min' },
    { icon: '💼', title: 'Select Your Trade Categories', desc: 'HVAC, plumbing, electrical, roofing — pick every trade you’re licensed for. More categories = more leads.', time: '2 min' },
    { icon: '💳', title: 'Set Up Your Payout Method', desc: 'Add your bank account or debit card so commissions land the moment a match closes.', time: '4 min' },
    { icon: '🌐', title: 'Build Your Pro Profile Page', desc: 'Add photos, certifications, and a bio. Homeowners review pro profiles before accepting a match.', time: '8 min' },
  ],
  Both: [
    { icon: '🏠', title: 'Add Your Home First', desc: 'Start as a homeowner — get your home into the Health Vault so you benefit from the platform immediately.', time: '3 min' },
    { icon: '🪪', title: 'Verify Your Pro Credentials', desc: 'Upload your license and insurance to unlock lead access. Both tracks run simultaneously.', time: '5 min' },
    { icon: '🔁', title: 'Link Your Dual Account', desc: 'Your homeowner and pro profiles are linked — referrals and earnings track together automatically.', time: '2 min' },
    { icon: '💰', title: 'Activate All 5 Income Streams', desc: 'As a pro + homeowner, you qualify for every ProLnk income stream. Review them in your dashboard.', time: '5 min' },
    { icon: '📣', title: 'Share With Your Network', desc: 'Pros who recruit other pros earn override commissions. Start your referral chain now.', time: '2 min' },
  ],
};

const promises = [
  '✅ Always free for homeowners — no hidden fees, ever',
  '🔍 Every contractor is licensed, insured, and background-checked',
  '⚡ Matches delivered in minutes, not days',
  '🔒 Your home data stays private — never sold to third parties',
];

export default function DFWWelcomeToProLnk() {
  const [memberType, setMemberType] = useState('Homeowner');
  const [done, setDone] = useState<Record<string, boolean>>({});

  function toggle(title: string) {
    setDone(prev => ({ ...prev, [title]: !prev[title] }));
  }

  const list = steps[memberType] || [];
  const completedCount = list.filter(s => done[s.title]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 44 }}>🎉</div>
          <h1 style={{ color: '#F5E642', fontSize: 30, fontWeight: 800, margin: '12px 0 8px' }}>Welcome to ProLnk</h1>
          <p style={{ color: '#8B9BB4', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>You're now part of DFW's most trusted home services network. Here's what to do in your first 24 hours.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>I joined as a...</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {memberTypes.map(t => (
              <button key={t} onClick={() => setMemberType(t)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: memberType === t ? '#F5E642' : '#1A2E4A', color: memberType === t ? '#0A1628' : '#8B9BB4' }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700 }}>Your First 24 Hours</h2>
            <span style={{ color: completedCount === list.length ? '#22C55E' : '#8B9BB4', fontSize: 13, fontWeight: 600 }}>{completedCount}/{list.length} done</span>
          </div>
          {list.map(step => (
            <div key={step.title} onClick={() => toggle(step.title)} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #1A2E4A', cursor: 'pointer', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: done[step.title] ? '#8B9BB4' : '#E8EAF0', textDecoration: done[step.title] ? 'line-through' : 'none' }}>{step.title}</span>
                  <span style={{ fontSize: 12, color: '#F5E642', background: '#1A2E4A', padding: '2px 8px', borderRadius: 12 }}>⏱ {step.time}</span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#8B9BB4', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>The ProLnk Promise</h2>
          {promises.map(p => (
            <p key={p} style={{ fontSize: 14, color: '#8B9BB4', margin: '8px 0' }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

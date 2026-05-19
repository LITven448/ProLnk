import { useState } from 'react';

const actions = [
  { id: 'join-waitlist', label: 'Join the waitlist as a Pro', how: 'Go to prolnk.io/pro-signup. Fill in your trade, service area, and contact info. You\’re in. Charter tier locks your rate at $149/mo forever. Waitlist closes at 500 — don\’t wait.' },
  { id: 'homeowner-signup', label: 'Join as a homeowner', how: 'Go to prolnk.io/homeowner-signup. Add your address, the service you need, and your contact. When we go live in DFW, you\’re first in queue for a verified pro match.' },
  { id: 'schedule-hvac', label: 'Schedule an HVAC match through ProLnk', how: 'Join the homeowner waitlist and select HVAC as your service need. ProLnk\’s beta matching will connect you with a verified DFW HVAC pro before the summer rush hits.' },
  { id: 'health-vault', label: 'Add my home to Health Vault', how: 'After joining as a homeowner, go to your dashboard and select "Add Home to Health Vault." Enter your address, HVAC system age, and any known issues. This stays private to you.' },
  { id: 'refer-pro', label: 'Refer a pro or neighbor', how: 'Share your ProLnk referral link (found in your dashboard after signup). If they join as a Charter Pro, you earn 12% subscription override monthly — permanently.' },
];

export default function DFWProLnkMayAction() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = actions.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          ⚡ ProLnk · May 2026 Action Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          What to Do With ProLnk in May 2026
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          ProLnk is open for waitlist signups, Health Vault adds, and beta HVAC matching in DFW. Charter closes at 500 Pro applications. Here's exactly how to take action right now.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '⏳', title: 'Charter Closes at 500 Pro Apps', body: 'Once 500 Pros are on the Charter waitlist, the $149/mo locked rate disappears. New Pros pay market rate. This is a hard cap — not a soft deadline.' },
            { icon: '🏡', title: 'Homeowner Waitlist Is Free', body: 'Join now, get matched when DFW goes live. No payment required. No obligation. First in, first matched.' },
            { icon: '💰', title: 'Network Income Starts Day 1', body: 'Every Pro or homeowner you refer before Charter closes earns you ongoing income through ProLnk\’s 4-level cascade. Referral rights are locked to your account permanently.' },
            { icon: '🔒', title: 'Health Vault Data Is Yours', body: 'Adding your home is free and private. Your data is never sold. It improves your match quality when ProLnk launches full matching in DFW.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Action Type → How to Do It Now
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {actions.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                style={{
                  background: selected === a.id ? '#F5E642′ : '#1a3050',
                  color: selected === a.id ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>HOW TO DO IT NOW</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.how}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · Connecting DFW homeowners with verified home service pros · prolnk.io
        </div>
      </div>
    </div>
  );
}
